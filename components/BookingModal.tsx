"use client"

import { useEffect } from "react"
import { X } from "lucide-react"

interface BookingModalProps {
  isOpen: boolean
  onClose: () => void
}

export function BookingModal({ isOpen, onClose }: BookingModalProps) {
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

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center transition-all duration-300 ${
        isOpen ? 'bg-black/70 backdrop-blur-sm pointer-events-auto' : 'bg-transparent pointer-events-none'
      }`}
      onClick={onClose}
      style={{ visibility: isOpen ? 'visible' : 'hidden', opacity: isOpen ? 1 : 0 }}
    >
      <div
        className={`relative w-full max-w-2xl mx-4 bg-white rounded-lg shadow-2xl overflow-hidden transition-transform duration-300 ${
          isOpen ? 'scale-100' : 'scale-95'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/90 hover:bg-white transition-colors shadow-lg"
          aria-label="Close"
        >
          <X className="w-6 h-6 text-gray-700" />
        </button>

        {/* iframe всегда загружен */}
        <iframe
          src="https://swanhellenc-cruise-land-vercel.bitrix24.site/crm_form_nmrul/"
          className="w-full h-[80vh] border-0"
          title="Booking Form"
        />
      </div>
    </div>
  )
}
