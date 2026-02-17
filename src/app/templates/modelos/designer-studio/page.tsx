export default function DesignerStudioPage() {
    return (
        <>
            <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 min-h-screen">
                <div className="max-w-md mx-auto min-h-screen flex flex-col relative pb-24">
                    <header className="flex items-center justify-between p-6 sticky top-0 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md z-30">
                        <div className="flex items-center gap-2">
                            <span className="material-symbols-outlined text-primary">auto_awesome</span>
                            <h1 className="font-bold text-lg tracking-tight">Designer Studio</h1>
                        </div>
                        <button className="bg-white dark:bg-slate-800 p-2 rounded-full shadow-sm">
                            <span className="material-symbols-outlined text-slate-600 dark:text-slate-300">share</span>
                        </button>
                    </header>
                    <section className="flex flex-col items-center px-6 pt-4 pb-8">
                        <div className="relative mb-6">
                            <div className="w-32 h-32 rounded-full border-4 border-primary/20 p-1">
                                <img alt="Mariana Silva" className="w-full h-full object-cover rounded-full shadow-lg" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBUbLtgXn45P4QverCJFujH_tJhQf4mIY51_lAnN0-pLdo6VQwwrxgg1eVZnM-AtnNUfUfTGnK5uABiY3th_xHa6A02w6PCpqXMAle7Ocet_WKiryGQ2YD4S0EpL-yPbJP8dyavWlEriu4S8UA6nf_OQRFQxAmmw71DF3JilxQl1AIow6gcXiwWkBKY6xpaNHAHyjNqT95STz1b9TNRtbdylkoCyMvU6lIGx-FbAMUMAyeTUXcVLVWDJzZ8F9PZq2eg3iPfcb6edB9x" />
                            </div>
                            <div className="absolute bottom-1 right-1 bg-primary text-white rounded-full p-1 border-2 border-background-light dark:border-background-dark flex items-center justify-center">
                                <span className="material-symbols-outlined text-[16px] font-bold">verified</span>
                            </div>
                        </div>
                        <div className="text-center">
                            <h2 className="text-2xl font-bold tracking-tight mb-1">Mariana Silva</h2>
                            <p className="text-slate-500 dark:text-slate-400 font-medium mb-4">Senior Product Designer</p>
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
                    <section className="mb-8">
                        <div className="flex items-center justify-between px-6 mb-4">
                            <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500">Portfólio de Design</h3>
                            <a className="text-xs font-bold text-primary" href="#">Ver todos</a>
                        </div>
                        <div className="flex gap-4 overflow-x-auto px-6 no-scrollbar pb-2">
                            <div className="min-w-[240px] flex-shrink-0 group">
                                <div className="relative rounded-xl overflow-hidden aspect-video mb-2 shadow-md">
                                    <img alt="UI Project 1" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src="https://lh3.googleusercontent.com/aida-public/AB6AXuALwOJBCTqnKnvFrsdUOWyvn3pgvs3vYDbMjQG7miD_AVRvOELvhjRu0vzwju5Zs_q6pQF-ym680cUJUX9lZZbfILTfiHcSXm_G4z50bRBdT33WgFAbY0U8JWXYUfcVz_OfSAd9lJYqMRR2XcacD4_obk-5NGh2fGsdfGW9WFf7P-2VB_3BeMX7fEPH_QYVQ6xHPIqA8NlaBtuqvzhe4kEt3aZCQqSH3XrBdTxP1-Cfh7vUYRsANOaTd2i8umhJHr0NdUv1FmhoKmHF" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-3">
                                        <span className="text-white text-xs font-medium">Fintech App Redesign</span>
                                    </div>
                                </div>
                            </div>
                            <div className="min-w-[240px] flex-shrink-0 group">
                                <div className="relative rounded-xl overflow-hidden aspect-video mb-2 shadow-md">
                                    <img alt="UI Project 2" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCC4RcboSbZm-gNbeE7WdeB7BJQN79UEUWCWw9kIm1ZMsQ2oMzU0gFUPop5sgB3d-JD01fY1ipqBzU5iW-LKv7oEpX17Vc2rnYsSXVtx0IJF6R3t0tenO332DKLmBcvzRgvQ9FO2jq9-ypJO3UXPm209LuNzX-g76r7Fh7Pgg25cF9t5KMY23tm2PyZJP1AEw2lyF9njTAZ_HT1E55e8ItJagKD_19ZqFJiWkNQnXbVFTuqwbsGNhwe_GayzI8eLNIhfXJosTENecVF" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-3">
                                        <span className="text-white text-xs font-medium">E-commerce Concept</span>
                                    </div>
                                </div>
                            </div>
                            <div className="min-w-[240px] flex-shrink-0 group">
                                <div className="relative rounded-xl overflow-hidden aspect-video mb-2 shadow-md">
                                    <img alt="UI Project 3" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBSkB-XWzr6Kwgr0_z_pknOsvU3CCvCVC0gsXJXihf672198wNgZKFpDgmsGlTRMrFf4atn9NL5ITSig-6Q3f783bc2GNvM76EyexpmSFitfZPX6HMWfhgE_F5BKSN81JNXqV2gk6k0jQf3U-hHbqBPgWg8W2j5-IJlomJjlHGQ12DBLiWDa1RnsNkWgMxnKPdFUvaq_IFYTuvuBQLgjmUhqO5hIS2jYkdedV5jULrKPLnT4HWoK_9bJINYhaj3JPQZYLOwpjmn-MJ9" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-3">
                                        <span className="text-white text-xs font-medium">SaaS Dashboard UI</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    <section className="px-6 mb-8 grid grid-cols-2 gap-4">
                        <div className="bg-white dark:bg-slate-800 p-5 rounded-xl border border-slate-100 dark:border-slate-700 flex flex-col items-center gap-3">
                            <div className="w-24 h-24 bg-slate-50 dark:bg-slate-900 rounded-lg p-2 flex items-center justify-center border border-slate-100 dark:border-slate-800">
                                <div className="w-full h-full bg-slate-200 dark:bg-slate-700 rounded flex items-center justify-center relative overflow-hidden">
                                    <div className="grid grid-cols-6 gap-0.5 opacity-40">
                                        {Array.from({ length: 36 }).map((_, i) => (
                                            <div key={i} className="w-full aspect-square bg-slate-900 dark:bg-white rounded-[1px]"></div>
                                        ))}
                                    </div>
                                    <div className="absolute inset-0 flex items-center justify-center bg-white/10">
                                        <span className="material-symbols-outlined text-primary scale-125">qr_code_2</span>
                                    </div>
                                </div>
                            </div>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter text-center">Escaneie para salvar</p>
                        </div>
                        <div className="bg-white dark:bg-slate-800 p-5 rounded-xl border border-slate-100 dark:border-slate-700 flex flex-col items-center gap-3">
                            <div className="w-full flex-1 flex flex-col justify-center items-center gap-2">
                                <div className="flex gap-0.5 items-end h-8">
                                    <div className="w-1.5 h-3 bg-primary rounded-full"></div>
                                    <div className="w-1.5 h-6 bg-primary rounded-full"></div>
                                    <div className="w-1.5 h-8 bg-primary rounded-full"></div>
                                    <div className="w-1.5 h-5 bg-primary rounded-full"></div>
                                    <div className="w-1.5 h-7 bg-primary rounded-full"></div>
                                </div>
                                <div className="flex items-center gap-1.5 text-[#1DB954]">
                                    <span className="material-symbols-outlined text-lg">music_note</span>
                                    <span className="text-[10px] font-bold uppercase">Spotify Code</span>
                                </div>
                            </div>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter text-center leading-tight">Minha vibe no Spotify</p>
                        </div>
                    </section>
                    <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto z-50 px-6 pb-6">
                        <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/50 dark:border-slate-700/50 rounded-full shadow-2xl p-2 flex items-center justify-around">
                            <a className="flex flex-col items-center gap-1 p-2 text-primary" href="#">
                                <span className="material-symbols-outlined font-variation-fill">home</span>
                                <span className="text-[10px] font-bold uppercase tracking-widest">Início</span>
                            </a>
                            <a className="flex flex-col items-center gap-1 p-2 text-slate-400" href="#">
                                <span className="material-symbols-outlined">auto_awesome_motion</span>
                                <span className="text-[10px] font-bold uppercase tracking-widest">Trabalhos</span>
                            </a>
                            <a className="flex flex-col items-center gap-1 p-2 text-slate-400" href="#">
                                <span className="material-symbols-outlined">chat_bubble</span>
                                <span className="text-[10px] font-bold uppercase tracking-widest">Contato</span>
                            </a>
                            <a className="flex flex-col items-center gap-1 p-2 text-slate-400" href="#">
                                <span className="material-symbols-outlined">person</span>
                                <span className="text-[10px] font-bold uppercase tracking-widest">Perfil</span>
                            </a>
                        </div>
                    </nav>
                    <div className="h-20"></div>
                </div>
            </div>
            <style jsx>{`
                .no-scrollbar::-webkit-scrollbar {
                    display: none;
                }
                .no-scrollbar {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
                .font-variation-fill {
                    font-variation-settings: 'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24;
                }
                .material-symbols-outlined {
                    font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
                }
            `}</style>
        </>
    );
}
