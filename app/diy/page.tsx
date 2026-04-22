"use client";

import { useState } from "react";
import Link from "next/link";

// YouTube бейнероликтерінің дерекқоры
const diyVideos = [
  {
    id: 1,
    title: "Пластик бөтелкеден құмыра",
    desc: "Өзін-өзі суаратын ақылды гүл құмырасын жасаудың ең оңай тәсілі.",
    videoId: "FBkTebYAYrQ", // Мысал YouTube ID (өзіңіз ауыстыра аласыз)
    category: "Пластик",
    icon: "🥤",
    duration: "5:20"
  },
  {
    id: 2,
    title: "Ескі футболкадан эко-сөмке",
    desc: "Ине-жіпсіз, ескі футболкадан дүкенге ұстап баратын мата сөмке жасау.",
    videoId: "vUiKohvnMnI",
    category: "Мата",
    icon: "👕",
    duration: "3:45"
  },
  {
    id: 3,
    title: "Газеттен тоқылған себет",
    desc: "Керек емес газет-журналдарды пайдаланып, зат сақтайтын себет тоқу.",
    videoId: "vadzgPYkQUE",
    category: "Қағаз",
    icon: "📰",
    duration: "10:15"
  },
  {
    id: 4,
    title: "Шыны құтыдан декор",
    desc: "Кәдімгі бос шыны банкадан бөлмеге әдемі декор жасау",
    videoId: "iAHEiE4AjbE",
    category: "Шыны",
    icon: "🫙",
    duration: "6:30"
  },
  {
    id: 5,
    title: "Картон қораптан органайзер",
    desc: "Аяқ киім немесе пошта қораптарынан үстел үстіндегі заттарға арналған органайзер.",
    videoId: "spiUIkO4Lqs",
    category: "Қағаз",
    icon: "📦",
    duration: "8:00"
  },
  {
    id: 6,
    title: "Пластик қақпақтардан мозаика",
    desc: "Түрлі-түсті пластик қақпақтарды ерітіп немесе желімдеп, әдемі тұғыр жасау.",
    videoId: "6wx8sE0TLr8",
    category: "Пластик",
    icon: "🔵",
    duration: "7:10"
  }
];

const categories = ["Барлығы", "Пластик", "Қағаз", "Шыны", "Мата"];

