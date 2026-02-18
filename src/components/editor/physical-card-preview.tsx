
'use client';
import type { CardData } from '@/lib/types';
import Image from 'next/image';

type PhysicalCardPreviewProps = {
  cardData: CardData;
};

export default function PhysicalCardPreview({ cardData }: PhysicalCardPreviewProps) {
  const { fullName, jobTitle, themeColor, qrCodeUrl, avatarUrl } = cardData;

  // Dimensões do cartão de visita padrão (aprox 3.5:2 ratio)
  // Em pixels para o preview: 800x450
  // Sangria: 20px extra em cada lado
  
  return (
    <div className="flex flex-col items-center gap-8">
      {/* Informações de Ajuda */}
      <div className="bg-primary/5 border border-primary/20 p-4 rounded-xl max-w-[600px] text-center mb-4">
        <h4 className="text-sm font-bold text-primary flex items-center justify-center gap-2 mb-1">
          <span className="material-symbols-outlined text-lg">print</span>
          Modo de Impressão (Suporte Técnico)
        </h4>
        <p className="text-[11px] text-slate-500 leading-relaxed">
          Visualizando gabarito de impressão padrão (9x5cm). As linhas externas indicam a <strong className="text-red-400">Sangria (Bleed)</strong>, 
          as marcas de canto são as <strong className="text-slate-800">Guias de Corte</strong> e o tracejado azul é a <strong className="text-primary">Margem de Segurança</strong>.
        </p>
      </div>

      <div className="relative">
        {/* Guias de Corte (Crop Marks) */}
        {/* Top-Left */}
        <div className="absolute -top-6 -left-6 w-10 h-[1px] bg-slate-400"></div>
        <div className="absolute -top-6 -left-6 w-[1px] h-10 bg-slate-400"></div>
        {/* Top-Right */}
        <div className="absolute -top-6 -right-6 w-10 h-[1px] bg-slate-400"></div>
        <div className="absolute -top-6 -right-6 w-[1px] h-10 bg-slate-400"></div>
        {/* Bottom-Left */}
        <div className="absolute -bottom-6 -left-6 w-10 h-[1px] bg-slate-400"></div>
        <div className="absolute -bottom-6 -left-6 w-[1px] h-10 bg-slate-400"></div>
        {/* Bottom-Right */}
        <div className="absolute -bottom-6 -right-6 w-10 h-[1px] bg-slate-400"></div>
        <div className="absolute -bottom-6 -right-6 w-[1px] h-10 bg-slate-400"></div>

        {/* Card Container (com Bleed) */}
        <div className="relative w-[840px] h-[490px] bg-white shadow-2xl overflow-hidden border border-red-200/50">
          
          {/* Background do Tema na Sangria */}
          <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundColor: themeColor }}></div>
          
          {/* Bleed Guide (Borda Vermelha) */}
          <div className="absolute inset-0 border-2 border-dashed border-red-400/30 pointer-events-none z-50"></div>
          
          {/* Área Real do Cartão (Após Corte) */}
          <div className="absolute inset-[20px] bg-white shadow-inner border border-slate-100 flex overflow-hidden">
            
            {/* Margem de Segurança (Tracejado Azul) */}
            <div className="absolute inset-4 border border-dashed border-primary/20 pointer-events-none z-50 rounded"></div>

            {/* Design do Cartão Físico */}
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
                      "Digital identity for the physical world. Scan the QR code to connect with me instantly."
                    </p>
                  </div>
                </div>

                <div className="flex flex-col items-end gap-2">
                   <div className="size-24 rounded-full border-4 border-slate-50 shadow-md overflow-hidden bg-slate-100">
                    <img src={avatarUrl} className="w-full h-full object-cover" alt="Avatar" />
                  </div>
                   <div className="bg-primary/10 text-primary text-[8px] font-bold px-2 py-0.5 rounded-full uppercase tracking-tighter">Verified Pro</div>
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

                <div className="flex flex-col items-center gap-2 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                  {qrCodeUrl && <img src={qrCodeUrl} className="size-20" alt="QR Code" />}
                  <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Scan for Profile</span>
                </div>
              </div>
            </div>

            {/* Accent Pattern (Rodapé) */}
            <div className="absolute bottom-0 left-0 w-full h-1" style={{ backgroundColor: themeColor }}></div>
          </div>
        </div>
      </div>
    </div>
  );
}
