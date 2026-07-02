"use client";

import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { trackEvent } from "@/lib/analytics";
import { getAttribution } from "@/lib/attribution";
import {
  preferredContactOptions,
  projectTypeOptions,
  quoteSchema,
  timelineOptions,
  type QuotePayload,
} from "@/lib/validators";

const initialState: QuotePayload = {
  name: "",
  phone: "",
  email: "",
  addressOrEircode: "",
  projectType: "",
  timeline: "",
  preferredContact: "",
  message: "",
  consent: false,
  companyWebsite: "",
};

type FieldErrors = Partial<Record<keyof QuotePayload, string>>;

const inputClass =
  "border border-[#d9d9d9] px-4 py-3 focus:border-black focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black";

export default function LeadForm() {
  const router = useRouter();
  const [formData, setFormData] = useState<QuotePayload>(initialState);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [formError, setFormError] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const startedRef = useRef(false);

  const updateField = (field: keyof QuotePayload, value: string | boolean) => {
    if (!startedRef.current) {
      startedRef.current = true;
      trackEvent("form_start", { form: "quote" });
    }
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const validate = (data: QuotePayload) => {
    const result = quoteSchema.safeParse(data);
    if (result.success) {
      setErrors({});
      return true;
    }

    const fieldErrors: FieldErrors = {};
    for (const issue of result.error.issues) {
      const key = issue.path[0] as keyof QuotePayload | undefined;
      if (key && !fieldErrors[key]) {
        fieldErrors[key] = issue.message;
      }
    }
    setErrors(fieldErrors);
    return false;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormError("");

    const payload: QuotePayload = { ...formData, attribution: getAttribution() };
    if (!validate(payload)) {
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("/api/quote", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = (await response.json()) as { ok: boolean; error?: string };
      if (!response.ok || !data.ok) {
        throw new Error(data.error || "Something went wrong. Please try again.");
      }

      trackEvent("lead_submitted", { method: "quote_form" });
      trackEvent("generate_lead", { method: "quote_form" });
      router.push("/thank-you");
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unable to submit right now.";
      setFormError(message);
    } finally {
      setLoading(false);
    }
  };

  const describedBy = (field: keyof QuotePayload) => (errors[field] ? `${field}-error` : undefined);

  return (
    <form className="grid gap-6" onSubmit={handleSubmit} noValidate>
      <div className="grid gap-4 md:grid-cols-2">
        <label className="grid gap-2 text-sm text-[#1f1f1f]">
          Name
          <input
            className={inputClass}
            type="text"
            name="name"
            autoComplete="name"
            value={formData.name}
            onChange={(event) => updateField("name", event.target.value)}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={describedBy("name")}
          />
          {errors.name && (
            <span id="name-error" role="alert" className="text-xs text-[#9b2c2c]">
              {errors.name}
            </span>
          )}
        </label>
        <label className="grid gap-2 text-sm text-[#1f1f1f]">
          Phone
          <input
            className={inputClass}
            type="tel"
            name="phone"
            autoComplete="tel"
            value={formData.phone}
            onChange={(event) => updateField("phone", event.target.value)}
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={describedBy("phone")}
          />
          {errors.phone && (
            <span id="phone-error" role="alert" className="text-xs text-[#9b2c2c]">
              {errors.phone}
            </span>
          )}
        </label>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <label className="grid gap-2 text-sm text-[#1f1f1f]">
          Email
          <input
            className={inputClass}
            type="email"
            name="email"
            autoComplete="email"
            value={formData.email}
            onChange={(event) => updateField("email", event.target.value)}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={describedBy("email")}
          />
          {errors.email && (
            <span id="email-error" role="alert" className="text-xs text-[#9b2c2c]">
              {errors.email}
            </span>
          )}
        </label>
        <label className="grid gap-2 text-sm text-[#1f1f1f]">
          Address / Eircode
          <input
            className={inputClass}
            type="text"
            name="addressOrEircode"
            value={formData.addressOrEircode}
            onChange={(event) => updateField("addressOrEircode", event.target.value)}
            aria-invalid={Boolean(errors.addressOrEircode)}
            aria-describedby={describedBy("addressOrEircode")}
          />
          {errors.addressOrEircode && (
            <span id="addressOrEircode-error" role="alert" className="text-xs text-[#9b2c2c]">
              {errors.addressOrEircode}
            </span>
          )}
        </label>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <label className="grid gap-2 text-sm text-[#1f1f1f]">
          Project type <span className="text-[#5b5b5b]">(optional)</span>
          <select
            className={inputClass}
            name="projectType"
            value={formData.projectType}
            onChange={(event) => updateField("projectType", event.target.value)}
          >
            <option value="">Select…</option>
            {projectTypeOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>
        <label className="grid gap-2 text-sm text-[#1f1f1f]">
          Timeline <span className="text-[#5b5b5b]">(optional)</span>
          <select
            className={inputClass}
            name="timeline"
            value={formData.timeline}
            onChange={(event) => updateField("timeline", event.target.value)}
          >
            <option value="">Select…</option>
            {timelineOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>
        <label className="grid gap-2 text-sm text-[#1f1f1f]">
          Preferred contact <span className="text-[#5b5b5b]">(optional)</span>
          <select
            className={inputClass}
            name="preferredContact"
            value={formData.preferredContact}
            onChange={(event) => updateField("preferredContact", event.target.value)}
          >
            <option value="">Select…</option>
            {preferredContactOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>
      </div>

      <label className="grid gap-2 text-sm text-[#1f1f1f]">
        Project details
        <textarea
          className={`min-h-[140px] ${inputClass}`}
          name="message"
          value={formData.message}
          onChange={(event) => updateField("message", event.target.value)}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={describedBy("message")}
        />
        {errors.message && (
          <span id="message-error" role="alert" className="text-xs text-[#9b2c2c]">
            {errors.message}
          </span>
        )}
      </label>

      <div className="hidden" aria-hidden="true">
        <label>
          Company website
          <input
            type="text"
            name="companyWebsite"
            value={formData.companyWebsite ?? ""}
            onChange={(event) => updateField("companyWebsite", event.target.value)}
            tabIndex={-1}
            autoComplete="off"
          />
        </label>
      </div>

      <label className="flex items-start gap-3 text-sm text-[#1f1f1f]">
        <input
          className="mt-1 size-4 border border-[#1f1f1f]"
          type="checkbox"
          checked={formData.consent}
          onChange={(event) => updateField("consent", event.target.checked)}
          aria-invalid={Boolean(errors.consent)}
          aria-describedby={describedBy("consent")}
        />
        <span>
          I consent to being contacted about my quote request.
          {errors.consent && (
            <span id="consent-error" role="alert" className="mt-1 block text-xs text-[#9b2c2c]">
              {errors.consent}
            </span>
          )}
        </span>
      </label>

      {formError && (
        <p role="alert" className="text-sm text-[#9b2c2c]">
          {formError}
        </p>
      )}

      <div className="flex flex-wrap items-center gap-4">
        <button className="btn btn-primary" type="submit" disabled={loading}>
          {loading ? "Sending..." : "Request a Quote"}
        </button>
        <p className="text-xs text-[#5b5b5b]">We respond within 1 business day.</p>
      </div>
    </form>
  );
}
