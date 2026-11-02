# Performance

The application uses Server Components by default, static and partial prerendering, `next/image`, explicit aspect-ratio containers, responsive image sizes, font optimization and route-level code splitting.

Client JavaScript is limited to navigation, galleries, dialogs, filters, planners and enquiry preparation. Images should be optimized before being added, and decorative animation must respect reduced-motion preferences.

Use `npm run build` to verify route generation and run Lighthouse against a production preview before release. Monitor Core Web Vitals after a verified public deployment is available.
