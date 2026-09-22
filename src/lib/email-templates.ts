import type { BookingFormData } from "@/lib/booking-schema";

export function djNotificationEmail(data: BookingFormData): string {
  const rows = [
    ["Name",               data.fullName],
    ["Email",              data.email],
    ["Phone",              data.phone],
    ["Event Type",         data.eventType],
    ["Event Date",         data.eventDate],
    ["Start Time",         data.eventTime],
    ["Venue",              data.venueName],
    ["Address",            data.venueAddress],
    ["Guest Count",        data.guestCount],
    ["Musical Vibe",       data.musicalPreferences],
    ["Equipment Notes",    data.equipmentRequirements || "—"],
    ["Additional Notes",   data.additionalNotes       || "—"],
  ];

  const tableRows = rows
    .map(
      ([label, value]) => `
        <tr>
          <td style="padding:10px 14px;background:#0b1628;border-bottom:1px solid #1e2d45;
                     font-size:12px;font-weight:600;color:#06d6f5;white-space:nowrap;
                     width:160px;vertical-align:top;">${label}</td>
          <td style="padding:10px 14px;background:#060d17;border-bottom:1px solid #1e2d45;
                     font-size:13px;color:#e2e8f0;vertical-align:top;">${value}</td>
        </tr>`
    )
    .join("");

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>New Booking Inquiry</title>
</head>
<body style="margin:0;padding:0;background:#020408;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#020408;padding:32px 16px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

          <!-- Header -->
          <tr>
            <td style="background:linear-gradient(135deg,#0b1628 0%,#101f38 100%);
                       border:1px solid rgba(6,214,245,0.2);border-radius:12px 12px 0 0;
                       padding:32px 28px;text-align:center;">
              <p style="margin:0 0 6px;font-size:11px;letter-spacing:4px;text-transform:uppercase;
                        color:#06d6f5;font-weight:600;">New Booking Inquiry</p>
              <h1 style="margin:0;font-size:28px;font-weight:900;color:#ffffff;letter-spacing:-1px;">
                DJ <span style="color:#06d6f5;">Axiom</span>
              </h1>
            </td>
          </tr>

          <!-- Alert badge -->
          <tr>
            <td style="background:#060d17;padding:16px 28px;text-align:center;
                       border-left:1px solid rgba(6,214,245,0.2);border-right:1px solid rgba(6,214,245,0.2);">
              <p style="margin:0;display:inline-block;padding:8px 20px;border-radius:999px;
                        background:rgba(6,214,245,0.12);border:1px solid rgba(6,214,245,0.3);
                        font-size:13px;color:#06d6f5;font-weight:600;">
                🎧 New inquiry from ${data.fullName}
              </p>
            </td>
          </tr>

          <!-- Table -->
          <tr>
            <td style="border-left:1px solid rgba(6,214,245,0.2);border-right:1px solid rgba(6,214,245,0.2);">
              <table width="100%" cellpadding="0" cellspacing="0">
                ${tableRows}
              </table>
            </td>
          </tr>

          <!-- CTA -->
          <tr>
            <td style="background:#0b1628;border:1px solid rgba(6,214,245,0.2);border-top:none;
                       border-radius:0 0 12px 12px;padding:24px 28px;text-align:center;">
              <p style="margin:0 0 16px;font-size:13px;color:#64748b;">
                Reply directly to this email or call the client at <strong style="color:#e2e8f0;">${data.phone}</strong>
              </p>
              <a href="mailto:${data.email}"
                 style="display:inline-block;padding:12px 28px;background:#06d6f5;border-radius:8px;
                        font-size:14px;font-weight:700;color:#020408;text-decoration:none;
                        letter-spacing:0.5px;">
                Reply to ${data.fullName}
              </a>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:20px;text-align:center;">
              <p style="margin:0;font-size:11px;color:#334155;">
                DJ Axiom Booking System · Confidential
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

export function clientConfirmationEmail(data: BookingFormData): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>Booking Inquiry Received</title>
</head>
<body style="margin:0;padding:0;background:#020408;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#020408;padding:32px 16px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

          <!-- Header -->
          <tr>
            <td style="background:linear-gradient(135deg,#0b1628 0%,#101f38 100%);
                       border:1px solid rgba(6,214,245,0.2);border-radius:12px 12px 0 0;
                       padding:36px 28px;text-align:center;">
              <p style="margin:0 0 6px;font-size:11px;letter-spacing:4px;text-transform:uppercase;
                        color:#06d6f5;font-weight:600;">Booking Inquiry Received</p>
              <h1 style="margin:0;font-size:28px;font-weight:900;color:#ffffff;letter-spacing:-1px;">
                DJ <span style="color:#06d6f5;">Axiom</span>
              </h1>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="background:#060d17;border-left:1px solid rgba(6,214,245,0.2);
                       border-right:1px solid rgba(6,214,245,0.2);padding:32px 28px;">
              <p style="margin:0 0 16px;font-size:18px;font-weight:700;color:#ffffff;">
                Hey ${data.fullName} 👋
              </p>
              <p style="margin:0 0 16px;font-size:14px;color:#94a3b8;line-height:1.7;">
                Thanks for reaching out! Your booking inquiry for
                <strong style="color:#e2e8f0;">${data.eventType}</strong> on
                <strong style="color:#06d6f5;">${data.eventDate} at ${data.eventTime}</strong>
                has been received.
              </p>
              <p style="margin:0 0 24px;font-size:14px;color:#94a3b8;line-height:1.7;">
                I review all inquiries personally and will be in touch within <strong style="color:#e2e8f0;">24 hours</strong>
                with availability and a custom quote.
              </p>

              <!-- Summary box -->
              <div style="background:#0b1628;border:1px solid rgba(6,214,245,0.15);border-radius:8px;padding:20px 24px;margin-bottom:24px;">
                <p style="margin:0 0 12px;font-size:11px;letter-spacing:3px;text-transform:uppercase;color:#06d6f5;font-weight:600;">
                  Your Inquiry Summary
                </p>
                <table width="100%" cellpadding="0" cellspacing="0">
                  <tr>
                    <td style="font-size:12px;color:#64748b;padding:4px 0;">Event</td>
                    <td style="font-size:13px;color:#e2e8f0;text-align:right;padding:4px 0;">${data.eventType} · ${data.eventDate}</td>
                  </tr>
                  <tr>
                    <td style="font-size:12px;color:#64748b;padding:4px 0;">Venue</td>
                    <td style="font-size:13px;color:#e2e8f0;text-align:right;padding:4px 0;">${data.venueName}</td>
                  </tr>
                  <tr>
                    <td style="font-size:12px;color:#64748b;padding:4px 0;">Guests</td>
                    <td style="font-size:13px;color:#e2e8f0;text-align:right;padding:4px 0;">${data.guestCount}</td>
                  </tr>
                </table>
              </div>

              <p style="margin:0;font-size:13px;color:#64748b;line-height:1.7;">
                Questions? Reply to this email or reach out on Instagram at
                <a href="https://instagram.com" style="color:#06d6f5;text-decoration:none;">@djaxiom</a>.
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#0b1628;border:1px solid rgba(6,214,245,0.2);border-top:none;
                       border-radius:0 0 12px 12px;padding:20px 28px;text-align:center;">
              <p style="margin:0;font-size:11px;color:#334155;">
                &copy; ${new Date().getFullYear()} DJ Axiom · Los Angeles, CA
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}
