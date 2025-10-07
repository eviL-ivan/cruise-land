// Контент для лендинга круиза в Антарктиду
// Централизованное хранилище всех текстов для упрощения перевода и управления
// Данные взяты из официального PDF брендбука

import { images } from "./content/images"
import { journey } from "./content/ru/journey.ru"
import { itinerary } from "./content/ru/itinerary.ru"
import { cabins } from "./content/ru/cabins.ru"
import { map } from "./content/ru/map.ru"

export const content = {
  // Метаданные
  meta: {
    title: "Трансатлантическая экспедиция из Кейптауна в Ушуайю | SH Diana",
    description:
      "Экспедиционный круиз Swan Hellenic на SH Diana. Острова Южной Атлантики, Южная Георгия и Антарктический полуостров. 21 день через 3 континента и 2 океана.",
  },

  // Шапка сайта
  header: {
    logoAlt: "SH Diana",
    nav: {
      route: "Маршрут",
      itinerary: "Программа",
      ship: "Судно",
      cabins: "Каюты",
      contact: "Контакты",
    },
    bookButton: "Резерв",
    languages: {
      ru: "RU",
      en: "EN",
      zh: "中文",
    },
  },

  // Обзор круиза
  overview: {
    cruiseCode: "D2925111520",
    route: "Cape Town - Ushuaia",
    dates: "11.15.25-12.05.25",
    datesLabel: "Даты",
    nights: "20 Nights",
    durationLabel: "Длительность",
    ship: "SH Diana",
    shipLabel: "Судно",
    priceLabel: "Price From",
    price: "$13,780",
    priceNote: "Per Person",
    mapImage: images.overview.map,
    mapAlt: "Карта маршрута круиза",
    mapButton: "Карта",
    description: "Это не просто круиз — это интеллектуальная и эмоциональная экспедиция через три мира, где встречаются Африка, Атлантика и Антарктика.",
    detailedDescription: "Только здесь гости могут увидеть редких северных хохлатых пингвинов, исследовать самый изолированный остров планеты и встретить рассвет рядом со скульптурными айсбергами — всё это в элегантном комфорте новейшего флагмана Swan Hellenic, SH Diana.",
    experienceButton: "Смотреть опыт",
  },

  // Главный экран (Hero)
  hero: {
    title: "Трансатлантическая экспедиция",
    titleAccent: "в Антарктиду",
    subtitle:
      "Острова Южной Атлантики, Южная Георгия и Антарктический полуостров на борту экспедиционного судна SH Diana",
    highlight: "3 материка и 2 океана",
    bookButton: "Запросить цену",
    learnMoreButton: "Узнать подробнее",
    imageAlt: "Антарктида",
    image: images.hero.image,
    video: images.hero.video,
  },

  // Секция "Путешествие" - импортируется из модуля
  journey,

  // Карта маршрута
  map,

  // Highlights
  highlights: [
    { number: "1", title: "Кейптаун и мыс Доброй Надежды", description: "Откройте для себя Кейптаун — один из самых красивых мегаполисов мира: мыс Доброй Надежды и Столовая гора.", image: images.highlights[0] },
    { number: "2", title: "Трансатлантическая экспедиция", description: "Трансатлантическая экспедиция через 3 материка и 2 океана на судне высокого ледового класса.", image: images.highlights[1] },
    { number: "3", title: "Магия океана", description: "Ощутите магию океана по пути к самому холодному материку планеты.", image: images.highlights[2] },
    { number: "4", title: "Пять видов пингвинов", description: "Познакомьтесь как минимум с пятью видами пингвинов; уникальный шанс увидеть северных хохлатых пингвинов и морских львов.", image: images.highlights[3] },
    { number: "5", title: "Тристан-да-Кунья", description: "Рассвет у берегов Тристан-да-Кунья — одного из самых удалённых островов Земли.", image: images.highlights[4] },
    { number: "6", title: "Истории великих исследователей", description: "Лекции об истории полярных исследователей: Шеклтон, Амундсен и др.", image: images.highlights[5] },
    { number: "7", title: "Южная Георгия", description: "Погружение в мир Южной Георгии — торжество дикой природы.", image: images.highlights[6] },
    { number: "8", title: "Творчество и вдохновение", description: "Творческие мастер-классы на борту: фотография, живопись, искусство.", image: images.highlights[7] },
    { number: "9", title: "Купание в Южном океане", description: "Купание в Южном океане (температура воды ~ −2…+10 °C).", image: images.highlights[8] },
    { number: "10", title: "Достижение Антарктиды", description: "Станьте одним из немногих, кто достиг берегов Антарктиды.", image: images.highlights[9] },
    { number: "11", title: "Каякинг среди айсбергов", description: "Каякинг среди айсбергов с гидом.", image: images.highlights[10] },
    { number: "12", title: "Полярное лето", description: "Полярное лето: сверкающие айсберги, грохот откалывающихся льдин.", image: images.highlights[11] },
  ],

  // Программа (Itinerary) - импортируется из модуля
  itinerary,

  // Wildlife
  wildlife: {
    title: "Дикая природа Антарктики",
    subtitle: "Встретьте королевских пингвинов, странствующих альбатросов с размахом крыльев до 4 метров и величественных китов в их естественной среде обитания",
    animals: [
      { name: "Пингвины", description: "5 различных видов, включая королевских и северных хохлатых пингвинов", image: images.wildlife[0], alt: "Колония пингвинов" },
      { name: "Киты", description: "Наблюдайте за величественными китами в прибрежных водах", image: images.wildlife[1], alt: "Киты в океане" },
      { name: "Альбатросы", description: "Странствующие альбатросы с размахом крыльев до 4 метров", image: images.wildlife[2], alt: "Странствующий альбатрос" },
    ],
  },

  // Ship
  ship: {
    name: "SH Diana",
    brand: "Swan Hellenic",
    inServiceSince: "апрель 2023",
    iceClass: "PC6",
    capacity: "196 пассажиров",
    crew: "140 членов экипажа",
    description: "Это настоящий бутик-отель на воде. К вашим услугам: открытый бассейн-инфинити с видом на море, рестораны высокой кухни с блюдами от именитых шеф-поваров, стильные интерьеры из натуральных отделочных материалов.",
    amenities: [
      { title: "Бассейн-инфинити", description: "С панорамным видом на океан" },
      { title: "Высокая кухня", description: "Рестораны Swan Hellenic" },
      { title: "Спа-центр", description: "Джакузи, сауна, салон красоты" },
      { title: "Тренажерный зал", description: "Современное оборудование" },
      { title: "Ледовый класс PC6", description: "Высший арктический класс судна" },
      { title: "Безопасность", description: "Все системы корабля дублированы" },
    ],
    features: ["Бассейн-инфинити на открытой палубе", "Рестораны высокой кухни", "Спа-центр, сауна и тренажёрный зал", "Библиотека и лекционные пространства", "Клубный лаунж, гриль-бар у бассейна", "Медицинский центр и экспедиционная лаборатория", "Смотровая площадка Swan's Nest"],
    specs: { length: "125 м", width: "23 м", tonnage: "12 100 т", decks: "9", iceStrength: "100 см", propulsion: "гибридный дизель-электрический", speed: "средняя 15.5 узлов" },
    images: [
      { src: images.ship[0], alt: "Бассейн SH Diana" },
      { src: images.ship[1], alt: "Ресторан" },
      { src: images.ship[2], alt: "Судно SH Diana" },
    ],
  },

  // Каюты - импортируется из модуля
  cabins,

  // CTA
  cta: {
    title: "Начните своё путешествие",
    subtitle: "По любым вопросам и для бронирования обращайтесь к вашему менеджеру. Мы поможем организовать незабываемое путешествие в Антарктиду.",
    emailButton: "Написать нам",
    phoneButton: "Заказать звонок",
    stats: [
      { number: "21", label: "День путешествия" },
      { number: "5", label: "Видов пингвинов" },
      { number: "∞", label: "Незабываемых моментов" },
    ],
  },

  // Footer
  footer: {
    shipName: "SH Diana",
    brand: "Swan Hellenic",
    description: "Роскошный антарктический круиз на экспедиционном судне высокого ледового класса PC6",
    routeTitle: "Маршрут",
    routeStops: ["Кейптаун, ЮАР", "Тристан-да-Кунья", "Южная Георгия", "Антарктида", "Ушуайя, Аргентина"],
    contactTitle: "Контакты",
    contactDescription: "По любым вопросам и для бронирования обращайтесь к вашему менеджеру",
    contactButton: "Связаться с нами",
    copyright: "© 2025 SH Diana Antarctic Cruise. Все права защищены.",
  },

  // UI
  ui: { slideLabel: "Перейти к слайду" },

  // Optional services
  optionalServices: [
    "Международный перелёт в Кейптаун и обратно из Буэнос-Айреса",
    "Наземные туры в ЮАР и Аргентине до/после круиза",
    "Обязательное медицинское страхование",
    "Премиальные пакеты Wi-Fi",
    "Прогулки на каяках во время круиза",
    "Премиальные напитки, спа и косметические процедуры",
  ],
} as const

export type Content = typeof content
