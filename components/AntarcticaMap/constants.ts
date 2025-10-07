import { MarkerPoint } from "./types";

// Координаты точек маршрута
export const ROUTE_WAYPOINTS: [number, number][] = [
  [18.4241, -33.9249], // Cape Town
  [16, -34.5],
  [12, -35.5],
  [5, -36],
  [-3, -35.5],
  [-10, -35.5],
  [-14, -36],
  [-16, -37],
  [-14, -38.5],
  [-10, -39.5],
  [-7.5, -40],
  [-8, -42],
  [-14, -46],
  [-22, -50],
  [-28, -52.5],
  [-32, -53.2],
  [-34, -53.5],
  [-36, -53.8],
  [-38, -54],
  [-40, -54.5],
  [-42, -56.5],
  [-43, -58.5],
  [-44, -59.5],
  [-45, -60],
  [-46.5, -60.3],
  [-48, -60.5],
  [-52, -61],
  [-56, -62],
  [-58.5, -62.5],
  [-60, -63],
  [-61.5, -63.3],
  [-63, -63.5],
  [-64.5, -63.8],
  [-66, -64],
  [-67, -56.5],
  [-68.3029, -54.8019], // Ushuaia
];

export const MARKER_POINTS: MarkerPoint[] = [
  {
    name: "Cape Town",
    coordinates: [18.4241, -33.9249],
    image: "/places/cape-town.jpg"
  },
  {
    name: "Tristan da Cunha",
    coordinates: [-12.2777, -37.1052],
    image: "/places/tristan-da-cunha.jpg"
  },
  {
    name: "Gough Island",
    coordinates: [-9.9283, -40.3486],
    image: "/images/ocean-horizon.jpg"
  },
  {
    name: "South Georgia",
    coordinates: [-36.4388, -54.2806],
    image: "/places/south-georgia.jpg"
  },
  {
    name: "South Orkney Islands",
    coordinates: [-45.5, -60.5833],
    image: "/images/antarctica-landing.jpg"
  },
  {
    name: "South Shetland Islands",
    coordinates: [-59.5, -62.5],
    image: "/places/hero-antarctica.jpg"
  },
  {
    name: "Ushuaia",
    coordinates: [-68.3029, -54.8019],
    image: "/images/ushuaia-port.jpg"
  },
];

export const MAP_CONFIG = {
  center: [-16.0193, -53.2132] as [number, number],
  zoom: 2.0,
  pitch: 15,
  projection: "globe" as const,
};

export const FOG_CONFIG = {
  color: "rgb(186, 210, 235)",
  "high-color": "rgb(36, 92, 223)",
  "horizon-blend": 0.02,
  "space-color": "rgb(11, 11, 25)",
  "star-intensity": 0.6,
};
