'use client'

import Image from "next/image"
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react"
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
}

export function CabinCard({ cabin, onBook, selectButtonText }: CabinCardProps) {
  const cabinImages = cabin.images || [cabin.image || '/placeholder.svg']

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
    <div className="group bg-white overflow-hidden transition-all duration-500 relative shadow-[0_2px_8px_rgba(0,65,85,0.06)] hover:shadow-[0_12px_48px_rgba(0,65,85,0.15)] rounded-3xl">
      {/* Desktop: Horizontal Split Layout / Mobile: Vertical */}
      <div className="flex flex-col lg:flex-row lg:items-stretch min-h-[480px] lg:min-h-[420px]">

        {/* Left Side - Image Slider */}
        <div className="relative lg:w-[52%] h-[320px] lg:h-auto overflow-hidden">
          {/* Badge */}
          {cabin.badge && (
            <div className="absolute top-6 left-6 z-20 bg-[#004155] text-white px-4 py-2 rounded-full text-[10px] font-bold tracking-[0.15em] uppercase shadow-xl backdrop-blur-sm">
              {cabin.badge}
            </div>
          )}

          <div className="embla h-full" ref={emblaRef}>
            <div className="embla__container h-full" {...touchHandlers}>
              {cabinImages.map((image, index) => (
                <div key={index} className="embla__slide relative min-w-0 flex-[0_0_100%]">
                  <Image
                    src={image}
                    alt={`${cabin.name} - Image ${index + 1}`}
                    fill
                    sizes="(max-width: 1024px) 100vw, 52vw"
                    className="object-cover"
                    loading="eager"
                  />
                  {/* Subtle vignette overlay */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-black/20 via-transparent to-transparent opacity-40" />
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Arrows */}
          {cabinImages.length > 1 && (
            <>
              <button
                onClick={scrollPrev}
                className="absolute left-5 top-1/2 -translate-y-1/2 bg-white/95 backdrop-blur-sm hover:bg-white text-[#004155] p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-lg hover:scale-110 z-10"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-4 h-4" strokeWidth={2.5} />
              </button>
              <button
                onClick={scrollNext}
                className="absolute right-5 top-1/2 -translate-y-1/2 bg-white/95 backdrop-blur-sm hover:bg-white text-[#004155] p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-lg hover:scale-110 z-10"
                aria-label="Next image"
              >
                <ChevronRight className="w-4 h-4" strokeWidth={2.5} />
              </button>

              {/* Slide Indicators */}
              <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
                {cabinImages.map((_, imgIndex) => (
                  <button
                    key={imgIndex}
                    onClick={() => scrollTo(imgIndex)}
                    className={`h-1 rounded-full transition-all duration-500 ${
                      imgIndex === selectedIndex
                        ? 'w-8 bg-white shadow-md'
                        : 'w-1 bg-white/60 hover:bg-white/80'
                    }`}
                    aria-label={`Go to image ${imgIndex + 1}`}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        {/* Right Side - Content */}
        <div className="lg:w-[48%] flex flex-col p-8 lg:p-10">
          {/* Header Section */}
          <div className="mb-auto">
            {/* Cabin Name */}
            <h3 className="font-serif text-3xl lg:text-4xl font-light text-[#004155] mb-3 leading-[1.15] tracking-tight">
              {cabin.name}
            </h3>

            {/* Size */}
            <div className="text-[#6d6e71]/60 text-xs font-medium tracking-[0.12em] uppercase mb-8">
              {cabin.size}
            </div>

            {/* Features - Compact List */}
            <div className="space-y-2.5 mb-8">
              {cabin.features.slice(0, 4).map((feature, idx) => (
                <div key={idx} className="flex items-center gap-2.5 text-[#6d6e71]">
                  <div className="w-1 h-1 rounded-full bg-[#be8f74] flex-shrink-0" />
                  <span className="text-[13px] leading-relaxed">{feature}</span>
                </div>
              ))}
              {cabin.features.length > 4 && (
                <div className="text-[#be8f74] text-xs font-medium tracking-wide pt-1">
                  +{cabin.features.length - 4} more amenities
                </div>
              )}
            </div>
          </div>

          {/* Bottom Section - Price & CTA */}
          <div className="border-t border-[#004155]/10 pt-6 mt-auto">
            {/* Price */}
            {cabin.price && (
              <div className="mb-5">
                <div className="text-[10px] text-[#6d6e71]/50 tracking-[0.15em] uppercase mb-1.5 font-medium">
                  From
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="font-serif text-5xl font-light text-[#004155] leading-none tracking-tight">
                    {cabin.price.replace(/from\s*/i, '')}
                  </span>
                  <span className="text-[11px] text-[#6d6e71]/50 tracking-wider uppercase font-medium">
                    / person
                  </span>
                </div>
              </div>
            )}

            {/* CTA Button */}
            <button
              onClick={onBook}
              className="group/btn w-full relative overflow-hidden rounded-full px-6 py-4 font-semibold text-sm tracking-[0.08em] uppercase transition-all duration-300 bg-[#004155] text-white hover:shadow-[0_8px_24px_rgba(0,65,85,0.3)] hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
            >
              <span className="relative z-10">{selectButtonText}</span>
              <ArrowRight className="w-4 h-4 relative z-10 transition-transform duration-300 group-hover/btn:translate-x-1" strokeWidth={2.5} />
              {/* Shine effect on hover */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
