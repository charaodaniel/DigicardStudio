/**
 * Preview digital do cartão + modal de compartilhar (antes digital-card-preview.tsx e share-modal.tsx).
 */
import { renderCard } from './templates.js';
import { downloadVCard, shareCard, trackEvent } from './utils.js';

/* ------------------- Modal de Compartilhar ------------------- */
let shareModalEl = null;

function ensureShareModal() {
  if (shareModalEl && document.body.contains(shareModalEl)) return;

  shareModalEl = document.createElement('div');
  shareModalEl.id = 'share-modal';
  shareModalEl.className = 'fixed inset-0 z-[100] hidden';
  shareModalEl.innerHTML = `
    <div class="absolute inset-0 bg-black/50 backdrop-blur-sm" data-close-share></div>
    <div class="relative mx-auto mt-24 w-[calc(100%-2rem)] max-w-md rounded-3xl bg-white p-6 shadow-2xl">
      <div class="text-center space-y-2">
        <h2 class="text-2xl font-black tracking-tight text-slate-900">Compartilhar Cartão</h2>
        <p class="text-sm font-medium text-slate-500">Escolha como você deseja enviar sua identidade digital.</p>
      </div>
      <div class="grid grid-cols-2 gap-3 py-6">
        <button class="share-opt flex items-center gap-3 p-4 rounded-2xl border border-slate-100 bg-slate-50/50 transition-all active:scale-95 hover:bg-green-50 group" data-method="whatsapp">
          <div class="size-10 rounded-xl bg-white shadow-sm flex items-center justify-center"><span class="material-symbols-outlined size-6 text-green-500">chat</span></div>
          <span class="text-sm font-bold text-slate-700">WhatsApp</span>
        </button>
        <button class="share-opt flex items-center gap-3 p-4 rounded-2xl border border-slate-100 bg-slate-50/50 transition-all active:scale-95 hover:bg-sky-50 group" data-method="telegram">
          <div class="size-10 rounded-xl bg-white shadow-sm flex items-center justify-center"><span class="material-symbols-outlined size-6 text-sky-500">send</span></div>
          <span class="text-sm font-bold text-slate-700">Telegram</span>
        </button>
        <button class="share-opt flex items-center gap-3 p-4 rounded-2xl border border-slate-100 bg-slate-50/50 transition-all active:scale-95 hover:bg-slate-100 group" data-method="email">
          <div class="size-10 rounded-xl bg-white shadow-sm flex items-center justify-center"><span class="material-symbols-outlined size-6 text-slate-500">mail</span></div>
          <span class="text-sm font-bold text-slate-700">E-mail</span>
        </button>
        <button class="share-opt flex items-center gap-3 p-4 rounded-2xl border border-slate-100 bg-slate-50/50 transition-all active:scale-95 hover:bg-blue-50 group" data-method="copy">
          <div class="size-10 rounded-xl bg-white shadow-sm flex items-center justify-center"><span class="material-symbols-outlined size-6 text-blue-500">link</span></div>
          <span class="text-sm font-bold text-slate-700">Copiar Link</span>
        </button>
      </div>
      <button data-close-share class="native-share hidden w-full items-center justify-center gap-2 rounded-2xl border-2 h-14 font-bold text-slate-700 hover:bg-slate-50">
        <span class="material-symbols-outlined">share</span>
        Outras opções do dispositivo
      </button>
    </div>`;
  document.body.appendChild(shareModalEl);
}

let shareCtx = { title: '', url: '' };

export function openShareModal(title, url) {
  ensureShareModal();
  shareCtx = { title, url };
  shareModalEl.classList.remove('hidden');
  const nativeBtn = shareModalEl.querySelector('.native-share');
  if (navigator.share) {
    nativeBtn.classList.remove('hidden');
    nativeBtn.classList.add('flex');
  }
}

function closeShareModal() {
  if (shareModalEl) shareModalEl.classList.add('hidden');
}

async function handleShareOption(method) {
  const { title, url } = shareCtx;
  const enc = encodeURIComponent;

  if (method === 'copy') {
    try {
      await navigator.clipboard.writeText(url);
      console.log('[Share] Link copiado!');
    } catch (e) {
      console.error('Erro ao copiar:', e);
    }
  } else if (method === 'whatsapp') {
    window.open(`https://wa.me/?text=${enc(title + ' ' + url)}`, '_blank');
  } else if (method === 'telegram') {
    window.open(`https://t.me/share/url?url=${enc(url)}&text=${enc(title)}`, '_blank');
  } else if (method === 'email') {
    window.open(`mailto:?subject=${enc(title)}&body=${enc(url)}`, '_blank');
  }
  closeShareModal();
}

document.addEventListener('click', (e) => {
  if (e.target.closest('[data-close-share]')) closeShareModal();
  const opt = e.target.closest('.share-opt');
  if (opt) handleShareOption(opt.dataset.method);
});

/* ------------------- Cartão digital (usado em /c/:slug e /preview) ------------------- */

/**
 * Renderiza o cartão dentro de um container e liga as ações.
 * @param {HTMLElement} container
 * @param {object} cardData
 */
export function mountDigitalCard(container, cardData) {
  container.style.fontFamily = `'${cardData.fontFamily}', sans-serif`;
  container.style.fontSize = `${cardData.baseFontSize}px`;

  container.innerHTML = `
    <div class="h-full w-full overflow-hidden flex flex-col">
      ${renderCard(cardData)}
    </div>`;

  container.addEventListener('click', (e) => {
    const shareBtn = e.target.closest('[data-action="share"]');
    if (shareBtn) {
      const url = window.location.href;
      openShareModal(`Cartão Digital - ${cardData.fullName}`, url);
      trackEvent('share_card', { template: cardData.template });
      return;
    }
    const saveBtn = e.target.closest('[data-action="save-contact"]');
    if (saveBtn) {
      downloadVCard(cardData);
      trackEvent('save_contact', { name: cardData.fullName });
    }
  });
}
