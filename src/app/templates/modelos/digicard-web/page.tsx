export default function DigicardWebPage() {
    return (
        <div className="bg-background-light dark:bg-background-dark min-h-screen flex justify-center items-start antialiased">
            <main className="w-full max-w-[480px] min-h-screen bg-white dark:bg-background-dark flex flex-col relative shadow-2xl">
                <div className="flex items-center justify-between p-4 sticky top-0 bg-white/80 dark:bg-background-dark/80 backdrop-blur-md z-10">
                    <div className="w-10 h-10 flex items-center justify-center text-primary">
                        <span className="material-symbols-outlined">qr_code_2</span>
                    </div>
                    <div className="flex-1 text-center">
                        <span className="text-xs font-bold uppercase tracking-widest text-primary/60 dark:text-primary/40">DigiCard Web</span>
                    </div>
                    <button className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-primary/10 text-slate-600 dark:text-slate-300 transition-colors">
                        <span className="material-symbols-outlined">share</span>
                    </button>
                </div>
                <section className="flex flex-col items-center px-6 pt-8 pb-4">
                    <div className="relative group">
                        <div className="absolute -inset-1 bg-gradient-to-tr from-primary to-blue-400 rounded-full blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
                        <div className="relative bg-center bg-no-repeat aspect-square bg-cover rounded-full h-32 w-32 border-4 border-white dark:border-slate-800 shadow-xl" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuD2VN2jnceYZwoVzLuHBPZWmE4eO3DsTnX9oCP1wsTrvO0NgLIKwq4gZIqFECThRuoees9EOFcshCaUQj6Vj9YtHlfJ4Pj5fUlMTxqAV0UbBW2K7T4cTenNw1y9qPQZDFI3L_6KUr84w-D_OZVtaVB08gPOCjGDum6WE3lYean0zEOUOiMVEe1dgCn516PoPTsLBleR42QEZCo5IkVuwwP0LigL9tMP2Dpak-RfWqzqnPrIwjvSK3qTrxRgZUcO70KyLLyQXe0jms0-')" }}>
                        </div>
                    </div>
                    <div className="mt-6 text-center">
                        <div className="flex items-center justify-center gap-1.5">
                            <h1 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">Alexandre Silva</h1>
                            <span className="material-symbols-outlined text-primary text-[20px] fill-current" title="Verified Professional" style={{fontVariationSettings: "'FILL' 1"}}>verified</span>
                        </div>
                        <p className="text-primary font-medium mt-1">Senior Software Engineer</p>
                    </div>
                    <p className="mt-4 text-center text-slate-600 dark:text-slate-400 text-sm leading-relaxed max-w-[320px]">
                        Especialista em arquitetura escalável e interfaces modernas. Transformando ideias complexas em experiências digitais simples e eficientes.
                    </p>
                    <div className="w-full mt-8 px-2">
                        <button className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-4 rounded-xl shadow-lg shadow-primary/30 flex items-center justify-center gap-2 transition-all active:scale-[0.98]">
                            <span className="material-symbols-outlined">person_add</span>
                            Salvar Contato
                        </button>
                    </div>
                </section>
                <section className="flex flex-col gap-3 px-6 py-4">
                    <a className="flex items-center gap-4 p-4 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors group" href="#">
                        <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center text-green-600">
                            <span className="material-symbols-outlined">chat</span>
                        </div>
                        <span className="flex-1 font-medium text-slate-700 dark:text-slate-200">Conversar no WhatsApp</span>
                        <span className="material-symbols-outlined text-slate-400 group-hover:translate-x-1 transition-transform">chevron_right</span>
                    </a>
                    <a className="flex items-center gap-4 p-4 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors group" href="#">
                        <div className="w-10 h-10 rounded-lg bg-pink-500/10 flex items-center justify-center text-pink-600">
                            <span className="material-symbols-outlined">camera</span>
                        </div>
                        <span className="flex-1 font-medium text-slate-700 dark:text-slate-200">Siga no Instagram</span>
                        <span className="material-symbols-outlined text-slate-400 group-hover:translate-x-1 transition-transform">chevron_right</span>
                    </a>
                    <a className="flex items-center gap-4 p-4 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors group" href="#">
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                            <span className="material-symbols-outlined">mail</span>
                        </div>
                        <span className="flex-1 font-medium text-slate-700 dark:text-slate-200">Enviar E-mail</span>
                        <span className="material-symbols-outlined text-slate-400 group-hover:translate-x-1 transition-transform">chevron_right</span>
                    </a>
                    <a className="flex items-center gap-4 p-4 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors group" href="#">
                        <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-600">
                            <span className="material-symbols-outlined">language</span>
                        </div>
                        <span className="flex-1 font-medium text-slate-700 dark:text-slate-200">Visitar Website</span>
                        <span className="material-symbols-outlined text-slate-400 group-hover:translate-x-1 transition-transform">chevron_right</span>
                    </a>
                </section>
                <section className="mt-8 px-6 pb-12">
                    <div className="rounded-2xl bg-slate-50 dark:bg-slate-900 p-6 border border-slate-100 dark:border-slate-800">
                        <h3 className="text-center text-slate-800 dark:text-slate-200 font-bold mb-6">Compartilhe meu perfil</h3>
                        <div className="flex flex-col items-center gap-6">
                            <div className="p-3 bg-white rounded-xl shadow-sm border border-slate-200">
                                <div className="w-32 h-32 bg-slate-100 flex items-center justify-center rounded-lg overflow-hidden">
                                    <img alt="QR Code for Alexandre Silva Profile" className="w-full h-full" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA9aOVDVBC2MWvfBQRZuj5zjomiQKmG43_QuGUKSmf_UfHho4J3YLYq3uGeXypxGn2a95CO7z5BB_bkf3lUh92IF_qV0qQw4fP905RYBbb3jlgel6XWrD1DhOuSgMKQZWnTvIZ7blH0f7SFU7fa-j64W2VnTLoLBwIX9FQVjN96HQZA_TkfWZuls_Pay48Ssp57GqzOwZte9OHOliI_4YeKuqrdEvP8nI_kw4EaQ3vhGKfm9V6dtHW8gt4_0w3ab39BHmpa6VxrzJ8n" />
                                </div>
                            </div>
                            <div className="w-full max-w-[200px]">
                                <div className="h-10 bg-black rounded-lg flex items-center justify-center gap-2 px-4 shadow-md">
                                    <div className="flex items-end gap-0.5 h-4">
                                        <div className="w-1 h-2 bg-white rounded-full"></div>
                                        <div className="w-1 h-3 bg-white rounded-full"></div>
                                        <div className="w-1 h-4 bg-white rounded-full"></div>
                                        <div className="w-1 h-3 bg-white rounded-full"></div>
                                        <div className="w-1 h-2 bg-white rounded-full"></div>
                                        <div className="w-1 h-3 bg-white rounded-full"></div>
                                        <div className="w-1 h-4 bg-white rounded-full"></div>
                                        <div className="w-1 h-2 bg-white rounded-full"></div>
                                    </div>
                                    <span className="text-white text-[10px] font-bold tracking-widest uppercase">Spotify Code</span>
                                </div>
                                <p className="text-[10px] text-center text-slate-400 mt-2 uppercase tracking-tighter">Minha playlist de foco</p>
                            </div>
                        </div>
                    </div>
                </section>
                <footer className="mt-auto py-8 text-center bg-slate-50 dark:bg-background-dark">
                    <p className="text-slate-400 dark:text-slate-600 text-xs font-medium tracking-tight">
                        Criado com <span className="text-primary font-bold">DigiCard Web</span>
                    </p>
                </footer>
            </main>
        </div>
    )
}
