import { baseUrl, companyName, phone, phoneTel } from "@/lib/constants";
import { escapeHtml, formatTimestamp } from "@/lib/email-utils";
import type { Attribution } from "@/lib/validators";

interface QuoteEmailParams {
  name: string;
  phone: string;
  email: string;
  addressOrEircode: string;
  projectType?: string;
  timeline?: string;
  preferredContact?: string;
  message: string;
  consent: boolean;
  timestamp: string;
  ip: string;
  attribution?: Attribution;
}

function detailRow(label: string, value: string): string {
  return `
          <tr>
            <td style="padding: 16px 24px 0;">
              <p style="margin:0 0 6px; font-size: 12px; font-weight: 600; color: #5b5b5b; text-transform: uppercase; letter-spacing: 0.04em;">${escapeHtml(label)}</p>
              <p style="margin:0; font-size: 15px; color: #1f1f1f;">${escapeHtml(value)}</p>
            </td>
          </tr>`;
}

function attributionBlock(attribution: Attribution): string {
  if (!attribution) return "";
  const parts: string[] = [];
  if (attribution.source) parts.push(`Source: ${attribution.source}`);
  if (attribution.medium) parts.push(`Medium: ${attribution.medium}`);
  if (attribution.campaign) parts.push(`Campaign: ${attribution.campaign}`);
  if (attribution.term) parts.push(`Term: ${attribution.term}`);
  if (attribution.content) parts.push(`Content: ${attribution.content}`);
  if (attribution.referrer) parts.push(`Referrer: ${attribution.referrer}`);
  if (attribution.landingPath) parts.push(`Landing: ${attribution.landingPath}`);
  if (parts.length === 0) return "";

  return `
          <tr>
            <td style="padding: 16px 24px 0;">
              <p style="margin:0 0 6px; font-size: 12px; font-weight: 600; color: #5b5b5b; text-transform: uppercase; letter-spacing: 0.04em;">First-touch attribution</p>
              <p style="margin:0; font-size: 13px; color: #5b5b5b; white-space: pre-wrap;">${escapeHtml(parts.join("\n"))}</p>
            </td>
          </tr>`;
}

export function buildQuoteEmailHtml(params: QuoteEmailParams): string {
  const {
    name,
    phone,
    email,
    addressOrEircode,
    projectType,
    timeline,
    preferredContact,
    message,
    consent,
    timestamp,
    ip,
    attribution,
  } = params;
  const safeName = escapeHtml(name.trim());
  const safePhone = escapeHtml(phone.trim());
  const safeEmail = escapeHtml(email.trim());
  const safeAddress = escapeHtml(addressOrEircode.trim());
  const safeMessage = escapeHtml(message.trim()).replace(/\n/g, "<br />");
  const safeTime = escapeHtml(formatTimestamp(timestamp));
  const safeIp = escapeHtml(ip);
  const consentText = consent ? "Yes" : "No";

  const qualification =
    (projectType ? detailRow("Project type", projectType) : "") +
    (timeline ? detailRow("Timeline", timeline) : "") +
    (preferredContact ? detailRow("Preferred contact", preferredContact) : "");

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Quote request — ${escapeHtml(companyName)}</title>
</head>
<body style="margin:0; padding:0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; font-size: 16px; line-height: 1.5; color: #1f1f1f; background-color: #f5f5f5;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color: #f5f5f5; padding: 24px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width: 560px; background-color: #ffffff; border-radius: 8px; box-shadow: 0 1px 3px rgba(0,0,0,0.08); overflow: hidden;">
          <tr>
            <td style="padding: 24px 24px 16px; border-bottom: 3px solid #111111;">
              <h1 style="margin:0; font-size: 20px; font-weight: 600; color: #1f1f1f;">New quote request</h1>
              <p style="margin: 6px 0 0; font-size: 13px; color: #5b5b5b;">${escapeHtml(companyName)} — quote form</p>
            </td>
          </tr>
          <tr>
            <td style="padding: 20px 24px; background-color: #fafafa;">
              <p style="margin:0 0 8px; font-size: 12px; font-weight: 600; color: #1f1f1f; text-transform: uppercase; letter-spacing: 0.04em;">Reply to</p>
              <p style="margin:0; font-size: 16px;"><a href="mailto:${safeEmail}" style="color: #111111; font-weight: 600; text-decoration: none;">${safeEmail}</a></p>
              <p style="margin: 8px 0 0; font-size: 15px; color: #5b5b5b;">Phone: ${safePhone}</p>
            </td>
          </tr>
          <tr>
            <td style="padding: 20px 24px 0;">
              <p style="margin:0 0 6px; font-size: 12px; font-weight: 600; color: #5b5b5b; text-transform: uppercase; letter-spacing: 0.04em;">From</p>
              <p style="margin:0; font-size: 16px; font-weight: 500; color: #1f1f1f;">${safeName}</p>
            </td>
          </tr>
          ${detailRow("Address / Eircode", safeAddress ? addressOrEircode.trim() : "")}
          ${qualification}
          <tr>
            <td style="padding: 16px 24px 0;">
              <p style="margin:0 0 8px; font-size: 12px; font-weight: 600; color: #5b5b5b; text-transform: uppercase; letter-spacing: 0.04em;">Message</p>
              <div style="padding: 16px; background-color: #fafafa; border-radius: 6px; border-left: 4px solid #111111;">
                <p style="margin:0; font-size: 15px; color: #1f1f1f; white-space: pre-wrap;">${safeMessage}</p>
              </div>
            </td>
          </tr>
          <tr>
            <td style="padding: 16px 24px 0;">
              <p style="margin:0 0 6px; font-size: 12px; font-weight: 600; color: #5b5b5b; text-transform: uppercase; letter-spacing: 0.04em;">Consent to contact</p>
              <p style="margin:0; font-size: 15px; color: #1f1f1f;">${consentText}</p>
            </td>
          </tr>
          ${attributionBlock(attribution)}
          <tr>
            <td style="padding: 12px 24px 20px; border-top: 1px solid #e6e6e6;">
              <p style="margin:0; font-size: 11px; color: #5b5b5b;">Submitted ${safeTime} · IP ${safeIp}</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
}

