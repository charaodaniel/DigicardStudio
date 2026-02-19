
'use client';
import type { CardData } from '@/lib/types';
import { cn } from '@/lib/utils';
import { templates } from './template-library';
import React from 'react';
import SocialIcon from '@/components/social-icon';

type PhysicalCardPreviewProps = {
  cardData: CardData;
  setActiveTool: (toolId: string) => void;
  setSelectedLinkId: (id: string | null) => void;
};

export default function PhysicalCardPreview({ cardData, setActiveTool, setSelectedLinkId }: PhysicalCardPreviewProps) {
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
  const globalStyle = {
    fontFamily: `'${fontFamily}', sans-serif`,
  };

  const RenderFrontContent = () => {
    const baseTemplate = template.split('-')[0];
    
    // Spotify Layout
    if (baseTemplate === 'spotify') {
      return (
        <div 
          className={cn(
            "flex-1 flex p-6 relative overflow-hidden h-full",
            isVertical ? "flex-col items-center" : "flex-row items-start gap-4"
          )} 
          style={{ ...globalStyle, backgroundColor: physicalBackgroundColor, color: textColor }}
        >
          <div className="absolute top-4 right-4 text-[6px] font-bold tracking-[0.2em] opacity-40 uppercase">DigiCard Music</div>
          <div 
            className={cn("shrink-0 cursor-pointer hover:ring-2 hover:ring-primary rounded transition-all", isVertical ? "w-full mb-4" : "w-32")}
            onClick={() => setActiveTool('imagens')}
          >
            {physicalShowAvatar && <img src={avatarUrl} className="w-full aspect-square object-cover rounded shadow-lg" />}
          </div>
          <div className="flex-1 flex flex-col justify-center">
            {physicalShowTitle && (
              <div className="mb-2 cursor-pointer hover:opacity-70 transition-opacity" onClick={() => setActiveTool('conteudo')}>
                <h2 className="text-sm font-black uppercase tracking-tight" style={{ fontSize: `${baseFontSize * 0.8}px` }}>{fullName}</h2>
                <p className="text-[#1DB954] text-[8px] font-bold uppercase">{jobTitle || 'Artista'}</p>
              </div>
            )}
            {physicalShowLinks && (
              <div className="space-y-1">
                {links.slice(0, 3).map((l, i) => (
                  <div 
                    key={l.id} 
                    onClick={() => { setSelectedLinkId(l.id); setActiveTool('social'); }}
                    className="flex items-center gap-2 text-[8px] border-b border-black/5 dark:border-white/5 py-0.5 cursor-pointer hover:bg-black/5 rounded px-1 transition-colors"
                  >
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
      <div 
        className={cn(
          "flex-1 flex p-8 relative overflow-hidden h-full",
          isVertical ? "flex-col items-center text-center" : "flex-row items-center justify-between gap-6"
        )} 
        style={{ ...globalStyle, backgroundColor: physicalBackgroundColor, color: textColor }}
      >
        <div className="flex flex-col flex-1">
          {physicalShowTitle && (
            <div 
              className="mb-4 cursor-pointer hover:bg-black/5 dark:hover:bg-white/5 p-1 rounded transition-colors" 
              onClick={() => setActiveTool('conteudo')}
            >
              <h2 className="text-xl font-black tracking-tight" style={{ fontSize: `${baseFontSize * 1.2}px` }}>{fullName}</h2>
              <p className="text-xs font-bold uppercase tracking-widest opacity-60" style={{ color: themeColor }}>{jobTitle}</p>
            </div>
          )}
          
          {physicalShowStats && stats.length > 0 && (
            <div 
              className="flex gap-4 mb-4 cursor-pointer hover:bg-black/5 rounded p-1 transition-colors"
              onClick={() => setActiveTool('conteudo')}
            >
              {stats.slice(0, 3).map((s, i) => (
                <div key={i} className="text-left">
                  <p className="text-[10px] font-black leading-none">{s.value}</p>
                  <p className="text-[6px] uppercase font-bold opacity-40">{s.label}</p>
                </div>
              ))}
            </div>
          )}

          {physicalShowLinks && (
            <div className="space-y-2">
              {links.slice(0, 3).map(l => (
                <div 
                  key={l.id} 
                  onClick={() => { setSelectedLinkId(l.id); setActiveTool('social'); }}
                  className="flex items-center gap-2 text-[10px] cursor-pointer hover:bg-black/5 rounded p-1 transition-colors" 
                  style={{ fontSize: `${baseFontSize * 0.6}px` }}
                >
                  <SocialIcon 
                    type={l.type} 
                    icon={l.icon} 
                    className="text-xs" 
                    style={{ color: l.color || themeColor, fontSize: '1.2em' }} 
                  />
                  <span className="font-medium truncate">{l.value}</span>
                </div>
              ))}
            </div>
          )}
        </div>
        {physicalShowAvatar && (
          <div 
            onClick={() => setActiveTool('imagens')}
            className={cn("rounded-full overflow-hidden border-2 border-white shadow-xl bg-slate-100 cursor-pointer hover:scale-105 transition-transform", isVertical ? "size-24" : "size-32")}
          >
            <img src={avatarUrl} className="w-full h-full object-cover" />
          </div>
        )}
        {physicalShowFooter && (
          <div 
            onClick={() => setActiveTool('fisico')}
            className="absolute bottom-4 left-8 right-8 flex justify-between items-center opacity-40 text-[7px] font-bold uppercase tracking-widest cursor-pointer hover:opacity-100 transition-opacity"
          >
            <span>{customWebsiteUrl || 'digicard.studio'}</span>
            <span>{footerText || 'PRODUCED BY DIGICARD'}</span>
          </div>
        )}
      </div>
    );
  };

  const RenderBackContent = () => (
    <div 
      className="flex-1 flex flex-col items-center justify-center p-8 relative h-full" 
      style={{ ...globalStyle, backgroundColor: physicalBackgroundColor }}
    >
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: `radial-gradient(${textColor} 1px, transparent 1px)`, backgroundSize: '24px 24px' }}></div>
      {physicalShowQR && (
        <div 
          className="flex flex-col items-center gap-4 cursor-pointer group"
          onClick={() => setActiveTool('qrcode')}
        >
          <div className="p-4 bg-white rounded-3xl shadow-xl border border-slate-100 group-hover:border-primary transition-colors">
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
      <div className="flex flex-col items-center gap-12 print:hidden">
        <div className="bg-primary/5 border border-primary/20 p-6 rounded-2xl max-w-[800px] text-center shadow-sm">
          <h4 className="text-base font-bold text-primary flex items-center justify-center gap-2 mb-2">
            <span className="material-symbols-outlined text-2xl">print</span>
            Gabarito Técnico "Aberto" (A4)
          </h4>
          <p className="text-[10px] text-slate-500 leading-relaxed uppercase tracking-widest font-medium">
            O PDF será gerado com frentes e versos organizados com espaçamento (gap) para facilitar o corte. Use a ferramenta "Impressão" na lateral para personalizar.
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

      <div className="hidden print:block">
        <div className="print-layout-a4">
          {[...Array(5)].map((_, i) => (
            <React.Fragment key={`pair-${i}`}>
              <div className="print-card-item">
                <div className="w-full h-full flex" style={{ width: '85mm', height: '55mm' }}>
                  <RenderFrontContent />
                </div>
              </div>
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
