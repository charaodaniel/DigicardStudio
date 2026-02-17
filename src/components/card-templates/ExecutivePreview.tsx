import type { CardData } from '@/lib/types';

export default function ExecutivePreview({ cardData }: { cardData: CardData }) {
    const { fullName, jobTitle, bio, isVerified } = cardData;
    return (
        <>
            <div className="bg-executive-black font-display text-slate-900 antialiased h-full overflow-y-auto">
                <div className="relative flex min-h-full w-full flex-col items-center justify-center p-4 sm:p-8">
                    <div className="w-full max-w-md overflow-hidden rounded-xl bg-executive-black black-card-shadow relative group">
                        <div className="absolute inset-0 pointer-events-none opacity-20 bg-gradient-to-tr from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                        <div className="absolute inset-0 border border-white/10 rounded-xl pointer-events-none"></div>
                        <div className="relative p-8 flex flex-col items-center">
                            <div className="relative mb-6">
                                <div className="absolute -inset-1 rounded-full bg-gradient-to-tr from-[#BF953F] via-[#FCF6BA] to-[#AA771C] animate-pulse"></div>
                                <div className="relative h-32 w-32 rounded-full overflow-hidden border-2 border-executive-black">
                                    <img alt="Retrato profissional de um executivo" className="h-full w-full object-cover" src={cardData.avatarUrl} />
                                </div>
                                {isVerified && <div className="absolute bottom-1 right-1 bg-white rounded-full p-0.5 shadow-lg">
                                    <span className="material-symbols-outlined text-primary text-xl font-bold" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
                                </div>}
                            </div>
                            <div className="text-center space-y-2">
                                <h2 className="text-2xl font-bold tracking-tight text-white">{fullName}</h2>
                                <p className="text-sm font-medium uppercase tracking-[0.2em] gold-gradient-text">{jobTitle}</p>
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
                                    {bio}
                                </p>
                            </div>
                        </div>
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
                .dark .bg-executive-black, .bg-executive-black {
                    background-color: #0a0a0b;
                }
                .text-gold-metallic { color: #D4AF37 }
            `}</style>
        </>
    )
}
