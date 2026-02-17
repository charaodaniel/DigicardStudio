export default function ExecutivePage() {
    return (
        <>
            <div className="bg-background-light dark:bg-background-dark font-display text-slate-900 antialiased">
                <div className="relative flex min-h-screen w-full flex-col items-center justify-center p-4 sm:p-8">
                    <div className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between bg-white/80 dark:bg-background-dark/80 backdrop-blur-md p-4 border-b border-slate-200 dark:border-slate-800">
                        <button className="flex items-center gap-1 text-slate-600 dark:text-slate-400 hover:text-primary transition-colors">
                            <span className="material-symbols-outlined text-xl">arrow_back_ios</span>
                            <span className="text-sm font-medium">Voltar</span>
                        </button>
                        <h1 className="text-sm font-bold uppercase tracking-widest text-slate-400">Perfil Verificado</h1>
                        <button className="flex items-center text-slate-600 dark:text-slate-400 hover:text-primary transition-colors">
                            <span className="material-symbols-outlined text-2xl">share</span>
                        </button>
                    </div>
                    <div className="mt-16 w-full max-w-md overflow-hidden rounded-xl bg-executive-black black-card-shadow relative group">
                        <div className="absolute inset-0 pointer-events-none opacity-20 bg-gradient-to-tr from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                        <div className="absolute inset-0 border border-white/10 rounded-xl pointer-events-none"></div>
                        <div className="relative p-8 flex flex-col items-center">
                            <div className="relative mb-6">
                                <div className="absolute -inset-1 rounded-full bg-gradient-to-tr from-[#BF953F] via-[#FCF6BA] to-[#AA771C] animate-pulse"></div>
                                <div className="relative h-32 w-32 rounded-full overflow-hidden border-2 border-executive-black">
                                    <img alt="Retrato profissional de um executivo" className="h-full w-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDfNp1uSuBkVeX6mXt9dIoZyBSTt58-NgV0UUwgdHlLK3Ni3wAKGOI61toCOsTCuRNye4StT6M83h6Uq3j8RZdzD6PsdUgrLd9lf2tA4WFGY4-ewWeZmQ0IonjmG7fx9TA2riIIxfo8sN4IYBocgV7tcc6lixV9oUSK3Y-_F6SD_k6gl_9XmZdk95ykLymoRPzGeGFCPK7VbWLP7wX58Gk_5G9UcfIpXF5befEJlX1MWNq2YsNmWg89WmuVCZIwxV_-c1KF_6uSGpvG" />
                                </div>
                                <div className="absolute bottom-1 right-1 bg-white rounded-full p-0.5 shadow-lg">
                                    <span className="material-symbols-outlined text-primary text-xl font-bold" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
                                </div>
                            </div>
                            <div className="text-center space-y-2">
                                <h2 className="text-2xl font-bold tracking-tight text-white">Ricardo Alencar</h2>
                                <p className="text-sm font-medium uppercase tracking-[0.2em] gold-gradient-text">Chief Executive Officer</p>
                                <div className="flex items-center justify-center gap-2">
                                    <span className="h-[1px] w-4 bg-white/20"></span>
                                    <p className="text-slate-400 text-sm font-light">Global Tech Industries</p>
                                    <span className="h-[1px] w-4 bg-white/20"></span>
                                </div>
                            </div>
                            <div className="my-8 flex w-full justify-between border-y border-white/10 py-4 px-2">
                                <div className="text-center">
                                    <p className="text-[10px] uppercase tracking-widest text-slate-500">Conselhos</p>
                                    <p className="text-lg font-bold text-white">04</p>
                                </div>
                                <div className="text-center border-x border-white/10 px-6">
                                    <p className="text-[10px] uppercase tracking-widest text-slate-500">Investimentos</p>
                                    <p className="text-lg font-bold text-white">12+</p>
                                </div>
                                <div className="text-center">
                                    <p className="text-[10px] uppercase tracking-widest text-slate-500">Exp. Anos</p>
                                    <p className="text-lg font-bold text-white">20</p>
                                </div>
                            </div>
                            <div className="w-full text-center mb-8">
                                <h3 className="text-[10px] uppercase tracking-widest text-gold-metallic font-bold mb-2">Bio Estratégica</h3>
                                <p className="text-slate-300 text-sm leading-relaxed font-light italic">
                                    "Transformando visões globais em resultados exponenciais através de liderança resiliente e inovação disruptiva."
                                </p>
                            </div>
                            <div className="w-full space-y-3">
                                <button className="w-full py-4 rounded-lg bg-white text-executive-black font-bold text-sm uppercase tracking-widest transition-transform hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(255,255,255,0.2)]">
                                    <span className="material-symbols-outlined text-xl">person_add</span>
                                    Conectar Agora
                                </button>
                                <button className="w-full py-4 rounded-lg border border-white/20 text-white font-medium text-sm uppercase tracking-widest transition-all hover:bg-white/5 flex items-center justify-center gap-2">
                                    <span className="material-symbols-outlined text-xl">contact_page</span>
                                    Salvar VCF
                                </button>
                            </div>
                            <div className="mt-8 flex gap-6 text-slate-500">
                                <a className="hover:text-gold-metallic transition-colors" href="#">
                                    <span className="material-symbols-outlined text-2xl">hub</span>
                                </a>
                                <a className="hover:text-gold-metallic transition-colors" href="#">
                                    <span className="material-symbols-outlined text-2xl">mail</span>
                                </a>
                                <a className="hover:text-gold-metallic transition-colors" href="#">
                                    <span className="material-symbols-outlined text-2xl">language</span>
                                </a>
                            </div>
                        </div>
                        <div className="bg-gradient-to-r from-zinc-900 to-black p-4 flex justify-between items-center px-8 border-t border-white/5">
                            <p className="text-[9px] uppercase tracking-widest text-slate-600 font-bold">Black Executive ID: 8829-X</p>
                            <div className="flex items-center gap-1">
                                <div className="w-6 h-4 rounded-sm bg-slate-800 flex items-center justify-center">
                                    <div className="w-1 h-1 rounded-full bg-gold-metallic"></div>
                                </div>
                                <span className="text-[9px] text-slate-600 font-bold">PREMIUM</span>
                            </div>
                        </div>
                    </div>
                    <div className="mt-12 w-full max-w-md space-y-6">
                        <h4 className="text-xs font-bold uppercase tracking-[0.3em] text-slate-400 text-center">Reconhecimentos &amp; Ativos</h4>
                        <div className="grid grid-cols-1 gap-4">
                            <div className="flex items-center gap-4 p-4 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 hover:border-primary transition-colors cursor-pointer">
                                <div className="bg-primary/10 p-3 rounded-lg">
                                    <span className="material-symbols-outlined text-primary">award_star</span>
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-slate-900 dark:text-white">Forbes Under 40</p>
                                    <p className="text-xs text-slate-500">Destaque em Inovação Tecnológica 2023</p>
                                </div>
                                <span className="material-symbols-outlined ml-auto text-slate-300">chevron_right</span>
                            </div>
                            <div className="flex items-center gap-4 p-4 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 hover:border-primary transition-colors cursor-pointer">
                                <div className="bg-primary/10 p-3 rounded-lg">
                                    <span className="material-symbols-outlined text-primary">account_balance</span>
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-slate-900 dark:text-white">Membro do Board</p>
                                    <p className="text-xs text-slate-500">Fintech Alliance Global</p>
                                </div>
                                <span className="material-symbols-outlined ml-auto text-slate-300">chevron_right</span>
                            </div>
                        </div>
                    </div>
                    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-slate-200 px-6 pb-6 pt-3 flex justify-around items-center">
                        <a className="flex flex-col items-center gap-1 text-primary" href="#">
                            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>home</span>
                            <span className="text-[10px] font-bold uppercase tracking-tighter">Início</span>
                        </a>
                        <a className="flex flex-col items-center gap-1 text-slate-400 hover:text-primary transition-colors" href="#">
                            <span className="material-symbols-outlined">group</span>
                            <span className="text-[10px] font-bold uppercase tracking-tighter">Rede</span>
                        </a>
                        <div className="relative -top-8">
                            <button className="bg-executive-black p-4 rounded-full shadow-2xl border-4 border-background-light">
                                <span className="material-symbols-outlined text-gold-metallic text-3xl">qr_code_2</span>
                            </button>
                        </div>
                        <a className="flex flex-col items-center gap-1 text-slate-400 hover:text-primary transition-colors" href="#">
                            <span className="material-symbols-outlined">chat_bubble</span>
                            <span className="text-[10px] font-bold uppercase tracking-tighter">Mensagens</span>
                        </a>
                        <a className="flex flex-col items-center gap-1 text-slate-400 hover:text-primary transition-colors" href="#">
                            <span className="material-symbols-outlined">account_circle</span>
                            <span className="text-[10px] font-bold uppercase tracking-tighter">Perfil</span>
                        </a>
                    </div>
                </div>
            </div>
            <style jsx>{`
                .gold-gradient-text {
                    background: linear-gradient(to right, #BF953F, #FCF6BA, #B38728, #FBF5B7, #AA771C);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                }
                .black-card-shadow {
                    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
                }
                .dark .bg-executive-black {
                    background-color: #0a0a0b;
                }
            `}</style>
        </>
    )
}
