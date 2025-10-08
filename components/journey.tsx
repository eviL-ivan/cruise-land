'use client'

import { useLanguage } from "@/lib/language-context"
import { useRef } from "react"

export function Journey() {
  const { content } = useLanguage()
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([])

  const getVideoSrc = (imageSrc: string) => {
    return imageSrc.replace(/\.(jpg|jpeg|png|webp)$/i, '.mp4')
  }

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-light mb-6 text-balance">
            {content.journey.title}
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground text-pretty leading-relaxed">
            {content.journey.description}
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-6 max-w-7xl mx-auto mb-16">
          {content.journey.destinations.map((destination, index) => (
            <div
              key={index}
              className="relative group"
            >
              <div className="relative h-64 rounded-lg overflow-hidden mb-4">
                <video
                  ref={(el) => {
                    videoRefs.current[index] = el
                  }}
                  src={getVideoSrc(destination.image)}
                  poster={destination.image}
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="auto"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="text-white font-serif text-2xl font-bold">{destination.name}</div>
                </div>
              </div>
              <p className="text-sm text-muted-foreground text-center">{destination.description}</p>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {content.journey.stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-secondary/20 flex items-center justify-center">
                <span className="text-3xl font-serif font-bold text-secondary">{stat.number}</span>
              </div>
              <h3 className="font-serif text-2xl font-bold mb-2">{stat.title}</h3>
              <p className="text-muted-foreground">{stat.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
