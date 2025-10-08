'use client'

import Image from "next/image"
import { Waves, Utensils, Dumbbell, Sparkles, Ship as ShipIcon, Shield, ChevronLeft, ChevronRight } from "lucide-react"
import { useLanguage } from "@/lib/language-context"
import { useState, useEffect } from "react"

const amenityIcons = {
  "Бассейн-инфинити": Waves,
  "Infinity Pool": Waves,
  "无边泳池": Waves,
  "Высокая кухня": Utensils,
  "Fine Dining": Utensils,
  "精致餐饮": Utensils,
  "Спа-центр": Sparkles,
  "Spa Center": Sparkles,
  "水疗中心": Sparkles,
  "Тренажерный зал": Dumbbell,
  "Gym": Dumbbell,
  "健身房": Dumbbell,
  "Ледовый класс PC6": ShipIcon,
  "PC6 Ice Class": ShipIcon,
  "PC6冰级": ShipIcon,
  "Безопасность": Shield,
  "Safety": Shield,
  "安全性": Shield,
}

const sliderImages = [
  { src: "/ship_diana.jpg", alt: "SH Diana" },
  { src: "/shipSlider/ship_slide2.jpg", alt: "Ship view 2" },
  { src: "/shipSlider/ship_slide3.jpg", alt: "Ship view 3" },
  { src: "/shipSlider/ship_slide4.jpg", alt: "Ship view 4" },
  { src: "/shipSlider/ship_slide5.jpg", alt: "Ship view 5" },
  { src: "/shipSlider/ship_slide6.jpg", alt: "Ship view 6" },
]

const exteriorImages = [
  { src: "/ship_pool.jpg", alt: "Ship Pool" },
  { src: "/shipSlider/exterior/extSlide_2.jpg", alt: "Exterior 2" },
  { src: "/shipSlider/exterior/extSlide_3.jpg", alt: "Exterior 3" },
  { src: "/shipSlider/exterior/extSlide_4.jpg", alt: "Exterior 4" },
  { src: "/shipSlider/exterior/extSlide_5.jpg", alt: "Exterior 5" },
  { src: "/shipSlider/exterior/extSlide_6.jpg", alt: "Exterior 6" },
  { src: "/shipSlider/exterior/extSlide_7.jpg", alt: "Exterior 7" },
]

const interiorImages = [
  { src: "/ship_rest.jpg", alt: "Ship Restaurant" },
  { src: "/shipSlider/interior/intslide1.jpg", alt: "Interior 1" },
  { src: "/shipSlider/interior/intslide2.jpg", alt: "Interior 2" },
  { src: "/shipSlider/interior/intslide3.jpg", alt: "Interior 3" },
  { src: "/shipSlider/interior/intslide4.jpg", alt: "Interior 4" },
  { src: "/shipSlider/interior/intslide5.jpg", alt: "Interior 5" },
  { src: "/shipSlider/interior/intslide6.jpg", alt: "Interior 6" },
  { src: "/shipSlider/interior/intslide7.jpg", alt: "Interior 7" },
  { src: "/shipSlider/interior/intslide8.jpg", alt: "Interior 8" },
  { src: "/shipSlider/interior/intslide9.jpg", alt: "Interior 9" },
]

