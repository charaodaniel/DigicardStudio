'use client';
import type { CardData } from '@/lib/types';
import Image from 'next/image';

export default function DiscordPreview({ cardData }: { cardData: CardData }) {
    const { fullName, jobTitle, bio, avatarUrl, isVerified, links, themeColor } = cardData;

    return (
        <div className="bg-[#1E1F22] text-white min-h-full font-display flex flex-col items-center p-4 overflow-y-auto no-scrollbar">
            <div className="w-full max-w-md rounded-lg overflow-hidden shadow-2xl border border-black/20 bg-[#313338]">
                {/* Banner */}
                <div 
                    className="relative h-28 w-full bg-primary" 
                    style={{ 
                        backgroundColor: themeColor,
                        backgroundImage: `linear-gradient(rgba(0,0,0,0.1), rgba(0,0,0,0.3)), url('https://picsum.photos/seed/discord-banner/600/200')`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                    }}
                >
                    <div className="absolute top-3 right-3 flex items-center gap-2 bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/10">
                        <span className="material-symbols-outlined text-[12px] text-white">style</span>
                        <span className="text-[8px] font-bold tracking-wider uppercase">DigiCard Web</span>
                    </div>
                </div>

                {/* Header Content */}
                <div className="px-4 pb-4">
                    <div className="relative flex justify-between items-end -mt-12 mb-4">
                        {/* Avatar with Status */}
                        <div className="relative">
                            <div className="size-20 rounded-full border-[6px] border-[#313338] bg-[#2B2D31] overflow-hidden">
                                <img alt={fullName} className="w-full h-full object-cover" src={avatarUrl} />
                            </div>
                            <div className="absolute bottom-0.5 right-0.5 size-5 bg-[#313338] rounded-full flex items-center justify-center">
                                <div className="size-3.5 bg-[#23A55A] rounded-full border-2 border-[#313338]"></div>
                            </div>
                        </div>
                        {/* Badges */}
                        <div className="flex gap-1 bg-[#2B2D31] p-1.5 rounded-lg border border-white/5 mb-1">
                            {isVerified && (
                                <div className="text-primary" title="Verificado">
                                    <span className="material-symbols-outlined !text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
                                </div>
                            )}
                            <div className="text-[#f47fff]" title="Premium">
                                <span className="material-symbols-outlined !text-[18px]">workspace_premium</span>
                            </div>
                            <div className="text-white/80" title="Early Supporter">
                                <span className="material-symbols-outlined !text-[18px]">military_tech</span>
                            </div>
                        </div>
                    </div>

                    {/* User Info */}
                    <div className="bg-[#2B2D31] rounded-lg p-4 border border-black/10">
                        <div className="flex flex-col gap-0.5">
                            <h1 className="text-lg font-bold flex items-center gap-1.5">
                                {fullName}
                                <span className="font-medium text-[#B5BAC1] text-sm">#2024</span>
                            </h1>
                            <p className="text-xs text-white/80 font-medium italic">"{jobTitle}"</p>
                        </div>
                        <div className="h-[1px] bg-white/5 my-3"></div>
                        <div className="space-y-3">
                            <div>
                                <h3 className="text-[9px] font-bold uppercase tracking-wider mb-1 text-[#B5BAC1]">Sobre Mim</h3>
                                <p className="text-xs text-white/90 leading-relaxed">
                                    {bio}
                                </p>
                            </div>
                            <div>
                                <h3 className="text-[9px] font-bold uppercase tracking-wider mb-1 text-[#B5BAC1]">Membro Desde</h3>
                                <div className="flex items-center gap-1.5 text-xs text-white/80">
                                    <span className="material-symbols-outlined !text-[14px]">calendar_today</span>
                                    <span>Março de 2021</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Connected Accounts */}
                    <div className="mt-4">
                        <h3 className="text-[9px] font-bold uppercase tracking-wider mb-2 px-1 text-[#B5BAC1]">Contas Conectadas</h3>
                        <div className="grid grid-cols-1 gap-2">
                            {links.map(link => (
                                <a key={link.id} className="flex items-center justify-between p-2.5 bg-[#2B2D31] hover:bg-white/5 rounded-lg border border-white/5 transition-colors group" href="#">
                                    <div className="flex items-center gap-3">
                                        <div className="size-7 rounded bg-white/5 flex items-center justify-center">
                                            <span className="material-symbols-outlined text-sm" style={{ color: link.color || themeColor }}>{link.icon}</span>
                                        </div>
                                        <span className="text-xs font-medium">{link.label}</span>
                                    </div>
                                    <span className="material-symbols-outlined text-white/20 group-hover:text-white/60 !text-sm">open_in_new</span>
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="mt-6 flex flex-col gap-2">
                        <button className="w-full bg-[#5865F2] hover:bg-[#4752C4] text-white font-bold py-2.5 rounded transition-all shadow-lg active:scale-95 text-sm" style={{ backgroundColor: themeColor }}>
                            Adicionar aos Contatos
                        </button>
                        <button className="w-full bg-white/10 hover:bg-white/20 text-white font-bold py-2.5 rounded transition-all text-sm flex items-center justify-center gap-2">
                            <span className="material-symbols-outlined text-sm">share</span>
                            Compartilhar
                        </button>
                    </div>
                </div>

                {/* Status Bar */}
                <div className="bg-[#2B2D31] px-4 py-2 flex items-center justify-between text-[9px] font-bold uppercase tracking-widest border-t border-black/10 text-[#B5BAC1]">
                    <div className="flex items-center gap-2">
                        <span className="size-1.5 bg-[#23A55A] rounded-full animate-pulse"></span>
                        Disponível
                    </div>
                    <div className="flex items-center gap-1 opacity-50">
                        <span className="material-symbols-outlined !text-[12px]">lock</span>
                        Criptografado
                    </div>
                </div>
            </div>
        </div>
    );
}
