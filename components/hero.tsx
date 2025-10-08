'use client'

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ChevronDown, Play, X } from "lucide-react"
import { useLanguage } from "@/lib/language-context"
import { BookingModal } from "./BookingModal"

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
    "элегантная экспедиция, где открытия раскрываются в комфорте вневременного дизайна и пятизвездочной роскоши.",
    "одиссея, созданная для исследователей, которые желают острых ощущений неизведанного и безмятежности истинной роскоши.",
    "где каждый рассвет открывает неизведанную красоту в обрамлении непревзойденного комфорта.",
    "бутик-экспедиционная яхта, где изысканность и дикая природа существуют в совершенной гармонии.",
    "путешествие для тех, кто считает, что приключения должны быть изысканными.",
    "где современная элегантность переносит вас через древние моря к краю света.",
    "где тишина льдов встречается с теплом гостеприимства в путешествии, не похожем ни на одно другое.",
    "редкая возможность исследовать последний рубеж Земли в бутик-изысканности.",
    "где открытие — это опыт изящества, величия и мягкого приключения.",
    "приглашение стать свидетелем нетронутого величия нашей планеты в абсолютном комфорте.",
    "симфония льда, океана и безупречного дизайна для современного исследователя.",
    "гармоничное сочетание приключений, артистизма и сдержанной элегантности.",
    "где каждый момент становится празднованием поэзии природы и человеческого любопытства.",
    "путешествие для тех, кто ищет красоту как в самом путешествии, так и в пункте назначения.",
    "где дух Шеклтона встречается с душой современной роскоши.",
    "где каждый горизонт обещает обновление, благоговение и изысканное приключение.",
    "интимное исследование для тех, кто видит в путешествии трансформацию.",
    "поэтическое путешествие в точке встречи дикой природы и изящества.",
    "где лед и небо сливаются в постоянно меняющийся шедевр.",
    "где исследование становится искусством, а роскошь ощущается как принадлежность.",
    "незабываемый баланс приключений, просветления и непринужденного стиля.",
    "где любопытство встречается с мастерством, и каждая волна несет тихое чудо.",
    "вершина современного экспедиционного круиза для смелых и взыскательных.",
    "путешествие в девственную дикую природу, окутанное изысканным европейским дизайном.",
    "экстраординарное плавание, где роскошь измеряется не в роскоши, а в благоговении.",
  ],
  en: [
    "a boutique expedition yacht designed for those who seek both adventure and refinement.",
    "where every horizon reveals a new chapter of wonder, comfort, and discovery.",
    "the state-of-the-art expedition yacht redefining modern polar exploration.",
    "an elegant expedition where discovery unfolds in the comfort of timeless design and five-star indulgence.",
    "an odyssey crafted for explorers who desire both the thrill of the unknown and the serenity of true luxury.",
    "where each sunrise reveals uncharted beauty framed by unparalleled comfort.",
    "a boutique expedition yacht where refinement and raw nature exist in perfect harmony.",
    "a journey designed for those who believe adventure should be exquisite.",
    "where modern elegance carries you across ancient seas to the edge of the world.",
    "where the silence of ice meets the warmth of hospitality in a voyage unlike any other.",
    "a rare opportunity to explore Earth's final frontier in boutique sophistication.",
    "where discovery is an experience of grace, grandeur, and gentle adventure.",
    "an invitation to witness the untouched majesty of our planet in ultimate comfort.",
    "a symphony of ice, ocean, and impeccable design for the modern explorer.",
    "a seamless blend of adventure, artistry, and understated elegance.",
    "where each moment becomes a celebration of nature's poetry and human curiosity.",
    "a voyage reserved for those who seek beauty in both the journey and the destination.",
    "where the spirit of Shackleton meets the soul of contemporary luxury.",
    "where every horizon promises renewal, awe, and refined adventure.",
    "an intimate exploration for those who see travel as transformation.",
    "a poetic voyage at the meeting point of wilderness and grace.",
    "where ice and sky merge into an ever-changing masterpiece.",
    "where exploration becomes art and luxury feels like belonging.",
    "an unforgettable balance of adventure, enlightenment, and effortless style.",
    "where curiosity meets craftsmanship and every wave carries quiet wonder.",
    "the pinnacle of modern expedition cruising for the bold and the discerning.",
    "a journey into pristine wilderness wrapped in refined European design.",
    "an extraordinary passage where luxury is measured not in opulence, but in awe.",
  ],
  zh: [
    "为寻求冒险与精致的精品探险游艇。",
    "每个地平线都揭示着奇迹、舒适和发现的新篇章。",
    "重新定义现代极地探险的最先进探险游艇。",
    "优雅的探险之旅，在永恒设计和五星级奢华的舒适中展开发现。",
    "为渴望未知刺激和真正奢华宁静的探险家精心打造的奥德赛之旅。",
    "每个日出都展现出无与伦比舒适环绕下的未知之美。",
    "精品探险游艇，精致与原始自然完美和谐共存。",
    "为相信冒险应该精致的人设计的旅程。",
    "现代优雅带您穿越古老海洋到达世界边缘。",
    "冰的寂静与热情好客的温暖在独一无二的航程中相遇。",
    "在精品复杂性中探索地球最后边疆的难得机会。",
    "发现是优雅、宏伟和温和冒险的体验。",
    "在终极舒适中见证我们星球未受触及的壮丽的邀请。",
    "为现代探险家呈现的冰、海洋和无可挑剔设计的交响乐。",
    "冒险、艺术和低调优雅的完美融合。",
    "每个时刻都成为自然诗意和人类好奇心的庆典。",
    "为在旅程和目的地都寻求美的人保留的航行。",
    "沙克尔顿的精神与当代奢华的灵魂相遇。",
    "每个地平线都承诺更新、敬畏和精致的冒险。",
    "为将旅行视为转变的人而设的亲密探索。",
    "在荒野与优雅交汇点的诗意航程。",
    "冰与天空融合成不断变化的杰作。",
    "探索成为艺术，奢华感觉像归属。",
    "冒险、启蒙和轻松风格的难忘平衡。",
    "好奇心与工艺相遇，每一波浪都带着宁静的奇迹。",
    "为大胆和挑剔者提供的现代探险巡航巅峰。",
    "进入被精致欧洲设计包裹的原始荒野的旅程。",
    "非凡的航程，奢华不以奢侈衡量，而以敬畏衡量。",
  ],
}

