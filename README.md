# TK Muzenda Properties

TK Muzenda Properties is a responsive Next.js website for property transformation, cabinetry and custom interiors, board supply and cutting, supporting hardware, accommodation enquiries, and project presentation.

The current content repository is static and typed. Illustrative projects and accommodation records are clearly labelled until verified business content and inventory are supplied.

## Implemented features

- Property transformation and cabinetry service pages
- Board catalogue with a client-side cutting-request planner
- Supporting-hardware catalogue and enquiry list
- Project catalogue and project detail pages
- Residential rental and short-stay catalogue flows
- Accessible galleries, dialogs, navigation, and reduced-motion support
- SEO metadata, social metadata, JSON-LD, sitemap, and robots output
- Responsive layouts for mobile, tablet, and desktop
- Content-integrity, product-filtering, and cutting-request tests

## Technology

- Next.js 16.4.1 App Router
- React 19.3
- TypeScript
- Tailwind CSS 4
- Lucide React icons

## Local setup

Requirements: Node.js 20 or newer and npm.

```bash
git clone https://github.com/RudyardMadoro/tmuzenda.git
cd tmuzenda
npm ci
copy .env.example .env.local
npm run dev
```

Open `http://localhost:3000`.

## Commands

```bash
npm run dev        # Development server
npm run lint       # ESLint
npm run typecheck  # TypeScript validation
npm test           # Node test suite
npm run build      # Production build
npm run check      # Full validation pipeline
npm start          # Serve a production build
```

## Configuration

`NEXT_PUBLIC_SITE_URL` controls canonical URLs, social metadata, the sitemap, robots output, and structured-data identifiers. It defaults to the local development origin. Set it to the verified public domain in the deployment environment; do not include a trailing slash.

The contact form uses the server-side Resend API integration. Configure `RESEND_API_KEY` and a verified `CONTACT_FROM_EMAIL`; `CONTACT_TO_EMAIL` defaults to `rudyardmadoro@gmail.com`. Never expose these values with a `NEXT_PUBLIC_` prefix or commit `.env.local`.

## Content and enquiries

Business content is stored in `src/data/` and exposed through repository adapters in `src/repositories/`. Verified phone, WhatsApp, email and address values are centralized in `src/config/contact.ts`. Product and accommodation actions open contextual email or WhatsApp enquiries; the contact form sends through the server-side provider when configured.

## Deployment

Run `npm run check`, configure `NEXT_PUBLIC_SITE_URL`, and deploy with a Next.js-compatible platform using:

- Install: `npm ci`
- Build: `npm run build`
- Start: `npm start`

See [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md) and [docs/PHASE-5-DEPLOYMENT.md](docs/PHASE-5-DEPLOYMENT.md) for the release checklist.

## Assets and licensing

The application contains licensed illustrative photography and newly supplied project imagery. Illustrative material must not be represented as completed work or live accommodation inventory. Review [ASSETS.md](ASSETS.md) before replacing or publishing imagery.

The source remains subject to [LICENSE](LICENSE), including retained attribution and third-party asset notices inherited from the original template.
