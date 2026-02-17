import type { CardData } from '@/lib/types';

export default function FacebookPreview({ cardData }: { cardData: CardData }) {
    const { fullName, bio, isVerified } = cardData;
    return (
        <div className="bg-white dark:bg-[#1c1b2b] min-h-full flex flex-col relative overflow-hidden">
            <div className="relative">
                <div className="w-full h-32 bg-gray-200 dark:bg-gray-700 bg-center bg-cover" style={{ backgroundImage: "url('https://picsum.photos/seed/fb-cover/400/150')" }}>
                </div>
                <div className="absolute -bottom-16 left-4 p-1 bg-white dark:bg-[#1c1b2b] rounded-full shadow-lg">
                    <div className="size-32 rounded-full border-4 border-white dark:border-[#1c1b2b] bg-center bg-cover bg-gray-300" style={{ backgroundImage: `url('${cardData.avatarUrl}')` }}>
                    </div>
                </div>
            </div>
            <div className="mt-20 px-4 flex flex-col gap-4">
                <div>
                    <div className="flex items-center gap-1.5">
                        <h1 className="text-2xl font-bold tracking-tight">{fullName}</h1>
                        {isVerified && <span className="material-symbols-outlined text-primary text-xl" title="Verificado" style={{fontVariationSettings: "'FILL' 1"}}>verified</span>}
                    </div>
                    <p className="text-[#656487] dark:text-gray-400 text-base">@joaosilva_oficial</p>
                    <p className="mt-3 text-[#121117] dark:text-gray-200 text-base leading-relaxed">
                        {bio}
                    </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3 w-full">
                    <button className="flex-1 bg-primary hover:bg-opacity-90 text-white font-bold py-2.5 rounded-lg flex items-center justify-center gap-2 transition-all">
                        <span className="material-symbols-outlined text-xl" style={{fontVariationSettings: "'FILL' 1"}}>social_leaderboard</span>
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
            </div>
            <div className="flex-grow"></div>
        </div>
    );
}
