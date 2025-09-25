"use client";

import React from "react";
import { FiSidebar } from "react-icons/fi";
import HospitalHeader from "@/components/dashboard/hospital/HospitalHeader";

export default function TopBarDashboard({
  onToggleSidebarAction,
}: {
  onToggleSidebarAction: () => void;
}) {
  return (
    <div className="sticky top-0 h-16 z-9999999 w-full col-span-12 shadow flex justify-between items-center bg-white border-lightgrey px-4">
      <button
        onClick={onToggleSidebarAction}
        className="p-2 rounded-full hover:bg-lightgrey/70 transition-colors flex items-center justify-center"
        aria-label="Toggle sidebar"
      >
        <FiSidebar className="size-5 text-text-dark cursor-pointer" />
      </button>

      <HospitalHeader />
    </div>
  );
}
