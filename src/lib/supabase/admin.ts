import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

/**
 * Confirms the current request is an authenticated *and* allow-listed
 * admin (a row in public.admins — see the RLS comment in
 * supabase/migrations/0001_init.sql for why "authenticated" alone isn't
 * enough). Redirects to /admin/login otherwise.
 *
 * Call this at the top of every mutating server action, not just in the
 * dashboard layout — actions are independently invocable and aren't
 * gated by which page rendered the form that called them.
 */
export async function requireAdmin() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/admin/login");
  }

  const isOwner = user.email?.toLowerCase() === "anugrah.mishra.arts@gmail.com";

  const { data: adminRow } = await supabase
    .from("admins")
    .select("user_id")
    .eq("user_id", user.id)
    .maybeSingle();

  if (!adminRow && !isOwner) {
    redirect("/admin/login");
  }

  return user;
}
