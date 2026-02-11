import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { Resend } from "resend";
import { quoteSchema } from "@/lib/validators";

const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000;
const RATE_LIMIT_MAX = 5;
const rateLimitMap = new Map<string, { count: number; reset: number }>();

function getClientIp() {
  const headerList = headers();
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
  try {
    const payload = await request.json();
    const parsed = quoteSchema.safeParse(payload);

    if (!parsed.success) {
      return NextResponse.json(
        { ok: false, error: "Please check the form fields and try again." },
        { status: 400 }
      );
    }

    const data = parsed.data;
    if (data.companyWebsite && data.companyWebsite.trim().length > 0) {
      return NextResponse.json({ ok: false, error: "Spam detected." }, { status: 400 });
    }

    const ip = getClientIp();
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { ok: false, error: "Too many requests. Please try again in an hour." },
        { status: 429 }
      );
    }

    const headerList = headers();
    const userAgent = headerList.get("user-agent") ?? "unknown";
    const timestamp = new Date().toISOString();

    const emailPayload = {
      timestamp,
      name: data.name,
      phone: data.phone,
      email: data.email,
      addressOrEircode: data.addressOrEircode,
      message: data.message,
      consent: data.consent,
      ip,
      userAgent,
    };

    const resendApiKey = process.env.RESEND_API_KEY;
    const emailTo = process.env.EMAIL_TO;
    const emailFrom = process.env.EMAIL_FROM;

    if (!resendApiKey || !emailTo || !emailFrom) {
      console.log("Quote request received (email disabled):", emailPayload);
      return NextResponse.json({ ok: true });
    }

    const resend = new Resend(resendApiKey);
    const recipients = emailTo
      .split(",")
      .map((value) => value.trim())
      .filter(Boolean);

    await resend.emails.send({
      from: emailFrom,
      to: recipients,
      subject: "New Quote Request — Southeast Painters",
      text: [
        `Timestamp: ${timestamp}`,
        `Name: ${data.name}`,
        `Phone: ${data.phone}`,
        `Email: ${data.email}`,
        `Address / Eircode: ${data.addressOrEircode}`,
        `Message: ${data.message}`,
        `Consent: ${data.consent ? "Yes" : "No"}`,
        `IP: ${ip}`,
        `User Agent: ${userAgent}`,
      ].join("\n"),
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Quote submission failed:", error);
    return NextResponse.json(
      { ok: false, error: "Unable to send your request right now." },
      { status: 500 }
    );
  }
}
