import { platformData } from "@/lib/data"
import { ScanFace, Sparkles, CalendarCheck, ArrowRight } from "lucide-react"

const icons = {
  scan: ScanFace,
  sparkles: Sparkles,
  calendar: CalendarCheck,
}

export function HowItWorks() {
  return (
    <section id="como-funciona" className="py-20 md:py-28 px-4 bg-[#0a2347]">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Cómo <span className="text-[#4FD1FF]">funciona</span>
          </h2>
          <p className="text-foreground/60 text-lg max-w-2xl mx-auto">
            En 3 simples pasos, tus clientes descubren su corte ideal y reservan contigo
          </p>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-3 gap-8 md:gap-4">
          {platformData.howItWorks.map((step, index) => {
            const Icon = icons[step.icon as keyof typeof icons]
            const isLast = index === platformData.howItWorks.length - 1
            
            return (
              <div key={step.step} className="relative">
                {/* Connector line */}
                {!isLast && (
                  <div className="hidden md:block absolute top-16 left-[60%] w-[80%] h-[2px] bg-gradient-to-r from-[#4FD1FF]/50 to-transparent">
                    <ArrowRight className="absolute -right-2 -top-2 w-5 h-5 text-[#4FD1FF]/50" />
                  </div>
                )}
                
                <div className="relative bg-[#071B3A] border border-[#1e3a5f] rounded-2xl p-8 hover:border-[#4FD1FF]/50 transition-all duration-300 group">
                  {/* Step number */}
                  <div className="absolute -top-4 left-8 bg-gradient-to-r from-[#4FD1FF] to-[#3BA6E8] text-[#071B3A] w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">
                    {step.step}
                  </div>
                  
                  {/* Icon */}
                  <div className="w-16 h-16 bg-[#4FD1FF]/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-[#4FD1FF]/20 transition-colors">
                    <Icon className="w-8 h-8 text-[#4FD1FF]" />
                  </div>
                  
                  {/* Content */}
                  <h3 className="text-xl font-bold text-foreground mb-3">{step.title}</h3>
                  <p className="text-foreground/60 leading-relaxed">{step.description}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
