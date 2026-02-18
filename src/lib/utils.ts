import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import type { CardData } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatHref(type: string, value: string) {
  if (!value) return '#';
  const cleanValue = value.trim();
  
  if (cleanValue.startsWith('http') || cleanValue.startsWith('mailto:') || cleanValue.startsWith('tel:')) {
    return cleanValue;
  }

  switch (type) {
    case 'phone': 
      return `tel:${cleanValue.replace(/\D/g, '')}`;
    case 'email': 
      return `mailto:${cleanValue}`;
    case 'whatsapp': 
      const phone = cleanValue.replace(/\D/g, '');
      return `https://wa.me/${phone}`;
    case 'instagram': 
      return `https://instagram.com/${cleanValue.replace('@', '')}`;
    case 'linkedin': 
      if (cleanValue.includes('linkedin.com')) return `https://${cleanValue.replace(/^https?:\/\//, '')}`;
      return `https://linkedin.com/in/${cleanValue}`;
    case 'github': 
      return `https://github.com/${cleanValue}`;
    case 'tiktok':
      return `https://tiktok.com/@${cleanValue.replace('@', '')}`;
    case 'youtube':
      if (cleanValue.includes('youtube.com')) return `https://${cleanValue.replace(/^https?:\/\//, '')}`;
      return `https://youtube.com/@${cleanValue}`;
    case 'spotify':
      if (cleanValue.includes('spotify.com')) return `https://${cleanValue.replace(/^https?:\/\//, '')}`;
      return `https://open.spotify.com/artist/${cleanValue}`;
    case 'facebook':
      if (cleanValue.includes('facebook.com')) return `https://${cleanValue.replace(/^https?:\/\//, '')}`;
      return `https://facebook.com/${cleanValue}`;
    case 'discord':
      if (cleanValue.startsWith('https://discord')) return cleanValue;
      return `https://discord.com/users/${cleanValue}`;
    default: 
      return cleanValue.includes('.') ? `https://${cleanValue}` : '#';
  }
}

export const shareCard = async (title: string, text: string, url: string) => {
  if (typeof navigator !== 'undefined' && navigator.share) {
    try {
      await navigator.share({ title, text, url });
      return { success: true, method: 'native' };
    } catch (err) {
      if ((err as Error).name !== 'AbortError') {
        console.error('Error sharing:', err);
      }
      return { success: false };
    }
  } else {
    try {
      await navigator.clipboard.writeText(url);
      return { success: true, method: 'clipboard' };
    } catch (err) {
      console.error('Error copying to clipboard:', err);
      return { success: false };
    }
  }
};

export const downloadVCard = (cardData: CardData) => {
  const vcard = [
    'BEGIN:VCARD',
    'VERSION:3.0',
    `FN:${cardData.fullName}`,
    `ORG:${cardData.jobTitle}`,
    `TITLE:${cardData.jobTitle}`,
    `PHOTO;VALUE=URI:${cardData.avatarUrl}`,
    `NOTE:${cardData.bio.replace(/\n/g, ' ')}`,
    ...cardData.links.map(l => {
      const href = formatHref(l.type, l.value);
      if (l.type === 'phone' || l.type === 'whatsapp') return `TEL;TYPE=CELL:${l.value}`;
      if (l.type === 'email') return `EMAIL;TYPE=INTERNET:${l.value}`;
      return `URL;TYPE=${l.label.toUpperCase()}:${href}`;
    }),
    'END:VCARD'
  ].join('\n');

  const blob = new Blob([vcard], { type: 'text/vcard' });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', `${cardData.fullName.toLowerCase().replace(/\s/g, '-')}.vcf`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const downloadPlotterSVG = (cardData: CardData) => {
  const w = 85; // mm
  const h = 55; // mm
  const gap = 5; // mm
  
  // Gerar SVG técnico para plotter
  // Vermelho (#FF0000) = Corte
  // Preto (#000000) = Desenho/Gravação
  const svg = `
<svg width="${(w * 2) + gap}mm" height="${h}mm" viewBox="0 0 ${(w * 2) + gap} ${h}" xmlns="http://www.w3.org/2000/svg">
  <style>
    .cut { fill: none; stroke: #FF0000; stroke-width: 0.1; }
    .draw { fill: none; stroke: #000000; stroke-width: 0.1; }
    .text { fill: #000000; font-family: ${cardData.fontFamily}, sans-serif; font-weight: bold; }
  </style>

  <!-- FRENTE (Esquerda) -->
  <g id="front">
    <rect class="cut" x="0" y="0" width="${w}" height="${h}" rx="2" />
    <text x="5" y="10" class="text" font-size="5">${cardData.fullName.toUpperCase()}</text>
    <text x="5" y="16" class="text" font-size="3" opacity="0.6">${cardData.jobTitle}</text>
    
    <!-- Placeholder de Elementos do Template -->
    <rect class="draw" x="5" y="25" width="40" height="0.1" />
    ${cardData.links.slice(0, 3).map((l, i) => `
      <text x="5" y="${32 + (i * 5)}" class="text" font-size="2.5">${l.value}</text>
    `).join('')}
  </g>

  <!-- VERSO (Direita) -->
  <g id="back" transform="translate(${w + gap}, 0)">
    <rect class="cut" x="0" y="0" width="${w}" height="${h}" rx="2" />
    <!-- Guia do QR Code -->
    <rect class="draw" x="${(w / 2) - 10}" y="${(h / 2) - 10}" width="20" height="20" />
    <text x="${w / 2}" y="${(h / 2) + 15}" class="text" font-size="2" text-anchor="middle">SCAN TO CONNECT</text>
  </g>
</svg>
  `.trim();

  const blob = new Blob([svg], { type: 'image/svg+xml' });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', `${cardData.fullName.toLowerCase().replace(/\s/g, '-')}-plotter.svg`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
