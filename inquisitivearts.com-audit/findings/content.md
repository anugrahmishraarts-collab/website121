# Content Quality / E-E-A-T Audit — inquisitivearts.com

**Scope:** Content quality, E-E-A-T signals, product description depth, readability, blog/content-strategy gap.
**Method:** Direct HTTP retrieval of live pages. **Access note:** inquisitivearts.com (Cloudflare/Shopify) returned HTTP 429 (rate-limited) for the large majority of storefront page requests throughout this audit window, almost certainly because several parallel specialist audits were hitting the same origin concurrently. One product page (`/products/canvas-5`) was retrieved in full before the block took effect, along with `robots.txt`, `llms.txt`, `agents.md`, and the UCP discovery endpoint. `/pages/about-us`, `/pages/artists`, `/pages/portfolio`, `/pages/contact`, and other product pages (`canvas` through `canvas-4`) could **not** be directly retrieved despite ~15 minutes of retries via two independent tools. Their existence is confirmed via the site's own navigation markup (harvested from the canvas-5 page), but their body copy is assessed only indirectly below. This is flagged explicitly wherever it affects confidence.

---

## Finding 1: Product descriptions are thin, generic, and not story-driven despite an "artist gallery" positioning

**Severity:** High

**Evidence:** Full retrieved copy for `/products/canvas-5` ("Landscape II- Anugrah Mishra", £40.00 GBP):

> "This exquisite watercolor landscape print by Anugrah Mishra captures serene natural beauty with delicate brushwork and subtle color transitions. Printed on high-quality canvas, it offers a textured, gallery-ready finish that enhances the artwork's depth and vibrancy. Ideal for collectors and art enthusiasts, this piece brings a refined, tranquil atmosphere to any space.
>
> Looking to add a little flair to your room or office? Look no further – this canvas has a vivid, fade-resistant print that you're bound to fall in love with.
> • Fade resistant • 20.5 mil thick poly-cotton blend canvas • Hand-stretched over solid wood stretcher bars • Matt finish coating"

