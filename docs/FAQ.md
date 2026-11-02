# Frequently Asked Questions

## Does the current site use a backend?

No. Typed static content is exposed through repository adapters. Enquiry actions open the visitor's email client.

## Does the site accept orders, applications or bookings?

No. Product selections, cutting plans and stay dates prepare enquiries only. Pricing, stock, feasibility, availability and bookings require direct confirmation.

## Where is content managed?

Business content is in `src/data/`. Repository adapters are in `src/repositories/` and can later be replaced by an approved API integration.

## How is the production domain configured?

Set `NEXT_PUBLIC_SITE_URL` to the verified public origin in the deployment environment. Until then, metadata intentionally uses the local development origin.

## How are issues reported?

Use the GitHub repository at `https://github.com/RudyardMadoro/tmuzenda` or email `rudyardmadoro@gmail.com` for private security or conduct matters.
