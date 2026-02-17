export default function LinkedinPage() {
    return (
        <div className="bg-background-light dark:bg-background-dark min-h-screen flex justify-center items-start sm:items-center p-0 sm:p-4">
            <div className="relative w-full max-w-md bg-white dark:bg-[#1a192e] shadow-2xl sm:rounded-xl overflow-hidden flex flex-col min-h-screen sm:min-h-0">
                <div className="h-32 bg-gradient-to-r from-primary/80 to-primary w-full relative">
                    <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(circle at 2px 2px, white 1px, transparent 0)", backgroundSize: "24px 24px" }}></div>
                </div>
                <div className="px-6 -mt-16 flex flex-col items-center">
                    <div className="relative group">
                        <div className="size-32 rounded-full border-4 border-white dark:border-[#1a192e] bg-cover bg-center shadow-lg" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBVSBlAGUJzEDYhj2erikNNAKWk_l0QwWYfhLmiZ2cp1eZVEqXe-GK-Iwp_zC7jPpL_6jPVx8CgQ8ZE5Fcs75qUK6wUj9DUtkSxxtUewiOvOBWHd1C4tAOfrU1CpvJDyQuplXhkvUYY1s1akqSPG6b-9ia9gdLeY7iEj0XLJAfcJzxhyigwLowh38-0s1tG4gonDwmdAZ2H93XP1lawXXcHnyhxRoOi8zVwUDacdNMBy_m5mM02YKUzo667wn6GJku9ODSSjBVmP62y')" }}>
                        </div>
                        <div className="absolute bottom-1 right-1 bg-primary text-white rounded-full p-0.5 border-[3px] border-white flex items-center justify-center">
                            <span className="material-symbols-outlined text-[16px] font-bold">check</span>
                        </div>
                    </div>
                    <div className="mt-4 text-center">
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Lucas Silva</h1>
                        <p className="text-primary font-semibold text-sm uppercase tracking-wider mt-1">Senior Product Designer na TechCorp</p>
                        <div className="flex items-center justify-center gap-1 text-gray-500 dark:text-gray-400 text-sm mt-1">
                            <span className="material-symbols-outlined text-sm">location_on</span>
                            <span>São Paulo, Brasil</span>
                        </div>
                    </div>
                    <div className="mt-6 text-center">
                        <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed px-4">
                            Especialista em criar experiências digitais centradas no usuário. 10+ anos transformando problemas complexos em interfaces simples e elegantes.
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
                <div className="mt-8 px-6 space-y-3">
                    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest px-1">Links Profissionais</h3>
                    <a className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-100 dark:border-gray-700 hover:border-primary/50 transition-all" href="#">
                        <div className="flex items-center gap-3">
                            <span className="material-symbols-outlined text-primary">language</span>
                            <span className="text-sm font-medium text-gray-700 dark:text-gray-200">Portfólio Behance</span>
                        </div>
                        <span className="material-symbols-outlined text-gray-400 text-sm">chevron_right</span>
                    </a>
                    <a className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-100 dark:border-gray-700 hover:border-primary/50 transition-all" href="#">
                        <div className="flex items-center gap-3">
                            <span className="material-symbols-outlined text-primary">business</span>
                            <span className="text-sm font-medium text-gray-700 dark:text-gray-200">TechCorp Website</span>
                        </div>
                        <span className="material-symbols-outlined text-gray-400 text-sm">chevron_right</span>
                    </a>
                </div>
                <div className="mt-8 px-6 pb-20">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-xl border border-dashed border-gray-300 dark:border-gray-600 flex flex-col items-center text-center">
                            <p className="text-[10px] font-bold text-gray-400 uppercase mb-3">Meu Perfil</p>
                            <div className="bg-white p-2 rounded-lg shadow-sm mb-2">
                                <img alt="QR Code LinkedIn" className="size-20" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBq2q9uQ-5QQZmBBW8imWuvz2ecGOlI4zE69m08GKfyrgghlcoTjDLb3lzYHXQlwOE65twh3mwICq9WSKVhAQLVXd_26ctMUFq9Up3aMHYQOsed94lf2EeonFwS9YyO3o1BSa8HEYi-YBojMS3y53w5ypFuWWgkxnbEQ-5YskuH-GWyb-HUdjNoKsLOYcXQolvS2XzhDg4Iz11qh6b5fAgni2LEVo5MXiYBlX2FcFK4YBvriS18CA2L9eXwwU-8D1sHaBhIUI8libf4" />
                            </div>
                            <span className="text-[10px] text-gray-500 uppercase tracking-tighter">Escaneie para seguir</span>
                        </div>
                        <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-xl border border-gray-100 dark:border-gray-700 flex flex-col items-center text-center">
                            <p className="text-[10px] font-bold text-gray-400 uppercase mb-3">Referências</p>
                            <div className="w-full h-20 bg-black rounded-lg flex items-center justify-center p-2 mb-2">
                                <div className="flex flex-col items-center gap-1">
                                    <div className="flex gap-0.5 items-end h-8">
                                        <div className="w-1 bg-green-500 h-2 rounded-full"></div>
                                        <div className="w-1 bg-green-500 h-5 rounded-full"></div>
                                        <div className="w-1 bg-green-500 h-3 rounded-full"></div>
                                        <div className="w-1 bg-green-500 h-6 rounded-full"></div>
                                        <div className="w-1 bg-green-500 h-4 rounded-full"></div>
                                    </div>
                                    <span className="text-[8px] text-white font-bold tracking-widest">SPOTIFY CODE</span>
                                </div>
                            </div>
                            <span className="text-[10px] text-gray-500 uppercase tracking-tighter">Meu Podcast de Design</span>
                        </div>
                    </div>
                </div>
                <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md border-t border-gray-100 dark:border-gray-800 bg-white dark:bg-[#1a192e] px-4 pb-3 pt-2 flex justify-between items-center z-10">
                    <a className="flex flex-1 flex-col items-center gap-1 text-gray-400" href="#">
                        <span className="material-symbols-outlined">home</span>
                        <p className="text-[10px] font-medium">Início</p>
                    </a>
                    <a className="flex flex-1 flex-col items-center gap-1 text-gray-400" href="#">
                        <span className="material-symbols-outlined">group</span>
                        <p className="text-[10px] font-medium">Rede</p>
                    </a>
                    <a className="flex flex-1 flex-col items-center gap-1 text-primary" href="#">
                        <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>person</span>
                        <p className="text-[10px] font-medium">Perfil</p>
                    </a>
                    <a className="flex flex-1 flex-col items-center gap-1 text-gray-400" href="#">
                        <span className="material-symbols-outlined">work</span>
                        <p className="text-[10px] font-medium">Vagas</p>
                    </a>
                    <a className="flex flex-1 flex-col items-center gap-1 text-gray-400" href="#">
                        <span className="material-symbols-outlined">chat</span>
                        <p className="text-[10px] font-medium">Chat</p>
                    </a>
                </div>
            </div>
        </div>
    )
}
