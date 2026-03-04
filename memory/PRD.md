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
- Follow-up request: fully replace demo text with uploaded `WEBSITE-1.docx` content, use uploaded school image on home hero, make hero content box transparent
- Follow-up request: upload additional school photos and make them relatable in website via a school life gallery
- Follow-up request: add uploaded disclosure files as downloadable links opening in new tab
- Follow-up request: keep separate Download button and add small PDF icons + file size labels in Disclosure
- Follow-up request: add provided school site logo beside school name in header
- Follow-up request: place logo in footer + favicon and add subtle hover animation/glow
- Follow-up request: update school address and phone number
- Follow-up request: add Google Map widget in Contact Us using provided location URL
- Follow-up request: add newly uploaded photos and add one-click Get Directions button for parents
- Follow-up request: keep welcome message separated as its own section

## Architecture Decisions
- Frontend: React + React Router multi-page architecture with reusable layout and page sections
- Backend: FastAPI with MongoDB (Motor)
- Database collections:
  - `contact_messages` for enquiry submissions
  - existing `status_checks` retained
- UX approach: premium navy-gold theme, transparent hero content panel, responsive section layouts, motion reveal

## What Has Been Implemented
1. Multipage navigation and routes:
   - / (HOME)
   - /about-us
   - /academics
   - /activities
   - /gallery
   - /disclosure
   - /contact-us
   - typo alias redirect /acitivities -> /activities
2. Fully designed pages with responsive premium UI and image-led content
3. Imported and structured document content across all core pages (Home/About/Academics/Activities/Disclosure/Contact)
4. Home hero updated with uploaded school building image and transparent overlay card as requested
5. Disclosure page updated with safety-policy-focused mandatory information and important policy documents
6. Contact form updated to admission enquiry structure (student + guardian + grade + transport + remarks) with backend integration
5. Backend APIs:
   - POST /api/contact-messages
   - GET /api/contact-messages
7. Backend model extended to persist additional admission fields in MongoDB
8. Toast-based user feedback on successful/failed form submission
9. Extensive `data-testid` coverage for key interactive and user-facing elements
10. Validation/testing completed:
   - curl API tests passed
   - browser flow screenshots captured
   - testing agent suites passed (frontend + backend), including extended field regression tests
11. Added School Life Gallery page using uploaded real school photos with captions and categories
12. Updated Academics/Activities contextual images to user-provided photos for better authenticity
13. Disclosure section now includes real uploaded certificates/PDFs as clickable links that open in a new tab
14. Disclosure document list now has separate Open + Download actions, PDF badges, and file-size labels for each file
15. Added provided school logo beside school name/tagline in top header navigation
16. Added same logo in footer branding, configured favicon/apple-touch icon, and applied subtle premium hover glow animation on logos
17. Updated school contact details globally: address and phone number reflected across contact and footer sections
18. Added Google Map widget section in Contact Us with embedded map and "Open in Google Maps" link
19. Added one-click "Get Directions" CTA in Contact map section and integrated 5 additional uploaded school photos into gallery
20. Separated Home page welcome message into a dedicated standalone section/card

## Prioritized Backlog
### P0 (High Priority)
- Finalize official school contact and statutory details (phone/email/address, affiliations, codes)

### P1 (Medium Priority)
- Add admin dashboard to review contact enquiries
- Add spam protection (captcha/rate limiting) on contact form
- Tighten CORS origin configuration for production safety

### P2 (Low Priority)
- Add downloadable admission brochure and online admission pre-registration
- Add SEO metadata + structured data for better search visibility

## Next Tasks
1. Add admin enquiry review view with filters and export option
2. Final content QA for all school details and official wording from management
3. Optionally add filter tabs (Academics/Sports/Student Life) inside gallery page
