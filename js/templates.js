/**
 * Templates de cartão digital (antes em src/components/card-templates/*.tsx).
 * Cada função retorna uma string HTML. Ações usam data-action (delegação de eventos).
 */
import { formatHref } from './utils.js';

/* Ícone unificado: usa Material Symbols (substitui react-icons/Simple Icons) */
const BRAND_GLYPHS = {
  whatsapp: 'chat', instagram: 'photo_camera', spotify: 'headphones', youtube: 'play_circle',
  facebook: 'thumb_up', tiktok: 'music_note', linkedin: 'work', github: 'code',
  discord: 'forum', twitter: 'alternate_email', x: 'alternate_email', twitch: 'videocam',
  threads: 'forum', email: 'mail', phone: 'call', website: 'language',
};

export function socialIcon(type, icon, className = '', style = '') {
  const glyph = BRAND_GLYPHS[String(type || '').toLowerCase()] || icon || 'link';
  const styleAttr = style ? ` style="${style}"` : '';
  return `<span class="material-symbols-outlined ${className}"${styleAttr}>${glyph}</span>`;
}

function esc(s) {
  return String(s ?? '').replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');
}

function linkHref(link) {
  return esc(formatHref(link.type, link.value));
}

const FILL = "font-variation-settings: 'FILL' 1;";

function qrBlock(cardData, label, dark = false) {
  if (!cardData.qrCodeUrl) return '';
  const border = dark ? 'border-white/5' : 'border-slate-100';
  const text = dark ? 'text-white/40' : 'text-slate-500 opacity-40';
  return `
    <div class="mt-12 mb-12 flex flex-col items-center gap-4 py-8 border-t ${border} w-full shrink-0">
      <div class="p-4 bg-white rounded-2xl shadow-xl border ${border}">
        <img src="${esc(cardData.qrCodeUrl)}" alt="QR Code" class="size-32" />
      </div>
      <p class="text-[10px] font-bold uppercase tracking-[0.2em] ${text} text-center">${esc(label)}</p>
    </div>`;
}

/* ---------------- Default ---------------- */
function renderDefault(c) {
  const gridLinks = c.links.slice(0, 2).map((link) => `
      <a href="${linkHref(link)}" target="_blank" rel="noopener noreferrer"
         class="flex flex-col items-center gap-2 rounded-xl border border-slate-100 bg-slate-50 p-4 hover:bg-slate-100 transition-colors">
        ${socialIcon(link.type, link.icon, 'text-2xl', `color:${link.color || c.themeColor}`)}
        <span class="text-[10px] font-bold text-slate-700">${esc(link.label)}</span>
      </a>`).join('');

  const listLinks = c.links.slice(2).map((link) => `
      <a href="${linkHref(link)}" target="_blank" rel="noopener noreferrer"
         class="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50 px-4 py-3 hover:bg-slate-100 transition-colors">
        <div class="flex items-center gap-3">
          <div class="flex h-8 w-8 items-center justify-center rounded-lg text-white" style="background-color:${link.color || c.themeColor}">
            ${socialIcon(link.type, link.icon, 'text-lg')}
          </div>
          <span class="text-xs font-bold text-slate-700">${esc(link.label)}</span>
        </div>
        <span class="material-symbols-outlined text-sm text-slate-400">arrow_forward_ios</span>
      </a>`).join('');

  return `
  <div class="flex flex-1 min-h-0 flex-col bg-white overflow-y-auto no-scrollbar pb-24 relative">
    <div class="relative h-48 shrink-0" style="background-color:${c.themeColor}">
      <button data-action="share" class="absolute top-4 right-4 z-20 bg-white/20 backdrop-blur-md p-2 rounded-full border border-white/20 hover:bg-white/30 transition-colors">
        <span class="material-symbols-outlined text-white text-xl">share</span>
      </button>
      <div class="absolute inset-0 bg-[length:20px_20px] opacity-20" style="background-image:radial-gradient(circle at 20% 20%, white 1px, transparent 1px)"></div>
      <div class="absolute -bottom-12 left-1/2 h-24 w-24 -translate-x-1/2 overflow-hidden rounded-full border-4 border-white bg-slate-100 shadow-lg">
        <img src="${esc(c.avatarUrl)}" alt="Profile" class="h-full w-full object-cover" />
      </div>
    </div>
    <div class="mt-14 flex flex-col items-center px-6 shrink-0">
      <div class="flex items-center gap-1.5">
        <h3 class="text-xl font-bold text-slate-800">${esc(c.fullName)}</h3>
        ${c.isVerified ? `<span class="material-symbols-outlined text-lg" style="${FILL} color:${c.themeColor}">verified</span>` : ''}
      </div>
      <p class="text-sm font-medium text-slate-500">${esc(c.jobTitle)}</p>
      <p class="mt-2 text-center text-sm text-slate-400 leading-relaxed max-w-[300px]">${esc(c.bio)}</p>
      <div class="mt-8 grid w-full grid-cols-2 gap-3">${gridLinks}</div>
      <div class="mt-6 w-full space-y-2">${listLinks}</div>
      <button data-action="save-contact"
        class="mt-10 w-full rounded-xl py-4 text-sm font-bold text-white shadow-lg active:scale-[0.98] transition-all mb-8"
        style="background-color:${c.themeColor}; box-shadow:0 8px 20px -4px ${c.themeColor}66">
        ${esc(c.saveContactLabel)}
      </button>
      ${qrBlock(c, 'Escaneie para salvar o contato')}
    </div>
  </div>`;
}

/* ---------------- Instagram ---------------- */
function renderInstagram(c) {
  const username = esc(String(c.fullName).toLowerCase().replaceAll(' ', '_'));
  const instagramLink = c.links.find((l) => l.type === 'instagram' || l.type === 'website');
  const actionHref = instagramLink ? linkHref(instagramLink) : '#';

  const stats = (c.stats || []).slice(0, 3).map((s, i, arr) => `
    <div class="text-center">
      <p class="text-lg font-bold text-white leading-none">${esc(s.value)}</p>
      <p class="text-[10px] uppercase tracking-wider text-white/60 font-medium">${esc(s.label)}</p>
    </div>${i < arr.length - 1 ? '<div class="w-px h-8 bg-white/10"></div>' : ''}`).join('');

  const photoGrid = Array.from({ length: 12 }, (_, i) =>
    `<div class="aspect-square bg-cover bg-center bg-slate-800 rounded-sm" style="background-image:url('https://picsum.photos/seed/insta${i}/200')"></div>`).join('');

  const links = c.links.map((link) => `
    <a href="${linkHref(link)}" target="_blank" rel="noopener noreferrer"
       class="flex items-center gap-4 p-4 rounded-2xl bg-white/10 backdrop-blur-xl hover:bg-white/20 text-white font-semibold border border-white/10 transition-all group shrink-0">
      <div class="w-10 h-10 rounded-xl flex items-center justify-center" style="background-color:${link.color || c.themeColor}22">
        ${socialIcon(link.type, link.icon, 'text-xl', `color:${link.color || c.themeColor}`)}
      </div>
      <div class="flex-1 min-w-0">
        <p class="text-sm font-bold truncate">${esc(link.label)}</p>
        <p class="text-[10px] text-white/40 truncate font-mono">${esc(link.value)}</p>
      </div>
      <span class="material-symbols-outlined text-white/20 group-hover:text-white group-hover:translate-x-1 transition-all">chevron_right</span>
    </a>`).join('');

  return `
  <div class="relative flex-1 min-h-0 mx-auto w-full shadow-2xl flex flex-col bg-[#121121] text-white overflow-hidden">
    <div class="absolute inset-0 opacity-30 pointer-events-none" style="background-image:radial-gradient(at 0% 0%, hsla(253,16%,7%,1) 0, transparent 50%), radial-gradient(at 50% 0%, hsla(225,39%,30%,1) 0, transparent 50%), radial-gradient(at 100% 0%, hsla(339,49%,30%,1) 0, transparent 50%)"></div>
    <div class="flex-1 min-h-0 overflow-y-auto no-scrollbar pb-24 relative z-10">
      <button data-action="share" class="absolute top-4 right-4 z-30 bg-white/10 backdrop-blur-md p-2 rounded-full border border-white/10 hover:bg-white/20 transition-colors">
        <span class="material-symbols-outlined text-white text-xl">share</span>
      </button>
      <header class="relative pt-12 px-6 pb-6 flex flex-col items-center shrink-0">
        <div class="relative group">
          <div class="absolute -inset-1 bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 rounded-full blur opacity-75"></div>
          <div class="relative bg-[#121121] rounded-full p-1">
            <div class="size-28 rounded-full bg-cover bg-center border-2 border-white/20" style="background-image:url('${esc(c.avatarUrl)}')"></div>
          </div>
        </div>
        <div class="mt-4 text-center">
          <div class="flex items-center justify-center gap-1">
            <h1 class="text-xl font-bold tracking-tight hover:text-primary transition-colors ${c.fullNameLink ? 'cursor-pointer' : ''} ${c.fullNameLink ? '' : ''}">@${username}</h1>
            ${c.isVerified ? `<span class="material-symbols-outlined text-primary text-xl" style="${FILL}">verified</span>` : ''}
          </div>
          <p class="text-white/80 text-sm mt-1 max-w-[280px]">${esc(c.bio)}</p>
        </div>
        <div class="flex gap-8 mt-6 py-3 px-6 bg-white/5 backdrop-blur-md rounded-xl border border-white/10">${stats}</div>
      </header>
      <div class="relative mt-4 shrink-0">
        <div class="absolute inset-0 px-1 opacity-40 blur-[3px] pointer-events-none">
          <div class="grid grid-cols-3 gap-1 h-full">${photoGrid}</div>
        </div>
        <div class="relative z-20 px-6 pt-8 pb-12 flex flex-col gap-4">
          <a href="${actionHref}" target="_blank" rel="noopener noreferrer"
             class="w-full h-14 bg-primary hover:bg-primary/90 text-white font-bold rounded-2xl shadow-xl transition-all flex items-center justify-center text-center text-base tracking-wide shrink-0"
             style="background-color:${c.themeColor}; box-shadow:0 8px 30px ${c.themeColor}44">
            Trabalhe Comigo
          </a>
          <div class="grid grid-cols-1 gap-3">${links}</div>
          ${qrBlock(c, 'Gere sua Identidade Digital', true)}
        </div>
      </div>
    </div>
    <nav class="bg-[#121121]/80 backdrop-blur-xl border-t border-white/10 flex justify-around items-center h-16 px-4 z-20 shrink-0">
      <span class="material-symbols-outlined text-white" style="${FILL}">home</span>
      <span class="material-symbols-outlined text-white/50">search</span>
      <div class="bg-primary rounded-lg p-1.5 shadow-lg"><span class="material-symbols-outlined text-white">add_box</span></div>
      <span class="material-symbols-outlined text-white/50">favorite</span>
      <div class="size-7 rounded-full border border-white/30 bg-cover bg-center" style="background-image:url(${esc(c.avatarUrl)})"></div>
    </nav>
  </div>`;
}

