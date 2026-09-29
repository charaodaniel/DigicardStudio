/**
 * Página "Meus Cartões" (antes src/app/meus-cartoes/page.tsx).
 * Usa HTMX para carregar o fragmento da grade e JS para injetar os dados do localStorage.
 */
import { db } from '../db.js';

function timeAgo(ts) {
  if (!ts) return 'recentemente';
  const diff = Math.floor((Date.now() - ts) / 1000);
  if (diff < 60) return 'agora mesmo';
  if (diff < 3600) return `há ${Math.floor(diff / 60)} min`;
  if (diff < 86400) return `há ${Math.floor(diff / 3600)} h`;
  const days = Math.floor(diff / 86400);
  if (days === 1) return 'há 1 dia';
  if (days < 30) return `há ${days} dias`;
  const months = Math.floor(days / 30);
  if (months === 1) return 'há 1 mês';
  if (months < 12) return `há ${months} meses`;
  return 'há mais de um ano';
}

function cardItemHTML(card) {
  return `
  <div class="bg-white border border-slate-200 rounded-xl overflow-hidden hover:shadow-xl transition-shadow group" data-card="${card.id}">
    <div class="aspect-[4/5] bg-slate-100 relative overflow-hidden">
      <div class="absolute inset-0 bg-cover bg-center" style="background-image:url(${card.bannerUrl || card.avatarUrl})">
        <div class="absolute inset-0 bg-black/40 backdrop-blur-[2px] flex flex-col items-center justify-center p-6 text-white text-center">
          <div class="size-16 rounded-full border-4 border-white/30 overflow-hidden mb-3">
            <img src="${card.avatarUrl}" alt="${card.fullName}" class="w-full h-full object-cover" />
          </div>
          <h3 class="font-bold text-lg leading-tight">${card.fullName}</h3>
          <p class="text-xs opacity-70 mt-1">${card.jobTitle}</p>
        </div>
      </div>
      <div class="absolute top-3 right-3 flex gap-2">
        <button data-delete="${card.id}" class="bg-red-500/90 hover:bg-red-500 p-2 rounded-lg text-white shadow-lg transition-colors" title="Excluir">
          <span class="material-symbols-outlined text-sm">delete</span>
        </button>
        <span class="backdrop-blur-md bg-white/20 text-white text-[10px] font-bold px-2 py-1 rounded uppercase border border-white/20">${card.template}</span>
      </div>
    </div>
    <div class="p-4">
      <h3 class="font-bold text-slate-900 truncate">${card.fullName}</h3>
      <p class="text-xs text-slate-500 mt-1">Editado ${timeAgo(card.lastUpdated)}</p>
      <div class="grid grid-cols-2 gap-2 mt-4 pt-4 border-t border-slate-100">
        <a href="/editor.html?id=${card.id}" class="flex items-center justify-center gap-2 p-2 rounded-lg bg-primary text-white font-bold text-xs hover:bg-primary/90 transition-colors">
          <span class="material-symbols-outlined text-sm">edit</span>
          Editar
        </a>
        <a href="/c/${card.id}.html" target="_blank" class="flex items-center justify-center gap-2 p-2 rounded-lg bg-slate-100 text-slate-700 font-bold text-xs hover:bg-slate-200 transition-colors">
          <span class="material-symbols-outlined text-sm">visibility</span>
          Ver
        </a>
      </div>
    </div>
  </div>`;
}

function newCardTileHTML() {
  return `
  <div id="new-card-tile" class="border-2 border-dashed border-slate-200 rounded-xl overflow-hidden hover:border-primary hover:bg-primary/5 transition-all group flex flex-col items-center justify-center p-8 cursor-pointer min-h-[300px]">
    <div class="size-16 rounded-full bg-slate-100 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors mb-4">
      <span class="material-symbols-outlined text-3xl">add</span>
    </div>
    <h3 class="font-bold text-slate-900">Novo Cartão</h3>
    <p class="text-sm text-slate-500 text-center mt-2 font-medium">Crie uma nova versão para sua identidade.</p>
  </div>`;
}

function renderGrid(searchTerm = '') {
  const grid = document.getElementById('cards-grid');
  const term = searchTerm.trim().toLowerCase();
  const cards = db.getAllCards().filter(
    (c) => !term || c.fullName.toLowerCase().includes(term) || (c.jobTitle || '').toLowerCase().includes(term)
  );

  grid.innerHTML = cards.map(cardItemHTML).join('') + newCardTileHTML();

  grid.querySelectorAll('[data-delete]').forEach((btn) =>
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      if (confirm('Tem certeza que deseja excluir este cartão?')) {
        db.deleteCard(btn.dataset.delete);
        renderGrid(document.getElementById('search').value);
      }
    })
  );

  const newTile = grid.querySelector('#new-card-tile');
  if (newTile) {
    newTile.addEventListener('click', () => {
      const card = db.createNewCard();
      window.location.href = `/editor.html?id=${card.id}`;
    });
  }
}

function exportJson() {
  const cards = db.getAllCards();
  const blob = new Blob([JSON.stringify(cards, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', 'cards.json');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

// Substitui o conteúdo do fragmento HTMX pelos dados reais
document.addEventListener('htmx:afterSwap', (e) => {
  if (e.target.id === 'cards-grid') renderGrid();
});

document.addEventListener('DOMContentLoaded', () => {
  const search = document.getElementById('search');
  search.addEventListener('input', () => renderGrid(search.value));
  document.getElementById('btn-new').addEventListener('click', () => {
    const card = db.createNewCard();
    window.location.href = `/editor.html?id=${card.id}`;
  });
  document.getElementById('btn-export')?.addEventListener('click', exportJson);
});
