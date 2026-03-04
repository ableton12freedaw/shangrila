import { Card, CardContent } from "@/components/ui/card";
import { PageSection } from "@/components/PageSection";
import { SEOHead } from "@/components/SEOHead";
import {
  achievementsSections,
  activitiesList,
  imageAssets,
  interSchoolEvents,
} from "@/data/siteContent";

const slugify = (value) => value.toLowerCase().replace(/[^a-z0-9]+/g, "-");

export const ActivitiesPage = () => {
  return (
    <>
      <SEOHead
        title="Activities & Achievements | Best School in Nagpur | Shangrila"
        description="Discover co-curricular programs, sports, competitions, and student achievements at Shangrila English High School in Nagpur."
        keywords="school activities in nagpur, best school in nagpur, student achievements nagpur school"
        path="/activities"
      />

      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8" data-testid="activities-page-root">
      <PageSection className="grid gap-8 lg:grid-cols-[1fr_1.1fr]" testId="activities-hero-section">
        <div className="overflow-hidden rounded-3xl border border-slate-200 p-2" data-testid="activities-main-image-wrapper">
          <img
            src={imageAssets.activities}
            alt="Students playing sports"
            className="aspect-[4/3] w-full rounded-2xl object-cover object-center"
            loading="lazy"
            data-testid="activities-main-image"
          />
        </div>

        <div className="space-y-4" data-testid="activities-content-column">
          <p className="text-xs font-bold uppercase tracking-[0.32em] text-amber-700" data-testid="activities-page-label">Activities</p>
          <h1 className="text-4xl font-black text-slate-900 sm:text-5xl" data-testid="activities-main-heading">
            Co-Curricular & Extra-Curricular Programs
          </h1>
          <p className="text-base leading-8 text-slate-600 md:text-lg" data-testid="activities-intro-text">
            We nurture creativity, confidence, discipline, and leadership through arts, sports, wellness,
            and club-based experiences beyond the classroom.
          </p>
        </div>
      </PageSection>

      <PageSection className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3" testId="activities-cards-section">
        {activitiesList.map((activity) => (
          <Card key={activity.title} className="premium-shine border-slate-200 bg-white" data-testid={`activities-card-${slugify(activity.title)}`}>
            <CardContent className="space-y-3 p-6">
              <h2 className="text-2xl font-bold text-primary" data-testid={`activities-card-title-${slugify(activity.title)}`}>{activity.title}</h2>
              <p className="text-sm leading-7 text-slate-600" data-testid={`activities-card-description-${slugify(activity.title)}`}>
                {activity.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </PageSection>

      <PageSection className="mt-12" testId="activities-events-section">
        <Card className="border-slate-200 bg-white" data-testid="activities-events-card">
          <CardContent className="space-y-3 p-7">
            <h2 className="text-3xl font-bold text-slate-900" data-testid="activities-events-heading">
              Inter-School Competitions & Events
            </h2>
            <ul className="space-y-2" data-testid="activities-events-list">
              {interSchoolEvents.map((event) => (
                <li className="text-sm leading-7 text-slate-700" key={event} data-testid={`activities-event-item-${slugify(event)}`}>
                  • {event}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </PageSection>

      <PageSection className="mt-12" testId="activities-achievements-section">
        <div className="mb-6">
          <h2 className="text-3xl font-bold text-slate-900 md:text-5xl" data-testid="activities-achievements-heading">Achievements</h2>
        </div>
        <div className="grid gap-6 md:grid-cols-3" data-testid="activities-achievements-grid">
          {achievementsSections.map((section) => (
            <Card key={section.title} className="border-slate-200 bg-slate-50" data-testid={`activities-achievements-card-${slugify(section.title)}`}>
              <CardContent className="space-y-3 p-6">
                <h3 className="text-2xl font-bold text-primary" data-testid={`activities-achievements-title-${slugify(section.title)}`}>
                  {section.title}
                </h3>
                <ul className="space-y-2" data-testid={`activities-achievements-list-${slugify(section.title)}`}>
                  {section.points.map((point) => (
                    <li className="text-sm leading-7 text-slate-700" key={point} data-testid={`activities-achievements-item-${slugify(point)}`}>
                      • {point}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </PageSection>

        <PageSection className="mt-12" testId="activities-campus-image-section">
        <div className="overflow-hidden rounded-3xl border border-slate-200 p-2" data-testid="activities-campus-image-wrapper">
          <img
            src={imageAssets.campusGreen}
            alt="School campus with green field"
            className="aspect-[21/7] w-full rounded-2xl object-cover object-center"
            loading="lazy"
            data-testid="activities-campus-image"
          />
        </div>
        </PageSection>
      </div>
    </>
  );
};