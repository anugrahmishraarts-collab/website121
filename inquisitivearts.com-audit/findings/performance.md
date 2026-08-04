# Performance Findings — inquisitivearts.com

**Method note:** Measured via a real, live Chromium browser session (Playwright MCP) against the homepage, the product page (`/products/canvas`), and the collections page (`/collections/prints`), plus direct response-header inspection of specific network requests. This is real network/header data, not a static guess — however, no formal Lighthouse/CrUX trace was run, so headline Core Web Vitals scores (LCP/INP/CLS in ms) are not reported as lab numbers; risk factors are inferred from real payload sizes, timing headers, and DOM structure instead. Two background specialist checks (seo-performance, seo-visual agents) were also dispatched but did not return output in time to be included — findings below are from direct inspection.

---

### Extreme third-party script bloat — 165+ network requests on a single homepage load
**Severity:** Critical
**Evidence:** A full network capture of a fresh homepage load recorded **167 requests** before the trace was cut off (the real count is likely higher once the page settles). Confirmed distinct third-party/app payloads include:
- **Google tag stack**: two separate `gtag.js` containers (`AW-17375648312` and `GT-WKP7C4DW`), plus DoubleClick conversion pixels, `googleadservices.com` conversion tracking (3+ separate hits), Google Merchant Center analytics (`merchant-center-analytics.goog`), and `ad.doubleclick.net` collect calls — all firing on page load.
- **4 separate Shopify "web pixel" sandboxed workers** plus 1 custom pixel sandbox (`web-pixels@.../sandbox/worker.modern.js` ×4), each a separate JS execution context.
- **PushOwl** (push notification app) — loads its SDK, a service worker, and a `blob:` manifest that throws two console warnings ("start_url"/"scope" ignored, invalid URL).
- **Sendvio** (marketing/SMS app) — separate JS bundle, logs to console.
- **Shopify Forms app**, **size-guides-prod (esc-apps-cdn.com)** third-party app, **jQuery 1.10.1 loaded from `ajax.googleapis.com`** (a 2013-era library — almost certainly an orphaned dependency from an old app/theme snippet).
- Roughly **20+ small `shop-js`/Shop Pay JS chunks** and the **full checkout-web bundle** (polyfills, app.js, vendor chunk, GraphQL mutation modules) preloading on the homepage/product page itself, before any checkout intent.
- Multiple repeated `POST` calls to `/.well-known/shopify/monorail/unstable/produce_batch` and `otlp-http-production.shopifysvc.com` (Shopify's own telemetry) firing repeatedly through the session.
**Recommendation:** Audit installed Shopify apps (PushOwl, Sendvio, Forms, size-guides, plus whatever the 4th/5th web-pixel belongs to) and remove or defer any not actively driving revenue. Each pixel/app adds parse+execution time and competes for main-thread time, directly hurting INP. Move non-essential tracking to load after first interaction or via a tag-manager with consent-gated lazy loading rather than firing everything on load.

---

### Bloated, unrelated Google Fonts request
**Severity:** High
**Evidence:** The homepage `<head>` requests `fonts.googleapis.com/css?family=...` with **26 font families** in one query string: Gentium Basic, Roboto, PT Serif, Aclonica, Shrikhand, Carter One, Fredoka One, Permanent Marker, Sedgwick Ave, Aref Ruqaa, Cormorant Upright, Rochester, Ranga, Kalam, Shadows Into Light (×2), Dancing Script, Teko, Montserrat, Baloo Bhai, Didact Gothic, Dosis, Playfair Display, Prata, Quicksand, Raleway, Tenor Sans, Nunito. None of these match the theme's actual typography — the real body/heading fonts are self-hosted `Newsreader` and `Halant` woff2 files served from the Shopify CDN. This Google Fonts call is almost certainly leftover config from an app (e.g. a page-builder, popup, or font-picker widget) that was never cleaned up.
**Recommendation:** Identify and remove the source of this Google Fonts request (check installed apps and any custom "font picker" or landing-page-builder sections). It adds an extra external DNS/connection + a large unused CSS payload for zero visual benefit, and delays render of the render-critical stylesheet queue.

---

### Large, uncompressed-format hero image on a canvas-print gallery homepage
**Severity:** Medium
**Evidence:** The homepage hero (`Refugee_s-_Resilience_and_Dreams.jpg`, requested at `width=1800`) was served as a plain JPEG at **~547 KB** when requested without a full browser fingerprint (confirmed via direct header check: `content-type: image/jpeg`, `content-length: 559818`). This is the largest single asset on the homepage and is very likely the LCP candidate since it's the eager-loaded, non-lazy full-bleed banner.
**Recommendation:** Because the CDN *does* support WebP negotiation for real browsers (see "what's working well"), the JPEG fallback path shouldn't be the common case — but 547KB is still large for a hero even as WebP-negotiated (a modern WebP re-encode of a photographic hero at 1800px should land closer to 150–250KB). Re-export the hero source at a tighter compression/quality setting, and confirm `Vary: Accept` caching isn't serving stale JPEG copies to crawlers/bots that don't send a full `Accept: image/webp,image/avif,...` header (Googlebot's image fetcher may not always negotiate WebP, so a large JPEG fallback would also be what search engines see).

---

### Checkout bundle and Shop Pay JS preloading on non-checkout pages
**Severity:** Low-Medium
**Evidence:** The full checkout-web asset bundle (`polyfills`, `app.js`, `esnext-vendor`, `context-browser`, `UnauthenticatedErrorModalPayload`, `receipt-mapper-load-recovery`, `receipt-eager-mappers`, GraphQL mutation chunks, etc. — 10+ files) and ~20 `shop-js`/`chunk.*.esm.js` accelerated-checkout modules load on the **homepage**, not just on add-to-cart or checkout. This is Shopify's own "accelerated checkout" prefetching behavior, but combined with everything else above it adds meaningfully to total JS parsed on first load.
**Recommendation:** This is largely platform-controlled (Shopify's Shop Pay integration), so the main lever is reducing everything *else* competing for the same budget (apps/pixels above). If the theme has any control over Shop Pay accelerated-checkout button placement/eagerness, consider whether it needs to be present on the homepage above the fold.

---

### What's working well
- **Shopify CDN responsive images are correctly implemented.** Every content image checked (homepage, product, collection) ships a full `srcset` with `?width=` breakpoints (165w through 3600w+), so browsers pull an appropriately sized file rather than one oversized master.
- **Automatic WebP delivery confirmed via live request inspection.** A product image with a 4.5MB source JPEG was delivered to the real browser as a **67KB WebP** (`content-type: image/webp`, `source-length: 4541707` → `content-length: 67488`) — Shopify's CDN is correctly content-negotiating format even though source files are uploaded as `.jpg`.
- **Native lazy-loading is used appropriately**: below-the-fold grid/gallery images use `loading="lazy"`, while the hero/LCP candidate correctly loads eagerly.
- **HTML responses are Brotli-compressed** (`content-encoding: br`) and reasonably sized (~52.5KB compressed for the product page), with long-lived `Cache-Control` on static assets and CDN images (`max-age=31557600`).
- **Explicit width/height attributes are present on all real content `<img>` elements**, which substantially reduces image-driven CLS risk (see visual.md for the one exception found).
