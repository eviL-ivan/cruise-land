'use client'

import { useState } from "react"
import { useLanguage } from "@/lib/language-context"
import { Map, ChevronLeft, ChevronRight, X } from "lucide-react"

export function Overview() {
  const { content } = useLanguage()
  const [currentSlide, setCurrentSlide] = useState(0)
  const [showMapModal, setShowMapModal] = useState(false)

  const slideImages = content.journey.destinations

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slideImages.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slideImages.length) % slideImages.length)
  }

  return (
    <>
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Image Slider */}
              <div className="relative h-[450px] lg:h-[550px] w-full rounded-lg overflow-hidden shadow-2xl group">
                <img
                  src={slideImages[currentSlide].image}
                  alt={slideImages[currentSlide].alt}
                  className="w-full h-full object-cover transition-all duration-500"
                />

                {/* Slide title overlay */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                  <h3 className="text-white font-serif text-3xl font-bold mb-2">
                    {slideImages[currentSlide].name}
                  </h3>
                  <p className="text-white/90 text-sm">{slideImages[currentSlide].description}</p>
                </div>

                {/* Navigation buttons */}
                <button
                  onClick={prevSlide}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={nextSlide}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>

                {/* Slide indicators */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                  {slideImages.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentSlide(index)}
                      className={`w-2 h-2 rounded-full transition-all ${
                        index === currentSlide ? "bg-white w-8" : "bg-white/50"
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Cruise Details */}
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="inline-block bg-secondary/20 text-secondary px-4 py-2 rounded-full text-sm font-semibold tracking-wide">
                    {content.overview.cruiseCode}
                  </div>
                  <button
                    onClick={() => setShowMapModal(true)}
                    className="inline-flex items-center gap-2 bg-primary/10 hover:bg-primary/20 text-primary px-4 py-2 rounded-full text-sm font-semibold tracking-wide transition-colors"
                  >
                    <Map className="w-4 h-4" />
                    <span>{content.overview.mapButton}</span>
                  </button>
                </div>

                <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground">
                  {content.overview.route}
                </h2>

                <div className="grid grid-cols-2 gap-6 py-6">
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground uppercase tracking-wide">{content.overview.datesLabel}</p>
                    <p className="text-xl font-semibold text-foreground">{content.overview.dates}</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground uppercase tracking-wide">{content.overview.durationLabel}</p>
                    <p className="text-xl font-semibold text-foreground">{content.overview.nights}</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground uppercase tracking-wide">{content.overview.shipLabel}</p>
                    <p className="text-xl font-semibold text-foreground">{content.overview.ship}</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground uppercase tracking-wide">{content.overview.priceLabel}</p>
                    <div>
                      <p className="text-3xl font-bold text-[#be8f74]">{content.overview.price}</p>
                      <p className="text-sm text-muted-foreground">{content.overview.priceNote}</p>
                    </div>
                  </div>
                </div>

                <div className="pt-4">
                  <a
                    href="#contact"
                    className="inline-block bg-white text-primary hover:bg-[#be8f74] hover:text-white border-2 border-white hover:border-[#be8f74] px-8 py-3 rounded-full font-semibold text-sm tracking-wide transition-all duration-300 shadow-lg hover:shadow-xl uppercase"
                  >
                    {content.header.bookButton}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Modal */}
      {showMapModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          onClick={() => setShowMapModal(false)}
        >
          <div className="relative max-w-6xl w-full" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setShowMapModal(false)}
              className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors"
            >
              <X className="w-8 h-8" />
            </button>
            <img
              src={content.overview.mapImage}
              alt={content.overview.mapAlt}
              className="w-full h-auto rounded-lg shadow-2xl"
            />
          </div>
        </div>
      )}
    </>
  )
}
