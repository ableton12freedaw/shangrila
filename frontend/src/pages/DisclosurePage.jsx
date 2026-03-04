import { Download, FileText } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PageSection } from "@/components/PageSection";
import { disclosureDocuments, disclosureInfo } from "@/data/siteContent";

export const DisclosurePage = () => {
  return (
    <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8" data-testid="disclosure-page-root">
      <PageSection className="space-y-4" testId="disclosure-header-section">
        <p className="text-xs font-bold uppercase tracking-[0.32em] text-amber-700" data-testid="disclosure-page-label">Disclosure</p>
        <h1 className="text-4xl font-black text-slate-900 sm:text-5xl" data-testid="disclosure-main-heading">
          Mandatory School Information & Important Documents
        </h1>
        <p className="max-w-3xl text-base leading-8 text-slate-600 md:text-lg" data-testid="disclosure-intro-text">
          Transparent reporting for parents and stakeholders. All key institutional details are listed below.
        </p>
      </PageSection>

      <PageSection className="mt-10 grid gap-8 lg:grid-cols-[1.1fr_1fr]" testId="disclosure-content-grid">
        <Card className="border-slate-200 bg-white" data-testid="disclosure-info-card">
          <CardContent className="p-0">
            <table className="w-full" data-testid="disclosure-info-table">
              <tbody>
                {disclosureInfo.map((row) => (
                  <tr key={row.key} className="border-b border-slate-100">
                    <td className="w-1/2 px-5 py-4 text-sm font-semibold text-slate-800" data-testid={`disclosure-info-key-${row.key.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}>{row.key}</td>
                    <td className="px-5 py-4 text-sm text-slate-600" data-testid={`disclosure-info-value-${row.key.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}>{row.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>

        <Card className="border-slate-200 bg-slate-50" data-testid="disclosure-documents-card">
          <CardContent className="space-y-4 p-6">
            <h2 className="text-3xl font-bold text-slate-900" data-testid="disclosure-documents-heading">Important Documents</h2>
            {disclosureDocuments.map((doc) => (
              <div
                key={doc}
                className="flex items-center justify-between rounded-xl border border-slate-200 bg-white px-4 py-3"
                data-testid={`disclosure-document-row-${doc.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
              >
                <p className="flex items-center gap-2 text-sm font-medium text-slate-700" data-testid={`disclosure-document-name-${doc.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}>
                  <FileText className="h-4 w-4 text-amber-600" /> {doc}
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-9 rounded-full border-primary text-primary"
                  data-testid={`disclosure-document-download-${doc.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
                >
                  <Download className="mr-1 h-4 w-4" /> View
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>
      </PageSection>
    </div>
  );
};