'use client';
import type { CardData } from '@/lib/types';
import Image from 'next/image';
import React from 'react';

export default function ProfessionalsPreview({ cardData }: { cardData: CardData }) {
    const { fullName, jobTitle, avatarUrl, isVerified } = cardData;

    const stats = [
        { label: 'Anos Exp.', value: '12' },
        { label: 'Projetos', value: '150+' },
        { label: 'Prêmios', value: '08' },
    ];
    const specialities = ['Arquitetura Sustentável', 'Design Minimalista', 'Reformas de Luxo', 'Consultoria'];
    const portfolio = [
        { imageUrl: 'https://picsum.photos/seed/prof1/300/400', title: 'Residência Alpha', aspect: '3/4', marginTop: false, pullUp: false },
        { imageUrl: 'https://picsum.photos/seed/prof2/300/300', title: 'Casa do Lago', aspect: 'square', marginTop: true, pullUp: false },
        { imageUrl: 'https://picsum.photos/seed/prof3/300/300', title: 'Apartamento Loft', aspect: 'square', marginTop: false, pullUp: true },
        { imageUrl: 'https://picsum.photos/seed/prof4/300/400', title: 'Escritório Central', aspect: '3/4', marginTop: false, pullUp: false },
    ];
    
    return (
        <div className="bg-card font-display text-foreground antialiased h-full overflow-y-auto">
            <div className="relative mx-auto min-h-full max-w-md bg-card">
                <div className="flex flex-col items-center px-6 pt-6 pb-8">
                    <div className="relative mb-4">
                        <div className="size-32 overflow-hidden rounded-full border-4 border-white ring-2 ring-primary/20">
                          <Image src={avatarUrl} alt="Professional portrait" width={128} height={128} className="h-full w-full object-cover" />
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
                        <button className="flex size-[52px] items-center justify-center rounded-xl border border-primary/20 bg-primary/5 text-primary transition-colors hover:bg-primary/10">
                            <span className="material-symbols-outlined">language</span>
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
                    <h3 className="mb-4 text-xs font-bold uppercase tracking-widest text-muted-foreground">Especialidades</h3>
                    <div className="flex flex-wrap gap-2">
                        {specialities.map(spec => (
                             <span key={spec} className="rounded-lg bg-primary/10 px-3 py-1.5 text-xs font-semibold text-primary">{spec}</span>
                        ))}
                    </div>
                </div>
                <div className="px-6 pb-12">
                    <div className="mb-5 flex items-center justify-between">
                        <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Destaques</h3>
                        <button className="text-xs font-bold text-primary">Ver todos</button>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        {portfolio.map((item, index) => (
                            <div key={index} className={`group relative overflow-hidden rounded-2xl bg-gray-100 ${item.marginTop ? 'mt-4' : ''} ${item.pullUp ? '-mt-4' : ''}`}>
                                <Image 
                                    className={`w-full object-cover transition-transform duration-500 group-hover:scale-110 ${item.aspect === '3/4' ? 'aspect-[3/4]' : 'aspect-square'}`} 
                                    alt={item.title} 
                                    src={item.imageUrl}
                                    width={200}
                                    height={item.aspect === '3/4' ? 266 : 200}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100"></div>
                                <div className="absolute bottom-3 left-3 opacity-0 transition-opacity group-hover:opacity-100">
                                    <p className="text-xs font-bold text-white">{item.title}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
