'use client';
import type { CardData } from '@/lib/types';

export default function YoutubePreview({ cardData }: { cardData: CardData }) {
    const { fullName, isVerified, avatarUrl, stats, themeColor } = cardData;
    return (
        <div className="bg-slate-50 dark:bg-background-dark font-display antialiased h-full overflow-y-auto no-scrollbar">
            <div className="relative mx-auto min-h-full max-w-md bg-white dark:bg-slate-900 flex flex-col">
                {/* Header Mockup */}
                <div className="sticky top-0 z-50 flex items-center bg-white/80 dark:bg-slate-900/80 backdrop-blur-md p-4 justify-between border-b border-gray-100 dark:border-slate-800">
                    <span className="material-symbols-outlined text-slate-900 dark:text-white">arrow_back</span>
                    <h2 className="text-base font-bold flex-1 text-center">Perfil Oficial</h2>
                    <span className="material-symbols-outlined text-slate-900 dark:text-white">share</span>
                </div>

                <div className="relative flex flex-col items-center pt-8 pb-6 px-4">
                    <div className="relative group">
                        <div className="absolute -inset-1 bg-gradient-to-tr from-[#FF0000] to-red-400 rounded-full blur opacity-25"></div>
                        <div className="relative bg-white p-1 rounded-full border-2 border-[#FF0000]">
                            <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full h-32 w-32" style={{ backgroundImage: `url('${avatarUrl}')` }}>
                            </div>
                        </div>
                        <div className="absolute bottom-1 left-1/2 -translate-x-1/2 bg-[#FF0000] text-white text-[10px] font-bold px-3 py-0.5 rounded-full uppercase tracking-wider border-2 border-white dark:border-slate-900 animate-pulse">AO VIVO</div>
                    </div>
                    <div className="mt-6 flex flex-col items-center text-center gap-1">
                        <div className="flex items-center gap-1.5">
                            <h1 className="text-slate-900 dark:text-white text-2xl font-black leading-tight tracking-tight">{fullName}</h1>
                            {isVerified && <span className="material-symbols-outlined text-blue-500 text-[20px]" title="Verificado" style={{fontVariationSettings: "'FILL' 1"}}>verified</span>}
                        </div>
                        <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">@{fullName.toLowerCase().replace(/\s/g, '_')}_oficial</p>
                        
                        {stats && stats[0] && (
                            <div className="flex items-center gap-2 mt-2 bg-slate-100 dark:bg-slate-800 px-4 py-1.5 rounded-full">
                                <span className="text-[#FF0000] font-bold">{stats[0].value}</span>
                                <span className="text-slate-500 text-xs font-semibold">{stats[0].label}</span>
                            </div>
                        )}
                    </div>
                    <div className="w-full mt-8 flex flex-col gap-3">
                        <button className="w-full text-white font-bold py-4 rounded-xl shadow-lg flex items-center justify-center gap-2 active:scale-95 transition-all" style={{backgroundColor: themeColor}}>
                            <span className="material-symbols-outlined">subscriptions</span>
                            Inscreva-se
                        </button>
                    </div>
                </div>

                {/* Video Cards Mockup */}
                <div className="px-4 pb-24 space-y-4">
                    <h3 className="font-black text-lg">Vídeos Recentes</h3>
                    {[1, 2].map(i => (
                        <div key={i} className="rounded-xl overflow-hidden bg-white dark:bg-slate-800 border shadow-sm">
                            <div className="aspect-video bg-cover bg-center" style={{backgroundImage: `url('https://picsum.photos/seed/yt${i}/400/225')`}}></div>
                            <div className="p-3">
                                <h4 className="font-bold text-sm line-clamp-2">COMO USAR O DIGICARD STUDIO EM 2024 - GUIA COMPLETO</h4>
                                <p className="text-xs text-slate-500 mt-1">243 mil visualizações • há 2 dias</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Bottom Nav Mockup */}
                <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t px-6 py-3 pb-6 flex items-center justify-between z-50 shrink-0">
                    <span className="material-symbols-outlined text-primary" style={{fontVariationSettings: "'FILL' 1"}}>home</span>
                    <span className="material-symbols-outlined text-slate-400">video_library</span>
                    <span className="material-symbols-outlined text-slate-400">group</span>
                    <span className="material-symbols-outlined text-slate-400">mail</span>
                </div>
            </div>
        </div>
    )
}
