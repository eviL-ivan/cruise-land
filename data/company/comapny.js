export function VariationTwo() {
  return (
    <section className="min-h-screen bg-nordic-dark text-ice">
      <div className="grid lg:grid-cols-2 h-full">
        {/* Left Content */}
        <div className="flex flex-col justify-between px-8 md:px-16 lg:px-20 py-12 lg:py-16">
          <div>
            {/* Brand Mark */}
            <div className="mb-8 lg:mb-12">
              <div className="inline-block">
                <h1 className="font-serif text-sm tracking-[0.4em] uppercase text-ice/60 mb-4">
                  Swan Hellenic
                </h1>
                <div className="h-px w-full bg-ice/20" />
              </div>
            </div>

            {/* Main Content */}
            <div className="space-y-6 lg:space-y-8 max-w-xl">
              <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl leading-[1.05] text-balance">
                See What Others Don't
              </h2>

              <div className="space-y-4 lg:space-y-5 text-ice/80">
                <p className="text-base lg:text-lg leading-relaxed text-pretty">
                  Бутиковые экспедиционные круизы класса люкс, созданные для
                  тех, кто ищет смысл за горизонтом.
                </p>
                <p className="text-sm lg:text-base leading-relaxed text-pretty">
                  Наши суда ледового класса —{" "}
                  <span className="text-ice">SH Minerva</span>,{" "}
                  <span className="text-ice">SH Vega</span> и{" "}
                  <span className="text-ice">SH Diana</span> — открывают
                  Арктику, Антарктику и самые отдалённые уголки мира в атмосфере
                  северной элегантности, тишины и комфорта.
                </p>
              </div>

              {/* Philosophy Quote */}
              <div className="border-l-2 border-ice/30 pl-6 py-2">
                <p className="font-serif text-lg lg:text-xl text-ice italic text-balance">
                  Здесь роскошь — это не излишество, а искусство видеть глубже.
                </p>
              </div>
            </div>
          </div>

          {/* Awards */}
          <div className="pt-6 lg:pt-8 space-y-4">
            <div className="h-px w-full bg-ice/10" />
            <div className="grid grid-cols-2 gap-6 lg:gap-8">
              {/* Cruise Critic Award */}
              <div className="space-y-2">
                <img
                  src="/awards/cruisecritic.svg"
                  alt="Cruise Critic"
                  className="h-12 lg:h-14 w-auto opacity-70 brightness-0 invert"
                />
                <div>
                  <p className="text-xs lg:text-sm text-ice">Best in Cruise</p>
                  <p className="text-[10px] lg:text-xs text-ice/50 mt-0.5">
                    Cruise Critic 2024
                  </p>
                </div>
              </div>

              {/* Sailawaze Award */}
              <div className="space-y-2">
                <img
                  src="/awards/sailawaze.svg"
                  alt="Sailawaze"
                  className="h-12 lg:h-14 w-auto opacity-70 brightness-0 invert"
                />
                <div>
                  <p className="text-xs lg:text-sm text-ice">
                    Excursion & Collaboration Winner
                  </p>
                  <p className="text-[10px] lg:text-xs text-ice/50 mt-0.5">
                    Sailawaze 2025
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Image */}
        <div className="relative h-full">
          <img
            src="/luxury-expedition-cruise-ship-arctic-ice-elegant.jpg"
            alt="Swan Hellenic expedition vessel"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-nordic-dark/40 to-transparent" />
        </div>
      </div>
    </section>
  );
}
