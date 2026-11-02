# Development Guide

Install dependencies with `npm ci`, copy `.env.example` to `.env.local`, and run `npm run dev`.

Add or edit business content in `src/data/`, keep public access behind the repository interfaces in `src/repositories/`, and update the types in `src/types/index.ts` when the content model changes. Use Server Components unless browser state or browser APIs are required.

Images belong under `public/images/` with descriptive filenames and meaningful alt text. Clearly label illustrative work and accommodation. Do not add unverified contact details, locations, pricing, availability or completed-project claims.

Before handing off changes, run `npm run check` and review internal routes, image paths, keyboard behavior, responsive layouts, metadata, sitemap and robots output.
