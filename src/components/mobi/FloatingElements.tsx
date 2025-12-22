import { useEffect, useState } from "react";

const FloatingElements = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="fixed inset-0 z-[1] pointer-events-none overflow-hidden">
      {/* Varied floating blobs - different sizes, positions and animations */}
      <div
        className="absolute rounded-full bg-primary/10 blur-[120px]"
        style={{
          width: "450px",
          height: "450px",
          top: "5%",
          left: "0%",
          animation: "floatBlob1 12s ease-in-out infinite",
          transform: `translate(${mousePosition.x * 0.3}px, ${mousePosition.y * 0.3}px)`,
        }}
      />
      <div
        className="absolute rounded-full bg-cyan-500/8 blur-[100px]"
        style={{
          width: "350px",
          height: "350px",
          top: "15%",
          right: "5%",
          animation: "floatBlob2 15s ease-in-out infinite",
          transform: `translate(${-mousePosition.x * 0.2}px, ${-mousePosition.y * 0.2}px)`,
        }}
      />
      <div
        className="absolute rounded-full bg-violet-500/6 blur-[80px]"
        style={{
          width: "280px",
          height: "280px",
          top: "40%",
          left: "8%",
          animation: "floatBlob3 10s ease-in-out infinite",
          transform: `translate(${mousePosition.x * 0.4}px, ${mousePosition.y * 0.4}px)`,
        }}
      />
      <div
        className="absolute rounded-full bg-primary/8 blur-[90px]"
        style={{
          width: "380px",
          height: "380px",
          top: "50%",
          right: "10%",
          animation: "floatBlob1 14s ease-in-out infinite",
          animationDelay: "3s",
          transform: `translate(${-mousePosition.x * 0.25}px, ${-mousePosition.y * 0.25}px)`,
        }}
      />
      <div
        className="absolute rounded-full bg-emerald-500/5 blur-[110px]"
        style={{
          width: "420px",
          height: "420px",
          bottom: "10%",
          left: "15%",
          animation: "floatBlob2 18s ease-in-out infinite",
          animationDelay: "5s",
          transform: `translate(${mousePosition.x * 0.15}px, ${mousePosition.y * 0.15}px)`,
        }}
      />
      <div
        className="absolute rounded-full bg-cyan-400/7 blur-[70px]"
        style={{
          width: "220px",
          height: "220px",
          bottom: "25%",
          right: "20%",
          animation: "floatBlob3 11s ease-in-out infinite",
          animationDelay: "2s",
          transform: `translate(${-mousePosition.x * 0.35}px, ${-mousePosition.y * 0.35}px)`,
        }}
      />

      {/* Varied particles */}
      <div
        className="absolute w-1.5 h-1.5 rounded-full bg-primary/30"
        style={{ top: "20%", left: "25%", animation: "floatParticle1 5s ease-in-out infinite" }}
      />
      <div
        className="absolute w-2 h-2 rounded-full bg-cyan-400/25"
        style={{ top: "35%", right: "30%", animation: "floatParticle2 7s ease-in-out infinite", animationDelay: "1s" }}
      />
      <div
        className="absolute w-1 h-1 rounded-full bg-violet-400/35"
        style={{ top: "55%", left: "40%", animation: "floatParticle1 6s ease-in-out infinite", animationDelay: "2s" }}
      />
      <div
        className="absolute w-2.5 h-2.5 rounded-full bg-primary/20"
        style={{ top: "70%", right: "15%", animation: "floatParticle2 8s ease-in-out infinite", animationDelay: "0.5s" }}
      />
      <div
        className="absolute w-1.5 h-1.5 rounded-full bg-emerald-400/25"
        style={{ bottom: "20%", left: "20%", animation: "floatParticle1 5.5s ease-in-out infinite", animationDelay: "3s" }}
      />

      {/* Glowing orbs - varied */}
      <div
        className="absolute w-3 h-3 rounded-full bg-primary/35 shadow-[0_0_20px_8px_hsl(var(--primary)/0.25)]"
        style={{ top: "25%", right: "18%", animation: "pulseGlow1 3s ease-in-out infinite" }}
      />
      <div
        className="absolute w-2 h-2 rounded-full bg-cyan-400/30 shadow-[0_0_15px_5px_rgba(34,211,238,0.2)]"
        style={{ top: "60%", left: "12%", animation: "pulseGlow2 4s ease-in-out infinite", animationDelay: "1.5s" }}
      />
      <div
        className="absolute w-2.5 h-2.5 rounded-full bg-violet-400/25 shadow-[0_0_12px_4px_rgba(167,139,250,0.15)]"
        style={{ bottom: "35%", right: "28%", animation: "pulseGlow1 3.5s ease-in-out infinite", animationDelay: "2.5s" }}
      />
    </div>
  );
};

export default FloatingElements;
