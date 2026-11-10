import React, { useState, useEffect } from "react";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Clock,
  Download,
  ExternalLink,
  FileText,
  Sparkles,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  X,
  Share2,
  Check,
  Info,
} from "lucide-react";
import { POSTERS_DATA } from "../data/postersData";

const renderTextWithLinks = (text) => {
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  const parts = text.split(urlRegex);
  return parts.map((part, idx) => {
    if (part.match(urlRegex)) {
      return (
        <a
          key={idx}
          href={part}
          target="_blank"
          rel="noopener noreferrer"
          className="text-amber-400 hover:text-amber-300 underline underline-offset-4 break-all inline-flex items-center gap-1"
        >
          {part}
          <ExternalLink className="w-3 h-3 inline shrink-0" />
        </a>
      );
    }
    return part;
  });
};

export const PosterDetailView = ({ poster, navigateTo }) => {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [zoomScale, setZoomScale] = useState(1);
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    setIsLightboxOpen(false);
    setZoomScale(1);
    setPanOffset({ x: 0, y: 0 });
  }, [poster?.id]);

  if (!poster) return null;

  const prevPoster =
    POSTERS_DATA.find((p) => p.id === poster.id - 1) ||
    POSTERS_DATA[POSTERS_DATA.length - 1];
  const nextPoster =
    POSTERS_DATA.find((p) => p.id === poster.id + 1) || POSTERS_DATA[0];

  const resetZoom = () => {
    setZoomScale(1);
    setPanOffset({ x: 0, y: 0 });
  };

  const handleZoomIn = (e) => {
    if (e) e.stopPropagation();
    setZoomScale((prev) => Math.min(prev + 0.4, 3.5));
  };

  const handleZoomOut = (e) => {
    if (e) e.stopPropagation();
    setZoomScale((prev) => {
      const next = Math.max(prev - 0.4, 1);
      if (next === 1) setPanOffset({ x: 0, y: 0 });
      return next;
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
      y: e.clientY - dragStart.y,
    });
  };

  const handleMouseUp = () => setIsDragging(false);

  const handleCopyLink = () => {
    const url = `${window.location.origin}/${poster.slug}`;
    navigator.clipboard?.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#0a0f1c] pt-24 md:pt-36 pb-24 text-white relative overflow-hidden animate-fade-in">
      {/* Ambient Background Glow */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-amber-900/10 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-[500px] h-[500px] bg-blue-900/10 rounded-full blur-[130px] pointer-events-none" />

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        {/* Top Bar: Back & Poster Switcher */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-8 mb-10 border-b border-white/10">
          <button
            onClick={() => navigateTo("home")}
            className="inline-flex items-center gap-2 text-xs font-inter uppercase tracking-[0.2em] text-slate-400 hover:text-amber-400 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 text-amber-500" />
            Back to Legacy 250 Home
          </button>

          <div className="flex items-center gap-3">
            <span className="px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 font-inter text-[11px] uppercase tracking-[0.2em] font-semibold">
              Exhibition Poster {poster.number} / 20
            </span>
            <button
              onClick={handleCopyLink}
              className="px-3.5 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white font-inter text-[11px] uppercase tracking-wider flex items-center gap-1.5 transition-colors cursor-pointer"
              title="Copy QR Webpage Link"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" /> Copied
                </>
              ) : (
                <>
                  <Share2 className="w-3.5 h-3.5 text-amber-500" /> Share
                </>
              )}
            </button>
          </div>
        </div>

        {/* Hero Title Block */}
        <div className="max-w-4xl mb-12">
          <div className="inline-flex items-center gap-2 text-amber-500 font-inter text-xs uppercase tracking-[0.22em] mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{poster.editionTag}</span>
          </div>
          <h1 className="font-playfair text-3xl sm:text-5xl md:text-6xl text-white font-bold leading-[1.15] mb-5">
            {poster.title}
          </h1>
          <p className="font-lora text-lg sm:text-2xl text-amber-200/90 italic leading-relaxed">
            {poster.subtitle}
          </p>
        </div>

        {/* Main 2-Column Layout: Sticky Poster Visual + Deep-Dive Companion Article */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left Column: Exhibition Poster Card & Quick Links */}
          <div className="lg:col-span-5 lg:sticky lg:top-28 space-y-6">
            <div className="bg-[#0f172a]/90 border border-amber-500/30 rounded-xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.6)] group">
              <div
                onClick={() => {
                  resetZoom();
                  setIsLightboxOpen(true);
                }}
                className="relative bg-black/60 cursor-zoom-in overflow-hidden flex items-center justify-center p-3 sm:p-4"
              >
                <img
                  src={poster.image}
                  alt={poster.title}
                  className="w-full h-auto max-h-[640px] object-contain rounded transition-transform duration-500 group-hover:scale-[1.02]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center p-6">
                  <span className="px-4 py-2 rounded-full bg-amber-500 text-black font-inter text-xs font-bold uppercase tracking-widest flex items-center gap-2 shadow-lg">
                    <ZoomIn className="w-4 h-4" /> Click to Inspect Full Poster
                  </span>
                </div>
              </div>

              {/* Poster Card Footer Controls */}
              <div className="p-4 bg-[#0b1120] border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
                <button
                  onClick={() => {
                    resetZoom();
                    setIsLightboxOpen(true);
                  }}
                  className="flex-1 py-2.5 px-4 bg-amber-500/15 hover:bg-amber-500 text-amber-400 hover:text-black border border-amber-500/30 rounded font-inter text-xs font-bold uppercase tracking-widest transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <ZoomIn className="w-4 h-4" /> Examine High-Res Poster
                </button>
                <a
                  href={poster.image}
                  download={`${poster.slug}-${poster.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}.webp`}
                  className="py-2.5 px-4 bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 rounded font-inter text-xs uppercase tracking-widest transition-colors flex items-center gap-2"
                  title="Download Poster Image"
                >
                  <Download className="w-4 h-4 text-amber-500" /> Save
                </a>
              </div>
            </div>

            {/* Key Source Card */}
            {poster.keySource && (
              <div className="p-6 rounded-xl bg-gradient-to-br from-amber-950/30 via-[#0f172a] to-[#0f172a] border border-amber-500/25 shadow-lg">
                <div className="flex items-center gap-2 text-amber-400 font-inter text-[11px] uppercase tracking-[0.2em] font-bold mb-2">
                  <BookOpen className="w-4 h-4" />
                  <span>Key Companion Volume</span>
                </div>
                <p className="font-playfair text-base text-white mb-4 leading-snug">
                  {poster.keySource.title}
                </p>
                <a
                  href={poster.keySource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded bg-amber-500 hover:bg-amber-400 text-black font-inter text-xs font-bold uppercase tracking-wider transition-colors"
                >
                  View on Amazon <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            )}

            {/* Table of Contents */}
            {poster.sections && poster.sections.length > 0 && (
              <div className="hidden lg:block p-6 rounded-xl bg-white/[0.02] border border-white/10">
                <h3 className="font-inter text-xs uppercase tracking-[0.2em] text-amber-500 font-bold mb-4">
                  In This Companion Article
                </h3>
                <ul className="space-y-2.5 text-sm font-lora text-slate-400">
                  {poster.sections.map((sec, idx) => (
                    <li key={idx}>
                      <a
                        href={`#section-${idx}`}
                        className="hover:text-amber-400 transition-colors block leading-snug"
                      >
                        {sec.heading}
                      </a>
                    </li>
                  ))}
                  {poster.furtherReading && (
                    <li>
                      <a
                        href="#further-reading"
                        className="hover:text-amber-400 transition-colors block leading-snug"
                      >
                        Suggested Further Reading
                      </a>
                    </li>
                  )}
                </ul>
              </div>
            )}
          </div>

          {/* Right Column: Full Companion Text */}
          <div className="lg:col-span-7 space-y-10">
            {/* Optional Intro Block */}
            {poster.intro && (
              <div className="p-7 sm:p-8 rounded-xl bg-gradient-to-br from-amber-500/10 via-white/[0.02] to-transparent border border-amber-500/25">
                {poster.intro.heading && (
                  <h2 className="font-playfair text-2xl sm:text-3xl text-amber-400 mb-4">
                    {poster.intro.heading}
                  </h2>
                )}
                <div className="space-y-4 font-lora text-slate-200 text-base sm:text-lg leading-relaxed">
                  {poster.intro.paragraphs.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
              </div>
            )}

            {/* Main Sections */}
            {poster.sections.map((section, idx) => (
              <section
                key={idx}
                id={`section-${idx}`}
                className="scroll-mt-32 bg-white/[0.02] border border-white/10 rounded-xl p-6 sm:p-8 hover:border-amber-500/20 transition-colors"
              >
                <h2 className="font-playfair text-2xl sm:text-3xl text-white mb-5 pb-3 border-b border-white/10">
                  {section.heading}
                </h2>

                {/* Paragraphs */}
                {section.paragraphs && (
                  <div className="space-y-4 font-lora text-slate-300 text-base sm:text-[17px] leading-relaxed">
                    {section.paragraphs.map((para, pIdx) => (
                      <p key={pIdx}>{renderTextWithLinks(para)}</p>
                    ))}
                  </div>
                )}

                {/* Structured Items (e.g. Goods, Symbolism, Pioneers, Key Concepts) */}
                {section.items && (
                  <div className="grid grid-cols-1 gap-4 mt-5">
                    {section.items.map((item, iIdx) => (
                      <div
                        key={iIdx}
                        className="p-5 rounded-lg bg-[#0f172a]/80 border border-amber-500/20"
                      >
                        <div className="font-inter text-xs uppercase tracking-[0.18em] text-amber-400 font-bold mb-2">
                          {item.label}
                        </div>
                        <p className="font-lora text-slate-300 text-sm sm:text-base leading-relaxed">
                          {renderTextWithLinks(item.text)}
                        </p>
                      </div>
                    ))}
                  </div>
                )}

                {/* Historical Timeline */}
                {section.timeline && (
                  <div className="mt-5 relative pl-6 border-l-2 border-amber-500/40 space-y-6">
                    {section.timeline.map((tItem, tIdx) => (
                      <div key={tIdx} className="relative">
                        <div className="absolute -left-[31px] top-1.5 w-3.5 h-3.5 rounded-full bg-amber-500 border-2 border-[#0a0f1c]" />
                        <div className="font-inter text-xs uppercase tracking-[0.2em] text-amber-400 font-bold mb-1">
                          {tItem.period}
                        </div>
                        <p className="font-lora text-slate-300 text-sm sm:text-base leading-relaxed">
                          {tItem.event}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </section>
            ))}

            {/* Further Reading */}
            {poster.furtherReading && poster.furtherReading.length > 0 && (
              <section
                id="further-reading"
                className="scroll-mt-32 bg-[#0f172a]/70 border border-white/10 rounded-xl p-6 sm:p-8"
              >
                <div className="flex items-center gap-3 mb-5 pb-3 border-b border-white/10">
                  <FileText className="w-5 h-5 text-amber-500" />
                  <h2 className="font-playfair text-2xl text-white">
                    Suggested Primary & Scholarly Reading
                  </h2>
                </div>

                {poster.keySource && (
                  <div className="mb-5 p-4 rounded-lg bg-amber-500/10 border border-amber-500/30 font-lora text-sm sm:text-base text-amber-100">
                    <strong className="text-amber-400 font-inter text-xs uppercase tracking-wider block mb-1">
                      Key Source
                    </strong>
                    <a
                      href={poster.keySource.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-amber-300 hover:text-amber-200 underline underline-offset-4 inline-flex items-center gap-1.5"
                    >
                      {poster.keySource.title}
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                )}

                <ul className="space-y-3 font-lora text-slate-300 text-sm sm:text-base">
                  {poster.furtherReading.map((item, rIdx) => (
                    <li key={rIdx} className="flex items-start gap-3">
                      <span className="text-amber-500 mt-1 select-none">•</span>
                      <span className="leading-relaxed">
                        {renderTextWithLinks(item)}
                      </span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Editorial Note */}
            {poster.editorialNote && (
              <div className="p-5 sm:p-6 rounded-xl bg-slate-900/80 border border-slate-700/60 flex items-start gap-4">
                <Info className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                <p className="font-lora text-xs sm:text-sm text-slate-400 leading-relaxed">
                  <strong className="text-slate-200 font-inter uppercase tracking-wider text-xs mr-2">
                    Editorial Note:
                  </strong>
                  {poster.editorialNote}
                </p>
              </div>
            )}

            {/* Closing Reflection */}
            {poster.closingReflection && (
              <div className="p-8 sm:p-10 rounded-xl bg-gradient-to-br from-amber-600/15 via-amber-900/10 to-[#0f172a] border border-amber-500/30 text-center relative overflow-hidden">
                <Sparkles className="w-6 h-6 text-amber-400 mx-auto mb-3" />
                <h3 className="font-playfair text-2xl sm:text-3xl text-white mb-4">
                  {poster.closingReflection.title}
                </h3>
                <p className="font-lora text-base sm:text-lg text-amber-100/90 italic leading-relaxed max-w-2xl mx-auto">
                  “{poster.closingReflection.text}”
                </p>
                {poster.footerNote && (
                  <div className="mt-6 pt-5 border-t border-white/10 font-inter text-[11px] uppercase tracking-[0.2em] text-amber-400/80">
                    {poster.footerNote}
                  </div>
                )}
              </div>
            )}

            {/* Prev / Next Poster Navigation */}
            <div className="pt-8 border-t border-white/10 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <button
                onClick={() => navigateTo(prevPoster.slug)}
                className="p-5 rounded-xl bg-white/[0.02] hover:bg-white/[0.06] border border-white/10 hover:border-amber-500/40 text-left transition-all group cursor-pointer"
              >
                <div className="flex items-center gap-2 text-xs font-inter uppercase tracking-widest text-slate-400 group-hover:text-amber-400 mb-1">
                  <ArrowLeft className="w-3.5 h-3.5" /> Previous Poster (#
                  {prevPoster.number})
                </div>
                <div className="font-playfair text-lg text-white line-clamp-1">
                  {prevPoster.title}
                </div>
              </button>

              <button
                onClick={() => navigateTo(nextPoster.slug)}
                className="p-5 rounded-xl bg-white/[0.02] hover:bg-white/[0.06] border border-white/10 hover:border-amber-500/40 text-right transition-all group cursor-pointer"
              >
                <div className="flex items-center justify-end gap-2 text-xs font-inter uppercase tracking-widest text-slate-400 group-hover:text-amber-400 mb-1">
                  Next Poster (#{nextPoster.number}){" "}
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
                <div className="font-playfair text-lg text-white line-clamp-1">
                  {nextPoster.title}
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* High-Resolution Interactive Lightbox Modal */}
      {isLightboxOpen && (
        <div
          className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-md flex flex-col items-center justify-center p-4 select-none"
          onClick={() => setIsLightboxOpen(false)}
        >
          {/* Top Controls Bar */}
          <div
            className="w-full max-w-6xl flex flex-wrap items-center justify-between gap-4 mb-4 px-4 py-3 rounded-lg bg-[#0f172a]/90 border border-white/10 z-10"
            onClick={(e) => e.stopPropagation()}
          >
            <div>
              <span className="text-[10px] font-inter uppercase tracking-[0.2em] text-amber-500 block">
                Poster #{poster.number} • Interactive Viewer
              </span>
              <h4 className="font-playfair text-base sm:text-lg text-white line-clamp-1">
                {poster.title}
              </h4>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleZoomOut}
                disabled={zoomScale <= 1}
                className="p-2 rounded bg-white/5 hover:bg-white/10 border border-white/10 text-white disabled:opacity-30 cursor-pointer"
                title="Zoom Out"
              >
                <ZoomOut className="w-4 h-4" />
              </button>
              <span className="font-inter text-xs text-amber-400 min-w-[3.5rem] text-center">
                {Math.round(zoomScale * 100)}%
              </span>
              <button
                onClick={handleZoomIn}
                disabled={zoomScale >= 3.5}
                className="p-2 rounded bg-white/5 hover:bg-white/10 border border-white/10 text-white disabled:opacity-30 cursor-pointer"
                title="Zoom In"
              >
                <ZoomIn className="w-4 h-4" />
              </button>
              <button
                onClick={resetZoom}
                className="p-2 rounded bg-white/5 hover:bg-white/10 border border-white/10 text-white cursor-pointer"
                title="Reset Zoom"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsLightboxOpen(false)}
                className="ml-2 p-2 rounded bg-amber-500 hover:bg-amber-400 text-black font-bold cursor-pointer"
                title="Close Viewer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Zoomable Image Canvas */}
          <div
            className="flex-1 w-full max-w-6xl overflow-hidden flex items-center justify-center relative rounded-lg border border-white/10 bg-black"
            onClick={(e) => e.stopPropagation()}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          >
            <img
              src={poster.image}
              alt={poster.title}
              className="max-w-full max-h-[80vh] object-contain transition-transform duration-100 ease-out pointer-events-none select-none"
              style={{
                transform: `scale(${zoomScale}) translate(${panOffset.x / zoomScale}px, ${panOffset.y / zoomScale}px)`,
                cursor:
                  zoomScale > 1 ? (isDragging ? "grabbing" : "grab") : "default",
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

