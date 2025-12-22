import { HelpCircle } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ = () => {
  const headerAnimation = useScrollAnimation();

  const faqs = [
    {
      question: "Quanto tempo leva para desenvolver um sistema?",
      answer:
        "O prazo varia conforme a complexidade do projeto. Um MVP (Produto Mínimo Viável) pode levar de 4 a 8 semanas. Sistemas mais complexos podem levar de 3 a 6 meses. Fazemos uma análise detalhada antes de iniciar para definir prazos realistas.",
    },
    {
      question: "Qual o custo médio de um projeto?",
      answer:
        "O investimento depende do escopo, funcionalidades e tecnologias envolvidas. Trabalhamos com orçamentos personalizados após entender suas necessidades. Oferecemos também modelos de pagamento flexíveis e parcelamento.",
    },
    {
      question: "Vocês oferecem suporte após a entrega?",
      answer:
        "Sim! Todos os projetos incluem garantia de 90 dias para correção de bugs. Além disso, oferecemos planos de manutenção mensal que incluem suporte técnico, atualizações de segurança e pequenas melhorias.",
    },
    {
      question: "Quais tecnologias vocês utilizam?",
      answer:
        "Trabalhamos com as tecnologias mais modernas do mercado: React, Next.js, React Native, Node.js, TypeScript, PostgreSQL, MongoDB, AWS, entre outras. A escolha da stack é feita com base nas necessidades específicas de cada projeto.",
    },
    {
      question: "Como funciona o processo de desenvolvimento?",
      answer:
        "Seguimos metodologias ágeis (Scrum/Kanban). O processo inclui: Discovery (entendimento do problema), Design (prototipação), Desenvolvimento (sprints semanais com entregas parciais), Testes e Deploy. Você acompanha todo o progresso em tempo real.",
    },
    {
      question: "Vocês desenvolvem aplicativos mobile?",
      answer:
        "Sim! Desenvolvemos aplicativos para iOS e Android usando React Native ou Flutter, garantindo apps nativos de alta performance. Também criamos PWAs (Progressive Web Apps) que funcionam como aplicativos.",
    },
  ];

  return (
    <section className="section-padding bg-background/50 backdrop-blur-sm relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 dots-pattern opacity-30" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-primary/5 rounded-full blur-[100px]" />

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
            <HelpCircle size={16} className="text-primary" />
            <span className="text-primary font-medium text-sm tracking-wide">
              FAQ
            </span>
          </div>
          <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Perguntas <span className="text-gradient">Frequentes</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
            Tire suas dúvidas sobre nossos serviços, processos e formas de
            trabalho.
          </p>
        </div>

        {/* FAQ Accordion */}
        <Accordion
          type="single"
          collapsible
          defaultValue="item-0"
          className="max-w-3xl mx-auto space-y-4"
        >
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className={`glass border-gradient rounded-xl sm:rounded-2xl overflow-hidden transition-all duration-500 border-b-0 ${
                headerAnimation.isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: `${index * 75}ms` }}
            >
              <AccordionTrigger className="p-4 sm:p-6 text-left group hover:no-underline [&>svg]:text-primary [&>svg]:h-4 [&>svg]:w-4 sm:[&>svg]:h-5 sm:[&>svg]:w-5">
                <span className="font-heading font-semibold text-sm sm:text-base text-foreground pr-4 group-hover:text-primary transition-colors duration-300">
                  {faq.question}
                </span>
              </AccordionTrigger>
              <AccordionContent className="px-4 sm:px-6 pb-4 sm:pb-6 pt-0 text-sm sm:text-base text-muted-foreground leading-relaxed">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FAQ;

