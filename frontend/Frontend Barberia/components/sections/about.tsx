import Image from "next/image"
import { barbershopData } from "@/lib/data"
import { Check, Award } from "lucide-react"

export function About() {
  return (
    <section id="nosotros" className="py-20 md:py-28 px-4 bg-[#071B3A]">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Sobre <span className="text-[#4FD1FF]">Nosotros</span>
          </h2>
          <p className="text-foreground/60 text-lg max-w-2xl mx-auto">
            {barbershopData.about.title}
          </p>
        </div>

        {/* About Content */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <p className="text-foreground/70 text-lg leading-relaxed mb-8">
              {barbershopData.about.description}
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {barbershopData.about.features.map((feature, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="p-1 bg-[#4FD1FF]/20 rounded-full">
                    <Check className="w-4 h-4 text-[#4FD1FF]" />
                  </div>
                  <span className="text-foreground/80 text-sm">{feature}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="relative">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
              <Image
                src="/images/barbershop-interior.jpg"
                alt="Interior de Ice Cold Barbershop"
                fill
                className="object-cover"
              />
            </div>
            {/* Decorative frame */}
            <div className="absolute -bottom-4 -right-4 w-full h-full border-2 border-[#4FD1FF]/30 rounded-2xl -z-10" />
          </div>
        </div>

        {/* Team */}
        <div>
          <h3 className="text-2xl md:text-3xl font-bold text-foreground text-center mb-12">
            Nuestro <span className="text-[#4FD1FF]">Equipo</span>
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {barbershopData.team.map((member) => (
              <div
                key={member.id}
                className="group bg-[#0a2347] border border-[#1e3a5f] rounded-2xl overflow-hidden hover:border-[#4FD1FF]/50 transition-all duration-300"
              >
                {/* Photo placeholder */}
                <div className="relative aspect-[4/5] bg-gradient-to-br from-[#1e3a5f] to-[#071B3A] overflow-hidden">
                  <Image
                    src={`/images/team/${member.id}.jpg`}
                    alt={member.name}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a2347] via-transparent to-transparent" />
                </div>
                
                <div className="p-6 -mt-12 relative">
                  <div className="flex items-center gap-2 mb-2">
                    <Award className="w-4 h-4 text-[#4FD1FF]" />
                    <span className="text-[#4FD1FF] text-xs font-medium">{member.role}</span>
                  </div>
                  
                  <h4 className="text-xl font-bold text-foreground mb-2">{member.name}</h4>
                  
                  <p className="text-foreground/60 text-sm mb-4 leading-relaxed">
                    {member.bio}
                  </p>
                  
                  <div className="flex flex-wrap gap-2">
                    {member.specialties.map((specialty, index) => (
                      <span
                        key={index}
                        className="text-xs bg-[#1e3a5f] text-foreground/70 px-3 py-1 rounded-full"
                      >
                        {specialty}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
