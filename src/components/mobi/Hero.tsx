import { ArrowRight, Code2, Users, Rocket, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useCountAnimation } from "@/hooks/useCountAnimation";

const StatCard = ({
  icon: Icon,
  value,
  label,
  index,
}: {
  icon: typeof Code2;
  value: number;
  label: string;
  index: number;
}) => {
  const { count, ref } = useCountAnimation({ end: value, duration: 2500 });

  return (
    <div
      ref={ref}
      className="glass-dark rounded-2xl p-6 flex items-center gap-5 card-hover card-shine animate-fade-up group border-glow"
      style={{ animationDelay: `${(index + 3) * 100}ms` }}
    >
      <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary/25 to-cyan-500/25 flex items-center justify-center border border-primary/30 group-hover:scale-110 group-hover:border-primary/50 group-hover:shadow-glow transition-all duration-500">
        <Icon className="text-primary group-hover:drop-shadow-[0_0_8px_hsl(var(--primary))]" size={28} />
      </div>
      <div>
        <p className="font-heading text-4xl font-bold text-foreground group-hover:text-gradient transition-all duration-300">
          {count}+
        </p>
        <p className="text-muted-foreground font-medium">{label}</p>
      </div>
    </div>
  );
};

const MobileStatCard = ({
  value,
  label,
  index,
}: {
  value: number;
  label: string;
  index: number;
}) => {
  const { count, ref } = useCountAnimation({ end: value, duration: 2500 });

  return (
    <div
      ref={ref}
      className="glass-dark rounded-xl p-4 text-center animate-fade-up"
      style={{ animationDelay: `${(index + 4) * 100}ms` }}
    >
      <p className="font-heading text-2xl font-bold text-gradient">{count}+</p>
      <p className="text-muted-foreground text-xs mt-1">{label}</p>
    </div>
  );
};

const Hero = () => {
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

  const stats = [
    { icon: Code2, value: 80, label: "Sistemas Entregues" },
    { icon: Users, value: 200, label: "Clientes Ativos" },
    { icon: Rocket, value: 8, label: "Anos de Experiência" },
  ];

  return (
    <section
      id="inicio"
      className="relative min-h-screen flex items-center justify-center pt-20 pb-16 px-4 sm:pt-24 overflow-hidden"
    >
      {/* Animated Background Effects */}
      <div className="absolute inset-0 grid-pattern opacity-20" />
      <div
        className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-primary/15 rounded-full blur-[180px]"
        style={{
          transform: `translate(${mousePosition.x * 1.5}px, ${mousePosition.y * 1.5}px)`,
          transition: "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      />
      <div
        className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[150px]"
        style={{
          transform: `translate(${-mousePosition.x * 1.2}px, ${-mousePosition.y * 1.2}px)`,
          transition: "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[200px] animate-pulse" />

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-primary/40 rounded-full"
            style={{
              left: `${15 + i * 15}%`,
              top: `${20 + (i % 3) * 25}%`,
              animation: `float ${4 + i}s ease-in-out infinite`,
              animationDelay: `${i * 0.5}s`,
            }}
          />
        ))}
      </div>

      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full glass-primary mt-8 sm:mt-12 mb-6 sm:mb-8 animate-fade-up shadow-inner shadow-primary/5">
              <Sparkles size={14} className="text-primary animate-pulse drop-shadow-[0_0_4px_hsl(var(--primary))] sm:w-4 sm:h-4" />
              <span className="text-primary font-semibold text-xs sm:text-sm tracking-wide">
                Desenvolvimento de Sistemas
              </span>
            </div>

            <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-foreground mb-6 sm:mb-8 leading-[1.1] animate-fade-up animation-delay-100 text-shadow-sm">
              Transformamos suas{" "}
              <span className="text-gradient glow-text relative">
                ideias
                <svg
                  className="absolute -bottom-2 left-0 w-full"
                  viewBox="0 0 200 8"
                  fill="none"
                >
                  <path
                    d="M2 6C50 2 150 2 198 6"
                    stroke="hsl(var(--primary))"
                    strokeWidth="3"
                    strokeLinecap="round"
                    className="animate-draw-line drop-shadow-[0_0_8px_hsl(var(--primary))]"
                  />
                </svg>
              </span>{" "}
              em{" "}
              <span className="text-gradient glow-text">soluções digitais</span>
            </h1>

            <p className="text-muted-foreground text-base sm:text-lg md:text-xl mb-8 sm:mb-10 max-w-xl mx-auto lg:mx-0 leading-relaxed animate-fade-up animation-delay-200">
              Somos especialistas em criar sistemas personalizados, aplicações
              web e mobile que impulsionam o seu negócio para o próximo nível.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start animate-fade-up animation-delay-300">
              <Button
                size="lg"
                className="btn-premium text-primary-foreground font-semibold text-sm sm:text-lg px-6 sm:px-8 h-12 sm:h-14 rounded-xl shadow-glow hover:shadow-glow-lg transition-all duration-300 group"
                onClick={() => {
                  document.getElementById('projetos')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                <span className="flex items-center gap-2">
                  Conheça Nossos Projetos
                  <ArrowRight
                    size={18}
                    className="group-hover:translate-x-1 transition-transform duration-300 sm:w-5 sm:h-5"
                  />
                </span>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-primary/50 text-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary font-semibold text-sm sm:text-lg px-6 sm:px-8 h-12 sm:h-14 rounded-xl transition-all duration-300 backdrop-blur-sm"
                onClick={() => {
                  document.getElementById('contato')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Fale Conosco
              </Button>
            </div>
          </div>

          {/* Stats */}
          <div className="hidden lg:flex flex-col gap-5">
            {stats.map((stat, index) => (
              <StatCard
                key={index}
                icon={stat.icon}
                value={stat.value}
                label={stat.label}
                index={index}
              />
            ))}
          </div>
        </div>

        {/* Mobile stats */}
        <div className="grid grid-cols-3 gap-2 sm:gap-4 mt-12 sm:mt-16 lg:hidden">
          {stats.map((stat, index) => (
            <MobileStatCard
              key={index}
              value={stat.value}
              label={stat.label}
              index={index}
            />
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 sm:bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 hidden sm:flex">
        <span className="text-muted-foreground text-xs uppercase tracking-widest">
          Scroll
        </span>
        <div className="w-7 h-12 border-2 border-primary/50 rounded-full flex justify-center pt-2 hover:border-primary transition-colors duration-300">
          <div className="w-1.5 h-3 bg-primary rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