Total description word count: **~99 words** (well under this framework's 300-400 word floor for product pages, and far under what a gallery-style print deserves). The second paragraph ("Looking to add a little flair to your room or office? Look no further...") is stock print-on-demand marketing copy, not specific to this artwork — it reads as boilerplate that could be pasted onto any canvas print listing. There is:
- No mention of the actual dimensions/size options (no variant selector was present on this product — appears to be a single fixed size, but the size itself, e.g. inches/cm, is never stated in the visible copy, only inferable from the image filename `16x24`).
- No story behind the piece (when/where painted, inspiration, medium detail beyond "watercolor," edition info).
- No care instructions beyond the single generic bullet list.
- Title format is templated: "[Piece name]- Anugrah Mishra" repeated as the product title, alt text, and JSON-LD name — the artist's name functions as a keyword tag rather than part of a narrative.

**Recommendation:** Write unique, substantive descriptions per product (300-500 words): the story/inspiration behind each piece, the original medium and process, precise print dimensions and paper/canvas options, and a personal note from the artist. This is the single highest-leverage content fix for both conventional SEO (thin content risk) and AI citability (generic copy gives an LLM nothing quotable or unique to cite).

---

## Finding 2: About/Artist/Portfolio page content could not be verified directly — treat as an open risk pending confirmation

**Severity:** Medium (informational risk — verify directly)

**Evidence:** The site's own navigation (extracted from the canvas-5 page HTML) confirms `/pages/about-us`, `/pages/artists`, `/pages/portfolio`, and `/pages/contact` exist as live pages, so the *structure* for E-E-A-T content is in place. However, persistent 429 responses prevented direct retrieval of their body copy in this session, so I cannot confirm word count, depth of the artist's stated credentials/experience, or whether real biographical/training/exhibition history is present versus a stub page.

Two things support treating this as a real (not just access) risk rather than a formality:
1. The one page I could fully inspect (a product page) uses generic, non-personalized dropship-style copy despite prominently featuring the artist's name — suggesting the site's content approach elsewhere may lean templated rather than bespoke.
2. The product's legal/compliance block (see Finding 4) reveals the store is legally operated through third-party entities ("Oak inc." and "SINDEN VENTURES LIMITED", Cyprus), which is common for print-on-demand/dropship storefronts and raises the question of how much of the "artist gallery" narrative is substantiated with real first-hand experience content (photos of the artist working, exhibition history, press) versus a storefront skin.

**Recommendation:** Directly audit `/pages/about-us` and `/pages/artists` for: (a) a clear, specific artist bio — training, years active, exhibitions, medium expertise, physical location in the UK; (b) at least one first-person photo or process shot; (c) concrete, checkable facts (not just "passionate artist" language). If these pages are already strong, this finding downgrades to Info; if they're thin/templated like the product copy, this becomes a High-severity E-E-A-T gap for a site whose entire value proposition rests on the credibility of a named living artist.

---

## Finding 3: No blog / story-driven content — missed content-strategy opportunity for an art gallery

**Severity:** Medium

**Evidence:** `/blog` and `/blogs` both returned HTTP 404 (confirmed directly, not rate-limited). `llms.txt`/`agents.md` also list no blog among the store's content surfaces. The site's own agent-facing documentation only points AI agents to product/collection/policy JSON endpoints — no editorial content endpoint exists at all.

**Recommendation:** An art gallery is one of the strongest natural fits for blog/story content: pieces' inspiration stories, behind-the-scenes process posts, "how to choose art for your space" guides, artist interviews, exhibition/collection launch posts. This is both a topical-authority/E-E-A-T lever (demonstrates real expertise and experience) and a GEO lever (unique, citable, first-person content that generic product copy cannot provide — see geo.md). Currently the store has zero long-form content surface.

---

## Finding 4: Unfilled template placeholder text live in product legal/compliance copy

**Severity:** Medium (trust/professionalism signal, not just cosmetic)

**Evidence:** Verbatim from the live `/products/canvas-5` page, inside the visible product description:

> "In compliance with the General Product Safety Regulation (GPSR), **Oak inc.** and **SINDEN VENTURES LIMITED** ensure that all consumer products offered are safe and meet EU standards... You can also write to us at **123 Main Street, Anytown, Country** or **Markou Evgenikou 11, Mesa Geitonia, 4002, Limassol, Cyprus.**"

"123 Main Street, Anytown, Country" is an unmistakable unfilled placeholder address — literally template boilerplate text ("Anytown, Country") — left live and visible to customers on a product page that also carries legal significance (GPSR compliance). This is the kind of detail a careful human reader (or an AI system extracting factual claims about the business) would flag as untrustworthy/unfinished.

**Recommendation:** Replace the placeholder with the real registered business address (or remove the redundant first address if only the Cyprus one is accurate) immediately — this is a quick fix with outsized trust impact. While reviewing, also verify whether "Oak inc." should be surfaced to shoppers at all, or whether it's confusing given the storefront is branded "Inquisitive Arts."

---

## Finding 5: Generic, non-descriptive image alt text

**Severity:** Low-Medium

**Evidence:** Alt text harvested from `/products/canvas-5`: `"Product mockup"` (used twice), one empty alt attribute, and `"Landscape II- Anugrah Mishra"` (used for two images) — the descriptive alt text is just the product title repeated, not a description of the artwork's visual content (colors, subject, composition).

**Recommendation:** Write unique, descriptive alt text per image (subject matter, color palette, style) rather than reusing the product title or leaving generic placeholder text like "Product mockup" — this helps both image search and multimodal AI systems that use alt text as a citability signal.

---

## What's working well

- **Clean H1/title structure on the product page:** `<h1>` matches page title, canonical tag present, Open Graph and Twitter-card-equivalent meta tags fully populated (og:title, og:description, og:image with dimensions, og:price:amount/currency) — good technical foundation for how the page is *presented* even where the copy itself is thin.
- **Brand consistency:** "Inquisitive Arts" and "Anugrah Mishra" are used consistently across title tags, meta description, JSON-LD, and visible copy — no naming inconsistency that would confuse a reader or an AI system about entity identity.
- **Navigation architecture is sensible for E-E-A-T:** the site deliberately has dedicated About, Artists, Portfolio, and Contact pages (rather than folding everything into a generic "info" page), which is the right structural foundation for building out real credential/experience content — the gap (pending direct verification) is depth, not architecture.
