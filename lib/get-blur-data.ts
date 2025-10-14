import { getPlaiceholder } from 'plaiceholder'
import fs from 'fs/promises'
import path from 'path'

/**
 * Generate a blur data URL from an image file
 * This runs at build time (server-side only)
 */
export async function getBlurDataURL(imagePath: string): Promise<string> {
  try {
    // Remove leading slash and resolve to public directory
    const cleanPath = imagePath.startsWith('/') ? imagePath.slice(1) : imagePath
    const fullPath = path.join(process.cwd(), 'public', cleanPath)

    // Read the image file
    const buffer = await fs.readFile(fullPath)

    // Generate placeholder
    const { base64 } = await getPlaiceholder(buffer, { size: 10 })

    return base64
  } catch (error) {
    console.error(`Failed to generate blur for ${imagePath}:`, error)
    // Fallback to simple gray blur
    return 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNzAwIiBoZWlnaHQ9IjQ3NSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZmlsdGVyIGlkPSJiIj48ZmVHYXVzc2lhbkJsdXIgc3RkRGV2aWF0aW9uPSIyMCIvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiNlNWU3ZWIiIGZpbHRlcj0idXJsKCNiKSIvPjwvc3ZnPg=='
  }
}
