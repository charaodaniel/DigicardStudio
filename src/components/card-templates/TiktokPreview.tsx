import type { CardData } from '@/lib/types';

export default function TiktokPreview({ cardData }: { cardData: CardData }) {
    const { fullName, bio, isVerified, avatarUrl, links } = cardData;
    return (
        <div className="bg-white font-display text-[#121117] min-h-full flex flex-col overflow-x-hidden">
            <div className="relative h-40 w-full overflow-hidden shrink-0">
                <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-transparent z-10"></div>
                <img alt="Banner Background" className="w-full h-full object-cover" src="https://picsum.photos/seed/tiktok-banner/400/160" />
            </div>
            <div className="relative px-6 -mt-16 z-30 flex flex-col items-center">
                <div className="relative">
                    <div className="w-32 h-32 rounded-full p-1 bg-gradient-to-tr from-[#ff0050] via-primary to-[#00f2ea] shadow-[0_0_10px_rgba(255,0,80,0.5)]">
                        <div className="w-full h-full rounded-full overflow-hidden border-4 border-white bg-white">
                            <img alt={fullName} className="w-full h-full object-cover" src={avatarUrl} />
                        </div>
                    </div>
                </div>
                <div className="mt-4 text-center">
                    <div className="flex items-center justify-center gap-1">
                        <h1 className="text-2xl font-bold tracking-tight">@{fullName.toLowerCase().replace(/\s/g, '_')}</h1>
                        {isVerified && <span className="material-symbols-outlined text-[#00f2ea] text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>}
                    </div>
                    <p className="text-gray-600 mt-1 max-w-[280px]">{bio}</p>
                </div>
                <div className="w-full mt-8 space-y-3">
                    {links.map(link => (
                        <a key={link.id} href="#" className="flex items-center justify-between p-4 bg-gray-50 border border-gray-200 rounded-xl hover:border-primary transition-all">
                            <div className="flex items-center gap-3">
                                <span className="material-symbols-outlined" style={{ color: link.color }}>{link.icon}</span>
                                <span className="text-sm font-bold">{link.label}</span>
                            </div>
                            <span className="material-symbols-outlined text-gray-300">chevron_right</span>
                        </a>
                    ))}
                </div>
            </div>
        </div>
    )
}
