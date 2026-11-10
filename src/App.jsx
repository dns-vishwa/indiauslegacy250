import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  ChevronDown,
  Globe,
  BookOpen,
  Building,
  Film,
  Users,
  Landmark,
  Rocket,
  Cpu,
  Calendar,
  Clock,
  MapPin,
  Menu,
  X,
  Volume2,
  VolumeX,
  ArrowRight,
  Mail,
  Phone,
  Send,
  CheckCircle2,
  Play,
  Pause,
  Sparkles,
  Heart,
  MessageSquare,
  Loader2,
  History,
  Mic2,
  Users2,
  Layers,
  Search,
  Download,
  FileText,
  Shield,
  ArrowLeftRight,
  TrendingUp,
  GraduationCap,
  Zap,
  ExternalLink,
  Quote,
  Instagram,
  Youtube,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Camera,
} from "lucide-react";
import { Spotlight } from "./components/ui/Spotlight";
import { SparklesCore } from "./components/ui/SparklesCore";
import { Button } from "./components/ui/MovingBorder";
import { TextGenerateEffect } from "./components/ui/TextGenerateEffect";
import { CardContainer, CardBody, CardItem } from "./components/ui/Card3D";
import { TracingBeam } from "./components/ui/TracingBeam";
import { LampContainer } from "./components/ui/LampEffect";
import { motion, AnimatePresence } from "framer-motion";
import { PartnershipForm } from "./components/PartnershipForm";
import { AmbassadorForm } from "./components/AmbassadorForm";
import { StateAmbassadorForm } from "./components/StateAmbassadorForm";
import { StudentAmbassadorForm } from "./components/StudentAmbassadorForm";
import { VintageTheater } from "./components/VintageTheater";
import { DonateView } from "./components/DonateView";
import { PosterDetailView } from "./components/PosterDetailView";
import { findPosterBySlug } from "./data/postersData";


/* -----------------------------------------------------------------------
  LEGACY 250 - Anniversary Platform (High Performance Edition + Gemini AI)
  
  Updated Features:
  - Robust TTS Handling: Strips markdown to prevent audio generation errors.
  - API Safety Checks: Prevents crashes if audio quota is hit.
  - Synchronized Response: Audio and Text appear together.
  - Rate Limit Handling: Retry logic for 429 errors.
  -----------------------------------------------------------------------
*/

// --- ASSETS & CONSTANTS ---
// Ensure this file exists in your public folder, or use a remote URL if testing
const MUSIC_URL = "music.mp3";

// --- UTILS: AUDIO HANDLING ---

const pcmToWav = (base64PCM, sampleRate = 24000) => {
  if (!base64PCM) return null;
  // Fix: Remove any whitespace/newlines that might break atob
  const cleanBase64 = base64PCM.replace(/\s/g, "");

  try {
    const binaryString = window.atob(cleanBase64);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }

    const wavHeader = new ArrayBuffer(44);
    const view = new DataView(wavHeader);

    const writeString = (view, offset, string) => {
      for (let i = 0; i < string.length; i++) {
        view.setUint8(offset + i, string.charCodeAt(i));
      }
    };

    // RIFF chunk descriptor
    writeString(view, 0, "RIFF");
    view.setUint32(4, 36 + len, true);
    writeString(view, 8, "WAVE");

    // fmt sub-chunk
    writeString(view, 12, "fmt ");
    view.setUint32(16, 16, true);
    view.setUint16(20, 1, true); // PCM format
    view.setUint16(22, 1, true); // Mono
    view.setUint32(24, sampleRate, true);
    view.setUint32(28, sampleRate * 2, true);
    view.setUint16(32, 2, true); // Block align
    view.setUint16(34, 16, true); // Bits per sample

    // data sub-chunk
    writeString(view, 36, "data");
    view.setUint32(40, len, true);

    const blob = new Blob([view, bytes], { type: "audio/wav" });
    return URL.createObjectURL(blob);
  } catch (error) {
    console.error("PCM to WAV conversion failed:", error);
    return null;
  }
};

// --- GEMINI API INTEGRATION ---

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

// Helper for delay
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const callGemini = async (prompt, systemInstruction = "", retries = 3) => {
  if (!GEMINI_API_KEY) {
    console.error("Gemini API Key is missing. Please check your .env file.");
    return "The archives are inaccessible (API Key missing).";
  }
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`;

  const payload = {
    contents: [{ parts: [{ text: prompt }] }],
  };
  if (systemInstruction) {
    payload.system_instruction = { parts: { text: systemInstruction } };
  }

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (response.status === 429 && retries > 0) {
      console.warn(
        `Rate limit hit (Text). Retrying in ${(4 - retries) * 2}s...`,
      );
      await delay((4 - retries) * 2000); // Exponential backoff: 2s, 4s, 6s
      return callGemini(prompt, systemInstruction, retries - 1);
    }

    if (!response.ok) {
      const errorText = await response.text();
      console.warn("Gemini Text API Error:", response.status, errorText);
      throw new Error(`API Connection Failed: ${response.status}`);
    }

    const data = await response.json();
    return (
      data.candidates?.[0]?.content?.parts?.[0]?.text ||
      "The archives are currently silent. Please try again."
    );
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Connection to the archives interrupted. Please try again later.";
  }
};

const callGeminiTTS = async (text, retries = 3) => {
  if (!GEMINI_API_KEY) {
    console.error("Gemini API Key is missing (TTS).");
    return null;
  }
  // Fix: Strip markdown characters (*, #, _) which can break TTS generation
  const cleanText = text.replace(/[\*\#\_\[\]]/g, "");

  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`;

  const payload = {
    contents: [{ parts: [{ text: cleanText }] }],
    generationConfig: {
      responseModalities: ["AUDIO"],
      speechConfig: {
        voiceConfig: { prebuiltVoiceConfig: { voiceName: "Kore" } },
      },
    },
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (response.status === 429) {
      if (retries > 0) {
        console.warn(
          `Rate limit hit (TTS). Retrying in ${(4 - retries) * 2}s...`,
        );
        await delay((4 - retries) * 2000);
        return callGeminiTTS(text, retries - 1);
      } else {
        console.warn("TTS Quota exhausted. Returning null audio.");
        return null; // Fail gracefully after retries
      }
    }

    if (!response.ok) {
      const errorText = await response.text();
      console.warn("Gemini TTS API Error:", response.status, errorText);
      return null;
    }

    const data = await response.json();
    const audioData =
      data.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
    if (audioData) return pcmToWav(audioData);
    return null;
  } catch (error) {
    console.error("Gemini TTS Error:", error);
    return null;
  }
};

// --- CUSTOM HOOKS ---

const useIntersectionObserver = (options = {}) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsIntersecting(true);
          if (elementRef.current) observer.unobserve(elementRef.current);
        }
      },
      { threshold: 0.1, ...options },
    );

    const current = elementRef.current;
    if (current) observer.observe(current);

    return () => {
      if (current) observer.disconnect();
    };
  }, [options]);

  return [elementRef, isIntersecting];
};



// --- UI COMPONENTS ---

