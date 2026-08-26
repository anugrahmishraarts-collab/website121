"use client";

import { useActionState, useState } from "react";
import { signIn, type FormState } from "@/app/admin/actions";
import { Eye, EyeOff } from "lucide-react";

const initialState: FormState = { status: "idle" };

export function LoginForm() {
  const [state, formAction, pending] = useActionState(signIn, initialState);
  const [showPassword, setShowPassword] = useState(false);

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
        <div className="relative mt-2">
          <input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            required
            autoComplete="current-password"
            className="w-full bg-transparent border-b border-line focus:border-ember-bright outline-none py-3 pr-10 font-body text-paper transition-colors"
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-muted hover:text-paper p-1.5 transition-colors cursor-pointer"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
      </div>

      {state.status === "error" && (
        <p className="font-ui text-sm text-ember-bright">{state.message}</p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="w-full font-ui text-sm bg-ember hover:bg-ember-bright disabled:opacity-60 text-ink px-6 py-3.5 transition-colors cursor-pointer"
      >
        {pending ? "Signing in…" : "Sign in"}
      </button>
    </form>
  );
}
