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

type DigitalCardPreviewProps = {
  cardData: CardData;
};

export default function DigitalCardPreview({
  cardData,
}: DigitalCardPreviewProps) {
  const PreviewComponent = () => {
    switch (cardData.template) {
      case 'professionals':
        return <ProfessionalsPreview cardData={cardData} />;
      case 'linkedin':
        return <LinkedinPreview cardData={cardData} />;
      case 'instagram':
        return <InstagramPreview cardData={cardData} />;
      case 'whatsapp':
        return <WhatsappPreview cardData={cardData} />;
      case 'designer-studio':
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
      case 'digicard-web':
        return <DigicardWebPreview cardData={cardData} />;
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
