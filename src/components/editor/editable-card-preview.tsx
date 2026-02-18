'use client';
import type { CardData } from '@/lib/types';
import type { Dispatch, SetStateAction } from 'react';
import Image from 'next/image';
import DigitalCardPreview from '@/components/digital-card-preview';
import { cn } from '@/lib/utils';
import SocialIcon from '@/components/social-icon';

type EditableCardPreviewProps = {
    cardData: CardData;
    selectedLinkId: string | null;
    setSelectedLinkId: Dispatch<SetStateAction<string | null>>;
    setActiveTool: (toolId: string) => void;
};

export default function EditableCardPreview({ cardData, selectedLinkId, setSelectedLinkId, setActiveTool }: EditableCardPreviewProps) {
    const { avatarUrl, fullName, jobTitle, isVerified, links, qrCodeUrl, themeColor, template } = cardData;

    // Overlay para templates não-padrão para permitir edição de áreas específicas
    if (template !== 'default') {
        return (
            <div className="w-full h-full relative group overflow-hidden flex flex-col">
                <DigitalCardPreview cardData={cardData} />
                
                {/* Overlay de Edição Inteligente - Camada de Interatividade do Editor */}
                <div className="absolute inset-0 z-50 pointer-events-none">
                    <div className="h-full w-full relative">
                        {/* Zona 1: Foto e Capa (Topo) */}
                        <div 
                            onClick={(e) => { e.stopPropagation(); setActiveTool('imagens'); }}
                            className="absolute top-0 left-0 w-full h-[25%] cursor-pointer pointer-events-auto group/edit"
                        >
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary text-white px-3 py-1.5 rounded-full opacity-0 group-hover/edit:opacity-100 shadow-xl transition-all flex items-center gap-2 border border-white/20 backdrop-blur-md">
                                <span className="material-symbols-outlined text-sm">photo_camera</span>
                                <span className="text-[10px] font-bold uppercase tracking-wider">Editar Imagens</span>
                            </div>
                        </div>

                        {/* Zona 2: Identidade (Nome, Cargo, Bio) */}
                        <div 
                            onClick={(e) => { e.stopPropagation(); setActiveTool('conteudo'); }}
                            className="absolute top-[25%] left-0 w-full h-[20%] cursor-pointer pointer-events-auto group/edit"
                        >
                             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary text-white px-3 py-1.5 rounded-full opacity-0 group-hover/edit:opacity-100 shadow-xl transition-all flex items-center gap-2 border border-white/20 backdrop-blur-md">
                                <span className="material-symbols-outlined text-sm">edit</span>
                                <span className="text-[10px] font-bold uppercase tracking-wider">Editar Perfil</span>
                            </div>
                        </div>

                        {/* Zona 3: Métricas / Stats (Meio) */}
                        <div 
                            onClick={(e) => { e.stopPropagation(); setActiveTool('conteudo'); }}
                            className="absolute top-[45%] left-0 w-full h-[15%] cursor-pointer pointer-events-auto group/edit"
                        >
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary text-white px-3 py-1.5 rounded-full opacity-0 group-hover/edit:opacity-100 shadow-xl transition-all flex items-center gap-2 border border-white/20 backdrop-blur-md">
                                <span className="material-symbols-outlined text-sm">insights</span>
                                <span className="text-[10px] font-bold uppercase tracking-wider">Editar Métricas</span>
                            </div>
                        </div>

                        {/* Zona 4: Links (Base) */}
                        <div 
                            onClick={(e) => { e.stopPropagation(); setActiveTool('social'); }}
                            className="absolute top-[60%] left-0 w-full h-[30%] cursor-pointer pointer-events-auto group/edit"
                        >
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary text-white px-3 py-1.5 rounded-full opacity-0 group-hover/edit:opacity-100 shadow-xl transition-all flex items-center gap-2 border border-white/20 backdrop-blur-md">
                                <span className="material-symbols-outlined text-sm">share</span>
                                <span className="text-[10px] font-bold uppercase tracking-wider">Editar Links</span>
                            </div>
                        </div>

                        {/* Zona 5: QR Code (Rodapé extremo) */}
                        <div 
                            onClick={(e) => { e.stopPropagation(); setActiveTool('qrcode'); }}
                            className="absolute bottom-0 left-0 w-full h-[10%] cursor-pointer pointer-events-auto group/edit"
                        >
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // Template Padrão com edição direta e visual no canvas
    return (
        <div className="w-full h-full flex flex-col items-center pt-12 pb-8 px-6 overflow-y-auto no-scrollbar">
            {/* Foto de Perfil - Ao clicar abre ferramenta de Imagens */}
            <div 
                onClick={(e) => { e.stopPropagation(); setActiveTool('imagens'); }}
                className="relative group cursor-pointer transition-transform hover:scale-105 shrink-0"
            >
                <div className="relative">
                    <Image 
                        className="w-28 h-28 rounded-full object-cover border-4 border-white dark:border-slate-800 shadow-xl bg-slate-100" 
                        src={avatarUrl}
                        alt="Foto de perfil"
                        width={112}
                        height={112}
                    />
                    <div className="absolute inset-0 bg-primary/40 opacity-0 group-hover:opacity-100 rounded-full flex flex-col items-center justify-center transition-opacity border-2 border-primary backdrop-blur-[2px]">
                        <span className="material-symbols-outlined text-white text-3xl">photo_camera</span>
                        <span className="text-white text-[10px] font-black uppercase mt-1">Alterar Foto</span>
                    </div>
                </div>
            </div>

            {/* Nome e Cargo - Ao clicar abre ferramenta de Conteúdo */}
            <div 
                onClick={(e) => { e.stopPropagation(); setActiveTool('conteudo'); }}
                className="mt-6 flex flex-col items-center gap-1 cursor-pointer border-2 border-transparent hover:border-primary/40 hover:bg-primary/5 p-2 rounded-xl transition-all text-center group shrink-0"
                title="Editar Nome e Título"
            >
                <div className="flex items-center gap-2">
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white group-hover:text-primary transition-colors">{fullName}</h2>
                    {isVerified && <span className="material-symbols-outlined text-primary text-xl" style={{fontVariationSettings: "'FILL' 1", color: themeColor}}>verified</span>}
                </div>
                <p className="text-slate-500 dark:text-slate-400 font-medium text-sm group-hover:text-primary/70 transition-colors">{jobTitle}</p>
            </div>
            
            {/* Métricas (Default Template) */}
            <div 
                onClick={(e) => { e.stopPropagation(); setActiveTool('conteudo'); }}
                className="mt-6 flex gap-6 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/50 p-3 rounded-xl transition-colors border-2 border-transparent hover:border-primary/20"
            >
                {cardData.stats.map((stat, i) => (
                    <div key={i} className="text-center">
                        <p className="text-lg font-bold text-slate-900 dark:text-white">{stat.value}</p>
                        <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">{stat.label}</p>
                    </div>
                ))}
            </div>

            {/* Links - Ao clicar seleciona o link e abre ferramenta Social */}
            <div className="w-full mt-8 space-y-3 shrink-0">
                {links.map((link) => (
                     <button 
                        key={link.id} 
                        onClick={(e) => {
                            e.stopPropagation();
                            setSelectedLinkId(link.id);
                            setActiveTool('social');
                        }}
                        className={`w-full h-14 bg-slate-100 dark:bg-slate-800/50 rounded-2xl flex items-center px-5 gap-4 border-2 transition-all hover:scale-[1.02] ${
                            selectedLinkId === link.id 
                            ? 'border-primary shadow-md' 
                            : 'border-transparent hover:border-primary/20'
                        }`}
                    >
                        <div 
                            className="w-10 h-10 rounded-xl flex items-center justify-center text-white" 
                            style={{
                                backgroundColor: link.color || themeColor,
                                boxShadow: selectedLinkId === link.id ? `0 4px 12px ${link.color || themeColor}44` : ''
                            }}
                        >
                            <SocialIcon type={link.type} icon={link.icon} className="text-xl" />
                        </div>
                        <span className="font-bold text-slate-800 dark:text-slate-200">{link.label}</span>
                        <span className="material-symbols-outlined ml-auto text-slate-400">chevron_right</span>
                    </button>
                ))}
            </div>

            {/* QR Code - Ao clicar abre ferramenta QR Code */}
            {qrCodeUrl && (
                <div 
                    onClick={(e) => { e.stopPropagation(); setActiveTool('qrcode'); }}
                    className="mt-12 flex flex-col items-center cursor-pointer group shrink-0 pb-8"
                    title="Configurar QR Code"
                >
                    <div className="p-3 bg-white rounded-xl shadow-sm mb-4 border border-slate-100 group-hover:border-primary group-hover:scale-110 transition-all">
                        <Image 
                            className="w-24 h-24" 
                            alt="QR Code" 
                            src={qrCodeUrl} 
                            width={96} 
                            height={96} 
                        />
                    </div>
                    <p className="text-[10px] text-slate-400 uppercase tracking-widest font-bold group-hover:text-primary transition-colors">Escaneie para salvar</p>
                </div>
            )}
        </div>
    );
}