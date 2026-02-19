
'use client';
import type { CardData } from '@/lib/types';
import type { Dispatch, SetStateAction } from 'react';
import DigitalCardPreview from '@/components/digital-card-preview';
import { useToast } from '@/hooks/use-toast';
import React, { useRef } from 'react';

type EditableCardPreviewProps = {
    cardData: CardData;
    setCardData: Dispatch<SetStateAction<CardData>>;
    selectedLinkId: string | null;
    setSelectedLinkId: Dispatch<SetStateAction<string | null>>;
    setActiveTool: (toolId: string) => void;
};

/**
 * @fileOverview Wrapper editável para o DigitalCardPreview.
 * Adiciona uma camada de interatividade (clique para editar) sobre o preview real.
 */
export default function EditableCardPreview({ 
    cardData, 
    setCardData, 
    setSelectedLinkId, 
    setActiveTool 
}: EditableCardPreviewProps) {
    const { toast } = useToast();
    const avatarInputRef = useRef<HTMLInputElement>(null);
    const bannerInputRef = useRef<HTMLInputElement>(null);

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, field: 'avatarUrl' | 'bannerUrl') => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (file.size > 2 * 1024 * 1024) {
            toast({
                variant: "destructive",
                title: "Arquivo muito grande",
                description: "Por favor, escolha uma imagem de até 2MB."
            });
            return;
        }

        const reader = new FileReader();
        reader.onloadend = () => {
            const base64String = reader.result as string;
            setCardData(prev => ({ ...prev, [field]: base64String }));
            toast({
                title: "Upload concluído!",
                description: `Sua ${field === 'avatarUrl' ? 'foto de perfil' : 'imagem de capa'} foi atualizada.`
            });
        };
        reader.readAsDataURL(file);
    };

    return (
        <div className="w-full h-full relative group flex flex-col overflow-hidden">
            {/* O Preview REAL que o usuário final verá */}
            <div className="flex-1 h-full overflow-hidden">
                <DigitalCardPreview cardData={cardData} />
            </div>
            
            {/* Inputs ocultos para upload direto */}
            <input type="file" ref={avatarInputRef} className="hidden" accept="image/*" onChange={(e) => handleImageUpload(e, 'avatarUrl')} />
            <input type="file" ref={bannerInputRef} className="hidden" accept="image/*" onChange={(e) => handleImageUpload(e, 'bannerUrl')} />

            {/* Overlay de Edição - Mapeia áreas do preview para ferramentas do editor */}
            {/* Usamos pointer-events-none no container e auto nas áreas para permitir scroll entre elas */}
            <div className="absolute inset-0 z-50 pointer-events-none flex flex-col">
                <div className="flex-1 min-h-0 overflow-y-auto no-scrollbar scroll-smooth">
                    <div className="min-h-full w-full relative">
                        {/* Zona 1: Foto e Capa (Topo) */}
                        <div 
                            onClick={(e) => { 
                                e.stopPropagation(); 
                                setActiveTool('imagens');
                                avatarInputRef.current?.click();
                            }}
                            className="absolute top-0 left-0 w-full h-[25%] cursor-pointer pointer-events-auto group/edit"
                        >
                            <div className="absolute top-4 left-4 bg-primary text-white px-2 py-1 rounded-full opacity-0 group-hover/edit:opacity-100 shadow-xl transition-all flex items-center gap-2 border border-white/20 backdrop-blur-md">
                                <span className="material-symbols-outlined text-xs">photo_camera</span>
                                <span className="text-[8px] font-bold uppercase tracking-wider">Mídia</span>
                            </div>
                        </div>

                        {/* Zona 2: Identidade (Nome, Cargo, Bio) */}
                        <div 
                            onClick={(e) => { e.stopPropagation(); setActiveTool('conteudo'); }}
                            className="absolute top-[25%] left-0 w-full h-[20%] cursor-pointer pointer-events-auto group/edit"
                        >
                             <div className="absolute top-4 left-4 bg-primary text-white px-2 py-1 rounded-full opacity-0 group-hover/edit:opacity-100 shadow-xl transition-all flex items-center gap-2 border border-white/20 backdrop-blur-md">
                                <span className="material-symbols-outlined text-xs">edit</span>
                                <span className="text-[8px] font-bold uppercase tracking-wider">Perfil</span>
                            </div>
                        </div>

                        {/* Zona 3: Métricas / Stats (Meio) */}
                        <div 
                            onClick={(e) => { e.stopPropagation(); setActiveTool('conteudo'); }}
                            className="absolute top-[45%] left-0 w-full h-[15%] cursor-pointer pointer-events-auto group/edit"
                        >
                            <div className="absolute top-4 left-4 bg-primary text-white px-2 py-1 rounded-full opacity-0 group-hover/edit:opacity-100 shadow-xl transition-all flex items-center gap-2 border border-white/20 backdrop-blur-md">
                                <span className="material-symbols-outlined text-xs">insights</span>
                                <span className="text-[8px] font-bold uppercase tracking-wider">Métricas</span>
                            </div>
                        </div>

                        {/* Zona 4: Links (Base) */}
                        <div 
                            onClick={(e) => { e.stopPropagation(); setActiveTool('social'); }}
                            className="absolute top-[60%] left-0 w-full min-h-[30%] cursor-pointer pointer-events-auto group/edit"
                        >
                            <div className="absolute top-4 left-4 bg-primary text-white px-2 py-1 rounded-full opacity-0 group-hover/edit:opacity-100 shadow-xl transition-all flex items-center gap-2 border border-white/20 backdrop-blur-md">
                                <span className="material-symbols-outlined text-xs">share</span>
                                <span className="text-[8px] font-bold uppercase tracking-wider">Links</span>
                            </div>
                        </div>

                        {/* Zona 5: QR Code (Fim) */}
                        <div 
                            onClick={(e) => { e.stopPropagation(); setActiveTool('qrcode'); }}
                            className="absolute bottom-0 left-0 w-full h-[10%] cursor-pointer pointer-events-auto group/edit"
                        >
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
