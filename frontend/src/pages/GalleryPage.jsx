import { Card, CardContent } from "@/components/ui/card";
import { PageSection } from "@/components/PageSection";
import { SEOHead } from "@/components/SEOHead";
import { schoolLifeGallery } from "@/data/siteContent";

const slugify = (value) => value.toLowerCase().replace(/[^a-z0-9]+/g, "-");

export const GalleryPage = () => {
  return (
    <>
      <SEOHead
        title="School Gallery | CBSE School in Hingna, Nagpur | Shangrila"
        description="View real campus moments from academics, sports, and student life at Shangrila English High School & Junior College, Nagpur."
        keywords="school gallery nagpur, cbse school in hingna, best school in nagpur"
        path="/gallery"
      />

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8" data-testid="gallery-page-root">
      <PageSection className="space-y-4" testId="gallery-header-section">
        <p className="text-xs font-bold uppercase tracking-[0.32em] text-amber-700" data-testid="gallery-page-label">
          School Life Gallery
        </p>
        <h1 className="text-3xl font-black text-slate-900 sm:text-5xl" data-testid="gallery-main-heading">
          Life at Shangrila in Real Moments
        </h1>
        <p className="max-w-3xl text-sm leading-7 text-slate-600 sm:text-base md:text-lg" data-testid="gallery-intro-text">
          A glimpse into academics, sports, values, and daily student experiences at
          THE SHANGRILA ENGLISH HIGH SCHOOL & JUNIOR COLLEGE.
        </p>
      </PageSection>

      <section className="mt-6 sm:mt-10" data-testid="gallery-grid-section">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3" data-testid="gallery-photo-grid">
          {schoolLifeGallery.map((item, index) => (
            <Card
              key={item.title}
              className="mx-auto w-full max-w-md overflow-hidden border-slate-200 bg-white sm:max-w-none"
              data-testid={`gallery-card-${slugify(item.title)}`}
              style={{ contentVisibility: "auto", containIntrinsicSize: "600px" }}
            >
              <div className="aspect-[4/3] w-full overflow-hidden bg-slate-100 sm:aspect-[4/5]" data-testid={`gallery-frame-${slugify(item.title)}`}>
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-full w-full object-contain object-center transition-transform duration-300 sm:object-cover sm:hover:scale-105"
                  loading={index < 6 ? "eager" : "lazy"}
                  fetchPriority={index < 3 ? "high" : "auto"}
                  decoding={index < 6 ? "sync" : "async"}
                  width="1066"
                  height="1600"
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
      </section>
      </div>
    </>
  );
};