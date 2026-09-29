/**
 * Página do editor (antes src/app/editor/page.tsx + componentes editor/*).
 * Renderiza o cartão via renderCard() e o gabarito físico diretamente.
 */
import { initialCardData } from '../data.js';
import { db } from '../db.js';
import { renderCard, socialIcon } from '../templates.js';
import { toast, renderTemplateLibrary, templates, templatePresets } from '../shared.js';
import { downloadPlotterSVG, downloadPhysicalPNG } from '../utils.js';

/* ---------------- Estado ---------------- */
let cardData = structuredClone(initialCardData);
let past = [];
let future = [];
let activeTool = 'conteudo';
let mode = 'digital';
let selectedLinkId = null;
let zoom = 85;
let saveTimer = null;

/* ---------------- Helpers ---------------- */
const $ = (sel) => document.querySelector(sel);

function updateCardData(updater) {
  const next = typeof updater === 'function' ? updater(cardData) : { ...cardData, ...updater };
  if (JSON.stringify(next) !== JSON.stringify(cardData)) {
    past.push(cardData);
    if (past.length > 20) past.shift();
    future = [];
  }
  cardData = next;
  scheduleSave();
  render();
}

function scheduleSave() {
  clearTimeout(saveTimer);
  saveTimer = setTimeout(() => {
    db.saveCard(cardData);
    localStorage.setItem('digicard-preview-data', JSON.stringify(cardData));
    const status = $('#save-status');
    if (status) status.textContent = 'Alterações salvas automaticamente ✓';
  }, 1000);
}

/* ---------------- Toast ---------------- */
let toastEl = null;
let toastTimer = null;
function toastLocal(title, desc = '') {
  if (toastEl) {
    toastEl.querySelector('.toast-t').textContent = title;
    toastEl.querySelector('.toast-d').textContent = desc;
    toastEl.classList.remove('hidden');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toastEl.classList.add('hidden'), 3000);
    return;
  }
  toastEl = document.createElement('div');
  toastEl.className = 'fixed bottom-6 right-6 z-[200] max-w-sm bg-slate-900 text-white rounded-xl shadow-2xl px-5 py-4';
  toastEl.innerHTML = '<p class="text-sm font-bold toast-t"></p><p class="text-xs text-white/70 mt-1 toast-d"></p>';
  document.body.appendChild(toastEl);
}

/* ---------------- Renderização ---------------- */
function render() {
  renderModeToggle();
  renderUndoRedo();
  renderCanvas();
  renderPropsPanel();
}

function renderModeToggle() {
  document.querySelectorAll('.mode-btn').forEach((btn) => {
    const active = btn.dataset.mode === mode;
    btn.className = `mode-btn px-4 py-1.5 text-sm font-semibold rounded transition-all ${
      active ? 'bg-white shadow-sm text-primary' : 'text-slate-500 hover:text-slate-700'
    }`;
  });
  $('#export-wrap').classList.toggle('hidden', mode !== 'physical');
}

function renderUndoRedo() {
  const undoBtn = $('#btn-undo');
  const redoBtn = $('#btn-redo');
  undoBtn.disabled = past.length === 0;
  redoBtn.disabled = future.length === 0;
  undoBtn.className = `p-1.5 rounded transition-colors ${past.length ? 'hover:bg-white text-slate-700' : 'text-slate-300 cursor-not-allowed'}`;
  redoBtn.className = `p-1.5 rounded transition-colors ${future.length ? 'hover:bg-white text-slate-700' : 'text-slate-300 cursor-not-allowed'}`;
}

/* ---------------- Canvas (digital ou físico) ---------------- */
function renderCanvas() {
  const area = $('#canvas-area');

  if (mode === 'digital') {
    area.className = 'flex flex-col items-center w-full justify-center min-h-full';
    area.innerHTML = `
      <div id="phone-mock" class="shadow-[0_0_0_12px_#1f2937,0_0_0_14px_#374151,0_20px_50px_rgba(0,0,0,0.1)] w-[360px] h-[720px] bg-white rounded-[3rem] relative overflow-hidden flex flex-col transition-transform duration-200 ease-out shrink-0">
        <div class="h-10 w-full flex items-center justify-between px-8 pt-4 shrink-0 z-20">
          <span class="text-[10px] font-bold text-slate-900">9:41</span>
          <div class="flex items-center gap-1.5 text-slate-900">
            <span class="material-symbols-outlined text-[14px]">signal_cellular_4_bar</span>
            <span class="material-symbols-outlined text-[14px]">wifi</span>
            <span class="material-symbols-outlined text-[14px]">battery_very_low</span>
          </div>
        </div>
        <div id="phone-screen" class="flex-1 relative overflow-hidden"></div>
        <div class="h-1.5 w-32 bg-slate-300 rounded-full mx-auto mb-4 shrink-0 z-20"></div>
        <div id="edit-zones" class="absolute inset-0 z-50 pointer-events-none flex flex-col"></div>
        <div class="absolute inset-0 z-[60] pointer-events-none" id="upload-overlay"></div>
    </div>`;
    document.getElementById('phone-screen').innerHTML = renderCard(cardData);
    renderEditZones();
  } else {
    area.className = 'flex flex-col items-center w-full justify-start pt-12 pb-32';
    area.innerHTML = physicalMockup();
    bindPhysicalClicks(area);
  }
  area.style.transform = '';
  area.style.transform = `scale(${zoom / 100})`;
  area.style.transformOrigin = 'top center';
  $('#zoom-label').textContent = `${zoom}%`;
}

