// 南极邮轮落地页内容
// 所有文本的集中存储，方便翻译与管理
// 数据来源于官方品牌手册 PDF

import { images } from "./content/images";
import { journey } from "./content/zh/journey.zh";
import { itinerary } from "./content/zh/itinerary.zh";
import { cabins } from "./content/zh/cabins.zh";
import { map } from "./content/zh/map.zh";

export const content = {
  // 元数据
  meta: {
    title: "跨大西洋探险：从开普敦到乌斯怀亚 | SH Diana",
    description:
      "Swan Hellenic 在 SH Diana 号上的探险邮轮。南大西洋群岛、南乔治亚岛和南极半岛。21 天跨越 3 大洲与 2 大洋。",
  },

  // 页头
  header: {
    logoAlt: "SH Diana",
    nav: {
      route: "航线",
      itinerary: "行程",
      ship: "邮轮",
      cabins: "舱房",
      contact: "联系我们",
    },
    bookButton: "立即预订",
    languages: {
      ru: "RU",
      en: "EN",
      zh: "中文",
    },
  },

  // 邮轮概览
  overview: {
    cruiseCode: "D2925111520",
    route: "开普敦 - 乌斯怀亚",
    dates: "2025.11.15 - 2025.12.05",
    datesLabel: "日期",
    nights: "20 晚",
    durationLabel: "行程时长",
    ship: "SH Diana",
    shipLabel: "邮轮",
    priceLabel: "价格起",
    price: "$13,780",
    priceNote: "每人",
    mapImage: images.overview.map,
    mapAlt: "邮轮航线图",
    mapButton: "地图",
    description: "这不仅仅是一次邮轮——这是一次穿越非洲、大西洋和南极三个世界交汇处的智识与情感探险。",
    detailedDescription: "只有在这里，宾客才能目睹稀有的北跳岩企鹅，探索地球上最与世隔绝的岛屿，在雕塑般的冰山旁迎接黎明——这一切都在天鹅海伦尼克最新旗舰SH Diana号的优雅舒适中进行。",
    experienceButton: "观看体验",
  },

  // 主页横幅 (Hero)
  hero: {
    title: "跨大西洋探险",
    titleAccent: "前往南极",
    subtitle: "搭乘 SH Diana 探险船，探索南大西洋群岛、南乔治亚岛和南极半岛",
    highlight: "3 大洲 & 2 大洋",
    bookButton: "询价",
    learnMoreButton: "了解更多",
    imageAlt: "南极洲",
    image: images.hero.image,
    video: images.hero.video,
  },

  // "旅程"部分 - 从模块导入
  journey,

  // 地图路线
  map,

  // 精彩亮点
  highlights: [
    {
      number: "1",
      title: "开普敦与好望角",
      description: "探索世界上最美丽的城市之一：开普敦。参观好望角和桌山。",
      image: images.highlights[0],
    },
    {
      number: "2",
      title: "跨大西洋探险",
      description: "乘坐高冰级探险船，横跨 3 大洲与 2 大洋。",
      image: images.highlights[1],
    },
    {
      number: "3",
      title: "海洋的魔力",
      description: "在航行至地球最寒冷大陆的途中，感受海洋的魔力。",
      image: images.highlights[2],
    },
    {
      number: "4",
      title: "五种企鹅",
      description: "邂逅至少五种企鹅；独特机会见到北跳岩企鹅和海狮。",
      image: images.highlights[3],
    },
    {
      number: "5",
      title: "特里斯坦-达库尼亚",
      description:
        "在地球上最偏远的岛屿之一——特里斯坦-达库尼亚岛岸边迎接日出。",
      image: images.highlights[4],
    },
    {
      number: "6",
      title: "伟大探险家的故事",
      description: "聆听极地探险家的历史讲座：沙克尔顿、阿蒙森等。",
      image: images.highlights[5],
    },
    {
      number: "7",
      title: "南乔治亚岛",
      description: "深入南乔治亚岛的野生世界——大自然的盛宴。",
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
      title: "南大洋畅泳",
      description: "在南大洋畅泳（水温约 −2…+10 °C）。",
      image: images.highlights[8],
    },
    {
      number: "10",
      title: "抵达南极洲",
      description: "成为少数能踏上南极洲海岸的人之一。",
      image: images.highlights[9],
    },
    {
      number: "11",
      title: "冰山皮划艇",
      description: "在向导陪同下划皮划艇穿梭冰山之间。",
      image: images.highlights[10],
    },
    {
      number: "12",
      title: "极地之夏",
      description: "极地之夏：闪耀的冰山与冰川崩裂的轰鸣。",
      image: images.highlights[11],
    },
  ],

  // 行程 - 从模块导入
  itinerary,

  // 野生动物
  wildlife: {
    title: "南极野生动物",
    subtitle: "在自然栖息地邂逅帝企鹅、翼展达 4 米的漂泊信天翁和壮观的鲸鱼",
    animals: [
      {
        name: "企鹅",
        description: "5 种不同的企鹅，包括帝企鹅和北跳岩企鹅",
        image: images.wildlife[0],
        alt: "企鹅群落",
      },
      {
        name: "鲸鱼",
        description: "在近岸海域观赏壮观的鲸鱼",
        image: images.wildlife[1],
        alt: "海洋中的鲸鱼",
      },
      {
        name: "信天翁",
        description: "漂泊信天翁，翼展可达 4 米",
        image: images.wildlife[2],
        alt: "漂泊信天翁",
      },
    ],
  },

  // 邮轮
  ship: {
    name: "SH Diana",
    brand: "Swan Hellenic",
    inServiceSince: "2023年4月",
    iceClass: "PC6",
    capacity: "196 名乘客",
    crew: "140 名船员",
    description:
      "一座真正的海上精品酒店。设有无边泳池（海景），由知名主厨掌勺的高端餐厅，以及以天然材质打造的时尚内饰。",
    amenities: [
      { title: "无边泳池", description: "享有全景海景" },
      { title: "精致餐饮", description: "Swan Hellenic 餐厅" },
      { title: "水疗中心", description: "按摩浴缸、桑拿、美容院" },
      { title: "健身房", description: "现代化设备" },
      { title: "PC6冰级", description: "最高北极冰级船舶" },
      { title: "安全性", description: "所有船舶系统均有冗余备份" },
    ],
    features: [
      "开放甲板上的无边泳池",
      "精致餐厅",
      "水疗中心、桑拿与健身房",
      "图书馆与讲座空间",
      "俱乐部酒廊与池畔烧烤吧",
      "医疗中心与探险实验室",
      "Swan's Nest 观景台",
    ],
    specs: {
      length: "125 米",
      width: "23 米",
      tonnage: "12,100 吨",
      decks: "9 层",
      iceStrength: "100 厘米",
      propulsion: "混合柴油电力推进",
      speed: "平均 15.5 节",
    },
    images: [
      { src: images.ship[0], alt: "SH Diana 无边泳池" },
      { src: images.ship[1], alt: "餐厅" },
      { src: images.ship[2], alt: "SH Diana 邮轮" },
    ],
  },

  // 舱房 - 从模块导入
  cabins,

  // 行动召唤 (CTA)
  cta: {
    title: "开启您的旅程",
    subtitle:
      "如有任何问题或预订需求，请联系您的旅行经理。我们将帮助您安排一段难忘的南极之旅。",
    emailButton: "给我们发邮件",
    phoneButton: "请求来电",
    stats: [
      { number: "21", label: "旅行天数" },
      { number: "5", label: "企鹅种类" },
      { number: "∞", label: "难忘时刻" },
    ],
  },

  // 页脚
  footer: {
    shipName: "SH Diana",
    brand: "Swan Hellenic",
    description: "乘坐高冰级 PC6 探险船的豪华南极邮轮",
    routeTitle: "航线",
    routeStops: [
      "开普敦，南非",
      "特里斯坦-达库尼亚",
      "南乔治亚岛",
      "南极洲",
      "乌斯怀亚，阿根廷",
    ],
    contactTitle: "联系方式",
    contactDescription: "如有任何问题或预订需求，请联系您的旅行经理",
    contactButton: "联系我们",
    copyright: "© 2025 SH Diana 南极邮轮。版权所有。",
  },

  // 界面 UI
  ui: { slideLabel: "跳转到幻灯片" },

  // 可选服务
  optionalServices: [
    "往返开普敦与布宜诺斯艾利斯的国际航班",
    "邮轮前后在南非与阿根廷的陆地游",
    "强制医疗保险",
    "高级 Wi-Fi 套餐",
    "邮轮期间的皮划艇探险",
    "高级饮品、水疗与美容护理",
  ],
} as const;

export type Content = typeof content;
