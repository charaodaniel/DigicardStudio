export type SocialLink = {
  id: string;
  type: 'phone' | 'email' | 'linkedin' | 'instagram' | 'website' | 'github' | 'whatsapp';
  label: string;
  value: string;
  icon: string;
  color?: string;
};

export type CardData = {
  template: string;
  fullName: string;
  jobTitle: string;
  bio: string;
  avatarUrl: string;
  isVerified: boolean;
  themeColor: string;
  fontFamily: string;
  links: SocialLink[];
  saveContactLabel: string;
  qrCodeUrl?: string;
};
