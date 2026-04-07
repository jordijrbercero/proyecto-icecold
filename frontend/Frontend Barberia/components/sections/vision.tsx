import Link from "next/link"
import { platformData } from "@/lib/data"
import { ArrowRight, Sparkles } from "lucide-react"

export function Vision() {
  return (
    <section id="vision" className="section-frame px-4 py-20 md:py-28">
      <div className="absolute inset-0 bg-[linear-gradient(180deg,#12305c,#0c2950_48%,#082040)]" />

      <div className="relative mx-auto max-w-5xl">
        <div className="fx-glow overflow-hidden rounded-[2.6rem] border border-primary/18 bg-[linear-gradient(180deg,rgba(18,58,108,0.94),rgba(12,41,80,0.92))] p-8 text-center shadow-[0_24px_70px_rgba(3,11,24,0.22)] md:p-14">
          <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent" />
          <div className="absolute left-[-8%] top-1/2 h-56 w-56 -translate-y-1/2 rounded-full bg-primary/16 blur-3xl" />
          <div className="absolute right-[-8%] top-1/2 h-56 w-56 -translate-y-1/2 rounded-full bg-[#3b78b8]/18 blur-3xl" />

          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/24 bg-primary/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-primary">
              <Sparkles className="h-4 w-4" />
              Posicionamiento de marca
            </div>

            <h2 className="mx-auto mt-6 max-w-4xl font-display text-5xl leading-none text-foreground md:text-6xl">
              {platformData.vision.title}
            </h2>

            <p className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-foreground/66">
              {platformData.vision.description}
            </p>

            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Link
                href={`https://instagram.com/${platformData.contact.instagram}`}
                target="_blank"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-bold uppercase tracking-[0.16em] text-primary-foreground transition-transform hover:-translate-y-0.5"
              >
                Contactar con Ice Cold
                <ArrowRight className="h-4 w-4" />
              </Link>
              <p className="text-sm uppercase tracking-[0.22em] text-foreground/48">@{platformData.contact.instagram}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
