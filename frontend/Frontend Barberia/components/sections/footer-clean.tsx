import Image from "next/image"

export function FooterClean() {
  return (
    <footer className="relative w-full overflow-hidden bg-[#071b3a]">
      <div className="relative aspect-[2624/1451] w-full overflow-hidden">
        <Image
          src="/app-download-banner.png"
          alt=""
          fill
          sizes="100vw"
          aria-hidden="true"
          className="object-cover object-center opacity-85"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(6,18,39,0.28),rgba(6,18,39,0.12),rgba(6,18,39,0.24))]" />
        <Image
          src="/rri.png"
          alt="Ice Cold Barbershop footer"
          fill
          sizes="100vw"
          className="object-cover object-top"
        />
      </div>
    </footer>
  )
}