/* ---------------- LinkedIn ---------------- */
function renderLinkedin(c) {
  const links = c.links.map((link) => `
    <a href="${linkHref(link)}" target="_blank" rel="noopener noreferrer"
       class="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-100 hover:border-primary/50 transition-all">
      <div class="flex items-center gap-3">
        ${socialIcon(link.type, link.icon, 'text-lg', `color:${link.color || c.themeColor}`)}
        <span class="text-sm font-medium text-gray-700">${esc(link.label)}</span>
      </div>
      <span class="material-symbols-outlined text-gray-400 text-sm">chevron_right</span>
    </a>`).join('');

  const navIcons = ['home', 'group', 'person', 'work', 'chat'].map((icon, i) => `
    <a class="flex flex-col items-center gap-1 ${i === 2 ? 'text-primary' : 'text-gray-400'}" href="#">
      <span class="material-symbols-outlined" ${i === 2 ? `style="${FILL}"` : ''}>${icon}</span>
    </a>`).join('');

  return `
  <div class="bg-slate-50 h-full flex flex-col relative overflow-hidden">
    <div class="flex-1 min-h-0 overflow-y-auto no-scrollbar">
      <div class="h-32 bg-gradient-to-r from-primary/80 to-primary w-full relative shrink-0">
        <div class="absolute inset-0 opacity-20" style="background-image:radial-gradient(circle at 2px 2px, white 1px, transparent 0); background-size:24px 24px"></div>
      </div>
      <div class="px-6 -mt-16 flex flex-col items-center">
        <div class="relative group">
          <div class="size-32 rounded-full border-4 border-white bg-cover bg-center shadow-lg" style="background-image:url('${esc(c.avatarUrl)}')"></div>
          ${c.isVerified ? `
          <div class="absolute bottom-1 right-1 bg-primary text-white rounded-full p-0.5 border-[3px] border-white flex items-center justify-center">
            <span class="material-symbols-outlined text-[16px] font-bold text-white">check</span>
          </div>` : ''}
        </div>
        <div class="mt-4 text-center">
          <h1 class="text-2xl font-bold text-gray-900">${esc(c.fullName)}</h1>
          <p class="text-primary font-semibold text-sm uppercase tracking-wider mt-1">${esc(c.jobTitle)}</p>
          <div class="flex items-center justify-center gap-1 text-gray-500 text-sm mt-1">
            <span class="material-symbols-outlined text-sm">location_on</span><span>São Paulo, Brasil</span>
          </div>
        </div>
        <div class="mt-6 text-center">
          <p class="text-gray-600 text-sm leading-relaxed px-4">${esc(c.bio)}</p>
        </div>
        <div class="grid grid-cols-3 gap-3 w-full mt-8">
          <button data-action="save-contact" class="flex flex-col items-center justify-center gap-2 p-3 rounded-lg bg-primary text-white hover:bg-primary/90 transition-colors">
            <span class="material-symbols-outlined">person_add</span>
            <span class="text-[10px] font-bold uppercase">Conectar</span>
          </button>
          <button class="flex flex-col items-center justify-center gap-2 p-3 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors">
            <span class="material-symbols-outlined">mail</span>
            <span class="text-[10px] font-bold uppercase">Mensagem</span>
          </button>
          <button data-action="save-contact" class="flex flex-col items-center justify-center gap-2 p-3 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors">
            <span class="material-symbols-outlined">contact_page</span>
            <span class="text-[10px] font-bold uppercase">Salvar</span>
          </button>
        </div>
      </div>
      <div class="mt-8 px-6 space-y-3 pb-12">
        <h3 class="text-xs font-bold text-gray-400 uppercase tracking-widest px-1">Links Profissionais</h3>
        ${links}
        ${qrBlock(c, 'Scan to save Profile')}
      </div>
    </div>
    <nav class="bg-white border-t border-gray-100 px-4 py-3 pb-6 flex justify-between items-center shrink-0 z-30 shadow-[0_-4px_12px_rgba(0,0,0,0.05)]">${navIcons}</nav>
  </div>`;
}

