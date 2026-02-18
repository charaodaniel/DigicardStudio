import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatHref(type: string, value: string) {
  if (!value) return '#';
  const cleanValue = value.trim();
  
  // Se já for um link completo, retorna ele mesmo
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
