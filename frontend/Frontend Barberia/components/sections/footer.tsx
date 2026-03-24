import Image from "next/image"
import Link from "next/link"
import { barbershopData } from "@/lib/data"
import { Phone, MessageCircle, Instagram, Mail, MapPin } from "lucide-react"

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer id="contacto" className="bg-[#071B3A] border-t border-[#1e3a5f]">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-4">
              <Image
                src="/images/logo.png"
                alt={barbershopData.name}
                width={60}
                height={60}
                className="w-14 h-14 object-contain"
              />
              <div>
                <span className="text-foreground font-bold text-lg block">Ice Cold</span>
                <span className="text-[#4FD1FF] text-xs font-medium">Barbershop</span>
              </div>
            </Link>
            <p className="text-foreground/60 text-sm leading-relaxed">
              {barbershopData.description}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-foreground font-semibold mb-4">Enlaces</h4>
            <nav className="space-y-3">
              <Link href="#servicios" className="block text-foreground/60 hover:text-[#4FD1FF] transition-colors text-sm">
                Servicios
              </Link>
              <Link href="#galeria" className="block text-foreground/60 hover:text-[#4FD1FF] transition-colors text-sm">
                Galería
              </Link>
              <Link href="#analiza" className="block text-foreground/60 hover:text-[#4FD1FF] transition-colors text-sm">
                Analiza tu Corte
              </Link>
              <Link href="#nosotros" className="block text-foreground/60 hover:text-[#4FD1FF] transition-colors text-sm">
                Sobre Nosotros
              </Link>
              <Link href="#ubicacion" className="block text-foreground/60 hover:text-[#4FD1FF] transition-colors text-sm">
                Ubicación
              </Link>
            </nav>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-foreground font-semibold mb-4">Contacto</h4>
            <div className="space-y-4">
              <Link
                href={`https://wa.me/${barbershopData.contact.whatsapp}`}
                target="_blank"
                className="flex items-center gap-3 text-foreground/60 hover:text-[#4FD1FF] transition-colors text-sm group"
              >
                <div className="p-2 bg-[#25D366]/10 rounded-lg group-hover:bg-[#25D366]/20 transition-colors">
                  <MessageCircle className="w-4 h-4 text-[#25D366]" />
                </div>
                WhatsApp
              </Link>
              
              <Link
                href={`tel:${barbershopData.contact.phone}`}
                className="flex items-center gap-3 text-foreground/60 hover:text-[#4FD1FF] transition-colors text-sm group"
              >
                <div className="p-2 bg-[#4FD1FF]/10 rounded-lg group-hover:bg-[#4FD1FF]/20 transition-colors">
                  <Phone className="w-4 h-4 text-[#4FD1FF]" />
                </div>
                {barbershopData.contact.phone}
              </Link>
              
              <Link
                href={`https://instagram.com/${barbershopData.contact.instagram}`}
                target="_blank"
                className="flex items-center gap-3 text-foreground/60 hover:text-[#4FD1FF] transition-colors text-sm group"
              >
                <div className="p-2 bg-[#E4405F]/10 rounded-lg group-hover:bg-[#E4405F]/20 transition-colors">
                  <Instagram className="w-4 h-4 text-[#E4405F]" />
                </div>
                @{barbershopData.contact.instagram}
              </Link>
              
              <Link
                href={`mailto:${barbershopData.contact.email}`}
                className="flex items-center gap-3 text-foreground/60 hover:text-[#4FD1FF] transition-colors text-sm group"
              >
                <div className="p-2 bg-[#4FD1FF]/10 rounded-lg group-hover:bg-[#4FD1FF]/20 transition-colors">
                  <Mail className="w-4 h-4 text-[#4FD1FF]" />
                </div>
                {barbershopData.contact.email}
              </Link>
            </div>
          </div>

          {/* Location */}
          <div>
            <h4 className="text-foreground font-semibold mb-4">Ubicación</h4>
            <div className="flex items-start gap-3 text-foreground/60 text-sm">
              <MapPin className="w-4 h-4 mt-0.5 text-[#4FD1FF] shrink-0" />
              <div>
                <p>{barbershopData.location.address}</p>
                <p>{barbershopData.location.postalCode} {barbershopData.location.city}</p>
                <p>{barbershopData.location.country}</p>
              </div>
            </div>
            
            <Link
              href={barbershopData.location.googleMapsUrl}
              target="_blank"
              className="inline-flex items-center gap-2 mt-4 text-[#4FD1FF] text-sm font-medium hover:underline"
            >
              Ver en Google Maps
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-[#1e3a5f]">
        <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-foreground/50 text-sm">
            &copy; {currentYear} {barbershopData.name}. Todos los derechos reservados.
          </p>
          
          {/* Social Icons */}
          <div className="flex items-center gap-4">
            <Link
              href={`https://wa.me/${barbershopData.contact.whatsapp}`}
              target="_blank"
              className="p-2 bg-[#1e3a5f] rounded-full hover:bg-[#25D366]/20 transition-colors"
              aria-label="WhatsApp"
            >
              <MessageCircle className="w-5 h-5 text-[#25D366]" />
            </Link>
            <Link
              href={`https://instagram.com/${barbershopData.contact.instagram}`}
              target="_blank"
              className="p-2 bg-[#1e3a5f] rounded-full hover:bg-[#E4405F]/20 transition-colors"
              aria-label="Instagram"
            >
              <Instagram className="w-5 h-5 text-[#E4405F]" />
            </Link>
            <Link
              href={`tel:${barbershopData.contact.phone}`}
              className="p-2 bg-[#1e3a5f] rounded-full hover:bg-[#4FD1FF]/20 transition-colors"
              aria-label="Teléfono"
            >
              <Phone className="w-5 h-5 text-[#4FD1FF]" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
