import Header from "@/components/landingPage/header/Header";
import Footer from "@/components/landingPage/footer/Footer";
import HeroSection from "@/components/landingPage/hero/HeroSection";
import HowItWorks from "@/components/landingPage/HowItWorks";
import FeaturesSection from "@/components/landingPage/FeaturesSection";
import BenefitsSection from "@/components/landingPage/BenefitsSection";
import FinalCTA from "@/components/landingPage/FinalCTA";

export default function Landing() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <HowItWorks />
        <FeaturesSection />
        <BenefitsSection />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}
