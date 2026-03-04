import { Card, CardContent } from "@/components/ui/card";
import { PageSection } from "@/components/PageSection";
import { academicsPrograms, academicsSections, imageAssets } from "@/data/siteContent";

const slugify = (value) => value.toLowerCase().replace(/[^a-z0-9]+/g, "-");

export const AcademicsPage = () => {
  return (
    <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8" data-testid="academics-page-root">
      <PageSection className="grid gap-8 lg:grid-cols-[1.1fr_1fr]" testId="academics-hero-section">
        <div className="space-y-4" data-testid="academics-content-column">
          <p className="text-xs font-bold uppercase tracking-[0.32em] text-amber-700" data-testid="academics-page-label">Academics</p>
          <h1 className="text-4xl font-black text-slate-900 sm:text-5xl" data-testid="academics-main-heading">
            CBSE Curriculum with Holistic Development
          </h1>
          <p className="text-base leading-8 text-slate-600 md:text-lg" data-testid="academics-intro-text">
            Our learner-centric academic approach integrates NCERT-based curriculum, experiential methods,
            and value education to prepare students for examinations, life, and future careers.
          </p>
          <p className="text-sm font-semibold text-slate-700" data-testid="academics-calendar-note">
            Academic Calendar: will provide soon · Exam Timetable: will provide soon
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

      <PageSection className="mt-12" testId="academics-holistic-sections">
        <div className="grid gap-6 md:grid-cols-2" data-testid="academics-holistic-grid">
          {academicsSections.map((section) => (
            <Card key={section.title} className="border-slate-200 bg-slate-50" data-testid={`academics-section-card-${slugify(section.title)}`}>
              <CardContent className="space-y-3 p-6">
                <h3 className="text-2xl font-bold text-slate-900" data-testid={`academics-section-title-${slugify(section.title)}`}>
                  {section.title}
                </h3>
                <ul className="space-y-2" data-testid={`academics-section-list-${slugify(section.title)}`}>
                  {section.points.map((point) => (
                    <li className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm leading-7 text-slate-700" key={point} data-testid={`academics-section-point-${slugify(point)}`}>
                      {point}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </PageSection>
    </div>
  );
};