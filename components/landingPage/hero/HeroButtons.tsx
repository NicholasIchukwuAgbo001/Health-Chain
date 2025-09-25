"use client";

import { Shield, Users } from "lucide-react";

interface HeroButtonsProps {
  onHospitalClickAction: () => void;
  onPatientClickAction: () => void;
}

export default function HeroButtons({
  onHospitalClickAction,
  onPatientClickAction,
}: HeroButtonsProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
      <button
        onClick={onHospitalClickAction}
        className="bg-primary text-white px-8 py-4 rounded-lg hover:bg-primary/80 transition-colors font-semibold flex items-center space-x-2 cursor-pointer"
      >
        <Shield className="h-5 w-5" />
        <span>Hospital Login</span>
      </button>
      <button
        onClick={onPatientClickAction}
        className="bg-success text-white px-8 py-4 rounded-lg hover:bg-success/80 transition-colors font-semibold flex items-center space-x-2 cursor-pointer"
      >
        <Users className="h-5 w-5" />
        <span>Patient Access</span>
      </button>
    </div>
  );
}
