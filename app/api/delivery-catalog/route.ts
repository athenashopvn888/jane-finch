const CATALOG_URL = "https://milestone-1-demo.vercel.app/api/catalog?store=JFC";

export const revalidate = 0;

export async function GET() {
  const response = await fetch(CATALOG_URL, { cache: "no-store" });

  if (!response.ok) {
    return Response.json(
      { ok: false, code: "CATALOG_UNAVAILABLE" },
      { status: 502, headers: { "Cache-Control": "no-store" } },
    );
  }

  const payload = await response.json();
  return Response.json(payload, {
    headers: { "Cache-Control": "no-store" },
  });
}
