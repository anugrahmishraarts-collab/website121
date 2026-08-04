# Technical SEO Findings — inquisitivearts.com

Audit date: 2026-08-04. Evidence gathered via direct HTTP requests (curl) and rendered-HTML inspection of the live site (raw server-rendered HTML, not JS-rendered — Shopify serves title/meta/canonical/JSON-LD server-side so this is the authoritative signal for those elements).

## Working Well

- **robots.txt is well-formed and current.** Standard Shopify boilerplate correctly disallows /admin, /cart, /checkout, /account, /orders, filter/sort crawl traps, and correctly declares `Sitemap: https://inquisitivearts.com/sitemap.xml`. Also declares Shopify's new agentic-commerce surfaces (agents.md, UCP endpoints) — standard platform rollout, not a site defect.
- **HTTP -> HTTPS and www -> non-www redirects are both single-hop 301s**, no redirect chains observed.
- **HSTS, X-Frame-Options, X-Content-Type-Options are present** on the storefront (see Security section).
- **Homepage title, meta description, canonical, and viewport tags are all present and well-optimized in the actual server-rendered HTML** — resolves the open question from the initial raw-mode fetch (see Finding: Title/Meta Tags below).
- **hreflang tags are present** on the homepage for en/hi/ru plus x-default, correctly matching the sitemap's localized URL structure.

## Findings

### 1. Title/meta description on homepage: present and good (raw-mode fetch concern resolved)
- **Severity:** Info
- **Evidence:** Full page source at `https://inquisitivearts.com/` contains:
  - `<title>Anugrah Mishra-Inquisitive Arts | Contemporary Artist London</title>` (56 chars, well within limits)
  - `<meta name="description" content="Discover Inquisitive Arts by Anugrah Mishra - an award winning contemporary Indian artist based in London. Explore symbolic fine art, refugee crisis works and shop limited edition prints. Available for commission, collaborations and exhibitions worldwide.">` (~255 chars — see Finding 2)
  - Both tags are server-rendered (found in raw HTML, not requiring JS execution).
