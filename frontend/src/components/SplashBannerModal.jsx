import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { splashBanner } from "@/data/siteContent";

const SPLASH_SESSION_KEY = "shangrila-splash-shown";

export const SplashBannerModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const alreadyShown = sessionStorage.getItem(SPLASH_SESSION_KEY);
    if (!alreadyShown) {
      setIsOpen(true);
    }
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  const closeModal = () => {
    sessionStorage.setItem(SPLASH_SESSION_KEY, "1");
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/65 p-3 sm:p-6"
      data-testid="splash-banner-overlay"
    >
      <div
        className="relative w-full max-w-3xl overflow-hidden rounded-2xl border border-white/20 bg-white"
        data-testid="splash-banner-modal"
      >
        <button
          type="button"
          onClick={closeModal}
          className="absolute right-2 top-2 z-10 rounded-full bg-black/70 p-2 text-white transition-colors hover:bg-black"
          aria-label="Close admission banner"
          data-testid="splash-banner-close-button"
        >
          <X className="h-4 w-4" />
        </button>

        <img
          src={splashBanner.image}
          alt={splashBanner.alt}
          className="h-auto w-full object-contain"
          loading="eager"
          data-testid="splash-banner-image"
        />
      </div>
    </div>
  );
};