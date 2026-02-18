'use client';
import type { CardData } from '@/lib/types';
import { formatHref, shareCard } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

export default function SpotifyPreview({ cardData }: { cardData: CardData }) {
    const { fullName, isVerified, avatarUrl, links, themeColor } = cardData;
    const { toast } = useToast();
    
    const spotifyLink = links.find(l => l.type === 'spotify' || l.type === 'website');
    const actionHref = spotifyLink ? formatHref(spotifyLink.type, spotifyLink.value) : '#';

    const handleShare = async () => {
        const result = await shareCard(
            `Escute agora: ${fullName}`,
            `Confira o perfil de ${fullName} no Spotify`,
            window.location.href
        );
        if (result.success && result.method === 'clipboard') {
            toast({ title: "Link copiado!", description: "O link do cartão foi copiado para sua área de transferência." });
        }
    };

    return (
        <div className="bg-[#121121] text-white h-full flex flex-col relative overflow-hidden font-display">
            <div className="flex-1 overflow-y-auto no-scrollbar pb-32">
                <header className="relative w-full aspect-square overflow-hidden shadow-2xl shrink-0">
                    <div className="absolute inset-0 bg-gradient-to-t from-[#121121] via-transparent to-transparent z-10"></div>
                    <img alt="Artist Profile" className="w-full h-full object-cover" src={avatarUrl} />
                    <div className="absolute bottom-6 left-6 z-20">
                        {isVerified && <div className="flex items-center gap-2 mb-1">
                            <span className="material-symbols-outlined text-blue-400 text-xl" style={{fontVariationSettings: "'FILL' 1"}}>verified</span>
                            <span className="text-xs font-bold uppercase tracking-widest text-blue-400">Artista Verificado</span>
                        </div>}
                        <h1 className="text-4xl font-black tracking-tighter">{fullName}</h1>
                        <p className="text-gray-400 text-sm mt-1">1.2M ouvintes mensais • São Paulo, BR</p>
                    </div>
                </header>

                <div className="px-4 -mt-4 z-30 relative">
                    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-4 shadow-xl">
                        <div className="flex items-center justify-between mb-3 text-[#1DB954]">
                            <div className="flex items-center gap-2">
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#1DB954] opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[#1DB954]"></span>
                                </span>
                                <span className="text-[10px] font-bold uppercase tracking-widest">Ouvindo Agora</span>
                            </div>
                            <span className="material-symbols-outlined text-xl">graphic_eq</span>
                        </div>
                        <div className="flex gap-4">
                            <div className="size-14 rounded-lg overflow-hidden shrink-0"><img src={`https://picsum.photos/seed/music/100/100`} className="w-full h-full object-cover" alt="Album" /></div>
                            <div className="flex flex-col justify-center">
                                <p className="font-bold text-sm">Digital Card Beats</p>
                                <p className="text-xs text-gray-400">{fullName}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <main className="px-4 mt-8">
                    <h3 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-4 px-1">Links &amp; Lançamentos</h3>
                    <div className="space-y-3">
                        {links.map((link, i) => (
                            <a 
                                key={link.id} 
                                href={formatHref(link.type, link.value)} 
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-between p-4 bg-white/5 hover:bg-white/10 border border-white/5 rounded-xl transition-all group"
                            >
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
            </div>

            <nav className="bg-black/80 backdrop-blur-xl border-t border-white/10 p-4 flex items-center justify-between z-30 shrink-0">
                <div className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-gray-400 size-10 flex items-center justify-center">home</span>
                    <button onClick={handleShare} className="material-symbols-outlined text-gray-400 size-10 flex items-center justify-center hover:text-white transition-colors">
                        share
                    </button>
                </div>
                <a 
                    href={actionHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[#1DB954] text-black font-black px-8 py-3 rounded-full text-sm uppercase tracking-wider active:scale-95 transition-transform text-center" 
                    style={{backgroundColor: themeColor}}
                >
                    Seguir
                </a>
            </nav>
        </div>
    )
}
