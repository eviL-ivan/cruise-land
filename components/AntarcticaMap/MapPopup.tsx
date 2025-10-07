import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface MapPopupProps {
  name: string
  description: string
  image?: string
}

export function MapPopup({ name, description, image }: MapPopupProps) {
  return (
    <Card className="w-[340px] overflow-hidden border-0 shadow-2xl">
      {image && (
        <div className="w-full h-[220px] overflow-hidden">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      <CardHeader className="pb-3">
        <CardTitle className="text-xl font-semibold">{name}</CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <p className="text-sm text-muted-foreground leading-relaxed">
          {description}
        </p>
      </CardContent>
    </Card>
  )
}
