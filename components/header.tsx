'use client'

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useLanguage } from "@/lib/language-context"
import { ChevronDown } from "lucide-react"

const LANGUAGES = {
  ru: "RU",
  en: "EN",
  zh: "中文",
} as const

export function Header() {
  const [isLangOpen, setIsLangOpen] = useState(false)
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
    <header className="text-white py-4 sticky top-0 z-50 shadow-md backdrop-blur-sm bg-opacity-95" style={{backgroundColor: '#004657'}}>
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center transition-transform hover:scale-105">
            <Image
              src="/logo.png"
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
              className="text-sm font-medium tracking-wide text-white hover:text-[#be8f74] transition-colors duration-200 uppercase cursor-pointer"
            >
              {content.header.nav.route}
            </a>
            <a
              href="#itinerary"
              onClick={(e) => scrollToSection(e, '#itinerary')}
              className="text-sm font-medium tracking-wide text-white hover:text-[#be8f74] transition-colors duration-200 uppercase cursor-pointer"
            >
              {content.header.nav.itinerary}
            </a>
            <a
              href="#ship"
              onClick={(e) => scrollToSection(e, '#ship')}
              className="text-sm font-medium tracking-wide text-white hover:text-[#be8f74] transition-colors duration-200 uppercase cursor-pointer"
            >
              {content.header.nav.ship}
            </a>
            <a
              href="#cabins"
              onClick={(e) => scrollToSection(e, '#cabins')}
              className="text-sm font-medium tracking-wide text-white hover:text-[#be8f74] transition-colors duration-200 uppercase cursor-pointer"
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
                className="flex items-center gap-1 text-sm font-medium tracking-wide text-white hover:text-[#be8f74] transition-colors duration-200 uppercase cursor-pointer"
              >
                {LANGUAGES[language]}
                <ChevronDown className={`w-4 h-4 transition-transform ${isLangOpen ? 'rotate-180' : ''}`} />
              </button>

              {isLangOpen && (
                <div className="absolute top-full right-0 mt-2 border border-white/20 rounded-md shadow-lg overflow-hidden min-w-[80px]" style={{backgroundColor: '#004657'}}>
                  <button
                    onClick={() => handleLangChange('ru')}
                    className="block w-full text-left px-4 py-2 text-sm text-white hover:bg-white/10 transition-colors"
                  >
                    {LANGUAGES.ru}
                  </button>
                  <button
                    onClick={() => handleLangChange('en')}
                    className="block w-full text-left px-4 py-2 text-sm text-white hover:bg-white/10 transition-colors"
                  >
                    {LANGUAGES.en}
                  </button>
                  <button
                    onClick={() => handleLangChange('zh')}
                    className="block w-full text-left px-4 py-2 text-sm text-white hover:bg-white/10 transition-colors"
                  >
                    {LANGUAGES.zh}
                  </button>
                </div>
              )}
            </div>

            {/* CTA Button */}
            <a
              href="#contact"
              onClick={(e) => scrollToSection(e, '#contact')}
              className="bg-white text-primary hover:bg-[#be8f74] hover:text-white px-6 py-2.5 md:px-8 md:py-3 rounded-full font-semibold text-sm tracking-wide transition-all duration-300 border-2 border-white hover:border-[#be8f74] uppercase cursor-pointer"
            >
              {content.header.bookButton}
            </a>
          </div>
        </div>
      </div>
    </header>
  )
}
