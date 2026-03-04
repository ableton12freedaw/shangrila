import { useEffect } from "react";
import { BrowserRouter, Navigate, Route, Routes, useLocation } from "react-router-dom";
import "@/App.css";
import { Toaster } from "@/components/ui/sonner";
import { SiteLayout } from "@/components/SiteLayout";
import { HomePage } from "@/pages/HomePage";
import { AboutPage } from "@/pages/AboutPage";
import { AcademicsPage } from "@/pages/AcademicsPage";
import { ActivitiesPage } from "@/pages/ActivitiesPage";
import { GalleryPage } from "@/pages/GalleryPage";
import { DisclosurePage } from "@/pages/DisclosurePage";
import { ContactPage } from "@/pages/ContactPage";

const ScrollToTop = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location.pathname]);

  return null;
};

const AppRoutes = () => (
  <>
    <ScrollToTop />
    <SiteLayout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about-us" element={<AboutPage />} />
        <Route path="/academics" element={<AcademicsPage />} />
        <Route path="/activities" element={<ActivitiesPage />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/acitivities" element={<Navigate to="/activities" replace />} />
        <Route path="/disclosure" element={<DisclosurePage />} />
        <Route path="/contact-us" element={<ContactPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </SiteLayout>
    <Toaster position="top-right" richColors />
  </>
);

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;
