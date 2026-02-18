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
    `NOTE:${cardData.bio.replace(/\n/g, ' ')}`,
    ...cardData.links.map(l => {
      if (l.type === 'phone' || l.type === 'whatsapp') return `TEL;TYPE=CELL:${l.value}`;
      if (l.type === 'email') return `EMAIL;TYPE=INTERNET:${l.value}`;
      return `URL:${formatHref(l.type, l.value)}`;
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
