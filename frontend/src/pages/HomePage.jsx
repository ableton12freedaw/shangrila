import { Award, BookOpen, Quote, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { PageSection } from "@/components/PageSection";
import { SEOHead } from "@/components/SEOHead";
import {
  homeHighlights,
  homeIntro,
  imageAssets,
  leadershipMessages,
  noticeBoardItems,
  quickStats,
  schoolIdentity,
  welcomeMessage,
} from "@/data/siteContent";

const slugify = (value) => value.toLowerCase().replace(/[^a-z0-9]+/g, "-");

export const HomePage = () => {
  const homeSchema = {
    "@context": "https://schema.org",
    "@type": "School",
    name: schoolIdentity.name,
    address: {
      "@type": "PostalAddress",
      streetAddress: schoolIdentity.address,
      addressLocality: "Nagpur",
      addressRegion: "Maharashtra",
      addressCountry: "IN",
    },
    telephone: schoolIdentity.phone,
    email: schoolIdentity.email,
    sameAs: [
      "https://www.facebook.com/people/Shangrila-English-High-School/61558656637849/",
      "https://www.instagram.com/shangrilaenglishschool/?hl=en",
      "https://www.linkedin.com/company/shangrila-english-high-school-and-junior-college/",
    ],
  };

  return (
    <>
      <SEOHead
        title="Best School in Nagpur | THE SHANGRILA ENGLISH HIGH SCHOOL & JUNIOR COLLEGE"
        description="Looking for the best school in Nagpur? Shangrila English High School offers CBSE-focused learning, holistic activities, and admissions support in Hingna, Nagpur."
        keywords="best school in nagpur, cbse school in hingna, cbse school in nagpur, school admissions in nagpur, shangrila english high school"
        path="/"
        schema={homeSchema}
      />

      <section className="relative overflow-hidden" data-testid="home-hero-section">
        <div className="absolute inset-0">
          <img
            src={imageAssets.hero}
            alt="Shangrila English High School campus building"
            className="h-full w-full object-cover object-center"
            loading="lazy"
            data-testid="home-hero-image"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#071230]/65 via-[#071230]/25 to-[#fdfbf7]" />
          <div className="grain-overlay" />
        </div>

        <div className="relative mx-auto flex min-h-[72vh] max-w-7xl items-end px-4 pb-10 pt-24 sm:min-h-[80vh] sm:px-6 sm:pb-16 sm:pt-32 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl rounded-3xl border border-white/30 bg-white/10 p-5 backdrop-blur-md sm:p-10"
            data-testid="home-hero-content"
          >
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.35em] text-amber-100" data-testid="home-school-label">
              Since 2001 · 25+ Years of Excellence
            </p>
            <h1 className="text-3xl font-black leading-tight text-white sm:text-5xl lg:text-6xl" data-testid="home-main-heading">
              {schoolIdentity.name}
            </h1>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-white/90 sm:text-lg sm:leading-8" data-testid="home-tagline-text">
              {schoolIdentity.tagline}
            </p>
          </motion.div>
        </div>
      </section>

      <PageSection className="mx-auto max-w-7xl px-4 pt-10 sm:px-6 lg:px-8" testId="home-welcome-notice-combined-section">
        <div className="grid gap-6 lg:grid-cols-[1.3fr_0.7fr]" data-testid="home-welcome-notice-layout-grid">
          <Card className="relative overflow-hidden border-amber-100 bg-white/95 shadow-sm" data-testid="home-welcome-message-card">
            <div className="absolute inset-y-0 left-0 w-2 bg-gradient-to-b from-amber-500 to-primary" />
            <CardContent className="space-y-4 p-7 pl-8 md:p-10 md:pl-12">
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-amber-700" data-testid="home-welcome-label">
                Welcome Message
              </p>
              <Quote className="h-8 w-8 text-amber-500" data-testid="home-welcome-quote-icon" />
              <blockquote className="text-base italic leading-8 text-slate-700 md:text-lg" data-testid="home-welcome-message">
                “{welcomeMessage}”
              </blockquote>
            </CardContent>
          </Card>

          <Card className="overflow-hidden border-primary/30 bg-primary text-white" data-testid="home-notice-board-card">
            <CardContent className="space-y-4 p-5 sm:p-6" data-testid="home-notice-board-content">
              <p className="text-xs font-bold uppercase tracking-[0.24em] text-amber-400" data-testid="home-notice-board-label">
                Notice Board
              </p>
              <div className="h-64 overflow-hidden rounded-xl border border-white/15 bg-white/10" data-testid="home-notice-board-vertical-wrapper">
                <div className="notice-vertical-track space-y-3 p-3" data-testid="home-notice-board-vertical-track">
                  {[...noticeBoardItems, ...noticeBoardItems].map((notice, index) => (
                    <p
                      key={`${notice}-${index}`}
                      className="rounded-lg border border-white/10 bg-white/10 px-3 py-2 text-sm leading-6 text-slate-100"
                      data-testid={`home-notice-item-${index + 1}`}
                    >
                      {notice}
                    </p>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </PageSection>

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

      <PageSection className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8" testId="home-intro-section">
        <Card className="border-slate-200 bg-white/95" data-testid="home-intro-card">
          <CardContent className="space-y-4 p-7">
            <h2 className="text-3xl font-bold text-slate-900 md:text-5xl" data-testid="home-intro-heading">
              {homeIntro.title}
            </h2>
            <p className="text-sm leading-8 text-slate-700 md:text-base" data-testid="home-intro-text">
              {homeIntro.text}
            </p>
          </CardContent>
        </Card>
      </PageSection>

      <PageSection className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8" testId="home-highlights-section">
        <div className="mb-8 max-w-2xl">
          <h2 className="text-3xl font-bold text-slate-900 md:text-5xl" data-testid="home-highlights-heading">Results, Activities & Achievements</h2>
          <p className="mt-3 text-base text-slate-600 md:text-lg" data-testid="home-highlights-description">
            A balanced school experience that combines academic depth, co-curricular growth, and value-based learning.
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

      <PageSection className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8" testId="home-leadership-section">
        <div className="mb-8 max-w-3xl">
          <h2 className="text-3xl font-bold text-slate-900 md:text-5xl" data-testid="home-leadership-heading">
            Management & Leadership Messages
          </h2>
          <p className="mt-3 text-base text-slate-600 md:text-lg" data-testid="home-leadership-description">
            Vision-led guidance from the leadership team that drives every learner’s growth and purpose.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3" data-testid="home-leadership-grid">
          {leadershipMessages.map((item) => (
            <Card key={item.role} className="border-slate-200 bg-white" data-testid={`home-leadership-card-${slugify(item.role)}`}>
              <CardContent className="space-y-2 p-6">
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-amber-700" data-testid={`home-leadership-role-${slugify(item.role)}`}>
                  {item.role}
                </p>
                <h3 className="text-2xl font-bold text-primary" data-testid={`home-leadership-name-${slugify(item.role)}`}>
                  {item.name}
                </h3>
                <p className="text-sm leading-7 text-slate-600" data-testid={`home-leadership-summary-${slugify(item.role)}`}>
                  {item.summary}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </PageSection>
    </>
  );
};