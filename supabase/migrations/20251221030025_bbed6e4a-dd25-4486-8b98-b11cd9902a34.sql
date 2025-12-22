-- Tabela para configurações do site (links sociais, etc)
CREATE TABLE public.site_settings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  key TEXT NOT NULL UNIQUE,
  value TEXT,
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

-- Políticas para site_settings
CREATE POLICY "Configurações são visíveis para todos" 
ON public.site_settings 
FOR SELECT 
USING (true);

CREATE POLICY "Admins podem gerenciar configurações" 
ON public.site_settings 
FOR ALL
USING (EXISTS (
  SELECT 1 FROM public.profiles 
  WHERE profiles.user_id = auth.uid() AND profiles.role = 'admin'
));

-- Tabela de campanhas de mídia social
CREATE TABLE public.social_campaigns (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  author_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  image_url TEXT,
  platforms TEXT[] NOT NULL DEFAULT '{}',
  scheduled_at TIMESTAMP WITH TIME ZONE,
  published_at TIMESTAMP WITH TIME ZONE,
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'scheduled', 'published', 'failed')),
  blog_post_id UUID REFERENCES public.blog_posts(id) ON DELETE SET NULL,
  ai_generated BOOLEAN DEFAULT false,
  analytics JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.social_campaigns ENABLE ROW LEVEL SECURITY;

-- Políticas para social_campaigns
CREATE POLICY "Admins podem ver campanhas" 
ON public.social_campaigns 
FOR SELECT 
USING (EXISTS (
  SELECT 1 FROM public.profiles 
  WHERE profiles.user_id = auth.uid() AND profiles.role = 'admin'
));

CREATE POLICY "Admins podem criar campanhas" 
ON public.social_campaigns 
FOR INSERT 
WITH CHECK (EXISTS (
  SELECT 1 FROM public.profiles 
  WHERE profiles.user_id = auth.uid() AND profiles.role = 'admin'
));

CREATE POLICY "Admins podem atualizar campanhas" 
ON public.social_campaigns 
FOR UPDATE 
USING (EXISTS (
  SELECT 1 FROM public.profiles 
  WHERE profiles.user_id = auth.uid() AND profiles.role = 'admin'
));

CREATE POLICY "Admins podem deletar campanhas" 
ON public.social_campaigns 
FOR DELETE 
USING (EXISTS (
  SELECT 1 FROM public.profiles 
  WHERE profiles.user_id = auth.uid() AND profiles.role = 'admin'
));

-- Trigger para updated_at
CREATE TRIGGER update_social_campaigns_updated_at
BEFORE UPDATE ON public.social_campaigns
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_site_settings_updated_at
BEFORE UPDATE ON public.site_settings
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Inserir configurações iniciais
INSERT INTO public.site_settings (key, value) VALUES
  ('instagram_url', ''),
  ('facebook_url', ''),
  ('instagram_access_token', ''),
  ('facebook_access_token', ''),
  ('facebook_page_id', '');