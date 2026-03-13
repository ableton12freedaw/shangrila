import { useState, useRef, useCallback } from "react";
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

  const btnRef = useRef(null);
  const dragState = useRef({ dragging: false, startY: 0, startTop: 0, moved: false });
  const [posY, setPosY] = useState(() => {
    if (typeof window !== "undefined") return Math.round(window.innerHeight / 2 - 50);
    return 300;
  });

  const onPointerDown = useCallback((e) => {
    dragState.current = { dragging: true, startY: e.clientY, startTop: posY, moved: false };
    btnRef.current?.setPointerCapture(e.pointerId);
  }, [posY]);

  const onPointerMove = useCallback((e) => {
    if (!dragState.current.dragging) return;
    const dy = e.clientY - dragState.current.startY;
    if (Math.abs(dy) > 4) dragState.current.moved = true;
    const next = Math.max(10, Math.min(window.innerHeight - 100, dragState.current.startTop + dy));
    setPosY(next);
  }, []);

  const onPointerUp = useCallback((e) => {
    const wasDrag = dragState.current.moved;
    dragState.current.dragging = false;
    btnRef.current?.releasePointerCapture(e.pointerId);
    if (!wasDrag) setIsOpen(true);
  }, []);

  return (
    <>
      <div
        ref={btnRef}
        role="button"
        tabIndex={0}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onKeyDown={(e) => { if (e.key === "Enter") setIsOpen(true); }}
        style={{ top: posY }}
        className="floating-bell-pulse fixed right-0 z-[90] flex cursor-grab touch-none flex-col items-center gap-1 rounded-l-2xl bg-gradient-to-b from-[#1e88e5] to-[#1a237e] px-4 pb-3 pt-4 text-white shadow-[0_6px_28px_rgba(26,35,126,0.5)] transition-shadow select-none hover:shadow-[0_6px_36px_rgba(26,35,126,0.65)] active:cursor-grabbing"
        data-testid="floating-admission-bell-button"
        aria-label="Open admission enquiry form"
      >
        <span className="floating-bell-ring -mt-8 mb-1 inline-flex rounded-full border-[3px] border-white bg-white p-2.5 shadow-md">
          <Bell className="h-6 w-6 text-amber-500" strokeWidth={2.5} />
        </span>
        <span className="text-center text-[10px] font-bold leading-snug tracking-wide">
          Admission<br />Enquiry
        </span>
      </div>

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