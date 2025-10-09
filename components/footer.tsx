'use client'

import { useState } from "react"
import { useLanguage } from "@/lib/language-context"
import Image from "next/image"
import { ChevronDown } from "lucide-react"

const SocialIcon = ({ name }: { name: string }) => {
  const icons = {
    facebook: (
      <svg viewBox="0 0 21 21" width="21px" height="21px" fill="currentColor">
        <path d="M18.375 0H2.625C1.17525 0 0 1.17525 0 2.625V18.375C0 19.8247 1.17525 21 2.625 21H11.25V12.9375H8.53125V9.84375H11.25V7.4375C11.25 4.74113 12.9319 3.28125 15.3506 3.28125C16.5169 3.28125 17.5219 3.37162 17.8125 3.40988V6.21562L16.065 6.21562C14.6869 6.21562 14.4375 6.87187 14.4375 7.875V9.84375H17.7188L17.0625 12.9375H14.4375V21H18.375C19.8247 21 21 19.8247 21 18.375V2.625C21 1.17525 19.8247 0 18.375 0Z" />
      </svg>
    ),
    instagram: (
      <svg viewBox="0 0 21 21" width="21px" height="21px" fill="currentColor">
        <path d="M10.5 0C7.64063 0 7.28438 0.0131254 6.17813 0.0656254C5.07375 0.118125 4.31813 0.30375 3.66188 0.57375C2.98125 0.85125 2.40375 1.21875 1.82813 1.79438C1.25063 2.37188 0.883125 2.94938 0.60375 3.62813C0.331875 4.28438 0.14625 5.04188 0.0956254 6.14625C0.04125 7.25063 0.0281253 7.60688 0.0281253 10.4681C0.0281253 13.3294 0.04125 13.6838 0.09375 14.79C0.14625 15.8944 0.331875 16.65 0.60375 17.3063C0.883125 17.9869 1.25063 18.5644 1.82813 19.14C2.40375 19.7175 2.98125 20.0869 3.66 20.3644C4.31813 20.6344 5.07375 20.82 6.17625 20.8725C7.2825 20.925 7.63875 20.9381 10.4981 20.9381C13.3594 20.9381 13.7138 20.925 14.82 20.8725C15.9244 20.82 16.6819 20.6344 17.34 20.3644C18.0188 20.0869 18.5944 19.7175 19.17 19.14C19.7475 18.5644 20.115 17.9869 20.3944 17.3063C20.6625 16.65 20.8481 15.8944 20.9025 14.79C20.955 13.6838 20.9681 13.3294 20.9681 10.4681C20.9681 7.60688 20.955 7.25063 20.9025 6.14625C20.8481 5.04188 20.6625 4.28438 20.3944 3.62813C20.115 2.94938 19.7475 2.37188 19.17 1.79438C18.5925 1.21688 18.0188 0.849375 17.3381 0.57375C16.68 0.30375 15.9225 0.118125 14.8181 0.0656254C13.7119 0.0131254 13.3575 0 10.4963 0H10.5ZM9.55875 1.89188C9.8325 1.89188 10.1419 1.89188 10.5 1.89188C13.3106 1.89188 13.6444 1.90125 14.7375 1.95375C15.75 2.00438 16.305 2.18438 16.6763 2.335C17.1769 2.53313 17.5369 2.76938 17.9156 3.14813C18.2944 3.52688 18.5306 3.88875 18.73 4.38938C18.8806 4.75875 19.0606 5.31375 19.1113 6.32625C19.1638 7.41938 19.1738 7.75313 19.1738 10.4656C19.1738 13.1781 19.1638 13.5119 19.1113 14.605C19.0606 15.6175 18.8806 16.1725 18.73 16.5419C18.5319 17.0425 18.2944 17.4025 17.9156 17.7812C17.5369 18.16 17.1769 18.3963 16.6763 18.5944C16.3069 18.7469 15.75 18.9256 14.7375 18.9763C13.6444 19.0288 13.3106 19.0394 10.5 19.0394C7.68938 19.0394 7.35563 19.0288 6.2625 18.9763C5.25 18.9244 4.695 18.7444 4.32375 18.5938C3.82313 18.3956 3.46125 18.1594 3.0825 17.7806C2.70375 17.4019 2.4675 17.04 2.26875 16.5394C2.11813 16.17 1.93813 15.615 1.8875 14.6025C1.835 13.5094 1.82563 13.1756 1.82563 10.4631C1.82563 7.75063 1.835 7.41688 1.8875 6.32375C1.93813 5.31125 2.11813 4.75625 2.26875 4.38625C2.46688 3.88563 2.70375 3.52563 3.0825 3.14688C3.46125 2.76813 3.82313 2.53188 4.32375 2.3325C4.69313 2.18 5.25 2.00125 6.2625 1.95063C7.22438 1.90313 7.6025 1.89 9.55875 1.8875V1.89188ZM15.9844 3.62625C15.2738 3.62625 14.6981 4.20187 14.6981 4.9125C14.6981 5.62313 15.2738 6.19875 15.9844 6.19875C16.695 6.19875 17.2706 5.62313 17.2706 4.9125C17.2706 4.20187 16.695 3.62625 15.9844 3.62625ZM10.5 5.10375C7.50563 5.10375 5.07563 7.53375 5.07563 10.5281C5.07563 13.5225 7.50563 15.9506 10.5 15.9506C13.4944 15.9506 15.9231 13.5225 15.9231 10.5281C15.9231 7.53375 13.4944 5.10375 10.5 5.10375ZM10.5 6.99563C12.4519 6.99563 14.0344 8.57813 14.0344 10.5281C14.0344 12.4781 12.4519 14.0606 10.5 14.0606C8.54813 14.0606 6.96563 12.4781 6.96563 10.5281C6.96563 8.57813 8.54813 6.99563 10.5 6.99563Z" />
      </svg>
    ),
    youtube: (
      <svg viewBox="0 0 21 21" width="21px" height="21px" fill="currentColor">
        <path d="M20.5688 5.49938C20.3438 4.64438 19.6819 3.97125 18.8419 3.74063C17.3175 3.32063 10.6556 3.32063 10.6556 3.32063C10.6556 3.32063 3.99375 3.32063 2.46938 3.74063C1.62938 3.97125 0.9675 4.64438 0.7425 5.49938C0.328125 7.04625 0.328125 10.2806 0.328125 10.2806C0.328125 10.2806 0.328125 13.515 0.7425 15.0619C0.9675 15.9169 1.62938 16.59 2.46938 16.8206C3.99375 17.2406 10.6556 17.2406 10.6556 17.2406C10.6556 17.2406 17.3175 17.2406 18.8419 16.8206C19.6819 16.59 20.3438 15.9169 20.5688 15.0619C20.9831 13.515 20.9831 10.2806 20.9831 10.2806C20.9831 10.2806 20.9831 7.04625 20.5688 5.49938ZM8.51063 13.2394V7.32188L13.8469 10.2806L8.51063 13.2394Z" />
      </svg>
    ),
    linkedin: (
      <svg viewBox="0 0 25 25" width="25px" height="25px" fill="currentColor">
        <path d="M23.2031 0H1.79063C0.803125 0 0 0.821875 0 1.83125V23.1687C0 24.1781 0.803125 25 1.79063 25H23.2031C24.1906 25 25 24.1781 25 23.1687V1.83125C25 0.821875 24.1906 0 23.2031 0ZM7.42188 21.2969H3.71094V9.34375H7.42188V21.2969ZM5.56641 7.72656C4.39063 7.72656 3.44141 6.77344 3.44141 5.60156C3.44141 4.42969 4.39063 3.47656 5.56641 3.47656C6.73828 3.47656 7.6875 4.42969 7.6875 5.60156C7.6875 6.77344 6.73828 7.72656 5.56641 7.72656ZM21.2969 21.2969H17.5898V15.4688C17.5898 14.0625 17.5625 12.2656 15.6406 12.2656C13.6875 12.2656 13.3906 13.7969 13.3906 15.3594V21.2969H9.6875V9.34375H13.2422V11.0156H13.293C13.7891 10.0859 15.0469 9.10156 16.9219 9.10156C20.6797 9.10156 21.2969 11.6172 21.2969 14.8594V21.2969Z" />
      </svg>
    ),
  }

  return icons[name as keyof typeof icons] || null
}