/* ---------------- WhatsApp ---------------- */
function renderWhatsapp(c) {
  const wa = c.links.find((l) => l.type === 'whatsapp');
  const links = c.links.map((link) => `
    <a href="${linkHref(link)}" target="_blank" rel="noopener noreferrer"
       class="flex items-center justify-between p-3 rounded-lg border border-slate-100 hover:bg-slate-50 transition-colors">
      <div class="flex items-center gap-3">
        ${socialIcon(link.type, link.icon, 'text-lg', `color:${link.color || c.themeColor}`)}
        <span class="text-sm font-medium">${esc(link.label)}</span>
      </div>
      <span class="material-symbols-outlined text-slate-300 text-sm">chevron_right</span>
    </a>`).join('');

  return `
  <div class="bg-slate-50 font-display text-[#121117] h-full flex flex-col overflow-hidden relative">
    <div class="flex-1 min-h-0 overflow-y-auto no-scrollbar relative z-10 flex flex-col pt-16">
      <div class="flex p-6 flex-col gap-6 items-center">
        <div class="relative">
          <div class="bg-center bg-no-repeat aspect-square bg-cover rounded-full border-4 border-white shadow-xl size-32" style="background-image:url('${esc(c.avatarUrl)}')"></div>
          <div class="absolute bottom-1 right-1 bg-green-500 border-4 border-white size-7 rounded-full flex items-center justify-center">
            <div class="size-2 bg-white rounded-full animate-pulse"></div>
          </div>
        </div>
        <div class="flex flex-col items-center text-center gap-1">
          <div class="flex items-center gap-1.5">
            <h1 class="text-2xl font-bold leading-tight tracking-tight">${esc(c.fullName)}</h1>
            ${c.isVerified ? `<span class="material-symbols-outlined text-primary text-[20px]" title="Verificado">verified</span>` : ''}
          </div>
          <p class="text-primary/70 text-sm font-semibold uppercase tracking-wider">Conta Comercial Oficial</p>
          <p class="text-[#656487] text-base max-w-[280px] mt-2">${esc(c.bio)}</p>
        </div>
        <a href="${esc(formatHref('whatsapp', wa ? wa.value : ''))}" target="_blank" rel="noopener noreferrer"
           class="flex w-full cursor-pointer items-center justify-center gap-3 rounded-xl h-14 text-white shadow-lg transition-all active:scale-95"
           style="background-color:${c.themeColor}">
          <span class="material-symbols-outlined">forum</span>
          <span class="text-base font-bold tracking-wide">Conversar no WhatsApp</span>
        </a>
      </div>
      <div class="px-4 space-y-6 pb-12">
        <div class="bg-white rounded-xl p-4 border border-primary/10">
          <h3 class="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Meus Links e Redes</h3>
          <div class="flex flex-col gap-3">${links}</div>
        </div>
        <div class="flex gap-3">
          <div class="flex flex-1 flex-col gap-1 rounded-xl p-4 bg-white border border-primary/10">
            <span class="material-symbols-outlined text-primary text-xl">timer</span>
            <p class="text-[#656487] text-xs font-medium">Resposta média</p>
            <p class="text-lg font-bold">&lt; 5 min</p>
          </div>
          <div class="flex flex-1 flex-col gap-1 rounded-xl p-4 bg-white border border-primary/10">
            <span class="material-symbols-outlined text-primary text-xl">event_available</span>
            <p class="text-[#656487] text-xs font-medium">Desde</p>
            <p class="text-lg font-bold">2021</p>
          </div>
        </div>
        <div class="bg-white rounded-xl p-4 border border-primary/10">
          <h3 class="font-bold mb-3 flex items-center gap-2"><span class="material-symbols-outlined text-primary">schedule</span> Atendimento</h3>
          <div class="space-y-2 text-sm">
            <div class="flex justify-between"><span class="text-slate-500">Seg - Sex</span><span class="font-semibold">08:00 - 18:00</span></div>
            <div class="flex justify-between"><span class="text-slate-500">Sábado</span><span class="font-semibold">09:00 - 13:00</span></div>
          </div>
        </div>
        ${qrBlock(c, 'Scan to add on WhatsApp')}
      </div>
    </div>
    <div class="absolute top-0 left-0 right-0 flex items-center bg-white/90 backdrop-blur-md p-4 justify-between border-b border-primary/10 shrink-0 z-20">
      <div class="text-primary flex size-10 items-center justify-center rounded-full hover:bg-primary/10 cursor-pointer">
        <span class="material-symbols-outlined">arrow_back</span>
      </div>
      <h2 class="text-base font-bold flex-1 text-center">Perfil Comercial</h2>
      <div class="flex w-10 items-center justify-end">
        <span class="material-symbols-outlined text-primary">more_vert</span>
      </div>
    </div>
  </div>`;
}

/* ---------------- Spotify ---------------- */
function renderSpotify(c) {
  const spotifyLink = c.links.find((l) => l.type === 'spotify' || l.type === 'website');
  const actionHref = spotifyLink ? linkHref(spotifyLink) : '#';

  const links = c.links.map((link, i) => `
    <a href="${linkHref(link)}" target="_blank" rel="noopener noreferrer"
       class="flex items-center justify-between p-4 bg-white/5 hover:bg-white/10 border border-white/5 rounded-xl transition-all group">
      <div class="flex items-center gap-4">
        <div class="text-gray-500 font-mono text-sm">0${i + 1}</div>
        <div>
          <p class="font-semibold group-hover:text-[#1DB954] transition-colors">${esc(link.label)}</p>
          <p class="text-xs text-gray-400 truncate max-w-[200px]">${esc(link.value)}</p>
        </div>
      </div>
      ${socialIcon(link.type, link.icon, 'text-gray-400 group-hover:text-white')}
    </a>`).join('');

  return `
  <div class="bg-[#121121] text-white h-full flex flex-col relative overflow-hidden font-display">
    <div class="flex-1 min-h-0 overflow-y-auto no-scrollbar pb-32">
      <header class="relative w-full aspect-square overflow-hidden shadow-2xl shrink-0">
        <div class="absolute inset-0 bg-gradient-to-t from-[#121121] via-transparent to-transparent z-10"></div>
        <img alt="Artist Profile" class="w-full h-full object-cover" src="${esc(c.avatarUrl)}" />
        <div class="absolute bottom-6 left-6 z-20">
          ${c.isVerified ? `
          <div class="flex items-center gap-2 mb-1">
            <span class="material-symbols-outlined text-blue-400 text-xl" style="${FILL}">verified</span>
            <span class="text-xs font-bold uppercase tracking-widest text-blue-400">Artista Verificado</span>
          </div>` : ''}
          <h1 class="text-4xl font-black tracking-tighter">${esc(c.fullName)}</h1>
          <p class="text-gray-400 text-sm mt-1">1.2M ouvintes mensais • São Paulo, BR</p>
        </div>
      </header>
      <div class="px-4 -mt-4 z-30 relative">
        <div class="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-4 shadow-xl">
          <div class="flex items-center justify-between mb-3 text-[#1DB954]">
            <div class="flex items-center gap-2">
              <span class="relative flex h-2 w-2">
                <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#1DB954] opacity-75"></span>
                <span class="relative inline-flex rounded-full h-2 w-2 bg-[#1DB954]"></span>
              </span>
              <span class="text-[10px] font-bold uppercase tracking-widest">Ouvindo Agora</span>
            </div>
            <span class="material-symbols-outlined text-xl">graphic_eq</span>
          </div>
          <div class="flex gap-4">
            <div class="size-14 rounded-lg overflow-hidden shrink-0"><img src="https://picsum.photos/seed/music/100/100" class="w-full h-full object-cover" alt="Album" /></div>
            <div class="flex flex-col justify-center">
              <p class="font-bold text-sm">Digital Card Beats</p>
              <p class="text-xs text-gray-400">${esc(c.fullName)}</p>
            </div>
          </div>
        </div>
      </div>
      <main class="px-4 mt-8">
        <h3 class="text-xs font-bold uppercase tracking-widest text-gray-500 mb-4 px-1">Links &amp; Lançamentos</h3>
        <div class="space-y-3">${links}</div>
        ${qrBlock(c, 'Spotify Digital ID')}
      </main>
    </div>
    <nav class="bg-black/80 backdrop-blur-xl border-t border-white/10 p-4 flex items-center justify-between z-30 shrink-0">
      <div class="flex items-center gap-1">
        <span class="material-symbols-outlined text-gray-400 size-10 flex items-center justify-center">home</span>
        <button data-action="share" class="material-symbols-outlined text-gray-400 size-10 flex items-center justify-center hover:text-white transition-colors">share</button>
      </div>
      <a href="${actionHref}" target="_blank" rel="noopener noreferrer"
         class="bg-[#1DB954] text-black font-black px-8 py-3 rounded-full text-sm uppercase tracking-wider active:scale-95 transition-transform text-center"
         style="background-color:${c.themeColor}">
        Seguir
      </a>
    </nav>
  </div>`;
}

