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

  // Helper para determinar cor de texto baseada no brilho do fundo
  const getContrastColor = (hexcolor: string) => {
    if (!hexcolor) return '#000000';
    const r = parseInt(hexcolor.slice(1, 3), 16);
    const g = parseInt(hexcolor.slice(3, 5), 16);
    const b = parseInt(hexcolor.slice(5, 7), 16);
    const yiq = (r * 299 + g * 587 + b * 114) / 1000;
    return yiq >= 128 ? '#000000' : '#ffffff';
  };

  const textColor = getContrastColor(physicalBackgroundColor);
  const isDarkBg = textColor === '#ffffff';

  const globalStyle = {
    fontFamily: `'${fontFamily}', sans-serif`,
    fontSize: `${baseFontSize}px`
  };

  const EmptySlot = ({ label, tool, className }: { label: string, tool: string, className?: string }) => (
    <div 
        onClick={(e) => { e.stopPropagation(); setActiveTool(tool); }}
        className={cn(
            "border-2 border-dashed rounded-xl flex flex-col items-center justify-center p-4 transition-all cursor-pointer",
            isDarkBg ? "border-white/20 text-white/30 hover:border-primary/40 hover:bg-primary/5" : "border-slate-200 text-slate-300 hover:border-primary/40 hover:bg-primary/5",
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
        const spotifyText = getContrastColor(physicalBackgroundColor);
        return (
          <div className={cn(
            "flex-1 flex p-8 relative overflow-hidden",
            isVertical ? "flex-col items-center" : "flex-row items-start gap-8"
          )} style={{ ...globalStyle, backgroundColor: physicalBackgroundColor, color: spotifyText }}>
            <div className="absolute top-6 right-8 text-[8px] font-bold tracking-[0.2em] opacity-40 uppercase">DigiCard Music</div>
            
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
              <div className="mb-6">
                {physicalShowTitle ? (
                    <div onClick={() => setActiveTool('conteudo')} className="cursor-pointer group/title">
                        <h2 className="text-2xl font-black uppercase tracking-tight mb-1 group-hover/title:text-[#1DB954] transition-colors">{fullName}</h2>
                        <p className="text-[#1DB954] text-[10px] font-bold tracking-widest uppercase">{jobTitle || 'Verified Artist'}</p>
                    </div>
                ) : <EmptySlot label="Título do Player" tool="conteudo" className="h-12 w-full" />}
              </div>
              
              <div className="flex-1 space-y-2 mb-6">
                {physicalShowLinks ? (
                    <div onClick={() => setActiveTool('social')} className="cursor-pointer group/links space-y-1.5">
                        <p className={cn("text-[8px] font-bold uppercase tracking-widest mb-2", spotifyText === '#ffffff' ? 'text-white/40' : 'text-black/40')}>Playlist de Contatos</p>
                        {links.slice(0, 3).map((l, i) => (
                            <div key={l.id} className={cn("flex items-center gap-3 text-[10px] py-1 border-b transition-colors", spotifyText === '#ffffff' ? 'border-white/5' : 'border-black/5')}>
                                <span className="opacity-30 font-mono">0{i+1}</span>
                                <span className="font-bold flex-1 truncate">{l.value}</span>
                                <span className="material-symbols-outlined text-xs opacity-40">{l.icon}</span>
                            </div>
                        ))}
                    </div>
                ) : <EmptySlot label="Adicionar Músicas (Links)" tool="social" className="h-20 w-full" />}
              </div>

              <div className="mt-auto">
                <div className={cn("w-full h-1 rounded-full mb-4 relative overflow-hidden", spotifyText === '#ffffff' ? 'bg-white/10' : 'bg-black/10')}>
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

      case 'instagram':
      case 'instagram-v':
        return (
          <div className={cn(
            "flex-1 flex flex-col p-8 relative overflow-hidden",
            isVertical ? "items-center text-center" : "items-start"
          )} style={{ ...globalStyle, backgroundColor: physicalBackgroundColor, color: textColor }}>
            <div className="absolute top-6 left-8 flex items-center gap-2">
                <span className="material-symbols-outlined">photo_camera</span>
                <span className="text-[10px] font-black tracking-tight uppercase">InstaCard</span>
            </div>

            <div className={cn("mt-10 flex", isVertical ? "flex-col items-center gap-6" : "flex-row items-center gap-10")}>
                {physicalShowAvatar ? (
                    <div onClick={() => setActiveTool('imagens')} className="p-[3px] rounded-full bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] cursor-pointer hover:scale-105 transition-transform">
                        <div className="p-1 bg-white rounded-full">
                            <img src={avatarUrl} className="size-24 rounded-full object-cover" alt="Insta Avatar" />
                        </div>
                    </div>
                ) : <EmptySlot label="Foto de Perfil" tool="imagens" className="size-24 rounded-full" />}

                <div className="flex flex-col">
                    {physicalShowTitle ? (
                        <div onClick={() => setActiveTool('conteudo')} className="cursor-pointer group/title">
                            <h2 className="text-xl font-bold leading-tight">@{fullName.toLowerCase().replace(/\s/g, '_')}</h2>
                            <p className="opacity-60 text-[10px] font-medium uppercase tracking-wider">{jobTitle}</p>
                        </div>
                    ) : <EmptySlot label="Identidade Visual" tool="conteudo" className="h-10 w-full" />}
                    
                    <div className="flex gap-6 mt-4">
                        <div className="text-center"><p className="text-sm font-black">1.2k</p><p className="text-[8px] opacity-40 font-bold uppercase">Posts</p></div>
                        <div className="text-center"><p className="text-sm font-black">25k</p><p className="text-[8px] opacity-40 font-bold uppercase">Followers</p></div>
                        <div className="text-center"><p className="text-sm font-black">842</p><p className="text-[8px] opacity-40 font-bold uppercase">Following</p></div>
                    </div>
                </div>
            </div>

            {physicalShowLinks && (
                <div onClick={() => setActiveTool('social')} className="mt-10 w-full">
                    <p className="text-[8px] font-black opacity-40 uppercase tracking-widest mb-4">Highlights de Contato</p>
                    <div className="flex flex-wrap gap-6 justify-center">
                        {links.slice(0, 4).map(l => (
                            <div key={l.id} className="flex flex-col items-center gap-2">
                                <div className={cn("size-12 rounded-full border flex items-center justify-center", isDarkBg ? "bg-white/5 border-white/10" : "bg-slate-50 border-slate-100")}>
                                    <span className="material-symbols-outlined text-lg" style={{color: l.color || themeColor}}>{l.icon}</span>
                                </div>
                                <span className="text-[8px] font-bold uppercase truncate max-w-[60px] opacity-80">{l.label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            )}
          </div>
        );

      case 'twitch-h':
      case 'twitch-v':
        const twitchText = getContrastColor(physicalBackgroundColor);
        return (
          <div className="flex-1 flex flex-col p-8 relative overflow-hidden" style={{ ...globalStyle, backgroundColor: physicalBackgroundColor, color: twitchText }}>
            <div className="absolute top-6 right-8 flex items-center gap-2 bg-[#9146ff] px-3 py-1 rounded-full border border-white/20">
                <div className="size-1.5 bg-white rounded-full animate-pulse"></div>
                <span className="text-[8px] font-black uppercase tracking-widest text-white">Live Now</span>
            </div>

            <div className={cn("flex-1 flex", isVertical ? "flex-col items-center text-center gap-8 justify-center" : "flex-row items-center gap-10")}>
                {physicalShowAvatar ? (
                    <div onClick={() => setActiveTool('imagens')} className="size-28 rounded-full border-4 border-[#9146ff] p-1 cursor-pointer hover:scale-105 transition-transform shadow-[0_0_20px_rgba(145,70,255,0.3)]">
                        <img src={avatarUrl} className="size-full rounded-full object-cover" alt="Twitch Profile" />
                    </div>
                ) : <EmptySlot label="Streamer Avatar" tool="imagens" className="size-28 rounded-full" />}

                <div>
                    {physicalShowTitle ? (
                        <div onClick={() => setActiveTool('conteudo')} className="cursor-pointer group/title">
                            <h2 className="text-4xl font-black italic tracking-tighter uppercase leading-none mb-2 shadow-purple-500/20">{fullName}</h2>
                            <p className="text-[#bf94ff] text-[10px] font-bold uppercase tracking-[0.2em]">{jobTitle || 'Variety Streamer'}</p>
                        </div>
                    ) : <EmptySlot label="Canal Title" tool="conteudo" className="h-16 w-full" />}
                </div>
            </div>

            {physicalShowLinks && (
                <div onClick={() => setActiveTool('social')} className="mt-auto grid grid-cols-2 gap-3 cursor-pointer">
                    {links.slice(0, 2).map(l => (
                        <div key={l.id} className="bg-white/5 border border-white/10 p-3 rounded-lg flex items-center gap-3 hover:bg-white/10 transition-colors">
                            <span className="material-symbols-outlined text-[#bf94ff] text-base">{l.icon}</span>
                            <span className="text-[9px] font-bold truncate">{l.value}</span>
                        </div>
                    ))}
                </div>
            )}
          </div>
        );

      case 'linkedin':
        const liText = getContrastColor(physicalBackgroundColor);
        return (
          <div className="flex-1 flex flex-col relative overflow-hidden" style={{ ...globalStyle, backgroundColor: physicalBackgroundColor, color: liText }}>
            <div className="h-20 bg-gradient-to-r from-[#0a66c2] to-[#004182] relative">
                <div className="absolute bottom-4 left-8 text-[8px] font-black text-white/40 uppercase tracking-widest">Professional Summary</div>
            </div>
            
            <div className="px-8 -mt-10 flex flex-col flex-1 pb-8">
                <div className="flex justify-between items-end mb-6">
                    {physicalShowAvatar ? (
                        <div onClick={() => setActiveTool('imagens')} className="size-24 rounded-full border-4 border-white shadow-lg overflow-hidden cursor-pointer bg-slate-100 hover:scale-105 transition-transform">
                            <img src={avatarUrl} className="size-full object-cover" alt="LI Profile" />
                        </div>
                    ) : <EmptySlot label="Professional Photo" tool="imagens" className="size-24 rounded-full" />}
                    
                    <div className="flex items-center gap-1.5 text-[#0a66c2] mb-2">
                        <span className="material-symbols-outlined text-lg" style={{fontVariationSettings: "'FILL' 1"}}>verified</span>
                        <span className="text-[10px] font-bold uppercase">Verified Identity</span>
                    </div>
                </div>

                <div className="flex-1 flex flex-col">
                    {physicalShowTitle ? (
                        <div onClick={() => setActiveTool('conteudo')} className="mb-6 cursor-pointer group/title">
                            <h2 className="text-2xl font-bold leading-tight">{fullName}</h2>
                            <p className="opacity-60 text-xs font-medium mt-1 uppercase tracking-tight">{jobTitle}</p>
                        </div>
                    ) : <EmptySlot label="Headline" tool="conteudo" className="h-12 w-full mb-6" />}

                    {physicalShowLinks && (
                        <div onClick={() => setActiveTool('social')} className="space-y-3 cursor-pointer">
                            <p className="text-[8px] font-black opacity-40 uppercase tracking-[0.2em] mb-2">Contact Portfolio</p>
                            <div className="grid grid-cols-2 gap-4">
                                {links.slice(0, 4).map(l => (
                                    <div key={l.id} className={cn("flex items-center gap-2 py-1 border-b", liText === '#ffffff' ? 'border-white/10' : 'border-slate-50')}>
                                        <span className="material-symbols-outlined text-sm text-[#0a66c2]">{l.icon}</span>
                                        <span className="text-[9px] font-medium truncate">{l.value}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
          </div>
        );

      case 'youtube':
      case 'youtube-v':
        const ytText = getContrastColor(physicalBackgroundColor);
        return (
          <div className="flex-1 flex flex-col relative overflow-hidden" style={{ ...globalStyle, backgroundColor: physicalBackgroundColor, color: ytText }}>
            <div className="h-2 w-full bg-[#FF0000] opacity-50"></div>
            <div className={cn("flex-1 p-8 flex", isVertical ? "flex-col items-center gap-8" : "flex-row items-center justify-between")}>
                <div className={cn("flex flex-col", isVertical ? "items-center text-center" : "items-start")}>
                    {physicalShowAvatar ? (
                        <div onClick={() => setActiveTool('imagens')} className="size-32 rounded-full border-4 border-white/20 shadow-xl overflow-hidden mb-6 cursor-pointer hover:scale-105 transition-transform">
                            <img src={avatarUrl} className="w-full h-full object-cover" alt="YT Profile" />
                        </div>
                    ) : <EmptySlot label="Foto do Canal" tool="imagens" className="size-32 rounded-full mb-6" />}

                    {physicalShowTitle ? (
                        <div onClick={() => setActiveTool('conteudo')} className="cursor-pointer group/title">
                            <h2 className="text-3xl font-black tracking-tighter uppercase leading-none">{fullName}</h2>
                            <div className="flex items-center gap-2 mt-2">
                                <span className="material-symbols-outlined text-blue-400 fill-1 text-sm" style={{fontVariationSettings: "'FILL' 1"}}>verified</span>
                                <span className="text-[10px] font-bold opacity-60 uppercase tracking-widest">{jobTitle || 'YouTube Creator'}</span>
                            </div>
                        </div>
                    ) : <EmptySlot label="Identidade do Canal" tool="conteudo" className="h-16 w-full" />}
                </div>

                <div className={cn("flex flex-col gap-4", isVertical ? "w-full" : "w-64")}>
                    {physicalShowStats ? (
                        <div onClick={() => setActiveTool('conteudo')} className="bg-black/10 p-4 rounded-xl border border-white/10 cursor-pointer hover:bg-black/20 transition-colors">
                            <p className="text-[8px] font-black opacity-40 uppercase tracking-[0.2em] mb-1">Estatísticas Reais</p>
                            <div className="flex justify-between items-end">
                                <span className="text-2xl font-black">{stats[0]?.value || '1.2M'}</span>
                                <span className="text-[10px] font-bold opacity-60 mb-1">{stats[0]?.label || 'Inscritos'}</span>
                            </div>
                        </div>
                    ) : <EmptySlot label="Métricas" tool="conteudo" className="h-16 w-full" />}

                    {physicalShowLinks ? (
                        <div onClick={() => setActiveTool('social')} className="space-y-2 cursor-pointer">
                            <div className="w-full bg-[#FF0000] text-white py-3 rounded-full flex items-center justify-center gap-2 font-black text-[10px] uppercase tracking-widest shadow-lg shadow-red-900/20">
                                <span className="material-symbols-outlined text-sm" style={{fontVariationSettings: "'FILL' 1"}}>notifications_active</span>
                                {links[0]?.value || 'Inscreva-se Agora'}
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
            "flex-1 flex p-12 relative overflow-hidden",
            isVertical ? "flex-col items-center text-center justify-between" : "flex-row items-center justify-between"
          )} style={{ ...globalStyle, backgroundColor: physicalBackgroundColor, color: textColor }}>
            <div className={cn("flex-1 flex flex-col", isVertical ? "items-center" : "items-start")}>
                {physicalShowTitle ? (
                    <div onClick={() => setActiveTool('conteudo')} className="space-y-3 cursor-pointer hover:bg-primary/5 p-4 rounded-xl transition-colors group/title">
                        <div className="flex items-center gap-4">
                            <div className="rounded-full h-16 w-1.5" style={{ backgroundColor: themeColor }}></div>
                            <div className={isVertical ? "text-center" : "text-left"}>
                                <h2 className="font-black tracking-tight text-4xl">{fullName}</h2>
                                <p className="text-base font-bold uppercase tracking-[0.3em] mt-1" style={{ color: themeColor }}>{jobTitle}</p>
                            </div>
                        </div>
                    </div>
                ) : <EmptySlot label="Identidade Visual" tool="conteudo" className="h-24 w-full mb-8" />}

                {physicalShowLinks && (
                    <div onClick={() => setActiveTool('social')} className="flex flex-wrap gap-x-8 gap-y-4 cursor-pointer p-6 rounded-2xl hover:bg-primary/5 mt-4 justify-center">
                        {links.slice(0, 4).map(link => (
                            <div key={link.id} className="flex items-center gap-3">
                                <div className={cn("p-2 rounded-lg", isDarkBg ? "bg-white/10" : "bg-slate-50")}>
                                    <span className="material-symbols-outlined text-xl" style={{ color: link.color || themeColor }}>{link.icon}</span>
                                </div>
                                <span className="text-[10px] font-bold opacity-80 truncate max-w-[120px]">{link.value}</span>
                            </div>
                        ))}
                    </div>
                )}

                {physicalShowFooter && (
                    <div onClick={() => setActiveTool('conteudo')} className="mt-auto pt-8 border-t border-slate-100/20 w-full flex justify-between items-end cursor-pointer opacity-60">
                        <div className="flex items-center gap-2">
                            <span className="material-symbols-outlined text-sm">language</span>
                            <span className="text-[9px] font-bold">{customWebsiteUrl || 'www.seusite.com'}</span>
                        </div>
                        <p className="text-[8px] font-bold uppercase tracking-[0.2em]">{footerText || "DIGICARD STUDIO © 2024"}</p>
                    </div>
                )}
            </div>

            {physicalShowAvatar ? (
                <div onClick={() => setActiveTool('imagens')} className={cn(
                    "rounded-full border-4 border-white/20 shadow-xl overflow-hidden bg-slate-100 cursor-pointer transition-transform hover:scale-105 shrink-0",
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
    const backTextColor = getContrastColor(physicalBackgroundColor);
    const isDarkBack = backTextColor === '#ffffff';

    return (
      <div className="flex-1 flex flex-col items-center justify-center p-12 relative" style={{ backgroundColor: physicalBackgroundColor }}>
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: `radial-gradient(${backTextColor} 1px, transparent 1px)`, backgroundSize: '32px 32px' }}></div>
        
        {physicalShowQR ? (
            <div 
            className="relative z-10 flex flex-col items-center gap-8 cursor-pointer hover:scale-105 transition-transform group/edit"
            onClick={() => setActiveTool('qrcode')}
            >
            <div className={cn(
                "p-8 rounded-[3rem] shadow-2xl scale-110 relative",
                isDarkBack ? "bg-white/5 border border-white/10" : "bg-white border border-slate-100"
            )}>
                {qrCodeUrl ? (
                <img src={qrCodeUrl} className={cn("size-48", isDarkBack && template !== 'spotify' ? "invert brightness-200" : "")} alt="QR Code Large" />
                ) : (
                <div className="size-48 flex items-center justify-center bg-slate-100 rounded-xl">
                    <span className="material-symbols-outlined text-6xl text-slate-300">qr_code_2</span>
                </div>
                )}
            </div>
            <div className="text-center space-y-2">
                <h3 className="text-2xl font-black tracking-tighter uppercase" style={{ ...globalStyle, color: backTextColor }}>{fullName}</h3>
                <p className="text-[10px] font-bold tracking-[0.4em] uppercase opacity-60" style={{ ...globalStyle, color: backTextColor }}>Escaneie para salvar contato</p>
            </div>
            </div>
        ) : <EmptySlot label="Adicionar QR Code" tool="qrcode" className="size-64 rounded-[3rem]" />}

        <div className="absolute bottom-12 flex items-center gap-3 opacity-40" style={{ color: backTextColor }}>
          <span className="material-symbols-outlined text-lg">style</span>
          <span className="text-[8px] font-bold tracking-[0.5em] uppercase" style={globalStyle}>DigiCard Studio Premium</span>
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
          O layout físico herda a estética e tipografia global. Personalize a fonte e escala de texto na nova ferramenta de Estilo.
        </p>
      </div>

      <div className={cn(
          "flex items-start justify-center gap-20",
          "flex-col"
      )}>
        <CardFace side="front" />
        <CardFace side="back" />
      </div>
    </div>
  );
}
