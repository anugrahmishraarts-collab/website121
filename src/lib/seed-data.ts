// Seed content for Inquisitive Arts rebuild.
// Bio + mural + press facts sourced from: AATONAU interview ("Between Stillness and
// Survival"), Cambridge Independent, Cambridge City Council news, Anglia Ruskin
// Creative Showcase, Saatchi Art artist profile, Freelands Foundation / ArtRabbit.
// Artwork titles "Charlie Chaplin", "Landscape I", "Landscape II", "Mother Teresa" are
// carried over from the live inquisitivearts.com store. Two of the six product slugs
// (canvas, canvas-3 or canvas-4) could not be matched to a title before the old site's
// rate limit kicked in, so two entries below are placeholders — rename via /admin.

export type Artwork = {
  slug: string;
  title: string;
  year: string;
  medium: string;
  dimensions: string;
  description: string;
  status: "available" | "inquire" | "sold";
  collection: string;
  featured: boolean;
  placeholderTone: "ember" | "slate" | "ink";
};

export const artworks: Artwork[] = [
  {
    slug: "charlie-chaplin",
    title: "Charlie Chaplin",
    year: "2023",
    medium: "Oil on canvas",
    dimensions: "16 × 20 in",
    description:
      "A layered portrait study built from memory rather than photograph — Chaplin rendered less as icon than as a study in stillness, holding the same quiet the artist returns to across his interiors and figures.",
    status: "inquire",
    collection: "Portraits",
    featured: true,
    placeholderTone: "ink",
  },
  {
    slug: "landscape-i",
    title: "Landscape I",
    year: "2023",
    medium: "Watercolour on canvas",
    dimensions: "16 × 24 in",
    description:
      "The first of a two-part study in atmosphere — delicate brushwork and subtle colour transitions building a landscape that reads as memory as much as place.",
    status: "inquire",
    collection: "Landscapes",
    featured: false,
    placeholderTone: "slate",
  },
  {
    slug: "landscape-ii",
    title: "Landscape II",
    year: "2023",
    medium: "Watercolour on canvas",
    dimensions: "16 × 24 in",
    description:
      "This exquisite watercolour landscape captures serene natural beauty with delicate brushwork and subtle colour transitions. Printed on high-quality canvas, it offers a textured, gallery-ready finish that enhances the work's depth and vibrancy — hand-stretched over solid wood stretcher bars with a matt finish coating.",
    status: "inquire",
    collection: "Landscapes",
    featured: false,
    placeholderTone: "slate",
  },
  {
    slug: "mother-teresa",
    title: "Mother Teresa",
    year: "2023",
    medium: "Oil on canvas",
    dimensions: "16 × 20 in",
    description:
      "A restrained, devotional portrait — part of an ongoing interest in figures who carry public weight, painted with the same interiority the artist brings to his refugee-crisis work.",
    status: "inquire",
    collection: "Portraits",
    featured: true,
    placeholderTone: "ink",
  },
  {
    slug: "untitled-i",
    title: "Untitled Work I",
    year: "2023",
    medium: "Oil and acrylic on canvas",
    dimensions: "TBC",
    description:
      "Placeholder entry — title, medium and description to be confirmed and updated via the admin dashboard once the original listing is recovered.",
    status: "inquire",
    collection: "Studies",
    featured: false,
    placeholderTone: "ember",
  },
  {
    slug: "untitled-ii",
    title: "Untitled Work II",
    year: "2023",
    medium: "Oil and acrylic on canvas",
    dimensions: "TBC",
    description:
      "Placeholder entry — title, medium and description to be confirmed and updated via the admin dashboard once the original listing is recovered.",
    status: "inquire",
    collection: "Studies",
    featured: false,
    placeholderTone: "ember",
  },
];