/* ---------------- Executive ---------------- */
function renderExecutive(c) {
  const linkedinLink = c.links.find((l) => l.type === 'linkedin' || l.type === 'website');
  const actionHref = linkedinLink ? linkHref(linkedinLink) : '#';

  const stats = (c.stats || []).slice(0, 3).map((s, i) => `
    <div class="text-center flex-1 ${i === 1 ? 'border-x border-white/10 px-4' : ''}">
      <p class="text-[8px] uppercase tracking-widest text-slate-500 truncate">${esc(s.label)}</p>
      <p class="text-base font-bold text-white truncate">${esc(s.value)}</p>
    </div>`).join('');

  const links = c.links.map((link) => `
    <a href="${linkHref(link)}" target="_blank" rel="noopener noreferrer"
       class="flex items-center justify-between p-4 bg-white rounded-xl border border-slate-200 shadow-sm hover:border-primary/50 transition-colors group">
      <div class="flex items-center gap-3">
        <div class="p-2 rounded-lg" style="background-color:${link.color || c.themeColor}15">
          ${socialIcon(link.type, link.icon, 'text-lg', `color:${link.color || c.themeColor}`)}
        </div>
        <span class="font-bold text-sm">${esc(link.label)}</span>
      </div>
      <span class="material-symbols-outlined text-slate-300 group-hover:text-primary transition-colors">chevron_right</span>
    </a>`).join('');

  return `
  <div class="bg-slate-50 font-display text-slate-900 antialiased h-full flex flex-col relative overflow-hidden">
    <header class="flex items-center justify-between bg-white/90 backdrop-blur-md p-4 border-b border-slate-200 shrink-0 z-20">
      <button class="flex items-center gap-1 text-slate-600">
        <span class="material-symbols-outlined text-xl">arrow_back_ios</span>
        <span class="text-sm font-medium">Voltar</span>
      </button>
      <h1 class="text-[10px] font-bold uppercase tracking-widest text-slate-400">Perfil Verificado</h1>
      <button data-action="share" class="p-1 hover:bg-slate-100 rounded-full transition-colors">
        <span class="material-symbols-outlined text-xl text-slate-400">share</span>
      </button>
    </header>
    <div class="flex-1 min-h-0 overflow-y-auto no-scrollbar px-4 pt-6 pb-8">
      <div class="w-full max-w-md mx-auto overflow-hidden rounded-xl bg-[#0a0a0b] relative group border border-white/10 shadow-2xl">
        <div class="absolute inset-0 pointer-events-none opacity-20 bg-gradient-to-tr from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
        <div class="relative p-8 flex flex-col items-center">
          <div class="relative mb-6">
            <div class="absolute -inset-1 rounded-full bg-gradient-to-tr from-[#BF953F] via-[#FCF6BA] to-[#AA771C] animate-pulse"></div>
            <div class="relative h-32 w-32 rounded-full overflow-hidden border-2 border-[#0a0a0b]">
              <img alt="${esc(c.fullName)}" class="h-full w-full object-cover" src="${esc(c.avatarUrl)}" />
            </div>
            ${c.isVerified ? `
            <div class="absolute bottom-1 right-1 bg-white rounded-full p-0.5 shadow-lg flex items-center justify-center">
              <span class="material-symbols-outlined text-primary text-xl font-bold" style="${FILL}">verified</span>
            </div>` : ''}
          </div>
          <div class="text-center space-y-2">
            <h2 class="text-2xl font-bold tracking-tight text-white hover:text-[#BF953F] transition-colors">${esc(c.fullName)}</h2>
            <p class="text-sm font-medium uppercase tracking-[0.2em] bg-gradient-to-r from-[#BF953F] via-[#FCF6BA] to-[#AA771C] bg-clip-text text-transparent">${esc(c.jobTitle)}</p>
          </div>
          <div class="my-8 flex w-full justify-between border-y border-white/10 py-4 px-2">${stats}</div>
          <div class="w-full text-center mb-8">
            <h3 class="text-[9px] uppercase tracking-widest text-[#D4AF37] font-bold mb-2">Bio Estratégica</h3>
            <p class="text-slate-300 text-xs leading-relaxed font-light italic">${esc(c.bio)}</p>
          </div>
          <div class="w-full space-y-3">
            <a href="${actionHref}" target="_blank" rel="noopener noreferrer"
               class="w-full py-3.5 rounded-lg bg-white text-black font-bold text-xs uppercase tracking-widest shadow-[0_0_20px_rgba(255,255,255,0.2)] active:scale-95 transition-transform flex items-center justify-center text-center">
              Conectar Agora
            </a>
            <button data-action="save-contact" class="w-full py-3.5 rounded-lg border border-white/20 text-white font-medium text-xs uppercase tracking-widest active:scale-95 transition-transform">
              Salvar VCF
            </button>
          </div>
        </div>
      </div>
      <div class="w-full mt-8 space-y-3">
        <h4 class="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] text-center mb-4">Canais de Contato</h4>
        ${links}
      </div>
      ${c.qrCodeUrl ? `
      <div class="mt-12 mb-12 flex flex-col items-center gap-4 px-6 shrink-0">
        <div class="p-4 bg-white rounded-2xl shadow-xl border border-white/10">
          <img src="${esc(c.qrCodeUrl)}" alt="QR Code" class="size-32" />
        </div>
        <p class="text-[9px] font-bold uppercase tracking-[0.3em] text-[#D4AF37] text-center opacity-60">Exclusive Digital ID</p>
      </div>` : ''}
    </div>
    <nav class="bg-white border-t border-slate-200 px-6 pb-6 pt-3 flex justify-around items-center shrink-0 z-20 shadow-[0_-4px_12px_rgba(0,0,0,0.05)]">
      <span class="material-symbols-outlined text-primary" style="${FILL}">home</span>
      <span class="material-symbols-outlined text-slate-400">group</span>
      <div class="relative -top-10">
        <button data-action="share" class="bg-[#0a0a0b] p-4 rounded-full shadow-2xl border-4 border-slate-50 active:scale-90 transition-transform">
          <span class="material-symbols-outlined text-[#D4AF37] text-3xl">qr_code_2</span>
        </button>
      </div>
      <span class="material-symbols-outlined text-slate-400">chat_bubble</span>
      <span class="material-symbols-outlined text-slate-400">account_circle</span>
    </nav>
  </div>`;
}

