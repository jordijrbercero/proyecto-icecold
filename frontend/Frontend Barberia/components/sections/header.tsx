"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Menu, X } from "lucide-react"

const navLinks = [
  { href: "#como-funciona", label: "Cómo funciona" },
  { href: "#beneficios", label: "Beneficios" },
  { href: "#tecnologia", label: "Tecnología" },
  { href: "#faq", label: "FAQ" },
]

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#071B3A]/95 backdrop-blur-sm border-b border-[#1e3a5f]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/images/logo.png"
              alt="Ice Cold"
              width={64}
              height={64}
              className="w-14 h-14 md:w-30 md:h-30 object-contain"
            />
            <span className="text-foreground font-bold text-lg">
              Ice Cold
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-foreground/80 hover:text-[#4FD1FF] transition-colors text-sm font-medium"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Badge Desktop */}
          <div className="hidden lg:flex items-center">
            <span className="text-[#4FD1FF] text-xs font-medium bg-[#4FD1FF]/10 border border-[#4FD1FF]/30 px-3 py-1.5 rounded-full">
              Próximamente
            </span>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden text-foreground p-2"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="lg:hidden bg-[#0a2347] border-t border-[#1e3a5f]">
          <nav className="flex flex-col px-4 py-4 gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className="text-foreground/80 hover:text-[#4FD1FF] hover:bg-[#1e3a5f]/50 transition-colors py-3 px-4 rounded-lg font-medium"
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-4 px-4">
              <span className="text-[#4FD1FF] text-xs font-medium bg-[#4FD1FF]/10 border border-[#4FD1FF]/30 px-3 py-1.5 rounded-full">
                Próximamente
              </span>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
