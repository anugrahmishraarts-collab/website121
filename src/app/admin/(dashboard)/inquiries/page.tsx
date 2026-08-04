import { createClient } from "@/lib/supabase/server";
import { DeleteButton } from "@/components/admin/delete-button";
import { deleteInquiry } from "@/app/admin/actions";
import type { Inquiry } from "@/lib/types";

export default async function AdminInquiriesPage() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("inquiries")
    .select("*")
    .order("created_at", { ascending: false });

  const inquiries = (data ?? []) as Inquiry[];

  return (
    <div>
      <p className="eyebrow mb-3">Enquiries</p>
      <h1 className="font-display text-3xl text-paper mb-10">Inquiries</h1>

      <div className="border border-line divide-y divide-line">
        {inquiries.map((inquiry) => (
          <div key={inquiry.id} className="p-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="font-display text-base text-paper">{inquiry.name}</p>
                <a
                  href={`mailto:${inquiry.email}`}
                  className="font-ui text-xs text-slate-bright hover:text-ember-bright"
                >
                  {inquiry.email}
                </a>
              </div>
              <div className="text-right shrink-0">
                <p className="font-ui text-xs text-muted">
                  {new Date(inquiry.created_at).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </p>
                {inquiry.artwork_title && (
                  <p className="font-ui text-xs text-ember-bright mt-1">Re: {inquiry.artwork_title}</p>
                )}
              </div>
            </div>
            <p className="font-body text-sm text-paper/80 mt-3 leading-relaxed">{inquiry.message}</p>
            <div className="mt-3">
              <DeleteButton
                action={deleteInquiry.bind(null, inquiry.id)}
                confirmMessage="Delete this inquiry?"
              />
            </div>
          </div>
        ))}
        {inquiries.length === 0 && (
          <p className="p-8 text-center font-body text-muted">No inquiries yet.</p>
        )}
      </div>
    </div>
  );
}
