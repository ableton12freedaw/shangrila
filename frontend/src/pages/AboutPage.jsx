import { CheckCircle2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { PageSection } from "@/components/PageSection";
import { imageAssets } from "@/data/siteContent";

const values = [
  "Academic rigor with personal attention",
  "Character, compassion, and confidence",
  "Global outlook with Indian values",
  "Inclusive and safe learning environment",
];

export const AboutPage = () => {
  return (
    <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8" data-testid="about-page-root">
      <PageSection className="grid items-center gap-8 lg:grid-cols-2" testId="about-intro-section">
        <div className="space-y-4" data-testid="about-content-column">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-amber-700" data-testid="about-page-label">About Us</p>
          <h1 className="text-4xl font-black text-slate-900 sm:text-5xl" data-testid="about-main-heading">
            A School That Builds Bright Futures with Heart
          </h1>
          <p className="text-base leading-8 text-slate-600 md:text-lg" data-testid="about-description-text">
            THE SHANGRILA ENGLISH HIGH SCHOOL is committed to nurturing curiosity, discipline, and integrity.
            Our educators blend modern pedagogy with meaningful mentorship so each child can learn with joy and purpose.
          </p>
        </div>

        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white p-2" data-testid="about-school-building-wrapper">
          <img
            src={imageAssets.building}
            alt="Modern School Building Exterior"
            className="aspect-[4/3] w-full rounded-2xl object-cover object-center"
            loading="lazy"
            data-testid="about-school-building-image"
          />
        </div>
      </PageSection>

      <PageSection className="mt-12 grid gap-6 md:grid-cols-2" testId="about-mission-vision-section">
        <Card className="border-slate-200 bg-white/95" data-testid="about-mission-card">
          <CardContent className="space-y-3 p-7">
            <h2 className="text-3xl font-bold text-primary" data-testid="about-mission-heading">Our Mission</h2>
            <p className="text-sm leading-7 text-slate-600 md:text-base" data-testid="about-mission-text">
              To provide transformative education that empowers students with knowledge, ethics, and life skills.
            </p>
          </CardContent>
        </Card>

        <Card className="border-slate-200 bg-white/95" data-testid="about-vision-card">
          <CardContent className="space-y-3 p-7">
            <h2 className="text-3xl font-bold text-primary" data-testid="about-vision-heading">Our Vision</h2>
            <p className="text-sm leading-7 text-slate-600 md:text-base" data-testid="about-vision-text">
              To be a benchmark institution in India where every learner grows into a compassionate and capable leader.
            </p>
          </CardContent>
        </Card>
      </PageSection>

      <PageSection className="mt-12" testId="about-values-section">
        <Card className="border-slate-200 bg-gradient-to-r from-white to-slate-50" data-testid="about-values-card">
          <CardContent className="p-7">
            <h3 className="text-3xl font-bold text-slate-900" data-testid="about-values-heading">Core Values</h3>
            <div className="mt-5 grid gap-4 md:grid-cols-2">
              {values.map((value) => (
                <p className="flex items-start gap-3 text-sm leading-7 text-slate-700 md:text-base" key={value} data-testid={`about-value-item-${value.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}>
                  <CheckCircle2 className="mt-1 h-5 w-5 text-amber-600" />
                  {value}
                </p>
              ))}
            </div>
          </CardContent>
        </Card>
      </PageSection>
    </div>
  );
};