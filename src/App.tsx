import { useEffect, lazy, Suspense } from "react";
import { useLocation } from "react-router-dom";
import "./App.css";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import HeroSection from "./sections/Hero-Section";
import FloatingSocials from "./components/FloatingSocials";
import DynamicHead from "./components/DynamicHead";

// Lazy load sections that are below the fold
const AboutSection = lazy(() => import("./sections/About-Section"));
const ExperienceSection = lazy(() => import("./sections/Experience-Section"));
const ProjectSection = lazy(() => import("./sections/Project-Section"));
const CallToAction = lazy(() => import("./sections/CallToAction"));
const GallerySertifikat = lazy(() => import("./sections/Gallery-Section"));
const TestimonialsSection = lazy(() => import("./sections/Testimonials-Section"));
const Kontak = lazy(() => import("./sections/Contact-Section"));

// Loading fallback for sections
const SectionLoader = () => (
  <div className="py-20 flex justify-center items-center dark:bg-gray-900">
    <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
  </div>
);

function App() {
  const location = useLocation();

  useEffect(() => {
    // Handle scroll to section when hash is present in URL
    if (location.hash) {
      const hash = location.hash;
      setTimeout(() => {
        const element = document.querySelector(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  }, [location.hash]);

  return (
      <>
        <DynamicHead />
        <Navbar />
        <main className="p-0">
          <HeroSection />
          <Suspense fallback={<SectionLoader />}>
            <AboutSection />
            <ExperienceSection />
            <ProjectSection />
            <CallToAction />
            <GallerySertifikat />
            <TestimonialsSection />
            <Kontak />
          </Suspense>
        </main>
        <FloatingSocials />
        <Footer />
      </>
  );
}

export default App;
