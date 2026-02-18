import type { CardData } from '@/lib/types';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const profileImage = PlaceHolderImages.find(img => img.id === 'profile-joao-silva');
const qrImage = PlaceHolderImages.find(img => img.id === 'qr-code-1');

export const initialCardData: CardData = {
  template: 'default',
  fullName: "João Silva",
  fullNameLink: '',
  jobTitle: "Designer de Produto",
  jobTitleLink: '',
  bio: "Especialista em criar experiências digitais centradas no usuário. 10+ anos transformando problemas complexos em interfaces simples e elegantes.",
  avatarUrl: profileImage?.imageUrl ?? "https://picsum.photos/seed/joao/128/128",
  avatarLink: '',
  bannerUrl: "https://images.unsplash.com/photo-1614680376593-902f74cf0d41?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
  bannerLink: '',
  vCardUrl: "https://firebasestudio.com/vcard-example.vcf",
  isVerified: true,
  themeColor: '#5048e5',
  fontFamily: 'Inter',
  baseFontSize: 16,
  links: [
    { id: '1', type: 'whatsapp', label: 'WhatsApp', value: '5511999999999', icon: 'forum', color: '#25D366' },
    { id: '2', type: 'instagram', label: 'Instagram', value: 'joao.silva', icon: 'photo_camera', color: '#E1306C' },
    { id: '3', type: 'linkedin', label: 'LinkedIn', value: 'joao-silva', icon: 'work', color: '#0077b5' },
    { id: '4', type: 'website', label: 'Portfólio', value: 'https://joaosilva.design', icon: 'language', color: '#5048e5' },
  ],
  stats: [
    { label: 'Anos Exp.', value: '12', url: '' },
    { label: 'Projetos', value: '150+', url: '' },
    { label: 'Prêmios', value: '08', url: '' },
  ],
  saveContactLabel: 'Salvar Contato',
  qrCodeUrl: qrImage?.imageUrl ?? 'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=example',
  customWebsiteUrl: 'www.digicard.studio/joaosilva',
  footerText: 'DESIGNED WITH DIGICARD STUDIO © 2024',
  physicalShowAvatar: true,
  physicalShowTitle: true,
  physicalShowStats: true,
  physicalShowLinks: true,
  physicalShowQR: true,
  physicalShowFooter: true,
  physicalBackgroundColor: '#ffffff',
};
