"use client";

import HospitalSidebar from "@/components/dashboard/hospital/sidebar/HospitalSidebar";
import { useState, useEffect } from "react";
import TopBarDashboard from "@/components/dashboard/hospital/TopBarDashboard";

export default function AdvertiserClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false); 
  const [isCollapsed, setIsCollapsed] = useState(false); 

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setIsCollapsed(true);
      else setIsCollapsed(false);
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex w-screen text-text-dark min-h-screen relative">
      <HospitalSidebar
        isOpen={isOpen}
        isCollapsed={isCollapsed}
        onLinkClick={() => setIsOpen(false)}
      />

      {isOpen && (
        <div
          className="fixed inset-0 bg-foreground/50 z-30 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <div className="flex-1 h-screen overflow-y-auto bg-background relative z-10">
        <TopBarDashboard
          onToggleSidebarAction={() => {
            if (window.innerWidth < 1024) setIsOpen(!isOpen);
            else setIsCollapsed(!isCollapsed);
          }}
        />
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}
