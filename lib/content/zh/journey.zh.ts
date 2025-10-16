import { images } from "../images";

export const journey = {
  title: "梦想之旅",
  description:
    "搭乘我们的精品冰级探险船 SH Diana 号，横跨 3 大洲与 2 大洋的跨大西洋探险之旅",
  destinations: [
    {
      name: "开普敦",
      alt: "开普敦",
      description: "您的旅程从这座现代化的南非国际都市开始，坐落在雄伟的桌山脚下",
      image: images.journey.capeTown,
    },
    {
      name: "特里斯坦-达库尼亚",
      alt: "特里斯坦-达库尼亚",
      description: "世界上最偏远的有人居住岛屿之一，栖息着特里斯坦信天翁、跳岩企鹅和特里斯坦鸫鸟",
      image: images.journey.tristan,
    },
    {
      name: "南乔治亚岛",
      alt: "南乔治亚岛",
      description: "无与伦比的野生动物和冰川景观，充满极地探险历史",
      image: images.journey.southGeorgia,
    },
    {
      name: "南极洲",
      alt: "南极洲",
      description: "世界第七大洲，壮丽的冰川与令人难以置信的多样化野生动物",
      image: images.journey.antarctica,
    },
  ],
  stats: [
    {
      number: "3",
      title: "大洲",
      description: "非洲、大西洋群岛、南极洲",
    },
    {
      number: "2",
      title: "大洋",
      description: "大西洋与南大洋",
    },
    {
      number: "5",
      title: "企鹅种类",
      description: "从帝企鹅到跳岩企鹅",
    },
  ],
} as const;
