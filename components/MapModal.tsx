"use client"

import Lightbox from "yet-another-react-lightbox"
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen"
import Zoom from "yet-another-react-lightbox/plugins/zoom"
import "yet-another-react-lightbox/styles.css"

interface MapModalProps {
  isOpen: boolean
  onClose: () => void
  mapSrc?: string
}

export function MapModal({ isOpen, onClose, mapSrc = "/map.jpg" }: MapModalProps) {
  return (
    <Lightbox
      open={isOpen}
      close={onClose}
      slides={[
        {
          src: mapSrc,
          alt: "Expedition Route Map",
        },
      ]}
      plugins={[Fullscreen, Zoom]}
      controller={{
        closeOnBackdropClick: true,
      }}
      carousel={{
        finite: true,
      }}
      render={{
        buttonPrev: () => null,
        buttonNext: () => null,
      }}
      zoom={{
        maxZoomPixelRatio: 3,
      }}
    />
  )
}