function renderEditZones() {
  const zones = [
    { top: '0%', h: '25%', tool: 'imagens', icon: 'photo_camera', label: 'Mídia' },
    { top: '25%', h: '20%', tool: 'conteudo', icon: 'edit', label: 'Perfil' },
    { top: '45%', h: '15%', tool: 'conteudo', icon: 'insights', label: 'Métricas' },
    { top: '60%', h: '30%', tool: 'social', icon: 'share', label: 'Links' },
    { top: '90%', h: '10%', tool: 'qrcode', icon: 'qr_code_2', label: 'QR' },
  ];

  const el = document.getElementById('edit-zones');
  if (!el) return;
  el.innerHTML = zones
    .filter((z) => z.top)
    .map(
      (z) => `
      <div data-zone="${z.tool}" class="absolute left-0 w-full cursor-pointer pointer-events-auto group/zone" style="top:${z.top}; height:${z.h}">
        <div class="absolute top-4 left-4 bg-primary text-white px-2 py-1 rounded-full opacity-0 group-hover/zone:opacity-100 shadow-xl transition-all flex items-center gap-2 border border-white/20 backdrop-blur-md">
          <span class="material-symbols-outlined text-xs">${z.icon}</span>
          <span class="text-[8px] font-bold uppercase tracking-wider">${z.label}</span>
        </div>
      </div>`
    )
    .join('');

  el.querySelectorAll('[data-zone]').forEach((z) =>
    z.addEventListener('click', (e) => {
      e.stopPropagation();
      setActiveTool(z.dataset.zone);
    })
  );
}

/* ---------------- Mockup físico ---------------- */
function physicalMockup() {
  const c = cardData;
  const currentTemplate = templates.find((t) => t.id === c.template);
  const isVertical = currentTemplate?.orientation === 'vertical';

  const textColor = getContrastColor(c.physicalBackgroundColor || '#ffffff');

  const front = () => {
    const base = String(c.template).split('-')[0];

    if (base === 'spotify') {
      return `
      <div class="flex-1 flex p-6 relative overflow-hidden h-full ${isVertical ? 'flex-col items-center' : 'flex-row items-start gap-4'}" style="font-family:'${c.fontFamily}', sans-serif; background-color:${c.physicalBackgroundColor}; color:${textColor}">
        <div class="absolute top-4 right-4 text-[6px] font-bold tracking-[0.2em] opacity-40 uppercase">DigiCard Music</div>
        <div class="shrink-0 cursor-pointer hover:ring-2 hover:ring-primary rounded transition-all ${isVertical ? 'w-full mb-4' : 'w-32'}" data-goto="imagens">
          ${c.physicalShowAvatar ? `<img src="${esc(c.avatarUrl)}" class="w-full aspect-square object-cover rounded shadow-lg" />` : ''}
        </div>
        <div class="flex-1 flex flex-col justify-center">
          ${
            c.physicalShowTitle
              ? `
          <div class="mb-2 cursor-pointer hover:opacity-70 transition-opacity" data-goto="conteudo">
            <h2 class="text-sm font-black uppercase tracking-tight" style="font-size:${c.baseFontSize * 0.8}px">${esc(c.fullName)}</h2>
            <p class="text-[#1DB954] text-[8px] font-bold uppercase">${esc(c.jobTitle || 'Artista')}</p>
          </div>`
              : ''
          }
          ${
            c.physicalShowLinks
              ? `<div class="space-y-1">${c.links
                  .slice(0, 3)
                  .map(
                    (l, i) => `
              <div data-link="${l.id}" class="flex items-center gap-2 text-[8px] border-b border-black/5 py-0.5 cursor-pointer hover:bg-black/5 rounded px-1 transition-colors">
                <span class="opacity-30">0${i + 1}</span>
                <span class="font-bold truncate">${esc(l.value)}</span>
              </div>`
                  )
                  .join('')}</div>`
              : ''
          }
        </div>
      </div>`;
    }

    return `
    <div class="flex-1 flex p-8 relative overflow-hidden h-full ${isVertical ? 'flex-col items-center text-center' : 'flex-row items-center justify-between gap-6'}" style="font-family:'${c.fontFamily}', sans-serif; background-color:${c.physicalBackgroundColor}; color:${textColor}">
      <div class="flex flex-col flex-1">
        ${
          c.physicalShowTitle
            ? `
        <div class="mb-4 cursor-pointer hover:bg-black/5 p-1 rounded transition-colors" data-goto="conteudo">
          <h2 class="text-xl font-black tracking-tight" style="font-size:${c.baseFontSize * 1.2}px">${esc(c.fullName)}</h2>
          <p class="text-xs font-bold uppercase tracking-widest opacity-60" style="color:${c.themeColor}">${esc(c.jobTitle)}</p>
        </div>`
            : ''
        }
        ${
          c.physicalShowStats && (c.stats || []).length
            ? `
        <div class="flex gap-4 mb-4 cursor-pointer hover:bg-black/5 rounded p-1 transition-colors" data-goto="conteudo">
          ${c.stats
            .slice(0, 3)
            .map(
              (s, i) => `
          <div class="text-left">
            <p class="text-[10px] font-black leading-none">${esc(s.value)}</p>
            <p class="text-[6px] uppercase font-bold opacity-40">${esc(s.label)}</p>
          </div>`
            )
            .join('')}
        </div>`
            : ''
        }
        ${
          c.physicalShowLinks
            ? `
        <div class="space-y-2">
          ${c.links
            .slice(0, 3)
            .map(
              (l) => `
          <div data-link="${l.id}" class="flex items-center gap-2 text-[10px] cursor-pointer hover:bg-black/5 rounded p-1 transition-colors" style="font-size:${c.baseFontSize * 0.6}px">
            ${socialIcon(l.type, l.icon, 'text-xs', `color:${l.color || c.themeColor}; font-size:1.2em`)}
            <span class="font-medium truncate">${esc(l.value)}</span>
          </div>`
            )
            .join('')}
        </div>`
            : ''
        }
      </div>
      ${
        c.physicalShowAvatar
          ? `
      <div class="rounded-full overflow-hidden border-2 border-white shadow-xl bg-slate-100 cursor-pointer hover:scale-105 transition-transform ${isVertical ? 'size-24' : 'size-32'}" data-goto="imagens">
        <img src="${esc(c.avatarUrl)}" class="w-full h-full object-cover" />
      </div>`
          : ''
      }
      ${
        c.physicalShowFooter
          ? `
      <div class="absolute bottom-4 left-8 right-8 flex justify-between items-center opacity-40 text-[7px] font-bold uppercase tracking-widest cursor-pointer hover:opacity-100 transition-opacity" data-goto="fisico">
        <span>${esc(c.customWebsiteUrl || 'digicard.studio')}</span>
        <span>${esc(c.footerText || 'PRODUCED BY DIGICARD')}</span>
      </div>`
          : ''
      }
    </div>`;
  };

  const back = () => `
  <div class="flex-1 flex flex-col items-center justify-center p-8 relative h-full" style="font-family:'${c.fontFamily}', sans-serif; background-color:${c.physicalBackgroundColor}">
    <div class="absolute inset-0 opacity-[0.03]" style="background-image:radial-gradient(${textColor} 1px, transparent 1px); background-size:24px 24px"></div>
    ${
      c.physicalShowQR
        ? `
    <div class="flex flex-col items-center gap-4 cursor-pointer group" data-goto="qrcode">
      <div class="p-4 bg-white rounded-3xl shadow-xl border border-slate-100 group-hover:border-primary transition-colors">
        ${c.qrCodeUrl ? `<img src="${esc(c.qrCodeUrl)}" class="size-32" />` : '<div class="size-32 bg-slate-100 rounded flex items-center justify-center"><span class="material-symbols-outlined text-4xl text-slate-300">qr_code_2</span></div>'}
      </div>
      <div class="text-center">
        <h3 class="text-sm font-black uppercase tracking-widest" style="color:${textColor}">${esc(c.fullName)}</h3>
        <p class="text-[7px] font-bold tracking-[0.3em] uppercase opacity-40" style="color:${textColor}">Scan to save contact</p>
      </div>
    </div>`
        : ''
    }
  </div>`;

  const dims = isVertical ? 'w-[340px] h-[580px]' : 'w-[580px] h-[340px]';

  return `
  <div class="flex flex-col items-center gap-12 print:hidden">
    <div class="bg-primary/5 border border-primary/20 p-6 rounded-2xl max-w-[800px] text-center shadow-sm">
      <h4 class="text-base font-bold text-primary flex items-center justify-center gap-2 mb-2">
        <span class="material-symbols-outlined text-2xl">print</span>
        Gabarito Técnico "Aberto" (A4)
      </h4>
      <p class="text-[10px] text-slate-500 leading-relaxed uppercase tracking-widest font-medium">
        O PDF será gerado com frentes e versos organizados com espaçamento para facilitar o corte. Use a ferramenta "Impressão" na lateral para personalizar.
      </p>
    </div>

    <div class="flex flex-col items-start justify-center gap-12">
      <div class="relative group/face">
        <div class="relative bg-white shadow-2xl overflow-hidden rounded-sm ${dims}">
          <div class="absolute inset-0 flex overflow-hidden">${front()}</div>
        </div>
        <p class="text-center mt-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Frente (Anverso)</p>
      </div>
      <div class="relative group/face">
        <div class="relative bg-white shadow-2xl overflow-hidden rounded-sm ${dims}">
          <div class="absolute inset-0 flex overflow-hidden">${back()}</div>
        </div>
        <p class="text-center mt-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Verso (Reverso)</p>
      </div>
    </div>

    <!-- Grade A4 para impressão -->
    <div class="hidden print:block">
      <div class="print-layout-a4">
        ${Array.from({ length: 5 })
          .map(
            () => `
        <div class="print-card-item"><div class="w-full h-full flex" style="width:85mm;height:55mm">${front()}</div></div>
        <div class="print-card-item"><div class="w-full h-full flex" style="width:85mm;height:55mm">${back()}</div></div>`
          )
          .join('')}
      </div>
    </div>
  </div>`;
}

