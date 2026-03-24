"use client"

import { type ReactNode } from "react"
import { cn } from "@/lib/utils"

interface MenuButtonProps {
  icon: ReactNode
  label: string
  onClick?: () => void
  href?: string
  className?: string
}

export function MenuButton({ icon, label, onClick, href, className }: MenuButtonProps) {
  const Component = href ? "a" : "button"
  
  return (
    <Component
      href={href}
      onClick={onClick}
      className={cn(
        "group relative w-full max-w-xs flex items-center gap-4 px-6 py-4 rounded-full",
        "bg-gradient-to-r from-[#4FD1FF] to-[#3BA6E8]",
        "text-[#071B3A] font-semibold text-lg",
        "shadow-lg shadow-[#4FD1FF]/30",
        "transition-all duration-300 ease-out",
        "hover:scale-105 hover:shadow-xl hover:shadow-[#4FD1FF]/40",
        "active:scale-95",
        "focus:outline-none focus:ring-2 focus:ring-[#4FD1FF] focus:ring-offset-2 focus:ring-offset-[#071B3A]",
        className
      )}
    >
      <span className="flex items-center justify-center w-6 h-6 transition-transform duration-300 group-hover:scale-110">
        {icon}
      </span>
      <span className="flex-1 text-center pr-6">{label}</span>
    </Component>
  )
}
