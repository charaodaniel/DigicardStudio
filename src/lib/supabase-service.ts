import { supabase, isSupabaseConfigured } from './supabase';
import type { CardData, UserProfile, UserRole, Plan, SystemSettings } from './types';
import { initialCardData } from './data';
import { localDb } from './local-database';

const profileFromDb = (dbProfile: any): UserProfile => ({
  id: dbProfile.id,
  fullName: dbProfile.full_name,
  avatarUrl: dbProfile.avatar_url,
  role: dbProfile.role as UserRole,
  createdAt: dbProfile.created_at
});

const cardToDb = (card: CardData, userId?: string) => ({
  id: card.id,
  user_id: userId,
  template: card.template,
  full_name: card.fullName,
  full_name_link: card.fullNameLink,
  job_title: card.jobTitle,
  job_title_link: card.jobTitleLink,
  bio: card.bio,
  avatar_url: card.avatarUrl,
  avatar_link: card.avatarLink,
  banner_url: card.bannerUrl,
  banner_link: card.bannerLink,
  vcard_url: card.vCardUrl,
  is_verified: card.isVerified,
  theme_color: card.themeColor,
  font_family: card.fontFamily,
  base_font_size: card.baseFontSize,
  links: card.links,
  stats: card.stats,
  save_contact_label: card.saveContactLabel,
  qr_code_url: card.qrCodeUrl,
  qr_code_data: card.qrCodeData,
  custom_website_url: card.customWebsiteUrl,
  footer_text: card.footerText,
  physical_show_avatar: card.physicalShowAvatar,
  physical_show_title: card.physicalShowTitle,
  physical_show_stats: card.physicalShowStats,
  physical_show_links: card.physicalShowLinks,
  physical_show_qr: card.physicalShowQR,
  physical_show_footer: card.physicalShowFooter,
  physical_background_color: card.physicalBackgroundColor,
  last_updated: Date.now()
});

const cardFromDb = (dbCard: any): CardData => ({
  id: dbCard.id,
  template: dbCard.template,
  fullName: dbCard.full_name,
  fullNameLink: dbCard.full_name_link,
  jobTitle: dbCard.job_title,
  jobTitleLink: dbCard.job_title_link,
  bio: dbCard.bio,
  avatarUrl: dbCard.avatar_url,
  avatarLink: dbCard.avatar_link,
  bannerUrl: dbCard.banner_url,
  bannerLink: dbCard.banner_link,
  vCardUrl: dbCard.vcard_url,
  isVerified: dbCard.is_verified,
  themeColor: dbCard.theme_color,
  fontFamily: dbCard.font_family,
  baseFontSize: dbCard.base_font_size,
  links: dbCard.links || [],
  stats: dbCard.stats || [],
  saveContactLabel: dbCard.save_contact_label,
  qrCodeUrl: dbCard.qr_code_url,
  qrCodeData: dbCard.qr_code_data,
  customWebsiteUrl: dbCard.custom_website_url,
  footerText: dbCard.footer_text,
  physicalShowAvatar: dbCard.physical_show_avatar,
  physicalShowTitle: dbCard.physical_show_title,
  physicalShowStats: dbCard.physical_show_stats,
  physicalShowLinks: dbCard.physical_show_links,
  physicalShowQR: dbCard.physical_show_qr,
  physicalShowFooter: dbCard.physical_show_footer,
  physicalBackgroundColor: dbCard.physical_background_color,
  lastUpdated: dbCard.last_updated
});

