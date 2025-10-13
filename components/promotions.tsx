'use client'

import Image from "next/image"
import { useLanguage } from "@/lib/language-context"

export function Promotions() {
  const { content } = useLanguage()

  const scrollToForm = () => {
    const formElement = document.getElementById('contact')
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        {/* Title */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-light mb-6 text-balance">
            {content.promotions.title}
          </h2>
        </div>

        <div className="max-w-7xl mx-auto">
          {/* Desktop Image */}
          <div
            className="hidden md:block rounded-2xl overflow-hidden shadow-2xl cursor-pointer transition-transform hover:scale-[1.02]"
            onClick={scrollToForm}
          >
            <Image
              src="/luxury/desk.png"
              alt="Current Offer"
              width={1920}
              height={720}
              className="w-full h-auto rounded-2xl"
              sizes="(min-width: 768px) 100vw, 0vw"
              priority
            />
          </div>

          {/* Mobile Image */}
          <div
            className="block md:hidden rounded-2xl overflow-hidden shadow-2xl cursor-pointer active:scale-[0.98] transition-transform"
            onClick={scrollToForm}
          >
            <Image
              src="/luxury/mob.png"
              alt="Current Offer"
              width={1080}
              height={1920}
              className="w-full h-auto rounded-2xl"
              sizes="(max-width: 767px) 100vw, 0vw"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  )
}
