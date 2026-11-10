import React, { useState, useEffect, useRef } from "react";
import { Sparkles, Play } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const VintageTheater = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showIframe, setShowIframe] = useState(false);
  const [activeVideo, setActiveVideo] = useState("launch"); // "launch" or "birthday"
  const containerRef = useRef(null);

  const videos = {
    launch: {
      id: "kg3jH6Bnw8A",
      title: "MassIndia Partnership Launches Legacy 250 Initiative",
      subtitle: "Official Launch Video",
      embedUrl: "https://www.youtube.com/embed/kg3jH6Bnw8A?autoplay=1&mute=1&rel=0",
    },
    birthday: {
      id: "1T_0cKV7QKg",
      title: "Happy 250th Birthday America!",
      subtitle: "America's 250th Anniversary Commemoration",
      embedUrl: "https://www.youtube.com/embed/1T_0cKV7QKg?autoplay=1&mute=1&rel=0",
    },
  };

  const currentVideo = videos[activeVideo];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsPlaying(true);
          const timer = setTimeout(() => {
            setShowIframe(true);
          }, 1000);
          observer.disconnect();
          return () => clearTimeout(timer);
        }
      },
      { threshold: 0.15 }
    );

    const current = containerRef.current;
    if (current) {
      observer.observe(current);
    }

    return () => {
      if (current) {
        observer.disconnect();
      }
    };
  }, []);

  return (
    <section className="py-20 md:py-28 bg-[#05080f] relative overflow-hidden border-t border-b border-white/5" ref={containerRef}>
      <style>{`
        @keyframes ambient-pulse {
          0%, 100% { opacity: 0.8; transform: scale(1.02) translate(0px, 0px); filter: blur(40px); }
          50% { opacity: 1; transform: scale(1.06) translate(5px, -5px); filter: blur(50px); }
        }
        .animate-ambient-glow {
          animation: ambient-pulse 4s ease-in-out infinite;
        }
      `}</style>

      <div className="absolute inset-0 opacity-[0.02] pointer-events-none z-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px]" />
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-red-900/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-blue-900/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10 max-w-5xl">
        
        {/* Title Header */}
        <div className="text-center mb-10 relative">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/10 border border-amber-500/20 rounded-full text-amber-500 font-inter text-[10px] tracking-[0.25em] uppercase mb-4 shadow-sm">
            <Sparkles className="w-3 h-3 animate-pulse" /> MassIndia Partnership • Legacy 250 Videos
          </div>
          
          <h2 className="font-playfair text-3xl md:text-5xl font-bold tracking-tight text-white mb-4 relative drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]">
            {currentVideo.title}
          </h2>
          
          <p className="font-lora text-slate-400 text-base md:text-lg max-w-xl mx-auto italic leading-relaxed">
            "{currentVideo.subtitle}"
          </p>

          {/* VIDEO SELECTOR TABS */}
          <div className="flex flex-wrap justify-center gap-3 mt-8">
            <button
              onClick={() => {
                setActiveVideo("launch");
                setShowIframe(true);
              }}
              className={`px-5 py-2.5 rounded-full font-inter text-xs uppercase tracking-widest transition-all cursor-pointer ${
                activeVideo === "launch"
                  ? "bg-amber-500 text-black font-bold shadow-[0_0_20px_rgba(245,158,11,0.4)]"
                  : "bg-white/5 text-slate-300 hover:bg-white/10 border border-white/10"
              }`}
            >
              1. MassIndia Legacy 250 Launch
            </button>
            <button
              onClick={() => {
                setActiveVideo("birthday");
                setShowIframe(true);
              }}
              className={`px-5 py-2.5 rounded-full font-inter text-xs uppercase tracking-widest transition-all cursor-pointer ${
                activeVideo === "birthday"
                  ? "bg-amber-500 text-black font-bold shadow-[0_0_20px_rgba(245,158,11,0.4)]"
                  : "bg-white/5 text-slate-300 hover:bg-white/10 border border-white/10"
              }`}
            >
              2. America's 250th Birthday
            </button>
          </div>

          <div className="h-0.5 w-32 bg-gradient-to-r from-transparent via-amber-500/40 to-transparent mx-auto mt-6" />
        </div>

        {/* Cinematic Video Player Container */}
        <div className="relative group max-w-4xl mx-auto">
          <div className={`absolute -inset-6 rounded-2xl pointer-events-none z-0 transition-all duration-1000 ${
            isPlaying 
              ? "bg-gradient-to-r from-red-500/45 via-amber-500/50 to-blue-500/45 opacity-100 animate-ambient-glow" 
              : "bg-gradient-to-r from-red-500/10 via-amber-500/10 to-blue-500/10 opacity-30"
          }`} />

          <div className="relative z-10 rounded-2xl overflow-hidden border border-white/10 bg-[#0d131f]/40 backdrop-blur-md p-2 shadow-[0_25px_60px_rgba(0,0,0,0.7)] hover:border-white/15 transition-colors duration-500">
            <div className="aspect-video w-full rounded-xl overflow-hidden relative bg-[#020408] shadow-[inset_0_4px_20px_rgba(0,0,0,0.9)] flex items-center justify-center">
              
              <AnimatePresence mode="wait">
                {showIframe ? (
                  <motion.div 
                    key={activeVideo}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="w-full h-full"
                  >
                    <iframe 
                      className="w-full h-full absolute inset-0 border-0"
                      src={currentVideo.embedUrl} 
                      title={currentVideo.title} 
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                      referrerPolicy="strict-origin-when-cross-origin" 
                      allowFullScreen
                    />
                  </motion.div>
                ) : (
                  <motion.div 
                    key="placeholder"
                    className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center cursor-pointer bg-cover bg-center"
                    style={{ backgroundImage: "url('/assets/indiauslegacy250.webp')" }}
                    onClick={() => {
                      setIsPlaying(true);
                      setShowIframe(true);
                    }}
                  >
                    <div className="absolute inset-0 bg-[#05080f]/75 backdrop-blur-[1px] transition-all duration-500 group-hover:bg-[#05080f]/60" />
                    
                    <div className="relative z-10 flex flex-col items-center justify-center">
                      <div className="w-20 h-20 rounded-full bg-amber-500/10 border-2 border-amber-500/40 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-amber-500/25 group-hover:border-amber-500 group-hover:shadow-[0_0_35px_rgba(245,158,11,0.5)] shadow-[0_0_20px_rgba(245,158,11,0.2)] transition-all duration-500">
                        <Play className="w-8 h-8 text-amber-500 fill-current ml-1" />
                      </div>
                      <span className="font-playfair text-2xl md:text-3xl text-white mb-2 tracking-wide font-bold drop-shadow-md">{currentVideo.title}</span>
                      <span className="font-inter text-xs uppercase tracking-widest text-slate-400 group-hover:text-amber-500 transition-colors">Click to play video</span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

            </div>
          </div>
        </div>

        <div className="text-center mt-6">
          <p className="font-inter text-xs text-slate-500 uppercase tracking-widest select-none">
            🔊 Click volume button on video controls to unmute.
          </p>
        </div>

      </div>
    </section>
  );
};