const FadeIn = ({ children, delay = 0, className = "", direction = "up" }) => {
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.1 });

  const translateClass =
    direction === "up"
      ? "translate-y-16"
      : direction === "left"
        ? "-translate-x-16"
        : "translate-x-16";

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ease-out transform ${
        isVisible
          ? "opacity-100 translate-y-0 translate-x-0"
          : `opacity-0 ${translateClass}`
      } ${className}`}
      style={{
        transitionDelay: `${delay}ms`,
        willChange: "opacity, transform",
      }}
    >
      {children}
    </div>
  );
};

const SectionHeading = ({ sub, title, align = "center" }) => (
  <div className={`flex flex-col ${align === "center" ? "items-center text-center" : "items-start text-left"} mb-12 relative z-10`}>
    <span className="font-inter tracking-[0.2em] text-amber-500 font-bold uppercase text-xs mb-3 block">
      {sub}
    </span>
    <h2 className="font-playfair text-3xl md:text-5xl text-white mb-6">
      {title}
    </h2>
    <div className="h-1 w-20 bg-amber-600 rounded-full" />
  </div>
);

const NavButton = ({ label, onClick, active }) => (
  <button
    onClick={onClick}
    className={`text-xs font-inter uppercase tracking-widest transition-colors ${
      active ? "text-amber-500" : "text-slate-400 hover:text-white"
    }`}
  >
    {label}
  </button>
);

const GrainOverlay = () => (
  <div className="fixed inset-0 pointer-events-none z-[60] opacity-[0.03] mix-blend-overlay">
    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] animate-grain" />
  </div>
);



const InteractiveStats = () => {
  const [activeTab, setActiveTab] = useState("Home");

  const data = {
    Home: [
      { val: "250", label: "Years of Ties", icon: History },
      { val: "1776", label: "Shared Origins", icon: FileText },
      { val: "02", label: "Great Democracies", icon: Landmark },
    ],
    History: [
      { val: "1947", label: "Independence", icon: Globe },
      { val: "2008", label: "Nuclear Deal", icon: Zap },
      { val: "2026", label: "The Milestone", icon: Sparkles },
    ],
    People: [
      { val: "4.5M", label: "Indian Diaspora", icon: Users },
      { val: "200K", label: "Students in US", icon: GraduationCap },
      { val: "#1", label: "Source of Talent", icon: CheckCircle2 },
    ],
    Future: [
      { val: "$500B", label: "Trade Target", icon: TrendingUp },
      { val: "50+", label: "Joint Ventures", icon: Rocket },
      { val: "∞", label: "Possibilities", icon: Sparkles },
    ],
  };

  return (
    <div className="pt-12 border-t border-white/5 mt-16 w-full">
      <div className="flex flex-wrap justify-center md:justify-start gap-4 mb-10">
        {Object.keys(data).map(tab => (
           <button 
             key={tab}
             onClick={() => setActiveTab(tab)}
             className={`px-6 py-2.5 rounded-full text-[10px] md:text-xs font-inter uppercase tracking-widest transition-all duration-300 border backdrop-blur-md ${activeTab === tab ? 'bg-amber-600/90 text-white border-amber-500/50 shadow-glow-sm scale-105' : 'bg-white/5 text-slate-400 border-white/10 hover:border-amber-500/30 hover:text-amber-500'}`}
           >
             {tab}
           </button>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6">
         {data[activeTab].map((stat, i) => (
            <div key={`${activeTab}-${i}`} className="animate-fade-in flex justify-center">
             <Button
                duration={3000 + (i * 500)}
                borderRadius="0.5rem"
                className="bg-midnight-800/80 backdrop-blur-xl text-slate-200 border-white/10 shadow-glass"
                containerClassName="h-36 w-full md:w-64"
             >
                <div className="flex flex-col items-center justify-center p-4">
                  <div className="text-amber-500 mb-3 opacity-90 drop-shadow-sm"><stat.icon size={26} strokeWidth={1.25} /></div>
                  <span className="block font-playfair text-3xl md:text-5xl text-white mb-2 tracking-tight drop-shadow-md">{stat.val}</span>
                  <span className="text-[10px] md:text-xs font-inter uppercase tracking-[0.2em] text-slate-500 font-medium">{stat.label}</span>
                </div>
             </Button>
            </div>
         ))}
      </div>
    </div>
  );
};

// --- AI FEATURES COMPONENTS ---

const ArchivistWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [history, setHistory] = useState([
    {
      role: "system",
      text: "Greetings. I am the Archivist. Ask me of the shared history between our two great nations.",
      audio: null,
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [audioPlaying, setAudioPlaying] = useState(null);
  const [audioLoading, setAudioLoading] = useState(null);
  const audioRef = useRef(new Audio());
  const chatEndRef = useRef(null);
  const hasPlayedGreetingRef = useRef(false);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history, isOpen]);

  // Auto-play greeting when opened for the first time
  useEffect(() => {
    if (isOpen && !hasPlayedGreetingRef.current && history.length === 1) {
      // Small delay to ensure browser allows audio if interaction just happened
      setTimeout(() => {
        playResponseAudio(history[0].text, 0, history[0].audio);
        hasPlayedGreetingRef.current = true;
      }, 500);
    }
  }, [isOpen]);

  const playResponseAudio = async (text, index, existingUrl = null) => {
    if (audioPlaying === index) {
      audioRef.current.pause();
      setAudioPlaying(null);
      return;
    }

    audioRef.current.pause();
      setAudioPlaying(null);

    // Ensure we use the existing URL if provided, or fallback to checking the history state
    let audioUrl = existingUrl || history[index]?.audio;

    if (!audioUrl) {
      setAudioLoading(index);
      const generatedUrl = await callGeminiTTS(text);
      setAudioLoading(null);

      if (generatedUrl) {
        audioUrl = generatedUrl;
        setHistory((prev) => {
          const newHistory = [...prev];
          if (newHistory[index]) {
            newHistory[index].audio = generatedUrl;
          }
          return newHistory;
        });
      } else {
        console.warn("Failed to generate audio, user might have hit quota.");
        return;
      }
    }

    audioRef.current.src = audioUrl;
    setAudioPlaying(index);
    audioRef.current.play().catch((e) => {
      console.log("Playback failed:", e);
      setAudioPlaying(null);
    });

    audioRef.current.onended = () => {
      setAudioPlaying(null);
    };
  };

  const handleAsk = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    const userQ = query;
    setQuery("");

    // Add user message immediately
    setHistory((prev) => [...prev, { role: "user", text: userQ }]);
    setIsLoading(true);

    const systemPrompt =
      "You are the Chief Archivist for 'Legacy 250'. Answer user questions about 250 years of US-India history (1776-Present) with an elegant, academic, yet accessible tone. Keep answers concise (under 40 words).";

    // 1. Get Text Response
    const responseText = await callGemini(userQ, systemPrompt);

    // 2. Get Audio Response (Wait for it, so text and audio are ready together)
    // Retry logic handles 429 errors internally in callGeminiTTS
    const audioUrl = await callGeminiTTS(responseText);

    // 3. Update UI only when both are ready (or just text if audio failed after retries)
    setHistory((prev) => {
      const newHistory = [
        ...prev,
        { role: "system", text: responseText, audio: audioUrl },
      ];

      // Trigger auto-play explicitly using the new URL to avoid re-fetching
      if (audioUrl) {
        setTimeout(() => {
          // We can directly play the audio element here or via state
          audioRef.current.src = audioUrl;
          setAudioPlaying(newHistory.length - 1);
          audioRef.current
            .play()
            .catch((e) => console.log("Auto-play error:", e));
          audioRef.current.onended = () => setAudioPlaying(null);
        }, 100);
      }

      return newHistory;
    });

    setIsLoading(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end pointer-events-none">
      <div
        className={`pointer-events-auto mb-4 w-80 md:w-96 bg-[#0f172a] border border-amber-500/30 rounded-sm shadow-2xl transition-all duration-500 origin-bottom-right overflow-hidden flex flex-col ${isOpen ? "scale-100 opacity-100" : "scale-75 opacity-0 translate-y-10 pointer-events-none h-0"}`}
      >
        <div className="bg-amber-900/20 p-4 border-b border-amber-500/20 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <History className="w-4 h-4 text-amber-500" />
            <span className="font-playfair text-amber-100">The Archivist</span>
          </div>
          <button onClick={() => setIsOpen(false)}>
            <X className="w-4 h-4 text-amber-500/50 hover:text-amber-500" />
          </button>
        </div>
        <div className="h-80 overflow-y-auto p-4 space-y-4 bg-[#0a0f1c]">
          {history.map((msg, i) => (
            <div
              key={i}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[85%] p-3 rounded-sm text-sm font-lora leading-relaxed relative group ${
                  msg.role === "user"
                    ? "bg-amber-900/30 text-amber-100 border border-amber-500/20"
                    : "bg-slate-800/50 text-slate-300 border border-white/5"
                }`}
              >
                {msg.text}
                {msg.role === "system" && (
                  <button
                    onClick={() => playResponseAudio(msg.text, i, msg.audio)}
                    className="absolute -bottom-3 -right-3 bg-[#0f172a] p-1.5 rounded-full border border-amber-500/30 text-amber-500 hover:bg-amber-900 transition-colors shadow-sm opacity-100 focus:opacity-100"
                    title="Read aloud"
                    disabled={audioLoading === i}
                  >
                    {audioLoading === i ? (
                      <Loader2 size={12} className="animate-spin" />
                    ) : audioPlaying === i ? (
                      <Volume2 size={12} className="animate-pulse" />
                    ) : (
                      <Volume2 size={12} />
                    )}
                  </button>
                )}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-slate-800/50 p-3 rounded-sm border border-white/5 flex items-center gap-2 text-slate-400 text-xs">
                <Loader2 className="w-3 h-3 animate-spin" /> Consulting the
                records...
              </div>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>
        <form
          onSubmit={handleAsk}
          className="p-3 bg-[#0f172a] border-t border-amber-500/20 flex gap-2"
        >
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ask about 1776, Gandhi, or Silicon Valley..."
            className="flex-1 bg-black/20 border border-white/10 rounded-sm px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-500/50 font-inter placeholder-slate-600"
          />
          <button
            type="submit"
            disabled={isLoading}
            className="p-2 bg-amber-600/20 text-amber-500 hover:bg-amber-600 hover:text-white transition-colors rounded-sm border border-amber-600/50"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="pointer-events-auto group flex items-center gap-3 bg-[#0f172a] border border-amber-500/30 text-amber-500 px-5 py-3 rounded-full hover:bg-amber-950 transition-all shadow-[0_0_30px_rgba(0,0,0,0.5)] hover:border-amber-500"
      >
        <Sparkles className="w-4 h-4 group-hover:animate-pulse" />
        <span className="font-inter text-xs uppercase tracking-widest hidden md:block">
          Ask The Archivist AI
        </span>
      </button>
    </div>
  );
};

// New AI Feature: Interactive Connection Explorer
const ThreadExplorer = () => {
  const [topic, setTopic] = useState("");
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleExplore = async (e) => {
    e.preventDefault();
    if (!topic.trim()) return;
    setIsLoading(true);
    setResult(null);

    const prompt = `As part of the Legacy 250 initiative, uncover the "Golden Thread" connecting India and the United States regarding "${topic}". Explain the shared legacy, mutual influence, or deep-rooted connection in a single, poetic, and historically insightful paragraph (max 50 words).`;
    const response = await callGemini(
      prompt,
      "You are a cultural historian connecting American and Indian history.",
    );

    setResult(response);
    setIsLoading(false);
  };

  return (
    <section className="py-24 bg-[#0a0f1c] border-y border-white/5 relative overflow-hidden">
      <div className="absolute inset-0 w-full h-full pointer-events-none">
        <SparklesCore
          id="tsparticlesthread"
          background="transparent"
          minSize={1}
          maxSize={3}
          particleDensity={150}
          className="w-full h-full"
          particleColor="#fbbf24"
        />
      </div>
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <span className="font-inter text-amber-500 uppercase tracking-[0.2em] text-xs mb-4 block">
            Interactive Discovery
          </span>
          <h2 className="font-playfair text-3xl md:text-4xl text-white mb-8">
            Explore the Golden Thread AI
          </h2>
          <p className="font-lora text-slate-400 mb-10">
            Enter any topic—from{" "}
            <span className="text-amber-500/80 italic">"Cinema"</span> to{" "}
            <span className="text-amber-500/80 italic">"Spices"</span> or{" "}
            <span className="text-amber-500/80 italic">"Democracy"</span>—and
            let our AI historian uncover the unique connection between our two
            nations.
          </p>

          <form
            onSubmit={handleExplore}
            className="relative max-w-lg mx-auto mb-12 group"
          >
            <div className="absolute inset-0 bg-amber-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            <div className="relative flex items-center bg-white/5 border border-white/10 rounded-full overflow-hidden p-1 focus-within:border-amber-500/50 transition-colors">
              <input
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="Enter a topic..."
                className="flex-1 bg-transparent px-6 py-3 text-white font-playfair focus:outline-none placeholder-white/20"
              />
              <button
                type="submit"
                disabled={isLoading}
                className="bg-amber-600 hover:bg-amber-500 text-white px-6 py-3 rounded-full font-inter text-xs uppercase tracking-widest transition-all flex items-center gap-2"
              >
                {isLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Search className="w-4 h-4" />
                )}
                <span className="hidden sm:inline">Weave ✨</span>
              </button>
            </div>
          </form>

          {result && (
            <FadeIn className="bg-white/5 border border-amber-500/20 p-8 rounded-sm max-w-2xl mx-auto relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#0a0f1c] px-4 text-amber-500">
                <Sparkles className="w-6 h-6" />
              </div>
              <p className="font-lora text-lg text-amber-100/90 leading-relaxed italic">
                "{result}"
              </p>
            </FadeIn>
          )}
        </div>
      </div>
    </section>
  );
};

// NEW FEATURE: Parallel Paths
const ParallelPaths = () => {
  const [field, setField] = useState("");
  const [comparison, setComparison] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchParallel = async (e) => {
    e.preventDefault();
    if (!field.trim()) return;
    setLoading(true);
    setComparison(null);

    const prompt = `Identify one famous historical figure from the USA and one from India in the field of "${field}". 
    Format the response strictly as JSON with keys: "usPerson", "indiaPerson", "description". 
    The description should be 2-3 sentences explaining their parallel impact or shared legacy.`;

    const system = "You are a comparative historian. Return valid JSON only.";

    try {
      const text = await callGemini(prompt, system);
      // More robust JSON extraction
      let jsonText = text;
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        jsonText = jsonMatch[0];
      } else {
        jsonText = text
          .replace(/```json/g, "")
          .replace(/```/g, "")
          .trim();
      }
      
      try {
        setComparison(JSON.parse(jsonText));
      } catch (parseErr) {
        console.error("JSON Parse Error:", parseErr, "Original text:", text);
        throw new Error("Invalid output format from AI");
      }
    } catch (err) {
      console.error(err);
      setComparison({
        usPerson: "Unknown American",
        indiaPerson: "Unknown Indian",
        description:
          "The archives could not retrieve a parallel for this field at the moment.",
      });
    }
    setLoading(false);
  };

  return (
    <section className="py-24 bg-[#05080f] border-t border-white/5 relative">
      <div className="container mx-auto px-6 relative z-10">
        <div className="relative h-[20rem] w-full flex flex-col items-center justify-center overflow-hidden rounded-md">
          <div className="w-full absolute inset-0 h-full">
            <SparklesCore
              id="tsparticlesparallel"
              background="transparent"
              minSize={1}
              maxSize={3}
              particleDensity={200}
              className="w-full h-full"
              particleColor="#fbbf24"
            />
          </div>
          <motion.h1
            initial={{ opacity: 0.5, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8, ease: "easeInOut" }}
            className="md:text-7xl text-3xl lg:text-6xl font-bold text-center text-white relative z-20 font-playfair"
          >
            Parallel Paths AI
          </motion.h1>
           <div className="absolute inset-0 bg-gradient-to-t from-[#05080f] via-transparent to-[#05080f] z-10 pointer-events-none" />
        </div>

        <div className="max-w-4xl mx-auto">
          <p className="text-center font-lora text-slate-400 mb-8">
            History often rhymes. Enter a field (e.g., "Civil Rights",
            "Mathematics", "Poetry") to discover a historical duo—one American,
            one Indian—who walked similar paths.
          </p>

          <form
            onSubmit={fetchParallel}
            className="flex gap-4 max-w-md mx-auto mb-16"
          >
            <input
              type="text"
              value={field}
              onChange={(e) => setField(e.target.value)}
              placeholder="Enter a field (e.g., Space)..."
              className="flex-1 bg-white/5 border border-white/10 rounded-sm px-4 py-3 text-white font-playfair focus:outline-none focus:border-amber-500 transition-colors"
            />
            <button
              disabled={loading}
              className="bg-amber-600 hover:bg-amber-500 text-white px-6 py-3 rounded-sm font-inter text-xs uppercase tracking-widest transition-all"
            >
              {loading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <ArrowLeftRight className="w-4 h-4" />
              )}
            </button>
          </form>

          {comparison && (
            <FadeIn className="grid md:grid-cols-11 gap-8 items-center">
              <div className="md:col-span-5 bg-[#0a0f1c] border border-amber-500/20 p-8 rounded-sm text-center relative overflow-hidden group">
                <div className="absolute inset-0 bg-blue-900/10 group-hover:bg-blue-900/20 transition-colors" />
                <h3 className="relative font-playfair text-2xl text-white mb-2">
                  {comparison.usPerson}
                </h3>
                <span className="relative font-inter text-xs text-blue-400 uppercase tracking-widest">
                  USA
                </span>
              </div>

              <div className="md:col-span-1 flex justify-center text-amber-500">
                <ArrowLeftRight className="w-6 h-6" />
              </div>

              <div className="md:col-span-5 bg-[#0a0f1c] border border-amber-500/20 p-8 rounded-sm text-center relative overflow-hidden group">
                <div className="absolute inset-0 bg-orange-900/10 group-hover:bg-orange-900/20 transition-colors" />
                <h3 className="relative font-playfair text-2xl text-white mb-2">
                  {comparison.indiaPerson}
                </h3>
                <span className="relative font-inter text-xs text-orange-400 uppercase tracking-widest">
                  India
                </span>
              </div>

              <div className="md:col-span-11 mt-8 text-center">
                <div className="inline-block p-6 bg-white/5 rounded-sm border border-white/10">
                  <p className="font-lora text-slate-300 italic leading-relaxed">
                    "{comparison.description}"
                  </p>
                </div>
              </div>
            </FadeIn>
          )}
        </div>
      </div>
    </section>
  );
};

// --- LEGAL & PRESS VIEWS ---

const LegalLayout = ({ title, sub, children }) => (
  <div className="min-h-screen bg-[#0a0f1c] pt-24 md:pt-40 pb-20 relative animate-fade-in text-white">
    <div className="absolute top-0 right-0 w-[60vw] h-full bg-gradient-to-l from-[#0f172a] to-transparent z-0 opacity-50" />
    <div className="container mx-auto px-6 relative z-10">
      <FadeIn>
        <SectionHeading light title={title} sub={sub} />
        <div className="max-w-4xl mx-auto bg-white/5 backdrop-blur-sm border border-white/10 p-6 md:p-12 rounded-sm shadow-2xl font-lora text-slate-300 leading-relaxed space-y-8">
          {children}
        </div>
      </FadeIn>
    </div>
  </div>
);

const PrivacyView = () => (
  <LegalLayout title="Privacy Policy" sub="Legal">
    <p>Last Updated: January 1, 2026</p>
    <h3 className="text-2xl font-playfair text-amber-500 mt-8 mb-4">
      1. Information Collection
    </h3>
    <p>
      US-India Legacy 250 Years respects your privacy. When you use our contact forms,
      interactive AI features ("The Archivist" or "Thread Explorer"), or sign up
      for newsletters, we may collect personal information such as your name,
      email address, and institutional affiliation.
    </p>
    <h3 className="text-2xl font-playfair text-amber-500 mt-8 mb-4">
      2. Use of AI Technologies
    </h3>
    <p>
      Our platform utilizes advanced Artificial Intelligence (Gemini API) to
      provide interactive historical context. Queries submitted to "The
      Archivist" or "Thread Explorer" are processed to generate responses but
      are not permanently stored linked to your personal identity.
    </p>
    <h3 className="text-2xl font-playfair text-amber-500 mt-8 mb-4">
      3. Data Security
    </h3>
    <p>
      We employ industry-standard encryption and security protocols to protect
      your data. However, please note that no method of transmission over the
      Internet is 100% secure.
    </p>
    <h3 className="text-2xl font-playfair text-amber-500 mt-8 mb-4">
      4. Contact
    </h3>
    <p>
      For privacy concerns, please contact our Data Protection Officer at{" "}
      <span className="text-amber-400 hover:underline cursor-pointer">
        privacy@indiauslegacy250.com
      </span>
      .
    </p>
  </LegalLayout>
);

const TermsView = () => (
  <LegalLayout title="Terms of Use" sub="Agreements">
    <p>Effective Date: January 1, 2026</p>
    <h3 className="text-2xl font-playfair text-amber-500 mt-8 mb-4">
      1. Acceptance of Terms
    </h3>
    <p>
      By accessing the US-India Legacy 250 Years platform, you agree to be bound by these Terms
      of Use. If you do not agree to these terms, please do not use our
      services.
    </p>
    <h3 className="text-2xl font-playfair text-amber-500 mt-8 mb-4">
      2. Intellectual Property
    </h3>
    <p>
      All content, including historical texts, documentaries, exhibition
      designs, and the "Golden Thread" timeline data, is the property of the
      US-India Legacy 250 Years Initiative or its content partners and is
      protected by international copyright laws.
    </p>
    <h3 className="text-2xl font-playfair text-amber-500 mt-8 mb-4">
      3. AI Usage Guidelines
    </h3>
    <p>
      The AI features provided are for educational and historical exploration
      purposes. Users agree not to use the AI tools to generate harmful,
      misleading, or historically inaccurate propaganda.
    </p>
    <p>
      2. Users may not reproduce or redistribute site content without prior authorization.
    </p>
    <h3 className="text-2xl font-playfair text-amber-500 mt-8 mb-4">
      4. Limitation of Liability
    </h3>
    <p>
      US-India Legacy 250 Years shall not be liable for any indirect, incidental, special,
      consequential, or punitive damages resulting from your access to or use of
      the service.
    </p>
  </LegalLayout>
);

const ContactView = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formData = new FormData(e.target);
      formData.append("access_key", "07f19a7d-ea21-48f7-8a77-c52bf1c2296e");
      formData.append("subject", `New Contact Inquiry: ${formData.get("name")}`);

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });

      const data = await response.json();
      if (data.success) {
        setSubmitted(true);
      } else {
        alert("Failed to submit form: " + data.message);
      }
    } catch (error) {
      console.error("Submission error:", error);
      alert("An error occurred while submitting. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0f1c] pt-24 md:pt-40 pb-20 relative animate-fade-in text-white">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-900/10 rounded-full blur-[100px]" />
      <div className="container mx-auto px-6 relative z-10">
        <SectionHeading light title="Contact Us" sub="Get in Touch" />
        <div className="max-w-2xl mx-auto mt-12 bg-white/5 backdrop-blur-sm border border-white/10 p-8 rounded-sm">
          <p className="font-lora text-slate-300 text-center mb-6">
            We'd love to hear from you. Reach out to us at <a href="mailto:info@IndiaUSLegacy250.com" className="text-amber-500 hover:underline">info@IndiaUSLegacy250.com</a> or use the form below.
          </p>
          <div className="flex justify-center gap-6 mb-8 pb-6 border-b border-white/10">
            <a href="https://www.instagram.com/legacy250official/" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-amber-500 transition-colors flex items-center gap-2 font-inter text-xs uppercase tracking-wider">
              <Instagram className="w-4 h-4" /> Instagram
            </a>
            <a href="https://www.youtube.com/@Legacy250-k6q" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-amber-500 transition-colors flex items-center gap-2 font-inter text-xs uppercase tracking-wider">
              <Youtube className="w-4 h-4" /> YouTube
            </a>
            <a href="https://x.com/Legacy250Social" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-amber-500 transition-colors flex items-center gap-2 font-inter text-xs uppercase tracking-wider">
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg> X (Twitter)
            </a>
          </div>
          {submitted ? (
            <div className="text-center py-10 space-y-4">
              <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-green-500/20">
                <CheckCircle2 className="w-8 h-8 text-green-500" />
              </div>
              <h3 className="font-playfair text-2xl text-white">
                Success!
              </h3>
              <p className="font-lora text-slate-400 text-sm max-w-xs mx-auto leading-relaxed">
                Thank you for your message. We have received your inquiry and will respond shortly.
              </p>
              <button 
                onClick={() => setSubmitted(false)}
                className="text-amber-500 text-[10px] font-inter uppercase tracking-widest hover:text-white transition-colors"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label className="block font-inter text-xs uppercase tracking-widest text-slate-400 mb-2">Name</label>
                <input required name="name" type="text" className="w-full bg-white/5 border border-white/10 rounded-sm px-4 py-3 text-white focus:outline-none focus:border-amber-500 transition-colors" placeholder="Your Name" />
              </div>
              <div>
                <label className="block font-inter text-xs uppercase tracking-widest text-slate-400 mb-2">Email</label>
                <input required name="email" type="email" className="w-full bg-white/5 border border-white/10 rounded-sm px-4 py-3 text-white focus:outline-none focus:border-amber-500 transition-colors" placeholder="your@email.com" />
              </div>
              <div>
                <label className="block font-inter text-xs uppercase tracking-widest text-slate-400 mb-2">Message</label>
                <textarea required name="message" rows="5" className="w-full bg-white/5 border border-white/10 rounded-sm px-4 py-3 text-white focus:outline-none focus:border-amber-500 transition-colors" placeholder="How can we help?"></textarea>
              </div>
              <button type="submit" disabled={isSubmitting} className="w-full bg-amber-600 hover:bg-amber-500 text-white px-6 py-4 rounded-sm font-inter text-xs uppercase tracking-widest transition-all">
                {isSubmitting ? "Sending..." : "Send Message"}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

const PressKitView = () => (
  <div className="min-h-screen bg-[#0a0f1c] pt-24 md:pt-40 pb-20 relative animate-fade-in text-white">
    <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-amber-900/10 rounded-full blur-[100px]" />
    <div className="container mx-auto px-6 relative z-10">
      <SectionHeading light title="Press Info" sub="Media Resources" />
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-12 mt-12">
        {/* Main Content Column */}
        <div className="md:col-span-2 space-y-8 bg-white/5 backdrop-blur-sm border border-white/10 p-8 rounded-sm">
          <div>
            <span className="font-inter text-xs text-amber-500 uppercase tracking-widest block mb-2">Bilateral Initiative</span>
            <h3 className="text-3xl font-playfair text-white mb-4">
              About US-India Legacy 250
            </h3>
            <p className="font-lora text-slate-300 leading-relaxed mb-6">
              Legacy 250 celebrates America’s 250th anniversary by telling the powerful story of 250+ years of India–U.S. connections – our shared past, dynamic present, and bold future. 
            </p>
            <p className="font-lora text-slate-300 leading-relaxed mb-6">
              From trade, ideas, democracy, and culture to science, technology, entrepreneurship, and people-to-people ties, Legacy 250 is a yearlong national movement to honor history and inspire the next generation of India–America partnership. Legacy 250 is an initiative of Mass India Partnership, a not-for-profit organization registered in Boston, Massachusetts.
            </p>
          </div>

          <div className="border-t border-white/10 pt-6">
            <h4 className="font-playfair text-xl text-amber-500 mb-4">Key Themes</h4>
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <h5 className="font-playfair text-base text-white mb-2">Democracy & Freedom</h5>
                <p className="font-lora text-xs text-slate-400 leading-relaxed">Constitutional values, Civil rights, Gandhi & Martin Luther King Jr., and freedom movements.</p>
              </div>
              <div>
                <h5 className="font-playfair text-base text-white mb-2">Knowledge & Education</h5>
                <p className="font-lora text-xs text-slate-400 leading-relaxed">Vivekananda in America, Emerson & Thoreau, Madras to Yale, and intellectual exchange.</p>
              </div>
              <div>
                <h5 className="font-playfair text-base text-white mb-2">Science & Innovation</h5>
                <p className="font-lora text-xs text-slate-400 leading-relaxed">Indian Americans in STEM, AI and medicine, space collaboration, and genetics.</p>
              </div>
              <div>
                <h5 className="font-playfair text-base text-white mb-2">Immigration & Diaspora</h5>
                <p className="font-lora text-xs text-slate-400 leading-relaxed">Entrepreneurship, public service, academic success, and leadership in technology.</p>
              </div>
            </div>
          </div>

          <div className="border-t border-white/10 pt-6">
            <h4 className="font-playfair text-xl text-amber-500 mb-4">Signature Goals</h4>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 text-center">
              <div className="p-4 bg-white/5 border border-white/5 rounded">
                <span className="block text-xl font-playfair text-amber-500 font-bold">50</span>
                <span className="text-[10px] font-inter text-slate-400 uppercase tracking-wider">States</span>
              </div>
              <div className="p-4 bg-white/5 border border-white/5 rounded">
                <span className="block text-xl font-playfair text-amber-500 font-bold">50</span>
                <span className="text-[10px] font-inter text-slate-400 uppercase tracking-wider">Universities</span>
              </div>
              <div className="p-4 bg-white/5 border border-white/5 rounded">
                <span className="block text-xl font-playfair text-amber-500 font-bold">50</span>
                <span className="text-[10px] font-inter text-slate-400 uppercase tracking-wider">Organizations</span>
              </div>
              <div className="p-4 bg-white/5 border border-white/5 rounded">
                <span className="block text-xl font-playfair text-amber-500 font-bold">50</span>
                <span className="text-[10px] font-inter text-slate-400 uppercase tracking-wider">Museums</span>
              </div>
              <div className="p-4 bg-white/5 border border-white/5 rounded col-span-2 sm:col-span-1">
                <span className="block text-xl font-playfair text-amber-500 font-bold">250+</span>
                <span className="text-[10px] font-inter text-slate-400 uppercase tracking-wider">Programs</span>
              </div>
            </div>
          </div>

          <div className="border-t border-white/10 pt-6">
            <h4 className="font-playfair text-xl text-amber-500 mb-4">Possible Story Angles</h4>
            <ul className="list-disc list-inside font-lora text-sm text-slate-300 space-y-2">
              <li>Colonial India and early American institutions (e.g. Madras to Yale)</li>
              <li>How Gadar movement and Indian revolutionaries operated on U.S. soil</li>
              <li>Spiritual convergence: Vivekananda, Thoreau, and Emerson</li>
              <li>Immigration and the tech revolution in Silicon Valley</li>
            </ul>
          </div>

          {/* FEATURED MEDIA REPORTS & PRESS COVERAGE */}
          <div className="border-t border-white/10 pt-8 mt-8">
            <span className="font-inter text-xs text-amber-500 font-bold uppercase tracking-[0.2em] block mb-2">
              Media Coverage & News
            </span>
            <h4 className="font-playfair text-2xl text-white mb-6">
              Featured Press Reports
            </h4>

            <div className="space-y-4 font-serif">
              {/* Report 1 */}
              <div className="p-5 bg-white/5 border border-white/10 hover:border-amber-500/40 rounded-lg transition-all">
                <span className="font-inter text-[10px] text-amber-400 font-bold uppercase tracking-wider block mb-1">
                  INDIA New England News
                </span>
                <h5 className="font-playfair text-lg text-white font-medium mb-2">
                  MassIndia Partnership Launches Legacy 250 Initiative to Celebrate 250 Years of U.S.-India Connections
                </h5>
                <a
                  href="https://indianewengland.com/massindia-partnership-launches-legacy-250-initiative-to-celebrate-250-years-of-u-s-india-connections/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs font-inter text-amber-400 hover:text-white transition-colors"
                >
                  Read Full Article <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              {/* Report 2 */}
              <div className="p-5 bg-white/5 border border-white/10 hover:border-amber-500/40 rounded-lg transition-all">
                <span className="font-inter text-[10px] text-amber-400 font-bold uppercase tracking-wider block mb-1">
                  Winchester News
                </span>
                <h5 className="font-playfair text-lg text-white font-medium mb-2">
                  Lexington Event Celebrates 250 Years of India–U.S. Connections
                </h5>
                <a
                  href="https://winchesternews.org/20260724_lexington-event-celebrates-250-years-of-india-u-s-connections/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs font-inter text-amber-400 hover:text-white transition-colors"
                >
                  Read Full Article <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              {/* Report 3 */}
              <div className="p-5 bg-white/5 border border-white/10 hover:border-amber-500/40 rounded-lg transition-all">
                <span className="font-inter text-[10px] text-amber-400 font-bold uppercase tracking-wider block mb-1">
                  Lexington Observer
                </span>
                <h5 className="font-playfair text-lg text-white font-medium mb-2">
                  Letter to the Editor: The Untold 250-Year Story Connecting India and America
                </h5>
                <a
                  href="https://lexobserver.org/2026/07/22/letter-to-the-editor-the-untold-250-year-story-connecting-india-and-america/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs font-inter text-amber-400 hover:text-white transition-colors"
                >
                  Read Full Article <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar Column */}
        <div className="space-y-8">
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-8 rounded-sm">
            <h3 className="text-2xl font-playfair text-amber-500 mb-6">
              Media Kit Download
            </h3>
            <p className="font-lora text-slate-300 leading-relaxed mb-6">
              Download the official Media Kit PDF containing the complete initiative timeline, press releases, organization overview, and details about the Mass-India Partnership.
            </p>
            <a href="/assets/media-kit.pdf" download="Legacy250_MediaKit.pdf" className="flex items-center justify-center gap-3 p-4 bg-amber-500 hover:bg-amber-600 text-[#05080f] font-bold rounded-sm transition-colors cursor-pointer group">
              <Download className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span className="font-inter text-xs uppercase tracking-widest">Download Media Kit (PDF)</span>
            </a>
          </div>

          <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-8 rounded-sm">
            <h3 className="text-2xl font-playfair text-amber-500 mb-6">
              Media Inquiries
            </h3>
            <p className="font-lora text-slate-300 leading-relaxed mb-8">
              For interviews, high-resolution imagery, or filming requests, please contact our Communications Director.
            </p>
            <div className="space-y-4">
              <a href="mailto:info@IndiaUSLegacy250.com" className="flex items-center gap-4 p-4 bg-white/5 rounded-sm border border-white/5 hover:border-amber-500/50 transition-colors cursor-pointer group">
                <Mail className="w-5 h-5 text-slate-400 group-hover:text-amber-500" />
                <span className="font-inter text-sm text-slate-300 group-hover:text-amber-500 transition-colors">info@IndiaUSLegacy250.com</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const PartnershipView = () => (
  <div className="min-h-screen bg-[#0a0f1c] pt-24 md:pt-32 pb-24 relative animate-fade-in text-white">
    <div className="container mx-auto px-6 max-w-4xl space-y-16">
        <PartnershipForm />
        <AmbassadorForm />
    </div>
  </div>
);

// --- NEW VIEWS ---

const chicagoPhotos = [
  {
    path: "/assets/events/chicago-glimpses/chicago-glimpse-01.jpg",
    title: "US-India Legacy 250 Symposium — Fullerton Hall Stage & Keynote",
    caption: "Distinguished speakers and dignitaries addressing the gathering at the historic Fullerton Hall, Art Institute of Chicago."
  },
  {
    path: "/assets/events/chicago-glimpses/chicago-glimpse-02.jpg",
    title: "Keynote Address & Commemoration",
    caption: "Honoring the 250 years of shared democratic values and cultural exchange between India and the United States."
  },
  {
    path: "/assets/events/chicago-glimpses/chicago-glimpse-03.jpg",
    title: "Historical Exhibition & Curated Displays",
    caption: "Attendees exploring the visual journey and historical archives connecting the two democracies."
  },
  {
    path: "/assets/events/chicago-glimpses/chicago-glimpse-04.jpg",
    title: "Scholars & Community Leadership",
    caption: "Scholars, educators, and community leaders participating in panel discussions."
  },
  {
    path: "/assets/events/chicago-glimpses/chicago-glimpse-05.jpg",
    title: "Symposium Audience at Fullerton Hall",
    caption: "A packed auditorium at Fullerton Hall of the Art Institute of Chicago."
  },
  {
    path: "/assets/events/chicago-glimpses/chicago-glimpse-06.jpg",
    title: "Panel Discussion on Science, Innovation & Ideals",
    caption: "Panelists conversing on historic milestones from Swami Vivekananda's 1893 address to modern technology."
  },
  {
    path: "/assets/events/chicago-glimpses/chicago-glimpse-07.jpg",
    title: "Commemorative Presentation & Honors",
    caption: "Honoring distinguished contributors and partners supporting the Legacy 250 initiative."
  },
  {
    path: "/assets/events/chicago-glimpses/chicago-glimpse-08.jpg",
    title: "Audience Engagement & Q&A",
    caption: "Audience members interacting during the symposium discussions."
  },
  {
    path: "/assets/events/chicago-glimpses/chicago-glimpse-09.jpg",
    title: "Dignitaries & Diplomatic Representatives",
    caption: "Dignitaries and community leaders representing the Consulate General of India and partner organizations."
  },
  {
    path: "/assets/events/chicago-glimpses/chicago-glimpse-10.jpg",
    title: "Exhibition Walkthrough & Archival Panels",
    caption: "Visual narrative detailing 250+ years of trade, philosophy, and people-to-people bonds."
  },
  {
    path: "/assets/events/chicago-glimpses/chicago-glimpse-11.jpg",
    title: "Youth & Academic Delegates",
    caption: "Students, academics, and researchers gathered to commemorate the shared legacy."
  },
  {
    path: "/assets/events/chicago-glimpses/chicago-glimpse-12.jpg",
    title: "Featured Speaker Presentation",
    caption: "In-depth presentation reflecting on Swami Vivekananda's timeless message of universal tolerance."
  },
  {
    path: "/assets/events/chicago-glimpses/chicago-glimpse-13.jpg",
    title: "Networking & Collaborative Exchange",
    caption: "Leaders and participants exchanging ideas to strengthen future partnerships."
  },
  {
    path: "/assets/events/chicago-glimpses/chicago-glimpse-14.jpg",
    title: "Concluding Felicitations & Group Reflection",
    caption: "Commemorative gathering at the conclusion of the Chicago Legacy 250 Symposium."
  }
];

const EventsView = ({ navigateTo }) => {
  const [selectedFlyer, setSelectedFlyer] = useState(null);
  const [zoomScale, setZoomScale] = useState(1);
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [activeChicagoPhoto, setActiveChicagoPhoto] = useState(0);

  const resetZoom = () => {
    setZoomScale(1);
    setPanOffset({ x: 0, y: 0 });
  };

  const handleZoomIn = (e) => {
    if (e) e.stopPropagation();
    setZoomScale(prev => Math.min(prev + 0.25, 3));
  };

  const handleZoomOut = (e) => {
    if (e) e.stopPropagation();
    setZoomScale(prev => {
      const nextScale = Math.max(prev - 0.25, 1);
      if (nextScale === 1) setPanOffset({ x: 0, y: 0 });
      return nextScale;
    });
  };

  const handleMouseDown = (e) => {
    if (zoomScale <= 1) return;
    setIsDragging(true);
    setDragStart({ x: e.clientX - panOffset.x, y: e.clientY - panOffset.y });
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    setPanOffset({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handlePrevPhoto = (e) => {
    if (e) e.stopPropagation();
    if (selectedFlyer && selectedFlyer.galleryIndex !== undefined) {
      const prevIdx = (selectedFlyer.galleryIndex - 1 + chicagoPhotos.length) % chicagoPhotos.length;
      setSelectedFlyer({
        title: chicagoPhotos[prevIdx].title,
        path: chicagoPhotos[prevIdx].path,
        caption: chicagoPhotos[prevIdx].caption,
        galleryIndex: prevIdx,
      });
      setActiveChicagoPhoto(prevIdx);
      resetZoom();
    }
  };

  const handleNextPhoto = (e) => {
    if (e) e.stopPropagation();
    if (selectedFlyer && selectedFlyer.galleryIndex !== undefined) {
      const nextIdx = (selectedFlyer.galleryIndex + 1) % chicagoPhotos.length;
      setSelectedFlyer({
        title: chicagoPhotos[nextIdx].title,
        path: chicagoPhotos[nextIdx].path,
        caption: chicagoPhotos[nextIdx].caption,
        galleryIndex: nextIdx,
      });
      setActiveChicagoPhoto(nextIdx);
      resetZoom();
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!selectedFlyer) return;
      if (e.key === "Escape") {
        setSelectedFlyer(null);
      } else if (e.key === "ArrowLeft" && selectedFlyer.galleryIndex !== undefined) {
        handlePrevPhoto();
      } else if (e.key === "ArrowRight" && selectedFlyer.galleryIndex !== undefined) {
        handleNextPhoto();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedFlyer]);

  return (
    <div className="min-h-screen bg-[#0a0f1c] pt-24 md:pt-40 pb-20 relative animate-fade-in text-white font-serif">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-amber-900/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="container mx-auto px-6 relative z-10">
        <SectionHeading light title="2026 Events" sub="Upcoming & Past Schedule" />

        {/* ========================================================= */}
        {/* ========================================================= */}
        {/* UPCOMING EVENTS SECTION */}
        {/* ========================================================= */}
        <div className="max-w-4xl mx-auto mt-12 mb-16 space-y-12">
          <div className="flex items-center gap-3 mb-6">
            <span className="h-px bg-amber-500/40 flex-1" />
            <span className="font-inter text-xs text-amber-500 font-bold uppercase tracking-[0.25em] px-4 py-1 bg-amber-500/10 border border-amber-500/30 rounded-full flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" /> Upcoming Events (4)
            </span>
            <span className="h-px bg-amber-500/40 flex-1" />
          </div>

          {/* UPCOMING EVENT 1: Montgomery County, PA Symposium */}
          <div className="bg-[#0b1329]/70 backdrop-blur-md border border-amber-500/30 rounded-2xl overflow-hidden shadow-2xl p-6 md:p-10 space-y-8 transition-all hover:border-amber-400 hover:shadow-[0_0_30px_rgba(245,158,11,0.15)]">
            <div className="grid lg:grid-cols-12 gap-8 items-start">
              {/* Left Column: Interactive Flyer */}
              <div className="lg:col-span-5 flex flex-col items-center">
                <div
                  role="button"
                  tabIndex={0}
                  aria-label="View and zoom official event flyer for US-India Legacy 250 Symposium in Montgomery County, Pennsylvania"
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setSelectedFlyer({ title: "US-India Legacy 250 Symposium (Montgomery County, PA) Flyer", path: "/assets/events/pa-symposium-flyer.jpg" });
                      resetZoom();
                    }
                  }}
                  onClick={() => { setSelectedFlyer({ title: "US-India Legacy 250 Symposium (Montgomery County, PA) Flyer", path: "/assets/events/pa-symposium-flyer.jpg" }); resetZoom(); }}
                  className="relative w-full max-w-sm md:max-w-md mx-auto bg-[#070b16] border border-amber-500/30 rounded-xl overflow-hidden shadow-2xl group cursor-pointer transition-all duration-300 hover:border-amber-400 hover:shadow-[0_0_30px_rgba(245,158,11,0.3)] focus:outline-none focus:ring-2 focus:ring-amber-500"
                >
                  <img
                    src="/assets/events/pa-symposium-flyer.jpg"
                    alt="Official event flyer for US-India Legacy 250 Symposium in Montgomery County, Pennsylvania on Saturday, November 14, 2026"
                    className="w-full h-auto max-h-[500px] object-contain mx-auto transition-transform duration-500 group-hover:scale-102"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 focus:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-end p-4 text-center">
                    <span className="text-amber-400 text-xs font-inter font-bold tracking-widest flex items-center gap-2 bg-[#0a0f1c]/95 px-4 py-2 border border-amber-500/40 rounded-lg shadow-lg">
                      <ZoomIn className="w-4 h-4" /> VIEW FLYER
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between w-full max-w-sm md:max-w-md mt-2 px-1 text-[11px] font-lora text-slate-400">
                  <span>Click flyer to expand</span>
                  <button
                    onClick={() => { setSelectedFlyer({ title: "US-India Legacy 250 Symposium (Montgomery County, PA) Flyer", path: "/assets/events/pa-symposium-flyer.jpg" }); resetZoom(); }}
                    className="text-amber-400 hover:text-amber-300 underline font-inter text-[11px] cursor-pointer"
                  >
                    Interactive Zoom & Download
                  </button>
                </div>
              </div>

              {/* Right Column: Event Info */}
              <div className="lg:col-span-7 space-y-6">
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="inline-block px-3 py-0.5 bg-amber-500/20 text-amber-300 border border-amber-500/40 rounded-full font-inter text-[10px] font-bold uppercase tracking-wider">
                      Upcoming • Saturday, November 14, 2026
                    </span>
                    <span className="inline-block px-3 py-0.5 bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 rounded-full font-inter text-[10px] font-bold uppercase tracking-wider">
                      Free with Registration
                    </span>
                  </div>
                  <h3 className="font-playfair text-2xl md:text-3xl text-white font-bold leading-tight">
                    US-INDIA LEGACY 250 SYMPOSIUM
                  </h3>
                  <p className="font-inter text-xs text-amber-400 font-semibold tracking-wider uppercase mt-1">
                    Montgomery County, Pennsylvania
                  </p>
                  <p className="font-playfair italic text-amber-200 text-sm mt-1">
                    Exploring 250+ Years of People, Ideas, and Partnerships
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-white/5 border border-white/10 p-4 rounded-xl font-serif text-xs">
                  <div className="flex items-start gap-2.5">
                    <Calendar className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-inter text-[10px] text-slate-400 uppercase">Date</span>
                      <p className="text-slate-200 font-medium">Saturday, November 14, 2026</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <Clock className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-inter text-[10px] text-slate-400 uppercase">Time</span>
                      <p className="text-slate-200 font-medium">1:00 PM – 3:30 PM</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2.5 sm:col-span-2">
                    <MapPin className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-inter text-[10px] text-slate-400 uppercase">Venue & Address</span>
                      <p className="text-slate-200 font-medium">
                        <strong>Hatfield Township Administration Building</strong><br />
                        1950 School Road, Hatfield, PA 19440 • Tel: (215) 855-0900
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs font-inter">
                  <div className="p-2.5 bg-white/5 border border-white/10 rounded-lg">
                    <strong className="text-amber-400 block text-[11px] mb-0.5">🎨 Exhibition</strong>
                    <span className="text-slate-300 text-[11px] leading-tight block">Visual journey through 250+ years of connections</span>
                  </div>
                  <div className="p-2.5 bg-white/5 border border-white/10 rounded-lg">
                    <strong className="text-amber-400 block text-[11px] mb-0.5">🎬 Documentary</strong>
                    <span className="text-slate-300 text-[11px] leading-tight block">Screening of "250+ Years: The India–America Story"</span>
                  </div>
                  <div className="p-2.5 bg-white/5 border border-white/10 rounded-lg">
                    <strong className="text-amber-400 block text-[11px] mb-0.5">💬 Discussions</strong>
                    <span className="text-slate-300 text-[11px] leading-tight block">Community leaders, scholars, and special guests</span>
                  </div>
                  <div className="p-2.5 bg-white/5 border border-white/10 rounded-lg">
                    <strong className="text-amber-400 block text-[11px] mb-0.5">🎙️ Keynote</strong>
                    <span className="text-slate-300 text-[11px] leading-tight block">Distinguished address on India–U.S. partnership</span>
                  </div>
                </div>

                <div className="space-y-2 font-lora text-xs md:text-sm text-slate-300 leading-relaxed">
                  <p>
                    From early trade and philosophical resonance to independence movements, innovation, and a growing strategic alliance—the India–America story spans 250+ years of shared values and mutual enrichment.
                  </p>
                </div>

                <div className="pt-3 border-t border-white/10 text-[11px] font-inter text-slate-400 space-y-2">
                  <p><strong className="text-slate-300">An Initiative of:</strong> Mass India Partnership | <strong className="text-slate-300">Program:</strong> US-India Legacy 250</p>
                  <p><strong className="text-slate-300">Contacts:</strong> Kamlesh Patel (+1-610-613-9996) • Avanish Raj (+1-201-673-8843)</p>
                  <div className="pt-2 flex flex-wrap items-center justify-between gap-3">
                    <button
                      onClick={() => { setSelectedFlyer({ title: "US-India Legacy 250 Symposium (Montgomery County, PA) Flyer", path: "/assets/events/pa-symposium-flyer.jpg" }); resetZoom(); }}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500/15 border border-amber-500/40 hover:bg-amber-500 hover:text-black text-amber-300 font-bold font-inter text-xs uppercase tracking-wider rounded-lg transition-all cursor-pointer"
                    >
                      <ZoomIn className="w-4 h-4" /> View Full Poster & QR Code
                    </button>
                    <span className="text-[11px] font-inter text-amber-400 font-semibold italic">
                      Open to the public • Free entry
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* UPCOMING EVENT 2: University of Rhode Island (URI) Symposium */}
          <div className="bg-[#0b1329]/70 backdrop-blur-md border border-amber-500/30 rounded-2xl overflow-hidden shadow-2xl p-6 md:p-10 space-y-8 transition-all hover:border-amber-400 hover:shadow-[0_0_30px_rgba(245,158,11,0.15)]">
            <div className="grid lg:grid-cols-12 gap-8 items-start">
              {/* Left Column: Interactive Flyer */}
              <div className="lg:col-span-5 flex flex-col items-center">
                <div
                  role="button"
                  tabIndex={0}
                  aria-label="View and zoom official event flyer for Shared Legacies of Nonviolence Symposium at The University of Rhode Island"
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setSelectedFlyer({ title: "Shared Legacies of Nonviolence Symposium (URI) Flyer", path: "/assets/events/uri-symposium-flyer.jpg" });
                      resetZoom();
                    }
                  }}
                  onClick={() => { setSelectedFlyer({ title: "Shared Legacies of Nonviolence Symposium (URI) Flyer", path: "/assets/events/uri-symposium-flyer.jpg" }); resetZoom(); }}
                  className="relative w-full max-w-sm md:max-w-md mx-auto bg-[#070b16] border border-amber-500/30 rounded-xl overflow-hidden shadow-2xl group cursor-pointer transition-all duration-300 hover:border-amber-400 hover:shadow-[0_0_30px_rgba(245,158,11,0.3)] focus:outline-none focus:ring-2 focus:ring-amber-500"
                >
                  <img
                    src="/assets/events/uri-symposium-flyer.jpg"
                    alt="Official event flyer for Shared Legacies of Nonviolence: India, America, and a More Peaceful World at The University of Rhode Island on Monday, November 16, 2026"
                    className="w-full h-auto max-h-[500px] object-contain mx-auto transition-transform duration-500 group-hover:scale-102"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 focus:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-end p-4 text-center">
                    <span className="text-amber-400 text-xs font-inter font-bold tracking-widest flex items-center gap-2 bg-[#0a0f1c]/95 px-4 py-2 border border-amber-500/40 rounded-lg shadow-lg">
                      <ZoomIn className="w-4 h-4" /> VIEW FLYER
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between w-full max-w-sm md:max-w-md mt-2 px-1 text-[11px] font-lora text-slate-400">
                  <span>Click flyer to expand</span>
                  <button
                    onClick={() => { setSelectedFlyer({ title: "Shared Legacies of Nonviolence Symposium (URI) Flyer", path: "/assets/events/uri-symposium-flyer.jpg" }); resetZoom(); }}
                    className="text-amber-400 hover:text-amber-300 underline font-inter text-[11px] cursor-pointer"
                  >
                    Interactive Zoom & Download
                  </button>
                </div>
              </div>

              {/* Right Column: Event Info */}
              <div className="lg:col-span-7 space-y-6">
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="inline-block px-3 py-0.5 bg-amber-500/20 text-amber-300 border border-amber-500/40 rounded-full font-inter text-[10px] font-bold uppercase tracking-wider">
                      Upcoming • Monday, November 16, 2026
                    </span>
                    <span className="inline-block px-3 py-0.5 bg-blue-500/15 text-blue-300 border border-blue-500/30 rounded-full font-inter text-[10px] font-bold uppercase tracking-wider">
                      Reception to Follow
                    </span>
                  </div>
                  <h3 className="font-playfair text-2xl md:text-3xl text-white font-bold leading-tight">
                    Shared Legacies of Nonviolence: India, America, and a More Peaceful World
                  </h3>
                  <p className="font-playfair italic text-amber-200 text-sm mt-1">
                    Exploring the enduring impact of nonviolence, mutual learning, and people-to-people connections over 250 years
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-white/5 border border-white/10 p-4 rounded-xl font-serif text-xs">
                  <div className="flex items-start gap-2.5">
                    <Calendar className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-inter text-[10px] text-slate-400 uppercase">Date</span>
                      <p className="text-slate-200 font-medium">Monday, November 16, 2026</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <Clock className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-inter text-[10px] text-slate-400 uppercase">Time</span>
                      <p className="text-slate-200 font-medium">4:00 PM – 6:30 PM (Reception follows)</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2.5 sm:col-span-2">
                    <MapPin className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-inter text-[10px] text-slate-400 uppercase">Location & Venue</span>
                      <p className="text-slate-200 font-medium">
                        <strong>The University of Rhode Island</strong> — Beaupre 105<br />
                        Dept. of Chemistry Building, 140 Flagg Road, Kingston, RI 02881
                      </p>
                    </div>
                  </div>
                </div>

                {/* 5 Pillars */}
                <div className="bg-white/5 border border-white/10 p-3.5 rounded-xl space-y-2">
                  <span className="text-[10px] font-inter uppercase tracking-widest text-amber-400 font-bold block">
                    Ideas That Traveled • Lives That Inspired
                  </span>
                  <div className="flex flex-wrap gap-2 text-[11px] font-inter">
                    <span className="px-2.5 py-1 bg-[#0a0f1c] border border-amber-500/30 rounded text-slate-200">
                      <strong className="text-amber-300">Dr. Bernard LaFayette, Jr.</strong> — Civil Rights Leadership
                    </span>
                    <span className="px-2.5 py-1 bg-[#0a0f1c] border border-amber-500/30 rounded text-slate-200">
                      <strong className="text-amber-300">Henry David Thoreau</strong> — Conscience
                    </span>
                    <span className="px-2.5 py-1 bg-[#0a0f1c] border border-amber-500/30 rounded text-slate-200">
                      <strong className="text-amber-300">Mahatma Gandhi</strong> — Truth
                    </span>
                    <span className="px-2.5 py-1 bg-[#0a0f1c] border border-amber-500/30 rounded text-slate-200">
                      <strong className="text-amber-300">Dr. Martin Luther King Jr.</strong> — Justice
                    </span>
                    <span className="px-2.5 py-1 bg-[#0a0f1c] border border-amber-500/30 rounded text-slate-200">
                      <strong className="text-amber-300">His Holiness the Dalai Lama</strong> — Compassion
                    </span>
                  </div>
                </div>

                <div className="space-y-2 font-lora text-xs md:text-sm text-slate-300 leading-relaxed">
                  <p>
                    Bringing together distinguished speakers and scholars to examine perspectives from Indian and American nonviolence traditions, reflections on Gandhi, Thoreau, LaFayette, King, and the Dalai Lama, and pathways for a more peaceful, inclusive, and sustainable future.
                  </p>
                </div>

                <div className="pt-3 border-t border-white/10 text-[11px] font-inter text-slate-400 space-y-2">
                  <p><strong className="text-slate-300">Organized with:</strong> The University of Rhode Island (International Nonviolence Summer Institute) | Center for Nonviolence & Peace Studies</p>
                  <p><strong className="text-slate-300">Initiative:</strong> US-India Legacy 250 (India • America • A Shared Tomorrow)</p>
                  <div className="pt-2 flex flex-wrap items-center justify-between gap-3">
                    <button
                      onClick={() => { setSelectedFlyer({ title: "Shared Legacies of Nonviolence Symposium (URI) Flyer", path: "/assets/events/uri-symposium-flyer.jpg" }); resetZoom(); }}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500/15 border border-amber-500/40 hover:bg-amber-500 hover:text-black text-amber-300 font-bold font-inter text-xs uppercase tracking-wider rounded-lg transition-all cursor-pointer"
                    >
                      <ZoomIn className="w-4 h-4" /> View Full Poster & QR Code
                    </button>
                    <span className="text-[11px] font-inter text-amber-400 font-semibold italic">
                      Open to students, faculty, and the public
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* UPCOMING EVENT 3: USA-India Legacy 250 Symposium (Boston) */}
          <div className="bg-[#0b1329]/70 backdrop-blur-md border border-amber-500/30 rounded-2xl overflow-hidden shadow-2xl p-6 md:p-10 space-y-8 transition-all hover:border-amber-400 hover:shadow-[0_0_30px_rgba(245,158,11,0.15)]">
            <div className="grid lg:grid-cols-12 gap-8 items-start">
              {/* Left Column: Interactive Flyer */}
              <div className="lg:col-span-5 flex flex-col items-center">
                <div
                  role="button"
                  tabIndex={0}
                  aria-label="View and zoom official invitation flyer for USA-India Legacy 250 Symposium at Consulate General of India Boston"
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setSelectedFlyer({ title: "USA-India Legacy 250 Symposium (Boston) Invitation", path: "/assets/events/boston-symposium-flyer.jpg" });
                      resetZoom();
                    }
                  }}
                  onClick={() => { setSelectedFlyer({ title: "USA-India Legacy 250 Symposium (Boston) Invitation", path: "/assets/events/boston-symposium-flyer.jpg" }); resetZoom(); }}
                  className="relative w-full max-w-sm md:max-w-md mx-auto bg-[#070b16] border border-amber-500/30 rounded-xl overflow-hidden shadow-2xl group cursor-pointer transition-all duration-300 hover:border-amber-400 hover:shadow-[0_0_30px_rgba(245,158,11,0.3)] focus:outline-none focus:ring-2 focus:ring-amber-500"
                >
                  <img
                    src="/assets/events/boston-symposium-flyer.jpg"
                    alt="Official invitation flyer for USA-India Legacy 250 Symposium at The India Center, Consulate General of India Boston on Saturday, November 20, 2026"
                    className="w-full h-auto max-h-[500px] object-contain mx-auto transition-transform duration-500 group-hover:scale-102"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 focus:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-end p-4 text-center">
                    <span className="text-amber-400 text-xs font-inter font-bold tracking-widest flex items-center gap-2 bg-[#0a0f1c]/95 px-4 py-2 border border-amber-500/40 rounded-lg shadow-lg">
                      <ZoomIn className="w-4 h-4" /> VIEW INVITATION
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between w-full max-w-sm md:max-w-md mt-2 px-1 text-[11px] font-lora text-slate-400">
                  <span>Click invitation to expand</span>
                  <button
                    onClick={() => { setSelectedFlyer({ title: "USA-India Legacy 250 Symposium (Boston) Invitation", path: "/assets/events/boston-symposium-flyer.jpg" }); resetZoom(); }}
                    className="text-amber-400 hover:text-amber-300 underline font-inter text-[11px] cursor-pointer"
                  >
                    Interactive Zoom & Download
                  </button>
                </div>
              </div>

              {/* Right Column: Event Info */}
              <div className="lg:col-span-7 space-y-6">
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="inline-block px-3 py-0.5 bg-amber-500/20 text-amber-300 border border-amber-500/40 rounded-full font-inter text-[10px] font-bold uppercase tracking-wider">
                      Upcoming • Saturday, November 20, 2026
                    </span>
                    <span className="inline-block px-3 py-0.5 bg-amber-500/10 text-amber-400 border border-amber-500/30 rounded-full font-inter text-[10px] font-bold uppercase tracking-wider">
                      Official Diplomatic Event
                    </span>
                  </div>
                  <h3 className="font-playfair text-2xl md:text-3xl text-white font-bold leading-tight">
                    USA-INDIA LEGACY 250 SYMPOSIUM
                  </h3>
                  <p className="font-inter text-xs text-amber-400 font-semibold tracking-wider uppercase mt-1">
                    Consulate General of India, Boston
                  </p>
                  <p className="font-playfair italic text-amber-200 text-sm mt-1">
                    Partnership • Prosperity • People
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-white/5 border border-white/10 p-4 rounded-xl font-serif text-xs">
                  <div className="flex items-start gap-2.5">
                    <Calendar className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-inter text-[10px] text-slate-400 uppercase">Date</span>
                      <p className="text-slate-200 font-medium">Saturday, November 20, 2026</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <Clock className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-inter text-[10px] text-slate-400 uppercase">Time</span>
                      <p className="text-slate-200 font-medium">4:00 PM</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2.5 sm:col-span-2">
                    <MapPin className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-inter text-[10px] text-slate-400 uppercase">Location & Venue</span>
                      <p className="text-slate-200 font-medium">
                        <strong>The India Center at Consulate General of India in Boston</strong><br />
                        125 High Street, Boston, MA 02110
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3 font-lora text-xs md:text-sm text-slate-300 leading-relaxed">
                  <p>
                    Hosted in partnership with the Consulate General of India in Boston at The India Center, this special symposium marks 250 years of shared democratic ideals, economic partnership, educational exchange, and enduring cultural bridges between India and the United States.
                  </p>
                  <div className="bg-amber-500/10 border-l-2 border-amber-500 p-3 rounded-r-lg font-inter text-xs text-amber-200 italic">
                    "Partnership • Prosperity • People — Celebrating 250 Years of Bilateral Heritage."
                  </div>
                </div>

                <div className="pt-3 border-t border-white/10 text-[11px] font-inter text-slate-400 space-y-2">
                  <p><strong className="text-slate-300">Co-Hosted by:</strong> Consulate General of India Boston & US-India Legacy 250</p>
                  <div className="pt-2 flex flex-wrap items-center justify-between gap-3">
                    <button
                      onClick={() => { setSelectedFlyer({ title: "USA-India Legacy 250 Symposium (Boston) Invitation", path: "/assets/events/boston-symposium-flyer.jpg" }); resetZoom(); }}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500/15 border border-amber-500/40 hover:bg-amber-500 hover:text-black text-amber-300 font-bold font-inter text-xs uppercase tracking-wider rounded-lg transition-all cursor-pointer"
                    >
                      <ZoomIn className="w-4 h-4" /> View Invitation & QR Code
                    </button>
                    <span className="text-[11px] font-inter text-amber-400/90 font-semibold italic">
                      Scan QR code on invitation for registration & entry
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* UPCOMING EVENT 4: Thoreau-Emerson-Concord-Walden Heritage Trail */}
          <div className="bg-[#0b1329]/70 backdrop-blur-md border border-amber-500/30 rounded-2xl overflow-hidden shadow-2xl p-6 md:p-10 space-y-8 transition-all hover:border-amber-400 hover:shadow-[0_0_30px_rgba(245,158,11,0.15)]">
            <div className="grid lg:grid-cols-12 gap-8 items-start">
              {/* Left Column: Interactive Flyer */}
              <div className="lg:col-span-5 flex flex-col items-center">
                <div
                  role="button"
                  tabIndex={0}
                  aria-label="View and zoom official event poster for Thoreau-Emerson-Concord-Walden Heritage Trail in Concord, Massachusetts"
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setSelectedFlyer({ title: "Thoreau-Emerson-Concord-Walden Heritage Trail Poster", path: "/assets/events/thoreau-emerson-trail-flyer.jpg" });
                      resetZoom();
                    }
                  }}
                  onClick={() => { setSelectedFlyer({ title: "Thoreau-Emerson-Concord-Walden Heritage Trail Poster", path: "/assets/events/thoreau-emerson-trail-flyer.jpg" }); resetZoom(); }}
                  className="relative w-full max-w-sm md:max-w-md mx-auto bg-[#070b16] border border-amber-500/30 rounded-xl overflow-hidden shadow-2xl group cursor-pointer transition-all duration-300 hover:border-amber-400 hover:shadow-[0_0_30px_rgba(245,158,11,0.3)] focus:outline-none focus:ring-2 focus:ring-amber-500"
                >
                  <img
                    src="/assets/events/thoreau-emerson-trail-flyer.jpg"
                    alt="Official event poster for Thoreau-Emerson-Concord-Walden Heritage Trail in Concord, Massachusetts on Saturday, December 5, 2026"
                    className="w-full h-auto max-h-[500px] object-contain mx-auto transition-transform duration-500 group-hover:scale-102"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 focus:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-end p-4 text-center">
                    <span className="text-amber-400 text-xs font-inter font-bold tracking-widest flex items-center gap-2 bg-[#0a0f1c]/95 px-4 py-2 border border-amber-500/40 rounded-lg shadow-lg">
                      <ZoomIn className="w-4 h-4" /> VIEW POSTER
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between w-full max-w-sm md:max-w-md mt-2 px-1 text-[11px] font-lora text-slate-400">
                  <span>Click poster to expand</span>
                  <button
                    onClick={() => { setSelectedFlyer({ title: "Thoreau-Emerson-Concord-Walden Heritage Trail Poster", path: "/assets/events/thoreau-emerson-trail-flyer.jpg" }); resetZoom(); }}
                    className="text-amber-400 hover:text-amber-300 underline font-inter text-[11px] cursor-pointer"
                  >
                    Interactive Zoom & Download
                  </button>
                </div>
              </div>

              {/* Right Column: Event Info */}
              <div className="lg:col-span-7 space-y-6">
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="inline-block px-3 py-0.5 bg-amber-500/20 text-amber-300 border border-amber-500/40 rounded-full font-inter text-[10px] font-bold uppercase tracking-wider">
                      Upcoming • Saturday, December 5, 2026
                    </span>
                    <span className="inline-block px-3 py-0.5 bg-amber-500/10 text-amber-400 border border-amber-500/30 rounded-full font-inter text-[10px] font-bold uppercase tracking-wider">
                      Guided Heritage Trail
                    </span>
                  </div>
                  <h3 className="font-playfair text-2xl md:text-3xl text-white font-bold leading-tight">
                    Thoreau-Emerson-Concord-Walden Heritage Trail
                  </h3>
                  <p className="font-playfair italic text-amber-200 text-sm mt-1">
                    A Journey Through Nature, History, and the Meeting of Two Civilizations
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-white/5 border border-white/10 p-4 rounded-xl font-serif text-xs">
                  <div className="flex items-start gap-2.5">
                    <Calendar className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-inter text-[10px] text-slate-400 uppercase">Date</span>
                      <p className="text-slate-200 font-medium">Saturday, December 5, 2026</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <Clock className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-inter text-[10px] text-slate-400 uppercase">Time</span>
                      <p className="text-slate-200 font-medium">1:30 PM – 5:30 PM</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2.5 sm:col-span-2">
                    <MapPin className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-inter text-[10px] text-slate-400 uppercase">Location</span>
                      <p className="text-slate-200 font-medium">
                        <strong>Concord, Massachusetts</strong> (Walden Pond, Emerson House, Sleepy Hollow Cemetery & Concord Museum)
                      </p>
                    </div>
                  </div>
                </div>

                {/* Itinerary Timeline */}
                <div className="bg-white/5 border border-white/10 p-4 rounded-xl space-y-3">
                  <span className="text-[10px] font-inter uppercase tracking-widest text-amber-400 font-bold block">
                    Heritage Trail Schedule
                  </span>
                  <div className="space-y-2 text-xs font-serif">
                    <div className="flex items-start gap-3">
                      <span className="font-inter text-[11px] text-amber-300 font-bold min-w-[95px] shrink-0">1:30 – 3:00 PM</span>
                      <div>
                        <strong className="text-white block text-xs">WALDEN</strong>
                        <p className="text-slate-300 text-[11px] font-lora">Explore Thoreau's Walden & its enduring message of simplicity, nature, and purpose. <em className="text-amber-200">Talk by Historian Richard Smith.</em></p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="font-inter text-[11px] text-amber-300 font-bold min-w-[95px] shrink-0">3:15 – 4:00 PM</span>
                      <div>
                        <strong className="text-white block text-xs">EMERSON HOUSE</strong>
                        <p className="text-slate-300 text-[11px] font-lora">A guided tour of Ralph Waldo Emerson's home and the ideas that shaped a generation.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="font-inter text-[11px] text-amber-300 font-bold min-w-[95px] shrink-0">4:00 – 4:20 PM</span>
                      <div>
                        <strong className="text-white block text-xs">SLEEPY HOLLOW CEMETERY</strong>
                        <p className="text-slate-300 text-[11px] font-lora">Pay tribute to Emerson, Thoreau, and other distinguished figures of Concord.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="font-inter text-[11px] text-amber-300 font-bold min-w-[95px] shrink-0">4:30 – 5:30 PM</span>
                      <div>
                        <strong className="text-white block text-xs">CONCORD MUSEUM</strong>
                        <p className="text-slate-300 text-[11px] font-lora">Special program with gallery tour exploring Concord's legacy. <em className="text-amber-200">Talk by Curator David Wood.</em></p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-3 text-xs font-lora italic text-slate-300">
                  <div className="p-3 bg-amber-500/5 border border-amber-500/20 rounded-lg">
                    <p className="text-amber-200 text-[11px]">"The pure Walden water is mingled with the sacred water of the Ganges."</p>
                    <span className="text-[10px] text-slate-400 not-italic block mt-1">— Henry David Thoreau</span>
                  </div>
                  <div className="p-3 bg-amber-500/5 border border-amber-500/20 rounded-lg">
                    <p className="text-amber-200 text-[11px]">"I owed a magnificent day to the Bhagavad-gita."</p>
                    <span className="text-[10px] text-slate-400 not-italic block mt-1">— Ralph Waldo Emerson</span>
                  </div>
                </div>

                <div className="pt-3 border-t border-white/10 text-[11px] font-inter text-slate-400 space-y-2">
                  <p><strong className="text-slate-300">Partners:</strong> The Walden Woods Project • Concord Museum • US-India Legacy 250</p>
                  <p><strong className="text-slate-300">Theme:</strong> Different shores. Shared ideals. 250 years of India–America friendship.</p>
                  <div className="pt-2 flex flex-wrap items-center justify-between gap-3">
                    <button
                      onClick={() => { setSelectedFlyer({ title: "Thoreau-Emerson-Concord-Walden Heritage Trail Poster", path: "/assets/events/thoreau-emerson-trail-flyer.jpg" }); resetZoom(); }}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500/15 border border-amber-500/40 hover:bg-amber-500 hover:text-black text-amber-300 font-bold font-inter text-xs uppercase tracking-wider rounded-lg transition-all cursor-pointer"
                    >
                      <ZoomIn className="w-4 h-4" /> View Full Poster
                    </button>
                    <span className="text-[11px] font-inter text-amber-400 font-semibold">
                      People • Ideas • Places • Nature • A Shared Tomorrow
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* PAST EVENTS SECTION */}
        {/* ========================================================= */}
        <div className="max-w-4xl mx-auto mt-16 space-y-12">
          <div className="flex items-center gap-3 mb-6">
            <span className="h-px bg-slate-700 flex-1" />
            <span className="font-inter text-xs text-slate-300 font-bold uppercase tracking-[0.25em] px-4 py-1 bg-white/5 border border-white/10 rounded-full">
              Past Events
            </span>
            <span className="h-px bg-slate-700 flex-1" />
          </div>

          {/* PAST EVENT 1: Chicago Art Institute Symposium */}
          <div className="bg-[#0b1329]/75 backdrop-blur-md border border-amber-500/30 rounded-2xl overflow-hidden shadow-2xl p-6 md:p-10 space-y-8 transition-all hover:border-amber-400">
            <div className="grid lg:grid-cols-12 gap-8 items-start">
              {/* Left Column: Interactive Flyer */}
              <div className="lg:col-span-5 flex flex-col items-center">
                <div
                  role="button"
                  tabIndex={0}
                  aria-label="View official event flyer for US-India Legacy 250 Symposium at Fullerton Hall, Art Institute of Chicago"
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setSelectedFlyer({ title: "Chicago Art Institute Symposium Flyer", path: "/assets/events/chicago-symposium-flyer.jpg" });
                      resetZoom();
                    }
                  }}
                  onClick={() => { setSelectedFlyer({ title: "Chicago Art Institute Symposium Flyer", path: "/assets/events/chicago-symposium-flyer.jpg" }); resetZoom(); }}
                  className="relative w-full max-w-sm md:max-w-md mx-auto bg-[#070b16] border border-amber-500/30 rounded-xl overflow-hidden shadow-2xl group cursor-pointer transition-all duration-300 hover:border-amber-400 hover:shadow-[0_0_30px_rgba(245,158,11,0.3)] focus:outline-none focus:ring-2 focus:ring-amber-500"
                >
                  <img
                    src="/assets/events/chicago-symposium-flyer.jpg"
                    alt="Official event flyer for US-India Legacy 250 Symposium at Fullerton Hall, Art Institute of Chicago on Sunday, September 13, 2026"
                    className="w-full h-auto max-h-[500px] object-contain mx-auto transition-transform duration-500 group-hover:scale-102"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 focus:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-end p-4 text-center">
                    <span className="text-amber-400 text-xs font-inter font-bold tracking-widest flex items-center gap-2 bg-[#0a0f1c]/95 px-4 py-2 border border-amber-500/40 rounded-lg shadow-lg">
                      <ZoomIn className="w-4 h-4" /> VIEW FLYER
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between w-full max-w-sm md:max-w-md mt-2 px-1 text-[11px] font-lora text-slate-400">
                  <span>Click poster to expand</span>
                  <button
                    onClick={() => { setSelectedFlyer({ title: "Chicago Art Institute Symposium Flyer", path: "/assets/events/chicago-symposium-flyer.jpg" }); resetZoom(); }}
                    className="text-amber-400 hover:text-amber-300 underline font-inter text-[11px] cursor-pointer"
                  >
                    Interactive Zoom & Download
                  </button>
                </div>
              </div>

              {/* Right Column: Event Info */}
              <div className="lg:col-span-7 space-y-6">
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="inline-block px-3 py-0.5 bg-amber-500/15 text-amber-400 border border-amber-500/30 rounded-full font-inter text-[10px] font-bold uppercase tracking-wider">
                      Past Event • September 13, 2026
                    </span>
                    <span className="inline-block px-3 py-0.5 bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 rounded-full font-inter text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
                      <Camera className="w-3 h-3" /> Photographs & Video Available
                    </span>
                  </div>
                  <h3 className="font-playfair text-2xl md:text-3xl text-white font-bold leading-tight">
                    US-INDIA LEGACY 250 SYMPOSIUM
                  </h3>
                  <p className="font-inter text-xs text-amber-400 font-semibold tracking-wider uppercase mt-1">
                    Art Institute of Chicago — Fullerton Hall
                  </p>
                  <p className="font-playfair italic text-amber-200 text-sm mt-1">
                    Celebrating 250 Years of Connections, Ideas & Shared Legacy at the Art Institute of Chicago
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-white/5 border border-white/10 p-4 rounded-xl font-serif text-xs">
                  <div className="flex items-start gap-2.5">
                    <Calendar className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-inter text-[10px] text-slate-400 uppercase">Date</span>
                      <p className="text-slate-200 font-medium">Sunday, September 13, 2026</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <Clock className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-inter text-[10px] text-slate-400 uppercase">Time</span>
                      <p className="text-slate-200 font-medium">1:00 PM – 4:00 PM</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2.5 sm:col-span-2">
                    <MapPin className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-inter text-[10px] text-slate-400 uppercase">Location & Venue</span>
                      <p className="text-slate-200 font-medium">
                        <strong>Art Institute of Chicago</strong> — Fullerton Hall<br />
                        111 S. Michigan Avenue, Chicago, IL 60603
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3 font-lora text-xs md:text-sm text-slate-300 leading-relaxed">
                  <p>
                    Held at the historic Fullerton Hall of the Art Institute of Chicago—the very venue where Swami Vivekananda delivered his landmark 1893 address to the Parliament of Religions—this symposium brought together scholars, community leaders, educators, and innovators.
                  </p>
                  <p>
                    The event featured a curated historical exhibition, multimedia documentary presentation, keynote addresses, and an expert panel discussion exploring shared democratic values, history, science, and innovation.
                  </p>
                </div>

                <div className="pt-3 border-t border-white/10 text-[11px] font-inter text-slate-400 space-y-2">
                  <p><strong className="text-slate-300">Organized by:</strong> US-India Legacy 250 | <strong className="text-slate-300">Support:</strong> Consulate General of India Chicago</p>
                  <p><strong className="text-slate-300">Host Partner:</strong> Art Institute of Chicago | <strong className="text-slate-300">Partner:</strong> Indiaspora</p>
                  <div className="pt-2 flex flex-wrap items-center justify-between gap-3">
                    <button
                      onClick={() => navigateTo && navigateTo("messages")}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500/10 border border-amber-500/30 hover:bg-amber-500 hover:text-black text-amber-400 font-bold font-inter text-xs uppercase tracking-wider rounded-lg transition-all cursor-pointer"
                    >
                      <FileText className="w-4 h-4" /> View Ambassador Vinay Kwatra's Message
                    </button>
                    <a
                      href="https://www.youtube.com/@Legacy250-k6q"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-[11px] font-inter text-red-400 hover:text-red-300 font-semibold"
                    >
                      <Youtube className="w-3.5 h-3.5" /> Watch on YouTube <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* ========================================================= */}
            {/* GLIMPSES OF CHICAGO SYMPOSIUM - PHOTO GALLERY & VIDEOS */}
            {/* ========================================================= */}
            <div className="pt-8 border-t border-white/10 space-y-6">
              {/* Gallery Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="px-3 py-0.5 bg-amber-500/20 text-amber-300 border border-amber-500/40 rounded-full font-inter text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5">
                      <Camera className="w-3.5 h-3.5 text-amber-400" /> Event Photography
                    </span>
                    <span className="text-[11px] font-inter text-slate-400 font-semibold">14 Curated Photographs</span>
                  </div>
                  <h4 className="font-playfair text-xl md:text-2xl text-white font-bold">
                    Glimpses of Chicago Legacy 250 Symposium
                  </h4>
                  <p className="font-lora text-slate-300 text-xs md:text-sm">
                    Highlights from the historic proceedings at Fullerton Hall, Art Institute of Chicago.
                  </p>
                </div>

                {/* Video CTA Link */}
                <a
                  href="https://www.youtube.com/@Legacy250-k6q"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-red-600/90 hover:bg-red-600 text-white font-inter text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-md group shrink-0"
                >
                  <Youtube className="w-4 h-4 text-white group-hover:scale-110 transition-transform" />
                  <span>Watch Video Coverage</span>
                  <ExternalLink className="w-3.5 h-3.5 opacity-80" />
                </a>
              </div>

              {/* Active Featured Image Viewer */}
              <div className="relative bg-[#060a14] border border-amber-500/30 rounded-2xl overflow-hidden shadow-2xl group">
                <div
                  role="button"
                  tabIndex={0}
                  aria-label={`Open photo in fullscreen: ${chicagoPhotos[activeChicagoPhoto].title}`}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setSelectedFlyer({
                        title: chicagoPhotos[activeChicagoPhoto].title,
                        path: chicagoPhotos[activeChicagoPhoto].path,
                        caption: chicagoPhotos[activeChicagoPhoto].caption,
                        galleryIndex: activeChicagoPhoto,
                      });
                      resetZoom();
                    }
                  }}
                  onClick={() => {
                    setSelectedFlyer({
                      title: chicagoPhotos[activeChicagoPhoto].title,
                      path: chicagoPhotos[activeChicagoPhoto].path,
                      caption: chicagoPhotos[activeChicagoPhoto].caption,
                      galleryIndex: activeChicagoPhoto,
                    });
                    resetZoom();
                  }}
                  className="relative w-full h-[320px] sm:h-[420px] md:h-[500px] flex items-center justify-center bg-black/60 cursor-pointer overflow-hidden focus:outline-none focus:ring-2 focus:ring-amber-500"
                >
                  <img
                    src={chicagoPhotos[activeChicagoPhoto].path}
                    alt={chicagoPhotos[activeChicagoPhoto].title}
                    className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-102"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="text-amber-400 text-xs font-inter font-bold tracking-widest flex items-center gap-2 bg-[#0a0f1c]/90 px-5 py-2.5 border border-amber-500/40 rounded-xl shadow-2xl">
                      <ZoomIn className="w-4 h-4" /> OPEN IN FULLSCREEN VIEWER
                    </span>
                  </div>

                  {/* Prev / Next navigation overlays */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveChicagoPhoto((prev) => (prev - 1 + chicagoPhotos.length) % chicagoPhotos.length);
                    }}
                    aria-label="Previous photograph"
                    className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/70 hover:bg-amber-500 text-white hover:text-black border border-white/20 hover:border-amber-400 transition-all cursor-pointer shadow-lg z-10"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveChicagoPhoto((prev) => (prev + 1) % chicagoPhotos.length);
                    }}
                    aria-label="Next photograph"
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/70 hover:bg-amber-500 text-white hover:text-black border border-white/20 hover:border-amber-400 transition-all cursor-pointer shadow-lg z-10"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>

                  {/* Floating Counter Badge */}
                  <div className="absolute top-4 right-4 bg-black/80 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 text-[11px] font-inter uppercase tracking-wider text-amber-400 font-semibold">
                    {activeChicagoPhoto + 1} / {chicagoPhotos.length}
                  </div>
                </div>

                {/* Photo Caption & Info Bar */}
                <div className="p-4 bg-[#0a0f1c] border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <h5 className="font-playfair text-base md:text-lg text-white font-semibold">
                      {chicagoPhotos[activeChicagoPhoto].title}
                    </h5>
                    <p className="font-lora text-xs text-slate-300 mt-0.5">
                      {chicagoPhotos[activeChicagoPhoto].caption}
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setSelectedFlyer({
                        title: chicagoPhotos[activeChicagoPhoto].title,
                        path: chicagoPhotos[activeChicagoPhoto].path,
                        caption: chicagoPhotos[activeChicagoPhoto].caption,
                        galleryIndex: activeChicagoPhoto,
                      });
                      resetZoom();
                    }}
                    className="shrink-0 text-amber-400 hover:text-amber-300 font-inter text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 self-start sm:self-auto cursor-pointer"
                  >
                    <ZoomIn className="w-3.5 h-3.5" /> Fullscreen & Zoom
                  </button>
                </div>
              </div>

              {/* 14 Thumbnails Strip */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs text-slate-400 font-inter">
                  <span>Browse all 14 symposium photographs:</span>
                  <span className="text-[11px] text-amber-400/80">Click thumbnail to view</span>
                </div>
                <div className="grid grid-cols-4 sm:grid-cols-7 md:grid-cols-7 gap-2">
                  {chicagoPhotos.map((photo, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveChicagoPhoto(index)}
                      className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all cursor-pointer group bg-black/40 focus:outline-none focus:ring-2 focus:ring-amber-500 ${
                        activeChicagoPhoto === index
                          ? "border-amber-400 ring-2 ring-amber-400/40 scale-102"
                          : "border-white/10 hover:border-amber-500/50 opacity-70 hover:opacity-100"
                      }`}
                      aria-label={`Select photograph ${index + 1}: ${photo.title}`}
                    >
                      <img
                        src={photo.path}
                        alt={photo.title}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                        loading="lazy"
                      />
                      <span className="absolute bottom-1 right-1 bg-black/80 text-[9px] font-inter px-1 rounded text-white font-bold">
                        {index + 1}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Video & Multimedia Highlights Card */}
              <div className="bg-gradient-to-r from-red-950/20 via-[#0b1329] to-amber-950/20 border border-red-500/30 rounded-xl p-5 md:p-6 flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-red-600/20 border border-red-500/40 flex items-center justify-center shrink-0 text-red-400">
                    <Film className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="px-2.5 py-0.5 bg-red-500/20 text-red-300 border border-red-500/40 rounded-full font-inter text-[9px] font-bold uppercase tracking-wider">
                        Video Coverage & Proceedings
                      </span>
                      <span className="text-slate-400 text-[11px] font-inter">Official YouTube Channel</span>
                    </div>
                    <h5 className="font-playfair text-lg text-white font-bold">
                      Watch Chicago Legacy 250 Video Highlights & Presentations
                    </h5>
                    <p className="font-lora text-slate-300 text-xs md:text-sm mt-1 leading-relaxed">
                      Screening of the 15-minute documentary <em>"250+ Years: The India–America Story"</em>, keynote addresses, and expert panel discussions at Fullerton Hall.
                    </p>
                  </div>
                </div>
                <div className="shrink-0 flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
                  <a
                    href="https://www.youtube.com/@Legacy250-k6q"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 bg-red-600 hover:bg-red-500 text-white font-inter text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-lg hover:shadow-red-500/20 cursor-pointer"
                  >
                    <Play className="w-4 h-4 fill-white" /> Watch on YouTube <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                  <button
                    onClick={() => navigateTo && navigateTo("messages")}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 bg-white/5 hover:bg-white/10 border border-white/15 text-slate-200 hover:text-white font-inter text-xs font-bold uppercase tracking-wider rounded-xl transition-all cursor-pointer"
                  >
                    <FileText className="w-4 h-4 text-amber-400" /> Diplomatic Letter
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* PAST EVENT 2: Walk with the Giants */}
          <div className="bg-[#0b1329]/60 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden shadow-xl p-6 md:p-10 space-y-8 transition-all hover:border-amber-500/30">
            <div className="grid md:grid-cols-12 gap-8 items-start">
              {/* Left Column: Interactive Flyer */}
              <div className="md:col-span-5 flex flex-col items-center">
                <div
                  onClick={() => { setSelectedFlyer({ title: "A Walk Among Giants Flyer", path: "/assets/events/walk-among-giants-flyer.jpg" }); resetZoom(); }}
                  className="relative w-full aspect-[1/1.41] bg-black/40 border border-white/15 rounded-xl overflow-hidden shadow-xl group cursor-pointer transition-all duration-300 hover:border-amber-400"
                >
                  <img
                    src="/assets/events/walk-among-giants-flyer.jpg"
                    alt="A Walk Among Giants Event Flyer"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-end p-4 text-center">
                    <span className="text-amber-400 text-xs font-inter font-bold tracking-widest flex items-center gap-2 bg-[#0a0f1c]/90 px-4 py-2 border border-amber-500/40 rounded-lg shadow-lg">
                      <ZoomIn className="w-4 h-4" /> VIEW FLYER
                    </span>
                  </div>
                </div>
                <span className="font-lora text-[11px] text-slate-400 mt-2 text-center">
                  Click to expand event poster
                </span>
              </div>

              {/* Right Column: Event Details */}
              <div className="md:col-span-7 space-y-6">
                <div>
                  <span className="inline-block px-3 py-0.5 bg-slate-800 text-amber-400 border border-amber-500/20 rounded-full font-inter text-[10px] font-bold uppercase tracking-wider mb-2">
                    Past Event • August 30, 2026
                  </span>
                  <h3 className="font-playfair text-2xl md:text-3xl text-white font-bold">
                    A WALK AMONG GIANTS
                  </h3>
                  <p className="font-playfair italic text-amber-200 text-sm mt-1">
                    Celebrating India–U.S. Friendship Through Art, Nature & Conservation
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-white/5 border border-white/10 p-4 rounded-xl font-serif text-xs">
                  <div className="flex items-start gap-2.5">
                    <Calendar className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-inter text-[10px] text-slate-400 uppercase">Date</span>
                      <p className="text-slate-200 font-medium">Sunday, August 30, 2026</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <Clock className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-inter text-[10px] text-slate-400 uppercase">Time</span>
                      <p className="text-slate-200 font-medium">2:00 PM – 3:00 PM</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2.5 sm:col-span-2">
                    <MapPin className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-inter text-[10px] text-slate-400 uppercase">Location</span>
                      <p className="text-slate-200 font-medium">Commonwealth Avenue Mall, Boston, Massachusetts</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3 font-lora text-xs md:text-sm text-slate-300 leading-relaxed">
                  <p>
                    Join US-India Legacy 250, ATREE USA and The Great Elephant Migration for a unique afternoon celebrating the enduring friendship between India and the United States.
                  </p>
                  <p>
                    Stroll beneath Boston's historic tree-lined Commonwealth Avenue as we explore the remarkable life-size elephant sculptures created from <em>Lantana camara</em>—an invasive plant species that has damaged forests across India. Crafted by local artisans in Mysore, these magnificent sculptures transform an ecological challenge into a powerful work of art and conservation.
                  </p>
                  <div className="bg-amber-500/10 border-l-2 border-amber-500 p-3 rounded-r-lg font-inter text-xs text-amber-200 italic">
                    "From an invasive plant to a symbol of sustainability, creativity & global friendship."
                  </div>
                  <p>
                    <strong>Featured Guest Speaker:</strong> <strong>Dr. Kamal Bawa</strong> (Founder of ATREE and Distinguished Professor Emeritus of Biology at UMass Boston) led an insightful conversation about the exhibit alongside <strong>Andy Kalambi</strong>. Originally conceived through the efforts of the Ashoka Trust for Research in Ecology and the Environment (ATREE USA), the installation symbolizes how innovation, sustainability, and international collaboration can turn environmental problems into opportunities for education, creativity, and hope.
                  </p>
                </div>

                {/* Media Coverage Link */}
                <div className="pt-4 border-t border-white/10 space-y-2 font-serif">
                  <span className="font-inter text-[10px] text-amber-400 font-bold uppercase tracking-wider block">
                    Media Report & Coverage
                  </span>
                  <a
                    href="https://indianewengland.com/conservation-biologist-kamal-bawa-to-lead-boston-conservation-walk-on-august-30/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 p-3 bg-white/5 border border-white/10 hover:border-amber-500/40 text-amber-400 hover:text-white rounded-lg text-xs font-inter transition-all group w-full justify-between"
                  >
                    <span><strong>INDIA New England News:</strong> Conservation Biologist Kamal Bawa to Lead Boston Conservation Walk</span>
                    <ExternalLink className="w-4 h-4 shrink-0 group-hover:scale-110 transition-transform" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* PAST EVENT 2: Lexington Event */}
          <div className="bg-[#0b1329]/60 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden shadow-xl p-6 md:p-10 space-y-8 transition-all hover:border-amber-500/30">
            <div>
              <span className="inline-block px-3 py-0.5 bg-slate-800 text-amber-400 border border-amber-500/20 rounded-full font-inter text-[10px] font-bold uppercase tracking-wider mb-2">
                Past Event • July 26, 2026
              </span>
              <h3 className="font-playfair text-2xl md:text-3xl text-white font-bold">
                Lexington: Where America's Fight for Freedom Began—and a Global Story Unfolded
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-white/5 border border-white/10 p-4 rounded-xl font-serif text-xs mt-4">
                <div>
                  <span className="font-inter text-[10px] text-slate-400 uppercase block">Date</span>
                  <span className="text-slate-200">Sunday, July 26, 2026</span>
                </div>
                <div>
                  <span className="font-inter text-[10px] text-slate-400 uppercase block">Time</span>
                  <span className="text-slate-200">3:00 PM – 4:30 PM</span>
                </div>
                <div>
                  <span className="font-inter text-[10px] text-slate-400 uppercase block">Venue</span>
                  <span className="text-slate-200">Temple Emanu-El, Lexington, MA</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col lg:flex-row items-center gap-8 justify-center pt-2">
              <div className="w-full lg:w-1/2 flex justify-center">
                <div className="bg-white rounded-xl overflow-hidden shadow-2xl">
                  <iframe
                    src="https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2FLegacy250%2Fposts%2Fpfbid07L16P15utfBLgw9txHrvdJrjH6rE4gdJdCFnVwxbNAjqay18bAwEQEKNBr2Y5xEEl&show_text=true&width=500"
                    width="500"
                    height="500"
                    style={{ border: "none", overflow: "hidden" }}
                    scrolling="no"
                    frameBorder="0"
                    allowFullScreen={true}
                    allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                    title="Facebook Post Embed"
                  />
                </div>
              </div>

              <div className="w-full lg:w-1/2 space-y-4 font-serif text-left">
                <h4 className="font-playfair text-xl text-amber-400 font-semibold">
                  Official Lexington Coverage & Reflections
                </h4>
                <p className="font-lora text-slate-300 text-sm leading-relaxed">
                  Community members, historians, educators, and leaders gathered to commemorate 250 years of shared democratic ideals, trade, and enduring friendship between India and the United States.
                </p>
                <div className="pt-2 flex flex-col gap-3">
                  <a
                    href="https://www.facebook.com/share/p/188L3sKoY6/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 py-3 px-6 bg-amber-500 hover:bg-amber-400 text-black font-bold font-inter text-xs uppercase tracking-widest rounded-xl transition-all shadow-md"
                  >
                    View Report on Facebook <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Info */}
        <div className="max-w-4xl mx-auto mt-16 p-8 bg-white/5 border border-white/10 rounded-xl text-center">
          <h4 className="font-playfair text-lg text-slate-200 mb-2">More Schedule Announcements Coming Soon</h4>
          <p className="font-lora text-slate-400 text-xs max-w-xl mx-auto mb-6">
            The full year-long calendar of symposia, cultural exhibitions, and strategic summits across major U.S. and Indian cities is being finalized.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={() => navigateTo && navigateTo("partnership")}
              className="px-6 py-3 bg-amber-500 hover:bg-amber-600 text-[#05080f] font-bold text-xs uppercase tracking-widest rounded transition-all font-inter cursor-pointer"
            >
              Become a Partner
            </button>
            <button
              onClick={() => navigateTo && navigateTo("contact")}
              className="px-6 py-3 bg-white/5 border border-white/10 hover:border-amber-500/30 text-slate-300 hover:text-amber-500 text-xs font-inter uppercase tracking-widest rounded transition-colors cursor-pointer"
            >
              Contact Initiative
            </button>
          </div>
        </div>
      </div>

      {/* Lightbox Modal for Event Flyers */}
      <AnimatePresence>
        {selectedFlyer && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/95 backdrop-blur-md select-none"
            onClick={() => setSelectedFlyer(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="relative max-w-4xl w-full bg-[#0a0f1c]/95 border border-amber-500/30 rounded-xl overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh] z-50"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Document viewport with zoom and pan support */}
              <div
                className="flex-1 bg-black flex items-center justify-center relative overflow-hidden h-[50vh] md:h-auto min-h-[400px]"
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
              >
                <img
                  src={selectedFlyer.path}
                  alt={selectedFlyer.title}
                  className="max-w-full max-h-[80vh] object-contain transition-transform duration-100 ease-out select-none pointer-events-none"
                  style={{
                    transform: `scale(${zoomScale}) translate(${panOffset.x / zoomScale}px, ${panOffset.y / zoomScale}px)`,
                    cursor: zoomScale > 1 ? (isDragging ? 'grabbing' : 'grab') : 'default'
                  }}
                />

                {/* Left / Right Gallery Navigation for Photo Albums */}
                {selectedFlyer.galleryIndex !== undefined && (
                  <>
                    <button
                      onClick={handlePrevPhoto}
                      aria-label="Previous photograph"
                      className="absolute left-3 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/80 hover:bg-amber-500 text-white hover:text-black border border-white/20 hover:border-amber-400 transition-all cursor-pointer shadow-2xl z-20"
                    >
                      <ChevronLeft className="w-6 h-6" />
                    </button>
                    <button
                      onClick={handleNextPhoto}
                      aria-label="Next photograph"
                      className="absolute right-3 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/80 hover:bg-amber-500 text-white hover:text-black border border-white/20 hover:border-amber-400 transition-all cursor-pointer shadow-2xl z-20"
                    >
                      <ChevronRight className="w-6 h-6" />
                    </button>
                  </>
                )}

                {/* Floating Zoom status */}
                {zoomScale > 1 && (
                  <div className="absolute bottom-4 left-4 bg-black/75 backdrop-blur-md px-3 py-1.5 rounded border border-white/10 text-[10px] font-inter uppercase tracking-wider text-amber-500">
                    Zoom: {Math.round(zoomScale * 100)}% • Click & Drag to Pan
                  </div>
                )}
              </div>

              {/* Sidebar controls */}
              <div className="w-full md:w-80 bg-[#0f172a] p-6 flex flex-col justify-between border-t md:border-t-0 md:border-l border-white/10 shrink-0">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="font-inter text-[10px] text-amber-500 font-bold uppercase tracking-[0.2em]">
                      {selectedFlyer.galleryIndex !== undefined
                        ? `Photograph ${selectedFlyer.galleryIndex + 1} of ${chicagoPhotos.length}`
                        : "Official Poster / Flyer"}
                    </span>
                    <button
                      onClick={() => setSelectedFlyer(null)}
                      className="text-slate-400 hover:text-white transition-colors cursor-pointer"
                      title="Close"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                  <h3 className="font-playfair text-xl text-white leading-snug">{selectedFlyer.title}</h3>
                  {selectedFlyer.caption && (
                    <p className="font-lora text-xs text-slate-300 leading-relaxed italic">
                      {selectedFlyer.caption}
                    </p>
                  )}
                  <div className="h-px bg-white/10 my-4" />

                  {/* Zoom Controls */}
                  <div className="space-y-2">
                    <span className="font-inter text-[10px] text-slate-400 uppercase tracking-wider block">Viewer Controls</span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={handleZoomIn}
                        disabled={zoomScale >= 3}
                        className="flex-1 py-2 bg-white/5 border border-white/10 hover:border-amber-500/30 text-slate-300 hover:text-amber-500 rounded transition-all flex items-center justify-center gap-1.5 font-inter text-[10px] uppercase tracking-wider disabled:opacity-30 disabled:hover:text-slate-300 cursor-pointer"
                        title="Zoom In"
                      >
                        <ZoomIn className="w-3.5 h-3.5" /> In
                      </button>
                      <button
                        onClick={handleZoomOut}
                        disabled={zoomScale <= 1}
                        className="flex-1 py-2 bg-white/5 border border-white/10 hover:border-amber-500/30 text-slate-300 hover:text-amber-500 rounded transition-all flex items-center justify-center gap-1.5 font-inter text-[10px] uppercase tracking-wider disabled:opacity-30 disabled:hover:text-slate-300 cursor-pointer"
                        title="Zoom Out"
                      >
                        <ZoomOut className="w-3.5 h-3.5" /> Out
                      </button>
                      <button
                        onClick={resetZoom}
                        disabled={zoomScale === 1 && panOffset.x === 0 && panOffset.y === 0}
                        className="p-2 bg-white/5 border border-white/10 hover:border-amber-500/30 text-slate-300 hover:text-amber-500 rounded transition-all flex items-center justify-center disabled:opacity-30 disabled:hover:text-slate-300 cursor-pointer"
                        title="Reset View"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-white/5 flex flex-col gap-3">
                  <a
                    href={selectedFlyer.path}
                    download={selectedFlyer.title.replace(/\s+/g, '_') + '.jpg'}
                    className="w-full py-3 px-4 bg-amber-500 hover:bg-amber-600 text-[#05080f] text-center font-bold text-xs uppercase tracking-widest rounded transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    {selectedFlyer.galleryIndex !== undefined ? "Download High-Res Photo" : "Download Flyer"} <Download className="w-4 h-4" />
                  </a>
                  <button
                    onClick={() => setSelectedFlyer(null)}
                    className="w-full py-2.5 border border-white/10 hover:border-white/20 text-slate-300 hover:text-white text-xs font-inter uppercase tracking-widest rounded transition-colors cursor-pointer"
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const MessagesView = () => {
  const [selectedDoc, setSelectedDoc] = useState(null);
  const [activeTab, setActiveTab] = useState("kwatra");
  const [zoomScale, setZoomScale] = useState(1);
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const resetZoom = () => {
    setZoomScale(1);
    setPanOffset({ x: 0, y: 0 });
  };

  const handleZoomIn = (e) => {
    if (e) e.stopPropagation();
    setZoomScale(prev => Math.min(prev + 0.25, 3));
  };

  const handleZoomOut = (e) => {
    if (e) e.stopPropagation();
    setZoomScale(prev => {
      const nextScale = Math.max(prev - 0.25, 1);
      if (nextScale === 1) {
        setPanOffset({ x: 0, y: 0 });
      }
      return nextScale;
    });
  };

  const handleMouseDown = (e) => {
    if (zoomScale <= 1) return;
    setIsDragging(true);
    setDragStart({ x: e.clientX - panOffset.x, y: e.clientY - panOffset.y });
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    setPanOffset({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <div className="min-h-screen bg-[#0a0f1c] pt-24 md:pt-40 pb-20 relative animate-fade-in text-white">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-amber-900/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="container mx-auto px-6 relative z-10">
        <SectionHeading light title="Messages" sub="Official Diplomatic & Leadership Messages" />

        {/* Top Announcement Banner for Chicago Event & Reports */}
        <div className="max-w-6xl mx-auto mb-10 p-6 bg-[#0b1329]/90 border border-amber-500/30 rounded-2xl shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-3 py-0.5 bg-amber-500/10 text-amber-400 border border-amber-500/30 rounded-full font-inter text-[10px] font-bold uppercase tracking-wider">
                Chicago Symposium
              </span>
              <span className="px-3 py-0.5 bg-slate-800 text-amber-300 border border-amber-500/20 rounded-full font-inter text-[10px] font-bold uppercase tracking-wider italic font-semibold">
                Reports coming soon
              </span>
            </div>
            <h4 className="font-playfair text-xl text-white font-bold">
              US-India Legacy 250 Symposium — Art Institute of Chicago
            </h4>
            <p className="font-lora text-slate-300 text-xs md:text-sm">
              Read Ambassador Vinay Kwatra's official letter of support below. Detailed symposium reports and proceedings coming soon.
            </p>
          </div>
          <div className="shrink-0">
            <span className="px-4 py-2 bg-amber-500/10 border border-amber-500/30 text-amber-300 rounded-lg text-xs font-inter uppercase tracking-wider font-semibold block text-center">
              Reports coming soon
            </span>
          </div>
        </div>

        {/* Tabs for Selecting Ambassador Messages */}
        <div className="max-w-6xl mx-auto flex justify-center mb-10">
          <div className="inline-flex p-1.5 bg-white/5 border border-white/10 rounded-xl gap-2 font-inter text-xs">
            <button
              onClick={() => setActiveTab("kwatra")}
              className={`px-6 py-3 rounded-lg font-bold transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === "kwatra"
                  ? "bg-amber-500 text-black shadow-lg shadow-amber-500/20"
                  : "text-slate-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <FileText className="w-4 h-4" /> Ambassador Vinay Kwatra (Chicago Letter)
            </button>
            <button
              onClick={() => setActiveTab("shringla")}
              className={`px-6 py-3 rounded-lg font-bold transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === "shringla"
                  ? "bg-amber-500 text-black shadow-lg shadow-amber-500/20"
                  : "text-slate-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <FileText className="w-4 h-4" /> Dr. Harsh Vardhan Shringla
            </button>
          </div>
        </div>

        {/* Active Message Content */}
        {activeTab === "kwatra" && (
          <div className="max-w-6xl mx-auto grid md:grid-cols-12 gap-12 animate-fade-in">
            {/* Info column */}
            <div className="md:col-span-5 space-y-6 bg-white/5 backdrop-blur-sm border border-amber-500/20 p-8 rounded-2xl flex flex-col justify-between shadow-xl">
              <div className="space-y-4">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-inter text-xs text-amber-500 font-bold uppercase tracking-widest block">
                    Message from Ambassador of India
                  </span>
                  <span className="px-2 py-0.5 bg-amber-500/10 text-amber-300 border border-amber-500/30 rounded font-inter text-[9px] uppercase tracking-wider font-semibold">
                    September 11, 2026
                  </span>
                </div>
                <h3 className="text-3xl font-playfair text-white font-bold">
                  Vinay Kwatra
                </h3>
                <p className="font-inter text-xs text-slate-400 uppercase tracking-wider leading-relaxed">
                  Ambassador of India to the United States<br />
                  Washington, D.C.
                </p>
                <div className="h-px bg-white/10 my-4" />
                <p className="font-playfair italic text-amber-200 text-sm leading-relaxed border-l-2 border-amber-500 pl-4 py-1">
                  "I extend my warm greetings and heartfelt congratulations on the organization of the US–India Legacy 250 Symposium at the historic Fullerton Hall of the Art Institute of Chicago..."
                </p>
                <div className="space-y-2 font-lora text-slate-300 text-xs leading-relaxed pt-2">
                  <p>
                    <strong>Key Highlights:</strong>
                  </p>
                  <ul className="list-disc list-inside space-y-1 text-slate-400">
                    <li>Honors historic Fullerton Hall, venue of Swami Vivekananda's 1893 address.</li>
                    <li>Commends Art Institute of Chicago, Indiaspora & Vivekananda Vedanta Society.</li>
                    <li>Appreciates Legacy 250's role in honoring shared democratic heritage.</li>
                  </ul>
                </div>
                <div className="pt-2">
                  <span className="text-[11px] font-inter text-amber-400 font-semibold italic">
                    Reports coming soon — Event recordings & proceedings en route
                  </span>
                </div>
              </div>

              <div className="pt-6 space-y-3">
                <a
                  href="/assets/vinay_kwatra_letter.pdf"
                  download="Ambassador_Vinay_Kwatra_Message.pdf"
                  className="w-full py-3.5 px-4 bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs uppercase tracking-widest rounded-xl transition-all flex items-center justify-center gap-2 group cursor-pointer shadow-lg shadow-amber-500/20"
                >
                  <Download className="w-4 h-4 group-hover:scale-110 transition-transform" /> Download Ambassador's Letter (PDF)
                </a>
                <button
                  onClick={() => { setSelectedDoc({ title: "Ambassador Vinay Kwatra Letter", path: "/assets/vinay_kwatra_letter.webp", pdfPath: "/assets/vinay_kwatra_letter.pdf" }); resetZoom(); }}
                  className="w-full py-3.5 px-4 bg-white/5 border border-white/10 hover:border-amber-500/30 text-slate-300 hover:text-amber-400 text-xs font-inter uppercase tracking-widest rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <ZoomIn className="w-4 h-4" /> View Fullscreen Letter
                </button>
              </div>
            </div>

            {/* Viewer column */}
            <div className="md:col-span-7 flex flex-col items-center justify-center">
              <div
                onClick={() => { setSelectedDoc({ title: "Ambassador Vinay Kwatra Letter", path: "/assets/vinay_kwatra_letter.webp", pdfPath: "/assets/vinay_kwatra_letter.pdf" }); resetZoom(); }}
                className="relative w-full max-w-lg aspect-[1/1.4] bg-white/[0.02] border border-amber-500/30 hover:border-amber-400 rounded-2xl shadow-2xl p-4 overflow-hidden group cursor-zoom-in transition-all duration-300"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-20">
                  <span className="text-amber-400 text-xs font-inter font-bold tracking-widest flex items-center gap-2 bg-[#0a0f1c]/90 px-4 py-2 border border-amber-500/40 rounded-lg shadow-xl">
                    <ZoomIn className="w-4 h-4" /> INTERACTIVE VIEW
                  </span>
                </div>
                <img
                  src="/assets/vinay_kwatra_letter.webp"
                  alt="Ambassador Vinay Kwatra Letter"
                  className="w-full h-full object-contain rounded-xl opacity-90 group-hover:opacity-100 transition-opacity duration-350"
                />
              </div>
              <p className="font-lora text-slate-400 text-xs mt-3 text-center">
                Click on the letter document above to inspect details and zoom fullscreen.
              </p>
            </div>
          </div>
        )}

        {activeTab === "shringla" && (
          <div className="max-w-6xl mx-auto grid md:grid-cols-12 gap-12 animate-fade-in">
            {/* Info column */}
            <div className="md:col-span-5 space-y-6 bg-white/5 backdrop-blur-sm border border-white/10 p-8 rounded-2xl flex flex-col justify-between shadow-xl">
              <div className="space-y-4">
                <span className="font-inter text-xs text-amber-500 font-bold uppercase tracking-widest block">
                  Message of Support
                </span>
                <h3 className="text-3xl font-playfair text-white font-bold">
                  Dr. Harsh Vardhan Shringla
                </h3>
                <p className="font-inter text-xs text-slate-400 uppercase tracking-wider leading-relaxed">
                  Member of Indian Parliament, Upper House<br />
                  Former Foreign Secretary of India<br />
                  Former Ambassador of India to the United States
                </p>
                <div className="h-px bg-white/10 my-4" />
                <p className="font-lora text-slate-300 text-sm leading-relaxed">
                  Official statement from Ambassador Harsh Vardhan Shringla, endorsing the US-India Legacy 250 initiative celebrating more than 250 years of shared relations and future prospects.
                </p>
              </div>

              <div className="pt-6 space-y-3">
                <a
                  href="/assets/harsh_vardhan_shringla_message.pdf"
                  download="Ambassador_Harsh_Vardhan_Shringla_Statement.pdf"
                  className="w-full py-3.5 px-4 bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs uppercase tracking-widest rounded-xl transition-all flex items-center justify-center gap-2 group cursor-pointer shadow-lg shadow-amber-500/20"
                >
                  <Download className="w-4 h-4 group-hover:scale-110 transition-transform" /> Download Statement (PDF)
                </a>
                <button
                  onClick={() => { setSelectedDoc({ title: "Ambassador Harsh Vardhan Shringla Statement", path: "/assets/harsh_vardhan_shringla_statement.webp", pdfPath: "/assets/harsh_vardhan_shringla_message.pdf" }); resetZoom(); }}
                  className="w-full py-3.5 px-4 bg-white/5 border border-white/10 hover:border-amber-500/30 text-slate-300 hover:text-amber-400 text-xs font-inter uppercase tracking-widest rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <ZoomIn className="w-4 h-4" /> View Fullscreen Statement
                </button>
              </div>
            </div>

            {/* Viewer column */}
            <div className="md:col-span-7 flex flex-col items-center justify-center">
              <div
                onClick={() => { setSelectedDoc({ title: "Ambassador Harsh Vardhan Shringla Statement", path: "/assets/harsh_vardhan_shringla_statement.webp", pdfPath: "/assets/harsh_vardhan_shringla_message.pdf" }); resetZoom(); }}
                className="relative w-full max-w-lg aspect-[1/1.4] bg-white/[0.02] border border-white/10 hover:border-amber-500/30 rounded-2xl shadow-2xl p-4 overflow-hidden group cursor-zoom-in transition-all duration-300"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-20">
                  <span className="text-amber-500 text-xs font-inter font-bold tracking-widest flex items-center gap-2 bg-[#0a0f1c]/90 px-4 py-2 border border-amber-500/30 rounded-lg shadow-xl">
                    <ZoomIn className="w-4 h-4" /> INTERACTIVE VIEW
                  </span>
                </div>
                <img
                  src="/assets/harsh_vardhan_shringla_statement.webp"
                  alt="Ambassador Harsh Vardhan Shringla Statement"
                  className="w-full h-full object-contain rounded-xl opacity-85 group-hover:opacity-100 transition-opacity duration-350"
                />
              </div>
              <p className="font-lora text-slate-500 text-xs mt-3 text-center">
                Click on the statement document above to inspect details and zoom.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedDoc && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/95 backdrop-blur-md select-none"
            onClick={() => setSelectedDoc(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="relative max-w-4xl w-full bg-[#0a0f1c]/95 border border-amber-500/30 rounded-xl overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh] z-50"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Document viewport with zoom and pan support */}
              <div
                className="flex-1 bg-black flex items-center justify-center relative overflow-hidden h-[50vh] md:h-auto min-h-[400px]"
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
              >
                <img
                  src={selectedDoc.path}
                  alt={selectedDoc.title}
                  className="max-w-full max-h-[80vh] object-contain transition-transform duration-100 ease-out select-none pointer-events-none"
                  style={{
                    transform: `scale(${zoomScale}) translate(${panOffset.x / zoomScale}px, ${panOffset.y / zoomScale}px)`,
                    cursor: zoomScale > 1 ? (isDragging ? 'grabbing' : 'grab') : 'default'
                  }}
                />

                {/* Floating Zoom status */}
                {zoomScale > 1 && (
                  <div className="absolute bottom-4 left-4 bg-black/75 backdrop-blur-md px-3 py-1.5 rounded border border-white/10 text-[10px] font-inter uppercase tracking-wider text-amber-500">
                    Zoom: {Math.round(zoomScale * 100)}% • Click & Drag to Pan
                  </div>
                )}
              </div>

              {/* Sidebar controls */}
              <div className="w-full md:w-80 bg-[#0f172a] p-6 flex flex-col justify-between border-t md:border-t-0 md:border-l border-white/10 shrink-0">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="font-inter text-[10px] text-amber-500 font-bold uppercase tracking-[0.2em]">Official Message Viewer</span>
                    <button
                      onClick={() => setSelectedDoc(null)}
                      className="text-slate-400 hover:text-white transition-colors"
                      title="Close"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                  <h3 className="font-playfair text-xl text-white leading-snug">{selectedDoc.title}</h3>
                  <div className="h-px bg-white/10 my-4" />

                  {/* Zoom Controls */}
                  <div className="space-y-2">
                    <span className="font-inter text-[10px] text-slate-400 uppercase tracking-wider block">Viewer Controls</span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={handleZoomIn}
                        disabled={zoomScale >= 3}
                        className="flex-1 py-2 bg-white/5 border border-white/10 hover:border-amber-500/30 text-slate-300 hover:text-amber-500 rounded transition-all flex items-center justify-center gap-1.5 font-inter text-[10px] uppercase tracking-wider disabled:opacity-30 disabled:hover:text-slate-300 cursor-pointer"
                        title="Zoom In"
                      >
                        <ZoomIn className="w-3.5 h-3.5" /> In
                      </button>
                      <button
                        onClick={handleZoomOut}
                        disabled={zoomScale <= 1}
                        className="flex-1 py-2 bg-white/5 border border-white/10 hover:border-amber-500/30 text-slate-300 hover:text-amber-500 rounded transition-all flex items-center justify-center gap-1.5 font-inter text-[10px] uppercase tracking-wider disabled:opacity-30 disabled:hover:text-slate-300 cursor-pointer"
                        title="Zoom Out"
                      >
                        <ZoomOut className="w-3.5 h-3.5" /> Out
                      </button>
                      <button
                        onClick={resetZoom}
                        disabled={zoomScale === 1 && panOffset.x === 0 && panOffset.y === 0}
                        className="p-2 bg-white/5 border border-white/10 hover:border-amber-500/30 text-slate-300 hover:text-amber-500 rounded transition-all flex items-center justify-center disabled:opacity-30 disabled:hover:text-slate-300 cursor-pointer"
                        title="Reset View"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <p className="font-lora text-slate-400 text-xs leading-relaxed pt-2">
                    Adjust the zoom using the controls above, or drag the document to examine specific sections of the statement.
                  </p>
                </div>

                <div className="mt-8 pt-6 border-t border-white/5 flex flex-col gap-3">
                  {selectedDoc.pdfPath && (
                    <a
                      href={selectedDoc.pdfPath}
                      download={selectedDoc.title.replace(/\s+/g, '_') + '.pdf'}
                      className="w-full py-3 px-4 bg-amber-500 hover:bg-amber-600 text-[#05080f] text-center font-bold text-xs uppercase tracking-widest rounded transition-all flex items-center justify-center gap-2"
                    >
                      Download PDF <Download className="w-4 h-4" />
                    </a>
                  )}
                  <button
                    onClick={() => setSelectedDoc(null)}
                    className="w-full py-2.5 border border-white/10 hover:border-white/20 text-slate-300 hover:text-white text-xs font-inter uppercase tracking-widest rounded transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const FAQView = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedIndex, setExpandedIndex] = useState(null);

  const faqs = [
    {
      q: "What is Legacy 250?",
      a: "Legacy 250 is a year-long educational, historical, and cultural initiative commemorating the 250th anniversary of the United States while celebrating more than 250 years of India–U.S. connections. It highlights our shared history, present-day partnership, and future opportunities through exhibitions, academic programs, documentaries, public events, and community engagement. This is an entirely volunteer-driven initiative, led by individuals who are generously contributing their time, expertise, and resources to make Legacy 250 a success."
    },
    {
      q: "Why was Legacy 250 created?",
      a: "Many remarkable stories connecting India and America remain little known. Legacy 250 aims to uncover, preserve, and share these stories while inspiring greater collaboration between the world's two largest democracies and ensuring the continuity of people-to-people relationships for better growth and success, which can become the foundation of people relationship for the world."
    },
    {
      q: "Is this a political initiative?",
      a: "No. Legacy 250 is a nonpartisan educational, historical, and cultural initiative. It welcomes participation from people of all backgrounds, communities, and viewpoints."
    },
    {
      q: "What topics does Legacy 250 cover?",
      a: "The initiative explores: Shared history, Trade and commerce, Democracy and freedom, Science and technology, Education and universities, Arts and culture, Spiritual and philosophical exchanges, Innovation and entrepreneurship, Indian American contributions, The future of India–U.S. relations, and US Technological contribution."
    },
    {
      q: "Who can participate?",
      a: "Everyone is welcome, including universities, museums, libraries, schools, historical societies, community organizations, students, researchers, businesses, volunteers, sponsors, and individual supporters."
    },
    {
      q: "What activities are planned?",
      a: "Legacy 250 includes traveling exhibitions, distinguished lectures, museum collaborations, university seminars and conferences, documentary films, a Student Ambassador Program, public seminars, community celebrations, and digital educational resources."
    },
    {
      q: "Where will programs be held?",
      a: "Programs are planned across the United States and India through partnerships with universities, museums, libraries, cultural institutions, corporations, and community organizations."
    },
    {
      q: "How can my organization become a partner?",
      a: "Organizations can host exhibitions, lectures, panel discussions, educational programs, conferences, student activities, or community events. We also welcome collaborative research, publications, and digital initiatives. Please visit our website and fill out the partnership form on the Contact/Partnership page."
    },
    {
      q: "How can I volunteer?",
      a: "Volunteers may assist with research, event planning, social media, photography/videography, public relations, university outreach, community engagement, fundraising, and documentation. You can apply via the partnership and ambassador forms on our site."
    },
    {
      q: "Can students participate?",
      a: "Absolutely. Students are encouraged to become Legacy 250 Student Ambassadors, researchers, volunteers, interns, and event organizers. You can sign up using the Student Ambassador Form available on our platform."
    },
    {
      q: "Is Legacy 250 only for Indian Americans?",
      a: "No. Legacy 250 celebrates a shared journey between India and America and welcomes participation from everyone interested in history, education, culture, technological innovation, and international friendship."
    },
    {
      q: "How can businesses support Legacy 250?",
      a: "Businesses can become sponsors, host events, support educational programming, provide volunteers, and help expand public awareness through corporate partnerships."
    },
    {
      q: "Which organization is behind Legacy 250?",
      a: "Legacy 250 is an initiative of the Mass India Partnership (www.massindiapartnership.org), a nonprofit organization based in Boston, Massachusetts. It is a collaborative educational and cultural initiative supported by universities, museums, libraries, community organizations, businesses, and institutions across the United States and India. Our vision is to build a broad national coalition, with at least 50 partner organizations participating to commemorate this historic milestone."
    },
    {
      q: "How is Legacy 250 funded?",
      a: "The initiative is supported through institutional partnerships, sponsorships, grants, donations, and community support."
    },
    {
      q: "What makes Legacy 250 unique?",
      a: "Rather than focusing on a single event or anniversary, Legacy 250 tells a comprehensive story spanning more than two and a half centuries—from early maritime trade and democratic ideals to today's collaboration in science, technology, education, entrepreneurship, and global leadership. It is a year-long celebration between July 2026 and July 2027."
    },
    {
      q: "How can I stay involved?",
      a: "Visit www.IndiaUSLegacy250.com to become a partner, volunteer, sponsor the initiative, register for events, join the mailing list, follow upcoming programs, and access educational resources."
    },
    {
      q: "What is the vision beyond 2026?",
      a: "Legacy 250 is intended to become a lasting educational movement. Our vision is to establish permanent partnerships among universities, museums, libraries, and communities that continue strengthening India–U.S. understanding and collaboration for decades to come."
    }
  ];

  const filteredFaqs = faqs.filter(faq =>
    faq.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.a.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleAccordion = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-[#0a0f1c] pt-24 md:pt-40 pb-20 relative animate-fade-in text-white">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-900/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="container mx-auto px-6 relative z-10">
        <SectionHeading light title="FAQ" sub="Frequently Asked Questions" />
        
        <div className="max-w-4xl mx-auto bg-white/5 backdrop-blur-sm border border-white/10 p-6 md:p-12 rounded-sm shadow-2xl space-y-8">
          
          {/* Header & Download */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6 border-b border-white/10">
            <div>
              <h4 className="text-xl font-playfair text-white">Frequently Asked Questions</h4>
              <p className="font-lora text-slate-400 text-xs mt-1">Celebrating our shared past, strengthening our present, building our future.</p>
            </div>
            <a 
              href="/assets/faq.pdf" 
              download="Legacy250_FAQ.pdf" 
              className="flex items-center gap-2 py-2.5 px-4 bg-amber-500/10 hover:bg-amber-500 hover:text-[#05080f] text-amber-500 font-inter text-xs uppercase tracking-widest rounded border border-amber-500/30 transition-all cursor-pointer whitespace-nowrap"
            >
              <Download className="w-4 h-4" /> Download FAQ (PDF)
            </a>
          </div>

          {/* Search bar */}
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Search questions or answers..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setExpandedIndex(null); // Close all accordions on new search
              }}
              className="w-full bg-white/5 border border-white/10 rounded-lg py-3 pl-12 pr-6 text-white placeholder-slate-500 focus:outline-none focus:border-amber-500/50 transition-colors font-inter text-sm"
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white text-xs font-inter uppercase tracking-wider"
              >
                Clear
              </button>
            )}
          </div>

          {/* Accordion List */}
          <div className="space-y-4">
            {filteredFaqs.length > 0 ? (
              filteredFaqs.map((faq, index) => {
                const isOpen = expandedIndex === index;
                return (
                  <div 
                    key={index} 
                    className="border border-white/15 rounded bg-white/[0.02] overflow-hidden transition-all duration-300 hover:border-amber-500/20"
                  >
                    <button
                      onClick={() => toggleAccordion(index)}
                      className="w-full flex justify-between items-center p-5 text-left text-white hover:text-amber-400 transition-colors focus:outline-none"
                    >
                      <span className="font-playfair text-base md:text-lg font-medium pr-4">{faq.q}</span>
                      <ChevronDown className={`w-5 h-5 text-amber-500/80 transition-transform duration-300 shrink-0 ${isOpen ? "rotate-180" : ""}`} />
                    </button>
                    
                    <div 
                      className={`transition-all duration-300 ease-in-out ${isOpen ? "max-h-[500px] border-t border-white/5" : "max-h-0"}`}
                      style={{ overflow: 'hidden' }}
                    >
                      <p className="p-5 font-lora text-slate-300 text-sm md:text-base leading-relaxed">
                        {faq.a}
                      </p>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="text-center py-10">
                <p className="font-lora text-slate-400">No FAQ matches found for "{searchQuery}"</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const GallerySlider = ({ images, onImageSelect }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    if (!isPlaying) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [isPlaying, images.length]);

  const handlePrev = (e) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleNext = (e) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  return (
    <div className="relative w-full h-[55vh] min-h-[350px] max-h-[550px] bg-black/40 rounded-xl overflow-hidden border border-white/10 group mb-16 shadow-2xl">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7 }}
          className="absolute inset-0 w-full h-full"
        >
          <img
            src={images[currentIndex].path}
            alt={images[currentIndex].title}
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f1c] via-black/40 to-transparent" />
          <div className="absolute bottom-12 left-8 right-8 md:left-12 md:right-12 z-10 text-left max-w-2xl">
            <span className="font-inter text-[10px] text-amber-500 font-bold uppercase tracking-[0.25em] mb-2 block">Featured Exhibition Panel</span>
            <h3 className="font-playfair text-3xl md:text-5xl text-white mb-6 leading-tight drop-shadow-md">{images[currentIndex].title}</h3>
            <button
              onClick={() => onImageSelect(images[currentIndex])}
              className="py-3 px-6 bg-amber-500 hover:bg-amber-600 text-[#05080f] font-bold text-xs uppercase tracking-widest rounded transition-all transform hover:scale-[1.02] flex items-center gap-2"
            >
              Examine Detail <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Prev / Next controls */}
      <button
        onClick={handlePrev}
        className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/60 border border-white/10 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 hover:bg-amber-500 hover:text-black hover:border-amber-500 transition-all z-20 cursor-pointer shadow-lg"
        title="Previous Panel"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        onClick={handleNext}
        className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/60 border border-white/10 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 hover:bg-amber-500 hover:text-black hover:border-amber-500 transition-all z-20 cursor-pointer shadow-lg"
        title="Next Panel"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Indicators and Play/Pause */}
      <div className="absolute bottom-6 right-8 md:right-12 z-20 flex items-center gap-4 bg-black/40 backdrop-blur-md px-4 py-2 rounded-full border border-white/5">
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="text-[10px] font-inter uppercase tracking-widest text-slate-400 hover:text-white transition-colors"
        >
          {isPlaying ? "Pause" : "Play"}
        </button>
        <div className="flex gap-2">
          {images.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`h-1.5 rounded-full transition-all duration-300 ${idx === currentIndex ? 'w-6 bg-amber-500' : 'w-2 bg-white/30 hover:bg-white/50'}`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

const ImagesView = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [zoomScale, setZoomScale] = useState(1);
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const images = [
    {
      title: "America in the Indian Imagination",
      filename: "america_in_the_indian_imagination.webp",
      path: "/assets/gallery/america_in_the_indian_imagination.webp"
    },
    {
      title: "American Contributions to India",
      filename: "american_congtributions_to_india.webp",
      path: "/assets/gallery/american_congtributions_to_india.webp"
    },
    {
      title: "American Leadership and US India Relations",
      filename: "american_leadership_and_us_india_relations.webp",
      path: "/assets/gallery/american_leadership_and_us_india_relations.webp"
    },
    {
      title: "Bose to Bose",
      filename: "bose_to_bose.webp",
      path: "/assets/gallery/bose_to_bose.webp"
    },
    {
      title: "Boston Brahmins",
      filename: "boston_brahmins.webp",
      path: "/assets/gallery/boston_brahmins.webp"
    },
    {
      title: "Boston Tea Party",
      filename: "boston_tea_party.webp",
      path: "/assets/gallery/boston_tea_party.webp"
    },
    {
      title: "Democracies",
      filename: "democracies.webp",
      path: "/assets/gallery/democracies.webp"
    },
    {
      title: "Economy Education of Indian Americans",
      filename: "economy_education_of_indian_americans.webp",
      path: "/assets/gallery/economy_education_of_indian_americans.webp"
    },
    {
      title: "Fourth of July",
      filename: "fourth_july_.webp",
      path: "/assets/gallery/fourth_july_.webp"
    },
    {
      title: "India and the American Imagination",
      filename: "india_and_the_american_imagination.webp",
      path: "/assets/gallery/india_and_the_american_imagination.webp"
    },
    {
      title: "Indian Scientific Genius 2",
      filename: "indian_scientific_genius_2.webp",
      path: "/assets/gallery/indian_scientific_genius_2.webp"
    },
    {
      title: "Indian Scientific Genius",
      filename: "indian_scientific_genius.webp",
      path: "/assets/gallery/indian_scientific_genius.webp"
    },
    {
      title: "Indian Ideas Entering America",
      filename: "indian_ideas_entering_america.webp",
      path: "/assets/gallery/indian_ideas_entering_america.webp"
    },
    {
      title: "Indian Philosophy in Cinema",
      filename: "indian_philosophy_in_cinema.webp",
      path: "/assets/gallery/indian_philosophy_in_cinema.webp"
    },
    {
      title: "Indian Thoughts and American Minds",
      filename: "indian_thoughts_and_american_minds.webp",
      path: "/assets/gallery/indian_thoughts_and_american_minds.webp"
    },
    {
      title: "Jeans to Genes",
      filename: "jeans_to_genes.webp",
      path: "/assets/gallery/jeans_to_genes.webp"
    },
    {
      title: "Lure of Civilization",
      filename: "lure_of_civilization.webp",
      path: "/assets/gallery/lure_of_civilization.webp"
    },
    {
      title: "Madras to Yale",
      filename: "madras_to_yale.webp",
      path: "/assets/gallery/madras_to_yale.webp"
    },
    {
      title: "Political Thoughts",
      filename: "political_thoughts_.webp",
      path: "/assets/gallery/political_thoughts_.webp"
    },
    {
      title: "Saund to State House",
      filename: "saund_to_state_house.webp",
      path: "/assets/gallery/saund_to_state_house.webp"
    },
    {
      title: "Spiritual Turn Eastward",
      filename: "spiritual_turn_eastward.webp",
      path: "/assets/gallery/spiritual_turn_eastward.webp"
    },
    {
      title: "Tariff",
      filename: "tariff.webp",
      path: "/assets/gallery/tariff.webp"
    },
    {
      title: "Tea Empire and the Irony of Freedom",
      filename: "tea_empire_and_the_irony_of_freedom.webp",
      path: "/assets/gallery/tea_empire_and_the_irony_of_freedom.webp"
    },
    {
      title: "Trade and Benefits",
      filename: "trade_and_benefits.webp",
      path: "/assets/gallery/trade_and_benefits.webp"
    },
    {
      title: "US India Trade",
      filename: "us_india_trade.webp",
      path: "/assets/gallery/us_india_trade.webp"
    },
    {
      title: "Vivekananda 4th",
      filename: "vivekananda_4th.webp",
      path: "/assets/gallery/vivekananda_4th.webp"
    },
    {
      title: "When America Met India",
      filename: "when_america_met_india.webp",
      path: "/assets/gallery/when_america_met_india.webp"
    },
    {
      title: "When Ancient India Met Modern Science",
      filename: "when_ancient_india_met_modern_science.webp",
      path: "/assets/gallery/when_ancient_india_met_modern_science.webp"
    },
    {
      title: "When Vedanta Met Power",
      filename: "when_vedanta_met_power.webp",
      path: "/assets/gallery/when_vedanta_met_power.webp"
    },
    {
      title: "Yoga's Journey",
      filename: "yoga_s_journey.webp",
      path: "/assets/gallery/yoga_s_journey.webp"
    },
    {
      title: "Yorktown",
      filename: "yorktown.webp",
      path: "/assets/gallery/yorktown.webp"
    }
  ];

  const featuredImages = images.slice(0, 5); // first 5 for featured slider

  const filteredImages = images.filter(img =>
    img.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleImageSelect = (img) => {
    const idx = filteredImages.findIndex(i => i.filename === img.filename);
    setSelectedImage(img);
    setSelectedIndex(idx);
    resetZoom();
  };

  const handlePrevImage = (e) => {
    if (e) e.stopPropagation();
    if (filteredImages.length === 0) return;
    const newIdx = (selectedIndex - 1 + filteredImages.length) % filteredImages.length;
    setSelectedImage(filteredImages[newIdx]);
    setSelectedIndex(newIdx);
    resetZoom();
  };

  const handleNextImage = (e) => {
    if (e) e.stopPropagation();
    if (filteredImages.length === 0) return;
    const newIdx = (selectedIndex + 1) % filteredImages.length;
    setSelectedImage(filteredImages[newIdx]);
    setSelectedIndex(newIdx);
    resetZoom();
  };

  const resetZoom = () => {
    setZoomScale(1);
    setPanOffset({ x: 0, y: 0 });
  };

  const handleZoomIn = (e) => {
    if (e) e.stopPropagation();
    setZoomScale(prev => Math.min(prev + 0.25, 3));
  };

  const handleZoomOut = (e) => {
    if (e) e.stopPropagation();
    setZoomScale(prev => {
      const nextScale = Math.max(prev - 0.25, 1);
      if (nextScale === 1) {
        setPanOffset({ x: 0, y: 0 });
      }
      return nextScale;
    });
  };

  const handleMouseDown = (e) => {
    if (zoomScale <= 1) return;
    setIsDragging(true);
    setDragStart({ x: e.clientX - panOffset.x, y: e.clientY - panOffset.y });
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    setPanOffset({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!selectedImage) return;
      if (e.key === "ArrowLeft") handlePrevImage();
      if (e.key === "ArrowRight") handleNextImage();
      if (e.key === "Escape") setSelectedImage(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedImage, selectedIndex, filteredImages]);

  return (
    <div className="min-h-screen bg-[#0a0f1c] pt-24 md:pt-40 pb-20 relative animate-fade-in text-white">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-amber-900/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="container mx-auto px-6 relative z-10 font-serif">
        <SectionHeading light title="Legacy Gallery" sub="Images & Panels" />
        
        {/* Featured Slider */}
        {searchQuery === "" && (
          <FadeIn>
            <GallerySlider images={featuredImages} onImageSelect={handleImageSelect} />
          </FadeIn>
        )}

        {/* Gallery Search & Heading */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6 max-w-7xl mx-auto border-t border-white/5 pt-12">
          <div>
            <h3 className="font-playfair text-2xl text-white">All Exhibition Panels</h3>
            <p className="font-lora text-xs text-slate-400 mt-1">Browse and search the historical archives ({filteredImages.length} panels)</p>
          </div>
          
          <div className="relative w-full max-w-md">
            <input
              type="text"
              placeholder="Search panels by title..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-full py-3 pl-12 pr-6 text-white placeholder-slate-500 focus:outline-none focus:border-amber-500/50 transition-colors font-inter text-sm"
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white text-xs font-inter uppercase tracking-wider"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Gallery Grid */}
        {filteredImages.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {filteredImages.map((img, idx) => {
              // Map index back to original images array index for specific lightbox selection
              return (
                <FadeIn key={img.filename} delay={(idx % 4) * 100}>
                  <div 
                    onClick={() => handleImageSelect(img)}
                    className="bg-white/5 border border-white/10 rounded-lg overflow-hidden cursor-pointer group hover:border-amber-500/30 transition-all duration-300 shadow-lg flex flex-col h-full"
                  >
                    <div className="aspect-[4/3] w-full overflow-hidden bg-black/20 relative">
                      <img 
                        src={img.path} 
                        alt={img.title} 
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                        <span className="text-amber-500 text-xs font-inter font-bold tracking-widest flex items-center gap-1">
                          VIEW PANEL <ArrowRight className="w-3 h-3" />
                        </span>
                      </div>
                    </div>
                    <div className="p-4 flex-grow flex items-center justify-between border-t border-white/5 bg-[#0f172a]/50">
                      <h3 className="font-playfair text-sm text-slate-200 group-hover:text-amber-400 transition-colors line-clamp-1">{img.title}</h3>
                      <a 
                        href={img.path} 
                        download={img.title} 
                        onClick={(e) => e.stopPropagation()}
                        className="text-slate-400 hover:text-amber-500 transition-colors p-1"
                        title="Download Image"
                      >
                        <Download className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="font-lora text-slate-400">No panels found matching "{searchQuery}"</p>
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/95 backdrop-blur-md select-none"
            onClick={() => setSelectedImage(null)}
          >
            {/* Nav Arrows inside lightbox */}
            <button
              onClick={handlePrevImage}
              className="absolute left-4 md:left-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/60 border border-white/10 text-white flex items-center justify-center hover:bg-amber-500 hover:text-black hover:border-amber-500 transition-all z-55 cursor-pointer shadow-lg"
              title="Previous Panel"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={handleNextImage}
              className="absolute right-4 md:right-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/60 border border-white/10 text-white flex items-center justify-center hover:bg-amber-500 hover:text-black hover:border-amber-500 transition-all z-55 cursor-pointer shadow-lg"
              title="Next Panel"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="relative max-w-5xl w-full bg-[#0a0f1c]/90 border border-amber-500/20 rounded-xl overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh] z-50"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Image viewport with zoom and pan support */}
              <div 
                className="flex-1 bg-black flex items-center justify-center relative overflow-hidden h-[350px] md:h-auto max-h-[50vh] md:max-h-none"
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
              >
                <img 
                  src={selectedImage.path} 
                  alt={selectedImage.title} 
                  className="max-w-full max-h-[75vh] object-contain transition-transform duration-100 ease-out select-none pointer-events-none"
                  style={{ 
                    transform: `scale(${zoomScale}) translate(${panOffset.x / zoomScale}px, ${panOffset.y / zoomScale}px)`, 
                    cursor: zoomScale > 1 ? (isDragging ? 'grabbing' : 'grab') : 'default' 
                  }}
                />

                {/* Floating Zoom Indicators / Status */}
                {zoomScale > 1 && (
                  <div className="absolute bottom-4 left-4 bg-black/75 backdrop-blur-md px-3 py-1.5 rounded border border-white/10 text-[10px] font-inter uppercase tracking-wider text-amber-500">
                    Zoom: {Math.round(zoomScale * 100)}% • Click & Drag to Pan
                  </div>
                )}
              </div>

              {/* Sidebar metadata */}
              <div className="w-full md:w-80 bg-[#0f172a] p-6 flex flex-col justify-between border-t md:border-t-0 md:border-l border-white/10 shrink-0">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="font-inter text-[10px] text-amber-500 font-bold uppercase tracking-[0.2em]">Exhibition Panel</span>
                    <button 
                      onClick={() => setSelectedImage(null)}
                      className="text-slate-400 hover:text-white transition-colors"
                      title="Close"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                  <h3 className="font-playfair text-xl md:text-2xl text-white leading-snug">{selectedImage.title}</h3>
                  <div className="h-px bg-white/10 my-4" />
                  
                  {/* Zoom Controls */}
                  <div className="space-y-2">
                    <span className="font-inter text-[10px] text-slate-400 uppercase tracking-wider block">Panel Controls</span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={handleZoomIn}
                        disabled={zoomScale >= 3}
                        className="flex-1 py-2 bg-white/5 border border-white/10 hover:border-amber-500/30 text-slate-300 hover:text-amber-500 rounded transition-all flex items-center justify-center gap-1.5 font-inter text-[10px] uppercase tracking-wider disabled:opacity-30 disabled:hover:text-slate-300 cursor-pointer"
                        title="Zoom In"
                      >
                        <ZoomIn className="w-3.5 h-3.5" /> In
                      </button>
                      <button
                        onClick={handleZoomOut}
                        disabled={zoomScale <= 1}
                        className="flex-1 py-2 bg-white/5 border border-white/10 hover:border-amber-500/30 text-slate-300 hover:text-amber-500 rounded transition-all flex items-center justify-center gap-1.5 font-inter text-[10px] uppercase tracking-wider disabled:opacity-30 disabled:hover:text-slate-300 cursor-pointer"
                        title="Zoom Out"
                      >
                        <ZoomOut className="w-3.5 h-3.5" /> Out
                      </button>
                      <button
                        onClick={resetZoom}
                        disabled={zoomScale === 1 && panOffset.x === 0 && panOffset.y === 0}
                        className="p-2 bg-white/5 border border-white/10 hover:border-amber-500/30 text-slate-300 hover:text-amber-500 rounded transition-all flex items-center justify-center disabled:opacity-30 disabled:hover:text-slate-300 cursor-pointer"
                        title="Reset View"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <p className="font-lora text-slate-400 text-xs leading-relaxed pt-2">
                    Use left/right arrows on screen or keyboard to flip panels. Adjust zoom using controls and click-drag the image to inspect.
                  </p>
                </div>

                <div className="mt-8 pt-6 border-t border-white/5 flex flex-col gap-3">
                  <a 
                    href={selectedImage.path} 
                    download={selectedImage.title}
                    className="w-full py-3 px-4 bg-amber-500 hover:bg-amber-600 text-[#05080f] text-center font-bold text-xs uppercase tracking-widest rounded transition-all flex items-center justify-center gap-2"
                  >
                    Download Panel <Download className="w-4 h-4" />
                  </a>
                  <button 
                    onClick={() => setSelectedImage(null)}
                    className="w-full py-2.5 border border-white/10 hover:border-white/20 text-slate-300 hover:text-white text-xs font-inter uppercase tracking-widest rounded transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const InstitutionsView = () => {
  const museumPartners = [
    { name: "Art Institute of Chicago", url: "https://www.artic.edu/" },
    { name: "Indian Museum, Kolkata, India", url: "https://indianmuseumkolkata.org/" }
  ];

  return (
    <LegalLayout title="Institutions" sub="Museum Partners">
      <div className="space-y-8">
        <h3 className="text-2xl font-playfair text-amber-500 mb-4">Leading the Dialogue</h3>
        <p className="font-lora text-slate-300 leading-relaxed">
          We are proud to collaborate with top museums, libraries, and cultural preservation institutions across both nations. These institutions serve as the bedrock of our historical research and cultural preservation efforts for the Legacy 250 initiative.
        </p>
        <div className="max-w-2xl mx-auto mt-8">
          <div className="p-6 bg-white/5 border border-white/10 rounded-lg hover:border-amber-500/20 transition-all duration-300 font-serif">
            <h4 className="font-playfair text-xl text-white mb-4 border-b border-white/10 pb-2">Museum Partners</h4>
            <div className="flex flex-col gap-3">
              {museumPartners.map((museum, index) => (
                <a 
                  key={index} 
                  href={museum.url} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="font-lora text-sm text-slate-400 hover:text-amber-500 flex items-center justify-between group transition-colors"
                >
                  <span>{museum.name}</span>
                  <ExternalLink className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </LegalLayout>
  );
};

const SponsorsView = () => (
  <LegalLayout title="Sponsors" sub="Corporate & Philanthropic Support">
    <div className="space-y-6">
      <h3 className="text-2xl font-playfair text-amber-500 mb-4">Empowering the Vision</h3>
      <p>Corporate partners and foundations providing vital support for our exhibitions, documentaries, and global focal events. Their commitment ensures that the story of the US-India partnership reaches millions globally.</p>
      <div className="p-8 bg-white/5 border border-white/10 rounded-sm mt-8 text-center">
        <p className="italic text-amber-500 mb-4">"Investing in the future of the world's oldest and largest democracies."</p>
        <button className="px-6 py-3 border border-amber-500 text-amber-500 text-xs font-inter uppercase tracking-widest hover:bg-amber-500 hover:text-white transition-colors">
          Become a Sponsor
        </button>
      </div>
    </div>
  </LegalLayout>
);

const CommunityView = () => {
  const communityPartners = [
    { name: "Milan USA", url: "https://www.milanusa.org/", desc: "Fostering cultural and community exchange programs." },
    { name: "Indiaspora", url: "https://indiaspora.org", desc: "A nonprofit community of global Indian leaders making a difference." },
    { name: "Odisha Society", url: "https://www.odishasociety.org/", desc: "Fostering community connection and celebrating the rich cultural heritage of Odisha." }
  ];

  return (
    <LegalLayout title="Community" sub="Grassroots & Diaspora">
      <div className="space-y-8">
        <h3 className="text-2xl font-playfair text-amber-500 mb-4">The Heart of the Legacy</h3>
        <p className="font-lora text-slate-300 leading-relaxed mb-6">
          Diaspora organizations, student groups, and community leaders driving grassroots engagement and shaping the next 250 years of partnership. The 4.5 million strong Indian-American community is the living bridge between our nations.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8 font-serif">
          {communityPartners.map((partner, index) => (
            <div key={index} className="p-6 bg-white/5 border border-white/10 rounded-lg hover:border-amber-500/30 transition-all duration-300 group flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-playfair text-lg text-white group-hover:text-amber-400 transition-colors">{partner.name}</h4>
                  <a 
                    href={partner.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-slate-500 hover:text-amber-500 transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
                <p className="font-lora text-sm text-slate-400 leading-relaxed">{partner.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </LegalLayout>
  );
};

const AdvisorsView = () => {
  const advisors = [
    {
      name: "Dr. Harsh V. Shringla",
      titles: [
        "Member of Indian Parliament, Upper House",
        "Former Foreign Secretary of India",
        "Former Ambassador of India to the United States"
      ]
    },
    {
      name: "Dr. Sayan Bhattacharya",
      titles: [
        "Director, Indian Museum",
        "Secretary and Curator (In-charge) Victoria Memorial Hall, Kolkata, India"
      ]
    },
    {
      name: "Dr. Madhubvanti Ghosh",
      titles: [
        "Alsdorf Associate Curator of Indian, Southeast Asian, and Himalayan Art, Arts of Asia",
        "The Art Institute of Chicago"
      ]
    },
    {
      name: "Dr. Dinesh Patel",
      titles: [
        "Former Associate Clinical Professor, Harvard Medical School and Orthopaedic Surgeon",
        "Former Chief of Arthroscopic Surgery at Massachusetts General Hospital",
        "Former Chairman of Board of Registration in Medicine, State of Massachusetts"
      ]
    }
  ];

  return (
    <LegalLayout title="Advisors" sub="Strategic Guidance">
      <div className="space-y-12">
        <div>
          <h3 className="text-2xl font-playfair text-amber-500 mb-4">Expert Committee</h3>
          <p className="font-lora text-slate-300 leading-relaxed">
            Distinguished historians, diplomats, and cultural experts guiding the narrative and strategic direction of the Legacy 250 initiative.
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-6 mt-8">
          {advisors.map((advisor, index) => (
            <div key={index} className="p-6 bg-white/5 border border-white/10 rounded-lg hover:border-amber-500/30 transition-all duration-350 shadow-lg flex flex-col justify-between group">
              <div>
                <h4 className="font-playfair text-xl text-white group-hover:text-amber-400 transition-colors mb-4">{advisor.name}</h4>
                <ul className="space-y-2">
                  {advisor.titles.map((title, tIdx) => (
                    <li key={tIdx} className="font-lora text-sm text-slate-400 leading-relaxed flex items-start gap-2">
                      <span className="text-amber-500/70 select-none">•</span>
                      <span>{title}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </LegalLayout>
  );
};

// --- HOME VIEW ---

const HomeView = ({ scrollTo, navigateTo }) => {
  const parallaxRef = useRef(null);
  const lineRef = useRef(null);
  const lineFillRef = useRef(null);

  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);

  const quotes = [
    {
      text: "India is the cradle of the human race, the birthplace of human speech, the mother of history, the grandmother of legend, and the great-grandmother of tradition.",
      author: "Mark Twain"
    },
    {
      text: "America has the opportunity to give to the world not merely wealth or power, but a vision of human unity.",
      author: "Rabindranath Tagore, Poet laureate"
    },
    {
      text: "India is a free and stable society and a force for peace in Asia…The relationship between India and the United States is important not only to our two nations, but to the future of freedom and democracy in the world.",
      author: "President John F. Kennedy"
    },
    {
      text: "The spirit of India has given us in America a method for social change that is both powerful and moral.",
      author: "Martin Luther King Jr."
    },
    {
      text: "No two nations are more committed to democracy and individual freedom than India and the United States.",
      author: "President Ronald Reagan"
    },
    {
      text: "India and the United States are natural allies. Our partnership is not against any country, but for peace, stability, and prosperity.",
      author: "Prime Minister Atal Bihari Vajpayee"
    },
    {
      text: "India is a great example of democracy… The world needs India. .. The United States and India are natural partners.",
      author: "President George W. Bush"
    },
    {
      text: "India and the United States are bound together by shared values of democracy, freedom, and the rule of law…India–U.S. relations will shape the course of this century, for the benefit of our people and the world.",
      author: "Prime Minister Narendra Modi"
    },
    {
      text: "The United States and India are not just strategic partners—we are natural allies.",
      author: "President Barack Obama"
    },
    {
      text: "The partnership between the United States and India will be among the defining relationships of the 21st century.",
      author: "President Joe Biden"
    },
    {
      text: "India is one of the world’s oldest civilizations and the world’s largest democracy. The United States and India share deeply rooted values of freedom, faith, and respect for human dignity.",
      author: "Congress-Woman Tulsi Gabbard"
    }
  ];

  // Calculate dynamic duration based on text length:
  // Base time of 3.5 seconds + 45ms per character (including author name)
  const getQuoteDuration = (index) => {
    const quote = quotes[index];
    return 3500 + (quote.text.length + quote.author.length) * 45;
  };

  const currentDuration = getQuoteDuration(currentQuoteIndex);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentQuoteIndex((prev) => (prev + 1) % quotes.length);
    }, currentDuration);
    return () => clearTimeout(timer);
  }, [currentQuoteIndex, currentDuration, quotes.length]);



  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrolled = window.scrollY;
          if (parallaxRef.current) {
            parallaxRef.current.style.transform = `translate3d(0, ${scrolled * 0.4}px, 0) scale(1.1)`;
          }
          if (lineRef.current && lineFillRef.current) {
            const rect = lineRef.current.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            const sectionHeight = lineRef.current.offsetHeight;
            const startPoint = windowHeight * 0.75;
            const distanceScrolled = startPoint - rect.top;
            const totalDistance = sectionHeight * 0.9;
            let percentage = (distanceScrolled / totalDistance) * 100;
            percentage = Math.min(Math.max(percentage, 0), 100);
            lineFillRef.current.style.height = `${percentage}%`;
          }
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const timelineItems = [
    {
      year: "1770s – 1850s",
      title: "Early Encounters",
      desc: "The story begins with 'Tony' in Jamestown (1635) and robust trade between India and New England in textiles and spices. Emerson, Thoreau, and Whitman drew deeply from Indian philosophy, weaving it into America's intellectual fabric.",
      align: "left",
    },
    {
      year: "1850s – 1920s",
      title: "Intellectual & Spiritual Bridges",
      desc: "Swami Vivekananda's historic 1893 address in Chicago opened American minds to Eastern wisdom. Simultaneously, the Gadar Movement brought Indian revolutionaries to U.S. shores, fighting for freedom.",
      align: "right",
    },
    {
      year: "1920s – 1950s",
      title: "Freedom & Democracy",
      desc: "Mahatma Gandhi's nonviolence profoundly influenced MLK and the Civil Rights movement. Nehru and Truman laid the early foundations for diplomatic relations between the two newly independent democracies.",
      align: "left",
    },
    {
      year: "1950s – 1990s",
      title: "Cold War & Connection",
      desc: "Despite Non-Alignment challenges, the Peace Corps flourished. The 1965 Immigration Act transformed the Indian American community, leading to exponential growth and cultural exchange.",
      align: "right",
    },
    {
      year: "1990s – 2020s",
      title: "Strategic Alliance",
      desc: "Economic liberalization sparked IT partnerships. The 2008 Civil Nuclear Agreement and defense cooperation cemented the bond. Indian Americans rose to power, from Dalip Singh Saund to Kamala Harris.",
      align: "left",
    },
    {
      year: "Present & Future",
      title: "Shaping Modern America",
      desc: "Indian Americans drive innovation in Silicon Valley. Yoga, Ayurveda, and cuisine enrich culture. The future shines bright with Indo-Pacific cooperation and joint ventures in space and AI.",
      align: "right",
    },
  ];

  return (
    <div className="animate-fade-in w-full" style={{ position: 'relative' }}>
      {/* HERO */}
      <header
        id="hero"
        className="relative h-screen min-h-screen flex items-center justify-center overflow-hidden bg-[#0a0f1c]"
      >
        <div className="absolute inset-0 w-full h-full pointer-events-none z-[1]">
          <SparklesCore
            id="tsparticlesfullpage"
            background="transparent"
            minSize={0.6}
            maxSize={1.4}
            particleDensity={50}
            className="w-full h-full"
            particleColor="#fbbf24"
          />
        </div>
        <div
          ref={parallaxRef}
          className="absolute inset-0 opacity-40 will-change-transform"
          style={{ transform: "scale(1.1)" }}
        >
          <img
            src="/assets/INUS.webp"
            alt="Historical texture"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0f1c] via-transparent to-[#0a0f1c] z-10" />
        
        <div className="relative z-20 container mx-auto px-6 text-center text-white">
          <FadeIn>
            <img
              src="/assets/LOGO_REDESIGNED.webp"
              alt="US-India 250 Logo"
              className="w-28 h-28 md:w-36 md:h-36 rounded-full object-cover mx-auto mb-6 border-2 border-amber-500/40 shadow-[0_0_40px_rgba(245,158,11,0.3)]"
            />
          </FadeIn>
          <div className="mb-8 relative">
            <FadeIn delay={200}>
              <h1 className="font-playfair text-6xl md:text-8xl lg:text-9xl font-medium leading-none tracking-tight text-white mb-2">
                US-India Legacy <span className="text-amber-500 italic">250</span>
              </h1>
            </FadeIn>
          </div>
          <FadeIn delay={400}>
            <p className="font-lora text-lg md:text-xl text-slate-300 max-w-2xl mx-auto mb-12">
              Celebrating 250 years of shared values, mutual influence, and enduring partnership between the United States and India.
            </p>
          </FadeIn>
          <FadeIn delay={600}>
             <button onClick={() => scrollTo('intro')} className="flex flex-col items-center gap-4 mx-auto opacity-70 hover:opacity-100 transition-opacity cursor-pointer">
               <span className="text-[10px] font-inter uppercase tracking-widest text-amber-500">Begin Journey</span>
               <div className="w-px h-12 bg-gradient-to-b from-amber-500 to-transparent" />
             </button>
          </FadeIn>
        </div>
      </header>

      <VintageTheater />

      {/* SIGNIFICANCE */}
      <section
        id="intro"
        className="py-24 relative bg-[#0a0f1c] overflow-hidden"
      >
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <FadeIn direction="up">
              <div className="relative group">
                <div className="absolute -inset-4 border border-amber-500/20 rounded-sm translate-x-4 translate-y-4" />
                <div className="aspect-[3/4] overflow-hidden rounded-sm relative grayscale hover:grayscale-0 transition-all duration-700">
                  <img
                    src="/assets/top.webp"
                    alt="US-India Legacy"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-60" />
                </div>
                <div className="absolute -bottom-10 -right-10 bg-gradient-to-br from-[#0a0f1d]/90 to-[#05080f]/90 p-8 shadow-[0_20px_50px_rgba(0,0,0,0.7),_inset_0_1px_1px_rgba(255,255,255,0.05)] w-[23rem] min-h-[17rem] border border-amber-500/10 flex flex-col justify-between overflow-hidden rounded-lg select-none backdrop-blur-md transition-all duration-500 hover:border-amber-500/30 group/quote">
                  <Quote className="absolute -top-3 -left-3 w-16 h-16 text-amber-500/5 rotate-180 transform pointer-events-none group-hover/quote:text-amber-500/10 transition-colors duration-500" />
                  <div className="flex-1 flex flex-col justify-center relative z-10">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={currentQuoteIndex}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -12 }}
                        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                        className="flex-1 flex flex-col justify-center"
                      >
                        <p className="font-playfair italic text-sm md:text-base text-amber-100/90 leading-relaxed">
                          "{quotes[currentQuoteIndex].text}"
                        </p>
                        <span className="font-inter text-[10px] text-amber-500 font-semibold tracking-[0.2em] text-right block mt-4 uppercase">
                          — {quotes[currentQuoteIndex].author}
                        </span>
                      </motion.div>
                    </AnimatePresence>
                  </div>
                  {/* Visual Page Indicators */}
                  <div className="flex justify-center items-center gap-1.5 mt-6 relative z-10">
                    {quotes.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCurrentQuoteIndex(idx)}
                        className={`h-1 rounded-full transition-all duration-300 ${idx === currentQuoteIndex ? 'w-5 bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.6)]' : 'w-1 bg-white/20 hover:bg-white/40'}`}
                        aria-label={`Go to quote ${idx + 1}`}
                      />
                    ))}
                  </div>
                  {/* Countdown Progress Bar */}
                  <div className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-white/5 overflow-hidden">
                    <motion.div
                      key={`progress-${currentQuoteIndex}`}
                      initial={{ width: "0%" }}
                      animate={{ width: "100%" }}
                      transition={{ duration: currentDuration / 1000, ease: "linear" }}
                      className="h-full bg-gradient-to-r from-amber-500/20 via-amber-500 to-amber-500/20"
                    />
                  </div>
                </div>
              </div>
            </FadeIn>
            <div className="space-y-8">
              <FadeIn delay={200}>
                <SectionHeading
                  align="left"
                  sub="The Significance"
                  title="A Historic Shared Journey"
                />
                <div className="font-lora text-lg text-slate-300 leading-relaxed space-y-5 text-justify">
                  <p>
                    The history of relations between India and the United States stretches back nearly 250 years—far earlier than the formal diplomatic relationship between the two nations. Across generations, people, ideas, trade, knowledge, and shared aspirations have created enduring connections between the two societies.
                  </p>
                  <p>
                    India’s engagement with America has influenced its thought, culture, science, innovation, and society. Likewise, the United States has contributed significantly to the making of modern India—particularly in science, technology, agriculture, education, and entrepreneurship.
                  </p>
                  <p>
                    Legacy 250 brings this remarkable shared history to life. Through a year-long series of exhibitions, symposiums, multimedia presentations, educational programs, and commemorations, we will uncover the people, ideas, events, and institutions that have connected India and America—and celebrate a legacy that continues to shape our shared future.
                  </p>
                  <p>
                    Legacy 250 is an initiative of the MassIndia Partnership, founded in 2016 as a U.S.-registered 501(c)(6) non-profit business league. Dedicated to advancing the economic vitality of the New England region and the United States, we operate through strategic programming, community development, advocacy, and collaborative partnerships.
                  </p>
                  <p className="font-semibold text-amber-200">
                    Thusly, as we launch Legacy 250, we invite you to join us on this collaborative mission to renew this bond between these two great peoples and democracies for another 250 years, because we truly believe that we are "Stronger Together!"
                  </p>
                </div>

                <div className="pt-6 pb-2 flex justify-center text-center">
                  <button
                    onClick={() => navigateTo && navigateTo("donate")}
                    className="inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 hover:from-amber-500 hover:to-amber-400 text-black font-bold font-inter text-xs uppercase tracking-[0.2em] rounded-xl transition-all shadow-[0_0_25px_rgba(245,158,11,0.35)] cursor-pointer transform hover:scale-[1.02] border border-amber-400/40"
                  >
                    <Heart className="w-4 h-4 fill-current" /> Donate to Support Legacy 250
                  </button>
                </div>
                <InteractiveStats />
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* MASS INDIA PARTNERSHIP DEDICATED ORGANIZATIONAL SECTION */}
      <section id="mass-india-partnership" className="py-16 bg-[#0b1329]/80 border-y border-amber-500/20">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="bg-[#0f172a]/90 backdrop-blur-xl border border-amber-500/30 rounded-2xl p-8 md:p-12 shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-center gap-8">
            <div className="w-20 h-20 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center shrink-0 text-amber-400 shadow-inner">
              <Building className="w-10 h-10" />
            </div>
            <div className="space-y-4 flex-1 text-center md:text-left">
              <span className="font-inter text-xs uppercase tracking-[0.25em] text-amber-500 font-bold block">
                Organization Behind Legacy 250
              </span>
              <h3 className="font-playfair text-2xl md:text-3xl text-white font-bold">
                Mass India Partnership
              </h3>
              <p className="font-lora text-slate-300 text-base md:text-lg leading-relaxed">
                Legacy 250 is an initiative of <strong>Mass India Partnership</strong> (<a href="https://www.massindiapartnership.org" target="_blank" rel="noopener noreferrer" className="text-amber-400 hover:underline">www.massindiapartnership.org</a>), a U.S.-registered <strong>501(c)(6) nonprofit business league</strong> based in Massachusetts, USA. Mass India Partnership leads this collaborative educational and cultural movement in partnership with universities, museums, libraries, and institutions across the United States and India.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* VISION PILLARS */}
      <section id="vision" className="py-24 bg-[#05080f]">
        <div className="container mx-auto px-6">
           <SectionHeading sub="Vision" title="A Year of Celebration" />
           <div className="grid md:grid-cols-3 gap-8">
             {[
               { icon: Landmark, title: "Exhibitions", text: "Thematic panels across top museums in both nations showcasing 250 years of shared history." }, 
               { icon: Film, title: "Documentaries", text: "Creating documentaries chronicling the historical, cultural, and diplomatic evolution of this remarkable partnership." }, 
               { icon: BookOpen, title: "Publications", text: "Commemorative books highlighting major milestones and personalities." }
             ].map((card, i) => (
               <FadeIn key={i} delay={i * 150} className="h-full">
                <CardContainer className="inter-var h-full">
                  <CardBody className="bg-white/5 border border-white/10 relative group/card w-auto h-auto rounded-sm p-8 hover:bg-white/10 transition-colors">
                    <CardItem
                      translateZ="50"
                      className="text-xl font-bold text-neutral-600 dark:text-white"
                    >
                      <div className="w-12 h-12 bg-amber-500/20 rounded-full flex items-center justify-center mb-6 text-amber-500">
                        <card.icon strokeWidth={1} className="w-6 h-6" />
                      </div>
                    </CardItem>
                    <CardItem
                      as="h3"
                      translateZ="60"
                      className="font-playfair text-xl mb-4 text-white"
                    >
                      {card.title}
                    </CardItem>
                    <CardItem
                      as="p"
                      translateZ="70"
                      className="font-lora text-slate-400 leading-relaxed text-sm"
                    >
                      {card.text}
                    </CardItem>
                  </CardBody>
                </CardContainer>
               </FadeIn>
             ))}
           </div>
        </div>
      </section>

      {/* IMPLEMENTATION STRATEGY */}
      <section id="implementation" className="py-24 md:py-32 bg-midnight-900 border-t border-white/5">
        <div className="container mx-auto px-6">
          <SectionHeading sub="Implementation" title="Bringing the Vision to Life" light />
          <div className="grid md:grid-cols-3 gap-12 max-w-6xl mx-auto">
            {[
              {
                num: "01",
                title: "Academic Dialogues",
                text: "Seminars at universities, libraries, and think tanks exploring democracy, philosophy, migration, and technological partnership.",
                icon: Mic2,
              },
              {
                num: "02",
                title: "Global Focal Events",
                text: "Two major celebrations—one in New Delhi and one in Washington, D.C. or Boston—featuring exhibitions, cultural performances, and keynote lectures.",
                icon: Globe,
              },
              {
                num: "03",
                title: "Collaborative Implementation",
                text: "Partnerships with the Art Institutes, Government Agencies, Universities, Diaspora organizations, and corporate sponsors.",
                icon: Users2,
              },
            ].map((item, i) => (
              <FadeIn key={i} delay={i * 150} className="text-center group p-8 rounded-sm hover:bg-white/5 transition-colors duration-500">
                <div className="mb-8 mx-auto w-20 h-20 flex items-center justify-center rounded-full bg-midnight-800 border border-amber-500/20 group-hover:border-amber-500 group-hover:shadow-glow-md transition-all duration-500 relative">
                   <div className="absolute inset-0 rounded-full bg-amber-500/10 scale-0 group-hover:scale-100 transition-transform duration-500" />
                  <item.icon className="w-8 h-8 text-amber-600 group-hover:text-amber-500 transition-colors relative z-10" strokeWidth={1.5} />
                </div>
                <h3 className="font-playfair text-2xl text-slate-100 mb-4 tracking-tight">
                  {item.title}
                </h3>
                <p className="font-lora text-slate-400 leading-relaxed text-sm md:text-base px-4">
                  {item.text}
                </p>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* NEW GEMINI FEATURE: THREAD EXPLORER (Hidden as requested) */}
      {/* <ThreadExplorer /> */}
      
      {/* PROJECT TIMELINE (STEPS) (Hidden as requested) */}
      {/* 
      <section id="project-timeline" className="py-24 bg-[#0a0f1c] border-t border-white/5">
         <div className="container mx-auto px-6">
           <SectionHeading sub="Roadmap" title="Project Timeline" />
           <div className="flex flex-col md:flex-row justify-between items-center gap-12 mt-16 relative">
              <div className="hidden md:block absolute top-[2.5rem] left-0 w-full h-px bg-white/10 -z-10" />
              
              {[
                { date: "March 2026", step: "1", title: "Content Finalization", desc: "Research and documentation finalized." },
                { date: "June 2026", step: "2", title: "Production Ready", desc: "Exhibitions and films enter production." },
                { date: "July 2026", step: "3", title: "Global Launch", desc: "Events in Delhi and DC." },
              ].map((phase, i) => (
                <FadeIn key={i} delay={i*200} className="w-full md:w-1/3 text-center bg-[#0a0f1c]">
                  <div className="w-20 h-20 mx-auto bg-[#0a0f1c] border border-amber-500 rounded-full flex items-center justify-center text-amber-500 font-playfair text-2xl mb-6 shadow-[0_0_20px_rgba(245,158,11,0.2)]">
                    {phase.step}
                  </div>
                  <div className="text-amber-500 font-inter text-xs uppercase tracking-widest mb-2">{phase.date}</div>
                  <h4 className="text-white font-playfair text-xl mb-3">{phase.title}</h4>
                  <p className="text-slate-400 font-lora text-sm px-8">{phase.desc}</p>
                </FadeIn>
              ))}
            </div>
          </div>
       </section> 
       */}

      {/* <ParallelPaths /> */}
      {/* HISTORY TIMELINE (GOLDEN THREAD) */}
      <section
        id="timeline"
        className="py-24 md:py-40 bg-[#0a0f1c] text-white relative overflow-hidden"
        ref={lineRef}
        style={{ position: 'relative' }}
      >
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-blue-900 rounded-full blur-[100px]" />
          <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-amber-900 rounded-full blur-[100px]" />
        </div>
        <div className="container mx-auto px-6 relative z-10">
          <SectionHeading
            light
            sub="The Chronicle"
            title="250 Years of History"
          />
          <div className="relative mt-20 md:mt-32">
            <div className="space-y-24 md:space-y-32" style={{ position: 'relative' }}>
              <TracingBeam className="px-6 relative">
                {/* Beam Container */}
                <div className="space-y-24 md:space-y-32 pt-10 relative ml-8 md:ml-0">
                  {timelineItems.map((item, idx) => (
                    <div
                      key={idx}
                      className={`relative flex flex-col md:flex-row gap-8 md:gap-24 items-start md:items-center ${item.align === "right" ? "md:flex-row-reverse" : ""}`}
                    >
                      <div
                        className={`flex-1 pl-12 md:pl-0 text-left md:text-${item.align === "left" ? "right" : "left"}`}
                      >
                        <FadeIn
                          delay={idx * 100}
                          direction={item.align === "left" ? "left" : "right"}
                        >
                          <span className="font-inter font-bold text-amber-500 tracking-[0.2em] text-xs mb-3 block">
                            {item.year}
                          </span>
                          <h3 className="font-playfair text-2xl md:text-5xl mb-4 md:mb-6 text-white/90">
                            {item.title}
                          </h3>
                          <p className="font-lora text-slate-400 leading-relaxed text-base md:text-lg">
                            {item.desc}
                          </p>
                        </FadeIn>
                      </div>
                      <div className="absolute left-6 md:left-1/2 -translate-x-1/2 md:-translate-x-1/2 flex items-center justify-center top-0 md:top-auto">
                        {/* Marker removed/simplified as TracingBeam handles the visual path. Keeping minimal for structure. */}
                      </div>
                      <div className="flex-1 hidden md:block opacity-5 font-playfair text-[150px] leading-none text-white select-none text-center mix-blend-overlay">
                        {idx + 1}
                      </div>
                    </div>
                  ))}
                </div>
              </TracingBeam>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

// --- APP COMPONENT ---

const App = () => {
  const resolveViewFromPath = (rawPathname) => {
    const path = (rawPathname || "").replace(/^\/+|\/+$/g, "");
    const validViews = [
      "home",
      "contact",
      "privacy",
      "terms",
      "press",
      "partnership",
      "state-ambassador-form",
      "student-ambassador-form",
      "events",
      "messages",
      "faq",
      "institutions",
      "sponsors",
      "community",
      "advisors",
      "images",
      "donate",
    ];
    if (path && validViews.includes(path)) {
      return path;
    }
    const matchedPoster = findPosterBySlug(path);
    if (matchedPoster) {
      return matchedPoster.slug;
    }
    return "home";
  };

  const [hasEntered, setHasEntered] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [view, setView] = useState(() =>
    typeof window !== "undefined"
      ? resolveViewFromPath(window.location.pathname)
      : "home"
  );

  // Sync state with URL path
  useEffect(() => {
    const initialView = resolveViewFromPath(window.location.pathname);
    if (initialView !== "home") {
      setView(initialView);
      setHasEntered(true); // Jump straight to content if deep linking
    }

    const handlePopState = (e) => {
      if (e.state && e.state.view) {
        setView(e.state.view);
      } else {
        setView(resolveViewFromPath(window.location.pathname));
      }
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const [isPlaying, setIsPlaying] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const audioRef = useRef(null);
  const fadeInterval = useRef(null);

  // Sync isPlaying state with actual audio events
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    const onEnded = () => setIsPlaying(false);

    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);
    audio.addEventListener("ended", onEnded);

    return () => {
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
      audio.removeEventListener("ended", onEnded);
    };
  }, [hasEntered]);

  // Loading simulation
  useEffect(() => {
    if (hasEntered) return;
    const interval = setInterval(() => {
      setLoadingProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + Math.random() * 5;
      });
    }, 100);
    return () => clearInterval(interval);
  }, [hasEntered]);

  // Scroll listener
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrolled(window.scrollY > 50);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);



  useEffect(() => {
    window.scrollTo(0, 0);
  }, [view]);

  // Enhanced Audio Logic with Fade In/Out
  const fadeAudio = (targetVolume, duration = 2000) => {
    const audio = audioRef.current;
    if (!audio) return;

    if (fadeInterval.current) clearInterval(fadeInterval.current);

    const stepTime = 50;
    const startVolume = audio.volume;
    const startTime = Date.now();

    // Ensure muted is off if we are fading in
    if (targetVolume > 0) audio.muted = false;

    fadeInterval.current = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Linear interpolation
      const newVolume = startVolume + (targetVolume - startVolume) * progress;
      audio.volume = Math.max(0, Math.min(1, newVolume));

      if (progress >= 1) {
        clearInterval(fadeInterval.current);
        if (targetVolume === 0) audio.pause();
      }
    }, stepTime);
  };

  const fadeInAudio = () => {
    if (!audioRef.current) return;
    audioRef.current.volume = 0;
    const playPromise = audioRef.current.play();

    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          fadeAudio(0.4, 5000); // Slower fade in (5s) to lower volume (0.4)
        })
        .catch((e) => console.log("Auto-play prevented", e));
    }
  };

  const fadeOutAudio = () => {
    fadeAudio(0, 800); // Faster fade out (800ms) for responsive feel
  };

  const toggleAudio = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      fadeOutAudio();
    } else {
      audioRef.current.volume = 0; // Start fresh for fade in
      audioRef.current
        .play()
        .then(() => fadeAudio(0.4, 3000))
        .catch((e) => console.log("Play failed", e));
    }
  };

  const enterExperience = () => {
    setHasEntered(true);
    setTimeout(fadeInAudio, 100);
  };

  const scrollTo = useCallback(
    (id) => {
      if (view !== "home") {
        setView("home");
        setTimeout(() => {
          const element = document.getElementById(id);
          if (element) element.scrollIntoView({ behavior: "smooth" });
        }, 300);
      } else {
        const element = document.getElementById(id);
        if (element) element.scrollIntoView({ behavior: "smooth" });
      }
      setIsMenuOpen(false);
    },
    [view],
  );

  const navigateTo = (page) => {
    setView(page);
    setIsMenuOpen(false);
    
    // Update URL history
    if (page === "home") {
      window.history.pushState({ view: "home" }, "", "/");
    } else {
      window.history.pushState({ view: page }, "", `/${page}`);
    }
  };

  const renderView = () => {
    switch (view) {
      case "contact":
        return <ContactView />;
      case "privacy":
        return <PrivacyView />;
      case "terms":
        return <TermsView />;
      case "press":
        return <PressKitView />;
      case "partnership":
        return <PartnershipView />;
      case "events":
        return <EventsView navigateTo={navigateTo} />;
      case "messages":
        return <MessagesView />;
      case "faq":
        return <FAQView />;
      case "institutions":
        return <InstitutionsView />;
      case "sponsors":
        return <SponsorsView />;
      case "community":
        return <CommunityView />;
      case "advisors":
        return <AdvisorsView />;
      case "state-ambassador-form":
        return <StateAmbassadorForm />;
      case "student-ambassador-form":
        return <StudentAmbassadorForm />;
      case "images":
        return <ImagesView />;
      case "donate":
        return <DonateView navigateTo={navigateTo} />;
      default: {
        const matchedPoster = findPosterBySlug(view);
        if (matchedPoster) {
          return (
            <PosterDetailView
              poster={matchedPoster}
              navigateTo={navigateTo}
            />
          );
        }
        return <HomeView scrollTo={scrollTo} navigateTo={navigateTo} />;
      }
    }
  };



  return (
    <div className="font-serif bg-[#0a0f1c] min-h-screen antialiased overflow-x-hidden selection:bg-amber-500/30 selection:text-amber-100">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Lora:ital,wght@0,400;0,500;1,400&family=Inter:wght@300;400;500;600&display=swap');
        .font-playfair { font-family: 'Playfair Display', serif; }
        .font-lora { font-family: 'Lora', serif; }
        .font-inter { font-family: 'Inter', sans-serif; }
        @keyframes grain { 0%, 100% { transform:translate(0, 0) } 10% { transform:translate(-5%, -10%) } 20% { transform:translate(-15%, 5%) } 30% { transform:translate(7%, -25%) } 40% { transform:translate(-5%, 25%) } 50% { transform:translate(-15%, 10%) } 60% { transform:translate(15%, 0%) } 70% { transform:translate(0%, 15%) } 80% { transform:translate(3%, 35%) } 90% { transform:translate(-10%, 10%) } }
        .animate-grain { animation: grain 8s steps(10) infinite; }
        @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
        .animate-fade-in { animation: fade-in 1.5s ease-out forwards; }
        @keyframes drop-down { 0% { transform: translateY(-100%); } 100% { transform: translateY(100%); } }
        .animate-drop-down { animation: drop-down 2s cubic-bezier(0.4, 0, 0.2, 1) infinite; }
        .drop-cap:first-letter { float: left; font-family: 'Playfair Display'; font-size: 4.5rem; line-height: 0.8; font-weight: 700; color: #b45309; margin-right: 1rem; margin-top: 0.25rem; }
        html { scroll-behavior: smooth; }
        /* Mobile Menu Animation */
        .mobile-menu-enter { opacity: 0; transform: translateX(100%); }
        .mobile-menu-enter-active { opacity: 1; transform: translateX(0); transition: opacity 500ms, transform 500ms cubic-bezier(0.16, 1, 0.3, 1); }
        .mobile-menu-exit { opacity: 1; transform: translateX(0); }
        .mobile-menu-exit-active { opacity: 0; transform: translateX(100%); transition: opacity 500ms, transform 500ms cubic-bezier(0.16, 1, 0.3, 1); }
      `}</style>
      <audio ref={audioRef} loop muted={false}>
        <source src={MUSIC_URL} type="audio/mpeg" />
      </audio>


      {/* <ArchivistWidget /> */}



      <nav
        className={`fixed w-full z-50 transition-all duration-700 ${scrolled || view !== "home" ? "bg-[#0a0f1c]/90 backdrop-blur-md py-4 border-b border-white/5" : "bg-transparent py-6 md:py-10"}`}
      >
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div
            className="flex items-center gap-4 cursor-pointer group"
            onClick={() => scrollTo("hero")}
          >
            <img
              src="/assets/LOGO_REDESIGNED.webp"
              alt="US-India 250 Logo"
              className={`w-10 h-10 md:w-12 md:h-12 rounded-full object-cover border transition-all duration-500 hover:scale-105 ${scrolled || view !== "home" ? "border-amber-500 shadow-[0_0_20px_rgba(245,158,11,0.2)] bg-black/50" : "border-white/30 hover:border-white bg-[#0a0f1c]"}`}
            />
            <div
              className={`hidden md:block uppercase tracking-[0.25em] font-inter text-xs transition-colors ${scrolled || view !== "home" ? "text-white" : "text-white/80 group-hover:text-white"}`}
            >
              US-India Legacy<span className="font-bold text-amber-500">250</span>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <NavButton
              label="Home"
              onClick={() => scrollTo("hero")}
              active={!scrolled && view === "home"}
            />
            <NavButton
              label="Vision"
              onClick={() => scrollTo("vision")}
            />
            <NavButton
              label="Events"
              onClick={() => navigateTo("events")}
              active={view === "events"}
            />
            <NavButton
              label="Images"
              onClick={() => navigateTo("images")}
              active={view === "images"}
            />
            <div className="relative group cursor-pointer h-full flex items-center">
              <span className={`text-xs font-inter uppercase tracking-widest transition-colors ${["institutions", "sponsors", "community", "advisors"].includes(view) ? "text-amber-500" : "text-slate-400 group-hover:text-white"}`}>
                Partners <ChevronDown className="inline w-3 h-3 ml-1" />
              </span>
              <div className="absolute top-full left-1/2 -translate-x-1/2 pt-4 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-300">
                <div className="bg-[#0a0f1c] border border-amber-500/20 rounded-sm shadow-xl py-2 w-40 flex flex-col items-center">
                  <button onClick={() => navigateTo("institutions")} className={`w-full py-2 text-xs font-inter uppercase tracking-widest hover:bg-white/5 transition-colors ${view === "institutions" ? "text-amber-500" : "text-slate-400 hover:text-white"}`}>Institutions</button>
                  <button onClick={() => navigateTo("sponsors")} className={`w-full py-2 text-xs font-inter uppercase tracking-widest hover:bg-white/5 transition-colors ${view === "sponsors" ? "text-amber-500" : "text-slate-400 hover:text-white"}`}>Sponsors</button>
                  <button onClick={() => navigateTo("community")} className={`w-full py-2 text-xs font-inter uppercase tracking-widest hover:bg-white/5 transition-colors ${view === "community" ? "text-amber-500" : "text-slate-400 hover:text-white"}`}>Community</button>
                  <button onClick={() => navigateTo("advisors")} className={`w-full py-2 text-xs font-inter uppercase tracking-widest hover:bg-white/5 transition-colors ${view === "advisors" ? "text-amber-500" : "text-slate-400 hover:text-white"}`}>Advisors</button>
                </div>
              </div>
            </div>
            <NavButton
              label="Messages"
              onClick={() => navigateTo("messages")}
              active={view === "messages"}
            />
            <NavButton
              label="Press Info"
              onClick={() => navigateTo("press")}
              active={view === "press"}
            />
            <NavButton
              label="FAQ"
              onClick={() => navigateTo("faq")}
              active={view === "faq"}
            />
            <button
              onClick={() => navigateTo("donate")}
              className={`ml-4 px-6 py-2.5 rounded-sm transition-all duration-300 font-inter text-[11px] uppercase tracking-widest font-bold flex items-center gap-2 cursor-pointer shadow-[0_0_20px_rgba(245,158,11,0.4)] transform hover:scale-105 ${view === "donate" ? "bg-amber-400 text-black shadow-[0_0_25px_rgba(245,158,11,0.7)]" : "bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 text-black hover:brightness-110"}`}
            >
              <Heart className="w-4 h-4 fill-current" /> Donate
            </button>
            <button
              onClick={toggleAudio}
              className={`p-3 rounded-full border transition-all duration-300 hover:scale-110 ${scrolled || view !== "home" ? "border-white/10 text-white hover:text-amber-500" : "border-white/20 text-white hover:bg-white/10"}`}
            >
              {isPlaying ? <Volume2 size={16} /> : <VolumeX size={16} />}
            </button>
          </div>

          {/* Mobile Nav Controls */}
          <div className="md:hidden flex items-center gap-3">
            {/* Standalone Top Mobile Donate Button */}
            <button
              onClick={() => {
                if (isMenuOpen) setIsMenuOpen(false);
                navigateTo("donate");
              }}
              className={`px-3.5 py-1.5 rounded-full transition-all duration-300 font-inter text-[11px] uppercase tracking-widest font-bold flex items-center gap-1.5 shadow-[0_0_15px_rgba(245,158,11,0.4)] cursor-pointer ${
                view === "donate"
                  ? "bg-amber-400 text-black shadow-[0_0_20px_rgba(245,158,11,0.7)]"
                  : "bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 text-black hover:brightness-110"
              }`}
            >
              <Heart className="w-3.5 h-3.5 fill-current" /> Donate
            </button>

            {/* Audio Button - Kept visible outside menu */}
            <button
              onClick={toggleAudio}
              className={`p-2 rounded-full border transition-all duration-300 active:scale-95 ${scrolled ? "border-white/10 text-white" : "border-white/20 text-white"}`}
              title="Toggle Audio"
            >
              {isPlaying ? <Volume2 size={18} /> : <VolumeX size={18} />}
            </button>

            {/* Menu Trigger */}
            <button
              className="text-white p-1.5 focus:outline-none"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle Navigation Menu"
            >
              {isMenuOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Modern Slide-over Mobile Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-40 bg-[#0a0f1c]/98 backdrop-blur-2xl overflow-y-auto pt-24 pb-12 px-6 flex flex-col items-center animate-fade-in">
          <div className="w-full max-w-sm mx-auto space-y-5 text-center my-auto">
            <span className="font-inter text-xs text-amber-500 uppercase tracking-[0.4em] mb-4 block">
              Navigation
            </span>

            <button
              onClick={() => { setIsMenuOpen(false); scrollTo("hero"); }}
              className="block w-full text-2xl font-playfair text-white hover:text-amber-500 transition-colors"
            >
              Home
            </button>

            <button
              onClick={() => { setIsMenuOpen(false); scrollTo("vision"); }}
              className="block w-full text-2xl font-playfair text-white hover:text-amber-500 transition-colors"
            >
              Vision
            </button>
            <button
              onClick={() => { setIsMenuOpen(false); navigateTo("events"); }}
              className="block w-full text-2xl font-playfair text-white hover:text-amber-500 transition-colors"
            >
              Events
            </button>
            <button
              onClick={() => { setIsMenuOpen(false); navigateTo("images"); }}
              className="block w-full text-2xl font-playfair text-white hover:text-amber-500 transition-colors"
            >
              Images
            </button>
            <div className="py-2 border-y border-white/10 space-y-2">
              <div className="text-amber-500 font-inter text-[10px] uppercase tracking-widest font-semibold">Partners</div>
              <button onClick={() => { setIsMenuOpen(false); navigateTo("institutions"); }} className="block w-full text-lg font-playfair text-slate-200 hover:text-amber-400 transition-colors">Institutions</button>
              <button onClick={() => { setIsMenuOpen(false); navigateTo("sponsors"); }} className="block w-full text-lg font-playfair text-slate-200 hover:text-amber-400 transition-colors">Sponsors</button>
              <button onClick={() => { setIsMenuOpen(false); navigateTo("community"); }} className="block w-full text-lg font-playfair text-slate-200 hover:text-amber-400 transition-colors">Community</button>
              <button onClick={() => { setIsMenuOpen(false); navigateTo("advisors"); }} className="block w-full text-lg font-playfair text-slate-200 hover:text-amber-400 transition-colors">Advisors</button>
            </div>
            <button
              onClick={() => { setIsMenuOpen(false); navigateTo("messages"); }}
              className="block w-full text-2xl font-playfair text-white hover:text-amber-500 transition-colors"
            >
              Messages
            </button>
            <button
              onClick={() => { setIsMenuOpen(false); navigateTo("faq"); }}
              className="block w-full text-2xl font-playfair text-white hover:text-amber-500 transition-colors"
            >
              FAQ
            </button>
            <button
              onClick={() => { setIsMenuOpen(false); navigateTo("press"); }}
              className="block w-full text-2xl font-playfair text-white hover:text-amber-500 transition-colors"
            >
              Press Info
            </button>

            <div className="pt-6 border-t border-white/10 mt-6 w-full">
              <button
                onClick={() => { setIsMenuOpen(false); navigateTo("donate"); }}
                className="w-full py-3.5 bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 text-black font-bold uppercase tracking-[0.25em] font-inter text-xs rounded-xl shadow-[0_0_25px_rgba(245,158,11,0.5)] flex items-center justify-center gap-2 cursor-pointer border border-amber-400/40"
              >
                <Heart className="w-4 h-4 fill-current" /> Donate Now
              </button>
            </div>
          </div>
        </div>
      )}

      <main className="transition-opacity duration-700 ease-in-out">
        {renderView()}
      </main>

      <footer className="bg-[#05080f] text-slate-500 py-16 border-t border-white/5 relative z-10">
        <div className="container mx-auto px-6 grid md:grid-cols-4 gap-12">
          <div className="md:col-span-1">
              <div className="flex items-center gap-3 mb-6">
                <img src="/assets/LOGO_REDESIGNED.webp" alt="US-India 250 Logo" className="w-10 h-10 rounded-full opacity-90 object-cover" />
                <span className="text-white font-playfair text-xl">US-India Legacy</span>
              </div>
             <p className="font-lora text-sm mb-6">Celebrating two and a half centuries of shared dreams, democracy, and destiny.</p>
             <div className="flex gap-4 items-center">
               <a href="https://www.instagram.com/legacy250official/" target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-amber-500 transition-colors" title="Instagram">
                 <Instagram className="w-4 h-4" />
               </a>
               <a href="https://www.youtube.com/@Legacy250-k6q" target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-amber-500 transition-colors" title="YouTube">
                 <Youtube className="w-4 h-4" />
               </a>
               <a href="https://x.com/Legacy250Social" target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-amber-500 transition-colors" title="X (Twitter)">
                 <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                   <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                 </svg>
               </a>
               <a href="mailto:info@IndiaUSLegacy250.com" className="text-slate-500 hover:text-amber-500 transition-colors" title="Email">
                 <Mail className="w-4 h-4" />
               </a>
             </div>
          </div>
          <div>
            <h4 className="text-white font-inter text-xs uppercase tracking-widest mb-6">Navigation</h4>
            <ul className="space-y-3 font-inter text-xs tracking-wider">
               <li onClick={() => scrollTo('hero')} className="hover:text-amber-500 cursor-pointer">Home</li>
               <li onClick={() => scrollTo('vision')} className="hover:text-amber-500 cursor-pointer">Vision</li>
               <li onClick={() => navigateTo('events')} className="hover:text-amber-500 cursor-pointer">Events</li>
               <li onClick={() => navigateTo('images')} className="hover:text-amber-500 cursor-pointer">Images</li>
               <li onClick={() => navigateTo('institutions')} className="hover:text-amber-500 cursor-pointer">Institutions</li>
               <li onClick={() => navigateTo('sponsors')} className="hover:text-amber-500 cursor-pointer">Sponsors</li>
               <li onClick={() => navigateTo('community')} className="hover:text-amber-500 cursor-pointer">Community</li>
               <li onClick={() => navigateTo('advisors')} className="hover:text-amber-500 cursor-pointer">Advisors</li>
               <li onClick={() => navigateTo('messages')} className="hover:text-amber-500 cursor-pointer">Messages</li>
               <li onClick={() => navigateTo('faq')} className="hover:text-amber-500 cursor-pointer">FAQ</li>
               <li onClick={() => navigateTo('contact')} className="hover:text-amber-500 cursor-pointer">Contact</li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-inter text-xs uppercase tracking-widest mb-6">Legal</h4>
            <ul className="space-y-3 font-inter text-xs tracking-wider">
              <li onClick={() => navigateTo('privacy')} className="hover:text-amber-500 cursor-pointer">Privacy Policy</li>
              <li onClick={() => navigateTo('terms')} className="hover:text-amber-500 cursor-pointer">Terms of Use</li>
              <li onClick={() => navigateTo('press')} className="hover:text-amber-500 cursor-pointer">Press Info</li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-inter text-xs uppercase tracking-widest mb-6">Contact</h4>
            <ul className="space-y-3 font-lora text-sm">
              <li className="flex items-center gap-3"><Mail className="w-3 h-3 text-amber-500" /> info@indiauslegacy250.com</li>
            </ul>
          </div>
        </div>
        <div className="container mx-auto px-6 mt-16 pt-8 border-t border-white/5 flex flex-col items-center gap-4">
            <div className="font-inter text-[10px] tracking-widest opacity-40 uppercase text-center">
                © 2026 US-India Legacy 250 Years Initiative.
            </div>
            <div className="font-inter text-xs tracking-widest uppercase opacity-90 text-center flex items-center justify-center gap-2 flex-wrap pt-2">
              <span className="text-slate-400 font-medium">Developed by</span>
              <a
                href="https://dnsglobal.co.in"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-200 font-semibold hover:text-amber-400 transition-colors"
              >
                DNS Global
              </a>
              <a
                href="https://dnsglobal.co.in/craftiq"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-1 bg-gradient-to-r from-amber-500/15 via-amber-400/25 to-amber-500/15 border border-amber-500/50 rounded-full text-amber-300 font-bold hover:text-white hover:border-amber-400 hover:shadow-[0_0_20px_rgba(245,158,11,0.5)] transition-all duration-300 group cursor-pointer"
              >
                <Sparkles className="w-3 h-3 text-amber-400 animate-pulse group-hover:scale-125 transition-transform" />
                <span className="bg-gradient-to-r from-amber-200 via-amber-400 to-yellow-300 bg-clip-text text-transparent font-extrabold tracking-wider text-xs">
                  CRAFTIQ
                </span>
                <Sparkles className="w-3 h-3 text-amber-400 animate-pulse group-hover:scale-125 transition-transform" />
              </a>
            </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