function bindPhysicalClicks(root) {
  root.querySelectorAll('[data-goto]').forEach((el) =>
    el.addEventListener('click', () => setActiveTool(el.dataset.goto))
  );
  root.querySelectorAll('[data-link]').forEach((el) =>
    el.addEventListener('click', () => {
      selectedLinkId = el.dataset.link;
      setActiveTool('social');
    })
  );
}

function getContrastColor(hexcolor) {
  if (!hexcolor) return '#000000';
  const r = parseInt(hexcolor.slice(1, 3), 16);
  const g = parseInt(hexcolor.slice(3, 5), 16);
  const b = parseInt(hexcolor.slice(5, 7), 16);
  const yiq = (r * 299 + g * 587 + b * 114) / 1000;
  return yiq >= 128 ? '#000000' : '#ffffff';
}

function esc(s) {
  return String(s ?? '').replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');
}

/* ---------------- Painel de propriedades ---------------- */
const colorPalette = ['#5048e5', '#6366f1', '#8b5cf6', '#ec4899', '#f43f5e', '#ef4444', '#f97316', '#f59e0b', '#eab308', '#84cc16', '#22c55e', '#10b981', '#06b6d4', '#0ea5e9', '#3b82f6', '#1d4ed8', '#000000', '#475569', '#94a3b8', '#ffffff'];

const fontFamilies = [
  { name: 'Inter', value: 'Inter', description: 'Moderna e Legível' },
  { name: 'Space Grotesk', value: 'Space Grotesk', description: 'Tech e Futurista' },
  { name: 'Roboto', value: 'Roboto', description: 'Versátil e Limpa' },
  { name: 'Lora', value: 'Lora', description: 'Serifada Elegante' },
  { name: 'Playfair Display', value: 'Playfair Display', description: 'Luxuosa e Clássica' },
];

const socialTypes = [
  { value: 'whatsapp', label: 'WhatsApp' }, { value: 'instagram', label: 'Instagram' },
  { value: 'spotify', label: 'Spotify' },
  { value: 'youtube', label: 'YouTube' }, { value: 'tiktok', label: 'TikTok' },
  { value: 'linkedin', label: 'LinkedIn' }, { value: 'github', label: 'GitHub' },
  { value: 'facebook', label: 'Facebook' }, { value: 'discord', label: 'Discord' },
  { value: 'twitter', label: 'X (Twitter)' }, { value: 'twitch', label: 'Twitch' },
  { value: 'threads', label: 'Threads' }, { value: 'email', label: 'E-mail' },
  { value: 'phone', label: 'Telefone' }, { value: 'website', label: 'Website/Link' },
];

