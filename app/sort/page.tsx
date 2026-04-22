"use client";

import { useState } from "react";

const categories = [
  {
    id: "plastic",
    icon: "🧴",
    title: "Пластик",
    color: "bg-blue-50 border-blue-200",
    activeColor: "bg-blue-500 border-blue-600 text-white shadow-[0_8px_30px_rgb(59,130,246,0.3)]",
    items: ["Су бөтелкелері", "Пакеттер", "Ыдыс-аяқ", "Шампунь бөтелкелері", "Йогурт стақандары"],
    tips: "Пластикті тастамас бұрын шайып, тегіп жайып қойыңыз. Қақпақтарды бөлек жинаңыз.",
    notAccepted: ["Майланған пластик", "Пластик пакет (кейбір нүктелерде)"],
  },
  {
    id: "paper",
    icon: "📄",
    title: "Қағаз",
    color: "bg-amber-50 border-amber-200",
    activeColor: "bg-amber-500 border-amber-600 text-white shadow-[0_8px_30px_rgb(245,158,11,0.3)]",
    items: ["Газет, журнал", "Картон қорап", "Кеңсе қағазы", "Кітаптар", "Қаптама қағаздар"],
    tips: "Қағазды құрғақ күйінде жинаңыз. Дымқыл қағаз қайта өңделмейді.",
    notAccepted: ["Майланған қағаз", "Чек қағазы", "Салфетка"],
  },
  {
    id: "glass",
    icon: "🍾",
    title: "Шыны",
    color: "bg-emerald-50 border-emerald-200",
    activeColor: "bg-emerald-500 border-emerald-600 text-white shadow-[0_8px_30px_rgb(16,185,129,0.3)]",
    items: ["Шыны бөтелкелер", "Банкалар", "Шыны ыдыстар"],
    tips: "Шыныны жууды ұмытпаңыз. Түрлі түсті шыны бөлек жиналуы мүмкін.",
    notAccepted: ["Айна", "Лампочка", "Терезе шынысы", "Фарфор"],
  },
  {
    id: "metal",
    icon: "🥫",
    title: "Металл",
    color: "bg-slate-100 border-slate-200",
    activeColor: "bg-slate-700 border-slate-800 text-white shadow-[0_8px_30px_rgb(51,65,85,0.3)]",
    items: ["Консерва банкалары", "Алюминий банкалар", "Темір қаптамалар"],
    tips: "Металл банкаларды жуып, мыжып тастаңыз — орын аз алады.",
    notAccepted: ["Батарейка", "Электр аспаптары"],
  },
  {
    id: "organic",
    icon: "🍂",
    title: "Органика",
    color: "bg-orange-50 border-orange-200",
    activeColor: "bg-orange-500 border-orange-600 text-white shadow-[0_8px_30px_rgb(249,115,22,0.3)]",
    items: ["Тамақ қалдықтары", "Жеміс қабықтары", "Шай, кофе қалдықтары", "Өсімдік қалдықтары"],
    tips: "Органикалық қалдықтардан компост жасауға болады — тамаша тыңайтқыш!",
    notAccepted: ["Ет, сүйек (кейбір нүктелерде)", "Майлы тамақ"],
  },
  {
    id: "electronics",
    icon: "📱",
    title: "Электроника",
    color: "bg-indigo-50 border-indigo-200",
    activeColor: "bg-indigo-500 border-indigo-600 text-white shadow-[0_8px_30px_rgb(99,102,241,0.3)]",
    items: ["Телефондар", "Компьютерлер", "Батарейкалар", "Зарядтауыштар", "Шамдар"],
    tips: "Электроника арнайы қабылдау нүктелеріне тапсырылуы тиіс. Кәдімгі қоқысқа тастауға болмайды!",
    notAccepted: [],
  },
];

