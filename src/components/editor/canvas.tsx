'use client';

import type { CardData } from '@/lib/types';
import type { Dispatch, SetStateAction } from 'react';
import EditableCardPreview from './editable-card-preview';

type CanvasProps = {
  cardData: CardData;
  selectedLinkId: string | null;
  setSelectedLinkId: Dispatch<SetStateAction<string | null>>;
};

export default function Canvas({ cardData, selectedLinkId, setSelectedLinkId }: CanvasProps) {
  return (
    <section className="flex-1 bg-background-light dark:bg-background-dark relative flex items-center justify-center p-8 overflow-auto">
      <div className="absolute top-6 left-6 flex items-center gap-4 bg-white dark:bg-slate-900 px-3 py-2 rounded-lg shadow-sm border border-slate-200 dark:border-slate-800">
        <button className="material-symbols-outlined text-slate-400 hover:text-slate-600 transition-colors">remove</button>
        <span className="text-xs font-bold w-12 text-center">85%</span>
        <button className="material-symbols-outlined text-slate-400 hover:text-slate-600 transition-colors">add</button>
      </div>

      <div className="shadow-[0_0_0_12px_#1f2937,0_0_0_14px_#374151,0_20px_50px_rgba(0,0,0,0.1)] w-[360px] h-[720px] bg-white dark:bg-slate-900 rounded-[3rem] relative overflow-hidden flex flex-col">
        <div className="h-10 w-full flex items-center justify-between px-8 pt-4 shrink-0">
          <span className="text-[10px] font-bold text-slate-900 dark:text-slate-100">9:41</span>
          <div className="flex items-center gap-1.5 text-slate-900 dark:text-slate-100">
            <span className="material-symbols-outlined text-[14px]">signal_cellular_4_bar</span>
            <span className="material-symbols-outlined text-[14px]">wifi</span>
            <span className="material-symbols-outlined text-[14px]">battery_very_low</span>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto no-scrollbar pt-12 pb-8 px-6 flex flex-col items-center">
            <EditableCardPreview 
                cardData={cardData} 
                selectedLinkId={selectedLinkId} 
                setSelectedLinkId={setSelectedLinkId} 
            />
        </div>
        
        <div className="h-1.5 w-32 bg-slate-300 dark:bg-slate-700 rounded-full mx-auto mb-4 shrink-0"></div>
      </div>
    </section>
  );
}
