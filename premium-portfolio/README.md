# Uzair Creative Portfolio

Independent Next.js App Router portfolio with warm ivory surfaces, pastel artwork, editorial typography and GSAP motion. The two existing portfolios are untouched. All assets required to run this project are included.

## Run locally

Use Node.js 22 LTS or newer and npm.

```sh
npm ci
npm run dev
```

Open http://127.0.0.1:5175. For the production version, stop the development server first:

```sh
npm run typecheck
npm run build
npm start
```

The app uses local fonts and local optimized artwork. No API keys, database or runtime external asset service are required. Live-project buttons link to the original applications.

## Edit content

- `src/data/site.ts`: identity, contact details, skills and journey.
- `src/data/projects.ts`: featured web projects, graphic artwork and case-study copy. Each project automatically gets `/work/[slug]`. Keep titles, technologies and project claims accurate.
- `src/components/sections/`: home and shared page sections. Hero/About have editorial copy alongside the central site data.
- `src/styles/global.css`: color, spacing, responsive layouts and CSS motion.
- `src/components/animations/Motion.tsx`: GSAP, desktop smooth scrolling, horizontal gallery and lifecycle cleanup.
- `public/images/`: portrait, original artwork and sculpture.
- `public/mockups/`: optimized project presentations.

To add a project, add its entry to the projects array and its local images. Use the `Concept` status for concept work (excluded from the sitemap and marked noindex). Only supply genuine live/source links. The current two projects are CineVerse and FreelancerFlow; no unverified client projects, credentials or testimonials were invented.

## Artwork and mockups

Four original compositions (wide and detail for each featured project) combine freshly captured public application screens with editorial frames. Editable, self-contained HTML sources and source screenshots are in `assets/sources/`. FreelancerFlow's public screen is its sign-in interface; these mockups do not claim to be authenticated dashboard captures.

```sh
npx playwright install chromium
npm run mockups
```

This regenerates the four WebP compositions, smaller variants, social card and ribbon WebP. Edit `scripts/render-mockups.mjs` to change framing, typography or colors. Replace source PNGs to update application screenshots. Set optional `CHROME_PATH` to use another Chromium executable.

The hero sculpture is an original mathematically projected ribbon, rendered from editable `assets/sources/ribbon.svg`. To change its geometry, edit `scripts/ribbon.py`, run `python scripts/ribbon.py`, then `npm run mockups`. Runtime uses an optimized WebP with transform animation, so it needs no WebGL renderer.

The four graphic designs came from the user's original SMIT files; the portrait came from the supplied local portrait. `scripts/prepare-assets.mjs` records those original machine-specific source paths and public screenshot URLs. It is a one-time preparation utility, not a required build step. On another machine, update those paths before running it. No code or assets were imported from the old portfolios. Font licenses are included in `fonts/`.

## Motion and accessibility

Desktop uses smooth wheel scrolling, project image reveals, a pinned horizontal artwork gallery and restrained magnetic buttons. Touch devices use native scrolling and a swipeable gallery. Offscreen sculpture motion pauses; reduced-motion preferences disable decorative motion. Content is server-rendered and remains available without JavaScript. Navigation includes a skip link, mobile menu, focus states and native artwork dialogs with Escape dismissal.

## SEO and domain setup

The public domain has not been selected. Do not enter an invented canonical domain. Copy `.env.example` to `.env.local` only when needed:

- `SITE_URL`: the final HTTPS production origin, without a path.
- `GOOGLE_SITE_VERIFICATION`: your actual Search Console verification token.
- `BING_SITE_VERIFICATION`: your actual Bing verification token.

Rebuild after changing these values. Without SITE_URL, canonicals and sitemap URLs are deliberately omitted. With it, the site generates canonical metadata, absolute social images and a sitemap covering real pages. Preview deployments (`VERCEL_ENV=preview`) have noindex metadata, an X-Robots-Tag header and a disallow robots file.

Each page has a unique title/description, one H1, readable server content and relevant structured data. Person, WebPage, CreativeWork and project breadcrumbs help describe the portfolio. This also makes the content understandable to search and AI systems; ranking or AI citations cannot be guaranteed.

After publishing: verify the real domain in Google Search Console, submit `/sitemap.xml`, inspect the home and project URLs, and check mobile rendering and indexing. Search Console measures and manages search visibility; it does not host the portfolio.

References: [Next.js metadata](https://nextjs.org/docs/app/api-reference/functions/generate-metadata), [Google AI features guidance](https://developers.google.com/search/docs/appearance/ai-features).

## GitHub and Vercel

Upload this folder as its own repository. Include `src`, `public`, `fonts`, `scripts`, `assets`, package files and configuration. Do not upload `node_modules`, `.next`, `artifacts`, `.env.local` or secrets; `.gitignore` covers these. Use Git/GitHub Desktop for folder uploads rather than the browser's 100-file upload batch.

Import the repository into Vercel, choose Next.js, and use this folder as the root if it is inside a larger repository. Default build command: `npm run build`. Add the production domain and verification environment variables once chosen, then redeploy. No deployment has been performed as part of this local build.

## Validation

```sh
npm run typecheck
npm run build
npx playwright install chromium
# With npm start running in another terminal:
npm run test:browser
node scripts/check-seo.cjs
```

Browser checks cover 360, 390, 430, 768, 1024, 1280, 1440 and 1920px widths; overflow; navigation; case studies; artwork dialogs; image decoding; structured data; genuine 404 responses; no-JavaScript content; reduced motion; and page errors. Screenshots are written to ignored `artifacts/`. Set TEST_URL for another local port and CHROME_PATH for an existing browser. Automated desktop browser emulation is not a substitute for testing on physical low-end phones; no physical-device performance score is claimed.
