import { images } from "../images";

export const journey = {
  title: "The Journey of Your Dreams",
  description:
    "A transatlantic expedition across 3 continents and 2 oceans aboard our boutique ice class ship, SH Diana",
  destinations: [
    {
      name: "Cape Town",
      alt: "Cape Town",
      description: "Your journey begins in this modern cosmopolitan city in South Africa beneath the imposing Table Mountain",
      image: images.journey.capeTown,
    },
    {
      name: "Tristan da Cunha",
      alt: "Tristan da Cunha",
      description: "One of the most remote islands in the world inhabited by Tristan Albatross, Rockhopper penguins and Tristan thrush",
      image: images.journey.tristan,
    },
    {
      name: "South Georgia",
      alt: "South Georgia",
      description: "Unparalleled wildlife and glacier filled landscapes, filled with polar exploration history",
      image: images.journey.southGeorgia,
    },
    {
      name: "Antarctica",
      alt: "Antarctica",
      description: "The world's 7th continent, dramatic glaciers & incredible diverse wildlife",
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
      number: "5",
      title: "Species of Penguin",
      description: "From King to Rockhopper penguins",
    },
  ],
} as const;
