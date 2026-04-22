'use client';

import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";

export default function ProfilePage() {
  const { firebaseUser, isAuthenticated, loading, logout } = useAuth();
  const router = useRouter();
  
  // Firestore деректерін сақтау үшін
  const [userData, setUserData] = useState({ 
    points: 0, 
    completedCount: 0, // Осы мәнді тікелей аламыз
    level: "Эко-бастаушы"
  });
  const [dataLoading, setDataLoading] = useState(true);

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push('/login');
    }
  }, [loading, isAuthenticated, router]);

  // Дерекқордан ұпайларды, деңгейді және тапсырма санын тарту
  useEffect(() => {
    async function fetchStats() {
      if (firebaseUser) {
        try {
          const userRef = doc(db, "users", firebaseUser.uid);
          const docSnap = await getDoc(userRef);
          if (docSnap.exists()) {
            const data = docSnap.data();
            setUserData({
              points: data.points || 0,
              // ОСЫ ЖЕР ӨЗГЕРДІ: Тікелей completedCount өрісін оқимыз
              completedCount: data.completedCount || 0,
              level: data.level || "Эко-бастаушы" 
            });
          }
        } catch (error) {
          console.error("Деректерді алуда қате кетті", error);
        } finally {
          setDataLoading(false);
        }
      }
    }
    fetchStats();
  }, [firebaseUser]);

  const handleLogout = async () => {
    try {
      await logout();
      router.push('/');
    } catch (error) {
      console.error("Шығу кезінде қате кетті:", error);
    }
  };

  // Жүктелу экраны
  if (loading || dataLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-slate-50">
        <div className="relative flex items-center justify-center">
          <div className="absolute inset-0 border-4 border-emerald-100 rounded-full"></div>
          <div className="animate-spin rounded-full h-14 w-14 border-t-4 border-b-4 border-emerald-500 z-10"></div>
        </div>
      </div>
    );
  }

  if (!firebaseUser) return null;

  // Тіркелген күнді пішімдеу
  const joinDate = firebaseUser.metadata.creationTime 
    ? new Date(firebaseUser.metadata.creationTime).toLocaleDateString('kk-KZ', { month: 'long', year: 'numeric' })
    : 'Жақында';

  return (
    <div className="min-h-screen bg-slate-50 pt-12 pb-24 font-sans">
      <div className="max-w-4xl mx-auto px-6">
        
        {/* Профиль Карточкасы */}
        <div className="bg-white rounded-[2.5rem] shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-slate-100 overflow-hidden transition-all duration-300">
          
          {/* Банер (Градиент фон) */}
          <div className="h-40 md:h-48 relative overflow-hidden bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-600">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full blur-3xl -mt-10 -mr-10"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-emerald-900 opacity-20 rounded-full blur-2xl -mb-10 -ml-10"></div>
          </div>
          
          <div className="px-8 md:px-12 pb-12">
            
            {/* Аватар және Шығу батырмасы */}
            <div className="relative flex justify-between items-end -mt-16 md:-mt-20 mb-8">
              
              {/* Аватар */}
              <div className="p-1.5 bg-white rounded-full shadow-md z-10 group">
                {firebaseUser.photoURL ? (
                  <img 
                    src={firebaseUser.photoURL} 
                    alt="Профиль" 
                    referrerPolicy="no-referrer"
                    className="w-28 h-28 md:w-32 md:h-32 rounded-full border-4 border-slate-50 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="w-28 h-28 md:w-32 md:h-32 bg-emerald-50 rounded-full flex items-center justify-center text-4xl border-4 border-slate-50 text-emerald-600 group-hover:scale-105 transition-transform duration-300">
                    👤
                  </div>
                )}
              </div>
              
              {/* Жүйеден шығу */}
              <button 
                onClick={handleLogout} 
                className="mb-2 px-6 py-2.5 bg-white text-rose-600 font-bold rounded-xl border-2 border-rose-100 hover:bg-rose-50 hover:border-rose-200 transition-all duration-300 active:scale-95 shadow-sm"
              >
                Жүйеден шығу
              </button>
            </div>

            {/* Қолданушы ақпараты */}
            <div className="space-y-1.5 mb-10">
              <div className="flex items-center gap-3">
                <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight">
                  {firebaseUser.displayName || "Қолданушы"}
                </h1>
                <span className="bg-emerald-100 text-emerald-700 text-xs font-bold px-2.5 py-1 rounded-md uppercase tracking-wide">
                  {userData.level}
                </span>
              </div>
              <p className="text-slate-500 font-medium text-lg">{firebaseUser.email}</p>
            </div>

            <div className="w-full h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent mb-10"></div>

            {/* СТАТИСТИКА */}
            <h2 className="text-xl font-extrabold text-slate-800 mb-6">Статистика</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              
              {/* Эко-ұпайлар */}
              <div className="p-6 bg-emerald-50 rounded-3xl border border-emerald-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-20 text-5xl">🌱</div>
                <p className="text-sm font-bold text-emerald-600/80 uppercase tracking-wider mb-2 relative z-10">Эко-ұпайлар</p>
                <div className="flex items-baseline gap-1 relative z-10">
                  <p className="text-4xl font-black text-emerald-700">{userData.points}</p>
                  <span className="text-emerald-600 font-bold">XP</span>
                </div>
              </div>

              {/* Орындалған тапсырмалар саны */}
              <div className="p-6 bg-blue-50 rounded-3xl border border-blue-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-20 text-5xl">🏆</div>
                <p className="text-sm font-bold text-blue-600/80 uppercase tracking-wider mb-2 relative z-10">Тапсырмалар</p>
                <div className="flex items-baseline gap-1 relative z-10">
                  <p className="text-4xl font-black text-blue-700">{userData.completedCount}</p>
                  <span className="text-blue-600 font-bold">рет</span>
                </div>
              </div>

              {/* Тіркелген күні */}
              <div className="p-6 bg-slate-50 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-20 text-5xl">📅</div>
                <p className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-2 relative z-10">Тіркелген күні</p>
                <p className="text-2xl font-extrabold text-slate-700 capitalize relative z-10">{joinDate}</p>
              </div>

            </div>

          </div>
        </div>
      </div>
    </div>
  );
}