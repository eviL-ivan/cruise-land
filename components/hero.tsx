'use client'

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ChevronDown, Play, X } from "lucide-react"
import { useLanguage } from "@/lib/language-context"

const staticText = {
  ru: "Путешествие через острова Южной Атлантики, Южную Георгию и Антарктический полуостров на борту SH Diana — ",
  en: "South Atlantic Islands, South Georgia, and the Antarctic Peninsula aboard SH Diana — ",
  zh: "南大西洋群岛、南乔治亚岛和南极半岛，乘坐 SH Diana —— ",
}

const typingTexts = {
  ru: [
    "бутик-экспедиционной яхты для тех, кто ищет приключения и изысканность.",
    "где каждый горизонт открывает новую главу чудес, комфорта и открытий.",
    "современной экспедиционной яхты, переосмысляющей полярные исследования.",
  ],
  en: [
    "a boutique expedition yacht designed for those who seek both adventure and refinement.",
    "where every horizon reveals a new chapter of wonder, comfort, and discovery.",
    "the state-of-the-art expedition yacht redefining modern polar exploration.",
  ],
  zh: [
    "为寻求冒险与精致的精品探险游艇。",
    "每个地平线都揭示着奇迹、舒适和发现的新篇章。",
    "重新定义现代极地探险的最先进探险游艇。",
  ],
}

export function Hero() {
  const { content, language } = useLanguage()
  const [showVideoModal, setShowVideoModal] = useState(false)
  const [currentTextIndex, setCurrentTextIndex] = useState(0)
  const [displayedText, setDisplayedText] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)
  const [typingSpeed, setTypingSpeed] = useState(50)

  useEffect(() => {
    const texts = typingTexts[language as keyof typeof typingTexts]
    const currentFullText = texts[currentTextIndex]

    const handleTyping = () => {
      if (!isDeleting) {
        // Typing forward
        if (displayedText.length < currentFullText.length) {
          setDisplayedText(currentFullText.slice(0, displayedText.length + 1))
          setTypingSpeed(50)
        } else {
          // Pause at end before deleting (7 seconds)
          setTimeout(() => setIsDeleting(true), 7000)
        }
      } else {
        // Deleting
        if (displayedText.length > 0) {
          setDisplayedText(currentFullText.slice(0, displayedText.length - 1))
          setTypingSpeed(30)
        } else {
          // Move to next text
          setIsDeleting(false)
          setCurrentTextIndex((prev) => (prev + 1) % texts.length)
          setTypingSpeed(50)
        }
      }
    }

    const timer = setTimeout(handleTyping, typingSpeed)
    return () => clearTimeout(timer)
  }, [displayedText, isDeleting, currentTextIndex, typingSpeed, language])

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Video */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          poster="/bg.webp"
          className="w-full h-full object-cover"
        >
          <source src={content.hero.video} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-primary/60 via-primary/40 to-primary/80" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center text-white space-y-4">
        <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-light text-balance leading-tight text-white">
          <span className="inline-block bg-primary/5 backdrop-blur-sm px-6 py-3 rounded-xl">
            {content.hero.title}
          </span>
          <br />
          <span className="inline-block bg-primary/5 backdrop-blur-sm px-6 py-3 rounded-xl mt-3">
            {content.hero.titleAccent}
          </span>
        </h1>
        <div className="inline-block bg-primary/5 backdrop-blur-sm px-6 py-3 rounded-xl mt-4 transition-all duration-300 ease-in-out">
          <p className="text-lg md:text-xl text-white/90 max-w-3xl text-pretty">
            {staticText[language as keyof typeof staticText]}
            {displayedText}
            <span className="ml-1 inline-block animate-[pulse_2s_ease-in-out_infinite]">|</span>
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
          <button className="text-base px-8 py-3 rounded-md text-white border-2 border-white transition-all duration-300 font-semibold uppercase" style={{backgroundColor: '#004657'}}>
            {content.hero.bookButton}
          </button>
          <button
            onClick={() => setShowVideoModal(true)}
            className="text-base px-8 py-3 rounded-md bg-transparent text-white border-2 border-white transition-all duration-300 font-semibold uppercase inline-flex items-center gap-2"
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#004657'
              e.currentTarget.style.borderColor = 'white'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent'
              e.currentTarget.style.borderColor = 'white'
            }}
          >
            <Play className="w-5 h-5" />
            {content.overview.experienceButton}
          </button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce">
        <ChevronDown className="w-8 h-8 text-white" />
      </div>

      {/* Video Modal */}
      {showVideoModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm animate-in fade-in duration-300"
          onClick={() => setShowVideoModal(false)}
        >
          <button
            onClick={() => setShowVideoModal(false)}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            aria-label="Close video"
          >
            <X className="w-8 h-8" />
          </button>
          <div
            className="relative w-full max-w-6xl mx-4 aspect-video animate-in zoom-in duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            <video
              src="/swan_4.webm"
              controls
              autoPlay
              preload="metadata"
              className="w-full h-full rounded-lg shadow-2xl"
            >
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      )}
    </section>
  )
}
