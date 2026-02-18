import type { CardData } from '@/lib/types';

export default function InstagramPreview({ cardData }: { cardData: CardData }) {
    const { fullName, bio, isVerified, avatarUrl } = cardData;
    return (
        <div className="relative h-full mx-auto max-w-md min-h-screen shadow-2xl overflow-y-auto no-scrollbar flex flex-col bg-[#121121] text-white">
            <header className="pt-12 px-6 pb-6 flex flex-col items-center">
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
                <div className="flex gap-8 mt-6 py-3 px-6 bg-white/5 backdrop-blur-md rounded-xl border border-white/10">
                    <div className="text-center">
                        <p className="text-lg font-bold text-white leading-none">150k</p>
                        <p className="text-[10px] uppercase tracking-wider text-white/60 font-medium">Seguidores</p>
                    </div>
                    <div className="w-px h-8 bg-white/10"></div>
                    <div className="text-center">
                        <p className="text-lg font-bold text-white leading-none">{cardData.links.length}</p>
                        <p className="text-[10px] uppercase tracking-wider text-white/60 font-medium">Links</p>
                    </div>
                </div>
            </header>
            <div className="px-6 flex flex-col gap-2">
                {cardData.links.map(link => (
                    <a key={link.id} href="#" className="w-full h-12 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl transition-all border border-white/10 flex items-center justify-center gap-2">
                        <span className="material-symbols-outlined text-xl">{link.icon}</span>
                        {link.label}
                    </a>
                ))}
            </div>
            <div className="mt-8 flex-1 bg-white/5 backdrop-blur-xl rounded-t-[2.5rem] pt-8 px-1">
                <div className="grid grid-cols-3 gap-1">
                   {[...Array(9)].map((_, i) => (
                     <div key={i} className="aspect-square bg-cover bg-center bg-slate-800" style={{ backgroundImage: `url('https://picsum.photos/seed/insta${i}/200')` }}></div>
                   ))}
                </div>
            </div>
        </div>
    )
}
