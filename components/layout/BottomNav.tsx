// components/layout/BottomNav.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/",            label: "Басты бет", icon: "🏠" },
  { href: "/map",         label: "Карта",     icon: "📍" },
  { href: "/sort",        label: "Сұрыптау",  icon: "♻️" },
  { href: "/challenges",  label: "Челлендж",  icon: "✅" },
  { href: "/profile",     label: "Профиль",   icon: "👤" },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-100 pb-safe">
      <div className="flex items-center justify-around h-16 max-w-lg mx-auto px-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center gap-0.5 flex-1 h-full text-xs transition-colors ${
                isActive
                  ? "text-green-600 font-medium"
                  : "text-gray-400 hover:text-gray-600"
              }`}
            >
              <span className="text-xl leading-none">{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}