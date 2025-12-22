import { useState, useEffect } from "react";
import { Menu, X, Phone, Mail, Github, Linkedin, Twitter } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Início", href: "#inicio" },
    { name: "Sobre", href: "#sobre" },
    { name: "Serviços", href: "#servicos" },
    { name: "Projetos", href: "#projetos" },
    { name: "Blog", href: "/blog", isRoute: true },
    { name: "Contato", href: "#contato" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-background/20 backdrop-blur-sm border-b border-border/20"
          : "bg-transparent"
      }`}
    >
      {/* Top bar */}
      <div
        className={`hidden md:block transition-all duration-500 ${
          isScrolled ? "h-0 opacity-0 overflow-hidden" : "h-auto opacity-100"
        }`}
      >
        <div className="container-custom flex justify-between items-center py-2.5 text-sm border-b border-border/10">
          <div className="flex items-center gap-6 text-muted-foreground">
            <a
              href="tel:+5541997539084"
              className="flex items-center gap-2 hover:text-primary transition-colors duration-300"
            >
              <Phone size={14} className="text-primary" />
              (41) 99753-9084
            </a>
            <a
              href="mailto:contato@rorschachmotion.com"
              className="flex items-center gap-2 hover:text-primary transition-colors duration-300"
            >
              <Mail size={14} className="text-primary" />
              contato@rorschachmotion.com
            </a>
          </div>
          <div className="flex items-center gap-3">
            {[
              { icon: Github, href: "#" },
              { icon: Linkedin, href: "#" },
              { icon: Twitter, href: "#" },
            ].map((social, index) => (
              <a
                key={index}
                href={social.href}
                className="w-8 h-8 rounded-lg flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all duration-300"
              >
                <social.icon size={15} />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="container-custom">
        <nav className="flex items-center justify-between py-4">
          {/* Logo */}
          <a href="#inicio" className="flex items-center gap-3 group">
            <div className="w-11 h-11 bg-gradient-to-br from-primary to-cyan-400 rounded-xl flex items-center justify-center shadow-glow transition-transform duration-300 group-hover:scale-105">
              <span className="text-primary-foreground font-heading font-bold text-xl">
                R
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-foreground font-heading font-bold text-lg tracking-tight leading-none">
                RORSCHACH
              </span>
              <span className="text-primary font-heading font-semibold text-sm tracking-widest">
                MOTION
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              link.isRoute ? (
                <Link
                  key={link.name}
                  to={link.href}
                  className="relative px-4 py-2 text-foreground/80 hover:text-foreground font-medium transition-colors duration-300 line-reveal"
                >
                  {link.name}
                </Link>
              ) : (
                <a
                  key={link.name}
                  href={link.href}
                  className="relative px-4 py-2 text-foreground/80 hover:text-foreground font-medium transition-colors duration-300 line-reveal"
                >
                  {link.name}
                </a>
              )
            ))}
            <Button 
              className="ml-4 btn-premium text-primary-foreground font-semibold px-6 rounded-xl shadow-glow hover:shadow-glow-lg transition-all duration-300"
              onClick={() => {
                document.getElementById('contato')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              <span>Solicite um Orçamento</span>
            </Button>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden w-10 h-10 flex items-center justify-center text-foreground rounded-lg hover:bg-muted transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </nav>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden absolute left-4 right-4 top-full mt-3 menu-surface shadow-lg animate-fade-in z-50 rounded-xl overflow-hidden">
            <div className="grid grid-cols-3 gap-px bg-white/5 p-1">
              {navLinks.map((link) =>
                link.isRoute ? (
                  <Link
                    key={link.name}
                    to={link.href}
                    className="px-3 py-2 text-xs font-medium text-white/90 hover:text-primary hover:bg-white/10 rounded-lg transition-colors text-center"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                ) : (
                  <a
                    key={link.name}
                    href={link.href}
                    className="px-3 py-2 text-xs font-medium text-white/90 hover:text-primary hover:bg-white/10 rounded-lg transition-colors text-center"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.name}
                  </a>
                )
              )}
            </div>

            <div className="border-t border-white/10 px-2 py-1.5 flex items-center justify-center">
              <Button 
                className="btn-premium text-primary-foreground font-medium rounded-lg py-1.5 px-4 text-xs h-auto w-full"
                onClick={() => {
                  document.getElementById('contato')?.scrollIntoView({ behavior: 'smooth' });
                  setIsMenuOpen(false);
                }}
              >
                Orçamento
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
