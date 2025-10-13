// USHCPT26航程内容覆盖（乌斯怀亚 → 开普敦）
// 反向航线：从南极洲到非洲

import type { CruiseContentOverride } from "../types"
import { images } from "../../images"
import { itinerary } from "./itinerary.zh"
import { cabins } from "./cabins.zh"

export const override: CruiseContentOverride = {
  // 覆盖行程
  itinerary,

  // 覆盖客舱价格
  cabins,

  // 更新反向航线的元标签
  meta: {
    title: "南大西洋探险：从乌斯怀亚到开普敦 | SH Diana",
    description:
      "Swan Hellenic 在 SH Diana 号上的探险邮轮。从南极洲到南非，途经南乔治亚岛和南大西洋群岛。21 天跨越 3 大洲与 2 大洋。",
  },

  // 更新反向航线的Hero标题
  hero: {
    title: "南大西洋探险",
    titleAccent: "前往非洲",
    subtitle:
      "南极半岛、南乔治亚岛和南大西洋群岛，乘坐探险船 SH Diana",
  },

  // 更新航线描述
  overview: {
    price: "$14,100", // 概览基础价格
    description:
      "这不仅仅是一次邮轮——这是一次穿越南极洲、大西洋和非洲三个世界交汇处的智识与情感探险。",
    detailedDescription:
      "体验从南极洲冰冻荒野到南非充满活力海岸的旅程。见证企鹅群落，探索偏远岛屿，航行跨越壮丽的南大西洋——这一切都在天鹅海伦尼克最新旗舰SH Diana号的优雅舒适中进行。",
    mapImage: "/map-ushu-cape.png", // 反向航线地图
    brochureUrl: "/brochures/SH_TG_D3525_South Atlantic cruise_7Mar-v1.pdf", // USHCPT26宣传册
  },

  // 更新统计数据
  cta: {
    stats: [
      { number: "21", label: "旅行天数" },
      { number: "5", label: "企鹅种类" },
      { number: "∞", label: "难忘时刻" },
    ],
  },

  // 更新反向航线的亮点
  highlights: [
    {
      number: "1",
      title: "乌斯怀亚与火地岛",
      description:
        "从乌斯怀亚开始您的旅程——世界最南端的城市，南极洲的门户。",
      image: images.itinerary.day10, // 美丽的乌斯怀亚照片
    },
    {
      number: "2",
      title: "跨大西洋探险",
      description:
        "乘坐高冰级船只进行跨越3大洲和2大洋的跨大西洋探险。",
      image: images.highlights[1],
    },
    {
      number: "3",
      title: "海洋的魔力",
      description:
        "体验从极地冰雪到亚热带温暖的戏剧性转变。",
      image: images.highlights[2],
    },
    {
      number: "4",
      title: "五种企鹅",
      description:
        "遇见至少五种企鹅；独特的机会看到北跳岩企鹅和海狮。",
      image: images.highlights[3],
    },
    {
      number: "5",
      title: "特里斯坦-达库尼亚群岛",
      description:
        "在特里斯坦-达库尼亚海岸日出——地球上最偏远的岛屿之一。",
      image: images.highlights[4],
    },
    {
      number: "6",
      title: "伟大探险家的故事",
      description:
        "关于极地探险家历史的讲座：沙克尔顿、阿蒙森等。",
      image: images.highlights[5],
    },
    {
      number: "7",
      title: "南乔治亚岛",
      description:
        "沉浸在南乔治亚岛的世界中——真正的野生动物庆典。",
      image: images.highlights[6],
    },
    {
      number: "8",
      title: "创意与灵感",
      description: "船上创意工作坊：摄影、绘画、艺术。",
      image: images.highlights[7],
    },
    {
      number: "9",
      title: "南大洋游泳",
      description:
        "在南大洋进行极地跳水（水温约 −2…+10 °C）。",
      image: images.highlights[8],
    },
    {
      number: "10",
      title: "冰山间皮划艇",
      description: "在南极水域冰山间进行有向导的皮划艇活动。",
      image: images.highlights[10],
    },
    {
      number: "11",
      title: "极地秋天",
      description:
        "体验季节变化，从南极秋天旅行到非洲夏天。",
      image: images.highlights[11],
    },
    {
      number: "12",
      title: "抵达开普敦",
      description:
        "抵达开普敦——世界上最美丽的城市之一，拥有桌山和充满活力的文化。",
      image: images.highlights[0],
    },
  ],
}
