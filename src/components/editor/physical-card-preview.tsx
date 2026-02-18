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

  const EmptySlot = ({ label, tool }: { label: string, tool: string }) => (
    <div 
        onClick={(e) => { e.stopPropagation(); setActiveTool(tool); }}
        className="flex-1 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-xl flex flex-col items-center justify-center p-4 text-slate-300 group hover:border-primary/40 hover:bg-primary/5 transition-all cursor-pointer m-2"
    >
        <span className="material-symbols-outlined text-3xl mb-2 opacity-20 group-hover:opacity-100 group-hover:text-primary transition-all">add_circle</span>
        <span className="text-[10px] font-bold uppercase tracking-widest opacity-40 group-hover:opacity-100 group-hover:text-primary transition-all">{label}</span>
    </div>
  );

  const RenderFront = () => {
    // Layout adaptativo baseado no que está visível
    const contentClasses = cn(
        "flex-1 flex p-12 relative overflow-hidden",
        isVertical ? "flex-col items-center text-center justify-between" : "flex-row items-center justify-between"
    );

    switch (template) {
      case 'executive':
        return (
          <div className="flex-1 bg-[#0a0a0b] flex flex-col justify-between p-12 relative overflow-hidden text-white">
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 20% 20%, #D4AF37 0%, transparent 40%)' }}></div>
            
            <div className="flex justify-between items-start z-10 w-full">
              {physicalShowAvatar ? (
                <div onClick={() => setActiveTool('conteudo')} className="h-12 w-12 border-2 border-[#D4AF37] rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition-transform">
                    <span className="font-serif text-2xl" style={{background: 'linear-gradient(135deg, #D4AF37 0%, #F5E0A3 50%, #D4AF37 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'}}>
                    {fullName.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
                    </span>
                </div>
              ) : <div className="h-12 w-12" />}
              <div className="text-right">
                <p className="text-[10px] uppercase tracking-[0.3em] text-[#D4AF37]/60 font-bold">Executive Elite</p>
              </div>
            </div>

            <div className="z-10 w-full">
              {physicalShowTitle ? (
                <div onClick={() => setActiveTool('conteudo')} className="cursor-pointer group/title">
                    <h1 className="font-serif text-5xl tracking-tight mb-2 group-hover/title:text-[#D4AF37] transition-colors" style={{background: 'linear-gradient(135deg, #D4AF37 0%, #F5E0A3 50%, #D4AF37 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'}}>{fullName}</h1>
                    <p className="text-[#D4AF37]/80 uppercase tracking-[0.4em] text-xs font-medium border-t border-[#D4AF37]/20 pt-4 inline-block">{jobTitle}</p>
                </div>
              ) : <EmptySlot label="Adicionar Nome" tool="conteudo" />}
            </div>

            <div className="flex justify-between items-end z-10 w-full">
                <div className="space-y-1 text-[10px] text-[#D4AF37]/60 tracking-wider">
                    {physicalShowLinks && links.slice(0, 2).map(l => (
                        <div key={l.id} className="flex items-center gap-2">
                            <span className="material-symbols-outlined text-xs">{l.icon}</span>
                            {l.value}
                        </div>
                    ))}
                </div>
                {physicalShowFooter && (
                    <div className="text-[10px] text-[#D4AF37]/60 tracking-widest uppercase cursor-pointer" onClick={() => setActiveTool('conteudo')}>
                        {customWebsiteUrl || 'São Paulo | Brasil'}
                    </div>
                )}
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
            
            {physicalShowAvatar ? (
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
            ) : <EmptySlot label="Foto de Perfil" tool="imagens" />}

            <div className={cn("flex-1", isVertical ? "text-center w-full" : "text-left")}>
              {physicalShowTitle ? (
                <div onClick={() => setActiveTool('conteudo')} className="cursor-pointer group/title">
                    <h2 className="text-3xl font-black uppercase tracking-tight mb-1 group-hover/title:text-[#1DB954] transition-colors">{fullName}</h2>
                    <p className="text-[#1DB954] text-xs font-bold tracking-widest uppercase mb-6">Verified Artist</p>
                </div>
              ) : <EmptySlot label="Nome do Artista" tool="conteudo" />}
              
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

      default:
        return (
          <div className={contentClasses}>
            {isVertical ? (
                // Layout Vertical Adaptativo
                <>
                    <div className="w-full flex flex-col items-center gap-6">
                        {physicalShowAvatar ? (
                            <div onClick={() => setActiveTool('imagens')} className="size-40 rounded-full border-4 border-slate-50 shadow-xl overflow-hidden bg-slate-100 cursor-pointer transition-transform hover:scale-105 shrink-0">
                                <img src={avatarUrl} className="w-full h-full object-cover" alt="Avatar" />
                            </div>
                        ) : <EmptySlot label="Espaço Vazio (Foto)" tool="imagens" />}

                        {physicalShowTitle ? (
                            <div onClick={() => setActiveTool('conteudo')} className="cursor-pointer hover:bg-primary/5 p-4 rounded-xl transition-colors">
                                <h2 className="font-black text-slate-900 tracking-tight text-4xl">{fullName}</h2>
                                <p className="text-base font-bold uppercase tracking-[0.3em] mt-1" style={{ color: themeColor }}>{jobTitle}</p>
                            </div>
                        ) : <EmptySlot label="Espaço Vazio (Identidade)" tool="conteudo" />}
                    </div>

                    {physicalShowLinks && (
                        <div onClick={() => setActiveTool('social')} className="flex flex-wrap gap-x-8 gap-y-4 cursor-pointer p-6 rounded-2xl hover:bg-primary/5 justify-center">
                            {links.slice(0, 3).map(link => (
                                <div key={link.id} className="flex items-center gap-3">
                                <div className="p-2 rounded-lg bg-slate-50">
                                    <span className="material-symbols-outlined text-2xl" style={{ color: link.color || themeColor }}>{link.icon}</span>
                                </div>
                                <span className="text-xs font-bold text-slate-600 truncate max-w-[150px]">{link.value}</span>
                                </div>
                            ))}
                        </div>
                    )}

                    {physicalShowFooter && (
                        <div onClick={() => setActiveTool('conteudo')} className="w-full border-t border-slate-100 pt-8 mt-auto flex flex-col items-center gap-2 cursor-pointer">
                            <div className="flex items-center gap-3 text-slate-500">
                                <span className="material-symbols-outlined text-xl">language</span>
                                <span className="text-xs font-bold">{customWebsiteUrl || 'www.seusite.com'}</span>
                            </div>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">{footerText || "DIGICARD STUDIO © 2024"}</p>
                        </div>
                    )}
                </>
            ) : (
                // Layout Horizontal Adaptativo
                <>
                    <div className="flex-1 flex flex-col justify-between h-full">
                        {physicalShowTitle ? (
                            <div onClick={() => setActiveTool('conteudo')} className="space-y-3 cursor-pointer hover:bg-primary/5 p-4 rounded-xl transition-colors w-fit">
                                <div className="flex items-center gap-4">
                                <div className="rounded-full h-16 w-1.5" style={{ backgroundColor: themeColor }}></div>
                                <div>
                                    <h2 className="font-black text-slate-900 tracking-tight text-5xl">{fullName}</h2>
                                    <p className="text-base font-bold uppercase tracking-[0.3em] mt-1" style={{ color: themeColor }}>{jobTitle}</p>
                                </div>
                                </div>
                            </div>
                        ) : <EmptySlot label="Identidade" tool="conteudo" />}

                        {physicalShowLinks && (
                            <div onClick={() => setActiveTool('social')} className="flex flex-wrap gap-x-8 gap-y-4 cursor-pointer p-6 rounded-2xl hover:bg-primary/5 mt-4">
                                {links.slice(0, 4).map(link => (
                                    <div key={link.id} className="flex items-center gap-3">
                                    <div className="p-2 rounded-lg bg-slate-50">
                                        <span className="material-symbols-outlined text-2xl" style={{ color: link.color || themeColor }}>{link.icon}</span>
                                    </div>
                                    <span className="text-xs font-bold text-slate-600 truncate max-w-[150px]">{link.value}</span>
                                    </div>
                                ))}
                            </div>
                        )}

                        {physicalShowFooter && (
                            <div onClick={() => setActiveTool('conteudo')} className="flex justify-between items-end border-t border-slate-100 pt-8 mt-auto cursor-pointer">
                                <div className="space-y-2">
                                    <div className="flex items-center gap-3 text-slate-500">
                                    <span className="material-symbols-outlined text-xl">language</span>
                                    <span className="text-xs font-bold">{customWebsiteUrl || 'www.seusite.com'}</span>
                                    </div>
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">{footerText || "DIGICARD STUDIO © 2024"}</p>
                                </div>
                            </div>
                        )}
                    </div>

                    {physicalShowAvatar ? (
                        <div onClick={() => setActiveTool('imagens')} className="size-48 rounded-full border-4 border-slate-50 shadow-xl overflow-hidden bg-slate-100 cursor-pointer transition-transform hover:scale-105 ml-12 shrink-0">
                            <img src={avatarUrl} className="w-full h-full object-cover" alt="Avatar" />
                        </div>
                    ) : (
                        <div className="ml-12 h-full flex flex-col justify-center">
                            <EmptySlot label="Adicionar Foto" tool="imagens" />
                        </div>
                    )}
                </>
            )}
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
        ) : <EmptySlot label="Adicionar QR Code" tool="qrcode" />}

        <div className="absolute bottom-12 flex items-center gap-3 opacity-40" style={{ color: textColor }}>
          <span className="material-symbols-outlined text-lg">style</span>
          <span className="text-[10px] font-bold tracking-[0.5em] uppercase">DigiCard Studio Premium</span>
        </div>
      </div>
    );
  };

  const CardFace = ({ side }: { side: 'front' | 'back' }) => (
    <div className="relative group/face">
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
          Gabarito Técnico Modular — Modelo {currentTemplate?.name}
        </h4>
        <p className="text-xs text-slate-500 leading-relaxed uppercase tracking-widest font-medium">
          O layout se adapta automaticamente conforme você remove ou adiciona elementos nas propriedades.
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
