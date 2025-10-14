'use client'

import { useLanguage } from "@/lib/language-context"
import { ImageWithBlur } from "@/components/ui/image-with-blur"
import Image from "next/image"

export function Company() {
  const { content } = useLanguage()

  return (
    <section
      className="min-h-[100svh] lg:h-[100svh] text-white"
      style={{backgroundColor: '#004155'}}
      data-snap-section-desktop="company-ship"
      data-section-index="0"
    >
      {/* Mobile: 2 screens | Desktop: 1 screen (grid) */}
      <div className="lg:grid lg:grid-cols-2 lg:h-full">
        {/* Mobile: Screen 1 - Description | Desktop: Left Column */}
        <div
          className="min-h-[100svh] lg:h-full flex flex-col justify-center px-16 py-12 lg:py-16"
          data-snap-section-mobile="company-ship"
          data-section-index="0"
        >
          <div className="relative">
            {/* Header - Fixed */}
            <div className="mb-6">
              <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-light leading-[1.05] text-balance text-white mb-4">
                {content.company.title}
              </h2>
              <div className="w-24 h-[2px] bg-gradient-to-r from-amber-400 via-amber-300 to-transparent opacity-80"></div>
            </div>

            {/* Scrollable Content */}
            <div className="max-h-[calc(100svh-200px)] md:max-h-[calc(100svh-200px)] overflow-y-auto overflow-x-hidden pr-6 scrollbar-custom">
              <div className="space-y-6 lg:space-y-8">
                <div className="space-y-4 lg:space-y-5 text-white/80">
                  <p className="text-base lg:text-lg leading-relaxed text-pretty">
                    {content.company.subtitle}
                  </p>
                  <p className="text-sm lg:text-base leading-relaxed text-pretty">
                    {content.company.description}
                  </p>
                </div>

                {/* Philosophy Quote */}
                <div className="border-l-2 border-white/30 pl-6">
                  <p className="font-serif text-lg lg:text-xl text-white italic text-balance  -mb-[16px]">
                    {content.company.quote}
                  </p>
                </div>

                {/* Awards Section - Desktop only */}
                <div className="hidden lg:block pt-6 lg:pt-8 space-y-8">
                  <div className="h-px w-full bg-white/10" />
                  <div className="flex flex-col xl:flex-row gap-6 xl:gap-8">
                    {/* Cruise Critic Award */}
                    <div className="flex items-center gap-4 xl:gap-6 flex-1">
                <div className="w-[60px] lg:w-[80px] h-[60px] lg:h-[80px] relative flex-shrink-0 bg-white/10 rounded-full flex items-center justify-center p-2 lg:p-3">
                  <Image
                    src="/awards/optimized_Best in Cruise Award Logo -1-_117x100.png"
                    alt="Best in Cruise"
                    width={60}
                    height={51}
                    className="w-full h-auto object-contain brightness-0 invert opacity-90"
                    unoptimized
                  />
                </div>
                <div className="flex flex-col gap-1 flex-1">
                  <h3 className="text-white font-medium text-sm lg:text-base leading-tight">
                    {content.company.awards.bestInCruise.title}
                  </h3>
                  <p className="text-white/60 text-xs">
                    {content.company.awards.bestInCruise.subtitle}
                  </p>
                </div>
                <div className="flex items-start gap-1.5">
                  <div className="w-[16px] lg:w-[20px] h-[24px] lg:h-[30px]">
                    <Image
                      src="/icons/winner.svg"
                      alt=""
                      width={20}
                      height={30}
                      className="w-full h-full brightness-0 invert"
                      unoptimized
                    />
                  </div>
                  <div className="w-[16px] lg:w-[20px] h-[24px] lg:h-[30px]">
                    <Image
                      src="/icons/winner.svg"
                      alt=""
                      width={20}
                      height={30}
                      className="w-full h-full scale-x-[-1] brightness-0 invert"
                      unoptimized
                    />
                  </div>
                </div>
              </div>

              {/* Sailawaze Award */}
              <div className="flex items-center gap-4 xl:gap-6 flex-1">
                <div className="w-[60px] lg:w-[80px] h-[60px] lg:h-[80px] relative flex-shrink-0 bg-white/10 rounded-full flex items-center justify-center p-2 lg:p-3">
                  <Image
                    src="/awards/optimized_Sailawaze award_117x107.png"
                    alt="Sailawaze Award"
                    width={60}
                    height={55}
                    className="w-full h-auto object-contain brightness-0 invert opacity-90"
                    unoptimized
                  />
                </div>
                <div className="flex flex-col gap-1 flex-1">
                  <h3 className="text-white font-medium text-sm lg:text-base leading-tight">
                    {content.company.awards.sailawaze.title}
                  </h3>
                  <p className="text-white/60 text-xs">
                    {content.company.awards.sailawaze.subtitle}
                  </p>
                </div>
                <div className="flex items-start gap-1.5">
                  <div className="w-[16px] lg:w-[20px] h-[24px] lg:h-[30px]">
                    <Image
                      src="/icons/winner.svg"
                      alt=""
                      width={20}
                      height={30}
                      className="w-full h-full brightness-0 invert"
                      unoptimized
                    />
                  </div>
                  <div className="w-[16px] lg:w-[20px] h-[24px] lg:h-[30px]">
                    <Image
                      src="/icons/winner.svg"
                      alt=""
                      width={20}
                      height={30}
                      className="w-full h-full scale-x-[-1] brightness-0 invert"
                      unoptimized
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

        {/* Mobile: Screen 2 - Awards + Image | Desktop: Right Image */}
        <div
          className="min-h-[100svh] lg:h-full grid grid-rows-2 lg:grid-rows-1"
          data-snap-section-mobile="company-ship"
          data-section-index="1"
        >
          {/* Awards Section - Mobile only */}
          <div className="lg:hidden flex flex-col justify-center px-16 py-12 bg-[#1a2332]">
            <div className="space-y-4">
              <div className="h-px hidden md:block w-full bg-transparent" />
              <div className="flex flex-col gap-10 md:gap-8">
                {/* Cruise Critic Award */}
                <div className="flex items-center gap-4 flex-1">
                  <div className="w-[80px] h-[80px] relative flex-shrink-0 bg-white/10 rounded-full flex items-center justify-center p-3">
                    <Image
                      src="/awards/optimized_Best in Cruise Award Logo -1-_117x100.png"
                      alt="Best in Cruise"
                      width={80}
                      height={68}
                      className="w-full h-auto object-contain brightness-0 invert opacity-90"
                      unoptimized
                    />
                  </div>
                  <div className="flex flex-col gap-1 flex-1">
                    <h3 className="text-white font-medium text-base leading-tight">
                      {content.company.awards.bestInCruise.title}
                    </h3>
                    <p className="text-white/60 text-sm">
                      {content.company.awards.bestInCruise.subtitle}
                    </p>
                  </div>
                </div>

                {/* Sailawaze Award */}
                <div className="flex items-center gap-4 flex-1">
                  <div className="w-[80px] h-[80px] relative flex-shrink-0 bg-white/10 rounded-full flex items-center justify-center p-3">
                    <Image
                      src="/awards/optimized_Sailawaze award_117x107.png"
                      alt="Sailawaze Award"
                      width={80}
                      height={73}
                      className="w-full h-auto object-contain brightness-0 invert opacity-90"
                      unoptimized
                    />
                  </div>
                  <div className="flex flex-col gap-1 flex-1">
                    <h3 className="text-white font-medium text-base leading-tight">
                      {content.company.awards.sailawaze.title}
                    </h3>
                    <p className="text-white/60 text-sm">
                      {content.company.awards.sailawaze.subtitle}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="relative h-full">
            <ImageWithBlur
              src="/ship_diana.jpg"
              alt="Swan Hellenic expedition vessel"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1a2332]/40 to-transparent z-20 pointer-events-none" />
          </div>
        </div>
      </div>
    </section>
  )
}
