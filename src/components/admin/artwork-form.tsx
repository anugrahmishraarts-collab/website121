"use client";

import { useActionState } from "react";
import type { FormState } from "@/app/admin/actions";
import type { Artwork } from "@/lib/types";

const initialState: FormState = { status: "idle" };

const inputClass =
  "mt-2 w-full bg-transparent border-b border-line focus:border-ember-bright outline-none py-2.5 font-body text-paper transition-colors";
const labelClass = "font-ui text-xs tracking-[0.1em] uppercase text-muted";

export function ArtworkForm({
  action,
  artwork,
  submitLabel = "Save artwork",
}: {
  action: (prev: FormState, formData: FormData) => Promise<FormState>;
  artwork?: Artwork;
  submitLabel?: string;
}) {
  const [state, formAction, pending] = useActionState(action, initialState);

  return (
    <form action={formAction} className="space-y-6 max-w-xl">
      <div className="grid sm:grid-cols-2 gap-6">
        <div>
          <label className={labelClass} htmlFor="title">Title</label>
          <input id="title" name="title" defaultValue={artwork?.title} required className={inputClass} />
        </div>
        <div>
          <label className={labelClass} htmlFor="slug">Slug (URL)</label>
          <input
            id="slug"
            name="slug"
            defaultValue={artwork?.slug}
            placeholder="auto-generated from title if left blank"
            className={inputClass}
          />
        </div>
      </div>

      <div className="grid sm:grid-cols-3 gap-6">
        <div>
          <label className={labelClass} htmlFor="year">Year</label>
          <input id="year" name="year" defaultValue={artwork?.year ?? ""} className={inputClass} />
        </div>
        <div>
          <label className={labelClass} htmlFor="medium">Medium</label>
          <input id="medium" name="medium" defaultValue={artwork?.medium ?? ""} className={inputClass} />
        </div>
        <div>
          <label className={labelClass} htmlFor="dimensions">Dimensions</label>
          <input id="dimensions" name="dimensions" defaultValue={artwork?.dimensions ?? ""} className={inputClass} />
        </div>
      </div>

      <div>
        <label className={labelClass} htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          required
          rows={5}
          defaultValue={artwork?.description}
          className={inputClass + " resize-none"}
        />
      </div>

      <div className="grid sm:grid-cols-3 gap-6">
        <div>
          <label className={labelClass} htmlFor="collection">Collection</label>
          <input id="collection" name="collection" defaultValue={artwork?.collection ?? ""} className={inputClass} />
        </div>
        <div>
          <label className={labelClass} htmlFor="status">Status</label>
          <select id="status" name="status" defaultValue={artwork?.status ?? "inquire"} className={inputClass}>
            <option value="available">Available</option>
            <option value="inquire">Enquire to purchase</option>
            <option value="sold">Sold</option>
          </select>
        </div>
        <div>
          <label className={labelClass} htmlFor="placeholder_tone">Placeholder tone</label>
          <select
            id="placeholder_tone"
            name="placeholder_tone"
            defaultValue={artwork?.placeholder_tone ?? "ink"}
            className={inputClass}
          >
            <option value="ink">Ink</option>
            <option value="slate">Slate</option>
            <option value="ember">Ember</option>
          </select>
        </div>
      </div>

      <label className="flex items-center gap-2.5 font-ui text-sm text-paper/80">
        <input type="checkbox" name="featured" defaultChecked={artwork?.featured} className="accent-ember" />
        Feature on homepage
      </label>

      <div>
        <label className={labelClass} htmlFor="image">
          {artwork?.image_url ? "Replace image" : "Image"}
        </label>
        <input
          id="image"
          name="image"
          type="file"
          accept="image/*"
          className="mt-2 w-full font-ui text-sm text-paper/70 file:mr-4 file:py-2 file:px-4 file:border file:border-line file:bg-transparent file:text-paper file:font-ui file:text-sm"
        />
        <p className="font-ui text-xs text-muted mt-2">
          Leave blank to keep the current placeholder image.
        </p>
      </div>

      {state.status === "error" && (
        <p className="font-ui text-sm text-ember-bright">{state.message}</p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="font-ui text-sm inline-flex items-center gap-2 bg-ember hover:bg-ember-bright disabled:opacity-60 text-ink px-6 py-3.5 transition-colors"
      >
        {pending ? "Saving…" : submitLabel}
      </button>
    </form>
  );
}
