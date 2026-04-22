'use client';

import { useState } from 'react';
import { signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '@/lib/firebase';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function LoginPage() {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      console.log('Сәтті кірген қолданушы:', result.user);
      router.push('/');
    } catch (error: any) {
      console.error('Кіру кезінде қате шықты:', error);
      setError('Google арқылы кіру мүмкін болмады. Қайта көріңіз.');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-green-50 via-white to-green-100 p-4">
      
      {/* Артқы фондағы декоративті элементтер */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-green-200 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-emerald-200 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-2000"></div>

      {/* Негізгі Логин Карточкасы */}
      <div className="relative z-10 w-full max-w-md bg-white/80 backdrop-blur-xl p-8 sm:p-10 rounded-[2rem] shadow-2xl border border-white/50">
        
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 text-3xl mb-4 shadow-sm border border-green-200">
            🌱
          </div>
          <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Қош келдіңіз!</h1>
          <p className="text-gray-500">
            Эко-өмір салтын бірге қалыптастырайық
          </p>
        </div>
        
        <button 
          onClick={handleGoogleSignIn}
          disabled={isLoading}
          className="w-full flex items-center justify-center gap-3 bg-white border border-gray-300 rounded-2xl px-4 py-3.5 text-gray-700 font-medium hover:bg-gray-50 hover:border-gray-400 hover:shadow-md transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed active:scale-[0.98]"
        >
          {isLoading ? (
            <div className="w-5 h-5 border-2 border-green-600 border-t-transparent rounded-full animate-spin"></div>
          ) : (
            <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              <path fill="none" d="M1 1h22v22H1z" />
            </svg>
          )}
          {isLoading ? 'Кіру жүргізілуде...' : 'Google арқылы жалғастыру'}
        </button>

        {error && (
          <div className="mt-4 p-3 bg-red-50 border border-red-100 rounded-xl text-sm text-red-600 text-center flex items-center justify-center gap-2">
            <span>⚠️</span> {error}
          </div>
        )}

        <div className="mt-8 pt-6 border-t border-gray-100 text-center">
          <Link 
            href="/" 
            className="text-sm font-medium text-gray-500 hover:text-green-600 transition-colors"
          >
            ← Басты бетке қайту
          </Link>
        </div>

      </div>
    </div>
  );
}