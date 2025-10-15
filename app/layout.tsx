import type React from "react"
import type { Metadata } from "next"
import { Noto_Sans_JP, Noto_Sans_SC } from "next/font/google"
import localFont from "next/font/local"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { Suspense } from "react"
import { content as contentEN } from "@/lib/content.en"
import { LanguageProvider } from "@/lib/language-context"
import { MicrosoftClarity } from "@/components/analytics/clarity"

// Non Natural Grotesque - для заголовков (300 DemiLight, 700 Bold)
const nonNaturalGrotesk = localFont({
  src: "../fonts/non-natural-grotesque/NonNaturalGrotesk-Variable.woff2",
  variable: "--font-non-natural-grotesque",
  display: "swap",
})

// PP Neue Montreal - для основного текста (без italic)
const ppNeueMontreal = localFont({
  src: [
    {
      path: "../fonts/pp-neue-montreal/PPNeueMontreal-Light.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "../fonts/pp-neue-montreal/PPNeueMontreal-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/pp-neue-montreal/PPNeueMontreal-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../fonts/pp-neue-montreal/PPNeueMontreal-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-pp-neue-montreal",
  display: "swap",
})

const notoSansJP = Noto_Sans_JP({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-noto-jp",
  display: "swap",
})

const notoSansSC = Noto_Sans_SC({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-noto-sc",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Southern Expedition to Antarctica",
  description: contentEN.meta.description,
  keywords: "Southern Expedition to Antarctica, Antarctic Cruise Expedition, Expedition to Antarctica, Southern Ocean Cruise",
  icons: {
    icon: '/favicon.ico',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${nonNaturalGrotesk.variable} ${ppNeueMontreal.variable} ${notoSansJP.variable} ${notoSansSC.variable}`}>
      <head>
        {/* Google tag (gtag.js) */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-MT7S1EMTCD"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-MT7S1EMTCD');
            `,
          }}
        />
        {/* Google Tag Manager */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-P6R255M5');`,
          }}
        />
        {/* End Google Tag Manager */}
        <link rel="preconnect" href="https://api.mapbox.com" />
        <link rel="dns-prefetch" href="https://api.mapbox.com" />
        <link rel="preconnect" href="https://a.tiles.mapbox.com" />
        <link rel="dns-prefetch" href="https://a.tiles.mapbox.com" />
        <link rel="preconnect" href="https://crm.swanhellenic.com" />
        <link rel="dns-prefetch" href="https://crm.swanhellenic.com" />
        <script src="https://unpkg.com/@elevenlabs/convai-widget-embed" async type="text/javascript"></script>
      </head>
      <body className="font-sans antialiased">
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-P6R255M5"
            height="0"
            width="0"
            style={{display: 'none', visibility: 'hidden'}}
          />
        </noscript>
        {/* End Google Tag Manager (noscript) */}
        <LanguageProvider>
          <Suspense fallback={null}>{children}</Suspense>
        </LanguageProvider>
        <Analytics />
        <MicrosoftClarity />
        <elevenlabs-convai agent-id="agent_3301k6ww61zgea1bhdm2nfvg9ka4"></elevenlabs-convai>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                function updateWidgetVariant() {
                  const widget = document.querySelector('elevenlabs-convai');
                  if (!widget) return;

                  const isMobile = window.innerWidth <= 640;
                  if (isMobile) {
                    widget.setAttribute('variant', 'expandable');
                  } else {
                    widget.setAttribute('variant', 'full');
                  }
                }

                if (document.readyState === 'loading') {
                  document.addEventListener('DOMContentLoaded', updateWidgetVariant);
                } else {
                  updateWidgetVariant();
                }

                window.addEventListener('resize', updateWidgetVariant);
              })();
            `,
          }}
        />
      </body>
    </html>
  )
}
