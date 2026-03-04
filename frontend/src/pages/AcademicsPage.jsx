import { Card, CardContent } from "@/components/ui/card";
import { PageSection } from "@/components/PageSection";
import { academicStaff, academicsPrograms, academicsSections, imageAssets } from "@/data/siteContent";

const slugify = (value) => value.toLowerCase().replace(/[^a-z0-9]+/g, "-");

const academicCalendar = [
  { period: "June", activity: "Session Reopens & Orientation Program" },
  { period: "July - August", activity: "Regular Classes, Unit Test 1, Club Activities" },
  { period: "September - October", activity: "Term I Revision & Mid-Term Assessments" },
  { period: "November - December", activity: "Projects, Cultural Events, and Sports Engagement" },
  { period: "January - February", activity: "Term II Learning Cycle, Practical Work, and Revision" },
  { period: "March - April", activity: "Final Assessments, Result Processing, Session Closure" },
];

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
            Academic Calendar for the current session is shared below.
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

      <PageSection className="mt-12" testId="academics-staff-section">
        <Card className="border-slate-200 bg-white" data-testid="academics-staff-card-wrapper">
          <CardContent className="p-7">
            <h3 className="text-3xl font-bold text-slate-900" data-testid="academics-staff-heading">
              Staff Directory
            </h3>
            <p className="mt-2 text-sm text-slate-600" data-testid="academics-staff-subheading">
              Staff cards added below curriculum, as requested.
            </p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3" data-testid="academics-staff-grid">
              {academicStaff.map((staff) => (
                <Card key={staff.name} className="border-slate-200 bg-slate-50" data-testid={`academics-staff-item-${slugify(staff.name)}`}>
                  <CardContent className="space-y-2 p-5">
                    <h4 className="text-lg font-bold text-primary" data-testid={`academics-staff-name-${slugify(staff.name)}`}>
                      {staff.name}
                    </h4>
                    <p className="text-xs font-bold uppercase tracking-wide text-amber-700" data-testid={`academics-staff-designation-${slugify(staff.name)}`}>
                      {staff.designation}
                    </p>
                    <p className="text-sm text-slate-700" data-testid={`academics-staff-qualification-${slugify(staff.name)}`}>
                      <span className="font-semibold">Qualification:</span> {staff.qualification}
                    </p>
                    <p className="text-sm text-slate-700" data-testid={`academics-staff-experience-${slugify(staff.name)}`}>
                      <span className="font-semibold">Experience:</span> {staff.experience}
                    </p>
                    <p className="text-sm text-slate-700" data-testid={`academics-staff-specialization-${slugify(staff.name)}`}>
                      <span className="font-semibold">Specialization:</span> {staff.specialization}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </PageSection>

      <PageSection className="mt-12" testId="academics-calendar-section">
        <Card className="border-slate-200 bg-white" data-testid="academics-calendar-card">
          <CardContent className="space-y-4 p-7">
            <h3 className="text-3xl font-bold text-slate-900" data-testid="academics-calendar-heading">
              Academic Calendar
            </h3>
            <div className="grid gap-3 md:grid-cols-2" data-testid="academics-calendar-grid">
              {academicCalendar.map((item) => (
                <div
                  key={item.period}
                  className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3"
                  data-testid={`academics-calendar-item-${slugify(item.period)}`}
                >
                  <p className="text-sm font-bold text-primary" data-testid={`academics-calendar-period-${slugify(item.period)}`}>
                    {item.period}
                  </p>
                  <p className="mt-1 text-sm leading-7 text-slate-700" data-testid={`academics-calendar-activity-${slugify(item.period)}`}>
                    {item.activity}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
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