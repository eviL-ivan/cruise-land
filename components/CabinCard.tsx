'use client'

import { useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, ArrowRight, Sparkles } from "lucide-react"
import { useEmblaSlider } from "@/hooks/useEmblaSlider"
import { MediaGalleryDialog } from "./MediaGalleryDialog"

interface CabinCardProps {
  cabin: {
    name: string
    size: string
    price?: string
    features: string[]
    image?: string
    images?: string[]
    videos?: string[]
    badge?: string
  }
  onBook: () => void
  selectButtonText: string
  index: number
}

export function CabinCard({ cabin, onBook, selectButtonText, index }: CabinCardProps) {
  const [isCardHovered, setIsCardHovered] = useState(false) // Hover on entire card - removes overlay
  const [isPanelHovered, setIsPanelHovered] = useState(false) // Hover on panel - expands panel
  const [isGalleryOpen, setIsGalleryOpen] = useState(false) // Fullscreen gallery dialog
  const [selectedMediaIndex, setSelectedMediaIndex] = useState(0) // Selected media for gallery
  const cabinImages = cabin.images || [cabin.image || '/placeholder.svg']
  const cabinVideos = cabin.videos || []
  const allMedia = [...cabinImages, ...cabinVideos] // Combine images and videos
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

  // Sync main carousel with gallery when gallery index changes
  const handleGalleryIndexChange = (index: number) => {
    setSelectedMediaIndex(index) // Update state for lightbox
    scrollTo(index) // Sync main carousel
  }

  return (
    <div
      className="group overflow-hidden rounded-[32px] flex flex-col lg:block lg:relative lg:min-h-[520px]"
      onMouseEnter={() => setIsCardHovered(true)}
      onMouseLeave={() => setIsCardHovered(false)}
    >
      {/* Full Background Image - Mobile: relative block, Desktop: absolute full */}
      <div className="relative h-[350px] lg:absolute lg:inset-0 lg:h-auto">
        <div className="embla h-full" ref={emblaRef}>
          <div className="embla__container h-full" {...touchHandlers}>
            {allMedia.map((media, mediaIndex) => {
              const isVideo = mediaIndex >= cabinImages.length

              return (
                <div
                  key={mediaIndex}
                  className="embla__slide relative min-w-0 flex-[0_0_100%] cursor-pointer"
                  onClick={() => {
                    setSelectedMediaIndex(mediaIndex)
                    setIsGalleryOpen(true)
                  }}
                >
                  {isVideo ? (
                    <video
                      src={media}
                      className="absolute inset-0 w-full h-full object-cover"
                      autoPlay
                      loop
                      muted
                      playsInline
                    />
                  ) : (
                    /* Image slide */
                    <Image
                      src={media}
                      alt={`${cabin.name} - Image ${mediaIndex + 1}`}
                      fill
                      sizes="(max-width: 1024px) 100vw, 100vw"
                      className="object-cover"
                      loading="eager"
                      priority={mediaIndex === 0}
                    />
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {/* Dark overlay - Desktop only, disappears on card hover (except when hovering panel) */}
        <div className={`absolute inset-0 bg-gradient-to-br from-black/40 via-black/30 to-black/50 transition-all duration-700 pointer-events-none hidden lg:block ${isCardHovered && !isPanelHovered ? 'opacity-0' : 'opacity-80'}`} />

        {/* Navigation Arrows - positioned relative to image container */}
        {allMedia.length > 1 && (
          <>
            <button
              onClick={scrollPrev}
              className={`absolute top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-md hover:bg-white/30 text-white p-2.5 lg:p-3 rounded-full shadow-2xl hover:scale-110 z-30 left-4 lg:left-6
                opacity-100 lg:opacity-0 transition-all duration-700
                ${isCardHovered && !isPanelHovered ? 'lg:!opacity-100' : ''}
                ${!isEven && (isPanelHovered ? 'lg:!left-[675px]' : 'lg:!left-[475px]')}
              `}
              aria-label="Previous image"
            >
              <ChevronLeft className="w-4 h-4 lg:w-5 lg:h-5" strokeWidth={2.5} />
            </button>
            <button
              onClick={scrollNext}
              className={`absolute top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-md hover:bg-white/30 text-white p-2.5 lg:p-3 rounded-full shadow-2xl hover:scale-110 z-30 right-4 lg:right-6
                opacity-100 lg:opacity-0 transition-all duration-700
                ${isCardHovered && !isPanelHovered ? 'lg:!opacity-100' : ''}
                ${isEven && (isPanelHovered ? 'lg:!right-[675px]' : 'lg:!right-[475px]')}
              `}
              aria-label="Next image"
            >
              <ChevronRight className="w-4 h-4 lg:w-5 lg:h-5" strokeWidth={2.5} />
            </button>

            {/* Slide Indicators - hide when hovering panel on desktop */}
            <div className={`absolute bottom-4 lg:bottom-6 left-1/2 -translate-x-1/2 gap-2 z-30 flex transition-opacity duration-300 ${isPanelHovered ? 'lg:opacity-0' : 'opacity-100'}`}>
              {allMedia.map((_, mediaIdx) => (
                <button
                  key={mediaIdx}
                  onClick={() => scrollTo(mediaIdx)}
                  className={`h-1 rounded-full transition-all duration-500 ${
                    mediaIdx === selectedIndex
                      ? 'w-10 bg-white shadow-lg'
                      : 'w-1.5 bg-white/50 hover:bg-white/70'
                  }`}
                  aria-label={`Go to slide ${mediaIdx + 1}`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Badge */}
      {cabin.badge && (
        <div className="absolute top-4 left-4 lg:top-8 lg:left-8 z-20 flex items-center gap-1.5 lg:gap-2 bg-gradient-to-r from-[#be8f74] to-[#d4a98a] text-white px-3 py-1.5 lg:px-5 lg:py-2.5 rounded-full text-[9px] lg:text-[11px] font-bold tracking-[0.15em] uppercase shadow-2xl pointer-events-none">
          <Sparkles className="w-3 h-3 lg:w-3.5 lg:h-3.5" />
          {cabin.badge}
        </div>
      )}

      {/* Content Panel - Mobile: warm beige/brown tone, Desktop: floating glass overlay */}
      <div
        className={`bg-gradient-to-br from-[#7a6a58] to-[#6d5d4b] border-t-0 lg:backdrop-blur-2xl lg:bg-white/10 lg:bg-none lg:border-t border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.3)] transition-all duration-700 overflow-hidden z-20
          p-6 lg:rounded-3xl
          lg:absolute lg:top-8 lg:p-8 ${isEven ? 'lg:right-8 lg:left-auto' : 'lg:left-8 lg:right-auto'}
          ${isPanelHovered ? 'lg:bg-white/15 lg:w-[620px]' : 'lg:w-[420px]'}
        `}
        onMouseEnter={() => setIsPanelHovered(true)}
        onMouseLeave={() => setIsPanelHovered(false)}
      >

        <div className={`flex flex-col lg:gap-8 ${isEven ? 'lg:flex-row-reverse' : 'lg:flex-row'}`}>
          {/* Main Column - Main Info */}
          <div className="lg:min-w-[340px] flex-shrink-0">
            {/* Cabin Name */}
            <h3 className="font-serif text-2xl lg:text-5xl font-light text-white mb-1 lg:mb-2 leading-[1.1] tracking-tight drop-shadow-2xl">
              {cabin.name}
            </h3>

            {/* Size */}
            <div className="text-white/70 text-xs font-medium tracking-[0.15em] uppercase mb-3 lg:mb-8 drop-shadow-lg">
              {cabin.size}
            </div>

            {/* Price - Hero */}
            {cabin.price && (
              <div className="mb-3 lg:mb-6">
                <div className="text-[10px] text-white/60 tracking-[0.2em] uppercase mb-1 lg:mb-2 font-semibold">
                  From
                </div>
                <div className="flex items-baseline gap-2 lg:gap-3">
                  <span className="font-serif text-4xl lg:text-7xl font-light text-white leading-none tracking-tight drop-shadow-2xl">
                    {cabin.price.replace(/from\s*/i, '')}
                  </span>
                  <span className="text-[10px] lg:text-xs text-white/70 tracking-wider uppercase font-medium pb-1 lg:pb-2">
                    / person
                  </span>
                </div>
              </div>
            )}

            {/* Features - Mobile: show all, Desktop: preview only */}
            <div className="mb-5 lg:mb-6">
              {/* Mobile: All features */}
              <div className="space-y-1.5 lg:hidden">
                {cabin.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-white/90">
                    <div className="w-1 h-1 rounded-full bg-[#be8f74] shadow-lg flex-shrink-0" />
                    <span className="text-xs font-medium drop-shadow-lg">{feature}</span>
                  </div>
                ))}
              </div>

              {/* Desktop: Preview only */}
              <div className="hidden lg:block space-y-2">
                {cabin.features.slice(0, 2).map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-white/90">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#be8f74] shadow-lg flex-shrink-0" />
                    <span className="text-sm font-medium drop-shadow-lg">{feature}</span>
                  </div>
                ))}
                {cabin.features.length > 2 && (
                  <div className={`text-white/70 text-xs font-semibold tracking-wide pt-1 transition-opacity duration-300 ${isPanelHovered ? 'opacity-0 invisible' : 'opacity-100'}`}>
                    +{cabin.features.length - 2} more amenities
                  </div>
                )}
              </div>
            </div>

            {/* CTA Button - Mobile: outline, Desktop: gradient fill */}
            <button
              onClick={onBook}
              className="group/btn w-full relative overflow-hidden rounded-2xl px-4 py-3 lg:px-6 lg:py-4 font-bold text-xs lg:text-sm tracking-[0.1em] uppercase transition-all duration-300 text-white border-2 flex items-center justify-center gap-2
                bg-white/10 border-white/60 hover:bg-white/20 hover:border-white/80
                lg:bg-gradient-to-r lg:from-[#be8f74] lg:via-[#d4a98a] lg:to-[#be8f74] lg:border-white/50 lg:hover:border-white lg:shadow-[0_6px_24px_rgba(190,143,116,0.4)] lg:hover:shadow-[0_10px_40px_rgba(190,143,116,0.6),0_0_0_3px_rgba(255,255,255,0.3)]
                hover:scale-[1.03] active:scale-[0.98]"
              style={{ backgroundSize: '200% 100%' }}
            >
              <span className="relative z-10">{selectButtonText}</span>
              <ArrowRight className="w-3.5 h-3.5 lg:w-4 lg:h-4 relative z-10 transition-transform duration-300 group-hover/btn:translate-x-1" strokeWidth={3} />
              {/* Shine effect - Desktop only */}
              <div className="hidden lg:block absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent transform -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700" />
            </button>
          </div>

          {/* Extended Column - Extended Features (Desktop only, appears on panel hover) */}
          {cabin.features.length > 2 && (
            <div className={`hidden lg:block transition-all duration-700 ${isEven ? 'border-r border-white/20 pr-8' : 'border-l border-white/20 pl-8'} ${isPanelHovered ? 'opacity-100' : 'opacity-0'}`}>
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

      {/* Fullscreen Media Gallery */}
      <MediaGalleryDialog
        isOpen={isGalleryOpen}
        onClose={() => setIsGalleryOpen(false)}
        media={allMedia}
        initialIndex={selectedMediaIndex}
        cabinName={cabin.name}
        imageCount={cabinImages.length}
        onIndexChange={handleGalleryIndexChange}
      />
    </div>
  )
}
