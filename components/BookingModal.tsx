"use client"

import { useEffect, useRef } from "react"
import { X } from "lucide-react"
import Image from "next/image"
// import { BookingForm } from "./BookingForm" // Сохранено для будущего использования

interface BookingModalProps {
  isOpen: boolean
  onClose: () => void
}

export function BookingModal({ isOpen, onClose }: BookingModalProps) {
  const formContainerRef = useRef<HTMLDivElement>(null)
  const scriptLoadedRef = useRef(false)

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

  // Загружаем скрипт Bitrix24 формы при открытии модального окна
  useEffect(() => {
    if (!isOpen || scriptLoadedRef.current || !formContainerRef.current) return

    const script = document.createElement('script')
    script.setAttribute('data-b24-form', 'inline/19/3a5j4r')
    script.setAttribute('data-skip-moving', 'true')
    script.async = true
    script.src = `https://crm.swanhellenic.com/upload/crm/form/loader_19_3a5j4r.js?${Math.floor(Date.now() / 180000)}`

    formContainerRef.current.appendChild(script)
    scriptLoadedRef.current = true

    return () => {
      // Очистка при закрытии
      if (formContainerRef.current) {
        formContainerRef.current.innerHTML = ''
      }
      scriptLoadedRef.current = false
    }
  }, [isOpen])

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center transition-all duration-300 ${
        isOpen ? 'bg-black/70 backdrop-blur-sm pointer-events-auto' : 'bg-transparent pointer-events-none'
      }`}
      onClick={onClose}
      style={{ visibility: isOpen ? 'visible' : 'hidden', opacity: isOpen ? 1 : 0 }}
    >
      <div
        className={`relative w-full h-full sm:h-auto sm:max-w-2xl sm:mx-4 bg-white sm:rounded-xl shadow-2xl overflow-hidden transition-transform duration-300 ${
          isOpen ? 'scale-100' : 'scale-95'
        }`}
        onClick={(e) => e.stopPropagation()}
        style={{ maxHeight: '100%' }}
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-2 sm:top-4 sm:right-4 z-10 p-1.5 sm:p-2 rounded-full bg-white/90 hover:bg-white transition-colors shadow-lg"
          aria-label="Close"
        >
          <X className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700" />
        </button>

        {/* Логотип */}
        <div className="flex justify-center py-4 border-b border-gray-200">
          <Image
            src="/logo_green.svg"
            alt="Swan Hellenic"
            width={150}
            height={56}
            className="h-10 w-auto sm:h-12"
            priority
          />
        </div>

        {/* Контейнер для Bitrix24 формы */}
        <div
          ref={formContainerRef}
          className="bitrix-form-container w-full h-full sm:h-auto sm:max-h-[70vh] overflow-y-auto pb-20 sm:pb-0"
        />
      </div>
    </div>
  )
}
