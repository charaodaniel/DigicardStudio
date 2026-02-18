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
  
  // Detecção de cor de contraste para o SVG
  const getContrastColor = (hexcolor: string) => {
    if (!hexcolor) return '#000000';
    const r = parseInt(hexcolor.slice(1, 3), 16);
    const g = parseInt(hexcolor.slice(3, 5), 16);
    const b = parseInt(hexcolor.slice(5, 7), 16);
    const yiq = (r * 299 + g * 587 + b * 114) / 1000;
    return yiq >= 128 ? '#000000' : '#ffffff';
  };

  const textColor = getContrastColor(cardData.physicalBackgroundColor || '#ffffff');

  // Gerar SVG técnico completo para plotter e impressão
  // Vermelho (#FF0000) = Corte
  const svg = `
<svg width="${(w * 2) + gap}mm" height="${h}mm" viewBox="0 0 ${(w * 2) + gap} ${h}" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <clipPath id="avatar-clip">
      <circle cx="65" cy="20" r="12" />
    </clipPath>
  </defs>
  <style>
    .cut { fill: none; stroke: #FF0000; stroke-width: 0.1; }
    .text { fill: ${textColor}; font-family: ${cardData.fontFamily}, sans-serif; }
    .label { fill: ${cardData.themeColor}; font-weight: bold; }
  </style>

  <!-- FRENTE (Anverso) -->
  <g id="front">
    <!-- Fundo Colorido -->
    <rect x="0" y="0" width="${w}" height="${h}" fill="${cardData.physicalBackgroundColor || '#ffffff'}" />
    <!-- Marca de Corte -->
    <rect class="cut" x="0" y="0" width="${w}" height="${h}" rx="2" />
    
    ${cardData.physicalShowAvatar ? `
    <image xlink:href="${cardData.avatarUrl}" x="53" y="8" width="24" height="24" clip-path="url(#avatar-clip)" />
    <circle cx="65" cy="20" r="12.5" fill="none" stroke="${textColor}" stroke-width="0.5" opacity="0.2" />
    ` : ''}

    ${cardData.physicalShowTitle ? `
    <text x="6" y="12" class="text" font-size="5" font-weight="900">${cardData.fullName.toUpperCase()}</text>
    <text x="6" y="17" class="label" font-size="2.5" letter-spacing="0.5">${cardData.jobTitle.toUpperCase()}</text>
    ` : ''}

    ${cardData.physicalShowLinks ? `
    <g transform="translate(6, 26)">
      ${cardData.links.slice(0, 4).map((l, i) => `
        <text x="0" y="${i * 5}" class="text" font-size="2" font-weight="bold" opacity="0.4">${l.label.toUpperCase()}</text>
        <text x="0" y="${(i * 5) + 2.5}" class="text" font-size="2.5" font-weight="bold">${l.value}</text>
      `).join('')}
    </g>
    ` : ''}

    ${cardData.physicalShowFooter ? `
    <text x="${w / 2}" y="${h - 4}" class="text" font-size="1.5" text-anchor="middle" opacity="0.3" font-weight="bold" letter-spacing="1">
      ${cardData.customWebsiteUrl?.toUpperCase() || 'DIGICARD.STUDIO'} | ${cardData.footerText?.toUpperCase() || 'PRODUCED BY DIGICARD'}
    </text>
    ` : ''}
  </g>

  <!-- VERSO (Reverso) -->
  <g id="back" transform="translate(${w + gap}, 0)">
    <!-- Fundo Colorido -->
    <rect x="0" y="0" width="${w}" height="${h}" fill="${cardData.physicalBackgroundColor || '#ffffff'}" />
    <!-- Marca de Corte -->
    <rect class="cut" x="0" y="0" width="${w}" height="${h}" rx="2" />
    
    ${cardData.physicalShowQR ? `
    <g transform="translate(${(w / 2) - 15}, ${(h / 2) - 18})">
      <rect x="-2" y="-2" width="34" height="34" rx="3" fill="white" />
      <image xlink:href="${cardData.qrCodeUrl}" x="0" y="0" width="30" height="30" />
    </g>
    <text x="${w / 2}" y="${(h / 2) + 22}" class="text" font-size="3" font-weight="900" text-anchor="middle" letter-spacing="0.5">
      ${cardData.fullName.toUpperCase()}
    </text>
    <text x="${w / 2}" y="${(h / 2) + 25}" class="text" font-size="1.5" font-weight="bold" text-anchor="middle" opacity="0.4" letter-spacing="2">
      SCAN TO SAVE CONTACT
    </text>
    ` : `
    <text x="${w / 2}" y="${h / 2}" class="text" font-size="4" font-weight="900" text-anchor="middle">${cardData.fullName.toUpperCase()}</text>
    `}
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
