import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Plus, Edit, Trash2, Calendar, Send, Sparkles, 
  Instagram, Facebook, Clock, CheckCircle, XCircle,
  Settings, BarChart3, FileText, Loader2, Wand2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

type Profile = {
  id: string;
  role: string;
  name: string | null;
};

type Campaign = {
  id: string;
  title: string;
  content: string;
  image_url: string | null;
  platforms: string[];
  scheduled_at: string | null;
  published_at: string | null;
  status: string;
  ai_generated: boolean;
  created_at: string;
};

type Settings = {
  instagram_url: string;
  facebook_url: string;
};

const Campaigns = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [settings, setSettings] = useState<Settings>({ instagram_url: '', facebook_url: '' });
  const [activeTab, setActiveTab] = useState('campaigns');
  const [showForm, setShowForm] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [editingCampaign, setEditingCampaign] = useState<Campaign | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    image_url: '',
    platforms: [] as string[],
    scheduled_at: '',
    status: 'draft'
  });
  const [aiPrompt, setAiPrompt] = useState('');

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      navigate('/login');
      return;
    }

    const { data: profileData, error } = await supabase
      .from('profiles')
      .select('id, role, name')
      .eq('user_id', user.id)
      .single();

    if (error || !profileData || profileData.role !== 'admin') {
      toast({
        title: 'Acesso negado',
        description: 'Você não tem permissão para acessar esta área.',
        variant: 'destructive'
      });
      navigate('/');
      return;
    }

    setProfile(profileData);
    fetchCampaigns();
    fetchSettings();
    setLoading(false);
  };

  const fetchCampaigns = async () => {
    const { data, error } = await supabase
      .from('social_campaigns')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && data) {
      setCampaigns(data);
    }
  };

  const fetchSettings = async () => {
    const { data, error } = await supabase
      .from('site_settings')
      .select('key, value')
      .in('key', ['instagram_url', 'facebook_url']);

    if (!error && data) {
      const settingsObj: any = {};
      data.forEach((s: any) => {
        settingsObj[s.key] = s.value || '';
      });
      setSettings(settingsObj);
    }
  };

  const saveSettings = async () => {
    for (const [key, value] of Object.entries(settings)) {
      await supabase
        .from('site_settings')
        .update({ value })
        .eq('key', key);
    }
    toast({ title: 'Configurações salvas!' });
  };

  const togglePlatform = (platform: string) => {
    setFormData(prev => ({
      ...prev,
      platforms: prev.platforms.includes(platform)
        ? prev.platforms.filter(p => p !== platform)
        : [...prev.platforms, platform]
    }));
  };

  const generateWithAI = async () => {
    if (!aiPrompt.trim()) {
      toast({ title: 'Digite uma descrição para gerar', variant: 'destructive' });
      return;
    }

    setGenerating(true);
    try {
      const { data, error } = await supabase.functions.invoke('generate-social-content', {
        body: { type: 'campaign_ideas', customPrompt: aiPrompt }
      });

      if (error) throw error;

      const ideas = data.content?.ideas;
      if (ideas && ideas.length > 0) {
        const firstIdea = ideas[0];
        setFormData(prev => ({
          ...prev,
          title: firstIdea.title,
          content: firstIdea.content,
          platforms: firstIdea.platforms || ['instagram', 'facebook']
        }));
        toast({ title: 'Conteúdo gerado pela IA!' });
      }
    } catch (error: any) {
      toast({ title: 'Erro ao gerar', description: error.message, variant: 'destructive' });
    } finally {
      setGenerating(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!profile) return;

    if (formData.platforms.length === 0) {
      toast({ title: 'Selecione ao menos uma plataforma', variant: 'destructive' });
      return;
    }

    const campaignData = {
      title: formData.title,
      content: formData.content,
      image_url: formData.image_url || null,
      platforms: formData.platforms,
      scheduled_at: formData.scheduled_at || null,
      status: formData.scheduled_at ? 'scheduled' : formData.status,
      ai_generated: generating,
      author_id: profile.id
    };

    if (editingCampaign) {
      const { error } = await supabase
        .from('social_campaigns')
        .update(campaignData)
        .eq('id', editingCampaign.id);

      if (error) {
        toast({ title: 'Erro ao atualizar', description: error.message, variant: 'destructive' });
        return;
      }
      toast({ title: 'Campanha atualizada!' });
    } else {
      const { error } = await supabase
        .from('social_campaigns')
        .insert(campaignData);

      if (error) {
        toast({ title: 'Erro ao criar', description: error.message, variant: 'destructive' });
        return;
      }
      toast({ title: 'Campanha criada!' });
    }

    resetForm();
    fetchCampaigns();
  };

  const resetForm = () => {
    setFormData({
      title: '',
      content: '',
      image_url: '',
      platforms: [],
      scheduled_at: '',
      status: 'draft'
    });
    setEditingCampaign(null);
    setShowForm(false);
    setAiPrompt('');
  };

  const editCampaign = (campaign: Campaign) => {
    setFormData({
      title: campaign.title,
      content: campaign.content,
      image_url: campaign.image_url || '',
      platforms: campaign.platforms,
      scheduled_at: campaign.scheduled_at ? campaign.scheduled_at.slice(0, 16) : '',
      status: campaign.status
    });
    setEditingCampaign(campaign);
    setShowForm(true);
  };

  const deleteCampaign = async (id: string) => {
    if (!confirm('Tem certeza que deseja excluir esta campanha?')) return;

    const { error } = await supabase
      .from('social_campaigns')
      .delete()
      .eq('id', id);

    if (!error) {
      toast({ title: 'Campanha excluída' });
      fetchCampaigns();
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'published': return <CheckCircle size={14} className="text-green-400" />;
      case 'scheduled': return <Clock size={14} className="text-yellow-400" />;
      case 'failed': return <XCircle size={14} className="text-red-400" />;
      default: return <FileText size={14} className="text-muted-foreground" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'published': return 'Publicado';
      case 'scheduled': return 'Agendado';
      case 'failed': return 'Falhou';
      default: return 'Rascunho';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="border-b border-border bg-secondary/30 sticky top-0 z-50">
        <div className="container-custom py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Sparkles className="text-primary" size={24} />
            <h1 className="text-xl font-bold">Campanhas Sociais</h1>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={() => navigate('/admin')}>
              Blog
            </Button>
            <Button variant="ghost" size="sm" onClick={() => navigate('/')}>
              Site
            </Button>
          </div>
        </div>
      </header>

      <main className="container-custom py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-8">
            <TabsTrigger value="campaigns" className="gap-2">
              <Send size={14} />
              Campanhas
            </TabsTrigger>
            <TabsTrigger value="analytics" className="gap-2">
              <BarChart3 size={14} />
              Analytics
            </TabsTrigger>
            <TabsTrigger value="settings" className="gap-2">
              <Settings size={14} />
              Configurações
            </TabsTrigger>
          </TabsList>

          {/* Campanhas Tab */}
          <TabsContent value="campaigns">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-semibold">Suas Campanhas</h2>
              <Button onClick={() => setShowForm(true)} className="gap-2">
                <Plus size={16} />
                Nova Campanha
              </Button>
            </div>

            {/* Form */}
            {showForm && (
              <div className="glass-card p-6 rounded-2xl mb-8">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Wand2 size={18} className="text-primary" />
                  {editingCampaign ? 'Editar Campanha' : 'Nova Campanha com IA'}
                </h3>

                {/* AI Generator */}
                <div className="mb-6 p-4 rounded-xl bg-primary/5 border border-primary/20">
                  <label className="text-sm font-medium flex items-center gap-2 mb-2">
                    <Sparkles size={14} className="text-primary" />
                    Gerador com IA
                  </label>
                  <div className="flex gap-2">
                    <Input
                      value={aiPrompt}
                      onChange={(e) => setAiPrompt(e.target.value)}
                      placeholder="Descreva o que você quer divulgar... Ex: Promoção de 20% em sites"
                      className="flex-1"
                    />
                    <Button onClick={generateWithAI} disabled={generating} variant="secondary">
                      {generating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Wand2 size={16} />}
                      Gerar
                    </Button>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">Título da Campanha</label>
                    <Input
                      value={formData.title}
                      onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                      placeholder="Ex: Promoção de Lançamento"
                      required
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium">Conteúdo do Post</label>
                    <Textarea
                      value={formData.content}
                      onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                      placeholder="Texto que será publicado nas redes sociais..."
                      rows={5}
                      required
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium">URL da Imagem (opcional)</label>
                    <Input
                      value={formData.image_url}
                      onChange={(e) => setFormData(prev => ({ ...prev, image_url: e.target.value }))}
                      placeholder="https://..."
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">Plataformas</label>
                    <div className="flex gap-3">
                      <button
                        type="button"
                        onClick={() => togglePlatform('instagram')}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-all ${
                          formData.platforms.includes('instagram')
                            ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white border-transparent'
                            : 'border-border hover:border-primary'
                        }`}
                      >
                        <Instagram size={18} />
                        Instagram
                      </button>
                      <button
                        type="button"
                        onClick={() => togglePlatform('facebook')}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-all ${
                          formData.platforms.includes('facebook')
                            ? 'bg-blue-600 text-white border-transparent'
                            : 'border-border hover:border-primary'
                        }`}
                      >
                        <Facebook size={18} />
                        Facebook
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium">Agendar para (opcional)</label>
                    <Input
                      type="datetime-local"
                      value={formData.scheduled_at}
                      onChange={(e) => setFormData(prev => ({ ...prev, scheduled_at: e.target.value }))}
                    />
                  </div>

                  <div className="flex gap-3 pt-2">
                    <Button type="submit">
                      {editingCampaign ? 'Atualizar' : 'Criar'} Campanha
                    </Button>
                    <Button type="button" variant="ghost" onClick={resetForm}>
                      Cancelar
                    </Button>
                  </div>
                </form>
              </div>
            )}

            {/* Campaigns List */}
            <div className="space-y-4">
              {campaigns.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                  <Send size={48} className="mx-auto mb-4 opacity-50" />
                  <p>Nenhuma campanha ainda. Crie a primeira!</p>
                </div>
              ) : (
                campaigns.map((campaign) => (
                  <div
                    key={campaign.id}
                    className="glass-card p-4 rounded-xl flex items-start gap-4"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-medium">{campaign.title}</h3>
                        <span className="flex items-center gap-1 px-2 py-0.5 rounded-full text-xs bg-secondary">
                          {getStatusIcon(campaign.status)}
                          {getStatusText(campaign.status)}
                        </span>
                        {campaign.ai_generated && (
                          <span className="flex items-center gap-1 px-2 py-0.5 rounded-full text-xs bg-primary/20 text-primary">
                            <Sparkles size={10} />
                            IA
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
                        {campaign.content}
                      </p>
                      <div className="flex items-center gap-3 text-xs text-muted-foreground">
                        {campaign.platforms.map(p => (
                          <span key={p} className="flex items-center gap-1">
                            {p === 'instagram' ? <Instagram size={12} /> : <Facebook size={12} />}
                            {p}
                          </span>
                        ))}
                        {campaign.scheduled_at && (
                          <span className="flex items-center gap-1">
                            <Calendar size={12} />
                            {new Date(campaign.scheduled_at).toLocaleDateString('pt-BR')}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => editCampaign(campaign)}
                      >
                        <Edit size={16} />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => deleteCampaign(campaign.id)}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 size={16} />
                      </Button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics">
            <div className="glass-card p-8 rounded-2xl text-center">
              <BarChart3 size={48} className="mx-auto mb-4 text-primary opacity-50" />
              <h3 className="text-xl font-semibold mb-2">Analytics em breve</h3>
              <p className="text-muted-foreground">
                Em breve você poderá ver métricas de engajamento das suas campanhas.
              </p>
            </div>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings">
            <div className="glass-card p-6 rounded-2xl max-w-xl">
              <h3 className="text-lg font-semibold mb-6">Links das Redes Sociais</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium flex items-center gap-2 mb-2">
                    <Instagram size={16} className="text-pink-500" />
                    URL do Instagram
                  </label>
                  <Input
                    value={settings.instagram_url}
                    onChange={(e) => setSettings(prev => ({ ...prev, instagram_url: e.target.value }))}
                    placeholder="https://instagram.com/seuusuario"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium flex items-center gap-2 mb-2">
                    <Facebook size={16} className="text-blue-500" />
                    URL do Facebook
                  </label>
                  <Input
                    value={settings.facebook_url}
                    onChange={(e) => setSettings(prev => ({ ...prev, facebook_url: e.target.value }))}
                    placeholder="https://facebook.com/suapagina"
                  />
                </div>

                <Button onClick={saveSettings} className="mt-4">
                  Salvar Configurações
                </Button>
              </div>

              <div className="mt-8 pt-6 border-t border-border">
                <h4 className="font-medium mb-4">Integração com APIs (Avançado)</h4>
                <p className="text-sm text-muted-foreground mb-4">
                  Para publicar automaticamente, você pode integrar com n8n ou Make.com. 
                  Entre em contato para configuração personalizada.
                </p>
                <Button variant="outline" size="sm">
                  Saiba mais sobre automação
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Campaigns;
