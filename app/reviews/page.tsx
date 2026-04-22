"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import Link from "next/link";
import { db } from "@/lib/firebase";
import { 
  collection, addDoc, getDocs, query, orderBy, serverTimestamp, 
  doc, updateDoc, getDoc, deleteDoc, arrayUnion, arrayRemove 
} from "firebase/firestore";

// Уақытты "2 сағат бұрын", "Жаңа ғана" деп көрсететін функция
function timeAgo(date: Date) {
  const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
  if (seconds < 60) return "Жаңа ғана";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes} минут бұрын`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} сағат бұрын`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days} күн бұрын`;
  return date.toLocaleDateString('kk-KZ');
}

export default function CommunityPage() {
  const { firebaseUser, isAuthenticated } = useAuth();
  const [posts, setPosts] = useState<any[]>([]);
  const [newPostContent, setNewPostContent] = useState("");
  const [activeTab, setActiveTab] = useState("Барлығы");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [userLevel, setUserLevel] = useState("Эко-бастаушы");

  // Коменттерді ашып-жабу және жазу үшін state-тер
  const [showComments, setShowComments] = useState<{ [key: string]: boolean }>({});
  const [commentInputs, setCommentInputs] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    async function fetchUserLevel() {
      if (firebaseUser) {
        const userRef = doc(db, "users", firebaseUser.uid);
        const snap = await getDoc(userRef);
        if (snap.exists() && snap.data().level) setUserLevel(snap.data().level);
      }
    }
    fetchUserLevel();
  }, [firebaseUser]);

  const fetchPosts = async () => {
    setIsLoading(true);
    try {
      const q = query(collection(db, "reviews"), orderBy("createdAt", "desc"));
      const querySnapshot = await getDocs(q);
      const fetchedPosts = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        likes: doc.data().likes || [],
        comments: doc.data().comments || [],
        createdAt: doc.data().createdAt?.toDate() || new Date()
      }));
      setPosts(fetchedPosts);
    } catch (error) {
      console.error("Посттарды алу қатесі:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => { fetchPosts(); }, []);

  // Пост жариялау
  const handlePostSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPostContent.trim() || !firebaseUser) return;
    setIsSubmitting(true);
    try {
      await addDoc(collection(db, "reviews"), {
        authorId: firebaseUser.uid,
        author: firebaseUser.displayName || "Қолданушы",
        level: userLevel,
        avatarUrl: firebaseUser.photoURL || "",
        content: newPostContent,
        likes: [],
        comments: [],
        createdAt: serverTimestamp(),
      });
      setNewPostContent("");
      fetchPosts();
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Постты өшіру
  const handleDeletePost = async (postId: string) => {
    if (!window.confirm("Бұл постты өшіргіңіз келе ме?")) return;
    setPosts(posts.filter(post => post.id !== postId));
    try { await deleteDoc(doc(db, "reviews", postId)); } 
    catch (error) { fetchPosts(); }
  };

  // Лайк басу / қайтару логикасы
  const handleLike = async (postId: string, postLikes: string[]) => {
    if (!isAuthenticated || !firebaseUser) {
      alert("Лайк басу үшін жүйеге кіріңіз!"); return;
    }
    const uid = firebaseUser.uid;
    const isLiked = postLikes.includes(uid);

    // UI-ды лезде жаңарту
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          likes: isLiked ? post.likes.filter((id: string) => id !== uid) : [...post.likes, uid]
        };
      }
      return post;
    }));

    // Базаны жаңарту
    try {
      const postRef = doc(db, "reviews", postId);
      await updateDoc(postRef, {
        likes: isLiked ? arrayRemove(uid) : arrayUnion(uid)
      });
    } catch (error) {
      console.error("Лайк қатесі:", error);
    }
  };

  // Комментарий қалдыру логикасы
  const handleCommentSubmit = async (postId: string) => {
    const text = commentInputs[postId];
    if (!isAuthenticated || !firebaseUser) {
      alert("Пікір жазу үшін жүйеге кіріңіз!"); return;
    }
    if (!text || !text.trim()) return;

    const newComment = {
      id: Date.now().toString(),
      uid: firebaseUser.uid,
      author: firebaseUser.displayName || "Қолданушы",
      avatarUrl: firebaseUser.photoURL || "",
      content: text.trim(),
      createdAt: new Date().toISOString()
    };

    // UI-ды лезде жаңарту
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return { ...post, comments: [...post.comments, newComment] };
      }
      return post;
    }));
    setCommentInputs({ ...commentInputs, [postId]: "" });

    // Базаны жаңарту
    try {
      const postRef = doc(db, "reviews", postId);
      await updateDoc(postRef, {
        comments: arrayUnion(newComment)
      });
    } catch (error) {
      console.error("Комент қатесі:", error);
    }
  };

  // Сұрыптау
  const displayedPosts = activeTab === "Барлығы" 
    ? posts 
    : [...posts].sort((a, b) => (b.likes?.length || 0) - (a.likes?.length || 0));

  return (
    <div className="bg-slate-50 min-h-screen font-sans pb-24">
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-emerald-700 via-green-600 to-teal-800 text-white relative py-20 overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/10 rounded-full blur-[100px] -mr-48 -mt-48" />
        <div className="max-w-4xl mx-auto px-6 relative z-10 text-center animate-in fade-in slide-in-from-bottom duration-1000">
          <span className="inline-block bg-white/20 text-white text-xs font-black uppercase tracking-widest px-4 py-2 rounded-full mb-6 backdrop-blur-sm border border-white/30">
            Эко-Лента
          </span>
          <h1 className="text-5xl md:text-6xl font-black mb-6 leading-tight uppercase tracking-tighter">
            Қала дауысы
          </h1>
          <p className="text-emerald-50 text-lg md:text-xl font-medium opacity-90 max-w-2xl mx-auto">
            Алматыны таза қалаға айналдыру жолындағы ойларыңызбен бөлісіп, өзгелерді бағалаңыз.
          </p>
        </div>
      </section>

      <div className="max-w-3xl mx-auto px-6 -mt-10 relative z-20">
        
        {/* Пост жазу (Create Post) */}
        <div className="bg-white rounded-[2.5rem] shadow-[0_10px_40px_rgb(0,0,0,0.08)] border border-slate-100 p-6 md:p-8 mb-10 animate-in zoom-in duration-500">
          {isAuthenticated ? (
            <form onSubmit={handlePostSubmit} className="flex flex-col gap-4">
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center text-xl flex-shrink-0 overflow-hidden border-2 border-emerald-50">
                  {firebaseUser?.photoURL ? <img src={firebaseUser.photoURL} alt="Avatar" className="w-full h-full object-cover" /> : "👤"}
                </div>
                <textarea
                  value={newPostContent}
                  onChange={(e) => setNewPostContent(e.target.value)}
                  placeholder="Не жаңалық бар? Табиғатқа қалай көмектестіңіз?"
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all resize-none font-medium text-slate-700"
                  rows={3}
                  disabled={isSubmitting}
                ></textarea>
              </div>
              <div className="flex justify-end border-t border-slate-100 pt-4 mt-2">
                <button type="submit" disabled={!newPostContent.trim() || isSubmitting} className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-300 text-white font-bold py-3 px-8 rounded-2xl transition-all active:scale-95 shadow-lg shadow-emerald-600/20">
                  {isSubmitting ? "Жүктелуде..." : "Жариялау 🚀"}
                </button>
              </div>
            </form>
          ) : (
            <div className="text-center py-6">
              <p className="text-slate-500 font-medium mb-4 text-lg">Пост жазу және пікір қалдыру үшін жүйеге кіріңіз.</p>
              <Link href="/login" className="inline-block bg-slate-900 text-white font-bold py-3 px-8 rounded-2xl hover:bg-emerald-600 transition-all shadow-md">Жүйеге кіру</Link>
            </div>
          )}
        </div>

        {/* Табтар */}
        <div className="flex gap-3 mb-8">
          <button onClick={() => setActiveTab("Барлығы")} className={`px-6 py-3 rounded-2xl font-bold text-sm transition-all duration-300 ${activeTab === "Барлығы" ? "bg-slate-800 text-white shadow-md" : "bg-white text-slate-500 border border-slate-200 hover:bg-slate-100"}`}>
            🕐 Соңғылары
          </button>
          <button onClick={() => setActiveTab("Танымал")} className={`px-6 py-3 rounded-2xl font-bold text-sm transition-all duration-300 ${activeTab === "Танымал" ? "bg-rose-100 text-rose-700 border border-rose-200 shadow-sm" : "bg-white text-slate-500 border border-slate-200 hover:bg-slate-100"}`}>
            🔥 Ең танымал
          </button>
        </div>

        {/* Лента (Feed) */}
        <div className="space-y-6">
          {isLoading ? (
            <div className="text-center py-10"><div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-emerald-600 mx-auto"></div></div>
          ) : displayedPosts.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-[2.5rem] border border-dashed border-slate-200">
               <p className="text-slate-400 font-medium">Әзірге ешқандай пост жоқ. Алғашқы болып жазыңыз! 🌱</p>
            </div>
          ) : (
            displayedPosts.map((post, index) => {
              const isLiked = firebaseUser ? post.likes.includes(firebaseUser.uid) : false;
              
              return (
              <div key={post.id} className="bg-white rounded-[2.5rem] border border-slate-100 p-6 md:p-8 shadow-sm hover:shadow-xl transition-all duration-300 group animate-in slide-in-from-bottom" style={{ animationFillMode: "both", animationDelay: `${index * 50}ms` }}>
                
                {/* Header (Автор) */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-emerald-50 flex items-center justify-center text-2xl overflow-hidden border border-emerald-100">
                      {post.avatarUrl ? <img src={post.avatarUrl} alt="Avatar" className="w-full h-full object-cover"/> : "👤"}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-extrabold text-slate-900 tracking-tight">{post.author}</h4>
                        <span className="bg-emerald-100 text-emerald-700 text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full">{post.level || "Эко-бастаушы"}</span>
                      </div>
                      <p className="text-xs text-slate-400 font-medium mt-0.5">{timeAgo(post.createdAt)}</p>
                    </div>
                  </div>
                  {firebaseUser?.uid === post.authorId && (
                    <button onClick={() => handleDeletePost(post.id)} className="text-rose-300 hover:text-rose-600 hover:bg-rose-50 p-2.5 rounded-xl transition-all shadow-sm opacity-0 group-hover:opacity-100 focus:opacity-100" title="Постты өшіру">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                    </button>
                  )}
                </div>

                {/* Content */}
                <p className="text-slate-700 text-base leading-relaxed mb-6 font-medium whitespace-pre-wrap">{post.content}</p>

                {/* Әрекеттер (Like & Comment buttons) */}
                <div className="flex items-center gap-6 pt-4 border-t border-slate-100">
                  <button 
                    onClick={() => handleLike(post.id, post.likes)} 
                    className={`flex items-center gap-2 text-sm font-bold transition-colors group/btn ${isLiked ? "text-rose-500" : "text-slate-500 hover:text-rose-500"}`}
                  >
                    <span className="text-xl group-hover/btn:scale-110 transition-transform">{isLiked ? "❤️" : "🤍"}</span>
                    {post.likes.length > 0 && <span>{post.likes.length}</span>}
                  </button>
                  
                  <button 
                    onClick={() => setShowComments({...showComments, [post.id]: !showComments[post.id]})}
                    className="flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-emerald-600 transition-colors group/btn"
                  >
                    <span className="text-xl group-hover/btn:scale-110 transition-transform">💬</span>
                    {post.comments.length > 0 && <span>{post.comments.length}</span>}
                  </button>
                </div>

                {/* Пікірлер (Comments Section) */}
                {showComments[post.id] && (
                  <div className="mt-6 pt-6 border-t border-slate-100 bg-slate-50/50 -mx-6 md:-mx-8 px-6 md:px-8 pb-2 rounded-b-[2.5rem]">
                    
                    {/* Пікірлер тізімі */}
                    <div className="space-y-4 mb-4">
                      {post.comments.map((comment: any) => {
                        const isAuthor = comment.uid === post.authorId; // Түпнұсқа посттың авторы ма?
                        
                        return (
                          <div key={comment.id} className="flex gap-3">
                            <div className="w-8 h-8 rounded-full bg-slate-200 overflow-hidden flex-shrink-0">
                              {comment.avatarUrl ? <img src={comment.avatarUrl} className="w-full h-full object-cover"/> : <span className="flex items-center justify-center h-full text-xs">👤</span>}
                            </div>
                            <div className={`px-4 py-3 rounded-2xl rounded-tl-none shadow-sm w-full border ${isAuthor ? "bg-emerald-50/50 border-emerald-100" : "bg-white border-slate-200"}`}>
                              <div className="flex items-center gap-2 mb-0.5">
                                <h5 className="text-sm font-bold text-slate-900">{comment.author}</h5>
                                
                                {/* АВТОР БЕЛГІСІ */}
                                {isAuthor && (
                                  <span className="bg-emerald-600 text-white text-[9px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded flex items-center gap-0.5">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-2.5 w-2.5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                                    Автор
                                  </span>
                                )}
                                
                              </div>
                              <p className="text-slate-600 text-sm">{comment.content}</p>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* Пікір жазу өрісі */}
                    {isAuthenticated ? (
                      <div className="flex gap-3 items-end">
                        <div className="w-8 h-8 rounded-full bg-emerald-100 overflow-hidden flex-shrink-0 mb-1 border border-emerald-200">
                          {firebaseUser?.photoURL ? <img src={firebaseUser?.photoURL} className="w-full h-full object-cover"/> : <span className="flex items-center justify-center h-full text-xs">👤</span>}
                        </div>
                        <input
                          type="text"
                          value={commentInputs[post.id] || ""}
                          onChange={(e) => setCommentInputs({...commentInputs, [post.id]: e.target.value})}
                          placeholder="Пікір қалдырыңыз..."
                          className="flex-grow bg-white border border-slate-200 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                          onKeyDown={(e) => e.key === 'Enter' && handleCommentSubmit(post.id)}
                        />
                        <button 
                          onClick={() => handleCommentSubmit(post.id)}
                          disabled={!commentInputs[post.id]?.trim()}
                          className="bg-emerald-600 disabled:bg-slate-300 text-white p-2 rounded-full hover:bg-emerald-700 transition-colors mb-0.5"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 transform rotate-90" viewBox="0 0 20 20" fill="currentColor"><path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" /></svg>
                        </button>
                      </div>
                    ) : (
                      <p className="text-xs text-slate-400 text-center pb-4">Пікір жазу үшін жүйеге кіріңіз.</p>
                    )}
                  </div>
                )}

              </div>
            );
          }))}
        </div>

      </div>
    </div>
  );
}