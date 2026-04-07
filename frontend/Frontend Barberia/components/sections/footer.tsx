import Image from "next/image"

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[radial-gradient(circle_at_top,rgba(79,209,255,0.14),transparent_32%),linear-gradient(180deg,#071b3a_0%,#041228_100%)] px-4 pb-6 pt-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="relative overflow-hidden rounded-[2rem] border border-primary/15 bg-[#06162f]/70 shadow-[0_28px_90px_rgba(2,10,24,0.4)]">
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(79,209,255,0.06),transparent_30%,rgba(2,8,20,0.28))]" />
          <Image
            src="/images/footer-mockup-unique.png"
            alt="Ice Cold Barbershop mockup"
            width={1504}
            height={2770}
            className="relative z-10 mx-auto h-auto w-full max-w-[28rem] object-contain sm:max-w-[34rem] lg:max-w-[38rem]"
            priority={false}
          />
        </div>

        <div className="mt-6 text-center text-base text-white/90 sm:text-lg">
          © 2026 ICE COLD BARBERSHOP. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  )
}
