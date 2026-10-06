import { NextRequest, NextResponse } from "next/server";
import { bookingSchema } from "@/lib/booking-schema";
import { djNotificationEmail, clientConfirmationEmail } from "@/lib/email-templates";

// ─── Resend email helper ───────────────────────────────────────────────────────
async function sendEmail({
  to,
  subject,
  html,
  replyTo,
}: {
  to: string;
  subject: string;
  html: string;
  replyTo?: string;
}) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) throw new Error("RESEND_API_KEY is not configured");

  const from = process.env.DJ_EMAIL
    ? `DJ Neva Misa Beat <bookings@${process.env.DJ_EMAIL.split("@")[1]}>`
    : "DJ Neva Misa Beat <bookings@djNeva Misa Beat.com>";

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ from, to, subject, html, reply_to: replyTo }),
  });

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(`Resend error ${res.status}: ${JSON.stringify(body)}`);
  }

  return res.json();
}

// ─── Twilio SMS helper ─────────────────────────────────────────────────────────
async function sendSMS(to: string, body: string) {
  const sid   = process.env.TWILIO_ACCOUNT_SID;
  const token = process.env.TWILIO_AUTH_TOKEN;
  const from  = process.env.TWILIO_PHONE_NUMBER;

  if (!sid || !token || !from) {
    console.warn("Twilio not fully configured — skipping SMS");
    return null;
  }

  const credentials = Buffer.from(`${sid}:${token}`).toString("base64");

  const res = await fetch(
    `https://api.twilio.com/2010-04-01/Accounts/${sid}/Messages.json`,
    {
      method: "POST",
      headers: {
        Authorization: `Basic ${credentials}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({ From: from, To: to, Body: body }).toString(),
    }
  );

  if (!res.ok) {
    const errBody = await res.json().catch(() => ({}));
    throw new Error(`Twilio error ${res.status}: ${JSON.stringify(errBody)}`);
  }

  return res.json();
}

// ─── POST /api/booking ─────────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  // 1. Parse & validate
  let raw: unknown;
  try {
    raw = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const parsed = bookingSchema.safeParse(raw);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed", details: parsed.error.flatten() },
      { status: 422 }
    );
  }

  const data = parsed.data;
  const djEmail   = process.env.DJ_EMAIL;
  const djPhone   = process.env.DJ_PHONE_NUMBER;

  const errors: string[] = [];

  // 2. Send DJ notification email
  if (djEmail) {
    try {
      await sendEmail({
        to:      djEmail,
        subject: `🎧 New Booking Inquiry — ${data.eventType} on ${data.eventDate} (${data.fullName})`,
        html:    djNotificationEmail(data),
        replyTo: data.email,
      });
    } catch (err) {
      console.error("DJ notification email failed:", err);
      errors.push("DJ notification email failed");
    }
  }

  // 3. Send client confirmation email
  try {
    await sendEmail({
      to:      data.email,
      subject: `Booking Inquiry Received — DJ Neva Misa Beat`,
      html:    clientConfirmationEmail(data),
    });
  } catch (err) {
    console.error("Client confirmation email failed:", err);
    errors.push("Client confirmation email failed");
  }

  // 4. Send DJ SMS alert
  if (djPhone) {
    const smsBody =
      `🎧 New DJ Neva Misa Beat Booking!\n` +
      `From: ${data.fullName} (${data.phone})\n` +
      `Event: ${data.eventType} on ${data.eventDate} @ ${data.eventTime}\n` +
      `Venue: ${data.venueName}, ${data.venueAddress}\n` +
      `Guests: ${data.guestCount}\n` +
      `Reply: ${data.email}`;

    try {
      await sendSMS(djPhone, smsBody);
    } catch (err) {
      console.error("SMS alert failed:", err);
      errors.push("SMS alert failed");
    }
  }

  // 5. Respond — succeed even if only secondary channels failed
  if (errors.length > 0) {
    return NextResponse.json(
      { success: true, warnings: errors },
      { status: 200 }
    );
  }

  return NextResponse.json({ success: true }, { status: 200 });
}
