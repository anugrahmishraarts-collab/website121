"use server";

import { z } from "zod";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export type FormState = { status: "idle" | "error"; message?: string };

export async function signIn(_prev: FormState, formData: FormData): Promise<FormState> {
  const email = String(formData.get("email") ?? "");
  const password = String(formData.get("password") ?? "");

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    return { status: "error", message: "Incorrect email or password." };
  }

  redirect("/admin");
}

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/admin/login");
}

const artworkSchema = z.object({
  title: z.string().trim().min(1, "Title is required."),
  slug: z
    .string()
    .trim()
    .min(1, "Slug is required.")
    .regex(/^[a-z0-9-]+$/, "Slug can only contain lowercase letters, numbers and hyphens."),
  year: z.string().trim().optional(),
  medium: z.string().trim().optional(),
  dimensions: z.string().trim().optional(),
  description: z.string().trim().min(1, "Description is required."),
  status: z.enum(["available", "inquire", "sold"]),
  collection: z.string().trim().optional(),
  featured: z.coerce.boolean().optional(),
  placeholder_tone: z.enum(["ember", "slate", "ink"]),
});

function slugify(input: string) {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

async function uploadImageIfPresent(formData: FormData, slug: string) {
  const file = formData.get("image");
  if (!(file instanceof File) || file.size === 0) return undefined;

  const supabase = await createClient();
  const ext = file.name.split(".").pop() || "jpg";
  const path = `${slug}-${Date.now()}.${ext}`;

  const { error } = await supabase.storage.from("artwork-images").upload(path, file, {
    upsert: true,
    contentType: file.type || undefined,
  });
  if (error) throw new Error(error.message);

  const { data } = supabase.storage.from("artwork-images").getPublicUrl(path);
  return data.publicUrl;
}

export async function createArtwork(_prev: FormState, formData: FormData): Promise<FormState> {
  const title = String(formData.get("title") ?? "");
  const rawSlug = String(formData.get("slug") ?? "") || slugify(title);

  const parsed = artworkSchema.safeParse({
    title,
    slug: rawSlug,
    year: formData.get("year") || undefined,
    medium: formData.get("medium") || undefined,
    dimensions: formData.get("dimensions") || undefined,
    description: formData.get("description"),
    status: formData.get("status"),
    collection: formData.get("collection") || undefined,
    featured: formData.get("featured") === "on",
    placeholder_tone: formData.get("placeholder_tone") || "ink",
  });

  if (!parsed.success) {
    return { status: "error", message: parsed.error.issues[0]?.message };
  }

  let imageUrl: string | undefined;
  try {
    imageUrl = await uploadImageIfPresent(formData, parsed.data.slug);
  } catch (e) {
    return { status: "error", message: e instanceof Error ? e.message : "Image upload failed." };
  }

  const supabase = await createClient();
  const { error } = await supabase.from("artworks").insert({
    ...parsed.data,
    image_url: imageUrl,
  });

  if (error) {
    return { status: "error", message: error.message };
  }

  revalidatePath("/gallery");
  revalidatePath("/");
  redirect("/admin/artworks");
}

export async function updateArtwork(
  id: string,
  _prev: FormState,
  formData: FormData
): Promise<FormState> {
  const title = String(formData.get("title") ?? "");
  const rawSlug = String(formData.get("slug") ?? "") || slugify(title);

  const parsed = artworkSchema.safeParse({
    title,
    slug: rawSlug,
    year: formData.get("year") || undefined,
    medium: formData.get("medium") || undefined,
    dimensions: formData.get("dimensions") || undefined,
    description: formData.get("description"),
    status: formData.get("status"),
    collection: formData.get("collection") || undefined,
    featured: formData.get("featured") === "on",
    placeholder_tone: formData.get("placeholder_tone") || "ink",
  });

  if (!parsed.success) {
    return { status: "error", message: parsed.error.issues[0]?.message };
  }

  let imageUrl: string | undefined;
  try {
    imageUrl = await uploadImageIfPresent(formData, parsed.data.slug);
  } catch (e) {
    return { status: "error", message: e instanceof Error ? e.message : "Image upload failed." };
  }

  const supabase = await createClient();
  const { error } = await supabase
    .from("artworks")
    .update({ ...parsed.data, ...(imageUrl ? { image_url: imageUrl } : {}) })
    .eq("id", id);

  if (error) {
    return { status: "error", message: error.message };
  }

  revalidatePath("/gallery");
  revalidatePath(`/gallery/${parsed.data.slug}`);
  revalidatePath("/");
  redirect("/admin/artworks");
}

export async function deleteArtwork(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("artworks").delete().eq("id", id);
  if (error) throw new Error(error.message);

  revalidatePath("/gallery");
  revalidatePath("/");
  revalidatePath("/admin/artworks");
}

export async function deleteInquiry(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("inquiries").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/inquiries");
}
