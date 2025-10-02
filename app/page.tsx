import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { Overview } from "@/components/overview"
import { Journey } from "@/components/journey"
import { CruiseTimeline } from "@/components/cruise-timeline"
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
        <CruiseTimeline />
        <Wildlife />
        <Ship />
        <Cabins />
        <CTA />
        <Footer />
      </main>
    </>
  )
}
