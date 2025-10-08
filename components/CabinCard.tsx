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
    <div className="bg-card rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow flex flex-col">
      <div className="relative h-96 group">
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
    </div>
  )
}
