import Link from "next/link"
import { barbershopData } from "@/lib/data"
import { Sparkles, Camera, MessageCircle } from "lucide-react"

export function Analyze() {
  return (
    <section id="analiza" className="py-20 md:py-28 px-4 bg-[#0a2347]">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div>
            <div className="inline-flex items-center gap-2 bg-[#4FD1FF]/10 border border-[#4FD1FF]/30 rounded-full px-4 py-2 mb-6">
              <Sparkles className="w-4 h-4 text-[#4FD1FF]" />
              <span className="text-[#4FD1FF] text-sm font-medium">Nueva funcionalidad</span>
            </div>
            
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Analiza tu <span className="text-[#4FD1FF]">Corte Ideal</span>
            </h2>
            
            <p className="text-foreground/60 text-lg mb-8 leading-relaxed">
              No sabes qué corte te queda mejor? Envíanos una foto y nuestros expertos 
              te asesorarán de forma personalizada sobre el estilo que más te favorece 
              según tu tipo de rostro y estilo de vida.
            </p>

            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-4">
                <div className="p-2 bg-[#4FD1FF]/10 rounded-lg">
                  <Camera className="w-5 h-5 text-[#4FD1FF]" />
                </div>
                <div>
                  <h3 className="text-foreground font-semibold mb-1">Envía tu foto</h3>
                  <p className="text-foreground/60 text-sm">Una foto frontal y otra de perfil es suficiente</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="p-2 bg-[#4FD1FF]/10 rounded-lg">
                  <MessageCircle className="w-5 h-5 text-[#4FD1FF]" />
                </div>
                <div>
                  <h3 className="text-foreground font-semibold mb-1">Recibe asesoramiento</h3>
                  <p className="text-foreground/60 text-sm">Nuestros barberos te responderán con recomendaciones personalizadas</p>
                </div>
              </div>
            </div>

            <Link
              href={`https://wa.me/${barbershopData.contact.whatsapp}?text=Hola,%20me%20gustaría%20recibir%20asesoramiento%20sobre%20qué%20corte%20me%20quedaría%20mejor`}
              target="_blank"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-[#4FD1FF] to-[#3BA6E8] text-[#071B3A] px-8 py-4 rounded-full font-semibold text-lg hover:shadow-xl hover:shadow-[#4FD1FF]/30 hover:scale-105 transition-all duration-300"
            >
              <Camera className="w-5 h-5" />
              Analizar mi Corte
            </Link>
          </div>

          {/* Visual */}
          <div className="relative">
            <div className="relative bg-gradient-to-br from-[#071B3A] to-[#0a2347] border border-[#1e3a5f] rounded-3xl p-8 md:p-12">
              {/* Phone mockup */}
              <div className="relative mx-auto w-64 md:w-72">
                <div className="bg-[#1e3a5f] rounded-[3rem] p-3">
                  <div className="bg-[#071B3A] rounded-[2.5rem] overflow-hidden aspect-[9/19]">
                    <div className="h-full flex flex-col items-center justify-center p-6 text-center">
                      <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#4FD1FF]/30 to-[#3BA6E8]/20 flex items-center justify-center mb-4">
                        <Camera className="w-10 h-10 text-[#4FD1FF]" />
                      </div>
                      <p className="text-foreground font-medium mb-2">Sube tu foto</p>
                      <p className="text-foreground/50 text-xs">y descubre tu corte ideal</p>
                    </div>
                  </div>
                </div>
                {/* Notch */}
                <div className="absolute top-5 left-1/2 -translate-x-1/2 w-24 h-6 bg-[#071B3A] rounded-full" />
              </div>

              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-[#4FD1FF]/20 to-transparent rounded-full blur-2xl" />
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-gradient-to-tr from-[#3BA6E8]/20 to-transparent rounded-full blur-2xl" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
