import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./App.css";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import AboutSection from "./sections/About-Section";
import HeroSection from "./sections/Hero-Section";
import ProjectSection from "./sections/Project-Section";
import FloatingSocials from "./components/FloatingSocials";
import GallerySertifikat from "./sections/Gallery-Section";
import Kontak from "./sections/Contact-Section";
import ExperienceSection from "./sections/Experience-Section";
import TestimonialsSection from "./sections/Testimonials-Section";
import DynamicHead from "./components/DynamicHead";
// import CallToAction from "./sections/CallToAction";
// import { BrowserRouter } from "react-router-dom";
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
          <AboutSection />
          <ExperienceSection />
          <ProjectSection />
          {/* <CallToAction /> */}
          <GallerySertifikat />
          <TestimonialsSection />
          <Kontak />{" "}
        </main>
        <FloatingSocials />
        <Footer />
      </>
  );
}

export default App;
