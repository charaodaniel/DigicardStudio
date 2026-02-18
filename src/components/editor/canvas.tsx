
'use client';

import { useState } from 'react';
import type { CardData } from '@/lib/types';
import type { Dispatch, SetStateAction } from 'react';
import EditableCardPreview from './editable-card-preview';
import PhysicalCardPreview from './physical-card-preview';

type CanvasProps = {
  cardData: CardData;
  selectedLinkId: string | null;
  setSelectedLinkId: Dispatch<SetStateAction<string | null>>;
  setActiveTool: (toolId: string) => void;
  mode: 'digital' | 'physical';
};

export default function Canvas({ cardData, selectedLinkId, setSelectedLinkId, setActiveTool, mode }: CanvasProps) {
  const [zoom, setZoom] = useState(85);

  const handleZoomIn = () => setZoom(prev => Math.min(prev + 5, 150));
  const handleZoomOut = () => setZoom(prev => Math.max(prev - 5, 50));

  return (
    <section className="flex-1 bg-background-light dark:bg-background-dark relative flex items-center justify-center p-8 overflow-auto no-scrollbar">
      {/* Controles de Zoom */}
      <div className="absolute top-6 left-6 flex items-center gap-4 bg-white dark:bg-slate-900 px-3 py-2 rounded-lg shadow-sm border border-slate-200 dark:border-slate-800 z-20">
        <button 
          onClick={handleZoomOut}
          className="material-symbols-outlined text-slate-400 hover:text-slate-600 transition-colors"
        >
          remove
        </button>
        <span className="text-xs font-bold w-12 text-center">{zoom}%</span>
        <button 
          onClick={handleZoomIn}
          className="material-symbols-outlined text-slate-400 hover:text-slate-600 transition-colors"
        >
          add
        </button>
      </div>

      {mode === 'digital' ? (
        /* Digital Mode: Smartphone Mockup */
        <div 
          className="shadow-[0_0_0_12px_#1f2937,0_0_0_14px_#374151,0_20px_50px_rgba(0,0,0,0.1)] w-[360px] h-[720px] bg-white dark:bg-slate-900 rounded-[3rem] relative overflow-hidden flex flex-col transition-transform duration-200 ease-out shrink-0"
          style={{ transform: `scale(${zoom / 100})` }}
        >
          {/* Status Bar Mockup */}
          <div className="h-10 w-full flex items-center justify-between px-8 pt-4 shrink-0 z-20 bg-inherit">
            <span className="text-[10px] font-bold text-slate-900 dark:text-slate-100">9:41</span>
            <div className="flex items-center gap-1.5 text-slate-900 dark:text-slate-100">
              <span className="material-symbols-outlined text-[14px]">signal_cellular_4_bar</span>
              <span className="material-symbols-outlined text-[14px]">wifi</span>
              <span className="material-symbols-outlined text-[14px]">battery_very_low</span>
            </div>
          </div>

          {/* Digital Card Content area */}
          <div className="flex-1 relative overflow-hidden">
              <EditableCardPreview 
                  cardData={cardData} 
                  selectedLinkId={selectedLinkId} 
                  setSelectedLinkId={setSelectedLinkId}
                  setActiveTool={setActiveTool}
              />
          </div>
          
          {/* Home Indicator */}
          <div className="h-1.5 w-32 bg-slate-300 dark:bg-slate-700 rounded-full mx-auto mb-4 shrink-0 z-20"></div>
        </div>
      ) : (
        /* Physical Mode: Print Mockup */
        <div 
          className="relative transition-transform duration-200 ease-out flex items-center justify-center shrink-0"
          style={{ transform: `scale(${zoom / 100})` }}
        >
          <PhysicalCardPreview cardData={cardData} />
        </div>
      )}
    </section>
  );
}
