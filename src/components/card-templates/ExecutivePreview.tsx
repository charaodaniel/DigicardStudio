import type { CardData } from '@/lib/types';

export default function ExecutivePreview({ cardData }: { cardData: CardData }) {
    const { fullName, jobTitle, bio, isVerified, avatarUrl } = cardData;
    return (
        <div className="bg-[#0a0a0b] font-display text-slate-900 antialiased h-full overflow-y-auto no-scrollbar">
            <div className="relative flex min-h-full w-full flex-col items-center justify-center p-4 sm:p-8">
                <div className="w-full max-w-md overflow-hidden rounded-xl bg-[#0a0a0b] relative group border border-white/10 shadow-2xl">
                    <div className="absolute inset-0 pointer-events-none opacity-20 bg-gradient-to-tr from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                    <div className="relative p-8 flex flex-col items-center">
                        <div className="relative mb-6">
                            <div className="absolute -inset-1 rounded-full bg-gradient-to-tr from-[#BF953F] via-[#FCF6BA] to-[#AA771C] animate-pulse"></div>
                            <div className="relative h-32 w-32 rounded-full overflow-hidden border-2 border-[#0a0a0b]">
                                <img alt={fullName} className="h-full w-full object-cover" src={avatarUrl} />
                            </div>
                            {isVerified && <div className="absolute bottom-1 right-1 bg-white rounded-full p-0.5 shadow-lg">
                                <span className="material-symbols-outlined text-primary text-xl font-bold" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
                            </div>}
                        </div>
                        <div className="text-center space-y-2">
                            <h2 className="text-2xl font-bold tracking-tight text-white">{fullName}</h2>
                            <p className="text-sm font-medium uppercase tracking-[0.2em] bg-gradient-to-r from-[#BF953F] via-[#FCF6BA] to-[#AA771C] bg-clip-text text-transparent">{jobTitle}</p>
                        </div>
                        <div className="my-8 flex w-full justify-between border-y border-white/10 py-4 px-2">
                            <div className="text-center">
                                <p className="text-[10px] uppercase tracking-widest text-slate-500">Links</p>
                                <p className="text-lg font-bold text-white">{cardData.links.length}</p>
                            </div>
                            <div className="text-center border-x border-white/10 px-6">
                                <p className="text-[10px] uppercase tracking-widest text-slate-500">Premium</p>
                                <p className="text-lg font-bold text-white">ID-8</p>
                            </div>
                            <div className="text-center">
                                <p className="text-[10px] uppercase tracking-widest text-slate-500">Status</p>
                                <p className="text-lg font-bold text-white">Ativo</p>
                            </div>
                        </div>
                        <div className="w-full text-center mb-8">
                            <h3 className="text-[10px] uppercase tracking-widest text-[#D4AF37] font-bold mb-2">Bio Estratégica</h3>
                            <p className="text-slate-300 text-sm leading-relaxed font-light italic">
                                {bio}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
