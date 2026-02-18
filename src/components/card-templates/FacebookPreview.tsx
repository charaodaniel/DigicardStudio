import type { CardData } from '@/lib/types';

export default function FacebookPreview({ cardData }: { cardData: CardData }) {
    const { fullName, bio, isVerified, avatarUrl, links } = cardData;
    return (
        <div className="bg-white dark:bg-[#1c1b2b] min-h-full flex flex-col relative overflow-y-auto no-scrollbar">
            <div className="relative">
                <div className="w-full h-32 bg-gray-200 dark:bg-gray-700 bg-center bg-cover" style={{ backgroundImage: "url('https://picsum.photos/seed/fb-cover/400/150')" }}>
                </div>
                <div className="absolute -bottom-16 left-4 p-1 bg-white dark:bg-[#1c1b2b] rounded-full shadow-lg">
                    <div className="size-32 rounded-full border-4 border-white dark:border-[#1c1b2b] bg-center bg-cover bg-gray-300" style={{ backgroundImage: `url('${avatarUrl}')` }}>
                    </div>
                </div>
            </div>
            <div className="mt-20 px-4 flex flex-col gap-4">
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
                <div className="flex flex-col gap-2 mt-2">
                    {links.map(link => (
                        <a key={link.id} href="#" className="flex items-center gap-3 p-3 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700">
                            <span className="material-symbols-outlined" style={{ color: link.color }}>{link.icon}</span>
                            <span className="text-sm font-bold">{link.label}</span>
                        </a>
                    ))}
                </div>
            </div>
            <div className="flex-grow"></div>
        </div>
    );
}
