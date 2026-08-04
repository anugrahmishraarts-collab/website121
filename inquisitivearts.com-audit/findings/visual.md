# Visual / UX Findings — inquisitivearts.com

**Method note:** Real screenshots captured via a live Chromium browser session (Playwright MCP) — not estimated from static HTML. Desktop viewport 1440×900 and mobile viewport 390×844 (iPhone-class) were captured for the homepage, and both viewports for the product page (`/products/canvas`, live example: "Mother Teresa"). Screenshots saved to `/tmp/ia_audit/screenshots/`: `homepage-desktop.png` / `homepage-desktop-full.png`, `homepage-mobile.png` / `homepage-mobile-full.png`, `product-desktop.png` / `product-desktop-full.png`, `product-mobile.png` (viewport-only vs. full-page scroll captures).

---

### Desktop navigation is fully hidden behind a hamburger menu, even at 1440px wide
**Severity:** Medium
**Evidence:** On the 1440×900 desktop screenshot, the header shows only a hamburger icon, the centered logo, and account/search/cart icons — no visible top-level links. DOM inspection confirmed the actual nav items (Home, Catalogue, Artists, Contact, About) exist but are only revealed after clicking the hamburger, on desktop as well as mobile. For an art-gallery storefront where "browse the catalogue" is the primary path to revenue, hiding category navigation behind an extra click on desktop (where horizontal space for a visible menu bar is abundant) adds friction and reduces discoverability of key pages like the Catalogue/collections.
**Recommendation:** Show a standard horizontal nav bar (Catalogue, Artists, About, Contact) on desktop breakpoints and reserve the hamburger pattern for mobile, where space is genuinely constrained.

---

### Mobile: primary CTA sits right at the fold edge
**Severity:** Low
**Evidence:** On the 390×844 mobile screenshot, the hero image, headline ("Discover Artistic Brilliance"), subhead, and the "Shop now" button are all visible, but the button is right at the bottom edge of the viewport and the secondary "Learn more" button is cut off, requiring a small scroll to fully reach it.
**Recommendation:** Minor — not a blocker since the primary CTA is technically visible, but tightening the hero's vertical padding/copy on mobile would get both CTAs fully on-screen without scrolling, improving perceived speed-to-action.

---

### Homepage hero image lacks alt text (cross-reference with images.md)
**Severity:** High (also logged in images.md)
**Evidence:** The full-bleed hero image behind "Discover Artistic Brilliance" has `alt=""`. Combined with the hidden desktop nav above, a screen-reader user landing on the homepage gets no image description and no visible in-page way to reach category pages without invoking the menu.
**Recommendation:** See images.md — add descriptive alt text to the hero and other missing-alt content images.

---

### Below-the-fold sections rely on scroll-triggered reveal animations that can appear blank
**Severity:** Low / Informational
**Evidence:** A full-page screenshot capture of the homepage showed the "Art Gallery" product grid and a mid-page dark rich-text banner ("Discover Hidden Truths in Psyche-Infused Masterpieces...") rendering with near-invisible content. Investigating the DOM confirmed this is **not** a broken color/contrast bug — the elements use the Shopify Dawn theme's built-in `scroll-trigger animate--slide-in` class, and once settled, computed styles are correct (white text, `rgb(255,255,255)`, on a navy `rgb(19,33,48)` background — good contrast; `opacity: 1`). The apparent "invisible" state only appeared because the automated full-page screenshot scrolled the page programmatically faster than the reveal animation's intersection-observer trigger could fire — this is a testing-method artifact, not a persistent user-facing bug for normal human scroll speed.
**Recommendation:** Not urgent, but worth a quick manual check: confirm these scroll-triggered sections respect `prefers-reduced-motion`, and confirm they still render their content correctly if JavaScript fails to load (progressive enhancement) — theme scroll-trigger effects are occasionally implemented in a way that leaves content at `opacity:0` by default via CSS, only removed by JS, which would make content permanently invisible to any visitor whose JS is blocked or errors out before that section's script runs.

---

### What's working well
- **Above-the-fold value proposition is clear and immediate.** The desktop hero combines a striking full-bleed painting with a legible headline ("Discover Artistic Brilliance"), a one-line description of what the site offers ("Each painting tells a story..."), and two clearly-styled CTA buttons ("Shop now" / "Learn more") — a visitor understands within one screen that this is an art gallery and how to start browsing.
- **Mobile layout reflows cleanly with no obvious broken elements.** Text remains legible, the hero image scales correctly, and there's no visible horizontal scroll or overlapping content at the 390px width tested.
- **Product page is well-structured and trustworthy.** The product page (390px and 1440px both checked) shows a clear lifestyle photo of the artwork in situ, a legible title, price, a working size selector, quantity stepper, a prominent "Add to cart" button, and a distinct "Buy with Shop Pay" button plus a readable product description — nothing feels cramped or ambiguous at either screen size.
- **Product image thumbnails/size selector are present and usable** on both desktop and mobile without layout breakage.
