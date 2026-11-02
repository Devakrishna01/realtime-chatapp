import "./HomePage.css";
import { NavBar } from "../../../components/NavBar";
import { HeroSection } from "../../../components/HeroSection";
import { FeaturesSection } from "../../../components/FeaturesSection";
import { About } from "../../../components/About";
import { ContactFooter } from "../../../components/ContactFooter";
export function HomePage() {
  return (
    <>
      <NavBar />
      <HeroSection />
      <FeaturesSection />
      <About />
      <ContactFooter />
    </>
  );
}
