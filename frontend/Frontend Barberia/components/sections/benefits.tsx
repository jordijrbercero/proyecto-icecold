import { platformData } from "@/lib/data"
import { TrendingUp, Smile, Star, Target } from "lucide-react"

const icons = {
  trending: TrendingUp,
  smile: Smile,
  star: Star,
  target: Target,
}

export function Benefits() {
  return (
    <section id="beneficios" className="py-20 md:py-28 px-4 bg-[#071B3A]">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 text-balance">
            Beneficios para tu <span className="text-[#4FD1FF]">barbería</span>
          </h2>
          <p className="text-foreground/60 text-lg max-w-2xl mx-auto text-pretty">
            Una plataforma diseñada para digitalizar tu negocio y ofrecer una experiencia única a tus clientes
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {platformData.benefits.map((benefit, index) => {
            const Icon = icons[benefit.icon as keyof typeof icons]
            
            return (
              <div
                key={index}
                className="group relative bg-[#0a2347] border border-[#1e3a5f] rounded-2xl p-8 hover:border-[#4FD1FF]/50 transition-all duration-300"
              >
                <div className="flex gap-6">
                  {/* Icon */}
                  <div className="shrink-0 w-14 h-14 bg-[#4FD1FF]/10 rounded-xl flex items-center justify-center group-hover:bg-[#4FD1FF]/20 transition-colors">
                    <Icon className="w-7 h-7 text-[#4FD1FF]" />
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-foreground mb-2">{benefit.title}</h3>
                    <p className="text-foreground/60 leading-relaxed">{benefit.description}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
