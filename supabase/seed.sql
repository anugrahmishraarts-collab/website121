-- Seed data matching src/lib/seed-data.ts, so the live site shows the same
-- content whether or not Supabase is connected yet.
-- Run after 0001_init.sql. Safe to re-run (upserts on slug).

insert into public.artworks (slug, title, year, medium, dimensions, description, status, collection, featured, sort_order, placeholder_tone)
values
  ('charlie-chaplin', 'Charlie Chaplin', '2023', 'Oil on canvas', '16 x 20 in',
   'A layered portrait study built from memory rather than photograph — Chaplin rendered less as icon than as a study in stillness, holding the same quiet the artist returns to across his interiors and figures.',
   'inquire', 'Portraits', true, 0, 'ink'),

  ('landscape-i', 'Landscape I', '2023', 'Watercolour on canvas', '16 x 24 in',
   'The first of a two-part study in atmosphere — delicate brushwork and subtle colour transitions building a landscape that reads as memory as much as place.',
   'inquire', 'Landscapes', false, 1, 'slate'),

  ('landscape-ii', 'Landscape II', '2023', 'Watercolour on canvas', '16 x 24 in',
   'This exquisite watercolour landscape captures serene natural beauty with delicate brushwork and subtle colour transitions. Printed on high-quality canvas, it offers a textured, gallery-ready finish that enhances the work''s depth and vibrancy — hand-stretched over solid wood stretcher bars with a matt finish coating.',
   'inquire', 'Landscapes', false, 2, 'slate'),

  ('mother-teresa', 'Mother Teresa', '2023', 'Oil on canvas', '16 x 20 in',
   'A restrained, devotional portrait — part of an ongoing interest in figures who carry public weight, painted with the same interiority the artist brings to his refugee-crisis work.',
   'inquire', 'Portraits', true, 3, 'ink'),

  ('untitled-i', 'Untitled Work I', '2023', 'Oil and acrylic on canvas', 'TBC',
   'Placeholder entry — title, medium and description to be confirmed and updated via the admin dashboard once the original listing is recovered.',
   'inquire', 'Studies', false, 4, 'ember'),

  ('untitled-ii', 'Untitled Work II', '2023', 'Oil and acrylic on canvas', 'TBC',
   'Placeholder entry — title, medium and description to be confirmed and updated via the admin dashboard once the original listing is recovered.',
   'inquire', 'Studies', false, 5, 'ember')
on conflict (slug) do update set
  title = excluded.title,
  description = excluded.description;

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
