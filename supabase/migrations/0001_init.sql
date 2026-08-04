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

-- Row Level Security
alter table public.artworks enable row level security;
alter table public.press_features enable row level security;
alter table public.inquiries enable row level security;

-- Public (anon + authenticated) can read artworks and press features.
create policy "Public can read artworks" on public.artworks
  for select using (true);

create policy "Public can read press features" on public.press_features
  for select using (true);

-- Only authenticated users (the admin account) can write.
create policy "Authenticated can insert artworks" on public.artworks
  for insert to authenticated with check (true);

create policy "Authenticated can update artworks" on public.artworks
  for update to authenticated using (true) with check (true);

create policy "Authenticated can delete artworks" on public.artworks
  for delete to authenticated using (true);

create policy "Authenticated can manage press features" on public.press_features
  for all to authenticated using (true) with check (true);

-- Anyone can submit an inquiry, but only the admin can read them back.
create policy "Public can submit inquiries" on public.inquiries
  for insert to anon, authenticated with check (true);

create policy "Authenticated can read inquiries" on public.inquiries
  for select to authenticated using (true);

create policy "Authenticated can delete inquiries" on public.inquiries
  for delete to authenticated using (true);

-- Public storage bucket for artwork images, uploaded via the admin dashboard.
insert into storage.buckets (id, name, public)
values ('artwork-images', 'artwork-images', true)
on conflict (id) do nothing;

create policy "Public can view artwork images" on storage.objects
  for select using (bucket_id = 'artwork-images');

create policy "Authenticated can upload artwork images" on storage.objects
  for insert to authenticated with check (bucket_id = 'artwork-images');

create policy "Authenticated can update artwork images" on storage.objects
  for update to authenticated using (bucket_id = 'artwork-images');

create policy "Authenticated can delete artwork images" on storage.objects
  for delete to authenticated using (bucket_id = 'artwork-images');
