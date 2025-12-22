import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { Calendar, Rocket, Users, Award, TrendingUp, Building } from 'lucide-react';

const Timeline = () => {
  const headerAnimation = useScrollAnimation();

  const milestones = [
    {
      year: '2016',
      title: 'Fundação',
      description: 'Início da Rorschach Motion como freelancer, desenvolvendo sites e sistemas para pequenas empresas.',
      icon: Rocket,
    },
    {
      year: '2018',
      title: 'Primeiro Grande Cliente',
      description: 'Fechamos nosso primeiro contrato corporativo, marcando a transição para projetos maiores.',
      icon: Building,
    },
    {
      year: '2019',
      title: 'Expansão da Equipe',
      description: 'Crescimento da equipe com a contratação de desenvolvedores especializados.',
      icon: Users,
    },
    {
      year: '2021',
      title: 'Certificação SENAI',
      description: 'Formação técnica em Desenvolvimento de Sistemas pelo SENAI Dr. Celso Charuri.',
      icon: Award,
    },
    {
      year: '2023',
      title: 'Marco de 50+ Projetos',
      description: 'Alcançamos a marca de mais de 50 sistemas entregues com sucesso.',
      icon: TrendingUp,
    },
    {
      year: '2024',
      title: 'Inovação Contínua',
      description: 'Adoção de IA e tecnologias de ponta para entregar soluções cada vez mais modernas.',
      icon: Calendar,
    },
  ];

  return (
    <section className="section-padding bg-secondary/30 backdrop-blur-sm relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 grid-pattern opacity-10" />
      <div className="absolute top-1/2 -translate-y-1/2 -right-40 w-96 h-96 bg-primary/5 rounded-full blur-[120px]" />

      <div className="container-custom relative z-10">
        {/* Section header */}
        <div
          ref={headerAnimation.ref}
          className={`text-center mb-16 transition-all duration-700 ${
            headerAnimation.isVisible
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-primary mb-6">
            <Calendar size={16} className="text-primary" />
            <span className="text-primary font-medium text-sm tracking-wide">
              Nossa Jornada
            </span>
          </div>
          <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            A História da <span className="text-gradient">Rorschach Motion</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Uma trajetória de crescimento, aprendizado e inovação constante.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Center line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary/50 via-primary to-primary/50 md:-translate-x-1/2" />

          {milestones.map((milestone, index) => {
            const isLeft = index % 2 === 0;
            
            return (
              <div
                key={index}
                className={`relative flex items-center mb-12 last:mb-0 ${
                  isLeft ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Content */}
                <div className={`ml-12 md:ml-0 md:w-1/2 ${isLeft ? 'md:pr-12 md:text-right' : 'md:pl-12'}`}>
                  <div 
                    className="glass border-gradient rounded-xl p-6 card-hover card-shine border-glow"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <span className="inline-block px-3 py-1 bg-primary/20 text-primary text-sm font-semibold rounded-full mb-3">
                      {milestone.year}
                    </span>
                    <h3 className="font-heading text-xl font-bold text-foreground mb-2">
                      {milestone.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {milestone.description}
                    </p>
                  </div>
                </div>

                {/* Icon */}
                <div className="absolute left-0 md:left-1/2 md:-translate-x-1/2 w-8 h-8 rounded-full bg-primary flex items-center justify-center shadow-glow z-10">
                  <milestone.icon size={16} className="text-primary-foreground" />
                </div>

                {/* Empty space for layout */}
                <div className="hidden md:block md:w-1/2" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Timeline;
