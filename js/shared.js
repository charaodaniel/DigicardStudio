/**
 * Módulos compartilhados das páginas: toast global + biblioteca de modelos do editor.
 */

/* ---------------- Toast simples (substitui radix toast) ---------------- */
let toastEl = null;
let toastTimer = null;

export function toast(title, description = '', variant = 'default') {
  if (!toastEl) {
    toastEl = document.createElement('div');
    toastEl.id = 'app-toast';
    toastEl.className = 'fixed bottom-6 right-6 z-[200] max-w-sm bg-slate-900 text-white rounded-xl shadow-2xl px-5 py-4 hidden';
    toastEl.innerHTML = `
      <p class="text-sm font-bold" id="toast-title"></p>
      <p class="text-xs text-white/70 mt-1" id="toast-desc"></p>`;
    document.body.appendChild(toastEl);
  }
  toastEl.querySelector('#toast-title').textContent = title;
  toastEl.querySelector('#toast-desc').textContent = description;
  toastEl.classList.remove('hidden');
  if (variant === 'destructive') toastEl.classList.add('!bg-red-600');
  else toastEl.classList.remove('!bg-red-600');

  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toastEl.classList.add('hidden'), 3000);
}

/* ---------------- Biblioteca de Modelos (editor.html) ---------------- */

export const templates = [
  { id: 'default', name: 'Padrão Moderno', imageId: 'template-default', image: 'https://picsum.photos/seed/default/400/300', category: 'Corp', orientation: 'horizontal' },
  { id: 'professionals', name: 'Arquiteto/Design', imageId: 'template-professionals', image: 'https://images.unsplash.com/photo-1659303387110-8d1be69a8d55?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600', category: 'Corp', orientation: 'horizontal' },
  { id: 'executive', name: 'Executivo Elite', imageId: 'template-executive', image: 'https://images.unsplash.com/photo-1769893464274-ef3af10359f9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600', category: 'Corp', orientation: 'horizontal' },
  { id: 'linkedin', name: 'LinkedIn Card', imageId: 'template-linkedin', image: 'https://images.unsplash.com/photo-1615494937430-65d34f6e5aa8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600', category: 'Social', orientation: 'vertical' },
  { id: 'instagram', name: 'InstaCard Studio', imageId: 'template-instagram', image: 'https://images.unsplash.com/photo-1624024000238-b31760e3cf02?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600', category: 'Social', orientation: 'horizontal' },
  { id: 'instagram-v', name: 'InstaCard Vertical', imageId: 'template-instagram', image: 'https://images.unsplash.com/photo-1624024000238-b31760e3cf02?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600', category: 'Social', orientation: 'vertical' },
  { id: 'whatsapp', name: 'WhatsApp Business', imageId: 'template-whatsapp', image: 'https://images.unsplash.com/photo-1497215842964-222b430dc094?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600', category: 'Social', orientation: 'horizontal' },
  { id: 'twitch-h', name: 'Twitch Horizontal', imageId: 'template-discord', image: 'https://images.unsplash.com/photo-1614680376593-902f74cf0d41?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600', category: 'Social', orientation: 'horizontal' },
  { id: 'twitch-v', name: 'Twitch Vertical', imageId: 'template-discord', image: 'https://images.unsplash.com/photo-1614680376593-902f74cf0d41?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600', category: 'Social', orientation: 'vertical' },
  { id: 'facebook', name: 'Facebook Pro', imageId: 'template-facebook', image: 'https://images.unsplash.com/photo-1511367461989-f85a21fda167?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600', category: 'Social', orientation: 'horizontal' },
  { id: 'facebook-v', name: 'Facebook Vertical', imageId: 'template-facebook', image: 'https://images.unsplash.com/photo-1511367461989-f85a21fda167?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600', category: 'Social', orientation: 'vertical' },
  { id: 'spotify', name: 'Spotify Music', imageId: 'template-spotify', image: 'https://picsum.photos/seed/spotify-template/400/300', category: 'Social', orientation: 'horizontal' },
  { id: 'spotify-v', name: 'Spotify Vertical', imageId: 'template-spotify', image: 'https://picsum.photos/seed/spotify-template/400/300', category: 'Social', orientation: 'vertical' },
  { id: 'youtube', name: 'YouTube Channel', imageId: 'template-youtube', image: 'https://images.unsplash.com/photo-1673767297196-ce9739933932?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600', category: 'Social', orientation: 'horizontal' },
  { id: 'youtube-v', name: 'YouTube Vertical', imageId: 'template-youtube', image: 'https://images.unsplash.com/photo-1673767297196-ce9739933932?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600', category: 'Social', orientation: 'vertical' },
];

