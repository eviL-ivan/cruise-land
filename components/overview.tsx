'use client'

import { useState, useRef } from "react"
import Image from "next/image"
import { useLanguage } from "@/lib/language-context"
import { Map, ChevronLeft, ChevronRight, X, Play } from "lucide-react"
import { BookingModal } from "./BookingModal"

export function Overview() {
  const { content } = useLanguage()
  const [currentSlide, setCurrentSlide] = useState(0)
  const [showMapModal, setShowMapModal] = useState(false)
  const [showVideoModal, setShowVideoModal] = useState(false)
  const [showBookingModal, setShowBookingModal] = useState(false)
  const touchStartX = useRef(0)
  const touchEndX = useRef(0)

  const slideImages = content.highlights

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slideImages.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slideImages.length) % slideImages.length)
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX
  }

  const handleTouchEnd = () => {
    if (touchStartX.current - touchEndX.current > 50) {
      nextSlide()
    }
    if (touchStartX.current - touchEndX.current < -50) {
      prevSlide()
    }
  }

  return (
    <>
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Image Slider */}
              <div
                className="relative h-[450px] lg:h-[550px] w-full rounded-lg overflow-hidden shadow-2xl group"
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
              >
                <Image
                  src={slideImages[currentSlide].image}
                  alt={slideImages[currentSlide].title}
                  fill
                  sizes="(max-width: 1024px) calc(100vw - 2rem), 50vw"
                  className="object-cover transition-all duration-500"
                  loading="eager"
                />

                {/* Slide title overlay */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                  <h3 className="text-white font-serif text-3xl font-bold mb-2">
                    {slideImages[currentSlide].title}
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

                <h2 className="font-serif text-4xl md:text-5xl font-light text-foreground">
                  {content.overview.route}
                </h2>

                <div className="grid grid-cols-2 gap-6 py-4">
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground uppercase tracking-wide">{content.overview.datesLabel}</p>
                    <p className="text-xl font-normal text-foreground">{content.overview.dates}</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground uppercase tracking-wide">{content.overview.durationLabel}</p>
                    <p className="text-xl font-normal text-foreground">{content.overview.nights}</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground uppercase tracking-wide">{content.overview.shipLabel}</p>
                    <p className="text-xl font-normal text-foreground">{content.overview.ship}</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground uppercase tracking-wide">{content.overview.priceLabel}</p>
                    <div>
                      <p className="text-3xl font-normal text-[#be8f74]">{content.overview.price}</p>
                      <p className="text-sm text-muted-foreground">{content.overview.priceNote}</p>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div className="py-4 space-y-4 border-t border-border">
                  <p className="text-lg leading-relaxed text-foreground/90">
                    {content.overview.description}
                  </p>
                  <p className="text-base leading-relaxed text-muted-foreground">
                    {content.overview.detailedDescription}
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="pt-4 flex flex-wrap gap-4">
                  <button
                    onClick={() => setShowBookingModal(true)}
                    className="inline-block bg-white px-8 py-3 rounded-md font-semibold text-sm tracking-wide transition-all duration-300 shadow-lg hover:shadow-xl uppercase border-2"
                    style={{color: '#004657', borderColor: '#004657'}}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#004657'
                      e.currentTarget.style.color = 'white'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'white'
                      e.currentTarget.style.color = '#004657'
                    }}
                  >
                    {content.header.bookButton}
                  </button>
                  <button
                    onClick={() => setShowVideoModal(true)}
                    className="inline-flex items-center gap-2 px-8 py-3 rounded-md font-semibold text-sm tracking-wide transition-all duration-300 shadow-lg hover:shadow-xl uppercase border-2"
                    style={{backgroundColor: 'transparent', color: '#004657', borderColor: '#004657'}}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#004657'
                      e.currentTarget.style.color = 'white'
                      e.currentTarget.style.borderColor = '#004657'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'transparent'
                      e.currentTarget.style.color = '#004657'
                      e.currentTarget.style.borderColor = '#004657'
                    }}
                  >
                    <Play className="w-5 h-5" />
                    {content.overview.experienceButton}
                  </button>
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
            <Image
              src={content.overview.mapImage}
              alt={content.overview.mapAlt}
              width={1200}
              height={800}
              sizes="(max-width: 1536px) calc(100vw - 2rem), 1152px"
              className="w-full h-auto rounded-lg shadow-2xl"
            />
          </div>
        </div>
      )}

      {/* Video Modal */}
      {showVideoModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm animate-in fade-in duration-300"
          onClick={() => setShowVideoModal(false)}
        >
          <button
            onClick={() => setShowVideoModal(false)}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            aria-label="Close video"
          >
            <X className="w-8 h-8" />
          </button>
          <div
            className="relative w-full max-w-6xl mx-4 aspect-video animate-in zoom-in duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            <video
              src="/swan_4.webm"
              controls
              autoPlay
              preload="metadata"
              className="w-full h-full rounded-lg shadow-2xl"
            >
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      )}

      {/* Booking Modal */}
      <BookingModal isOpen={showBookingModal} onClose={() => setShowBookingModal(false)} />
    </>
  )
}
