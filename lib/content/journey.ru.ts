import { images } from "./images"

export const journey = {
  title: "Путешествие вашей мечты",
  description:
    "Трансатлантическая экспедиция через 3 материка и 2 океана на судне высокого ледового класса PC6",
  destinations: [
    {
      name: "Кейптаун",
      alt: "Кейптаун",
      description: "Мыс Доброй Надежды и Столовая гора",
      image: images.journey.capeTown,
    },
    {
      name: "Тристан-да-Кунья",
      alt: "Тристан-да-Кунья",
      description: "Один из самых удалённых островов Земли",
      image: images.journey.tristan,
    },
    {
      name: "Южная Георгия",
      alt: "Южная Георгия",
      description: "Дикая природа и королевские пингвины",
      image: images.journey.southGeorgia,
    },
    {
      name: "Антарктида",
      alt: "Антарктида",
      description: "Самый труднодоступный континент",
      image: images.journey.antarctica,
    },
  ],
  stats: [
    {
      number: "3",
      title: "Континента",
      description: "Африка, острова Атлантики, Антарктида",
    },
    {
      number: "2",
      title: "Океана",
      description: "Атлантический и Южный океаны",
    },
    {
      number: "∞",
      title: "Впечатлений",
      description: "Незабываемые моменты каждый день",
    },
  ],
} as const
