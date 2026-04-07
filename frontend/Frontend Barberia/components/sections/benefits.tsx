import { platformData } from "@/lib/data"
import { Smile, Star, Target, TrendingUp } from "lucide-react"

const icons = {
  trending: TrendingUp,
  smile: Smile,
  star: Star,
  target: Target,
}

export function Benefits() {
  return (
    <section id="beneficios" className="section-frame px-4 py-20 md:py-28">
      <div className="absolute inset-0 bg-[linear-gradient(180deg,#133a67_0%,#1a4a7d_48%,#225b92_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(79,209,255,0.14),transparent_26%)]" />

      <div className="relative mx-auto max-w-7xl">
        <div className="mb-12 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <p className="text-sm uppercase tracking-[0.24em] text-primary/80">Por qué destaca</p>
            <h2 className="mt-3 font-display text-5xl leading-none text-foreground md:text-6xl">
              Una empresa tecnológica que entiende el negocio de la barbería.
            </h2>
          </div>
          <p className="max-w-xl text-base leading-relaxed text-foreground/64 md:text-lg">
            La web debe dejar claro que Ice Cold vende un servicio digital a barberías, pero usando un lenguaje visual que sí conecta con su sector.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {platformData.benefits.map((benefit, index) => {
            const Icon = icons[benefit.icon as keyof typeof icons]

            return (
              <div
                key={index}
                className="fx-hover-lift rounded-[2rem] border border-primary/14 bg-[linear-gradient(180deg,rgba(31,92,156,0.92),rgba(20,72,128,0.92))] p-8 shadow-[0_24px_80px_rgba(24,71,119,0.18)]"
              >
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-[1.15rem] border border-primary/22 bg-[rgba(79,209,255,0.10)]">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-display text-3xl leading-none text-foreground">{benefit.title}</h3>
                <p className="mt-4 text-base leading-relaxed text-foreground/64">{benefit.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
