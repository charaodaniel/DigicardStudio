
'use client';
import type { CardData } from '@/lib/types';
import { cn } from '@/lib/utils';
import { templates } from './template-library';

type PhysicalCardPreviewProps = {
  cardData: CardData;
  setActiveTool: (toolId: string) => void;
};

export default function PhysicalCardPreview({ cardData, setActiveTool }: PhysicalCardPreviewProps) {
  const { template, themeColor, fullName, jobTitle, avatarUrl, links, qrCodeUrl, customWebsiteUrl, footerText, stats, bannerUrl } = cardData;

  const currentTemplate = templates.find(t => t.id === template);
  const isVertical = currentTemplate?.orientation === 'vertical';

  // Renderizador de Faces de acordo com o Template
  const RenderFront = () => {
    switch (template) {
      case 'executive':
        return (
          <div className="flex-1 bg-[#0a0a0b] flex flex-col justify-between p-12 relative overflow-hidden text-white">
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 20% 20%, #D4AF37 0%, transparent 40%)' }}></div>
            <div className="flex justify-between items-start z-10">
              <div onClick={() => setActiveTool('conteudo')} className="h-12 w-12 border-2 border-[#D4AF37] rounded-full flex items-center justify-center cursor-pointer">
                <span className="font-serif text-2xl" style={{background: 'linear-gradient(135deg, #D4AF37 0%, #F5E0A3 50%, #D4AF37 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'}}>
                  {fullName.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
                </span>
              </div>
              <div className="text-right">
                <p className="text-[10px] uppercase tracking-[0.3em] text-[#D4AF37]/60 font-bold">Executive Elite</p>
              </div>
            </div>
            <div className="z-10" onClick={() => setActiveTool('conteudo')}>
              <h1 className="font-serif text-5xl tracking-tight mb-2" style={{background: 'linear-gradient(135deg, #D4AF37 0%, #F5E0A3 50%, #D4AF37 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'}}>{fullName}</h1>
              <p className="text-[#D4AF37]/80 uppercase tracking-[0.4em] text-xs font-medium border-t border-[#D4AF37]/20 pt-4 inline-block">{jobTitle}</p>
            </div>
            <div className="flex justify-between items-end z-10" onClick={() => setActiveTool('social')}>
                <div className="space-y-1 text-[10px] text-[#D4AF37]/60 tracking-wider">
                    {links.slice(0, 2).map(l => (
                        <div key={l.id} className="flex items-center gap-2">
                            <span className="material-symbols-outlined text-xs">{l.icon}</span>
                            {l.value}
                        </div>
                    ))}
                </div>
                <div className="text-[10px] text-[#D4AF37]/60 tracking-widest uppercase">
                    {customWebsiteUrl || 'São Paulo | Brasil'}
                </div>
            </div>
          </div>
        );

      case 'spotify':
      case 'spotify-v':
        return (
          <div className={cn(
            "flex-1 bg-[#121212] flex p-8 text-white relative overflow-hidden",
            isVertical ? "flex-col items-center justify-between" : "flex-row items-center gap-8"
          )}>
            <div className="absolute top-6 right-8 text-[8px] font-bold tracking-[0.2em] opacity-40 uppercase">DigiCard Web</div>
            <div onClick={() => setActiveTool('imagens')} className={cn(
              "relative group cursor-pointer shrink-0",
              isVertical ? "w-48 h-48 mb-6" : "w-40 h-40"
            )}>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10 rounded-lg"></div>
              <img src={avatarUrl} className="w-full h-full object-cover rounded-lg border border-white/10" alt="Spotify Profile" />
              <div className="absolute bottom-3 left-3 z-20">
                <div className="size-8 bg-[#1DB954] rounded-full flex items-center justify-center shadow-lg">
                  <span className="material-symbols-outlined text-white text-lg fill-1" style={{fontVariationSettings: "'FILL' 1"}}>play_arrow</span>
                </div>
              </div>
            </div>
            <div className={cn("flex-1", isVertical ? "text-center w-full" : "text-left")}>
              <h2 className="text-3xl font-black uppercase tracking-tight mb-1">{fullName}</h2>
              <p className="text-[#1DB954] text-xs font-bold tracking-widest uppercase mb-6">Verified Artist</p>
              
              <div className="w-full h-1 bg-white/10 rounded-full mb-4 relative overflow-hidden">
                <div className="absolute top-0 left-0 h-full bg-[#1DB954] w-[45%]"></div>
              </div>
              
              <div className="flex items-center justify-center gap-6 opacity-60">
                <span className="material-symbols-outlined text-sm">shuffle</span>
                <span className="material-symbols-outlined text-2xl">skip_previous</span>
                <span className="material-symbols-outlined text-3xl">play_circle</span>
                <span className="material-symbols-outlined text-2xl">skip_next</span>
                <span className="material-symbols-outlined text-sm">repeat</span>
              </div>
            </div>
          </div>
        );

      case 'facebook':
      case 'facebook-v':
        return (
          <div className="flex-1 bg-white flex flex-col relative overflow-hidden">
            <div className="h-1/3 w-full bg-[#1877F2] relative">
              <div className="absolute top-4 left-6 flex items-center gap-2">
                <svg className="w-6 h-6 text-white fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"></path>
                </svg>
                <div className="h-4 w-32 bg-white/20 rounded-full"></div>
              </div>
            </div>
            <div className={cn(
              "px-10 flex-1 flex relative z-10",
              isVertical ? "flex-col items-center -mt-12" : "flex-row items-end gap-6 -mt-12 pb-10"
            )}>
              <div onClick={() => setActiveTool('imagens')} className="size-28 rounded-full border-4 border-white bg-slate-200 overflow-hidden shadow-sm shrink-0">
                <img src={avatarUrl} className="w-full h-full object-cover" alt="FB" />
              </div>
              <div className={cn("flex-1", isVertical ? "text-center mt-4" : "text-left mb-2")}>
                <h2 className="text-2xl font-bold text-slate-900 leading-tight">{fullName}</h2>
                <p className="text-[#1877F2] font-semibold text-sm">{jobTitle}</p>
                {!isVertical && (
                  <div className="flex gap-2 mt-4">
                    <div className="bg-[#1877F2] text-white px-4 py-1.5 rounded-lg text-[10px] font-bold">Seguir</div>
                    <div className="bg-slate-100 text-slate-900 px-4 py-1.5 rounded-lg text-[10px] font-bold">Mensagem</div>
                  </div>
                )}
              </div>
            </div>
            <div className="h-1.5 bg-[#1877F2] w-full mt-auto"></div>
          </div>
        );

      case 'youtube':
      case 'youtube-v':
        return (
          <div className={cn(
            "flex-1 bg-[#FF0000] flex flex-col p-12 text-white relative overflow-hidden",
            isVertical ? "items-center text-center justify-center" : "justify-between"
          )}>
            <div className="absolute inset-4 border border-dashed border-white/20 pointer-events-none rounded"></div>
            <div className={cn("flex items-center gap-6 z-10", isVertical ? "flex-col" : "flex-row")}>
              <div onClick={() => setActiveTool('imagens')} className="w-28 h-28 rounded-full border-4 border-white overflow-hidden shadow-2xl bg-white shrink-0 cursor-pointer">
                <img src={avatarUrl} className="w-full h-full object-cover" alt="YT" />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h2 className="text-3xl font-black uppercase tracking-tighter leading-none">{fullName}</h2>
                  <span className="material-symbols-outlined !text-xl fill-1" style={{fontVariationSettings: "'FILL' 1"}}>verified</span>
                </div>
                <div className="bg-black/20 backdrop-blur-md px-4 py-1 rounded-full inline-block">
                  <p className="text-xs font-bold tracking-wide uppercase">{stats[0]?.value || '1.2M'} INSCRITOS</p>
                </div>
              </div>
            </div>
            <div className={cn(
              "z-10 flex items-center gap-2 opacity-40 uppercase tracking-[0.4em] text-[8px] font-black",
              isVertical ? "mt-12" : "absolute bottom-10 right-12"
            )}>
              <span className="material-symbols-outlined !text-2xl">play_circle</span>
              YouTube CHANNEL
            </div>
          </div>
        );

      case 'professionals':
        return (
          <div className={cn(
            "flex-1 bg-white flex p-12 relative overflow-hidden",
            isVertical ? "flex-col items-center text-center justify-center" : "flex-col justify-center"
          )}>
            <div className={cn("mb-12", isVertical ? "mx-auto" : "")}>
              <div className="w-12 h-12 border-t-2 border-l-2 border-slate-900 relative">
                <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-slate-300"></div>
              </div>
            </div>
            <div onClick={() => setActiveTool('conteudo')}>
              <h2 className="font-serif text-5xl tracking-tight text-slate-900 leading-none mb-4">{fullName}</h2>
              <p className="text-[10px] uppercase tracking-[0.4em] text-slate-500 font-light">{jobTitle}</p>
            </div>
            <div className="mt-12 flex items-center gap-4">
              <div className="h-[1px] w-12 bg-slate-200"></div>
              <span className="text-[9px] text-slate-300 tracking-[0.3em] uppercase">CAU/CREA CERTIFIED</span>
              <div className="h-[1px] w-12 bg-slate-200"></div>
            </div>
          </div>
        );

      default:
        // Layout Padrão Genérico (Fallback)
        return (
          <div className={cn(
            "flex-1 flex p-12 relative",
            isVertical ? "flex-col items-center text-center justify-between" : "flex-col justify-between"
          )}>
            <div className={cn("flex items-start", isVertical ? "flex-col items-center" : "justify-between")}>
              <div onClick={() => setActiveTool('conteudo')} className="space-y-3 cursor-pointer hover:bg-primary/5 p-2 rounded-xl transition-colors">
                <div className="flex items-center gap-4">
                  <div className={cn("rounded-full", isVertical ? "h-1.5 w-16 mb-4" : "h-16 w-1.5")} style={{ backgroundColor: themeColor }}></div>
                  <div>
                    <h2 className={cn("font-black text-slate-900 tracking-tight", isVertical ? "text-4xl" : "text-5xl")}>{fullName}</h2>
                    <p className="text-base font-bold uppercase tracking-[0.3em] mt-1" style={{ color: themeColor }}>{jobTitle}</p>
                  </div>
                </div>
              </div>
              <div onClick={() => setActiveTool('imagens')} className={cn("rounded-full border-4 border-slate-50 shadow-xl overflow-hidden bg-slate-100 cursor-pointer transition-transform hover:scale-105", isVertical ? "size-40 mt-8" : "size-32")}>
                <img src={avatarUrl} className="w-full h-full object-cover" alt="Avatar" />
              </div>
            </div>
            <div onClick={() => setActiveTool('social')} className={cn("flex flex-wrap gap-x-8 gap-y-4 cursor-pointer p-6 rounded-2xl hover:bg-primary/5 mt-4", isVertical ? "justify-center" : "")}>
              {links.slice(0, 4).map(link => (
                <div key={link.id} className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-slate-50">
                    <span className="material-symbols-outlined text-2xl" style={{ color: link.color || themeColor }}>{link.icon}</span>
                  </div>
                  <span className="text-xs font-bold text-slate-600 truncate max-w-[150px]">{link.value}</span>
                </div>
              ))}
            </div>
            <div onClick={() => setActiveTool('conteudo')} className={cn("flex justify-between items-end border-t border-slate-100 pt-8", isVertical ? "w-full" : "")}>
              <div className="space-y-2">
                <div className="flex items-center gap-3 text-slate-500">
                  <span className="material-symbols-outlined text-xl">language</span>
                  <span className="text-xs font-bold">{customWebsiteUrl || `www.digicard.studio/${fullName.toLowerCase().replace(/\s/g, '')}`}</span>
                </div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">{footerText || "DESIGNED WITH DIGICARD STUDIO © 2024"}</p>
              </div>
              <span className="text-[8px] font-black text-slate-300 uppercase tracking-[0.4em]">Face Principal</span>
            </div>
            <div className={cn("absolute bg-primary opacity-80", isVertical ? "bottom-0 left-0 w-full h-2" : "bottom-0 left-0 w-full h-2")} style={{ backgroundColor: themeColor }}></div>
          </div>
        );
    }
  };

  const RenderBack = () => {
    // Estilos comuns para o verso
    const isDark = ['executive', 'instagram', 'instagram-v', 'youtube', 'youtube-v', 'twitch-h', 'twitch-v', 'spotify', 'spotify-v'].includes(template);
    const bgColor = isDark ? (template === 'executive' ? '#0a0a0b' : (template.includes('twitch') ? '#0d0d17' : (template.includes('spotify') ? '#191414' : (template.includes('youtube') ? '#1a1a1a' : themeColor)))) : '#ffffff';
    const textColor = isDark ? '#ffffff' : '#1e293b';

    return (
      <div className="flex-1 flex flex-col items-center justify-center p-12 relative" style={{ backgroundColor: bgColor }}>
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: `radial-gradient(${textColor} 1px, transparent 1px)`, backgroundSize: '32px 32px' }}></div>
        
        <div 
          className="relative z-10 flex flex-col items-center gap-8 cursor-pointer hover:scale-105 transition-transform group/edit"
          onClick={() => setActiveTool('qrcode')}
        >
          {template === 'executive' && (
            <div className="absolute -inset-8 border-2 border-[#D4AF37]/30 rounded-[3rem] pointer-events-none">
              <div className="absolute -top-1 -left-1 size-6 border-t-2 border-l-2 border-[#D4AF37]"></div>
              <div className="absolute -top-1 -right-1 size-6 border-t-2 border-r-2 border-[#D4AF37]"></div>
              <div className="absolute -bottom-1 -left-1 size-6 border-b-2 border-l-2 border-[#D4AF37]"></div>
              <div className="absolute -bottom-1 -right-1 size-6 border-b-2 border-r-2 border-[#D4AF37]"></div>
            </div>
          )}

          <div className={cn(
            "p-8 rounded-[3rem] shadow-2xl scale-110 relative",
            template === 'executive' ? "bg-white/5 border border-white/10" : "bg-white"
          )}>
            {qrCodeUrl ? (
              <img src={qrCodeUrl} className={cn("size-48", template === 'executive' ? "invert brightness-200" : "")} alt="QR Code Large" />
            ) : (
              <div className="size-48 flex items-center justify-center bg-slate-100 rounded-xl">
                <span className="material-symbols-outlined text-6xl text-slate-300">qr_code_2</span>
              </div>
            )}
          </div>
          <div className="text-center space-y-2">
            <h3 className="text-3xl font-black tracking-tighter uppercase" style={{ color: textColor }}>{fullName}</h3>
            <p className="text-xs font-bold tracking-[0.4em] uppercase opacity-60" style={{ color: textColor }}>Escaneie para salvar contato</p>
          </div>
        </div>

        <div className="absolute bottom-12 flex items-center gap-3 opacity-40" style={{ color: textColor }}>
          <span className="material-symbols-outlined text-lg">style</span>
          <span className="text-[10px] font-bold tracking-[0.5em] uppercase">DigiCard Studio Premium</span>
        </div>
      </div>
    );
  };

  const CardFace = ({ side }: { side: 'front' | 'back' }) => (
    <div className="relative group/face">
      {/* Guias de Corte */}
      <div className="absolute -top-10 -left-10 w-16 h-[1px] bg-slate-400"></div>
      <div className="absolute -top-10 -left-10 w-[1px] h-16 bg-slate-400"></div>
      <div className="absolute -top-10 -right-10 w-16 h-[1px] bg-slate-400"></div>
      <div className="absolute -top-10 -right-10 w-[1px] h-16 bg-slate-400"></div>
      <div className="absolute -bottom-10 -left-10 w-16 h-[1px] bg-slate-400"></div>
      <div className="absolute -bottom-10 -left-10 w-[1px] h-16 bg-slate-400"></div>
      <div className="absolute -bottom-10 -right-10 w-16 h-[1px] bg-slate-400"></div>
      <div className="absolute -bottom-10 -right-10 w-[1px] h-16 bg-slate-400"></div>

      {/* Card Container (com Bleed de 20px) */}
      <div 
        className={cn(
            "relative bg-white shadow-2xl overflow-hidden border border-red-200/50 rounded-sm cursor-default",
            isVertical ? "w-[490px] h-[840px]" : "w-[840px] h-[490px]"
        )}
      >
        <div className="absolute inset-0 border-4 border-dashed border-red-400/30 pointer-events-none z-50"></div>
        <div className="absolute inset-[20px] bg-white border border-slate-100 flex overflow-hidden">
          <div className="absolute inset-6 border border-dashed border-primary/20 pointer-events-none z-50 rounded"></div>
          {side === 'front' ? <RenderFront /> : <RenderBack />}
        </div>
      </div>
      <p className="text-center mt-6 text-xs font-bold text-slate-400 uppercase tracking-[0.3em]">
        {side === 'front' ? 'Face Principal (Anverso)' : 'Face de Conversão (Reverso)'}
      </p>
    </div>
  );

  return (
    <div className="flex flex-col items-center gap-12">
      <div className="bg-primary/5 border border-primary/20 p-6 rounded-2xl max-w-[800px] text-center shadow-sm">
        <h4 className="text-base font-bold text-primary flex items-center justify-center gap-2 mb-2">
          <span className="material-symbols-outlined text-2xl">print</span>
          Gabarito Técnico Interativo — Modelo {currentTemplate?.name}
        </h4>
        <p className="text-xs text-slate-500 leading-relaxed uppercase tracking-widest font-medium">
          Formato {isVertical ? 'Vertical' : 'Horizontal'} <strong>90x50mm</strong> com sangria industrial e margens de segurança para CMYK.
        </p>
      </div>

      <div className={cn(
          "flex items-start justify-center gap-20",
          isVertical ? "flex-row" : "flex-col"
      )}>
        <CardFace side="front" />
        <CardFace side="back" />
      </div>
    </div>
  );
}
