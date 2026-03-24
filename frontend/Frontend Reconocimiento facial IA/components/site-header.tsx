"use client"

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/70 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <div className="flex items-center gap-3">
          <div className="flex h-15 w-15 items-center justify-center rounded-2xl bg-primary/15 text-primary shadow-[0_0_4px_rgba(76,201,255,0.2)] overflow-hidden translate-y-1">
            <img
              src="/images/icecold-logo.png"
              alt="IceCold Barbershop"
              className="h-35 w-35 object-contain"
            />
          </div>
          <span className="text-lg font-serif font-bold text-foreground tracking-tight">
            IceCold
          </span>
        </div>
        <nav className="hidden md:flex items-center gap-6">
          <span className="text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
            Inicio
          </span>
          <span className="text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
            Como Funciona
          </span>
          <span className="text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
            Estilos
          </span>
        </nav>
      </div>
    </header>
  )
}
