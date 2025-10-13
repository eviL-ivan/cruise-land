import Image from "next/image";

export function Awards() {
    return (
        <section className="relative w-full bg-white py-[72px] xl:py-[72px]">
            {/* Desktop Layout - Two Awards */}
            <div className="hidden xl:flex items-stretch justify-center">
                {/* Award 1 Container */}
                <div className="flex flex-col justify-between w-[480px] h-[248px] mr-12">
                    {/* Top: Title and Winner Icons */}
                    <div className="flex items-start justify-between gap-6">
                        <div className="flex flex-col gap-1">
                            <h3 className="text-[#005A73] font-[500] text-[28px] leading-[32px] tracking-[-0.01em]">
                                Best in Cruise
                            </h3>
                            <p className="text-[#005A73] font-[400] text-[17px] leading-[20px] tracking-[0%]">
                                Cruise Critic 2024
                            </p>
                        </div>
                        <div className="flex items-start gap-2">
                            <div className="w-[27px] h-[40px]">
                                <Image
                                    src="/icons/winner.svg"
                                    alt=""
                                    width={27}
                                    height={40}
                                    className="w-full h-full"
                                />
                            </div>
                            <div className="w-[27px] h-[40px]">
                                <Image
                                    src="/icons/winner.svg"
                                    alt=""
                                    width={27}
                                    height={40}
                                    className="w-full h-full scale-x-[-1]"
                                />
                            </div>
                        </div>
                    </div>
                    {/* Bottom: Organization Logo */}
                    <div className="w-[96px] h-[96px]">
                        <Image
                            src="/awards/cruisecritic.svg"
                            alt="Cruise Critic"
                            width={96}
                            height={96}
                            className="w-full h-full"
                        />
                    </div>
                </div>

                {/* Middle Separator */}
                <div className="w-px min-w-px bg-[#0000001A]"></div>

                {/* Award 2 Container */}
                <div className="flex flex-col justify-between w-[480px] h-[248px] ml-12">
                    {/* Top: Title and Winner Icons */}
                    <div className="flex items-start justify-between gap-6">
                        <div className="flex flex-col gap-1 max-w-[300px]">
                            <h3 className="text-[#005A73] font-[500] text-[28px] leading-[32px] tracking-[-0.01em]">
                                Excursion Winner &amp; Collaboration Winner
                            </h3>
                            <p className="text-[#005A73] font-[400] text-[17px] leading-[20px] tracking-[0%]">
                                The Sailawaze Excellence Awards 2025
                            </p>
                        </div>
                        <div className="flex items-start gap-2">
                            <div className="w-[27px] h-[40px]">
                                <Image
                                    src="/icons/winner.svg"
                                    alt=""
                                    width={27}
                                    height={40}
                                    className="w-full h-full"
                                />
                            </div>
                            <div className="w-[27px] h-[40px]">
                                <Image
                                    src="/icons/winner.svg"
                                    alt=""
                                    width={27}
                                    height={40}
                                    className="w-full h-full scale-x-[-1]"
                                />
                            </div>
                        </div>
                    </div>
                    {/* Bottom: Organization Logo */}
                    <div className="w-[96px] h-[96px]">
                        <Image
                            src="/awards/sailawaze.svg"
                            alt="Sailawaze"
                            width={96}
                            height={96}
                            className="w-full h-full"
                        />
                    </div>
                </div>
            </div>

            {/* Mobile Layout - Two Awards Stacked */}
            <div className="flex xl:hidden flex-col items-center gap-[72px] px-4">
                {/* Award 1 Container */}
                <div className="flex flex-col gap-6 w-full max-w-[480px]">
                    {/* Top: Title and Winner Icons */}
                    <div className="flex items-start justify-between gap-4">
                        <div className="flex flex-col gap-1">
                            <h3 className="text-[#005A73] font-[500] text-[24px] leading-[28px] tracking-[-0.01em]">
                                Best in Cruise
                            </h3>
                            <p className="text-[#005A73] font-[400] text-[15px] leading-[18px] tracking-[0%]">
                                Cruise Critic 2024
                            </p>
                        </div>
                        <div className="flex items-start gap-2">
                            <div className="w-[24px] h-[36px]">
                                <Image
                                    src="/icons/winner.svg"
                                    alt=""
                                    width={24}
                                    height={36}
                                    className="w-full h-full"
                                />
                            </div>
                            <div className="w-[24px] h-[36px]">
                                <Image
                                    src="/icons/winner.svg"
                                    alt=""
                                    width={24}
                                    height={36}
                                    className="w-full h-full scale-x-[-1]"
                                />
                            </div>
                        </div>
                    </div>
                    {/* Bottom: Organization Logo */}
                    <div className="w-[80px] h-[80px]">
                        <Image
                            src="/awards/cruisecritic.svg"
                            alt="Cruise Critic"
                            width={80}
                            height={80}
                            className="w-full h-full"
                        />
                    </div>
                </div>

                {/* Award 2 Container */}
                <div className="flex flex-col gap-6 w-full max-w-[480px]">
                    {/* Top: Title and Winner Icons */}
                    <div className="flex items-start justify-between gap-4">
                        <div className="flex flex-col gap-1">
                            <h3 className="text-[#005A73] font-[500] text-[24px] leading-[28px] tracking-[-0.01em]">
                                Excursion Winner &amp; Collaboration Winner
                            </h3>
                            <p className="text-[#005A73] font-[400] text-[15px] leading-[18px] tracking-[0%]">
                                The Sailawaze Excellence Awards 2025
                            </p>
                        </div>
                        <div className="flex items-start gap-2">
                            <div className="w-[24px] h-[36px]">
                                <Image
                                    src="/icons/winner.svg"
                                    alt=""
                                    width={24}
                                    height={36}
                                    className="w-full h-full"
                                />
                            </div>
                            <div className="w-[24px] h-[36px]">
                                <Image
                                    src="/icons/winner.svg"
                                    alt=""
                                    width={24}
                                    height={36}
                                    className="w-full h-full scale-x-[-1]"
                                />
                            </div>
                        </div>
                    </div>
                    {/* Bottom: Organization Logo */}
                    <div className="w-[80px] h-[80px]">
                        <Image
                            src="/awards/sailawaze.svg"
                            alt="Sailawaze"
                            width={80}
                            height={80}
                            className="w-full h-full"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
