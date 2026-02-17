export type SocialLink = {
  id: string;
  type: 'phone' | 'email' | 'linkedin' | 'instagram' | 'website' | 'github';
  label: string;
  value: string;
  icon: string;
};

export type CardData = {
  template: string;
  fullName: string;
  jobTitle: string;
  bio: string;
  avatarUrl: string;
  isVerified: boolean;
  themeColor: string;
  links: SocialLink[];
  saveContactLabel: string;
};

export type ActiveTool = 'profile' | 'design' | 'print' | 'qr';
