'use client'

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useLanguage } from "@/lib/language-context"
import { ChevronDown } from "lucide-react"
import { BookingModal } from "./BookingModal"

const LANGUAGES = {
  ru: "RU",
  en: "EN",
  zh: "中文",
} as const

export function Header() {
  const [isLangOpen, setIsLangOpen] = useState(false)
  const [showBookingModal, setShowBookingModal] = useState(false)
  const { language, setLanguage, content } = useLanguage()

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault()
    const element = document.querySelector(id)
    if (element) {
      const headerOffset = 80
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
    }
  }

  const handleLangChange = (lang: keyof typeof LANGUAGES) => {
    setLanguage(lang)
    setIsLangOpen(false)
  }

  return (
    <header className="bg-white py-4 sticky top-0 z-50 shadow-md" style={{color: '#004657'}}>
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center transition-transform hover:scale-105">
            <Image
              src="/logo_green.png"
              alt="Swan Hellenic"
              width={180}
              height={67}
              className="h-12 w-auto md:h-14"
              priority
            />
          </Link>

          {/* Navigation */}
          <nav className="hidden lg:flex items-center gap-8 xl:gap-10">
            <a
              href="#journey"
              onClick={(e) => scrollToSection(e, '#journey')}
              className="text-sm font-medium tracking-wide hover:text-[#be8f74] transition-colors duration-200 uppercase cursor-pointer"
              style={{color: '#004657'}}
            >
              {content.header.nav.route}
            </a>
            <a
              href="#itinerary"
              onClick={(e) => scrollToSection(e, '#itinerary')}
              className="text-sm font-medium tracking-wide hover:text-[#be8f74] transition-colors duration-200 uppercase cursor-pointer"
              style={{color: '#004657'}}
            >
              {content.header.nav.itinerary}
            </a>
            <a
              href="#ship"
              onClick={(e) => scrollToSection(e, '#ship')}
              className="text-sm font-medium tracking-wide hover:text-[#be8f74] transition-colors duration-200 uppercase cursor-pointer"
              style={{color: '#004657'}}
            >
              {content.header.nav.ship}
            </a>
            <a
              href="#cabins"
              onClick={(e) => scrollToSection(e, '#cabins')}
              className="text-sm font-medium tracking-wide hover:text-[#be8f74] transition-colors duration-200 uppercase cursor-pointer"
              style={{color: '#004657'}}
            >
              {content.header.nav.cabins}
            </a>
          </nav>

          {/* Language Switcher & CTA Button */}
          <div className="flex items-center gap-4">
            {/* Language Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsLangOpen(!isLangOpen)}
                className="flex items-center gap-1 text-sm font-medium tracking-wide hover:text-[#be8f74] transition-colors duration-200 uppercase cursor-pointer"
                style={{color: '#004657'}}
              >
                {LANGUAGES[language]}
                <ChevronDown className={`w-4 h-4 transition-transform ${isLangOpen ? 'rotate-180' : ''}`} />
              </button>

              {isLangOpen && (
                <div className="absolute top-full right-0 mt-2 bg-white border rounded-md shadow-lg overflow-hidden min-w-[80px]" style={{borderColor: '#004657'}}>
                  <button
                    onClick={() => handleLangChange('ru')}
                    className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 transition-colors"
                    style={{color: '#004657'}}
                  >
                    {LANGUAGES.ru}
                  </button>
                  <button
                    onClick={() => handleLangChange('en')}
                    className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 transition-colors"
                    style={{color: '#004657'}}
                  >
                    {LANGUAGES.en}
                  </button>
                  <button
                    onClick={() => handleLangChange('zh')}
                    className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 transition-colors"
                    style={{color: '#004657'}}
                  >
                    {LANGUAGES.zh}
                  </button>
                </div>
              )}
            </div>

            {/* CTA Button */}
            <button
              onClick={() => setShowBookingModal(true)}
              className="bg-white px-4 py-2 md:px-8 md:py-3 rounded-md font-semibold text-xs md:text-sm tracking-wide transition-all duration-300 border-2 uppercase cursor-pointer"
              style={{color: '#004657', borderColor: '#004657'}}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#004657'
                e.currentTarget.style.borderColor = '#004657'
                e.currentTarget.style.color = 'white'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'white'
                e.currentTarget.style.borderColor = '#004657'
                e.currentTarget.style.color = '#004657'
              }}
            >
              {content.header.bookButton}
            </button>
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      <BookingModal isOpen={showBookingModal} onClose={() => setShowBookingModal(false)} />
    </header>
  )
}
