"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { barbershopData } from "@/lib/data"

const navLinks = [
  { href: "#servicios", label: "Servicios" },
  { href: "#galeria", label: "Galería" },
  { href: "#analiza", label: "Analiza tu Corte" },
  { href: "#nosotros", label: "Nosotros" },
  { href: "#ubicacion", label: "Ubicación" },
  { href: "#contacto", label: "Contacto" },
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
              alt={barbershopData.name}
              width={50}
              height={50}
              className="w-10 h-10 md:w-12 md:h-12 object-contain"
            />
            <span className="hidden sm:block text-foreground font-semibold text-lg">
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

          {/* CTA Button Desktop */}
          <Link
            href={`https://wa.me/${barbershopData.contact.whatsapp}`}
            target="_blank"
            className="hidden lg:flex items-center gap-2 bg-gradient-to-r from-[#4FD1FF] to-[#3BA6E8] text-[#071B3A] px-5 py-2.5 rounded-full font-semibold text-sm hover:shadow-lg hover:shadow-[#4FD1FF]/25 transition-all"
          >
            Reservar Cita
          </Link>

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
            <Link
              href={`https://wa.me/${barbershopData.contact.whatsapp}`}
              target="_blank"
              onClick={() => setIsMenuOpen(false)}
              className="mt-4 flex items-center justify-center gap-2 bg-gradient-to-r from-[#4FD1FF] to-[#3BA6E8] text-[#071B3A] px-5 py-3 rounded-full font-semibold"
            >
              Reservar Cita
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}
