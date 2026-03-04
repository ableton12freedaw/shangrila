import { Link } from "react-router-dom";
import { Award, BookOpen, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PageSection } from "@/components/PageSection";
import { homeHighlights, imageAssets, quickStats, schoolIdentity } from "@/data/siteContent";

export const HomePage = () => {
  return (
    <>
      <section className="relative overflow-hidden" data-testid="home-hero-section">
        <div className="absolute inset-0">
          <img
            src={imageAssets.hero}
            alt="Happy students in school uniform"
            className="h-full w-full object-cover object-center"
            loading="lazy"
            data-testid="home-hero-image"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#1E3A8A]/70 via-[#1E3A8A]/45 to-[#fdfbf7]" />
          <div className="grain-overlay" />
        </div>

        <div className="relative mx-auto flex min-h-[80vh] max-w-7xl items-end px-4 pb-16 pt-32 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl rounded-3xl border border-white/30 bg-white/75 p-6 backdrop-blur-xl sm:p-10"
            data-testid="home-hero-content"
          >
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.35em] text-amber-700" data-testid="home-school-label">
              India · Premium School Campus
            </p>
            <h1 className="text-4xl font-black leading-tight text-slate-900 sm:text-5xl lg:text-6xl" data-testid="home-main-heading">
              {schoolIdentity.name}
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-8 text-slate-700 sm:text-lg" data-testid="home-tagline-text">
              {schoolIdentity.tagline}
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button asChild className="premium-shine h-11 rounded-full px-8 text-sm font-semibold" data-testid="home-cta-contact-button">
                <Link to="/contact-us">Enquire Now</Link>
              </Button>
              <Button asChild variant="outline" className="h-11 rounded-full border-primary px-8 text-sm font-semibold text-primary" data-testid="home-cta-disclosure-button">
                <Link to="/disclosure">View Disclosure</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <PageSection className="mx-auto max-w-7xl px-4 pt-14 sm:px-6 lg:px-8" testId="home-quick-stats-section">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {quickStats.map((item) => (
            <Card key={item.label} className="border-slate-200/80 bg-white/80" data-testid={`home-stat-card-${item.label.toLowerCase().replace(/\s+/g, "-")}`}>
              <CardContent className="p-6">
                <p className="text-3xl font-black text-primary" data-testid={`home-stat-value-${item.label.toLowerCase().replace(/\s+/g, "-")}`}>{item.value}</p>
                <p className="mt-2 text-sm font-semibold text-slate-600" data-testid={`home-stat-label-${item.label.toLowerCase().replace(/\s+/g, "-")}`}>{item.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </PageSection>

      <PageSection className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8" testId="home-highlights-section">
        <div className="mb-8 max-w-2xl">
          <h2 className="text-3xl font-bold text-slate-900 md:text-5xl" data-testid="home-highlights-heading">Why Families Trust Us</h2>
          <p className="mt-3 text-base text-slate-600 md:text-lg" data-testid="home-highlights-description">
            Purpose-driven academics, caring mentors, and a safe campus where students thrive.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {[Award, BookOpen, ShieldCheck].map((Icon, index) => (
            <Card key={homeHighlights[index].title} className="premium-shine border-slate-100 bg-white" data-testid={`home-highlight-card-${index + 1}`}>
              <CardContent className="space-y-3 p-6">
                <Icon className="h-8 w-8 text-amber-600" />
                <h3 className="text-2xl font-bold text-slate-900" data-testid={`home-highlight-title-${index + 1}`}>{homeHighlights[index].title}</h3>
                <p className="text-sm leading-7 text-slate-600" data-testid={`home-highlight-description-${index + 1}`}>
                  {homeHighlights[index].description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </PageSection>
    </>
  );
};