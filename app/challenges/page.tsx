"use client";

import { useState, useEffect, useMemo } from "react";
import { useAuth } from "@/hooks/useAuth";
import { db } from "@/lib/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import allChallenges from "./challenges.json";
import { increment } from "firebase/firestore";

const LEVELS = [
  { name: "Эко-бастаушы", minXP: 0, icon: "🌱", color: "text-green-500" },
  { name: "Эко-белсенді", minXP: 300, icon: "🌿", color: "text-emerald-500" },
  { name: "Эко-қорғаушы", minXP: 800, icon: "🌳", color: "text-teal-600" },
  { name: "Эко-батыр", minXP: 1500, icon: "🦸‍♂️", color: "text-orange-500" },
  { name: "Табиғат елшісі", minXP: 3000, icon: "🌍", color: "text-blue-600" },
];

export default function ChallengesPage() {
  const { firebaseUser, isAuthenticated } = useAuth();
  const router = useRouter();

  const [localCompleted, setLocalCompleted] = useState<number[]>([]);
  const [userPoints, setUserPoints] = useState(0);
  const [isSaving, setIsSaving] = useState(false);
  const [displayChallenges, setDisplayChallenges] = useState<any[]>([]);
  const [challengePhotos, setChallengePhotos] = useState<{ [key: number]: string }>({});
  
  // Толық экранда ашылатын сурет үшін жаңа State
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);

  const refreshChallenges = () => {
    const shuffled = [...allChallenges].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 6);

    setDisplayChallenges(selected);
    setLocalCompleted([]);
    setChallengePhotos({});

    localStorage.setItem("current_challenges", JSON.stringify(selected));
    localStorage.setItem("local_completed", JSON.stringify([]));
    localStorage.removeItem("challenge_photos");
  };

  useEffect(() => {
    const savedChallenges = localStorage.getItem("current_challenges");
    const savedCompleted = localStorage.getItem("local_completed");
    const savedPhotos = localStorage.getItem("challenge_photos");

    if (savedChallenges) setDisplayChallenges(JSON.parse(savedChallenges));
    else refreshChallenges();

    if (savedCompleted) setLocalCompleted(JSON.parse(savedCompleted));
    if (savedPhotos) setChallengePhotos(JSON.parse(savedPhotos));
  }, []);

  useEffect(() => {
    async function fetchUserData() {
      if (firebaseUser) {
        try {
          const userRef = doc(db, "users", firebaseUser.uid);
          const docSnap = await getDoc(userRef);
          if (docSnap.exists()) setUserPoints(docSnap.data().points || 0);
        } catch (error) {
          console.error("Деректерді алу қатесі:", error);
        }
      }
    }
    fetchUserData();
  }, [firebaseUser]);

  const currentLevel = useMemo(() => {
    return [...LEVELS].reverse().find(lvl => userPoints >= lvl.minXP) || LEVELS[0];
  }, [userPoints]);

  const nextLevel = useMemo(() => LEVELS.find(lvl => lvl.minXP > userPoints), [userPoints]);
  const levelProgress = nextLevel ? ((userPoints - currentLevel.minXP) / (nextLevel.minXP - currentLevel.minXP)) * 100 : 100;

  const badges = useMemo(() => {
    const list = [];
    if (userPoints >= 100) list.push({ name: "Алғашқы қадам", icon: "🥇" });
    if (userPoints >= 500) list.push({ name: "Тәжірибелі", icon: "🌟" });
    if (userPoints >= 1500) list.push({ name: "Эко-маман", icon: "💎" });
    return list;
  }, [userPoints]);

  const handlePhotoUpload = (id: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        const newPhotos = { ...challengePhotos, [id]: base64String };
        setChallengePhotos(newPhotos);
        localStorage.setItem("challenge_photos", JSON.stringify(newPhotos));
      };
      reader.readAsDataURL(file);
    }
  };

  const toggleChallenge = async (id: number, points: number) => {
    if (!isAuthenticated) {
      alert("Жүйеге кіріңіз!");
      router.push('/login');
      return;
    }
    
    // БҰЛ ЖЕРДЕГІ ФОТО МІНДЕТТІ ДЕГЕН ШАРТТЫ АЛЫП ТАСТАДЫҚ
    
    if (isSaving || !firebaseUser) return;
    setIsSaving(true);

    const isAlreadyDone = localCompleted.includes(id);
    const newPoints = isAlreadyDone ? Math.max(0, userPoints - points) : userPoints + points;
    const newLocalCompleted = isAlreadyDone
      ? localCompleted.filter(itemId => itemId !== id)
      : [...localCompleted, id];

    setLocalCompleted(newLocalCompleted);
    setUserPoints(newPoints);
    localStorage.setItem("local_completed", JSON.stringify(newLocalCompleted));

    try {
      const userRef = doc(db, "users", firebaseUser.uid);
      await setDoc(userRef, { 
        points: newPoints, 
        level: currentLevel.name, 
        completedCount: isAlreadyDone ? increment(-1) : increment(1),
        lastUpdated: new Date() 
      }, { merge: true });
    } catch (error) {
      console.error("Сақтау қатесі:", error);
      setUserPoints(userPoints);
      setLocalCompleted(localCompleted);
    } finally {
      setIsSaving(false);
    }
  };

  if (displayChallenges.length === 0) return null;

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-emerald-700 via-green-600 to-teal-800 text-white relative py-12 md:py-20 overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/10 rounded-full blur-[100px] -mr-48 -mt-48 pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight uppercase tracking-tight">
                Эко-челлендждер: <br />
                <span className="text-green-300">Әлемді бірге өзгерт</span>
              </h1>
              <p className="text-green-100 text-lg mb-8 opacity-90 font-medium">
                Тапсырмаларды орындап, ұпай жина және жаңа деңгейлерге көтеріл.
              </p>
              {badges.length > 0 && (
                <div className="flex gap-3 mb-6">
                  {badges.map(badge => (
                    <div key={badge.name} className="bg-white/20 p-2 rounded-full w-10 h-10 flex items-center justify-center text-xl shadow-lg border border-white/30 animate-bounce">
                      {badge.icon}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <p className="text-green-300 text-xs font-bold uppercase tracking-widest">Қазіргі деңгей</p>
                  <h2 className={`text-3xl font-black flex items-center gap-2 text - white`}>
                    {currentLevel.icon} {currentLevel.name}
                  </h2>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-black">{userPoints}</p>
                  <p className="text-green-300 text-xs uppercase font-bold">Жалпы XP</p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-bold">
                  <span>{currentLevel.minXP} XP</span>
                  <span>{nextLevel ? `${nextLevel.minXP} XP` : 'MAX'}</span>
                </div>
                <div className="h-4 bg-white/20 rounded-full overflow-hidden p-1">
                  <div className="h-full bg-gradient-to-r from-green-400 to-emerald-400 rounded-full transition-all duration-1000 shadow-sm" style={{ width: `${levelProgress}%` }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Тапсырмалар секциясы */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10">
          <h2 className="text-3xl font-bold text-gray-900 flex items-center gap-3 uppercase tracking-tight">
            <span className="bg-green-100 p-2 rounded-xl text-2xl">🎯</span> Жаңа тапсырмалар
          </h2>
          <button
            onClick={refreshChallenges}
            className="flex items-center gap-2 bg-gray-100 hover:bg-green-600 hover:text-white text-gray-700 px-6 py-3 rounded-2xl transition-all duration-300 font-bold border border-gray-200 active:scale-95"
          >
            <span className="text-lg">🔄</span> Тапсырмаларды жаңарту
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayChallenges.map((item, index) => (
            <div
              key={`${item.id}-${index}`}
              className={`group bg-white rounded-[2.5rem] border-2 transition-all duration-300 p-8 relative overflow-hidden flex flex-col ${localCompleted.includes(item.id)
                  ? "border-green-500 bg-green-50/30"
                  : "border-gray-100 hover:border-green-200 shadow-sm hover:shadow-xl hover:-translate-y-2"
                }`}
            >
              <div className="text-5xl mb-6 transform group-hover:scale-110 transition-transform duration-300">{item.icon}</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
              <p className="text-gray-500 text-sm mb-8 leading-relaxed h-12 overflow-hidden flex-grow">{item.desc}</p>

              <div className="flex justify-between items-center pt-6 border-t border-gray-100 mt-auto">
                <div className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-bold flex-shrink-0">+{item.points} XP</div>
                
                <div className="flex items-center gap-2">
                  {/* КІШКЕНТАЙ ФОТО ЖҮКТЕУ НЕМЕСЕ ӨЗГЕРТУ БАТЫРМАСЫ (Міндетті емес) */}
                  {!localCompleted.includes(item.id) && (
                    <label className={`cursor-pointer w-10 h-10 flex items-center justify-center rounded-xl transition-all border-2 flex-shrink-0 ${challengePhotos[item.id] ? "bg-green-50 border-green-200 text-green-600 hover:bg-green-100" : "bg-gray-50 border-gray-200 text-gray-400 hover:bg-green-50"}`} title={challengePhotos[item.id] ? "Фотоны өзгерту" : "Фото тіркеу (міндетті емес)"}>
                      <span className="text-lg">{challengePhotos[item.id] ? "🔄" : "📷"}</span>
                      <input type="file" accept="image/*" className="hidden" onChange={(e) => handlePhotoUpload(item.id, e)} />
                    </label>
                  )}
                  
                  {/* БАСУҒА БОЛАТЫН ПРЕВЬЮ СУРЕТ */}
                  {challengePhotos[item.id] && (
                    <div 
                      onClick={() => setSelectedPhoto(challengePhotos[item.id])}
                      className="w-10 h-10 rounded-xl overflow-hidden border-2 border-green-500 shadow-sm flex-shrink-0 cursor-pointer hover:scale-110 transition-transform relative group/img"
                      title="Толық көру"
                    >
                      <img src={challengePhotos[item.id]} className="w-full h-full object-cover" alt="Proof" />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover/img:opacity-100 transition-opacity">
                         <span className="text-white text-xs">👁️</span>
                      </div>
                    </div>
                  )}

                  {/* ОРЫНДАУ БАТЫРМАСЫ ЖАҢАРТЫЛДЫ */}
                  <button
                    onClick={() => toggleChallenge(item.id, item.points)}
                    disabled={isSaving}
                    className={`group px-6 py-2 rounded-2xl text-sm font-bold transition-all min-w-[120px] shadow-sm ${
                      localCompleted.includes(item.id)
                        ? "bg-green-600 text-white hover:bg-red-500"
                        : "bg-gray-900 text-white hover:bg-green-600"
                    }`}
                  >
                    {localCompleted.includes(item.id) ? (
                      <>
                        <span className="block group-hover:hidden">Орындалды ✓</span>
                        <span className="hidden group-hover:block">Болдырмау ✖</span>
                      </>
                    ) : "Орындау"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Ақпараттық блок */}
      <section className="max-w-7xl mx-auto px-6 pb-20 font-montserrat">
        <div className="bg-gradient-to-r from-orange-50 to-amber-50 border border-orange-100 rounded-[3rem] p-10 flex flex-col md:flex-row items-center gap-10 shadow-sm">
          <div className="w-24 h-24 bg-white rounded-3xl shadow-xl flex items-center justify-center text-5xl animate-pulse">💡</div>
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4 uppercase tracking-tight">Бұл қалай жұмыс істейді?</h3>
            <p className="text-gray-600 leading-relaxed max-w-2xl font-medium">
              Әрбір орындалған тапсырма сізге <b>XP (тәжірибе ұпайларын)</b> береді.
              Ұпай жинаған сайын жаңа атақтар мен виртуалды медальдар аласыз.
              <b>Эко-батыр</b> атану үшін күнделікті кішігірім қадамдар жасау жеткілікті!
            </p>
          </div>
        </div>
      </section>

      {/* ТОЛЫҚ ЭКРАНДЫ ФОТО МОДАЛІ */}
      {selectedPhoto && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-6 animate-in fade-in duration-200"
          onClick={() => setSelectedPhoto(null)}
        >
          <div className="relative max-w-4xl w-full max-h-[90vh] flex items-center justify-center animate-in zoom-in duration-300" onClick={e => e.stopPropagation()}>
            <img src={selectedPhoto} alt="Толық көрініс" className="max-w-full max-h-[90vh] rounded-2xl object-contain shadow-2xl" />
            <button 
              onClick={() => setSelectedPhoto(null)}
              className="absolute -top-4 -right-4 md:-top-6 md:-right-6 w-12 h-12 bg-white text-gray-900 rounded-full flex items-center justify-center text-2xl font-bold shadow-xl hover:scale-110 hover:bg-gray-100 transition-transform"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
}