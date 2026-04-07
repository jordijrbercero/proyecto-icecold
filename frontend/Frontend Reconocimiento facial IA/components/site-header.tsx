"use client"

import { useEffect, useRef, useState } from "react"
import { Menu, X } from "lucide-react"

export function SiteHeader() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement | null>(null)

  const navItems = [
    { href: "#inicio", label: "Inicio" },
    { href: "#escaner", label: "Escáner" },
    { href: "#estilos", label: "Estilos" },
    { href: "#resenas", label: "Reseñas" },
    { href: "#reserva", label: "Reserva" },
  ]

  useEffect(() => {
    function handlePointerDown(event: MouseEvent | TouchEvent) {
      if (!isMobileMenuOpen) return
      const target = event.target as Node | null
      if (menuRef.current && target && !menuRef.current.contains(target)) {
        setIsMobileMenuOpen(false)
      }
    }

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsMobileMenuOpen(false)
      }
    }

    document.addEventListener("mousedown", handlePointerDown)
    document.addEventListener("touchstart", handlePointerDown)
    document.addEventListener("keydown", handleEscape)

    return () => {
      document.removeEventListener("mousedown", handlePointerDown)
      document.removeEventListener("touchstart", handlePointerDown)
      document.removeEventListener("keydown", handleEscape)
    }
  }, [isMobileMenuOpen])

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/70 backdrop-blur-xl">
      <div className="relative mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <div className="flex items-center gap-3">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 ring-1 ring-primary/25 shadow-[0_0_14px_rgba(34,211,238,0.22)] p-1">
            <img
              src="/images/icecold-logo.png"
              alt="IceCold Barbershop"
              className="h-full w-full object-contain scale-110"
            />
          </div>
          <a
            href="#inicio"
            className="text-lg font-serif font-bold text-foreground tracking-tight hover:text-primary transition-colors"
          >
            IceCold
          </a>
        </div>

        <nav className="hidden items-center gap-6 md:flex">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div ref={menuRef} className="md:hidden">
          <button
            type="button"
            aria-label={isMobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={isMobileMenuOpen}
            className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-primary/25 bg-primary/10 text-primary transition-colors hover:bg-primary/20"
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>

          {isMobileMenuOpen && (
            <nav className="absolute right-6 top-[calc(100%-2px)] z-50 w-52 rounded-xl border border-border bg-background/95 p-2 shadow-xl backdrop-blur-xl md:hidden">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="block rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-primary/10 hover:text-foreground"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
            </nav>
          )}
        </div>
      </div>
    </header>
  )
}
