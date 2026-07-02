import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { Resend } from "resend";
import { companyName } from "@/lib/constants";
import { emailLog } from "@/lib/email-log";
import { buildQuoteConfirmationHtml, buildQuoteEmailHtml } from "@/lib/quote-email";
import { quoteSchema } from "@/lib/validators";

const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000;
const RATE_LIMIT_MAX = 5;
const rateLimitMap = new Map<string, { count: number; reset: number }>();

async function getClientIp() {
  const headerList = await headers();
  const forwardedFor = headerList.get("x-forwarded-for");
  if (forwardedFor) {
    return forwardedFor.split(",")[0]?.trim() ?? "unknown";
  }
  return headerList.get("x-real-ip") ?? "unknown";
}

function isRateLimited(ip: string) {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || entry.reset < now) {
    rateLimitMap.set(ip, { count: 1, reset: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }

  if (entry.count >= RATE_LIMIT_MAX) {
    return true;
  }

  entry.count += 1;
  rateLimitMap.set(ip, entry);
  return false;
}

export async function POST(request: Request) {
  emailLog.start("quote");
  try {
    const payload = await request.json();
    const parsed = quoteSchema.safeParse(payload);

    if (!parsed.success) {
      const first = parsed.error.issues[0];
      emailLog.validationFailed(
        "quote",
        first?.message ?? "Invalid input.",
        first?.path
      );
      return NextResponse.json(
        { ok: false, error: "Please check the form fields and try again." },
        { status: 400 }
      );
    }

    const data = parsed.data;
    if (data.companyWebsite && data.companyWebsite.trim().length > 0) {
      emailLog.spamRejected("quote");
      return NextResponse.json({ ok: false, error: "Spam detected." }, { status: 400 });
    }

    const ip = await getClientIp();
    if (isRateLimited(ip)) {
      emailLog.rateLimited("quote", ip);
      return NextResponse.json(
        { ok: false, error: "Too many requests. Please try again in an hour." },
        { status: 429 }
      );
    }

    emailLog.validationOk("quote", {
      hasName: !!data.name,
      hasPhone: !!data.phone,
      hasEmail: !!data.email,
      hasAddressOrEircode: !!data.addressOrEircode,
      hasMessage: !!data.message,
      consent: data.consent,
    });

    const headerList = await headers();
    const userAgent = headerList.get("user-agent") ?? "unknown";
    const timestamp = new Date().toISOString();

    const resendApiKey = process.env.RESEND_API_KEY;
    const emailTo = process.env.EMAIL_TO;
    const emailFrom = process.env.EMAIL_FROM;

    const missingEnv: string[] = [];
    if (!resendApiKey) missingEnv.push("RESEND_API_KEY");
    if (!emailTo) missingEnv.push("EMAIL_TO");
    if (!emailFrom) missingEnv.push("EMAIL_FROM");

    if (missingEnv.length > 0) {
      emailLog.envMissing("quote", missingEnv);
      // In production a missing email config means the lead would be lost
      // silently, so fail loud. In development fall back to a no-op success.
      if (process.env.NODE_ENV === "production") {
        return NextResponse.json(
          { ok: false, error: "We couldn't submit your request right now. Please call or WhatsApp us." },
          { status: 500 }
        );
      }
      return NextResponse.json({ ok: true });
    }

    emailLog.sendStart("quote");

    const attribution = data.attribution;
    const text = [
      `Timestamp: ${timestamp}`,
      `Name: ${data.name}`,
      `Phone: ${data.phone}`,
      `Email: ${data.email}`,
      `Address / Eircode: ${data.addressOrEircode}`,
      data.projectType ? `Project type: ${data.projectType}` : null,
      data.timeline ? `Timeline: ${data.timeline}` : null,
      data.preferredContact ? `Preferred contact: ${data.preferredContact}` : null,
      `Message: ${data.message}`,
      `Consent: ${data.consent ? "Yes" : "No"}`,
      attribution?.source ? `Attribution source: ${attribution.source}` : null,
      attribution?.medium ? `Attribution medium: ${attribution.medium}` : null,
      attribution?.campaign ? `Attribution campaign: ${attribution.campaign}` : null,
      attribution?.referrer ? `Referrer: ${attribution.referrer}` : null,
      attribution?.landingPath ? `Landing: ${attribution.landingPath}` : null,
      `IP: ${ip}`,
      `User Agent: ${userAgent}`,
    ]
      .filter(Boolean)
      .join("\n");

    const html = buildQuoteEmailHtml({
      name: data.name,
      phone: data.phone,
      email: data.email,
      addressOrEircode: data.addressOrEircode,
      projectType: data.projectType,
      timeline: data.timeline,
      preferredContact: data.preferredContact,
      message: data.message,
      consent: data.consent,
      timestamp,
      ip,
      attribution,
    });

    const resend = new Resend(resendApiKey);
    const recipients = (emailTo as string)
      .split(",")
      .map((value) => value.trim())
      .filter(Boolean);

    const result = await resend.emails.send({
      from: emailFrom as string,
      to: recipients,
      subject: `Quote: ${data.name.trim()} — ${companyName}`,
      text,
      html,
    });

    if (result.error) {
      const errMsg = result.error.message ?? String(result.error);
      const errCode = (result.error as { code?: unknown })?.code;
      emailLog.sendError("quote", errMsg, errCode);
      return NextResponse.json(
        { ok: false, error: "Something went wrong. Please try again." },
        { status: 500 }
      );
    }

    emailLog.sendOk("quote", result.data?.id);

    // Best-effort confirmation email to the visitor. A failure here must not
    // fail the request, because the business notification already succeeded.
    try {
      const confirmation = await resend.emails.send({
        from: emailFrom as string,
        to: data.email.trim(),
        subject: `We received your request — ${companyName}`,
        html: buildQuoteConfirmationHtml({ name: data.name }),
      });
      if (confirmation.error) {
        emailLog.confirmationError(
          "quote",
          confirmation.error.message ?? String(confirmation.error)
        );
      } else {
        emailLog.confirmationOk("quote", confirmation.data?.id);
      }
    } catch (confirmationError) {
      emailLog.confirmationError(
        "quote",
        confirmationError instanceof Error ? confirmationError.message : String(confirmationError)
      );
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    emailLog.unexpectedError("quote", error);
    return NextResponse.json(
      { ok: false, error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
