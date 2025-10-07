import type React from "react"
import type { Metadata } from "next"
import { Space_Grotesk, Noto_Sans_JP, Noto_Sans_SC } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { Suspense } from "react"
import { content } from "@/lib/content"
import { LanguageProvider } from "@/lib/language-context"

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-space-grotesk",
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
  title: content.meta.title,
  description: content.meta.description,
  generator: "v0.app",
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
    <html lang="ru" className={`${spaceGrotesk.variable} ${notoSansJP.variable} ${notoSansSC.variable}`}>
      <head>
        <link rel="preconnect" href="https://api.mapbox.com" />
        <link rel="dns-prefetch" href="https://api.mapbox.com" />
        <link rel="preconnect" href="https://a.tiles.mapbox.com" />
        <link rel="dns-prefetch" href="https://a.tiles.mapbox.com" />
        <link rel="preconnect" href="https://swanhellenc-cruise-land-vercel.bitrix24.site" />
        <link rel="dns-prefetch" href="https://swanhellenc-cruise-land-vercel.bitrix24.site" />
        <script src="https://unpkg.com/@elevenlabs/convai-widget-embed" async type="text/javascript"></script>
      </head>
      <body className="font-sans antialiased">
        <LanguageProvider>
          <Suspense fallback={null}>{children}</Suspense>
        </LanguageProvider>
        <Analytics />
        <elevenlabs-convai agent-id="agent_3301k6ww61zgea1bhdm2nfvg9ka4"></elevenlabs-convai>
      </body>
    </html>
  )
}
