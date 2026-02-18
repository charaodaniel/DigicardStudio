'use client';
import type { CardData } from '@/lib/types';
import { formatHref } from '@/lib/utils';
import SocialIcon from '@/components/social-icon';

export default function WhatsappPreview({ cardData }: { cardData: CardData }) {
    const { fullName, bio, isVerified, avatarUrl, links, themeColor } = cardData;

    return (
        <div className="bg-slate-50 dark:bg-background-dark font-display text-[#121117] dark:text-white h-full flex flex-col overflow-hidden relative">
            {/* Pattern Overlay */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none z-0" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuB2NIwDjvvyCGKhJtbJtrYEGQTH_Ry7PHGeiAzP64h25T0fbS66_hC40vvyXcqRWCfJcf54BX9XMIbXihBQHLWCiF_G7ueMI3WrUdA4SInUvIuB7u_4oB4TdAfGAooO1Ja3ao10lDIIOJPtKe-t0ufPEmECxYZG-IUHxqVbtoGMZIMeUiPWXa7BspU6b9h5YYAtuTuJrpS0dZ1NpO_bdaDRtYxQ6qHRqdLADSvxlRraFidhfc0EbLbWT0zT2yAs6QvBMIaBmIeHIbFu')" }}></div>
            
            {/* Top App Bar - LOCKED TOP */}
            <div className="absolute top-0 left-0 right-0 flex items-center bg-white/90 dark:bg-background-dark/90 backdrop-blur-md p-4 justify-between border-b border-primary/10 shrink-0 z-20">
                <div className="text-primary flex size-10 items-center justify-center rounded-full hover:bg-primary/10 cursor-pointer">
                    <span className="material-symbols-outlined">arrow_back</span>
                </div>
                <h2 className="text-base font-bold flex-1 text-center">Perfil Comercial</h2>
                <div className="flex w-10 items-center justify-end">
                    <span className="material-symbols-outlined text-primary">more_vert</span>
                </div>
            </div>

            {/* Scrollable Content Area */}
            <div className="flex-1 overflow-y-auto no-scrollbar relative z-10 flex flex-col pt-16">
                <div className="flex p-6 flex-col gap-6 items-center">
                    <div className="relative">
                        <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full border-4 border-white dark:border-background-dark shadow-xl size-32" style={{ backgroundImage: `url('${avatarUrl}')` }}>
                        </div>
                        <div className="absolute bottom-1 right-1 bg-green-500 border-4 border-white dark:border-background-dark size-7 rounded-full flex items-center justify-center">
                            <div className="size-2 bg-white rounded-full animate-pulse"></div>
                        </div>
                    </div>
                    <div className="flex flex-col items-center text-center gap-1">
                        <div className="flex items-center gap-1.5">
                            <h1 className="text-2xl font-bold leading-tight tracking-tight">{fullName}</h1>
                            {isVerified && <span className="material-symbols-outlined text-primary text-[20px]" title="Verificado">verified</span>}
                        </div>
                        <p className="text-primary/70 dark:text-primary/90 text-sm font-semibold uppercase tracking-wider">Conta Comercial Oficial</p>
                        <p className="text-[#656487] dark:text-gray-400 text-base max-w-[280px] mt-2">{bio}</p>
                    </div>
                    <a 
                        href={formatHref('whatsapp', links.find(l => l.type === 'whatsapp')?.value || '')}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex w-full cursor-pointer items-center justify-center gap-3 rounded-xl h-14 text-white shadow-lg transition-all active:scale-95" 
                        style={{backgroundColor: themeColor}}
                    >
                        <span className="material-symbols-outlined">forum</span>
                        <span className="text-base font-bold tracking-wide">Conversar no WhatsApp</span>
                    </a>
                </div>

                <div className="px-4 space-y-6 pb-12">
                    <div className="bg-white dark:bg-white/5 rounded-xl p-4 border border-primary/10">
                        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Meus Links e Redes</h3>
                        <div className="flex flex-col gap-3">
                            {links.map(link => (
                                <a 
                                    key={link.id} 
                                    href={formatHref(link.type, link.value)}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-between p-3 rounded-lg border border-slate-100 dark:border-slate-800 hover:bg-slate-50 transition-colors"
                                >
                                    <div className="flex items-center gap-3">
                                        <SocialIcon type={link.type} icon={link.icon} className="text-lg" style={{color: link.color || themeColor}} />
                                        <span className="text-sm font-medium">{link.label}</span>
                                    </div>
                                    <span className="material-symbols-outlined text-slate-300 text-sm">chevron_right</span>
                                </a>
                            ))}
                        </div>
                    </div>

                    <div className="flex gap-3">
                        <div className="flex flex-1 flex-col gap-1 rounded-xl p-4 bg-white dark:bg-white/5 border border-primary/10">
                            <span className="material-symbols-outlined text-primary text-xl">timer</span>
                            <p className="text-[#656487] text-xs font-medium">Resposta média</p>
                            <p className="text-lg font-bold">&lt; 5 min</p>
                        </div>
                        <div className="flex flex-1 flex-col gap-1 rounded-xl p-4 bg-white dark:bg-white/5 border border-primary/10">
                            <span className="material-symbols-outlined text-primary text-xl">event_available</span>
                            <p className="text-[#656487] text-xs font-medium">Desde</p>
                            <p className="text-lg font-bold">2021</p>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-white/5 rounded-xl p-4 border border-primary/10">
                        <h3 className="font-bold mb-3 flex items-center gap-2"><span className="material-symbols-outlined text-primary">schedule</span> Atendimento</h3>
                        <div className="space-y-2 text-sm">
                            <div className="flex justify-between"><span className="text-slate-500">Seg - Sex</span><span className="font-semibold">08:00 - 18:00</span></div>
                            <div className="flex justify-between"><span className="text-slate-500">Sábado</span><span className="font-semibold">09:00 - 13:00</span></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}