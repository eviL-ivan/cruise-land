import React from "react";
import { MARKER_POINTS } from "./constants";

export default function MapControls() {
  return (
    <>
      {/* Заголовок */}
      {/* <div className="absolute top-6 left-6 bg-white/95 backdrop-blur-sm rounded-xl shadow-xl p-5 max-w-md z-10">
        <h1 className="text-2xl font-bold text-slate-800 mb-2">
          Маршрут в Антарктиду
        </h1>
        <p className="text-sm text-slate-600">
          От Кейптауна через острова Южной Атлантики до Антарктического полуострова
        </p>
      </div> */}

      {/* Список точек */}
      {/* <div className="absolute bottom-6 left-6 bg-white/95 backdrop-blur-sm rounded-xl shadow-xl p-5 max-w-xs z-10">
        <h2 className="text-lg font-semibold text-slate-800 mb-4">
          Точки маршрута
        </h2>
        <ul className="space-y-3">
          {MARKER_POINTS.map((point, index) => (
            <li key={index} className="flex items-center gap-3 text-sm">
              <div className="w-2.5 h-2.5 rounded-full bg-gray-700 flex-shrink-0" />
              <span className="text-slate-800">{point.name}</span>
            </li>
          ))}
        </ul>
      </div> */}
    </>
  );
}
