/**
 * Página pública do cartão: /c/<id>.html
 *
 * Duas formas de obter os dados:
 * 1. Gerador (npm run generate:cards): dados embutidos em <script type="application/json" id="card-data">
 * 2. Fallback dev: localStorage (chave digicard_db_json), id extraído do nome do arquivo
 */
import { db } from '../db.js';
import { mountDigitalCard } from '../card.js';
import { trackEvent } from '../utils.js';

function getEmbeddedData() {
  const el = document.getElementById('card-data');
  if (!el) return null;
  try {
    return JSON.parse(el.textContent);
  } catch (e) {
    console.error('Dados embutidos inválidos:', e);
    return null;
  }
}

function getSlug() {
  return window.location.pathname.split('/').pop().replace('.html', '');
}

const slug = getSlug();
const card = getEmbeddedData() || db.getCardById(slug);

const root = document.getElementById('card-root');

if (!card) {
  document.title = 'Cartão não encontrado — DigiCard Studio';
  root.innerHTML = `
    <div class="flex flex-col items-center gap-4 text-slate-900">
      <span class="material-symbols-outlined text-5xl text-slate-300">error</span>
      <p class="font-bold">Cartão não encontrado ou ID inválido.</p>
      <a href="/" class="text-primary font-bold text-sm underline">Voltar para o Home</a>
    </div>`;
} else {
  document.title = `${card.fullName} — Cartão Digital`;
  mountDigitalCard(root, card);
  trackEvent('view_card', { slug: card.id });
}
