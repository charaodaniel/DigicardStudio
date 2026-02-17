import type { CardData } from '@/lib/types';
import Image from 'next/image';

export default function YoutubePreview({ cardData }: { cardData: CardData }) {
    const { fullName, isVerified } = cardData;
    return (
        <div className="bg-white dark:bg-slate-900 font-display antialiased h-full overflow-y-auto">
            <div className="relative mx-auto min-h-full max-w-md bg-white dark:bg-slate-900 flex flex-col">
                <div className="relative flex flex-col items-center pt-8 pb-6 px-4">
                    <div className="relative group">
                        <div className="absolute -inset-1 bg-gradient-to-tr from-youtube-red to-red-400 rounded-full blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
                        <div className="relative bg-white p-1 rounded-full border-2 border-youtube-red">
                            <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full h-32 w-32" style={{ backgroundImage: `url('${cardData.avatarUrl}')` }}>
                            </div>
                        </div>
                    </div>
                    <div className="mt-6 flex flex-col items-center text-center gap-1">
                        <div className="flex items-center gap-1.5">
                            <h1 className="text-slate-900 dark:text-white text-2xl font-black leading-tight tracking-tight">{fullName}</h1>
                            {isVerified && <span className="material-symbols-outlined text-blue-500 text-[20px]" title="Verificado" style={{fontVariationSettings: "'FILL' 1"}}>verified</span>}
                        </div>
                        <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">@{fullName.toLowerCase().replace(' ', '_')}_oficial</p>
                        <div className="flex items-center gap-2 mt-2 bg-background-light dark:bg-slate-800 px-4 py-1.5 rounded-full">
                            <span className="text-youtube-red font-bold">1.2M</span>
                            <span className="text-slate-500 dark:text-slate-400 text-xs font-semibold">Inscritos</span>
                        </div>
                    </div>
                    <div className="w-full mt-8 flex flex-col gap-3">
                        <button className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-4 rounded-xl shadow-lg shadow-primary/25 flex items-center justify-center gap-2 transition-transform active:scale-95">
                            <span className="material-symbols-outlined">subscriptions</span>
                            Inscreva-se no Canal
                        </button>
                    </div>
                </div>
                <div className="px-4 pb-6">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-slate-900 dark:text-white text-lg font-black tracking-tight">Vídeos Recentes</h3>
                        <a className="text-primary text-sm font-bold hover:underline" href="#">Ver todos</a>
                    </div>
                    <div className="flex flex-col gap-4">
                       <div className="group relative flex flex-col gap-2 rounded-xl overflow-hidden bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 shadow-sm">
                            <div className="aspect-video relative overflow-hidden">
                                <Image width={400} height={225} className="w-full h-full object-cover" src="https://picsum.photos/seed/yt1/400/225" alt="video thumbnail" />
                            </div>
                            <div className="p-3">
                                <h4 className="text-slate-900 dark:text-white font-bold leading-tight line-clamp-2">MEU NOVO SETUP 2024 - O GUIA DEFINITIVO</h4>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
             <style jsx>{`
                .dark .text-youtube-red, .text-youtube-red { color: #FF0000; }
                .dark .border-youtube-red, .border-youtube-red { border-color: #FF0000; }
                .dark .from-youtube-red, .from-youtube-red { --tw-gradient-from: #FF0000; --tw-gradient-to: rgb(255 0 0 / 0); --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to); }
            `}</style>
        </div>
    )
}
