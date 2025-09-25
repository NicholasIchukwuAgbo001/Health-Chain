"use client";

import React from "react";
import { Gauge, User, FileText, BarChart3 } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import SidebarItem from "./SidebarItemProps";

type NavItem = {
  href: string;
  icon: LucideIcon;
  label: string;
};

const navItems: NavItem[] = [
  { href: "/hospital/dashboard", icon: Gauge, label: "Dashboard" },
  { href: "/hospital/patients", icon: User, label: "Patients" },
  { href: "/hospital/records", icon: FileText, label: "Med-Records" },
  { href: "/hospital/analytics", icon: BarChart3, label: "Analytics" },
];
type SidebarNavProps = {
  isCollapsed?: boolean;
  onLinkClick?: () => void;
};

export default function SidebarNav({ isCollapsed = false, onLinkClick }: SidebarNavProps) {
  return (
    <nav className="mt-4">
      <ul className="flex flex-col gap-4 md:gap-6">
        {navItems.map((item) => (
          <SidebarItem
            key={item.href}
            href={item.href}
            icon={item.icon}
            label={item.label}
            isCollapsed={isCollapsed}
            onClick={onLinkClick}
          />
        ))}
      </ul>
    </nav>
  );
}