/**
 * Confirmation email sent to the person who requested a quote (speed-to-lead).
 */
export function buildQuoteConfirmationHtml(params: { name: string }): string {
  const safeName = escapeHtml(params.name.trim());

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>We received your request — ${escapeHtml(companyName)}</title>
</head>
<body style="margin:0; padding:0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; font-size: 16px; line-height: 1.6; color: #1f1f1f; background-color: #f5f5f5;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color: #f5f5f5; padding: 24px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width: 560px; background-color: #ffffff; border-radius: 8px; box-shadow: 0 1px 3px rgba(0,0,0,0.08); overflow: hidden;">
          <tr>
            <td style="padding: 24px 24px 16px; border-bottom: 3px solid #111111;">
              <h1 style="margin:0; font-size: 20px; font-weight: 600; color: #1f1f1f;">Thanks — we've got your request</h1>
              <p style="margin: 6px 0 0; font-size: 13px; color: #5b5b5b;">${escapeHtml(companyName)}</p>
            </td>
          </tr>
          <tr>
            <td style="padding: 24px;">
              <p style="margin:0 0 16px; font-size: 16px; color: #1f1f1f;">Hi ${safeName || "there"},</p>
              <p style="margin:0 0 16px; font-size: 15px; color: #1f1f1f;">
                Thanks for getting in touch with ${escapeHtml(companyName)}. We've received your quote request and will review the details and respond within <strong>1 business day</strong>.
              </p>
              <p style="margin:0 0 16px; font-size: 15px; color: #1f1f1f;">
                If your request is urgent, you can reach us directly:
              </p>
              <p style="margin:0 0 8px; font-size: 15px;">
                <a href="tel:${escapeHtml(phoneTel)}" style="color: #111111; font-weight: 600; text-decoration: none;">Call ${escapeHtml(phone)}</a>
              </p>
              <p style="margin: 24px 0 0; font-size: 13px; color: #5b5b5b;">
                ${escapeHtml(companyName)} · ${escapeHtml(baseUrl.replace(/^https?:\/\//, ""))}
              </p>
            </td>
          </tr>
        </table>
        <p style="margin: 16px 0 0; font-size: 11px; color: #9b9b9b;">You're receiving this because you requested a quote at ${escapeHtml(baseUrl.replace(/^https?:\/\//, ""))}.</p>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
}
