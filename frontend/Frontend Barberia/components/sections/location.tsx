import Link from "next/link"
import { barbershopData } from "@/lib/data"
import { MapPin, Clock, Navigation } from "lucide-react"

export function Location() {
  const today = new Date().getDay()
  const dayNames = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"]
  const todayName = dayNames[today]

  return (
    <section id="ubicacion" className="py-20 md:py-28 px-4 bg-[#0a2347]">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            <span className="text-[#4FD1FF]">Encuéntranos</span>
          </h2>
          <p className="text-foreground/60 text-lg max-w-2xl mx-auto">
            Visítanos en nuestra ubicación o consulta nuestros horarios
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Map */}
          <div className="relative aspect-[4/3] lg:aspect-auto lg:min-h-[400px] rounded-2xl overflow-hidden bg-[#071B3A] border border-[#1e3a5f]">
            <iframe
              src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3037.223073352!2d${barbershopData.location.coordinates.lng}!3d${barbershopData.location.coordinates.lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDDCsDI1JzEyLjAiTiAzwrA0MicwOS4wIlc!5e0!3m2!1ses!2ses!4v1234567890`}
              width="100%"
              height="100%"
              style={{ border: 0, filter: "invert(90%) hue-rotate(180deg)" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Ubicación de Ice Cold Barbershop"
              className="absolute inset-0"
            />
            <div className="absolute inset-0 pointer-events-none border border-[#4FD1FF]/20 rounded-2xl" />
          </div>

          {/* Info */}
          <div className="space-y-6">
            {/* Address Card */}
            <div className="bg-[#071B3A] border border-[#1e3a5f] rounded-2xl p-6">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-[#4FD1FF]/10 rounded-xl">
                  <MapPin className="w-6 h-6 text-[#4FD1FF]" />
                </div>
                <div className="flex-1">
                  <h3 className="text-foreground font-semibold text-lg mb-2">Dirección</h3>
                  <p className="text-foreground/70 mb-4">
                    {barbershopData.location.address}<br />
                    {barbershopData.location.postalCode} {barbershopData.location.city}<br />
                    {barbershopData.location.country}
                  </p>
                  <Link
                    href={barbershopData.location.googleMapsUrl}
                    target="_blank"
                    className="inline-flex items-center gap-2 text-[#4FD1FF] text-sm font-medium hover:underline"
                  >
                    <Navigation className="w-4 h-4" />
                    Cómo llegar
                  </Link>
                </div>
              </div>
            </div>

            {/* Hours Card */}
            <div className="bg-[#071B3A] border border-[#1e3a5f] rounded-2xl p-6">
              <div className="flex items-start gap-4 mb-4">
                <div className="p-3 bg-[#4FD1FF]/10 rounded-xl">
                  <Clock className="w-6 h-6 text-[#4FD1FF]" />
                </div>
                <div>
                  <h3 className="text-foreground font-semibold text-lg">Horarios</h3>
                </div>
              </div>
              
              <div className="space-y-2">
                {barbershopData.hours.map((schedule) => {
                  const isToday = schedule.day === todayName
                  const isClosed = schedule.hours === "Cerrado"
                  
                  return (
                    <div
                      key={schedule.day}
                      className={`flex justify-between items-center py-2 px-3 rounded-lg transition-colors ${
                        isToday ? "bg-[#4FD1FF]/10 border border-[#4FD1FF]/30" : ""
                      }`}
                    >
                      <span className={`text-sm ${isToday ? "text-[#4FD1FF] font-semibold" : "text-foreground/70"}`}>
                        {schedule.day}
                        {isToday && <span className="ml-2 text-xs">(Hoy)</span>}
                      </span>
                      <span className={`text-sm ${
                        isClosed 
                          ? "text-red-400" 
                          : isToday 
                            ? "text-[#4FD1FF] font-semibold" 
                            : "text-foreground"
                      }`}>
                        {schedule.hours}
                      </span>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