const iconCategories = [
  { label: 'Comunicação', icons: ['chat', 'call', 'mail', 'alternate_email', 'send', 'forum', 'sms', 'contact_page'] },
  { label: 'Mídia & Tech', icons: ['photo_camera', 'camera_alt', 'play_circle', 'subscriptions', 'video_library', 'music_note', 'headphones', 'mic', 'code', 'terminal', 'qr_code_2'] },
  { label: 'Negócios', icons: ['work', 'shopping_cart', 'shopping_bag', 'storefront', 'payments', 'wallet', 'card_membership', 'campaign', 'language', 'public'] },
  { label: 'Utilidades', icons: ['person', 'person_add', 'notifications', 'event', 'calendar_month', 'location_on', 'map', 'star', 'favorite', 'verified', 'article', 'description', 'attach_file', 'cloud_download', 'auto_awesome'] },
];

function colorPickerGrid(currentColor, onSelect) {
  const wrap = document.createElement('div');
  wrap.className = 'grid grid-cols-5 gap-2';
  colorPalette.forEach((color) => {
    const b = document.createElement('button');
    b.className = `w-8 h-8 rounded-full transition-all border shrink-0 ${color === '#ffffff' ? 'border-slate-200' : 'border-transparent'}`;
    b.style.backgroundColor = color;
    b.title = color;
    if ((currentColor || '').toLowerCase() === color.toLowerCase()) {
      b.style.boxShadow = `0 0 0 2px #fff, 0 0 0 4px ${color}`;
    }
    b.addEventListener('click', () => onSelect(color));
    wrap.appendChild(b);
  });
  return wrap;
}

const toolLabels = {
  conteudo: 'Perfil & Métricas',
  estilo: 'Estilo & Tipografia',
  social: 'Playlist de Links',
  imagens: 'Mídia & Capa',
  qrcode: 'QR Code',
  fisico: 'Impressão',
  modelos: 'Modelos',
};

function renderPropsPanel() {
  const panel = $('#props-panel');
  if (activeTool === 'modelos') {
    panel.innerHTML = '';
    panel.appendChild(renderTemplateLibrary(applyTemplate));
    return;
  }
  panel.innerHTML = propsPanelHTML();
  bindPropsEvents(panel);
}

function applyTemplate(templateId) {
  const preset = templatePresets[templateId] || { physicalBackgroundColor: '#ffffff' };
  updateCardData((prev) => ({ ...prev, ...preset, template: templateId }));
}

function propsPanelHTML() {
  const c = cardData;
  const toolLabel = toolLabels[activeTool] || 'Geral';

  return `
  <div class="p-6 border-b border-slate-200 shrink-0">
    <div class="flex items-center justify-between">
      <h3 class="font-bold text-slate-900">Propriedades</h3>
      <span class="text-[10px] bg-primary/10 text-primary px-2 py-1 rounded-full font-bold uppercase">${toolLabel}</span>
    </div>
  </div>
  <div class="flex-1 overflow-y-auto no-scrollbar p-6 space-y-8 pb-32">
    ${activeTool === 'conteudo' ? toolConteudo(c) : ''}
    ${activeTool === 'estilo' ? toolEstilo(c) : ''}
    ${activeTool === 'social' ? toolSocial(c) : ''}
    ${activeTool === 'imagens' ? toolImagens(c) : ''}
    ${activeTool === 'qrcode' ? toolQrcode(c) : ''}
    ${activeTool === 'fisico' ? toolFisico(c) : ''}
  </div>`;
}

/* ---- Ferramenta: Conteúdo ---- */
function toolConteudo(c) {
  const stats = c.stats
    .map(
      (stat, index) => `
    <div class="space-y-2 p-3 bg-slate-50 rounded-xl border border-slate-100 relative group" data-stat="${index}">
      <button data-remove-stat="${index}" class="absolute -top-2 -right-2 bg-red-500 text-white rounded-full size-5 items-center justify-center hidden group-hover:flex shadow-lg">
        <span class="material-symbols-outlined text-xs">close</span>
      </button>
      <div class="grid grid-cols-2 gap-2">
        <input data-stat-field="label" data-stat="${index}" value="${esc(stat.label)}" class="h-8 text-xs rounded-md border border-slate-200 px-2" />
        <input data-stat-field="value" data-stat="${index}" value="${esc(stat.value)}" class="h-8 text-xs font-bold rounded-md border border-slate-200 px-2" />
      </div>
      <input data-stat-field="url" data-stat="${index}" value="${esc(stat.url || '')}" placeholder="Link da métrica..." class="h-7 text-[10px] bg-white rounded-md border border-slate-200 px-2" />
    </div>`
    )
    .join('');

  return `
  <div class="space-y-6">
    <div class="space-y-4">
      <label class="text-xs font-bold text-slate-500 uppercase tracking-wider">Identidade Digital</label>
      <div class="space-y-3">
        <div class="space-y-1">
          <p class="text-[11px] font-medium text-slate-400 ml-1">Nome (ou Link do Nome)</p>
          <div class="flex gap-2">
            <input data-field="fullName" value="${esc(c.fullName)}" class="text-sm flex-1 rounded-md border border-slate-200 px-2 py-1.5" />
            <input data-field="fullNameLink" value="${esc(c.fullNameLink || '')}" placeholder="URL..." class="text-sm w-24 rounded-md border border-slate-200 px-2 py-1.5" />
          </div>
        </div>
        <div class="space-y-1">
          <p class="text-[11px] font-medium text-slate-400 ml-1">Cargo (ou Link do Cargo)</p>
          <div class="flex gap-2">
            <input data-field="jobTitle" value="${esc(c.jobTitle)}" class="text-sm flex-1 rounded-md border border-slate-200 px-2 py-1.5" />
            <input data-field="jobTitleLink" value="${esc(c.jobTitleLink || '')}" placeholder="URL..." class="text-sm w-24 rounded-md border border-slate-200 px-2 py-1.5" />
          </div>
        </div>
        <div class="space-y-1">
          <p class="text-[11px] font-medium text-slate-400 ml-1">Bio</p>
          <textarea data-field="bio" class="text-sm min-h-[100px] rounded-md border border-slate-200 px-2 py-1.5">${esc(c.bio)}</textarea>
        </div>
      </div>
    </div>

    <div class="space-y-4 pt-4 border-t">
      <div class="flex items-center justify-between">
        <label class="text-xs font-bold text-slate-500 uppercase tracking-wider">Métricas Autônomas</label>
        <button id="add-stat" class="h-6 text-[10px] uppercase font-bold text-primary px-2">Adicionar</button>
      </div>
      <div class="space-y-3">${stats}</div>
    </div>
  </div>`;
}

