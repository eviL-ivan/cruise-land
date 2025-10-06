import { images } from "../images";

export const itinerary = {
  title: "探险行程",
  subtitle: "21天 / 20晚 难忘的旅程，跨越三大洲与两大洋",
  activitiesLabel: "主要活动：",
  importantNote:
    "以下为总体行程计划。探险邮轮前往偏远且难以到达的地区，因此实际航程取决于天气、海冰情况，以及探险队长和船长的指令。",
  days: [
    {
      day: "第1天",
      location: "开普敦，南非",
      title: "开普敦，南非",
      description:
        "行程从机场接机和入住开普敦酒店开始。开普敦是南非的文化中心：桌山、好望角、历史城区、维多利亚与阿尔弗雷德海滨、国家植物园。晚上登上SH Diana号，参加探险简报会。",
      image: images.itinerary.day1,
      activities: [
        "入住开普敦五星级酒店",
        "市区观光",
        "登上 SH Diana 号邮轮",
        "欢迎简报会",
      ],
    },
    {
      day: "第2–5天",
      location: "大西洋",
      title: "海上，横跨大西洋",
      description:
        "专家讲座，主题涵盖海洋生物学、地质学、探索历史和原住民文化；学术讨论与演讲。在甲板上观赏海鸟与海洋哺乳动物；休闲娱乐，享受客舱与休息室。",
      image: images.itinerary.day2,
      activities: ["极地探险历史讲座", "摄影工作坊", "海鸟观察", "与专家讨论"],
    },
    {
      day: "第6天",
      location: "特里斯坦-达库尼亚群岛",
      title: "特里斯坦-达库尼亚岛",
      description:
        "世界上最偏远的群岛之一：稀有的黄鼻信天翁、贼鸥、北跳岩企鹅、海狮和海豹；可能还会遇到海豚。独特且孤立的生态系统，全球仅此一处。",
      image: images.itinerary.day3,
      activities: [
        "登陆小岛（天气允许）",
        "观赏北跳岩企鹅",
        "邂逅海狮和海豹",
        "观察黄鼻信天翁",
      ],
    },
    {
      day: "第7–10天",
      location: "大西洋",
      title: "再度海上航行，横跨大西洋",
      description:
        "享受海上时光与休闲。水疗中心、健身房、图书馆（专题书籍）、游戏室。可按安排或邀请参观驾驶台。户外餐厅与酒吧，俱乐部休息室。",
      image: images.itinerary.day4,
      activities: [
        "享受水疗和健身",
        "参观驾驶台",
        "在俱乐部休息室放松",
        "阅读与休闲时光",
      ],
    },
    {
      day: "第11–12天",
      location: "南乔治亚岛",
      title: "南乔治亚岛",
      description:
        "历史悠久的群岛：19–20世纪是捕鲸中心。如今以惊人的生物多样性闻名：帝企鹅群落、象海豹、海狮、海燕、贼鸥。可安排橡皮艇巡游与登陆（视天气与许可），参观格里特维肯的沙克尔顿墓。",
      image: images.itinerary.day5,
      activities: [
        "登陆格里特维肯湾",
        "参观欧内斯特·沙克尔顿墓",
        "观赏帝企鹅",
        "橡皮艇海岸巡游",
      ],
    },
    {
      day: "第13–14天",
      location: "南大洋",
      title: "海上航行 — 前往南极半岛",
      description:
        "继续专家讲座与探险队交流。在 Swan Hellenic 餐厅享用精致美食，客舱服务，俱乐部酒廊饮品。个性化贴心服务满足不同需求。",
      image: images.itinerary.day6,
      activities: [
        "探险队讲座",
        "精致餐饮体验",
        "休闲并为南极探险做准备",
        "观赏海洋生物",
      ],
    },
    {
      day: "第15天",
      location: "南设得兰群岛",
      title: "南设得兰群岛",
      description:
        "位于浮冰边缘的南极群岛：气候较为温和，地面有苔藓和地衣。海滩上有威德尔海豹、食蟹海豹、象海豹；多种企鹅与鸟类（巨海燕、南极燕鸥等）。",
      image: images.itinerary.day7,
      activities: [
        "登陆南设得兰群岛",
        "观察威德尔海豹与食蟹海豹",
        "遇见不同种类的企鹅",
        "研究南极植物群",
      ],
    },
    {
      day: "第16–18天",
      location: "南极半岛",
      title: "探索南极半岛",
      description:
        "壮丽的冰川、雄伟的冰山、积雪覆盖的峡湾。平均每天登陆1–2次（视天气与IAATO规定）；橡皮艇巡游至冰川与冰山，观察企鹅与海豹。可徒步登高，俯瞰冰架全景。",
      image: images.itinerary.day8,
      activities: [
        "登陆南极半岛（每天1–2次）",
        "橡皮艇冰山巡游",
        "观赏阿德利企鹅、巴布亚企鹅和帽带企鹅",
        "徒步登高观景",
        "皮划艇（可选）",
        "极地跳水（视天气）",
      ],
    },
    {
      day: "第19–20天",
      location: "德雷克海峡",
      title: "穿越南极辐合带",
      description:
        "穿越德雷克海峡（SH Diana号全包服务）。理想的时光用于交流分享和总结；按安排参观驾驶台；根据天气窗口顺利通过海峡。",
      image: images.itinerary.day9,
      activities: ["告别晚宴", "参与者摄影展示", "颁发证书", "分享旅程感受"],
    },
    {
      day: "第21天",
      location: "乌斯怀亚，阿根廷",
      title: "乌斯怀亚与飞往布宜诺斯艾利斯",
      description:
        "经比格尔海峡返回乌斯怀亚。随后乘坐包含在行程内的航班飞往布宜诺斯艾利斯；可选延展行程：伊瓜苏瀑布或阿根廷境内陆地游。",
      image: images.itinerary.day10,
      activities: [
        "下船",
        "乌斯怀亚 — 布宜诺斯艾利斯航班（已包含）",
        "可选陆地延展游",
      ],
    },
  ],
} as const;
