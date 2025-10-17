'use client'

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useLanguage } from "@/lib/language-context"
import { ChevronDown, Menu, X } from "lucide-react"
import { BookingModal } from "./BookingModal"

const LANGUAGES = {
  ru: "RU",
  en: "EN",
  zh: "中文",
} as const

export function Header() {
  const [isLangOpen, setIsLangOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [showBookingModal, setShowBookingModal] = useState(false)
  const { language, setLanguage, content } = useLanguage()

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault()
    setIsMobileMenuOpen(false)
    const element = document.querySelector(id)
    if (element) {
      const headerOffset = 72
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
    <>
      <header className="bg-white py-4 sticky top-0 z-50 shadow-md" style={{color: '#004155'}}>
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between">
            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 hover:bg-gray-100 rounded-md transition-colors"
              style={{color: '#004155'}}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            {/* Logo */}
            <Link href="/" className="flex items-center transition-transform hover:scale-105">
              <Image
                src="/logo_green.svg"
                alt="Swan Hellenic"
                width={180}
                height={67}
                className="h-9 w-auto xl:h-10"
                priority
              />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8 xl:gap-10">
            <a
              href="#route"
              onClick={(e) => scrollToSection(e, '#route')}
              className="text-sm font-medium tracking-wide hover:text-[#be8f74] transition-colors duration-200 uppercase cursor-pointer"
              style={{color: '#004155'}}
            >
              {content.header.nav.route}
            </a>
            <a
              href="#premium-itinerary"
              onClick={(e) => scrollToSection(e, '#premium-itinerary')}
              className="text-sm font-medium tracking-wide hover:text-[#be8f74] transition-colors duration-200 uppercase cursor-pointer"
              style={{color: '#004155'}}
            >
              {content.header.nav.itinerary}
            </a>
            <a
              href="#ship"
              onClick={(e) => scrollToSection(e, '#ship')}
              className="text-sm font-medium tracking-wide hover:text-[#be8f74] transition-colors duration-200 uppercase cursor-pointer"
              style={{color: '#004155'}}
            >
              {content.header.nav.ship}
            </a>
            <a
              href="#cabins"
              onClick={(e) => scrollToSection(e, '#cabins')}
              className="text-sm font-medium tracking-wide hover:text-[#be8f74] transition-colors duration-200 uppercase cursor-pointer"
              style={{color: '#004155'}}
            >
              {content.header.nav.cabins}
            </a>
          </nav>

          {/* Language Switcher & CTA Button */}
          <div className="flex items-center gap-2 lg:gap-4">
            {/* Language Dropdown - Desktop Only */}
            <div className="relative hidden lg:block">
              <button
                onClick={() => setIsLangOpen(!isLangOpen)}
                className="flex items-center gap-1 text-sm font-medium tracking-wide hover:text-[#be8f74] transition-colors duration-200 uppercase cursor-pointer"
                style={{color: '#004155'}}
              >
                {LANGUAGES[language]}
                <ChevronDown className={`w-4 h-4 transition-transform ${isLangOpen ? 'rotate-180' : ''}`} />
              </button>

              {isLangOpen && (
                <div className="absolute top-full right-0 mt-2 bg-white border rounded-md shadow-lg overflow-hidden min-w-[80px] z-50" style={{borderColor: '#004155'}}>
                  <button
                    onClick={() => handleLangChange('ru')}
                    className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 transition-colors"
                    style={{color: '#004155'}}
                  >
                    {LANGUAGES.ru}
                  </button>
                  <button
                    onClick={() => handleLangChange('en')}
                    className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 transition-colors"
                    style={{color: '#004155'}}
                  >
                    {LANGUAGES.en}
                  </button>
                  <button
                    onClick={() => handleLangChange('zh')}
                    className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 transition-colors"
                    style={{color: '#004155'}}
                  >
                    {LANGUAGES.zh}
                  </button>
                </div>
              )}
            </div>

            {/* CTA Button */}
            <button
              onClick={() => setShowBookingModal(true)}
              className="bg-white p-2 lg:px-8 lg:py-2 rounded-md font-semibold text-xs lg:text-sm tracking-wide transition-all duration-300 border-2 uppercase cursor-pointer whitespace-nowrap"
              style={{color: '#004155', borderColor: '#004155'}}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#004155'
                e.currentTarget.style.borderColor = '#004155'
                e.currentTarget.style.color = 'white'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'white'
                e.currentTarget.style.borderColor = '#004155'
                e.currentTarget.style.color = '#004155'
              }}
            >
              <span className="lg:inline hidden">{content.header.bookButton}</span>
              <span className="lg:hidden">{content.header.bookButton}</span>
            </button>
          </div>
            </div>

            {/* Mobile Navigation Menu */}
            {isMobileMenuOpen && (
              <nav className="lg:hidden mt-4 pb-4 border-t pt-4" style={{borderColor: '#0041551A'}}>
                <div className="flex flex-col gap-4">
              <a
                href="#route"
                onClick={(e) => scrollToSection(e, '#route')}
                className="text-sm font-medium tracking-wide hover:text-[#be8f74] transition-colors duration-200 uppercase cursor-pointer py-2"
                style={{color: '#004155'}}
              >
                {content.header.nav.route}
              </a>
              <a
                href="#premium-itinerary"
                onClick={(e) => scrollToSection(e, '#premium-itinerary')}
                className="text-sm font-medium tracking-wide hover:text-[#be8f74] transition-colors duration-200 uppercase cursor-pointer py-2"
                style={{color: '#004155'}}
              >
                {content.header.nav.itinerary}
              </a>
              <a
                href="#ship"
                onClick={(e) => scrollToSection(e, '#ship')}
                className="text-sm font-medium tracking-wide hover:text-[#be8f74] transition-colors duration-200 uppercase cursor-pointer py-2"
                style={{color: '#004155'}}
              >
                {content.header.nav.ship}
              </a>
              <a
                href="#cabins"
                onClick={(e) => scrollToSection(e, '#cabins')}
                className="text-sm font-medium tracking-wide hover:text-[#be8f74] transition-colors duration-200 uppercase cursor-pointer py-2"
                style={{color: '#004155'}}
              >
                {content.header.nav.cabins}
              </a>

              {/* Language Switcher - Mobile Only */}
              <div className="border-t pt-4 mt-2" style={{borderColor: '#0041551A'}}>
                <p className="text-xs font-medium tracking-wide uppercase mb-3" style={{color: '#00415599'}}>
                  Language
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      handleLangChange('ru')
                      setIsMobileMenuOpen(false)
                    }}
                    className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${
                      language === 'ru' ? 'bg-[#004155] text-white' : 'bg-gray-100 hover:bg-gray-200'
                    }`}
                    style={language !== 'ru' ? {color: '#004155'} : {}}
                  >
                    {LANGUAGES.ru}
                  </button>
                  <button
                    onClick={() => {
                      handleLangChange('en')
                      setIsMobileMenuOpen(false)
                    }}
                    className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${
                      language === 'en' ? 'bg-[#004155] text-white' : 'bg-gray-100 hover:bg-gray-200'
                    }`}
                    style={language !== 'en' ? {color: '#004155'} : {}}
                  >
                    {LANGUAGES.en}
                  </button>
                  <button
                    onClick={() => {
                      handleLangChange('zh')
                      setIsMobileMenuOpen(false)
                    }}
                    className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${
                      language === 'zh' ? 'bg-[#004155] text-white' : 'bg-gray-100 hover:bg-gray-200'
                    }`}
                    style={language !== 'zh' ? {color: '#004155'} : {}}
                  >
                    {LANGUAGES.zh}
                  </button>
                </div>
              </div>
            </div>
              </nav>
            )}
          </div>
        </div>
      </header>

      {/* Booking Modal */}
      <BookingModal isOpen={showBookingModal} onClose={() => setShowBookingModal(false)} />
    </>
  )
}
