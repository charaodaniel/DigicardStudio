import type { CardData } from '@/lib/types';

export default function DesignerStudioPreview({ cardData }: { cardData: CardData }) {
    const { fullName, jobTitle, avatarUrl, isVerified, links } = cardData;
    return (
        <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 min-h-full overflow-y-auto">
            <div className="max-w-md mx-auto flex flex-col relative pb-24">
                <section className="flex flex-col items-center px-6 pt-8 pb-8">
                    <div className="relative mb-6">
                        <div className="w-32 h-32 rounded-full border-4 border-primary/20 p-1">
                            <img alt={fullName} className="w-full h-full object-cover rounded-full shadow-lg" src={avatarUrl} />
                        </div>
                        {isVerified && <div className="absolute bottom-1 right-1 bg-primary text-white rounded-full p-1 border-2 border-background-light dark:border-background-dark flex items-center justify-center">
                            <span className="material-symbols-outlined text-[16px] font-bold">verified</span>
                        </div>}
                    </div>
                    <div className="text-center">
                        <h2 className="text-2xl font-bold tracking-tight mb-1">{fullName}</h2>
                        <p className="text-slate-500 dark:text-slate-400 font-medium mb-4">{jobTitle}</p>
                        <div className="flex gap-3 justify-center">
                            <button className="bg-primary text-white px-6 py-2.5 rounded-xl font-bold text-sm shadow-lg shadow-primary/25 active:scale-95 transition-transform">
                                Contrate-me
                            </button>
                            <button className="bg-white dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 px-4 py-2.5 rounded-xl font-bold text-sm active:scale-95 transition-transform flex items-center gap-2">
                                <span className="material-symbols-outlined text-sm">download</span>
                                VCard
                            </button>
                        </div>
                    </div>
                </section>
                <section className="px-6 mb-8">
                    <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-4 px-1">Meus Links</h3>
                    <div className="grid grid-cols-1 gap-3">
                        {links.map(link => (
                            <a key={link.id} className="bg-white dark:bg-slate-800 p-4 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 flex items-center justify-between hover:border-primary/40 transition-colors" href="#">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 rounded-lg" style={{ backgroundColor: `${link.color}15` }}>
                                        <span className="material-symbols-outlined" style={{ color: link.color }}>{link.icon}</span>
                                    </div>
                                    <div>
                                        <p className="font-bold text-sm">{link.label}</p>
                                        <p className="text-xs text-slate-400 truncate max-w-[180px]">{link.value}</p>
                                    </div>
                                </div>
                                <span className="material-symbols-outlined text-slate-300">chevron_right</span>
                            </a>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
}
