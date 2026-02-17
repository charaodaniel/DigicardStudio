export default function SpotifyPage() {
    return (
        <div className="dark">
            <div className="bg-background-dark text-white min-h-screen font-display">
                <div className="max-w-md mx-auto min-h-screen flex flex-col pb-24">
                    <header className="relative w-full aspect-square overflow-hidden shadow-2xl">
                        <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-transparent to-transparent z-10"></div>
                        <img alt="Artist Profile" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB2AZc3orfUWBy1Sg58X18D8SUmnBK1l0_Y1iO7zHWr-X6M1Pdlewp9k805OXiEcmKy-EETK65Km8kM7NV3LEHCFhFwSjV2IochZ2TtkpoLpI7Xw6rbGsiKBLf_MLEfORrIn5uL7-UT22YWtKLcaUpTwwHnS4QSF5TKBzZPusanSZKqvcOsBY4zUr1pky6Y78PiB6vx9gX_eaPXEO79M36RyTW5KyOe96ov5bEWYucPzko6AGztkrfdRwbNQeBxL3Ov98tup5ruhyym" />
                        <div className="absolute bottom-6 left-6 z-20">
                            <div className="flex items-center gap-2 mb-1">
                                <span className="material-symbols-outlined text-blue-400 text-xl fill-1" style={{fontVariationSettings: "'FILL' 1"}}>verified</span>
                                <span className="text-xs font-bold uppercase tracking-widest text-blue-400">Artista Verificado</span>
                            </div>
                            <h1 className="text-4xl font-black tracking-tighter">Nome do Artista</h1>
                            <p className="text-gray-400 text-sm mt-1">1.2M ouvintes mensais • São Paulo, BR</p>
                        </div>
                    </header>
                    <div className="px-4 -mt-4 z-30">
                        <div className="glass rounded-xl p-4 shadow-xl">
                            <div className="flex items-center justify-between mb-3">
                                <div className="flex items-center gap-2">
                                    <span className="relative flex h-2 w-2">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-spotify-green opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-2 w-2 bg-spotify-green"></span>
                                    </span>
                                    <span className="text-[10px] font-bold uppercase tracking-widest text-spotify-green">Ouvindo Agora</span>
                                </div>
                                <span className="material-symbols-outlined text-spotify-green text-xl">graphic_eq</span>
                            </div>
                            <div className="flex gap-4">
                                <div className="size-14 rounded-lg overflow-hidden shrink-0 shadow-lg">
                                    <img alt="Album Art" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAHGp_G2M78C9Rw58MoXH4TKXvDWj7yCcnSfFBjAG_lhLJ7nOyDcXugJSfEGXnOHWB8-OovjbnF6eJ9LqpBluo_iSjvSs4jqS2occSW-h0F20CVKoAMCRDtbDX4zwro8S8b75vYUKQNvVdc7P3C9u7iehUd9ShIUvms9ekmmLYpoV1WT5OIlbBsXjr5oZL0iIPeZJj2PNZhlCtVl36B1aYZ9S70I0A9GbiYvoGp_flrB7fhRv1hZvXIgy0F5pyynyEZkSm_3ud22Qoj" />
                                </div>
                                <div className="flex flex-col justify-center overflow-hidden">
                                    <p className="font-bold truncate">Madrugada Eterna (Remix)</p>
                                    <p className="text-sm text-gray-400 truncate">Nome do Artista, Synth Wave Collective</p>
                                </div>
                            </div>
                            <div className="mt-4 space-y-1">
                                <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
                                    <div className="h-full bg-spotify-green w-[65%] rounded-full"></div>
                                </div>
                                <div className="flex justify-between text-[10px] text-gray-500 font-medium">
                                    <span>2:14</span>
                                    <span>3:30</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <main className="px-4 mt-8 flex-1">
                        <h3 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-4 px-1">Links &amp; Lançamentos</h3>
                        <div className="space-y-3">
                            <a className="flex items-center justify-between p-4 bg-white/5 hover:bg-white/10 border border-white/5 rounded-xl transition-all group" href="#">
                                <div className="flex items-center gap-4">
                                    <div className="text-gray-500 font-mono text-sm">01</div>
                                    <div>
                                        <p className="font-semibold group-hover:text-spotify-green transition-colors">Último Lançamento</p>
                                        <p className="text-xs text-gray-400">Ouça "Madrugada Eterna" em todas as plataformas</p>
                                    </div>
                                </div>
                                <span className="material-symbols-outlined text-gray-400 group-hover:text-white">play_circle</span>
                            </a>
                            <a className="flex items-center justify-between p-4 bg-white/5 hover:bg-white/10 border border-white/5 rounded-xl transition-all group" href="#">
                                <div className="flex items-center gap-4">
                                    <div className="text-gray-500 font-mono text-sm">02</div>
                                    <div>
                                        <p className="font-semibold group-hover:text-spotify-green transition-colors">Agenda de Shows</p>
                                        <p className="text-xs text-gray-400">Confira as próximas datas da Tour 2024</p>
                                    </div>
                                </div>
                                <span className="material-symbols-outlined text-gray-400 group-hover:text-white">confirmation_number</span>
                            </a>
                            <a className="flex items-center justify-between p-4 bg-white/5 hover:bg-white/10 border border-white/5 rounded-xl transition-all group" href="#">
                                <div className="flex items-center gap-4">
                                    <div className="text-gray-500 font-mono text-sm">03</div>
                                    <div>
                                        <p className="font-semibold group-hover:text-spotify-green transition-colors">Loja Oficial</p>
                                        <p className="text-xs text-gray-400">Merchandising exclusivo e vinis autografados</p>
                                    </div>
                                </div>
                                <span className="material-symbols-outlined text-gray-400 group-hover:text-white">shopping_bag</span>
                            </a>
                            <a className="flex items-center justify-between p-4 bg-white/5 hover:bg-white/10 border border-white/5 rounded-xl transition-all group" href="#">
                                <div className="flex items-center gap-4">
                                    <div className="text-gray-500 font-mono text-sm">04</div>
                                    <div>
                                        <p className="font-semibold group-hover:text-spotify-green transition-colors">Newsletter VIP</p>
                                        <p className="text-xs text-gray-400">Receba notícias e conteúdos exclusivos</p>
                                    </div>
                                </div>
                                <span className="material-symbols-outlined text-gray-400 group-hover:text-white">mail</span>
                            </a>
                        </div>
                    </main>
                    <section className="px-4 mt-12 mb-8 flex flex-col items-center">
                        <div className="bg-primary/20 p-6 rounded-2xl w-full border border-primary/30 flex flex-col items-center gap-4 text-center">
                            <div className="bg-primary rounded-xl p-4 w-full max-w-[280px] shadow-lg shadow-primary/20">
                                <div className="h-12 w-full flex items-center justify-center gap-1.5 overflow-hidden">
                                    <div className="w-1.5 h-3 bg-white rounded-full"></div>
                                    <div className="w-1.5 h-6 bg-white rounded-full"></div>
                                    <div className="w-1.5 h-8 bg-white rounded-full"></div>
                                    <div className="w-1.5 h-4 bg-white rounded-full"></div>
                                    <div className="w-1.5 h-10 bg-white rounded-full"></div>
                                    <div className="w-1.5 h-6 bg-white rounded-full"></div>
                                    <div className="w-1.5 h-8 bg-white rounded-full"></div>
                                    <div className="w-1.5 h-4 bg-white rounded-full"></div>
                                    <div className="w-1.5 h-6 bg-white rounded-full"></div>
                                    <div className="w-1.5 h-2 bg-white rounded-full"></div>
                                    <div className="w-1.5 h-4 bg-white rounded-full"></div>
                                    <div className="w-1.5 h-8 bg-white rounded-full"></div>
                                    <div className="w-1.5 h-5 bg-white rounded-full"></div>
                                    <div className="w-1.5 h-2 bg-white rounded-full"></div>
                                </div>
                                <div className="text-white text-[10px] font-bold tracking-[0.2em] uppercase mt-2 text-center opacity-80">
                                    spotify
                                </div>
                            </div>
                            <div>
                                <h4 className="font-bold text-sm">Escaneie para ouvir</h4>
                                <p className="text-xs text-gray-400 mt-1">Abra o Spotify, toque em pesquisar e na câmera</p>
                            </div>
                        </div>
                    </section>
                    <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-sm z-50">
                        <div className="bg-background-dark/80 backdrop-blur-xl border border-white/10 p-2 rounded-full shadow-2xl flex items-center justify-between">
                            <div className="flex items-center gap-1 pl-2">
                                <button className="size-10 rounded-full flex items-center justify-center text-gray-400 hover:bg-white/5">
                                    <span className="material-symbols-outlined">home</span>
                                </button>
                                <button className="size-10 rounded-full flex items-center justify-center text-gray-400 hover:bg-white/5">
                                    <span className="material-symbols-outlined">share</span>
                                </button>
                            </div>
                            <button className="bg-spotify-green hover:bg-spotify-green/90 text-background-dark font-black px-8 py-3 rounded-full text-sm uppercase tracking-wider shadow-lg shadow-spotify-green/20 transition-transform active:scale-95">
                                Seguir no Spotify
                            </button>
                        </div>
                    </nav>
                    <footer className="mt-auto py-8 text-center px-4">
                        <p className="text-[10px] text-gray-600 uppercase tracking-widest font-semibold">© 2024 Nome do Artista • Feito para Fans</p>
                    </footer>
                </div>
                <style jsx>{`
                    .glass {
                        background: rgba(255, 255, 255, 0.05);
                        backdrop-filter: blur(12px);
                        -webkit-backdrop-filter: blur(12px);
                        border: 1px solid rgba(255, 255, 255, 0.1);
                    }
                    .dark .bg-spotify-green { background-color: #1DB954 }
                `}</style>
            </div>
        </div>
    )
}
