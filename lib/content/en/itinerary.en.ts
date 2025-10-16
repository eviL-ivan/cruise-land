import { images } from "../images";

export const itinerary = {
  title: "Expedition Itinerary",
  subtitle:
    "20 nights of an unforgettable specialised journey across three continents and two oceans",
  activitiesLabel: "Main Activities:",
  importantNote:
    "This is a general route plan. Expedition cruises take place in remote and hard-to-reach regions, so the actual itinerary depends on weather, ice conditions, and the instructions of the expedition leader and the captain.",
  days: [
    {
      day: "Day 1",
      location: "Cape Town, South Africa",
      title: "Cape Town, South Africa",
      description:
        "Your journey begins with an airport meet-and-greet before being transferred to your 5 star hotel in Cape Town the day prior to your voyage. The city is a cultural hub of South Africa: Table Mountain, Cape of Good Hope, historic city centre, Victoria & Alfred Waterfront, National Botanical Garden. The evening is at your leisure before being transferred to SH Diana the following day, in time for a welcome briefing.",
      image: images.itinerary.day1,
      activities: [
        "Accommodation at a 5* hotel in Cape Town",
        "City sightseeing at leisure",
        "Transfer to SH Diana",
        "Welcome briefing",
      ],
    },
    {
      day: "Days 2–5",
      location: "Atlantic Ocean",
      title: "At sea, crossing the Atlantic",
      description:
        "The next few days at sea gives you the perfect time to get to know SH Diana, her crew and your fellow explorers. Make use of the wellness area, sauna, steam room swimming pool and hot tub, or head to the library or Club Lounge with your favourite book. Our expedition team and esteemed guest lecturers will provide an insight on marine biology, geology, history of exploration, and indigenous cultures. As we sail towards Tristan da Cunha, keep an eye out for seabirds and marine mammals from open decks or whilst relaxing in lounges or your stateroom.",
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
        "Step ashore at the world's most isolated inhabited archipelago, a destination very few explorers ever reach. Rare Atlantic yellow-nosed albatrosses, skuas, northern rockhopper penguins, sea lions, and seals. A unique, isolated ecosystem found nowhere else in the world.",
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
        "Back at sea, crossing the Atlantic Ocean. Rest and enjoy the ocean. Relax with a spa treatment, head to the gym, or relax in the observation lounge over a boardgame or game of cards, or listen to one of our expert lecturers over a glass of wine. Over these days, there'll be the opportunity to visit the bridge and enjoy the panoramic view from the top deck, whilst keeping a look out for passing wildlife as we head towards South Georgia.",
      image: images.itinerary.day4,
      activities: [
        "Visit the spa and gym",
        "Meet the officers during a bridge visit",
        "Relax in the Observation Lounge",
        "Enjoy afternoon tea in the Club Lounge",
      ],
    },
    {
      day: "Days 11 & 12",
      location: "South Georgia",
      title: "South Georgia",
      description:
        "Welcome to South Georgia, renowned for its towering glaciers, thriving wildlife and dramatic history of past explorers. We'll visit Grytviken, home to South Georgia's old whaling station and the resting place of legendary explorer Sir Ernest Shackleton. Wildlife Spectacle in South Georgia – Witness vast colonies of king penguins, elephant seals, and fur seals at places like St. Andrews Bay and Gold Harbour. Follow in Shackleton's Footsteps – Trace the routes of heroic age explorers through iconic sites like Elephant Island.",
      image: images.itinerary.day5,
      activities: [
        "Landing at Grytviken Bay",
        "Visit to Ernest Shackleton's grave",
        "Observing vast colonies of King Penguins",
        "Zodiac cruises along the coast",
      ],
    },
    {
      day: "Days 13 & 14",
      location: "Southern Ocean",
      title: "At sea — heading to the Antarctic Peninsula",
      description:
        "Over the next couple of days, recharge batteries as we head to the Antarctic peninsula. Take in the views, listen to new lectures and make the most of your time with the expedition team. Dine a la carte in the Swan Hellenic restaurants with new friends or relax in your stateroom with a movie and room service.",
      image: images.itinerary.day6,
      activities: [
        "Lectures by the expedition team",
        "Fine dining in our restaurants",
        "Relax & prepare for the Antarctic peninsula",
        "Marine wildlife observation",
      ],
    },
    {
      day: "Days 15–18",
      location: "Antarctic Peninsula",
      title: "Antarctic Peninsula",
      description:
        "Antarctic Peninsula Wonders – Cruise among towering icebergs, glaciers, and snow-covered peaks for once-in-a-lifetime scenery. Extraordinary Wildlife Encounters – Spot various whales, penguins, and millions of seabirds across the South Atlantic and Antarctic. With a maximum of 192 guests, we aim for 2 landings a day, depending on weather conditions and availability, we'll visit dramatic, seldom-seen locations such as the Danger Islands, Paulet Island, Brown Bluff, and volcanic Deception Island.",
      image: images.itinerary.day8,
      activities: [
        "Zodiac cruises through the icy waters",
        "Observing Adélie, Gentoo, and Chinstrap penguins",
        "Hikes to panoramic viewpoints",
        "Optional kayaking excursions",
        "Polar plunge",
      ],
    },
    {
      day: "Days 19 & 20",
      location: "Drake Passage",
      title: "Crossing the Drake Passage",
      description:
        "Crossing the Drake Passage is considered a rite of passage following in the footsteps of explorers of old. It's the perfect time to socialize with the Swan Hellenic team and your new friends as you reflect on the expedition voyage.",
      image: images.itinerary.day9,
      activities: [
        "Farewell gala dinner",
        "Visit the bridge for the final time",
        "Presentation of guest photos & voyage video",
        "Certificate ceremony",
        "Sharing impressions",
      ],
    },
    {
      day: "Day 21",
      location: "Ushuaia, Argentina",
      title: "Ushuaia",
      description:
        "Your voyage ends as you arrive at the End of the World – Disembark in Ushuaia, Argentina, the southernmost city on Earth, completing a true expedition of discovery, where you'll be transferred to the airport for your Charter flight to Buenos Aires.",
      image: images.itinerary.day10,
      activities: [
        "Disembarkation",
        "Transfer to airport",
        "Charter flight from Ushuaia to Buenos Aires (included)",
      ],
    },
  ],
} as const;
