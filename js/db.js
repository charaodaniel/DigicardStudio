/**
 * Banco de dados local (localStorage) — substitui o Supabase.
 * Mesma chave usada pelo app original: digicard_db_json
 */
import { initialCardData } from './data.js';

const STORAGE_KEY = 'digicard_db_json';

export const db = {
  getAllCards() {
    if (typeof window === 'undefined') return [];
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      if (!data) return [structuredClone(initialCardData)];
      const parsed = JSON.parse(data);
      return Array.isArray(parsed) ? parsed : [structuredClone(initialCardData)];
    } catch (e) {
      console.error('Erro ao ler banco local:', e);
      return [structuredClone(initialCardData)];
    }
  },

  saveCard(card) {
    const cards = this.getAllCards();
    const index = cards.findIndex((c) => c.id === card.id);
    const updated = { ...card, lastUpdated: Date.now() };
    if (index >= 0) cards[index] = updated;
    else cards.push(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cards));
  },

  getCardById(id) {
    return this.getAllCards().find((c) => c.id === id);
  },

  deleteCard(id) {
    const cards = this.getAllCards().filter((c) => c.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cards));
  },

  createNewCard() {
    const newCard = {
      ...structuredClone(initialCardData),
      id: `card_${Date.now()}_${Math.random().toString(36).slice(2, 11)}`,
      fullName: 'Novo Cartão',
      lastUpdated: Date.now(),
    };
    this.saveCard(newCard);
    return newCard;
  },
};
