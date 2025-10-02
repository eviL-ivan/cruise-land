import { images } from "./images";

export const journey = {
  title: "The Journey of Your Dreams",
  description:
    "A transatlantic expedition across 3 continents and 2 oceans aboard a high ice-class PC6 vessel",
  destinations: [
    {
      name: "Cape Town",
      alt: "Cape Town",
      description: "Cape of Good Hope and Table Mountain",
      image: images.journey.capeTown,
    },
    {
      name: "Tristan da Cunha",
      alt: "Tristan da Cunha",
      description: "One of the most remote islands on Earth",
      image: images.journey.tristan,
    },
    {
      name: "South Georgia",
      alt: "South Georgia",
      description: "Wildlife and king penguins",
      image: images.journey.southGeorgia,
    },
    {
      name: "Antarctica",
      alt: "Antarctica",
      description: "The most inaccessible continent",
      image: images.journey.antarctica,
    },
  ],
  stats: [
    {
      number: "3",
      title: "Continents",
      description: "Africa, Atlantic Islands, Antarctica",
    },
    {
      number: "2",
      title: "Oceans",
      description: "The Atlantic and Southern Oceans",
    },
    {
      number: "∞",
      title: "Impressions",
      description: "Unforgettable moments every day",
    },
  ],
} as const;