export function Hero() {
  const { content, language } = useLanguage()
  const [showVideoModal, setShowVideoModal] = useState(false)
  const [showBookingModal, setShowBookingModal] = useState(false)
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
          // Pause at end before deleting (13 seconds)
          setTimeout(() => setIsDeleting(true), 13000)
        }
      } else {
        // Deleting
        if (displayedText.length > 0) {
          setDisplayedText(currentFullText.slice(0, displayedText.length - 1))
          setTypingSpeed(30)
        } else {
          // Move to random next text (not the same as current)
          setIsDeleting(false)
          let nextIndex
          do {
            nextIndex = Math.floor(Math.random() * texts.length)
          } while (nextIndex === currentTextIndex && texts.length > 1)
          setCurrentTextIndex(nextIndex)
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
          {content.hero.title}
          <br />
          {content.hero.titleAccent}
        </h1>
        <div className="mt-4 transition-all duration-300 ease-in-out">
          <p className="text-lg md:text-xl text-white max-w-3xl mx-auto text-pretty">
            {staticText[language as keyof typeof staticText]}
            {displayedText}
            <span className="ml-1 inline-block animate-[pulse_2s_ease-in-out_infinite]">|</span>
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
          <button
            onClick={() => setShowBookingModal(true)}
            className="text-base px-8 py-3 rounded-md text-white border-2 border-white transition-all duration-300 font-semibold uppercase"
            style={{backgroundColor: '#004155'}}
          >
            {content.hero.bookButton}
          </button>
          <button
            onClick={() => setShowVideoModal(true)}
            className="text-base px-8 py-3 rounded-md bg-transparent text-white border-2 border-white transition-all duration-300 font-semibold uppercase inline-flex items-center gap-2"
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#004155'
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

      {/* Booking Modal */}
      <BookingModal isOpen={showBookingModal} onClose={() => setShowBookingModal(false)} />
    </section>
  )
}
