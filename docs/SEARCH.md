# Search and AI-search setup

## Before publishing

1. Choose the public domain and configure `VITE_SITE_URL` as an HTTPS origin, without a path.
2. Run `npm run build` and publish `dist`.
3. Check each live project URL returns its own rendered HTML, title and canonical link. Ensure images, CSS and JavaScript are publicly accessible.
4. Verify ownership in Google Search Console using the DNS record or verification method Google provides. No verification token is included or fabricated in this project.
5. Submit `https://YOUR-DOMAIN/sitemap.xml`. Use URL Inspection for the homepage and both featured project pages, then request indexing.
6. Monitor indexing, canonical selection, mobile usability and Core Web Vitals after real traffic accumulates.

## Included

Fifteen prerendered HTML routes contain the same React content used by the interactive site. Metadata is shared between the build and client navigation. Person, WebSite, page, CreativeWork and breadcrumb structured data describes the actual owner and projects. No invented reviews, client outcomes or ratings are included. Crawling is permitted through robots.txt. Unknown client routes use noindex.

When no domain is configured, sitemap generation and canonical tags are intentionally omitted. Rebuild after changing the domain; do not edit generated files by hand.

## GEO / AI search

Clear identity, descriptive case studies, semantic headings, crawlable project links and accessible HTML support both conventional and AI search. There is no special AI ranking file or guaranteed placement. Keep project descriptions accurate and update real work over time.

References:
- https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics
- https://developers.google.com/search/docs/appearance/ai-features

Search Console measures search performance; it does not itself rank a site. Submission and technical eligibility do not guarantee indexing, rankings or AI citations.
