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
  loading: () => (
    <div className="w-full h-[50vh] md:h-[70vh] relative overflow-hidden" style={{
      backgroundColor: '#2d3748',
      backgroundImage: `radial-gradient(1px 1px at 20px 30px, white, transparent),
                        radial-gradient(1px 1px at 60px 70px, white, transparent),
                        radial-gradient(1px 1px at 50px 50px, white, transparent),
                        radial-gradient(1px 1px at 130px 80px, white, transparent),
                        radial-gradient(1px 1px at 90px 10px, white, transparent)`,
      backgroundSize: '150px 150px',
      backgroundRepeat: 'repeat'
    }} />
  ),
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
      {/*<main className="min-h-screen">*/}
      {/*  <Hero />*/}
      {/*  <Overview />*/}
      {/*  /!*<div id="map">*!/*/}
      {/*  /!*  {preloadMap && <AntarcticaMap />}*!/*/}
      {/*  /!*</div>*!/*/}
      {/*  <div id="journey">*/}
      {/*    <Journey />*/}
      {/*  </div>*/}
      {/*  <div id="itinerary">*/}
      {/*    <CruiseTimeline />*/}
      {/*  </div>*/}
      {/*  <Wildlife />*/}
      {/*  <div id="ship">*/}
      {/*    <Ship />*/}
      {/*  </div>*/}
      {/*  <div id="cabins">*/}
      {/*    <Cabins />*/}
      {/*  </div>*/}
      {/*  <div id="contact">*/}
      {/*    <CTA />*/}
      {/*  </div>*/}
      {/*  <Footer />*/}
      {/*</main>*/}
    </>
  )
}