export default function DIYPage() {
  const [activeCategory, setActiveCategory] = useState("Барлығы");

  // Таңдалған категория бойынша фильтрлеу
  const filteredVideos = activeCategory === "Барлығы" 
    ? diyVideos 
    : diyVideos.filter(video => video.category === activeCategory);

  return (
    <div className="bg-white min-h-screen font-sans">
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-teal-800 to-emerald-900 text-white relative overflow-hidden py-20">
        <div className="absolute top-0 left-0 w-96 h-96 bg-teal-400/10 rounded-full blur-3xl animate-pulse -ml-48 -mt-48" />
        
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center md:text-left grid md:grid-cols-2 gap-12 items-center">
          <div className="animate-in fade-in slide-in-from-left duration-1000">
            
            <h1 className="text-5xl md:text-6xl font-black mb-6 leading-tight uppercase tracking-tighter">
              Эко-Шеберхана: <br />
              <span className="text-teal-400">Екінші өмір сыйла</span>
            </h1>
            <p className="text-teal-100 text-lg md:text-xl opacity-90 font-medium max-w-xl">
              Қоқысқа тастамас бұрын ойлан! Кәдімгі қалдықтардан күнделікті өмірге қажетті, әдемі әрі пайдалы заттар жасауды үйрен.
            </p>
          </div>
          
          <div className="hidden md:flex justify-end animate-in zoom-in duration-700">
            <div className="text-[10rem] drop-shadow-[0_0_30px_rgba(45,212,191,0.4)] animate-bounce">
              🛠️
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        
        {/* Категориялар (Фильтр) */}
        <div className="flex flex-wrap gap-3 mb-12 justify-center md:justify-start">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-3 rounded-2xl font-bold text-sm transition-all duration-300 active:scale-95 ${
                activeCategory === category
                  ? "bg-teal-600 text-white shadow-lg shadow-teal-600/30"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Видеолар торы */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {filteredVideos.map((video, index) => (
            <div 
              key={video.id} 
              className="group bg-white rounded-[2.5rem] border-2 border-gray-100 p-6 hover:shadow-2xl hover:border-teal-200 hover:-translate-y-2 transition-all duration-500 flex flex-col"
              style={{ animationFillMode: "both", animationDelay: `${index * 100}ms` }}
            >
              {/* YouTube Iframe */}
              <div className="relative w-full aspect-video rounded-2xl overflow-hidden mb-6 bg-gray-100 shadow-inner group-hover:shadow-md transition-shadow">
                <iframe
                  width="100%"
                  height="100%"
                  src={`https://www.youtube.com/embed/${video.videoId}`}
                  title={video.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full object-cover"
                  loading="lazy"
                ></iframe>
              </div>

              {/* Мәтіндік ақпарат */}
              <div className="flex justify-between items-start mb-4">
                <div className="bg-teal-50 text-teal-700 px-3 py-1.5 rounded-xl text-xs font-black uppercase tracking-wider flex items-center gap-1.5">
                  {video.icon} {video.category}
                </div>
                <div className="text-gray-400 text-sm font-bold flex items-center gap-1">
                  ⏱️ {video.duration}
                </div>
              </div>

              <h3 className="text-xl font-bold text-gray-900 mb-3 leading-tight group-hover:text-teal-700 transition-colors">
                {video.title}
              </h3>
              <p className="text-gray-500 text-sm font-medium leading-relaxed mb-4 flex-grow">
                {video.desc}
              </p>

            </div>
          ))}
        </div>

        {/* Нәтиже табылмаған жағдайда */}
        {filteredVideos.length === 0 && (
          <div className="text-center py-20 bg-gray-50 rounded-[3rem] border-2 border-dashed border-gray-200">
            <div className="text-5xl mb-4">🔍</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Бұл санатта әзірге видео жоқ</h3>
            <p className="text-gray-500">Басқа материал түрін таңдап көріңіз.</p>
          </div>
        )}
      </section>

      {/* CTA (Call to Action) Блогы - Пайдаланушыларды ынталандыру */}
      <section className="max-w-7xl mx-auto px-6 pb-24 font-montserrat">
        <div className="bg-gradient-to-r from-teal-50 to-emerald-50 border-2 border-teal-100 rounded-[4rem] p-12 flex flex-col md:flex-row items-center justify-between gap-10 shadow-sm hover:shadow-xl transition-all duration-500">
          <div className="flex items-center gap-8">
            <div className="w-24 h-24 bg-white rounded-3xl shadow-xl flex items-center justify-center text-5xl animate-bounce flex-shrink-0">
              📸
            </div>
            <div>
              <h3 className="text-2xl font-black text-gray-900 mb-3 uppercase tracking-tighter">
                Өз туындыңды бөліс!
              </h3>
              <p className="text-gray-600 leading-relaxed font-medium max-w-xl">
                Бейнероликтегі идеяны қайталап немесе өз қиялыңыздан қалдықтан пайдалы зат жасадыңыз ба? Оны біздің <b>Эко-Қауымдастыққа (Пікірлер)</b> жүктеп, көп лайк жинаңыз!
              </p>
            </div>
          </div>
          <Link 
            href="/reviews" 
            className="flex-shrink-0 bg-teal-600 hover:bg-teal-700 text-white font-black px-8 py-4 rounded-2xl transition-all shadow-lg active:scale-95 text-center w-full md:w-auto"
          >
            ҚАУЫМДАСТЫҚҚА ӨТУ
          </Link>
        </div>
      </section>

    </div>
  );
}