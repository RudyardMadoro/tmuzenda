# Security Policy

Report potential security issues privately to `rudyardmadoro@gmail.com`. Do not publish exploitable details in a public issue.

The current website is a static Next.js application with client-side enquiry preparation. It does not process payments, create bookings, or store submitted enquiries. Deployment credentials and future backend secrets must remain in server-side environment variables and must never use the `NEXT_PUBLIC_` prefix.

Only the current `main` branch is supported. Keep Next.js, React, and other dependencies updated through reviewed changes with the full validation pipeline.
