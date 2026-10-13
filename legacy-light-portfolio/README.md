# Uzair Umair — MERN Stack Developer

A creative portfolio with a light editorial layout, interactive 3D artwork, two featured web projects, and a slow graphic-design rainfall gallery.

![Portfolio preview](docs/images/portfolio-preview.webp)

## Highlights

- FreelancerFlow and CineVerse presented as animated project passes.
- Three additional web projects and seven graphic-design works.
- Real WebGL artwork, scroll animation, mobile layouts and reduced-motion support.
- Project detail pages, downloadable résumé and contact links.
- Fifteen prerendered pages with individual metadata and structured data.

## Run locally

Use Node.js 22.12 or newer.

```sh
npm ci
npm run dev
```

```sh
npm run build
npm run preview
```

The production build is written to `dist/`.

## Stack

React · Vite · React Router · Three.js · React Three Fiber · GSAP · Lenis · Lucide

## Customize

| Location | Content |
| --- | --- |
| `src/data/profile.js` | Identity, contact details and résumé |
| `src/data/projects.js` | Web projects and live links |
| `src/data/designProjects.js` | Graphic-design gallery |
| `src/styles/editorial.css` | Editorial design and responsive styles |
| `public/` | Images, local fonts and résumé |
| `src/seo.js` | Metadata and structured data |

The contact form opens an email draft by default. An optional public form-provider endpoint can be configured through `VITE_CONTACT_ENDPOINT`. Never put private keys into Vite environment variables; they are exposed to the browser.

## Upload to GitHub

This package contains source files and public assets only. Do not upload `node_modules`, `dist`, private environment files, recordings or local test artifacts.

**Browser upload:** extract the ZIP, open the extracted folder, and drag its contents into the repository’s **Add file → Upload files** area. Keep `package.json` at the repository root. Do not upload the ZIP itself. If GitHub reports too many files, upload folders in separate batches.

**Git:** from this folder, for a new repository:

```sh
git init
git add .
git commit -m "Add MERN developer portfolio"
git branch -M main
git remote add origin YOUR_REPOSITORY_URL
git push -u origin main
```

A GitHub Actions workflow runs the production build on pushes and pull requests.

## Deploy and configure search

Import the repository into Vercel or Netlify. Build command: `npm run build`. Output directory: `dist`. The routing configuration preserves static pages and client-side navigation.

The public domain is intentionally unset. Once chosen, add `VITE_SITE_URL=https://your-domain.com` to the hosting build environment and rebuild. Canonical URLs and the sitemap will then be generated. See [Search setup](docs/SEARCH.md) for Google Search Console verification and submission.

GitHub repository upload alone does not publish a live website. GitHub Pages would require additional routing/base-path configuration. Search eligibility does not guarantee indexing or rankings.

## Credits and ownership

Portfolio content and artwork: Uzair Umair. Local font licenses are included alongside the fonts. Visual inspiration: [giats.me](https://giats.me/). No blanket reuse license is granted for personal artwork or project screenshots.
