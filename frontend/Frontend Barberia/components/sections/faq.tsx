"use client"

import { useState } from "react"
import { platformData } from "@/lib/data"
import { ChevronDown } from "lucide-react"

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section id="faq" className="py-20 md:py-28 px-4 bg-[#071B3A]">
      <div className="max-w-3xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Preguntas <span className="text-[#4FD1FF]">frecuentes</span>
          </h2>
          <p className="text-foreground/60 text-lg max-w-2xl mx-auto">
            Resolvemos tus dudas sobre la plataforma
          </p>
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {platformData.faq.map((item, index) => (
            <div
              key={index}
              className="bg-[#0a2347] border border-[#1e3a5f] rounded-xl overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-6 text-left"
              >
                <span className="text-foreground font-semibold pr-4">{item.question}</span>
                <ChevronDown
                  className={`w-5 h-5 text-[#4FD1FF] shrink-0 transition-transform ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>
              
              {openIndex === index && (
                <div className="px-6 pb-6">
                  <p className="text-foreground/60 leading-relaxed">{item.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
