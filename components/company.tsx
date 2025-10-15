'use client'

import { useLanguage } from "@/lib/language-context"
import { ImageWithBlur } from "@/components/ui/image-with-blur"
import Image from "next/image"

export function Company() {
  const { content } = useLanguage()

  return (
    <section
      className="min-h-[100svh] lg:min-h-0 py-8 lg:py-12 bg-gradient-to-br from-slate-50 via-white to-slate-50"
      data-snap-section-desktop="company-ship"
      data-section-index="0"
    >
      <div className="container mx-auto px-4">
        {/* Mobile Layout: All in One Screen */}
        <div className="lg:hidden flex flex-col py-8 space-y-6">
          {/* Header */}
          <div className="space-y-4">
            <h2 className="font-serif text-4xl md:text-5xl font-light leading-tight text-balance text-[#004155]">
              Swan Hellenic
            </h2>
            <p className="font-serif text-3xl md:text-4xl leading-relaxed text-[#004155] italic">
              {content.company.title}
            </p>
            <p className="text-sm leading-relaxed text-[#004155]">
              {content.company.subtitle}
            </p>
          </div>

          {/* Image */}
          <div className="relative h-[50vh] rounded-lg overflow-hidden shadow-2xl">
            <ImageWithBlur
              src="/shipSlider/ship_slide6.jpg"
              alt="Swan Hellenic expedition vessel"
              fill
              className="object-cover object-center"
              sizes="calc(100vw - 2rem)"
              priority
            />
          </div>

          {/* Content */}
          <div className="space-y-4">
            <p className="text-sm leading-relaxed text-[#004155]">
              {content.company.description}
            </p>

            {/* Philosophy Quote */}
            <div className="border-l-2 border-[#004155]/30 pl-4">
              <p className="font-serif text-lg text-[#004155] italic">
                {content.company.quote}
              </p>
            </div>

            {/* Awards Section */}
            <div className="pt-4 space-y-4">
              <div className="h-px w-full bg-[#004155]/20" />
              <div className="space-y-4">
                {/* Cruise Critic Award */}
                <div className="flex items-center gap-3">
                  <div className="w-[60px] h-[60px] relative flex-shrink-0 rounded-full flex items-center justify-center p-2" style={{backgroundColor: '#004155'}}>
                    <Image
                      src="/awards/optimized_Best in Cruise Award Logo -1-_117x100.png"
                      alt="Best in Cruise"
                      width={60}
                      height={51}
                      className="w-full h-auto object-contain brightness-0 invert opacity-90"
                      unoptimized
                    />
                  </div>
                  <div className="flex flex-col gap-0.5 flex-1">
                    <h3 className="text-[#004155] font-medium text-xs leading-tight">
                      {content.company.awards.bestInCruise.title}
                    </h3>
                    <p className="text-[#004155]/60 text-[10px]">
                      {content.company.awards.bestInCruise.subtitle}
                    </p>
                  </div>
                  <div className="flex items-start gap-1.5">
                    <div className="w-[14px] h-[21px]">
                      <Image
                        src="/icons/winner.svg"
                        alt=""
                        width={14}
                        height={21}
                        className="w-full h-full"
                      />
                    </div>
                    <div className="w-[14px] h-[21px]">
                      <Image
                        src="/icons/winner.svg"
                        alt=""
                        width={14}
                        height={21}
                        className="w-full h-full scale-x-[-1]"
                      />
                    </div>
                  </div>
                </div>

                {/* Sailawaze Award */}
                <div className="flex items-center gap-3">
                  <div className="w-[60px] h-[60px] flex-shrink-0 rounded-full flex items-center justify-center p-2" style={{backgroundColor: '#004155'}}>
                    <Image
                      src="/awards/optimized_Sailawaze award_117x107.png"
                      alt="Sailawaze Award"
                      width={60}
                      height={55}
                      className="w-full h-auto object-contain brightness-0 invert opacity-90"
                      unoptimized
                    />
                  </div>
                  <div className="flex flex-col gap-0.5 flex-1">
                    <h3 className="text-[#004155] font-medium text-xs leading-tight">
                      {content.company.awards.sailawaze.title}
                    </h3>
                    <p className="text-[#004155]/60 text-[10px]">
                      {content.company.awards.sailawaze.subtitle}
                    </p>
                  </div>
                  <div className="flex items-start gap-1.5">
                    <div className="w-[14px] h-[21px]">
                      <Image
                        src="/icons/winner.svg"
                        alt=""
                        width={14}
                        height={21}
                        className="w-full h-full"
                      />
                    </div>
                    <div className="w-[14px] h-[21px]">
                      <Image
                        src="/icons/winner.svg"
                        alt=""
                        width={14}
                        height={21}
                        className="w-full h-full scale-x-[-1]"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Desktop Layout: Grid */}
        <div className="hidden lg:grid lg:grid-cols-2 lg:gap-12 lg:items-stretch max-w-7xl mx-auto lg:py-8">
          {/* Desktop: Left Column - Image */}
          <div className="flex flex-col">
            <div className="relative flex-1 min-h-[500px] rounded-lg overflow-hidden shadow-2xl">
              <ImageWithBlur
                src="/shipSlider/ship_slide6.jpg"
                alt="Swan Hellenic expedition vessel"
                fill
                className="object-cover object-center"
                sizes="50vw"
                priority
              />
            </div>
          </div>

          {/* Desktop: Right Column - Content */}
          <div className="flex flex-col justify-center">
            <div className="space-y-6">
              <h2 className="font-serif text-5xl font-light leading-tight text-balance text-[#004155]">
                Swan Hellenic
              </h2>

              <p className="font-serif text-4xl leading-relaxed text-[#004155] italic">
                {content.company.title}
              </p>

              <p className="text-base leading-relaxed text-[#004155]">
                {content.company.subtitle}
              </p>

              <p className="text-base leading-relaxed text-[#004155]">
                {content.company.description}
              </p>

              {/* Philosophy Quote */}
              <div className="border-l-2 border-[#004155]/30 pl-4">
                <p className="font-serif text-xl text-[#004155] italic">
                  {content.company.quote}
                </p>
              </div>

              {/* Awards Section */}
              <div className="pt-4 space-y-4">
                <div className="h-px w-full bg-[#004155]/20" />
                <div className="grid grid-cols-2 gap-4">
                  {/* Cruise Critic Award */}
                  <div className="flex items-center gap-3">
                    <div className="w-[60px] h-[60px] relative flex-shrink-0 rounded-full flex items-center justify-center p-2" style={{backgroundColor: '#004155'}}>
                      <Image
                        src="/awards/optimized_Best in Cruise Award Logo -1-_117x100.png"
                        alt="Best in Cruise"
                        width={60}
                        height={51}
                        className="w-full h-auto object-contain brightness-0 invert opacity-90"
                        unoptimized
                      />
                    </div>
                    <div className="flex flex-col gap-0.5 flex-1">
                      <h3 className="text-[#004155] font-medium text-xs leading-tight">
                        {content.company.awards.bestInCruise.title}
                      </h3>
                      <p className="text-[#004155]/60 text-[10px]">
                        {content.company.awards.bestInCruise.subtitle}
                      </p>
                    </div>
                    <div className="flex items-start gap-1.5">
                      <div className="w-[14px] h-[21px]">
                        <Image
                          src="/icons/winner.svg"
                          alt=""
                          width={14}
                          height={21}
                          className="w-full h-full"
                        />
                      </div>
                      <div className="w-[14px] h-[21px]">
                        <Image
                          src="/icons/winner.svg"
                          alt=""
                          width={14}
                          height={21}
                          className="w-full h-full scale-x-[-1]"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Sailawaze Award */}
                  <div className="flex items-center gap-3">
                    <div className="w-[60px] h-[60px] flex-shrink-0 rounded-full flex items-center justify-center p-2" style={{backgroundColor: '#004155'}}>
                      <Image
                        src="/awards/optimized_Sailawaze award_117x107.png"
                        alt="Sailawaze Award"
                        width={60}
                        height={55}
                        className="w-full h-auto object-contain brightness-0 invert opacity-90"
                        unoptimized
                      />
                    </div>
                    <div className="flex flex-col gap-0.5 flex-1">
                      <h3 className="text-[#004155] font-medium text-xs leading-tight">
                        {content.company.awards.sailawaze.title}
                      </h3>
                      <p className="text-[#004155]/60 text-[10px]">
                        {content.company.awards.sailawaze.subtitle}
                      </p>
                    </div>
                    <div className="flex items-start gap-1.5">
                      <div className="w-[14px] h-[21px]">
                        <Image
                          src="/icons/winner.svg"
                          alt=""
                          width={14}
                          height={21}
                          className="w-full h-full"
                        />
                      </div>
                      <div className="w-[14px] h-[21px]">
                        <Image
                          src="/icons/winner.svg"
                          alt=""
                          width={14}
                          height={21}
                          className="w-full h-full scale-x-[-1]"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
