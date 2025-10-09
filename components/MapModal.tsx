"use client"

import { useEffect } from "react"
import Image from "next/image"
import { X } from "lucide-react"
import { useLanguage } from "@/lib/language-context"

interface MapModalProps {
  isOpen: boolean
  onClose: () => void
  mapSrc?: string
}

export function MapModal({ isOpen, onClose, mapSrc = "/data/map.jpg" }: MapModalProps) {
  const { content } = useLanguage()

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }

    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isOpen])

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener("keydown", handleEscape)
    }

    return () => {
      document.removeEventListener("keydown", handleEscape)
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div
        className="relative w-full h-full max-w-[95vw] max-h-[95vh] flex items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-0 right-0 z-[10000] p-2 rounded-full bg-white/90 hover:bg-white transition-colors shadow-lg"
          aria-label="Close map"
        >
          <X className="w-6 h-6 text-gray-700" />
        </button>

        <div className="relative w-full h-full">
          <Image
            src={mapSrc}
            alt={content.overview.mapAlt}
            fill
            className="object-contain"
            quality={100}
          />
        </div>
      </div>
    </div>
  )
}
