import { images } from "../images";

export const journey = {
  title: "梦想之旅",
  description:
    "搭乘高等级 PC6 冰级探险船，横跨 3 大洲与 2 大洋的跨大西洋探险之旅",
  destinations: [
    {
      name: "开普敦",
      alt: "开普敦",
      description: "好望角与桌山",
      image: images.journey.capeTown,
    },
    {
      name: "特里斯坦-达库尼亚",
      alt: "特里斯坦-达库尼亚",
      description: "地球上最偏远的岛屿之一",
      image: images.journey.tristan,
    },
    {
      name: "南乔治亚岛",
      alt: "南乔治亚岛",
      description: "野生动物与帝企鹅",
      image: images.journey.southGeorgia,
    },
    {
      name: "南极洲",
      alt: "南极洲",
      description: "最难抵达的大陆",
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
      number: "∞",
      title: "感受",
      description: "每天都是难忘的瞬间",
    },
  ],
} as const;
