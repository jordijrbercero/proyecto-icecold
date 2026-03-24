import Image from "next/image"
import Link from "next/link"
import { platformData } from "@/lib/data"
import { ChevronDown, Sparkles } from "lucide-react"

export function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-4 pt-24 pb-12 overflow-hidden">
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#071B3A] via-[#0a2347] to-[#071B3A]" />
      
      {/* Grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(79,209,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(79,209,255,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />
      
      {/* Glowing orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#4FD1FF]/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#3BA6E8]/10 rounded-full blur-3xl" />

      <div className="relative z-10 flex flex-col items-center text-center max-w-5xl mx-auto">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-[#4FD1FF]/10 border border-[#4FD1FF]/30 rounded-full px-4 py-2 mb-8">
          <Sparkles className="w-4 h-4 text-[#4FD1FF]" />
          <span className="text-[#4FD1FF] text-sm font-medium">En desarrollo</span>
        </div>

        {/* Logo */}
        <div className="mb-6 w-72 h-72 md:w-[416px] md:h-[416px] overflow-visible">
          <Image
            src="/images/logo.png"
            alt={platformData.name}
            width={800} // Aumentado considerablemente para nitidez
            height={800} // Aumentado considerablemente para nitidez
            className="w-72 h-72 md:w-[560px] md:h-[560px] object-contain drop-shadow-2xl scale-125 origin-center"
            priority
          />
        </div>

        {/* Main headline */}
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-tight text-balance">
          La plataforma para barberías que combina{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4FD1FF] to-[#3BA6E8]">
            reservas online y recomendaciones de cortes con IA
          </span>
        </h1>

        {/* Subheadline */}
        <p className="text-foreground/60 text-lg md:text-xl max-w-3xl mb-10 leading-relaxed text-pretty">
          {platformData.description}
        </p>

        {/* CTA Button */}
        <Link
          href="#como-funciona"
          className="flex items-center justify-center gap-2 bg-gradient-to-r from-[#4FD1FF] to-[#3BA6E8] text-[#071B3A] px-8 py-4 rounded-full font-semibold text-lg hover:shadow-xl hover:shadow-[#4FD1FF]/30 hover:scale-105 transition-all duration-300"
        >
          Descubrir cómo funciona
        </Link>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <Link href="#como-funciona" aria-label="Scroll to how it works">
          <ChevronDown className="w-8 h-8 text-[#4FD1FF]/60" />
        </Link>
      </div>
    </section>
  )
}
