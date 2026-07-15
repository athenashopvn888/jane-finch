export const runtime = "nodejs";

const STORE_KEY = "JFC01";
const STORE_NAME = "Jane Finch Cannabis";
const SUBMIT_ENDPOINT =
  process.env.ATHENA_HIRING_SUBMIT_ENDPOINT ||
  process.env.NEXT_PUBLIC_ATHENA_HIRING_SUBMIT_ENDPOINT ||
  "https://athena-hiring.vercel.app/api/applications/submit";

const REQUIRED_FIELDS = [
  "ApplicantName",
  "Email",
  "Phone",
  "Role",
  "EmploymentType",
  "Availability",
  "LateShiftAvailability",
  "EarliestStartDate",
  "RetailExperience",
  "Motivation",
  "Determination",
  "CustomerFitScenario",
  "TeamworkScenario",
  "WhyQLC",
  "TransportationReliability",
  "ConsentToContact",
  "PrivacyConsent",
];

const ALLOWED_PHOTO_MIME_TYPES = new Set(["image/jpeg", "image/png", "image/webp"]);

function clean(value: unknown): string {
  if (Array.isArray(value)) return value.map(clean).filter(Boolean).join(", ");
  if (typeof value === "string") return value.trim();
  if (typeof value === "number" || typeof value === "boolean") return String(value);
  return "";
}

function jsonResponse(body: Record<string, unknown>, status = 200) {
  return Response.json(body, { status });
}

function makeApplicationId(storeKey: string) {
  return `${storeKey}-${Date.now()}-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;
}

function validatePhoto(body: Record<string, unknown>) {
  const PhotoDataBase64 = clean(body.PhotoDataBase64);
  const PhotoFileName = clean(body.PhotoFileName) || "application-photo.jpg";
  const PhotoMimeType = clean(body.PhotoMimeType) || "image/jpeg";
  if (!PhotoDataBase64) return { error: "A clear selfie photo is required before submitting." };
  if (!ALLOWED_PHOTO_MIME_TYPES.has(PhotoMimeType)) return { error: "Photo must be a JPG, PNG, or WebP image." };
  const padding = PhotoDataBase64.endsWith("==") ? 2 : PhotoDataBase64.endsWith("=") ? 1 : 0;
  const byteLength = Math.floor((PhotoDataBase64.length * 3) / 4) - padding;
  if (byteLength > 4 * 1024 * 1024) return { error: "Photo must be under 4 MB." };
  return { data: { PhotoDataBase64, PhotoFileName, PhotoMimeType } };
}

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    const parsed = await request.json();
    body = parsed && typeof parsed === "object" && !Array.isArray(parsed) ? parsed : {};
  } catch {
    return jsonResponse({ ok: false, error: "Invalid application payload." }, 400);
  }

  const missing = REQUIRED_FIELDS.filter((field) => !clean(body[field]));
  if (missing.length) return jsonResponse({ ok: false, error: `Missing required fields: ${missing.join(", ")}` }, 400);
  if (clean(body.ConsentToContact) !== "I agree" || clean(body.PrivacyConsent) !== "I agree") return jsonResponse({ ok: false, error: "Consent is required before submitting." }, 400);

  const photoPayload = validatePhoto(body);
  if ("error" in photoPayload) return jsonResponse({ ok: false, error: photoPayload.error }, 400);

  const normalized: Record<string, string> = {};
  for (const [key, value] of Object.entries(body)) normalized[key] = clean(value);
  normalized.StoreKey = STORE_KEY;
  normalized.StoreName = STORE_NAME;
  normalized.SourcePage = "/careers/budtender";
  normalized.ApplicationId = normalized.ApplicationId || makeApplicationId(normalized.StoreKey);
  normalized.SubmittedAt = normalized.SubmittedAt || new Date().toISOString();
  normalized.Status = normalized.Status || "New";
  Object.assign(normalized, photoPayload.data);

  try {
    const response = await fetch(SUBMIT_ENDPOINT, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(normalized),
      cache: "no-store",
    });
    const text = await response.text();
    let result: { ok?: boolean; error?: string } = {};
    try {
      result = text ? JSON.parse(text) : {};
    } catch {
      result = {};
    }
    if (!response.ok || result.ok === false) return jsonResponse({ ok: false, error: result.error || text || "Application storage failed." }, 502);
    return jsonResponse({ ok: true, applicationId: normalized.ApplicationId });
  } catch (error) {
    return jsonResponse({ ok: false, error: error instanceof Error ? error.message : "Application storage failed." }, 502);
  }
}
