"use client";

import React from "react";
import { LogOut } from "lucide-react";
import { motion } from "framer-motion";

type Props = {
  onLogoutAction: () => void;
  isCollapsed?: boolean;
};

export default function LogoutButton({ onLogoutAction, isCollapsed = false }: Props) {
  return (
    <motion.button
      type="button"
      aria-label="Logout"
      onClick={onLogoutAction}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 300 }}
      className={`flex items-center justify-center bg-black text-white font-medium hover:bg-gray-800 transition duration-300 cursor-pointer h-12 ${
        isCollapsed ? "w-12 rounded-full" : "w-full rounded-xl gap-2 px-6"
      }`}
    >
      <LogOut size={18} />
      {!isCollapsed && <span>Log-Out</span>}
    </motion.button>
  );
}
