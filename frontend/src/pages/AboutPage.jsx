import { CheckCircle2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { PageSection } from "@/components/PageSection";
import { SEOHead } from "@/components/SEOHead";
import {
  aboutPhilosophy,
  aboutVision,
  coreValues,
  imageAssets,
  infrastructureOverview,
  milestones,
  whyChooseShangrila,
} from "@/data/siteContent";

const slugify = (value) => value.toLowerCase().replace(/[^a-z0-9]+/g, "-");

export const AboutPage = () => {
  return (
    <>
      <SEOHead
        title="About Us | CBSE School in Hingna, Nagpur | Shangrila School"
        description="Learn about Shangrila English High School's vision, values, campus infrastructure, and trusted academic journey in Hingna, Nagpur."
        keywords="about shangrila school, cbse school in hingna nagpur, best school in nagpur"
        path="/about-us"
      />

      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8" data-testid="about-page-root">
        <PageSection className="grid items-center gap-8 lg:grid-cols-2" testId="about-intro-section">
        <div className="space-y-4" data-testid="about-content-column">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-amber-700" data-testid="about-page-label">About Us</p>
          <h1 className="text-4xl font-black text-slate-900 sm:text-5xl" data-testid="about-main-heading">
            Our Vision Since 2001
          </h1>
          <p className="text-base leading-8 text-slate-600 md:text-lg" data-testid="about-description-text">
            {aboutVision}
          </p>
        </div>

        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white p-2" data-testid="about-school-building-wrapper">
          <img
            src={imageAssets.building}
            alt="Shangrila English High School building"
            className="aspect-[4/3] w-full rounded-2xl object-cover object-center"
            loading="lazy"
            data-testid="about-school-building-image"
          />
        </div>
      </PageSection>

        <PageSection className="mt-12 grid gap-6 md:grid-cols-2" testId="about-mission-vision-section">
        <Card className="border-slate-200 bg-white/95" data-testid="about-mission-card">
          <CardContent className="space-y-3 p-7">
            <h2 className="text-3xl font-bold text-primary" data-testid="about-mission-heading">Philosophy of Education</h2>
            <p className="text-sm leading-7 text-slate-600 md:text-base" data-testid="about-mission-text">
              {aboutPhilosophy}
            </p>
          </CardContent>
        </Card>

        <Card className="border-slate-200 bg-white/95" data-testid="about-vision-card">
          <CardContent className="space-y-3 p-7">
            <h2 className="text-3xl font-bold text-primary" data-testid="about-vision-heading">Infrastructure Overview</h2>
            <div className="space-y-2" data-testid="about-infrastructure-list">
              {infrastructureOverview.slice(0, 4).map((item) => (
                <p className="text-sm leading-7 text-slate-600 md:text-base" key={item.key} data-testid={`about-infra-item-${slugify(item.key)}`}>
                  <span className="font-semibold text-slate-800">{item.key}:</span> {item.value}
                </p>
              ))}
            </div>
          </CardContent>
        </Card>
      </PageSection>

        <PageSection className="mt-12" testId="about-values-section">
        <Card className="border-slate-200 bg-gradient-to-r from-white to-slate-50" data-testid="about-values-card">
          <CardContent className="p-7">
            <h3 className="text-3xl font-bold text-slate-900" data-testid="about-values-heading">Core Values</h3>
            <div className="mt-5 grid gap-4 md:grid-cols-2">
              {coreValues.map((value) => (
                <p className="flex items-start gap-3 text-sm leading-7 text-slate-700 md:text-base" key={value} data-testid={`about-value-item-${value.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}>
                  <CheckCircle2 className="mt-1 h-5 w-5 text-amber-600" />
                  {value}
                </p>
              ))}
            </div>
          </CardContent>
        </Card>
      </PageSection>

        <PageSection className="mt-12 grid gap-6 lg:grid-cols-2" testId="about-history-and-why-section">
        <Card className="border-slate-200 bg-white" data-testid="about-milestones-card">
          <CardContent className="space-y-3 p-7">
            <h3 className="text-3xl font-bold text-slate-900" data-testid="about-milestones-heading">History & Milestones</h3>
            <ul className="space-y-2" data-testid="about-milestones-list">
              {milestones.map((item) => (
                <li className="text-sm leading-7 text-slate-700" key={item} data-testid={`about-milestone-item-${slugify(item)}`}>
                  • {item}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card className="border-slate-200 bg-white" data-testid="about-why-choose-card">
          <CardContent className="space-y-3 p-7">
            <h3 className="text-3xl font-bold text-slate-900" data-testid="about-why-choose-heading">Why Choose Shangrila</h3>
            <ul className="space-y-2" data-testid="about-why-choose-list">
              {whyChooseShangrila.map((item) => (
                <li className="text-sm leading-7 text-slate-700" key={item} data-testid={`about-why-item-${slugify(item)}`}>
                  • {item}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
        </PageSection>
      </div>
    </>
  );
};