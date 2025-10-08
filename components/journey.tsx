'use client'

import { useLanguage } from "@/lib/language-context"
import { useEffect, useRef, useState } from "react"

interface StatItemProps {
  number: string
  title: string
  description: string
  delay: number
}

function StatItem({ number, title, description, delay }: StatItemProps) {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay)
        }
      },
      { threshold: 0.1 },
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [delay])

  return (
    <div
      ref={ref}
      className={`group relative transition-all duration-1000 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
    >
      <div className="flex flex-col items-center text-center space-y-6 p-6 rounded-2xl transition-all duration-500 hover:bg-card/50">
        <div className="relative w-32 h-32 md:w-36 md:h-36">
          {/* Ambient glow */}
          <div className="absolute inset-0 bg-gradient-to-br from-accent/20 via-primary/20 to-accent/20 rounded-full blur-3xl scale-125 transition-all duration-700 group-hover:scale-150 group-hover:blur-[60px] opacity-50" />

          {/* Decorative orbital rings */}
          <div className="absolute inset-0 rounded-full border border-accent/5 transition-all duration-700 group-hover:scale-110 group-hover:rotate-90 group-hover:border-accent/10" />
          <div className="absolute inset-2 rounded-full border border-primary/5 transition-all duration-700 group-hover:scale-105 group-hover:-rotate-90 group-hover:border-primary/10" />

          {/* Main badge container */}
          <div className="absolute inset-4 rounded-full bg-gradient-to-br from-card/95 via-background/90 to-card/95 backdrop-blur-xl shadow-2xl transition-all duration-500 group-hover:shadow-accent/20 group-hover:scale-105">
            {/* Inner elegant border with shimmer effect */}
            <div className="absolute inset-0 rounded-full p-[2px] bg-gradient-to-br from-accent/40 via-primary/30 to-accent/40 transition-all duration-500 group-hover:from-accent/60 group-hover:via-primary/50 group-hover:to-accent/60">
              <div className="w-full h-full rounded-full bg-gradient-to-br from-background/80 via-card/90 to-background/80 backdrop-blur-sm" />
            </div>

            {/* Decorative corner accents */}
            <div className="absolute top-4 left-1/2 -translate-x-1/2 w-1 h-2 bg-gradient-to-b from-accent/60 to-transparent rounded-full transition-all duration-500 group-hover:h-3 group-hover:from-accent" />
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-1 h-2 bg-gradient-to-t from-accent/60 to-transparent rounded-full transition-all duration-500 group-hover:h-3 group-hover:from-accent" />
            <div className="absolute left-4 top-1/2 -translate-y-1/2 h-1 w-2 bg-gradient-to-r from-accent/60 to-transparent rounded-full transition-all duration-500 group-hover:w-3 group-hover:from-accent" />
            <div className="absolute right-4 top-1/2 -translate-y-1/2 h-1 w-2 bg-gradient-to-l from-accent/60 to-transparent rounded-full transition-all duration-500 group-hover:w-3 group-hover:from-accent" />

            <div className="absolute inset-0 grid place-items-center">
              <div className="relative -translate-y-1">
                {/* Number glow effect */}
                <div className="absolute inset-0 grid place-items-center">
                  <span className="font-serif text-4xl md:text-5xl font-light text-primary/20 blur-sm scale-110 leading-none">
                    {number}
                  </span>
                </div>
                {/* Main number with perfect centering */}
                <span className="relative font-serif text-4xl md:text-5xl font-light bg-gradient-to-br from-primary via-accent to-primary bg-clip-text text-transparent transition-all duration-500 group-hover:scale-110 group-hover:from-accent group-hover:via-primary group-hover:to-accent leading-none block">
                  {number}
                </span>
              </div>
            </div>

            {/* Subtle shimmer overlay */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-transparent via-accent/5 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
          </div>

          {/* Elegant corner decorations */}
          <div className="absolute -top-1 -left-1 w-3 h-3 border-t border-l border-accent/20 rounded-tl-lg transition-all duration-500 group-hover:w-4 group-hover:h-4 group-hover:border-accent/40" />
          <div className="absolute -top-1 -right-1 w-3 h-3 border-t border-r border-accent/20 rounded-tr-lg transition-all duration-500 group-hover:w-4 group-hover:h-4 group-hover:border-accent/40" />
          <div className="absolute -bottom-1 -left-1 w-3 h-3 border-b border-l border-accent/20 rounded-bl-lg transition-all duration-500 group-hover:w-4 group-hover:h-4 group-hover:border-accent/40" />
          <div className="absolute -bottom-1 -right-1 w-3 h-3 border-b border-r border-accent/20 rounded-br-lg transition-all duration-500 group-hover:w-4 group-hover:h-4 group-hover:border-accent/40" />
        </div>

        {/* Title */}
        <h3 className="font-serif text-2xl md:text-3xl font-light tracking-tight transition-colors duration-300 group-hover:text-primary">
          {title}
        </h3>

        {/* Description */}
        <p className="text-base text-muted-foreground leading-relaxed max-w-xs transition-colors duration-300 group-hover:text-foreground/80">
          {description}
        </p>

        {/* Decorative line */}
        <div className="w-12 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent transition-all duration-500 group-hover:w-20 group-hover:via-accent/60" />
      </div>
    </div>
  )
}

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
            <StatItem
              key={index}
              number={stat.number}
              title={stat.title}
              description={stat.description}
              delay={index * 200}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
