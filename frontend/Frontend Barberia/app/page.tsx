import { Header } from "@/components/sections/header"
import { Hero } from "@/components/sections/hero"
import { Services } from "@/components/sections/services"
import { Gallery } from "@/components/sections/gallery"
import { Analyze } from "@/components/sections/analyze"
import { About } from "@/components/sections/about"
import { Location } from "@/components/sections/location"
import { Footer } from "@/components/sections/footer"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <Hero />
      <Services />
      <Gallery />
      <Analyze />
      <About />
      <Location />
      <Footer />
    </main>
  )
}