export const templatePresets = {
  default: { themeColor: '#5048e5', physicalBackgroundColor: '#ffffff' },
  professionals: { themeColor: '#5048e5', physicalBackgroundColor: '#ffffff' },
  linkedin: { themeColor: '#0A66C2', physicalBackgroundColor: '#ffffff' },
  instagram: { themeColor: '#E1306C', physicalBackgroundColor: '#ffffff' },
  'instagram-v': { themeColor: '#E1306C', physicalBackgroundColor: '#ffffff' },
  whatsapp: { themeColor: '#25D366', physicalBackgroundColor: '#ffffff' },
  executive: { themeColor: '#D4AF37', physicalBackgroundColor: '#0a0a0b' },
  facebook: { themeColor: '#1877F2', physicalBackgroundColor: '#ffffff' },
  'facebook-v': { themeColor: '#1877F2', physicalBackgroundColor: '#ffffff' },
  spotify: { themeColor: '#1DB954', physicalBackgroundColor: '#121212' },
  'spotify-v': { themeColor: '#1DB954', physicalBackgroundColor: '#121212' },
  youtube: { themeColor: '#FF0000', physicalBackgroundColor: '#FF0000' },
  'youtube-v': { themeColor: '#FF0000', physicalBackgroundColor: '#FF0000' },
  'twitch-h': { themeColor: '#9146FF', physicalBackgroundColor: '#0e0e10' },
  'twitch-v': { themeColor: '#9146FF', physicalBackgroundColor: '#0e0e10' },
};

export function renderTemplateLibrary(applyTemplate) {
  let activeFilter = 'Todos';

  const wrap = document.createElement('div');
  wrap.className = 'flex flex-col h-full overflow-hidden';

  const render = () => {
    const filterButtons = ['Todos', 'Social', 'Corp'];

    const items = templates
      .filter((t) => activeFilter === 'Todos' || t.category === activeFilter)
      .map(
        (t) => `
        <div class="group cursor-pointer" data-template="${t.id}">
          <div class="relative aspect-[4/3] w-full overflow-hidden rounded-xl border border-slate-200 transition-all group-hover:border-primary group-hover:shadow-md">
            <img src="${t.image}" alt="${t.name}" class="h-full w-full object-cover transition-transform group-hover:scale-105" loading="lazy" />
            <div class="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-colors"></div>
            <div class="absolute top-2 right-2">
              <span class="bg-black/60 backdrop-blur-md text-white text-[8px] px-2 py-0.5 rounded font-bold uppercase tracking-wider">
                ${t.orientation === 'horizontal' ? 'Horizontal' : 'Vertical'}
              </span>
            </div>
          </div>
          <p class="mt-2 text-xs font-bold text-slate-700">${t.name}</p>
        </div>`
      )
      .join('');

    wrap.innerHTML = `
      <div class="p-5 border-b border-slate-100">
        <h2 class="text-lg font-bold text-slate-800">Biblioteca de Modelos</h2>
        <p class="text-xs text-slate-500">Estilos otimizados para perfis digitais.</p>
      </div>
      <div class="flex flex-wrap gap-2 p-4 border-b border-slate-100 bg-slate-50/50">
        ${filterButtons
          .map(
            (f) => `
          <button data-filter="${f}" class="rounded-full px-3 py-1 text-[10px] font-bold transition-all border ${
            activeFilter === f ? 'bg-primary border-primary text-white' : 'bg-white border-slate-200 text-slate-600 hover:border-primary hover:text-primary'
          }">${f}</button>`
          )
          .join('')}
      </div>
      <div class="flex-1 overflow-y-auto p-4 space-y-4 no-scrollbar">${items}</div>`;

    wrap.querySelectorAll('[data-filter]').forEach((btn) =>
      btn.addEventListener('click', () => {
        activeFilter = btn.dataset.filter;
        render();
      })
    );
    wrap.querySelectorAll('[data-template]').forEach((el) =>
      el.addEventListener('click', () => applyTemplate(el.dataset.template))
    );
  };

  render();
  return wrap;
}
