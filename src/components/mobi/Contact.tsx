import { useState } from "react";
import { Phone, Mail, MapPin, Clock, Send, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useSiteSettings } from "@/hooks/useSiteSettings";

const Contact = () => {
  const { toast } = useToast();
  const { settings } = useSiteSettings();
  const headerAnimation = useScrollAnimation();
  const formAnimation = useScrollAnimation();
  const infoAnimation = useScrollAnimation();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    await new Promise((resolve) => setTimeout(resolve, 1000));

    toast({
      title: "Mensagem enviada com sucesso!",
      description: "Entraremos em contato em breve.",
    });
    setFormData({ name: "", email: "", phone: "", message: "" });
    setIsSubmitting(false);
  };

  const contactInfo = [
    {
      icon: Phone,
      title: "Telefone",
      info: settings.phone,
      link: `tel:${settings.phone.replace(/\D/g, '')}`,
    },
    {
      icon: Mail,
      title: "E-mail",
      info: settings.email,
      link: `mailto:${settings.email}`,
    },
    {
      icon: MapPin,
      title: "Endereço",
      info: settings.address,
      link: "#",
    },
    {
      icon: Clock,
      title: "Horário",
      info: "Seg - Sex: 9h às 18h",
      link: "#",
    },
  ];

  return (
    <section id="contato" className="section-padding bg-background/50 backdrop-blur-sm relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute bottom-0 left-0 w-1/2 h-full dots-pattern opacity-40" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-primary/8 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-cyan-500/5 rounded-full blur-[100px]" />
      <div className="absolute top-0 right-1/3 w-48 h-48 bg-primary/5 rounded-full blur-[80px]" />

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
            <MessageSquare size={16} className="text-primary" />
            <span className="text-primary font-medium text-sm tracking-wide">
              Contato
            </span>
          </div>
          <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Fale <span className="text-gradient">Conosco</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
            Pronto para transformar sua ideia em realidade? Entre em contato e
            vamos desenvolver juntos a solução ideal para o seu negócio.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12">
          {/* Contact form */}
          <div
            ref={formAnimation.ref}
            className={`glass border-gradient rounded-2xl sm:rounded-3xl p-5 sm:p-8 md:p-10 card-shine border-glow transition-all duration-700 ${
              formAnimation.isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-10"
            }`}
          >
            <h3 className="font-heading text-2xl font-bold text-foreground mb-8 flex items-center gap-3">
              <span>Envie sua mensagem</span>
              <div className="h-px flex-1 bg-gradient-to-r from-primary/30 to-transparent" />
            </h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="relative">
                  <label
                    className={`text-sm font-medium mb-2 block transition-colors duration-300 ${
                      focusedField === "name" ? "text-primary" : "text-foreground"
                    }`}
                  >
                    Nome completo
                  </label>
                  <Input
                    placeholder="Seu nome"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    onFocus={() => setFocusedField("name")}
                    onBlur={() => setFocusedField(null)}
                    required
                    className="h-12 bg-muted/50 border-border/50 rounded-xl focus:border-primary focus:ring-primary/20 transition-all duration-300"
                  />
                </div>
                <div className="relative">
                  <label
                    className={`text-sm font-medium mb-2 block transition-colors duration-300 ${
                      focusedField === "email" ? "text-primary" : "text-foreground"
                    }`}
                  >
                    E-mail
                  </label>
                  <Input
                    type="email"
                    placeholder="seu@email.com"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    onFocus={() => setFocusedField("email")}
                    onBlur={() => setFocusedField(null)}
                    required
                    className="h-12 bg-muted/50 border-border/50 rounded-xl focus:border-primary focus:ring-primary/20 transition-all duration-300"
                  />
                </div>
              </div>
              <div>
                <label
                  className={`text-sm font-medium mb-2 block transition-colors duration-300 ${
                    focusedField === "phone" ? "text-primary" : "text-foreground"
                  }`}
                >
                  Telefone
                </label>
                <Input
                  placeholder="(11) 99999-9999"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  onFocus={() => setFocusedField("phone")}
                  onBlur={() => setFocusedField(null)}
                  className="h-12 bg-muted/50 border-border/50 rounded-xl focus:border-primary focus:ring-primary/20 transition-all duration-300"
                />
              </div>
              <div>
                <label
                  className={`text-sm font-medium mb-2 block transition-colors duration-300 ${
                    focusedField === "message" ? "text-primary" : "text-foreground"
                  }`}
                >
                  Mensagem
                </label>
                <Textarea
                  placeholder="Descreva seu projeto ou necessidade..."
                  rows={4}
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  onFocus={() => setFocusedField("message")}
                  onBlur={() => setFocusedField(null)}
                  required
                  className="bg-muted/50 border-border/50 rounded-xl resize-none focus:border-primary focus:ring-primary/20 transition-all duration-300"
                />
              </div>
              <Button
                type="submit"
                size="lg"
                disabled={isSubmitting}
                className="w-full btn-premium text-primary-foreground font-semibold h-14 rounded-xl shadow-glow hover:shadow-glow-lg transition-all duration-300 group"
              >
                <span className="flex items-center gap-2">
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                      Enviando...
                    </>
                  ) : (
                    <>
                      Enviar Mensagem
                      <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                    </>
                  )}
                </span>
              </Button>
            </form>
          </div>

          {/* Contact info */}
          <div
            ref={infoAnimation.ref}
            className={`transition-all duration-700 delay-200 ${
              infoAnimation.isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-10"
            }`}
          >
            <h3 className="font-heading text-2xl font-bold text-foreground mb-8 flex items-center gap-3">
              <span>Informações de contato</span>
              <div className="h-px flex-1 bg-gradient-to-r from-primary/30 to-transparent" />
            </h3>
            <div className="space-y-4 mb-10">
              {contactInfo.map((item, index) => (
                <a
                  key={index}
                  href={item.link}
                  className="flex items-center gap-4 p-4 rounded-2xl hover:bg-muted/50 transition-all duration-300 group border border-transparent hover:border-primary/20 hover-lift"
                  style={{ transitionDelay: `${index * 50}ms` }}
                >
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/25 to-cyan-500/25 flex items-center justify-center border border-primary/25 group-hover:scale-110 group-hover:border-primary/50 group-hover:shadow-glow transition-all duration-300">
                    <item.icon className="text-primary group-hover:drop-shadow-[0_0_6px_hsl(var(--primary))]" size={22} />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">{item.title}</p>
                    <p className="text-foreground font-semibold group-hover:text-primary transition-colors duration-300">
                      {item.info}
                    </p>
                  </div>
                </a>
              ))}
            </div>

            {/* Map */}
            <div className="aspect-video rounded-2xl overflow-hidden border border-border/50 group shadow-elevated">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3657.1976517594613!2d-46.65390692374868!3d-23.56190776123698!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce59c8da0aa315%3A0xd59f9431f2c9776a!2sAv.%20Paulista%2C%20S%C3%A3o%20Paulo%20-%20SP!5e0!3m2!1spt-BR!2sbr!4v1702000000000!5m2!1spt-BR!2sbr"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Localização Rorschach Motion"
                className="grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
