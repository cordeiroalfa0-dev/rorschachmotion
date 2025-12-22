import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface SiteSettings {
  phone: string;
  whatsapp: string;
  email: string;
  address: string;
  instagram_url: string;
  facebook_url: string;
  linkedin_url: string;
  youtube_url: string;
  website_url: string;
  chatbot_enabled: boolean;
  chatbot_greeting: string;
}

const defaultSettings: SiteSettings = {
  phone: '(41) 99753-9084',
  whatsapp: '5541997539084',
  email: 'contato@rorschachmotion.com',
  address: 'Curitiba, PR - Brasil',
  instagram_url: '',
  facebook_url: '',
  linkedin_url: '',
  youtube_url: '',
  website_url: '',
  chatbot_enabled: true,
  chatbot_greeting: 'Olá! 👋 Como posso ajudar você hoje?',
};

export const useSiteSettings = () => {
  const [settings, setSettings] = useState<SiteSettings>(defaultSettings);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const { data, error } = await supabase
          .from('site_settings')
          .select('key, value');

        if (error) {
          console.error('Error fetching site settings:', error);
          return;
        }

        if (data) {
          const settingsMap: Record<string, string> = {};
          data.forEach(({ key, value }) => {
            settingsMap[key] = value || '';
          });

          setSettings(prev => ({
            ...prev,
            phone: settingsMap.phone || prev.phone,
            whatsapp: settingsMap.whatsapp || prev.whatsapp,
            email: settingsMap.email || prev.email,
            address: settingsMap.address || prev.address,
            instagram_url: settingsMap.instagram_url || '',
            facebook_url: settingsMap.facebook_url || '',
            linkedin_url: settingsMap.linkedin_url || '',
            youtube_url: settingsMap.youtube_url || '',
            website_url: settingsMap.website_url || '',
            chatbot_enabled: settingsMap.chatbot_enabled !== 'false',
            chatbot_greeting: settingsMap.chatbot_greeting || prev.chatbot_greeting,
          }));
        }
      } catch (err) {
        console.error('Error loading site settings:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();
  }, []);

  return { settings, loading };
};
