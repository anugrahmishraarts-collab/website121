"use client";

import { useActionState } from "react";
import { Send } from "lucide-react";
import { submitInquiry, type InquiryState } from "@/app/contact/actions";

const initialState: InquiryState = { status: "idle" };

export function ContactForm({
  artworkSlug,
  artworkTitle,
}: {
  artworkSlug?: string;
  artworkTitle?: string;
}) {
  const [state, formAction, pending] = useActionState(submitInquiry, initialState);

  if (state.status === "success") {
    return (
      <div className="border border-line p-8">
        <p className="font-display text-2xl text-paper mb-2">Message sent</p>
        <p className="font-body text-paper/75 leading-relaxed">{state.message}</p>
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-6">
      {artworkSlug && (
        <>
          <input type="hidden" name="artworkSlug" value={artworkSlug} />
          <p className="font-ui text-sm text-slate-bright border border-line px-4 py-3">
            Regarding: <span className="text-paper">{artworkTitle}</span>
          </p>
        </>
      )}

      <div>
        <label htmlFor="name" className="font-ui text-xs tracking-[0.1em] uppercase text-muted">
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          className="mt-2 w-full bg-transparent border-b border-line focus:border-ember-bright outline-none py-3 font-body text-paper placeholder:text-muted transition-colors"
          placeholder="Your name"
        />
      </div>

      <div>
        <label htmlFor="email" className="font-ui text-xs tracking-[0.1em] uppercase text-muted">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="mt-2 w-full bg-transparent border-b border-line focus:border-ember-bright outline-none py-3 font-body text-paper placeholder:text-muted transition-colors"
          placeholder="you@example.com"
        />
      </div>

      <div>
        <label htmlFor="message" className="font-ui text-xs tracking-[0.1em] uppercase text-muted">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          className="mt-2 w-full bg-transparent border-b border-line focus:border-ember-bright outline-none py-3 font-body text-paper placeholder:text-muted transition-colors resize-none"
          placeholder={
            artworkTitle
              ? `I'd like to ask about "${artworkTitle}"...`
              : "Tell us what you're looking for..."
          }
        />
      </div>

      {state.status === "error" && (
        <p className="font-ui text-sm text-ember-bright">{state.message}</p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="font-ui text-sm inline-flex items-center gap-2 bg-ember hover:bg-ember-bright disabled:opacity-60 text-ink px-6 py-3.5 transition-colors"
      >
        {pending ? "Sending…" : "Send message"} <Send size={15} />
      </button>
    </form>
  );
}
