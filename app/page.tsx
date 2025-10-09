"use client"

import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { Overview } from "@/components/overview"
import { Journey } from "@/components/journey"
import { CruiseTimeline } from "@/components/cruise-timeline"
import { PremiumCruiseTimeline } from "@/components/premium-cruise-timeline"
import { PremiumCruiseTimelineV3 } from "@/components/premium-cruise-timeline-v3"
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
        <div id="journey">
          <Journey />
        </div>
        {/*<div id="itinerary">*/}
        {/*  <CruiseTimeline />*/}
        {/*</div>*/}
        {/* Premium version of itinerary */}
        <div id="premium-itinerary">
          <PremiumCruiseTimeline />
        </div>


        {/*/!* Premium version 3 - Liquid Morphing *!/*/}
        {/*<div id="premium-itinerary-v3" className="mt-32">*/}
        {/*  <div className="text-center mb-16">*/}
        {/*    <h2 className="text-4xl md:text-6xl font-serif font-light text-[#004155] mb-4">Version 3: Liquid Morphing</h2>*/}
        {/*    <p className="text-lg text-muted-foreground">Organic shapes with fluid animations</p>*/}
        {/*  </div>*/}
        {/*  <PremiumCruiseTimelineV3 />*/}
        {/*</div>*/}

        <Wildlife />
        <div id="ship">
          <Ship />
        </div>
        <div id="cabins">
          <Cabins />
        </div>
        <div id="contact">
          <CTA />
        </div>
        <Footer />
      </main>
    </>
  )
}
