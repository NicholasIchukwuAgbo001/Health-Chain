"use client";

import Link from "next/link";

interface SidebarLogoProps {
  isCollapsed?: boolean;
}

export default function SidebarLogo({ isCollapsed = false }: SidebarLogoProps) {
  if (isCollapsed) return null;

  return (
    <div className="p-6 flex justify-start transition-all duration-300">
      <Link href="/advertiser/dashboard" className="block">
        <h1 className="text-xl font-bold text-black">HealthChain</h1>
      </Link>
    </div>
  );
}
