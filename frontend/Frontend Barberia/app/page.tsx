import { Header } from "@/components/sections/header"
import { Hero } from "@/components/sections/hero"
import { HowItWorks } from "@/components/sections/how-it-works"
import { Benefits } from "@/components/sections/benefits"
import { Technology } from "@/components/sections/technology"
import { FAQ } from "@/components/sections/faq"
import { Vision } from "@/components/sections/vision"
import { Footer } from "@/components/sections/footer"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <Hero />
      <HowItWorks />
      <Benefits />
      <Technology />
      <FAQ />
      <Vision />
      <Footer />
    </main>
  )
}
