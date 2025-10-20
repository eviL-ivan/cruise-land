// Image paths - language independent
export const images = {
  hero: {
    image: "/places/hero-antarctica.jpg",
    video: "/back.mp4", // Legacy - не используется
    videoDesktop: "/Back-desktop.mp4", // Оптимизированная версия для desktop
    videoMobile: "/Back-mobile.mp4", // Оптимизированная версия для mobile
    poster: "/bg.webp",
  },

  journey: {
    capeTown: "/places/cape-town.jpg",
    tristan: "/images/Nightingale_DJI_0814_WernerKruse.jpg",
    southGeorgia: "/places/south-georgia.jpg",
    antarctica: "/places/hero-antarctica.jpg",
  },

  overview: {
    map: "/map-cape-usu.png",
  },

  itinerary: {
    day1: "/newDays/cape.jpg",
    day2: "/newDays/sea11.jpg",
    day3: "/newDays/tristan.jpg",
    day4: "/newDays/sea2.jpg",
    day5: "/newDays/southGeorg.jpg",
    day6: "/newDays/pen.jpg",
    day7: "/newDays/islands.jpg",
    day8: "/newDays/pen2.jpg",
    day9: "/newDays/sea3.jpg",
    day10: "/newDays/ush.jpg",
  },

  // itinerary: {
  //   day1: "/days/day1.jpg",
  //   day2: "/days/day2.jpg",
  //   day3: "/days/day3.jpg",
  //   day4: "/days/day4.jpg",
  //   day5: "/days/day5.jpg",
  //   day6: "/days/day6.jpg",
  //   day7: "/days/day7.jpg",
  //   day8: "/days/day8.jpg",
  //   day9: "/days/day9.png",
  //   day10: "/days/day10.png",
  // },

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
      "/cabins/balcony/bal4.jpg",
      "/cabins/balcony/bal5.jpg",
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
      "/cabins/suite/suite5.jpg",
      "/cabins/suite/suite6.jpg",
      "/cabins/suite/suite7.jpg",
    ],
    premiumSuite: [
      "/cabins/premiumsuite/suite1.jpg",
      "/cabins/premiumsuite/suite2.jpg",
      "/cabins/suite/suite7.jpg",
      "/cabins/premiumsuite/suite3.jpg",
      "/cabins/premiumsuite/suite4.jpg",
      "/cabins/premiumsuite/suite5.jpg",
    ],
  },

  // 360° Videos for cabins
  cabinVideos: {
    oceanview: [
      "/cabins-videos/Oceanview/Oceanview1.mp4",
      "/cabins-videos/Oceanview/Oceanview2.mp4",
      "/cabins-videos/Oceanview/Oceanview3.mp4",
      "/cabins-videos/Oceanview/Oceanview4.mp4",
    ],
    balcony: [
      "/cabins-videos/Balcony/Balcony1.mp4",
      "/cabins-videos/Balcony/Balcony2.mp4",
      "/cabins-videos/Balcony/Balcony3.mp4",
      "/cabins-videos/Balcony/Balcony4.mp4",
    ],
    juniorSuite: [
      "/cabins-videos/Junior Suite/Juniorsuite1.mp4",
      "/cabins-videos/Junior Suite/Juniorsuite2.mp4",
      "/cabins-videos/Junior Suite/Juniorsuite3.mp4",
    ],
    suite: [
      "/cabins-videos/PremiumSuite & Suite/Premiumsuite 1.mp4",
      "/cabins-videos/PremiumSuite & Suite/Premiumsuite 2.mp4",
      "/cabins-videos/PremiumSuite & Suite/Premiumsuite 3.mp4",
      "/cabins-videos/PremiumSuite & Suite/Premiumsuite 4.mp4",
      "/cabins-videos/PremiumSuite & Suite/Premiumsuite 5.mp4",
    ],
    premiumSuite: [
      "/cabins-videos/PremiumSuite & Suite/Premiumsuite 1.mp4",
      "/cabins-videos/PremiumSuite & Suite/Premiumsuite 2.mp4",
      "/cabins-videos/PremiumSuite & Suite/Premiumsuite 3.mp4",
      "/cabins-videos/PremiumSuite & Suite/Premiumsuite 4.mp4",
      "/cabins-videos/PremiumSuite & Suite/Premiumsuite 5.mp4",
    ],
  },

  ship: ["/ship_diana.jpg", "/ship_pool.jpg", "/ship_rest.jpg"],

  highlights: [
    "/images/Cape Town 2.jpg",
    "/slider/slide2.jpg",
    "/slider/slide3.jpg",
    "/images/St Andrews_WKR59148_WernerKruse.jpg",
    "/images/TristanDeCunha_WKR59449_WernerKruse.jpg",
    "/images/SH DIANA I SIMON STEEL SETI 04 MAR 24 I 1.jpg",
    "/images/south-georgia-wildlife.jpg",
    "/images/SHVe_20220714_Expedition_Lab_2007_45MP_JH12.20250527151205814.jpg",
    "/images/Polar Plunge_WKR57559_WernerKruse.jpg",
    "/images/SH Vega - Peninsula - People - 10_12_2022 - PSRV6387-Panorama.20250828150156196.jpg",
    "/slider/slide11.jpg",
    "/images/iceberg.png",
  ],

  wildlife: [
    "/images/Tristan da Cunha_GSKO5114.jpg",
    "/images/Orca_DJI_0402.jpg",
    "/images/albatross.jpg",
  ],
} as const;
