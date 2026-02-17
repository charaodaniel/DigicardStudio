export default function WhatsappPage() {
    return (
        <div className="bg-background-light dark:bg-background-dark font-display text-[#121117] dark:text-white antialiased">
            <div className="relative min-h-screen w-full max-w-md mx-auto whatsapp-pattern pb-12">
                <div className="sticky top-0 z-50 flex items-center bg-white dark:bg-background-dark/90 backdrop-blur-md p-4 justify-between border-b border-primary/10">
                    <div className="text-primary flex size-10 shrink-0 items-center justify-center rounded-full hover:bg-primary/10 cursor-pointer">
                        <span className="material-symbols-outlined">arrow_back</span>
                    </div>
                    <h2 className="text-[#121117] dark:text-white text-base font-bold leading-tight tracking-tight flex-1 text-center">Perfil Comercial</h2>
                    <div className="flex w-10 items-center justify-end">
                        <button className="flex size-10 cursor-pointer items-center justify-center rounded-full hover:bg-primary/10 transition-colors">
                            <span className="material-symbols-outlined text-primary">more_vert</span>
                        </button>
                    </div>
                </div>
                <div className="flex p-6 @container">
                    <div className="flex w-full flex-col gap-6 items-center">
                        <div className="relative">
                            <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full border-4 border-white dark:border-background-dark shadow-xl size-32" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAqYz0HFXX6ORXHQu_I-hcVJfL2WSBFUHiW7iwV2mnYJ52MiVSxFiCxIBc7IwHYdHfO3DCNcKosytWdmMJ9d2iEs3cX6uj8U8a30bsMCmMju01tVPRhNHs1XLus_tdwaCRWJJcf8ii4oLos96XUp8OA4mpuj3T1RCRKx4TFTgwNej7DQbgWOwee7H-TVAznJYCY_3FSfNZrppECgKu2hnV6dX12W3_DjTZ4oMlyqoSRxgEbaT8nQRi72cwF_Qu67G0DIdq2VKLsIF_Z')" }}>
                            </div>
                            <div className="absolute bottom-1 right-1 bg-green-500 border-4 border-white dark:border-background-dark size-7 rounded-full flex items-center justify-center" title="Online agora">
                                <div className="size-2 bg-white rounded-full animate-pulse"></div>
                            </div>
                        </div>
                        <div className="flex flex-col items-center text-center gap-1">
                            <div className="flex items-center gap-1.5">
                                <h1 className="text-[#121117] dark:text-white text-2xl font-bold leading-tight tracking-tight">Nova Tech Solutions</h1>
                                <span className="material-symbols-outlined text-primary text-[20px]" title="Verificado">verified</span>
                            </div>
                            <p className="text-primary/70 dark:text-primary/90 text-sm font-semibold uppercase tracking-wider">Conta Comercial Oficial</p>
                            <p className="text-[#656487] dark:text-gray-400 text-base max-w-[280px] mt-2">Soluções inteligentes para o seu dia a dia. Atendimento rápido e personalizado.</p>
                        </div>
                        <button className="flex w-full cursor-pointer items-center justify-center gap-3 rounded-xl h-14 bg-primary text-white shadow-lg shadow-primary/30 hover:bg-primary/90 transition-all active:scale-95">
                            <span className="material-symbols-outlined text-white">chat</span>
                            <span className="text-base font-bold tracking-wide">Conversar no WhatsApp</span>
                        </button>
                    </div>
                </div>
                <div className="flex gap-3 px-4 mb-6">
                    <div className="flex flex-1 flex-col gap-1 rounded-xl p-4 bg-white dark:bg-white/5 border border-primary/10">
                        <span className="material-symbols-outlined text-primary text-xl">timer</span>
                        <p className="text-[#656487] dark:text-gray-400 text-xs font-medium">Resposta média</p>
                        <p className="text-[#121117] dark:text-white text-lg font-bold">&lt; 5 min</p>
                    </div>
                    <div className="flex flex-1 flex-col gap-1 rounded-xl p-4 bg-white dark:bg-white/5 border border-primary/10">
                        <span className="material-symbols-outlined text-primary text-xl">event_available</span>
                        <p className="text-[#656487] dark:text-gray-400 text-xs font-medium">No WhatsApp desde</p>
                        <p className="text-[#121117] dark:text-white text-lg font-bold">2021</p>
                    </div>
                </div>
                <div className="px-4 mb-6">
                    <div className="bg-white dark:bg-white/5 rounded-xl p-4 border border-primary/10">
                        <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-2">
                                <span className="material-symbols-outlined text-primary">schedule</span>
                                <h3 className="font-bold text-[#121117] dark:text-white">Horário de Atendimento</h3>
                            </div>
                            <span className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 text-[10px] font-bold px-2 py-1 rounded-full uppercase">Aberto Agora</span>
                        </div>
                        <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                                <span className="text-[#656487] dark:text-gray-400">Segunda - Sexta</span>
                                <span className="font-semibold text-[#121117] dark:text-white">08:00 - 18:00</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-[#656487] dark:text-gray-400">Sábado</span>
                                <span className="font-semibold text-[#121117] dark:text-white">09:00 - 13:00</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="px-4">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-[#121117] dark:text-white text-lg font-bold leading-tight tracking-tight">Catálogo de Produtos</h3>
                        <button className="text-primary text-sm font-bold flex items-center gap-1">
                            Ver tudo
                            <span className="material-symbols-outlined text-sm">chevron_right</span>
                        </button>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                        <div className="group cursor-pointer">
                            <div className="relative bg-cover bg-center flex flex-col gap-3 rounded-xl justify-end p-4 aspect-square overflow-hidden shadow-sm" style={{ backgroundImage: "linear-gradient(0deg, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0) 60%), url('https://lh3.googleusercontent.com/aida-public/AB6AXuB6Dtnuef9ju7FiTI53N6Xwk0RMKGro-XQT6Hg7n7wqwE-wC3nT86k4EWC2dM0bVDXJdseLacMS4Q5KqZUQfTCt8kYyHLJJrtn4U113n8mzUJ1vwr9x_RNc-Av0CzXZZaJ9jMAUhAKjjTYD7qUUJxdgARz5BtrnCyiahH1e1LAGeFyy63o7-3Xp8QHpYf4WroLWq7SXT7MmDovrvOwuu4IGDJurhNQY9m1vlMWXS53boeGug-D1sHbXlJiuP2MXaqMSoPgezHmUgAN3')" }}>
                                <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                <p className="text-white text-sm font-bold leading-tight relative z-10">Lançamentos</p>
                            </div>
                        </div>
                        <div className="group cursor-pointer">
                            <div className="relative bg-cover bg-center flex flex-col gap-3 rounded-xl justify-end p-4 aspect-square overflow-hidden shadow-sm" style={{ backgroundImage: "linear-gradient(0deg, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0) 60%), url('https://lh3.googleusercontent.com/aida-public/AB6AXuCx2KR_HdTjLieKqkpVWKtr3xN9Wa_YcqaJOAyzcjyNpEW75Z0VPCkTPF0xki52ufKHRaKR7ldq3W5W01_NoEUVsi9yUbP60xOa6kBa5N4-TOkFjz10QAuzVIxFoUOIuOizBEl2caVR5PVjUKOJgy88uM2L7Vc5L19ghJZFrTIu_3mEkMSep53Jvow0dDgRCDSMQ9yNHCCD_jgeXe03LIbifFkzdJS7BM747qS-NMBSklI0z8m42UXB33nH6vAkmTZOIWZtQTVbpnHu')" }}>
                                <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                <p className="text-white text-sm font-bold leading-tight relative z-10">Mais Vendidos</p>
                            </div>
                        </div>
                        <div className="group cursor-pointer">
                            <div className="relative bg-cover bg-center flex flex-col gap-3 rounded-xl justify-end p-4 aspect-square overflow-hidden shadow-sm" style={{ backgroundImage: "linear-gradient(0deg, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0) 60%), url('https://lh3.googleusercontent.com/aida-public/AB6AXuBXHAHhtrzG91Hqf_m22SDGWCDSNxbvNITpu7SdhsGIonFxZSQu4EuIHMRWxAsfTO2O4eMc6kx-IGKqTEIF__6qXoYwzJB12DJ4pTG522q9J1S0uE9s3R_a6tHOiLzmH0I9Iv9h5k3OmhOrlzT-s8FaT7MmGjz6WtO2bkSBTyMjEswtYT0HymQLtUIldP-6DSQrgOTxV7jrCH-h7E88HSqcX8XLsHSH693pHeWiHt1SzsWPahaeSgYiZbsdbIOqLuC7V6-6pwJ5kNo-U')" }}>
                                <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                <p className="text-white text-sm font-bold leading-tight relative z-10">Promoções</p>
                            </div>
                        </div>
                        <div className="group cursor-pointer">
                            <div className="relative bg-cover bg-center flex flex-col gap-3 rounded-xl justify-end p-4 aspect-square overflow-hidden shadow-sm" style={{ backgroundImage: "linear-gradient(0deg, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0) 60%), url('https://lh3.googleusercontent.com/aida-public/AB6AXuBtufAmkiTHBIF74c-riI6JasyTS7sqjoX1y8MMB0rqlMlASwFfmqOf_RbVFzkjxDliA_TXQrkMspkesRrrbbZbZzp7wil6hdsM1NXHkmPGE2JhUHm8UAVGNoVXGHVactvhS_rVngCEtV4MSEMDnDNhQpt_uf-lEanFVakAq2kE8PTPfcGGtYstWCWr-tMcbcJCoh5ETfrW14hzS0Y-pO9eJXNfdpHhpIz-1CISF99AXcbG_mjbgqT4hC900eziYIU8ADy00G0SHSHh')" }}>
                                <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                <p className="text-white text-sm font-bold leading-tight relative z-10">Acessórios</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="p-4 mt-8">
                    <div className="flex flex-col items-center gap-4 text-center">
                        <div className="flex items-center gap-2 text-[#656487] dark:text-gray-400">
                            <span className="material-symbols-outlined text-sm">location_on</span>
                            <span className="text-xs">Av. Paulista, 1000 - São Paulo, SP</span>
                        </div>
                        <div className="flex gap-4">
                            <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-white dark:bg-white/5 border border-primary/10 text-primary text-xs font-bold hover:bg-primary/5 transition-colors">
                                <span className="material-symbols-outlined text-sm">share</span>
                                Compartilhar
                            </button>
                            <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-white dark:bg-white/5 border border-primary/10 text-primary text-xs font-bold hover:bg-primary/5 transition-colors">
                                <span className="material-symbols-outlined text-sm">report</span>
                                Denunciar
                            </button>
                        </div>
                        <p className="text-[10px] text-[#656487] dark:text-gray-500 mt-4 opacity-50 uppercase tracking-widest">Powered by WhatsApp Business</p>
                    </div>
                </div>
            </div>
            <style jsx>{`
                .whatsapp-pattern {
                    background-color: #f6f6f8;
                    background-image: url(https://lh3.googleusercontent.com/aida-public/AB6AXuB2NIwDjvvyCGKhJtbJtrYEGQTH_Ry7PHGeiAzP64h25T0fbS66_hC40vvyXcqRWCfJcf54BX9XMIbXihBQHLWCiF_G7ueMI3WrUdA4SInUvIuB7u_4oB4TdAfGAooO1Ja3ao10lDIIOJPtKe-t0ufPEmECxYZG-IUHxqVbtoGMZIMeUiPWXa7BspU6b9h5YYAtuTuJrpS0dZ1NpO_bdaDRtYxQ6qHRqdLADSvxlRraFidhfc0EbLbWT0zT2yAs6QvBMIaBmIeHIbFu);
                    background-opacity: 0.05;
                }
                .dark .whatsapp-pattern {
                    background-color: #121121;
                }
            `}</style>
        </div>
    )
}
