"use client"

import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { Overview } from "@/components/overview"
import { Journey } from "@/components/journey"
import { CruiseTimeline } from "@/components/cruise-timeline"
import { OptimizedCruiseTimeline } from "@/components/optimized-cruise-timeline"
import { PremiumCruiseTimelineV3 } from "@/components/premium-cruise-timeline-v3"
import { Wildlife } from "@/components/wildlife"
import { Ship } from "@/components/ship"
import { Cabins } from "@/components/cabins"
import { CTA } from "@/components/cta"
import { Promotions } from "@/components/promotions"
import { Footer } from "@/components/footer"
import { Awards } from "@/components/awards"
import { Company } from "@/components/company"
import { getCurrentCruiseConfig } from "@/lib/cruise-config"

export default function Home() {
  const cruiseConfig = getCurrentCruiseConfig()

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
          <OptimizedCruiseTimeline />
        </div>

        <Wildlife />
        {/*/!* Premium version 3 - Liquid Morphing *!/*/}
        {/*<div id="premium-itinerary-v3" className="mt-32">*/}
        {/*  <div className="text-center mb-16">*/}
        {/*    <h2 className="text-4xl md:text-6xl font-serif font-light text-[#004155] mb-4">Version 3: Liquid Morphing</h2>*/}
        {/*    <p className="text-lg text-muted-foreground">Organic shapes with fluid animations</p>*/}
        {/*  </div>*/}
        {/*  <PremiumCruiseTimelineV3 />*/}
        {/*</div>*/}

        <Company />

        {/*<div id="awards">*/}
        {/*    <Awards/>*/}
        {/*</div>*/}
        <div id="ship">
          <Ship />
        </div>
        <div id="cabins">
          <Cabins />
        </div>

        {/* Current Offer - Показываем только если promoEnabled = true */}
        {cruiseConfig.promoEnabled && <Promotions />}

        <div id="contact">
          <CTA />
        </div>

        <Footer />
      </main>
    </>
  )
}
