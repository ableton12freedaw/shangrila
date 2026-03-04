import { Card, CardContent } from "@/components/ui/card";
import { PageSection } from "@/components/PageSection";
import { schoolLifeGallery } from "@/data/siteContent";

const slugify = (value) => value.toLowerCase().replace(/[^a-z0-9]+/g, "-");

export const GalleryPage = () => {
  return (
    <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8" data-testid="gallery-page-root">
      <PageSection className="space-y-4" testId="gallery-header-section">
        <p className="text-xs font-bold uppercase tracking-[0.32em] text-amber-700" data-testid="gallery-page-label">
          School Life Gallery
        </p>
        <h1 className="text-4xl font-black text-slate-900 sm:text-5xl" data-testid="gallery-main-heading">
          Life at Shangrila in Real Moments
        </h1>
        <p className="max-w-3xl text-base leading-8 text-slate-600 md:text-lg" data-testid="gallery-intro-text">
          A glimpse into academics, sports, values, and daily student experiences at
          THE SHANGRILA ENGLISH HIGH SCHOOL & JUNIOR COLLEGE.
        </p>
      </PageSection>

      <PageSection className="mt-10" testId="gallery-grid-section">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3" data-testid="gallery-photo-grid">
          {schoolLifeGallery.map((item) => (
            <Card key={item.title} className="overflow-hidden border-slate-200 bg-white" data-testid={`gallery-card-${slugify(item.title)}`}>
              <div className="aspect-[4/5] w-full overflow-hidden" data-testid={`gallery-frame-${slugify(item.title)}`}>
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-full w-full object-cover object-center transition-transform duration-300 hover:scale-105"
                  loading="lazy"
                  data-testid={`gallery-photo-${slugify(item.title)}`}
                />
              </div>
              <CardContent className="space-y-2 p-5">
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-amber-700" data-testid={`gallery-category-${slugify(item.title)}`}>
                  {item.category}
                </p>
                <h2 className="text-xl font-bold text-slate-900" data-testid={`gallery-title-${slugify(item.title)}`}>
                  {item.title}
                </h2>
              </CardContent>
            </Card>
          ))}
        </div>
      </PageSection>
    </div>
  );
};