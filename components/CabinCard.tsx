'use client'

import Image from "next/image"
import { Check, ChevronLeft, ChevronRight, X } from "lucide-react"
import { useEmblaSlider } from "@/hooks/useEmblaSlider"
import { useState } from "react"

interface CabinCardProps {
  cabin: {
    name: string
    size: string
    price?: string
    features: string[]
    image?: string
    images?: string[]
  }
  onBook: () => void
  selectButtonText: string
}

export function CabinCard({ cabin, onBook, selectButtonText }: CabinCardProps) {
  const cabinImages = cabin.images || [cabin.image || '/placeholder.svg']
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)

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

  const openLightbox = (index: number) => {
    setLightboxIndex(index)
    setLightboxOpen(true)
  }

  const closeLightbox = () => {
    setLightboxOpen(false)
  }

  const goToNextLightbox = () => {
    setLightboxIndex((prev) => (prev + 1) % cabinImages.length)
  }

  const goToPrevLightbox = () => {
    setLightboxIndex((prev) => (prev - 1 + cabinImages.length) % cabinImages.length)
  }

  // Touch handlers for swipe
  const [touchStart, setTouchStart] = useState(0)
  const [touchEnd, setTouchEnd] = useState(0)

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return

    const distance = touchStart - touchEnd
    const minSwipeDistance = 50

    if (Math.abs(distance) < minSwipeDistance) return

    if (distance > 0) {
      goToNextLightbox()
    } else {
      goToPrevLightbox()
    }

    setTouchStart(0)
    setTouchEnd(0)
  }

  return (
    <div className="bg-card rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow flex flex-col">
      <div className="relative h-96 group">
        <div className="embla h-full" ref={emblaRef}>
          <div className="embla__container h-full" {...touchHandlers}>
            {cabinImages.map((image, index) => (
              <div
                key={index}
                className="embla__slide relative min-w-0 flex-[0_0_100%] cursor-pointer"
                onClick={() => openLightbox(index)}
              >
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

        {cabinImages.length > 1 && (
          <>
            <button
              onClick={scrollPrev}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-10"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={scrollNext}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-10"
              aria-label="Next image"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1 z-10">
              {cabinImages.map((_, imgIndex) => (
                <button
                  key={imgIndex}
                  onClick={() => scrollTo(imgIndex)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    imgIndex === selectedIndex ? 'bg-white' : 'bg-white/50'
                  }`}
                  aria-label={`Go to image ${imgIndex + 1}`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      <div className="p-6 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-serif text-2xl font-bold">{cabin.name}</h3>
          <span className="text-lg font-bold text-secondary whitespace-nowrap">{cabin.size}</span>
        </div>
        {cabin.price && (
          <div className="text-lg font-semibold text-primary mb-4">
            {cabin.price}
          </div>
        )}
        <ul className="space-y-2 mb-6 flex-grow">
          {cabin.features.map((feature, idx) => (
            <li key={idx} className="flex items-center gap-2 text-muted-foreground">
              <Check className="w-5 h-5 text-secondary flex-shrink-0" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
        <button
          onClick={onBook}
          className="w-full text-white border-2 border-white rounded-md px-6 py-3 font-semibold transition-all duration-300 mt-auto"
          style={{backgroundColor: '#004155'}}
        >
          {selectButtonText}
        </button>
      </div>

      {/* Lightbox */}
      {lightboxOpen && (
        <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center">
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 text-white hover:text-gray-300 z-50"
            aria-label="Close lightbox"
          >
            <X className="w-8 h-8" />
          </button>

          <button
            onClick={goToPrevLightbox}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white p-3 rounded-full z-50"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={goToNextLightbox}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white p-3 rounded-full z-50"
            aria-label="Next image"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          <div
            className="relative w-full h-full flex items-center justify-center p-8"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <Image
              src={cabinImages[lightboxIndex]}
              alt={`${cabin.name} - Image ${lightboxIndex + 1}`}
              fill
              className="object-contain"
              sizes="100vw"
            />
          </div>

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white text-sm">
            {lightboxIndex + 1} / {cabinImages.length}
          </div>
        </div>
      )}
    </div>
  )
}