/* ---------------- Professionals ---------------- */
function renderProfessionals(c) {
  const contactLink = c.links.find((l) => l.type === 'email' || l.type === 'whatsapp' || l.type === 'website');
  const actionHref = contactLink ? linkHref(contactLink) : '#';

  const stats = (c.stats || []).map((s, i, arr) => `
    <div class="text-center px-2">
      <p class="text-xl font-bold text-[#121117]">${esc(s.value)}</p>
      <p class="text-[10px] font-bold uppercase tracking-wider text-[#656487] whitespace-nowrap">${esc(s.label)}</p>
    </div>${i < arr.length - 1 ? '<div class="h-8 w-px bg-slate-200"></div>' : ''}`).join('');

  const links = c.links.map((link) => `
    <a href="${linkHref(link)}" target="_blank" rel="noopener noreferrer"
       class="flex items-center justify-between p-4 bg-white rounded-xl border border-slate-100 shadow-sm hover:border-primary/50 transition-colors">
      <div class="flex items-center gap-3">
        ${socialIcon(link.type, link.icon, 'text-lg', `color:${link.color || c.themeColor}`)}
        <span class="text-sm font-semibold">${esc(link.label)}</span>
      </div>
      <span class="material-symbols-outlined text-slate-300 text-sm">chevron_right</span>
    </a>`).join('');

  const portfolio = [1, 2, 3, 4].map((i) => `
    <div class="group relative overflow-hidden rounded-2xl bg-gray-100 aspect-square">
      <img class="w-full h-full object-cover transition-transform group-hover:scale-110" src="https://picsum.photos/seed/prof${i}/300/300" alt="Portfolio" />
      <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
    </div>`).join('');

  return `
  <div class="bg-white font-display text-[#121117] antialiased h-full flex flex-col overflow-hidden relative">
    <div class="absolute top-0 left-0 right-0 z-20 flex items-center justify-between bg-white/80 px-4 py-4 backdrop-blur-md border-b border-slate-100">
      <button class="flex size-10 items-center justify-center rounded-full bg-slate-50 text-[#121117]">
        <span class="material-symbols-outlined text-[22px]">arrow_back</span>
      </button>
      <h1 class="text-sm font-semibold uppercase tracking-widest text-[#656487]">Portfólio</h1>
      <button data-action="share" class="flex size-10 items-center justify-center rounded-full bg-slate-50 text-[#121117] hover:bg-slate-100 transition-colors">
        <span class="material-symbols-outlined text-[22px]">share</span>
      </button>
    </div>
    <div class="flex-1 min-h-0 overflow-y-auto no-scrollbar pt-20 pb-32">
      <div class="flex flex-col items-center px-6 pt-6 pb-8">
        <div class="relative mb-4">
          <div class="size-32 overflow-hidden rounded-full border-4 border-white ring-2 ring-primary/20 shadow-xl">
            <img src="${esc(c.avatarUrl)}" alt="${esc(c.fullName)}" class="h-full w-full object-cover" />
          </div>
          ${c.isVerified ? `
          <div class="absolute bottom-1 right-1 flex size-8 items-center justify-center rounded-full bg-primary text-white shadow-lg ring-4 ring-white">
            <span class="material-symbols-outlined text-[18px] font-bold" style="${FILL}">verified</span>
          </div>` : ''}
        </div>
        <div class="text-center">
          <h2 class="text-2xl font-bold tracking-tight text-[#121117]">${esc(c.fullName)}</h2>
          <p class="mt-1 text-sm font-medium" style="color:${c.themeColor}">${esc(c.jobTitle)}</p>
          <div class="mt-2 flex items-center justify-center gap-1 text-xs font-semibold text-[#656487]">
            <span class="material-symbols-outlined text-xs">location_on</span><span>São Paulo, Brasil</span>
          </div>
          <p class="mt-4 text-sm text-slate-500 leading-relaxed max-w-[320px] mx-auto">${esc(c.bio)}</p>
        </div>
        <div class="mt-6 flex w-full gap-3">
          <a href="${actionHref}" target="_blank" rel="noopener noreferrer"
             class="flex flex-1 items-center justify-center gap-2 rounded-xl py-3.5 text-sm font-bold text-white transition-opacity hover:opacity-90 shadow-lg text-center"
             style="background-color:${c.themeColor}">
            <span class="material-symbols-outlined text-sm">mail</span>
            Solicitar Orçamento
          </a>
          <a href="${esc(c.vCardUrl || '#')}" class="flex size-[52px] items-center justify-center rounded-xl border border-primary/20 bg-primary/5 text-primary">
            <span class="material-symbols-outlined">person_add</span>
          </a>
        </div>
      </div>
      <div class="mx-6 mb-8 flex items-center justify-around rounded-2xl bg-slate-50 py-4 border border-slate-100">${stats}</div>
      <div class="px-6 mb-8">
        <h3 class="mb-4 text-xs font-bold uppercase tracking-widest text-[#656487]">Especialidades</h3>
        <div class="flex flex-wrap gap-2">
          <span class="rounded-lg bg-primary/10 px-3 py-1.5 text-xs font-semibold text-primary">Consultoria</span>
          <span class="rounded-lg bg-primary/10 px-3 py-1.5 text-xs font-semibold text-primary">Design Minimalista</span>
          <span class="rounded-lg bg-primary/10 px-3 py-1.5 text-xs font-semibold text-primary">Estratégia</span>
        </div>
      </div>
      <div class="px-6 mb-8 space-y-3">
        <h3 class="text-xs font-bold uppercase tracking-widest text-[#656487]">Links Rápidos</h3>
        ${links}
      </div>
      <div class="px-6 pb-12">
        <div class="mb-5 flex items-center justify-between">
          <h3 class="text-xs font-bold uppercase tracking-widest text-[#656487]">Destaques</h3>
          <button class="text-xs font-bold text-primary">Ver todos</button>
        </div>
        <div class="grid grid-cols-2 gap-4">${portfolio}</div>
      </div>
      ${c.qrCodeUrl ? `
      <div class="mt-12 mb-12 flex flex-col items-center gap-4 px-6 shrink-0">
        <div class="p-4 bg-white rounded-2xl shadow-xl border border-slate-100">
          <img src="${esc(c.qrCodeUrl)}" alt="QR Code" class="size-32" />
        </div>
        <p class="text-[10px] font-bold uppercase tracking-[0.2em] opacity-40 text-center">Scan to see Portfolio</p>
      </div>` : ''}
    </div>
    <div class="absolute bottom-6 left-1/2 flex w-max -translate-x-1/2 items-center gap-2 rounded-full bg-white/90 p-2 shadow-2xl backdrop-blur-xl ring-1 ring-black/5 z-50">
      <button class="flex size-12 items-center justify-center rounded-full bg-primary text-white"><span class="material-symbols-outlined">person</span></button>
      <button class="flex size-12 items-center justify-center rounded-full text-[#656487]"><span class="material-symbols-outlined">grid_view</span></button>
      <button class="flex size-12 items-center justify-center rounded-full text-[#656487]"><span class="material-symbols-outlined">collections_bookmark</span></button>
    </div>
  </div>`;
}

/* ---------------- DigiCard Web ---------------- */
function renderDigicardWeb(c) {
  const links = c.links.map((link) => `
    <a href="${linkHref(link)}" target="_blank" rel="noopener noreferrer"
       class="flex items-center gap-4 p-4 rounded-xl border border-slate-100 bg-slate-50/50 hover:bg-slate-100 transition-colors group">
      <div class="w-10 h-10 rounded-lg flex items-center justify-center" style="background-color:${link.color || c.themeColor}15; color:${link.color || c.themeColor}">
        ${socialIcon(link.type, link.icon, 'text-lg')}
      </div>
      <span class="flex-1 font-medium text-slate-700">${esc(link.label)}</span>
      <span class="material-symbols-outlined text-slate-400 group-hover:translate-x-1 transition-transform">chevron_right</span>
    </a>`).join('');

  return `
  <div class="bg-white h-full flex flex-col relative shadow-2xl overflow-hidden">
    <div class="flex items-center justify-between p-4 sticky top-0 bg-white/80 backdrop-blur-md z-10 shrink-0 border-b border-slate-50">
      <div class="w-10 h-10 flex items-center justify-center text-primary"><span class="material-symbols-outlined">qr_code_2</span></div>
      <div class="flex-1 text-center"><span class="text-xs font-bold uppercase tracking-widest text-primary/60">DigiCard Web</span></div>
      <button data-action="share" class="w-10 h-10 flex items-center justify-center rounded-full hover:bg-primary/10 transition-colors">
        <span class="material-symbols-outlined">share</span>
      </button>
    </div>
    <div class="flex-1 min-h-0 overflow-y-auto no-scrollbar">
      <section class="flex flex-col items-center px-6 pt-8 pb-4 shrink-0">
        <div class="relative group">
          <div class="absolute -inset-1 bg-gradient-to-tr from-primary to-blue-400 rounded-full blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
          <div class="relative bg-center bg-no-repeat aspect-square bg-cover rounded-full h-32 w-32 border-4 border-white shadow-xl" style="background-image:url('${esc(c.avatarUrl)}')"></div>
        </div>
        <div class="mt-6 text-center">
          <div class="flex items-center justify-center gap-1.5">
            <h1 class="text-2xl font-bold text-slate-900 tracking-tight">${esc(c.fullName)}</h1>
            ${c.isVerified ? `<span class="material-symbols-outlined text-primary text-[20px]" title="Verified Professional" style="${FILL}">verified</span>` : ''}
          </div>
          <p class="text-primary font-medium mt-1">${esc(c.jobTitle)}</p>
        </div>
        <p class="mt-4 text-center text-slate-600 text-sm leading-relaxed max-w-[320px]">${esc(c.bio)}</p>
        <div class="w-full mt-8 px-2">
          <button data-action="save-contact" class="w-full text-white font-bold py-4 rounded-xl shadow-lg flex items-center justify-center gap-2 active:scale-[0.98] transition-all" style="background-color:${c.themeColor}">
            <span class="material-symbols-outlined">person_add</span>
            ${esc(c.saveContactLabel)}
          </button>
        </div>
      </section>
      <section class="flex flex-col gap-3 px-6 py-4">${links}</section>
      ${c.qrCodeUrl ? `
      <section class="mt-8 mb-8 flex flex-col items-center gap-4 px-6 shrink-0">
        <div class="p-4 bg-white rounded-2xl shadow-xl border border-slate-100">
          <img src="${esc(c.qrCodeUrl)}" alt="QR Code" class="size-28" />
        </div>
        <p class="text-[9px] font-bold uppercase tracking-[0.2em] opacity-40">Scan to View</p>
      </section>` : ''}
      <footer class="py-12 text-center bg-slate-50 shrink-0">
        <p class="text-slate-400 text-xs font-medium tracking-tight">Criado com <span class="text-primary font-bold">DigiCard Web</span></p>
      </footer>
    </div>
  </div>`;
}

