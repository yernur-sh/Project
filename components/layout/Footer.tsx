// components/layout/Footer.tsx
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="relative bg-gradient-to-b from-slate-900 to-slate-950 text-white mt-20 overflow-hidden border-t border-slate-800">
      {/* Декоративті фон элементі (бұлдыр жарқыл) */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[200px] bg-emerald-600/10 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="relative max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">

          {/* Бренд және сипаттама */}
          <div className="flex flex-col items-start">
            <Link href="/" className="flex items-center gap-3 group mb-5">
              <div className="w-10 h-10 rounded-xl bg-emerald-900/50 border border-emerald-700/50 flex items-center justify-center text-xl group-hover:scale-105 transition-transform duration-300">
                ♻️
              </div>
              <span className="font-extrabold text-white text-2xl tracking-tight">
                Таза қала <span className="text-emerald-500"></span>
              </span>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed font-medium max-w-sm">
              Алматы қаласының экологиялық хал-жағдайын жақсартуға бағытталған платформа.
            </p>
          </div>

          {/* Навигация (Бөлімдер) */}
          <div>
            <h3 className="font-bold text-lg mb-5 text-white tracking-wide">Бөлімдер</h3>
            <ul className="space-y-3 text-sm font-medium">
              {[
                { href: "/sort", label: "Қоқыс сұрыптау" },
                { href: "/map", label: "Қабылдау нүктелері" },
                { href: "/challenges", label: "Эко-челлендж" },
                { href: "/quiz", label: "Викторина" },
                { href: "/diy", label: "Қоқыстан өнер" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="group flex items-center text-slate-400 hover:text-emerald-400 transition-colors duration-300 w-fit"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-2.5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300"></span>
                    <span className="group-hover:translate-x-1 transition-transform duration-300">
                      {link.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Байланыс */}
          <div>
            <h3 className="font-bold text-lg mb-5 text-white tracking-wide">Байланыс</h3>
            <ul className="space-y-4 text-sm font-medium text-slate-400">
              <li className="flex items-center gap-3 group">
                <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center group-hover:bg-emerald-900/50 transition-colors duration-300">
                  📍
                </div>
                <span className="group-hover:text-slate-200 transition-colors">Алматы қаласы</span>
              </li>
              <li className="flex items-center gap-3 group">
                <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center group-hover:bg-emerald-900/50 transition-colors duration-300">
                  📧
                </div>
                <a href="mailto:info@ecolife.kz" className="group-hover:text-emerald-400 transition-colors">
                  info@ecolife.kz
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Төменгі құқық қорғау жазуы */}
        <div className="border-t border-slate-800/80 mt-16 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm font-medium text-slate-500">
            © 2026 Таза қала. Барлық құқықтар қорғалған.
          </p>
          {/* Қосымша визуалды теңгерім үшін шағын декорация */}
          <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-slate-700"></div>
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-600/50"></div>
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
          </div>
        </div>
      </div>
    </footer>
  );
}