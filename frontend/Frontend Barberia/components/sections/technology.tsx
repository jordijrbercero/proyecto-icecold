import { platformData } from "@/lib/data"
import { Check, Cpu, Database, ScanFace, Shield } from "lucide-react"

const featureIcons = [ScanFace, Database, Shield, Cpu]

export function Technology() {
  return (
    <section id="tecnologia" className="section-frame px-4 py-20 md:py-28">
      <div className="absolute inset-0 bg-[linear-gradient(180deg,#194d81_0%,#143b69_30%,#1b4f82_62%,#235c95_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(79,209,255,0.16),transparent_28%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_35%,rgba(79,209,255,0.14),transparent_24%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(255,255,255,0.04),transparent_32%,transparent_68%,rgba(255,255,255,0.02))]" />

      <div className="relative mx-auto grid max-w-7xl items-stretch gap-10 lg:grid-cols-[0.88fr_1.12fr]">
        <div className="h-full rounded-[2.5rem] border border-primary/16 bg-[linear-gradient(180deg,rgba(36,97,164,0.9),rgba(20,72,128,0.94))] p-7 shadow-[0_28px_100px_rgba(22,65,110,0.24)] backdrop-blur-sm md:p-9">
          <p className="text-sm uppercase tracking-[0.26em] text-cyan-100/90">Motor IA</p>
          <h2 className="mt-4 max-w-xl font-display text-5xl leading-[0.93] text-white md:text-6xl">
            IA para reservas, sin complicar.
          </h2>
          <p className="mt-5 max-w-lg text-lg leading-relaxed text-white/74">{platformData.technology.description}</p>

          <div className="mt-8 grid gap-4">
            {platformData.technology.features.slice(0, 3).map((feature, index) => {
              const Icon = featureIcons[index]

              return (
                <div
                  key={feature.title}
                  className="fx-hover-lift rounded-[1.5rem] border border-white/14 bg-[linear-gradient(180deg,rgba(10,47,89,0.28),rgba(8,37,72,0.38))] p-4 backdrop-blur-sm"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-cyan-200/18 bg-cyan-200/10">
                      <Icon className="h-5 w-5 text-cyan-100" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white">{feature.title}</h3>
                      <p className="mt-1 text-sm leading-relaxed text-white/66">{feature.description}</p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        <div className="relative h-full">
          <div className="absolute -left-10 top-10 h-40 w-40 rounded-full bg-cyan-200/10 blur-3xl" />
          <div className="absolute -right-6 bottom-6 h-48 w-48 rounded-full bg-cyan-200/10 blur-3xl" />

          <div className="relative h-full overflow-hidden rounded-[2.7rem] border border-primary/16 bg-[linear-gradient(180deg,rgba(39,103,170,0.92),rgba(22,75,131,0.95))] p-6 shadow-[0_30px_100px_rgba(20,61,103,0.24)] backdrop-blur-sm md:p-8">
            <div className="flex h-full flex-col justify-center gap-8 rounded-[2rem] border border-primary/12 bg-[linear-gradient(180deg,rgba(15,52,93,0.94),rgba(11,40,74,0.96))] p-5 pt-9 pb-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.24em] text-cyan-100/86">Dashboard IA</p>
                  <p className="mt-2 font-display text-4xl leading-none text-white">Style Match</p>
                </div>
                <div className="rounded-full border border-cyan-200/20 bg-cyan-200/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] text-cyan-100">
                  Live AI
                </div>
              </div>

              <div className="grid flex-1 gap-4 md:grid-cols-[0.9fr_1.1fr]">
                <div className="fx-hover-lift rounded-[1.7rem] border border-white/12 bg-[linear-gradient(180deg,rgba(16,54,96,0.72),rgba(13,42,78,0.82))] p-5">
                  <p className="text-xs uppercase tracking-[0.22em] text-white/60">Lectura facial</p>
                  <div className="relative mx-auto mt-5 h-56 w-44 rounded-[48%] border-2 border-cyan-200/34">
                    <div className="absolute inset-x-5 top-1/2 h-px -translate-y-1/2 bg-gradient-to-r from-transparent via-cyan-200 to-transparent" />
                    <div className="absolute inset-y-5 left-1/2 w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-cyan-200 to-transparent" />
                    <div className="absolute left-[24%] top-[32%] h-2 w-2 rounded-full bg-cyan-200" />
                    <div className="absolute right-[24%] top-[32%] h-2 w-2 rounded-full bg-cyan-200" />
                    <div className="absolute left-1/2 top-[48%] h-2 w-2 -translate-x-1/2 rounded-full bg-cyan-200" />
                    <div className="absolute bottom-[18%] left-1/2 h-px w-16 -translate-x-1/2 rounded-full bg-cyan-200" />
                  </div>
                </div>

                <div className="flex h-full flex-col gap-4">
                  <div className="fx-hover-lift rounded-[1.7rem] border border-white/12 bg-[linear-gradient(180deg,rgba(16,54,96,0.72),rgba(13,42,78,0.82))] p-5">
                    <p className="text-xs uppercase tracking-[0.22em] text-cyan-100/82">Recomendacion</p>
                    <p className="mt-3 max-w-xs font-display text-3xl leading-[0.95] text-white">
                      Sugerencia antes de reservar
                    </p>
                    <p className="mt-3 text-sm leading-relaxed text-white/66">Contexto util antes de la cita.</p>
                  </div>

                  <div className="fx-hover-lift flex-1 rounded-[1.7rem] border border-white/12 bg-[linear-gradient(180deg,rgba(16,54,96,0.72),rgba(13,42,78,0.82))] p-5">
                    <p className="mb-4 text-xs uppercase tracking-[0.22em] text-cyan-100/82">Checklist</p>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 text-sm text-white/72">
                        <Check className="h-4 w-4 text-cyan-100" />
                        Rostro detectado
                      </div>
                      <div className="flex items-center gap-3 text-sm text-white/72">
                        <Check className="h-4 w-4 text-cyan-100" />
                        Recomendacion lista
                      </div>
                      <div className="flex items-center gap-3 text-sm text-white/72">
                        <Check className="h-4 w-4 text-cyan-100" />
                        Reserva conectada
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
