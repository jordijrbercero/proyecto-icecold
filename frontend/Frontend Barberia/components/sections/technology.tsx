import { platformData } from "@/lib/data"
import { ScanFace, Database, Shield, Cpu, Check } from "lucide-react"

const featureIcons = [ScanFace, Database, Shield, Cpu]

export function Technology() {
  return (
    <section id="tecnologia" className="py-20 md:py-28 px-4 bg-[#0a2347]">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Tecnología de{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4FD1FF] to-[#3BA6E8]">
                reconocimiento facial
              </span>
            </h2>
            
            <p className="text-foreground/60 text-lg mb-8 leading-relaxed">
              {platformData.technology.description}
            </p>

            <div className="space-y-4">
              {platformData.technology.features.map((feature, index) => {
                const Icon = featureIcons[index]
                
                return (
                  <div
                    key={index}
                    className="flex items-start gap-4 p-4 bg-[#071B3A]/50 border border-[#1e3a5f] rounded-xl hover:border-[#4FD1FF]/30 transition-colors"
                  >
                    <div className="shrink-0 p-2 bg-[#4FD1FF]/10 rounded-lg">
                      <Icon className="w-5 h-5 text-[#4FD1FF]" />
                    </div>
                    <div>
                      <h3 className="text-foreground font-semibold mb-1">{feature.title}</h3>
                      <p className="text-foreground/50 text-sm">{feature.description}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Visual */}
          <div className="relative">
            <div className="relative bg-gradient-to-br from-[#071B3A] to-[#0a2347] border border-[#1e3a5f] rounded-3xl p-8 md:p-12">
              {/* Face scan visualization */}
              <div className="relative mx-auto w-64 md:w-80 aspect-square">
                {/* Face outline */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative w-48 h-56 md:w-56 md:h-64">
                    {/* Face shape */}
                    <div className="absolute inset-0 border-2 border-[#4FD1FF]/30 rounded-[50%] rounded-b-[45%]" />
                    
                    {/* Scan lines */}
                    <div className="absolute inset-0 overflow-hidden rounded-[50%] rounded-b-[45%]">
                      <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#4FD1FF] to-transparent animate-pulse top-1/4" />
                      <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#4FD1FF] to-transparent animate-pulse top-1/2 delay-300" />
                      <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#4FD1FF] to-transparent animate-pulse top-3/4 delay-500" />
                    </div>
                    
                    {/* Detection points */}
                    <div className="absolute top-[25%] left-[25%] w-2 h-2 bg-[#4FD1FF] rounded-full animate-ping" />
                    <div className="absolute top-[25%] right-[25%] w-2 h-2 bg-[#4FD1FF] rounded-full animate-ping delay-100" />
                    <div className="absolute top-[45%] left-1/2 -translate-x-1/2 w-2 h-2 bg-[#4FD1FF] rounded-full animate-ping delay-200" />
                    <div className="absolute top-[65%] left-1/2 -translate-x-1/2 w-3 h-1 bg-[#4FD1FF] rounded-full animate-ping delay-300" />
                    <div className="absolute top-[80%] left-[30%] w-2 h-2 bg-[#4FD1FF] rounded-full animate-ping delay-400" />
                    <div className="absolute top-[80%] right-[30%] w-2 h-2 bg-[#4FD1FF] rounded-full animate-ping delay-500" />
                  </div>
                </div>

                {/* Corner brackets */}
                <div className="absolute top-0 left-0 w-12 h-12 border-l-2 border-t-2 border-[#4FD1FF] rounded-tl-lg" />
                <div className="absolute top-0 right-0 w-12 h-12 border-r-2 border-t-2 border-[#4FD1FF] rounded-tr-lg" />
                <div className="absolute bottom-0 left-0 w-12 h-12 border-l-2 border-b-2 border-[#4FD1FF] rounded-bl-lg" />
                <div className="absolute bottom-0 right-0 w-12 h-12 border-r-2 border-b-2 border-[#4FD1FF] rounded-br-lg" />
              </div>

              {/* Analysis output */}
              <div className="mt-8 p-4 bg-[#071B3A] border border-[#1e3a5f] rounded-xl">
                <p className="text-[#4FD1FF] text-xs font-mono mb-2">// Análisis completado</p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-400" />
                    <span className="text-foreground/70 text-sm">Forma de rostro: Ovalado</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-400" />
                    <span className="text-foreground/70 text-sm">Cortes recomendados: 8</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-400" />
                    <span className="text-foreground/70 text-sm">Coincidencia: 94%</span>
                  </div>
                </div>
              </div>

              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-32 h-32 bg-gradient-to-br from-[#4FD1FF]/20 to-transparent rounded-full blur-2xl" />
              <div className="absolute -bottom-4 -left-4 w-40 h-40 bg-gradient-to-tr from-[#3BA6E8]/20 to-transparent rounded-full blur-2xl" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
