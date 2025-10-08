'use client'

import { useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, ArrowRight, Sparkles } from "lucide-react"
import { useEmblaSlider } from "@/hooks/useEmblaSlider"

interface CabinCardProps {
  cabin: {
    name: string
    size: string
    price?: string
    features: string[]
    image?: string
    images?: string[]
    badge?: string
  }
  onBook: () => void
  selectButtonText: string
  index: number
}

export function CabinCard({ cabin, onBook, selectButtonText, index }: CabinCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const cabinImages = cabin.images || [cabin.image || '/placeholder.svg']
  const isEven = index % 2 === 0

  const {
    emblaRef,
    selectedIndex,
    scrollPrev,
    scrollNext,
    scrollTo,
    touchHandlers,
  } = useEmblaSlider({
    autoplay: false,
    loop: true,
  })

  return (
    <div className="group relative overflow-hidden rounded-[32px] min-h-[600px] lg:min-h-[520px]">
      {/* Full Background Image */}
      <div className="absolute inset-0">
        <div className="embla h-full" ref={emblaRef}>
          <div className="embla__container h-full" {...touchHandlers}>
            {cabinImages.map((image, imgIndex) => (
              <div key={imgIndex} className="embla__slide relative min-w-0 flex-[0_0_100%]">
                <Image
                  src={image}
                  alt={`${cabin.name} - Image ${imgIndex + 1}`}
                  fill
                  sizes="(max-width: 1024px) 100vw, 100vw"
                  className="object-cover"
                  loading="eager"
                  priority={imgIndex === 0}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Dark overlay - increases on hover */}
        <div className={`absolute inset-0 bg-gradient-to-br from-black/40 via-black/30 to-black/50 transition-all duration-700 pointer-events-none ${isHovered ? 'opacity-100' : 'opacity-80'}`} />
      </div>

      {/* Navigation Arrows */}
      {cabinImages.length > 1 && (
        <>
          <button
            onClick={scrollPrev}
            className={`absolute top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-md hover:bg-white/30 text-white p-3 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-700 shadow-2xl hover:scale-110 z-30 ${
              isEven
                ? 'left-6'
                : isHovered
                  ? 'left-6 lg:left-[675px]'
                  : 'left-6 lg:left-[475px]'
            }`}
            aria-label="Previous image"
          >
            <ChevronLeft className="w-5 h-5" strokeWidth={2.5} />
          </button>
          <button
            onClick={scrollNext}
            className={`absolute top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-md hover:bg-white/30 text-white p-3 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-700 shadow-2xl hover:scale-110 z-30 ${
              isEven
                ? isHovered
                  ? 'right-6 lg:right-[675px]'
                  : 'right-6 lg:right-[475px]'
                : 'right-6'
            }`}
            aria-label="Next image"
          >
            <ChevronRight className="w-5 h-5" strokeWidth={2.5} />
          </button>

          {/* Slide Indicators */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-30">
            {cabinImages.map((_, imgIndex) => (
              <button
                key={imgIndex}
                onClick={() => scrollTo(imgIndex)}
                className={`h-1 rounded-full transition-all duration-500 ${
                  imgIndex === selectedIndex
                    ? 'w-10 bg-white shadow-lg'
                    : 'w-1.5 bg-white/50 hover:bg-white/70'
                }`}
                aria-label={`Go to image ${imgIndex + 1}`}
              />
            ))}
          </div>
        </>
      )}

      {/* Badge */}
      {cabin.badge && (
        <div className="absolute top-8 left-8 z-20 flex items-center gap-2 bg-gradient-to-r from-[#be8f74] to-[#d4a98a] text-white px-5 py-2.5 rounded-full text-[11px] font-bold tracking-[0.15em] uppercase shadow-2xl pointer-events-none">
          <Sparkles className="w-3.5 h-3.5" />
          {cabin.badge}
        </div>
      )}

      {/* Floating Glass Content Panel - Expands to free side on Hover */}
      <div
        className={`absolute top-8 ${isEven ? 'right-8' : 'left-8'} z-20 backdrop-blur-2xl bg-white/10 border border-white/20 rounded-3xl p-8 shadow-[0_8px_32px_rgba(0,0,0,0.3)] transition-all duration-700 ${isHovered ? 'bg-white/15 lg:w-[620px]' : 'lg:w-[420px]'} w-[calc(100%-4rem)] overflow-hidden`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >

        <div className={`flex flex-col gap-8 ${isEven ? 'lg:flex-row-reverse' : 'lg:flex-row'}`}>
          {/* Main Column - Main Info */}
          <div className="lg:min-w-[340px] flex-shrink-0">
            {/* Cabin Name */}
            <h3 className="font-serif text-4xl lg:text-5xl font-light text-white mb-2 leading-[1.1] tracking-tight drop-shadow-2xl">
              {cabin.name}
            </h3>

            {/* Size */}
            <div className="text-white/70 text-xs font-medium tracking-[0.15em] uppercase mb-8 drop-shadow-lg">
              {cabin.size}
            </div>

            {/* Price - Hero */}
            {cabin.price && (
              <div className="mb-6">
                <div className="text-[10px] text-white/60 tracking-[0.2em] uppercase mb-2 font-semibold">
                  From
                </div>
                <div className="flex items-baseline gap-3">
                  <span className="font-serif text-6xl lg:text-7xl font-light text-white leading-none tracking-tight drop-shadow-2xl">
                    {cabin.price.replace(/from\s*/i, '')}
                  </span>
                  <span className="text-xs text-white/70 tracking-wider uppercase font-medium pb-2">
                    / person
                  </span>
                </div>
              </div>
            )}

            {/* Preview features (always visible) */}
            <div className="space-y-2 mb-6">
              {cabin.features.slice(0, 2).map((feature, idx) => (
                <div key={idx} className="flex items-center gap-2 text-white/90">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#be8f74] shadow-lg flex-shrink-0" />
                  <span className="text-sm font-medium drop-shadow-lg">{feature}</span>
                </div>
              ))}
              {cabin.features.length > 2 && (
                <div className={`text-white/70 text-xs font-semibold tracking-wide pt-1 transition-opacity duration-300 ${isHovered ? 'opacity-0 invisible' : 'opacity-100'}`}>
                  +{cabin.features.length - 2} more amenities
                </div>
              )}
            </div>

            {/* CTA Button */}
            <button
              onClick={onBook}
              className="group/btn w-full relative overflow-hidden rounded-2xl px-6 py-4 font-bold text-sm tracking-[0.1em] uppercase transition-all duration-300 bg-gradient-to-r from-[#be8f74] via-[#d4a98a] to-[#be8f74] bg-size-200 hover:bg-pos-right text-white border-2 border-white/50 hover:border-white shadow-[0_6px_24px_rgba(190,143,116,0.4)] hover:shadow-[0_10px_40px_rgba(190,143,116,0.6),0_0_0_3px_rgba(255,255,255,0.3)] hover:scale-[1.03] active:scale-[0.98] flex items-center justify-center gap-2"
              style={{ backgroundSize: '200% 100%' }}
            >
              <span className="relative z-10">{selectButtonText}</span>
              <ArrowRight className="w-4 h-4 relative z-10 transition-transform duration-300 group-hover/btn:translate-x-1" strokeWidth={3} />
              {/* Shine effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent transform -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700" />
            </button>
          </div>

          {/* Extended Column - Extended Features (appears on hover) */}
          {cabin.features.length > 2 && (
            <div className={`transition-all duration-700 ${isEven ? 'border-r border-white/20 pr-8' : 'border-l border-white/20 pl-8'} ${isHovered ? 'opacity-100 lg:block hidden' : 'opacity-0 lg:hidden'}`}>
              <h4 className="text-white/90 text-xs font-bold tracking-[0.15em] uppercase mb-4">
                Additional Amenities
              </h4>
              <div className="space-y-2">
                {cabin.features.slice(2).map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-white/80">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#be8f74] flex-shrink-0" />
                    <span className="text-sm drop-shadow-lg">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
