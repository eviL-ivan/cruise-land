"use client"

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
import dynamic from "next/dynamic"
import { useEffect, useState } from "react"

// Динамический импорт карты с preload
const AntarcticaMap = dynamic(() => import("@/components/AntarcticaMap/AntarcticaMap"), {
  loading: () => <div className="w-full h-[50svh] md:h-[70svh] bg-gray-50" />,
  ssr: false
})

export default function Home() {
  const [preloadMap, setPreloadMap] = useState(false)

  useEffect(() => {
    // Preload карты через 20мс после загрузки страницы
    const timer = setTimeout(() => {
      setPreloadMap(true)
    }, 20)

    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      <Header />
      <main className="min-h-screen">
        <Hero />
        <Overview />
        {preloadMap && <AntarcticaMap />}
        <div id="journey">
          <Journey />
        </div>
        {/*<div id="itinerary">*/}
        {/*  <CruiseTimeline />*/}
        {/*</div>*/}
        {/*<Wildlife />*/}
        {/*<div id="ship">*/}
        {/*  <Ship />*/}
        {/*</div>*/}
        {/*<div id="cabins">*/}
        {/*  <Cabins />*/}
        {/*</div>*/}
        {/*<div id="contact">*/}
        {/*  <CTA />*/}
        {/*</div>*/}
        <Footer />
      </main>
    </>
  )
}