export function Footer() {
  const { content } = useLanguage()
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({})

  const toggleSection = (section: string) => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }))
  }

  return (
    <footer id="contact" className="text-white py-12" style={{backgroundColor: '#004155'}}>
      <div className="max-w-[800px] xl:max-w-[1272px] mx-auto px-4">
          {/* Award Logos */}
          <div className="mb-8 pb-8 border-b border-white/20">
            <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
              <Image
                src="/awards/optimized_Sailawaze award_117x107.png"
                alt="Sailawaze Award"
                width={117}
                height={107}
                className="h-20 w-auto"
              />
              <Image
                src="/awards/optimized_Best in Cruise Award Logo -1-_117x100.png"
                alt="Best in Cruise Award"
                width={117}
                height={100}
                className="h-20 w-auto"
              />
            </div>
          </div>

          {/* Partner Logos */}
          <div className="mb-12">
            <div className="flex flex-wrap justify-center items-center gap-6 md:gap-8 lg:gap-10 xl:gap-12">
              <a href="https://cruising.org/" target="_blank" rel="noopener noreferrer" aria-label="CLIA">
                <Image src="/footerLogos/footer-logo1.svg" alt="CLIA" width={80} height={50} className="h-10 w-auto opacity-80 cursor-pointer" />
              </a>
              <a href="http://www.acta.org.cy/" target="_blank" rel="noopener noreferrer" aria-label="ACTA">
                <Image src="/footerLogos/logo_.webp" alt="ACTA" width={80} height={50} className="h-10 w-auto opacity-80 cursor-pointer" />
              </a>
              <span className="cursor-pointer">
                <Image src="/footerLogos/footer-logo3.svg" alt="Tour Operator" width={80} height={50} className="h-10 w-auto opacity-80" />
              </span>
              <a href="https://ustoa.com/" target="_blank" rel="noopener noreferrer" aria-label="USTOA">
                <Image src="/footerLogos/footer-logo4.svg" alt="USTOA" width={80} height={50} className="h-10 w-auto opacity-80 cursor-pointer" />
              </a>
              <a href="https://www.virtuoso.com/" target="_blank" rel="noopener noreferrer" aria-label="Virtuoso">
                <Image src="/footerLogos/Vir_Logo.webp" alt="Virtuoso" width={80} height={50} className="h-10 w-auto opacity-80 cursor-pointer" />
              </a>
              <a href="https://ustoa.com/" target="_blank" rel="noopener noreferrer" aria-label="Fundación Philippe Cousteau">
                <Image src="/footerLogos/footer-logo5.png" alt="Fundación Philippe Cousteau" width={80} height={50} className="h-10 w-auto opacity-80 cursor-pointer" unoptimized />
              </a>
              <a href="https://www.aeco.no/" target="_blank" rel="noopener noreferrer" aria-label="AECO">
                <Image src="/footerLogos/aeco1.webp" alt="AECO" width={80} height={50} className="h-10 w-auto opacity-80 cursor-pointer" />
              </a>
              <a href="https://iaato.org" target="_blank" rel="noopener noreferrer" aria-label="IAATO">
                <Image src="/footerLogos/iaato.webp" alt="IAATO" width={80} height={50} className="h-10 w-auto opacity-80 cursor-pointer" />
              </a>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-white/20 pt-12">
            {/* Social Media without border */}
            <div className="flex justify-center mb-8">
              <div className="flex gap-3">
                {content.footer.social.links.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-white flex items-center justify-center cursor-pointer hover:bg-white/90 transition-colors"
                    aria-label={social.name}
                    style={{color: '#004155'}}
                  >
                    <SocialIcon name={social.name} />
                  </a>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap justify-center items-center gap-3 mb-8 text-center pb-0">
              <p className="text-sm text-white/80 whitespace-nowrap pb-0 mb-0">{content.footer.copyright}</p>
              <span className="text-white/80">|</span>
              <a href="https://swanhellenic.com/cookie" className="text-sm text-white/80 hover:text-white transition-colors no-underline hover:no-underline whitespace-nowrap">
                Cookie Policy
              </a>
              <span className="text-white/80">|</span>
              <a href="https://swanhellenic.com/modern-slavery-act" className="text-sm text-white/80 hover:text-white transition-colors no-underline hover:no-underline whitespace-nowrap">
                Modern Slavery Act
              </a>
              <span className="text-white/80">|</span>
              <button className="text-sm text-white/80 hover:text-white transition-colors cursor-pointer bg-transparent border-0 p-0 whitespace-nowrap">
                Cookie
              </button>
            </div>

            <div className="text-center">
              <p className="text-sm text-white/80 leading-relaxed mb-0">
                {content.footer.disclaimerWildlife}
                <br />
                The website (<a href="https://swanhellenic.com" className="text-white no-underline hover:no-underline">www.swanhellelic.com</a>) is owned and operated by Swan Hellenic Travel Limited (20, Themistokli Dervi, Flat/Office 301, 1066, Nicosia, Cyprus)
              </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
