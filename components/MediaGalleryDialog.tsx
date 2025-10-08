'use client'

import { useState, useEffect } from "react"
import Lightbox from "yet-another-react-lightbox"
import Captions from "yet-another-react-lightbox/plugins/captions"
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen"
import Slideshow from "yet-another-react-lightbox/plugins/slideshow"
import Video from "yet-another-react-lightbox/plugins/video"
import Zoom from "yet-another-react-lightbox/plugins/zoom"
import "yet-another-react-lightbox/styles.css"
import "yet-another-react-lightbox/plugins/captions.css"

interface MediaGalleryDialogProps {
  isOpen: boolean
  onClose: () => void
  media: string[]
  initialIndex: number
  cabinName: string
  imageCount: number // Number of images (before videos)
  onIndexChange?: (index: number) => void
}

export function MediaGalleryDialog({
  isOpen,
  onClose,
  media,
  initialIndex,
  cabinName,
  imageCount,
  onIndexChange,
}: MediaGalleryDialogProps) {
  // Internal state for current index
  const [currentIndex, setCurrentIndex] = useState(initialIndex)

  // Update internal index when initialIndex changes (only when dialog opens)
  useEffect(() => {
    if (isOpen) {
      setCurrentIndex(initialIndex)
    }
  }, [isOpen, initialIndex])

  // Convert media array to lightbox slides format
  const slides = media.map((item, index) => {
    const isVideo = index >= imageCount

    if (isVideo) {
      // Video slide - Video plugin automatically plays only active slide
      return {
        type: "video" as const,
        title: `${cabinName} - 360° Video`,
        autoPlay: true, // Plugin ensures only active slide plays
        loop: true,
        muted: true,
        playsInline: true,
        controls: false,
        sources: [
          {
            src: item,
            type: "video/webm",
          },
        ],
      }
    } else {
      // Image slide
      return {
        src: item,
        title: `${cabinName}`,
      }
    }
  })

  return (
    <Lightbox
      open={isOpen}
      close={onClose}
      slides={slides}
      index={currentIndex}
      plugins={[Captions, Fullscreen, Slideshow, Video, Zoom]}
      on={{
        view: ({ index }) => {
          // Only update if index actually changed
          if (index !== currentIndex) {
            setCurrentIndex(index)
            // Sync index with parent carousel
            onIndexChange?.(index)
          }
        },
      }}
      carousel={{
        finite: false,
      }}
      controller={{
        closeOnBackdropClick: true,
      }}
    />
  )
}
