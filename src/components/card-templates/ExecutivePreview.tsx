'use client';
import type { CardData } from '@/lib/types';

export default function ExecutivePreview({ cardData }: { cardData: CardData }) {
    const { fullName, jobTitle, bio, isVerified, avatarUrl, themeColor } = cardData;
    return (
        <div className="bg-slate-50 dark:bg-background-dark font-display text-slate-900 antialiased h-full overflow-y-auto no-scrollbar">
            <div className="relative flex min-h-full w-full flex-col items-center justify-center p-4 sm:p-8">
                {/* Top Nav Mockup */}
                <div className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between bg-white/80 dark:bg-background-dark/80 backdrop-blur-md p-4 border-b border-slate-200 dark:border-slate-800">
                    <div className="flex items-center gap-1 text-slate-600 dark:text-slate-400">
                        <span className="material-symbols-outlined text-xl">arrow_back_ios</span>
                        <span className="text-sm font-medium">Voltar</span>
                    </div>
                    <h1 className="text-sm font-bold uppercase tracking-widest text-slate-400">Perfil Verificado</h1>
                    <span className="material-symbols-outlined text-2xl text-slate-400">share</span>
                </div>

                <div className="mt-16 w-full max-w-md overflow-hidden rounded-xl bg-[#0a0a0b] relative group border border-white/10 shadow-2xl">
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
                        <div className="w-full space-y-3">
                            <button className="w-full py-4 rounded-lg bg-white text-black font-bold text-sm uppercase tracking-widest shadow-[0_0_20px_rgba(255,255,255,0.2)]">
                                Conectar Agora
                            </button>
                            <button className="w-full py-4 rounded-lg border border-white/20 text-white font-medium text-sm uppercase tracking-widest">
                                Salvar VCF
                            </button>
                        </div>
                    </div>
                </div>
                
                {/* Fixed Bottom Navbar Mockup */}
                <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 px-6 pb-6 pt-3 flex justify-around items-center">
                    <span className="material-symbols-outlined text-primary" style={{fontVariationSettings: "'FILL' 1"}}>home</span>
                    <span className="material-symbols-outlined text-slate-400">group</span>
                    <div className="relative -top-8"><button className="bg-black p-4 rounded-full shadow-2xl border-4 border-slate-50"><span className="material-symbols-outlined text-[#D4AF37] text-3xl">qr_code_2</span></button></div>
                    <span className="material-symbols-outlined text-slate-400">chat_bubble</span>
                    <span className="material-symbols-outlined text-slate-400">account_circle</span>
                </div>
            </div>
        </div>
    )
}
