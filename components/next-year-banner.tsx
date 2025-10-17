'use client'

import { useLanguage } from "@/lib/language-context"
import { getCurrentCruiseConfig } from "@/lib/cruise-config"
import { ArrowRight } from "lucide-react"

export function NextYearBanner() {
  const { content } = useLanguage()
  const cruiseConfig = getCurrentCruiseConfig()

  // Показываем только если баннер включен
  if (!cruiseConfig.nextYearBanner?.enabled) {
    return null
  }

  const { url } = cruiseConfig.nextYearBanner

  return (
    <section className="py-16 md:py-24 bg-[#E2E1DC]">
      <div className="max-w-4xl mx-auto px-4">
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="group block no-underline transition-all duration-500"
        >
          <div className="flex items-center justify-between gap-8">
            <div className="flex-1">
              <h3 className="text-[32px] xl:text-[48px] font-light text-[#333333] mb-2 group-hover:text-[#BD966F] transition-colors duration-300">
                {content.footer.nextYear.title}
              </h3>
              <p className="text-[#333333]/70 text-[16px] xl:text-[18px] mb-0">
                {content.footer.nextYear.description}
              </p>
            </div>
            <div className="flex-shrink-0">
              <div className="w-12 h-12 xl:w-16 xl:h-16 rounded-full border border-[#333333]/30 flex items-center justify-center group-hover:border-[#BD966F] group-hover:bg-[#BD966F]/10 transition-all duration-300">
                <ArrowRight className="w-6 h-6 xl:w-8 xl:h-8 text-[#333333]/60 group-hover:text-[#BD966F] transition-all duration-300" />
              </div>
            </div>
          </div>
        </a>
      </div>
    </section>
  )
}
