'use client'

import { useState, useEffect } from "react"
import blurDataJSON from "@/lib/blur-data.json"

interface VideoWithBlurProps extends React.VideoHTMLAttributes<HTMLVideoElement> {
  poster?: string
}

const blurData = blurDataJSON as Record<string, string>

/**
 * Video component with blur placeholder background
 */
export function VideoWithBlur({ poster, className = '', ...props }: VideoWithBlurProps) {
  const [posterLoaded, setPosterLoaded] = useState(false)
  const [showBlur, setShowBlur] = useState(false)
  const blurDataURL = poster ? blurData[poster] : undefined

  useEffect(() => {
    if (!poster) return

    // Delay showing blur to avoid flash on fast connections
    const blurTimeout = setTimeout(() => {
      setShowBlur(true)
    }, 50) // Show blur only if loading takes more than 50ms

    // Preload poster image
    const img = new Image()

    img.onload = () => {
      setPosterLoaded(true)
      clearTimeout(blurTimeout)
    }

    img.onerror = () => {
      // If image fails to load, clear timeout
      clearTimeout(blurTimeout)
    }

    img.src = poster

    // If image is already cached, it loads synchronously
    // Check after setting src
    if (img.complete && img.naturalHeight !== 0) {
      setPosterLoaded(true)
      clearTimeout(blurTimeout)
    }

    return () => clearTimeout(blurTimeout)
  }, [poster])

  return (
    <>
      {blurDataURL && !posterLoaded && showBlur && (
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url(${blurDataURL})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'blur(20px)',
          }}
        />
      )}
      <video
        {...props}
        poster={poster}
        className={`w-full h-full ${className}`}
      />
    </>
  )
}
