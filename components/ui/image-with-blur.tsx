'use client'

import { useState } from "react"
import Image, { ImageProps } from "next/image"
import blurDataJSON from "@/lib/blur-data.json"

interface ImageWithBlurProps extends Omit<ImageProps, 'placeholder' | 'blurDataURL'> {
  src: string
}

const blurData = blurDataJSON as Record<string, string>

/**
 * Image component with blur placeholder background
 */
export function ImageWithBlur({ src, alt, fill, className = '', ...props }: ImageWithBlurProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const blurDataURL = blurData[src]

  // For non-fill images, use standard Next.js blur
  if (!fill) {
    return (
      <Image
        src={src}
        alt={alt}
        placeholder={blurDataURL ? "blur" : "empty"}
        blurDataURL={blurDataURL}
        className={className}
        {...props}
      />
    )
  }

  // For fill images, show blur background manually with higher z-index
  return (
    <>
      {blurDataURL && (
        <div
          className={`absolute inset-0 z-0 transition-opacity duration-500 ${isLoaded ? 'opacity-0' : 'opacity-100'}`}
          style={{
            backgroundImage: `url(${blurDataURL})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'blur(20px)',
          }}
        />
      )}
      <Image
        src={src}
        alt={alt}
        fill
        className={`relative z-10 ${className} transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
        onLoad={() => setIsLoaded(true)}
        {...props}
      />
    </>
  )
}
