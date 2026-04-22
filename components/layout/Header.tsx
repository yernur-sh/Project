"use client";

import { useState } from "react"; // useState хугін қостық
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import Image from "next/image";

const navItems = [
  { href: "/", label: "Басты бет" },
  { href: "/sort", label: "Қоқыс сұрыптау" },
  { href: "/map", label: "Қабылдау нүктелері" },
  { href: "/challenges", label: "Эко-челлендж" },
  { href: "/quiz", label: "Викторина" },
  { href: "/diy", label: "Эко-Шеберхана" },
  { href: "/reviews", label: "Пікірлер" },
];

export default function Header() {
  const pathname = usePathname();
  const { firebaseUser, isAuthenticated, loading } = useAuth();
  
  // Мобильді мәзірдің ашық/жабық күйін сақтайтын State
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">

          {/* Лого */}
          <Link 
            href="/" 
            className="flex items-center gap-3 group"
            onClick={() => setIsMobileMenuOpen(false)} // Логоны басқанда мәзір жабылады
          >
            <Image
              src="/log.png"
              alt="EcoLife KZ Logo"
              width={40}
              height={40}
              className="object-contain"
            />
            <span className="font-bold text-[#107c41] text-xl tracking-tight">
              EcoLife <span className="text-green-500">KZ</span>
            </span>
          </Link>

          {/* Навигация және Батырмалар */}
          <div className="flex items-center gap-3 md:gap-4">
            
            {/* Компьютерге арналған мәзір (Desktop Nav) */}
            <nav className="hidden md:flex items-center gap-1">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${isActive
                        ? "bg-green-50 text-green-700"
                        : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                      }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            {/* Профиль / Кіру батырмасы */}
            {loading ? (
              <div className="flex items-center justify-center bg-green-50 w-24 h-9 rounded-xl border border-green-100 overflow-hidden relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent -translate-x-full animate-[shimmer_1.5s_infinite]"></div>
                <div className="flex items-center gap-2">
                  <span className="text-lg animate-bounce duration-700">🌱</span>
                  <div className="flex gap-0.5">
                    <div className="w-1 h-1 bg-green-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                    <div className="w-1 h-1 bg-green-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                    <div className="w-1 h-1 bg-green-600 rounded-full animate-bounce"></div>
                  </div>
                </div>
              </div>
            ) : isAuthenticated ? (
              <Link
                href="/profile"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-2 bg-gray-50 hover:bg-green-50 px-3 py-1.5 rounded-full border border-gray-200 hover:border-green-200 transition-all"
              >
                <div className="relative w-7 h-7 overflow-hidden rounded-full border border-green-500 bg-gray-200 flex items-center justify-center flex-shrink-0">
                  {firebaseUser?.photoURL ? (
                    <img
                      src={firebaseUser.photoURL}
                      alt="Аватар"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                      onError={(e) => { e.currentTarget.style.display = 'none'; }}
                    />
                  ) : null}
                  <div className="absolute inset-0 -z-10 bg-green-100 flex items-center justify-center text-xs">👤</div>
                </div>
                <span className="text-sm font-medium text-gray-700 hidden sm:block">Профиль</span>
              </Link>
            ) : (
              <Link
                href="/login"
                onClick={() => setIsMobileMenuOpen(false)}
                className="bg-green-600 hover:bg-green-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors shadow-sm"
              >
                Кіру
              </Link>
            )}

            {/* Мобильді мәзір батырмасы (Бургер) */}
            <button
              className="md:hidden p-2 -mr-2 text-gray-600 hover:text-green-600 focus:outline-none transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? (
                // Жабу иконкасы (X)
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                // Бургер иконкасы (☰)
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>

          </div>
        </div>
      </div>

      {/* Мобильді мәзірдің іші (Mobile Dropdown) */}
      <div 
        className={`md:hidden absolute top-16 left-0 w-full bg-white border-b border-gray-200 shadow-xl transition-all duration-300 ease-in-out overflow-hidden ${
          isMobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0 pointer-events-none"
        }`}
      >
        <nav className="flex flex-col px-6 py-4 space-y-2 bg-gray-50/50">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)} // Бетке өткенде мәзірді жабады
                className={`px-4 py-3 rounded-xl text-base font-bold transition-all ${
                  isActive
                    ? "bg-green-100 text-green-700 shadow-sm"
                    : "text-gray-600 hover:bg-white hover:text-green-600 border border-transparent hover:border-gray-200 hover:shadow-sm"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}