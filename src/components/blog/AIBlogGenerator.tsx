import React, { useState } from 'react';
import { Sparkles, Loader2, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

interface AIBlogGeneratorProps {
  onPostGenerated?: () => void;
}

const AIBlogGenerator: React.FC<AIBlogGeneratorProps> = ({ onPostGenerated }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [topic, setTopic] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleGenerate = async () => {
    if (!topic.trim()) {
      toast({
        title: 'Digite um tema',
        description: 'Por favor, informe sobre o que você quer escrever.',
        variant: 'destructive',
      });
      return;
    }

    setIsGenerating(true);

    try {
      // Check if user is authenticated
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast({
          title: 'Login necessário',
          description: 'Faça login para criar posts com IA.',
          variant: 'destructive',
        });
        navigate('/login');
        return;
      }

      // Get or create profile
      let { data: profile } = await supabase
        .from('profiles')
        .select('id')
        .eq('user_id', user.id)
        .single();

      if (!profile) {
        const { data: newProfile, error: profileError } = await supabase
          .from('profiles')
          .insert({
            user_id: user.id,
            email: user.email,
            name: user.email?.split('@')[0] || 'Autor',
          })
          .select('id')
          .single();

        if (profileError) throw profileError;
        profile = newProfile;
      }

      // Generate blog post with AI
      const { data, error } = await supabase.functions.invoke('generate-blog-post', {
        body: { topic },
      });

      if (error) throw error;

      // Insert the generated post into the database
      const { data: newPost, error: insertError } = await supabase
        .from('blog_posts')
        .insert({
          title: data.title,
          slug: data.slug + '-' + Date.now(),
          excerpt: data.excerpt,
          content: data.content,
          category: data.category,
          tags: data.tags,
          cover_image: data.cover_image || null,
          author_id: profile.id,
          published: true,
          published_at: new Date().toISOString(),
        })
        .select()
        .single();

      if (insertError) throw insertError;

      toast({
        title: 'Post criado com sucesso!',
        description: `"${data.title}" foi publicado.`,
      });

      setIsOpen(false);
      setTopic('');
      onPostGenerated?.();

      // Navigate to the new post
      navigate(`/blog/${newPost.slug}`);
    } catch (error) {
      console.error('Error generating post:', error);
      toast({
        title: 'Erro ao gerar post',
        description: error instanceof Error ? error.message : 'Tente novamente.',
        variant: 'destructive',
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        className="gap-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white shadow-lg"
      >
        <Sparkles size={18} />
        Criar com IA
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Sparkles className="text-purple-500" size={20} />
              Criar Post com IA
            </DialogTitle>
            <DialogDescription>
              Digite o tema e a IA vai criar um artigo completo para você.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 pt-4">
            <Input
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="Ex: Tendências de React em 2024"
              disabled={isGenerating}
              onKeyDown={(e) => e.key === 'Enter' && handleGenerate()}
              autoFocus
            />

            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => setIsOpen(false)}
                disabled={isGenerating}
                className="flex-1"
              >
                Cancelar
              </Button>
              <Button
                onClick={handleGenerate}
                disabled={isGenerating || !topic.trim()}
                className="flex-1 gap-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
              >
                {isGenerating ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    Gerando...
                  </>
                ) : (
                  <>
                    <Sparkles size={16} />
                    Gerar
                  </>
                )}
              </Button>
            </div>

            {isGenerating && (
              <p className="text-sm text-muted-foreground text-center animate-pulse">
                Criando seu artigo, isso pode levar alguns segundos...
              </p>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AIBlogGenerator;
