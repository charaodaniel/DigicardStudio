import type { CardData } from '@/lib/types';

export default function LinkedinPreview({ cardData }: { cardData: CardData }) {
    const { fullName, jobTitle, bio, isVerified, avatarUrl, links } = cardData;

    return (
        <div className="relative w-full h-full bg-white dark:bg-[#1a192e] shadow-2xl flex flex-col overflow-y-auto no-scrollbar">
            <div className="h-24 bg-gradient-to-r from-primary/80 to-primary w-full relative shrink-0">
                <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(circle at 2px 2px, white 1px, transparent 0)", backgroundSize: "24px 24px" }}></div>
            </div>
            <div className="px-6 -mt-16 flex flex-col items-center">
                <div className="relative group">
                    <div className="size-32 rounded-full border-4 border-white dark:border-[#1a192e] bg-cover bg-center shadow-lg" style={{ backgroundImage: `url('${avatarUrl}')` }}>
                    </div>
                    {isVerified && <div className="absolute bottom-1 right-1 bg-primary text-white rounded-full p-0.5 border-[3px] border-white flex items-center justify-center">
                        <span className="material-symbols-outlined text-[16px] font-bold text-white">check</span>
                    </div>}
                </div>
                <div className="mt-4 text-center">
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{fullName}</h1>
                    <p className="text-primary font-semibold text-sm uppercase tracking-wider mt-1">{jobTitle}</p>
                    <div className="flex items-center justify-center gap-1 text-gray-500 dark:text-gray-400 text-sm mt-1">
                        <span className="material-symbols-outlined text-sm">location_on</span>
                        <span>São Paulo, Brasil</span>
                    </div>
                </div>
                <div className="mt-6 text-center">
                    <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed px-4">
                       {bio}
                    </p>
                </div>
                <div className="grid grid-cols-3 gap-3 w-full mt-8">
                    <button className="flex flex-col items-center justify-center gap-2 p-3 rounded-lg bg-primary text-white hover:bg-primary/90 transition-colors">
                        <span className="material-symbols-outlined">person_add</span>
                        <span className="text-[10px] font-bold uppercase">Conectar</span>
                    </button>
                    <button className="flex flex-col items-center justify-center gap-2 p-3 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors">
                        <span className="material-symbols-outlined">mail</span>
                        <span className="text-[10px] font-bold uppercase">Mensagem</span>
                    </button>
                    <button className="flex flex-col items-center justify-center gap-2 p-3 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors">
                        <span className="material-symbols-outlined">contact_page</span>
                        <span className="text-[10px] font-bold uppercase">Salvar</span>
                    </button>
                </div>
            </div>
            <div className="mt-8 px-6 space-y-3 pb-8">
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest px-1">Links Profissionais</h3>
                {links.map(link => (
                    <a key={link.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-100 dark:border-gray-700 hover:border-primary/50 transition-all" href="#">
                        <div className="flex items-center gap-3">
                            <span className="material-symbols-outlined text-primary">{link.icon}</span>
                            <span className="text-sm font-medium text-gray-700 dark:text-gray-200">{link.label}</span>
                        </div>
                        <span className="material-symbols-outlined text-gray-400 text-sm">chevron_right</span>
                    </a>
                ))}
            </div>
        </div>
    )
}
