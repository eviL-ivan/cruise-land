'use client'

import { useState } from "react"
import { useLanguage } from "@/lib/language-context"
import { BookingModal } from "./BookingModal"
import { ContactForm } from "./ContactForm"

export function CTA() {
  const { content } = useLanguage()
  const [showBookingModal, setShowBookingModal] = useState(false)

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-light mb-6 text-balance">
            {content.cta.title}
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground text-pretty">{content.cta.subtitle}</p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Inline Contact Form */}
          <ContactForm inCard={false} />
        </div>
      </div>

      {/* Booking Modal */}
      <BookingModal isOpen={showBookingModal} onClose={() => setShowBookingModal(false)} />
    </section>
  )
}
