import Image from "next/image"
import { platformData } from "@/lib/data"
import { ArrowUpRight, Scissors, Sparkles } from "lucide-react"

const serviceHighlights = platformData.services.flatMap((group) =>
  group.items.map((item) => ({
    ...item,
    category: group.category,
  })),
)

const balancedHighlights =
  serviceHighlights.length % 2 === 0
    ? serviceHighlights
    : [
        ...serviceHighlights,
        {
          name: "",
          detail: "",
          price: "",
          category: "",
          isSpacer: true,
        },
      ]

export function SignatureServices() {
  return (
    <section id="servicios" className="section-frame px-4 pb-8 pt-16 md:pb-10 md:pt-20">
      <div className="absolute inset-0 bg-[linear-gradient(180deg,#0b2649_0%,#123863_52%,#1a4e82_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(79,209,255,0.16),transparent_26%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(59,166,232,0.14),transparent_30%)]" />
      <div className="absolute inset-0 grain-overlay opacity-15" />

      <div className="relative mx-auto grid max-w-7xl items-start gap-12 lg:grid-cols-[0.88fr_1.12fr]">
        <div className="space-y-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-[rgba(79,209,255,0.10)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-primary">
            <Scissors className="h-3.5 w-3.5" />
            Producto Ice Cold
          </div>

          <div className="space-y-4">
            <div className="inline-block">
              <h2 className="max-w-2xl font-display text-5xl leading-[0.95] text-foreground md:text-6xl">
                Software para barberias.
              </h2>
            </div>

            <p className="max-w-lg text-base leading-relaxed text-foreground/64 md:text-lg">
              Reservas + IA en una sola experiencia.
            </p>
          </div>

          <div className="fx-hover-lift relative overflow-hidden rounded-[2rem] border border-primary/14 bg-[linear-gradient(180deg,rgba(31,92,156,0.9),rgba(18,63,118,0.94))] p-6 shadow-[0_24px_80px_rgba(24,71,119,0.18)] md:p-7">
            <div className="absolute left-0 top-0 h-full w-4 barber-pole" />
            <div className="absolute inset-y-0 right-0 w-40 bg-[radial-gradient(circle_at_center,rgba(79,209,255,0.22),transparent_70%)]" />

            <div className="relative ml-5">
              <div className="flex items-center gap-2 text-primary">
                <Sparkles className="h-4 w-4" />
                <p className="text-xs uppercase tracking-[0.24em] text-primary/85">Senal visual</p>
              </div>

              <p className="mt-4 max-w-md font-display text-3xl leading-none text-foreground">
                Tecnologia con lenguaje de barberia.
              </p>

              <p className="mt-3 max-w-md text-sm leading-relaxed text-foreground/68"></p>
            </div>
          </div>

          <div className="relative hidden max-w-sm pt-0 lg:block">
            <div className="absolute inset-x-2 bottom-8 h-20 rounded-full bg-primary/20 blur-3xl" />
            <Image
              src="/images/Captura_de_pantalla_2026-03-16_132739-removebg-preview.png"
              alt="Elemento visual inspirado en barber pole"
              width={900}
              height={900}
              className="fx-float relative z-10 w-full max-w-[23rem] -translate-y-16 translate-x-12 rotate-[-7deg] object-contain opacity-95 drop-shadow-[0_24px_60px_rgba(24,71,119,0.28)]"
            />
          </div>
        </div>

        <div className="relative overflow-hidden rounded-[2.5rem] border border-primary/14 bg-[linear-gradient(180deg,rgba(34,97,164,0.94),rgba(20,72,128,0.96))] p-6 shadow-[0_30px_100px_rgba(24,71,119,0.22)] md:p-8 lg:p-10">
          <div className="absolute right-0 top-0 h-52 w-52 rounded-full bg-primary/10 blur-3xl" />

          <div className="relative">
            <div className="flex flex-col gap-4 pb-6 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.24em] text-primary/80">Producto y funciones</p>
                <h3 className="mt-3 max-w-xl font-display text-5xl leading-[0.95] text-foreground md:text-6xl">
                  Que incluye Ice Cold
                </h3>
              </div>

              <p className="max-w-xs text-sm leading-relaxed text-foreground/54"></p>
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-2">
              {balancedHighlights.map((item) => (
                <article
                  key={`${item.category}-${item.name}-${item.price}`}
                  className={`group fx-hover-lift rounded-[1.8rem] border border-primary/12 bg-[linear-gradient(180deg,rgba(121,203,255,0.10),rgba(255,255,255,0.04))] p-5 transition-transform duration-300 hover:-translate-y-1 ${
                    "isSpacer" in item ? "invisible pointer-events-none" : ""
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <span className="rounded-full border border-primary/18 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-primary/82">
                      {item.category}
                    </span>
                    <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-[0.08em] text-foreground/82">
                      <span>{item.price}</span>
                      <ArrowUpRight className="h-4 w-4 text-primary transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </div>
                  </div>

                  <p className="mt-5 text-2xl font-bold uppercase leading-tight text-foreground">{item.name}</p>
                  <p className="mt-3 max-w-sm text-sm leading-relaxed text-foreground/60">{item.detail}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
