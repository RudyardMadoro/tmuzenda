# TK Muzenda Properties — implementation notes

## Phase 1 foundation

- Retained Next.js 16, React 19, strict TypeScript, Tailwind CSS v4, `next/image`, local assets and the reduced-motion-aware `ScrollReveal` component.
- Established six company service areas and a charcoal, warm-ivory and champagne/bronze design system.
- Added a typed domain layer and `ContentRepository` contract. The static implementation can later be replaced by a REST adapter without changing page components.
- Contact actions use the verified business email. There is no simulated form submission.

## Phase 2 delivered

### Property transformation

- Expanded `/services/property-transformation` into a dedicated editorial service page.
- Covers construction, renovations, extensions, modifications, maintenance and interiors with descriptions, benefits, imagery and contextual enquiry links.
- Added a four-stage transformation process and an accessible range-input comparison that tells a transparent planning-to-vision story.

### Cabinetry and custom interiors

- Expanded `/services/cabinetry-custom-interiors` into a dedicated page for kitchens, wardrobes, vanities, TV units and custom storage.
- Added material/finish inspiration, craftsmanship messaging, a keyboard-operable gallery/lightbox and direct quote enquiry paths.

### Projects

- Added client-side category filtering while preserving statically rendered typed project data.
- Added static `/projects/[slug]` routes with metadata, gallery, summary, indicative scope and optional comparison content.
- Added `getProject(slug)` to the repository contract and included detail routes in the sitemap.
- Every current project is typed and visibly labelled `Illustrative concept`; names, places, imagery and copy do not assert completed client work.

## Accessibility and responsive behaviour

- Filter controls expose pressed state and announce result counts.
- Gallery items are semantic buttons; the lightbox supports Escape and arrow-key navigation, descriptive alternative text and an autofocus close control.
- Comparison controls use a labelled native range input with an accessible value description.
- Layouts use mobile-first grids at phone, tablet and desktop breakpoints. Motion remains subject to the global reduced-motion override.

## Validation

- `npm run lint` — passes.
- `npm run build` — passes, including TypeScript and static generation of all project and service routes.
- `npm test` — runs focused Node tests for cutting dimensions, unit conversion, rotated sheet fit, invalid quantities, enquiry disclaimers, category filtering and search.

## Phase 3 delivered

- Added typed `CatalogueProduct`, `SupplyBoard`, cutting-panel and request models plus a dedicated `ProductRepository` contract backed by static data. A Spring Boot adapter can replace it without changing page components.
- Rebuilt `/products/boards` with material filters, detail views, multi-board selection and an interactive multi-panel cutting planner. Validation covers positive dimensions, positive whole quantities, centimetre conversion and indicative sheet fit in either orientation.
- Added optional edge-banding by panel side, panel notes, editable generated summaries and transparent email handoff. Long email URLs are withheld and the full specification remains copyable.
- Rebuilt `/products/hardware` as a searchable, category-filtered catalogue spanning construction materials, boards, screws, nails, fittings, tools and accessories. Client-side quantities form an enquiry list only.
- All current Phase 3 catalogue entries are visibly illustrative, and pricing is explicitly unverified or on request. No stock, pricing, feasibility, order, checkout, payment or persistence claim is made.
- Product cards, dialogs and planners use native buttons, labelled controls, live result counts, visible focus styles, responsive grids and mobile-safe horizontal filter rows.

## Known gaps before production launch

- Replace licensed template photography and illustrative studies with approved company photography and verified project facts.
- Confirm the production domain currently used by metadata, sitemap and robots.
- Connect the repository to the planned API when content administration is required.
- Add a real enquiry backend only when consent, validation, delivery, anti-spam and privacy handling are defined; until then all CTAs use transparent contact channels.
- Add browser-based visual regression and end-to-end accessibility tests when a test runner is introduced.
- Replace illustrative Phase 3 imagery and catalogue records with supplier-approved assets, SKUs, specifications and verified prices.
- Confirm cutting constraints such as saw kerf, trim allowances, grain direction, edge-banding compatibility and machine limits before turning indicative fit checks into production validation or optimisation.
- Add browser-level mobile and automated accessibility coverage when Playwright or an equivalent runner is adopted; current mobile/accessibility verification is structural and build-time.

## Phase 4 delivered

- Added separate `/rentals` and `/short-stays` catalogues plus statically generated detail routes, metadata and sitemap entries.
- Introduced a typed `Accommodation` model and repository methods for rental and short-stay records. Every current record is explicitly illustrative and uses licensed template imagery pending verified inventory.
- Rental filtering covers location, property type, minimum bedrooms and bathrooms, verified-price status and known-availability status. Unknown rent, deposit, lease terms and availability are not invented.
- Detail pages reuse the accessible gallery/lightbox and established editorial design, with accommodation specifications, amenities, conditional terms and direct enquiry paths.
- Short-stay detail pages include occupancy, house rules and a client-side date/guest selector that prepares an email enquiry. It does not claim availability, reserve dates, confirm a booking or process payment.
- Desktop and mobile navigation now link directly to both accommodation experiences.

## Phase 4 remaining gaps

- Replace illustrative accommodation records and template photography with approved, property-specific content.
- Verify rent/nightly rates, deposits, lease terms, occupancy, house rules and availability before publishing any record as live inventory.
- Add a managed availability source and enquiry backend only when operational ownership, consent, anti-spam and privacy requirements are defined. A future integration must continue to distinguish requests from confirmed reservations.
- Add Playwright viewport, keyboard/lightbox and form-flow coverage when browser testing is introduced.
