import { platformData } from "@/lib/data"
import { Sparkles } from "lucide-react"
import Link from "next/link"

export function Vision() {
  return (
    <section className="py-20 md:py-28 px-4 bg-[#0a2347]">
      <div className="max-w-4xl mx-auto">
        <div className="relative bg-gradient-to-br from-[#071B3A] to-[#0d2a52] border border-[#1e3a5f] rounded-3xl p-8 md:p-16 text-center overflow-hidden">
          {/* Background decoration */}
          <div className="absolute top-0 left-0 w-64 h-64 bg-[#4FD1FF]/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-[#3BA6E8]/10 rounded-full blur-3xl" />
          
          <div className="relative z-10">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-[#4FD1FF]/10 border border-[#4FD1FF]/30 rounded-full px-4 py-2 mb-6">
              <Sparkles className="w-4 h-4 text-[#4FD1FF]" />
              <span className="text-[#4FD1FF] text-sm font-medium">Nuestra visión</span>
            </div>
            
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 text-balance">
              {platformData.vision.title}
            </h2>
            
            <p className="text-foreground/60 text-lg mb-8 max-w-2xl mx-auto text-pretty leading-relaxed">
              {platformData.vision.description}
            </p>

            {/* Follow us */}
            <div className="flex flex-col items-center gap-4">
              <p className="text-foreground/50 text-sm">
                Síguenos para estar al tanto del lanzamiento
              </p>
              <Link
                href={`https://instagram.com/${platformData.contact.instagram}`}
                target="_blank"
                className="inline-flex items-center justify-center gap-2 border-2 border-[#4FD1FF] text-[#4FD1FF] px-6 py-3 rounded-full font-semibold hover:bg-[#4FD1FF]/10 transition-all duration-300"
              >
                @{platformData.contact.instagram}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