/* ---- Ferramenta: Estilo ---- */
function toolEstilo(c) {
  return `
  <div class="space-y-8">
    <div class="space-y-4">
      <label class="text-xs font-bold text-slate-500 uppercase tracking-wider">Tipografia Global</label>
      <div class="grid grid-cols-1 gap-2">
        ${fontFamilies
          .map(
            (font) => `
          <button data-font="${font.value}" class="flex flex-col items-start p-3 rounded-xl border-2 transition-all text-left ${
            c.fontFamily === font.value ? 'border-primary bg-primary/5 shadow-sm' : 'border-slate-100 hover:border-primary/30'
          }">
            <span class="text-sm font-bold" style="font-family:'${font.value}', sans-serif">${font.name}</span>
            <span class="text-[10px] text-slate-400">${font.description}</span>
          </button>`
          )
          .join('')}
      </div>
    </div>
    <div class="space-y-4 pt-6 border-t">
      <div class="flex items-center justify-between">
        <label class="text-xs font-bold text-slate-500 uppercase tracking-wider">Tamanho do Texto</label>
        <span id="font-size-label" class="text-xs font-bold text-primary">${c.baseFontSize}px</span>
      </div>
      <input type="range" id="font-size" min="12" max="24" step="1" value="${c.baseFontSize}" class="w-full accent-primary" />
    </div>
    <div class="pt-6 border-t space-y-4">
      <label class="text-xs font-bold text-slate-500 uppercase tracking-wider">Paleta do Tema (Digital)</label>
      <div id="theme-colors"></div>
    </div>
  </div>`;
}

/* ---- Ferramenta: Social ---- */
function toolSocial(c) {
  const accordion = c.links
    .map(
      (link) => `
    <div class="border rounded-xl px-4 bg-white shadow-sm overflow-hidden border-slate-100" data-acc="${link.id}">
      <button data-acc-toggle="${link.id}" class="w-full flex items-center justify-between py-4">
        <div class="flex items-center gap-3 text-left">
          <div class="size-8 rounded-lg flex items-center justify-center text-white shrink-0" style="background-color:${link.color || c.themeColor}">
            ${socialIcon(link.type, link.icon, 'text-sm')}
          </div>
          <span class="text-sm font-bold truncate">${esc(link.label || 'Link sem nome')}</span>
        </div>
        <span class="material-symbols-outlined text-slate-400 transition-transform" data-acc-icon="${link.id}">expand_more</span>
      </button>
      <div class="acc-body ${selectedLinkId === link.id ? '' : 'hidden'} pb-6 space-y-4 border-t pt-4" data-acc-body="${link.id}">
        <div class="space-y-1.5">
          <p class="text-[10px] font-bold text-slate-400 uppercase">Tipo de Conexão</p>
          <select data-link-field="type" data-link="${link.id}" class="h-9 text-sm w-full rounded-md border border-slate-200 px-2">
            ${socialTypes.map((t) => `<option value="${t.value}" ${link.type === t.value ? 'selected' : ''}>${t.label}</option>`).join('')}
          </select>
        </div>
        <div class="space-y-1.5">
          <p class="text-[10px] font-bold text-slate-400 uppercase">Rótulo do Link</p>
          <input data-link-field="label" data-link="${link.id}" value="${esc(link.label)}" class="h-9 text-sm w-full rounded-md border border-slate-200 px-2" />
        </div>
        <div class="space-y-1.5">
          <p class="text-[10px] font-bold text-slate-400 uppercase">Destino (URL/Handle)</p>
          <input data-link-field="value" data-link="${link.id}" value="${esc(link.value)}" class="h-9 text-sm w-full rounded-md border border-slate-200 px-2" />
        </div>
        <div class="space-y-3">
          <p class="text-[10px] font-bold text-slate-400 uppercase">Ícone Personalizado (Opcional)</p>
          <div class="border rounded-lg bg-slate-50 p-2 space-y-4 max-h-48 overflow-y-auto no-scrollbar">
            ${iconCategories
              .map(
                (cat) => `
              <div class="space-y-2">
                <p class="text-[8px] font-black uppercase tracking-widest text-slate-400 px-1">${cat.label}</p>
                <div class="grid grid-cols-6 gap-1">
                  ${cat.icons
                    .map(
                      (icon) => `
                    <button data-icon="${icon}" data-link-icon="${link.id}" class="p-1.5 rounded transition-all flex items-center justify-center ${
                      link.icon === icon ? 'bg-primary text-white' : 'text-slate-400 hover:bg-slate-200'
                    }"><span class="material-symbols-outlined text-base">${icon}</span></button>`
                    )
                    .join('')}
                </div>
              </div>`
              )
              .join('')}
          </div>
        </div>
        <div class="flex items-center justify-between pt-2">
          <button data-remove-link="${link.id}" class="text-red-500 text-xs h-8 px-2">Remover Link</button>
          <div class="flex gap-1">
            ${colorPalette
              .slice(0, 5)
              .map(
                (clr) => `
              <button data-link-color="${clr}" data-link-for="${link.id}" class="size-5 rounded-full border border-white/20" style="background-color:${clr}"></button>`
              )
              .join('')}
          </div>
        </div>
      </div>
    </div>`
    )
    .join('');

  return `
  <div class="space-y-4">
    <label class="text-xs font-bold text-slate-500 uppercase tracking-wider">Playlist de Conexões</label>
    <div class="w-full space-y-2">${accordion}</div>
    <button id="add-link" class="w-full h-12 rounded-xl gap-2 mt-4 border-2 border-slate-200 text-sm font-semibold flex items-center justify-center">
      <span class="material-symbols-outlined text-lg">add_circle</span>
      Adicionar Novo Link
    </button>
  </div>`;
}

