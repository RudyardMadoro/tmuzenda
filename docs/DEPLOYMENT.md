# Deployment

## Requirements

- Node.js 20 or newer
- npm
- A Next.js-compatible hosting environment
- A verified public domain before enabling production canonical URLs

## Release process

```bash
npm ci
npm run check
npm start
```

Set `NEXT_PUBLIC_SITE_URL` to the verified public origin without a trailing slash. The value drives metadata, canonical URLs, structured-data identifiers, `robots.txt`, and `sitemap.xml`. The repository intentionally defaults to `http://localhost:3000` rather than assuming a production domain.

Configure `RESEND_API_KEY`, a Resend-verified `CONTACT_FROM_EMAIL`, and optionally `CONTACT_TO_EMAIL` for contact-form delivery. Store these only in the deployment platform and never expose them with a `NEXT_PUBLIC_` prefix. Without the first two variables, the form displays a configuration error and direct phone, email and WhatsApp channels remain available.

After deployment, smoke-test the landing page, services, projects, products, accommodation, contact, privacy and terms routes; verify email links, social previews, `robots.txt`, and `sitemap.xml`.
