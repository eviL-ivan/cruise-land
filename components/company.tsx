'use client'

import Image from "next/image"
import { useLanguage } from "@/lib/language-context"

export function Company() {
  const { content } = useLanguage()

  return (
    <section className="min-h-screen bg-[#1a2332] text-white">
      <div className="grid lg:grid-cols-2 h-full">
        {/* Left Content */}
        <div className="flex flex-col justify-between px-8 md:px-16 lg:px-20 py-12 lg:py-16">
          <div>
            {/* Brand Mark */}
            <div className="mb-8 lg:mb-12">
              <div className="inline-block">
                <h1 className="font-serif text-sm uppercase text-white mb-4">
                  Swan Hellenic
                </h1>
                <div className="h-px w-full bg-white/20" />
              </div>
            </div>

            {/* Main Content */}
            <div className="space-y-6 lg:space-y-8 max-w-xl">
              <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-light leading-[1.05] text-balance text-white">
                {content.company.title}
              </h2>

              <div className="space-y-4 lg:space-y-5 text-white/80">
                <p className="text-base lg:text-lg leading-relaxed text-pretty">
                  {content.company.subtitle}
                </p>
                <p className="text-sm lg:text-base leading-relaxed text-pretty">
                  {content.company.description}
                </p>
              </div>

              {/* Philosophy Quote */}
              <div className="border-l-2 border-white/30 pl-6 py-2">
                <p className="font-serif text-lg lg:text-xl text-white italic text-balance">
                  {content.company.quote}
                </p>
              </div>
            </div>
          </div>

          {/* Awards Section - Compact */}
          <div className="pt-6 lg:pt-8 space-y-4">
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
                    Best in Cruise
                  </h3>
                  <p className="text-white/60 text-xs">
                    Cruise Critic 2024
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
                    Excursion & Collaboration Winner
                  </h3>
                  <p className="text-white/60 text-xs">
                    Sailawaze 2025
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

        {/* Right Image */}
        <div className="relative h-full min-h-[400px] lg:min-h-screen">
          <Image
            src="/ship_diana.jpg"
            alt="Swan Hellenic expedition vessel"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1a2332]/40 to-transparent" />
        </div>
      </div>
    </section>
  )
}
