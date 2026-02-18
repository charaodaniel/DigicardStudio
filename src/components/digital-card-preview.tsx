
'use client';
import type { CardData } from '@/lib/types';
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
  const PreviewComponent = () => {
    // Tratamento dinâmico para variações horizontais/verticais selecionarem o template base correto
    const baseTemplate = cardData.template.split('-')[0];

    switch (baseTemplate) {
      case 'professionals':
        return <ProfessionalsPreview cardData={cardData} />;
      case 'linkedin':
        return <LinkedinPreview cardData={cardData} />;
      case 'instagram':
        return <InstagramPreview cardData={cardData} />;
      case 'whatsapp':
        return <WhatsappPreview cardData={cardData} />;
      case 'designer':
        return <DesignerStudioPreview cardData={cardData} />;
      case 'executive':
        return <ExecutivePreview cardData={cardData} />;
      case 'facebook':
        return <FacebookPreview cardData={cardData} />;
      case 'spotify':
        return <SpotifyPreview cardData={cardData} />;
      case 'youtube':
        return <YoutubePreview cardData={cardData} />;
      case 'tiktok':
        return <TiktokPreview cardData={cardData} />;
      case 'twitch':
        return <TiktokPreview cardData={cardData} />; // Reutiliza TikTok como base gamer se não houver um específico
      case 'digicard':
        return <DigicardWebPreview cardData={cardData} />;
      case 'discord':
        return <DiscordPreview cardData={cardData} />;
      default:
        return <DefaultPreview cardData={cardData} />;
    }
  };
  return (
    <div
      style={{ fontFamily: `'${cardData.fontFamily}', sans-serif` }}
      className="h-full w-full"
    >
      <PreviewComponent />
    </div>
  );
}
