import { images } from "../../images";

export const itinerary = {
  title: "Expedition Itinerary",
  subtitle:
    "21 days / 20 nights of an unforgettable journey from Antarctica to Africa",
  activitiesLabel: "Main Activities:",
  importantNote:
    "This is a general route plan. Expedition cruises take place in remote and hard-to-reach regions, so the actual itinerary depends on weather, ice conditions, and the instructions of the expedition leader and the captain.",
  days: [
    {
      day: "Day 1",
      location: "Ushuaia, Argentina",
      title: "Ushuaia, Argentina",
      description:
        "Ushuaia is the gateway to the White Continent. Nestled in the foothills of the snow-capped Martial Range in Argentina's Patagonia region, Ushuaia's colourful streets and mismatched buildings cascade from the imposing mountains before coming to an abrupt halt at the shores of the Beagle Channel. Often described as 'the End of the World', the city carries the reputation well - the moody weather and dramatic surroundings certainly help.",
      image: images.itinerary.day10, // Ushuaia image
      activities: [
        "Embarkation on SH Diana",
        "Welcome briefing",
        "City exploration",
        "Departure through Beagle Channel",
      ],
    },
    {
      day: "Day 2",
      location: "Drake Passage",
      title: "Crossing the Drake Passage",
      description:
        "Crossing the Drake Passage southbound. Expert lectures on marine biology, geology, history of exploration, and indigenous cultures; discussions and presentations. Observation of seabirds and marine mammals from open decks; relaxation in lounges and cabins.",
      image: images.itinerary.day9,
      activities: [
        "Expert lectures on polar exploration",
        "Photography workshops",
        "Relaxation and observation",
        "Expedition briefings",
      ],
    },
    {
      day: "Days 3-6",
      location: "Antarctic Peninsula",
      title: "Antarctic Peninsula Exploration",
      description:
        "Among captivating glaciers, majestic icebergs and snowy islands, the Antarctic Peninsula is where most visitors to the White Continent live their Antarctica dream. Mighty glaciers, majestic icebergs, snow-covered fjords. Landings 1–2 times a day (on average), weather and IAATO rules permitting; Zodiac cruises to glaciers and icebergs, penguin and seal watching.",
      image: images.itinerary.day8,
      activities: [
        "Landings on the Antarctic Peninsula (1–2 times a day)",
        "Zodiac cruises among icebergs",
        "Observing Adélie, Gentoo, and Chinstrap penguins",
        "Optional kayaking",
        "Polar plunge (weather permitting)",
      ],
    },
    {
      day: "Days 7-8",
      location: "Southern Ocean",
      title: "At sea — heading for South Georgia",
      description:
        "Continuing lectures and meetings with the expedition team. Fine dining in Swan Hellenic restaurants, room service, drinks in the Club Lounge. Personalized service for every taste. Perfect time to relax and prepare for South Georgia.",
      image: images.itinerary.day6,
      activities: [
        "Lectures by the expedition team",
        "Fine dining in restaurants",
        "Relaxation and preparation",
        "Marine wildlife observation",
      ],
    },
    {
      day: "Days 9-11",
      location: "South Georgia",
      title: "South Georgia, United Kingdom",
      description:
        "Often called the 'Galapagos of the Poles,' South Georgia has a number of landing sites with tens of thousands of King Penguins and gentoo penguins, making up some of the largest population in the world alongside harrumphing elephant seals. Among its remarkable sites is Grytviken, the historic whaling station where legendary British explorer Ernest Shackleton (1874–1922) rests in peace.",
      image: images.itinerary.day5,
      activities: [
        "Landing at Grytviken Bay",
        "Visit to Ernest Shackleton's grave",
        "Observing king penguins",
        "Zodiac cruises along the coast",
        "Watching elephant seals and fur seals",
      ],
    },
    {
      day: "Days 12-15",
      location: "Atlantic Ocean",
      title: "Crossing the Atlantic",
      description:
        "Rest and enjoy the ocean. Spa, gym, library with themed books, games room. Possible visit to the bridge (by invitation/schedule). Outdoor restaurants and bar, Club Lounge. Days at sea are the perfect chance to relax, unwind and enjoy all ship amenities.",
      image: images.itinerary.day4,
      activities: [
        "Visiting the spa and gym",
        "Bridge visit",
        "Relaxing in the Club Lounge",
        "Time for reading and leisure",
      ],
    },
    {
      day: "Day 16",
      location: "Tristan da Cunha",
      title: "Tristan da Cunha, United Kingdom",
      description:
        "Seabirds outnumber humans on this remote British outpost in the middle of the southern Atlantic. Millions of species like the rare yellow-nosed albatross, skuas, terns and petrels, including the endangered Tristan albatross, inhabit the bluffs. Northern rockhopper penguins breed on the beaches, while upwellings attract whales and dolphins. Fur seals also haul out on the island teeming with avian life.",
      image: images.itinerary.day3,
      activities: [
        "Landing on the island (weather permitting)",
        "Observing northern rockhopper penguins",
        "Encountering sea lions and seals",
        "Watching yellow-nosed albatrosses",
      ],
    },
    {
      day: "Days 17-20",
      location: "Atlantic Ocean",
      title: "Final days at sea",
      description:
        "Spend your final days at sea enjoying your boutique 5-star ship. Expert lectures on marine biology, geology, and South African culture. Observation of seabirds and marine mammals from open decks. Farewell celebrations and sharing expedition memories.",
      image: images.itinerary.day2,
      activities: [
        "Farewell gala dinner",
        "Presentation of participants' photos",
        "Certificate ceremony",
        "Seabird watching",
      ],
    },
    {
      day: "Day 21",
      location: "Cape Town, South Africa",
      title: "Cape Town, South Africa",
      description:
        "Between mountains and the ocean, Cape Town is a vibrant, multicultural city with a lively waterfront featuring seafood restaurants, shopping and attractions. A cable car transports visitors to distinctive Table Mountain with sweeping views. Boats head to Robben Island, where Nelson Mandela was incarcerated. Boulders Beach is home to African penguins, and world-class Stellenbosch vineyards offer wine tastings amid Cape Dutch architecture.",
      image: images.itinerary.day1,
      activities: [
        "Disembarkation",
        "Optional Table Mountain visit",
        "City exploration",
        "Transfer arrangements",
      ],
    },
  ],
} as const;
