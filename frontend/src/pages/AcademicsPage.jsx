import { Card, CardContent } from "@/components/ui/card";
import { PageSection } from "@/components/PageSection";
import { academicsPrograms, imageAssets } from "@/data/siteContent";

const pedagogyPoints = [
  "Activity-based learning and collaborative projects",
  "Regular assessments with parent feedback cycles",
  "Laboratory integration for STEM confidence",
  "Career readiness and communication development",
];

export const AcademicsPage = () => {
  return (
    <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8" data-testid="academics-page-root">
      <PageSection className="grid gap-8 lg:grid-cols-[1.1fr_1fr]" testId="academics-hero-section">
        <div className="space-y-4" data-testid="academics-content-column">
          <p className="text-xs font-bold uppercase tracking-[0.32em] text-amber-700" data-testid="academics-page-label">Academics</p>
          <h1 className="text-4xl font-black text-slate-900 sm:text-5xl" data-testid="academics-main-heading">
            Structured Learning for Excellence at Every Stage
          </h1>
          <p className="text-base leading-8 text-slate-600 md:text-lg" data-testid="academics-intro-text">
            Our curriculum blends conceptual clarity, practical exposure, and independent thinking.
            Students are guided to become resilient problem-solvers and responsible citizens.
          </p>
        </div>

        <div className="overflow-hidden rounded-3xl border border-slate-200 p-2" data-testid="academics-classroom-image-wrapper">
          <img
            src={imageAssets.classroom}
            alt="Students in a modern classroom"
            className="aspect-[4/3] w-full rounded-2xl object-cover object-center"
            loading="lazy"
            data-testid="academics-classroom-image"
          />
        </div>
      </PageSection>

      <PageSection className="mt-12" testId="academics-programs-section">
        <div className="grid gap-6 md:grid-cols-3">
          {academicsPrograms.map((program) => (
            <Card key={program.title} className="border-slate-200 bg-white/95" data-testid={`academics-program-card-${program.title.toLowerCase().replace(/\s+/g, "-")}`}>
              <CardContent className="space-y-3 p-6">
                <h2 className="text-2xl font-bold text-primary" data-testid={`academics-program-title-${program.title.toLowerCase().replace(/\s+/g, "-")}`}>{program.title}</h2>
                <p className="text-xs font-semibold uppercase tracking-wide text-amber-700" data-testid={`academics-program-standards-${program.title.toLowerCase().replace(/\s+/g, "-")}`}>
                  {program.standards}
                </p>
                <p className="text-sm leading-7 text-slate-600" data-testid={`academics-program-description-${program.title.toLowerCase().replace(/\s+/g, "-")}`}>
                  {program.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </PageSection>

      <PageSection className="mt-12" testId="academics-pedagogy-section">
        <Card className="border-slate-200 bg-slate-50" data-testid="academics-pedagogy-card">
          <CardContent className="p-7">
            <h3 className="text-3xl font-bold text-slate-900" data-testid="academics-pedagogy-heading">Our Pedagogy in Practice</h3>
            <ul className="mt-5 grid gap-3 md:grid-cols-2" data-testid="academics-pedagogy-list">
              {pedagogyPoints.map((point) => (
                <li key={point} className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700" data-testid={`academics-pedagogy-item-${point.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}>
                  {point}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </PageSection>
    </div>
  );
};