'use client'

import { useLanguage } from "@/lib/language-context"
import { useRef } from "react"

export function Wildlife() {
  const { content } = useLanguage()
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([])

  const handleMouseEnter = (index: number) => {
    const video = videoRefs.current[index]
    if (video) {
      video.play()
    }
  }

  const handleMouseLeave = (index: number) => {
    const video = videoRefs.current[index]
    if (video) {
      video.pause()
      video.currentTime = 0
    }
  }

  const getVideoSrc = (imageSrc: string) => {
    return imageSrc.replace(/\.(jpg|jpeg|png|webp)$/i, '.mp4')
  }

  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-balance">
            {content.wildlife.title}
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground text-pretty leading-relaxed">
            {content.wildlife.subtitle}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {content.wildlife.animals.map((animal, index) => (
            <div
              key={index}
              className="relative group overflow-hidden rounded-lg shadow-lg"
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={() => handleMouseLeave(index)}
            >
              <div className="relative h-[400px]">
                <video
                  ref={(el) => {
                    videoRefs.current[index] = el
                  }}
                  src={getVideoSrc(animal.image)}
                  poster={animal.image}
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-white font-serif text-2xl font-bold mb-2">{animal.name}</h3>
                  <p className="text-white/90 text-sm">{animal.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
