import { Download, ExternalLink, FileText } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PageSection } from "@/components/PageSection";
import { disclosureDocuments, disclosureInfo, safetyPolicies } from "@/data/siteContent";

const slugify = (value) => value.toLowerCase().replace(/[^a-z0-9]+/g, "-");

export const DisclosurePage = () => {
  return (
    <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8" data-testid="disclosure-page-root">
      <PageSection className="space-y-4" testId="disclosure-header-section">
        <p className="text-xs font-bold uppercase tracking-[0.32em] text-amber-700" data-testid="disclosure-page-label">Disclosure</p>
        <h1 className="text-4xl font-black text-slate-900 sm:text-5xl" data-testid="disclosure-main-heading">
          Mandatory School Information & Important Documents
        </h1>
        <p className="max-w-3xl text-base leading-8 text-slate-600 md:text-lg" data-testid="disclosure-intro-text">
          Student safety and transparency are top priorities. Below are key institutional details and policy disclosures.
        </p>
      </PageSection>

      <PageSection className="mt-10 grid gap-8 lg:grid-cols-[1.1fr_1fr]" testId="disclosure-content-grid">
        <Card className="border-slate-200 bg-white" data-testid="disclosure-info-card">
          <CardContent className="p-0">
            <div className="overflow-x-auto" data-testid="disclosure-info-table-wrapper">
              <table className="w-full min-w-[560px]" data-testid="disclosure-info-table">
                <tbody>
                  {disclosureInfo.map((row) => (
                    <tr key={row.key} className="border-b border-slate-100">
                      <td className="w-1/2 px-5 py-4 text-sm font-semibold text-slate-800" data-testid={`disclosure-info-key-${row.key.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}>{row.key}</td>
                      <td className="px-5 py-4 text-sm text-slate-600" data-testid={`disclosure-info-value-${row.key.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}>{row.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        <Card className="border-slate-200 bg-slate-50" data-testid="disclosure-documents-card">
          <CardContent className="space-y-4 p-6">
            <h2 className="text-3xl font-bold text-slate-900" data-testid="disclosure-documents-heading">Important Documents</h2>
            {disclosureDocuments.map((doc) => (
              <div
                key={doc.title}
                className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3"
                data-testid={`disclosure-document-row-${slugify(doc.title)}`}
              >
                <div className="min-w-0" data-testid={`disclosure-document-meta-${slugify(doc.title)}`}>
                  <p className="flex items-center gap-2 text-sm font-medium text-slate-700" data-testid={`disclosure-document-name-${slugify(doc.title)}`}>
                    <FileText className="h-4 w-4 text-amber-600" /> {doc.title}
                    <span
                      className="rounded-full bg-rose-50 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-rose-700"
                      data-testid={`disclosure-document-pdf-badge-${slugify(doc.title)}`}
                    >
                      PDF
                    </span>
                  </p>
                  <p className="mt-1 text-xs text-slate-500" data-testid={`disclosure-document-size-${slugify(doc.title)}`}>
                    {doc.size}
                  </p>
                </div>

                <div className="flex items-center gap-2" data-testid={`disclosure-document-actions-${slugify(doc.title)}`}>
                  <Button asChild variant="outline" size="sm" className="h-9 rounded-full border-primary text-primary" data-testid={`disclosure-document-open-${slugify(doc.title)}`}>
                    <a
                      href={doc.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-testid={`disclosure-document-open-link-${slugify(doc.title)}`}
                    >
                      <ExternalLink className="mr-1 h-4 w-4" /> Open
                    </a>
                  </Button>

                  <Button asChild size="sm" className="h-9 rounded-full" data-testid={`disclosure-document-download-${slugify(doc.title)}`}>
                    <a
                      href={doc.url}
                      download
                      data-testid={`disclosure-document-download-link-${slugify(doc.title)}`}
                    >
                      <Download className="mr-1 h-4 w-4" /> Download
                    </a>
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </PageSection>

      <PageSection className="mt-12" testId="disclosure-policies-section">
        <div className="mb-6">
          <h2 className="text-3xl font-bold text-slate-900 md:text-5xl" data-testid="disclosure-policies-heading">
            Safety Policies
          </h2>
        </div>
        <div className="grid gap-6 md:grid-cols-2" data-testid="disclosure-policies-grid">
          {safetyPolicies.map((policy) => (
            <Card key={policy.title} className="border-slate-200 bg-white" data-testid={`disclosure-policy-card-${slugify(policy.title)}`}>
              <CardContent className="space-y-2 p-6">
                <h3 className="text-2xl font-bold text-primary" data-testid={`disclosure-policy-title-${slugify(policy.title)}`}>
                  {policy.title}
                </h3>
                <p className="text-sm leading-7 text-slate-600" data-testid={`disclosure-policy-description-${slugify(policy.title)}`}>
                  {policy.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </PageSection>
    </div>
  );
};