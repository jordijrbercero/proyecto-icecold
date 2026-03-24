import Image from "next/image"
import Link from "next/link"
import { barbershopData } from "@/lib/data"
import { ChevronDown } from "lucide-react"

export function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-4 pt-20 pb-12 overflow-hidden">
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#071B3A] via-[#0a2347] to-[#071B3A]" />
      
      {/* Subtle ice particle effect */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-[#4FD1FF] rounded-full blur-sm animate-pulse" />
        <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-[#4FD1FF] rounded-full blur-sm animate-pulse delay-300" />
        <div className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-[#4FD1FF] rounded-full blur-sm animate-pulse delay-500" />
        <div className="absolute top-1/2 right-1/4 w-1 h-1 bg-[#4FD1FF] rounded-full blur-sm animate-pulse delay-700" />
      </div>

      <div className="relative z-10 flex flex-col items-center text-center max-w-4xl mx-auto">
        {/* Logo */}
        <div className="mb-6 md:mb-8">
          <Image
            src="/images/logo.png"
            alt={barbershopData.name}
            width={320}
            height={320}
            className="w-64 h-64 md:w-80 md:h-80 object-contain drop-shadow-2xl"
            priority
          />
        </div>

        {/* Tagline */}
        <p className="text-[#4FD1FF] text-lg md:text-xl font-medium mb-4 tracking-wide">
          {barbershopData.slogan}
        </p>

        {/* Description */}
        <p className="text-foreground/70 text-base md:text-lg max-w-2xl mb-8 leading-relaxed">
          {barbershopData.description}
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <Link
            href={`https://wa.me/${barbershopData.contact.whatsapp}?text=Hola,%20me%20gustaría%20reservar%20una%20cita`}
            target="_blank"
            className="flex items-center justify-center gap-2 bg-gradient-to-r from-[#4FD1FF] to-[#3BA6E8] text-[#071B3A] px-8 py-4 rounded-full font-semibold text-lg hover:shadow-xl hover:shadow-[#4FD1FF]/30 hover:scale-105 transition-all duration-300"
          >
            Reserva tu Cita
          </Link>
          <Link
            href="#servicios"
            className="flex items-center justify-center gap-2 border-2 border-[#4FD1FF] text-[#4FD1FF] px-8 py-4 rounded-full font-semibold text-lg hover:bg-[#4FD1FF]/10 transition-all duration-300"
          >
            Ver Servicios
          </Link>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <Link href="#servicios" aria-label="Scroll to services">
          <ChevronDown className="w-8 h-8 text-[#4FD1FF]/60" />
        </Link>
      </div>
    </section>
  )
}
