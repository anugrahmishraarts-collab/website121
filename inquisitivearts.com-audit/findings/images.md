# Image Optimization & Alt Text Findings — inquisitivearts.com

Method: Real browser inspection via Playwright (Chromium) on homepage (https://inquisitivearts.com/), product page (https://inquisitivearts.com/products/canvas), and collection page (https://inquisitivearts.com/collections/prints). Alt text pulled from the live DOM (`img.alt`), not just page source, so it reflects what actually renders, including images injected by theme sections/apps.

---

### Hero/banner images missing alt text
**Severity:** High
**Evidence:** On the homepage, 3 of 17 `<img>` elements have empty `alt=""`:
- `Refugee_s-_Resilience_and_Dreams.jpg` (the full-bleed homepage hero image, ~1800px wide) — no alt text at all.
- `SAVE_20190314_105446.jpg` (large, width=1800 — appears to be a secondary "image with text" banner further down the page) — no alt text.
- `IMG_9554-2.jpg` (width=900, likely an about/artist section image) — no alt text.

These are large, meaningful content images (not decorative background patterns), so leaving `alt=""` is a missed accessibility and image-SEO opportunity — for a gallery site, the artwork/hero images are effectively the product. Google Images and AI answer engines cannot understand what these images depict without alt text, and screen reader users get no description of the hero at all.
**Recommendation:** Add descriptive, specific alt text to every content image (e.g. "Refugee's Resilience and Dreams — oil painting by Anugrah Mishra" for the hero), following the same naming convention already used elsewhere on the site (see "what's working well" below). If an image is purely decorative, that's a valid reason for `alt=""`, but these three are not decorative — they carry primary content meaning.

---

### Generic, duplicated alt text on product variant thumbnails
**Severity:** Low
**Evidence:** On the product page (`/products/canvas`, live example "Mother Teresa"), the small thumbnail images used for the canvas-size/frame mockups all share the identical alt text `"Product mockup"` regardless of which size or crop is shown. Example duplicates found: `canvas-_in_-16x16-front-....jpg`, `canvas-_in_-20x20-front-....jpg`, `canvas-_in_-26x26-front-....jpg` — all alt="Product mockup".
**Recommendation:** Low priority since these are secondary/supporting images, but differentiating alt text (e.g. "Mother Teresa canvas print, 16×16 inch, room mockup") would improve accessibility for size-comparison shopping and adds minor incremental image-SEO value. Not urgent.

---

### Duplicate main product image node with blank alt (lightbox/zoom trigger)
**Severity:** Low
**Evidence:** On the product page, the main artwork image (`Mother_Teresa.jpg`) appears twice in the DOM — one instance carries the correct alt ("Mother Teresa- Anugrah Mishra"), a second instance (used for the zoom/lightbox trigger) has `alt=""`.
**Recommendation:** Set the same descriptive alt on the zoom-trigger duplicate, or mark it `aria-hidden="true"` if it's purely a visual/interactive duplicate of an already-described image, so screen readers don't get an unlabeled interactive image.

---

### What's working well
- **Collection and product-listing images have strong, descriptive alt text.** On `/collections/prints`, 7 of 8 images sampled had specific, artwork-named alt text following a consistent "Title - Artist Name" pattern (e.g. "Landscape II- Anugrah Mishra", "Sherlock Holmes- Anugrah Mishra", "Charlie Chaplin - Anugrah Mishra"). This is genuinely good practice for an art-gallery site and should be the template applied to the missing hero/banner images above.
- **Responsive `srcset` is implemented correctly via the Shopify CDN.** Every content image checked ships a full responsive `srcset` using `?width=` params (e.g. 165w/360w/533w/720w/940w/1066w up to native size), so browsers download an appropriately sized file rather than one oversized master image.
- **Explicit width/height attributes are present on all real content images** (only a decorative inline SVG icon lacked them), which is good practice for reducing layout shift (see performance.md for the CLS implication).
- **Native lazy-loading (`loading="lazy"`) is applied** to below-the-fold product grid and gallery images on both the homepage and product page; the hero/LCP image correctly omits `lazy` so it loads eagerly.
- **The CDN automatically serves WebP to real browsers** even though source files are uploaded as `.jpg` (confirmed via live network inspection: a 4.5MB source JPEG was delivered as a 66KB WebP to the product page) — see performance.md for detail.