/* ---------------- Facebook ---------------- */
function renderFacebook(c) {
  const fbLink = c.links.find((l) => l.type === 'facebook') || c.links.find((l) => l.type === 'website');
  const actionHref = fbLink ? linkHref(fbLink) : '#';
  const handle = esc(String(c.fullName).toLowerCase().replaceAll(' ', '.'));

  const links = c.links.map((link) => `
    <a href="${linkHref(link)}" target="_blank" rel="noopener noreferrer"
       class="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-100 hover:bg-gray-100 transition-colors">
      <span class="material-symbols-outlined text-lg" style="color:${link.color || c.themeColor}">${esc(link.icon || 'link')}</span>
      <span class="text-sm font-semibold">${esc(link.label)}</span>
    </a>`).join('');

  return `
  <div class="bg-white h-full flex flex-col overflow-hidden relative">
    <div class="flex items-center bg-white p-4 border-b border-gray-100 shrink-0 z-20">
      <span class="material-symbols-outlined">arrow_back</span>
      <h2 class="text-lg font-bold flex-1 ml-4">Perfil</h2>
      <span class="material-symbols-outlined">more_horiz</span>
    </div>
    <div class="flex-1 min-h-0 overflow-y-auto no-scrollbar pb-24">
      <div class="relative shrink-0">
        <div class="w-full h-40 bg-gray-200 bg-center bg-cover" style="background-image:url('${esc(c.bannerUrl || 'https://picsum.photos/seed/fb-cover/400/150')}')"></div>
        <div class="absolute -bottom-16 left-4 p-1 bg-white rounded-full shadow-lg">
          <div class="size-32 rounded-full border-4 border-white bg-center bg-cover bg-gray-300" style="background-image:url('${esc(c.avatarUrl)}')"></div>
        </div>
      </div>
      <div class="mt-20 px-4 flex flex-col gap-4 pb-12">
        <div>
          <div class="flex items-center gap-1.5">
            <h1 class="text-2xl font-bold tracking-tight">${esc(c.fullName)}</h1>
            ${c.isVerified ? `<span class="material-symbols-outlined text-primary text-xl" title="Verificado" style="${FILL}">verified</span>` : ''}
          </div>
          <p class="text-[#656487] text-base">@${handle}</p>
          <p class="mt-3 text-[#121117] text-base leading-relaxed">${esc(c.bio)}</p>
        </div>
        <div class="flex flex-col gap-3 w-full">
          <a href="${actionHref}" target="_blank" rel="noopener noreferrer"
             class="w-full text-white font-bold py-2.5 rounded-lg flex items-center justify-center gap-2 text-center"
             style="background-color:${c.themeColor}">
            <span class="material-symbols-outlined text-xl" style="${FILL}">social_leaderboard</span>
            Ver Perfil no Facebook
          </a>
          <button class="w-full bg-gray-100 text-[#121117] font-bold py-2.5 rounded-lg flex items-center justify-center gap-2">
            <span class="material-symbols-outlined text-xl">chat_bubble</span>
            Enviar Mensagem
          </button>
        </div>
        <div class="flex flex-col gap-2 mt-4">
          <h3 class="text-xs font-bold text-gray-400 uppercase tracking-widest px-1">Meus Contatos</h3>
          ${links}
        </div>
        <div class="grid grid-cols-2 gap-3 mt-4">
          <div class="flex flex-col gap-1 rounded-lg border p-4 bg-gray-50/50">
            <p class="text-2xl font-bold">1.2k</p>
            <p class="text-[#656487] text-xs font-medium uppercase tracking-wider">Seguidores</p>
          </div>
          <div class="flex flex-col gap-1 rounded-lg border p-4 bg-gray-50/50">
            <p class="text-2xl font-bold">${c.links.length}</p>
            <p class="text-[#656487] text-xs font-medium uppercase tracking-wider">Links</p>
          </div>
        </div>
        ${qrBlock(c, 'Scan to follow')}
      </div>
    </div>
    <div class="bg-white border-t border-gray-100 px-4 py-3 pb-6 flex justify-between items-center z-30 shrink-0 shadow-[0_-4px_12px_rgba(0,0,0,0.05)]">
      <span class="material-symbols-outlined text-primary" style="${FILL}">home</span>
      <span class="material-symbols-outlined text-slate-400">play_circle</span>
      <span class="material-symbols-outlined text-slate-400">group</span>
      <span class="material-symbols-outlined text-slate-400">notifications</span>
      <span class="material-symbols-outlined text-slate-400">menu</span>
    </div>
  </div>`;
}

/* ---------------- YouTube ---------------- */
function renderYoutube(c) {
  const ytLink = c.links.find((l) => l.type === 'youtube') || c.links.find((l) => l.type === 'website');
  const actionHref = ytLink ? linkHref(ytLink) : '#';
  const stat0 = (c.stats || [])[0];

  const videos = [1, 2].map((i) => `
    <div class="rounded-xl overflow-hidden bg-white border shadow-sm">
      <div class="aspect-video bg-cover bg-center" style="background-image:url('https://picsum.photos/seed/yt${i}/400/225')"></div>
      <div class="p-3">
        <h4 class="font-bold text-sm line-clamp-2">CONTEÚDO DO CANAL - VÍDEO EM DESTAQUE ${i}</h4>
        <p class="text-xs text-slate-500 mt-1">243 mil visualizações • há 2 dias</p>
      </div>
    </div>`).join('');

  return `
  <div class="bg-slate-50 font-display antialiased h-full flex flex-col overflow-hidden relative">
    <div class="flex items-center bg-white/80 backdrop-blur-md p-4 justify-between border-b border-gray-100 shrink-0 z-50">
      <span class="material-symbols-outlined text-slate-900">arrow_back</span>
      <h2 class="text-base font-bold flex-1 text-center">Perfil Oficial</h2>
      <button data-action="share" class="p-1 hover:bg-slate-100 rounded-full transition-colors">
        <span class="material-symbols-outlined text-slate-900">share</span>
      </button>
    </div>
    <div class="flex-1 min-h-0 overflow-y-auto no-scrollbar pb-24">
      <div class="h-32 w-full bg-slate-200 overflow-hidden shrink-0 relative">
        <img alt="Banner do canal" class="w-full h-full object-cover" src="${esc(c.bannerUrl || 'https://picsum.photos/seed/yt-banner/800/200')}" />
        <div class="absolute inset-0 bg-black/20"></div>
      </div>
      <div class="relative flex flex-col items-center -mt-16 pb-6 px-4">
        <div class="relative group">
          <div class="absolute -inset-1 bg-gradient-to-tr from-[#FF0000] to-red-400 rounded-full blur opacity-25"></div>
          <div class="relative bg-white p-1 rounded-full border-2 border-[#FF0000]">
            <div class="bg-center bg-no-repeat aspect-square bg-cover rounded-full h-32 w-32" style="background-image:url('${esc(c.avatarUrl)}')"></div>
          </div>
          <div class="absolute bottom-1 left-1/2 -translate-x-1/2 bg-[#FF0000] text-white text-[10px] font-bold px-3 py-0.5 rounded-full uppercase tracking-wider border-2 border-white animate-pulse whitespace-nowrap">AO VIVO</div>
        </div>
        <div class="mt-6 flex flex-col items-center text-center gap-1">
          <div class="flex items-center gap-1.5">
            <h1 class="text-slate-900 text-2xl font-black leading-tight tracking-tight">${esc(c.fullName)}</h1>
            ${c.isVerified ? `<span class="material-symbols-outlined text-blue-500 text-[20px]" title="Verificado" style="${FILL}">verified</span>` : ''}
          </div>
          <p class="text-slate-500 text-sm font-medium">@${esc(String(c.fullName).toLowerCase().replaceAll(' ', '_'))}_oficial</p>
          ${stat0 ? `
          <div class="flex items-center gap-2 mt-2 bg-slate-100 px-4 py-1.5 rounded-full">
            <span class="text-[#FF0000] font-bold">${esc(stat0.value)}</span>
            <span class="text-slate-500 text-xs font-semibold">${esc(stat0.label)}</span>
          </div>` : ''}
        </div>
        <div class="w-full mt-8 flex flex-col gap-3">
          <a href="${actionHref}" target="_blank" rel="noopener noreferrer"
             class="w-full text-white font-bold py-4 rounded-xl shadow-lg flex items-center justify-center gap-2 active:scale-95 transition-all text-center"
             style="background-color:${c.themeColor}">
            <span class="material-symbols-outlined">subscriptions</span>
            Inscreva-se
          </a>
        </div>
      </div>
      <div class="px-4 space-y-4">
        <h3 class="font-black text-lg">Vídeos Recentes</h3>
        ${videos}
      </div>
      ${qrBlock(c, 'Scan to Subscribe')}
    </div>
    <div class="bg-white/95 backdrop-blur-md border-t px-6 py-3 pb-6 flex items-center justify-between z-50 shrink-0">
      <span class="material-symbols-outlined text-primary" style="${FILL}">home</span>
      <span class="material-symbols-outlined text-slate-400">video_library</span>
      <span class="material-symbols-outlined text-slate-400">group</span>
      <span class="material-symbols-outlined text-slate-400">mail</span>
    </div>
  </div>`;
}

