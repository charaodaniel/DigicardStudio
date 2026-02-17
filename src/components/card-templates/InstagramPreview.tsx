import type { CardData } from '@/lib/types';
export default function InstagramPreview({ cardData }: { cardData: CardData }) {
    const { fullName, bio, isVerified } = cardData;
    return (
        <>
            <div className="relative h-full mx-auto max-w-md min-h-screen shadow-2xl overflow-hidden flex flex-col mesh-bg bg-fixed">
                <header className="pt-12 px-6 pb-6 flex flex-col items-center">
                    <div className="relative group">
                        <div className="absolute -inset-1 bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 rounded-full blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
                        <div className="relative bg-background-dark rounded-full p-1">
                            <div className="size-28 rounded-full bg-cover bg-center border-2 border-white/20" style={{ backgroundImage: `url('${cardData.avatarUrl}')` }}>
                            </div>
                        </div>
                    </div>
                    <div className="mt-4 text-center">
                        <div className="flex items-center justify-center gap-1">
                            <h1 className="text-xl font-bold tracking-tight text-white">@{fullName.toLowerCase().replace(' ', '_')}</h1>
                            {isVerified && <span className="material-symbols-outlined text-primary text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>}
                        </div>
                        <p className="text-white/80 text-sm mt-1 max-w-[280px]">{bio}</p>
                    </div>
                    <div className="flex gap-8 mt-6 py-3 px-6 glass-card rounded-xl">
                        <div className="text-center">
                            <p className="text-lg font-bold text-white leading-none">150k</p>
                            <p className="text-[10px] uppercase tracking-wider text-white/60 font-medium">Seguidores</p>
                        </div>
                        <div className="w-px h-8 bg-white/10"></div>
                        <div className="text-center">
                            <p className="text-lg font-bold text-white leading-none">500</p>
                            <p className="text-[10px] uppercase tracking-wider text-white/60 font-medium">Posts</p>
                        </div>
                        <div className="w-px h-8 bg-white/10"></div>
                        <div className="text-center">
                            <p className="text-lg font-bold text-white leading-none">1.2k</p>
                            <p className="text-[10px] uppercase tracking-wider text-white/60 font-medium">Seguindo</p>
                        </div>
                    </div>
                </header>
                <div className="px-6 flex flex-col gap-3">
                    <button className="w-full h-12 bg-primary hover:bg-primary/90 text-white font-bold rounded-xl transition-all active:scale-[0.98] shadow-lg shadow-primary/20 flex items-center justify-center gap-2">
                        <span className="material-symbols-outlined text-xl">work</span>
                        Trabalhe Comigo
                    </button>
                </div>
                <div className="mt-8 flex-1 glass-card rounded-t-[2.5rem] pt-8 px-1 pb-20">
                    <div className="flex items-center justify-center gap-6 mb-6">
                        <button className="flex items-center gap-1 text-white border-b-2 border-primary pb-1 font-bold">
                            <span className="material-symbols-outlined text-lg">grid_on</span>
                            FEED
                        </button>
                    </div>
                    <div className="grid grid-cols-3 gap-1">
                       {[...Array(9)].map((_, i) => (
                         <div key={i} className="aspect-square bg-cover bg-center bg-slate-800" style={{ backgroundImage: `url('https://picsum.photos/seed/insta${i}/200')` }}></div>
                       ))}
                    </div>
                </div>
            </div>
            <style jsx>{`
                .mesh-bg {
                    background-color: #121121;
                    background-image: 
                        radial-gradient(at 0% 0%, hsla(253,16%,7%,1) 0, transparent 50%), 
                        radial-gradient(at 50% 0%, hsla(225,39%,30%,1) 0, transparent 50%), 
                        radial-gradient(at 100% 0%, hsla(339,49%,30%,1) 0, transparent 50%);
                    background-attachment: fixed;
                }
                .glass-card {
                    background: rgba(255, 255, 255, 0.05);
                    backdrop-filter: blur(12px);
                    -webkit-backdrop-filter: blur(12px);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                }
            `}</style>
        </>
    )
}
