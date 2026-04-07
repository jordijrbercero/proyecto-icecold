import Image from "next/image"
import Link from "next/link"
import { ArrowRight, ChevronDown, Sparkles } from "lucide-react"

export function Hero() {
  return (
    <section className="section-frame min-h-screen px-4 pb-12 pt-28 md:pb-16 md:pt-32">
      <div className="absolute inset-0">
        <Image
          src="/images/barbershop-interior.jpg"
          alt="Interior de barberia premium"
          fill
          priority
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(6,16,34,0.68)_0%,rgba(7,27,58,0.52)_42%,rgba(7,27,58,0.74)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,16,32,0.22)_0%,rgba(7,27,58,0.58)_100%)]" />
      </div>
      <div className="absolute inset-0 grain-overlay opacity-20" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(79,209,255,0.14),transparent_24%)]" />

      <div className="relative z-10 mx-auto grid min-h-[calc(100vh-8rem)] max-w-7xl items-center gap-10 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="max-w-2xl">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary/25 bg-black/30 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-primary backdrop-blur-sm">
            <Sparkles className="h-3.5 w-3.5" />
            Reservas + IA
          </div>

          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-foreground/72">Software para barberias</p>

          <h1 className="font-display text-5xl leading-[0.95] text-foreground sm:text-6xl md:text-7xl">
            Reservas online con IA para barberias
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-foreground/74 md:text-xl">
            Mas reservas y una experiencia digital simple.
          </p>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <Link
              href="#servicios"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-7 py-4 text-sm font-bold uppercase tracking-[0.15em] text-primary-foreground transition-transform hover:-translate-y-0.5"
            >
              Ver el producto
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="#tecnologia"
              className="inline-flex items-center justify-center rounded-full border border-primary/28 bg-black/28 px-7 py-4 text-sm font-bold uppercase tracking-[0.15em] text-foreground transition-colors hover:border-primary hover:text-primary"
            >
              Como funciona
            </Link>
          </div>
        </div>

        <div className="relative self-center lg:justify-self-end">
          <div className="noir-panel fx-float fx-glow relative overflow-hidden rounded-[2.4rem] p-4 md:p-5">
            <div className="absolute inset-0 bg-[linear-gradient(145deg,rgba(79,209,255,0.14),transparent_45%)]" />
            <div className="relative overflow-hidden rounded-[2rem] border border-primary/14">
              <Image
                src="/images/gallery/6.jpg"
                alt="Experiencia premium de barberia"
                width={900}
                height={1200}
                className="h-[32rem] w-full object-cover md:h-[40rem]"
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.08),rgba(0,0,0,0.72))]" />
            </div>

            <div className="absolute left-6 right-6 top-6 rounded-[1.6rem] border border-primary/18 bg-black/45 p-4 backdrop-blur-sm">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.22em] text-primary/90">Barber profile</p>
                  <p className="mt-2 font-display text-3xl leading-none text-foreground">De la idea a la reserva</p>
                </div>
                <div className="rounded-full bg-primary px-3 py-1 text-xs font-bold uppercase tracking-[0.15em] text-primary-foreground">
                  94% match
                </div>
              </div>
            </div>

            <div className="absolute inset-x-6 bottom-6">
              <div className="noir-panel fx-hover-lift rounded-[1.6rem] p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Producto para barberias</p>
                <p className="mt-3 font-display text-3xl leading-none text-foreground">Agenda online + IA facial</p>
                <p className="mt-3 text-sm leading-relaxed text-foreground/62"></p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-10 mt-8 flex justify-center">
        <Link
          href="#servicios"
          className="rounded-full border border-primary/20 bg-black/35 p-3 text-primary backdrop-blur-sm"
          aria-label="Ver mas"
        >
          <ChevronDown className="h-5 w-5 animate-bounce" />
        </Link>
      </div>
    </section>
  )
}
