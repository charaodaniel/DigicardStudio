/**
 * Página de preview standalone (antes src/app/preview/page.tsx).
 * Lê 'digicard-preview-data' do localStorage e reage a mudanças.
 */
import { mountDigitalCard } from '../card.js';

const root = document.getElementById('card-root');

function loadData() {
  try {
    const saved = localStorage.getItem('digicard-preview-data');
    return saved ? JSON.parse(saved) : null;
  } catch (e) {
    console.error('Erro ao carregar dados do preview', e);
    return null;
  }
}

function render() {
  const card = loadData();
  if (!card) {
    root.innerHTML = `
      <div class="flex flex-col items-center gap-4 text-slate-400">
        <span class="material-symbols-outlined text-5xl text-slate-300">style</span>
        <p class="font-medium text-sm">Nenhum dado de preview encontrado. Abra o editor primeiro.</p>
      </div>`;
    return;
  }
  // Re-monta do zero para limpar listeners antigos
  const fresh = root.cloneNode(false);
  root.parentNode.replaceChild(fresh, root);
  fresh.id = 'card-root';
  mountDigitalCard(fresh, card);
}

render();

window.addEventListener('storage', (e) => {
  if (e.key === 'digicard-preview-data') render();
});

// Poll leve para capturar edições na mesma aba
setInterval(() => {
  const current = localStorage.getItem('digicard-preview-data');
  if (current !== render.lastData) {
    render.lastData = current;
    render();
  }
}, 1000);
render.lastData = localStorage.getItem('digicard-preview-data');
