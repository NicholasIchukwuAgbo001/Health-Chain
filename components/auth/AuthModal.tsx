"use client";

import React, { useState, useEffect } from "react";
import AuthHeader from "@/components/auth/AuthHeader";
import AuthTypeSelector from "@/components/auth/AuthTypeSelector";
import HospitalLoginForm from "@/components/auth/HospitalLoginForm";
import PatientLoginForm from "@/components/auth/PatientLoginForm";

interface AuthModalProps {
  onCloseAction: () => void;
}

export default function AuthModal({ onCloseAction }: AuthModalProps) {
  const [authType, setAuthType] = useState<"hospital" | "patient">("hospital");

  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  return (
    <div className="fixed inset-0 bg-foreground/40 flex items-center justify-center p-4 z-99999">
      <div className="bg-white rounded-xl shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <AuthHeader onClose={onCloseAction} />
          <AuthTypeSelector authType={authType} onChange={setAuthType} />
          {authType === "hospital" && <HospitalLoginForm />}
          {authType === "patient" && <PatientLoginForm />}
        </div>
      </div>
    </div>
  );
}