export function Ship() {
  const { content } = useLanguage()
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const [exteriorSlide, setExteriorSlide] = useState(0)
  const [isExteriorHovered, setIsExteriorHovered] = useState(false)
  const [interiorSlide, setInteriorSlide] = useState(0)
  const [isInteriorHovered, setIsInteriorHovered] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isHovered) {
        setCurrentSlide((prev) => (prev + 1) % sliderImages.length)
      }
    }, 7000)
    return () => clearInterval(interval)
  }, [isHovered])

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isExteriorHovered) {
        setExteriorSlide((prev) => (prev + 1) % exteriorImages.length)
      }
    }, 7000)
    return () => clearInterval(interval)
  }, [isExteriorHovered])

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isInteriorHovered) {
        setInteriorSlide((prev) => (prev + 1) % interiorImages.length)
      }
    }, 7000)
    return () => clearInterval(interval)
  }, [isInteriorHovered])

  const goToNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % sliderImages.length)
  }

  const goToPrevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + sliderImages.length) % sliderImages.length)
  }

  const goToNextExterior = () => {
    setExteriorSlide((prev) => (prev + 1) % exteriorImages.length)
  }

  const goToPrevExterior = () => {
    setExteriorSlide((prev) => (prev - 1 + exteriorImages.length) % exteriorImages.length)
  }

  const goToNextInterior = () => {
    setInteriorSlide((prev) => (prev + 1) % interiorImages.length)
  }

  const goToPrevInterior = () => {
    setInteriorSlide((prev) => (prev - 1 + interiorImages.length) % interiorImages.length)
  }

  return (
    <section className="py-24 text-white" style={{backgroundColor: '#004155'}}>
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
          <div>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-light mb-6 text-balance text-white">
              {content.ship.name}
            </h2>
            <p className="text-xl mb-8 text-white/90 leading-relaxed">{content.ship.description}</p>

            <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-6">
              {content.ship.amenities.map((amenity, index) => {
                return (
                  <div key={index} className="flex gap-4">
                    <div className="flex-shrink-0 mt-1">
                      <span className="text-[#be8f74] text-2xl">•</span>
                    </div>
                    <div>
                      <h3 className="font-bold mb-1 text-white">{amenity.title}</h3>
                      <p className="text-sm text-white/80">{amenity.description}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          <div className="space-y-4">
            <div
              className="relative h-[300px] rounded-lg overflow-hidden shadow-2xl group"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              {sliderImages.map((image, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 transition-opacity duration-1000 ${
                    index === currentSlide ? 'opacity-100' : 'opacity-0'
                  }`}
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    sizes="(max-width: 1024px) calc(100vw - 2rem), 50vw"
                    className="object-cover"
                  />
                </div>
              ))}

              {/* Navigation Arrows */}
              <button
                onClick={goToPrevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 hover:bg-black/70 text-white flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 z-10"
                aria-label="Previous slide"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={goToNextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 hover:bg-black/70 text-white flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 z-10"
                aria-label="Next slide"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              {/* Slider indicators */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                {sliderImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      index === currentSlide
                        ? 'bg-white w-6'
                        : 'bg-white/50 hover:bg-white/75'
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {/* Exterior Mini Slider */}
              <div
                className="relative h-[200px] rounded-lg overflow-hidden shadow-lg group"
                onMouseEnter={() => setIsExteriorHovered(true)}
                onMouseLeave={() => setIsExteriorHovered(false)}
              >
                {exteriorImages.map((image, index) => (
                  <div
                    key={index}
                    className={`absolute inset-0 transition-opacity duration-1000 ${
                      index === exteriorSlide ? 'opacity-100' : 'opacity-0'
                    }`}
                  >
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      sizes="(max-width: 1024px) calc(50vw - 1.5rem), 25vw"
                      className="object-cover"
                    />
                  </div>
                ))}

                {/* Navigation Arrows */}
                <button
                  onClick={goToPrevExterior}
                  className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/50 hover:bg-black/70 text-white flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 z-10"
                  aria-label="Previous"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={goToNextExterior}
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/50 hover:bg-black/70 text-white flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 z-10"
                  aria-label="Next"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>

                {/* Indicators */}
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1 z-10">
                  {exteriorImages.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setExteriorSlide(index)}
                      className={`w-1.5 h-1.5 rounded-full transition-all ${
                        index === exteriorSlide
                          ? 'bg-white w-4'
                          : 'bg-white/50 hover:bg-white/75'
                      }`}
                      aria-label={`Go to slide ${index + 1}`}
                    />
                  ))}
                </div>
              </div>

              {/* Interior Mini Slider */}
              <div
                className="relative h-[200px] rounded-lg overflow-hidden shadow-lg group"
                onMouseEnter={() => setIsInteriorHovered(true)}
                onMouseLeave={() => setIsInteriorHovered(false)}
              >
                {interiorImages.map((image, index) => (
                  <div
                    key={index}
                    className={`absolute inset-0 transition-opacity duration-1000 ${
                      index === interiorSlide ? 'opacity-100' : 'opacity-0'
                    }`}
                  >
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      sizes="(max-width: 1024px) calc(50vw - 1.5rem), 25vw"
                      className="object-cover"
                    />
                  </div>
                ))}

                {/* Navigation Arrows */}
                <button
                  onClick={goToPrevInterior}
                  className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/50 hover:bg-black/70 text-white flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 z-10"
                  aria-label="Previous"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={goToNextInterior}
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/50 hover:bg-black/70 text-white flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 z-10"
                  aria-label="Next"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>

                {/* Indicators */}
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1 z-10">
                  {interiorImages.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setInteriorSlide(index)}
                      className={`w-1.5 h-1.5 rounded-full transition-all ${
                        index === interiorSlide
                          ? 'bg-white w-4'
                          : 'bg-white/50 hover:bg-white/75'
                      }`}
                      aria-label={`Go to slide ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
