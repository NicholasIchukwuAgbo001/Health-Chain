"use client";

import React from "react";
import SidebarLogo from "./SidebarLogo";
import SidebarNav from "./SidebarNav";
import { motion } from "framer-motion";
import LogoutButton from "./LogoutButton";
import { useRouter } from "next/navigation";

type Props = {
  isOpen?: boolean;
  isCollapsed?: boolean;
  onLinkClick?: () => void;
};

export default function AdvertiserSidebar({
  isOpen,
  isCollapsed = false,
  onLinkClick,
}: Props) {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("advertiserAuth");
    router.push("/");
  };

  return (
    <motion.div
      className={`
        fixed lg:static top-0 left-0 h-screen bg-white shadow-lg z-40
        transform transition-all duration-300
        ${isCollapsed ? "w-20" : "w-52"}
        ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
      `}
      initial={false}
      animate={{ opacity: isOpen || typeof isOpen === "undefined" ? 1 : 0.9 }}
    >
      <div className="flex flex-col justify-between h-full overflow-y-auto scrollbar-hide px-5 pb-8">
        <div>
          <SidebarLogo isCollapsed={isCollapsed} />
          <SidebarNav onLinkClick={onLinkClick} isCollapsed={isCollapsed} />
        </div>

        <div className="flex flex-col items-center mt-10">
          <LogoutButton onLogoutAction={handleLogout} isCollapsed={isCollapsed} />
        </div>
      </div>
    </motion.div>
  );
}
