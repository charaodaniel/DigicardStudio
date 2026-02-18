import type { CardData } from '@/lib/types';

export default function WhatsappPreview({ cardData }: { cardData: CardData }) {
    const { fullName, bio, isVerified, avatarUrl, links } = cardData;

    return (
        <div className="bg-background-light dark:bg-background-dark font-display text-[#121117] dark:text-white antialiased h-full">
            <div className="relative min-h-full w-full max-w-md mx-auto pb-12 overflow-y-auto">
                <div className="flex p-6">
                    <div className="flex w-full flex-col gap-6 items-center">
                        <div className="relative">
                            <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full border-4 border-white dark:border-background-dark shadow-xl size-32" style={{ backgroundImage: `url('${avatarUrl}')` }}>
                            </div>
                            <div className="absolute bottom-1 right-1 bg-green-500 border-4 border-white dark:border-background-dark size-7 rounded-full flex items-center justify-center" title="Online agora">
                                <div className="size-2 bg-white rounded-full animate-pulse"></div>
                            </div>
                        </div>
                        <div className="flex flex-col items-center text-center gap-1">
                            <div className="flex items-center gap-1.5">
                                <h1 className="text-[#121117] dark:text-white text-2xl font-bold leading-tight tracking-tight">{fullName}</h1>
                                {isVerified && <span className="material-symbols-outlined text-primary text-[20px]" title="Verificado">verified</span>}
                            </div>
                            <p className="text-primary/70 dark:text-primary/90 text-sm font-semibold uppercase tracking-wider">Conta Comercial Oficial</p>
                            <p className="text-[#656487] dark:text-gray-400 text-base max-w-[280px] mt-2">{bio}</p>
                        </div>
                        <div className="w-full space-y-3">
                            {links.map(link => (
                                <button key={link.id} className="flex w-full cursor-pointer items-center justify-center gap-3 rounded-xl h-14 bg-primary text-white shadow-lg shadow-primary/30 hover:bg-primary/90 transition-all active:scale-95">
                                    <span className="material-symbols-outlined text-white">{link.icon}</span>
                                    <span className="text-base font-bold tracking-wide">{link.label}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
