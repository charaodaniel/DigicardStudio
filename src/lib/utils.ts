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

// Helper para converter URL de imagem para Base64 (Data URL)
async function imageToBase64(url: string): Promise<string> {
  try {
    const response = await fetch(url);
    const blob = await response.blob();
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = () => resolve(url); // Fallback para URL original se falhar
      reader.readAsDataURL(blob);
    });
  } catch (error) {
    console.warn('CORS ou erro de rede ao converter imagem para SVG:', url);
    return url;
  }
}

export const downloadPlotterSVG = async (cardData: CardData) => {
  const w = 85; // mm
  const h = 55; // mm
  const gap = 5; // mm
  
  // Converter imagens para Base64 para garantir carregamento em softwares vetoriais
  const avatarBase64 = cardData.physicalShowAvatar ? await imageToBase64(cardData.avatarUrl) : '';
  const qrBase64 = cardData.physicalShowQR ? await imageToBase64(cardData.qrCodeUrl || '') : '';

  const getContrastColor = (hexcolor: string) => {
    if (!hexcolor) return '#000000';
    const r = parseInt(hexcolor.slice(1, 3), 16);
    const g = parseInt(hexcolor.slice(3, 5), 16);
    const b = parseInt(hexcolor.slice(5, 7), 16);
    const yiq = (r * 299 + g * 587 + b * 114) / 1000;
    return yiq >= 128 ? '#000000' : '#ffffff';
  };

  const textColor = getContrastColor(cardData.physicalBackgroundColor || '#ffffff');

  const svg = `
<svg width="${(w * 2) + gap}mm" height="${h}mm" viewBox="0 0 ${(w * 2) + gap} ${h}" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <clipPath id="avatar-clip">
      <circle cx="65" cy="20" r="12" />
    </clipPath>
  </defs>
  <style>
    .cut { fill: none; stroke: #FF0000; stroke-width: 0.1; }
    .text { fill: ${textColor}; font-family: '${cardData.fontFamily}', Arial, sans-serif; }
    .label { fill: ${cardData.themeColor}; font-weight: bold; }
    .small-label { fill: ${textColor}; opacity: 0.5; font-size: 1.8px; font-weight: bold; }
  </style>

  <!-- FRENTE (Anverso) -->
  <g id="front">
    <rect x="0" y="0" width="${w}" height="${h}" fill="${cardData.physicalBackgroundColor || '#ffffff'}" />
    <rect class="cut" x="0" y="0" width="${w}" height="${h}" rx="2" />
    
    ${cardData.physicalShowAvatar && avatarBase64 ? `
    <image xlink:href="${avatarBase64}" x="53" y="8" width="24" height="24" clip-path="url(#avatar-clip)" />
    <circle cx="65" cy="20" r="12.2" fill="none" stroke="${textColor}" stroke-width="0.3" opacity="0.2" />
    ` : ''}

    ${cardData.physicalShowTitle ? `
    <text x="6" y="12" class="text" font-size="5" font-weight="900">${cardData.fullName.toUpperCase()}</text>
    <text x="6" y="17" class="label" font-size="2.5" letter-spacing="0.5">${cardData.jobTitle.toUpperCase()}</text>
    ` : ''}

    ${cardData.physicalShowLinks ? `
    <g transform="translate(6, 26)">
      ${cardData.links.slice(0, 4).map((l, i) => `
        <text x="0" y="${i * 6}" class="small-label">${l.label.toUpperCase()}</text>
        <text x="0" y="${(i * 6) + 3}" class="text" font-size="2.6" font-weight="bold">${l.value}</text>
      `).join('')}
    </g>
    ` : ''}

    ${cardData.physicalShowFooter ? `
    <text x="${w / 2}" y="${h - 4}" class="text" font-size="1.5" text-anchor="middle" opacity="0.3" font-weight="bold" letter-spacing="0.8">
      ${cardData.customWebsiteUrl?.toUpperCase() || 'WWW.DIGICARD.STUDIO'} | ${cardData.footerText?.toUpperCase() || 'PRODUCED BY DIGICARD'}
    </text>
    ` : ''}
  </g>

  <!-- VERSO (Reverso) -->
  <g id="back" transform="translate(${w + gap}, 0)">
    <rect x="0" y="0" width="${w}" height="${h}" fill="${cardData.physicalBackgroundColor || '#ffffff'}" />
    <rect class="cut" x="0" y="0" width="${w}" height="${h}" rx="2" />
    
    ${cardData.physicalShowQR && qrBase64 ? `
    <g transform="translate(${(w / 2) - 15}, ${(h / 2) - 18})">
      <rect x="-2" y="-2" width="34" height="34" rx="3" fill="white" />
      <image xlink:href="${qrBase64}" x="0" y="0" width="30" height="30" />
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
