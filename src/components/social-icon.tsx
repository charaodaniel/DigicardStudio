
'use client';

import React from 'react';
import { 
  SiInstagram, 
  SiSpotify, 
  SiYoutube, 
  SiFacebook, 
  SiTiktok, 
  SiLinkedin, 
  SiGithub, 
  SiWhatsapp, 
  SiDiscord, 
  SiX,
  SiTwitch,
  SiThreads
} from "react-icons/si";
import { cn } from '@/lib/utils';

type SocialIconProps = {
  type?: string;
  icon?: string; // fallback para Material Symbol
  className?: string;
  style?: React.CSSProperties;
};

/**
 * @fileOverview Componente unificado de ícones que prioriza logos de marcas (Si) 
 * e faz fallback para Material Symbols.
 */
export default function SocialIcon({ type, icon, className, style }: SocialIconProps) {
  const iconProps = { className: cn("size-[1em]", className), style };

  // Mapeamento de tipos para ícones de marca oficiais (Simple Icons)
  switch (type?.toLowerCase()) {
    case 'instagram': return <SiInstagram {...iconProps} />;
    case 'spotify': return <SiSpotify {...iconProps} />;
    case 'youtube': return <SiYoutube {...iconProps} />;
    case 'facebook': return <SiFacebook {...iconProps} />;
    case 'tiktok': return <SiTiktok {...iconProps} />;
    case 'linkedin': return <SiLinkedin {...iconProps} />;
    case 'github': return <SiGithub {...iconProps} />;
    case 'whatsapp': return <SiWhatsapp {...iconProps} />;
    case 'discord': return <SiDiscord {...iconProps} />;
    case 'twitter':
    case 'x': return <SiX {...iconProps} />;
    case 'twitch': return <SiTwitch {...iconProps} />;
    case 'threads': return <SiThreads {...iconProps} />;
  }

  // Fallback para Material Symbols se for um ícone genérico
  if (icon) {
    return (
      <span 
        className={cn("material-symbols-outlined", className)} 
        style={{ ...style, fontSize: 'inherit' }}
      >
        {icon}
      </span>
    );
  }

  // Ícone padrão de link se nada for fornecido
  return <span className={cn("material-symbols-outlined", className)} style={style}>link</span>;
}
