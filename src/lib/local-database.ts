'use client';
import { CardData } from './types';
import { initialCardData } from './data';

const STORAGE_KEY = 'digicard_db_json';

/**
 * Simula um banco de dados local baseado em JSON (salvo no LocalStorage)
 */
export const localDb = {
  /**
   * Retorna todos os cartões salvos
   */
  getAllCards: (): CardData[] => {
    if (typeof window === 'undefined') return [];
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) return [initialCardData]; // Retorna o inicial se estiver vazio
    try {
      return JSON.parse(data);
    } catch (e) {
      console.error("Erro ao ler banco local:", e);
      return [initialCardData];
    }
  },

  /**
   * Salva ou atualiza um cartão
   */
  saveCard: (card: CardData) => {
    if (typeof window === 'undefined') return;
    const cards = localDb.getAllCards();
    const index = cards.findIndex(c => c.id === card.id);
    
    const updatedCard = { ...card, lastUpdated: Date.now() };
    
    if (index >= 0) {
      cards[index] = updatedCard;
    } else {
      cards.push(updatedCard);
    }
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cards));
  },

  /**
   * Busca um cartão por ID
   */
  getCardById: (id: string): CardData | undefined => {
    const cards = localDb.getAllCards();
    return cards.find(c => c.id === id);
  },

  /**
   * Remove um cartão
   */
  deleteCard: (id: string) => {
    const cards = localDb.getAllCards().filter(c => c.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cards));
  },

  /**
   * Cria um novo cartão baseado no template inicial
   */
  createNewCard: (): CardData => {
    const newCard: CardData = {
      ...initialCardData,
      id: `card_${Date.now()}`,
      fullName: 'Novo Cartão',
      lastUpdated: Date.now()
    };
    localDb.saveCard(newCard);
    return newCard;
  }
};