/* ---------------- TikTok ---------------- */
function renderTiktok(c) {
  const ttLink = c.links.find((l) => l.type === 'tiktok') || c.links.find((l) => l.type === 'website');
  const actionHref = ttLink ? linkHref(ttLink) : '#';

  const links = c.links.map((link) => `
    <a href="${linkHref(link)}" target="_blank" rel="noopener noreferrer"
       class="flex items-center p-4 rounded-xl bg-gray-50 border border-gray-200 hover:border-primary transition group">
      <div class="flex-1 flex items-center gap-4">
        <div class="bg-primary/10 text-primary p-2 rounded-lg"><span class="material-symbols-outlined">${esc(link.icon || 'link')}</span></div>
        <div><p class="font-bold text-sm">${esc(link.label)}</p><p class="text-xs text-gray-500 truncate max-w-[180px]">${esc(link.value)}</p></div>
      </div>
      <span class="material-symbols-outlined text-gray-300">chevron_right</span>
    </a>`).join('');

  return `
  <div class="bg-white font-display text-[#121117] h-full flex flex-col overflow-hidden relative">
    <div class="flex-1 min-h-0 overflow-y-auto no-scrollbar pb-24">
      <div class="relative h-40 w-full overflow-hidden shrink-0">
        <div class="absolute inset-0 bg-gradient-to-b from-black/40 to-transparent z-10"></div>
        <img alt="Banner Background" class="w-full h-full object-cover" src="${esc(c.bannerUrl || 'https://picsum.photos/seed/tiktok-banner/400/160')}" />
        <div class="absolute top-0 left-0 right-0 p-4 flex justify-between items-center z-20">
          <span class="material-symbols-outlined text-white bg-white/20 backdrop-blur-md rounded-full p-2">arrow_back</span>
          <span class="material-symbols-outlined text-white bg-white/20 backdrop-blur-md rounded-full p-2">more_horiz</span>
        </div>
      </div>
      <div class="relative px-6 -mt-16 z-30 flex flex-col items-center">
        <div class="relative">
          <div class="w-32 h-32 rounded-full p-1 bg-gradient-to-tr from-[#ff0050] via-primary to-[#00f2ea] shadow-[0_0_10px_rgba(255,0,80,0.5)]">
            <div class="w-full h-full rounded-full overflow-hidden border-4 border-white bg-white">
              <img alt="${esc(c.fullName)}" class="w-full h-full object-cover" src="${esc(c.avatarUrl)}" />
            </div>
          </div>
          <div class="absolute bottom-2 right-2 w-6 h-6 bg-green-500 border-4 border-white rounded-full"></div>
        </div>
        <div class="mt-4 text-center">
          <div class="flex items-center justify-center gap-1">
            <h1 class="text-2xl font-bold tracking-tight">@${esc(String(c.fullName).toLowerCase().replaceAll(' ', '_'))}</h1>
            ${c.isVerified ? `<span class="material-symbols-outlined text-[#00f2ea] text-xl" style="${FILL}">verified</span>` : ''}
          </div>
          <p class="text-gray-600 mt-1 max-w-[280px]">${esc(c.bio)}</p>
        </div>
        <div class="flex w-full mt-6 justify-center gap-8 py-4 border-y border-gray-100">
          <div class="text-center"><p class="text-xl font-bold">1.2M</p><p class="text-xs text-gray-400 uppercase tracking-widest">Seguidores</p></div>
          <div class="text-center"><p class="text-xl font-bold">15M</p><p class="text-xs text-gray-400 uppercase tracking-widest">Curtidas</p></div>
        </div>
        <div class="flex w-full gap-3 mt-6">
          <a href="${actionHref}" target="_blank" rel="noopener noreferrer"
             class="flex-1 text-white font-bold py-3 rounded-xl transition shadow-lg flex items-center justify-center gap-2 text-center"
             style="background-color:${c.themeColor}">
            <span class="material-symbols-outlined text-sm">person_add</span> Seguir
          </a>
          <button class="flex-1 bg-gray-100 text-gray-800 font-bold py-3 rounded-xl flex items-center justify-center gap-2">
            <span class="material-symbols-outlined text-sm">mail</span> Mensagem
          </button>
        </div>
        <div class="w-full mt-8 space-y-3">${links}</div>
        ${qrBlock(c, 'Scan to follow on TikTok')}
      </div>
    </div>
    <div class="bg-white border-t px-4 py-3 pb-6 flex justify-between items-center z-50 shrink-0">
      <span class="material-symbols-outlined text-gray-400">home</span>
      <span class="material-symbols-outlined text-gray-400">search</span>
      <div class="bg-gradient-to-tr from-[#ff0050] to-[#00f2ea] p-0.5 rounded-lg"><div class="bg-white px-3 py-1 rounded-[7px]"><span class="material-symbols-outlined text-black">add</span></div></div>
      <span class="material-symbols-outlined text-gray-400">chat_bubble</span>
      <span class="material-symbols-outlined text-black" style="${FILL}">person</span>
    </div>
  </div>`;
}

/* ---------------- Discord ---------------- */
function renderDiscord(c) {
  const discordLink = c.links.find((l) => l.type === 'discord') || c.links.find((l) => l.type === 'website');
  const actionHref = c.vCardUrl && c.vCardUrl !== '#' ? c.vCardUrl : (discordLink ? linkHref(discordLink) : '#');

  const links = c.links.map((link) => `
    <a class="flex items-center justify-between p-2.5 bg-[#2B2D31] hover:bg-white/5 rounded-lg border border-white/5 transition-colors group" href="${linkHref(link)}" target="_blank" rel="noopener noreferrer">
      <div class="flex items-center gap-3">
        <div class="size-7 rounded bg-white/5 flex items-center justify-center">
          <span class="material-symbols-outlined text-sm" style="color:${link.color || c.themeColor}">${esc(link.icon || 'link')}</span>
        </div>
        <span class="text-xs font-medium">${esc(link.label)}</span>
      </div>
      <span class="material-symbols-outlined text-white/20 group-hover:text-white/60 !text-sm">open_in_new</span>
    </a>`).join('');

  return `
  <div class="bg-[#1E1F22] text-white h-full font-display flex flex-col overflow-hidden relative">
    <div class="flex-1 min-h-0 overflow-y-auto no-scrollbar p-4 pb-12">
      <div class="w-full rounded-lg overflow-hidden shadow-2xl border border-black/20 bg-[#313338]">
        <div class="relative h-28 w-full" style="background-color:${c.themeColor}; background-image:linear-gradient(rgba(0,0,0,0.1), rgba(0,0,0,0.3)), url('${esc(c.bannerUrl || 'https://picsum.photos/seed/discord-banner/600/200')}'); background-size:cover; background-position:center">
          <div class="absolute top-3 right-3 flex items-center gap-2 bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/10">
            <span class="material-symbols-outlined text-[12px] text-white">style</span>
            <span class="text-[8px] font-bold tracking-wider uppercase">DigiCard Web</span>
          </div>
        </div>
        <div class="px-4 pb-4">
          <div class="relative flex justify-between items-end -mt-12 mb-4">
            <div class="relative">
              <div class="size-20 rounded-full border-[6px] border-[#313338] bg-[#2B2D31] overflow-hidden">
                <img alt="${esc(c.fullName)}" class="w-full h-full object-cover" src="${esc(c.avatarUrl)}" />
              </div>
              <div class="absolute bottom-0.5 right-0.5 size-5 bg-[#313338] rounded-full flex items-center justify-center">
                <div class="size-3.5 bg-[#23A55A] rounded-full border-2 border-[#313338]"></div>
              </div>
            </div>
            <div class="flex gap-1 bg-[#2B2D31] p-1.5 rounded-lg border border-white/5 mb-1">
              ${c.isVerified ? `<div class="text-primary" title="Verificado"><span class="material-symbols-outlined !text-[18px]" style="${FILL}">verified</span></div>` : ''}
              <div class="text-[#f47fff]" title="Premium"><span class="material-symbols-outlined !text-[18px]">workspace_premium</span></div>
              <div class="text-white/80" title="Early Supporter"><span class="material-symbols-outlined !text-[18px]">military_tech</span></div>
            </div>
          </div>
          <div class="bg-[#2B2D31] rounded-lg p-4 border border-black/10">
            <div class="flex flex-col gap-0.5">
              <h1 class="text-lg font-bold flex items-center gap-1.5">
                ${esc(c.fullName)}
                <span class="font-medium text-[#B5BAC1] text-sm">#2024</span>
              </h1>
              <p class="text-xs text-white/80 font-medium italic">"${esc(c.jobTitle)}"</p>
            </div>
            <div class="h-[1px] bg-white/5 my-3"></div>
            <div class="space-y-3">
              <div>
                <h3 class="text-[9px] font-bold uppercase tracking-wider mb-1 text-[#B5BAC1]">Sobre Mim</h3>
                <p class="text-xs text-white/90 leading-relaxed">${esc(c.bio)}</p>
              </div>
              <div>
                <h3 class="text-[9px] font-bold uppercase tracking-wider mb-1 text-[#B5BAC1]">Membro Desde</h3>
                <div class="flex items-center gap-1.5 text-xs text-white/80">
                  <span class="material-symbols-outlined !text-[14px]">calendar_today</span>
                  <span>Março de 2021</span>
                </div>
              </div>
            </div>
          </div>
          <div class="mt-4">
            <h3 class="text-[9px] font-bold uppercase tracking-wider mb-2 px-1 text-[#B5BAC1]">Contas Conectadas</h3>
            <div class="grid grid-cols-1 gap-2">${links}</div>
          </div>
          <div class="mt-6 flex flex-col gap-2">
            <a href="${actionHref}" target="_blank" rel="noopener noreferrer"
               class="w-full bg-[#5865F2] hover:bg-[#4752C4] text-white font-bold py-2.5 rounded transition-all shadow-lg active:scale-95 text-sm text-center"
               style="background-color:${c.themeColor}">
              Adicionar aos Contatos
            </a>
            <button data-action="share" class="w-full bg-white/10 hover:bg-white/20 text-white font-bold py-2.5 rounded transition-all text-sm flex items-center justify-center gap-2">
              <span class="material-symbols-outlined text-sm">share</span>
              Compartilhar
            </button>
          </div>
          ${c.qrCodeUrl ? `
          <div class="mt-8 flex flex-col items-center gap-3 py-6 border-t border-white/5 shrink-0">
            <div class="p-3 bg-white rounded-xl">
              <img src="${esc(c.qrCodeUrl)}" alt="QR Code" class="size-24" />
            </div>
            <p class="text-[8px] font-bold uppercase tracking-[0.2em] text-[#B5BAC1]">Scan Me</p>
          </div>` : ''}
        </div>
        <div class="bg-[#2B2D31] px-4 py-2 flex items-center justify-between text-[9px] font-bold uppercase tracking-widest border-t border-black/10 text-[#B5BAC1]">
          <div class="flex items-center gap-2">
            <span class="size-1.5 bg-[#23A55A] rounded-full animate-pulse"></span>
            Disponível
          </div>
          <div class="flex items-center gap-1 opacity-50">
            <span class="material-symbols-outlined !text-[12px]">lock</span>
            Criptografado
          </div>
        </div>
      </div>
    </div>
  </div>`;
}

