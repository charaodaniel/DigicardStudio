import type { CardData } from '@/lib/types';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const profileImage = PlaceHolderImages.find(img => img.id === 'profile-1');

export const initialCardData: CardData = {
  template: 'default',
  fullName: "Ricardo Oliveira",
  jobTitle: "Diretor de Tecnologia",
  bio: "Focado em soluções inovadoras para o mercado financeiro e corporativo.",
  avatarUrl: profileImage?.imageUrl ?? "https://picsum.photos/seed/profile1/96/96",
  isVerified: true,
  themeColor: '#5048e5',
  links: [
    { id: '1', type: 'phone', label: 'Ligar', value: '+5511987654321', icon: 'phone' },
    { id: '2', type: 'email', label: 'Email', value: 'mailto:ricardo.oliveira@empresa.com', icon: 'mail' },
    { id: '3', type: 'linkedin', label: 'LinkedIn', value: 'https://linkedin.com/in/ricardo-oliveira', icon: 'group' },
    { id: '4', type: 'instagram', label: 'Instagram', value: 'https://instagram.com/ricardo.oliveira', icon: 'camera' },
  ],
  saveContactLabel: 'Salvar Contato',
};
