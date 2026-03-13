import { useState } from "react";
import { Bell, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/sonner";
import { submitAdmissionEnquiry } from "@/services/api";

const initialState = {
  name: "",
  email: "",
  phone: "",
  studentName: "",
  grade: "",
  message: "",
};

export const FloatingAdmissionBell = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState(initialState);

  const onChange = (event) => {
    setForm((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);

    const payload = {
      parent_name: form.name,
      email: form.email,
      phone: form.phone,
      student_name: form.studentName || undefined,
      grade: form.grade || undefined,
      message: form.message,
    };

    try {
      await submitAdmissionEnquiry(payload);
      toast.success("Admission enquiry submitted successfully.");
      setForm(initialState);
      setIsOpen(false);
    } catch (error) {
      toast.error("Unable to submit enquiry. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="floating-bell-pulse fixed bottom-5 right-5 z-[90] flex items-center gap-2.5 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 py-3 pl-4 pr-5 text-white shadow-[0_4px_24px_rgba(217,119,6,0.45)] transition-transform hover:scale-105"
        data-testid="floating-admission-bell-button"
        aria-label="Open admission enquiry form"
      >
        <span className="floating-bell-ring inline-flex rounded-full bg-white/25 p-1.5">
          <Bell className="h-5 w-5" />
        </span>
        <span className="text-sm font-bold uppercase tracking-wide">Admissions Open</span>
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 z-[95] flex items-end justify-center bg-black/50 p-3 sm:items-center"
          data-testid="floating-admission-modal-overlay"
        >
          <div className="w-full max-w-md rounded-2xl bg-white p-5 shadow-xl" data-testid="floating-admission-modal">
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-xl font-bold text-slate-900" data-testid="floating-admission-modal-title">
                Admission Enquiry
              </h3>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="rounded-full p-2 text-slate-600 hover:bg-slate-100"
                data-testid="floating-admission-modal-close-button"
                aria-label="Close admission enquiry form"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <form className="space-y-3" onSubmit={onSubmit} data-testid="floating-admission-form">
              <Input
                name="name"
                placeholder="Parent Name"
                value={form.name}
                onChange={onChange}
                required
                data-testid="floating-admission-name-input"
              />
              <Input
                name="email"
                type="email"
                placeholder="Email"
                value={form.email}
                onChange={onChange}
                required
                data-testid="floating-admission-email-input"
              />
              <Input
                name="phone"
                placeholder="Phone Number"
                value={form.phone}
                onChange={onChange}
                required
                data-testid="floating-admission-phone-input"
              />
              <Input
                name="studentName"
                placeholder="Student Name (Optional)"
                value={form.studentName}
                onChange={onChange}
                data-testid="floating-admission-student-name-input"
              />
              <Input
                name="grade"
                placeholder="Class / Grade (Optional)"
                value={form.grade}
                onChange={onChange}
                data-testid="floating-admission-grade-input"
              />
              <Textarea
                name="message"
                placeholder="Your message"
                value={form.message}
                onChange={onChange}
                required
                className="min-h-24"
                data-testid="floating-admission-message-input"
              />
              <Button
                type="submit"
                className="h-11 w-full rounded-full"
                disabled={isSubmitting}
                data-testid="floating-admission-submit-button"
              >
                {isSubmitting ? "Submitting..." : "Submit Enquiry"}
              </Button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};