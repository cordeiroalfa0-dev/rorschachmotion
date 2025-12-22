import { Github, Linkedin, Twitter, Users2 } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const Team = () => {
  const headerAnimation = useScrollAnimation();
  const gridAnimation = useScrollAnimation();

  const team = [
    {
      name: "Emerson Cordeiro",
      role: "CEO & Founder",
      image: "/images/emerson-cordeiro.jpeg",
      bio: "Fundador e visionário por trás da Rorschach Motion. Apaixonado por tecnologia e inovação.",
      social: { linkedin: "#", github: "#", twitter: "#" },
    },
  ];

  return (
    <section className="section-padding bg-secondary/50 backdrop-blur-sm relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 grid-pattern opacity-10" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[150px]" />

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
            <Users2 size={16} className="text-primary" />
            <span className="text-primary font-medium text-sm tracking-wide">
              Nossa Equipe
            </span>
          </div>
          <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Quem faz a <span className="text-gradient">mágica acontecer</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
            Uma equipe apaixonada por tecnologia e comprometida com a excelência
            em cada projeto.
          </p>
        </div>

        {/* Team grid */}
        <div ref={gridAnimation.ref} className="flex justify-center">
          {team.map((member, index) => (
            <div
              key={member.name}
              className={`group glass-dark border-gradient rounded-2xl overflow-hidden card-hover transition-all duration-500 w-full max-w-sm ${
                gridAnimation.isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              {/* Image */}
              <div className="aspect-[3/4] overflow-hidden relative">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-secondary via-transparent to-transparent" />
                
                {/* Social links overlay */}
                <div className="absolute inset-0 bg-secondary/70 backdrop-blur-sm flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {[
                    { icon: Linkedin, href: member.social.linkedin },
                    { icon: Github, href: member.social.github },
                    { icon: Twitter, href: member.social.twitter },
                  ].map((social, i) => (
                    <a
                      key={i}
                      href={social.href}
                      className="w-10 h-10 rounded-full bg-primary-foreground/20 flex items-center justify-center hover:bg-primary-foreground/40 transition-colors duration-300"
                    >
                      <social.icon size={18} className="text-primary-foreground" />
                    </a>
                  ))}
                </div>
              </div>

              {/* Content */}
              <div className="p-5 text-center">
                <h3 className="font-heading font-bold text-foreground mb-1 group-hover:text-primary transition-colors duration-300">
                  {member.name}
                </h3>
                <p className="text-primary text-sm font-medium mb-2">
                  {member.role}
                </p>
                <p className="text-muted-foreground text-xs leading-relaxed">
                  {member.bio}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;
