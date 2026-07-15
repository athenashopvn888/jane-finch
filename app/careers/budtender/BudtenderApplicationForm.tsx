"use client";

import { FormEvent, useState } from "react";
import styles from "./budtender.module.css";

const availabilityOptions = ["Weekdays", "Weeknights", "Weekends", "Overnights", "Opening shifts", "Flexible"];
const productOptions = ["Flower", "Pre-rolls", "Vapes", "Edibles", "Concentrates", "Accessories", "Still learning"];
const prompts = [
  ["RetailExperience", "Retail, customer service, or sales experience"],
  ["CannabisInterest", "What interests you about cannabis retail or learning the Jane Finch Cannabis menu?"],
  ["CashHandlingExperience", "POS, cash, inventory, or opening/closing experience"],
  ["Motivation", "What motivates you to keep improving?"],
  ["Determination", "Tell us about a time you stayed determined when work got tough."],
  ["CustomerFitScenario", "A customer is unsure what to buy. How would you help?"],
  ["TeamworkScenario", "How would you keep the counter steady during a busy late shift?"],
  ["WhyQLC", "Why do you want to work at Jane Finch Cannabis?"],
] as const;

type SubmitState = "idle" | "sending" | "success" | "error";

function collectChecked(formData: FormData, name: string) {
  return formData.getAll(name).map(String).filter(Boolean).join(", ");
}

function readPhoto(file: File) {
  return new Promise<{ PhotoDataBase64: string; PhotoFileName: string; PhotoMimeType: string }>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = typeof reader.result === "string" ? reader.result : "";
      const base64 = result.includes(",") ? result.split(",")[1] : "";
      if (!base64) {
        reject(new Error("Photo could not be read."));
        return;
      }
      resolve({ PhotoDataBase64: base64, PhotoFileName: file.name, PhotoMimeType: file.type || "image/jpeg" });
    };
    reader.onerror = () => reject(new Error("Photo could not be read."));
    reader.readAsDataURL(file);
  });
}

