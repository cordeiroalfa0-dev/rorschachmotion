import { useState } from "react";
import { ArrowRight, Globe, Smartphone, Layers, ExternalLink, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const Projects = () => {
  const headerAnimation = useScrollAnimation();
  const gridAnimation = useScrollAnimation();
  const [selectedImage, setSelectedImage] = useState<{ image: string; title: string } | null>(null);

  const projects = [
    {
      id: 1,
      title: "Tefilin - Sistema de Gestão para Igrejas",
      client: "Igreja Assembleia de Deus",
      type: "Web App",
      image: "/images/project-tefilin.png",
      status: "Entregue",
      link: "https://wonder-stack.lovable.app/auth",
    },
    {
      id: 2,
      title: "Pizzaria Tatuquara",
      client: "Pizzaria Tatuquara",
      type: "Web App",
      image: "/images/project-pizzaria-tatuquara.png",
      status: "Entregue",
      link: "https://pizza-perfect-clone.vercel.app",
    },
    {
      id: 3,
      title: "AgendaPro - Agendamento Inteligente",
      client: "Salões, Barbearias e Clínicas",
      type: "Web App",
      image: "/images/project-agendaglas.png",
      status: "Entregue",
      link: "https://agendaglas.lovable.app",
    },
    {
      id: 4,
      title: "Sistema ERP Completo",
      client: "Indústria Têxtil",
      type: "Web App",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80",
      status: "Entregue",
    },
    {
      id: 5,
      title: "App de Delivery",
      client: "Rede de Restaurantes",
      type: "Mobile App",
      image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&q=80",
      status: "Entregue",
    },
    {
      id: 6,
      title: "Plataforma E-commerce",
      client: "Loja de Moda",
      type: "Web App",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&q=80",
      status: "Em andamento",
    },
    {
      id: 7,
      title: "Sistema de Gestão Escolar",
      client: "Rede de Ensino",
      type: "Web App",
      image: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=600&q=80",
      status: "Entregue",
    },
    {
      id: 8,
      title: "App Financeiro",
      client: "Fintech",
      type: "Mobile App",
      image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=600&q=80",
      status: "Lançamento",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Entregue":
        return "bg-emerald-500/20 text-emerald-400 border-emerald-500/30";
      case "Em andamento":
        return "bg-primary/20 text-primary border-primary/30";
      case "Lançamento":
        return "bg-violet-500/20 text-violet-400 border-violet-500/30";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const handleProjectClick = (e: React.MouseEvent, link?: string) => {
    if (link) {
      e.stopPropagation();
      window.open(link, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <section id="projetos" className="section-padding bg-secondary/50 backdrop-blur-sm relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 grid-pattern opacity-15" />
      <div className="absolute top-1/2 -translate-y-1/2 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[150px] animate-pulse" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-[120px]" />
      <div className="absolute top-0 left-1/3 w-64 h-64 bg-primary/5 rounded-full blur-[100px]" />

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
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-primary mb-6">
            <Layers size={16} className="text-primary" />
            <span className="text-primary font-medium text-sm tracking-wide">
              Nossos Projetos
            </span>
          </div>
          <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Soluções que <span className="text-gradient">transformam</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
            Conheça alguns dos sistemas e aplicações que desenvolvemos com
            excelência, sempre superando as expectativas dos nossos clientes.
          </p>
        </div>

        {/* Projects grid */}
        <div ref={gridAnimation.ref} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className={`group glass-dark rounded-xl sm:rounded-2xl overflow-hidden card-hover card-shine border-glow transition-all duration-500 ${
                gridAnimation.isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              {/* Image */}
              <div 
                className="aspect-[4/3] overflow-hidden relative cursor-pointer"
                onClick={() => setSelectedImage({ image: project.image, title: project.title })}
              >
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-secondary via-secondary/30 to-transparent" />
                <div className="absolute top-4 right-4">
                  <span
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold border backdrop-blur-md shadow-lg ${getStatusColor(
                      project.status
                    )}`}
                  >
                    {project.status}
                  </span>
                </div>
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-primary/20 via-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                  <div className="w-14 h-14 rounded-full bg-primary/30 backdrop-blur-md flex items-center justify-center border border-primary/40 scale-0 group-hover:scale-100 transition-transform duration-500 shadow-glow">
                    <ExternalLink className="text-foreground" size={22} />
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-4 sm:p-6">
                <h3 className="font-heading text-base sm:text-xl font-bold text-foreground mb-2 sm:mb-3 group-hover:text-primary transition-colors duration-300">
                  {project.title}
                </h3>
                <div className="flex flex-col gap-1 sm:gap-2 mb-3 sm:mb-5">
                  <div className="flex items-center gap-2 text-muted-foreground text-xs sm:text-sm">
                    <Globe size={12} className="text-primary/70 sm:w-3.5 sm:h-3.5" />
                    {project.client}
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground text-xs sm:text-sm">
                    <Smartphone size={12} className="text-primary/70 sm:w-3.5 sm:h-3.5" />
                    {project.type}
                  </div>
                </div>
                {project.link ? (
                  <button 
                    onClick={(e) => handleProjectClick(e, project.link)}
                    className="inline-flex items-center gap-2 text-primary font-semibold text-sm group/btn hover:underline relative z-20"
                  >
                    Ver projeto
                    <ExternalLink
                      size={16}
                      className="group-hover/btn:translate-x-1 transition-transform duration-300"
                    />
                  </button>
                ) : (
                  <button className="flex items-center gap-2 text-primary font-semibold text-sm group/btn">
                    Ver detalhes
                    <ArrowRight
                      size={16}
                      className="group-hover/btn:translate-x-1 transition-transform duration-300"
                    />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div
          className={`text-center mt-16 transition-all duration-700 delay-500 ${
            gridAnimation.isVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
          }`}
        >
          <Button
            size="lg"
            className="btn-premium text-primary-foreground font-semibold text-lg px-10 h-14 rounded-xl shadow-glow hover:shadow-glow-lg transition-all duration-300 group"
          >
            <span className="flex items-center gap-2">
              Ver Todos os Projetos
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform duration-300" />
            </span>
          </Button>
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
                src={selectedImage.image.replace('w=600', 'w=800')} 
                alt={selectedImage.title}
                className="w-auto h-auto max-h-[60vh] max-w-full object-contain rounded-lg"
              />
              <p className="text-center text-white/80 mt-3 text-sm font-medium">
                {selectedImage.title}
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;