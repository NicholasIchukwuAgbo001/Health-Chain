'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import type { LucideIcon } from 'lucide-react'

interface SidebarItemProps {
  href: string
  icon: LucideIcon
  label: string
  isCollapsed?: boolean
  onClick?: () => void
}

const iconColors: Record<string, string> = {
  '/hospital/dashboard': 'text-blue-500',
  '/hospital/patients': 'text-purple-500',
  '/hospital/records': 'text-green-500',
  '/hospital/analytics': 'text-pink-500',
}

export default function SidebarItem({
  href,
  icon: Icon,
  label,
  isCollapsed = false,
  onClick,
}: SidebarItemProps) {
  const pathname = usePathname()
  const isActive = pathname === href

  const colorClass = iconColors[href] || 'text-secondary'

  return (
    <li>
      <Link
        href={href}
        onClick={onClick}
        className={`flex items-center transition-colors rounded-r-full font-semibold 
          ${isCollapsed ? 'justify-center p-2' : 'gap-3 p-2 pr-6'} 
          ${isActive ? 'bg-blue-400  text-black' : 'hover:bg-gray-200'}
        `}
      >
        <Icon
          size={25}
          className={`${isActive ? 'text-black' : colorClass}`}
        />
        {!isCollapsed && <span>{label}</span>}
      </Link>
    </li>
  )
}
