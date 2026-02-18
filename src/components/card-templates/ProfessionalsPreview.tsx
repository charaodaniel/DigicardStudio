'use client';
import type { CardData } from '@/lib/types';
import Image from 'next/image';
import React from 'react';

export default function ProfessionalsPreview({ cardData }: { cardData: CardData }) {
    const { fullName, jobTitle, avatarUrl, isVerified, links } = cardData;

    const stats = [
        { label: 'Anos Exp.', value: '12' },
        { label: 'Projetos', value: '150+' },
        { label: 'Prêmios', value: '08' },
    ];
    
    return (
        <div className="bg-card font-display text-foreground antialiased h-full overflow-y-auto no-scrollbar">
            <div className="relative mx-auto min-h-full max-w-md bg-card">
                <div className="flex flex-col items-center px-6 pt-6 pb-8">
                    <div className="relative mb-4">
                        <div className="size-32 overflow-hidden rounded-full border-4 border-white ring-2 ring-primary/20">
                          <Image src={avatarUrl} alt={fullName} width={128} height={128} className="h-full w-full object-cover" />
                        </div>
                        {isVerified && (
                            <div className="absolute bottom-1 right-1 flex size-8 items-center justify-center rounded-full bg-primary text-white shadow-lg ring-4 ring-white">
                                <span className="material-symbols-outlined text-[18px] font-bold" style={{fontVariationSettings: "'FILL' 1"}}>verified</span>
                            </div>
                        )}
                    </div>
                    <div className="text-center">
                        <h2 className="text-2xl font-bold tracking-tight text-foreground">{fullName}</h2>
                        <p className="mt-1 text-sm font-medium text-primary">{jobTitle}</p>
                        <div className="mt-2 flex items-center justify-center gap-1 text-xs font-semibold text-muted-foreground">
                            <span className="material-symbols-outlined text-xs">location_on</span>
                            <span>São Paulo, Brasil</span>
                        </div>
                    </div>
                    <div className="mt-6 flex w-full gap-3">
                        <button className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-primary py-3.5 text-sm font-bold text-white transition-opacity hover:opacity-90">
                            <span className="material-symbols-outlined text-sm">mail</span>
                            Solicitar Orçamento
                        </button>
                    </div>
                </div>
                <div className="mx-6 mb-8 flex items-center justify-around rounded-2xl bg-background/50 py-4 dark:bg-white/5">
                    {stats.map((stat, index) => (
                        <React.Fragment key={stat.label}>
                            <div className="text-center">
                                <p className="text-xl font-bold text-foreground">{stat.value}</p>
                                <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">{stat.label}</p>
                            </div>
                            {index < stats.length - 1 && <div className="h-8 w-px bg-border"></div>}
                        </React.Fragment>
                    ))}
                </div>
                <div className="px-6 mb-8">
                    <h3 className="mb-4 text-xs font-bold uppercase tracking-widest text-muted-foreground">Meus Links</h3>
                    <div className="flex flex-col gap-2">
                        {links.map(link => (
                             <a key={link.id} href="#" className="flex items-center gap-3 p-4 rounded-xl border border-border bg-background/50 hover:bg-primary/5 transition-colors">
                                <span className="material-symbols-outlined" style={{ color: link.color }}>{link.icon}</span>
                                <span className="text-sm font-bold">{link.label}</span>
                             </a>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
