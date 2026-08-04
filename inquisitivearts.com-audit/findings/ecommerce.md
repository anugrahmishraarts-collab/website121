# E-commerce SEO Findings — inquisitivearts.com

Scope: product pages (`/products/canvas`, `canvas-1` through `canvas-5`), collections (`/collections/frontpage`, `/collections/prints`). Evidence pulled directly from live page source (verified in full on `/products/canvas-5`, which runs the same Shopify theme/template as all other product pages, so structural findings generalize across the catalog).

---

## 1. Catalog depth is critically thin for e-commerce SEO
**Severity: Critical**

**Evidence:** The entire store consists of 6 product URLs (`canvas`, `canvas-1`…`canvas-5`) across 2 collections (`frontpage`, `prints`). Known product names: "Charlie Chaplin," "Landscape I," "Landscape II," "Mother Teresa" — i.e. roughly 4 distinct artworks, each likely offered as 1-2 size/variant listings, priced £40-44. There is no visible pagination, subcategory structure, or expansion path (no "canvas by room," "canvas by size," "canvas by subject" facets).

**Recommendation:** A catalog this size cannot realistically compete for commercial "buy canvas art" queries against competitors with thousands of SKUs (see SXO report). Either (a) treat the site primarily as a portfolio/brand-search destination and stop investing SEO effort in category-level commercial keywords, or (b) commit to meaningfully expanding the catalog (more artworks, more size/format variants exposed as filterable options, framed vs. unframed, etc.) before investing further in product-page SEO. Thin, near-identical product templates across 6 items also raise duplicate/boilerplate-content risk (see Finding 5).

---

## 2. Product structured data is present but incomplete — no reviews, no shipping, no return policy in schema
**Severity: High**

**Evidence:** `/products/canvas-5` carries a valid `Product` JSON-LD block with `name`, `image`, `brand`, `category`, `description`, `sku` (`8308388_19303`), and a nested `Offer` with `price` (40.00), `priceCurrency` (GBP), `availability` (`InStock`), and `url`. That covers Google's *required* fields plus several recommended ones.

Missing from the schema entirely:
- `aggregateRating` / `review` — no rating or review data anywhere in the schema or page (confirmed: the theme loads `component-rating.css` but no rating markup renders — zero reviews collected)
- `hasMerchantReturnPolicy` — absent, despite a `/policies/refund-policy` page existing on-site
- `shippingDetails` — absent, and there is no dedicated `/policies/shipping-policy` page at all (checked; 404/not linked)
- `gtin`/`mpn` — acceptable to omit for original/limited-edition art, low priority

**Recommendation:** Add `hasMerchantReturnPolicy` and `shippingDetails` to the Product schema (both can be set in Merchant Center/Search Console without a full feed). Stand up a real shipping policy page and link it. Most importantly, start collecting reviews — zero social proof on a £40+ discretionary art purchase is a significant conversion and rich-result gap; Shopify's native product reviews app or a UGC review app would let `aggregateRating` populate.

---

## 3. No reviews or social proof anywhere on product pages
**Severity: High**

**Evidence:** Full-text scan of `/products/canvas-5` source finds no rendered star ratings, review counts, or testimonial content. The word "review" only appears inside unrelated CSS/JS class names and a canned AI-chat-widget suggestion ("What is your return policy?"/"What is your shipping policy?") — not actual customer content.

**Recommendation:** For an unknown-brand art seller at this price point, review/UGC social proof is one of the highest-leverage trust signals available. Add a lightweight reviews app, request reviews post-purchase, and surface at least a few testimonials near the buy box.

---

## 4. Trust signals absent near Add to Cart; return-policy link buried in footer only
**Severity: Medium**

**Evidence:** The buy-box on `/products/canvas-5` contains only the "Add to cart" button and a Shop Pay accelerated-checkout button — no delivery estimate, no "secure checkout" badge, no return-policy callout adjacent to the CTA. A "Refund policy" link exists only in the global footer (`/policies/refund-policy`); there is no `/policies/shipping-policy` at all, and no shipping-cost/delivery-time information is shown anywhere on the product page.

