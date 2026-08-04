# Inquisitive Arts

The gallery site and admin studio for Anugrah Mishra — rebuilt from the original
Shopify store as a standalone Next.js app, ready to deploy on Vercel with content
managed in Supabase.

## Stack

- **Next.js 16** (App Router, Turbopack, Server Actions)
- **Tailwind CSS v4** for styling, **Motion** for scroll/page animation
- **Supabase** — Postgres (artworks, press features, inquiries), Auth (admin login),
  Storage (artwork images)
- Deploys to **Vercel**, source on **GitHub**

## Running locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Without any Supabase
configuration the site runs entirely on the seed content in
`src/lib/seed-data.ts` — the public pages (Home, Gallery, About, Journal,
Contact) all work out of the box. The `/admin` dashboard is inert until
Supabase is connected (see below) — it will show a setup message instead of a
login form.

## Connecting Supabase (do this when the new Supabase project is ready)

1. Create a project at [supabase.com](https://supabase.com) (use whichever
   account/email it should live under).
2. In **Project Settings → API**, copy the Project URL and anon public key.
3. Copy `.env.local.example` to `.env.local` and fill them in:
   ```
   NEXT_PUBLIC_SUPABASE_URL=
   NEXT_PUBLIC_SUPABASE_ANON_KEY=
   ```
4. In the Supabase SQL Editor, run `supabase/migrations/0001_init.sql`, then
   `supabase/seed.sql` — this creates the `artworks`, `press_features` and
   `inquiries` tables (with row-level security policies) and a public
   `artwork-images` storage bucket, then seeds it with the same six artworks
   and press features already on the site.
5. In **Authentication → Users**, manually create one user (email + password)
   for Anugrah — this is the only account that can sign in to `/admin`. There
   is no public sign-up.
6. Restart `npm run dev`. `/admin` will now show a real login form.

Once connected, every public page automatically switches from the seed data
to live Supabase data — no code changes needed.

## The admin dashboard (`/admin`)

- Sign in with the Supabase user created above.
- **Artworks** — add, edit, delete pieces: title, medium, dimensions, year,
  description, status (available / enquire / sold), collection, featured flag,
  and an image upload (stored in Supabase Storage). Pieces without a real
  image yet show a generated placeholder tile instead of a broken image.
- **Inquiries** — every submission from the public Contact form (and the
  "Enquire about this piece" button on artwork pages) lands here with the
  visitor's name, email and message.

## Deploying (GitHub + Vercel)

1. Push this repository to the new GitHub account/repo once it exists.
2. Import the repo in Vercel.
3. Add the same `NEXT_PUBLIC_SUPABASE_URL` / `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   as Vercel Environment Variables (Project Settings → Environment Variables).
4. Deploy. No other configuration is required — there's no separate backend.

## Content notes

- Artist bio, the "Freelands Painting Prize 2024," and "The Human Current"
  mural at Jesus Green Lido are all sourced from public press coverage (AATONAU,
  Cambridge Independent, Cambridge City Council, Saatchi Art, Anglia Ruskin) —
  see the links on the `/journal` page.
- Four of the six seeded artworks (`Charlie Chaplin`, `Landscape I`,
  `Landscape II`, `Mother Teresa`) carry titles and, for Landscape II, the
  exact description from the original store. The other two are placeholders
  (`Untitled Work I` / `II`) — the original Shopify site was rate-limiting
  requests when this was built, so two product listings couldn't be recovered.
  Rename/rewrite them from `/admin` once connected.
- All artwork photography is currently a generated placeholder tile — swap in
  real images per piece from `/admin/artworks`.
- Logo: not yet added. Drop a real logomark into `src/app/layout.tsx` /
  `src/components/nav.tsx` when it's ready; the wordmark is a plain text
  placeholder for now.
