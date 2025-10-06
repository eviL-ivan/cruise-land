'use client'

import { Button } from "@/components/ui/button"
import { Mail, Phone } from "lucide-react"
import { useLanguage } from "@/lib/language-context"

export function CTA() {
  const { content } = useLanguage()
  return (
    <section className="py-24 text-white" style={{backgroundColor: '#004657'}}>
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-light mb-6 text-balance text-white">
            {content.cta.title}
          </h2>
          <p className="text-xl mb-12 text-white/90 text-pretty leading-relaxed">{content.cta.subtitle}</p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <button className="text-base px-8 py-3 min-w-[200px] bg-white rounded-md transition-all duration-300 flex items-center justify-center font-semibold uppercase" style={{color: '#004657'}}>
              <Mail className="w-5 h-5 mr-2" />
              {content.cta.emailButton}
            </button>
            <button
              className="text-base px-8 py-3 min-w-[200px] bg-transparent text-white border-2 border-white rounded-md transition-all duration-300 flex items-center justify-center font-semibold uppercase"
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'white'
                e.currentTarget.style.color = '#004657'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent'
                e.currentTarget.style.color = 'white'
              }}
            >
              <Phone className="w-5 h-5 mr-2" />
              {content.cta.phoneButton}
            </button>
          </div>

          <div className="grid md:grid-cols-3 gap-8 pt-12 border-t border-white/20">
            {content.cta.stats.map((stat, index) => (
              <div key={index}>
                <div className="text-4xl font-serif font-bold mb-2 text-accent">{stat.number}</div>
                <p className="text-white/80">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
