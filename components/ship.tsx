'use client'

import Image from "next/image"
import { Waves, Utensils, Dumbbell, Sparkles, Ship as ShipIcon, Shield, ChevronLeft, ChevronRight } from "lucide-react"
import { useLanguage } from "@/lib/language-context"
import { useState, useMemo, useCallback } from "react"
import { useEmblaSlider } from "@/hooks/useEmblaSlider"
import { MediaGalleryDialog } from "./MediaGalleryDialog"

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
  const [isGalleryOpen, setIsGalleryOpen] = useState(false)
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)

  // Memoize all ship images for gallery (all three sliders combined)
  const allShipImages = useMemo(
    () => [...sliderImages, ...exteriorImages, ...interiorImages].map(img => img.src),
    []
  )

  // Main slider
  const {
    emblaRef: mainEmblaRef,
    selectedIndex: mainSelectedIndex,
    scrollPrev: mainScrollPrev,
    scrollNext: mainScrollNext,
    scrollTo: mainScrollTo,
    touchHandlers: mainTouchHandlers,
  } = useEmblaSlider({
    autoplay: false,
    loop: true,
  })

  // Exterior slider (no autoplay)
  const {
    emblaRef: exteriorEmblaRef,
    selectedIndex: exteriorSelectedIndex,
    scrollPrev: exteriorScrollPrev,
    scrollNext: exteriorScrollNext,
    scrollTo: exteriorScrollTo,
    touchHandlers: exteriorTouchHandlers,
  } = useEmblaSlider({
    autoplay: false,
    loop: true,
  })

  // Interior slider (no autoplay)
  const {
    emblaRef: interiorEmblaRef,
    selectedIndex: interiorSelectedIndex,
    scrollPrev: interiorScrollPrev,
    scrollNext: interiorScrollNext,
    scrollTo: interiorScrollTo,
    touchHandlers: interiorTouchHandlers,
  } = useEmblaSlider({
    autoplay: false,
    loop: true,
  })

  // Gallery handlers
  const handleOpenGallery = useCallback((sourceOffset: number, localIndex: number) => {
    const globalIndex = sourceOffset + localIndex
    setSelectedImageIndex(globalIndex)
    setIsGalleryOpen(true)
  }, [])

  const handleCloseGallery = useCallback(() => {
    setIsGalleryOpen(false)
  }, [])

  const handleGalleryIndexChange = useCallback(
    (index: number) => {
      setSelectedImageIndex(index)

      // Sync with appropriate slider based on global index
      if (index < sliderImages.length) {
        mainScrollTo(index)
      } else if (index < sliderImages.length + exteriorImages.length) {
        exteriorScrollTo(index - sliderImages.length)
      } else {
        interiorScrollTo(index - sliderImages.length - exteriorImages.length)
      }
    },
    [mainScrollTo, exteriorScrollTo, interiorScrollTo]
  )

  return (
    <>
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
              {/* Main Slider */}
              <div className="relative h-[300px] rounded-lg overflow-hidden shadow-2xl group">
                <div className="embla h-full" ref={mainEmblaRef}>
                  <div className="embla__container h-full" {...mainTouchHandlers}>
                    {sliderImages.map((image, index) => {
                      const isCurrentSlide = index === mainSelectedIndex
                      const isNextSlide = index === (mainSelectedIndex + 1) % sliderImages.length

                      return (
                        <div
                          key={index}
                          className="embla__slide relative min-w-0 flex-[0_0_100%] cursor-pointer"
                          onClick={() => handleOpenGallery(0, index)}
                        >
                          <Image
                            src={image.src}
                            alt={image.alt}
                            fill
                            sizes="(max-width: 1024px) calc(100vw - 2rem), 50vw"
                            className="object-cover"
                            {...(index === 0
                              ? { priority: true }
                              : { loading: isCurrentSlide || isNextSlide ? "eager" : "lazy" }
                            )}
                          />
                        </div>
                      )
                    })}
                  </div>
                </div>

                {/* Navigation Arrows */}
                <button
                  onClick={mainScrollPrev}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 hover:bg-black/70 text-white flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 z-10"
                  aria-label="Previous slide"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={mainScrollNext}
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
                      onClick={() => mainScrollTo(index)}
                      className={`w-2 h-2 rounded-full transition-all ${
                        index === mainSelectedIndex
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
                <div className="relative h-[200px] rounded-lg overflow-hidden shadow-lg group">
                  <div className="embla h-full" ref={exteriorEmblaRef}>
                    <div className="embla__container h-full" {...exteriorTouchHandlers}>
                      {exteriorImages.map((image, index) => {
                        const isCurrentSlide = index === exteriorSelectedIndex
                        const isNextSlide = index === (exteriorSelectedIndex + 1) % exteriorImages.length

                        return (
                          <div
                            key={index}
                            className="embla__slide relative min-w-0 flex-[0_0_100%] cursor-pointer"
                            onClick={() => handleOpenGallery(sliderImages.length, index)}
                          >
                            <Image
                              src={image.src}
                              alt={image.alt}
                              fill
                              sizes="(max-width: 1024px) calc(50vw - 1.5rem), 25vw"
                              className="object-cover"
                              loading={isCurrentSlide || isNextSlide ? "eager" : "lazy"}
                            />
                          </div>
                        )
                      })}
                    </div>
                  </div>

                  {/* Navigation Arrows */}
                  <button
                    onClick={exteriorScrollPrev}
                    className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/50 hover:bg-black/70 text-white flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 z-10"
                    aria-label="Previous"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={exteriorScrollNext}
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
                        onClick={() => exteriorScrollTo(index)}
                        className={`w-1.5 h-1.5 rounded-full transition-all ${
                          index === exteriorSelectedIndex
                            ? 'bg-white w-4'
                            : 'bg-white/50 hover:bg-white/75'
                        }`}
                        aria-label={`Go to slide ${index + 1}`}
                      />
                    ))}
                  </div>
                </div>

                {/* Interior Mini Slider */}
                <div className="relative h-[200px] rounded-lg overflow-hidden shadow-lg group">
                  <div className="embla h-full" ref={interiorEmblaRef}>
                    <div className="embla__container h-full" {...interiorTouchHandlers}>
                      {interiorImages.map((image, index) => {
                        const isCurrentSlide = index === interiorSelectedIndex
                        const isNextSlide = index === (interiorSelectedIndex + 1) % interiorImages.length

                        return (
                          <div
                            key={index}
                            className="embla__slide relative min-w-0 flex-[0_0_100%] cursor-pointer"
                            onClick={() => handleOpenGallery(sliderImages.length + exteriorImages.length, index)}
                          >
                            <Image
                              src={image.src}
                              alt={image.alt}
                              fill
                              sizes="(max-width: 1024px) calc(50vw - 1.5rem), 25vw"
                              className="object-cover"
                              loading={isCurrentSlide || isNextSlide ? "eager" : "lazy"}
                            />
                          </div>
                        )
                      })}
                    </div>
                  </div>

                  {/* Navigation Arrows */}
                  <button
                    onClick={interiorScrollPrev}
                    className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/50 hover:bg-black/70 text-white flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 z-10"
                    aria-label="Previous"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={interiorScrollNext}
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
                        onClick={() => interiorScrollTo(index)}
                        className={`w-1.5 h-1.5 rounded-full transition-all ${
                          index === interiorSelectedIndex
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

      {/* Fullscreen Image Gallery */}
      <MediaGalleryDialog
        isOpen={isGalleryOpen}
        onClose={handleCloseGallery}
        media={allShipImages}
        initialIndex={selectedImageIndex}
        cabinName="SH Diana"
        imageCount={allShipImages.length}
        onIndexChange={handleGalleryIndexChange}
      />
    </>
  )
}
