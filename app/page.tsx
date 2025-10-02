import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { Overview } from "@/components/overview"
import { Journey } from "@/components/journey"
import { Highlights } from "@/components/highlights"
import { Itinerary } from "@/components/itinerary"
import { Wildlife } from "@/components/wildlife"
import { Ship } from "@/components/ship"
import { Cabins } from "@/components/cabins"
import { CTA } from "@/components/cta"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <>
      <Header />
      <main className="min-h-screen">
        <Hero />
        <Overview />
        <Journey />
        <Highlights />
        <Itinerary />
        <Wildlife />
        <Ship />
        <Cabins />
        <CTA />
        <Footer />
      </main>
    </>
  )
}
