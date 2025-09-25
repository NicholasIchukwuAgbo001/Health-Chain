"use client";

import { useState } from "react";
import AuthModal from "@/components/auth/AuthModal";
import HeroHeader from "./HeroHeader";
import HeroButtons from "./HeroButtons";
import HeroBenefits from "./HeroBenefits";

export default function HeroSection() {
  const [showAuth, setShowAuth] = useState<null | "hospital" | "patient">(null);

  return (
    <>
      <section className="bg-lightgrey/5 min-h-screen flex items-center py-5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <HeroHeader />
          <HeroButtons
            onHospitalClickAction={() => setShowAuth("hospital")}
            onPatientClickAction={() => setShowAuth("patient")}
          />
          <HeroBenefits />
        </div>
      </section>

      {showAuth && <AuthModal onCloseAction={() => setShowAuth(null)} />}
    </>
  );
}
