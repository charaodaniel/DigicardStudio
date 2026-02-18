'use client';
import type { CardData } from '@/lib/types';
import { cn } from '@/lib/utils';
import { templates } from './template-library';

type PhysicalCardPreviewProps = {
  cardData: CardData;
  setActiveTool: (toolId: string) => void;
};

export default function PhysicalCardPreview({ cardData, setActiveTool }: PhysicalCardPreviewProps) {
  const { 
    template, themeColor, fullName, jobTitle, avatarUrl, links, qrCodeUrl, 
    customWebsiteUrl, footerText, stats, 
    physicalShowAvatar = true,
    physicalShowTitle = true,
    physicalShowStats = true,
    physicalShowLinks = true,
    physicalShowQR = true,
    physicalShowFooter = true
  } = cardData;

  const currentTemplate = templates.find(t => t.id === template);
  const isVertical = currentTemplate?.orientation === 'vertical';

  const EmptySlot = ({ label, tool, className }: { label: string, tool: string, className?: string }) => (
    <div 
        onClick={(e) => { e.stopPropagation(); setActiveTool(tool); }}
        className={cn(
            "border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-xl flex flex-col items-center justify-center p-4 text-slate-300 group hover:border-primary/40 hover:bg-primary/5 transition-all cursor-pointer",
            className
        )}
    >
        <span className="material-symbols-outlined text-2xl mb-1 opacity-20 group-hover:opacity-100 group-hover:text-primary transition-all">add_circle</span>
        <span className="text-[8px] font-bold uppercase tracking-widest opacity-40 group-hover:opacity-100 group-hover:text-primary transition-all">{label}</span>
    </div>
  );

  const RenderFront = () => {
    switch (template) {
      case 'spotify':
      case 'spotify-v':
        return (
          <div className={cn(
            "flex-1 bg-[#121212] flex p-8 text-white relative overflow-hidden",
            isVertical ? "flex-col items-center" : "flex-row items-start gap-8"
          )}>
            <div className="absolute top-6 right-8 text-[8px] font-bold tracking-[0.2em] opacity-40 uppercase">DigiCard Music</div>
            
            {/* Player Cover / Avatar */}
            <div className={cn("shrink-0", isVertical ? "w-full mb-6" : "w-48")}>
                {physicalShowAvatar ? (
                    <div onClick={() => setActiveTool('imagens')} className="relative group cursor-pointer aspect-square w-full">
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10 rounded-lg"></div>
                        <img src={avatarUrl} className="w-full h-full object-cover rounded-lg border border-white/10" alt="Spotify Profile" />
                        <div className="absolute bottom-3 left-3 z-20">
                            <div className="size-8 bg-[#1DB954] rounded-full flex items-center justify-center shadow-lg">
                                <span className="material-symbols-outlined text-white text-lg" style={{fontVariationSettings: "'FILL' 1"}}>play_arrow</span>
                            </div>
                        </div>
                    </div>
                ) : <EmptySlot label="Capa do Álbum" tool="imagens" className="aspect-square w-full" />}
            </div>

            <div className={cn("flex-1 flex flex-col", isVertical ? "text-center w-full" : "text-left h-full")}>
              {/* Identity */}
              <div className="mb-6">
                {physicalShowTitle ? (
                    <div onClick={() => setActiveTool('conteudo')} className="cursor-pointer group/title">
                        <h2 className="text-2xl font-black uppercase tracking-tight mb-1 group-hover/title:text-[#1DB954] transition-colors">{fullName}</h2>
                        <p className="text-[#1DB954] text-[10px] font-bold tracking-widest uppercase">{jobTitle || 'Verified Artist'}</p>
                    </div>
                ) : <EmptySlot label="Título do Player" tool="conteudo" className="h-12 w-full" />}
              </div>
              
              {/* Playlist Section (Links) */}
              <div className="flex-1 space-y-2 mb-6">
                {physicalShowLinks ? (
                    <div onClick={() => setActiveTool('social')} className="cursor-pointer group/links space-y-1.5">
                        <p className="text-[8px] font-bold uppercase tracking-widest text-white/40 mb-2">Playlist de Contatos</p>
                        {links.slice(0, 3).map((l, i) => (
                            <div key={l.id} className="flex items-center gap-3 text-[10px] py-1 border-b border-white/5 group-hover/links:border-white/20 transition-colors">
                                <span className="text-white/30 font-mono">0{i+1}</span>
                                <span className="font-bold flex-1">{l.label}</span>
                                <span className="material-symbols-outlined text-xs text-white/40">{l.icon}</span>
                            </div>
                        ))}
                    </div>
                ) : <EmptySlot label="Adicionar Músicas (Links)" tool="social" className="h-20 w-full" />}
              </div>

              {/* Player Controls */}
              <div className="mt-auto">
                <div className="w-full h-1 bg-white/10 rounded-full mb-4 relative overflow-hidden">
                    <div className="absolute top-0 left-0 h-full bg-[#1DB954] w-[45%]"></div>
                </div>
                <div className="flex items-center justify-center gap-6 opacity-60">
                    <span className="material-symbols-outlined text-sm">shuffle</span>
                    <span className="material-symbols-outlined text-xl">skip_previous</span>
                    <span className="material-symbols-outlined text-2xl">play_circle</span>
                    <span className="material-symbols-outlined text-xl">skip_next</span>
                    <span className="material-symbols-outlined text-sm">repeat</span>
                </div>
              </div>
            </div>
          </div>
        );

      case 'youtube':
      case 'youtube-v':
        return (
          <div className="flex-1 bg-white flex flex-col relative overflow-hidden">
            <div className="h-2 w-full bg-[#FF0000]"></div>
            <div className={cn("flex-1 p-8 flex", isVertical ? "flex-col items-center gap-8" : "flex-row items-center justify-between")}>
                <div className={cn("flex flex-col", isVertical ? "items-center text-center" : "items-start")}>
                    {physicalShowAvatar ? (
                        <div onClick={() => setActiveTool('imagens')} className="size-32 rounded-full border-4 border-slate-50 shadow-xl overflow-hidden mb-6 cursor-pointer hover:scale-105 transition-transform">
                            <img src={avatarUrl} className="w-full h-full object-cover" alt="YT Profile" />
                        </div>
                    ) : <EmptySlot label="Foto do Canal" tool="imagens" className="size-32 rounded-full mb-6" />}

                    {physicalShowTitle ? (
                        <div onClick={() => setActiveTool('conteudo')} className="cursor-pointer group/title">
                            <h2 className="text-3xl font-black tracking-tighter text-slate-900 uppercase leading-none">{fullName}</h2>
                            <div className="flex items-center gap-2 mt-2">
                                <span className="material-symbols-outlined text-blue-500 fill-1 text-sm" style={{fontVariationSettings: "'FILL' 1"}}>verified</span>
                                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{jobTitle || 'YouTube Creator'}</span>
                            </div>
                        </div>
                    ) : <EmptySlot label="Identidade do Canal" tool="conteudo" className="h-16 w-full" />}
                </div>

                <div className={cn("flex flex-col gap-4", isVertical ? "w-full" : "w-64")}>
                    {physicalShowStats ? (
                        <div onClick={() => setActiveTool('conteudo')} className="bg-slate-50 p-4 rounded-xl border border-slate-100 cursor-pointer hover:bg-slate-100 transition-colors">
                            <p className="text-[8px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">Estatísticas Reais</p>
                            <div className="flex justify-between items-end">
                                <span className="text-2xl font-black text-[#FF0000]">{stats[0]?.value || '1.2M'}</span>
                                <span className="text-[10px] font-bold text-slate-600 mb-1">{stats[0]?.label || 'Inscritos'}</span>
                            </div>
                        </div>
                    ) : <EmptySlot label="Métricas" tool="conteudo" className="h-16 w-full" />}

                    {physicalShowLinks ? (
                        <div onClick={() => setActiveTool('social')} className="space-y-2 cursor-pointer">
                            <div className="w-full bg-[#FF0000] text-white py-3 rounded-full flex items-center justify-center gap-2 font-black text-[10px] uppercase tracking-widest shadow-lg shadow-red-200">
                                <span className="material-symbols-outlined text-sm" style={{fontVariationSettings: "'FILL' 1"}}>notifications_active</span>
                                Inscreva-se Agora
                            </div>
                        </div>
                    ) : <EmptySlot label="Botão de Ação" tool="social" className="h-12 w-full rounded-full" />}
                </div>
            </div>
            <div className="absolute bottom-4 left-0 right-0 flex justify-center opacity-20">
                <span className="text-[8px] font-black tracking-[0.5em] uppercase">Powered by YouTube Studio</span>
            </div>
          </div>
        );

      default:
        return (
          <div className={cn(
            "flex-1 bg-white flex p-12 relative overflow-hidden",
            isVertical ? "flex-col items-center text-center justify-between" : "flex-row items-center justify-between"
          )}>
            <div className={cn("flex-1 flex flex-col", isVertical ? "items-center" : "items-start")}>
                {physicalShowTitle ? (
                    <div onClick={() => setActiveTool('conteudo')} className="space-y-3 cursor-pointer hover:bg-primary/5 p-4 rounded-xl transition-colors group/title">
                        <div className="flex items-center gap-4">
                            <div className="rounded-full h-16 w-1.5" style={{ backgroundColor: themeColor }}></div>
                            <div className={isVertical ? "text-center" : "text-left"}>
                                <h2 className="font-black text-slate-900 tracking-tight text-4xl">{fullName}</h2>
                                <p className="text-base font-bold uppercase tracking-[0.3em] mt-1" style={{ color: themeColor }}>{jobTitle}</p>
                            </div>
                        </div>
                    </div>
                ) : <EmptySlot label="Identidade Visual" tool="conteudo" className="h-24 w-full mb-8" />}

                {physicalShowLinks && (
                    <div onClick={() => setActiveTool('social')} className="flex flex-wrap gap-x-8 gap-y-4 cursor-pointer p-6 rounded-2xl hover:bg-primary/5 mt-4 justify-center">
                        {links.slice(0, 4).map(link => (
                            <div key={link.id} className="flex items-center gap-3">
                                <div className="p-2 rounded-lg bg-slate-50">
                                    <span className="material-symbols-outlined text-xl" style={{ color: link.color || themeColor }}>{link.icon}</span>
                                </div>
                                <span className="text-[10px] font-bold text-slate-600 truncate max-w-[120px]">{link.value}</span>
                            </div>
                        ))}
                    </div>
                )}

                {physicalShowFooter && (
                    <div onClick={() => setActiveTool('conteudo')} className="mt-auto pt-8 border-t border-slate-100 w-full flex justify-between items-end cursor-pointer opacity-60">
                        <div className="flex items-center gap-2 text-slate-500">
                            <span className="material-symbols-outlined text-sm">language</span>
                            <span className="text-[9px] font-bold">{customWebsiteUrl || 'www.seusite.com'}</span>
                        </div>
                        <p className="text-[8px] font-bold text-slate-400 uppercase tracking-[0.2em]">{footerText || "DIGICARD STUDIO © 2024"}</p>
                    </div>
                )}
            </div>

            {physicalShowAvatar ? (
                <div onClick={() => setActiveTool('imagens')} className={cn(
                    "rounded-full border-4 border-slate-50 shadow-xl overflow-hidden bg-slate-100 cursor-pointer transition-transform hover:scale-105 shrink-0",
                    isVertical ? "size-40 mb-12 order-first" : "size-48 ml-12"
                )}>
                    <img src={avatarUrl} className="w-full h-full object-cover" alt="Avatar" />
                </div>
            ) : <EmptySlot label="Foto de Perfil" tool="imagens" className={cn("rounded-full mb-12", isVertical ? "size-40 order-first" : "size-48 ml-12")} />}
            
            <div className="absolute bottom-0 left-0 w-full h-2 opacity-80" style={{ backgroundColor: themeColor }}></div>
          </div>
        );
    }
  };

  const RenderBack = () => {
    const isDark = ['executive', 'instagram', 'instagram-v', 'youtube', 'youtube-v', 'twitch-h', 'twitch-v', 'spotify', 'spotify-v'].includes(template);
    const bgColor = isDark ? (template === 'executive' ? '#0a0a0b' : (template.includes('twitch') ? '#0d0d17' : (template.includes('spotify') ? '#191414' : (template.includes('youtube') ? '#1a1a1a' : themeColor)))) : '#ffffff';
    const textColor = isDark ? '#ffffff' : '#1e293b';

    return (
      <div className="flex-1 flex flex-col items-center justify-center p-12 relative" style={{ backgroundColor: bgColor }}>
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: `radial-gradient(${textColor} 1px, transparent 1px)`, backgroundSize: '32px 32px' }}></div>
        
        {physicalShowQR ? (
            <div 
            className="relative z-10 flex flex-col items-center gap-8 cursor-pointer hover:scale-105 transition-transform group/edit"
            onClick={() => setActiveTool('qrcode')}
            >
            <div className={cn(
                "p-8 rounded-[3rem] shadow-2xl scale-110 relative",
                isDark ? "bg-white/5 border border-white/10" : "bg-white border border-slate-100"
            )}>
                {qrCodeUrl ? (
                <img src={qrCodeUrl} className={cn("size-48", isDark && template !== 'spotify' ? "invert brightness-200" : "")} alt="QR Code Large" />
                ) : (
                <div className="size-48 flex items-center justify-center bg-slate-100 rounded-xl">
                    <span className="material-symbols-outlined text-6xl text-slate-300">qr_code_2</span>
                </div>
                )}
            </div>
            <div className="text-center space-y-2">
                <h3 className="text-2xl font-black tracking-tighter uppercase" style={{ color: textColor }}>{fullName}</h3>
                <p className="text-[10px] font-bold tracking-[0.4em] uppercase opacity-60" style={{ color: textColor }}>Escaneie para salvar contato</p>
            </div>
            </div>
        ) : <EmptySlot label="Adicionar QR Code" tool="qrcode" className="size-64 rounded-[3rem]" />}

        <div className="absolute bottom-12 flex items-center gap-3 opacity-40" style={{ color: textColor }}>
          <span className="material-symbols-outlined text-lg">style</span>
          <span className="text-[8px] font-bold tracking-[0.5em] uppercase">DigiCard Studio Premium</span>
        </div>
      </div>
    );
  };

  const CardFace = ({ side }: { side: 'front' | 'back' }) => (
    <div className="relative group/face">
      {/* Crop Marks Simulation */}
      <div className="absolute -top-10 -left-10 w-16 h-[1px] bg-slate-400"></div>
      <div className="absolute -top-10 -left-10 w-[1px] h-16 bg-slate-400"></div>
      <div className="absolute -top-10 -right-10 w-16 h-[1px] bg-slate-400"></div>
      <div className="absolute -top-10 -right-10 w-[1px] h-16 bg-slate-400"></div>
      <div className="absolute -bottom-10 -left-10 w-16 h-[1px] bg-slate-400"></div>
      <div className="absolute -bottom-10 -left-10 w-[1px] h-16 bg-slate-400"></div>
      <div className="absolute -bottom-10 -right-10 w-16 h-[1px] bg-slate-400"></div>
      <div className="absolute -bottom-10 -right-10 w-[1px] h-16 bg-slate-400"></div>

      <div 
        className={cn(
            "relative bg-white shadow-2xl overflow-hidden border border-red-200/50 rounded-sm cursor-default",
            isVertical ? "w-[490px] h-[840px]" : "w-[840px] h-[490px]"
        )}
      >
        {/* Bleed Area (3mm) */}
        <div className="absolute inset-0 border-4 border-dashed border-red-400/30 pointer-events-none z-50"></div>
        {/* Main Trim Area */}
        <div className="absolute inset-[20px] bg-white border border-slate-100 flex overflow-hidden">
          {/* Safe Zone Margin (5mm internal) */}
          <div className="absolute inset-6 border border-dashed border-primary/20 pointer-events-none z-50 rounded"></div>
          {side === 'front' ? <RenderFront /> : <RenderBack />}
        </div>
      </div>
      <p className="text-center mt-6 text-[10px] font-bold text-slate-400 uppercase tracking-[0.3em]">
        {side === 'front' ? 'Face Principal (Anverso)' : 'Face de Conversão (Reverso)'}
      </p>
    </div>
  );

  return (
    <div className="flex flex-col items-center gap-12">
      <div className="bg-primary/5 border border-primary/20 p-6 rounded-2xl max-w-[800px] text-center shadow-sm">
        <h4 className="text-base font-bold text-primary flex items-center justify-center gap-2 mb-2">
          <span className="material-symbols-outlined text-2xl">print</span>
          Gabarito Modular — {currentTemplate?.name}
        </h4>
        <p className="text-[10px] text-slate-500 leading-relaxed uppercase tracking-widest font-medium">
          O layout físico herda a estética do modelo digital. Adicione ou remova elementos nas propriedades de conteúdo para personalizar sua impressão.
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
