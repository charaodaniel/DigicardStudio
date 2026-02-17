export default function TiktokPage() {
    return (
        <div className="bg-background-light dark:bg-background-dark font-display text-[#121117] min-h-screen flex justify-center">
            <div className="relative w-full max-w-[480px] min-h-screen bg-white shadow-2xl flex flex-col overflow-x-hidden">
                <div className="relative h-64 w-full overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-transparent z-10"></div>
                    <img alt="Banner Background" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDcc3BAFWQ4a0pG1HuEHCLXYn21udblAKbOIbu3Go3hMdfSOeIy9DEsqNGL_owlUwt6lgE7ySO7gO-BDpOwadXHcCfES7VRR2usJxNhZpCsOkoiKTCdQocIgtX5Ll8dfpjGrXZhgN4THAUpm-PPOzh3u-XPjtJTXEuxugd9vQrFKmSeQQlQE__PHr6IHib2zvmN4FdBPR3PL0bgrvcm5fmPPlNmOjh7iWltTr2hhF330efZLXnfiDXyknwS1Nn8RipuT6McGyJQzbBr" />
                    <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-center z-20">
                        <button className="bg-white/20 backdrop-blur-md rounded-full p-2 text-white hover:bg-white/40">
                            <span className="material-symbols-outlined">arrow_back</span>
                        </button>
                        <button className="bg-white/20 backdrop-blur-md rounded-full p-2 text-white hover:bg-white/40">
                            <span className="material-symbols-outlined">more_horiz</span>
                        </button>
                    </div>
                </div>
                <div className="relative px-6 -mt-16 z-30 flex flex-col items-center">
                    <div className="relative">
                        <div className="w-32 h-32 rounded-full p-1 bg-gradient-to-tr from-neon-pink via-primary to-neon-cyan neon-border-pink">
                            <div className="w-full h-full rounded-full overflow-hidden border-4 border-white bg-white">
                                <img alt="Profile Picture" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCG9pAtK4qiT0Qm1q82pUk-1_v0cGHqcYlQdIZJcQINFrsILxVTyd1c6K4sHAyCuqK6jRH2ZsK1NtKE_4KlJqVO37_GU9ees9u6vdrVpdcldxsPwkroV4mhNQQbgmdJ1FHoFZLGc5mlJswVJiTFbU7VmTdrlK93H1zQu812o9mO1teOh06AM7LidHsQ3JR9-aL5EvGcZHc_mlwOBc1B-q1pW6Nmo2AHQ-X_wL3SIuDCnYp3YvlEcu0JMX-0ltidEXQAYgMjfbhD4nxV" />
                            </div>
                        </div>
                        <div className="absolute bottom-2 right-2 w-6 h-6 bg-green-500 border-4 border-white rounded-full"></div>
                    </div>
                    <div className="mt-4 text-center">
                        <div className="flex items-center justify-center gap-1">
                            <h1 className="text-2xl font-bold tracking-tight">@criador_oficial</h1>
                            <span className="material-symbols-outlined text-neon-cyan fill-1 text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
                        </div>
                        <p className="text-gray-600 mt-1 max-w-[280px]">Conteúdo diário de lifestyle e humor. 🚀</p>
                        <p className="text-primary font-medium text-sm mt-1">Lifestyle • Gaming • Humor</p>
                    </div>
                    <div className="flex w-full mt-6 justify-center gap-8 py-4 border-y border-gray-100">
                        <div className="text-center">
                            <p className="text-xl font-bold">1.2M</p>
                            <p className="text-xs text-gray-400 uppercase tracking-widest">Seguidores</p>
                        </div>
                        <div className="text-center">
                            <p className="text-xl font-bold">15M</p>
                            <p className="text-xs text-gray-400 uppercase tracking-widest">Curtidas</p>
                        </div>
                        <div className="text-center">
                            <p className="text-xl font-bold">142</p>
                            <p className="text-xs text-gray-400 uppercase tracking-widest">Seguindo</p>
                        </div>
                    </div>
                    <div className="flex w-full gap-3 mt-6">
                        <button className="flex-1 bg-primary text-white font-bold py-3 rounded-xl hover:bg-primary/90 transition shadow-lg shadow-primary/20 flex items-center justify-center gap-2">
                            <span className="material-symbols-outlined text-sm">person_add</span>
                            Seguir
                        </button>
                        <button className="flex-1 bg-gray-100 text-gray-800 font-bold py-3 rounded-xl hover:bg-gray-200 transition flex items-center justify-center gap-2">
                            <span className="material-symbols-outlined text-sm">mail</span>
                            Mensagem
                        </button>
                    </div>
                    <div className="w-full mt-8 space-y-3 pb-24">
                        <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-2">Meus Links</h3>
                        <a className="group relative flex items-center p-4 rounded-xl border-2 border-neon-pink bg-white hover:bg-neon-pink/5 transition overflow-hidden" href="#">
                            <div className="flex-1 flex items-center gap-4">
                                <div className="bg-neon-pink text-white p-2 rounded-lg group-hover:scale-110 transition">
                                    <span className="material-symbols-outlined">play_circle</span>
                                </div>
                                <div>
                                    <p className="font-bold">Meu último vídeo no TikTok</p>
                                    <p className="text-xs text-gray-500">Confira o que rolou hoje!</p>
                                </div>
                            </div>
                            <span className="material-symbols-outlined text-gray-300">chevron_right</span>
                        </a>
                        <a className="flex items-center p-4 rounded-xl bg-gray-50 border border-gray-200 hover:border-primary hover:bg-white transition group" href="#">
                            <div className="flex-1 flex items-center gap-4">
                                <div className="bg-primary/10 text-primary p-2 rounded-lg">
                                    <span className="material-symbols-outlined">shopping_bag</span>
                                </div>
                                <div>
                                    <p className="font-bold">Loja Oficial</p>
                                    <p className="text-xs text-gray-500">Merch exclusivo da temporada</p>
                                </div>
                            </div>
                            <span className="material-symbols-outlined text-gray-300 group-hover:text-primary">chevron_right</span>
                        </a>
                        <a className="flex items-center p-4 rounded-xl bg-gray-50 border border-gray-200 hover:border-neon-cyan hover:bg-white transition group" href="#">
                            <div className="flex-1 flex items-center gap-4">
                                <div className="bg-neon-cyan/10 text-neon-cyan p-2 rounded-lg">
                                    <span className="material-symbols-outlined">work</span>
                                </div>
                                <div>
                                    <p className="font-bold">Parcerias e Contato</p>
                                    <p className="text-xs text-gray-500">E-mail comercial aqui</p>
                                </div>
                            </div>
                            <span className="material-symbols-outlined text-gray-300 group-hover:text-neon-cyan">chevron_right</span>
                        </a>
                        <a className="flex items-center justify-center p-4 rounded-xl bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045] text-white font-bold gap-2" href="#">
                            <span className="material-symbols-outlined">camera</span>
                            Me siga no Instagram
                        </a>
                    </div>
                </div>
                <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[480px] bg-white border-t border-gray-100 px-4 py-3 flex justify-between items-center z-50">
                    <a className="flex flex-col items-center text-gray-400 hover:text-primary transition" href="#">
                        <span className="material-symbols-outlined">home</span>
                    </a>
                    <a className="flex flex-col items-center text-gray-400 hover:text-primary transition" href="#">
                        <span className="material-symbols-outlined">search</span>
                    </a>
                    <a className="flex flex-col items-center" href="#">
                        <div className="bg-gradient-to-tr from-neon-pink to-neon-cyan p-0.5 rounded-lg shadow-lg">
                            <div className="bg-white rounded-[7px] px-3 py-1 flex items-center justify-center">
                                <span className="material-symbols-outlined font-bold text-black">add</span>
                            </div>
                        </div>
                    </a>
                    <a className="flex flex-col items-center text-gray-400 hover:text-primary transition" href="#">
                        <span className="material-symbols-outlined">chat_bubble</span>
                    </a>
                    <a className="flex flex-col items-center text-black" href="#">
                        <span className="material-symbols-outlined fill-1" style={{ fontVariationSettings: "'FILL' 1" }}>person</span>
                    </a>
                </div>
            </div>
            <style jsx>{`
                .neon-border-pink {
                    box-shadow: 0 0 10px rgba(255, 0, 80, 0.5);
                }
                .dark .bg-neon-cyan { background-color: #00f2ea }
                .dark .text-neon-cyan { color: #00f2ea }
                .dark .border-neon-cyan { border-color: #00f2ea }
                .dark .bg-neon-cyan\/10 { background-color: rgba(0, 242, 234, 0.1) }

                .dark .bg-neon-pink { background-color: #ff0050 }
                .dark .border-neon-pink { border-color: #ff0050 }
                .dark .hover\:bg-neon-pink\/5:hover { background-color: rgba(255, 0, 80, 0.05) }

            `}</style>
        </div>
    )
}
