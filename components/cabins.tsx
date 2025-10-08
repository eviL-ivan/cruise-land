'use client'

import { useState } from "react"
import { useLanguage } from "@/lib/language-context"
import { BookingModal } from "./BookingModal"
import { CabinCard } from "./CabinCard"
import { Sparkles } from "lucide-react"

export function Cabins() {
  const { content } = useLanguage()
  const [showBookingModal, setShowBookingModal] = useState(false)

  return (
    <section className="py-20 md:py-28 relative overflow-hidden">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-[#e8e6e5]/20 to-white" />
      <div
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #004155 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }}
      />

      <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-[#be8f74]/10 text-[#be8f74] px-4 py-2 rounded-full text-sm font-semibold tracking-wider uppercase mb-6">
            <Sparkles className="w-4 h-4" />
            <span>Your Sanctuary at Sea</span>
          </div>

          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-light mb-6 text-balance text-[#004155] tracking-tight leading-[1.1]">
            {content.cabins.title}
          </h2>

          <div className="w-16 h-px bg-gradient-to-r from-transparent via-[#be8f74] to-transparent mx-auto mb-6" />

          <p className="text-base md:text-lg text-[#6d6e71]/80 text-pretty leading-relaxed max-w-2xl mx-auto">
            {content.cabins.subtitle}
          </p>
        </div>

        {/* Cabins Grid */}
        <div className="grid grid-cols-1 gap-8 lg:gap-10 max-w-6xl mx-auto">
          {content.cabins.categories.map((cabin, index) => (
            <CabinCard
              key={index}
              cabin={cabin}
              onBook={() => setShowBookingModal(true)}
              selectButtonText={content.cabins.selectButton}
            />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <p className="text-[#6d6e71]/70 mb-6 text-sm tracking-wide">
            Need help choosing the perfect cabin?
          </p>
          <button
            onClick={() => setShowBookingModal(true)}
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full border-2 border-[#004155] text-[#004155] font-semibold text-sm tracking-wider uppercase transition-all duration-300 hover:bg-[#004155] hover:text-white shadow-[0_2px_8px_rgba(0,65,85,0.15)] hover:shadow-[0_4px_16px_rgba(0,65,85,0.25)] hover:scale-[1.02] active:scale-[0.98]"
          >
            <span>Speak with Our Expert</span>
          </button>
        </div>
      </div>

      {/* Booking Modal */}
      <BookingModal isOpen={showBookingModal} onClose={() => setShowBookingModal(false)} />
    </section>
  )
}
