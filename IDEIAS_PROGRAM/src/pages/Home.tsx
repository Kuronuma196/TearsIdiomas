import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import LanguagesSection from "@/components/LanguagesSection";
import ModulesSection from "@/components/ModulesSection";
import PracticeSection from "@/components/PracticeSection";
import TerraSection from "@/components/TerraSection";
import GlossarySection from "@/components/GlossarySection";
import ProficiencySection from "@/components/ProficiencySection";
import AudioExamplesSection from "@/components/AudioExamplesSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-black" style={{ fontFamily: "'Outfit', sans-serif" }}>
      <Navbar />
      <HeroSection />
      <LanguagesSection />
      <ModulesSection />
      <PracticeSection />
      <AudioExamplesSection />
      <TerraSection />
      <GlossarySection />
      <ProficiencySection />
      <Footer />
    </div>
  );
}
