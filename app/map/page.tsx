"use client";

import { useState } from "react";


const points = [
  
  {
    id: 1,
    name: "Ecosen",
    address: "Байзақов көшесі, 73/1",
    phone: "+7 (708) 329-84-00",
    hours: "Жабық (Ертең ашылады)",
    categories: ["Пластик", "Қағаз", "Шыны", "Металл", "Электроника", "Батарейка"],
    lat: 43.258293,
    lng: 76.910428,
    rating: 4.8,
    distance: "Алмалы ауданы",
  },
  {
    id: 3,
    name: "Kz Recycling",
    address: "Ырысты көшесі, 15а",
    phone: "+7 (727) 244-87-87",
    hours: "Дс-Жм: 09:00–18:00",
    categories: ["Қағаз", "Картон"],
    lat: 43.265387,
    lng: 76.86005,
    rating: 4.8,
    distance: "Алатау ауданы",
  },
  {
    id: 4,
    name: "Пункт приема металла (Райымбека)",
    address: "Райымбек даңғылы, 329",
    phone: "+7 (707) 111-22-33",
    hours: "Ашық",
    categories: ["Металл"],
    lat: 43.250162,
    lng: 76.864227,
    rating: 4.7,
    distance: "Алмалы ауданы",
  }, 
  {
    id: 6,
    name: "Пункт приема металла (Яссауи 103)",
    address: "Яссауи көшесі, 103/1",
    phone: "+7 (707) 222-33-44",
    hours: "Ашық",
    categories: ["Металл"],
    lat: 43.218427,
    lng: 76.831668,
    rating: 5.0,
    distance: "Әуезов ауданы",
  },
  {
    id: 7,
    name: "Алатауэковтор (Ақсай-3)",
    address: "Ақсай-3 м/а, 1а/1",
    phone: "+7 (727) 395-51-13",
    hours: "Жабық",
    categories: ["Қағаз", "Картон"],
    lat: 43.2341,
    lng: 76.8215,
    rating: 1.4,
    distance: "Әуезов ауданы",
  },
  {
    id: 8,
    name: "Пункт приема металла (Байзакова 50)",
    address: "Байзақов көшесі, 50",
    phone: "+7 (707) 555-66-77",
    hours: "Жабылуға 43 мин қалды",
    categories: ["Металл"],
    lat: 43.2598,
    lng: 76.9142,
    rating: 4.6,
    distance: "Алмалы ауданы",
  },
  {
    id: 9,
    name: "Алатауэковтор (Нұркент)",
    address: "Нұркент м/а, 7/1",
    phone: "+7 (727) 395-51-14",
    hours: "Ашық",
    categories: ["Пластик", "Қағаз"],
    lat: 43.2721,
    lng: 76.7912,
    rating: 4.5,
    distance: "Алатау ауданы",
  },
  {
    id: 10,
    name: "Пункт приема металла (Шакарима)",
    address: "Шәкәрім көшесі, 82",
    phone: "+7 (705) 444-11-22",
    hours: "Ашық",
    categories: ["Металл"],
    lat: 43.2312,
    lng: 76.8845,
    rating: 5.0,
    distance: "Бостандық ауданы",
  },
  {
    id: 11,
    name: "Алатауэковтор (8-ші м/а)",
    address: "8-ші шағын аудан, 57 киоск",
    phone: "+7 (727) 395-51-15",
    hours: "Жабық",
    categories: ["Қағаз", "Пластик", "Металл"],
    lat: 43.2185,
    lng: 76.8452,
    rating: 3.0,
    distance: "Әуезов ауданы",
  },
  {
    id: 12,
    name: "Макулатура және пластик қабылдау",
    address: "Медеу ауданы (Орталық)",
    phone: "+7 (701) 555-00-11",
    hours: "Тәулік бойы (24/7)",
    categories: ["Қағаз", "Пластик"],
    lat: 43.2412,
    lng: 76.9612,
    rating: 4.9,
    distance: "Медеу ауданы",
  },
  {
    id: 14,
    name: "Пункт приема металла (Волховская)",
    address: "Волховская көшесі, 7",
    phone: "+7 (707) 100-20-30",
    hours: "Дс-Жм: 09:00–18:00",
    categories: ["Металл"],
    lat: 43.2642,
    lng: 76.8251,
    rating: 3.3,
    distance: "Жетісу ауданы",
  },
  {
    id: 15,
    name: "Пункт приема металла (Розыбакиева 292)",
    address: "Розыбакиев көшесі, 292",
    phone: "+7 (707) 300-40-50",
    hours: "Күн сайын: 09:00–20:00",
    categories: ["Металл"],
    lat: 43.1921,
    lng: 76.8915,
    rating: 5.0,
    distance: "Бостандық ауданы",
  },
  {
    id: 16,
    name: "Пункт приема металла (Яссауи 187)",
    address: "Яссауи көшесі, 187",
    phone: "+7 (707) 500-60-70",
    hours: "Дс-Сб: 08:00–19:00",
    categories: ["Металл"],
    lat: 43.2214,
    lng: 76.8124,
    rating: 4.5,
    distance: "Әуезов ауданы",
  },
  {
    id: 17,
    name: "Пункт приема металла (Карасай батыра)",
    address: "Қарасай батыр көшесі, 229а",
    phone: "+7 (707) 700-80-90",
    hours: "Жабылуға 43 мин қалды",
    categories: ["Металл"],
    lat: 43.2458,
    lng: 76.8987,
    rating: 2.1,
    distance: "Алмалы ауданы",
  },
  {
    id: 18,
    name: "Пункт приема металла (Паклиевского)",
    address: "Паклиевского көшесі, 30",
    phone: "+7 (707) 444-55-66",
    hours: "Дс-Жм: 08:00–19:00",
    categories: ["Металл"],
    lat: 43.2789,
    lng: 76.9214,
    rating: 4.9,
    distance: "Жетісу ауданы",
  },
  {
    id: 19,
    name: "Казахстан Вэйст Ресайклинг (KWR)",
    address: "8-ші м/а, 57-киоск",
    phone: "+7 (727) 300-11-22",
    hours: "Дс-Сб: 08:00–17:00",
    categories: ["Пластик", "Қағаз"],
    lat: 43.2185,
    lng: 76.8452,
    rating: 4.5,
    distance: "Әуезов ауданы",
  },
  {
    id: 20,
    name: "Металл қабылдау (Яссауи)",
    address: "Яссауи көшесі, 187",
    phone: "+7 (702) 555-44-33",
    hours: "Дс-Жм: 08:00–18:00",
    categories: ["Металл"],
    lat: 43.2214,
    lng: 76.8124,
    rating: 4.3,
    distance: "Әуезов ауданы",
  }

];

