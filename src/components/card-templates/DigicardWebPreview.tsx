'use client';
import type { CardData } from '@/lib/types';

export default function DigicardWebPreview({ cardData }: { cardData: CardData }) {
    const { fullName, jobTitle, bio, isVerified, avatarUrl, links, themeColor } = cardData;
    return (
        <div className="bg-white dark:bg-background-dark min-h-full flex flex-col relative shadow-2xl overflow-y-auto no-scrollbar">
            {/* Top Navigation Area */}
            <div className="flex items-center justify-between p-4 sticky top-0 bg-white/80 dark:bg-background-dark/80 backdrop-blur-md z-10 shrink-0">
                <div className="w-10 h-10 flex items-center justify-center text-primary">
                    <span className="material-symbols-outlined">qr_code_2</span>
                </div>
                <div className="flex-1 text-center">
                    <span className="text-xs font-bold uppercase tracking-widest text-primary/60">DigiCard Web</span>
                </div>
                <button className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-primary/10 transition-colors">
                    <span className="material-symbols-outlined">share</span>
                </button>
            </div>

            <section className="flex flex-col items-center px-6 pt-8 pb-4 shrink-0">
                <div className="relative group">
                    <div className="absolute -inset-1 bg-gradient-to-tr from-primary to-blue-400 rounded-full blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
                    <div className="relative bg-center bg-no-repeat aspect-square bg-cover rounded-full h-32 w-32 border-4 border-white dark:border-slate-800 shadow-xl" style={{ backgroundImage: `url('${avatarUrl}')` }}>
                    </div>
                </div>
                <div className="mt-6 text-center">
                    <div className="flex items-center justify-center gap-1.5">
                        <h1 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">{fullName}</h1>
                        {isVerified && <span className="material-symbols-outlined text-primary text-[20px] fill-current" title="Verified Professional" style={{fontVariationSettings: "'FILL' 1"}}>verified</span>}
                    </div>
                    <p className="text-primary font-medium mt-1">{jobTitle}</p>
                </div>
                <p className="mt-4 text-center text-slate-600 dark:text-slate-400 text-sm leading-relaxed max-w-[320px]">
                    {bio}
                </p>
                <div className="w-full mt-8 px-2">
                    <button className="w-full text-white font-bold py-4 rounded-xl shadow-lg flex items-center justify-center gap-2 active:scale-[0.98] transition-all" style={{backgroundColor: themeColor}}>
                        <span className="material-symbols-outlined">person_add</span>
                        Salvar Contato
                    </button>
                </div>
            </section>

            <section className="flex flex-col gap-3 px-6 py-4">
                {links.map(link => (
                    <a key={link.id} className="flex items-center gap-4 p-4 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors group" href="#">
                        <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${link.color || themeColor}15`, color: link.color || themeColor }}>
                            <span className="material-symbols-outlined">{link.icon}</span>
                        </div>
                        <span className="flex-1 font-medium text-slate-700 dark:text-slate-200">{link.label}</span>
                        <span className="material-symbols-outlined text-slate-400 group-hover:translate-x-1 transition-transform">chevron_right</span>
                    </a>
                ))}
            </section>

            <footer className="mt-auto py-8 text-center bg-slate-50 dark:bg-background-dark shrink-0">
                <p className="text-slate-400 dark:text-slate-600 text-xs font-medium tracking-tight">
                    Criado com <span className="text-primary font-bold">DigiCard Web</span>
                </p>
            </footer>
        </div>
    )
}
