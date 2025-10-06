'use client'

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ChevronDown, Play, X } from "lucide-react"
import { useLanguage } from "@/lib/language-context"

export function Hero() {
  const { content } = useLanguage()
  const [showVideoModal, setShowVideoModal] = useState(false)

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Video */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          poster="/bg.webp"
          className="w-full h-full object-cover"
        >
          <source src={content.hero.video} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-primary/60 via-primary/40 to-primary/80" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center text-white space-y-4">
        <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-light text-balance leading-tight text-white">
          <span className="inline-block bg-primary/10 backdrop-blur-sm px-6 py-3 rounded-xl">
            {content.hero.title}
          </span>
          <br />
          <span className="inline-block bg-secondary/10 backdrop-blur-sm px-6 py-3 rounded-xl mt-3">
            {content.hero.titleAccent}
          </span>
        </h1>
        <div className="inline-block bg-primary/10 backdrop-blur-sm px-6 py-3 rounded-xl mt-4">
          <p className="text-lg md:text-xl text-white/90 max-w-3xl text-pretty">
            {content.hero.subtitle}
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
          <button className="text-base px-8 py-3 rounded-md text-white border-2 border-white transition-all duration-300 font-semibold uppercase" style={{backgroundColor: '#004657'}}>
            {content.hero.bookButton}
          </button>
          <button
            onClick={() => setShowVideoModal(true)}
            className="text-base px-8 py-3 rounded-md bg-transparent text-white border-2 border-white transition-all duration-300 font-semibold uppercase inline-flex items-center gap-2"
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#004657'
              e.currentTarget.style.borderColor = 'white'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent'
              e.currentTarget.style.borderColor = 'white'
            }}
          >
            <Play className="w-5 h-5" />
            {content.overview.experienceButton}
          </button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce">
        <ChevronDown className="w-8 h-8 text-white" />
      </div>

      {/* Video Modal */}
      {showVideoModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm animate-in fade-in duration-300"
          onClick={() => setShowVideoModal(false)}
        >
          <button
            onClick={() => setShowVideoModal(false)}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            aria-label="Close video"
          >
            <X className="w-8 h-8" />
          </button>
          <div
            className="relative w-full max-w-6xl mx-4 aspect-video animate-in zoom-in duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            <video
              src="/swan_4.webm"
              controls
              autoPlay
              preload="metadata"
              className="w-full h-full rounded-lg shadow-2xl"
            >
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      )}
    </section>
  )
}
