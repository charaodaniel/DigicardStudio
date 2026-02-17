'use client';
import type { CardData } from '@/lib/types';
import DigitalCardPreview from './digital-card-preview';

type PhoneMockupProps = {
  cardData: CardData;
};

export default function PhoneMockup({ cardData }: PhoneMockupProps) {
  return (
    <div className="relative h-[680px] w-[340px] shrink-0 rounded-[3rem] border-[6px] border-slate-800 bg-slate-900 p-3 shadow-2xl">
      <div className="absolute left-1/2 top-0 z-20 h-6 w-32 -translate-x-1/2 rounded-b-2xl bg-slate-800"></div>
      <div className="h-full w-full overflow-hidden rounded-[2rem] bg-white">
        <DigitalCardPreview cardData={cardData} />
      </div>
    </div>
  );
}
