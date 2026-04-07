import Image from "next/image"

export function AppDownloadBanner() {
  return (
    <section className="section-frame bg-[#071b3a] px-4 pb-10 pt-8 md:px-6 md:pb-14 md:pt-10">
      <div className="mx-auto max-w-[1100px] overflow-hidden rounded-[2rem] bg-[#091a35]">
        <div className="relative h-[10rem] w-full sm:h-[12rem] md:h-[14rem] lg:h-[16rem]">
          <Image
            src="/app-download-banner.png"
            alt="Descarga la app Ice Cold en App Store y Google Play"
            fill
            sizes="100vw"
            className="object-cover object-center"
          />
        </div>
      </div>
    </section>
  )
}
