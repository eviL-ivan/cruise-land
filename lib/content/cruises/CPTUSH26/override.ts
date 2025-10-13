// Переопределения контента для круиза CPTUSH26 (Cape Town → Ushuaia 2026)
// October 2026 departure with updated pricing

import type { CruiseContentOverride } from "../types"
import { cabins } from "./cabins.en"

export const override: CruiseContentOverride = {
  // Override cabin prices for 2026 season
  cabins,

  // Override base price and map for Cape Town → Ushuaia route
  overview: {
    price: "$16,650",
    mapImage: "/map-cape-usu.png",
  },
}
