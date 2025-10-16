'use client'

import { useEffect, useState } from "react"
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

export function HeaderNew() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isLangOpen, setIsLangOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [showBookingModal, setShowBookingModal] = useState(false)
  const { language, setLanguage, content } = useLanguage()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0)
    }

    handleScroll()
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (e: React.MouseEvent<HTMLButtonElement>, id: string) => {
    e.preventDefault()
    setIsMobileMenuOpen(false)
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

  const navItems = [
    { title: content.header.nav.route, id: "#journey" },
    { title: content.header.nav.itinerary, id: "#premium-itinerary" },
    { title: content.header.nav.ship, id: "#ship" },
    { title: content.header.nav.cabins, id: "#cabins" },
  ]

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 w-full transition-colors duration-300 ${
          isScrolled || isMobileMenuOpen ? "bg-[#2F2F2F]" : "bg-transparent"
        }`}
      >
        {/* Desktop Navigation */}
        <div className="hidden xl:flex items-end justify-center gap-x-12 px-6 py-6 relative">
          {/* Left nav items */}
          <nav className="flex items-center gap-x-8">
            {navItems.slice(0, 2).map((item) => (
              <button
                key={item.title}
                type="button"
                onClick={(e) => scrollToSection(e, item.id)}
                className="font-display header-nav-text header-nav-text text-white hover:text-white/80 uppercase text-[14px] leading-[16px] tracking-[0.05em] transition-colors cursor-pointer"
              >
                {item.title}
              </button>
            ))}
          </nav>

          {/* Logo */}
          <Link href="/" className="flex items-center transition-transform hover:scale-105">
            <Image
              src="/logo-white.svg"
              alt="Swan Hellenic"
              width={168}
              height={40}
              priority
              className="min-w-[168px] min-h-[40px]"
            />
          </Link>

          {/* Right nav items */}
          <nav className="flex items-center gap-x-8">
            {navItems.slice(2).map((item) => (
              <button
                key={item.title}
                type="button"
                onClick={(e) => scrollToSection(e, item.id)}
                className="font-display header-nav-text header-nav-text text-white hover:text-white/80 uppercase text-[14px] leading-[16px] tracking-[0.05em] transition-colors cursor-pointer"
              >
                {item.title}
              </button>
            ))}
          </nav>

          {/* Language & CTA - Absolute positioned */}
          <div className="absolute right-6 bottom-6 flex items-center gap-4">
            {/* Language Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsLangOpen(!isLangOpen)}
                className="font-display header-nav-text flex items-center gap-1 text-white hover:text-white/80 uppercase font-normal text-[14px] leading-[16px] tracking-[0.05em] transition-colors"
              >
                {LANGUAGES[language]}
                <ChevronDown className={`w-4 h-4 transition-transform ${isLangOpen ? 'rotate-180' : ''}`} />
              </button>

              {isLangOpen && (
                <div className="absolute top-full right-0 mt-2 bg-[#2F2F2F] border border-white/20 rounded-md shadow-lg overflow-hidden min-w-[80px] z-50">
                  <button
                    onClick={() => handleLangChange('ru')}
                    className="font-display header-nav-text block w-full text-left px-4 py-2 text-sm text-white hover:bg-white/10 transition-colors"
                  >
                    {LANGUAGES.ru}
                  </button>
                  <button
                    onClick={() => handleLangChange('en')}
                    className="font-display header-nav-text block w-full text-left px-4 py-2 text-sm text-white hover:bg-white/10 transition-colors"
                  >
                    {LANGUAGES.en}
                  </button>
                  <button
                    onClick={() => handleLangChange('zh')}
                    className="font-display header-nav-text block w-full text-left px-4 py-2 text-sm text-white hover:bg-white/10 transition-colors"
                  >
                    {LANGUAGES.zh}
                  </button>
                </div>
              )}
            </div>

            {/* CTA Button */}
            <button
              onClick={() => setShowBookingModal(true)}
              className="font-display header-nav-text px-6 py-2 border-2 border-white text-white rounded-md font-normal text-sm tracking-wide transition-all duration-300 uppercase hover:bg-white hover:text-[#2F2F2F] whitespace-nowrap"
            >
              {content.header.bookButton}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="xl:hidden flex flex-col px-4 py-4">
          <div className="flex items-center justify-between w-full">
            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-white hover:text-white/80 transition-colors"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            {/* Logo */}
            <Link href="/" className="flex items-center transition-transform hover:scale-105">
              <Image
                src="/logo-white.svg"
                alt="Swan Hellenic"
                width={126}
                height={30}
                priority
                className="min-w-[126px] min-h-[30px]"
              />
            </Link>

            {/* Booking Button Mobile */}
            <button
              onClick={() => setShowBookingModal(true)}
              className="font-display header-nav-text p-2 px-3 border border-white text-white rounded-md font-normal text-xs tracking-wide transition-all duration-300 uppercase hover:bg-white hover:text-[#2F2F2F]"
            >
              {content.header.bookButton}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="mt-6 pb-4 border-t border-white/20 pt-6">
              <nav className="flex flex-col gap-4">
                {navItems.map((item) => (
                  <button
                    key={item.title}
                    type="button"
                    onClick={(e) => scrollToSection(e, item.id)}
                    className="font-display header-nav-text header-nav-text text-white hover:text-white/80 uppercase text-[13px] leading-[16px] tracking-[0.05em] transition-colors text-left cursor-pointer"
                  >
                    {item.title}
                  </button>
                ))}

                {/* Language Switcher - Mobile */}
                <div className="border-t border-white/20 pt-4 mt-2">
                  <p className="font-display header-nav-text text-xs font-normal tracking-wide uppercase mb-3 text-white/60">
                    Language
                  </p>
                  <div className="flex gap-3">
                    <button
                      onClick={() => {
                        handleLangChange('ru')
                        setIsMobileMenuOpen(false)
                      }}
                      className={`font-display px-4 py-2 text-sm font-normal rounded-md transition-all ${
                        language === 'ru' ? 'bg-white text-[#2F2F2F]' : 'bg-white/10 text-white hover:bg-white/20'
                      }`}
                    >
                      {LANGUAGES.ru}
                    </button>
                    <button
                      onClick={() => {
                        handleLangChange('en')
                        setIsMobileMenuOpen(false)
                      }}
                      className={`font-display px-4 py-2 text-sm font-normal rounded-md transition-all ${
                        language === 'en' ? 'bg-white text-[#2F2F2F]' : 'bg-white/10 text-white hover:bg-white/20'
                      }`}
                    >
                      {LANGUAGES.en}
                    </button>
                    <button
                      onClick={() => {
                        handleLangChange('zh')
                        setIsMobileMenuOpen(false)
                      }}
                      className={`font-display px-4 py-2 text-sm font-normal rounded-md transition-all ${
                        language === 'zh' ? 'bg-white text-[#2F2F2F]' : 'bg-white/10 text-white hover:bg-white/20'
                      }`}
                    >
                      {LANGUAGES.zh}
                    </button>
                  </div>
                </div>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Booking Modal */}
      <BookingModal isOpen={showBookingModal} onClose={() => setShowBookingModal(false)} />
    </>
  )
}
