import Image from "next/image"
import Link from "next/link"
import { platformData } from "@/lib/data"
import { Instagram, Mail, Linkedin, Twitter } from "lucide-react"

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-[#071B3A] border-t border-[#1e3a5f]">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-4">
              <Image
                src="/images/logo.png"
                alt={platformData.name}
                width={80}
                height={80}
                className="w-16 h-16 md:w-30 md:h-30 object-contain"
              />
              <div>
                <span className="text-foreground font-bold text-lg block">Ice Cold</span>
                <span className="text-[#4FD1FF] text-xs font-medium">En desarrollo</span>
              </div>
            </Link>
            <p className="text-foreground/60 text-sm leading-relaxed mb-6 max-w-md">
              {platformData.tagline}
            </p>
            
            {/* Social Icons */}
            <div className="flex items-center gap-3">
              <Link
                href={`https://instagram.com/${platformData.contact.instagram}`}
                target="_blank"
                className="p-2 bg-[#1e3a5f] rounded-full hover:bg-[#E4405F]/20 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5 text-[#E4405F]" />
              </Link>
              <Link
                href="#"
                className="p-2 bg-[#1e3a5f] rounded-full hover:bg-[#1DA1F2]/20 transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5 text-[#1DA1F2]" />
              </Link>
              <Link
                href="#"
                className="p-2 bg-[#1e3a5f] rounded-full hover:bg-[#0A66C2]/20 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5 text-[#0A66C2]" />
              </Link>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-foreground font-semibold mb-4">Navegación</h4>
            <nav className="space-y-3">
              <Link href="#como-funciona" className="block text-foreground/60 hover:text-[#4FD1FF] transition-colors text-sm">
                Cómo funciona
              </Link>
              <Link href="#beneficios" className="block text-foreground/60 hover:text-[#4FD1FF] transition-colors text-sm">
                Beneficios
              </Link>
              <Link href="#tecnologia" className="block text-foreground/60 hover:text-[#4FD1FF] transition-colors text-sm">
                Tecnología IA
              </Link>
              <Link href="#faq" className="block text-foreground/60 hover:text-[#4FD1FF] transition-colors text-sm">
                Preguntas frecuentes
              </Link>
            </nav>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-foreground font-semibold mb-4">Contacto</h4>
            <div className="space-y-4">
              <Link
                href={`https://instagram.com/${platformData.contact.instagram}`}
                target="_blank"
                className="flex items-center gap-3 text-foreground/60 hover:text-[#4FD1FF] transition-colors text-sm group"
              >
                <div className="p-2 bg-[#E4405F]/10 rounded-lg group-hover:bg-[#E4405F]/20 transition-colors">
                  <Instagram className="w-4 h-4 text-[#E4405F]" />
                </div>
                @{platformData.contact.instagram}
              </Link>
              
              <Link
                href={`mailto:${platformData.contact.email}`}
                className="flex items-center gap-3 text-foreground/60 hover:text-[#4FD1FF] transition-colors text-sm group"
              >
                <div className="p-2 bg-[#4FD1FF]/10 rounded-lg group-hover:bg-[#4FD1FF]/20 transition-colors">
                  <Mail className="w-4 h-4 text-[#4FD1FF]" />
                </div>
                {platformData.contact.email}
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-[#1e3a5f]">
        <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-foreground/50 text-sm">
            &copy; {currentYear} {platformData.name}. Todos los derechos reservados.
          </p>
          
          <div className="flex items-center gap-6">
            <Link href="#" className="text-foreground/50 hover:text-[#4FD1FF] text-sm transition-colors">
              Privacidad
            </Link>
            <Link href="#" className="text-foreground/50 hover:text-[#4FD1FF] text-sm transition-colors">
              Términos
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
