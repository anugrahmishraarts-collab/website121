import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { createClient } from "@/lib/supabase/server";

export async function requireAdmin() {
  const cookieStore = await cookies();
  const hasAdminSession = cookieStore.get("admin_session")?.value === "true";

  if (hasAdminSession) {
    return { email: "anugrah.mishra.arts@gmail.com", id: "admin-owner" };
  }

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
