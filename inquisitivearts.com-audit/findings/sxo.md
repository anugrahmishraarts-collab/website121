# SXO / Search Experience Findings — inquisitivearts.com

Scope: reverse-engineering what Google rewards for the query types this site could realistically target, and scoring page-type fit against searcher intent. Evidence drawn from live SERPs (Google web search, Aug 2026) and direct inspection of `/products/canvas-5` (representative product template).

---

## 1. The site itself is indexed and framed by Google as a personal portfolio, not a store
**Severity: Critical**

**Evidence:** Searching `site:inquisitivearts.com` returns the homepage with the Google-rendered title **"Anugrah Mishra-Inquisitive Arts | Contemporary Artist London."** That is the actual `<title>` tag Google is showing searchers — it reads as an artist bio page, not a shop. Google's own AI-generated summary of the site (built from crawled content) describes it as offering "symbolic fine art and refugee crisis works" with prints "available for purchase" — commerce is a secondary detail, not the framing.

**Recommendation:** Decide deliberately which identity the site is optimizing for. If the goal is to sell prints, the homepage title/meta and information architecture need to lead with commerce ("Buy Canvas Art Prints by Anugrah Mishra | Inquisitive Arts") and the store needs store-shaped signals (see Findings 2-4). If the goal is artist reputation/portfolio (which the content currently supports better), that's a legitimate strategy too, but then this shouldn't be positioned or measured as e-commerce SEO — different KPIs, different page types, no expectation of ranking for "buy canvas prints" queries.

---

## 2. Query-intent test: "buy canvas art prints UK" — the site cannot plausibly compete, and doesn't
**Severity: Critical**

**Evidence:** Live SERP for "buy canvas art prints UK" is dominated entirely by high-volume specialist print retailers: Posterlounge, CanvasChamp (from £6.89, 87% off messaging), My Picture UK (4.9-star rated, from £4.50), Simply Canvas Art (free next-day delivery), Art Print Shop, The Canvas Prints UK, Canvas Art Rocks. Every ranking result signals: huge size/price selection, fast delivery, customer ratings, aggressive value positioning. inquisitivearts.com does not appear anywhere in results. What Google is rewarding here is catalog breadth + price transparency + review volume + delivery speed — none of which the current 6-SKU, review-free, delivery-info-free site provides. This is not a rankings gap that on-page tweaks fix; it's a structural mismatch between what this query rewards and what this site is.

**Recommendation:** Do not target generic commercial "canvas print" head terms — they're unwinnable against retailers with 100-1000x the catalog and established review volume. Redirect commercial-intent effort toward long-tail, artist-specific terms instead (Finding 3).

---

## 3. Query-intent test: "Charlie Chaplin canvas print" — same pattern, plus a direct competing listing of the identical artwork
**Severity: High**

