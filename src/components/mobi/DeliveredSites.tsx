import { useState } from "react";
import { Globe, Rocket, Star, Quote, ChevronLeft, ChevronRight, ExternalLink, X } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Button } from "@/components/ui/button";

const DeliveredSites = () => {
  const headerAnimation = useScrollAnimation();
  const gridAnimation = useScrollAnimation();
  const testimonialsAnimation = useScrollAnimation();
  const [activeTab, setActiveTab] = useState<"sites" | "landing">("sites");
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [selectedImage, setSelectedImage] = useState<{ image: string; name: string } | null>(null);

  const sites = [
    { name: "Pizzaria Bella Napoli", niche: "Alimentação", city: "SP", image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=300&q=80" },
    { name: "Advocacia Silva", niche: "Jurídico", city: "RJ", image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=300&q=80" },
    { name: "Odonto Sorriso", niche: "Saúde", city: "MG", image: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=300&q=80" },
    { name: "Imobiliária Casa Nova", niche: "Imobiliário", city: "PR", image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=300&q=80" },
    { name: "Academia Força Total", niche: "Fitness", city: "RS", image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=300&q=80" },
    { name: "Pet Shop Amigo Fiel", niche: "Pet", city: "BA", image: "https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?w=300&q=80" },
    { name: "Salão Beleza Pura", niche: "Beleza", city: "PE", image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=300&q=80" },
    { name: "Auto Center", niche: "Automotivo", city: "DF", image: "https://images.unsplash.com/photo-1625047509248-ec889cbff17f?w=300&q=80" },
    { name: "Sabor do Mar", niche: "Gastronomia", city: "SC", image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=300&q=80" },
    { name: "Boutique Elegância", niche: "Moda", city: "CE", image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=300&q=80" },
    { name: "Padaria Pão Quente", niche: "Alimentação", city: "GO", image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=300&q=80" },
    { name: "Escola Infantil", niche: "Educação", city: "AM", image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=300&q=80" },
  ];

  const landingPages = [
    { name: "Marketing Digital Pro", niche: "Educação", conversao: "12.5%", image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=300&q=80" },
    { name: "E-book Receitas Fit", niche: "Saúde", conversao: "18.2%", image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=300&q=80" },
    { name: "Consultoria Financeira", niche: "Finanças", conversao: "9.8%", image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=300&q=80" },
    { name: "Fluent English", niche: "Idiomas", conversao: "14.3%", image: "https://images.unsplash.com/photo-1543165796-5426273eaab3?w=300&q=80" },
    { name: "Plano Saúde Premium", niche: "Saúde", conversao: "7.6%", image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=300&q=80" },
    { name: "Solar Energy Brasil", niche: "Energia", conversao: "11.2%", image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=300&q=80" },
    { name: "Franquia Açaí", niche: "Franquias", conversao: "8.9%", image: "https://images.unsplash.com/photo-1590301157890-4810ed352733?w=300&q=80" },
    { name: "Masterclass Confeitaria", niche: "Gastronomia", conversao: "15.7%", image: "https://images.unsplash.com/photo-1486427944544-d2c6e9c7f7f4?w=300&q=80" },
    { name: "Consórcio Auto Fácil", niche: "Automotivo", conversao: "6.4%", image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=300&q=80" },
    { name: "App DeliveryJá", niche: "Tecnologia", conversao: "13.1%", image: "https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?w=300&q=80" },
    { name: "Curso de Maquiagem", niche: "Beleza", conversao: "16.8%", image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=300&q=80" },
    { name: "Investimento Fácil", niche: "Finanças", conversao: "10.5%", image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=300&q=80" },
  ];

  const testimonials = [
    {
      name: "Carlos Eduardo Silva",
      role: "CEO, Pizzaria Bella Napoli",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80",
      text: "O site ficou incrível! Nossas vendas online aumentaram 340% nos primeiros 3 meses. A equipe da Rorschach Motion entendeu exatamente o que precisávamos.",
      rating: 5,
    },
    {
      name: "Dra. Fernanda Costa",
      role: "Diretora, Clínica Odonto Sorriso",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80",
      text: "Profissionalismo do início ao fim. O sistema de agendamento online reduziu 70% das ligações e os pacientes adoraram a praticidade.",
      rating: 5,
    },
    {
      name: "Roberto Mendes",
      role: "Proprietário, Auto Center Velocidade",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80",
      text: "Melhor investimento que fiz para minha oficina. O site trouxe clientes de toda a região e o suporte técnico é excepcional.",
      rating: 5,
    },
    {
      name: "Ana Paula Rodrigues",
      role: "Fundadora, Boutique Elegância",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80",
      text: "A landing page converteu além das expectativas! Taxa de 18% de conversão no primeiro mês. Recomendo demais!",
      rating: 5,
    },
    {
      name: "Dr. Marcelo Oliveira",
      role: "Sócio, Advocacia Silva & Associados",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&q=80",
      text: "Site elegante e profissional que transmite a credibilidade que nosso escritório precisa. Recebemos elogios de todos os clientes.",
      rating: 5,
    },
  ];

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="section-padding bg-secondary/50 backdrop-blur-sm relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 grid-pattern opacity-10" />
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[150px]" />
      <div className="absolute bottom-1/4 left-0 w-[400px] h-[400px] bg-cyan-500/10 rounded-full blur-[120px]" />

      <div className="container-custom relative z-10">
        {/* Section header */}
        <div
          ref={headerAnimation.ref}
          className={`text-center mb-12 transition-all duration-700 ${
            headerAnimation.isVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
          }`}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-primary mb-6">
            <Rocket size={16} className="text-primary" />
            <span className="text-primary font-medium text-sm tracking-wide">
              Portfólio Completo
            </span>
          </div>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Sites <span className="text-gradient">Entregues</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed mb-8">
            Mais de 200 projetos entregues para empresas de todo o Brasil.
            Confira alguns dos nossos trabalhos mais recentes.
          </p>

          {/* Tabs */}
          <div className="inline-flex glass-primary rounded-full p-1.5 gap-1">
            <button
              onClick={() => setActiveTab("sites")}
              className={`px-6 py-2.5 rounded-full font-semibold text-sm transition-all duration-300 ${
                activeTab === "sites"
                  ? "bg-primary text-primary-foreground shadow-glow"
                  : "text-foreground hover:text-primary"
              }`}
            >
              <Globe size={16} className="inline mr-2" />
              Sites Institucionais
            </button>
            <button
              onClick={() => setActiveTab("landing")}
              className={`px-6 py-2.5 rounded-full font-semibold text-sm transition-all duration-300 ${
                activeTab === "landing"
                  ? "bg-primary text-primary-foreground shadow-glow"
                  : "text-foreground hover:text-primary"
              }`}
            >
              <Rocket size={16} className="inline mr-2" />
              Landing Pages
            </button>
          </div>
        </div>

        {/* Sites Grid - 4 columns */}
        <div
          ref={gridAnimation.ref}
          className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-16"
        >
          {(activeTab === "sites" ? sites : landingPages).map((item, index) => (
            <div
              key={item.name}
              onClick={() => setSelectedImage({ image: item.image, name: item.name })}
              className={`group glass-primary-strong rounded-xl overflow-hidden card-hover transition-all duration-500 cursor-pointer ${
                gridAnimation.isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: `${index * 40}ms` }}
            >
              {/* Image */}
              <div className="aspect-video overflow-hidden relative">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-secondary via-secondary/40 to-transparent" />
                
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-secondary/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-9 h-9 rounded-full bg-primary/50 flex items-center justify-center border border-primary/60 shadow-glow">
                    <ExternalLink className="text-foreground" size={16} />
                  </div>
                </div>

                {/* Badge */}
                <div className="absolute top-2 left-2">
                  <span className="px-1.5 py-0.5 rounded-full glass-primary text-[10px] font-semibold text-primary">
                    {item.niche}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-2.5">
                <h3 className="font-heading font-bold text-foreground text-xs mb-0.5 group-hover:text-primary transition-colors duration-300 line-clamp-1">
                  {item.name}
                </h3>
                <p className="text-muted-foreground text-[10px]">
                  {"city" in item ? item.city : `Conv: ${item.conversao}`}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Testimonials */}
        <div
          ref={testimonialsAnimation.ref}
          className={`transition-all duration-700 ${
            testimonialsAnimation.isVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
          }`}
        >
          <div className="text-center mb-8">
            <h3 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-4">
              O que nossos <span className="text-gradient">clientes</span> dizem
            </h3>
          </div>

          {/* Testimonial Card */}
          <div className="max-w-3xl mx-auto glass-primary border-glow rounded-3xl p-8 md:p-10 relative">
            <Quote className="absolute top-6 left-6 text-primary/20" size={48} />
            
            <div className="relative z-10">
              <p className="text-foreground text-lg md:text-xl leading-relaxed mb-8 italic">
                "{testimonials[currentTestimonial].text}"
              </p>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <img
                    src={testimonials[currentTestimonial].avatar}
                    alt={testimonials[currentTestimonial].name}
                    className="w-14 h-14 rounded-full object-cover border-2 border-primary/50"
                  />
                  <div>
                    <h4 className="font-heading font-bold text-foreground">
                      {testimonials[currentTestimonial].name}
                    </h4>
                    <p className="text-muted-foreground text-sm">
                      {testimonials[currentTestimonial].role}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                    <Star key={i} size={18} className="text-yellow-500 fill-yellow-500" />
                  ))}
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-center gap-4 mt-8">
              <Button
                variant="outline"
                size="icon"
                onClick={prevTestimonial}
                className="rounded-full border-primary/50 hover:bg-primary hover:text-primary-foreground"
              >
                <ChevronLeft size={20} />
              </Button>
              
              <div className="flex gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentTestimonial(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === currentTestimonial
                        ? "w-6 bg-primary"
                        : "bg-primary/30 hover:bg-primary/50"
                    }`}
                  />
                ))}
              </div>

              <Button
                variant="outline"
                size="icon"
                onClick={nextTestimonial}
                className="rounded-full border-primary/50 hover:bg-primary hover:text-primary-foreground"
              >
                <ChevronRight size={20} />
              </Button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
            {[
              { value: "200+", label: "Sites Entregues" },
              { value: "98%", label: "Clientes Satisfeitos" },
              { value: "15%", label: "Taxa Média Conversão" },
              { value: "4.9", label: "Avaliação Google" },
            ].map((stat, index) => (
              <div
                key={stat.label}
                className="glass-primary-strong rounded-2xl p-6 text-center card-hover"
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <p className="font-heading text-3xl md:text-4xl font-bold text-gradient mb-2">
                  {stat.value}
                </p>
                <p className="text-muted-foreground text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Image Modal */}
        {selectedImage && (
          <div 
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in"
            onClick={() => setSelectedImage(null)}
          >
            <div 
              className="relative bg-black/50 p-2 rounded-xl animate-scale-in max-w-lg"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute -top-2 right-2 z-[110] w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center text-white hover:bg-purple-600 transition-colors shadow-lg"
              >
                <X size={16} />
              </button>
              <img 
                src={selectedImage.image.replace('w=300', 'w=600')} 
                alt={selectedImage.name}
                className="w-auto h-auto max-h-[60vh] max-w-full object-contain rounded-lg"
              />
              <p className="text-center text-white/80 mt-3 text-sm font-medium">
                {selectedImage.name}
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default DeliveredSites;
