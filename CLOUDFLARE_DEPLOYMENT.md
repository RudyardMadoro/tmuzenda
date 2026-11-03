# Cloudflare Pages deployment

## Architecture

TK Muzenda Properties remains a Next.js 16 App Router application. `next build` produces a static HTML export in `out/`; Cloudflare Pages serves the HTML, JavaScript, CSS, images and locally hosted fonts from its free static network.

All content routes are generated at build time. Dynamic project, service, rental and short-stay URLs use `generateStaticParams`. Images use `next/image` with static-export-compatible unoptimized output, retaining responsive source sizing and lazy loading without a paid image service.

The contact form is the only server-side feature. `functions/api/contact.ts` is a Cloudflare Pages Function at `/api/contact`. It retains validation, spam checks and Resend delivery while keeping credentials out of the browser. `public/_routes.json` limits Function invocations to that endpoint; ordinary site traffic remains static.

Manrope and Cormorant Garamond are bundled locally through `next/font/local`. Builds do not contact Google Fonts.

## Build settings

| Setting | Value |
| --- | --- |
| Project name | `tkmuzenda` |
| Platform | Cloudflare Pages |
| Framework preset | Next.js (Static HTML Export) |
| Production branch | `main` |
| Root directory | `/` (repository root) |
| Build command | `npm run build` |
| Build output directory | `out` |
| Node.js version | 20 or newer |
| Hosting plan | Free |

Do not select the full-stack Next.js Workers preset and do not point this project at `.next`. The deployable Pages output is `out`.

## Create the Git-connected Pages project

1. Open Cloudflare Dashboard > **Workers & Pages** > **Create application** > **Pages** > **Connect to Git**.
2. Authorize GitHub access and select `RudyardMadoro/tmuzenda`.
3. Set the project name to `tkmuzenda` and production branch to `main`.
4. Select **Next.js (Static HTML Export)** and enter the build settings above.
5. Add the variables and secrets below for Production and Preview where appropriate.
6. Save and deploy. If the project name is available, the production URL will be `https://tkmuzenda.pages.dev`.

Every subsequent push to `main` starts a production build. Other branches and pull requests receive preview deployments. Generated `out/` and `.wrangler/` files stay uncommitted.

## Variables and secrets

Configure these under **Settings > Variables and Secrets**.

| Name | Kind | Required | Purpose |
| --- | --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Plain-text variable | Yes | Canonical origin, such as `https://tkmuzenda.pages.dev`, without a trailing slash. |
| `RESEND_API_KEY` | Encrypted secret | For form delivery | Used only by the Pages Function. |
| `CONTACT_FROM_EMAIL` | Plain-text variable | For form delivery | A Resend-verified sender. |
| `CONTACT_TO_EMAIL` | Plain-text variable | No | Enquiry recipient; defaults to the configured business email. |
| `NODE_VERSION` | Plain-text variable | Recommended | A current supported Node 20 release if the build does not already use Node 20+. |

Never prefix Resend credentials with `NEXT_PUBLIC_` or commit real credentials. Redeploy after changing Function configuration.

For local Function testing, create an ignored `.dev.vars` file with test credentials, then run `npm run build` followed by `npm run preview`.

## Validation

```bash
npm ci
npm run lint
npm run typecheck
npm test
npm run build
```

Confirm that `out/index.html`, `out/404.html`, `out/robots.txt`, `out/sitemap.xml`, and all generated detail pages exist. The preview command serves `out/` together with the Pages Function.

## Existing Cloudflare Worker

The earlier Worker deployment is separate from this Pages project. Keep it until the Pages URL, contact form and all routes pass production smoke tests. It can then be retired to avoid confusion, provided no custom domain, binding or traffic still depends on it. Deleting it is not required for the Pages free tier and should not happen before the Pages deployment is verified.

## Troubleshooting

- **`next/font/google queries have exactly one entry`:** Verify `src/app/layout.tsx` uses `next/font/local` and both WOFF2 files under `src/app/fonts/` are committed.
- **Missing output directory:** Use `npm run build` and `out`, not `.next`, `.open-next`, or `dist`.
- **Image export errors:** Keep `images.unoptimized: true`; static exports cannot use Next.js' server image optimizer.
- **Contact form returns 503:** Add `RESEND_API_KEY` and `CONTACT_FROM_EMAIL`, verify the sender with Resend, and redeploy. Direct contact links remain available.
- **Canonical links show localhost:** Set `NEXT_PUBLIC_SITE_URL` and trigger a new deployment.
- **A detail route returns 404:** Confirm its slug is returned by `generateStaticParams` and its HTML exists under `out/`.

## Add a custom domain later

1. Open the Pages project and select **Custom domains > Set up a domain**.
2. Enter the desired domain or subdomain and follow Cloudflare's DNS prompts.
3. For an apex domain, use Cloudflare nameservers. For an external-DNS subdomain, add the requested CNAME to `tkmuzenda.pages.dev`.
4. Change `NEXT_PUBLIC_SITE_URL` to the final HTTPS origin and redeploy so metadata, canonical URLs, structured data, `robots.txt`, and `sitemap.xml` use it.
