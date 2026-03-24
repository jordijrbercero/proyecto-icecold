"use client"

import { User } from "lucide-react"

interface ProfileIconProps {
  onClick?: () => void
}

export function ProfileIcon({ onClick }: ProfileIconProps) {
  return (
    <button
      onClick={onClick}
      className="w-12 h-12 rounded-full border-2 border-foreground/30 flex items-center justify-center transition-all duration-300 hover:border-primary hover:bg-primary/10 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background"
      aria-label="Perfil de usuario"
    >
      <User className="w-6 h-6 text-foreground/70" />
    </button>
  )
}
