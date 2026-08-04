import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

export default async function AdminOverviewPage() {
  const supabase = await createClient();
  const [{ count: artworkCount }, { count: inquiryCount }] = await Promise.all([
    supabase.from("artworks").select("*", { count: "exact", head: true }),
    supabase.from("inquiries").select("*", { count: "exact", head: true }),
  ]);

  return (
    <div>
      <p className="eyebrow mb-3">Overview</p>
      <h1 className="font-display text-3xl text-paper mb-10">Welcome back</h1>

      <div className="grid sm:grid-cols-2 gap-6 max-w-xl">
        <Link
          href="/admin/artworks"
          className="border border-line hover:border-line-bright p-6 transition-colors"
        >
          <p className="font-display text-4xl text-paper">{artworkCount ?? 0}</p>
          <p className="font-ui text-sm text-muted mt-1">Artworks published</p>
        </Link>
        <Link
          href="/admin/inquiries"
          className="border border-line hover:border-line-bright p-6 transition-colors"
        >
          <p className="font-display text-4xl text-paper">{inquiryCount ?? 0}</p>
          <p className="font-ui text-sm text-muted mt-1">Inquiries received</p>
        </Link>
      </div>

      <div className="mt-12">
        <Link
          href="/admin/artworks/new"
          className="font-ui text-sm inline-flex items-center gap-2 bg-ember hover:bg-ember-bright text-ink px-6 py-3.5 transition-colors"
        >
          Add a new artwork
        </Link>
      </div>
    </div>
  );
}
