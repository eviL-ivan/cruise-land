'use client'

import { Button } from "@/components/ui/button"
import { Mail, Phone } from "lucide-react"
import { useLanguage } from "@/lib/language-context"

export function CTA() {
  const { content } = useLanguage()
  return (
    <section className="py-24 bg-gradient-to-br from-primary via-primary to-secondary text-primary-foreground">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-balance">
            {content.cta.title}
          </h2>
          <p className="text-xl mb-12 text-primary-foreground/90 text-pretty leading-relaxed">{content.cta.subtitle}</p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button size="lg" className="text-lg px-8 py-6 min-w-[200px] bg-white text-primary hover:bg-[#be8f74] hover:text-white transition-all duration-300">
              <Mail className="w-5 h-5 mr-2" />
              {content.cta.emailButton}
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-lg px-8 py-6 min-w-[200px] bg-transparent text-primary-foreground border-primary-foreground hover:bg-primary-foreground hover:text-primary"
            >
              <Phone className="w-5 h-5 mr-2" />
              {content.cta.phoneButton}
            </Button>
          </div>

          <div className="grid md:grid-cols-3 gap-8 pt-12 border-t border-primary-foreground/20">
            {content.cta.stats.map((stat, index) => (
              <div key={index}>
                <div className="text-4xl font-serif font-bold mb-2 text-accent">{stat.number}</div>
                <p className="text-primary-foreground/80">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
