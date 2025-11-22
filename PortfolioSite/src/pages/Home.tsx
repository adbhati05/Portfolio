import CosmicBackground from "../components/CosmicBackground";
import NavBar from "../components/NavBar";
import HeroSection from "../components/HeroSection";
import AboutMeSection from "../components/AboutMeSection";
import SkillsSection from "../components/SkillsSection";
import ProjectsSection from "../components/ProjectsSection";
import EducationSection from "../components/EducationSection";
import ContactSection from "../components/ContactSection";
import Footer from "../components/Footer";

export const Home = () => {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Background Effects */}
      <CosmicBackground />

      {/* Navbar (which contains the ThemeToggle button) */}
      <NavBar />

      {/* Main Content */}
      <main>
        <HeroSection />
        <AboutMeSection />
        <SkillsSection />
        <ProjectsSection />
        <EducationSection />
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Home;