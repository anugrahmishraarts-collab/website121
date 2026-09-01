"use server";

import { z } from "zod";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import { getArtworkBySlug } from "@/lib/data";
import { sendInquiryEmails } from "@/lib/email";

const schema = z.object({
  name: z.string().trim().min(1, "Please enter your name.").max(120),
  email: z.string().trim().email("Please enter a valid email address.").max(254),
  message: z
    .string()
    .trim()
    .min(10, "Tell us a little more — at least 10 characters.")
    .max(5000, "Please keep your message under 5,000 characters."),
  artworkSlug: z.string().optional(),
});

export type InquiryState = {
  status: "idle" | "success" | "error";
  message?: string;
};

const uuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export async function submitInquiry(
  _prev: InquiryState,
  formData: FormData
): Promise<InquiryState> {
  if (String(formData.get("website") ?? "").trim()) {
    return {
      status: "success",
      message: "Thanks — your message has been received. Inquisitive Arts will reply within three working days.",
    };
  }

  const parsed = schema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    message: formData.get("message"),
    artworkSlug: formData.get("artworkSlug") || undefined,
  });

  if (!parsed.success) {
    return {
      status: "error",
      message: parsed.error.issues[0]?.message ?? "Please check the form and try again.",
    };
  }

  const { name, email, message, artworkSlug } = parsed.data;
  const artwork = artworkSlug ? await getArtworkBySlug(artworkSlug) : null;
  const artworkId = artwork?.id && uuidPattern.test(artwork.id) ? artwork.id : null;
  const inquiryId = crypto.randomUUID();

  if (!isSupabaseConfigured()) {
    console.error("Inquiry could not be saved because Supabase is not configured.", { inquiryId });
    return {
      status: "error",
      message: "Something went wrong sending your message. Please try again in a moment.",
    };
  }

  const supabase = await createClient();
  const { error } = await supabase.from("inquiries").insert({
    id: inquiryId,
    name,
    email,
    message,
    artwork_id: artworkId,
    artwork_title: artwork?.title ?? null,
  });

  if (error) {
    return {
      status: "error",
      message: "Something went wrong sending your message. Please try again in a moment.",
    };
  }

  const emailsAccepted = await sendInquiryEmails({
    inquiryId,
    name,
    email,
    message,
    artworkTitle: artwork?.title,
  });

  return {
    status: "success",
    message: emailsAccepted
      ? "Thanks — your message has been received. A confirmation email is on its way, and Inquisitive Arts will reply within three working days."
      : "Thanks — your message has been received. Inquisitive Arts will reply within three working days.",
  };
}
