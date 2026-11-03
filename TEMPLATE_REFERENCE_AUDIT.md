# TK Muzenda Properties Template Reference Audit

Date: 2 November 2026

## Scope

Repository-wide review of source code, routes, metadata, configuration, documentation, public assets, contact handoffs and legal attribution. Searches covered inherited brand names, package identifiers, template/demo terminology, obsolete routes, URLs, email addresses, telephone numbers, physical addresses, social links and unused asset groups.

## Findings and actions

### FIXED

| Area | References discovered | Changes implemented |
| --- | --- | --- |
| Application identity | Package name `shakuro` | Renamed package metadata to `tk-muzenda-properties`. |
| Live contact details | Telephone, WhatsApp, email and address values were duplicated across the header, footer, contact page, product tools, accommodation tools and structured data | Verified details were subsequently restored through `src/config/contact.ts`, with contextual links and server-side contact-form delivery. |
| Business location claims | Unverified Midrand/Gauteng claims in global metadata, landing-page brand panel, About page and route metadata | Removed business-location claims. Illustrative accommodation locations remain clearly labelled as non-live examples. |
| SEO and sharing | Hardcoded unverified production domain, inherited showcase Open Graph image, location claims and fabricated LocalBusiness address/telephone data | Defaulted canonical infrastructure to `http://localhost:3000` until a verified deployment origin is configured; switched sharing imagery to a current site hero; reduced JSON-LD to verified Organization name, URL and email. |
| Documentation | Horizon Estate names, repository URLs, obsolete routes, agents, journal, investment calculators, showcase pages, consultation modal, old setup and deployment instructions | Replaced the README and outdated guides with documentation for the actual TK Muzenda Properties application, repository, routes, commands, deployment and content model. |
| Package and repository URLs | Original template repository and identifiers | Updated maintained documentation to `https://github.com/RudyardMadoro/tmuzenda`. |
| Public assets | Unused template showcase screenshots, agent portraits, journal covers, default framework SVGs and unrelated Takura Muzenda logo | Confirmed no runtime references and removed the obsolete files. |
| Enquiry/privacy wording | References to phone and WhatsApp channels after those details were removed | Updated privacy, QA, implementation and enquiry copy to describe verified email handoff only. |
| Social and accessibility labels | Inherited social banner reference and generic template wording | Added current TK Muzenda Properties descriptions and meaningful sharing-image alt text. |

### RETAINED — REQUIRED

| Reference | Reason |
| --- | --- |
| `LICENSE` copyright for Horizon Estate Project Contributors | Required preservation of the inherited MIT license and copyright notice. |
| Template-media notice in `LICENSE` and historical source reference in `ASSETS.md` | Required provenance and third-party asset licensing context for inherited illustrative photography. |
| Framework and dependency names/URLs in `package-lock.json` | Required package-manager integrity and legitimate third-party dependency metadata. |
| Words such as `template` in Next.js metadata APIs and `@babel/template` | Technical identifiers, not inherited user-facing branding. |
| Clearly labelled illustrative/placeholder project and accommodation language | Necessary to avoid presenting concepts or unverified inventory as completed work or live availability. |

### NEEDS BUSINESS INPUT

- Verified production domain for `NEXT_PUBLIC_SITE_URL`.
- A dedicated TK Muzenda Properties social-sharing image and favicon, if approved in future; the current brand treatment is intentionally text-only.
- Verified service area and social accounts if these should be published. Phone, WhatsApp and address were subsequently supplied and restored through the centralized contact configuration.
- Legal entity name and registration details, if different from the public trading name.
- Approved privacy retention/deletion process and final consumer terms.
- Verified completed-project facts, project photography and accommodation inventory.
- Confirmed supplier brands, product specifications, prices, stock and cutting capabilities.
- Source records/releases for inherited photography, or owned replacement media.

### NOT APPLICABLE

- A web manifest identifies the application as TK Muzenda Properties without introducing company logo assets.
- No live checkout, payment, application, booking, authentication or backend form submission exists.
- No pull request, commit or push was requested or performed as part of this audit.

## Files and areas affected

- Application metadata and SEO: `src/app/layout.tsx`, `src/app/robots.ts`, `src/app/sitemap.ts`, route metadata.
- Contact and enquiry flows: header, footer, contact, landing CTA, product catalogues, rental and short-stay components, privacy copy.
- Configuration: `package.json`, `package-lock.json`, `.env.example`.
- Documentation: `README.md`, root governance/licensing guides, and `docs/` technical guides.
- Assets: removed unused files under `public/showcase`, `public/images/agents`, `public/images/journal`, legacy root SVGs and the unrelated `public/brand` logo.

## Validation

Validation results are recorded after the final repository checks below:

- Template-reference rescan: passed; remaining Horizon/template references are limited to required legal/provenance text and this audit record.
- Internal route and local asset audit: passed; route targets were reviewed and the content-integrity test confirmed all referenced local images and alt text.
- ESLint: passed.
- TypeScript: passed.
- Automated tests: 11 passed, 0 failed.
- Production build: passed; Next.js generated 38 routes, including all static and partial-prerendered detail routes.

## Recommended follow-up

Supply the verified domain and approved brand assets first. Then replace illustrative project/accommodation media and facts, complete legal/privacy review, and configure any additional verified contact channels before public launch.
