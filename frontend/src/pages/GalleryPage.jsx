import { useState } from "react";
import { X } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { PageSection } from "@/components/PageSection";
import { SEOHead } from "@/components/SEOHead";
import { schoolLifeGallery } from "@/data/siteContent";

const slugify = (value) => value.toLowerCase().replace(/[^a-z0-9]+/g, "-");

export const GalleryPage = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const openLightbox = (index) => setActiveIndex(index);
  const closeLightbox = () => setActiveIndex(null);

  const goNext = (e) => {
    e.stopPropagation();
    setActiveIndex((prev) => (prev + 1) % schoolLifeGallery.length);
  };

  const goPrev = (e) => {
    e.stopPropagation();
    setActiveIndex((prev) =>
      prev === 0 ? schoolLifeGallery.length - 1 : prev - 1
    );
  };

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
                className="mx-auto w-full max-w-md cursor-pointer overflow-hidden border-slate-200 bg-white transition-shadow hover:shadow-lg sm:max-w-none"
                data-testid={`gallery-card-${slugify(item.title)}`}
                style={{ contentVisibility: "auto", containIntrinsicSize: "600px" }}
                onClick={() => openLightbox(index)}
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

      {activeIndex !== null && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-2"
          onClick={closeLightbox}
          data-testid="gallery-lightbox-overlay"
        >
          <button
            type="button"
            onClick={closeLightbox}
            className="absolute right-3 top-3 z-10 rounded-full bg-white/20 p-2 text-white backdrop-blur-sm transition-colors hover:bg-white/40"
            data-testid="gallery-lightbox-close-button"
            aria-label="Close lightbox"
          >
            <X className="h-6 w-6" />
          </button>

          <button
            type="button"
            onClick={goPrev}
            className="absolute left-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/20 px-3 py-2 text-2xl font-bold text-white backdrop-blur-sm transition-colors hover:bg-white/40 sm:left-4"
            data-testid="gallery-lightbox-prev-button"
            aria-label="Previous image"
          >
            &#8249;
          </button>

          <button
            type="button"
            onClick={goNext}
            className="absolute right-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/20 px-3 py-2 text-2xl font-bold text-white backdrop-blur-sm transition-colors hover:bg-white/40 sm:right-4"
            data-testid="gallery-lightbox-next-button"
            aria-label="Next image"
          >
            &#8250;
          </button>

          <div
            className="flex max-h-[90vh] max-w-5xl flex-col items-center"
            onClick={(e) => e.stopPropagation()}
            data-testid="gallery-lightbox-content"
          >
            <img
              src={schoolLifeGallery[activeIndex].image}
              alt={schoolLifeGallery[activeIndex].title}
              className="max-h-[78vh] w-auto rounded-lg object-contain"
              data-testid="gallery-lightbox-image"
            />
            <div className="mt-3 text-center" data-testid="gallery-lightbox-caption">
              <p className="text-xs font-bold uppercase tracking-widest text-amber-400">
                {schoolLifeGallery[activeIndex].category}
              </p>
              <p className="mt-1 text-base font-semibold text-white sm:text-lg">
                {schoolLifeGallery[activeIndex].title}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