/* ---- Ferramenta: Imagens ---- */
function toolImagens(c) {
  return `
  <div class="space-y-6">
    <div class="space-y-4">
      <label class="text-xs font-bold text-slate-500 uppercase tracking-wider">Foto de Perfil</label>
      <div class="size-24 rounded-full border-2 border-primary/20 p-1 mx-auto relative group">
        <img src="${esc(c.avatarUrl)}" class="w-full h-full rounded-full object-cover" alt="Avatar" />
      </div>
      <div class="space-y-2">
        <button data-upload="avatarUrl" class="flex-1 gap-2 text-xs h-10 border rounded-lg flex items-center justify-center w-full hover:bg-slate-50">
          <span class="material-symbols-outlined text-lg">upload</span>
          Fazer Upload
        </button>
        <input type="file" accept="image/*" class="hidden" data-file-input="avatarUrl" />
        <input data-field="avatarUrl" value="${esc(c.avatarUrl)}" placeholder="URL da Foto..." class="text-sm w-full rounded-md border border-slate-200 px-2 py-1.5" />
        <input data-field="avatarLink" value="${esc(c.avatarLink || '')}" placeholder="Link ao clicar..." class="text-sm w-full rounded-md border border-slate-200 px-2 py-1.5" />
      </div>
    </div>

    <div class="space-y-4 pt-6 border-t">
      <label class="text-xs font-bold text-slate-500 uppercase tracking-wider">Banner / Capa</label>
      <div class="aspect-video w-full rounded-lg bg-slate-100 overflow-hidden border">
        ${c.bannerUrl ? `<img src="${esc(c.bannerUrl)}" class="w-full h-full object-cover" alt="Banner" />` : ''}
      </div>
      <div class="space-y-2">
        <button data-upload="bannerUrl" class="flex-1 gap-2 text-xs h-10 border rounded-lg flex items-center justify-center w-full hover:bg-slate-50">
          <span class="material-symbols-outlined text-lg">upload</span>
          Fazer Upload
        </button>
        <input type="file" accept="image/*" class="hidden" data-file-input="bannerUrl" />
        <input data-field="bannerUrl" value="${esc(c.bannerUrl || '')}" placeholder="URL do Banner..." class="text-sm w-full rounded-md border border-slate-200 px-2 py-1.5" />
        <input data-field="bannerLink" value="${esc(c.bannerLink || '')}" placeholder="Link ao clicar..." class="text-sm w-full rounded-md border border-slate-200 px-2 py-1.5" />
      </div>
    </div>
  </div>`;
}

/* ---- Ferramenta: QR Code ---- */
function toolQrcode(c) {
  return `
  <div class="space-y-6 text-center">
    <label class="text-xs font-bold text-slate-500 uppercase tracking-wider">QR Code Inteligente</label>
    <div class="p-6 bg-white border rounded-2xl mx-auto inline-block shadow-sm">
      ${c.qrCodeUrl ? `<img src="${esc(c.qrCodeUrl)}" class="size-32" alt="QR" />` : '<span class="material-symbols-outlined text-4xl opacity-20">qr_code_2</span>'}
    </div>
    <div class="space-y-3 text-left">
      <p class="text-[11px] font-medium text-slate-400 ml-1">Destino do QR Code (URL ou Texto)</p>
      <input id="qr-input" value="${esc(c.qrCodeData || '')}" placeholder="https://..." class="text-sm w-full rounded-md border border-slate-200 px-2 py-1.5" />
      <button id="qr-reset" class="w-full text-[10px] font-bold uppercase h-9 border rounded-lg flex items-center justify-center gap-2 hover:bg-slate-50">
        <span class="material-symbols-outlined text-sm">link</span>
        Usar Link do Cartão
      </button>
    </div>
  </div>`;
}

function toolFisico(c) {
  const switchRow = (field, label, checked) => `
    <div class="flex items-center justify-between">
      <span class="text-sm font-semibold">${label}</span>
      <button data-switch="${field}" role="switch" aria-checked="${checked}"
        class="w-11 h-6 rounded-full transition-colors relative ${checked ? 'bg-primary' : 'bg-slate-200'}">
        <span class="absolute top-0.5 ${checked ? 'left-[22px]' : 'left-0.5'} w-5 h-5 rounded-full bg-white shadow transition-all"></span>
      </button>
    </div>`;

  return `
  <div class="space-y-8">
    <div class="space-y-4">
      <label class="text-xs font-bold text-slate-500 uppercase tracking-wider">Layout de Impressão</label>
      <div class="space-y-4 p-4 bg-slate-50 rounded-xl border border-slate-100">
        ${switchRow('physicalShowAvatar', 'Exibir Foto de Perfil', c.physicalShowAvatar !== false)}
        ${switchRow('physicalShowTitle', 'Exibir Nome e Cargo', c.physicalShowTitle !== false)}
        ${switchRow('physicalShowStats', 'Exibir Métricas', c.physicalShowStats !== false)}
        ${switchRow('physicalShowLinks', 'Exibir Links (Top 3)', c.physicalShowLinks !== false)}
        ${switchRow('physicalShowQR', 'Exibir QR Code (Verso)', c.physicalShowQR !== false)}
        ${switchRow('physicalShowFooter', 'Exibir Rodapé Técnico', c.physicalShowFooter !== false)}
      </div>
    </div>
    <div class="space-y-4 pt-6 border-t">
      <label class="text-xs font-bold text-slate-500 uppercase tracking-wider">Cor do Papel</label>
      <div id="paper-colors"></div>
    </div>
    <div class="space-y-4 pt-6 border-t">
      <label class="text-xs font-bold text-slate-500 uppercase tracking-wider">Metadados do Rodapé</label>
      <div class="space-y-3">
        <div class="space-y-1">
          <p class="text-[11px] font-medium text-slate-400 ml-1">Seu Website</p>
          <input data-field="customWebsiteUrl" value="${esc(c.customWebsiteUrl || '')}" placeholder="ex: www.seusite.com" class="text-sm w-full rounded-md border border-slate-200 px-2 py-1.5" />
        </div>
        <div class="space-y-1">
          <p class="text-[11px] font-medium text-slate-400 ml-1">Texto de Créditos</p>
          <input data-field="footerText" value="${esc(c.footerText || '')}" placeholder="ex: DESIGNED BY..." class="text-sm w-full rounded-md border border-slate-200 px-2 py-1.5" />
        </div>
      </div>
    </div>
  </div>`;
}

