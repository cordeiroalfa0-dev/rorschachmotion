import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Calendar, User, ArrowLeft, Tag, Clock, Share2, 
  Facebook, Twitter, Linkedin, Copy, Check,
  ChevronRight, BookOpen, ArrowRight
} from 'lucide-react';
import Header from '@/components/mobi/Header';
import Footer from '@/components/mobi/Footer';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import SEOHead from '@/components/SEOHead';

type BlogPostData = {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string | null;
  cover_image: string | null;
  category: string;
  tags: string[];
  published_at: string | null;
  created_at: string;
  author: {
    name: string | null;
    avatar_url: string | null;
  };
};

// Demo posts for when database is empty
const demoPosts: BlogPostData[] = [
  {
    id: '1',
    title: 'Como criar um site moderno em 2024',
    slug: 'como-criar-site-moderno-2024',
    excerpt: 'Descubra as melhores práticas e tecnologias para desenvolver websites que impressionam e convertem visitantes em clientes.',
    content: `<h2>Introdução</h2><p>Neste artigo completo, vamos explorar as principais tendências de design e desenvolvimento web para 2024. Desde a escolha das tecnologias certas até a implementação de experiências de usuário memoráveis, você aprenderá tudo o que precisa saber para criar sites que se destacam no mercado digital.</p><h2>Tecnologias Modernas</h2><p>React, Vue e Next.js estão entre as ferramentas mais populares para desenvolvimento frontend. Cada uma tem suas vantagens e casos de uso específicos.</p><h2>Design Responsivo</h2><p>Com a variedade de dispositivos disponíveis hoje, é essencial que seu site funcione perfeitamente em todas as telas.</p><h2>Performance</h2><p>A velocidade de carregamento é crucial para a experiência do usuário e SEO. Otimize imagens, use lazy loading e minimize o JavaScript.</p><h2>Conclusão</h2><p>Criar um site moderno requer atenção a diversos aspectos técnicos e de design. Com as ferramentas e práticas corretas, você pode criar experiências digitais impressionantes.</p>`,
    cover_image: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800',
    category: 'Desenvolvimento Web',
    tags: ['web', 'design', 'frontend'],
    published_at: '2024-01-15',
    created_at: '2024-01-15',
    author: { name: 'Emerson Cordeiro', avatar_url: '/images/emerson-cordeiro.jpeg' }
  },
  {
    id: '2',
    title: 'React vs Vue: Qual escolher para seu projeto?',
    slug: 'react-vs-vue-qual-escolher',
    excerpt: 'Uma análise completa das duas frameworks mais populares do mercado para ajudar na sua decisão.',
    content: `<h2>React vs Vue</h2><p>React e Vue são duas das bibliotecas/frameworks mais populares para desenvolvimento frontend. Neste artigo, analisamos as principais diferenças, vantagens e desvantagens de cada uma para diferentes tipos de projetos.</p><h2>React</h2><p>Desenvolvido pelo Facebook, React é uma biblioteca JavaScript para construção de interfaces de usuário. É altamente flexível e possui um ecossistema gigantesco.</p><h2>Vue</h2><p>Vue é um framework progressivo que pode ser adotado incrementalmente. É conhecido por sua curva de aprendizado suave e documentação excelente.</p><h2>Quando usar cada um?</h2><p>React é ideal para projetos grandes e complexos, enquanto Vue brilha em projetos menores ou quando você precisa de prototipagem rápida.</p>`,
    cover_image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800',
    category: 'Desenvolvimento Web',
    tags: ['react', 'vue', 'javascript'],
    published_at: '2024-01-12',
    created_at: '2024-01-12',
    author: { name: 'Mobi Creative', avatar_url: null }
  },
  {
    id: '3',
    title: 'Inteligência Artificial no desenvolvimento de software',
    slug: 'ia-desenvolvimento-software',
    excerpt: 'Como a IA está revolucionando a forma como criamos aplicações e automatizamos processos.',
    content: `<h2>A Revolução da IA</h2><p>A inteligência artificial está transformando o desenvolvimento de software de maneiras que poucos imaginavam possível há alguns anos. Ferramentas de IA generativa, assistentes de código e automação de testes são apenas o começo dessa revolução.</p><h2>Ferramentas de IA para Desenvolvedores</h2><p>GitHub Copilot, ChatGPT e outras ferramentas estão mudando a forma como escrevemos código.</p><h2>O Futuro</h2><p>À medida que a IA evolui, podemos esperar ainda mais automação e assistência no processo de desenvolvimento.</p>`,
    cover_image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800',
    category: 'Inteligência Artificial',
    tags: ['ia', 'automação', 'futuro'],
    published_at: '2024-01-10',
    created_at: '2024-01-10',
    author: { name: 'Emerson Cordeiro', avatar_url: '/images/emerson-cordeiro.jpeg' }
  },
  {
    id: '4',
    title: 'UX Design: Princípios essenciais para iniciantes',
    slug: 'ux-design-principios-essenciais',
    excerpt: 'Aprenda os fundamentos do design de experiência do usuário e como aplicá-los em seus projetos.',
    content: `<h2>O que é UX Design?</h2><p>O UX Design é fundamental para criar produtos digitais que os usuários amam. Neste guia, cobrimos os princípios essenciais que todo designer e desenvolvedor deve conhecer.</p><h2>Princípios Fundamentais</h2><p>Usabilidade, acessibilidade, consistência e feedback são pilares do bom design de experiência.</p><h2>Pesquisa com Usuários</h2><p>Entender seu público é o primeiro passo para criar experiências memoráveis.</p>`,
    cover_image: 'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=800',
    category: 'Design',
    tags: ['ux', 'design', 'usabilidade'],
    published_at: '2024-01-08',
    created_at: '2024-01-08',
    author: { name: 'Mobi Creative', avatar_url: null }
  },
  {
    id: '5',
    title: 'SEO em 2024: O que realmente funciona',
    slug: 'seo-2024-o-que-funciona',
    excerpt: 'Estratégias comprovadas de SEO para melhorar o ranking do seu site nos mecanismos de busca.',
    content: `<h2>SEO Moderno</h2><p>O SEO continua evoluindo, e o que funcionava há alguns anos pode não ser mais eficaz. Descubra as estratégias mais recentes e eficazes.</p><h2>Conteúdo de Qualidade</h2><p>O Google prioriza conteúdo útil e relevante para os usuários.</p><h2>Core Web Vitals</h2><p>Performance e experiência do usuário são fatores de ranking importantes.</p>`,
    cover_image: 'https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=800',
    category: 'Marketing Digital',
    tags: ['seo', 'marketing', 'google'],
    published_at: '2024-01-05',
    created_at: '2024-01-05',
    author: { name: 'Emerson Cordeiro', avatar_url: '/images/emerson-cordeiro.jpeg' }
  },
  {
    id: '6',
    title: 'Criando APIs RESTful com Node.js',
    slug: 'apis-restful-nodejs',
    excerpt: 'Um guia prático para desenvolver APIs robustas e escaláveis usando Node.js e Express.',
    content: `<h2>APIs RESTful</h2><p>APIs são a espinha dorsal das aplicações modernas. Aprenda a criar APIs RESTful profissionais usando Node.js.</p><h2>Express.js</h2><p>O Express é o framework mais popular para criar APIs em Node.js.</p><h2>Boas Práticas</h2><p>Versionamento, tratamento de erros e documentação são essenciais.</p>`,
    cover_image: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=800',
    category: 'Backend',
    tags: ['nodejs', 'api', 'backend'],
    published_at: '2024-01-03',
    created_at: '2024-01-03',
    author: { name: 'Mobi Creative', avatar_url: null }
  },
  {
    id: '7',
    title: 'Segurança em aplicações web: Guia completo',
    slug: 'seguranca-aplicacoes-web',
    excerpt: 'Proteja suas aplicações contra as principais vulnerabilidades e ataques cibernéticos.',
    content: `<h2>Segurança Web</h2><p>A segurança é uma das maiores preocupações no desenvolvimento web. Este guia aborda as principais vulnerabilidades.</p><h2>SQL Injection</h2><p>Use queries parametrizadas para evitar injeção de SQL.</p><h2>XSS e CSRF</h2><p>Sanitize inputs e use tokens CSRF para proteger seus usuários.</p>`,
    cover_image: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=800',
    category: 'Segurança',
    tags: ['segurança', 'web', 'hacking'],
    published_at: '2024-01-01',
    created_at: '2024-01-01',
    author: { name: 'Emerson Cordeiro', avatar_url: '/images/emerson-cordeiro.jpeg' }
  },
  {
    id: '8',
    title: 'Tailwind CSS: Por que você deveria usar',
    slug: 'tailwind-css-por-que-usar',
    excerpt: 'Descubra como o Tailwind CSS pode acelerar seu desenvolvimento e melhorar a manutenção do código.',
    content: `<h2>Tailwind CSS</h2><p>O Tailwind CSS revolucionou a forma como escrevemos CSS. Neste artigo, exploramos suas vantagens.</p><h2>Utility-First</h2><p>A abordagem utility-first permite desenvolvimento rápido e consistente.</p><h2>Customização</h2><p>O Tailwind é altamente customizável através do arquivo de configuração.</p>`,
    cover_image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800',
    category: 'Desenvolvimento Web',
    tags: ['css', 'tailwind', 'frontend'],
    published_at: '2023-12-28',
    created_at: '2023-12-28',
    author: { name: 'Mobi Creative', avatar_url: null }
  },
  {
    id: '9',
    title: 'TypeScript para desenvolvedores JavaScript',
    slug: 'typescript-para-desenvolvedores-javascript',
    excerpt: 'Faça a transição do JavaScript para TypeScript e melhore a qualidade do seu código.',
    content: `<h2>Por que TypeScript?</h2><p>TypeScript adiciona tipagem estática ao JavaScript, trazendo benefícios enormes para a manutenção.</p><h2>Tipos Básicos</h2><p>Aprenda sobre string, number, boolean, array e outros tipos.</p><h2>Interfaces</h2><p>Use interfaces para definir contratos e estruturas de dados.</p>`,
    cover_image: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800',
    category: 'Desenvolvimento Web',
    tags: ['typescript', 'javascript', 'programação'],
    published_at: '2023-12-25',
    created_at: '2023-12-25',
    author: { name: 'Emerson Cordeiro', avatar_url: '/images/emerson-cordeiro.jpeg' }
  },
  {
    id: '10',
    title: 'E-commerce: Tendências para 2024',
    slug: 'ecommerce-tendencias-2024',
    excerpt: 'As principais tendências de e-commerce que vão dominar o mercado neste ano.',
    content: `<h2>O Futuro do E-commerce</h2><p>O comércio eletrônico está em constante evolução. Descubra as tendências que estão moldando o futuro.</p><h2>Personalização com IA</h2><p>Recomendações personalizadas aumentam conversões.</p><h2>Experiências Imersivas</h2><p>AR e VR estão transformando a experiência de compra.</p>`,
    cover_image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800',
    category: 'E-commerce',
    tags: ['ecommerce', 'vendas', 'tendências'],
    published_at: '2023-12-22',
    created_at: '2023-12-22',
    author: { name: 'Mobi Creative', avatar_url: null }
  },
  {
    id: '11',
    title: 'Acessibilidade web: Criando sites para todos',
    slug: 'acessibilidade-web-sites-para-todos',
    excerpt: 'Como tornar seu site acessível e inclusivo para pessoas com diferentes necessidades.',
    content: `<h2>Acessibilidade Digital</h2><p>A acessibilidade web não é apenas uma boa prática, é uma responsabilidade.</p><h2>WCAG</h2><p>As diretrizes WCAG fornecem um padrão internacional para acessibilidade.</p><h2>Implementação</h2><p>Use alt text em imagens, navegação por teclado e contraste adequado.</p>`,
    cover_image: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?w=800',
    category: 'Desenvolvimento Web',
    tags: ['acessibilidade', 'inclusão', 'web'],
    published_at: '2023-12-20',
    created_at: '2023-12-20',
    author: { name: 'Emerson Cordeiro', avatar_url: '/images/emerson-cordeiro.jpeg' }
  },
  {
    id: '12',
    title: 'Performance web: Otimizando seu site',
    slug: 'performance-web-otimizando-site',
    excerpt: 'Técnicas avançadas para melhorar a velocidade e performance do seu website.',
    content: `<h2>Por que Performance Importa</h2><p>Um site rápido é essencial para a experiência do usuário e SEO. Sites lentos perdem visitantes e vendas.</p><h2>Lazy Loading</h2><p>Carregue imagens e recursos apenas quando necessário para acelerar o carregamento inicial.</p><h2>Compressão de Imagens</h2><p>Use formatos modernos como WebP e ferramentas de compressão para reduzir o tamanho dos arquivos.</p><h2>CDN</h2><p>Distribua seu conteúdo globalmente para reduzir latência.</p><h2>Minificação</h2><p>Minifique CSS, JavaScript e HTML para reduzir o tamanho dos arquivos.</p><h2>Conclusão</h2><p>Otimizar a performance é um processo contínuo que traz benefícios significativos para seus usuários e negócio.</p>`,
    cover_image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800',
    category: 'Desenvolvimento Web',
    tags: ['performance', 'otimização', 'velocidade'],
    published_at: '2023-12-18',
    created_at: '2023-12-18',
    author: { name: 'Mobi Creative', avatar_url: null }
  }
];

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const { toast } = useToast();
  const [post, setPost] = useState<BlogPostData | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<BlogPostData[]>([]);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const [readProgress, setReadProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const article = document.getElementById('article-content');
      if (!article) return;
      
      const rect = article.getBoundingClientRect();
      const articleTop = window.scrollY + rect.top;
      const articleHeight = rect.height;
      const scrolled = window.scrollY - articleTop + window.innerHeight * 0.3;
      const progress = Math.min(Math.max((scrolled / articleHeight) * 100, 0), 100);
      setReadProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [post]);

  useEffect(() => {
    const fetchPost = async () => {
      if (!slug) return;
      
      // First try to fetch from database
      const { data, error } = await supabase
        .from('blog_posts')
        .select(`
          id,
          title,
          slug,
          content,
          excerpt,
          cover_image,
          category,
          tags,
          published_at,
          created_at,
          profiles:author_id (
            name,
            avatar_url
          )
        `)
        .eq('slug', slug)
        .eq('published', true)
        .maybeSingle();

      if (!error && data) {
        const postData = {
          ...data,
          author: (data as any).profiles
        };
        setPost(postData);
        
        // Fetch related posts from database
        const { data: related } = await supabase
          .from('blog_posts')
          .select(`
            id,
            title,
            slug,
            excerpt,
            cover_image,
            category,
            tags,
            published_at,
            created_at,
            profiles:author_id (
              name,
              avatar_url
            )
          `)
          .eq('published', true)
          .eq('category', data.category)
          .neq('id', data.id)
          .limit(3);

        if (related) {
          setRelatedPosts(related.map((p: any) => ({ ...p, author: p.profiles, content: '' })));
        }
      } else {
        // Fallback to demo posts
        const demoPost = demoPosts.find(p => p.slug === slug);
        if (demoPost) {
          setPost(demoPost);
          // Get related demo posts
          const related = demoPosts
            .filter(p => p.category === demoPost.category && p.id !== demoPost.id)
            .slice(0, 3);
          setRelatedPosts(related);
        }
      }
      setLoading(false);
    };

    fetchPost();
    window.scrollTo(0, 0);
  }, [slug]);

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
  };

  const calculateReadTime = (content: string) => {
    const wordsPerMinute = 200;
    const words = content?.replace(/<[^>]*>/g, '').split(/\s+/).length || 0;
    const minutes = Math.ceil(words / wordsPerMinute);
    return minutes;
  };

  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';
  
  const shareOnFacebook = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`, '_blank');
  };

  const shareOnTwitter = () => {
    window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(post?.title || '')}`, '_blank');
  };

  const shareOnLinkedin = () => {
    window.open(`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(post?.title || '')}`, '_blank');
  };

  const copyLink = async () => {
    await navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    toast({ title: 'Link copiado!' });
    setTimeout(() => setCopied(false), 2000);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <Header />
        <main className="pt-32 pb-20">
          <div className="container-custom max-w-4xl">
            <div className="animate-pulse space-y-6">
              <div className="h-8 bg-secondary/50 rounded w-1/3" />
              <div className="h-12 bg-secondary/50 rounded w-full" />
              <div className="h-64 bg-secondary/50 rounded" />
              <div className="space-y-3">
                <div className="h-4 bg-secondary/50 rounded w-full" />
                <div className="h-4 bg-secondary/50 rounded w-5/6" />
                <div className="h-4 bg-secondary/50 rounded w-4/6" />
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <Header />
        <main className="pt-32 pb-20">
          <div className="container-custom max-w-4xl text-center">
            <div className="w-20 h-20 rounded-full bg-secondary/50 flex items-center justify-center mx-auto mb-6">
              <BookOpen className="w-10 h-10 text-muted-foreground" />
            </div>
            <h1 className="text-3xl font-bold mb-4">Artigo não encontrado</h1>
            <p className="text-muted-foreground mb-8">
              O artigo que você está procurando não existe ou foi removido.
            </p>
            <Link to="/blog">
              <Button className="gap-2">
                <ArrowLeft size={16} />
                Voltar ao Blog
              </Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const readTime = calculateReadTime(post.content);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* SEO Meta Tags for Social Media */}
      <SEOHead
        title={post.title}
        description={post.excerpt || post.content.replace(/<[^>]*>/g, '').substring(0, 160)}
        image={post.cover_image}
        url={shareUrl}
        type="article"
        author={post.author?.name || 'Rorschach Motion'}
        publishedTime={post.published_at || post.created_at}
        tags={post.tags}
      />

      {/* Reading Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-1 z-[100] bg-secondary/30">
        <div
          className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-150"
          style={{ width: `${readProgress}%` }}
        />
      </div>

      <Header />
      
      <main className="pt-32 pb-20">
        <article className="container-custom">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8 max-w-4xl mx-auto">
            <Link to="/" className="hover:text-primary transition-colors">
              Home
            </Link>
            <ChevronRight size={14} />
            <Link to="/blog" className="hover:text-primary transition-colors">
              Blog
            </Link>
            <ChevronRight size={14} />
            <span className="text-foreground truncate max-w-[200px]">{post.title}</span>
          </nav>

          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <header className="mb-8">
              <div className="flex items-center gap-3 text-sm text-muted-foreground mb-4 flex-wrap">
                <Link 
                  to={`/blog?category=${post.category}`}
                  className="px-3 py-1 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
                >
                  {post.category}
                </Link>
                <span className="flex items-center gap-1">
                  <Calendar size={14} />
                  {formatDate(post.published_at || post.created_at)}
                </span>
                <span className="flex items-center gap-1">
                  <Clock size={14} />
                  {readTime} min de leitura
                </span>
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
                {post.title}
              </h1>
              {post.excerpt && (
                <p className="text-xl text-muted-foreground leading-relaxed">
                  {post.excerpt}
                </p>
              )}

              {/* Author & Share */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-8 pt-6 border-t border-border">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                    {post.author?.avatar_url ? (
                      <img 
                        src={post.author.avatar_url} 
                        alt={post.author.name || 'Autor'} 
                        className="w-full h-full rounded-full object-cover"
                      />
                    ) : (
                      <User size={20} className="text-primary-foreground" />
                    )}
                  </div>
                  <div>
                    <p className="font-semibold">{post.author?.name || 'Mobi Creative'}</p>
                    <p className="text-sm text-muted-foreground">Autor</p>
                  </div>
                </div>

                {/* Share Buttons */}
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground mr-2 flex items-center gap-1">
                    <Share2 size={14} />
                    Compartilhar:
                  </span>
                  <button
                    onClick={shareOnFacebook}
                    className="w-9 h-9 rounded-full bg-secondary hover:bg-blue-600 hover:text-white flex items-center justify-center transition-all"
                    title="Compartilhar no Facebook"
                  >
                    <Facebook size={16} />
                  </button>
                  <button
                    onClick={shareOnTwitter}
                    className="w-9 h-9 rounded-full bg-secondary hover:bg-black hover:text-white flex items-center justify-center transition-all"
                    title="Compartilhar no Twitter"
                  >
                    <Twitter size={16} />
                  </button>
                  <button
                    onClick={shareOnLinkedin}
                    className="w-9 h-9 rounded-full bg-secondary hover:bg-blue-700 hover:text-white flex items-center justify-center transition-all"
                    title="Compartilhar no LinkedIn"
                  >
                    <Linkedin size={16} />
                  </button>
                  <button
                    onClick={copyLink}
                    className="w-9 h-9 rounded-full bg-secondary hover:bg-primary hover:text-primary-foreground flex items-center justify-center transition-all"
                    title="Copiar link"
                  >
                    {copied ? <Check size={16} /> : <Copy size={16} />}
                  </button>
                </div>
              </div>
            </header>

            {/* Cover Image */}
            {post.cover_image && (
              <div className="aspect-video rounded-2xl overflow-hidden mb-10 shadow-lg">
                <img
                  src={post.cover_image}
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            {/* Content */}
            <div 
              id="article-content"
              className="prose prose-lg dark:prose-invert max-w-none prose-headings:font-bold prose-a:text-primary prose-img:rounded-xl"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className="mt-12 pt-8 border-t border-border">
                <div className="flex items-center gap-3 flex-wrap">
                  <Tag size={18} className="text-muted-foreground" />
                  {post.tags.map((tag, idx) => (
                    <Link
                      key={idx}
                      to={`/blog?tag=${tag}`}
                      className="px-4 py-1.5 rounded-full bg-secondary hover:bg-primary/20 hover:text-primary text-sm transition-all"
                    >
                      #{tag}
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Author Bio */}
            <div className="mt-12 p-6 md:p-8 glass-card rounded-2xl">
              <div className="flex flex-col sm:flex-row gap-6">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center flex-shrink-0">
                  {post.author?.avatar_url ? (
                    <img 
                      src={post.author.avatar_url} 
                      alt={post.author.name || 'Autor'} 
                      className="w-full h-full rounded-2xl object-cover"
                    />
                  ) : (
                    <User size={32} className="text-primary-foreground" />
                  )}
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Escrito por</p>
                  <h3 className="text-xl font-bold mb-2">{post.author?.name || 'Mobi Creative'}</h3>
                  <p className="text-muted-foreground">
                    Especialista em desenvolvimento web e mobile. Apaixonado por criar soluções 
                    digitais que transformam negócios e melhoram a vida das pessoas.
                  </p>
                </div>
              </div>
            </div>

            {/* Share CTA */}
            <div className="mt-12 p-8 rounded-2xl bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20 text-center">
              <h3 className="text-xl font-bold mb-2">Gostou do artigo?</h3>
              <p className="text-muted-foreground mb-4">
                Compartilhe com seus amigos e colegas!
              </p>
              <div className="flex items-center justify-center gap-3">
                <button
                  onClick={shareOnFacebook}
                  className="px-4 py-2 rounded-lg bg-blue-600 text-white flex items-center gap-2 hover:bg-blue-700 transition-colors"
                >
                  <Facebook size={18} />
                  Facebook
                </button>
                <button
                  onClick={shareOnTwitter}
                  className="px-4 py-2 rounded-lg bg-black text-white flex items-center gap-2 hover:bg-gray-800 transition-colors"
                >
                  <Twitter size={18} />
                  Twitter
                </button>
                <button
                  onClick={shareOnLinkedin}
                  className="px-4 py-2 rounded-lg bg-blue-700 text-white flex items-center gap-2 hover:bg-blue-800 transition-colors"
                >
                  <Linkedin size={18} />
                  LinkedIn
                </button>
              </div>
            </div>
          </div>

          {/* Related Posts */}
          {relatedPosts.length > 0 && (
            <div className="mt-20">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold">Artigos Relacionados</h2>
                <Link to="/blog" className="text-primary hover:underline flex items-center gap-1">
                  Ver todos <ArrowRight size={16} />
                </Link>
              </div>
              <div className="grid md:grid-cols-3 gap-8">
                {relatedPosts.map((relatedPost) => (
                  <Link
                    key={relatedPost.id}
                    to={`/blog/${relatedPost.slug}`}
                    className="group glass-card rounded-2xl overflow-hidden hover-lift"
                  >
                    <div className="aspect-video overflow-hidden bg-secondary">
                      {relatedPost.cover_image ? (
                        <img
                          src={relatedPost.cover_image}
                          alt={relatedPost.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/20 to-secondary">
                          <Tag className="w-10 h-10 text-primary/50" />
                        </div>
                      )}
                    </div>
                    <div className="p-5">
                      <span className="text-xs text-primary mb-2 block">{relatedPost.category}</span>
                      <h3 className="font-semibold line-clamp-2 group-hover:text-primary transition-colors">
                        {relatedPost.title}
                      </h3>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Back to Blog */}
          <div className="mt-16 text-center">
            <Link to="/blog">
              <Button variant="outline" size="lg" className="gap-2">
                <ArrowLeft size={18} />
                Voltar ao Blog
              </Button>
            </Link>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
};

export default BlogPost;
