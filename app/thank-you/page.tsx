"use client"

import { useLanguage } from "@/lib/language-context"
import Link from "next/link"
import Image from "next/image"

export default function SuccessPage() {
  const { content } = useLanguage()

  return (
    <div className="min-h-screen bg-[#004657] flex items-center justify-center p-4 py-16">
      <div className="max-w-4xl w-full">
        {/* Success Message - using existing texts */}
        <div className="text-center mb-16">
          <h1 className="text-[56px] xl:text-[80px] leading-[67.2px] xl:leading-[96px] font-light text-white mb-4">
            {content.forms.contact.success}
          </h1>
          <p className="text-white/90 text-[18px] leading-[28px] max-w-2xl mx-auto">
            {content.forms.contact.successMessage}
          </p>
        </div>

        {/* Resources Section */}
        <div className="space-y-0">
          {/* Brochure */}
          {content.overview.brochureUrl && (
            <a
              href={content.overview.brochureUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group block border-t border-white/20 py-4 no-underline transition-all duration-500"
            >
              <div className="flex items-center gap-0">
                <div className="flex-1 pr-8">
                  <h3 className="text-[24px] xl:text-[32px] font-light text-white mb-0 group-hover:text-[#BD966F] transition-colors duration-300">
                    {content.overview.brochureButton}
                  </h3>
                  <p className="text-white/60 text-[14px] xl:text-[16px] mb-0">
                    {content.thankYou.brochureDescription}
                  </p>
                </div>
                <div className="relative w-32 xl:w-48 h-24 xl:h-32 flex-shrink-0 overflow-hidden">
                  <Image
                    src="/img.png"
                    alt="Brochure preview"
                    fill
                    className="object-cover opacity-90 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500"
                  />
                </div>
              </div>
            </a>
          )}

          {/* Ship Brochure */}
          {content.ship.brochureUrl && (
            <a
              href={content.ship.brochureUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group block border-t border-white/20 py-4 no-underline transition-all duration-500"
            >
              <div className="flex items-center gap-0">
                <div className="flex-1 pr-8">
                  <h3 className="text-[24px] xl:text-[32px] font-light text-white mb-0 group-hover:text-[#BD966F] transition-colors duration-300">
                    {content.ship.brochureButton}
                  </h3>
                  <p className="text-white/60 text-[14px] xl:text-[16px] mb-0">
                    {content.thankYou.shipBrochureDescription}
                  </p>
                </div>
                <div className="relative w-32 xl:w-48 h-24 xl:h-32 flex-shrink-0 overflow-hidden">
                  <Image
                    src="/shipSlider/ship_slide5.jpg"
                    alt="Ship brochure preview"
                    fill
                    className="object-cover opacity-90 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500"
                  />
                </div>
              </div>
            </a>
          )}
        </div>

        {/* Back to Home */}
        <div className="flex justify-start pt-8 border-t border-white/20">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-2 text-white/70 hover:text-white transition-colors text-sm no-underline"
          >
            ← {content.thankYou.backToHome}
          </Link>
        </div>
      </div>
    </div>
  )
}
