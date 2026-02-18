'use client';
import type { CardData } from '@/lib/types';
import { formatHref } from '@/lib/utils';

export default function TiktokPreview({ cardData }: { cardData: CardData }) {
    const { fullName, bio, isVerified, avatarUrl, links, themeColor, bannerUrl } = cardData;
    
    const tiktokLink = links.find(l => l.type === 'tiktok') || links.find(l => l.type === 'website');
    const actionHref = tiktokLink ? formatHref(tiktokLink.type, tiktokLink.value) : '#';

    return (
        <div className="bg-white font-display text-[#121117] h-full flex flex-col overflow-hidden relative">
            <div className="flex-1 overflow-y-auto no-scrollbar pb-24">
                <div className="relative h-40 w-full overflow-hidden shrink-0">
                    <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-transparent z-10"></div>
                    <img alt="Banner Background" className="w-full h-full object-cover" src={bannerUrl || "https://picsum.photos/seed/tiktok-banner/400/160"} />
                    <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-center z-20">
                        <span className="material-symbols-outlined text-white bg-white/20 backdrop-blur-md rounded-full p-2">arrow_back</span>
                        <span className="material-symbols-outlined text-white bg-white/20 backdrop-blur-md rounded-full p-2">more_horiz</span>
                    </div>
                </div>
                <div className="relative px-6 -mt-16 z-30 flex flex-col items-center">
                    <div className="relative">
                        <div className="w-32 h-32 rounded-full p-1 bg-gradient-to-tr from-[#ff0050] via-primary to-[#00f2ea] shadow-[0_0_10px_rgba(255,0,80,0.5)]">
                            <div className="w-full h-full rounded-full overflow-hidden border-4 border-white bg-white">
                                <img alt={fullName} className="w-full h-full object-cover" src={avatarUrl} />
                            </div>
                        </div>
                        <div className="absolute bottom-2 right-2 w-6 h-6 bg-green-500 border-4 border-white rounded-full"></div>
                    </div>
                    <div className="mt-4 text-center">
                        <div className="flex items-center justify-center gap-1">
                            <h1 className="text-2xl font-bold tracking-tight">@{fullName.toLowerCase().replace(/\s/g, '_')}</h1>
                            {isVerified && <span className="material-symbols-outlined text-[#00f2ea] text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>}
                        </div>
                        <p className="text-gray-600 mt-1 max-w-[280px]">{bio}</p>
                    </div>
                    <div className="flex w-full mt-6 justify-center gap-8 py-4 border-y border-gray-100">
                        <div className="text-center"><p className="text-xl font-bold">1.2M</p><p className="text-xs text-gray-400 uppercase tracking-widest">Seguidores</p></div>
                        <div className="text-center"><p className="text-xl font-bold">15M</p><p className="text-xs text-gray-400 uppercase tracking-widest">Curtidas</p></div>
                    </div>
                    <div className="flex w-full gap-3 mt-6">
                        <a 
                            href={actionHref}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 text-white font-bold py-3 rounded-xl transition shadow-lg flex items-center justify-center gap-2 text-center" 
                            style={{backgroundColor: themeColor}}
                        >
                            <span className="material-symbols-outlined text-sm">person_add</span> Seguir
                        </a>
                        <button className="flex-1 bg-gray-100 text-gray-800 font-bold py-3 rounded-xl flex items-center justify-center gap-2">
                            <span className="material-symbols-outlined text-sm">mail</span> Mensagem
                        </button>
                    </div>
                    <div className="w-full mt-8 space-y-3">
                        {links.map(link => (
                            <a 
                                key={link.id} 
                                href={formatHref(link.type, link.value)} 
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center p-4 rounded-xl bg-gray-50 border border-gray-200 hover:border-primary transition group"
                            >
                                <div className="flex-1 flex items-center gap-4">
                                    <div className="bg-primary/10 text-primary p-2 rounded-lg"><span className="material-symbols-outlined">{link.icon}</span></div>
                                    <div><p className="font-bold text-sm">{link.label}</p><p className="text-xs text-gray-500 truncate max-w-[180px]">{link.value}</p></div>
                                </div>
                                <span className="material-symbols-outlined text-gray-300">chevron_right</span>
                            </a>
                        ))}
                    </div>
                </div>
            </div>
            {/* Bottom Nav Mockup - FIXED BOTTOM */}
            <div className="absolute bottom-0 left-0 right-0 bg-white border-t px-4 py-3 pb-6 flex justify-between items-center z-50 shrink-0">
                <span className="material-symbols-outlined text-gray-400">home</span>
                <span className="material-symbols-outlined text-gray-400">search</span>
                <div className="bg-gradient-to-tr from-[#ff0050] to-[#00f2ea] p-0.5 rounded-lg"><div className="bg-white px-3 py-1 rounded-[7px]"><span className="material-symbols-outlined text-black">add</span></div></div>
                <span className="material-symbols-outlined text-gray-400">chat_bubble</span>
                <span className="material-symbols-outlined text-black" style={{fontVariationSettings: "'FILL' 1"}}>person</span>
            </div>
        </div>
    )
}