/* ---------------- Designer Studio ---------------- */
function renderDesignerStudio(c) {
  const links = c.links.map((link) => `
    <a href="${linkHref(link)}" target="_blank" rel="noopener noreferrer"
       class="bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex items-center justify-between hover:border-primary/40 transition-colors">
      <div class="flex items-center gap-3">
        <div class="p-2 rounded-lg" style="background-color:${link.color || c.themeColor}15">
          ${socialIcon(link.type, link.icon, 'text-lg', `color:${link.color || c.themeColor}`)}
        </div>
        <div>
          <p class="font-bold text-sm">${esc(link.label)}</p>
          <p class="text-xs text-slate-400 truncate max-w-[180px]">${esc(link.value)}</p>
        </div>
      </div>
      <span class="material-symbols-outlined text-slate-300">chevron_right</span>
    </a>`).join('');

  const works = [1, 2, 3].map((i) => `
    <div class="min-w-[240px] flex-shrink-0 rounded-xl overflow-hidden aspect-video relative shadow-md">
      <img src="https://picsum.photos/seed/ds${i}/400/225" class="w-full h-full object-cover" alt="DS Portfolio" />
      <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-3 text-white text-xs font-medium">Projeto UI/UX ${i}</div>
    </div>`).join('');

  return `
  <div class="bg-slate-50 text-slate-900 h-full flex flex-col relative overflow-hidden">
    <header class="absolute top-0 left-0 right-0 flex items-center justify-between p-6 bg-slate-50/80 backdrop-blur-md z-20 border-b border-slate-100">
      <div class="flex items-center gap-2">
        <span class="material-symbols-outlined text-primary">auto_awesome</span>
        <h1 class="font-bold text-lg tracking-tight">Designer Studio</h1>
      </div>
      <button data-action="share" class="bg-white p-2 rounded-full shadow-sm hover:bg-slate-100 transition-colors">
        <span class="material-symbols-outlined text-slate-600">share</span>
      </button>
    </header>
    <div class="flex-1 min-h-0 overflow-y-auto no-scrollbar pt-20 pb-24">
      <section class="flex flex-col items-center px-6 pt-4 pb-8">
        <div class="relative mb-6">
          <div class="w-32 h-32 rounded-full border-4 border-primary/20 p-1">
            <img alt="${esc(c.fullName)}" class="w-full h-full object-cover rounded-full shadow-lg" src="${esc(c.avatarUrl)}" />
          </div>
          ${c.isVerified ? `
          <div class="absolute bottom-1 right-1 bg-primary text-white rounded-full p-1 border-2 border-slate-50 flex items-center justify-center">
            <span class="material-symbols-outlined text-[16px] font-bold">verified</span>
          </div>` : ''}
        </div>
        <div class="text-center">
          <h2 class="text-2xl font-bold tracking-tight mb-1">${esc(c.fullName)}</h2>
          <p class="text-slate-500 font-medium mb-4">${esc(c.jobTitle)}</p>
          <div class="flex gap-3 justify-center">
            <button class="text-white px-6 py-2.5 rounded-xl font-bold text-sm shadow-lg active:scale-95 transition-transform" style="background-color:${c.themeColor}">Contrate-me</button>
            <button data-action="save-contact" class="bg-white text-slate-900 border border-slate-200 px-4 py-2.5 rounded-xl font-bold text-sm active:scale-95 transition-transform flex items-center gap-2">
              <span class="material-symbols-outlined text-sm">download</span>
              VCard
            </button>
          </div>
        </div>
      </section>
      <section class="px-6 mb-8">
        <h3 class="text-sm font-bold uppercase tracking-widest text-slate-400 mb-4 px-1">Meus Links</h3>
        <div class="grid grid-cols-1 gap-3">${links}</div>
      </section>
      <section class="mb-8">
        <div class="flex items-center justify-between px-6 mb-4">
          <h3 class="text-sm font-bold uppercase tracking-widest text-slate-400">Trabalhos</h3>
          <span class="text-xs font-bold text-primary">Ver todos</span>
        </div>
        <div class="flex gap-4 overflow-x-auto px-6 no-scrollbar pb-2">${works}</div>
      </section>
      ${c.qrCodeUrl ? `
      <section class="mt-8 mb-12 flex flex-col items-center gap-4 px-6 shrink-0">
        <div class="p-4 bg-white rounded-2xl shadow-xl border border-slate-100">
          <img src="${esc(c.qrCodeUrl)}" alt="QR Code" class="size-32" />
        </div>
        <p class="text-[10px] font-bold uppercase tracking-[0.2em] opacity-40 text-center">Scan to connect</p>
      </section>` : ''}
    </div>
    <nav class="absolute bottom-6 left-0 right-0 z-30 px-6">
      <div class="bg-white/80 backdrop-blur-xl border border-slate-200/50 rounded-full shadow-2xl p-2 flex items-center justify-around">
        <span class="material-symbols-outlined text-primary" style="${FILL}">home</span>
        <span class="material-symbols-outlined text-slate-400">auto_awesome_motion</span>
        <span class="material-symbols-outlined text-slate-400">chat_bubble</span>
        <span class="material-symbols-outlined text-slate-400">person</span>
      </div>
    </nav>
  </div>`;
}

/* ---------------- Registro de templates ---------------- */
export const TEMPLATES = {
  default: renderDefault,
  professionals: renderProfessionals,
  linkedin: renderLinkedin,
  instagram: renderInstagram,
  whatsapp: renderWhatsapp,
  designer: renderDesignerStudio,
  executive: renderExecutive,
  facebook: renderFacebook,
  spotify: renderSpotify,
  youtube: renderYoutube,
  tiktok: renderTiktok,
  twitch: renderTiktok,
  digicard: renderDigicardWeb,
  discord: renderDiscord,
};

/** Resolve o template pelo id (base antes do '-', twitch cai no TikTok). */
export function renderCard(cardData) {
  const base = String(cardData.template || 'default').split('-')[0];
  const renderer = TEMPLATES[base] || renderDefault;
  return renderer(cardData);
}
