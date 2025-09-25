"use client";

import Link from "next/link";
import { Shield } from "lucide-react";

export default function Header() {

  return (
    <>
      <header className="bg-primary/40  backdrop-blur shadow sticky top-0 z-[5000]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-2">
              <Shield className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold text-foreground">Health Chain</span>
            </Link>

            <div>
                <h1>Patient Dashboard</h1>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
