# Deployment

## Requirements

- Node.js 20 or newer
- npm
- A Next.js-compatible hosting environment
- A verified public domain before enabling production canonical URLs

## Cloudflare Workers (Git integration)

This repository currently relies on Cloudflare Workers' automatic Next.js configuration rather than a committed OpenNext, vinext, or Wrangler setup. Keep that deployment path unless Cloudflare's automatic configuration reports a compatibility gap; adding a second adapter would create competing build pipelines.

Configure the connected Worker with:

- Root directory: `/`
- Install command: `npm ci` (or leave Cloudflare's automatic npm install enabled)
- Build command: `npm run build`
- Deploy command: `npx wrangler deploy`
- Output directory: none; Workers automatic configuration supplies the Worker and asset entry points
- Node.js version: 20 or newer

Cloudflare currently detects Next.js 16 projects and configures vinext automatically during deployment. If the dashboard offers an automatic-configuration pull request, review and merge that generated configuration instead of manually adding OpenNext. The Worker name in any generated `wrangler.jsonc` must exactly match the existing Worker name in Cloudflare.

The production build must not download fonts. Manrope and Cormorant Garamond are committed as local WOFF2 files and bundled by `next/font/local`.

## Release process

```bash
npm ci
npm run check
npm start
```

Set `NEXT_PUBLIC_SITE_URL` to the verified public origin without a trailing slash. The value drives metadata, canonical URLs, structured-data identifiers, `robots.txt`, and `sitemap.xml`. The repository intentionally defaults to `http://localhost:3000` rather than assuming a production domain.

Configure `RESEND_API_KEY`, a Resend-verified `CONTACT_FROM_EMAIL`, and optionally `CONTACT_TO_EMAIL` for contact-form delivery. Store these only in the deployment platform and never expose them with a `NEXT_PUBLIC_` prefix. Without the first two variables, the form displays a configuration error and direct phone, email and WhatsApp channels remain available.

After deployment, smoke-test the landing page, services, projects, products, accommodation, contact, privacy and terms routes; verify email links, social previews, `robots.txt`, and `sitemap.xml`.
