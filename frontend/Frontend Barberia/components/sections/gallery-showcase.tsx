import Image from "next/image"

const galleryImages = [
  { src: "/images/gallery/modern-mullet.jpeg", alt: "Corte moderno mullet con degradado" },
  { src: "/images/gallery/corte-premium.png", alt: "Corte premium masculino con textura" },
  { src: "/images/gallery/fade-y-textura.png", alt: "Fade con textura y linea marcada" },
  { src: "/images/gallery/warrior-cut.webp", alt: "Corte warrior con volumen y degradado" },
]

export function GalleryShowcase() {
  return (
    <section className="section-frame px-4 py-20 md:py-28">
      <div className="absolute inset-0 bg-[linear-gradient(180deg,#194d81_0%,#143b69_42%,#194d81_100%)]" />
      <div className="absolute right-0 top-0 h-full w-1/3 bg-[radial-gradient(circle_at_top_right,rgba(79,209,255,0.14),transparent_42%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.03),transparent_24%,rgba(255,255,255,0.015)_100%)]" />

      <div className="relative mx-auto max-w-7xl">
        <div className="mb-12 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <p className="text-sm uppercase tracking-[0.24em] text-primary/80">Atmosfera visual</p>
            <h2 className="mt-3 font-display text-5xl leading-none text-foreground md:text-6xl">
              Recomendaciones de cortes
            </h2>
          </div>
          <p className="max-w-xl text-base leading-relaxed text-foreground/64 md:text-lg"></p>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          {galleryImages.map((image, index) => (
            <div key={image.src} className="noir-panel fx-hover-lift overflow-hidden rounded-[2rem]">
              <div className="relative aspect-[4/3] overflow-hidden bg-[#081a35]">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover object-[center_24%] transition-transform duration-700 ease-out hover:scale-105"
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,7,8,0.08),rgba(7,7,8,0.65))]" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
