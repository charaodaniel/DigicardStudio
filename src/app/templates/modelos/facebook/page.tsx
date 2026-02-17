export default function FacebookPage() {
    return (
        <div className="bg-background-light dark:bg-background-dark font-display antialiased text-[#121117] dark:text-white">
            <div className="max-w-md mx-auto min-h-screen bg-white dark:bg-[#1c1b2b] shadow-xl flex flex-col relative overflow-hidden">
                <div className="flex items-center bg-white dark:bg-[#1c1b2b] p-4 sticky top-0 z-20 border-b border-gray-100 dark:border-gray-800">
                    <div className="text-[#121117] dark:text-white flex size-10 shrink-0 items-center cursor-pointer">
                        <span className="material-symbols-outlined">arrow_back</span>
                    </div>
                    <h2 className="text-[#121117] dark:text-white text-lg font-bold leading-tight tracking-tight flex-1 ml-2">Perfil</h2>
                    <div className="flex w-10 items-center justify-end">
                        <button className="text-[#121117] dark:text-white">
                            <span className="material-symbols-outlined">more_horiz</span>
                        </button>
                    </div>
                </div>
                <div className="relative">
                    <div className="w-full h-48 bg-gray-200 dark:bg-gray-700 bg-center bg-cover" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuD0HuXKS7H4iEQTo4ZwbfAJSD5OG55l6voJqVCHt21We1NCw-Ju3VutQKg-DLLXG2GSMp1u_24XvIMlDofxPXtchmKop7Vq1RA5rXzDoNl3gZyhFGl1fX8X82rWGJI0g1ObHxdS3Z0FpjmZrNV4M1dgHZU9EJx27rO-k9DsI4rpYxLgPZCaXSsQetQI5nsoeFwj2YqxgkHPow1JAgnDWaU0EnOigabol0g8x1irYVYXpAIqlZ_XVVEA_UQAivb-iI0l3HlAaipnnHA5')" }}>
                    </div>
                    <div className="absolute -bottom-16 left-4 p-1 bg-white dark:bg-[#1c1b2b] rounded-full shadow-lg">
                        <div className="size-32 rounded-full border-4 border-white dark:border-[#1c1b2b] bg-center bg-cover bg-gray-300" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDUYmlZDWLNyvkmv4BQwBLlgqF3gR8TINCYo5pI_z5yPM3t4OYb44YyC8G0hO2OLKUk2paFSpT9FgM2Ao-RobVlfiRaLF1HjSj2AMHzRJdpIsiT6AIun6uN4V_iN0ni0rlE1ayK56Lu89O7Gz4QCa-636InQROyb2aA3iLh3a3Tl90fMP-Di1NI-NGH1jZFwmUk88vmS4X9yB3dxTn78bWmkKbGzFVLtDkm_j228AQtWZghj0mLSVJJ1TLnIf-dm6DL14_SB6QaerbQ')" }}>
                        </div>
                    </div>
                </div>
                <div className="mt-20 px-4 flex flex-col gap-4">
                    <div>
                        <div className="flex items-center gap-1.5">
                            <h1 className="text-2xl font-bold tracking-tight">João Silva</h1>
                            <span className="material-symbols-outlined text-primary fill-icon text-xl" title="Verificado" style={{fontVariationSettings: "'FILL' 1"}}>verified</span>
                        </div>
                        <p className="text-[#656487] dark:text-gray-400 text-base">@joaosilva_oficial</p>
                        <p className="mt-3 text-[#121117] dark:text-gray-200 text-base leading-relaxed">
                            Criador de conteúdo e entusiasta de tecnologia. Compartilhando as melhores dicas de gadgets e lifestyle digital todos os dias. 🚀
                        </p>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-3 w-full">
                        <button className="flex-1 bg-primary hover:bg-opacity-90 text-white font-bold py-2.5 rounded-lg flex items-center justify-center gap-2 transition-all">
                            <span className="material-symbols-outlined text-xl fill-icon" style={{fontVariationSettings: "'FILL' 1"}}>social_leaderboard</span>
                            Ver Perfil no Facebook
                        </button>
                        <button className="flex-1 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-[#121117] dark:text-white font-bold py-2.5 rounded-lg flex items-center justify-center gap-2 transition-all">
                            <span className="material-symbols-outlined text-xl">chat_bubble</span>
                            Enviar Mensagem
                        </button>
                    </div>
                    <div className="grid grid-cols-2 gap-3 py-2">
                        <div className="flex flex-col gap-1 rounded-lg border border-gray-100 dark:border-gray-800 p-4 bg-gray-50/50 dark:bg-gray-900/30">
                            <p className="text-[#121117] dark:text-white text-2xl font-bold">1.2k</p>
                            <p className="text-[#656487] dark:text-gray-400 text-xs font-medium uppercase tracking-wider">Seguidores</p>
                        </div>
                        <div className="flex flex-col gap-1 rounded-lg border border-gray-100 dark:border-gray-800 p-4 bg-gray-50/50 dark:bg-gray-900/30">
                            <p className="text-[#121117] dark:text-white text-2xl font-bold">450</p>
                            <p className="text-[#656487] dark:text-gray-400 text-xs font-medium uppercase tracking-wider">Seguindo</p>
                        </div>
                    </div>
                    <div className="flex flex-col gap-4 py-2 border-t border-gray-100 dark:border-gray-800 pt-6">
                        <div className="flex items-center gap-3 text-[#656487] dark:text-gray-400">
                            <span className="material-symbols-outlined text-gray-400">location_on</span>
                            <span className="text-sm font-medium">São Paulo, Brasil</span>
                        </div>
                        <div className="flex items-center gap-3 text-primary">
                            <span className="material-symbols-outlined">link</span>
                            <a className="text-sm font-medium hover:underline" href="#">link.me/joaosilva_tech</a>
                        </div>
                        <div className="flex items-center gap-3 text-[#656487] dark:text-gray-400">
                            <span className="material-symbols-outlined text-gray-400">calendar_today</span>
                            <span className="text-sm font-medium">Entrou em Julho de 2012</span>
                        </div>
                    </div>
                </div>
                <div className="flex-grow"></div>
                <div className="sticky bottom-0 bg-white dark:bg-[#1c1b2b] border-t border-gray-100 dark:border-gray-800 px-4 py-3 flex justify-between items-center z-30">
                    <a className="flex flex-col items-center gap-1 text-primary" href="#">
                        <span className="material-symbols-outlined fill-icon" style={{fontVariationSettings: "'FILL' 1"}}>home</span>
                        <span className="text-[10px] font-bold uppercase tracking-tighter">Início</span>
                    </a>
                    <a className="flex flex-col items-center gap-1 text-[#656487] dark:text-gray-400" href="#">
                        <span className="material-symbols-outlined">play_circle</span>
                        <span className="text-[10px] font-bold uppercase tracking-tighter">Vídeos</span>
                    </a>
                    <a className="flex flex-col items-center gap-1 text-[#656487] dark:text-gray-400" href="#">
                        <span className="material-symbols-outlined">group</span>
                        <span className="text-[10px] font-bold uppercase tracking-tighter">Amigos</span>
                    </a>
                    <a className="flex flex-col items-center gap-1 text-[#656487] dark:text-gray-400" href="#">
                        <span className="material-symbols-outlined">notifications</span>
                        <span className="text-[10px] font-bold uppercase tracking-tighter">Avisos</span>
                    </a>
                    <a className="flex flex-col items-center gap-1 text-[#656487] dark:text-gray-400" href="#">
                        <span className="material-symbols-outlined">menu</span>
                        <span className="text-[10px] font-bold uppercase tracking-tighter">Menu</span>
                    </a>
                </div>
            </div>
        </div>
    );
}