/* ---- Bind de eventos do painel ---- */
function bindPropsEvents(panel) {
  // Campos simples
  panel.querySelectorAll('[data-field]').forEach((input) => {
    input.addEventListener('input', () => {
      const field = input.dataset.field;
      updateCardData((prev) => ({ ...prev, [field]: input.value }));
    });
  });

  // QR
  const qrInput = panel.querySelector('#qr-input');
  if (qrInput) {
    qrInput.addEventListener('input', () => {
      const newData = qrInput.value;
      updateCardData((prev) => ({
        ...prev,
        qrCodeData: newData,
        qrCodeUrl: `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(newData)}`,
      }));
    });
  }
  const qrReset = panel.querySelector('#qr-reset');
  if (qrReset) {
    qrReset.addEventListener('click', () => {
      const defaultUrl = `${window.location.origin}/c/${cardData.id}.html`;
      updateCardData((prev) => ({
        ...prev,
        qrCodeData: defaultUrl,
        qrCodeUrl: `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(defaultUrl)}`,
      }));
      toastLocal('QR Code Restaurado', 'O código agora aponta para o seu link público.');
    });
  }

  // Fonte
  panel.querySelectorAll('[data-font]').forEach((btn) =>
    btn.addEventListener('click', () => updateCardData((prev) => ({ ...prev, fontFamily: btn.dataset.font })))
  );

  // Slider de fonte
  const fontSize = panel.querySelector('#font-size');
  const fontSizeLabel = panel.querySelector('#font-size-label');
  if (fontSize) {
    fontSize.addEventListener('input', () => {
      fontSizeLabel.textContent = `${fontSize.value}px`;
      updateCardData((prev) => ({ ...prev, baseFontSize: parseInt(fontSize.value, 10) }));
    });
  }

  // Color pickers
  const themeColors = panel.querySelector('#theme-colors');
  if (themeColors) themeColors.appendChild(colorPickerGrid(cardData.themeColor, (color) => updateCardData((prev) => ({ ...prev, themeColor: color }))));

  const paperColors = panel.querySelector('#paper-colors');
  if (paperColors) paperColors.appendChild(colorPickerGrid(cardData.physicalBackgroundColor, (color) => updateCardData((prev) => ({ ...prev, physicalBackgroundColor: color }))));

  // Stats
  const addStat = panel.querySelector('#add-stat');
  if (addStat) addStat.addEventListener('click', () => updateCardData((prev) => ({ ...prev, stats: [...prev.stats, { label: 'Nova Métrica', value: '0', url: '' }] })));

  panel.querySelectorAll('[data-remove-stat]').forEach((btn) =>
    btn.addEventListener('click', () => {
      const index = parseInt(btn.dataset.removeStat, 10);
      updateCardData((prev) => ({ ...prev, stats: prev.stats.filter((_, i) => i !== index) }));
    })
  );

  panel.querySelectorAll('[data-stat-field]').forEach((input) => {
    input.addEventListener('input', () => {
      const index = parseInt(input.dataset.stat, 10);
      const field = input.dataset.statField;
      updateCardData((prev) => {
        const newStats = [...prev.stats];
        newStats[index] = { ...newStats[index], [field]: input.value };
        return { ...prev, stats: newStats };
      });
    });
  });

  // Links (accordion)
  panel.querySelectorAll('[data-acc-toggle]').forEach((btn) =>
    btn.addEventListener('click', () => {
      const id = btn.dataset.accToggle;
      const body = panel.querySelector(`[data-acc-body="${id}"]`);
      const icon = panel.querySelector(`[data-acc-icon="${id}"]`);
      const isOpen = !body.classList.contains('hidden');
      panel.querySelectorAll('[data-acc-body]').forEach((b) => b.classList.add('hidden'));
      panel.querySelectorAll('[data-acc-icon]').forEach((i) => (i.style.transform = ''));
      if (!isOpen) {
        body.classList.remove('hidden');
        icon.style.transform = 'rotate(180deg)';
        selectedLinkId = id;
      } else {
        selectedLinkId = null;
      }
    })
  );

  // Campos de link
  panel.querySelectorAll('[data-link-field]').forEach((input) => {
    input.addEventListener('input', () => {
      const id = input.dataset.link;
      const field = input.dataset.linkField;
      updateCardData((prev) => ({
        ...prev,
        links: prev.links.map((l) => (l.id === id ? { ...l, [field]: input.value } : l)),
      }));
    });
  });

  // Ícones
  panel.querySelectorAll('[data-link-icon]').forEach((btn) =>
    btn.addEventListener('click', () => {
      const id = btn.dataset.linkIcon;
      updateCardData((prev) => ({
        ...prev,
        links: prev.links.map((l) => (l.id === id ? { ...l, icon: btn.dataset.icon } : l)),
      }));
    })
  );

  // Cores de link
  panel.querySelectorAll('[data-link-color]').forEach((btn) =>
    btn.addEventListener('click', () => {
      const id = btn.dataset.linkFor;
      updateCardData((prev) => ({
        ...prev,
        links: prev.links.map((l) => (l.id === id ? { ...l, color: btn.dataset.linkColor } : l)),
      }));
    })
  );

  // Remover link
  panel.querySelectorAll('[data-remove-link]').forEach((btn) =>
    btn.addEventListener('click', () => {
      const id = btn.dataset.removeLink;
      updateCardData((prev) => ({ ...prev, links: prev.links.filter((l) => l.id !== id) }));
      if (selectedLinkId === id) selectedLinkId = null;
    })
  );

  // Novo link
  const addLink = panel.querySelector('#add-link');
  if (addLink) {
    addLink.addEventListener('click', () => {
      const newId = `link-${Date.now()}`;
      updateCardData((prev) => ({
        ...prev,
        links: [...prev.links, { id: newId, type: 'website', label: 'Novo Link', value: '', icon: 'link', color: prev.themeColor }],
      }));
      selectedLinkId = newId;
    });
  }

  // Uploads
  panel.querySelectorAll('[data-upload]').forEach((btn) =>
    btn.addEventListener('click', () => {
      const input = panel.querySelector(`[data-file-input="${btn.dataset.upload}"]`);
      if (input) input.click();
    })
  );

  panel.querySelectorAll('[data-file-input]').forEach((input) => {
    input.addEventListener('change', () => {
      const file = input.files?.[0];
      if (!file) return;
      if (file.size > 2 * 1024 * 1024) {
        toastLocal('Arquivo muito grande', 'Por favor, escolha uma imagem de até 2MB.');
        return;
      }
      const field = input.dataset.fileInput;
      const reader = new FileReader();
      reader.onloadend = () => {
        updateCardData((prev) => ({ ...prev, [field]: reader.result }));
        toastLocal('Upload concluído!', 'Sua imagem foi atualizada com sucesso.');
      };
      reader.readAsDataURL(file);
    });
  });

  // Switches do modo físico
  panel.querySelectorAll('[data-switch]').forEach((btn) =>
    btn.addEventListener('click', () => {
      const field = btn.dataset.switch;
      const current = cardData[field] !== false;
      updateCardData((prev) => ({ ...prev, [field]: !current }));
    })
  );
}

