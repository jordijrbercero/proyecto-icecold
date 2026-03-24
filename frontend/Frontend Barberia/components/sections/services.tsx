import { barbershopData } from "@/lib/data"
import { Clock, Scissors } from "lucide-react"

export function Services() {
  return (
    <section id="servicios" className="py-20 md:py-28 px-4 bg-[#0a2347]">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Nuestros <span className="text-[#4FD1FF]">Servicios</span>
          </h2>
          <p className="text-foreground/60 text-lg max-w-2xl mx-auto">
            Descubre nuestra carta de servicios con los mejores tratamientos de barbería
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {barbershopData.services.map((service) => (
            <div
              key={service.id}
              className="group bg-[#071B3A] border border-[#1e3a5f] rounded-2xl p-6 hover:border-[#4FD1FF]/50 hover:shadow-lg hover:shadow-[#4FD1FF]/10 transition-all duration-300"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="p-3 bg-gradient-to-br from-[#4FD1FF]/20 to-[#3BA6E8]/10 rounded-xl">
                  <Scissors className="w-6 h-6 text-[#4FD1FF]" />
                </div>
                <span className="text-2xl font-bold text-[#4FD1FF]">
                  {service.price}€
                </span>
              </div>
              
              <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-[#4FD1FF] transition-colors">
                {service.name}
              </h3>
              
              <p className="text-foreground/60 text-sm mb-4 leading-relaxed">
                {service.description}
              </p>
              
              <div className="flex items-center gap-2 text-foreground/50 text-sm">
                <Clock className="w-4 h-4" />
                <span>{service.duration}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
