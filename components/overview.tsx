'use client'

import { useLanguage } from "@/lib/language-context"

export function Overview() {
  const { content } = useLanguage()

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-[1fr_1.5fr] gap-12 items-center">
            {/* Map Image */}
            <div className="relative h-[200px] lg:h-[250px] w-full max-w-md mx-auto lg:mx-0 rounded-lg overflow-hidden shadow-2xl">
              <img
                src={content.overview.mapImage}
                alt={content.overview.mapAlt}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Cruise Details */}
            <div className="space-y-6">
              <div className="inline-block bg-secondary/20 text-secondary px-4 py-2 rounded-full text-sm font-semibold tracking-wide">
                {content.overview.cruiseCode}
              </div>

              <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground">
                {content.overview.route}
              </h2>

              <div className="grid grid-cols-2 gap-6 py-6">
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground uppercase tracking-wide">{content.overview.datesLabel}</p>
                  <p className="text-xl font-semibold text-foreground">{content.overview.dates}</p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground uppercase tracking-wide">{content.overview.durationLabel}</p>
                  <p className="text-xl font-semibold text-foreground">{content.overview.nights}</p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground uppercase tracking-wide">{content.overview.shipLabel}</p>
                  <p className="text-xl font-semibold text-foreground">{content.overview.ship}</p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground uppercase tracking-wide">{content.overview.priceLabel}</p>
                  <div>
                    <p className="text-3xl font-bold text-[#be8f74]">{content.overview.price}</p>
                    <p className="text-sm text-muted-foreground">{content.overview.priceNote}</p>
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <a
                  href="#contact"
                  className="inline-block bg-white text-primary hover:bg-[#be8f74] hover:text-white border-2 border-white hover:border-[#be8f74] px-8 py-3 rounded-full font-semibold text-sm tracking-wide transition-all duration-300 shadow-lg hover:shadow-xl uppercase"
                >
                  {content.header.bookButton}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
