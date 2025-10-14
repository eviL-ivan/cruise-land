/**
 * Generates a shimmer effect placeholder for images
 * Similar to Instagram/Facebook loading placeholders
 */
export function shimmer(w: number, h: number) {
  return `
    <svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
      <defs>
        <linearGradient id="g">
          <stop stop-color="#e8e6e5" offset="0%" />
          <stop stop-color="#d4d2d1" offset="20%" />
          <stop stop-color="#e8e6e5" offset="40%" />
          <stop stop-color="#e8e6e5" offset="100%" />
        </linearGradient>
      </defs>
      <rect width="${w}" height="${h}" fill="#e8e6e5" />
      <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
      <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
    </svg>`
}

export function toBase64(str: string) {
  return typeof window === 'undefined'
    ? Buffer.from(str).toString('base64')
    : window.btoa(str)
}

// Default shimmer placeholder - neutral gray color
export const shimmerDataURL = `data:image/svg+xml;base64,${toBase64(shimmer(700, 475))}`

// Dark shimmer for dark backgrounds (like Company section)
export const darkShimmerDataURL = `data:image/svg+xml;base64,${toBase64(
  shimmer(700, 475).replace(/#e8e6e5/g, '#1a2332').replace(/#d4d2d1/g, '#2a3342')
)}`
