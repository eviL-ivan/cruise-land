import { images } from "./images";

export const itinerary = {
  title: "Expedition Itinerary",
  subtitle:
    "21 days / 20 nights of an unforgettable journey across three continents and two oceans",
  activitiesLabel: "Main Activities:",
  importantNote:
    "This is a general route plan. Expedition cruises take place in remote and hard-to-reach regions, so the actual itinerary depends on weather, ice conditions, and the instructions of the expedition leader and the captain.",
  days: [
    {
      day: "Day 1",
      location: "Cape Town, South Africa",
      title: "Cape Town, South Africa",
      description:
        "The journey begins with an airport meet-and-greet and accommodation in Cape Town. The city is a cultural hub of South Africa: Table Mountain, Cape of Good Hope, historic city center, Victoria & Alfred Waterfront, National Botanical Garden. In the evening — embarkation on SH Diana and an expedition briefing.",
      image: images.itinerary.day1,
      activities: [
        "Accommodation at a 5* hotel in Cape Town",
        "City sightseeing tour",
        "Embarkation on SH Diana",
        "Welcome briefing",
      ],
    },
    {
      day: "Days 2–5",
      location: "Atlantic Ocean",
      title: "At sea, crossing the Atlantic",
      description:
        "Expert lectures on marine biology, geology, history of exploration, and indigenous cultures; discussions and presentations. Observation of seabirds and marine mammals from open decks; relaxation in lounges and cabins.",
      image: images.itinerary.day2,
      activities: [
        "Lectures on the history of polar expeditions",
        "Photography workshops",
        "Seabird watching",
        "Discussions with experts",
      ],
    },
    {
      day: "Day 6",
      location: "Tristan da Cunha",
      title: "Tristan da Cunha Island",
      description:
        "One of the most remote archipelagos in the world: rare Atlantic yellow-nosed albatrosses, skuas, northern rockhopper penguins, sea lions, and seals; dolphins are also possible. A unique, isolated ecosystem found nowhere else.",
      image: images.itinerary.day3,
      activities: [
        "Landing on the island (weather permitting)",
        "Observing northern rockhopper penguins",
        "Encountering sea lions and seals",
        "Watching yellow-nosed albatrosses",
      ],
    },
    {
      day: "Days 7–10",
      location: "Atlantic Ocean",
      title: "Back at sea, crossing the Atlantic",
      description:
        "Rest and enjoy the ocean. Spa, gym, library with themed books, games room. Possible visit to the bridge (by invitation/schedule). Outdoor restaurants and bar, Club Lounge.",
      image: images.itinerary.day4,
      activities: [
        "Visiting the spa and gym",
        "Bridge visit",
        "Relaxing in the Club Lounge",
        "Time for reading and leisure",
      ],
    },
    {
      day: "Days 11 & 12",
      location: "South Georgia",
      title: "South Georgia",
      description:
        "A historic archipelago: in the 19th–20th centuries — center of whaling. Today — incredible biodiversity: colonies of king penguins, elephant seals, fur seals; petrels, skuas. Possible Zodiac cruises and landings (weather and permits permitting), visit to Shackleton’s grave in Grytviken.",
      image: images.itinerary.day5,
      activities: [
        "Landing at Grytviken Bay",
        "Visit to Ernest Shackleton’s grave",
        "Observing king penguins",
        "Zodiac cruises along the coast",
      ],
    },
    {
      day: "Days 13 & 14",
      location: "Southern Ocean",
      title: "At sea — heading for the Antarctic Peninsula",
      description:
        "Continuing lectures and meetings with the expedition team. Fine dining in Swan Hellenic restaurants, room service, drinks in the Club Lounge. Personalized service for every taste.",
      image: images.itinerary.day6,
      activities: [
        "Lectures by the expedition team",
        "Fine dining in restaurants",
        "Relaxation and preparation for Antarctica",
        "Marine wildlife observation",
      ],
    },
    {
      day: "Day 15",
      location: "South Shetland Islands",
      title: "South Shetland Islands",
      description:
        "An Antarctic archipelago on the edge of the pack ice: milder climate, mosses, and lichens. On the beaches — Weddell seals, crabeater seals, elephant seals; various penguin and bird species (giant petrel, Antarctic tern, etc.).",
      image: images.itinerary.day7,
      activities: [
        "Landing on the South Shetland Islands",
        "Observing Weddell and crabeater seals",
        "Encountering different penguin species",
        "Studying Antarctic flora",
      ],
    },
    {
      day: "Days 16–18",
      location: "Antarctic Peninsula",
      title: "Exploring the Antarctic Peninsula",
      description:
        "Mighty glaciers, majestic icebergs, snow-covered fjords. Landings 1–2 times a day (on average), weather and IAATO rules permitting; Zodiac cruises to glaciers and icebergs, penguin and seal watching. Possible hikes to viewpoints over ice shelves.",
      image: images.itinerary.day8,
      activities: [
        "Landings on the Antarctic Peninsula (1–2 times a day)",
        "Zodiac cruises among icebergs",
        "Observing Adélie, Gentoo, and Chinstrap penguins",
        "Hikes to panoramic viewpoints",
        "Optional kayaking",
        "Polar plunge (weather permitting)",
      ],
    },
    {
      day: "Days 19 & 20",
      location: "Drake Passage",
      title: "Crossing the Antarctic Convergence",
      description:
        "Crossing the Drake Passage (all-inclusive service aboard SH Diana). Perfect time to socialize and reflect; bridge access by schedule; navigating weather windows for a successful crossing.",
      image: images.itinerary.day9,
      activities: [
        "Farewell gala dinner",
        "Presentation of participants’ photos",
        "Certificate ceremony",
        "Sharing impressions",
      ],
    },
    {
      day: "Day 21",
      location: "Ushuaia, Argentina",
      title: "Ushuaia and flight to Buenos Aires",
      description:
        "Return through the Beagle Channel to Ushuaia. Then — included flight to Buenos Aires (as per program); optional extensions available: Iguazu and/or land tours across Argentina.",
      image: images.itinerary.day9,
      activities: [
        "Disembarkation",
        "Flight Ushuaia — Buenos Aires (included)",
        "Optional land tours",
      ],
    },
  ],
} as const;
