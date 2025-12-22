import { useState } from "react";
import { CheckCircle, Target, Eye, Heart, Zap, GraduationCap, X } from "lucide-react";
import { useScrollAnimation, useStaggerAnimation } from "@/hooks/useScrollAnimation";
import diplomaImage from "@/assets/diploma-senai.png";

const About = () => {
  const [showDiploma, setShowDiploma] = useState(false);
  const headerAnimation = useScrollAnimation();
  const contentAnimation = useScrollAnimation();
  const valuesAnimation = useStaggerAnimation(4, 150);

  const features = [
    "Equipe de desenvolvedores experientes",
    "Metodologias ágeis (Scrum/Kanban)",
    "Código limpo e documentado",
    "Suporte técnico contínuo",
    "Entregas dentro do prazo",
    "Tecnologias modernas e escaláveis",
  ];

  const values = [
    {
      icon: Target,
      title: "Missão",
      description:
        "Desenvolver soluções tecnológicas inovadoras que transformem negócios e impulsionem resultados.",
    },
    {
      icon: Eye,
      title: "Visão",
      description:
        "Ser referência em desenvolvimento de sistemas, reconhecidos pela excelência técnica e inovação.",
    },
    {
      icon: Heart,
      title: "Valores",
      description:
        "Inovação, qualidade, transparência, comprometimento com o cliente e melhoria contínua.",
    },
    {
      icon: GraduationCap,
      title: "Formação",
      description:
        "Técnico em Desenvolvimento de Sistemas - SENAI Dr. Celso Charuri, Curitiba/PR.",
      isDiploma: true,
    },
  ];

  return (
    <section id="sobre" className="section-padding bg-background/50 backdrop-blur-sm relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/2 h-full dots-pattern opacity-40" />
      <div className="absolute top-1/2 -translate-y-1/2 -left-40 w-96 h-96 bg-primary/8 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-cyan-500/5 rounded-full blur-[100px]" />

      <div className="container-custom relative z-10">
        {/* Section header */}
        <div
          ref={headerAnimation.ref}
          className={`text-center mb-20 transition-all duration-700 ${
            headerAnimation.isVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
          }`}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-primary mb-6">
            <Zap size={16} className="text-primary" />
            <span className="text-primary font-medium text-sm tracking-wide">
              Sobre Nós
            </span>
          </div>
          <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Conheça a <span className="text-gradient">Rorschach Motion</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
            Há mais de 8 anos criando soluções digitais que transformam a forma
            como empresas operam e crescem no mercado.
          </p>
        </div>

        <div
          ref={contentAnimation.ref}
          className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center mb-12 sm:mb-20"
        >
          {/* Image */}
          <div
            className={`relative transition-all duration-700 delay-100 ${
              contentAnimation.isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-10"
            }`}
          >
            <div className="aspect-[4/3] rounded-3xl overflow-hidden border-gradient group card-shine">
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80"
                alt="Equipe Rorschach Motion"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </div>
            {/* Floating badge */}
            <div className="absolute -bottom-6 -right-6 glass-primary rounded-2xl p-6 shadow-card hidden md:block animate-pulse-glow">
              <p className="font-heading text-4xl font-bold text-gradient glow-text">8+</p>
              <p className="text-muted-foreground text-sm font-medium">
                Anos de experiência
              </p>
            </div>
            {/* Decorative element */}
            <div className="absolute -top-6 -left-6 w-20 h-20 border-2 border-primary/30 rounded-2xl hidden md:block animate-float" />
            <div className="absolute top-1/2 -left-3 w-6 h-6 bg-primary/30 rounded-full blur-sm hidden md:block" />
          </div>

          {/* Content */}
          <div
            className={`transition-all duration-700 delay-200 ${
              contentAnimation.isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-10"
            }`}
          >
            <h3 className="font-heading text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-4 sm:mb-6">
              Por que escolher a Rorschach Motion?
            </h3>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              Nossa equipe é formada por especialistas apaixonados por
              tecnologia. Cada projeto que desenvolvemos carrega nossa marca de
              qualidade, inovação e atenção aos detalhes.
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-3 rounded-xl hover:bg-muted/50 transition-all duration-300 group cursor-default"
                  style={{ transitionDelay: `${index * 50}ms` }}
                >
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300">
                    <CheckCircle className="text-primary" size={14} />
                  </div>
                  <span className="text-foreground text-sm font-medium">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Values */}
        <div ref={valuesAnimation.ref} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {values.map((value, index) => (
            <div
              key={index}
              onClick={() => (value as any).isDiploma && setShowDiploma(true)}
              className={`group glass border-gradient rounded-xl sm:rounded-2xl p-5 sm:p-8 text-center card-hover card-shine border-glow transition-all duration-500 ${
                (value as any).isDiploma ? 'cursor-pointer' : ''
              } ${
                valuesAnimation.isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
              style={valuesAnimation.getDelayClass(index)}
            >
              <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-primary/25 to-cyan-500/25 flex items-center justify-center border border-primary/30 group-hover:scale-110 group-hover:border-primary/50 group-hover:shadow-glow transition-all duration-500">
                <value.icon className="text-primary group-hover:drop-shadow-[0_0_8px_hsl(var(--primary))]" size={28} />
              </div>
              <h4 className="font-heading text-xl font-bold text-foreground mb-4 group-hover:text-gradient transition-all duration-300">
                {value.title}
              </h4>
              <p className="text-muted-foreground leading-relaxed text-sm">{value.description}</p>
              {(value as any).isDiploma && (
                <span className="inline-flex items-center gap-2 mt-4 px-4 py-2 bg-primary/20 text-primary font-semibold text-sm rounded-full hover:bg-primary/30 hover:scale-105 transition-all duration-300 animate-pulse">
                  <Eye size={16} />
                  Clique para ver o diploma
                </span>
              )}
            </div>
          ))}
        </div>

        {/* Diploma Modal */}
        {showDiploma && (
          <div 
            className="fixed inset-0 z-[100] flex items-end justify-center pb-12 pt-20 px-4 bg-black/25 animate-fade-in"
            onClick={() => setShowDiploma(false)}
          >
            <div 
              className="relative bg-black/40 backdrop-blur-sm p-2 rounded-xl animate-scale-in"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setShowDiploma(false)}
                className="absolute top-2 right-4 z-[110] w-7 h-7 rounded-full bg-background/90 flex items-center justify-center text-foreground hover:bg-background transition-colors shadow-lg"
              >
                <X size={14} />
              </button>
              <img 
                src={diplomaImage} 
                alt="Diploma SENAI - Técnico em Desenvolvimento de Sistemas"
                className="w-auto h-auto max-h-[85vh] max-w-[98vw] md:max-w-4xl object-contain rounded-lg"
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default About;
