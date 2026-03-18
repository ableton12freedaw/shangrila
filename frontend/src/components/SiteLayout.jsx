import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Facebook, Instagram, Linkedin, Mail, MapPin, Menu, Phone, X } from "lucide-react";
import { navLinks, schoolIdentity } from "@/data/siteContent";
import { SplashBannerModal } from "@/components/SplashBannerModal";
import { FloatingAdmissionBell } from "@/components/FloatingAdmissionBell";

export const SiteLayout = ({ children }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const socialLinks = [
    {
      key: "facebook",
      href: "https://www.facebook.com/people/Shangrila-English-High-School/61558656637849/",
      label: "Visit Shangrila School Facebook",
      icon: Facebook,
      hoverClass: "hover:border-[#1877F2] hover:text-[#1877F2]",
    },
    {
      key: "instagram",
      href: "https://www.instagram.com/shangrilaenglishschool/?hl=en",
      label: "Visit Shangrila School Instagram",
      icon: Instagram,
      hoverClass: "hover:border-[#E1306C] hover:text-[#E1306C]",
    },
    {
      key: "linkedin",
      href: "https://www.linkedin.com/company/shangrila-english-high-school-and-junior-college/",
      label: "Visit Shangrila School LinkedIn",
      icon: Linkedin,
      hoverClass: "hover:border-[#0A66C2] hover:text-[#0A66C2]",
    },
  ];

  const socialBaseClass = "rounded-full border border-slate-200 bg-white p-2 text-slate-700 transition-colors";

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_#f1f5f9,_#fdfbf7_55%)] text-slate-900">
      {/* Top info bar */}
      <div className="hidden bg-[#0A192F] text-slate-300 md:block" data-testid="header-top-info-bar">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-1.5 text-[11px] sm:px-6 lg:px-8">
          <div className="flex items-center gap-5">
            <span className="flex items-center gap-1.5"><Phone className="h-3 w-3 text-amber-400" /> 0788 786 1828</span>
            <span className="flex items-center gap-1.5"><Mail className="h-3 w-3 text-amber-400" /> admissions@shangrilaschool.edu.in</span>
            <span className="flex items-center gap-1.5"><MapPin className="h-3 w-3 text-amber-400" /> Sangam Road, Hingna, Nagpur</span>
          </div>
          <div className="flex items-center gap-2" data-testid="header-social-links">
            {socialLinks.map((social) => {
              const Icon = social.icon;
              return (
                <a
                  key={social.key}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-400 transition-colors hover:text-white"
                  data-testid={`header-${social.key}-link`}
                  aria-label={social.label}
                >
                  <Icon className="h-3.5 w-3.5" />
                </a>
              );
            })}
          </div>
        </div>
      </div>

      <header
        className="sticky top-0 z-50 border-b border-slate-200/60 bg-white/90 shadow-sm backdrop-blur-xl"
        data-testid="school-main-header"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-3 py-2.5">
            <NavLink
              to="/"
              className="flex min-w-0 items-center gap-2.5 sm:gap-3"
              data-testid="school-logo-home-link"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <img
                src={schoolIdentity.logo}
                alt="Shangrila school logo"
                className="school-logo-premium h-11 w-11 rounded-full border-2 border-amber-400/60 object-cover shadow-md sm:h-14 sm:w-14"
                loading="lazy"
                data-testid="school-site-logo-image"
              />
              <span className="flex min-w-0 flex-col">
                <span className="truncate text-sm font-black tracking-wide text-[#0A192F] sm:text-base md:text-xl" data-testid="header-school-name">
                  {schoolIdentity.name}
                </span>
                <span className="text-[9px] font-semibold uppercase tracking-[0.18em] text-amber-700 sm:text-[10px] md:text-xs">
                  {schoolIdentity.tagline}
                </span>
              </span>
            </NavLink>

            <button
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 md:hidden"
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
              data-testid="mobile-menu-toggle-button"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>

            <nav
              className="hidden items-center gap-0.5 md:flex"
              data-testid="school-main-navigation"
            >
              {navLinks.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  data-testid={`nav-link-${item.label.toLowerCase().replace(/\s+/g, "-")}`}
                  className={({ isActive }) =>
                    `relative whitespace-nowrap px-3 py-2 text-xs font-bold uppercase tracking-wider transition-colors lg:px-3.5 lg:text-[13px] ${
                      isActive
                        ? "text-primary after:absolute after:bottom-0 after:left-1/2 after:h-[2.5px] after:w-5 after:-translate-x-1/2 after:rounded-full after:bg-amber-500"
                        : "text-slate-600 hover:text-primary"
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              ))}
            </nav>
          </div>

          {isMobileMenuOpen && (
            <div className="border-t border-slate-100 py-3 md:hidden" data-testid="mobile-navigation-panel">
              <nav className="grid grid-cols-2 gap-2" data-testid="school-main-navigation-mobile">
                {navLinks.map((item) => (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    data-testid={`nav-link-mobile-${item.label.toLowerCase().replace(/\s+/g, "-")}`}
                    className={({ isActive }) =>
                      `rounded-xl px-3 py-2.5 text-center text-xs font-bold uppercase tracking-wider transition-colors ${
                        isActive
                          ? "bg-primary text-white"
                          : "bg-slate-50 text-slate-700 hover:bg-slate-100"
                      }`
                    }
                  >
                    {item.label}
                  </NavLink>
                ))}
              </nav>

              <div className="mt-3 flex items-center justify-center gap-3 border-t border-slate-100 pt-3" data-testid="header-social-links-mobile">
                {socialLinks.map((social) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={`mobile-${social.key}`}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`${socialBaseClass} ${social.hoverClass}`}
                      data-testid={`header-${social.key}-link-mobile`}
                      aria-label={social.label}
                    >
                      <Icon className="h-4 w-4" />
                    </a>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </header>

      <main data-testid="school-main-content">{children}</main>

      <footer className="mt-20 bg-[#0A192F] text-slate-300" data-testid="school-main-footer">
        <div className="h-1 bg-gradient-to-r from-transparent via-amber-500 to-transparent" />
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-2 lg:grid-cols-3 lg:px-8">
          <div className="space-y-4" data-testid="footer-school-overview">
            <div className="flex items-center gap-3" data-testid="footer-school-brand-row">
              <img
                src={schoolIdentity.logo}
                alt="Shangrila school logo"
                className="school-logo-premium h-10 w-10 rounded-full border border-slate-500/40 object-cover"
                loading="lazy"
                data-testid="footer-school-logo-image"
              />
              <h3 className="break-words text-lg font-bold text-white sm:text-2xl">{schoolIdentity.name}</h3>
            </div>
            <p className="text-sm leading-7 text-slate-300" data-testid="footer-school-tagline">
              {schoolIdentity.tagline}
            </p>
          </div>

          <div className="space-y-3" data-testid="footer-contact-details">
            <h4 className="text-lg font-semibold text-white">Contact Information</h4>
            <p className="flex items-center gap-2 text-sm" data-testid="footer-address">
              <MapPin className="h-4 w-4 text-amber-400" /> {schoolIdentity.address}
            </p>
            <p className="flex items-center gap-2 text-sm" data-testid="footer-phone">
              <Phone className="h-4 w-4 text-amber-400" /> {schoolIdentity.phone}
            </p>
            <p className="flex items-center gap-2 text-sm" data-testid="footer-email">
              <Mail className="h-4 w-4 text-amber-400" /> {schoolIdentity.email}
            </p>
          </div>

          <div className="space-y-3" data-testid="footer-working-hours">
            <h4 className="text-lg font-semibold text-white">Opening Hours</h4>
            <ul className="space-y-1" data-testid="footer-opening-hours-list">
              {schoolIdentity.openingHours.map((slot) => (
                <li className="text-sm leading-7" key={slot.day} data-testid={`footer-opening-hours-item-${slot.day.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}>
                  <span className="font-semibold text-white">{slot.day}:</span> {slot.time}
                </li>
              ))}
            </ul>
            <p className="text-sm leading-7 text-slate-200" data-testid="footer-visitor-timings-text">
              <span className="font-semibold text-white">Visitor Timings:</span> {schoolIdentity.visitorTimings}
              <br />
              <span className="text-slate-300">({schoolIdentity.visitorNote})</span>
            </p>
            <p className="text-xs text-slate-400" data-testid="footer-copyright-text">
              © {new Date().getFullYear()} {schoolIdentity.name}. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      <a
        href="https://wa.me/917887861828"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-5 z-[90] inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_4px_20px_rgba(37,211,102,0.45)] transition-transform hover:scale-110"
        data-testid="whatsapp-floating-button"
        aria-label="Chat on WhatsApp"
      >
        <svg viewBox="0 0 32 32" className="h-7 w-7 fill-current">
          <path d="M16.004 2.667A13.26 13.26 0 0 0 2.79 18.733l-1.457 5.32a1 1 0 0 0 1.22 1.22l5.32-1.457A13.26 13.26 0 1 0 16.004 2.667Zm0 24.266a11 11 0 0 1-5.608-1.533l-.402-.24-3.157.865.865-3.157-.24-.402A11 11 0 1 1 16.004 26.933Zm6.032-8.198c-.33-.166-1.956-.965-2.26-1.075-.303-.11-.523-.166-.744.166s-.854 1.075-1.046 1.296-.386.248-.716.083a9.021 9.021 0 0 1-2.657-1.64 9.97 9.97 0 0 1-1.838-2.287c-.192-.33-.02-.51.145-.674.15-.15.33-.386.496-.578.165-.193.22-.331.33-.552.11-.22.056-.413-.027-.578-.083-.166-.744-1.794-1.02-2.456-.268-.644-.54-.557-.744-.567l-.633-.011a1.214 1.214 0 0 0-.882.413 3.71 3.71 0 0 0-1.157 2.757c0 1.627 1.184 3.198 1.35 3.418.165.22 2.33 3.558 5.646 4.99.789.34 1.405.544 1.884.696.792.252 1.513.216 2.083.131.636-.095 1.956-.8 2.232-1.572.275-.772.275-1.434.193-1.572-.083-.138-.303-.22-.633-.386Z" />
        </svg>
      </a>

      <FloatingAdmissionBell />
      <SplashBannerModal />
    </div>
  );
};