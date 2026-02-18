'use client';
import type { CardData } from '@/lib/types';
import type { Dispatch, SetStateAction } from 'react';
import Image from 'next/image';

type EditableCardPreviewProps = {
    cardData: CardData;
    selectedLinkId: string | null;
    setSelectedLinkId: Dispatch<SetStateAction<string | null>>;
    setActiveTool: (toolId: string) => void;
};

export default function EditableCardPreview({ cardData, selectedLinkId, setSelectedLinkId, setActiveTool }: EditableCardPreviewProps) {
    const { avatarUrl, fullName, jobTitle, isVerified, links, qrCodeUrl, themeColor } = cardData;

    return (
        <>
            {/* Foto de Perfil - Ao clicar abre ferramenta de Imagens */}
            <div 
                onClick={() => setActiveTool('imagens')}
                className="relative group cursor-pointer transition-transform hover:scale-105"
            >
                <Image 
                    className="w-28 h-28 rounded-full object-cover border-4 border-white dark:border-slate-800 shadow-xl" 
                    src={avatarUrl}
                    alt="Foto de perfil"
                    width={112}
                    height={112}
                />
                <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 rounded-full flex items-center justify-center transition-opacity border-2 border-primary">
                    <span className="material-symbols-outlined text-white">edit</span>
                </div>
            </div>

            {/* Nome e Cargo - Ao clicar abre ferramenta de Conteúdo */}
            <div 
                onClick={() => setActiveTool('conteudo')}
                className="mt-6 flex flex-col items-center gap-1 cursor-pointer border-2 border-transparent hover:border-primary/40 p-1 rounded-lg transition-colors text-center"
            >
                <div className="flex items-center gap-2">
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white">{fullName}</h2>
                    {isVerified && <span className="material-symbols-outlined text-primary text-xl" style={{fontVariationSettings: "'FILL' 1", color: themeColor}}>verified</span>}
                </div>
                <p className="text-slate-500 dark:text-slate-400 font-medium text-sm">{jobTitle}</p>
            </div>
            
            <div className="flex items-center gap-1 text-slate-400 text-xs mt-1">
                <span className="material-symbols-outlined text-xs">location_on</span>
                <span>São Paulo, Brasil</span>
            </div>

            {/* Links - Ao clicar seleciona o link e abre ferramenta Social */}
            <div className="w-full mt-10 space-y-3">
                {links.map((link) => (
                     <button 
                        key={link.id} 
                        onClick={() => {
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
                            <span className="material-symbols-outlined">{link.icon}</span>
                        </div>
                        <span className="font-bold text-slate-800 dark:text-slate-200">{link.label}</span>
                        <span className="material-symbols-outlined ml-auto text-slate-400">chevron_right</span>
                    </button>
                ))}
            </div>

            {/* QR Code - Ao clicar abre ferramenta QR Code */}
            {qrCodeUrl && (
                <div 
                    onClick={() => setActiveTool('qrcode')}
                    className="mt-12 flex flex-col items-center cursor-pointer group"
                >
                    <div className="p-3 bg-white rounded-xl shadow-sm mb-4 border border-slate-100 group-hover:border-primary transition-colors">
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
        </>
    );
}