**Recommendation:** Add a short trust strip directly under/beside the Add to Cart button: estimated delivery window, return window (e.g. "30-day returns"), and a secure-checkout mention. This is standard on competing UK canvas print retailers and its absence is conspicuous for a mid-value purchase from an unfamiliar brand.

---

## 5. Placeholder/boilerplate content left unedited in legally-required product text and organization schema
**Severity: Critical**

**Evidence:** The GPSR (EU General Product Safety Regulation) compliance text embedded in every product description reads verbatim:
> "...please contact our EU representative at gpsr@sindenventures.com. You can also write to us at **123 Main Street, Anytown, Country** or Markou Evgenikou 11, Mesa Geitonia, 4002, Limassol, Cyprus."

"123 Main Street, Anytown, Country" is an unedited placeholder address, shipped live on every product page. Separately, the site's `Organization` JSON-LD (first of two duplicate Organization blocks found) declares:
```json
{"@type":"Organization","name":"Inquisitive Arts","logo":"https://inquisitivearts.com/path-to-your-logo.png"}
```
— a literal placeholder logo URL that returns nothing. The second Organization block's `sameAs` array also includes `"https://tiktok.com/@shopify"` (Shopify's own generic TikTok, not the store's) alongside several empty-string entries.

**Recommendation:** Fix immediately — placeholder legal/compliance text on live product pages is both a trust signal red flag (visible to any user who reads the fine print, and to AI/LLM content parsers) and a genuine GPSR compliance risk. Replace the fake address with the real registered business address, fix or remove the broken `logo` URL, remove the duplicate Organization schema block, and clean the `sameAs` array to only real, live social profiles (Instagram is correctly populated; TikTok and the empty slots are not).

---

## 6. Product titles/slugs: descriptive on-page, non-descriptive in URL
**Severity: Medium**

**Evidence:** On-page H1/title is descriptive: `Landscape II- Anugrah Mishra` (note: missing space before the hyphen — minor typo, appears in both H1 and `<title>`). However the URL slug is `/products/canvas-5` — generic and keyword-empty. Same pattern presumed across `canvas-1` through `canvas-4` given identical theme/generation pattern.

**Recommendation:** Change slugs to something like `/products/landscape-ii-canvas-print-anugrah-mishra`. Shopify supports URL redirects automatically when a handle is changed, so this is low-risk to fix and directly improves keyword relevance signal in the URL.

---

## 7. Meta description far exceeds recommended length (will be truncated in SERPs)
**Severity: Low**

**Evidence:** `/products/canvas-5` meta description is 320 characters (measured from source), roughly double Google's effective ~155-160 character display limit. It also does not include price or a call-to-action.

**Recommendation:** Trim to ~150 characters, lead with the product name and a concrete hook (e.g. "Landscape II canvas print by Anugrah Mishra — from £40, ships UK-wide").

---

## 8. No related-products / cross-sell module, no breadcrumbs
**Severity: Medium**

**Evidence:** `/products/canvas-5` source contains no "You may also like," "Related products," or "Recently viewed" section, and no breadcrumb navigation (`Home > Collection > Product`) anywhere in the DOM.

**Recommendation:** With only ~6 SKUs this has limited crawl-budget impact, but it still costs internal-linking equity and on-site conversion (cross-sell). Add breadcrumbs (cheap win, also improves schema via `BreadcrumbList`) and a simple "More from this collection" block.

---

## What's working well

- **Product schema is present and largely correct** where it exists: valid `Offer` with numeric price, ISO currency (GBP), and correct `availability` enum — many small Shopify stores get this wrong or omit it entirely.
- **Canonical tags are correctly set** (`<link rel="canonical" href="https://inquisitivearts.com/products/canvas-5">`) — no duplicate-content ambiguity from variant URLs.
- **Product image alt text is inconsistent but not absent** — the artwork-specific images correctly use "Landscape II- Anugrah Mishra" as alt text; the gap is only on the generic hero/mockup images (see Finding 4-adjacent note: some alts read "Product mockup" or are empty — worth a quick cleanup pass, filed as low-severity alongside Finding 6).