export const supabaseService = {
  async getCurrentUser() {
    try {
      const { data: { user }, error } = await supabase.auth.getUser();
      if (error) return null;
      return user;
    } catch (e) {
      return null;
    }
  },

  async getUserProfile(): Promise<UserProfile | null> {
    if (!isSupabaseConfigured) return null;
    const user = await this.getCurrentUser();
    if (!user) return null;

    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single();

    if (error) {
      console.warn('Perfil não encontrado para o usuário:', user.id);
      return null;
    }
    return profileFromDb(data);
  },

  async getAllProfiles(): Promise<UserProfile[]> {
    if (!isSupabaseConfigured) return [];
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Erro ao buscar perfis:', error.message);
      return [];
    }
    return data.map(profileFromDb);
  },

  async updateProfileRole(userId: string, role: UserRole): Promise<void> {
    if (!isSupabaseConfigured) return;
    const { error } = await supabase
      .from('profiles')
      .update({ role })
      .eq('id', userId);
    if (error) throw error;
  },

  async deleteProfile(userId: string): Promise<void> {
    if (!isSupabaseConfigured) return;
    const { error } = await supabase
      .from('profiles')
      .delete()
      .eq('id', userId);
    if (error) throw error;
  },

  async getAllCards(): Promise<CardData[]> {
    if (!isSupabaseConfigured) return localDb.getAllCards();

    const user = await this.getCurrentUser();
    if (!user) return [];

    const { data, error } = await supabase
      .from('cards')
      .select('*')
      .eq('user_id', user.id)
      .order('last_updated', { ascending: false });

    if (error) {
      console.error('Erro ao carregar cartões:', error.message);
      return [];
    }

    return (data || []).map(cardFromDb);
  },

  async getTotalCardCount(): Promise<number> {
    if (!isSupabaseConfigured) return localDb.getAllCards().length;
    const { count, error } = await supabase
      .from('cards')
      .select('*', { count: 'exact', head: true });
    
    if (error) return 0;
    return count || 0;
  },

  async getCardById(id: string): Promise<CardData | null> {
    if (!isSupabaseConfigured) return localDb.getCardById(id) || null;

    const { data, error } = await supabase
      .from('cards')
      .select('*')
      .eq('id', id)
      .single();

    if (error) return null;
    return cardFromDb(data);
  },

  async saveCard(card: CardData): Promise<void> {
    if (!isSupabaseConfigured) {
      localDb.saveCard(card);
      return;
    }

    const user = await this.getCurrentUser();
    if (!user) return;

    const payload = cardToDb(card, user.id);
    const { error } = await supabase
      .from('cards')
      .upsert(payload);

    if (error) {
      console.error('Erro detalhado Supabase (Save):', {
        code: error.code,
        message: error.message,
        details: error.details,
        hint: error.hint
      });
    }
  },

  async deleteCard(id: string): Promise<void> {
    if (!isSupabaseConfigured) {
      localDb.deleteCard(id);
      return;
    }

    const { error } = await supabase
      .from('cards')
      .delete()
      .eq('id', id);

    if (error) console.error('Erro ao deletar:', error.message);
  },

  async createNewCard(): Promise<CardData> {
    const user = await this.getCurrentUser();
    const newCard: CardData = {
      ...initialCardData,
      id: `card_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      fullName: 'Novo Cartão',
      lastUpdated: Date.now()
    };

    if (user) {
      await this.saveCard(newCard);
    } else {
      localDb.saveCard(newCard);
    }
    
    return newCard;
  },

  async getAllPlans(): Promise<Plan[]> {
    if (!isSupabaseConfigured) return [];
    const { data, error } = await supabase
      .from('plans')
      .select('*')
      .order('created_at', { ascending: true });

    if (error) return [];
    return data.map(p => ({
      id: p.id,
      name: p.name,
      price: p.price,
      cardLimit: p.card_limit,
      industrialExport: p.industrial_export,
      active: p.active
    }));
  },

  async savePlan(plan: Partial<Plan>): Promise<void> {
    if (!isSupabaseConfigured) return;
    const payload = {
      name: plan.name,
      price: plan.price,
      card_limit: plan.cardLimit,
      industrial_export: plan.industrialExport,
      active: plan.active ?? true
    };

    if (plan.id) {
      const { error } = await supabase.from('plans').update(payload).eq('id', plan.id);
      if (error) throw error;
    } else {
      const { error } = await supabase.from('plans').insert(payload);
      if (error) throw error;
    }
  },

  async getSystemSettings(): Promise<SystemSettings> {
    const defaultSettings: SystemSettings = {
      id: 'global',
      siteName: 'DigiCard Studio',
      heroTitle: 'Seu Cartão de Visita, Reinventado.',
      heroSubtitle: 'Crie cartões digitais interativos e gabaritos de impressão profissional em minutos. Onde a elegância digital encontra a precisão física.',
      supportEmail: 'suporte@digicard.studio',
      maintenanceMode: false
    };

    if (!isSupabaseConfigured) return defaultSettings;

    const { data, error } = await supabase
      .from('system_settings')
      .select('*')
      .eq('id', 'global')
      .single();

    if (error) return defaultSettings;

    return {
      id: data.id,
      siteName: data.site_name,
      heroTitle: data.hero_title,
      heroSubtitle: data.hero_subtitle,
      supportEmail: data.support_email,
      maintenanceMode: data.maintenance_mode
    };
  },

  async updateSystemSettings(settings: Partial<SystemSettings>): Promise<void> {
    if (!isSupabaseConfigured) return;
    
    const payload = {
      id: 'global',
      site_name: settings.siteName,
      hero_title: settings.heroTitle,
      hero_subtitle: settings.heroSubtitle,
      support_email: settings.supportEmail,
      maintenance_mode: settings.maintenanceMode,
      last_updated: new Date().toISOString()
    };

    const { error } = await supabase
      .from('system_settings')
      .upsert(payload);

    if (error) throw error;
  }
};
