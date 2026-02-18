import type { CardData } from '@/lib/types';
import Image from 'next/image';

export default function YoutubePreview({ cardData }: { cardData: CardData }) {
    const { fullName, isVerified, avatarUrl, links } = cardData;
    return (
        <div className="bg-white dark:bg-slate-900 font-display antialiased h-full overflow-y-auto">
            <div className="relative mx-auto min-h-full max-w-md bg-white dark:bg-slate-900 flex flex-col">
                <div className="relative flex flex-col items-center pt-8 pb-6 px-4">
                    <div className="relative group">
                        <div className="absolute -inset-1 bg-gradient-to-tr from-[#FF0000] to-red-400 rounded-full blur opacity-25"></div>
                        <div className="relative bg-white p-1 rounded-full border-2 border-[#FF0000]">
                            <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full h-32 w-32" style={{ backgroundImage: `url('${avatarUrl}')` }}>
                            </div>
                        </div>
                    </div>
                    <div className="mt-6 flex flex-col items-center text-center gap-1">
                        <div className="flex items-center gap-1.5">
                            <h1 className="text-slate-900 dark:text-white text-2xl font-black leading-tight tracking-tight">{fullName}</h1>
                            {isVerified && <span className="material-symbols-outlined text-blue-500 text-[20px]" title="Verificado" style={{fontVariationSettings: "'FILL' 1"}}>verified</span>}
                        </div>
                        <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">@{fullName.toLowerCase().replace(/\s/g, '_')}_oficial</p>
                    </div>
                    <div className="w-full mt-8 flex flex-col gap-3">
                        {links.map(link => (
                            <button key={link.id} className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-4 rounded-xl shadow-lg flex items-center justify-center gap-2 transition-transform active:scale-95">
                                <span className="material-symbols-outlined">{link.icon}</span>
                                {link.label}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
