/**
 * Generate a blur placeholder URL for Next.js Image component
 * Uses Next.js image optimization to create a tiny, low-quality version
 * @param imageURL - The source image URL
 * @returns A data URL for the blur placeholder
 */
export function getPlaceholderImageURL(imageURL: string): string {
  return `/_next/image?url=${encodeURIComponent(imageURL)}&q=1&w=128`
}