const allCategories = ["Барлығы", "Пластик", "Қағаз", "Шыны", "Металл", "Электроника", "Батарейка"];

const categoryColors: Record<string, string> = {
  "Пластик":     "bg-blue-50 text-blue-700 border border-blue-200",
  "Қағаз":       "bg-amber-50 text-amber-700 border border-amber-200",
  "Картон":      "bg-amber-100 text-amber-800 border border-amber-300",
  "Шыны":        "bg-emerald-50 text-emerald-700 border border-emerald-200",
  "Металл":      "bg-slate-100 text-slate-700 border border-slate-200",
  "Электроника": "bg-indigo-50 text-indigo-700 border border-indigo-200",
  "Батарейка":   "bg-rose-50 text-rose-700 border border-rose-200",
};

// Жұлдызшалар компоненті
function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          className={`text-[13px] ${star <= Math.round(rating) ? "text-amber-400" : "text-slate-200"}`}
        >
          ★
        </span>
      ))}
      <span className="text-xs font-bold text-slate-400 ml-1.5">{rating}</span>
    </div>
  );
}

export default function MapPage() {
  const [activeFilter, setActiveFilter] = useState("Барлығы");
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const filtered = activeFilter === "Барлығы" ? points : points.filter((p) => p.categories.includes(activeFilter));
  const selectedPoint = points.find((p) => p.id === selectedId);

  return (
    <div className="bg-slate-50 min-h-screen font-sans pb-24">
      
      {/* Алматы Hero Section */}
      <section className="bg-gradient-to-br from-emerald-800 via-green-700 to-teal-900 text-white relative py-20 overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/10 rounded-full blur-[100px] -mr-48 -mt-48 animate-pulse" />
        
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <span className="inline-block bg-white/20 text-white text-xs font-black uppercase tracking-widest px-4 py-2 rounded-full mb-6 backdrop-blur-sm border border-white/30">
            Eco-Map Almaty
          </span>
          <h1 className="text-5xl md:text-6xl font-black mb-6 leading-tight tracking-tighter">
            ҚАБЫЛДАУ НҮКТЕЛЕРІ
          </h1>
          <p className="text-emerald-50 text-lg md:text-xl font-medium opacity-90 max-w-2xl mx-auto">
            Алматы қаласындағы қалдықтарды қайта өңдеуге қабылдайтын нүктелердің интерактивті картасы.
          </p>
        </div>
      </section>

      {/* Негізгі Контент */}
      <div className="max-w-7xl mx-auto px-6 -mt-10 relative z-20">
        
        {/* Фильтрлер */}
        <div className="bg-white rounded-[2rem] shadow-xl border border-slate-100 p-4 md:p-6 mb-8">
          <div className="flex flex-wrap gap-2 justify-center md:justify-start">
            {allCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setActiveFilter(cat);
                  setSelectedId(null);
                }}
                className={`px-5 py-2.5 rounded-2xl text-sm font-bold transition-all duration-300 ${
                  activeFilter === cat
                    ? "bg-emerald-600 text-white shadow-lg shadow-emerald-600/30"
                    : "bg-slate-50 border border-slate-200 text-slate-600 hover:border-emerald-300 hover:bg-emerald-50"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-8">
          {/* Тізім */}
          <div className="lg:col-span-4 space-y-4 max-h-[700px] overflow-y-auto pr-2">
            {filtered.map((point) => (
              <button
                key={point.id}
                onClick={() => setSelectedId(selectedId === point.id ? null : point.id)}
                className={`w-full text-left rounded-[2rem] p-6 transition-all duration-300 border-2 ${
                  selectedId === point.id
                    ? "border-emerald-500 bg-emerald-50 shadow-lg scale-[1.02]"
                    : "border-slate-100 bg-white hover:border-emerald-200 hover:shadow-md"
                }`}
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-black text-lg text-slate-800">{point.name}</h3>
                  <span className="text-[10px] font-black px-2 py-1 bg-emerald-100 text-emerald-700 rounded-lg">
                    {point.distance}
                  </span>
                </div>
                <p className="text-sm text-slate-500 mb-3 flex items-start gap-2">
                  <span>📍</span> {point.address}
                </p>
                <Stars rating={point.rating} />
              </button>
            ))}
          </div>

          {/* Карта бөлімі */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            <div className="bg-white rounded-[2.5rem] overflow-hidden h-[450px] relative border border-slate-100 shadow-xl p-2">
              <iframe
                key={selectedId || "almaty-default"}
                src={
                  selectedPoint 
                    ? `https://www.openstreetmap.org/export/embed.html?bbox=${selectedPoint.lng-0.005}%2C${selectedPoint.lat-0.003}%2C${selectedPoint.lng+0.005}%2C${selectedPoint.lat+0.003}&layer=mapnik&marker=${selectedPoint.lat}%2C${selectedPoint.lng}`
                    : "https://www.openstreetmap.org/export/embed.html?bbox=76.8%2C43.2%2C77.0%2C43.3&layer=mapnik"
                }
                className="w-full h-full rounded-[2rem] border-0"
                title="Алматы картасы"
              />
            </div>

            {selectedPoint && (
              <div className="bg-white rounded-[2.5rem] border border-emerald-100 shadow-2xl p-8 animate-in zoom-in-95">
                <div className="flex justify-between mb-6">
                  <h2 className="text-3xl font-black text-slate-900">{selectedPoint.name}</h2>
                  <div className="text-2xl">♻️</div>
                </div>

                <div className="grid md:grid-cols-2 gap-6 mb-8 text-slate-700 font-medium">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3"><span>🏢</span> {selectedPoint.address}</div>
                    <div className="flex items-center gap-3"><span>📞</span> {selectedPoint.phone}</div>
                    <div className="flex items-center gap-3"><span>⏰</span> {selectedPoint.hours}</div>
                  </div>
                  <div className="bg-slate-50 p-6 rounded-[2rem] border border-slate-100">
                    <p className="text-[10px] font-black uppercase text-slate-400 mb-3 tracking-widest">Қабылдау түрлері:</p>
                    <div className="flex flex-wrap gap-2">
                      {selectedPoint.categories.map((cat) => (
                        <span key={cat} className={`text-[10px] px-3 py-1.5 rounded-lg font-black uppercase ${categoryColors[cat] ?? "bg-slate-200"}`}>
                          {cat}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <a
                  href={`https://2gis.kz/almaty/search/${encodeURIComponent(selectedPoint.address)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-full gap-3 bg-emerald-600 text-white font-bold px-8 py-4 rounded-2xl hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-200"
                >
                  2GIS арқылы маршрут құру
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}