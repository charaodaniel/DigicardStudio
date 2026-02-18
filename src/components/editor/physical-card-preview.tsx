'use client';
import type { CardData } from '@/lib/types';

type PhysicalCardPreviewProps = {
  cardData: CardData;
};

export default function PhysicalCardPreview({ cardData }: PhysicalCardPreviewProps) {
  const { fullName, jobTitle, themeColor, qrCodeUrl, avatarUrl } = cardData;

  // Design do Cartão (Face Comum)
  const CardFace = ({ side }: { side: 'front' | 'back' }) => (
    <div className="relative">
      {/* Guias de Corte (Crop Marks) */}
      <div className="absolute -top-6 -left-6 w-10 h-[1px] bg-slate-400"></div>
      <div className="absolute -top-6 -left-6 w-[1px] h-10 bg-slate-400"></div>
      <div className="absolute -top-6 -right-6 w-10 h-[1px] bg-slate-400"></div>
      <div className="absolute -top-6 -right-6 w-[1px] h-10 bg-slate-400"></div>
      <div className="absolute -bottom-6 -left-6 w-10 h-[1px] bg-slate-400"></div>
      <div className="absolute -bottom-6 -left-6 w-[1px] h-10 bg-slate-400"></div>
      <div className="absolute -bottom-6 -right-6 w-10 h-[1px] bg-slate-400"></div>
      <div className="absolute -bottom-6 -right-6 w-[1px] h-10 bg-slate-400"></div>

      {/* Card Container (com Bleed de 20px) */}
      <div className="relative w-[840px] h-[490px] bg-white shadow-2xl overflow-hidden border border-red-200/50 rounded-sm">
        
        {/* Sangria (Bleed Guide) */}
        <div className="absolute inset-0 border-2 border-dashed border-red-400/30 pointer-events-none z-50"></div>
        
        {/* Área Real do Cartão (Após Corte) */}
        <div className="absolute inset-[20px] bg-white border border-slate-100 flex overflow-hidden">
          
          {/* Margem de Segurança (Tracejado Azul) */}
          <div className="absolute inset-4 border border-dashed border-primary/20 pointer-events-none z-50 rounded"></div>

          {side === 'front' ? (
            /* CONTEÚDO FRENTE */
            <div className="flex-1 flex flex-col justify-between p-10 relative">
              <div className="flex justify-between items-start">
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-1.5 rounded-full" style={{ backgroundColor: themeColor }}></div>
                    <div>
                      <h2 className="text-3xl font-black text-slate-900 tracking-tight">{fullName}</h2>
                      <p className="text-sm font-bold uppercase tracking-[0.2em]" style={{ color: themeColor }}>{jobTitle}</p>
                    </div>
                  </div>
                  <div className="pt-4 max-w-[300px]">
                    <p className="text-[10px] text-slate-400 leading-relaxed italic">
                      "Identidade digital para o mundo físico. Escaneie para conectar-se instantaneamente."
                    </p>
                  </div>
                </div>

                <div className="flex flex-col items-end gap-2">
                   <div className="size-24 rounded-full border-4 border-slate-50 shadow-md overflow-hidden bg-slate-100">
                    <img src={avatarUrl} className="w-full h-full object-cover" alt="Avatar" />
                  </div>
                   <div className="bg-primary/10 text-primary text-[8px] font-bold px-2 py-0.5 rounded-full uppercase tracking-tighter">Perfil Verificado</div>
                </div>
              </div>

              <div className="flex justify-between items-end">
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-slate-500">
                    <span className="material-symbols-outlined text-sm">language</span>
                    <span className="text-[10px] font-bold">www.digicard.studio/{fullName.toLowerCase().replace(/\s/g, '')}</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-400">
                     <span className="material-symbols-outlined text-sm">verified_user</span>
                     <span className="text-[9px] font-medium tracking-wide">DESIGNED WITH DIGICARD STUDIO © 2024</span>
                  </div>
                </div>
                <div className="flex flex-col items-center gap-1">
                   <span className="text-[7px] font-black text-slate-300 uppercase tracking-widest">Face Principal</span>
                </div>
              </div>
              <div className="absolute bottom-0 left-0 w-full h-1" style={{ backgroundColor: themeColor }}></div>
            </div>
          ) : (
            /* CONTEÚDO VERSO */
            <div className="flex-1 flex flex-col items-center justify-center p-10 relative" style={{ backgroundColor: themeColor }}>
              {/* Pattern de fundo sutil */}
              <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '32px 32px' }}></div>
              
              <div className="relative z-10 flex flex-col items-center gap-6">
                <div className="bg-white p-6 rounded-[2.5rem] shadow-2xl scale-110">
                  {qrCodeUrl && <img src={qrCodeUrl} className="size-40" alt="QR Code Large" />}
                </div>
                <div className="text-center space-y-1">
                  <h3 className="text-white text-2xl font-black tracking-tighter uppercase">{fullName}</h3>
                  <p className="text-white/70 text-[10px] font-bold tracking-[0.3em] uppercase">Escaneie para salvar meu contato</p>
                </div>
              </div>

              {/* Marca D'água do Sistema */}
              <div className="absolute bottom-10 flex items-center gap-2 text-white/40">
                <span className="material-symbols-outlined text-sm">style</span>
                <span className="text-[10px] font-bold tracking-widest uppercase">DigiCard Studio</span>
              </div>
            </div>
          )}
        </div>
      </div>
      <p className="text-center mt-8 text-xs font-bold text-slate-400 uppercase tracking-widest">
        {side === 'front' ? 'Frente (Anverso)' : 'Verso (Reverso)'}
      </p>
    </div>
  );

  return (
    <div className="flex flex-col items-center gap-12 py-12">
      {/* Cabeçalho de Instruções */}
      <div className="bg-primary/5 border border-primary/20 p-6 rounded-2xl max-w-[800px] text-center">
        <h4 className="text-base font-bold text-primary flex items-center justify-center gap-2 mb-2">
          <span className="material-symbols-outlined text-xl">print</span>
          Gabarito Técnico de Impressão (90x50mm)
        </h4>
        <p className="text-xs text-slate-500 leading-relaxed max-w-[600px] mx-auto">
          As linhas externas indicam a <strong className="text-red-400">Sangria (Bleed)</strong> para evitar bordas brancas. 
          O tracejado azul é a <strong className="text-primary">Margem de Segurança</strong>. 
          Mantenha informações importantes dentro desta área.
        </p>
      </div>

      {/* Grid de Visualização das Duas Faces - Empilhadas Verticalmente */}
      <div className="flex flex-col gap-24 items-center justify-center">
        <CardFace side="front" />
        <CardFace side="back" />
      </div>
    </div>
  );
}
