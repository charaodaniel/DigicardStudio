'use client';
import type { CardData } from '@/lib/types';
import { formatHref } from '@/lib/utils';
import React from 'react';

export default function InstagramPreview({ cardData }: { cardData: CardData }) {
    const { fullName, bio, isVerified, avatarUrl, themeColor, stats, links } = cardData;
    
    const instagramLink = links.find(l => l.type === 'instagram' || l.type === 'website');
    const actionHref = instagramLink ? formatHref(instagramLink.type, instagramLink.value) : '#';

    return (
        <div className="relative h-full mx-auto w-full shadow-2xl flex flex-col bg-[#121121] text-white overflow-hidden">
            {/* Mesh Background */}
            <div className="absolute inset-0 opacity-30 pointer-events-none" style={{ backgroundImage: "radial-gradient(at 0% 0%, hsla(253,16%,7%,1) 0, transparent 50%), radial-gradient(at 50% 0%, hsla(225,39%,30%,1) 0, transparent 50%), radial-gradient(at 100% 0%, hsla(339,49%,30%,1) 0, transparent 50%)" }}></div>
            
            <div className="flex-1 overflow-y-auto no-scrollbar pb-24 relative z-10">
                <header className="relative pt-12 px-6 pb-6 flex flex-col items-center">
                    <div className="relative group">
                        <div className="absolute -inset-1 bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 rounded-full blur opacity-75"></div>
                        <div className="relative bg-[#121121] rounded-full p-1">
                            <div className="size-28 rounded-full bg-cover bg-center border-2 border-white/20" style={{ backgroundImage: `url('${avatarUrl}')` }}>
                            </div>
                        </div>
                    </div>
                    <div className="mt-4 text-center">
                        <div className="flex items-center justify-center gap-1">
                            <h1 className="text-xl font-bold tracking-tight">@{fullName.toLowerCase().replace(/\s/g, '_')}</h1>
                            {isVerified && <span className="material-symbols-outlined text-primary text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>}
                        </div>
                        <p className="text-white/80 text-sm mt-1 max-w-[280px]">{bio}</p>
                    </div>
                    {/* Stats Bar */}
                    <div className="flex gap-8 mt-6 py-3 px-6 bg-white/5 backdrop-blur-md rounded-xl border border-white/10">
                        {stats && stats.slice(0, 3).map((stat, i) => (
                            <React.Fragment key={i}>
                                <div className="text-center">
                                    <p className="text-lg font-bold text-white leading-none">{stat.value}</p>
                                    <p className="text-[10px] uppercase tracking-wider text-white/60 font-medium">{stat.label}</p>
                                </div>
                                {i < Math.min(stats.length, 3) - 1 && <div className="w-px h-8 bg-white/10"></div>}
                            </React.Fragment>
                        ))}
                    </div>
                </header>

                {/* Nova Seção de Conteúdo sobre o Blur */}
                <div className="relative mt-4">
                    {/* Grid de Fotos com Blur (Fundo) */}
                    <div className="absolute inset-0 px-1 opacity-40 blur-[3px] pointer-events-none">
                        <div className="grid grid-cols-3 gap-1 h-full">
                            {[...Array(12)].map((_, i) => (
                                <div key={i} className="aspect-square bg-cover bg-center bg-slate-800 rounded-sm" style={{ backgroundImage: `url('https://picsum.photos/seed/insta${i}/200')` }}></div>
                            ))}
                        </div>
                    </div>

                    {/* Links e Botões (Sobrepostos) */}
                    <div className="relative z-20 px-6 pt-8 pb-12 flex flex-col gap-4">
                        <a 
                            href={actionHref}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full h-14 bg-primary hover:bg-primary/90 text-white font-bold rounded-2xl shadow-xl transition-all flex items-center justify-center text-center text-base tracking-wide" 
                            style={{backgroundColor: themeColor, boxShadow: `0 8px 30px ${themeColor}44` }}
                        >
                            Trabalhe Comigo
                        </a>

                        <div className="grid grid-cols-1 gap-3">
                            {links.map(link => (
                                <a 
                                    key={link.id} 
                                    href={formatHref(link.type, link.value)} 
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-4 p-4 rounded-2xl bg-white/10 backdrop-blur-xl hover:bg-white/20 text-white font-semibold border border-white/10 transition-all group"
                                >
                                    <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${link.color || themeColor}22` }}>
                                        <span className="material-symbols-outlined text-xl" style={{ color: link.color || themeColor }}>{link.icon}</span>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-bold truncate">{link.label}</p>
                                        <p className="text-[10px] text-white/40 truncate font-mono">{link.value}</p>
                                    </div>
                                    <span className="material-symbols-outlined text-white/20 group-hover:text-white group-hover:translate-x-1 transition-all">chevron_right</span>
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Nav */}
            <nav className="bg-[#121121]/80 backdrop-blur-xl border-t border-white/10 flex justify-around items-center h-16 px-4 z-20 shrink-0">
                <span className="material-symbols-outlined text-white" style={{fontVariationSettings: "'FILL' 1"}}>home</span>
                <span className="material-symbols-outlined text-white/50">search</span>
                <div className="bg-primary rounded-lg p-1.5 shadow-lg"><span className="material-symbols-outlined text-white">add_box</span></div>
                <span className="material-symbols-outlined text-white/50">favorite</span>
                <div className="size-7 rounded-full border border-white/30 bg-cover bg-center" style={{backgroundImage: `url(${avatarUrl})`}}></div>
            </nav>
        </div>
    )
}
