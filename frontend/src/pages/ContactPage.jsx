import { useState } from "react";
import { Mail, MapPin, Phone } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/sonner";
import { PageSection } from "@/components/PageSection";
import { schoolIdentity } from "@/data/siteContent";
import { submitContactMessage } from "@/services/api";

const initialForm = {
  student_name: "",
  date_of_birth: "",
  grade_standard: "",
  academic_year: "",
  parent_guardian_name: "",
  residential_address: "",
  transport_required: "No",
  name: "",
  email: "",
  phone: "",
  subject: "",
  message: "",
};

const schoolMapUrl =
  "https://www.google.com/maps/place/Shangrila+English+High+School/@21.1094895,78.9542558,17z/data=!3m1!4b1!4m6!3m5!1s0x3bd494f0bfffffff:0xcc72a79d310bf7dd!8m2!3d21.1094895!4d78.9542558!16s%2Fg%2F11clshkyxw?entry=ttu&g_ep=EgoyMDI2MDMwMS4xIKXMDSoASAFQAw%3D%3D";

const schoolMapEmbedUrl =
  "https://www.google.com/maps?q=21.1094895,78.9542558&z=17&output=embed";

export const ContactPage = () => {
  const [form, setForm] = useState(initialForm);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onFieldChange = (event) => {
    setForm((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    try {
      await submitContactMessage(form);
      toast.success("Thank you! Your enquiry has been submitted.");
      setForm(initialForm);
    } catch (error) {
      toast.error("Unable to submit enquiry right now. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8" data-testid="contact-page-root">
      <PageSection className="mb-10 space-y-4" testId="contact-header-section">
        <p className="text-xs font-bold uppercase tracking-[0.32em] text-amber-700" data-testid="contact-page-label">Contact Us</p>
        <h1 className="text-4xl font-black text-slate-900 sm:text-5xl" data-testid="contact-main-heading">Admission Enquiry Form</h1>
        <p className="max-w-3xl text-base leading-8 text-slate-600 md:text-lg" data-testid="contact-intro-text">
          Please fill in the details below. Our admission team will contact you shortly.
        </p>
      </PageSection>

      <PageSection className="grid gap-8 lg:grid-cols-[1fr_1.15fr]" testId="contact-content-grid">
        <Card className="border-slate-200 bg-white" data-testid="contact-details-card">
          <CardContent className="space-y-6 p-7">
            <h2 className="text-3xl font-bold text-slate-900" data-testid="contact-details-heading">School Contact Details</h2>
            <p className="flex items-center gap-3 text-sm text-slate-700" data-testid="contact-address-row">
              <MapPin className="h-5 w-5 text-amber-600" /> {schoolIdentity.address}
            </p>
            <p className="flex items-center gap-3 text-sm text-slate-700" data-testid="contact-phone-row">
              <Phone className="h-5 w-5 text-amber-600" /> {schoolIdentity.phone}
            </p>
            <p className="flex items-center gap-3 text-sm text-slate-700" data-testid="contact-email-row">
              <Mail className="h-5 w-5 text-amber-600" /> {schoolIdentity.email}
            </p>
            <p className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm leading-7 text-slate-700" data-testid="contact-working-hours-row">
              {schoolIdentity.workingHours}
            </p>
          </CardContent>
        </Card>

        <Card className="border-slate-200 bg-white" data-testid="contact-form-card">
          <CardContent className="p-7">
            <form className="grid gap-4 md:grid-cols-2" onSubmit={onSubmit} data-testid="contact-enquiry-form">
              <Input
                name="student_name"
                value={form.student_name}
                onChange={onFieldChange}
                placeholder="Student Name"
                required
                className="h-12"
                data-testid="contact-form-student-name-input"
              />
              <Input
                type="date"
                name="date_of_birth"
                value={form.date_of_birth}
                onChange={onFieldChange}
                required
                className="h-12"
                data-testid="contact-form-date-of-birth-input"
              />
              <Input
                name="grade_standard"
                value={form.grade_standard}
                onChange={onFieldChange}
                placeholder="Grade / Standard Applying For"
                required
                className="h-12"
                data-testid="contact-form-grade-standard-input"
              />
              <Input
                name="academic_year"
                value={form.academic_year}
                onChange={onFieldChange}
                placeholder="Academic Year"
                required
                className="h-12"
                data-testid="contact-form-academic-year-input"
              />
              <Input
                name="parent_guardian_name"
                value={form.parent_guardian_name}
                onChange={onFieldChange}
                placeholder="Parent / Guardian Name"
                required
                className="h-12"
                data-testid="contact-form-parent-guardian-name-input"
              />
              <Input
                name="name"
                value={form.name}
                onChange={onFieldChange}
                placeholder="Contact Person Name"
                required
                className="h-12"
                data-testid="contact-form-name-input"
              />
              <Input
                type="email"
                name="email"
                value={form.email}
                onChange={onFieldChange}
                placeholder="Email Address"
                required
                className="h-12"
                data-testid="contact-form-email-input"
              />
              <Input
                name="phone"
                value={form.phone}
                onChange={onFieldChange}
                placeholder="Phone Number"
                required
                className="h-12"
                data-testid="contact-form-phone-input"
              />
              <Input
                name="residential_address"
                value={form.residential_address}
                onChange={onFieldChange}
                placeholder="Residential Address"
                required
                className="h-12 md:col-span-2"
                data-testid="contact-form-residential-address-input"
              />
              <label className="flex flex-col gap-2 md:col-span-2" data-testid="contact-form-transport-required-field">
                <span className="text-sm font-semibold text-slate-700" data-testid="contact-form-transport-required-label">
                  Transport Required?
                </span>
                <select
                  name="transport_required"
                  value={form.transport_required}
                  onChange={onFieldChange}
                  className="h-12 rounded-md border border-input bg-transparent px-3 text-sm text-slate-700"
                  data-testid="contact-form-transport-required-select"
                >
                  <option value="Yes" data-testid="contact-form-transport-yes-option">Yes</option>
                  <option value="No" data-testid="contact-form-transport-no-option">No</option>
                </select>
              </label>
              <Input
                name="subject"
                value={form.subject}
                onChange={onFieldChange}
                placeholder="Subject"
                required
                className="h-12"
                data-testid="contact-form-subject-input"
              />
              <Textarea
                name="message"
                value={form.message}
                onChange={onFieldChange}
                placeholder="Any Queries / Remarks"
                required
                className="min-h-32 md:col-span-2"
                data-testid="contact-form-message-input"
              />
              <Button
                className="premium-shine h-12 w-full rounded-full text-sm font-semibold md:col-span-2"
                type="submit"
                disabled={isSubmitting}
                data-testid="contact-form-submit-button"
              >
                {isSubmitting ? "Submitting..." : "Submit Enquiry"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </PageSection>

      <PageSection className="mt-12" testId="contact-map-section">
        <Card className="overflow-hidden border-slate-200 bg-white" data-testid="contact-map-card">
          <CardContent className="space-y-4 p-7">
            <div className="flex flex-wrap items-center justify-between gap-3" data-testid="contact-map-header-row">
              <h2 className="text-3xl font-bold text-slate-900" data-testid="contact-map-heading">
                Find Us on Map
              </h2>
              <a
                href={schoolMapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-primary px-4 py-2 text-sm font-semibold text-primary transition-colors hover:bg-primary hover:text-white"
                data-testid="contact-map-open-google-link"
              >
                Open in Google Maps
              </a>
            </div>

            <div className="overflow-hidden rounded-2xl border border-slate-200" data-testid="contact-map-embed-wrapper">
              <iframe
                title="Shangrila English High School Location"
                src={schoolMapEmbedUrl}
                width="100%"
                height="380"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full"
                data-testid="contact-map-embed-iframe"
              />
            </div>
          </CardContent>
        </Card>
      </PageSection>
    </div>
  );
};