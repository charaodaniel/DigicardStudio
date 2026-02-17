export default function YoutubePage() {
    return (
        <div className="bg-background-light dark:bg-background-dark font-display antialiased">
            <div className="relative mx-auto min-h-screen max-w-md bg-white dark:bg-slate-900 shadow-2xl flex flex-col overflow-x-hidden">
                <div className="sticky top-0 z-50 flex items-center bg-white/80 dark:bg-slate-900/80 backdrop-blur-md p-4 justify-between border-b border-gray-100 dark:border-slate-800">
                    <div className="text-slate-900 dark:text-white flex size-10 shrink-0 items-center justify-center cursor-pointer hover:bg-gray-100 dark:hover:bg-slate-800 rounded-full transition-colors">
                        <span className="material-symbols-outlined">arrow_back</span>
                    </div>
                    <h2 className="text-slate-900 dark:text-white text-base font-bold leading-tight tracking-tight flex-1 text-center">Perfil Oficial</h2>
                    <div className="flex w-10 items-center justify-end">
                        <button className="flex size-10 items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-slate-800 text-slate-900 dark:text-white transition-colors">
                            <span className="material-symbols-outlined">share</span>
                        </button>
                    </div>
                </div>
                <div className="relative flex flex-col items-center pt-8 pb-6 px-4">
                    <div className="relative group">
                        <div className="absolute -inset-1 bg-gradient-to-tr from-youtube-red to-red-400 rounded-full blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
                        <div className="relative bg-white p-1 rounded-full border-2 border-youtube-red">
                            <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full h-32 w-32 md:h-40 md:w-40" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuA__Suu_3S2MvxppnFseEFZEwg6FsuW_IDpN8ydhvuo3LAwyV-AfsjjUZqwSsXq-fyrvHyLovAH-fpFrRE6hGpA-oLOh-zGC0Tzix84ZN8QpCWh73TUAlLbBgHDE8scVieTehbBCi8uZ5yRF8dmx_3H0JUzMpFKqGIIXWBedAdHWRNLl6APkcJmmpN84XOG2FIEX9gnWPkPZVGBpR8tgwEZgIaduUvw0pbit2HDtE5QgRKvLeC6_E2Yy9VVg9DoIsK8M_MxStK1Ohxm')" }}>
                            </div>
                        </div>
                        <div className="absolute bottom-1 left-1/2 -translate-x-1/2 bg-youtube-red text-white text-[10px] font-bold px-3 py-0.5 rounded-full uppercase tracking-wider border-2 border-white dark:border-slate-900 animate-pulse">
                            AO VIVO
                        </div>
                    </div>
                    <div className="mt-6 flex flex-col items-center text-center gap-1">
                        <div className="flex items-center gap-1.5">
                            <h1 className="text-slate-900 dark:text-white text-2xl font-black leading-tight tracking-tight">Thiago Verso</h1>
                            <span className="material-symbols-outlined text-blue-500 fill-current text-[20px]" title="Verificado" style={{fontVariationSettings: "'FILL' 1"}}>verified</span>
                        </div>
                        <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">@thiago_verso_oficial</p>
                        <div className="flex items-center gap-2 mt-2 bg-background-light dark:bg-slate-800 px-4 py-1.5 rounded-full">
                            <span className="text-youtube-red font-bold">1.2M</span>
                            <span className="text-slate-500 dark:text-slate-400 text-xs font-semibold">Inscritos no YouTube</span>
                        </div>
                    </div>
                    <div className="w-full mt-8 flex flex-col gap-3">
                        <button className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-4 rounded-xl shadow-lg shadow-primary/25 flex items-center justify-center gap-2 transition-transform active:scale-95">
                            <span className="material-symbols-outlined">subscriptions</span>
                            Inscreva-se no Canal
                        </button>
                        <button className="w-full bg-white dark:bg-slate-800 border-2 border-gray-100 dark:border-slate-700 text-slate-900 dark:text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-colors hover:bg-gray-50 dark:hover:bg-slate-700">
                            <span className="material-symbols-outlined">play_circle</span>
                            Último Vídeo
                        </button>
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-4 px-4 pb-6">
                    <div className="flex flex-col gap-1 rounded-xl p-4 bg-background-light dark:bg-slate-800 border border-transparent hover:border-youtube-red/20 transition-all">
                        <p className="text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-wider">Visualizações</p>
                        <p className="text-slate-900 dark:text-white text-2xl font-black">45.2M</p>
                        <p className="text-emerald-500 text-xs font-bold flex items-center gap-1">
                            <span className="material-symbols-outlined text-[14px]">trending_up</span> +12% esse mês
                        </p>
                    </div>
                    <div className="flex flex-col gap-1 rounded-xl p-4 bg-background-light dark:bg-slate-800 border border-transparent hover:border-youtube-red/20 transition-all">
                        <p className="text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-wider">Vídeos Postados</p>
                        <p className="text-slate-900 dark:text-white text-2xl font-black">312</p>
                        <p className="text-emerald-500 text-xs font-bold flex items-center gap-1">
                            <span className="material-symbols-outlined text-[14px]">check_circle</span> Frequência OK
                        </p>
                    </div>
                </div>
                <div className="px-4 pb-6">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-slate-900 dark:text-white text-lg font-black tracking-tight">Vídeos Recentes</h3>
                        <a className="text-primary text-sm font-bold hover:underline" href="#">Ver todos</a>
                    </div>
                    <div className="flex flex-col gap-4">
                        <div className="group relative flex flex-col gap-2 rounded-xl overflow-hidden bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow">
                            <div className="aspect-video relative overflow-hidden">
                                <img className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDBymw7mK60SEijWQhG8srBVaipglgUH4Rk0D5APPTjFks-lIM1KAEVnRPvPi3nq9DdX5tfUSITSeWybTF-bpXoiaZ56bA18gUHwXyB5gbscrXue7DDsKdI0VspcMqGLoAzwA6DBoF1ZRk2hw7mwKxv5oX32qLm0BaQ7zoixTI6tOL2ss9H5ldwb94pCFLOJ7hNqx4rEtUdE2tIt0oSiG97kUx_khkNB0VYEUoOZJ0B-K4xKGbzUAoRJUV3YU84pt8o7qRgqASW3dZ4" />
                                <div className="absolute bottom-2 right-2 bg-black/80 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">
                                    12:45
                                </div>
                                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/20">
                                    <span className="material-symbols-outlined text-white text-5xl">play_circle</span>
                                </div>
                            </div>
                            <div className="p-3">
                                <h4 className="text-slate-900 dark:text-white font-bold leading-tight line-clamp-2">COMO MONTEI MEU NOVO SETUP 2024 - O GUIA DEFINITIVO</h4>
                                <div className="flex items-center gap-2 mt-2 text-slate-500 dark:text-slate-400 text-xs">
                                    <span>243 mil visualizações</span>
                                    <span>•</span>
                                    <span>há 2 dias</span>
                                </div>
                            </div>
                        </div>
                        <div className="group relative flex flex-col gap-2 rounded-xl overflow-hidden bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow">
                            <div className="aspect-video relative overflow-hidden">
                                <img className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBAJ63QYCDBEOY6EHsd416yaS0PaUI2IG58ri1NLLeXx5hEXuiFAxRK53i6t1uYVIxgEVosnDvQ3M0L1AnVRD-7s5CqyOzAPjZmtTu4h6PWYsw9dpgPCJqcH97dVeJa042cXltFYajKymKjwOZ1ahFI8WOudSK7twX2jK-7muquKYiZZ--2Ozkaqr_giZed8wVF1W4h5Tp66KSiLja97ATqTF8vyeRhoUZGyBEItb2Qcx9e59RFarlTFxFsMtDvKF631_WKf5Uted0H" />
                                <div className="absolute bottom-2 right-2 bg-black/80 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">
                                    08:12
                                </div>
                                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/20">
                                    <span className="material-symbols-outlined text-white text-5xl">play_circle</span>
                                </div>
                            </div>
                            <div className="p-3">
                                <h4 className="text-slate-900 dark:text-white font-bold leading-tight line-clamp-2">POR QUE VOCÊ NÃO DEVE APRENDER PYTHON EM 2024?</h4>
                                <div className="flex items-center gap-2 mt-2 text-slate-500 dark:text-slate-400 text-xs">
                                    <span>1.1M visualizações</span>
                                    <span>•</span>
                                    <span>há 1 semana</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="px-4 pb-24">
                    <h3 className="text-slate-900 dark:text-white text-lg font-black tracking-tight mb-4">Outras Redes</h3>
                    <div className="flex flex-col gap-3">
                        <a className="flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r from-purple-50 to-pink-50 dark:from-slate-800 dark:to-slate-800 border border-purple-100 dark:border-slate-700 group hover:scale-[1.02] transition-transform" href="#">
                            <div className="size-10 rounded-lg bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 flex items-center justify-center text-white shadow-lg">
                                <span className="material-symbols-outlined">photo_camera</span>
                            </div>
                            <div className="flex-1">
                                <p className="text-slate-900 dark:text-white font-bold">Instagram</p>
                                <p className="text-slate-500 dark:text-slate-400 text-xs">Acompanhe meu dia a dia</p>
                            </div>
                            <span className="material-symbols-outlined text-slate-400 group-hover:text-primary transition-colors">chevron_right</span>
                        </a>
                        <a className="flex items-center gap-4 p-4 rounded-xl bg-blue-50/50 dark:bg-slate-800 border border-blue-100 dark:border-slate-700 group hover:scale-[1.02] transition-transform" href="#">
                            <div className="size-10 rounded-lg bg-[#5865F2] flex items-center justify-center text-white shadow-lg">
                                <span className="material-symbols-outlined">forum</span>
                            </div>
                            <div className="flex-1">
                                <p className="text-slate-900 dark:text-white font-bold">Comunidade Discord</p>
                                <p className="text-slate-500 dark:text-slate-400 text-xs">Venha trocar uma ideia</p>
                            </div>
                            <span className="material-symbols-outlined text-slate-400 group-hover:text-primary transition-colors">chevron_right</span>
                        </a>
                        <a className="flex items-center gap-4 p-4 rounded-xl bg-orange-50/50 dark:bg-slate-800 border border-orange-100 dark:border-slate-700 group hover:scale-[1.02] transition-transform" href="#">
                            <div className="size-10 rounded-lg bg-orange-500 flex items-center justify-center text-white shadow-lg">
                                <span className="material-symbols-outlined">storefront</span>
                            </div>
                            <div className="flex-1">
                                <p className="text-slate-900 dark:text-white font-bold">Loja Oficial</p>
                                <p className="text-slate-500 dark:text-slate-400 text-xs">Merch exclusivo do canal</p>
                            </div>
                            <span className="material-symbols-outlined text-slate-400 group-hover:text-primary transition-colors">chevron_right</span>
                        </a>
                    </div>
                </div>
                <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-gray-100 dark:border-slate-800 px-6 py-3 pb-6 flex items-center justify-between z-50">
                    <a className="flex flex-col items-center gap-1 text-primary" href="#">
                        <span className="material-symbols-outlined fill-current" style={{fontVariationSettings: "'FILL' 1"}}>home</span>
                        <span className="text-[10px] font-bold">Início</span>
                    </a>
                    <a className="flex flex-col items-center gap-1 text-slate-400 dark:text-slate-500 hover:text-primary transition-colors" href="#">
                        <span className="material-symbols-outlined">video_library</span>
                        <span className="text-[10px] font-bold">Vídeos</span>
                    </a>
                    <a className="flex flex-col items-center gap-1 text-slate-400 dark:text-slate-500 hover:text-primary transition-colors" href="#">
                        <span className="material-symbols-outlined">group</span>
                        <span className="text-[10px] font-bold">Comunidade</span>
                    </a>
                    <a className="flex flex-col items-center gap-1 text-slate-400 dark:text-slate-500 hover:text-primary transition-colors" href="#">
                        <span className="material-symbols-outlined">mail</span>
                        <span className="text-[10px] font-bold">Contato</span>
                    </a>
                </div>
            </div>
        </div>
    )
}