**Evidence:** SERP for "Charlie Chaplin canvas print buy" surfaces Photos.com, Redbubble, Fine Art America (52 artists' worth of Chaplin prints), Etsy, Great Big Canvas, iCanvas (60-day money-back guarantee, free returns) — again all large POD/marketplace catalogs with reviews and guarantees front and center. Separately, a general search for "Anugrah Mishra artist canvas prints" surfaces **ArtPal.com** listing the artist's own "Charlie Chaplin" piece directly — meaning the same artwork sold on inquisitivearts.com is also listed on a third-party marketplace, competing against the artist's own store for any generic "Charlie Chaplin canvas print" search, and diluting uniqueness signals.

**Recommendation:** For product-level queries, the realistic win condition is the artist's *name* attached to the piece, not the generic subject. Target and optimize for "Anugrah Mishra Charlie Chaplin painting/print" rather than "Charlie Chaplin canvas print" — a query the searcher would only type if they already know/want this specific artist. Ensure product pages explicitly reinforce the artist's name, story, and any credentials (see Finding 4) so this differentiation is unambiguous versus the ArtPal listing and versus anonymous POD versions of the same public-domain-adjacent subject matter.

---

## 4. Artist has genuine, citable credentials that are absent from the product-page experience — a missed E-E-A-T/trust opportunity
**Severity: High**

**Evidence:** Web research confirms Anugrah Mishra is a real, awarded contemporary artist — winner of the Freelands Painting Prize 2024, exhibited/covered via Anglia Ruskin Creative Showcase, Saatchi Art, MutualArt, and an active Instagram presence (`@inquisitive_artist_`, correctly linked in the site's schema). This is exactly the kind of experience/expertise/authority signal Google (and a human buyer paying £40+ for original-adjacent art) weighs heavily. None of it appears in the product page description inspected (`/products/canvas-5`): the visible copy is generic marketing boilerplate ("captures serene natural beauty with delicate brushwork...") plus fabric/print spec bullet points and GPSR compliance legalese — no mention of the artist's award, background, or story anywhere near the product.

**Recommendation:** This is close to a free win: add a short "About the artist" block on every product page (and strengthen `/pages/artists`) referencing the Freelands Painting Prize and the artist's exhibition history. For someone who searches "Anugrah Mishra painting" with purchase intent, landing on a page that reads like a stock print listing (rather than confirming they've found the real, credentialed artist) is a trust/conversion leak.

---

## 5. Page-type mismatch: product pages are built like generic dropship/POD listings, not gallery/original-art listings
**Severity: Medium**

**Evidence:** The product description on `/products/canvas-5` is templated Shopify-app boilerplate: "Looking to add a little flair to your room or office? Look no further..." followed by generic fabric spec bullets (fade resistant, poly-cotton blend, matt finish) and GPSR text naming "Oak inc." and "SINDEN VENTURES LIMITED" as the responsible entities (with a placeholder address — see e-commerce Finding 5) — patterns typical of white-label print-on-demand integrations, not curated gallery listings. A searcher clicking through on an artist-name query (someone who wants *this specific artist's* work) lands on a page that reads indistinguishably from a mass-market POD listing, undermining the "buying from the artist directly" value proposition that should be this site's actual differentiator against Etsy/Redbubble/ArtPal resellers.

**Recommendation:** Rewrite product copy in the artist's voice / gallery register rather than generic conversion-template copy. Emphasize limited-edition status (if applicable), the story behind the piece, and direct-from-artist provenance — the things a fan/collector search intent is actually looking for that a marketplace listing can't offer.

---

## 6. Branded query is currently the only real strength — protect and build on it
**Severity: Info (not a problem, but a leverage point)**

**Evidence:** For the artist's own name, the site ranks #1 and Google surfaces a reasonably accurate, favorable AI summary. This confirms brand-query defense is solid.

**Recommendation:** Double down here rather than chasing unwinnable generic commercial terms: build content around the artist's exhibitions, the Freelands Painting Prize, press coverage, and Instagram activity to reinforce brand/entity strength (helps both classic SEO and AI-answer/GEO citation likelihood), and let branded + long-tail "[artist name] + [artwork/subject]" queries be the primary organic acquisition channel rather than head commercial terms.

---

## Summary judgment: portfolio vs. store

Structurally and content-wise, this is currently **an artist portfolio site with a checkout bolted on**, not a store built to satisfy shopping intent. That's not inherently wrong — but it means:
- It will not and should not be expected to rank for generic commercial canvas-print queries (catalog, reviews, and price-transparency signals aren't there and can't be faked at 6 SKUs).
- Its realistic and winnable search-experience niche is branded/long-tail queries tied to the artist's real, verifiable credentials — which are currently under-leveraged on the very pages meant to convert that traffic.
- If e-commerce growth (not just brand presence) is the actual business goal, the fix is not more generic on-page SEO polish — it's catalog expansion, real review collection, and repositioning product pages away from generic POD templates toward a gallery/provenance-led experience that matches why someone searching an artist's name by intent would want to buy from the source rather than a reseller.
