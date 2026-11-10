import React, { useEffect, useRef, useState } from "react";
import { motion, useTransform, useScroll, useSpring } from "framer-motion";
import { cn } from "../../utils/cn";

export const TracingBeam = ({
  children,
  className,
}) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.5", "end start"],
  });

  const contentRef = useRef(null);
  const [svgHeight, setSvgHeight] = useState(0);

  useEffect(() => {
    if (contentRef.current) {
      setSvgHeight(contentRef.current.offsetHeight);
      
      const resizeObserver = new ResizeObserver(() => {
        setSvgHeight(contentRef.current.offsetHeight);
      });
      resizeObserver.observe(contentRef.current);
      
      return () => resizeObserver.disconnect();
    }
  }, []);

  const y1 = useTransform(scrollYProgress, [0, 0.8], [0, svgHeight]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, svgHeight - 200]);

  return (
    <motion.div
      ref={ref}
      className={cn("relative w-full max-w-4xl mx-auto h-full", className)}
    >
      <div className="absolute left-1/2 -translate-x-1/2 -top-10 z-50 flex flex-col items-center w-full">
        <motion.div
          transition={{
            duration: 0.2,
            delay: 0.5,
          }}
          animate={{
            boxShadow:
              scrollYProgress.get() > 0
                ? "none"
                : "rgba(0, 0, 0, 0.24) 0px 3px 8px",
          }}
          className="h-4 w-4 rounded-full border border-netural-200 shadow-sm flex items-center justify-center bg-white z-20"
        >
          <motion.div
            transition={{
              duration: 0.2,
              delay: 0.5,
            }}
            animate={{
              backgroundColor:
                scrollYProgress.get() > 0 ? "white" : "var(--amber-500)",
              borderColor:
                scrollYProgress.get() > 0 ? "white" : "var(--amber-600)",
            }}
            className="h-2 w-2  rounded-full border border-neutral-300 bg-white"
          />
        </motion.div>
        
        <svg
          viewBox={`0 0 20 ${svgHeight}`}
          width="20"
          height={svgHeight} 
          className="block overflow-visible"
          aria-hidden="true"
        >
          <motion.path
            d={`M 10 0 V ${svgHeight}`} 
            fill="none"
            stroke="#9091A0"
            strokeOpacity="0.16"
            transition={{
              duration: 10,
            }}
          ></motion.path>
          <motion.path
            d={`M 10 0 V ${svgHeight}`}
            fill="none"
            stroke="url(#gradient)"
            strokeWidth="2"
            className="motion-reduce:hidden"
            transition={{
              duration: 10,
            }}
          ></motion.path>
          <defs>
            <motion.linearGradient
              id="gradient"
              gradientUnits="userSpaceOnUse"
              x1="0"
              x2="0"
              y1={y1} 
              y2={y2} 
            >
              <stop stopColor="#F59E0B" stopOpacity="0"></stop>
              <stop stopColor="#F59E0B"></stop>
              <stop offset="0.325" stopColor="#FBBF24"></stop>
              <stop offset="1" stopColor="#FDE68A" stopOpacity="0"></stop>
            </motion.linearGradient>
          </defs>
        </svg>
        
        {/* Fire/Particle Emitter Tip */}
        <motion.div
            style={{ translateY: y1, translateX: '-50%' }}
            className="absolute left-1/2 top-2 w-6 h-6 rounded-full bg-amber-500/50 blur-[10px] z-10 pointer-events-none"
        >
             {/* Core */}
            <div className="absolute inset-2 bg-amber-200 blur-[2px] rounded-full animate-pulse" />
            
            {/* Particles - CSS Animation for performance */}
            {[...Array(5)].map((_, i) => (
                <div 
                    key={i}
                    className="absolute left-1/2 top-1/2 w-1 h-1 bg-amber-300 rounded-full"
                    style={{
                        animation: `fall ${1 + Math.random()}s linear infinite`,
                        animationDelay: `${Math.random() * 2}s`,
                        opacity: 0
                    }}
                />
            ))}
            <style>{`
                @keyframes fall {
                    0% { transform: translate(-50%, 0) scale(1); opacity: 1; }
                    100% { transform: translate(-50%, 50px) scale(0); opacity: 0; }
                }
            `}</style>
        </motion.div>
      </div>
      <div ref={contentRef}>{children}</div>
    </motion.div>
  );
};
