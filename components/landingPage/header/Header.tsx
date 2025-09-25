"use client";

import Link from "next/link";
import { Shield } from "lucide-react";
import { useState } from "react";
import AuthModal from "@/components/auth/AuthModal";

export default function Header() {
  const [showAuthModal, setShowAuthModal] = useState(false);

  return (
    <>
      <header className="bg-primary/20  backdrop-blur shadow sticky top-0 z-[5000]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-2">
              <Shield className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold text-foreground">Health Chain</span>
            </Link>

            <button
              onClick={() => setShowAuthModal(true)}
              className="bg-primary text-white px-8 py-2 rounded-lg hover:bg-primary/80 transition-colors text-sm font-medium cursor-pointer"
            >
              Login
            </button>
          </div>
        </div>
      </header>

      {showAuthModal && <AuthModal onCloseAction={() => setShowAuthModal(false)} />}
    </>
  );
}
