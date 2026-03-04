# PRD - THE SHANGRILA ENGLISH HIGH SCHOOL Website

## Original Problem Statement
Build a school website based in India, multipage, including pages: HOME, ABOUT US, ACADEMICS, ACITIVITIES, DISCLOSURE, CONTACT US.

## User Choices
- School name: THE SHANGRILA ENGLISH HIGH SCHOOL
- Tagline: EDUCATING THE MINDS, REACHING THE HEARTS
- Visual style: Modern & premium
- Language: English only
- Disclosure page: mandatory school information + important documents
- Contact form: save submissions in backend

## Architecture Decisions
- Frontend: React + React Router multi-page architecture with reusable layout and page sections
- Backend: FastAPI with MongoDB (Motor)
- Database collections:
  - `contact_messages` for enquiry submissions
  - existing `status_checks` retained
- UX approach: premium navy-gold theme, glassmorphism header, responsive section layouts, motion reveal

## What Has Been Implemented
1. Multipage navigation and routes:
   - / (HOME)
   - /about-us
   - /academics
   - /activities
   - /disclosure
   - /contact-us
   - typo alias redirect /acitivities -> /activities
2. Fully designed pages with responsive premium UI and image-led content
3. Disclosure page with mandatory information table and important documents list
4. Contact form with backend integration
5. Backend APIs:
   - POST /api/contact-messages
   - GET /api/contact-messages
6. Toast-based user feedback on successful/failed form submission
7. Extensive `data-testid` coverage for key interactive and user-facing elements
8. Validation/testing completed:
   - curl API tests passed
   - browser flow screenshots captured
   - testing agent suite passed (frontend + backend)

## Prioritized Backlog
### P0 (High Priority)
- Connect disclosure document buttons to real uploaded document URLs/PDF files
- Replace demo school disclosure values with exact official school data

### P1 (Medium Priority)
- Add admin dashboard to review contact enquiries
- Add spam protection (captcha/rate limiting) on contact form
- Tighten CORS origin configuration for production safety

### P2 (Low Priority)
- Add gallery/news/events page
- Add downloadable admission brochure and online admission pre-registration
- Add SEO metadata + structured data for better search visibility

## Next Tasks
1. Upload and map actual disclosure PDF files
2. Add admin enquiry review view with filters
3. Final content QA for all school details and contact info
