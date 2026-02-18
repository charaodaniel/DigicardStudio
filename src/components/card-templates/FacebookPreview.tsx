'use client';
import type { CardData } from '@/lib/types';

export default function FacebookPreview({ cardData }: { cardData: CardData }) {
    const { fullName, bio, isVerified, avatarUrl, links, themeColor } = cardData;
    return (
        <div className="bg-white dark:bg-[#1c1b2b] min-h-full flex flex-col relative overflow-y-auto no-scrollbar">
            {/* Header / Navigation */}
            <div className="flex items-center bg-white dark:bg-[#1c1b2b] p-4 sticky top-0 z-20 border-b border-gray-100 dark:border-gray-800">
                <span className="material-symbols-outlined">arrow_back</span>
                <h2 className="text-lg font-bold flex-1 ml-4">Perfil</h2>
                <span className="material-symbols-outlined">more_horiz</span>
            </div>
            {/* Cover Photo */}
            <div className="relative">
                <div className="w-full h-40 bg-gray-200 dark:bg-gray-700 bg-center bg-cover" style={{ backgroundImage: "url('https://picsum.photos/seed/fb-cover/400/150')" }}>
                </div>
                <div className="absolute -bottom-16 left-4 p-1 bg-white dark:bg-[#1c1b2b] rounded-full shadow-lg">
                    <div className="size-32 rounded-full border-4 border-white dark:border-[#1c1b2b] bg-center bg-cover bg-gray-300" style={{ backgroundImage: `url('${avatarUrl}')` }}>
                    </div>
                </div>
            </div>
            {/* Profile Info */}
            <div className="mt-20 px-4 flex flex-col gap-4 pb-20">
                <div>
                    <div className="flex items-center gap-1.5">
                        <h1 className="text-2xl font-bold tracking-tight">{fullName}</h1>
                        {isVerified && <span className="material-symbols-outlined text-primary text-xl" title="Verificado" style={{fontVariationSettings: "'FILL' 1"}}>verified</span>}
                    </div>
                    <p className="text-[#656487] dark:text-gray-400 text-base">@{fullName.toLowerCase().replace(/\s/g, '.')}</p>
                    <p className="mt-3 text-[#121117] dark:text-gray-200 text-base leading-relaxed">
                        {bio}
                    </p>
                </div>
                {/* Action Buttons */}
                <div className="flex flex-col gap-3 w-full">
                    <button className="w-full text-white font-bold py-2.5 rounded-lg flex items-center justify-center gap-2" style={{backgroundColor: themeColor}}>
                        <span className="material-symbols-outlined text-xl" style={{fontVariationSettings: "'FILL' 1"}}>social_leaderboard</span>
                        Ver Perfil no Facebook
                    </button>
                    <button className="w-full bg-gray-100 dark:bg-gray-800 text-[#121117] dark:text-white font-bold py-2.5 rounded-lg flex items-center justify-center gap-2">
                        <span className="material-symbols-outlined text-xl">chat_bubble</span>
                        Enviar Mensagem
                    </button>
                </div>
                <div className="grid grid-cols-2 gap-3">
                    <div className="flex flex-col gap-1 rounded-lg border p-4 bg-gray-50/50 dark:bg-gray-900/30">
                        <p className="text-2xl font-bold">1.2k</p>
                        <p className="text-[#656487] text-xs font-medium uppercase tracking-wider">Seguidores</p>
                    </div>
                    <div className="flex flex-col gap-1 rounded-lg border p-4 bg-gray-50/50 dark:bg-gray-900/30">
                        <p className="text-2xl font-bold">{links.length}</p>
                        <p className="text-[#656487] text-xs font-medium uppercase tracking-wider">Links</p>
                    </div>
                </div>
            </div>
            
            {/* Bottom Nav */}
            <div className="mt-auto sticky bottom-0 bg-white dark:bg-[#1c1b2b] border-t border-gray-100 dark:border-gray-800 px-4 py-3 flex justify-between items-center z-30 shrink-0">
                <span className="material-symbols-outlined text-primary" style={{fontVariationSettings: "'FILL' 1"}}>home</span>
                <span className="material-symbols-outlined text-slate-400">play_circle</span>
                <span className="material-symbols-outlined text-slate-400">group</span>
                <span className="material-symbols-outlined text-slate-400">notifications</span>
                <span className="material-symbols-outlined text-slate-400">menu</span>
            </div>
        </div>
    );
}