/* ---------------- Ferramentas laterais ---------------- */
const TOOLS = [
  { id: 'modelos', label: 'Modelos', icon: 'dashboard_customize' },
  { id: 'conteudo', label: 'Conteúdo', icon: 'text_fields' },
  { id: 'estilo', label: 'Estilo', icon: 'palette' },
  { id: 'imagens', label: 'Imagens', icon: 'image' },
  { id: 'social', label: 'Social', icon: 'share' },
  { id: 'qrcode', label: 'QR Code', icon: 'qr_code_2' },
  { id: 'fisico', label: 'Impressão', icon: 'print' },
];

function renderTools() {
  const list = $('#tools-list');
  list.innerHTML = TOOLS.map(
    (tool) => `
    <button data-tool="${tool.id}" class="group flex flex-col lg:flex-row items-center gap-3 px-3 py-3 rounded-xl transition-all ${
      activeTool === tool.id ? 'bg-primary/10 text-primary border border-primary/20' : 'hover:bg-slate-50'
    }">
      <span class="material-symbols-outlined transition-colors ${activeTool === tool.id ? 'text-primary' : 'text-slate-500 group-hover:text-primary'}">${tool.icon}</span>
      <span class="hidden lg:block text-sm transition-colors ${
        activeTool === tool.id ? 'font-semibold text-primary' : 'font-medium text-slate-600 group-hover:text-slate-900'
      }">${tool.label}</span>
    </button>`
  ).join('');

  list.querySelectorAll('[data-tool]').forEach((btn) =>
    btn.addEventListener('click', () => setActiveTool(btn.dataset.tool))
  );
}

function setActiveTool(toolId) {
  activeTool = toolId;
  renderTools();
  renderPropsPanel();
}

/* ---------------- Undo / Redo ---------------- */
function undo() {
  if (!past.length) return;
  const previous = past.pop();
  future.unshift(cardData);
  cardData = previous;
  scheduleSave();
  render();
}

function redo() {
  if (!future.length) return;
  const next = future.shift();
  past.push(cardData);
  cardData = next;
  scheduleSave();
  render();
}

/* ---------------- Exportação ---------------- */
function handleExport(kind) {
  if (kind === 'svg') {
    downloadPlotterSVG(cardData);
    toastLocal('Arquivo Vetorial Gerado', 'O SVG foi otimizado com caminhos de corte para sua plotter.');
  } else if (kind === 'png') {
    downloadPhysicalPNG(cardData);
    toastLocal('PNG Gerado (350 DPI)', 'Imagem de alta resolução exportada com sucesso.');
  } else if (kind === 'print') {
    window.print();
  }
  $('#export-menu').classList.add('hidden');
}

/* ---------------- Boot ---------------- */
async function boot() {
  // Carrega cartão pela query ?id=
  const params = new URLSearchParams(window.location.search);
  const cardId = params.get('id');

  if (cardId) {
    const saved = db.getCardById(cardId);
    if (saved) cardData = saved;
  } else {
    // Sem id: usa o primeiro cartão salvo ou o padrão
    const all = db.getAllCards();
    if (all.length) cardData = all[0];
  }

  // Preenche qrCodeData se vazio
  if (!cardData.qrCodeData) {
    const defaultUrl = `${window.location.origin}/c/${cardData.id}.html`;
    cardData.qrCodeData = defaultUrl;
    cardData.qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(defaultUrl)}`;
  }

  renderTools();

  document.querySelectorAll('.mode-btn').forEach((btn) =>
    btn.addEventListener('click', () => {
      mode = btn.dataset.mode;
      activeTool = mode === 'physical' && activeTool === 'modelos' ? 'fisico' : activeTool;
      render();
    })
  );

  $('#btn-undo').addEventListener('click', undo);
  $('#btn-redo').addEventListener('click', redo);

  $('#btn-preview').addEventListener('click', () => {
    localStorage.setItem('digicard-preview-data', JSON.stringify(cardData));
    window.open('/preview.html', '_blank');
    scheduleSave();
  });

  $('#btn-publish').addEventListener('click', function () {
    toastLocal('Cartão Publicado!', 'Seu link digital já está disponível para compartilhamento.');
  });

  $('#btn-export').addEventListener('click', () => $('#export-menu').classList.toggle('hidden'));
  document.querySelectorAll('[data-export]').forEach((btn) =>
    btn.addEventListener('click', () => handleExport(btn.dataset.export))
  );

  document.addEventListener('click', (e) => {
    if (!e.target.closest('#export-wrap')) $('#export-menu')?.classList.add('hidden');
  });

  $('#zoom-in').addEventListener('click', () => {
    zoom = Math.min(zoom + 5, 150);
    renderCanvas();
  });
  $('#zoom-out').addEventListener('click', () => {
    zoom = Math.max(zoom - 5, 50);
    renderCanvas();
  });

  window.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'z') {
      e.preventDefault();
      if (e.shiftKey) redo();
      else undo();
    } else if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'y') {
      e.preventDefault();
      redo();
    }
  });

  render();
}

boot();
