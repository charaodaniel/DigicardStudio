import type { CardData } from '@/lib/types';

export default function TiktokPreview({ cardData }: { cardData: CardData }) {
    const { fullName, bio, isVerified } = cardData;
    return (
        <div className="bg-white font-display text-[#121117] min-h-full flex flex-col overflow-x-hidden">
            <div className="relative h-40 w-full overflow-hidden shrink-0">
                <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-transparent z-10"></div>
                <img alt="Banner Background" className="w-full h-full object-cover" src="https://picsum.photos/seed/tiktok-banner/400/160" />
            </div>
            <div className="relative px-6 -mt-16 z-30 flex flex-col items-center">
                <div className="relative">
                    <div className="w-32 h-32 rounded-full p-1 bg-gradient-to-tr from-neon-pink via-primary to-neon-cyan neon-border-pink">
                        <div className="w-full h-full rounded-full overflow-hidden border-4 border-white bg-white">
                            <img alt="Profile Picture" className="w-full h-full object-cover" src={cardData.avatarUrl} />
                        </div>
                    </div>
                </div>
                <div className="mt-4 text-center">
                    <div className="flex items-center justify-center gap-1">
                        <h1 className="text-2xl font-bold tracking-tight">@{fullName.toLowerCase().replace(' ', '_')}</h1>
                        {isVerified && <span className="material-symbols-outlined text-neon-cyan text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>}
                    </div>
                    <p className="text-gray-600 mt-1 max-w-[280px]">{bio}</p>
                    <p className="text-primary font-medium text-sm mt-1">Lifestyle • Gaming • Humor</p>
                </div>
                <div className="flex w-full mt-6 justify-center gap-8 py-4 border-y border-gray-100">
                    <div className="text-center">
                        <p className="text-xl font-bold">1.2M</p>
                        <p className="text-xs text-gray-400 uppercase tracking-widest">Seguidores</p>
                    </div>
                    <div className="text-center">
                        <p className="text-xl font-bold">15M</p>
                        <p className="text-xs text-gray-400 uppercase tracking-widest">Curtidas</p>
                    </div>
                </div>
                <div className="flex w-full gap-3 mt-6">
                    <button className="flex-1 bg-primary text-white font-bold py-3 rounded-xl hover:bg-primary/90 transition shadow-lg shadow-primary/20 flex items-center justify-center gap-2">
                        <span className="material-symbols-outlined text-sm">person_add</span>
                        Seguir
                    </button>
                    <button className="flex-1 bg-gray-100 text-gray-800 font-bold py-3 rounded-xl hover:bg-gray-200 transition flex items-center justify-center gap-2">
                        <span className="material-symbols-outlined text-sm">mail</span>
                        Mensagem
                    </button>
                </div>
            </div>
            <style jsx>{`
                .neon-border-pink { box-shadow: 0 0 10px rgba(255, 0, 80, 0.5); }
                .text-neon-cyan { color: #00f2ea; }
                .from-neon-pink { --tw-gradient-from: #ff0050; --tw-gradient-to: rgb(255 0 80 / 0); --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to); }
                .to-neon-cyan { --tw-gradient-to: #00f2ea; }
            `}</style>
        </div>
    )
}
