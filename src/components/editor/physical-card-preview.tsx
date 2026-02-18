
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
                <span className="font-serif text-2xl" style={{background: 'linear-gradient(135deg, #D4AF37 0%, #F5E0A3 50%, #D4AF37 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'}}>RA</span>
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
      case 'linkedin':
        return (
          <div className="flex-1 bg-white flex flex-col p-0 text-slate-900 relative overflow-hidden">
            <div className="h-1/5 w-full bg-linkedin-blue bg-cover bg-center" style={{ backgroundImage: `url('${bannerUrl || 'https://images.unsplash.com/photo-1497215842964-222b430dc094?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw0fHxjb3Jwb3JhdGUlMjBiYWNrZ3JvdW5kfGVufDB8fHx8MTc3MTM1Mjg1N3ww&ixlib=rb-4.1.0&q=80&w=1080'}')` }}></div>
            <div className="px-10 flex-1 flex flex-col items-center -mt-12 z-10">
                <div onClick={() => setActiveTool('imagens')} className="relative cursor-pointer">
                    <div className="size-32 rounded-full border-4 border-white bg-white shadow-sm overflow-hidden">
                        <img src={avatarUrl} className="w-full h-full object-cover" alt="Profile" />
                    </div>
                    {cardData.isVerified && (
                        <div className="absolute bottom-2 right-2 bg-[#0a66c2] text-white rounded-full p-1 border-2 border-white flex items-center justify-center">
                            <span className="material-symbols-outlined text-xs font-bold">verified</span>
                        </div>
                    )}
                </div>
                <div className="mt-6 text-center" onClick={() => setActiveTool('conteudo')}>
                    <h1 className="text-3xl font-bold leading-tight text-slate-900">{fullName}</h1>
                    <p className="text-lg text-slate-600 font-medium mt-1">{jobTitle}</p>
                    <p className="text-sm text-slate-400 mt-1">{footerText || 'TechNova Solutions'}</p>
                </div>
                <div className="mt-8 flex flex-col items-center w-full gap-4" onClick={() => setActiveTool('social')}>
                    <div className="w-full h-px bg-slate-100"></div>
                    <div className="flex items-center gap-2 text-slate-500">
                        <span className="material-symbols-outlined text-xl">groups</span>
                        <span className="text-xs font-bold uppercase tracking-widest">500+ conexões profissionais</span>
                    </div>
                    <div className="w-full h-px bg-slate-100"></div>
                </div>
            </div>
            <div className="h-3 bg-[#0a66c2] w-full"></div>
          </div>
        );
      case 'instagram':
        return (
          <div className="flex-1 bg-white flex flex-col p-0 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-tr from-[#f09433] via-[#e6683c] to-[#bc1888] opacity-10 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2"></div>
            <div className="relative h-full flex flex-col p-12">
                <div className="flex justify-between items-start mb-10">
                    <div onClick={() => setActiveTool('imagens')} className="p-[4px] rounded-full bg-gradient-to-tr from-[#f09433] via-[#e6683c] to-[#bc1888] cursor-pointer">
                        <div className="bg-white p-1 rounded-full">
                            <div className="size-28 rounded-full overflow-hidden shadow-lg">
                                <img src={avatarUrl} className="w-full h-full object-cover" alt="Profile" />
                            </div>
                        </div>
                    </div>
                    <div className="text-right">
                        <span className="material-symbols-outlined text-slate-200 text-5xl">more_horiz</span>
                    </div>
                </div>
                <div className="space-y-2 mb-8" onClick={() => setActiveTool('conteudo')}>
                    <h4 className="text-3xl font-bold text-slate-900 leading-tight tracking-tight">@{fullName.toLowerCase().replace(/\s/g, '_')}</h4>
                    <p className="text-[#bc1888] font-bold text-lg uppercase tracking-widest">{jobTitle}</p>
                </div>
                <p className="text-slate-600 text-base max-w-[350px] leading-relaxed mb-auto" onClick={() => setActiveTool('conteudo')}>
                    {cardData.bio}
                </p>
                <div className="flex gap-3 mt-8" onClick={() => setActiveTool('social')}>
                    <div className="flex-1 bg-slate-100 rounded-xl h-14 flex items-center justify-center text-sm font-black uppercase text-slate-800 tracking-widest">Seguir</div>
                    <div className="flex-1 bg-gradient-to-tr from-[#f09433] via-[#e6683c] to-[#bc1888] text-white rounded-xl h-14 flex items-center justify-center text-sm font-black uppercase tracking-widest shadow-lg">Mensagem</div>
                    <div className="w-16 bg-slate-100 rounded-xl h-14 flex items-center justify-center">
                        <span className="material-symbols-outlined text-slate-700 text-2xl">person_add</span>
                    </div>
                </div>
            </div>
          </div>
        );
      case 'youtube':
        return (
          <div className="flex-1 bg-[#FF0000] flex flex-col justify-center items-center p-12 text-white relative overflow-hidden">
            <div className="absolute inset-4 border border-dashed border-white/30 pointer-events-none rounded"></div>
            <div className="flex flex-col items-center text-center z-10">
                <div onClick={() => setActiveTool('imagens')} className="w-32 h-32 rounded-full border-4 border-white overflow-hidden shadow-2xl bg-white mb-8 cursor-pointer hover:scale-105 transition-transform">
                    <img src={avatarUrl} className="w-full h-full object-cover" alt="Profile" />
                </div>
                <div className="flex items-center gap-3 mb-4" onClick={() => setActiveTool('conteudo')}>
                    <h4 className="text-4xl font-black uppercase tracking-tighter leading-none">{fullName}</h4>
                    <span className="material-symbols-outlined !text-3xl fill-1">verified</span>
                </div>
                <div className="bg-black/20 backdrop-blur-md px-6 py-2 rounded-full border border-white/10" onClick={() => setActiveTool('conteudo')}>
                    <p className="text-lg font-bold tracking-wide">{stats[0]?.value || '1.2M'} INSCRITOS</p>
                </div>
            </div>
            <div className="absolute bottom-8 right-10 flex items-center gap-2 opacity-30">
                <span className="material-symbols-outlined !text-3xl">play_circle</span>
                <span className="text-[10px] font-bold tracking-[0.4em] uppercase">YouTube Channel</span>
            </div>
          </div>
        );
      case 'whatsapp':
        return (
          <div className="flex-1 bg-white flex relative overflow-hidden">
            <div className="w-8 h-full bg-[#25D366]"></div>
            <div className="flex-1 p-16 flex flex-col justify-between">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-4 text-[#25D366]">
                  <span className="material-symbols-outlined text-6xl">chat</span>
                  <span className="text-3xl font-black tracking-tight text-slate-800">DigiCard <span className="text-[#075E54]">Web</span></span>
                </div>
                <div className="text-right">
                  <p className="text-xs font-bold uppercase tracking-[0.3em] text-slate-400">Comunicação Instantânea</p>
                </div>
              </div>
              <div onClick={() => setActiveTool('conteudo')} className="cursor-pointer">
                <h1 className="text-6xl font-black text-slate-900 leading-tight">{fullName}</h1>
                <p className="text-3xl text-slate-500 font-medium mt-2">{jobTitle}</p>
              </div>
              <div className="space-y-6" onClick={() => setActiveTool('social')}>
                {links.slice(0, 2).map(l => (
                  <div key={l.id} className="flex items-center gap-6">
                    <div className="p-3 rounded-full bg-green-50 text-[#25D366]">
                      <span className="material-symbols-outlined text-3xl">{l.icon}</span>
                    </div>
                    <span className="text-3xl font-bold text-slate-700">{l.value}</span>
                  </div>
                ))}
              </div>
              <div className="flex justify-between items-end border-t border-slate-100 pt-8 text-slate-400">
                <p className="text-xl">Fale conosco agora pelo WhatsApp</p>
                <div className="flex gap-3">
                    <div className="w-3 h-3 rounded-full bg-[#25D366]"></div>
                    <div className="w-3 h-3 rounded-full bg-[#25D366] opacity-50"></div>
                    <div className="w-3 h-3 rounded-full bg-[#25D366] opacity-25"></div>
                </div>
              </div>
            </div>
          </div>
        );
      case 'twitch-h':
        return (
          <div className="flex-1 bg-[#0d0d17] flex flex-col justify-center px-16 relative overflow-hidden text-white">
            <div className="absolute top-0 right-0 w-48 h-48 bg-[#9146FF]/20 blur-[80px] rounded-full"></div>
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#9146FF] via-[#bf94ff] to-[#9146FF]"></div>
            <div className="z-10" onClick={() => setActiveTool('imagens')}>
                <div className="size-24 bg-[#9146FF]/10 rounded-2xl border-2 border-[#9146FF]/50 flex items-center justify-center mb-8 shadow-[0_0_20px_rgba(145,70,255,0.4)] overflow-hidden">
                    <img src={avatarUrl} className="w-full h-full object-cover" alt="Twitch Avatar" />
                </div>
            </div>
            <div className="z-10" onClick={() => setActiveTool('conteudo')}>
                <h2 className="text-5xl font-black italic tracking-tighter" style={{textShadow: '0 0 10px rgba(145,70,255,0.8)'}}>{fullName.toUpperCase()}</h2>
                <div className="h-1.5 w-16 bg-[#9146FF] mt-3 mb-4"></div>
                <p className="text-[#9146FF] font-bold uppercase tracking-[0.3em] text-lg">{jobTitle}</p>
            </div>
            <div className="absolute bottom-8 right-12 flex items-center gap-3 bg-black/40 backdrop-blur-md px-6 py-2 rounded-full border border-white/10">
                <div className="size-3 bg-[#9146FF] rounded-full animate-pulse"></div>
                <span className="text-xs text-slate-400 font-black uppercase tracking-widest">Twitch Partner</span>
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
    const isDark = ['executive', 'instagram', 'youtube', 'twitch-h', 'twitch-v', 'spotify-v'].includes(template);
    const bgColor = isDark ? (template === 'executive' ? '#0a0a0b' : (template.includes('twitch') ? '#0d0d17' : themeColor)) : '#ffffff';
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
