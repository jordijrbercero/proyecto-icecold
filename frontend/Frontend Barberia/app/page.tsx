import { Header } from "@/components/sections/header"
import { Hero } from "@/components/sections/hero"
import { SignatureServices } from "@/components/sections/signature-services"
import { HowItWorks } from "@/components/sections/how-it-works"
import { GalleryShowcase } from "@/components/sections/gallery-showcase"
import { AppDownloadBanner } from "@/components/sections/app-download-banner"
import { Technology } from "@/components/sections/technology"
import { FooterClean } from "@/components/sections/footer-clean"
import { Reveal } from "@/components/reveal"

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-background">
      <div className="fx-orb left-[-8rem] top-28 h-72 w-72 bg-primary/12" />
      <div className="fx-orb right-[-6rem] top-[32rem] h-80 w-80 bg-sky-300/10" style={{ animationDelay: "-6s" }} />
      <div className="fx-orb bottom-32 left-[22%] h-64 w-64 bg-cyan-200/8" style={{ animationDelay: "-11s" }} />
      <Header />
      <Reveal>
        <Hero />
      </Reveal>
      <Reveal delay={60}>
        <SignatureServices />
      </Reveal>
      <Reveal delay={90}>
        <HowItWorks />
      </Reveal>
      <Reveal delay={120} className="relative z-10 -mt-2">
        <GalleryShowcase />
      </Reveal>
      <Reveal delay={180}>
        <Technology />
      </Reveal>
      <FooterClean />
      <Reveal delay={210}>
        <AppDownloadBanner />
      </Reveal>
    </main>
  )
}
