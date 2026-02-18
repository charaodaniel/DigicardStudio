'use client';
import type { CardData } from '@/lib/types';
import { cn } from '@/lib/utils';
import { templates } from './template-library';
import React from 'react';

type PhysicalCardPreviewProps = {
  cardData: CardData;
  setActiveTool: (toolId: string) => void;
};

export default function PhysicalCardPreview({ cardData, setActiveTool }: PhysicalCardPreviewProps) {
  const { 
    template, themeColor, fullName, jobTitle, bio, avatarUrl, links, qrCodeUrl, 
    customWebsiteUrl, footerText, stats, fontFamily, baseFontSize,
    physicalShowAvatar = true,
    physicalShowTitle = true,
    physicalShowStats = true,
    physicalShowLinks = true,
    physicalShowQR = true,
    physicalShowFooter = true,
    physicalBackgroundColor = '#ffffff'
  } = cardData;

  const currentTemplate = templates.find(t => t.id === template);
  const isVertical = currentTemplate?.orientation === 'vertical';

  const getContrastColor = (hexcolor: string) => {
    if (!hexcolor) return '#000000';
    const r = parseInt(hexcolor.slice(1, 3), 16);
    const g = parseInt(hexcolor.slice(3, 5), 16);
    const b = parseInt(hexcolor.slice(5, 7), 16);
    const yiq = (r * 299 + g * 587 + b * 114) / 1000;
    return yiq >= 128 ? '#000000' : '#ffffff';
  };

  const textColor = getContrastColor(physicalBackgroundColor);

  const RenderFrontContent = () => {
    const baseTemplate = template.split('-')[0];
    
    // Spotify Layout
    if (baseTemplate === 'spotify') {
      return (
        <div className={cn(
          "flex-1 flex p-6 relative overflow-hidden h-full",
          isVertical ? "flex-col items-center" : "flex-row items-start gap-4"
        )} style={{ backgroundColor: physicalBackgroundColor, color: textColor }}>
          <div className="absolute top-4 right-4 text-[6px] font-bold tracking-[0.2em] opacity-40 uppercase">DigiCard Music</div>
          <div className={cn("shrink-0", isVertical ? "w-full mb-4" : "w-32")}>
            {physicalShowAvatar && <img src={avatarUrl} className="w-full aspect-square object-cover rounded shadow-lg" />}
          </div>
          <div className="flex-1 flex flex-col justify-center">
            {physicalShowTitle && (
              <div className="mb-2">
                <h2 className="text-sm font-black uppercase tracking-tight">{fullName}</h2>
                <p className="text-[#1DB954] text-[8px] font-bold uppercase">{jobTitle || 'Artista'}</p>
              </div>
            )}
            {physicalShowLinks && (
              <div className="space-y-1">
                {links.slice(0, 3).map((l, i) => (
                  <div key={l.id} className="flex items-center gap-2 text-[8px] border-b border-black/5 dark:border-white/5 py-0.5">
                    <span className="opacity-30">0{i+1}</span>
                    <span className="font-bold truncate">{l.value}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      );
    }

    // Default Layout
    return (
      <div className={cn(
        "flex-1 flex p-8 relative overflow-hidden h-full",
        isVertical ? "flex-col items-center text-center" : "flex-row items-center justify-between gap-6"
      )} style={{ backgroundColor: physicalBackgroundColor, color: textColor }}>
        <div className="flex flex-col flex-1">
          {physicalShowTitle && (
            <div className="mb-4">
              <h2 className="text-xl font-black tracking-tight">{fullName}</h2>
              <p className="text-xs font-bold uppercase tracking-widest opacity-60" style={{ color: themeColor }}>{jobTitle}</p>
            </div>
          )}
          {physicalShowLinks && (
            <div className="space-y-2">
              {links.slice(0, 3).map(l => (
                <div key={l.id} className="flex items-center gap-2 text-[10px]">
                  <span className="material-symbols-outlined text-xs" style={{ color: themeColor }}>{l.icon}</span>
                  <span className="font-medium truncate">{l.value}</span>
                </div>
              ))}
            </div>
          )}
        </div>
        {physicalShowAvatar && (
          <div className={cn("rounded-full overflow-hidden border-2 border-white shadow-xl bg-slate-100", isVertical ? "size-24" : "size-32")}>
            <img src={avatarUrl} className="w-full h-full object-cover" />
          </div>
        )}
        {physicalShowFooter && (
          <div className="absolute bottom-4 left-8 right-8 flex justify-between items-center opacity-40 text-[7px] font-bold uppercase tracking-widest">
            <span>{customWebsiteUrl || 'digicard.studio'}</span>
            <span>{footerText || 'PRODUCED BY DIGICARD'}</span>
          </div>
        )}
      </div>
    );
  };

  const RenderBackContent = () => (
    <div className="flex-1 flex flex-col items-center justify-center p-8 relative h-full" style={{ backgroundColor: physicalBackgroundColor }}>
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: `radial-gradient(${textColor} 1px, transparent 1px)`, backgroundSize: '24px 24px' }}></div>
      {physicalShowQR && (
        <div className="flex flex-col items-center gap-4">
          <div className="p-4 bg-white rounded-3xl shadow-xl border border-slate-100">
            {qrCodeUrl ? <img src={qrCodeUrl} className="size-32" /> : <div className="size-32 bg-slate-100 rounded flex items-center justify-center"><span className="material-symbols-outlined text-4xl text-slate-300">qr_code_2</span></div>}
          </div>
          <div className="text-center">
            <h3 className="text-sm font-black uppercase tracking-widest" style={{ color: textColor }}>{fullName}</h3>
            <p className="text-[7px] font-bold tracking-[0.3em] uppercase opacity-40" style={{ color: textColor }}>Scan to save contact</p>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <>
      {/* Editor Preview (On Screen Only) */}
      <div className="flex flex-col items-center gap-12 print:hidden">
        <div className="bg-primary/5 border border-primary/20 p-6 rounded-2xl max-w-[800px] text-center shadow-sm">
          <h4 className="text-base font-bold text-primary flex items-center justify-center gap-2 mb-2">
            <span className="material-symbols-outlined text-2xl">print</span>
            Gabarito Técnico "Aberto" (A4)
          </h4>
          <p className="text-[10px] text-slate-500 leading-relaxed uppercase tracking-widest font-medium">
            O PDF será gerado com frentes e versos organizados com espaçamento (gap) para facilitar o corte.
          </p>
        </div>

        <div className={cn("flex items-start justify-center gap-12", "flex-col")}>
          <div className="relative group/face">
            <div className={cn("relative bg-white shadow-2xl overflow-hidden rounded-sm", isVertical ? "w-[340px] h-[580px]" : "w-[580px] h-[340px]")}>
              <div className="absolute inset-0 flex overflow-hidden"><RenderFrontContent /></div>
            </div>
            <p className="text-center mt-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Frente (Anverso)</p>
          </div>

          <div className="relative group/face">
            <div className={cn("relative bg-white shadow-2xl overflow-hidden rounded-sm", isVertical ? "w-[340px] h-[580px]" : "w-[580px] h-[340px]")}>
              <div className="absolute inset-0 flex overflow-hidden"><RenderBackContent /></div>
            </div>
            <p className="text-center mt-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Verso (Reverso)</p>
          </div>
        </div>
      </div>

      {/* Print Layout (A4 Grid - 5 pares por página, Frente + Verso lado a lado com gap) */}
      <div className="hidden print:block">
        <div className="print-layout-a4">
          {[...Array(5)].map((_, i) => (
            <React.Fragment key={`pair-${i}`}>
              {/* Frente */}
              <div className="print-card-item">
                <div className="w-full h-full flex" style={{ width: '85mm', height: '55mm' }}>
                  <RenderFrontContent />
                </div>
              </div>
              {/* Verso */}
              <div className="print-card-item">
                <div className="w-full h-full flex" style={{ width: '85mm', height: '55mm' }}>
                  <RenderBackContent />
                </div>
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>
    </>
  );
}
