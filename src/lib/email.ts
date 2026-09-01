import { Resend } from "resend";
import {
  buildStudioInquiryEmail,
  buildVisitorConfirmationEmail,
} from "@/lib/email-templates";

export const STUDIO_EMAIL = "info@inquisitivearts.com";

const DEFAULT_FROM_EMAIL = "Inquisitive Arts <website@inquisitivearts.com>";

type InquiryEmailDetails = {
  inquiryId: string;
  name: string;
  email: string;
  message: string;
  artworkTitle?: string | null;
};

function deliveryErrorMessage(error: unknown) {
  if (error instanceof Error) return error.message;
  if (typeof error === "object" && error && "message" in error) {
    return String(error.message);
  }
  return "Unknown email provider error";
}

export async function sendInquiryEmails(details: InquiryEmailDetails) {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    console.error("Inquiry email delivery skipped: RESEND_API_KEY is not configured.", {
      inquiryId: details.inquiryId,
    });
    return false;
  }

  const resend = new Resend(apiKey);
  const from = process.env.RESEND_FROM_EMAIL?.trim() || DEFAULT_FROM_EMAIL;
  const subjectName = details.name.replace(/[\r\n]+/g, " ").slice(0, 80);
  const studioEmail = buildStudioInquiryEmail(details);
  const visitorEmail = buildVisitorConfirmationEmail(details);

  const results = await Promise.allSettled([
    resend.emails.send(
      {
        from,
        to: STUDIO_EMAIL,
        replyTo: details.email,
        subject: `New website enquiry from ${subjectName}`,
        ...studioEmail,
      },
      { idempotencyKey: `studio-inquiry-${details.inquiryId}` }
    ),
    resend.emails.send(
      {
        from,
        to: details.email,
        replyTo: STUDIO_EMAIL,
        subject: "We’ve received your message — Inquisitive Arts",
        ...visitorEmail,
      },
      { idempotencyKey: `visitor-confirmation-${details.inquiryId}` }
    ),
  ]);

  const failures: string[] = [];

  for (const result of results) {
    if (result.status === "rejected") {
      failures.push(deliveryErrorMessage(result.reason));
    } else if (result.value.error) {
      failures.push(deliveryErrorMessage(result.value.error));
    }
  }

  if (failures.length > 0) {
    console.error("One or more inquiry emails failed.", {
      inquiryId: details.inquiryId,
      errors: failures,
    });
    return false;
  }

  console.info("Inquiry notification and confirmation accepted by Resend.", {
    inquiryId: details.inquiryId,
  });
  return true;
}
