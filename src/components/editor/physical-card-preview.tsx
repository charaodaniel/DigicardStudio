
'use client';
import type { CardData } from '@/lib/types';
import { cn } from '@/lib/utils';

type PhysicalCardPreviewProps = {
  cardData: CardData;
  setActiveTool: (toolId: string) => void;
};

export default function PhysicalCardPreview({ cardData, setActiveTool }: PhysicalCardPreviewProps) {
  const { template, themeColor, fullName, jobTitle, avatarUrl, links, qrCodeUrl, customWebsiteUrl, footerText, stats } = cardData;

  // Renderizador de Faces de acordo com o Template
  const RenderFront = () => {
    switch (template) {
      case 'executive':
        return (
          <div className="flex-1 bg-[#0a0a0b] flex flex-col justify-between p-12 relative overflow-hidden text-white">
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #D4AF37 1px, transparent 0)', backgroundSize: '32px 32px' }}></div>
            <div className="flex justify-between items-start z-10">
              <div onClick={() => setActiveTool('conteudo')} className="cursor-pointer hover:opacity-80">
                <h2 className="text-4xl font-black tracking-widest uppercase bg-gradient-to-tr from-[#BF953F] via-[#FCF6BA] to-[#AA771C] bg-clip-text text-transparent">ELITE</h2>
                <p className="text-[#D4AF37] text-[10px] tracking-[0.4em] font-bold">EXECUTIVO</p>
              </div>
              <div onClick={() => setActiveTool('imagens')} className="size-20 rounded-full border-2 border-[#D4AF37] p-1 overflow-hidden cursor-pointer">
                <img src={avatarUrl} className="w-full h-full object-cover rounded-full" alt="Profile" />
              </div>
            </div>
            <div className="z-10" onClick={() => setActiveTool('conteudo')}>
              <h1 className="text-3xl font-light tracking-wide">{fullName}</h1>
              <p className="text-[#D4AF37] text-xs uppercase tracking-[0.2em] mt-1">{jobTitle}</p>
            </div>
            <div className="absolute bottom-0 left-0 w-full h-1.5 bg-gradient-to-r from-[#BF953F] to-[#AA771C]"></div>
          </div>
        );
      case 'linkedin':
        return (
          <div className="flex-1 bg-[#0A66C2] flex flex-col justify-between p-10 text-white relative overflow-hidden">
            <div className="absolute -top-10 -right-10 size-40 bg-white/10 rounded-full"></div>
            <div className="flex justify-between items-start z-10">
              <span className="text-[10px] font-black uppercase tracking-widest opacity-80">DigiCard Web</span>
              <div onClick={() => setActiveTool('imagens')} className="size-20 rounded-full border-4 border-white shadow-xl overflow-hidden cursor-pointer">
                <img src={avatarUrl} className="w-full h-full object-cover" alt="Profile" />
              </div>
            </div>
            <div className="z-10" onClick={() => setActiveTool('conteudo')}>
              <h1 className="text-4xl font-bold leading-tight">{fullName}</h1>
              <p className="text-blue-100 text-sm font-medium mt-1">{jobTitle}</p>
            </div>
            <div className="pt-4 border-t border-white/20 z-10 flex justify-between items-end">
              <span className="text-[8px] uppercase tracking-widest opacity-70">Identidade Profissional</span>
              <span className="text-[8px] italic">linkedin.com/in/{fullName.toLowerCase().replace(/\s/g, '-')}</span>
            </div>
          </div>
        );
      case 'instagram':
        return (
          <div className="flex-1 bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] flex flex-col items-center justify-center p-10 text-white relative">
            <div className="flex flex-col items-center gap-4 z-10">
              <div onClick={() => setActiveTool('imagens')} className="size-28 rounded-full bg-white p-1 flex items-center justify-center shadow-2xl cursor-pointer hover:scale-105 transition-transform">
                <img src={avatarUrl} className="w-full h-full rounded-full border-2 border-white object-cover" alt="Profile" />
              </div>
              <div className="text-center" onClick={() => setActiveTool('conteudo')}>
                <h1 className="text-3xl font-black tracking-tight">@{fullName.toLowerCase().replace(/\s/g, '_')}</h1>
                <p className="text-xs font-medium opacity-90 mt-1 uppercase tracking-widest">{jobTitle}</p>
              </div>
            </div>
            <div className="absolute bottom-6 right-8 text-[8px] font-bold tracking-tighter opacity-60">DigiCard Web</div>
          </div>
        );
      case 'youtube':
        return (
          <div className="flex-1 bg-[#FF0000] flex flex-col justify-between p-12 text-white relative overflow-hidden">
            <div className="absolute -top-10 -right-10 opacity-10">
              <span className="material-symbols-outlined text-[200px]">smart_display</span>
            </div>
            <div className="flex items-center gap-6 z-10">
              <div onClick={() => setActiveTool('imagens')} className="size-24 rounded-full border-4 border-white shadow-2xl overflow-hidden bg-white cursor-pointer">
                <img src={avatarUrl} className="w-full h-full object-cover" alt="Profile" />
              </div>
              <div onClick={() => setActiveTool('conteudo')}>
                <h1 className="text-4xl font-black uppercase tracking-tighter leading-none">{fullName}</h1>
                <p className="text-white/80 font-bold text-sm mt-2">@{fullName.toLowerCase().replace(/\s/g, '_')}</p>
              </div>
            </div>
            <div className="flex justify-between items-end z-10">
              <div className="bg-white text-[#FF0000] px-5 py-2 rounded-full font-black text-xs shadow-xl">
                {stats[0]?.value || '100K+'} INSCRITOS
              </div>
              <span className="text-[10px] font-bold tracking-widest opacity-70">DIGICARD WEB</span>
            </div>
          </div>
        );
      case 'whatsapp':
        return (
          <div className="flex-1 bg-white flex relative overflow-hidden">
            <div className="w-6 h-full bg-[#25D366]"></div>
            <div className="flex-1 p-12 flex flex-col justify-between">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-3 text-[#25D366]">
                  <span className="material-symbols-outlined text-5xl">chat</span>
                  <span className="text-2xl font-black tracking-tight text-slate-800">DigiCard <span className="text-[#075E54]">Web</span></span>
                </div>
                <div className="text-right">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Comunicação Instantânea</p>
                </div>
              </div>
              <div onClick={() => setActiveTool('conteudo')}>
                <h1 className="text-5xl font-black text-slate-900 leading-tight">{fullName}</h1>
                <p className="text-2xl text-slate-500 font-medium">{jobTitle}</p>
              </div>
              <div className="space-y-4" onClick={() => setActiveTool('social')}>
                {links.slice(0, 2).map(l => (
                  <div key={l.id} className="flex items-center gap-4">
                    <div className="p-2 rounded-full bg-green-50 text-[#25D366]">
                      <span className="material-symbols-outlined text-xl">{l.icon}</span>
                    </div>
                    <span className="text-2xl font-bold text-slate-700">{l.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      default:
        // Layout Padrão Genérico (Fallback)
        return (
          <div className="flex-1 flex flex-col justify-between p-10 relative">
            <div className="flex justify-between items-start">
              <div onClick={() => setActiveTool('conteudo')} className="space-y-2 cursor-pointer hover:bg-primary/5 p-2 rounded-xl transition-colors">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-1.5 rounded-full" style={{ backgroundColor: themeColor }}></div>
                  <div>
                    <h2 className="text-3xl font-black text-slate-900 tracking-tight">{fullName}</h2>
                    <p className="text-sm font-bold uppercase tracking-[0.2em]" style={{ color: themeColor }}>{jobTitle}</p>
                  </div>
                </div>
              </div>
              <div onClick={() => setActiveTool('imagens')} className="size-24 rounded-full border-4 border-slate-50 shadow-md overflow-hidden bg-slate-100 cursor-pointer">
                <img src={avatarUrl} className="w-full h-full object-cover" alt="Avatar" />
              </div>
            </div>
            <div onClick={() => setActiveTool('social')} className="mt-4 flex flex-wrap gap-x-6 gap-y-3 cursor-pointer p-4 rounded-xl hover:bg-primary/5">
              {links.slice(0, 4).map(link => (
                <div key={link.id} className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-sm" style={{ color: link.color || themeColor }}>{link.icon}</span>
                  <span className="text-[10px] font-bold text-slate-600 truncate max-w-[120px]">{link.value}</span>
                </div>
              ))}
            </div>
            <div onClick={() => setActiveTool('conteudo')} className="flex justify-between items-end border-t border-slate-100 pt-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-slate-500">
                  <span className="material-symbols-outlined text-sm">language</span>
                  <span className="text-[10px] font-bold">{customWebsiteUrl || `www.digicard.studio/${fullName.toLowerCase().replace(/\s/g, '')}`}</span>
                </div>
                <p className="text-[9px] font-medium text-slate-400 uppercase tracking-wide">{footerText || "DESIGNED WITH DIGICARD STUDIO © 2024"}</p>
              </div>
              <span className="text-[7px] font-black text-slate-300 uppercase tracking-widest">Face Principal</span>
            </div>
            <div className="absolute bottom-0 left-0 w-full h-1" style={{ backgroundColor: themeColor }}></div>
          </div>
        );
    }
  };

  const RenderBack = () => {
    // Estilos comuns para o verso
    const isDark = ['executive', 'instagram', 'youtube', 'tiktok', 'spotify'].includes(template);
    const bgColor = isDark ? themeColor : '#ffffff';
    const textColor = isDark ? '#ffffff' : '#1e293b';

    return (
      <div className="flex-1 flex flex-col items-center justify-center p-10 relative" style={{ backgroundColor: bgColor }}>
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '32px 32px' }}></div>
        
        <div 
          className="relative z-10 flex flex-col items-center gap-6 cursor-pointer hover:scale-105 transition-transform group/edit"
          onClick={() => setActiveTool('qrcode')}
        >
          {template === 'executive' && (
            <div className="absolute -inset-4 border-2 border-white/20 rounded-[3rem] pointer-events-none">
              <div className="absolute -top-1 -left-1 size-4 border-t-2 border-l-2 border-white"></div>
              <div className="absolute -top-1 -right-1 size-4 border-t-2 border-r-2 border-white"></div>
              <div className="absolute -bottom-1 -left-1 size-4 border-b-2 border-l-2 border-white"></div>
              <div className="absolute -bottom-1 -right-1 size-4 border-b-2 border-r-2 border-white"></div>
            </div>
          )}

          <div className="bg-white p-6 rounded-[2.5rem] shadow-2xl scale-110 relative">
            {qrCodeUrl ? (
              <img src={qrCodeUrl} className="size-40" alt="QR Code Large" />
            ) : (
              <div className="size-40 flex items-center justify-center bg-slate-100 rounded-xl">
                <span className="material-symbols-outlined text-5xl text-slate-300">qr_code_2</span>
              </div>
            )}
          </div>
          <div className="text-center space-y-1">
            <h3 className="text-2xl font-black tracking-tighter uppercase" style={{ color: textColor }}>{fullName}</h3>
            <p className="text-[10px] font-bold tracking-[0.3em] uppercase opacity-70" style={{ color: textColor }}>Escaneie para salvar contato</p>
          </div>
        </div>

        <div className="absolute bottom-10 flex items-center gap-2 opacity-40" style={{ color: textColor }}>
          <span className="material-symbols-outlined text-sm">style</span>
          <span className="text-[10px] font-bold tracking-widest uppercase">DigiCard Studio</span>
        </div>
      </div>
    );
  };

  const CardFace = ({ side }: { side: 'front' | 'back' }) => (
    <div className="relative group/face">
      {/* Guias de Corte */}
      <div className="absolute -top-6 -left-6 w-10 h-[1px] bg-slate-400"></div>
      <div className="absolute -top-6 -left-6 w-[1px] h-10 bg-slate-400"></div>
      <div className="absolute -top-6 -right-6 w-10 h-[1px] bg-slate-400"></div>
      <div className="absolute -top-6 -right-6 w-[1px] h-10 bg-slate-400"></div>
      <div className="absolute -bottom-6 -left-6 w-10 h-[1px] bg-slate-400"></div>
      <div className="absolute -bottom-6 -left-6 w-[1px] h-10 bg-slate-400"></div>
      <div className="absolute -bottom-6 -right-6 w-10 h-[1px] bg-slate-400"></div>
      <div className="absolute -bottom-6 -right-6 w-[1px] h-10 bg-slate-400"></div>

      {/* Card Container (com Bleed de 20px) */}
      <div className="relative w-[840px] h-[490px] bg-white shadow-2xl overflow-hidden border border-red-200/50 rounded-sm cursor-default">
        <div className="absolute inset-0 border-2 border-dashed border-red-400/30 pointer-events-none z-50"></div>
        <div className="absolute inset-[20px] bg-white border border-slate-100 flex overflow-hidden">
          <div className="absolute inset-4 border border-dashed border-primary/20 pointer-events-none z-50 rounded"></div>
          {side === 'front' ? <RenderFront /> : <RenderBack />}
        </div>
      </div>
      <p className="text-center mt-4 text-xs font-bold text-slate-400 uppercase tracking-widest">
        {side === 'front' ? 'Frente (Anverso)' : 'Verso (Reverso)'}
      </p>
    </div>
  );

  return (
    <div className="flex flex-col items-center gap-8">
      <div className="bg-primary/5 border border-primary/20 p-4 rounded-xl max-w-[800px] text-center">
        <h4 className="text-sm font-bold text-primary flex items-center justify-center gap-2 mb-1">
          <span className="material-symbols-outlined text-lg">print</span>
          Editor Físico Interativo ({template.charAt(0).toUpperCase() + template.slice(1)})
        </h4>
        <p className="text-[10px] text-slate-500 leading-tight uppercase tracking-wider">
          Layout de impressão <strong>90x50mm</strong> com sangria e margens técnicas.
        </p>
      </div>

      <div className="flex flex-col gap-12 items-center justify-center">
        <CardFace side="front" />
        <CardFace side="back" />
      </div>
    </div>
  );
}
