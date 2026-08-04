import Link from "next/link";
import type { ReactNode } from "react";
import { redirect } from "next/navigation";
import { LayoutDashboard, Image as ImageIcon, MessageSquare, LogOut, ExternalLink } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import { signOut } from "@/app/admin/actions";

export default async function AdminDashboardLayout({ children }: { children: ReactNode }) {
  if (!isSupabaseConfigured()) {
    redirect("/admin/login");
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/admin/login");
  }

  return (
    <div className="min-h-screen bg-ink flex">
      <aside className="w-64 shrink-0 border-r border-line hidden md:flex flex-col">
        <div className="p-6 border-b border-line">
          <p className="font-display text-lg text-paper">Studio</p>
          <p className="font-ui text-xs text-muted mt-1">{user.email}</p>
        </div>
        <nav className="flex-1 p-4 space-y-1 font-ui text-sm">
          <SidebarLink href="/admin" icon={<LayoutDashboard size={16} />} label="Overview" />
          <SidebarLink href="/admin/artworks" icon={<ImageIcon size={16} />} label="Artworks" />
          <SidebarLink href="/admin/inquiries" icon={<MessageSquare size={16} />} label="Inquiries" />
        </nav>
        <div className="p-4 border-t border-line space-y-1">
          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-2.5 px-3 py-2.5 text-paper/70 hover:text-paper hover:bg-ink-raised transition-colors font-ui text-sm"
          >
            <ExternalLink size={16} /> View site
          </Link>
          <form action={signOut}>
            <button
              type="submit"
              className="w-full flex items-center gap-2.5 px-3 py-2.5 text-paper/70 hover:text-paper hover:bg-ink-raised transition-colors font-ui text-sm"
            >
              <LogOut size={16} /> Sign out
            </button>
          </form>
        </div>
      </aside>

      <div className="flex-1 min-w-0">
        <div className="md:hidden border-b border-line p-4 flex items-center justify-between">
          <p className="font-display text-paper">Studio</p>
          <form action={signOut}>
            <button type="submit" className="font-ui text-xs text-muted">
              Sign out
            </button>
          </form>
        </div>
        <div className="p-6 md:p-10 max-w-5xl">{children}</div>
      </div>
    </div>
  );
}

function SidebarLink({
  href,
  icon,
  label,
}: {
  href: string;
  icon: ReactNode;
  label: string;
}) {
  return (
    <Link
      href={href}
      className="flex items-center gap-2.5 px-3 py-2.5 text-paper/80 hover:text-paper hover:bg-ink-raised transition-colors"
    >
      {icon} {label}
    </Link>
  );
}
