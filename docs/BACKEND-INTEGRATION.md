# Spring Boot API integration handoff

## Boundary

UI code reads through `ContentRepository` and `ProductRepository`. Keep those interfaces stable and replace only the static adapters. Server Components should call Spring Boot directly; client catalogues should receive typed server-fetched data as props.

## Proposed entities

- `Service`, `Project`, `ProjectMedia`
- `CatalogueProduct`, `SupplyBoard`, `ProductSpecification`
- `Accommodation`, `AccommodationMedia`, `Amenity`, `HouseRule`
- `Enquiry` and `EnquiryLine` only after consent, retention, anti-spam and delivery ownership are approved

Every publishable entity needs UUID, unique slug, status (`DRAFT`, `PUBLISHED`, `ARCHIVED`), title/name, summary, timestamps and optional SEO title/description. Media needs URL, alt text, rights/source record, sort order and focal point. Prices need currency, amount, verification timestamp and display status; absence remains “on request”. Availability must be dated source data and never inferred.

## API and migration

Expose versioned read endpoints for services, projects, products, boards and accommodation plus slug details. Return cache validators and explicit publication state. Keep administrative writes authenticated and role checked; never put secrets in `NEXT_PUBLIC_*` variables.

1. Create Flyway migrations and JPA entities with publication constraints.
2. Seed current records as `DRAFT`/illustrative, preserving IDs where practical.
3. Add DTO mapping and contract tests; do not serialize JPA entities directly.
4. Implement REST repository adapters with runtime validation, timeouts and graceful not-found handling.
5. Set server-only `API_BASE_URL`, cache/revalidation rules and preview CORS only if browser calls become necessary.
6. Compare static and API output in staging, then switch adapters behind an environment flag.
7. Retain static data for one release as rollback until content and SEO parity are verified.

Enquiry creation is a separate release requiring consent, validation, rate limiting, bot protection, audit logging and delivery monitoring. Received enquiries must remain distinct from confirmed orders or bookings.
