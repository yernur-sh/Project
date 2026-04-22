// app/page.tsx
import Link from "next/link";

const stats = [
  { label: "Жылдық қалдық көлемі (Алматы)", value: "450,000", unit: "тонна", icon: "🗑️" },
  { label: "Қайта өңдеу үлесі", value: "18", unit: "%", icon: "♻️" },
  { label: "Ауа сапасы (Орташа AQI)", value: "145", unit: "PM2.5", icon: "🌫️" },
  { label: "Эко-қабылдау нүктелері", value: "120+", unit: "нүкте", icon: "📍" },
];

const sections = [
  { href: "/sort",        icon: "🗂️", title: "Қоқыс сұрыптау",        desc: "Алматыдағы пластик, қағаз және шыныны бөлек тапсыру ережелері" },
  { href: "/map",         icon: "🗺️", title: "Эко-карта",            desc: "Жақын маңдағы контейнерлер мен қабылдау пункттерін табыңыз" },
  { href: "/challenges",  icon: "🏆", title: "Эко-белсенді",          desc: "Қала тазалығына үлес қосып, серіктестерден бонустар алыңыз" },
  { href: "/quiz",        icon: "❓", title: "Эко-сауат",            desc: "Экологиялық біліміңізді тексеріп, сертификат алыңыз" },
  { href: "/diy",         icon: "🎨", title: "Upcycling",            desc: "Ескі заттарға екінші өмір сыйлау бойынша шеберлік сабақтары" },
  { href: "/reviews",     icon: "💬", title: "Эко-шағым",            desc: "Заңсыз қоқыс орындары туралы хабарлаңыз" },
];

const pollutionLevels = [
  { area: "Алмалы ауданы",       level: 152, color: "bg-red-500",    status: "Қауіпті" },
  { area: "Жетісу ауданы",       level: 168, color: "bg-red-600",    status: "Өте қауіпті" },
  { area: "Бостандық ауданы",    level: 110, color: "bg-orange-500", status: "Орташа" },
  { area: "Медеу ауданы",        level: 85,  color: "bg-yellow-500", status: "Төмен" },
  { area: "Алатау ауданы",       level: 140, color: "bg-orange-600", status: "Жоғары" },
];

export default function HomePage() {
  return (
    <div className="bg-slate-50 min-h-screen font-sans">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-emerald-800 via-green-700 to-teal-900 text-white">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-white opacity-5 blur-3xl pointer-events-none"></div>
        
        <div className="relative max-w-7xl mx-auto px-6 py-20 md:py-28">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6 tracking-tight">
              Таза Қала — <br />
              <span className="text-emerald-300 drop-shadow-md">денсаулық кепілі</span>
            </h1>
            <p className="text-emerald-50/90 text-lg md:text-xl leading-relaxed mb-10 max-w-2xl font-light">
              Алматының ауа сапасын бақылаңыз, қалдықтарды дұрыс сұрыптауды үйреніңіз 
              және қаламыздың экологиялық мәдениетін бірге қалыптастырайық.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/map"
                className="bg-white text-emerald-900 font-bold px-8 py-4 rounded-2xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                Картаны ашу
              </Link>
              <Link
                href="/sort"
                className="bg-emerald-800/40 backdrop-blur-md border border-emerald-400/50 text-white font-bold px-8 py-4 rounded-2xl hover:bg-emerald-700 transition-all duration-300"
              >
                Сұрыптау нұсқаулығы
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Статистика блоки */}
      <section className="relative -mt-10 max-w-7xl mx-auto px-6 z-10 mb-16">
        <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat) => (
              <div key={stat.label} className="p-4 border-l-4 border-emerald-500 bg-slate-50/50">
                <div className="text-2xl font-black text-slate-800 tracking-tight">
                  {stat.value}
                  <span className="text-sm font-bold text-slate-400 ml-1">{stat.unit}</span>
                </div>
                <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Негізгі контент: Ауа сапасы және Мәселе */}
      <section className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          
          {/* Алматы ауа сапасы (AQI) */}
          <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-8">
            <div className="mb-8 flex justify-between items-end">
              <div>
                <h2 className="text-2xl font-extrabold text-slate-800">Ауа сапасының индексі (AQI)</h2>
                <p className="text-slate-500 text-sm">Алматы аудандары бойынша нақты уақыт дерегі</p>
              </div>
              <span className="text-[10px] bg-red-100 text-red-600 font-bold px-2 py-1 rounded animate-pulse">LIVE</span>
            </div>

            <div className="space-y-6">
              {pollutionLevels.map((item) => (
                <div key={item.area}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-bold text-slate-700">{item.area}</span>
                    <span className="text-xs font-black px-2 py-1 bg-slate-100 rounded text-slate-600">{item.level} PM2.5</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
                    <div
                      className={`${item.color} h-full rounded-full transition-all duration-1000`}
                      style={{ width: `${(item.level / 200) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Стартаптың әлеуметтік маңызы */}
          <div className="bg-emerald-900 text-white rounded-3xl p-8 md:p-10 flex flex-col justify-center relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10 text-9xl">🏔️</div>
            <h2 className="text-2xl font-extrabold mb-6 relative z-10">Неге бұл маңызды?</h2>
            <div className="space-y-4 text-emerald-50/80 relative z-10">
              <p>
                Алматы — Қазақстандағы ең ірі мегаполис, бірақ ол <strong className="text-white font-bold">экологиялық дағдарыс</strong> алдында тұр. Жыл сайынғы смог пен толып жатқан полигондар қала тұрғындарының денсаулығына кері әсерін тигізуде.
              </p>
              <p>
                Біздің стартап — бұл жай ғана сайт емес, бұл <strong className="text-white font-bold">эко-цифрландыру құралы</strong>. Біз технология арқылы әрбір алматылыққа қоқыс өткізуді оңай әрі тиімді етеміз.
              </p>
              <ul className="list-disc list-inside space-y-2 pt-2">
                <li>Қалдықтарды қайта өңдеуді 18%-дан 40%-ға көтеру</li>
                <li>Тұрғындар арасында эко-жауапкершілікті арттыру</li>
                <li>Қаланың тазалығын цифрлық карта арқылы бақылау</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Сервистер */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-extrabold text-slate-800 mb-12 text-center">Платформа мүмкіндіктері</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {sections.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group bg-white rounded-3xl border border-slate-100 p-8 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
            >
              <div className="text-5xl mb-6 group-hover:scale-110 transition-transform">{item.icon}</div>
              <h3 className="text-xl font-bold text-slate-800 mb-2">{item.title}</h3>
              <p className="text-slate-500 text-sm">{item.desc}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}