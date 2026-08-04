# AI Search / GEO Readiness Audit — inquisitivearts.com

**Scope:** AI Overviews/ChatGPT/Perplexity citability, AI crawler accessibility, llms.txt, UCP/agentic-commerce infrastructure as a GEO signal, brand-mention/citability signals, blog presence.
**Method:** Direct HTTP retrieval. Same access caveat as content.md: most storefront HTML pages (home, about-us, artists, portfolio, contact, most product pages) returned HTTP 429 throughout this session, almost certainly from concurrent parallel-agent traffic against the same origin. `robots.txt`, `llms.txt`, `agents.md`, `/.well-known/ucp`, and one full product page (`/products/canvas-5`) were successfully retrieved and are the evidence base below. Per Google's official "optimizing for generative AI search" guidance (developers.google.com/search/docs/fundamentals/ai-optimization-guide), AEO/GEO is treated here as SEO fundamentals applied to AI-search surfaces, not a separate discipline — findings are framed accordingly.

---

## Finding 1: llms.txt exists but contains zero brand-specific content — it's infrastructure documentation, not a citability asset

**Severity:** Medium

**Evidence:** `https://inquisitivearts.com/llms.txt` returns HTTP 200 (4,334 bytes). Its content is **byte-for-byte the same document** as `/agents.md` (confirmed by direct comparison) — a generic "Agent Instructions" page covering:
- A recommendation that AI shopping agents install Shopify's third-party `https://shop.app/SKILL.md` skill
- UCP/MCP protocol discovery and checkout-flow instructions
- Generic JSON API endpoint patterns (`/products/{handle}.json`, `/collections/{handle}/products.json`)
- Links to policy pages (privacy, terms, refund)
- Generic Shopify platform boilerplate ("Start your own store," "Shopify developer platform")

It contains **no curated list of key pages** (no link to `/pages/about-us`, `/pages/artists`, `/pages/portfolio`), **no facts about the artist or the brand**, and **no differentiated content** that would help an LLM answer "who is Anugrah Mishra" or "what does Inquisitive Arts sell" beyond generic e-commerce mechanics. This is the standard llms.txt template Shopify now appears to roll out platform-wide for stores with UCP enabled — confirmed non-unique to this merchant.

Important context per Google's own current guidance: Google Search (including AI Overviews/AI Mode) **explicitly ignores llms.txt** — "won't harm (nor help) your visibility or rankings in Google Search." So this file has no Google-side citation value regardless of content. Its only potential value is for non-Google AI crawlers (ChatGPT, Perplexity, etc.) that may choose to read it, and Google's own John Mueller has called the llms.txt discovery use case "a dead end" more broadly. Treat it as low-priority.

**Recommendation:** Do not over-invest here — this is not a Google ranking/citation lever. If keeping the file, replace the generic Shopify boilerplate with an actual curated section (brand one-line description, links to About/Artists/Portfolio with one-line descriptions, key facts like "UK-based," "originals and prints," medium). This costs little and helps the non-Google AI crawlers that do read the file, but should not be treated as a priority GEO investment — real content on the pages themselves (see content.md) matters far more.

---

## Finding 2: UCP/agentic-commerce infrastructure is fully wired up — a genuine (if platform-standard) AI-shopping-agent readiness signal

**Severity:** Info / Positive

**Evidence:** `GET /.well-known/ucp` returns a complete, valid UCP merchant profile (HTTP 200): supported protocol versions (`2026-04-08`, `2026-01-23`), full capability set (`checkout`, `cart`, `fulfillment`, `discount`, `order`, `catalog.search`, `catalog.lookup`), and two configured payment handlers — Google Pay (with real merchant IDs, not placeholders) and Shop Pay. `robots.txt` and `agents.md` both explicitly document the UCP/MCP endpoint (`POST /api/ucp/mcp`) and instruct agents to prefer it over scraping.

This means an AI shopping agent (a "buy for me" agent, Shop skill, etc.) can programmatically discover the catalog, search products, build a cart, and checkout (with required human payment approval) without any custom integration work — this is Shopify's platform capability, not something this merchant built, but it is live, correctly configured (real merchant/shop IDs, not template placeholders), and functioning. This is a genuine forward-looking discoverability asset as agentic shopping adoption grows.

**Recommendation:** No action needed — this is working as intended. Worth monitoring as the UCP ecosystem matures (e.g., whether specific product data being surfaced through catalog.search reflects the thin descriptions flagged in content.md — if so, the agentic commerce channel will surface the same content weaknesses).

---

## Finding 3: robots.txt allows all major AI crawlers — no blocking issues

**Severity:** Info / Positive

