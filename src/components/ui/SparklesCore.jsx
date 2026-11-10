import React, { useEffect, useRef, useState } from "react";
import { cn } from "../../utils/cn";

export const SparklesCore = ({
  id,
  background,
  minSize,
  maxSize,
  particleDensity,
  className,
  particleColor,
}) => {
  const canvasRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 1200, height: 800 });
  const [context, setContext] = useState(null);
  const particles = useRef([]);
  const animationId = useRef(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
      // Handle resize
      const handleResize = () => {
        setDimensions({
          width: window.innerWidth,
          height: window.innerHeight,
        });
        // Clear particles to re-initialize appropriately
        particles.current = [];
        if (context) {
             // Re-init happens in the effect dependent on dimensions
        }
      };
      
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  useEffect(() => {
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext("2d");
      setContext(ctx);
    }
  }, []); // Only once on mount

  useEffect(() => {
     if (canvasRef.current && context) {
         canvasRef.current.width = dimensions.width;
         canvasRef.current.height = dimensions.height;
         
         // Initialize particles
         const particleCount = particleDensity || 50;
         if (particles.current.length === 0) {
             for (let i = 0; i < particleCount; i++) {
                 particles.current.push({
                     x: Math.random() * dimensions.width,
                     y: Math.random() * dimensions.height,
                     size: Math.random() * (maxSize - minSize) + minSize,
                     speedX: Math.random() * 0.5 - 0.25,
                     speedY: Math.random() * 0.5 - 0.25,
                     opacity: Math.random(),
                     growing: Math.random() > 0.5
                 });
             }
         }
     }
  }, [dimensions, context, minSize, maxSize, particleDensity]);

  useEffect(() => {
      let active = true;
      
      const animate = () => {
          if (!context || !canvasRef.current) return;
          if (!active) return;
          
          context.clearRect(0, 0, dimensions.width, dimensions.height);
          
          // Draw background if desired (although usually handled by parent div)
          if(background) {
            context.fillStyle = background;
            context.fillRect(0, 0, dimensions.width, dimensions.height);
          }

          particles.current.forEach((p, i) => {
              // Update position
              p.x += p.speedX;
              p.y += p.speedY;

              // Wrap around
              if (p.x < 0) p.x = dimensions.width;
              if (p.x > dimensions.width) p.x = 0;
              if (p.y < 0) p.y = dimensions.height;
              if (p.y > dimensions.height) p.y = 0;

              // Twinkle effect
              if (p.growing) {
                  p.opacity += 0.01;
                  if (p.opacity >= 1) p.growing = false;
              } else {
                  p.opacity -= 0.01;
                  if (p.opacity <= 0.2) p.growing = true;
              }

              // Draw connection lines (Thread effect)
              // Only check particles after the current one to avoid double drawing and self-check
              // Limit checks for performance if density is high
              for (let j = i + 1; j < particles.current.length; j++) {
                  const p2 = particles.current[j];
                  const dx = p.x - p2.x;
                  const dy = p.y - p2.y;
                  const distance = Math.sqrt(dx * dx + dy * dy);

                  if (distance < 100) { // Connection threshold
                      context.beginPath();
                      context.strokeStyle = particleColor || "#fbbf24";
                      // Opacity based on distance
                      context.globalAlpha = (1 - distance / 100) * 0.5; 
                      context.lineWidth = 0.5;
                      context.moveTo(p.x, p.y);
                      context.lineTo(p2.x, p2.y);
                      context.stroke();
                  }
              }

              context.beginPath();
              context.arc(p.x, p.y, p.size, 0, Math.PI * 2);
              context.fillStyle = particleColor || "#FFFFFF";
              context.globalAlpha = p.opacity;
              context.fill();
              context.globalAlpha = 1; 
          });

          animationId.current = requestAnimationFrame(animate);
      };
      
      animate();

      return () => {
          active = false;
          if (animationId.current) cancelAnimationFrame(animationId.current);
      }
  }, [context, dimensions, particleColor, background]);

  return (
    <canvas
      ref={canvasRef}
      id={id}
      className={cn("absolute inset-0 z-0 h-full w-full pointer-events-none", className)}
      style={{ background: background || "transparent" }}
    />
  );
};
