import { useState, useRef, useCallback } from "react";
import { Bell } from "lucide-react";

const GOOGLE_FORM_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLScZqBu5DMva2SpGO9biar1F8iMXNgbE7RGY4tuUgVOdqoW8HQ/viewform";

export const FloatingAdmissionBell = () => {
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
    if (!wasDrag) window.open(GOOGLE_FORM_URL, "_blank", "noopener,noreferrer");
  }, []);

  return (
    <div
      ref={btnRef}
      role="button"
      tabIndex={0}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onKeyDown={(e) => { if (e.key === "Enter") window.open(GOOGLE_FORM_URL, "_blank", "noopener,noreferrer"); }}
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
  );
};