export default function SortPage() {
  const [selected, setSelected] = useState<string | null>(null);

  const active = categories.find((c) => c.id === selected);

  return (
    <div className="bg-slate-50 min-h-screen font-sans pb-24">
      
      {/* 100% CommunityPage стиліндегі Hero Section */}
      <section className="bg-gradient-to-br from-emerald-700 via-green-600 to-teal-800 text-white relative py-20 overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/10 rounded-full blur-[100px] -mr-48 -mt-48" />
        
        <div className="max-w-5xl mx-auto px-6 relative z-10 text-center animate-in fade-in slide-in-from-bottom duration-1000">
          <h1 className="text-5xl md:text-6xl font-black mb-6 leading-tight uppercase tracking-tighter">
            Қоқыс сұрыптау
          </h1>
          <p className="text-emerald-50 text-lg md:text-xl font-medium opacity-90 max-w-2xl mx-auto">
            Қандай қалдықты қайда тастау керектігін біліңіз. Толық мәлімет алу үшін төмендегі санаттардың бірін таңдаңыз.
          </p>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-6 -mt-10 relative z-20">
        
        {/* Санаттар торы (Үлкен ақ карточка ішінде) */}
        <div className="bg-white rounded-[2.5rem] shadow-[0_10px_40px_rgb(0,0,0,0.08)] border border-slate-100 p-6 md:p-10 mb-10 animate-in zoom-in duration-500">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((cat) => {
              const isSelected = selected === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelected(isSelected ? null : cat.id)}
                  className={`group rounded-3xl border-2 p-5 flex flex-col items-center justify-center gap-3 transition-all duration-300 cursor-pointer active:scale-95 ${
                    isSelected
                      ? cat.activeColor
                      : "bg-slate-50 border-slate-200 hover:border-emerald-300 hover:bg-emerald-50 hover:shadow-md"
                  }`}
                >
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-3xl transition-transform duration-300 ${isSelected ? "scale-110 bg-white/20" : "group-hover:scale-110 bg-white shadow-sm"}`}>
                    {cat.icon}
                  </div>
                  <span className={`text-sm font-bold tracking-wide transition-colors ${isSelected ? "text-white" : "text-slate-600 group-hover:text-emerald-700"}`}>
                    {cat.title}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Мәліметтер панелі (Анимациямен ашылады) */}
        {active && (
          <div className={`rounded-[2.5rem] border-2 ${active.color} p-8 md:p-10 mb-10 transition-all duration-500 shadow-sm animate-in slide-in-from-bottom-8 fade-in`}>
            <div className="flex flex-col sm:flex-row sm:items-center gap-5 mb-8 border-b border-black/5 pb-6">
              <div className={`w-20 h-20 rounded-[1.5rem] flex items-center justify-center text-5xl shadow-sm bg-white border border-black/5`}>
                {active.icon}
              </div>
              <div>
                <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">{active.title}</h2>
                <p className="text-slate-600 font-bold text-sm mt-1 uppercase tracking-wider">Сұрыптау нұсқаулығы</p>
              </div>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
              {/* Қабылданады */}
              <div className="bg-white/90 backdrop-blur-md rounded-[2rem] p-6 shadow-sm border border-white">
                <h3 className="font-extrabold text-slate-800 mb-4 flex items-center gap-3 text-lg">
                  <span className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-600 border border-emerald-200">✅</span> 
                  Қабылданады
                </h3>
                <ul className="space-y-3">
                  {active.items.map((item) => (
                    <li key={item} className="text-sm font-bold text-slate-600 flex items-start gap-3">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 flex-shrink-0 mt-1.5 shadow-sm" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Кеңес */}
              <div className="bg-white/90 backdrop-blur-md rounded-[2rem] p-6 shadow-sm border border-white">
                <h3 className="font-extrabold text-slate-800 mb-4 flex items-center gap-3 text-lg">
                  <span className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600 border border-blue-200">💡</span> 
                  Кеңес
                </h3>
                <p className="text-sm font-bold text-slate-600 leading-relaxed">{active.tips}</p>
              </div>

              {/* Қабылданбайды */}
              {active.notAccepted.length > 0 && (
                <div className="bg-white/90 backdrop-blur-md rounded-[2rem] p-6 shadow-sm border border-white">
                  <h3 className="font-extrabold text-slate-800 mb-4 flex items-center gap-3 text-lg">
                    <span className="w-10 h-10 rounded-xl bg-rose-100 flex items-center justify-center text-rose-600 border border-rose-200">❌</span> 
                    Қабылданбайды
                  </h3>
                  <ul className="space-y-3">
                    {active.notAccepted.map((item) => (
                      <li key={item} className="text-sm font-bold text-slate-600 flex items-start gap-3">
                        <span className="w-2 h-2 rounded-full bg-rose-400 flex-shrink-0 mt-1.5 shadow-sm" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Жалпы ережелер блогы */}
        <div className="relative bg-white rounded-[2.5rem] border border-slate-100 shadow-[0_10px_40px_rgb(0,0,0,0.04)] p-8 md:p-12 overflow-hidden">
          {/* Фондық декорация */}
          <div className="absolute right-0 top-0 w-64 h-64 bg-emerald-50 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none"></div>
          
          <div className="relative z-10">
            <h2 className="text-3xl font-black text-slate-900 mb-8 tracking-tight uppercase">
              Жалпы сұрыптау ережелері
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { icon: "🚿", text: "Ыдыс-аяқ пен бөтелкелерді тастамас бұрын шайыңыз" },
                { icon: "🏷️", text: "Жапсырмаларды алып тастаудың қажеті жоқ" },
                { icon: "📦", text: "Картон қораптарды жайып, орын үнемдеңіз" },
                { icon: "🔋", text: "Батарейка мен электрониканы арнайы жерге тапсырыңыз" },
                { icon: "🛍️", text: "Пластик пакет орнына матадан жасалған сөмке қолданыңыз" },
                { icon: "♻️", text: "Белгісіз затты арнайы қоқысқа тастаңыз" },
              ].map((rule) => (
                <div key={rule.text} className="group flex items-start gap-4 bg-slate-50 rounded-[1.5rem] p-5 border border-slate-100 hover:border-emerald-200 hover:bg-emerald-50/50 hover:shadow-md transition-all duration-300">
                  <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200 group-hover:border-emerald-200 shadow-sm flex items-center justify-center text-2xl flex-shrink-0 transition-colors">
                    {rule.icon}
                  </div>
                  <p className="text-sm font-bold text-slate-700 leading-relaxed pt-1.5 group-hover:text-emerald-900 transition-colors">
                    {rule.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}