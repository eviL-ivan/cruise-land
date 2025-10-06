'use client'

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Check, ChevronLeft, ChevronRight } from "lucide-react"
import { useLanguage } from "@/lib/language-context"

export function Cabins() {
  const { content } = useLanguage()
  const [currentImageIndex, setCurrentImageIndex] = useState<Record<number, number>>({})
  const touchStartX = useRef<Record<number, number>>({})
  const touchEndX = useRef<Record<number, number>>({})

  const handlePrevImage = (cabinIndex: number, imagesLength: number) => {
    setCurrentImageIndex(prev => ({
      ...prev,
      [cabinIndex]: ((prev[cabinIndex] || 0) - 1 + imagesLength) % imagesLength
    }))
  }

  const handleNextImage = (cabinIndex: number, imagesLength: number) => {
    setCurrentImageIndex(prev => ({
      ...prev,
      [cabinIndex]: ((prev[cabinIndex] || 0) + 1) % imagesLength
    }))
  }

  const handleTouchStart = (e: React.TouchEvent, cabinIndex: number) => {
    touchStartX.current[cabinIndex] = e.touches[0].clientX
  }

  const handleTouchMove = (e: React.TouchEvent, cabinIndex: number) => {
    touchEndX.current[cabinIndex] = e.touches[0].clientX
  }

  const handleTouchEnd = (cabinIndex: number, imagesLength: number) => {
    const startX = touchStartX.current[cabinIndex] || 0
    const endX = touchEndX.current[cabinIndex] || 0

    if (startX - endX > 50) {
      handleNextImage(cabinIndex, imagesLength)
    }
    if (startX - endX < -50) {
      handlePrevImage(cabinIndex, imagesLength)
    }
  }

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-light mb-6 text-balance">
            {content.cabins.title}
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground text-pretty">{content.cabins.subtitle}</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
          {content.cabins.categories.map((cabin, index) => {
            const currentIndex = currentImageIndex[index] || 0
            const cabinImages = cabin.images || [cabin.image]

            return (
              <div
                key={index}
                className="bg-card rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow flex flex-col"
              >
                <div
                  className="relative h-96 group"
                  onTouchStart={(e) => handleTouchStart(e, index)}
                  onTouchMove={(e) => handleTouchMove(e, index)}
                  onTouchEnd={() => handleTouchEnd(index, cabinImages.length)}
                >
                  <img
                    src={cabinImages[currentIndex] || "/placeholder.svg"}
                    alt={`${cabin.name} - Image ${currentIndex + 1}`}
                    className="w-full h-full object-cover"
                  />
                  {cabinImages.length > 1 && (
                    <>
                      <button
                        onClick={() => handlePrevImage(index, cabinImages.length)}
                        className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                        aria-label="Previous image"
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleNextImage(index, cabinImages.length)}
                        className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                        aria-label="Next image"
                      >
                        <ChevronRight className="w-5 h-5" />
                      </button>
                      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
                        {cabinImages.map((_, imgIndex) => (
                          <div
                            key={imgIndex}
                            className={`w-2 h-2 rounded-full transition-colors ${
                              imgIndex === currentIndex ? 'bg-white' : 'bg-white/50'
                            }`}
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
                    className="w-full text-white border-2 border-white rounded-md px-6 py-3 font-semibold transition-all duration-300 mt-auto"
                    style={{backgroundColor: '#004657'}}
                  >
                    {content.cabins.selectButton}
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
