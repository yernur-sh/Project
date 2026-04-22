"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth"; 
import { db } from "@/lib/firebase"; 
import { doc, getDoc, setDoc, updateDoc, increment } from "firebase/firestore";
import quizData from "./quiz.json";
import Link from "next/link";

export default function QuizPage() {
  const { firebaseUser, isAuthenticated } = useAuth();
  const [questions, setQuestions] = useState<any[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const generateRandomQuestions = () => {
    const shuffled = [...quizData].sort(() => 0.5 - Math.random());
    setQuestions(shuffled.slice(0, 5));
  };

  useEffect(() => {
    generateRandomQuestions();
  }, []);

  const handleAnswer = (option: string) => {
    if (selectedOption || !questions[currentStep]) return;
    setSelectedOption(option);
    if (option === questions[currentStep].answer) {
      setScore(score + 1);
    }
  };

  const saveQuizResult = async (finalScore: number) => {
    if (!isAuthenticated || !firebaseUser) return;
    
    setIsSaving(true);
    const xpToAdd = finalScore * 20; 

    try {
      const userRef = doc(db, "users", firebaseUser.uid);
      await setDoc(userRef, {
        points: increment(xpToAdd),
        lastQuizAt: new Date(),
      }, { merge: true });
    } catch (error) {
      console.error("Ұпай сақтау кезінде қате кетті:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const nextQuestion = () => {
    const next = currentStep + 1;
    if (next < questions.length) {
      setCurrentStep(next);
      setSelectedOption(null);
    } else {
      setShowResult(true);
      saveQuizResult(score); 
    }
  };

  const resetQuiz = () => {
    generateRandomQuestions();
    setCurrentStep(0);
    setScore(0);
    setShowResult(false);
    setSelectedOption(null);
  };

  if (questions.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-emerald-600"></div>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen font-sans pb-24">
      
      {/* 100% CommunityPage стиліндегі Hero Section */}
      <section className="bg-gradient-to-br from-emerald-700 via-green-600 to-teal-800 text-white relative py-20 overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/10 rounded-full blur-[100px] -mr-48 -mt-48" />
        
        <div className="max-w-4xl mx-auto px-6 relative z-10 text-center animate-in fade-in slide-in-from-bottom duration-1000">
          <span className="inline-block bg-white/20 text-white text-xs font-black uppercase tracking-widest px-4 py-2 rounded-full mb-6 backdrop-blur-sm border border-white/30 shadow-sm">
            5 сұрақ — 5 мүмкіндік
          </span>
          <h1 className="text-5xl md:text-6xl font-black mb-6 leading-tight uppercase tracking-tighter">
            Эко-Викторина
          </h1>
          <p className="text-emerald-50 text-lg md:text-xl font-medium opacity-90 max-w-2xl mx-auto">
            Табиғат пен экология туралы біліміңізді тексеріп, әрбір дұрыс жауап үшін XP ұпайларын жинаңыз.
          </p>
        </div>
      </section>

      {/* CommunityPage стиліндегі Негізгі Блок */}
      <div className="max-w-3xl mx-auto px-6 -mt-10 relative z-20">
        
        {!showResult ? (
          <div className="bg-white rounded-[2.5rem] shadow-[0_10px_40px_rgb(0,0,0,0.08)] border border-slate-100 p-6 md:p-10 animate-in zoom-in duration-500">
            
            {/* Прогресс бар */}
            <div className="flex justify-between items-center mb-8 border-b border-slate-100 pb-6">
              <span className="text-sm font-extrabold text-slate-800 uppercase tracking-widest flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-sm">{currentStep + 1}</span>
                / 5 сұрақ
              </span>
              <div className="h-2.5 w-32 md:w-48 bg-slate-100 rounded-full overflow-hidden border border-slate-200/50">
                <div 
                  className="h-full bg-emerald-500 transition-all duration-700 ease-out" 
                  style={{ width: `${((currentStep + 1) / 5) * 100}%` }}
                />
              </div>
            </div>

            {/* Сұрақ мәтіні */}
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-8 leading-tight tracking-tight">
              {questions[currentStep].question}
            </h2>

            {/* Жауап нұсқалары */}
            <div className="grid grid-cols-1 gap-4">
              {questions[currentStep].options.map((option: string) => {
                let buttonStyle = "bg-slate-50 border-slate-200 text-slate-700 hover:bg-emerald-50 hover:border-emerald-200 hover:text-emerald-800";
                let iconStyle = "border-slate-200 text-transparent bg-white group-hover:border-emerald-300";
                
                if (selectedOption === option) {
                  if (option === questions[currentStep].answer) {
                    buttonStyle = "border-emerald-500 bg-emerald-50 text-emerald-800 shadow-sm";
                    iconStyle = "bg-emerald-500 border-emerald-500 text-white";
                  } else {
                    buttonStyle = "border-rose-500 bg-rose-50 text-rose-800 shadow-sm";
                    iconStyle = "bg-rose-500 border-rose-500 text-white";
                  }
                } else if (selectedOption && option === questions[currentStep].answer) {
                  buttonStyle = "border-emerald-400 bg-white text-emerald-700 opacity-80";
                  iconStyle = "bg-emerald-400 border-emerald-400 text-white";
                }

                return (
                  <button
                    key={option}
                    onClick={() => handleAnswer(option)}
                    disabled={!!selectedOption}
                    className={`group w-full text-left px-6 py-5 rounded-2xl border-2 font-bold transition-all duration-300 flex justify-between items-center cursor-pointer ${
                      !selectedOption ? "active:scale-[0.98]" : ""
                    } ${buttonStyle}`}
                  >
                    <span className="flex-1 pr-4 text-base">{option}</span>
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300 flex-shrink-0 ${iconStyle}`}>
                        {selectedOption && (
                           <span className="text-[12px] font-black">
                             {option === questions[currentStep].answer ? "✓" : (selectedOption === option ? "✕" : "")}
                           </span>
                        )}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Нәтиже мен Келесі батырмасы */}
            {selectedOption && (
              <div className="mt-8 pt-8 border-t border-slate-100 animate-in slide-in-from-bottom-4 duration-500 fade-in">
                <div className="mb-8 p-5 bg-amber-50 rounded-2xl border border-amber-100/50 flex gap-4 items-start">
                    <div className="text-2xl mt-0.5 animate-pulse">💡</div>
                    <div>
                      <span className="font-bold text-amber-800 uppercase text-xs tracking-wider block mb-1">Білгенге маржан</span> 
                      <p className="text-sm text-amber-900/80 leading-relaxed font-medium">
                        {questions[currentStep].info}
                      </p>
                    </div>
                </div>
                <button
                  onClick={nextQuestion}
                  className="w-full bg-emerald-600 text-white font-extrabold py-4 rounded-2xl hover:bg-emerald-700 transition-all duration-300 active:scale-[0.98] shadow-lg shadow-emerald-600/20"
                >
                  {currentStep + 1 === 5 ? "НӘТИЖЕНІ КӨРУ 🎯" : "КЕЛЕСІ СҰРАҚ ➡️"}
                </button>
              </div>
            )}
          </div>
        ) : (
          /* НӘТИЖЕ ЭКРАНЫ */
          <div className="bg-white rounded-[2.5rem] shadow-[0_10px_40px_rgb(0,0,0,0.08)] p-10 md:p-14 text-center border border-slate-100 animate-in zoom-in-95 duration-500 fade-in">
            <div className="text-7xl md:text-8xl mb-8 animate-bounce duration-[2000ms]">
              {score === 5 ? "🏆" : score >= 3 ? "🌱" : "📚"}
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-3 tracking-tighter uppercase">Викторина аяқталды!</h2>
            <p className="text-slate-500 mb-10 font-medium text-lg">
                {score === 5 ? "Керемет! Сіз нағыз эко-сарапшысыз!" : "Жақсы нәтиже! Біліміңізді толықтыра түсіңіз."}
            </p>
            
            <div className="relative inline-block mb-12 group">
                <div className="bg-slate-50 px-16 py-10 rounded-[3rem] border border-slate-200 shadow-inner">
                  <span className="text-8xl font-black text-slate-800">{score}</span>
                  <span className="text-3xl font-bold text-slate-400 ml-2">/ 5</span>
                </div>
                {score > 0 && isAuthenticated && (
                  <div className="absolute -top-4 -right-6 bg-emerald-500 text-white text-sm font-black px-5 py-2 rounded-full shadow-lg border-2 border-white animate-pulse">
                      +{score * 20} XP
                  </div>
                )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-md mx-auto">
              <button
                onClick={resetQuiz}
                className="bg-slate-100 text-slate-700 font-bold py-4 rounded-2xl hover:bg-slate-200 transition-all active:scale-95"
              >
                🔄 ТАҒЫ КӨРУ
              </button>
              <Link
                href="/"
                className="flex items-center justify-center bg-emerald-600 text-white font-extrabold py-4 rounded-2xl hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-600/20 active:scale-95"
              >
                БАСТЫ БЕТКЕ
              </Link>
            </div>
            {isSaving && (
              <p className="mt-6 text-sm font-medium text-emerald-600 flex items-center justify-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                Ұпайлар сақталуда...
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}