**Evidence:** `robots.txt` (confirmed live): `User-agent: * / Allow: /`, with only transactional/private paths disallowed (cart, checkout, account, admin, internal Shopify AJAX/service endpoints). There are **no named blocks** for GPTBot, OAI-SearchBot, ClaudeBot, PerplexityBot, Google-Extended, or any other AI crawler — they all fall under the open wildcard rule. `adsbot-google` gets its own explicit allow-block for products/collections/pages/blogs (standard Shopify boilerplate). The file also proactively documents `agents.md` and the UCP endpoints for agent discovery, and states a clear "checkouts are for humans" policy requiring buyer approval before any agent-driven payment.

**Recommendation:** No change needed. This is a clean, permissive configuration for AI search visibility across all major platforms (Google AI Overviews/AI Mode, ChatGPT, Perplexity, Bing Copilot).

---

## Finding 4: Structured data (schema) has a broken/placeholder entry and an unfixed default value — undermines entity-clarity signals

**Severity:** Medium-High

**Evidence:** Two separate `Organization` JSON-LD blocks are emitted on the retrieved product page:

Block A (broken):
```json
{"@context":"https://schema.org","@type":"Organization","name":"Inquisitive Arts","url":"https://inquisitivearts.com","logo":"https://inquisitivearts.com/path-to-your-logo.png"}
```
`logo` is a literal unfilled template placeholder (`path-to-your-logo.png` — not a real file) — this is dead/broken structured data actively being served to crawlers and AI systems trying to establish entity identity.

Block B (mostly correct, but with a data-quality issue):
```json
{"@context":"http://schema.org","@type":"Organization","name":"Inquisitive Arts","logo":".../Refine_Logo.png...","sameAs":["","","","https://www.instagram.com/inquisitive_artist_/","https://tiktok.com/@shopify","","","",""],"url":"https://inquisitivearts.com"}
```
The `logo` here is correctly populated, but `sameAs` (the array AI systems use to cross-reference brand presence across platforms — directly relevant to the "brand mentions > backlinks" GEO signal) is mostly empty strings, and one populated entry is **`https://tiktok.com/@shopify`** — Shopify's own default/placeholder TikTok handle, not the merchant's. This is a wrong entity association actively published in structured data: an AI system parsing this could associate Inquisitive Arts with Shopify's TikTok account.

**Recommendation:** Fix both issues immediately — they are quick, high-value fixes: (1) remove or correct the broken `path-to-your-logo.png` Organization block, (2) populate `sameAs` with the store's actual social profiles and remove the erroneous `tiktok.com/@shopify` entry, or remove it if no real TikTok account exists. This directly supports the "authority & brand signals" citability factor GEO frameworks weight most heavily after content quality.

---

## Finding 5: No blog / editorial content surface — a structural GEO gap, not just a content gap

**Severity:** Medium

**Evidence:** `/blog` and `/blogs` both return HTTP 404. Neither `llms.txt`, `agents.md`, nor `robots.txt` (which explicitly allow blog-related paths like `/blogs/*account` for boilerplate reasons) reference any actual live blog content endpoint. Per GEO research cited in this framework, ~44% of AI citations come from the first 30% of a page and self-contained, quotable, first-person passages are what get extracted — a product-only site has structurally no surface for this kind of content. Recency also matters for AI citation eligibility (content under ~3 months old is ~3x more likely to be cited); a blog is the natural mechanism for maintaining that freshness signal.

**Recommendation:** Same underlying fix as content.md Finding 3 — stand up a blog with story-driven, first-person posts (artist process, inspiration, "how we print," collection launches). This is the highest-leverage new-content GEO investment available to this site, because it's the only way to create genuinely citable, unique passages that generic product copy cannot provide.

---

## Finding 6: Product-level passage quality is weak for AI citation purposes

**Severity:** High (ties to content.md Finding 1)

**Evidence:** The retrieved product description (~99 words, see content.md) is generic marketing copy ("Looking to add a little flair to your room or office?") rather than a self-contained, quotable, fact-dense passage. GEO best practice targets 134-167 word self-contained answer blocks with specific, checkable facts (materials, dimensions, technique, provenance) — this description is shorter than that target and low on unique facts (no dimensions stated in visible text, no technique detail beyond "watercolor," no story).

**Recommendation:** Rewrite product descriptions to front-load a specific, quotable 1-2 sentence factual summary (medium, size, technique, story in brief) before the generic marketing language — this both serves human shoppers better and gives AI Overviews/ChatGPT/Perplexity something concrete to extract and cite.

---

## What's working well

- **UCP/agentic-commerce plumbing is fully live and correctly configured** (Finding 2) — ahead of most small e-commerce sites on this specific dimension, even though it's Shopify platform boilerplate rather than merchant-specific effort.
- **robots.txt is clean and permissive for all major AI crawlers** (Finding 3) — no accidental blocking of GPTBot, ClaudeBot, PerplexityBot, etc.
- **Brand naming is consistent** across meta tags, JSON-LD `name`/`brand` fields, and visible copy ("Inquisitive Arts" / "Anugrah Mishra") — entity identity is at least coherent even where the supporting sameAs data is broken.
