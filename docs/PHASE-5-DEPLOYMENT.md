# Deployment and rollback

## Chosen platform: Vercel

Use Node.js 20 or newer. Import the repository with framework preset **Next.js**, install command `npm ci`, build command `npm run build`, and default `.next` output. Set `NEXT_PUBLIC_SITE_URL` separately for preview and production to the public origin. The static site needs no private runtime secrets.

Before promotion run `npm ci` and `npm run check`, deploy to preview, then smoke-test every route in `QA-REPORT.md` at 375 px, 768 px and 1440 px. Verify `/robots.txt`, `/sitemap.xml`, share previews, email handoffs and reduced motion. Run Lighthouse against preview; monitor field Core Web Vitals after launch.

Protect the production branch, require the check command, deploy a named immutable revision, verify domain and TLS, then promote. Do not enable indexing until domain, legal copy, company claims and imagery have business approval.

## Rollback

Promote the last known-good Vercel deployment without rebuilding. Keep it available until smoke tests and monitoring are clean. If configuration caused the incident, restore the previous environment value and redeploy the known-good revision. Record the failed revision, symptom, rollback time and owner.
