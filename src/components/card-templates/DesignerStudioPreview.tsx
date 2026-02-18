'use client';
import type { CardData } from '@/lib/types';
import SocialIcon from '@/components/social-icon';

export default function DesignerStudioPreview({ cardData, onShare }: { cardData: CardData, onShare: () => void }) {
    const { fullName, jobTitle, avatarUrl, isVerified, links, themeColor } = cardData;

    return (
        <div className="bg-slate-50 dark:bg-background-dark text-slate-900 dark:text-slate-100 h-full flex flex-col relative overflow-hidden">
            {/* Header */}
            <header className="absolute top-0 left-0 right-0 flex items-center justify-between p-6 bg-slate-50/80 dark:bg-background-dark/80 backdrop-blur-md z-20 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary">auto_awesome</span>
                    <h1 className="font-bold text-lg tracking-tight">Designer Studio</h1>
                </div>
                <button 
                    onClick={onShare}
                    className="bg-white dark:bg-slate-800 p-2 rounded-full shadow-sm hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                >
                    <span className="material-symbols-outlined text-slate-600">share</span>
                </button>
            </header>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto no-scrollbar pt-20 pb-24">
                <section className="flex flex-col items-center px-6 pt-4 pb-8">
                    <div className="relative mb-6">
                        <div className="w-32 h-32 rounded-full border-4 border-primary/20 p-1">
                            <img alt={fullName} className="w-full h-full object-cover rounded-full shadow-lg" src={avatarUrl} />
                        </div>
                        {isVerified && <div className="absolute bottom-1 right-1 bg-primary text-white rounded-full p-1 border-2 border-slate-50 dark:border-background-dark flex items-center justify-center">
                            <span className="material-symbols-outlined text-[16px] font-bold">verified</span>
                        </div>}
                    </div>
                    <div className="text-center">
                        <h2 className="text-2xl font-bold tracking-tight mb-1">{fullName}</h2>
                        <p className="text-slate-500 dark:text-slate-400 font-medium mb-4">{jobTitle}</p>
                        <div className="flex gap-3 justify-center">
                            <button className="text-white px-6 py-2.5 rounded-xl font-bold text-sm shadow-lg active:scale-95 transition-transform" style={{backgroundColor: themeColor}}>
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
                            <a key={link.id} className="bg-white dark:bg-slate-800 p-4 rounded-xl shadow-sm border border-slate-100 dark:border-slate-800 flex items-center justify-between hover:border-primary/40 transition-colors" href="#">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 rounded-lg" style={{ backgroundColor: `${link.color || themeColor}15` }}>
                                        <SocialIcon type={link.type} icon={link.icon} className="text-lg" style={{color: link.color || themeColor}} />
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

                <section className="mb-8">
                    <div className="flex items-center justify-between px-6 mb-4">
                        <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400">Trabalhos</h3>
                        <span className="text-xs font-bold text-primary">Ver todos</span>
                    </div>
                    <div className="flex gap-4 overflow-x-auto px-6 no-scrollbar pb-2">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="min-w-[240px] flex-shrink-0 rounded-xl overflow-hidden aspect-video relative shadow-md">
                                <img src={`https://picsum.photos/seed/ds${i}/400/225`} className="w-full h-full object-cover" alt="DS Portfolio" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-3 text-white text-xs font-medium">Projeto UI/UX {i}</div>
                            </div>
                        ))}
                    </div>
                </section>
            </div>

            {/* Bottom Nav */}
            <nav className="absolute bottom-6 left-0 right-0 z-30 px-6">
                <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/50 dark:border-slate-700/50 rounded-full shadow-2xl p-2 flex items-center justify-around">
                    <span className="material-symbols-outlined text-primary" style={{fontVariationSettings: "'FILL' 1"}}>home</span>
                    <span className="material-symbols-outlined text-slate-400">auto_awesome_motion</span>
                    <span className="material-symbols-outlined text-slate-400">chat_bubble</span>
                    <span className="material-symbols-outlined text-slate-400">person</span>
                </div>
            </nav>
        </div>
    );
}