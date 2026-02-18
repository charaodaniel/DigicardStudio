'use client';
import type { CardData } from '@/lib/types';
import { formatHref, shareCard } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

export default function ExecutivePreview({ cardData }: { cardData: CardData }) {
    const { fullName, fullNameLink, jobTitle, jobTitleLink, bio, isVerified, avatarUrl, avatarLink, themeColor, links, stats, bannerUrl, bannerLink } = cardData;
    const { toast } = useToast();
    
    const linkedinLink = links.find(l => l.type === 'linkedin' || l.type === 'website');
    const actionHref = linkedinLink ? formatHref(linkedinLink.type, linkedinLink.value) : '#';

    const handleShare = async () => {
        const result = await shareCard(
            `Cartão Digital Executivo - ${fullName}`,
            `Confira o perfil executivo de ${fullName}`,
            window.location.href
        );
        if (result.success && result.method === 'clipboard') {
            toast({ title: "Link copiado!", description: "O link do cartão foi copiado para sua área de transferência." });
        }
    };

    return (
        <div className="bg-slate-50 dark:bg-background-dark font-display text-slate-900 antialiased h-full flex flex-col relative overflow-hidden">
            {/* Top Navigation */}
            <header className="flex items-center justify-between bg-white/90 dark:bg-background-dark/90 backdrop-blur-md p-4 border-b border-slate-200 dark:border-slate-800 shrink-0 z-20">
                <button className="flex items-center gap-1 text-slate-600 dark:text-slate-400">
                    <span className="material-symbols-outlined text-xl">arrow_back_ios</span>
                    <span className="text-sm font-medium">Voltar</span>
                </button>
                <h1 className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Perfil Verificado</h1>
                <button onClick={handleShare} className="p-1 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors">
                    <span className="material-symbols-outlined text-xl text-slate-400">share</span>
                </button>
            </header>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto no-scrollbar px-4 pt-6 pb-8">
                {/* Main Executive Black Card */}
                <div className="w-full max-w-md mx-auto overflow-hidden rounded-xl bg-[#0a0a0b] relative group border border-white/10 shadow-2xl">
                    <div className="absolute inset-0 pointer-events-none opacity-20 bg-gradient-to-tr from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                    <div className="relative p-8 flex flex-col items-center">
                        <div className="relative mb-6">
                            <div className="absolute -inset-1 rounded-full bg-gradient-to-tr from-[#BF953F] via-[#FCF6BA] to-[#AA771C] animate-pulse"></div>
                            <div className="relative h-32 w-32 rounded-full overflow-hidden border-2 border-[#0a0a0b]">
                                {avatarLink ? (
                                    <a href={formatHref('website', avatarLink)} target="_blank" rel="noopener noreferrer">
                                        <img alt={fullName} className="h-full w-full object-cover" src={avatarUrl} />
                                    </a>
                                ) : (
                                    <img alt={fullName} className="h-full w-full object-cover" src={avatarUrl} />
                                )}
                            </div>
                            {isVerified && (
                                <div className="absolute bottom-1 right-1 bg-white rounded-full p-0.5 shadow-lg flex items-center justify-center">
                                    <span className="material-symbols-outlined text-primary text-xl font-bold" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
                                </div>
                            )}
                        </div>
                        <div className="text-center space-y-2">
                            {fullNameLink ? (
                                <a href={formatHref('website', fullNameLink)} target="_blank" rel="noopener noreferrer">
                                    <h2 className="text-2xl font-bold tracking-tight text-white hover:text-[#BF953F] transition-colors">{fullName}</h2>
                                </a>
                            ) : (
                                <h2 className="text-2xl font-bold tracking-tight text-white">{fullName}</h2>
                            )}
                            
                            {jobTitleLink ? (
                                <a href={formatHref('website', jobTitleLink)} target="_blank" rel="noopener noreferrer" className="block">
                                    <p className="text-sm font-medium uppercase tracking-[0.2em] bg-gradient-to-r from-[#BF953F] via-[#FCF6BA] to-[#AA771C] bg-clip-text text-transparent hover:brightness-125 transition-all">
                                        {jobTitle}
                                    </p>
                                </a>
                            ) : (
                                <p className="text-sm font-medium uppercase tracking-[0.2em] bg-gradient-to-r from-[#BF953F] via-[#FCF6BA] to-[#AA771C] bg-clip-text text-transparent">
                                    {jobTitle}
                                </p>
                            )}
                        </div>
                        <div className="my-8 flex w-full justify-between border-y border-white/10 py-4 px-2">
                            {stats && stats.slice(0, 3).map((stat, i) => (
                                <div key={i} className={`text-center flex-1 ${i === 1 ? 'border-x border-white/10 px-4' : ''}`}>
                                    {stat.url ? (
                                        <a href={formatHref('website', stat.url)} target="_blank" rel="noopener noreferrer" className="block group/stat">
                                            <p className="text-[8px] uppercase tracking-widest text-slate-500 truncate group-hover/stat:text-[#BF953F] transition-colors">{stat.label}</p>
                                            <p className="text-base font-bold text-white truncate group-hover/stat:scale-105 transition-transform">{stat.value}</p>
                                        </a>
                                    ) : (
                                        <>
                                            <p className="text-[8px] uppercase tracking-widest text-slate-500 truncate">{stat.label}</p>
                                            <p className="text-base font-bold text-white truncate">{stat.value}</p>
                                        </>
                                    )}
                                </div>
                            ))}
                        </div>
                        <div className="w-full text-center mb-8">
                            <h3 className="text-[9px] uppercase tracking-widest text-[#D4AF37] font-bold mb-2">Bio Estratégica</h3>
                            <p className="text-slate-300 text-xs leading-relaxed font-light italic">
                                {bio}
                            </p>
                        </div>
                        <div className="w-full space-y-3">
                            <a 
                                href={actionHref}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full py-3.5 rounded-lg bg-white text-black font-bold text-xs uppercase tracking-widest shadow-[0_0_20px_rgba(255,255,255,0.2)] active:scale-95 transition-transform flex items-center justify-center text-center"
                            >
                                Conectar Agora
                            </a>
                            <button className="w-full py-3.5 rounded-lg border border-white/20 text-white font-medium text-xs uppercase tracking-widest active:scale-95 transition-transform">
                                Salvar VCF
                            </button>
                        </div>
                    </div>
                </div>

                {/* Additional Links Section */}
                <div className="w-full mt-8 space-y-3 pb-12">
                    <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] text-center mb-4">Canais de Contato</h4>
                    {links.map(link => (
                        <a 
                            key={link.id} 
                            href={formatHref(link.type, link.value)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-between p-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm hover:border-primary/50 transition-colors group"
                        >
                            <div className="flex items-center gap-3">
                                <div className="p-2 rounded-lg" style={{ backgroundColor: `${link.color || themeColor}15` }}>
                                    <span className="material-symbols-outlined text-lg" style={{ color: link.color || themeColor }}>{link.icon}</span>
                                </div>
                                <span className="font-bold text-sm">{link.label}</span>
                            </div>
                            <span className="material-symbols-outlined text-slate-300 group-hover:text-primary transition-colors">chevron_right</span>
                        </a>
                    ))}
                </div>
            </div>
            
            {/* Fixed Bottom Navbar */}
            <nav className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 px-6 pb-6 pt-3 flex justify-around items-center shrink-0 z-20 shadow-[0_-4px_12px_rgba(0,0,0,0.05)]">
                <span className="material-symbols-outlined text-primary" style={{fontVariationSettings: "'FILL' 1"}}>home</span>
                <span className="material-symbols-outlined text-slate-400">group</span>
                <div className="relative -top-10">
                    <button className="bg-[#0a0a0b] p-4 rounded-full shadow-2xl border-4 border-slate-50 dark:border-slate-900 active:scale-90 transition-transform">
                        <span className="material-symbols-outlined text-[#D4AF37] text-3xl">qr_code_2</span>
                    </button>
                </div>
                <span className="material-symbols-outlined text-slate-400">chat_bubble</span>
                <span className="material-symbols-outlined text-slate-400">account_circle</span>
            </nav>
        </div>
    );
}
