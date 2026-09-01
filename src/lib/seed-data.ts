// Canonical public content for Inquisitive Arts.
// Bio + mural + press facts sourced from: AATONAU interview ("Between Stillness and
// Survival"), Cambridge Independent, Cambridge City Council news, Anglia Ruskin
// Creative Showcase, Saatchi Art artist profile, Freelands Foundation / ArtRabbit.
// The artwork entries below include Anugrah Mishra's ongoing refugee-crisis series
// and a selected group of earlier portraits, landscapes and studies.

export type Artwork = {
  slug: string;
  title: string;
  year: string;
  medium: string;
  dimensions: string;
  description: string;
  status: "available" | "inquire" | "sold";
  collection: string;
  imageUrl: string;
  featured: boolean;
  placeholderTone: "ember" | "slate" | "ink";
};

export const artworks: Artwork[] = [
  {
    slug: "the-unseen-guide",
    title: "The Unseen Guide",
    year: "2026",
    medium: "Acrylic and oil on canvas",
    dimensions: "156 × 170 cm",
    description:
      "The Krishna archetype becomes a psychological presence rather than a literal religious figure. An open chest, a barren tree and a luminous atmosphere suggest memory, inheritance and the quiet forms of guidance that remain when the external world offers no clear direction.",
    status: "inquire",
    collection: "Refugee Crisis Series",
    imageUrl: "/artworks/the-unseen-guide.webp",
    featured: true,
    placeholderTone: "slate",
  },
  {
    slug: "stolen-home",
    title: "Stolen Home — Sita Archetype",
    year: "2026",
    medium: "Acrylic and oil on canvas",
    dimensions: "155 × 170 cm",
    description:
      "The Sita archetype becomes a framework for displacement, protection and the wound of separation from home. The seated figure, charged boundary and unstable atmosphere hold vulnerability, endurance and the fragile persistence of dignity.",
    status: "inquire",
    collection: "Refugee Crisis Series",
    imageUrl: "/artworks/stolen-home.webp",
    featured: true,
    placeholderTone: "ember",
  },
  {
    slug: "moral-integrity",
    title: "Moral Integrity — Rama Archetype",
    year: "2026",
    medium: "Acrylic and oil on canvas",
    dimensions: "155 × 170 cm",
    description:
      "A solitary figure moves through an uncertain threshold while fading footsteps, shadow and an abandoned chair turn exile into an ethical passage. The work considers the quiet strength required to preserve dignity and direction under pressure.",
    status: "inquire",
    collection: "Refugee Crisis Series",
    imageUrl: "/artworks/moral-integrity.webp",
    featured: false,
    placeholderTone: "ink",
  },
  {
    slug: "resilience-and-dreams",
    title: "Resilience and Dreams",
    year: "2024",
    medium: "Acrylic and oil on canvas",
    dimensions: "200 × 250 cm",
    description:
      "Hope is placed under pressure inside an unstable interior. A window, cage, chain, figures and architectural fragments hold the possibility of future life within the material and psychological conditions of confinement and loss.",
    status: "inquire",
    collection: "Refugee Crisis Series",
    imageUrl: "/artworks/resilience-and-dreams.webp",
    featured: true,
    placeholderTone: "ink",
  },
  {
    slug: "resettlement",
    title: "Resettlement",
    year: "2024",
    medium: "Acrylic and oil on canvas",
    dimensions: "160 × 170 cm",
    description:
      "An emptied room becomes a psychological site of arrival. Clothing, worn surfaces, light and silence suggest how displacement continues inside domestic space, where physical safety may return before a sense of belonging does.",
    status: "inquire",
    collection: "Refugee Crisis Series",
    imageUrl: "/artworks/resettlement.webp",
    featured: false,
    placeholderTone: "slate",
  },
  {
    slug: "loss-and-trauma",
    title: "Loss and Trauma",
    year: "2024",
    medium: "Acrylic and oil on canvas",
    dimensions: "155 × 170 cm",
    description:
      "Two figures are held inside a dark and unstable psychological environment. Concealed faces, compressed posture and surrounding forms shift attention from a single political event to the exhaustion, memory and inner rupture carried after displacement.",
    status: "inquire",
    collection: "Refugee Crisis Series",
    imageUrl: "/artworks/loss-and-trauma.webp",
    featured: false,
    placeholderTone: "ember",
  },
  {
    slug: "isolation",
    title: "Isolation",
    year: "2025",
    medium: "Acrylic and charcoal on canvas",
    dimensions: "155 × 170 cm",
    description:
      "A silhouetted figure is compressed inside a field of pressured yellow light and darkness. The painting gives form to psychological enclosure, turning isolation into a bodily and atmospheric condition rather than a simple absence of company.",
    status: "inquire",
    collection: "Refugee Crisis Series",
    imageUrl: "/artworks/isolation.webp",
    featured: false,
    placeholderTone: "ember",
  },
  {
    slug: "charlie-chaplin",
    title: "Charlie Chaplin",
    year: "2018",
    medium: "Ink and wash",
    dimensions: "16 × 20 in",
    description:
      "A high-contrast monochrome portrait that captures Chaplin through concentrated shadow, expressive brushwork and the unmistakable geometry of his screen persona.",
    status: "inquire",
    collection: "Portraits",
    imageUrl: "/artworks/charlie-chaplin.webp",
    featured: false,
    placeholderTone: "ink",
  },
  {
    slug: "mother-teresa",
    title: "Mother Teresa",
    year: "2019",
    medium: "Watercolour",
    dimensions: "16 × 20 in",
    description:
      "A contemplative profile with hands joined in prayer. Soft washes and restrained colour place emphasis on the sitter's stillness, humility and inward attention.",
    status: "inquire",
    collection: "Portraits",
    imageUrl: "/artworks/mother-teresa.webp",
    featured: false,
    placeholderTone: "slate",
  },
  {
    slug: "sherlock-holmes",
    title: "Sherlock Holmes — The Violinist",
    year: "2019",
    medium: "Acrylic on canvas",
    dimensions: "TBC",
    description:
      "Sherlock Holmes is presented through his violin, emerging from a dark interior of saturated red, amber and black. The instrument becomes both clue and psychological portrait.",
    status: "inquire",
    collection: "Portraits",
    imageUrl: "/artworks/sherlock-holmes.webp",
    featured: false,
    placeholderTone: "ember",
  },
  {
    slug: "riverside-settlement",
    title: "Riverside Settlement",
    year: "",
    medium: "Watercolour and ink",
    dimensions: "16 × 24 in",
    description:
      "A cluster of corrugated roofs and a moored boat are assembled through quick washes and dark structural marks, balancing domestic shelter with the movement of water.",
    status: "inquire",
    collection: "Landscapes",
    imageUrl: "/artworks/riverside-settlement.webp",
    featured: false,
    placeholderTone: "slate",
  },
  {
    slug: "the-flux",
    title: "The Flux",
    year: "2017",
    medium: "Oil on canvas",
    dimensions: "TBC",
    description:
      "A wide waterfall fills the composition with repeated vertical currents. Cool blues and luminous white turn falling water into a study of continuous movement and change.",
    status: "inquire",
    collection: "Landscapes",
    imageUrl: "/artworks/the-flux.webp",
    featured: false,
    placeholderTone: "slate",
  },
  {
    slug: "house-by-the-water",
    title: "House by the Water",
    year: "2017",
    medium: "Watercolour",
    dimensions: "16 × 24 in",
    description:
      "A bright house and its reflection anchor a quiet waterside landscape. Open paper, translucent colour and broken reflections create an atmosphere of calm and distance.",
    status: "inquire",
    collection: "Landscapes",
    imageUrl: "/artworks/house-by-the-water.webp",
    featured: false,
    placeholderTone: "slate",
  },
  {
    slug: "still-life-with-bottles",
    title: "Still Life with Bottles",
    year: "2020",
    medium: "Mixed media",
    dimensions: "TBC",
    description:
      "Glass bottles and preserving jars are arranged against a deep black field. Reflections, lettering and changes of scale turn familiar containers into a study of transparency and weight.",
    status: "inquire",
    collection: "Studies",
    imageUrl: "/artworks/still-life-with-bottles.webp",
    featured: false,
    placeholderTone: "ink",
  },
  {
    slug: "the-lesson",
    title: "The Lesson",
    year: "",
    medium: "Ink on paper",
    dimensions: "TBC",
    description:
      "A densely worked interior brings three figures together through costume, gesture and an array of surrounding objects. Precise line and cross-hatching give the scene a theatrical, narrative tension.",
    status: "inquire",
    collection: "Studies",
    imageUrl: "/artworks/the-lesson.webp",
    featured: false,
    placeholderTone: "ink",
  },
  {
    slug: "figure-in-motion",
    title: "Figure in Motion",
    year: "",
    medium: "Acrylic on canvas",
    dimensions: "TBC",
    description:
      "A bent figure emerges from sweeping arcs of gold, white and blue. Thick impasto and circular movement hold the body between physical effort, vulnerability and momentum.",
    status: "inquire",
    collection: "Studies",
    imageUrl: "/artworks/figure-in-motion.webp",
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

export const refugeeSeriesStatement = [
  "My painting practice explores the inner life of displacement — how political rupture becomes psychological experience. Working at large scale and through layered, gestural surfaces, I use symbolism and archetypal imagery to make visible what is often unspoken: grief, survival, fractured identity, and the quiet endurance of the body under pressure.",
  "The refugee crisis sits at the centre of my current work. Rather than illustrating events, I build emotional landscapes where figures carry memory, loss, and resilience through colour, texture, and recurring motifs. I am drawn to the point where personal history meets collective reality — where a single face or posture can hold the weight of a wider humanitarian condition.",
  "Painting, for me, is both excavation and offering: a way to invite empathy without simplifying complexity. Each canvas becomes a site of dialogue, asking viewers to look longer, feel more carefully, and recognise the shared humanity that persists even in exile.",
];

export const mural = {
  title: "The Human Current",
  year: "2025",
  location: "Jesus Green Lido, Cambridge",
  commissioner: "Cambridge City Council",
  size: "120 square metres",
  description:
    "Painted across wooden fencing and curved architectural surfaces along the lido's path, The Human Current responds to the site's relationship with water, movement and communal life. Abstracted human figures move through layered bands of blue and green, referencing both the River Cam and the experience of outdoor swimming — simplified figures acting as shared symbols of motion, wellbeing and collective presence rather than individual portraits. The commission began with Jesus Green Lido assistant manager Annabel Wright, who was looking for a positive response to persistent graffiti on the pathway walls, and, after researching artists, connected with Anugrah — who had studied at Anglia Ruskin University nearby.",
  quote:
    "The work is designed to be encountered in passing by walkers, cyclists and swimmers, unfolding gradually along the length of the site.",
  images: [
    {
      src: "/mural/the-human-current-lido-sign.webp",
      alt: "The Human Current mural with the Jesus Green Lido name and a swimmer moving through blue currents",
    },
    {
      src: "/mural/the-human-current-pool-panel.webp",
      alt: "Painted pool scene with yellow swimmers at Jesus Green Lido",
    },
    {
      src: "/mural/the-human-current-swimmer-detail.webp",
      alt: "Close view of a green swimmer moving through layered blue currents",
    },
    {
      src: "/mural/the-human-current-building-wrap.webp",
      alt: "The Human Current flowing around the lido building",
    },
    {
      src: "/mural/the-human-current-pool-view.webp",
      alt: "Pool section of The Human Current seen along the Jesus Green Lido path",
    },
    {
      src: "/mural/the-human-current-round-wall.webp",
      alt: "Curved end wall painted with a figure rising through blue and green waves",
    },
  ],
};

export const upcomingProjects = [
  {
    date: "11–24 September 2026",
    title: "AA2A Exhibition",
    location: "Ruskin Gallery · Cambridge",
    status: "Upcoming",
    description:
      "A group exhibition marking the culmination of the AA2A Artist Residency at Cambridge School of Art, bringing together new work from the 2025–26 programme.",
  },
  {
    date: "2026",
    title: "Angerstein Flyover Mural",
    location: "Greenwich · London",
    status: "In development",
    description:
      "A commissioned public artwork under the Angerstein Flyover, tracing a visual current from historic East Greenwich to the contemporary Peninsula.",
  },
  {
    date: "Dates to be announced",
    title: "Solo Exhibition",
    location: "London",
    status: "In development",
    description:
      "A solo presentation of the Refugee Crisis Series and new paintings examining displacement, memory and psychological space.",
  },
];

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
