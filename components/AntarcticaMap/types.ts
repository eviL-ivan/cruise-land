export interface MarkerPoint {
  name: string
  coordinates: [number, number]
  image?: string
  description?: string
}

export interface MapLoadState {
  isLoading: boolean
  error: string | null
}
