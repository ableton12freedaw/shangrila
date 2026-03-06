import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Facebook, Instagram, Linkedin, Mail, MapPin, Menu, Phone, X } from "lucide-react";
import { navLinks, schoolIdentity } from "@/data/siteContent";
import { SplashBannerModal } from "@/components/SplashBannerModal";

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
      <header
        className="sticky top-0 z-50 border-b border-slate-200/60 bg-white/85 backdrop-blur-xl"
        data-testid="school-main-header"
      >
        <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-3">
            <NavLink
              to="/"
              className="flex min-w-0 items-center gap-2 sm:gap-3"
              data-testid="school-logo-home-link"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <img
                src={schoolIdentity.logo}
                alt="Shangrila school logo"
                className="school-logo-premium h-10 w-10 rounded-full border border-slate-200 object-cover sm:h-12 sm:w-12 md:h-14 md:w-14"
                loading="lazy"
                data-testid="school-site-logo-image"
              />
              <span className="flex min-w-0 flex-col">
                <span className="truncate text-sm font-black tracking-wide text-primary sm:text-base md:text-xl">
                  {schoolIdentity.name}
                </span>
                <span className="truncate text-[10px] font-semibold uppercase tracking-[0.18em] text-amber-700 sm:text-xs">
                  {schoolIdentity.tagline}
                </span>
              </span>
            </NavLink>

            <div className="flex items-center gap-2">
              <div className="hidden items-center gap-2 md:flex" data-testid="header-social-links">
                {socialLinks.map((social) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={social.key}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`${socialBaseClass} ${social.hoverClass}`}
                      data-testid={`header-${social.key}-link`}
                      aria-label={social.label}
                    >
                      <Icon className="h-4 w-4" />
                    </a>
                  );
                })}
              </div>

              <button
                type="button"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 md:hidden"
                onClick={() => setIsMobileMenuOpen((prev) => !prev)}
                data-testid="mobile-menu-toggle-button"
                aria-label="Toggle mobile menu"
              >
                {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>

          <nav
            className="mt-3 hidden flex-nowrap items-center gap-1 overflow-x-auto rounded-full border border-slate-200 bg-white/70 p-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden md:flex"
            data-testid="school-main-navigation"
          >
            {navLinks.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                data-testid={`nav-link-${item.label.toLowerCase().replace(/\s+/g, "-")}`}
                className={({ isActive }) =>
                  `rounded-full px-3 py-2 text-xs font-semibold tracking-wide transition-colors md:text-sm ${
                    isActive
                      ? "bg-primary text-white"
                      : "text-slate-700 hover:bg-slate-100 hover:text-primary"
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          {isMobileMenuOpen && (
            <div className="mt-3 space-y-3 rounded-2xl border border-slate-200 bg-white p-3 md:hidden" data-testid="mobile-navigation-panel">
              <nav className="grid grid-cols-2 gap-2" data-testid="school-main-navigation-mobile">
                {navLinks.map((item) => (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    data-testid={`nav-link-mobile-${item.label.toLowerCase().replace(/\s+/g, "-")}`}
                    className={({ isActive }) =>
                      `rounded-xl px-3 py-2 text-center text-xs font-semibold tracking-wide transition-colors ${
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

              <div className="flex items-center gap-2" data-testid="header-social-links-mobile">
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
            <h4 className="text-lg font-semibold text-white">Office Hours</h4>
            <p className="whitespace-pre-line text-sm leading-7" data-testid="footer-opening-hours-text">
              {schoolIdentity.workingHours}
            </p>
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

      <SplashBannerModal />
    </div>
  );
};