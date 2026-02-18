'use client';
import type { CardData } from '@/lib/types';
import React from 'react';
import { formatHref, shareCard } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import SocialIcon from '@/components/social-icon';

export default function ProfessionalsPreview({ cardData }: { cardData: CardData }) {
    const { fullName, jobTitle, bio, avatarUrl, isVerified, links, stats, themeColor, vCardUrl } = cardData;
    const { toast } = useToast();

    const contactLink = links.find(l => l.type === 'email' || l.type === 'whatsapp' || l.type === 'website');
    const actionHref = contactLink ? formatHref(contactLink.type, contactLink.value) : '#';

    const handleShare = async () => {
        const result = await shareCard(
            `Portfólio Digital - ${fullName}`,
            `Confira o trabalho de ${fullName}`,
            window.location.href
        );
        if (result.success && result.method === 'clipboard') {
            toast({ title: "Link copiado!", description: "O link do cartão foi copiado para sua área de transferência." });
        }
    };

    return (
        <div className="bg-white dark:bg-[#1c1b2b] font-display text-[#121117] antialiased h-full flex flex-col overflow-hidden relative">
            {/* Sticky Top Bar - Absolute within frame */}
            <div className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between bg-white/80 px-4 py-4 backdrop-blur-md dark:bg-[#1c1b2b]/80 border-b border-slate-100 dark:border-slate-800">
                <button className="flex size-10 items-center justify-center rounded-full bg-slate-50 text-[#121117] dark:bg-primary/10 dark:text-white">
                    <span className="material-symbols-outlined text-[22px]">arrow_back</span>
                </button>
                <h1 className="text-sm font-semibold uppercase tracking-widest text-[#656487] dark:text-gray-400">Portfólio</h1>
                <button 
                    onClick={handleShare}
                    className="flex size-10 items-center justify-center rounded-full bg-slate-50 text-[#121117] dark:bg-primary/10 dark:text-white hover:bg-slate-100 transition-colors"
                >
                    <span className="material-symbols-outlined text-[22px]">share</span>
                </button>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto no-scrollbar pt-20 pb-32">
                {/* Profile Header Section */}
                <div className="flex flex-col items-center px-6 pt-6 pb-8">
                    <div className="relative mb-4">
                        <div className="size-32 overflow-hidden rounded-full border-4 border-white ring-2 ring-primary/20 shadow-xl">
                          <img src={avatarUrl} alt={fullName} className="h-full w-full object-cover" />
                        </div>
                        {isVerified && (
                            <div className="absolute bottom-1 right-1 flex size-8 items-center justify-center rounded-full bg-primary text-white shadow-lg ring-4 ring-white">
                                <span className="material-symbols-outlined text-[18px] font-bold" style={{fontVariationSettings: "'FILL' 1"}}>verified</span>
                            </div>
                        )}
                    </div>
                    <div className="text-center">
                        <h2 className="text-2xl font-bold tracking-tight text-[#121117] dark:text-white">{fullName}</h2>
                        <p className="mt-1 text-sm font-medium" style={{color: themeColor}}>{jobTitle}</p>
                        <div className="mt-2 flex items-center justify-center gap-1 text-xs font-semibold text-[#656487] dark:text-gray-400">
                            <span className="material-symbols-outlined text-xs">location_on</span>
                            <span>São Paulo, Brasil</span>
                        </div>
                        <p className="mt-4 text-sm text-slate-500 dark:text-slate-400 leading-relaxed max-w-[300px] mx-auto">
                            {bio}
                        </p>
                    </div>
                    <div className="mt-6 flex w-full gap-3">
                        <a 
                            href={actionHref}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex flex-1 items-center justify-center gap-2 rounded-xl py-3.5 text-sm font-bold text-white transition-opacity hover:opacity-90 shadow-lg text-center" 
                            style={{backgroundColor: themeColor}}
                        >
                            <span className="material-symbols-outlined text-sm">mail</span>
                            Solicitar Orçamento
                        </a>
                        <a 
                            href={vCardUrl || '#'}
                            className="flex size-[52px] items-center justify-center rounded-xl border border-primary/20 bg-primary/5 text-primary"
                        >
                            <span className="material-symbols-outlined">person_add</span>
                        </a>
                    </div>
                </div>

                {/* Stats Overview */}
                <div className="mx-6 mb-8 flex items-center justify-around rounded-2xl bg-slate-50 dark:bg-white/5 py-4 border border-slate-100 dark:border-slate-800">
                    {stats && stats.map((stat, index) => (
                        <React.Fragment key={index}>
                            <div className="text-center px-2">
                                <p className="text-xl font-bold text-[#121117] dark:text-white">{stat.value}</p>
                                <p className="text-[10px] font-bold uppercase tracking-wider text-[#656487] dark:text-gray-400 whitespace-nowrap">{stat.label}</p>
                            </div>
                            {index < stats.length - 1 && <div className="h-8 w-px bg-slate-200 dark:bg-white/10"></div>}
                        </React.Fragment>
                    ))}
                </div>

                {/* Expertise Tags */}
                <div className="px-6 mb-8">
                    <h3 className="mb-4 text-xs font-bold uppercase tracking-widest text-[#656487] dark:text-gray-400">Especialidades</h3>
                    <div className="flex flex-wrap gap-2">
                        {['Consultoria', 'Design Minimalista', 'Estratégia'].map(tag => (
                            <span key={tag} className="rounded-lg bg-primary/10 px-3 py-1.5 text-xs font-semibold text-primary">{tag}</span>
                        ))}
                    </div>
                </div>

                {/* Links Section */}
                <div className="px-6 mb-8 space-y-3">
                    <h3 className="text-xs font-bold uppercase tracking-widest text-[#656487] dark:text-gray-400">Links Rápidos</h3>
                    {links.map(link => (
                        <a 
                            key={link.id} 
                            href={formatHref(link.type, link.value)} 
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-between p-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700 shadow-sm hover:border-primary/50 transition-colors"
                        >
                            <div className="flex items-center gap-3">
                                <SocialIcon type={link.type} icon={link.icon} className="text-lg" style={{color: link.color || themeColor}} />
                                <span className="text-sm font-semibold">{link.label}</span>
                            </div>
                            <span className="material-symbols-outlined text-slate-300 text-sm">chevron_right</span>
                        </a>
                    ))}
                </div>

                {/* Portfolio Grid Section */}
                <div className="px-6 pb-12">
                    <div className="mb-5 flex items-center justify-between">
                        <h3 className="text-xs font-bold uppercase tracking-widest text-[#656487] dark:text-gray-400">Destaques</h3>
                        <button className="text-xs font-bold text-primary">Ver todos</button>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        {[1, 2, 3, 4].map(i => (
                            <div key={i} className="group relative overflow-hidden rounded-2xl bg-gray-100 aspect-square">
                                <img className="w-full h-full object-cover transition-transform group-hover:scale-110" src={`https://picsum.photos/seed/prof${i}/300/300`} alt="Portfolio" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Floating Navigation - Absolute bottom */}
            <div className="absolute bottom-6 left-1/2 flex w-max -translate-x-1/2 items-center gap-2 rounded-full bg-white/90 p-2 shadow-2xl backdrop-blur-xl ring-1 ring-black/5 dark:bg-[#1c1b2b]/90 z-50">
                <button className="flex size-12 items-center justify-center rounded-full bg-primary text-white">
                    <span className="material-symbols-outlined">person</span>
                </button>
                <button className="flex size-12 items-center justify-center rounded-full text-[#656487] dark:text-gray-400">
                    <span className="material-symbols-outlined">grid_view</span>
                </button>
                <button className="flex size-12 items-center justify-center rounded-full text-[#656487] dark:text-gray-400">
                    <span className="material-symbols-outlined">collections_bookmark</span>
                </button>
            </div>
        </div>
    );
}