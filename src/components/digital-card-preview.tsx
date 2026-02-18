'use client';
import { useState, useEffect } from 'react';
import type { CardData } from '@/lib/types';
import ShareModal from './share-modal';
import DefaultPreview from './card-templates/DefaultPreview';
import ProfessionalsPreview from './card-templates/ProfessionalsPreview';
import LinkedinPreview from './card-templates/LinkedinPreview';
import InstagramPreview from './card-templates/InstagramPreview';
import WhatsappPreview from './card-templates/WhatsappPreview';
import DesignerStudioPreview from './card-templates/DesignerStudioPreview';
import ExecutivePreview from './card-templates/ExecutivePreview';
import FacebookPreview from './card-templates/FacebookPreview';
import SpotifyPreview from './card-templates/SpotifyPreview';
import YoutubePreview from './card-templates/YoutubePreview';
import TiktokPreview from './card-templates/TiktokPreview';
import DigicardWebPreview from './card-templates/DigicardWebPreview';
import DiscordPreview from './card-templates/DiscordPreview';

type DigitalCardPreviewProps = {
  cardData: CardData;
};

export default function DigitalCardPreview({
  cardData,
}: DigitalCardPreviewProps) {
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [currentUrl, setCurrentUrl] = useState('');

  useEffect(() => {
    setCurrentUrl(window.location.href);
  }, []);

  const handleShare = () => setIsShareModalOpen(true);

  const PreviewComponent = () => {
    // Tratamento dinâmico para variações horizontais/verticais selecionarem o template base correto
    const baseTemplate = cardData.template.split('-')[0];
    const props = { cardData, onShare: handleShare };

    switch (baseTemplate) {
      case 'professionals':
        return <ProfessionalsPreview {...props} />;
      case 'linkedin':
        return <LinkedinPreview {...props} />;
      case 'instagram':
        return <InstagramPreview {...props} />;
      case 'whatsapp':
        return <WhatsappPreview {...props} />;
      case 'designer':
        return <DesignerStudioPreview {...props} />;
      case 'executive':
        return <ExecutivePreview {...props} />;
      case 'facebook':
        return <FacebookPreview {...props} />;
      case 'spotify':
        return <SpotifyPreview {...props} />;
      case 'youtube':
        return <YoutubePreview {...props} />;
      case 'tiktok':
        return <TiktokPreview {...props} />;
      case 'twitch':
        return <TiktokPreview {...props} />; // Reutiliza TikTok como base gamer se não houver um específico
      case 'digicard':
        return <DigicardWebPreview {...props} />;
      case 'discord':
        return <DiscordPreview {...props} />;
      default:
        return <DefaultPreview {...props} />;
    }
  };

  return (
    <div
      style={{ 
        fontFamily: `'${cardData.fontFamily}', sans-serif`,
        fontSize: `${cardData.baseFontSize}px`
      }}
      className="h-full w-full"
    >
      <PreviewComponent />
      <ShareModal 
        isOpen={isShareModalOpen} 
        onOpenChange={setIsShareModalOpen} 
        url={currentUrl} 
        title={`Cartão Digital - ${cardData.fullName}`}
      />
    </div>
  );
}
