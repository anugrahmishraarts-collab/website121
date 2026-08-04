import { isSupabaseConfigured } from "@/lib/supabase/env";
import { LoginForm } from "./login-form";

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-ink px-6">
      <div className="w-full max-w-sm">
        <p className="eyebrow mb-3 text-center">Inquisitive Arts</p>
        <h1 className="font-display text-3xl text-paper text-center mb-10">Studio sign in</h1>

        {isSupabaseConfigured() ? (
          <LoginForm />
        ) : (
          <div className="border border-line p-6 font-body text-sm text-paper/75 leading-relaxed">
            The admin dashboard needs a connected Supabase project before anyone can sign in. Add
            <code className="mx-1 px-1.5 py-0.5 bg-ink-raised text-ember-bright text-xs">NEXT_PUBLIC_SUPABASE_URL</code>
            and
            <code className="mx-1 px-1.5 py-0.5 bg-ink-raised text-ember-bright text-xs">NEXT_PUBLIC_SUPABASE_ANON_KEY</code>
            to <code className="px-1.5 py-0.5 bg-ink-raised text-ember-bright text-xs">.env.local</code>, run the
            migration in <code className="px-1.5 py-0.5 bg-ink-raised text-ember-bright text-xs">supabase/migrations</code>,
            and create a user in the Supabase Auth dashboard.
          </div>
        )}
      </div>
    </div>
  );
}
