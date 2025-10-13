// Переопределения контента для круиза USHCPT26 (Ushuaia → Cape Town)
// Обратный маршрут: из Антарктиды в Африку

import type { CruiseContentOverride } from "../types"
import { images } from "../../images"
import { itinerary } from "./itinerary.en"
import { cabins } from "./cabins.en"

export const override: CruiseContentOverride = {
  // Переопределяем маршрут
  itinerary,

  // Переопределяем цены кают
  cabins,

  // Обновляем мета-теги для обратного маршрута
  meta: {
    title: "South Atlantic Expedition from Ushuaia to Cape Town | SH Diana",
    description:
      "Swan Hellenic expedition cruise aboard SH Diana. From Antarctica to South Africa through South Georgia and South Atlantic Islands. 21 days across 3 continents and 2 oceans.",
  },

  // Обновляем заголовок Hero для обратного направления
  hero: {
    title: "South Atlantic Expedition",
    titleAccent: "to Africa",
    subtitle:
      "Antarctic Peninsula, South Georgia, and South Atlantic Islands aboard the expedition vessel SH Diana",
  },

  // Обновляем описание маршрута
  overview: {
    price: "$14,100", // Базовая цена для overview
    description:
      "This is not just a cruise — it's an intellectual and emotional expedition through three worlds where Antarctica, the Atlantic, and Africa meet.",
    detailedDescription:
      "Experience the journey from the frozen wilderness of Antarctica to the vibrant shores of South Africa. Witness penguin colonies, explore remote islands, and sail across the dramatic South Atlantic Ocean — all from the elegant comfort of Swan Hellenic's newest flagship, SH Diana.",
    mapImage: "/map-ushu-cape.png", // Карта обратного маршрута
    brochureUrl: "/brochures/SH_TG_D3525_South Atlantic cruise_7Mar-v1.pdf", // Брошюра для USHCPT26
  },

  // Обновляем статистику
  cta: {
    stats: [
      { number: "21", label: "Days of Travel" },
      { number: "5", label: "Penguin Species" },
      { number: "∞", label: "Unforgettable Moments" },
    ],
  },

  // Обновляем хайлайты для обратного маршрута
  highlights: [
    {
      number: "1",
      title: "Ushuaia & Tierra del Fuego",
      description:
        "Start your journey in Ushuaia — the southernmost city in the world, gateway to Antarctica.",
      image: images.itinerary.day10, // Beautiful Ushuaia photo
    },
    {
      number: "2",
      title: "Transatlantic Expedition",
      description:
        "A transatlantic expedition across 3 continents and 2 oceans aboard a high ice-class vessel.",
      image: images.highlights[1], // Expedition ship
    },
    {
      number: "3",
      title: "Magic of the Ocean",
      description:
        "Experience the dramatic transition from polar ice to subtropical warmth.",
      image: images.highlights[2], // Ocean views
    },
    {
      number: "4",
      title: "Five Penguin Species",
      description:
        "Encounter at least five penguin species; a unique chance to see northern rockhopper penguins and sea lions.",
      image: images.highlights[3], // Penguins variety
    },
    {
      number: "5",
      title: "Tristan da Cunha",
      description:
        "Sunrise off the coast of Tristan da Cunha — one of the most remote islands on Earth.",
      image: images.highlights[4], // Tristan da Cunha
    },
    {
      number: "6",
      title: "Stories of Great Explorers",
      description:
        "Lectures on the history of polar explorers: Shackleton, Amundsen, and others.",
      image: images.highlights[5], // Expedition stories
    },
    {
      number: "7",
      title: "South Georgia",
      description:
        "Immerse yourself in the world of South Georgia — a true celebration of wildlife.",
      image: images.highlights[6], // South Georgia wildlife
    },
    {
      number: "8",
      title: "Creativity & Inspiration",
      description: "Creative workshops onboard: photography, painting, arts.",
      image: images.highlights[7], // Creative workshops
    },
    {
      number: "9",
      title: "Swimming in the Southern Ocean",
      description:
        "Take a polar plunge in the Southern Ocean (water temperature ~ −2…+10 °C).",
      image: images.highlights[8], // Water/swimming
    },
    {
      number: "10",
      title: "Cape Town Arrival",
      description:
        "Arrive in Cape Town — one of the world's most beautiful cities with Table Mountain and vibrant culture.",
      image: images.highlights[0], // Cape Town Table Mountain
    },
    {
      number: "11",
      title: "Kayaking Among Icebergs",
      description: "Guided kayaking among icebergs in Antarctic waters.",
      image: images.highlights[10], // Kayaking
    },
    {
      number: "12",
      title: "Polar Autumn",
      description:
        "Experience the changing seasons as you journey from Antarctic autumn to African summer.",
      image: images.highlights[11], // Icebergs/seasons
    },
  ],
}
