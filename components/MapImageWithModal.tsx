"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { X } from "lucide-react"
import { useLanguage } from "@/lib/language-context"

interface MapImageWithModalProps {
  mapImageSrc: string
  modalMapSrc?: string
}

export function MapImageWithModal({
  mapImageSrc,
  modalMapSrc = "/data/map.jpg"
}: MapImageWithModalProps) {
  const { content } = useLanguage()
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }

    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isModalOpen])

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsModalOpen(false)
      }
    }

    if (isModalOpen) {
      document.addEventListener("keydown", handleEscape)
    }

    return () => {
      document.removeEventListener("keydown", handleEscape)
    }
  }, [isModalOpen])

  return (
    <>
      {/* Map Image Section */}
      <section className="py-12 bg-background" id="map">
        <div className="container mx-auto px-4">
          <div
            className="relative w-full max-w-6xl mx-auto rounded-lg overflow-hidden shadow-2xl cursor-pointer group"
            onClick={() => setIsModalOpen(true)}
          >
            <div className="relative aspect-video w-full">
              <Image
                src={mapImageSrc}
                alt={content.overview.mapAlt}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                priority
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                <div className="bg-white/90 backdrop-blur-sm px-6 py-3 rounded-full text-foreground font-semibold flex items-center gap-2 group-hover:bg-white transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                  </svg>
                  <span>{content.overview.viewFullMap}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Modal with Map Image */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="relative w-full h-full max-w-[95vw] max-h-[95vh] flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-0 right-0 z-[10000] p-2 rounded-full bg-white/90 hover:bg-white transition-colors shadow-lg"
              aria-label="Close map"
            >
              <X className="w-6 h-6 text-gray-700" />
            </button>

            <div className="relative w-full h-full">
              <Image
                src={modalMapSrc}
                alt={content.overview.mapAlt}
                fill
                className="object-contain"
                quality={100}
              />
            </div>
          </div>
        </div>
      )}
    </>
  )
}
