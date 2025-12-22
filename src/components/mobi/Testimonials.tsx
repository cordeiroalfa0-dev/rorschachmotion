import { useState, useEffect } from "react";
import { Quote, ChevronLeft, ChevronRight, Star } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const Testimonials = () => {
  const headerAnimation = useScrollAnimation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const testimonials = [
    {
      id: 1,
      name: "Carlos Eduardo Silva",
      role: "CEO",
      company: "TechFlow Solutions",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&q=80",
      content:
        "A Rorschach Motion transformou completamente nossa operação. O sistema ERP que desenvolveram aumentou nossa produtividade em 40%. Equipe extremamente profissional e comprometida.",
      rating: 5,
    },
    {
      id: 2,
      name: "Ana Paula Mendes",
      role: "Diretora de TI",
      company: "Grupo Innovare",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&q=80",
      content:
        "Trabalhamos com a Rorschach em 3 projetos diferentes e todos superaram nossas expectativas. A qualidade do código e o suporte pós-entrega são impecáveis.",
      rating: 5,
    },
    {
      id: 3,
      name: "Roberto Nakamura",
      role: "Founder",
      company: "StartupX",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&q=80",
      content:
        "Nosso app de delivery foi desenvolvido em tempo recorde sem comprometer a qualidade. A equipe entendeu perfeitamente nossa visão e entregou além do esperado.",
      rating: 5,
    },
    {
      id: 4,
      name: "Mariana Costa",
      role: "Product Manager",
      company: "FinBank Digital",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&q=80",
      content:
        "A plataforma financeira desenvolvida pela Rorschach Motion é robusta, segura e escalável. Recomendo fortemente para projetos que exigem alta qualidade.",
      rating: 5,
    },
  ];

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, testimonials.length]);

  const goToPrevious = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToNext = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  return (
    <section className="section-padding bg-secondary/50 backdrop-blur-sm relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 grid-pattern opacity-10" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[150px]" />

      <div className="container-custom relative z-10">
        {/* Section header */}
        <div
          ref={headerAnimation.ref}
          className={`text-center mb-16 transition-all duration-700 ${
            headerAnimation.isVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
          }`}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <Quote size={16} className="text-primary" />
            <span className="text-primary font-medium text-sm tracking-wide">
              Depoimentos
            </span>
          </div>
          <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            O que nossos <span className="text-gradient">clientes dizem</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
            A satisfação dos nossos clientes é o nosso maior orgulho.
            Veja o que eles têm a dizer sobre nosso trabalho.
          </p>
        </div>

        {/* Testimonial carousel */}
        <div className="relative max-w-4xl mx-auto">
          {/* Main testimonial */}
          <div className="glass-dark border-gradient rounded-2xl sm:rounded-3xl p-5 sm:p-8 md:p-12 text-center relative overflow-hidden">
            {/* Quote decoration */}
            <Quote
              size={120}
              className="absolute top-4 left-4 text-primary/5"
            />

            {/* Content */}
            <div className="relative z-10">
              {/* Stars */}
              <div className="flex justify-center gap-1 mb-6">
                {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                  <Star
                    key={i}
                    size={20}
                    className="text-yellow-500 fill-yellow-500"
                  />
                ))}
              </div>

              {/* Text */}
              <p className="text-foreground text-base sm:text-lg md:text-xl leading-relaxed mb-6 sm:mb-8 max-w-2xl mx-auto">
                "{testimonials[currentIndex].content}"
              </p>

              {/* Author */}
              <div className="flex flex-col items-center">
                <img
                  src={testimonials[currentIndex].image}
                  alt={testimonials[currentIndex].name}
                  className="w-16 h-16 rounded-full object-cover border-2 border-primary/30 mb-4"
                />
                <h4 className="font-heading font-bold text-foreground">
                  {testimonials[currentIndex].name}
                </h4>
                <p className="text-muted-foreground text-sm">
                  {testimonials[currentIndex].role} •{" "}
                  {testimonials[currentIndex].company}
                </p>
              </div>
            </div>
          </div>

          {/* Navigation buttons */}
          <div className="flex justify-center items-center gap-4 mt-8">
            <button
              onClick={goToPrevious}
              className="w-12 h-12 rounded-full glass-dark flex items-center justify-center hover:bg-primary/20 transition-colors duration-300 group"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="text-foreground group-hover:text-primary transition-colors duration-300" size={20} />
            </button>

            {/* Dots */}
            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setIsAutoPlaying(false);
                    setCurrentIndex(index);
                  }}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? "bg-primary w-6"
                      : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>

            <button
              onClick={goToNext}
              className="w-12 h-12 rounded-full glass-dark flex items-center justify-center hover:bg-primary/20 transition-colors duration-300 group"
              aria-label="Next testimonial"
            >
              <ChevronRight className="text-foreground group-hover:text-primary transition-colors duration-300" size={20} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
