# Deployment

The production target is Cloudflare Pages using a Next.js static HTML export. See [`CLOUDFLARE_DEPLOYMENT.md`](../CLOUDFLARE_DEPLOYMENT.md) for the complete setup and release procedure.

## Requirements

- Node.js 20 or newer
- npm
- A verified public origin for production metadata

## Release validation

```bash
npm ci
npm run check
npm run preview
```

The build emits the static website to `out/`. Cloudflare Pages serves those files directly. The only runtime endpoint is `/api/contact`, implemented as a Pages Function in `functions/api/contact.ts` so Resend credentials remain server-side.

Set `NEXT_PUBLIC_SITE_URL` to the public origin without a trailing slash. Configure `RESEND_API_KEY` as an encrypted secret, `CONTACT_FROM_EMAIL` as the verified sender, and optionally `CONTACT_TO_EMAIL` in Cloudflare Pages. Without the first two values, the contact form reports a configuration error while phone, email and WhatsApp links remain available.

After deployment, smoke-test the landing page, services, projects, products, accommodation, contact, privacy and terms routes; verify the form, direct contact links, social previews, `robots.txt`, and `sitemap.xml`.