export const bio = {
  name: "Anugrah Mishra",
  location: "London, United Kingdom",
  statement:
    "Anugrah Mishra is a London-based contemporary painter whose work explores migration, displacement and the psychological realities of people affected by conflict, exile and forced movement. Rather than document the refugee crisis, his paintings approach it through a psychological lens — recurring motifs of interiors, liminal spaces, abandoned rooms and birds function as metaphors for memory and fractured identity, drawing on atmosphere, silence, domestic objects and archetypal references from psychoanalysis, the Ramayana and the Mahabharata.",
  quote:
    "Painting offers something that film cannot: stillness. It resists the momentum of the narrative and compels the viewer to linger.",
  timeline: [
    {
      year: "Age 8",
      text: "Paints a portrait of Lord Hanuman in India — his first significant artwork.",
    },
    {
      year: "Age 16",
      text: "Decides to pursue art professionally, studying classical masters (Ravi Varma, da Vinci, Rembrandt) alongside Van Gogh and Picasso.",
    },
    {
      year: "Mumbai",
      text: "Completes a foundation course in Fine Art at NJ School of Art.",
    },
    {
      year: "Cambridge",
      text: "Relocates to the UK during the pandemic to study BA (Hons) Fine Art at Cambridge School of Art, Anglia Ruskin University, under mentors including Probir Ghosh and Benet Spencer.",
    },
    {
      year: "2024",
      text: "Wins the Freelands Painting Prize 2024, exhibiting at Freelands Foundation, London.",
    },
    {
      year: "2025–26",
      text: "Completes “The Human Current,” a 120 square-metre public mural at Jesus Green Lido, commissioned by Cambridge City Council.",
    },
  ],
};

export const mural = {
  title: "The Human Current",
  location: "Jesus Green Lido, Cambridge",
  commissioner: "Cambridge City Council",
  size: "120 square metres",
  description:
    "Painted across wooden fencing and curved architectural surfaces along the lido's path, The Human Current responds to the site's relationship with water, movement and communal life. Abstracted human figures move through layered bands of blue and green, referencing both the River Cam and the experience of outdoor swimming — simplified figures acting as shared symbols of motion, wellbeing and collective presence rather than individual portraits. The commission began with Jesus Green Lido assistant manager Annabel Wright, who was looking for a positive response to persistent graffiti on the pathway walls, and, after researching artists, connected with Anugrah — who had studied at Anglia Ruskin University nearby.",
  quote:
    "The work is designed to be encountered in passing by walkers, cyclists and swimmers, unfolding gradually along the length of the site.",
};

export const press = [
  {
    title: "Anugrah Mishra: Between Stillness and Survival",
    publication: "AATONAU",
    url: "https://aatonau.com/anugrah-mishra-between-stillness-and-survival/",
    excerpt:
      "An in-depth interview on painting the refugee crisis through stillness rather than spectacle, and the mentors and training behind the work.",
  },
  {
    title: "Artist completes 120 square metre mural at Jesus Green Lido",
    publication: "Cambridge Independent",
    url: "https://www.cambridgeindependent.co.uk/news/artist-completes-120-square-metre-mural-at-jesus-green-lido-9447429/",
    excerpt:
      "Coverage of “The Human Current,” commissioned by Cambridge City Council to transform a graffiti-prone pathway into a public artwork.",
  },
  {
    title: "New mural at Jesus Green Lido celebrates Cambridge's connection to water",
    publication: "Cambridge City Council",
    url: "https://cambridge.gov.uk/news/2025/12/30/new-mural-at-jesus-green-lido-celebrates-cambridges-connection-to-water",
    excerpt: "The council's own announcement of the completed commission.",
  },
  {
    title: "Freelands Painting Prize 2024",
    publication: "Freelands Foundation",
    url: "https://www.artrabbit.com/events/freelands-painting-prize-2024",
    excerpt:
      "Exhibition listing for the 2024 prize, awarded annually to an outstanding undergraduate painter nominated by their institution.",
  },
  {
    title: "Anugrah Mishra — Digital Showcase",
    publication: "Anglia Ruskin Creative Showcase",
    url: "https://creativeshowcase.aru.ac.uk/showcase/digitalshowcase/2024/anugrah-mishra",
    excerpt: "Graduate showcase profile from Cambridge School of Art.",
  },
  {
    title: "Anugrah Mishra — Artist Profile",
    publication: "Saatchi Art",
    url: "https://www.saatchiart.com/anugrahmishra",
    excerpt: "Artist profile and available works.",
  },
];
