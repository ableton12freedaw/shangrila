import { Card, CardContent } from "@/components/ui/card";
import { PageSection } from "@/components/PageSection";
import { activitiesList, imageAssets } from "@/data/siteContent";

export const ActivitiesPage = () => {
  return (
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
            Beyond Classrooms, We Build Leaders
          </h1>
          <p className="text-base leading-8 text-slate-600 md:text-lg" data-testid="activities-intro-text">
            Students explore sports, arts, service, and leadership opportunities that shape confidence,
            collaboration, and resilience.
          </p>
        </div>
      </PageSection>

      <PageSection className="mt-12 grid gap-6 md:grid-cols-3" testId="activities-cards-section">
        {activitiesList.map((activity) => (
          <Card key={activity.title} className="premium-shine border-slate-200 bg-white" data-testid={`activities-card-${activity.title.toLowerCase().replace(/\s+/g, "-")}`}>
            <CardContent className="space-y-3 p-6">
              <h2 className="text-2xl font-bold text-primary" data-testid={`activities-card-title-${activity.title.toLowerCase().replace(/\s+/g, "-")}`}>{activity.title}</h2>
              <p className="text-sm leading-7 text-slate-600" data-testid={`activities-card-description-${activity.title.toLowerCase().replace(/\s+/g, "-")}`}>
                {activity.description}
              </p>
            </CardContent>
          </Card>
        ))}
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
  );
};