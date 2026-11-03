# Architecture

TK Muzenda Properties is a Next.js 16 App Router application using React 19, TypeScript, Tailwind CSS 4, Server Components by default, and focused client components for interactive catalogues and enquiry preparation.

## Main areas

- `src/app/`: landing, services, projects, products, accommodation, legal, sitemap and robots routes.
- `src/components/`: layout, service, project, product, accommodation and shared UI components.
- `src/data/`: typed static business, project, product and accommodation content.
- `src/repositories/`: asynchronous adapters that isolate pages from the current static data source.
- `src/lib/`: cutting-request validation, product filtering and focus helpers.
- `tests/`: Node tests for content integrity and domain helpers.
- `public/images/`: current supplied and licensed illustrative imagery.

Dynamic service, project, rental and short-stay routes use repository lookups, generated metadata and static parameter generation. Interactive selections remain in the browser and hand off through prefilled email links; there is no persistence, checkout, booking engine or backend submission.
