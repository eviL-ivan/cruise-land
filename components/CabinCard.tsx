'use client'

import Image from "next/image"
import { Check, ChevronLeft, ChevronRight } from "lucide-react"
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
    <div className="group bg-white rounded-2xl overflow-hidden transition-all duration-500 flex flex-col relative shadow-[0_1px_3px_rgba(0,0,0,0.05),0_1px_2px_rgba(0,0,0,0.1)] hover:shadow-[0_10px_40px_rgba(0,65,85,0.12),0_4px_12px_rgba(0,65,85,0.08)]">
      {/* Accent Border */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#be8f74] via-[#d4a98a] to-[#be8f74] opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20" />

      {/* Badge - if exists */}
      {cabin.badge && (
        <div className="absolute top-5 left-5 z-20 bg-gradient-to-r from-[#be8f74] to-[#d4a98a] text-white px-3 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase shadow-lg">
          {cabin.badge}
        </div>
      )}

      {/* Image Slider */}
      <div className="relative h-[280px] overflow-hidden">
        <div className="embla h-full" ref={emblaRef}>
          <div className="embla__container h-full" {...touchHandlers}>
            {cabinImages.map((image, index) => (
              <div key={index} className="embla__slide relative min-w-0 flex-[0_0_100%]">
                <Image
                  src={image}
                  alt={`${cabin.name} - Image ${index + 1}`}
                  fill
                  sizes="(max-width: 768px) calc(100vw - 2rem), 50vw"
                  className="object-cover"
                  loading="eager"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Arrows */}
        {cabinImages.length > 1 && (
          <>
            <button
              onClick={scrollPrev}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-md hover:bg-white text-[#004155] p-2.5 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-110 z-10"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={scrollNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-md hover:bg-white text-[#004155] p-2.5 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-110 z-10"
              aria-label="Next image"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            {/* Slide Indicators */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
              {cabinImages.map((_, imgIndex) => (
                <button
                  key={imgIndex}
                  onClick={() => scrollTo(imgIndex)}
                  className={`h-1 rounded-full transition-all duration-500 ${
                    imgIndex === selectedIndex
                      ? 'w-6 bg-white shadow-md'
                      : 'w-1 bg-white/50 hover:bg-white/70'
                  }`}
                  aria-label={`Go to image ${imgIndex + 1}`}
                />
              ))}
            </div>
          </>
        )}

      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-grow">
        {/* Header */}
        <div className="mb-6">
          {/* Title */}
          <h3 className="font-serif text-2xl md:text-3xl font-light tracking-tight bg-gradient-to-br from-[#004155] to-[#004155]/85 bg-clip-text text-transparent leading-tight mb-1.5">
            {cabin.name}
          </h3>

          {/* Size */}
          <div className="text-[#6d6e71]/70 text-xs font-normal tracking-wider uppercase mb-5">
            {cabin.size}
          </div>

          {/* Price - More Prominent */}
          {cabin.price && (
            <div className="inline-block">
              {/* Extract "From" from price if it exists */}
              {cabin.price.toLowerCase().includes('from') ? (
                <>
                  <div className="text-xs text-[#6d6e71]/60 tracking-wide mb-1">From</div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl md:text-4xl font-normal text-[#be8f74] leading-none tracking-tight">
                      {cabin.price.replace(/from\s*/i, '')}
                    </span>
                    <span className="text-[11px] text-[#6d6e71]/50 tracking-wider uppercase">
                      per person
                    </span>
                  </div>
                </>
              ) : (
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl md:text-4xl font-normal text-[#be8f74] leading-none tracking-tight">
                    {cabin.price}
                  </span>
                  <span className="text-[11px] text-[#6d6e71]/50 tracking-wider uppercase">
                    per person
                  </span>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Features */}
        <ul className="space-y-3 mb-6 flex-grow">
          {cabin.features.map((feature, idx) => (
            <li key={idx} className="flex items-start gap-3 text-[#6d6e71] group/item">
              <div className="mt-0.5 flex-shrink-0">
                <div className="w-5 h-5 rounded-full bg-gradient-to-br from-[#be8f74]/15 to-[#be8f74]/5 flex items-center justify-center group-hover/item:from-[#be8f74]/25 group-hover/item:to-[#be8f74]/15 transition-all duration-300">
                  <Check className="w-3.5 h-3.5 text-[#be8f74]" strokeWidth={2.5} />
                </div>
              </div>
              <span className="text-sm leading-relaxed text-[#6d6e71]">{feature}</span>
            </li>
          ))}
        </ul>

        {/* CTA Button */}
        <button
          onClick={onBook}
          className="group/btn w-full relative overflow-hidden rounded-full px-6 py-3.5 font-medium text-sm tracking-wider uppercase transition-all duration-300 mt-auto border border-[#004155] text-[#004155] hover:text-white hover:shadow-[0_4px_20px_rgba(0,65,85,0.15)] hover:scale-[1.01] active:scale-[0.99]"
        >
          <span className="relative z-10">{selectButtonText}</span>
          {/* Background fill animation */}
          <div className="absolute inset-0 bg-[#004155] transform scale-x-0 group-hover/btn:scale-x-100 transition-transform duration-300 origin-left" />
        </button>
      </div>
    </div>
  )
}
