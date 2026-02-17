'use client';
import { cn } from '@/lib/utils';
import type { CardData } from '@/lib/types';
import PhoneMockup from './phone-mockup';

type CanvasAreaProps = {
  viewMode: 'digital' | 'print';
  setViewMode: (mode: 'digital' | 'print') => void;
  cardData: CardData;
};

export default function CanvasArea({ viewMode, setViewMode, cardData }: CanvasAreaProps) {
  return (
    <main className="relative flex-1 overflow-auto bg-background p-8 flex flex-col items-center">
      <div className="mb-10 flex h-12 w-80 shrink-0 items-center justify-between rounded-xl bg-white p-1.5 shadow-sm border border-slate-200">
        <button
          onClick={() => setViewMode('digital')}
          className={cn(
            'flex h-full flex-1 items-center justify-center gap-2 rounded-lg text-sm font-semibold transition-all',
            viewMode === 'digital'
              ? 'bg-primary text-white'
              : 'bg-white text-slate-500 hover:text-slate-700'
          )}
        >
          <span className="material-symbols-outlined text-lg">smartphone</span>
          Digital
        </button>
        <button
          onClick={() => setViewMode('print')}
          className={cn(
            'flex h-full flex-1 items-center justify-center gap-2 rounded-lg text-sm font-semibold transition-all',
            viewMode === 'print'
              ? 'bg-primary text-white'
              : 'bg-white text-slate-500 hover:text-slate-700'
          )}
        >
          <span className="material-symbols-outlined text-lg">
            picture_in_picture_alt
          </span>
          Impressão
        </button>
      </div>
      
      {viewMode === 'digital' ? (
        <PhoneMockup cardData={cardData} />
      ) : (
        <div className="flex flex-col items-center">
            <p className="text-center text-muted-foreground mb-4">A visualização de impressão será implementada em breve.</p>
             <div className="relative w-[600px] h-[350px] flex items-center justify-center shrink-0">
                <div className="relative h-full w-full bg-white shadow-2xl overflow-hidden flex flex-row border border-slate-200">
                    <div className="w-full h-full flex items-center justify-center">
                        <p className="text-muted-foreground">Preview de Impressão</p>
                    </div>
                </div>
            </div>
        </div>
      )}

      <div className="mt-8 flex items-center gap-2 text-slate-400">
        <span className="material-symbols-outlined text-sm">info</span>
        <span className="text-xs">
          O modo de visualização digital é interativo.
        </span>
      </div>
    </main>
  );
}
