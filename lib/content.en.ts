// Content for the Antarctic cruise landing page
// Centralized storage of all texts for simplified translation and management
// Data sourced from the official brandbook PDF

import { images } from "./content/images";
import { journey } from "./content/en/journey.en";
import { itinerary } from "./content/en/itinerary.en";
import { cabins } from "./content/en/cabins.en";
import { map } from "./content/en/map.en";

export const content = {
  // Metadata
  meta: {
    title: "Transatlantic Expedition from Cape Town to Ushuaia | SH Diana",
    description:
      "Swan Hellenic expedition cruise aboard SH Diana. South Atlantic Islands, South Georgia and the Antarctic Peninsula. 21 days across 3 continents and 2 oceans.",
  },

  // Header
  header: {
    logoAlt: "SH Diana",
    nav: {
      route: "Route",
      itinerary: "Itinerary",
      ship: "Ship",
      cabins: "Staterooms",
      contact: "Contact",
    },
    bookButton: "Book Now",
    languages: {
      ru: "RU",
      en: "EN",
      zh: "中文",
    },
  },

  // Cruise Overview
  overview: {
    cruiseCode: "D2925111520",
    route: "Cape Town - Ushuaia",
    dates: "11.15.25-12.05.25",
    datesLabel: "Dates",
    nights: "20 nights",
    durationLabel: "Duration",
    ship: "SH Diana",
    shipLabel: "Ship",
    priceLabel: "From",
    price: "$13,780",
    priceNote: "per person",
    mapImage: images.overview.map,
    mapAlt: "Cruise route map",
    mapButton: "Map",
    description: "This is not just a cruise — it's an intellectual and emotional expedition through three worlds where Africa, the Atlantic, and Antarctica meet.",
    detailedDescription: "Only here can guests witness the rare Northern Rockhopper penguins, explore the planet's most isolated island, and greet the dawn beside sculpted icebergs — all from the elegant comfort of Swan Hellenic's newest flagship, SH Diana.",
    experienceButton: "Watch Experience",
  },

  // Hero Section
  hero: {
    title: "Transatlantic Expedition",
    titleAccent: "to Antarctica",
    subtitle:
      "South Atlantic Islands, South Georgia, and the Antarctic Peninsula aboard the expedition vessel SH Diana",
    highlight: "3 Continents & 2 Oceans",
    bookButton: "Request a quote",
    learnMoreButton: "Learn More",
    imageAlt: "Antarctica",
    image: images.hero.image,
    video: images.hero.video,
  },

  // Journey Section - imported from module
  journey,

  // Map Route
  map,

  // Highlights
  highlights: [
    {
      number: "1",
      title: "Cape Town & Cape of Good Hope",
      description:
        "Discover Cape Town — one of the world’s most beautiful cities: the Cape of Good Hope and Table Mountain.",
      image: images.highlights[0],
    },
    {
      number: "2",
      title: "Transatlantic Expedition",
      description:
        "A transatlantic expedition across 3 continents and 2 oceans aboard a high ice-class vessel.",
      image: images.highlights[1],
    },
    {
      number: "3",
      title: "Magic of the Ocean",
      description:
        "Feel the magic of the ocean on your way to the coldest continent on Earth.",
      image: images.highlights[2],
    },
    {
      number: "4",
      title: "Five Penguin Species",
      description:
        "Encounter at least five penguin species; a unique chance to see northern rockhopper penguins and sea lions.",
      image: images.highlights[3],
    },
    {
      number: "5",
      title: "Tristan da Cunha",
      description:
        "Sunrise off the coast of Tristan da Cunha — one of the most remote islands on Earth.",
      image: images.highlights[4],
    },
    {
      number: "6",
      title: "Stories of Great Explorers",
      description:
        "Lectures on the history of polar explorers: Shackleton, Amundsen, and others.",
      image: images.highlights[5],
    },
    {
      number: "7",
      title: "South Georgia",
      description:
        "Immerse yourself in the world of South Georgia — a true celebration of wildlife.",
      image: images.highlights[6],
    },
    {
      number: "8",
      title: "Creativity & Inspiration",
      description: "Creative workshops onboard: photography, painting, arts.",
      image: images.highlights[7],
    },
    {
      number: "9",
      title: "Swimming in the Southern Ocean",
      description:
        "Take a polar plunge in the Southern Ocean (water temperature ~ −2…+10 °C).",
      image: images.highlights[8],
    },
    {
      number: "10",
      title: "Reaching Antarctica",
      description: "Be among the few who set foot on the shores of Antarctica.",
      image: images.highlights[9],
    },
    {
      number: "11",
      title: "Kayaking Among Icebergs",
      description: "Guided kayaking among icebergs.",
      image: images.highlights[10],
    },
    {
      number: "12",
      title: "Polar Summer",
      description:
        "Polar summer: sparkling icebergs and the thunder of calving glaciers.",
      image: images.highlights[11],
    },
  ],

  // Itinerary - imported from module
  itinerary,

  // Wildlife
  wildlife: {
    title: "Antarctic Wildlife",
    subtitle:
      "Meet king penguins, wandering albatrosses with wingspans up to 4 meters, and majestic whales in their natural habitat",
    animals: [
      {
        name: "Penguins",
        description:
          "5 different species, including king and northern rockhopper penguins",
        image: images.wildlife[0],
        alt: "Penguin colony",
      },
      {
        name: "Whales",
        description: "Observe majestic whales in coastal waters",
        image: images.wildlife[1],
        alt: "Whales in the ocean",
      },
      {
        name: "Albatrosses",
        description: "Wandering albatrosses with wingspans up to 4 meters",
        image: images.wildlife[2],
        alt: "Wandering albatross",
      },
    ],
  },

  // Ship
  ship: {
    name: "SH Diana",
    brand: "Swan Hellenic",
    inServiceSince: "April 2023",
    iceClass: "PC6",
    capacity: "196 passengers",
    crew: "140 crew members",
    description:
      "A true boutique hotel at sea. Enjoy an infinity pool with ocean views, fine dining restaurants with dishes by renowned chefs, and stylish interiors crafted from natural materials.",
    amenities: [
      { title: "Infinity Pool", description: "With panoramic ocean views" },
      { title: "Fine Dining", description: "Swan Hellenic restaurants" },
      { title: "Spa Center", description: "Jacuzzi, sauna, beauty salon" },
      { title: "Gym", description: "Modern equipment" },
      { title: "PC6 Ice Class", description: "High Arctic ice class vessel" },
      { title: "Safety", description: "All ship systems have redundancy" },
    ],
    features: [
      "Infinity pool on the open deck",
      "Fine dining restaurants",
      "Spa center, sauna, and gym",
      "Library and lecture spaces",
      "Club lounge, poolside grill bar",
      "Medical center and expedition laboratory",
      "Swan’s Nest observation platform",
    ],
    specs: {
      length: "125 m",
      width: "23 m",
      tonnage: "12,100 GT",
      decks: "9",
      iceStrength: "100 cm",
      propulsion: "Hybrid diesel-electric",
      speed: "Average 15.5 knots",
    },
    images: [
      { src: images.ship[0], alt: "SH Diana pool" },
      { src: images.ship[1], alt: "Restaurant" },
      { src: images.ship[2], alt: "SH Diana ship" },
    ],
  },

  // Cabins - imported from module
  cabins,

  // Call to Action
  cta: {
    title: "Start Your Journey",
    subtitle:
      "For any inquiries and reservations, please contact your travel manager. We’ll help you organize an unforgettable journey to Antarctica.",
    emailButton: "Email Us",
    phoneButton: "Request a Call",
    stats: [
      { number: "21", label: "Days of Travel" },
      { number: "5", label: "Penguin Species" },
      { number: "∞", label: "Unforgettable Moments" },
    ],
  },

  // Footer
  footer: {
    aboutUs: {
      title: "About Us",
      links: [
        { text: "Our Story", href: "https://swanhellenic.com/our-story" },
        { text: "Our Team", href: "https://swanhellenic.com/our-team" },
        { text: "Sustainability", href: "https://swanhellenic.com/sustainability" },
        { text: "Careers", href: "https://swanhellenic.vcrew.com", target: "_blank" },
        { text: "Press Centre", href: "https://swanhellenic.com/press-centre" },
        { text: "Contact Us", href: "https://swanhellenic.com/contacts" },
      ],
    },
    legalInfo: {
      title: "Legal Information",
      links: [
        { text: "Terms Of Use", href: "https://swanhellenic.com/terms" },
        { text: "Privacy Policy", href: "https://swanhellenic.com/privacy" },
        { text: "Cookie Policy", href: "https://swanhellenic.com/cookie" },
        { text: "Modern Slavery Act", href: "https://swanhellenic.com/modern-slavery-act" },
        { text: "Ship Safety", href: "https://swanhellenic.com/experience/ship-safety" },
        { text: "Promotional T&C", href: "https://swanhellenic.com/promotional_terms" },
        { text: "Shore Excursions T&C", href: "https://swanhellenic.com/shore-excursions-terms" },
        { text: "Destination Services T&C", href: "https://swanhellenic.com/destination-services-terms" },
      ],
    },
    swanExperience: {
      title: "The Swan Experience",
      links: [
        { text: "Latest News", href: "https://swanhellenic.com/latest-news/" },
        { text: "FAQ", href: "https://swanhellenic.com/faq" },
        { text: "Solo Traveller", href: "https://swanhellenic.com/solo-traveller" },
        { text: "Charter Cruises", href: "https://swanhellenic.com/charter-cruises" },
        { text: "Groups", href: "https://promo.swanhellenic.com/groups/" },
        { text: "Weddings", href: "https://swanhellenic.com/cruise-wedding-package" },
      ],
    },
    usefulLinks: {
      title: "Useful Links",
      links: [
        { text: "Find A Travel Agent", href: "https://swanhellenic.com/travelagents" },
        { text: "Brochures", href: "https://swanhellenic.com/brochures" },
        { text: "Promotions", href: "https://swanhellenic.com/promotions" },
        { text: "Travel Partners", href: "https://swanhellenic.com/partners" },
      ],
    },
    social: {
      title: "Connect with us",
      links: [
        { name: "facebook", href: "https://www.facebook.com/swanhellenic" },
        { name: "instagram", href: "https://www.instagram.com/swanhelleniccruises/" },
        { name: "youtube", href: "https://www.youtube.com/user/swanhellenic" },
        { name: "linkedin", href: "https://www.linkedin.com/company/swan-hellenic-limited/" },
      ],
    },
    copyright: "© 2025 Swan Hellenic. All Rights Reserved",
    disclaimerWildlife: "All pictures and videos of wildlife were taken with a professional zoom lens from a distance required under environmental laws, ensuring the safety of both the wildlife and the environment",
    disclaimerWebsite: "The website (www.swanhellenic.com) is owned and operated by Swan Hellenic Travel Limited (20, Themistokli Dervi, Flat/Office 301, 1066, Nicosia, Cyprus)",
  },

  // UI
  ui: { slideLabel: "Go to slide" },

  // Optional Services
  optionalServices: [
    "International flights to Cape Town and return from Buenos Aires",
    "Land tours in South Africa and Argentina before/after the cruise",
    "Mandatory medical insurance",
    "Premium Wi-Fi packages",
    "Kayaking excursions during the cruise",
    "Premium beverages, spa, and beauty treatments",
  ],
} as const;

export type Content = typeof content;
