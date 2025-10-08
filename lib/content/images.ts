// Image paths - language independent
export const images = {
  hero: {
    image: "/places/hero-antarctica.jpg",
    video: "/back.mp4",
    poster: "/bg.webp",
  },

  journey: {
    capeTown: "/places/cape-town.jpg",
    tristan: "/places/tristan-da-cunha.jpg",
    southGeorgia: "/places/south-georgia.jpg",
    antarctica: "/places/hero-antarctica.jpg",
  },

  overview: {
    map: "/map.jpg",
  },

  itinerary: {
    day1: "/days/day1.jpg",
    day2: "/days/day2.jpg",
    day3: "/days/day3.jpg",
    day4: "/days/day4.jpg",
    day5: "/days/day5.jpg",
    day6: "/days/day6.jpg",
    day7: "/days/day7.jpg",
    day8: "/days/day8.jpg",
    day9: "/days/day9.png",
    day10: "/days/day10.png",
  },

  cabins: {
    oceanview: [
      "/cabins/ocean/ocean1.jpg",
      "/cabins/ocean/ocean2.jpg",
      "/cabins/ocean/ocean3.jpg",
      "/cabins/ocean/ocean4.jpg",
    ],
    panoramicWindow: [
      "/cabins/ocean/ocean3.jpg",
      "/cabins/ocean/ocean1.jpg",
      "/cabins/ocean/ocean2.jpg",
    ],
    balcony: [
      "/cabins/balcony/bal1.jpg",
      "/cabins/balcony/bal2.jpg",
      "/cabins/balcony/bal3.jpg",
    ],
    panoramicBalcony: ["/cabins/Balcony M51.webp", "/cabins/Balcony M51.webp"],
    juniorSuite: [
      "/cabins/junsuite/jun1.jpg",
      "/cabins/junsuite/jun2.webp",
      "/cabins/junsuite/jun3.webp",
    ],
    suite: [
      "/cabins/suite/suite1.jpg",
      "/cabins/suite/suite2.jpg",
      "/cabins/suite/suite3.webp",
      "/cabins/suite/suite4.jpg",
      "/cabins/suite/suite5.webp",
      "/cabins/suite/suite6.jpg",
    ],
    premiumSuite: [
      "/cabins/premiumsuite/suite1.jpg",
      "/cabins/premiumsuite/suite2.jpg",
      "/cabins/premiumsuite/suite3.jpg",
      "/cabins/premiumsuite/suite4.jpg",
      "/cabins/premiumsuite/suite5.jpg",
    ],
  },

  // 360° Videos for cabins
  cabinVideos: {
    oceanview: [
      "/cabins-videos/Oceanview/oceanview1.mp4",
      "/cabins-videos/Oceanview/oceanview2.mp4",
      "/cabins-videos/Oceanview/oceanview3.mp4",
      "/cabins-videos/Oceanview/oceanview4.mp4",
    ],
    balcony: [
      "/cabins-videos/Balcony/Balcony1.mp4",
      "/cabins-videos/Balcony/Balcony2.mp4",
      "/cabins-videos/Balcony/Balcony3.mp4",
      "/cabins-videos/Balcony/Balcony4.mp4",
    ],
    juniorSuite: [
      "/cabins-videos/Junior Suite/JuniorSuite1.mp4",
      "/cabins-videos/Junior Suite/JuniorSuite2.mp4",
      "/cabins-videos/Junior Suite/JuniorSuite3.mp4",
    ],
    suite: [
      "/cabins-videos/PremiumSuite & Suite/PremiumSuite 1.mp4",
      "/cabins-videos/PremiumSuite & Suite/PremiumSuite 2.mp4",
      "/cabins-videos/PremiumSuite & Suite/PremiumSuite 3.mp4",
      "/cabins-videos/PremiumSuite & Suite/PremiumSuite 4.mp4",
        "/cabins-videos/PremiumSuite & Suite/PremiumSuite 5.mp4",
    ],
    premiumSuite: [
      "/cabins-videos/PremiumSuite & Suite/PremiumSuite 1.mp4",
      "/cabins-videos/PremiumSuite & Suite/PremiumSuite 2.mp4",
      "/cabins-videos/PremiumSuite & Suite/PremiumSuite 3.mp4",
      "/cabins-videos/PremiumSuite & Suite/PremiumSuite 4.mp4",
      "/cabins-videos/PremiumSuite & Suite/PremiumSuite 5.mp4",
    ],
  },

  ship: ["/ship_diana.jpg", "/ship_pool.jpg", "/ship_rest.jpg"],

  highlights: [
    "/images/capetown-table-mountain.jpg",
    "/slider/slide2.jpg",
    "/slider/slide3.jpg",
    "/images/penguins-variety.jpg",
    "/images/tristan-da-cunha.jpg",
    "/slider/slide6.jpg",
    "/images/south-georgia-wildlife.jpg",
    "/slider/slide8.jpg",
    "/images/water.png",
    "/images/antarctica-landing.jpg",
    "/slider/slide11.jpg",
    "/images/iceberg.png",
  ],

  wildlife: [
    "/images/penguins-colony.jpg",
    "/images/whale-ocean.jpg",
    "/images/albatross.jpg",
  ],
} as const;
