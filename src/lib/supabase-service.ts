
import { supabase, isSupabaseConfigured } from './supabase';
import type { CardData } from './types';
import { initialCardData } from './data';
import { localDb } from './local-database';

/**
 * Mapeia o objeto da aplicação (camelCase) para o banco de dados (snake_case)
 */
const toDb = (card: CardData, userId?: string) => ({
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
  links: card.links, // JSONB no Supabase
  stats: card.stats, // JSONB no Supabase
  save_contact_label: card.saveContactLabel,
  qr_code_url: card.qrCodeUrl,
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

/**
 * Mapeia o banco de dados (snake_case) de volta para o objeto da aplicação (camelCase)
 */
const fromDb = (dbCard: any): CardData => ({
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
    const { data: { user } } = await supabase.auth.getUser();
    return user;
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
      console.error('Erro Supabase ao carregar cartões:', error);
      return [];
    }

    return (data || []).map(fromDb);
  },

  async getCardById(id: string): Promise<CardData | null> {
    if (!isSupabaseConfigured) return localDb.getCardById(id) || null;

    const { data, error } = await supabase
      .from('cards')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Erro Supabase ao carregar cartão:', error);
      return null;
    }

    return fromDb(data);
  },

  async saveCard(card: CardData): Promise<void> {
    if (!isSupabaseConfigured) {
      localDb.saveCard(card);
      return;
    }

    const user = await this.getCurrentUser();
    if (!user) return;

    const { error } = await supabase
      .from('cards')
      .upsert(toDb(card, user.id));

    if (error) {
      console.error('Erro Supabase ao salvar:', error);
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

    if (error) {
      console.error('Erro Supabase ao deletar:', error);
    }
  },

  async createNewCard(): Promise<CardData> {
    const user = await this.getCurrentUser();
    const newCard: CardData = {
      ...initialCardData,
      id: `card_${Date.now()}`,
      fullName: 'Novo Cartão',
      lastUpdated: Date.now()
    };

    if (user) {
      await this.saveCard(newCard);
    } else {
      localDb.saveCard(newCard);
    }
    
    return newCard;
  }
};