- **Root cause of earlier concern:** The initial raw-mode fetch tool evidently failed to parse these tags (possibly due to the `<title>` tag's content being on its own line with leading whitespace: `<title>\n  Anugrah Mishra...\n</title>`, which can break naive single-line regex parsers). This is a parser artifact, not a site defect.
- **Recommendation:** None needed for presence. See Finding 2 for length.

### 2. Homepage meta description is over the recommended length
- **Severity:** Low
- **Evidence:** Meta description is ~255 characters: "Discover Inquisitive Arts by Anugrah Mishra - an award winning contemporary Indian artist based in London. Explore symbolic fine art, refugee crisis works and shop limited edition prints. Available for commission, collaborations and exhibitions worldwide." Google typically truncates snippets around ~155-160 characters (varies by device/query).
- **Recommendation:** Trim to ~150-160 characters, front-loading the most distinctive value proposition (award-winning Indian artist in London, limited edition prints) since the tail is likely truncated in SERPs.

### 3. hreflang implementation looks structurally correct but locale content depth is unverified
- **Severity:** Medium (pending verification) / Info (structure)
- **Evidence:** Homepage `<head>` contains:
  ```
  <link rel="alternate" hreflang="x-default" href="https://inquisitivearts.com/">
  <link rel="alternate" hreflang="en" href="https://inquisitivearts.com/">
  <link rel="alternate" hreflang="hi" href="https://inquisitivearts.com/hi">
  <link rel="alternate" hreflang="ru" href="https://inquisitivearts.com/ru">
  ```
  This matches the sitemap index, which lists parallel `/hi/sitemap_*` and `/ru/sitemap_*` sub-sitemaps with the same 6 products, 5 pages, and 2 collections as the English versions (URLs prefixed `/hi/products/canvas` etc.), each with its own `<lastmod>`.
  Site-wide aggressive rate-limiting (see Finding 5 below) prevented rendering `/hi` and `/ru` in time to confirm whether the on-page copy is actually translated or is English content served under a translated URL prefix (a common half-finished Shopify Markets/Translate & Adapt setup). This is flagged as **needs re-verification** rather than confirmed either way.
- **Recommendation:** Confirm whether `/hi` and `/ru` serve genuinely translated copy. If they are English content under a locale path, this is a soft "thin/duplicate international content" risk — hreflang correctly tells Google these are language variants, but if the content isn't actually localized, it provides no real value to hi/ru searchers and can dilute perceived quality. If real translations exist, this is a solid international SEO setup.

### 4. Canonical tags: self-referencing and correct on homepage
- **Severity:** Info
- **Evidence:** `<link rel="canonical" href="https://inquisitivearts.com/">` on homepage, self-referencing, no conflicting signals (no noindex, no meta robots tag present = default index,follow).
- **Recommendation:** Re-verify canonical on product/collection pages once rate-limiting clears (in progress — see note on Finding 5).

### 5. Site aggressively rate-limits (HTTP 429) full theme-rendered page requests
- **Severity:** Medium
- **Evidence:** Repeated direct requests (and independent WebFetch requests) to `/`, `/products/canvas`, `/collections/frontpage`, and `/pages/contact` returned `HTTP/2 429` with `retry-after: 60` consistently across a ~10+ minute window, while static/lightweight endpoints on the same domain (`/robots.txt`, `/sitemap.xml`, `/.well-known/ucp`, 404 error pages) returned 200 throughout the same window. This points to a Shopify/Cloudflare-side protection specifically throttling full Liquid theme renders (home/product/collection/page templates), not a general site outage.
- **Impact:** This is very likely triggered by concurrent traffic from this audit's own multiple parallel checks hitting the same domain simultaneously, not necessarily reflective of a real-world crawler problem — Googlebot single-threads and honors `Retry-After`/backs off automatically, so normal search crawling is unlikely to be materially affected. Still worth flagging: if the store gets a legitimate traffic spike (viral post, ad campaign) and this same rate limit triggers for real visitors, it would manifest as visitors and crawlers alike seeing 429 error pages instead of product pages.
- **Recommendation:** Check Shopify admin / any installed apps (e.g. bot-protection, cache, or security apps) for an overly aggressive rate-limit configuration on storefront rendering. Verify Googlebot isn't being throttled by checking Search Console's Crawl Stats report for spikes in 429/5xx responses.

### 6. Security headers: solid baseline, CSP is minimal, no Referrer-Policy header
- **Severity:** Low
- **Evidence** (captured from live response headers on the Shopify-app-backed `/robots.txt` route, representative of site-wide header config, confirmed served via `powered-by: Shopify`):
  ```
  x-frame-options: DENY
  content-security-policy: block-all-mixed-content; frame-ancestors 'none'; upgrade-insecure-requests;
  strict-transport-security: max-age=7889238
  x-content-type-options: nosniff
  x-xss-protection: 1; mode=block   (legacy, harmless but deprecated)
  x-download-options: noopen
  x-permitted-cross-domain-policies: none
  ```
  No `Referrer-Policy` header was observed in any response. The CSP only sets `frame-ancestors`, `block-all-mixed-content`, and `upgrade-insecure-requests` — it does not restrict `script-src`/`default-src`, so it provides clickjacking/mixed-content protection but not meaningful XSS mitigation. `strict-transport-security` max-age is ~91 days (7,889,238s), below the 1-year (31536000s) + `includeSubDomains` + `preload` needed for HSTS preload list eligibility.
- **Recommendation:** This is largely Shopify-platform-controlled (merchants have limited control over storefront response headers outside of Shopify's own CSP for embedded apps/checkout). Low priority for a small art gallery store; if desired, a `Referrer-Policy` and stronger HSTS can sometimes be added via Shopify's checkout/storefront settings or a proxy layer, but this is not a high-value fix for this site's risk profile.

### 7. TLS certificate: valid, standard Let's Encrypt cert via Shopify
- **Severity:** Info
- **Evidence:** Certificate for `inquisitivearts.com` issued by Let's Encrypt (R-series intermediate `YE1`), valid 2026-07-08 to 2026-10-06 (~90-day Let's Encrypt cert, auto-renewed by Shopify). No action needed — this is Shopify-managed and auto-renews.

### 8. Sitemap structure: sound and fresh, matches known URL set exactly
- **Severity:** Info (positive finding)
- **Evidence:** `sitemap.xml` index correctly lists sub-sitemaps for products, pages, collections (English + `/hi/` + `/ru/` locale variants) plus a new `sitemap_agentic_discovery.xml` pointing to `agents.md`. Sub-sitemap contents:
  - Products (6 URLs): canvas, canvas-1..canvas-5 — matches the known product set exactly, each with `<image:image>` extension (title, loc) and `<lastmod>`.
  - Pages (5 URLs): contact, data-sharing-opt-out, about-us, portfolio, artists — matches known set exactly, with realistic staggered `<lastmod>` dates (2025-07-18 through 2026-01-28).
  - Collections (2 URLs): frontpage, prints — matches known set exactly.
  - No orphan pages or missing known URLs detected — the sitemap accurately reflects the site's structure.
- **Minor oddity:** All 6 product `<lastmod>` values are identical to the second (`2026-08-04T11:59:36+01:00`), suggesting either a bulk republish/reindex event happened same-day rather than genuine individual product edits, or the store's lastmod generation is not tracking true per-product edit times. Not a real problem, just worth noting — it reduces the signal value of `<lastmod>` for prioritizing recrawl of genuinely-changed products.
- **Recommendation:** None required; sitemap is functioning correctly and robots.txt correctly points to it.

### 9. Mobile viewport meta tag: correct
- **Severity:** Info
- **Evidence:** `<meta name="viewport" content="width=device-width,initial-scale=1">` present on homepage.
- **Recommendation:** None needed.

## Pending / Could Not Fully Verify

Due to sustained HTTP 429 rate-limiting on theme-rendered pages (see Finding 5), the following checks from the original scope could not be completed with direct evidence at time of writing and are flagged for re-verification once the rate limit clears:
- Canonical tags on product pages (`/products/canvas` etc.) and collection pages.
- Title/meta description on 2+ product pages and 2+ other page types beyond the homepage.
- Whether `/hi` and `/ru` render genuinely localized content or English text under a translated URL.
- BreadcrumbList presence on product/collection pages (see schema.md).
