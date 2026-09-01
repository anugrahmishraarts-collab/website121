const SITE_URL = "https://www.inquisitivearts.com";
const INSTAGRAM_URL = "https://www.instagram.com/inquisitive_artist_/";

type InquiryEmailDetails = {
  name: string;
  email: string;
  message: string;
  artworkTitle?: string | null;
};

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function emailShell(preview: string, content: string) {
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>${escapeHtml(preview)}</title>
  </head>
  <body style="margin:0;background:#111516;color:#ede9df;font-family:Arial,Helvetica,sans-serif;">
    <div style="display:none;max-height:0;overflow:hidden;opacity:0;">${escapeHtml(preview)}</div>
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#111516;">
      <tr>
        <td align="center" style="padding:36px 16px;">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:620px;background:#181d1f;border:1px solid #343a3c;">
            <tr>
              <td style="padding:30px 34px 20px;border-bottom:1px solid #343a3c;">
                <p style="margin:0 0 6px;color:#d9845f;font-size:12px;font-weight:700;letter-spacing:2px;text-transform:uppercase;">Inquisitive Arts</p>
                <p style="margin:0;color:#ede9df;font-family:Georgia,serif;font-size:28px;line-height:1.2;">Anugrah Mishra</p>
              </td>
            </tr>
            <tr>
              <td style="padding:30px 34px;color:#d4d0c7;font-size:16px;line-height:1.7;">
                ${content}
              </td>
            </tr>
            <tr>
              <td style="padding:20px 34px;border-top:1px solid #343a3c;color:#969c9d;font-size:12px;line-height:1.6;">
                <a href="${SITE_URL}" style="color:#d9845f;text-decoration:none;">Website</a>
                &nbsp;&nbsp;·&nbsp;&nbsp;
                <a href="${INSTAGRAM_URL}" style="color:#d9845f;text-decoration:none;">Instagram</a>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

export function buildVisitorConfirmationEmail({
  name,
  artworkTitle,
}: Pick<InquiryEmailDetails, "name" | "artworkTitle">) {
  const safeName = escapeHtml(name);
  const artworkContext = artworkTitle
    ? `<p style="margin:0 0 20px;">We have noted that your enquiry is about <strong style="color:#ede9df;">${escapeHtml(artworkTitle)}</strong>.</p>`
    : "";

  return {
    html: emailShell(
      "Thank you for contacting Inquisitive Arts.",
      `<p style="margin:0 0 20px;color:#ede9df;font-family:Georgia,serif;font-size:24px;line-height:1.35;">Thank you for getting in touch</p>
       <p style="margin:0 0 20px;">Dear ${safeName},</p>
       <p style="margin:0 0 20px;">This email confirms that your message has been received. Inquisitive Arts will review your enquiry and get back to you within <strong style="color:#ede9df;">three working days</strong>.</p>
       ${artworkContext}
       <p style="margin:0 0 24px;">In the meantime, you can explore recent paintings and projects on the <a href="${SITE_URL}" style="color:#d9845f;">Inquisitive Arts website</a> or follow the studio on <a href="${INSTAGRAM_URL}" style="color:#d9845f;">Instagram</a>.</p>
       <p style="margin:0;">Warm regards,<br><strong style="color:#ede9df;">Anugrah Mishra</strong><br>Inquisitive Arts</p>`
    ),
    text: [
      `Dear ${name},`,
      "",
      "Thank you for getting in touch with Inquisitive Arts. This email confirms that your message has been received.",
      "",
      "We will review your enquiry and get back to you within three working days.",
      artworkTitle ? `Your enquiry is about: ${artworkTitle}.` : "",
      "",
      `Website: ${SITE_URL}`,
      `Instagram: ${INSTAGRAM_URL}`,
      "",
      "Warm regards,",
      "Anugrah Mishra",
      "Inquisitive Arts",
    ]
      .filter((line, index, lines) => line || lines[index - 1] !== "")
      .join("\n"),
  };
}

export function buildStudioInquiryEmail({
  name,
  email,
  message,
  artworkTitle,
}: InquiryEmailDetails) {
  return {
    text: [
      "New website enquiry",
      "",
      `From: ${name}`,
      `Email: ${email}`,
      artworkTitle ? `Artwork: ${artworkTitle}` : "",
      "",
      "Message:",
      message,
      "",
      "Reply to this email to respond directly to the sender. The enquiry is also saved in the private Studio dashboard.",
    ]
      .filter((line, index, lines) => line || lines[index - 1] !== "")
      .join("\n"),
  };
}
