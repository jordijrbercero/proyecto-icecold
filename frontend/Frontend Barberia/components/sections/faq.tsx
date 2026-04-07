"use client"

import { useState } from "react"
import { platformData } from "@/lib/data"
import { ChevronDown } from "lucide-react"

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section id="faq" className="section-frame px-4 py-20 md:py-28">
      <div className="absolute inset-0 bg-[linear-gradient(180deg,#123763_0%,#184777_48%,#1d568a_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(79,209,255,0.14),transparent_28%)]" />

      <div className="relative mx-auto max-w-4xl">
        <div className="mb-12 text-center">
          <p className="text-sm uppercase tracking-[0.24em] text-primary/80">Preguntas clave</p>
          <h2 className="mt-3 font-display text-5xl leading-none text-foreground md:text-6xl">
            Lo que una barbería exigente quiere saber antes de entrar.
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-foreground/64">
            Respuestas directas, sin tono corporativo genérico y con foco real en cómo se vive la plataforma dentro del negocio.
          </p>
        </div>

        <div className="space-y-4">
          {platformData.faq.map((item, index) => (
            <div
              key={item.question}
              className="fx-hover-lift overflow-hidden rounded-[1.6rem] border border-primary/14 bg-[linear-gradient(180deg,rgba(31,92,156,0.92),rgba(20,72,128,0.92))] shadow-[0_24px_80px_rgba(24,71,119,0.18)]"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="flex w-full items-center justify-between gap-4 p-6 text-left"
              >
                <span className="text-lg font-semibold text-foreground">{item.question}</span>
                <ChevronDown
                  className={`h-5 w-5 shrink-0 text-primary transition-transform ${openIndex === index ? "rotate-180" : ""}`}
                />
              </button>

              {openIndex === index && (
                <div className="px-6 pb-6">
                  <p className="leading-relaxed text-foreground/64">{item.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
