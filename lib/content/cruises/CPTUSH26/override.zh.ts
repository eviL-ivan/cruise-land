// CPTUSH26航程内容覆盖（开普敦 → 乌斯怀亚 2026）
// 2026年10月出发，更新定价

import type { CruiseContentOverride } from "../types"
import { cabins } from "./cabins.zh"

export const override: CruiseContentOverride = {
  // 覆盖2026季的客舱价格
  cabins,

  // 覆盖概览中的基础价格和地图（开普敦 → 乌斯怀亚航线）
  overview: {
    price: "$16,650",
    mapImage: "/map-cape-usu.png",
  },
}
