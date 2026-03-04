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
  name: "",
  email: "",
  phone: "",
  subject: "",
  message: "",
};

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
        <h1 className="text-4xl font-black text-slate-900 sm:text-5xl" data-testid="contact-main-heading">Connect with Admissions & School Office</h1>
        <p className="max-w-3xl text-base leading-8 text-slate-600 md:text-lg" data-testid="contact-intro-text">
          Share your query and our team will reach out with complete details.
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
            <form className="space-y-4" onSubmit={onSubmit} data-testid="contact-enquiry-form">
              <Input
                name="name"
                value={form.name}
                onChange={onFieldChange}
                placeholder="Full Name"
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
                placeholder="Write your message"
                required
                className="min-h-32"
                data-testid="contact-form-message-input"
              />
              <Button
                className="premium-shine h-12 w-full rounded-full text-sm font-semibold"
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
    </div>
  );
};