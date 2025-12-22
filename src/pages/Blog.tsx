import React, { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { 
  Calendar, User, ArrowRight, Tag, ArrowLeft, Home, 
  Search, Clock, TrendingUp, Bookmark, Filter, X,
  ChevronRight, Mail
} from 'lucide-react';
import Header from '@/components/mobi/Header';
import Footer from '@/components/mobi/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
type BlogPost = {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
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

const Blog = () => {
  const { toast } = useToast();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [email, setEmail] = useState('');
  const [subscribing, setSubscribing] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      const { data, error } = await supabase
        .from('blog_posts')
        .select(`
          id,
          title,
          slug,
          excerpt,
          content,
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
        .order('published_at', { ascending: false });

      if (!error && data) {
        const formatted = data.map((post: any) => ({
          ...post,
          author: post.profiles
        }));
        setPosts(formatted);
      }
      setLoading(false);
    };

    fetchPosts();
  }, []);

  // Get unique categories and tags
  const categories = useMemo(() => {
    const cats = posts.map(p => p.category);
    return [...new Set(cats)];
  }, [posts]);

  const allTags = useMemo(() => {
    const tags = posts.flatMap(p => p.tags || []);
    return [...new Set(tags)];
  }, [posts]);

  // Filter posts
  const filteredPosts = useMemo(() => {
    return posts.filter(post => {
      const matchesSearch = searchTerm === '' || 
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.excerpt?.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = !selectedCategory || post.category === selectedCategory;
      const matchesTag = !selectedTag || post.tags?.includes(selectedTag);
      
      return matchesSearch && matchesCategory && matchesTag;
    });
  }, [posts, searchTerm, selectedCategory, selectedTag]);

  // Featured post (most recent)
  const featuredPost = posts[0];
  const regularPosts = filteredPosts.slice(selectedCategory || selectedTag || searchTerm ? 0 : 1);

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  const calculateReadTime = (content: string) => {
    const wordsPerMinute = 200;
    const words = content?.replace(/<[^>]*>/g, '').split(/\s+/).length || 0;
    const minutes = Math.ceil(words / wordsPerMinute);
    return `${minutes} min de leitura`;
  };

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setSubscribing(true);
    // Simulate subscription (you can integrate with a real service)
    await new Promise(resolve => setTimeout(resolve, 1000));
    toast({ title: 'Inscrito com sucesso!', description: 'Você receberá nossas novidades por email.' });
    setEmail('');
    setSubscribing(false);
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory(null);
    setSelectedTag(null);
  };

  const hasActiveFilters = searchTerm || selectedCategory || selectedTag;

  // Sample demo posts when database is empty
  const demoPosts: BlogPost[] = [
    {
      id: '1',
      title: 'Como criar um site moderno em 2024',
      slug: 'como-criar-site-moderno-2024',
      excerpt: 'Descubra as melhores práticas e tecnologias para desenvolver websites que impressionam e convertem visitantes em clientes.',
      content: 'Neste artigo completo, vamos explorar as principais tendências de design e desenvolvimento web para 2024. Desde a escolha das tecnologias certas até a implementação de experiências de usuário memoráveis, você aprenderá tudo o que precisa saber para criar sites que se destacam no mercado digital.',
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
      content: 'React e Vue são duas das bibliotecas/frameworks mais populares para desenvolvimento frontend. Neste artigo, analisamos as principais diferenças, vantagens e desvantagens de cada uma para diferentes tipos de projetos.',
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
      content: 'A inteligência artificial está transformando o desenvolvimento de software de maneiras que poucos imaginavam possível há alguns anos. Ferramentas de IA generativa, assistentes de código e automação de testes são apenas o começo dessa revolução.',
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
      content: 'O UX Design é fundamental para criar produtos digitais que os usuários amam. Neste guia, cobrimos os princípios essenciais que todo designer e desenvolvedor deve conhecer para criar experiências memoráveis.',
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
      content: 'O SEO continua evoluindo, e o que funcionava há alguns anos pode não ser mais eficaz. Descubra as estratégias mais recentes e eficazes para posicionar seu site nas primeiras páginas do Google.',
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
      content: 'APIs são a espinha dorsal das aplicações modernas. Aprenda a criar APIs RESTful profissionais usando Node.js, desde a estruturação do projeto até a implementação de autenticação e documentação.',
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
      content: 'A segurança é uma das maiores preocupações no desenvolvimento web. Este guia aborda as principais vulnerabilidades como SQL Injection, XSS, CSRF e como proteger suas aplicações contra elas.',
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
      content: 'O Tailwind CSS revolucionou a forma como escrevemos CSS. Neste artigo, exploramos suas vantagens, casos de uso e dicas para aproveitar ao máximo essa ferramenta poderosa.',
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
      content: 'TypeScript adiciona tipagem estática ao JavaScript, trazendo benefícios enormes para a manutenção e escalabilidade de projetos. Aprenda como fazer essa transição de forma suave e eficiente.',
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
      content: 'O comércio eletrônico está em constante evolução. Descubra as tendências que estão moldando o futuro das vendas online, desde personalização com IA até experiências imersivas.',
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
      content: 'A acessibilidade web não é apenas uma boa prática, é uma responsabilidade. Aprenda os princípios do WCAG e como implementá-los para criar experiências digitais inclusivas.',
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
      content: 'Um site rápido é essencial para a experiência do usuário e SEO. Descubra técnicas de otimização como lazy loading, compressão de imagens, CDN e muito mais para turbinar seu site.',
      cover_image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800',
      category: 'Desenvolvimento Web',
      tags: ['performance', 'otimização', 'velocidade'],
      published_at: '2023-12-18',
      created_at: '2023-12-18',
      author: { name: 'Mobi Creative', avatar_url: null }
    }
  ];

  // Use demo posts if database is empty
  const displayPosts = posts.length > 0 ? posts : demoPosts;
  const displayCategories = displayPosts.length > 0 ? [...new Set(displayPosts.map(p => p.category))] : categories;
  const displayTags = displayPosts.length > 0 ? [...new Set(displayPosts.flatMap(p => p.tags || []))] : allTags;

  // Filter display posts
  const filteredDisplayPosts = useMemo(() => {
    return displayPosts.filter(post => {
      const matchesSearch = searchTerm === '' || 
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.excerpt?.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = !selectedCategory || post.category === selectedCategory;
      const matchesTag = !selectedTag || post.tags?.includes(selectedTag);
      
      return matchesSearch && matchesCategory && matchesTag;
    });
  }, [displayPosts, searchTerm, selectedCategory, selectedTag]);

  const displayFeaturedPost = displayPosts[0];
  const displayRegularPosts = filteredDisplayPosts.slice(selectedCategory || selectedTag || searchTerm ? 0 : 1);

  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-hidden">
      {/* Video Background */}
      <div className="fixed inset-0 z-0 overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-[120%] object-cover opacity-50 scale-110 -translate-y-[10%]"
        >
          <source src="/videos/blog-background.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-background/50 to-background/60" />
      </div>

      <Header />
      
      <main className="pt-32 pb-20 relative z-10">
        <div className="container-custom">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
            <Link to="/" className="hover:text-primary transition-colors">
              Home
            </Link>
            <ChevronRight size={14} />
            <span className="text-foreground">Blog</span>
          </nav>

          {/* Hero Section */}
          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              Blog <span className="text-gradient">Tech</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Artigos, tutoriais e insights sobre desenvolvimento web, mobile e as tendências do mercado digital.
            </p>
          </div>

          {/* Search and Filters */}
          <div className="mb-10 space-y-4">
            {/* Search Bar */}
            <div className="relative max-w-xl">
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Buscar artigos..."
                className="pl-11 h-12 rounded-xl bg-secondary/50"
              />
              {searchTerm && (
                <button 
                  onClick={() => setSearchTerm('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  <X size={16} />
                </button>
              )}
            </div>

            {/* Category Filters */}
            {displayCategories.length > 0 && (
              <div className="flex flex-wrap items-center gap-2">
                <Filter size={16} className="text-muted-foreground" />
                <button
                  onClick={() => setSelectedCategory(null)}
                  className={`px-3 py-1.5 rounded-full text-sm transition-all ${
                    !selectedCategory 
                      ? 'bg-primary text-primary-foreground' 
                      : 'bg-secondary hover:bg-secondary/80'
                  }`}
                >
                  Todos
                </button>
                {displayCategories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat === selectedCategory ? null : cat)}
                    className={`px-3 py-1.5 rounded-full text-sm transition-all ${
                      selectedCategory === cat 
                        ? 'bg-primary text-primary-foreground' 
                        : 'bg-secondary hover:bg-secondary/80'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            )}

            {/* Active Filters */}
            {hasActiveFilters && (
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">
                  {filteredDisplayPosts.length} resultado{filteredDisplayPosts.length !== 1 ? 's' : ''}
                </span>
                <button 
                  onClick={clearFilters}
                  className="text-sm text-primary hover:underline"
                >
                  Limpar filtros
                </button>
              </div>
            )}
          </div>

          {loading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="glass-card rounded-2xl overflow-hidden animate-pulse">
                  <div className="h-48 bg-secondary/50" />
                  <div className="p-6 space-y-3">
                    <div className="h-4 bg-secondary/50 rounded w-1/3" />
                    <div className="h-6 bg-secondary/50 rounded w-full" />
                    <div className="h-4 bg-secondary/50 rounded w-2/3" />
                  </div>
                </div>
              ))}
            </div>
          ) : displayPosts.length > 0 ? (
            <>
              {/* Featured Post */}
              {displayFeaturedPost && !hasActiveFilters && (
                <Link
                  to={`/blog/${displayFeaturedPost.slug}`}
                  className="group block mb-12"
                >
                  <div className="glass-card rounded-3xl overflow-hidden hover-lift">
                    <div className="grid lg:grid-cols-2 gap-0">
                      <div className="aspect-video lg:aspect-auto lg:h-full overflow-hidden bg-secondary">
                        {displayFeaturedPost.cover_image ? (
                          <img
                            src={displayFeaturedPost.cover_image}
                            alt={displayFeaturedPost.title}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/20 to-secondary min-h-[300px]">
                            <TrendingUp className="w-16 h-16 text-primary/50" />
                          </div>
                        )}
                      </div>
                      <div className="p-8 lg:p-10 flex flex-col justify-center">
                        <div className="flex items-center gap-3 mb-4">
                          <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
                            Destaque
                          </span>
                          <span className="px-3 py-1 rounded-full bg-secondary text-sm">
                            {displayFeaturedPost.category}
                          </span>
                        </div>
                        <h2 className="text-2xl lg:text-3xl font-bold mb-4 group-hover:text-primary transition-colors">
                          {displayFeaturedPost.title}
                        </h2>
                        {displayFeaturedPost.excerpt && (
                          <p className="text-muted-foreground mb-6 line-clamp-3">
                            {displayFeaturedPost.excerpt}
                          </p>
                        )}
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <User size={14} />
                            {displayFeaturedPost.author?.name || 'Mobi Creative'}
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar size={14} />
                            {formatDate(displayFeaturedPost.published_at || displayFeaturedPost.created_at)}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock size={14} />
                            {calculateReadTime(displayFeaturedPost.content)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              )}

              {/* Posts Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {displayRegularPosts.map((post) => (
                  <Link
                    key={post.id}
                    to={`/blog/${post.slug}`}
                    className="group glass-card rounded-2xl overflow-hidden hover-lift"
                  >
                    <div className="aspect-video overflow-hidden bg-secondary relative">
                      {post.cover_image ? (
                        <img
                          src={post.cover_image}
                          alt={post.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/20 to-secondary">
                          <Tag className="w-12 h-12 text-primary/50" />
                        </div>
                      )}
                      <div className="absolute top-3 right-3">
                        <span className="px-2 py-1 rounded-full bg-background/80 backdrop-blur-sm text-xs">
                          {calculateReadTime(post.content)}
                        </span>
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
                        <span className="px-2 py-1 rounded-full bg-primary/10 text-primary">
                          {post.category}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar size={12} />
                          {formatDate(post.published_at || post.created_at)}
                        </span>
                      </div>
                      <h2 className="text-lg font-semibold mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                        {post.title}
                      </h2>
                      {post.excerpt && (
                        <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                          {post.excerpt}
                        </p>
                      )}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <div className="w-6 h-6 rounded-full bg-secondary flex items-center justify-center">
                            <User size={12} />
                          </div>
                          <span>{post.author?.name || 'Mobi Creative'}</span>
                        </div>
                        <span className="text-primary text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                          Ler <ArrowRight size={14} />
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              {filteredPosts.length === 0 && hasActiveFilters && (
                <div className="text-center py-16">
                  <Search size={48} className="mx-auto mb-4 text-muted-foreground opacity-50" />
                  <h3 className="text-xl font-semibold mb-2">Nenhum resultado encontrado</h3>
                  <p className="text-muted-foreground mb-4">
                    Tente ajustar os filtros ou buscar por outros termos.
                  </p>
                  <Button variant="outline" onClick={clearFilters}>
                    Limpar filtros
                  </Button>
                </div>
              )}

              {/* Tags Cloud */}
              {displayTags.length > 0 && (
                <div className="mt-16 p-8 glass-card rounded-2xl">
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <Tag size={18} className="text-primary" />
                    Tags Populares
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {displayTags.map((tag) => (
                      <button
                        key={tag}
                        onClick={() => setSelectedTag(tag === selectedTag ? null : tag)}
                        className={`px-3 py-1.5 rounded-full text-sm transition-all ${
                          selectedTag === tag 
                            ? 'bg-primary text-primary-foreground' 
                            : 'bg-secondary hover:bg-primary/20 hover:text-primary'
                        }`}
                      >
                        #{tag}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Newsletter Section */}
              <div className="mt-16 p-8 md:p-12 rounded-3xl bg-gradient-to-br from-primary/10 via-secondary to-primary/5 border border-primary/20">
                <div className="max-w-2xl mx-auto text-center">
                  <div className="w-16 h-16 rounded-2xl bg-primary/20 flex items-center justify-center mx-auto mb-6">
                    <Mail size={28} className="text-primary" />
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold mb-4">
                    Receba novidades por email
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    Inscreva-se para receber os melhores artigos sobre tecnologia diretamente no seu email.
                  </p>
                  <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                    <Input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="seu@email.com"
                      className="flex-1 h-12 rounded-xl"
                      required
                    />
                    <Button type="submit" disabled={subscribing} className="h-12 px-6 rounded-xl">
                      {subscribing ? 'Inscrevendo...' : 'Inscrever'}
                    </Button>
                  </form>
                  <p className="text-xs text-muted-foreground mt-4">
                    Sem spam. Cancele quando quiser.
                  </p>
                </div>
              </div>
            </>
          ) : (
            <div className="text-center py-20">
              <div className="w-20 h-20 rounded-full bg-secondary/50 flex items-center justify-center mx-auto mb-6">
                <Bookmark className="w-10 h-10 text-muted-foreground" />
              </div>
              <h2 className="text-2xl font-semibold mb-2">Nenhum artigo publicado</h2>
              <p className="text-muted-foreground mb-6">
                Em breve publicaremos conteúdos incríveis sobre tecnologia.
              </p>
              <Link to="/">
                <Button variant="outline" className="gap-2">
                  <Home size={16} />
                  Voltar ao Site
                </Button>
              </Link>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Blog;
