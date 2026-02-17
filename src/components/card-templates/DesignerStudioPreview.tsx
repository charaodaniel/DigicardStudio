import type { CardData } from '@/lib/types';

export default function DesignerStudioPreview({ cardData }: { cardData: CardData }) {
    const { fullName, jobTitle } = cardData;
    return (
        <>
            <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 min-h-full overflow-y-auto">
                <div className="max-w-md mx-auto flex flex-col relative pb-24">
                    <section className="flex flex-col items-center px-6 pt-8 pb-8">
                        <div className="relative mb-6">
                            <div className="w-32 h-32 rounded-full border-4 border-primary/20 p-1">
                                <img alt={fullName} className="w-full h-full object-cover rounded-full shadow-lg" src={cardData.avatarUrl} />
                            </div>
                            {cardData.isVerified && <div className="absolute bottom-1 right-1 bg-primary text-white rounded-full p-1 border-2 border-background-light dark:border-background-dark flex items-center justify-center">
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
                        <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-4 px-1">Minhas Redes</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <a className="bg-white dark:bg-slate-800 p-4 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 flex flex-col items-start gap-3 hover:border-primary/40 transition-colors" href="#">
                                <div className="bg-[#053eff]/10 p-2 rounded-lg">
                                    <span className="material-symbols-outlined text-[#053eff]">palette</span>
                                </div>
                                <div>
                                    <p className="font-bold text-sm">Behance</p>
                                    <p className="text-xs text-slate-400">Projetos Visuais</p>
                                </div>
                            </a>
                            <a className="bg-white dark:bg-slate-800 p-4 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 flex flex-col items-start gap-3 hover:border-primary/40 transition-colors" href="#">
                                <div className="bg-[#ea4c89]/10 p-2 rounded-lg">
                                    <span className="material-symbols-outlined text-[#ea4c89]">grid_view</span>
                                </div>
                                <div>
                                    <p className="font-bold text-sm">Dribbble</p>
                                    <p className="text-xs text-slate-400">Shots diários</p>
                                </div>
                            </a>
                            <a className="col-span-2 bg-gradient-to-r from-purple-500/10 to-pink-500/10 dark:from-purple-500/20 dark:to-pink-500/20 p-4 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 flex items-center justify-between hover:border-primary/40 transition-colors" href="#">
                                <div className="flex items-center gap-3">
                                    <div className="bg-gradient-to-tr from-[#f09433] via-[#e6683c] to-[#bc1888] p-2 rounded-lg text-white">
                                        <span className="material-symbols-outlined text-lg">photo_camera</span>
                                    </div>
                                    <div>
                                        <p className="font-bold text-sm">Instagram</p>
                                        <p className="text-xs text-slate-400">Processo criativo &amp; lifestyle</p>
                                    </div>
                                </div>
                                <span className="material-symbols-outlined text-slate-300">chevron_right</span>
                            </a>
                        </div>
                    </section>
                </div>
            </div>
            <style jsx>{`
                .no-scrollbar::-webkit-scrollbar { display: none; }
                .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
                .font-variation-fill { font-variation-settings: 'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24; }
                .material-symbols-outlined { font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24; }
            `}</style>
        </>
    );
}
