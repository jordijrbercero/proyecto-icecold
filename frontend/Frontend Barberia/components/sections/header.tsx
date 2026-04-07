"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Menu, Scissors, Sparkles, X } from "lucide-react"

const navLinks = [
  { href: "#servicios", label: "Producto" },
  { href: "#como-funciona", label: "Como funciona" },
  { href: "#tecnologia", label: "IA" },
]

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="rounded-[1.75rem] border border-primary/18 bg-[linear-gradient(180deg,rgba(8,20,42,0.88),rgba(7,27,58,0.76))] px-4 py-3 shadow-[0_18px_50px_rgba(3,11,24,0.28)] backdrop-blur-xl sm:px-5">
          <div className="flex items-center justify-between gap-4">
            <Link href="/" className="flex min-w-0 items-center gap-3">
              <div className="relative flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-full border border-primary/28 bg-[#0a2347] shadow-[0_0_0_4px_rgba(79,209,255,0.06)]">
                <div className="absolute inset-0 barber-pole opacity-90" />
                <div className="absolute inset-[3px] rounded-full bg-[#0a2347]" />
                <Image
                  src="/images/logo.png"
                  alt="Ice Cold"
                  width={44}
                  height={44}
                  className="relative z-10 h-9 w-9 object-contain"
                />
              </div>

              <div className="min-w-0">
                <p className="truncate font-display text-2xl leading-none text-white">Ice Cold</p>
                <p className="truncate text-[10px] uppercase tracking-[0.32em] text-foreground/56">Reservas + IA</p>
              </div>
            </Link>

            <nav className="hidden items-center rounded-full border border-white/8 bg-black/18 px-3 py-2 lg:flex">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="rounded-full px-4 py-2 text-sm font-semibold text-foreground/80 transition-all hover:bg-white/5 hover:text-primary"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="hidden items-center gap-3 lg:flex">
              <div className="items-center gap-2 rounded-full border border-primary/16 bg-primary/10 px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-primary xl:inline-flex">
                <Sparkles className="h-3.5 w-3.5" />
                Concurso mode
              </div>
              <Link
                href="https://face-id-barber.vercel.app/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-bold uppercase tracking-[0.15em] text-primary-foreground transition-transform hover:-translate-y-0.5"
              >
                <Scissors className="h-4 w-4" />
                Solicitar demo
              </Link>
            </div>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="rounded-full border border-primary/20 bg-primary/10 p-2.5 text-primary lg:hidden"
              aria-label="Abrir menu"
            >
              {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>

          {isMenuOpen && (
            <div className="mt-4 border-t border-primary/12 pt-4 lg:hidden">
              <nav className="flex flex-col gap-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="rounded-2xl border border-primary/12 bg-white/5 px-4 py-3 text-sm font-semibold text-foreground/84 transition-colors hover:text-primary"
                  >
                    {link.label}
                  </Link>
                ))}
                <Link
                  href="https://face-id-barber.vercel.app/"
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => setIsMenuOpen(false)}
                  className="mt-2 inline-flex items-center justify-center gap-2 rounded-2xl bg-primary px-4 py-3 text-sm font-bold uppercase tracking-[0.15em] text-primary-foreground"
                >
                  <Scissors className="h-4 w-4" />
                  Solicitar demo
                </Link>
              </nav>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
