import "./App.css";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import AboutSection from "./sections/About-Section";
import HeroSection from "./sections/Hero-Section";
import ProjectSection from "./sections/Project-Section";
import FloatingSocials from "./components/FloatingSocials";
import GallerySertifikat from "./sections/Gallery-Section";
import Kontak from "./sections/Contact-Section";
// import CallToAction from "./sections/CallToAction";
// import { BrowserRouter } from "react-router-dom";
function App() {
  return (
      <>
        <Navbar />
        <main className="p-0">
          <HeroSection />
          <AboutSection />
          <ProjectSection />
          {/* <CallToAction /> */}
          <GallerySertifikat />
          <Kontak />{" "}
        </main>
        <FloatingSocials />
        <Footer />
      </>
  );
}

export default App;
