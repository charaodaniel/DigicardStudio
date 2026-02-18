import type { CardData } from '@/lib/types';

export default function SpotifyPreview({ cardData }: { cardData: CardData }) {
    const { fullName, isVerified, avatarUrl, links } = cardData;
    return (
        <div className="bg-[#121121] text-white min-h-full font-display overflow-y-auto">
            <div className="max-w-md mx-auto min-h-full flex flex-col">
                <header className="relative w-full aspect-square overflow-hidden shadow-2xl shrink-0">
                    <div className="absolute inset-0 bg-gradient-to-t from-[#121121] via-transparent to-transparent z-10"></div>
                    <img alt="Artist Profile" className="w-full h-full object-cover" src={avatarUrl} />
                    <div className="absolute bottom-6 left-6 z-20">
                        {isVerified && <div className="flex items-center gap-2 mb-1">
                            <span className="material-symbols-outlined text-blue-400 text-xl" style={{fontVariationSettings: "'FILL' 1"}}>verified</span>
                            <span className="text-xs font-bold uppercase tracking-widest text-blue-400">Artista Verificado</span>
                        </div>}
                        <h1 className="text-4xl font-black tracking-tighter">{fullName}</h1>
                        <p className="text-gray-400 text-sm mt-1">1.2M ouvintes mensais</p>
                    </div>
                </header>
                <main className="px-4 mt-8 flex-1">
                    <h3 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-4 px-1">Links &amp; Lançamentos</h3>
                    <div className="space-y-3">
                        {links.map((link, i) => (
                            <a key={link.id} className="flex items-center justify-between p-4 bg-white/5 hover:bg-white/10 border border-white/5 rounded-xl transition-all group" href="#">
                                <div className="flex items-center gap-4">
                                    <div className="text-gray-500 font-mono text-sm">0{i+1}</div>
                                    <div>
                                        <p className="font-semibold group-hover:text-[#1DB954] transition-colors">{link.label}</p>
                                        <p className="text-xs text-gray-400 truncate max-w-[200px]">{link.value}</p>
                                    </div>
                                </div>
                                <span className="material-symbols-outlined text-gray-400 group-hover:text-white">{link.icon}</span>
                            </a>
                        ))}
                    </div>
                </main>
                <footer className="mt-auto py-8 text-center px-4">
                    <p className="text-[10px] text-gray-600 uppercase tracking-widest font-semibold">© 2024 {fullName}</p>
                </footer>
            </div>
        </div>
    )
}
