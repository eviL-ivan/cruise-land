import { getPlaiceholder } from 'plaiceholder'
import fs from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const projectRoot = path.resolve(__dirname, '..')
const publicDir = path.join(projectRoot, 'public')

// Image extensions to process
const IMAGE_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp']

/**
 * Recursively find all image files in a directory
 */
async function findImages(dir, baseDir = dir) {
  const files = await fs.readdir(dir, { withFileTypes: true })
  const images = []

  for (const file of files) {
    const fullPath = path.join(dir, file.name)

    if (file.isDirectory()) {
      // Skip node_modules and hidden directories
      if (file.name.startsWith('.') || file.name === 'node_modules') {
        continue
      }
      // Recursively search subdirectories
      const subImages = await findImages(fullPath, baseDir)
      images.push(...subImages)
    } else if (file.isFile()) {
      const ext = path.extname(file.name).toLowerCase()
      if (IMAGE_EXTENSIONS.includes(ext)) {
        // Convert to web path (relative to public with leading /)
        const relativePath = path.relative(baseDir, fullPath)
        const webPath = '/' + relativePath.split(path.sep).join('/')
        images.push(webPath)
      }
    }
  }

  return images
}

async function generateBlurData() {
  console.log('🔍 Scanning for images in public directory...\n')

  const allImagePaths = await findImages(publicDir)

  console.log(`📸 Found ${allImagePaths.length} images\n`)

  const blurData = {}
  let processed = 0
  let failed = 0

  for (const imagePath of allImagePaths) {
    try {
      const cleanPath = imagePath.slice(1) // Remove leading /
      const fullPath = path.join(projectRoot, 'public', cleanPath)

      const buffer = await fs.readFile(fullPath)
      const { base64 } = await getPlaiceholder(buffer, { size: 32 })

      blurData[imagePath] = base64
      processed++

      // Show progress every 10 images
      if (processed % 10 === 0) {
        console.log(`⏳ Processed ${processed}/${allImagePaths.length}...`)
      }
    } catch (error) {
      failed++
      console.error(`✗ Failed: ${imagePath} - ${error.message}`)
    }
  }

  // Write to file
  const outputPath = path.join(projectRoot, 'lib', 'blur-data.json')
  await fs.writeFile(outputPath, JSON.stringify(blurData, null, 2))

  console.log(`\n✅ Complete!`)
  console.log(`   Total found: ${allImagePaths.length}`)
  console.log(`   Processed: ${processed}`)
  console.log(`   Failed: ${failed}`)
  console.log(`   Output: lib/blur-data.json`)
  console.log(`   Size: ${(JSON.stringify(blurData).length / 1024).toFixed(2)} KB`)
}

generateBlurData().catch(console.error)
