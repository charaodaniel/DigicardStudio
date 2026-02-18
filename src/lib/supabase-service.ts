
import { supabase, isSupabaseConfigured } from './supabase';
import type { CardData } from './types';
import { initialCardData } from './data';
import { localDb } from './local-database';

/**
 * Serviço para gerenciar operações CRUD no Supabase.
 * Se as credenciais não estiverem configuradas, ele faz o fallback para o LocalStorage.
 */
export const supabaseService = {
  /**
   * Busca todos os cartões (No futuro: filtrados por usuário logado)
   */
  async getAllCards(): Promise<CardData[]> {
    if (!isSupabaseConfigured) return localDb.getAllCards();

    const { data, error } = await supabase
      .from('cards')
      .select('*')
      .order('last_updated', { ascending: false });

    if (error) {
      console.error('Erro ao buscar cartões no Supabase:', error);
      return localDb.getAllCards();
    }

    return data as CardData[];
  },

  /**
   * Busca um cartão por ID
   */
  async getCardById(id: string): Promise<CardData | null> {
    if (!isSupabaseConfigured) return localDb.getCardById(id) || null;

    const { data, error } = await supabase
      .from('cards')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error(`Erro ao buscar cartão ${id} no Supabase:`, error);
      return localDb.getCardById(id) || null;
    }

    return data as CardData;
  },

  /**
   * Salva ou atualiza um cartão
   */
  async saveCard(card: CardData): Promise<void> {
    if (!isSupabaseConfigured) {
      localDb.saveCard(card);
      return;
    }

    const { error } = await supabase
      .from('cards')
      .upsert({ ...card, last_updated: Date.now() });

    if (error) {
      console.error('Erro ao salvar cartão no Supabase:', error);
      localDb.saveCard(card);
    }
  },

  /**
   * Remove um cartão
   */
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
      console.error(`Erro ao deletar cartão ${id} no Supabase:`, error);
      localDb.deleteCard(id);
    }
  },

  /**
   * Cria um novo cartão
   */
  async createNewCard(): Promise<CardData> {
    const newCard: CardData = {
      ...initialCardData,
      id: `card_${Date.now()}`,
      fullName: 'Novo Cartão',
      lastUpdated: Date.now()
    };

    await this.saveCard(newCard);
    return newCard;
  }
};
