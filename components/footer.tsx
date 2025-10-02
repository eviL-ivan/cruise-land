'use client'

import { useLanguage } from "@/lib/language-context"
import Image from "next/image"

export function Footer() {
  const { content } = useLanguage()

  return (
    <footer id="contact" className="bg-primary text-primary-foreground py-16">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Logo Section */}
          <div className="mb-12 text-center md:text-left">
            <Image
              src="/logo.png"
              alt="Swan Hellenic"
              width={200}
              height={74}
              className="h-14 w-auto mx-auto md:mx-0 opacity-90"
            />
          </div>

          {/* Main Content Grid */}
          <div className="grid md:grid-cols-3 gap-12 mb-12">
            <div>
              <h3 className="text-xl font-bold mb-4 text-[#be8f74] tracking-wide uppercase">
                {content.footer.shipName}
              </h3>
              <p className="text-white/80 text-sm leading-relaxed">{content.footer.description}</p>
            </div>

            <div>
              <h4 className="text-lg font-bold mb-4 text-[#be8f74] tracking-wide uppercase">
                {content.footer.routeTitle}
              </h4>
              <ul className="space-y-2 text-sm text-white/80">
                {content.footer.routeStops.map((stop, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <span className="text-[#be8f74]">→</span>
                    {stop}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-bold mb-4 text-[#be8f74] tracking-wide uppercase">
                {content.footer.contactTitle}
              </h4>
              <p className="text-sm text-white/80 leading-relaxed mb-4">{content.footer.contactDescription}</p>
              <a
                href="#contact"
                className="inline-block bg-white text-primary hover:bg-[#be8f74] hover:text-white border-2 border-white hover:border-[#be8f74] px-6 py-2.5 rounded-full font-semibold text-sm tracking-wide transition-all duration-300 shadow-lg hover:shadow-xl uppercase"
              >
                {content.footer.contactButton}
              </a>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 border-t border-white/20">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-sm text-white/60">{content.footer.copyright}</p>
              <p className="text-sm text-white/60">
                <span className="text-[#be8f74]">Swan Hellenic</span> — Cultural Expedition Cruises
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
