-- Seed data matching src/lib/seed-data.ts, so the live site shows the same
-- content whether or not Supabase is connected yet.
-- Run after 0001_init.sql. Safe to re-run (upserts on slug).

insert into public.artworks (slug, title, year, medium, dimensions, description, status, collection, image_url, featured, sort_order, placeholder_tone)
values
  ('the-unseen-guide', 'The Unseen Guide', '2026', 'Acrylic and oil on canvas', '156 × 170 cm',
   'The Krishna archetype becomes a psychological presence rather than a literal religious figure. An open chest, a barren tree and a luminous atmosphere suggest memory, inheritance and the quiet forms of guidance that remain when the external world offers no clear direction.',
   'inquire', 'Refugee Crisis Series', '/artworks/the-unseen-guide.webp', true, 0, 'slate'),

  ('stolen-home', 'Stolen Home — Sita Archetype', '2026', 'Acrylic and oil on canvas', '155 × 170 cm',
   'The Sita archetype becomes a framework for displacement, protection and the wound of separation from home. The seated figure, charged boundary and unstable atmosphere hold vulnerability, endurance and the fragile persistence of dignity.',
   'inquire', 'Refugee Crisis Series', '/artworks/stolen-home.webp', true, 1, 'ember'),

  ('moral-integrity', 'Moral Integrity — Rama Archetype', '2026', 'Acrylic and oil on canvas', '155 × 170 cm',
   'A solitary figure moves through an uncertain threshold while fading footsteps, shadow and an abandoned chair turn exile into an ethical passage. The work considers the quiet strength required to preserve dignity and direction under pressure.',
   'inquire', 'Refugee Crisis Series', '/artworks/moral-integrity.webp', false, 2, 'ink'),

  ('resilience-and-dreams', 'Resilience and Dreams', '2024', 'Acrylic and oil on canvas', '200 × 250 cm',
   'Hope is placed under pressure inside an unstable interior. A window, cage, chain, figures and architectural fragments hold the possibility of future life within the material and psychological conditions of confinement and loss.',
   'inquire', 'Refugee Crisis Series', '/artworks/resilience-and-dreams.webp', true, 3, 'ink'),

  ('resettlement', 'Resettlement', '2024', 'Acrylic and oil on canvas', '160 × 170 cm',
   'An emptied room becomes a psychological site of arrival. Clothing, worn surfaces, light and silence suggest how displacement continues inside domestic space, where physical safety may return before a sense of belonging does.',
   'inquire', 'Refugee Crisis Series', '/artworks/resettlement.webp', false, 4, 'slate'),

  ('loss-and-trauma', 'Loss and Trauma', '2024', 'Acrylic and oil on canvas', '155 × 170 cm',
   'Two figures are held inside a dark and unstable psychological environment. Concealed faces, compressed posture and surrounding forms shift attention from a single political event to the exhaustion, memory and inner rupture carried after displacement.',
   'inquire', 'Refugee Crisis Series', '/artworks/loss-and-trauma.webp', false, 5, 'ember'),

  ('isolation', 'Isolation', '2025', 'Acrylic and charcoal on canvas', '155 × 170 cm',
   'A silhouetted figure is compressed inside a field of pressured yellow light and darkness. The painting gives form to psychological enclosure, turning isolation into a bodily and atmospheric condition rather than a simple absence of company.',
   'inquire', 'Refugee Crisis Series', '/artworks/isolation.webp', false, 6, 'ember')
on conflict (slug) do update set
  title = excluded.title,
  year = excluded.year,
  medium = excluded.medium,
  dimensions = excluded.dimensions,
  description = excluded.description,
  status = excluded.status,
  collection = excluded.collection,
  image_url = excluded.image_url,
  featured = excluded.featured,
  sort_order = excluded.sort_order,
  placeholder_tone = excluded.placeholder_tone;

insert into public.press_features (title, publication, url, excerpt, sort_order)
values
  ('Anugrah Mishra: Between Stillness and Survival', 'AATONAU',
   'https://aatonau.com/anugrah-mishra-between-stillness-and-survival/',
   'An in-depth interview on painting the refugee crisis through stillness rather than spectacle, and the mentors and training behind the work.', 0),

  ('Artist completes 120 square metre mural at Jesus Green Lido', 'Cambridge Independent',
   'https://www.cambridgeindependent.co.uk/news/artist-completes-120-square-metre-mural-at-jesus-green-lido-9447429/',
   'Coverage of "The Human Current," commissioned by Cambridge City Council to transform a graffiti-prone pathway into a public artwork.', 1),

  ('New mural at Jesus Green Lido celebrates Cambridge''s connection to water', 'Cambridge City Council',
   'https://cambridge.gov.uk/news/2025/12/30/new-mural-at-jesus-green-lido-celebrates-cambridges-connection-to-water',
   'The council''s own announcement of the completed commission.', 2),

  ('Freelands Painting Prize 2024', 'Freelands Foundation',
   'https://www.artrabbit.com/events/freelands-painting-prize-2024',
   'Exhibition listing for the 2024 prize, awarded annually to an outstanding undergraduate painter nominated by their institution.', 3),

  ('Anugrah Mishra — Digital Showcase', 'Anglia Ruskin Creative Showcase',
   'https://creativeshowcase.aru.ac.uk/showcase/digitalshowcase/2024/anugrah-mishra',
   'Graduate showcase profile from Cambridge School of Art.', 4),

  ('Anugrah Mishra — Artist Profile', 'Saatchi Art',
   'https://www.saatchiart.com/anugrahmishra',
   'Artist profile and available works.', 5)
on conflict do nothing;
