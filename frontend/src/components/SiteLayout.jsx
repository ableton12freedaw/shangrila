import { NavLink } from "react-router-dom";
import { Mail, MapPin, Phone } from "lucide-react";
import { navLinks, schoolIdentity } from "@/data/siteContent";

export const SiteLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_#f1f5f9,_#fdfbf7_55%)] text-slate-900">
      <header
        className="sticky top-0 z-50 border-b border-slate-200/60 bg-white/85 backdrop-blur-xl"
        data-testid="school-main-header"
      >
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
          <NavLink
            to="/"
            className="flex flex-col"
            data-testid="school-logo-home-link"
          >
            <span className="text-lg font-black tracking-wide text-primary md:text-xl">
              {schoolIdentity.name}
            </span>
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-700">
              {schoolIdentity.tagline}
            </span>
          </NavLink>

          <nav
            className="flex flex-wrap items-center gap-1 rounded-full border border-slate-200 bg-white/70 p-1"
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
        </div>
      </header>

      <main data-testid="school-main-content">{children}</main>

      <footer className="mt-20 bg-[#0A192F] text-slate-300" data-testid="school-main-footer">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-2 lg:grid-cols-3 lg:px-8">
          <div className="space-y-4" data-testid="footer-school-overview">
            <h3 className="text-2xl font-bold text-white">{schoolIdentity.name}</h3>
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
            <p className="text-sm leading-7">{schoolIdentity.workingHours}</p>
            <p className="text-xs text-slate-400" data-testid="footer-copyright-text">
              © {new Date().getFullYear()} {schoolIdentity.name}. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};