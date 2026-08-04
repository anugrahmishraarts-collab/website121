# Structured Data (Schema.org / JSON-LD) Findings — inquisitivearts.com

Audit date: 2026-08-04. Evidence gathered from the raw server-rendered HTML `<head>`/`<body>` of the live homepage (JSON-LD is server-injected by Shopify Liquid, not JS-injected, so raw HTML is authoritative).

## Working Well

- Homepage carries valid JSON-LD for `WebSite` + `SearchAction` (sitelinks search box eligibility) — correctly formed with proper `target` URL template and `query-input`.
- One of the two `Organization` blocks is properly Liquid-templated (dynamic logo URL, theme-driven `sameAs` array) rather than hand-coded, meaning it stays in sync with theme settings automatically.
- No conflicting `noindex` + schema signals — nothing here is fighting itself.

## Findings

### 1. Duplicate Organization schema, and one copy is a broken unfilled template
- **Severity:** High
- **Evidence:** The homepage `<head>` contains **three** JSON-LD blocks, the first two both typed `Organization`:

  **Block 1 (first thing in `<head>`, appears before even `<meta charset>`):**
  ```json
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Inquisitive Arts",
    "url": "https://inquisitivearts.com",
    "logo": "https://inquisitivearts.com/path-to-your-logo.png"
  }
  ```
  The `logo` value `https://inquisitivearts.com/path-to-your-logo.png` is a **literal, unfilled placeholder** — almost certainly copy-pasted from a tutorial/snippet ("path-to-your-logo.png") and never edited. This URL does not resolve to a real image. This block is static (no Liquid templating), meaning it was manually hardcoded directly into the theme, likely via a "custom liquid" section/snippet.

  **Block 2 (theme-generated, later in `<head>`):**
  ```json
  {
    "@context": "http://schema.org",
    "@type": "Organization",
    "name": "Inquisitive Arts",
    "logo": "https://inquisitivearts.com/cdn/shop/files/Refine_Logo.png?v=1753041104&width=500",
    "sameAs": [
      "", "", "",
      "https://www.instagram.com/inquisitive_artist_/",
      "https://tiktok.com/@shopify",
      "", "", "", ""
    ],
    "url": "https://inquisitivearts.com"
  }
  ```
  This one has a real, resolvable logo image and is Liquid-templated (standard Shopify theme `organization-schema.liquid` pattern).

- **Why this matters:** Google's structured data guidance does not prohibit multiple JSON-LD blocks of the same type outright, but two `Organization` entities on one page with **different logo values** (one broken, one real) creates ambiguity about which is authoritative, and the broken one risks being flagged by Rich Results Test / Search Console as an entity with an invalid/unreachable `logo` URL. It's also simply redundant weight in the page's structured data.
- **Recommendation:** Delete Block 1 entirely (the hand-coded placeholder). It adds no value beyond what Block 2 already provides correctly, and its broken `logo` field is actively harmful. Locate it in the theme (likely `theme.liquid` or a custom section near the top of `<head>` — its position before `<meta charset>` is a strong hint it was manually pasted in) and remove it.

### 2. `sameAs` array on Organization schema is mostly empty and contains what looks like a stray default value
- **Severity:** Medium
- **Evidence:** In Block 2 above, `sameAs` has 9 entries: 6 are empty strings `""`, one is the real Instagram (`instagram.com/inquisitive_artist_`), and one is `https://tiktok.com/@shopify` — Shopify's own generic/default TikTok handle, not the store's. This strongly suggests a theme social-links setting was left at its default/example value rather than being configured or cleared.
- **Why this matters:** `sameAs` is used by Google to help confirm entity identity (linking the site to its real social profiles for Knowledge Panel-style disambiguation). Empty strings are harmless noise, but `tiktok.com/@shopify` incorrectly associates this small art gallery's Organization entity with Shopify's own TikTok account, which is misleading structured data.
- **Recommendation:** In the Shopify theme customizer's social media settings, either fill in the artist's real social profile URLs (Instagram is already correct) or clear the unused fields — do not leave a generic platform default in place. Remove `tiktok.com/@shopify` unless Inquisitive Arts genuinely wants to be entity-linked to it (unlikely).

### 3. WebSite + SearchAction schema is valid
- **Severity:** Info (positive)
- **Evidence:**
  ```json
  {
    "@context": "http://schema.org",
    "@type": "WebSite",
    "name": "Inquisitive Arts",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://inquisitivearts.com/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    },
    "url": "https://inquisitivearts.com"
  }
  ```
  Correctly formed per Google's Sitelinks Search Box spec.
- **Recommendation:** None needed.

### 4. Mixed `http://` and `https://` in `@context` values
- **Severity:** Low
- **Evidence:** Block 1 uses `"@context": "https://schema.org"`, while Block 2 and Block 3 use `"@context": "http://schema.org"` (no `s`). Schema.org's context resolves the same either way and Google treats both as equivalent, so this is not a functional bug, but it's inconsistent and reflects Block 1 and Blocks 2/3 coming from different sources (manual paste vs. theme default) — further evidence Block 1 doesn't belong.
- **Recommendation:** Not urgent on its own; will be moot once Block 1 (Finding 1) is removed. If keeping any hand-written JSON-LD in future, standardize on `https://schema.org`.

## Pending / Could Not Fully Verify

Product pages, collection pages, and page-type templates (`/products/canvas`, `/collections/frontpage`, `/pages/contact`, etc.) could not be fetched at time of writing due to sustained HTTP 429 rate-limiting on the storefront's theme-rendered routes (static assets like `/robots.txt` and `/sitemap.xml` were unaffected — see technical.md Finding 5 for detail). The following remain unverified and should be re-checked:
- **Product schema on product pages**: presence/correctness of `Product` type, `offers.price`, `offers.availability`, `aggregateRating`/`review` fields. Shopify's default themes generally auto-inject `Product` JSON-LD (price, currency, availability) via `product.liquid`, so it is likely present, but this has not been directly confirmed for this store/theme, and review/rating markup in particular is theme- and app-dependent and cannot be assumed.
- **BreadcrumbList schema** on collection/product pages — Shopify does not include this by default in all themes; needs direct confirmation.
- Whether the placeholder Organization block (Finding 1) also appears on every other page template (it sits in what looks like a global snippet, so likely site-wide) or only the homepage.

This section will need a follow-up pass once the rendered HTML for these page types is retrievable.
