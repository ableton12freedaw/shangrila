# THE SHANGRILA ENGLISH HIGH SCHOOL & JUNIOR COLLEGE — PRD

## Original Problem Statement
Build a multi-page website for a school in India named "THE SHANGRILA ENGLISH HIGH SCHOOL" with the tagline "EDUCATING THE MINDS, REACHING THE HEARTS." Pages: HOME, ABOUT US, ACADEMICS, ACTIVITIES, GALLERY, DISCLOSURE, and CONTACT US. Modern premium design, English language, mobile-friendly.

## Core Requirements
- Multi-page structure with all specified pages
- School-specific content, logo, images from user
- Disclosure page with downloadable documents
- Image gallery with lightbox
- Contact form (MongoDB-backed)
- Staff section on Academics page
- Animated notice board on homepage
- Floating bell icon → admission enquiry form
- Social media links (Facebook, Instagram, LinkedIn)
- SEO (metadata, sitemap, robots.txt)
- Mobile responsive

## Tech Stack
- **Frontend:** React, React Router, TailwindCSS, Shadcn/UI, Framer Motion
- **Backend:** FastAPI (Python)
- **Database:** MongoDB (motor async driver)

## What's Been Implemented (as of 13 Mar 2026)
- [x] All pages: Home, About, Academics, Activities, Gallery, Disclosure, Contact
- [x] Content & branding integrated (logo, tagline, images)
- [x] Contact form → POST /api/contact-messages → MongoDB
- [x] Disclosure page with downloadable PDFs
- [x] Staff section on Academics
- [x] Google Maps embed + Get Directions on Contact
- [x] SEO: sitemap.xml, robots.txt, meta tags, schema.org
- [x] Splash banner on site load
- [x] Social media icons in header & footer
- [x] Animated notice board (vertical auto-scroll) on homepage
- [x] Floating "ADMISSIONS OPEN" bell → admission enquiry modal
- [x] POST /api/admission-enquiries → MongoDB (dedicated collection)
- [x] GET /api/admission-enquiries
- [x] GET /api/health endpoint
- [x] Gallery lightbox with prev/next/close (desktop + mobile)
- [x] Bell button: animated pulse glow + ring wiggle, amber gradient, "ADMISSIONS OPEN" label

## DB Collections
- `contact_messages`: { name, email, phone, subject, message, student_name?, date_of_birth?, grade_standard?, academic_year?, parent_guardian_name?, residential_address?, transport_required?, submitted_at }
- `admission_enquiries`: { parent_name, email, phone, student_name?, grade?, message, submitted_at }

## API Endpoints
- GET  /api/health
- POST /api/contact-messages
- GET  /api/contact-messages
- POST /api/admission-enquiries
- GET  /api/admission-enquiries

## Prioritized Backlog
### P1
- Mobile gallery verification on real devices
### P2
- Connect contact form to Google Sheets (pending user confirmation)
- Admin dashboard for form submissions
### P3
- Further SEO & performance tuning