export default function BudtenderApplicationForm() {
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const availability = collectChecked(formData, "Availability");
    const productComfort = collectChecked(formData, "ProductComfort");
    const photo = formData.get("PhotoFile");

    if (!availability) return void (setSubmitState("error"), setMessage("Choose at least one availability option."));
    if (!(photo instanceof File) || photo.size <= 0) return void (setSubmitState("error"), setMessage("A clear selfie photo is required before submitting."));
    if (!["image/jpeg", "image/png", "image/webp"].includes(photo.type)) return void (setSubmitState("error"), setMessage("Photo must be a JPG, PNG, or WebP image."));
    if (photo.size > 4 * 1024 * 1024) return void (setSubmitState("error"), setMessage("Photo must be under 4 MB."));

    const payload = Object.fromEntries(formData.entries()) as Record<string, FormDataEntryValue>;
    delete payload.PhotoFile;
    payload.Availability = availability;
    payload.ProductComfort = productComfort;
    setSubmitState("sending");
    setMessage("Sending your application...");

    try {
      Object.assign(payload, await readPhoto(photo));
      const response = await fetch("/api/careers/budtender", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok || !result.ok) throw new Error(result.error || "Application could not be submitted.");
      form.reset();
      setSubmitState("success");
      setMessage(`Application received. Reference: ${result.applicationId}`);
    } catch (error) {
      setSubmitState("error");
      setMessage(error instanceof Error ? error.message : "Application could not be submitted.");
    }
  }

  return (
    <form className={styles.applicationForm} onSubmit={handleSubmit}>
      <input type="hidden" name="StoreKey" value="JFC01" />
      <input type="hidden" name="StoreName" value="Jane Finch Cannabis" />
      <input type="hidden" name="SourcePage" value="/careers/budtender" />

      <section className={styles.formSection}>
        <h3>Contact</h3>
        <div className={styles.twoColumn}>
          <label className={styles.field}><span>Full legal name</span><input name="ApplicantName" autoComplete="name" required /></label>
          <label className={styles.field}><span>Preferred name</span><input name="PreferredName" autoComplete="nickname" /></label>
          <label className={styles.field}><span>Email</span><input name="Email" type="email" autoComplete="email" required /></label>
          <label className={styles.field}><span>Phone</span><input name="Phone" type="tel" autoComplete="tel" required /></label>
        </div>
        <label className={styles.field}><span>City or area you live in</span><input name="CityArea" autoComplete="address-level2" /></label>
        <label className={styles.field}><span>Selfie photo required</span><input name="PhotoFile" type="file" accept="image/jpeg,image/png,image/webp" capture="user" required /><small>Use a clear selfie. JPG, PNG, or WebP under 4 MB.</small></label>
      </section>

      <section className={styles.formSection}>
        <h3>Availability</h3>
        <div className={styles.twoColumn}>
          <label className={styles.field}><span>Applying for</span><select name="Role" required defaultValue=""><option value="" disabled>Select one</option><option>Budtender</option><option>Manager</option></select></label>
          <label className={styles.field}><span>Role type</span><select name="EmploymentType" required defaultValue=""><option value="" disabled>Select one</option><option>Full-time</option><option>Part-time</option><option>Either</option></select></label>
          <label className={styles.field}><span>Earliest start date</span><input name="EarliestStartDate" type="date" required /></label>
        </div>
        <fieldset className={styles.checkboxGroup}><legend>Which shifts can you usually work?</legend>{availabilityOptions.map((option) => <label key={option}><input type="checkbox" name="Availability" value={option} />{option}</label>)}</fieldset>
        <fieldset className={styles.choiceGroup}><legend>Can you work late or overnight shifts when scheduled?</legend><label><input type="radio" name="LateShiftAvailability" value="Yes" required /> Yes</label><label><input type="radio" name="LateShiftAvailability" value="No" /> No</label><label><input type="radio" name="LateShiftAvailability" value="Sometimes" /> Sometimes</label></fieldset>
      </section>

      <section className={styles.formSection}>
        <h3>Experience And Fit</h3>
        {prompts.map(([name, label]) => <label key={name} className={styles.field}><span>{label}</span><textarea name={name} rows={4} required={!["CannabisInterest", "CashHandlingExperience"].includes(name)} /></label>)}
        <fieldset className={styles.checkboxGroup}><legend>Which product categories are you comfortable discussing?</legend>{productOptions.map((option) => <label key={option}><input type="checkbox" name="ProductComfort" value={option} />{option}</label>)}</fieldset>
      </section>

      <section className={styles.formSection}>
        <h3>Links And Consent</h3>
        <fieldset className={styles.choiceGroup}><legend>Can you reliably get to 2728 Jane St for scheduled shifts?</legend><label><input type="radio" name="TransportationReliability" value="Yes" required /> Yes</label><label><input type="radio" name="TransportationReliability" value="No" /> No</label><label><input type="radio" name="TransportationReliability" value="Sometimes" /> Sometimes</label></fieldset>
        <div className={styles.twoColumn}><label className={styles.field}><span>Resume link</span><input name="ResumeUrl" type="url" placeholder="https://" /></label><label className={styles.field}><span>LinkedIn, portfolio, or relevant profile</span><input name="PortfolioUrl" type="url" placeholder="https://" /></label></div>
        <label className={styles.consentLine}><input type="checkbox" name="ConsentToContact" value="I agree" required /><span>I consent to be contacted about this application.</span></label>
        <label className={styles.consentLine}><input type="checkbox" name="PrivacyConsent" value="I agree" required /><span>I understand my response will be stored for hiring review.</span></label>
      </section>

      {message && <div className={`${styles.formMessage} ${styles[submitState]}`} role="status">{message}</div>}
      <button className={styles.submitButton} type="submit" disabled={submitState === "sending"}>{submitState === "sending" ? "Sending..." : "Submit Application"}</button>
    </form>
  );
}
