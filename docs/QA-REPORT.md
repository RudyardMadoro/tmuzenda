# Phase 5 QA report

## Scope audited

Public routes: home, services and all six service details, projects and all four project studies, products, boards, hardware, accommodation, rentals and three rental details, short stays and three stay details, about, contact, privacy, terms, sitemap, robots and the custom 404.

Shared flows audited: desktop and mobile navigation, service/project/product/accommodation links, catalogue search and filters, cutting-request validation, galleries and dialogs, verified email handoffs, enquiry disclaimers, metadata and structured data.

## Automated checks

- `npm run lint`
- `npm run typecheck`
- `npm test`
- `npm run build`
- `npm run check` runs the complete sequence.

## Accessibility and interaction

- Skip link and focusable main landmark are present.
- Visible high-contrast focus rings apply to interactive controls.
- Native inputs expose labels, errors and invalid state.
- Galleries support Escape and arrow navigation; shared dialog focus handling traps focus, locks background scroll and restores the trigger.
- Mobile navigation uses a bounded dynamic viewport, scroll containment, Escape close and explicit expanded/control relationships.
- Motion uses CSS or a small IntersectionObserver component and is neutralised by `prefers-reduced-motion`.

## Content and legal review

All current projects, catalogue products and accommodation records remain explicitly illustrative. There is no checkout, payment, inventory reservation, availability claim, form submission or booking confirmation. Direct contact links hand the user to their own email client.

Business review is required before launch for the legal entity name, physical address, service area, POPIA/privacy retention and deletion process, consumer terms, accommodation rules, supplier specifications, photography provenance and production domain. `ASSETS.md` records the inherited template licensing position, but the business should retain source URLs/releases or replace every image with owned, property-specific media.

## Known limitations

- No live inventory, pricing, availability, checkout, booking or enquiry backend.
- Catalogue, project and accommodation imagery/content are suitable only as labelled illustrative material, not real inventory or completed-work claims.
- Browser visual regression, Lighthouse and assistive-technology testing require a deployed preview and should be repeated on real iOS Safari, Android Chrome and desktop browsers before DNS cutover.
- Social metadata currently uses the site hero photograph. Replace it with an approved TK Muzenda Properties social-sharing asset when one is supplied.
