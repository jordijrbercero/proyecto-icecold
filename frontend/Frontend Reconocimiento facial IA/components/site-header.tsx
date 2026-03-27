"use client"

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/70 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <div className="flex items-center gap-3">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 ring-1 ring-primary/25 shadow-[0_0_14px_rgba(34,211,238,0.22)] p-1">
            <img
              src="/images/icecold-logo.png"
              alt="IceCold Barbershop"
              className="h-full w-full object-contain scale-110"
            />
          </div>
          <a
            href="#inicio"
            className="text-lg font-serif font-bold text-foreground tracking-tight hover:text-primary transition-colors"
          >
            IceCold
          </a>
        </div>
        <nav className="hidden md:flex items-center gap-6">
          <a
            href="#inicio"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Inicio
          </a>
          <a
            href="#escaner"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Escáner
          </a>
          <a
            href="#estilos"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Estilos
          </a>
          <a
            href="#resenas"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Reseñas
          </a>
          <a
            href="#reserva"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Reserva
          </a>
        </nav>
      </div>
    </header>
  )
}
