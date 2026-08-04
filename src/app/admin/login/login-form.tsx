"use client";

import { useActionState } from "react";
import { signIn, type FormState } from "@/app/admin/actions";

const initialState: FormState = { status: "idle" };

export function LoginForm() {
  const [state, formAction, pending] = useActionState(signIn, initialState);

  return (
    <form action={formAction} className="space-y-5">
      <div>
        <label htmlFor="email" className="font-ui text-xs tracking-[0.1em] uppercase text-muted">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          className="mt-2 w-full bg-transparent border-b border-line focus:border-ember-bright outline-none py-3 font-body text-paper transition-colors"
        />
      </div>
      <div>
        <label htmlFor="password" className="font-ui text-xs tracking-[0.1em] uppercase text-muted">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          autoComplete="current-password"
          className="mt-2 w-full bg-transparent border-b border-line focus:border-ember-bright outline-none py-3 font-body text-paper transition-colors"
        />
      </div>

      {state.status === "error" && (
        <p className="font-ui text-sm text-ember-bright">{state.message}</p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="w-full font-ui text-sm bg-ember hover:bg-ember-bright disabled:opacity-60 text-ink px-6 py-3.5 transition-colors"
      >
        {pending ? "Signing in…" : "Sign in"}
      </button>
    </form>
  );
}
