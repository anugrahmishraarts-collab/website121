"use server";

import { z } from "zod";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import { getArtworkBySlug } from "@/lib/data";

const schema = z.object({
  name: z.string().trim().min(1, "Please enter your name."),
  email: z.string().trim().email("Please enter a valid email address."),
  message: z.string().trim().min(10, "Tell us a little more — at least 10 characters."),
  artworkSlug: z.string().optional(),
});

export type InquiryState = {
  status: "idle" | "success" | "error";
  message?: string;
};

export async function submitInquiry(
  _prev: InquiryState,
  formData: FormData
): Promise<InquiryState> {
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

  if (!isSupabaseConfigured()) {
    console.log("New inquiry (Supabase not connected — logged only):", {
      name,
      email,
      message,
      artwork: artwork?.title,
    });
    return {
      status: "success",
      message: "Thanks — your message has been received. Anugrah will get back to you soon.",
    };
  }

  const supabase = await createClient();
  const { error } = await supabase.from("inquiries").insert({
    name,
    email,
    message,
    artwork_id: artwork?.id ?? null,
    artwork_title: artwork?.title ?? null,
  });

  if (error) {
    return {
      status: "error",
      message: "Something went wrong sending your message. Please try again in a moment.",
    };
  }

  return {
    status: "success",
    message: "Thanks — your message has been received. Anugrah will get back to you soon.",
  };
}
