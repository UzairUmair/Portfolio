# Validation

Completed on 24 September 2026.

- Dependency installation: successful; npm reported no vulnerabilities.
- Production build: successful.
- Browser runtime: no page exceptions recorded.
- Horizontal overflow: none at 320, 360, 375, 390, 425, 480, 768, 1024, 1280, 1440 and 1920 px.
- Desktop and mobile screenshots visually reviewed, including both themes and the supplied artwork.
- Theme choice survives reload.
- Mobile navigation opens; Escape closes it. Native modal dialog provides focus containment and background content is inert while open.
- React project filter returns the blog project; Print returns two graphic projects.
- All eight detail pages load with the correct title and image.
- Detail-page refresh works on the local server; Vercel rewrite is supplied for deployment.
- Image dialog opens and Escape closes it.
- Empty contact form presents four validation messages. No message was sent during testing.
- Unknown route renders the 404 view.
- Résumé response: HTTP 200. Supplied PDF preserved.
- No missing image assets found.

Limitations: no Lighthouse score claimed; provider-backed email delivery is unconfigured and untested. Vercel deployment has not been performed. Public project sources were read without creating accounts or writing data. QA scripts use this machine's bundled Playwright; screenshots and raw results are in the ignored `qa/` directory.
