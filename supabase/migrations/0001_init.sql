-- Inquisitive Arts — initial schema
-- Run in the Supabase SQL editor, or via `supabase db push` once the project is linked.

create extension if not exists "pgcrypto";

create table if not exists public.artworks (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  year text,
  medium text,
  dimensions text,
  description text not null default '',
  status text not null default 'inquire' check (status in ('available', 'inquire', 'sold')),
  collection text,
  image_url text,
  featured boolean not null default false,
  sort_order integer not null default 0,
  placeholder_tone text not null default 'ink' check (placeholder_tone in ('ember', 'slate', 'ink')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.press_features (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  publication text not null,
  url text not null,
  excerpt text not null default '',
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.inquiries (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  message text not null,
  artwork_id uuid references public.artworks(id) on delete set null,
  artwork_title text,
  created_at timestamptz not null default now()
);

create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists artworks_set_updated_at on public.artworks;
create trigger artworks_set_updated_at
  before update on public.artworks
  for each row execute function public.set_updated_at();

-- Admin allowlist. Supabase Auth permits public signup by default, so "is
-- this user authenticated at all" is NOT the same as "is this user allowed
-- to manage the site" — every write policy below must check membership
-- here, not just the authenticated role.
create table if not exists public.admins (
  user_id uuid primary key references auth.users(id) on delete cascade,
  email text,
  created_at timestamptz not null default now()
);

alter table public.admins enable row level security;

-- Nobody reads/writes this table over the API — only via the SQL editor
-- (service role bypasses RLS anyway) and the is_admin() function below,
-- which runs as the function owner (security definer) rather than the
-- calling user, so it does not itself require a policy to succeed.
create policy "No client access to admins" on public.admins
  for all to anon, authenticated using (false) with check (false);

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (select 1 from public.admins where user_id = auth.uid());
$$;

-- Row Level Security
alter table public.artworks enable row level security;
alter table public.press_features enable row level security;
alter table public.inquiries enable row level security;

-- Public (anon + authenticated) can read artworks and press features.
create policy "Public can read artworks" on public.artworks
  for select using (true);

create policy "Public can read press features" on public.press_features
  for select using (true);

-- Only rows in public.admins can write — being merely "authenticated"
-- (e.g. a self-signed-up visitor) is not sufficient.
create policy "Admins can insert artworks" on public.artworks
  for insert to authenticated with check (public.is_admin());

create policy "Admins can update artworks" on public.artworks
  for update to authenticated using (public.is_admin()) with check (public.is_admin());

create policy "Admins can delete artworks" on public.artworks
  for delete to authenticated using (public.is_admin());

create policy "Admins can manage press features" on public.press_features
  for all to authenticated using (public.is_admin()) with check (public.is_admin());

-- Anyone can submit an inquiry, but only an admin can read them back —
-- inquiries contain a visitor's name/email/message, so this is the
-- policy that protects that PII.
create policy "Public can submit inquiries" on public.inquiries
  for insert to anon, authenticated with check (true);

create policy "Admins can read inquiries" on public.inquiries
  for select to authenticated using (public.is_admin());

create policy "Admins can delete inquiries" on public.inquiries
  for delete to authenticated using (public.is_admin());

-- Public storage bucket for artwork images, uploaded via the admin dashboard.
insert into storage.buckets (id, name, public)
values ('artwork-images', 'artwork-images', true)
on conflict (id) do nothing;

create policy "Public can view artwork images" on storage.objects
  for select using (bucket_id = 'artwork-images');

create policy "Admins can upload artwork images" on storage.objects
  for insert to authenticated with check (bucket_id = 'artwork-images' and public.is_admin());

create policy "Admins can update artwork images" on storage.objects
  for update to authenticated using (bucket_id = 'artwork-images' and public.is_admin());

create policy "Admins can delete artwork images" on storage.objects
  for delete to authenticated using (bucket_id = 'artwork-images' and public.is_admin());

-- ── One-time setup, after this migration runs ──────────────────────────
-- 1. In the Supabase dashboard: Authentication → Providers → Email, turn
--    OFF "Allow new users to sign up". This is a single-admin site; the
--    only account should be the one you create manually in step 2.
-- 2. Authentication → Users → Add user, create the admin's login
--    (email + password), then copy their User UID.
-- 3. Run, with that UID:
--      insert into public.admins (user_id, email)
--      values ('<paste-user-uid-here>', '<their-email>');
