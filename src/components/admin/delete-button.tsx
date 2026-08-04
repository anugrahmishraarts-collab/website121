"use client";

import { useTransition } from "react";
import { Trash2 } from "lucide-react";

export function DeleteButton({
  action,
  confirmMessage,
  label = "Delete",
}: {
  action: () => Promise<void>;
  confirmMessage: string;
  label?: string;
}) {
  const [pending, startTransition] = useTransition();

  return (
    <button
      type="button"
      disabled={pending}
      onClick={() => {
        if (!window.confirm(confirmMessage)) return;
        startTransition(() => {
          action();
        });
      }}
      className="font-ui text-xs inline-flex items-center gap-1.5 text-muted hover:text-ember-bright disabled:opacity-50 transition-colors"
    >
      <Trash2 size={13} /> {pending ? "Removing…" : label}
    </button>
  );
}
