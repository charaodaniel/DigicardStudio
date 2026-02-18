'use client';
import type { Dispatch, SetStateAction } from 'react';
import type { CardData, SocialLink } from '@/lib/types';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

type PropertiesSidebarProps = {
    cardData: CardData;
    setCardData: Dispatch<SetStateAction<CardData>>;
    selectedLinkId: string | null;
    setSelectedLinkId: Dispatch<SetStateAction<string | null>>;
    activeTool: string;
};

export default function PropertiesSidebar({ 
    cardData, 
    setCardData, 
    selectedLinkId, 
    setSelectedLinkId,
    activeTool 
}: PropertiesSidebarProps) {

    const activeLink = cardData.links.find(l => l.id === selectedLinkId) || cardData.links[0];

    const colors = [
        '#5048e5', '#e11d48', '#10b981', '#f59e0b', '#3b82f6'
    ];

    const handleProfileChange = (field: keyof CardData, value: string) => {
        setCardData(prev => ({ ...prev, [field]: value }));
    };

    const handleLinkChange = (id: string, field: keyof SocialLink, value: string) => {
        setCardData(prev => ({
            ...prev,
            links: prev.links.map(l => l.id === id ? { ...l, [field]: value } : l)
        }));
    };

    const deleteLink = (id: string) => {
        setCardData(prev => ({
            ...prev,
            links: prev.links.filter(l => l.id !== id)
        }));
    };

    const getToolLabel = () => {
        switch (activeTool) {
            case 'conteudo': return 'Perfil';
            case 'social': return 'Botão';
            case 'imagens': return 'Imagens';
            case 'qrcode': return 'QR Code';
            default: return 'Geral';
        }
    }

    return (
        <aside className="w-80 border-l border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col shrink-0">
            <div className="p-6 border-b border-slate-200 dark:border-slate-800">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-slate-900 dark:text-white">Propriedades</h3>
                    <span className="text-[10px] bg-primary/10 text-primary px-2 py-1 rounded-full font-bold uppercase">
                        {getToolLabel()}
                    </span>
                </div>
                
                {activeTool === 'social' && activeLink && (
                    <div className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700">
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white" style={{backgroundColor: activeLink.color || '#25D366'}}>
                            <span className="material-symbols-outlined text-sm">{activeLink.icon}</span>
                        </div>
                        <div>
                            <p className="text-xs font-bold text-slate-900 dark:text-white">{activeLink.label}</p>
                            <p className="text-[10px] text-slate-500">Elemento Ativo</p>
                        </div>
                        <button 
                            onClick={() => deleteLink(activeLink.id)}
                            className="ml-auto material-symbols-outlined text-slate-400 hover:text-red-500 transition-colors"
                        >
                            delete
                        </button>
                    </div>
                )}
            </div>

            <div className="flex-1 overflow-y-auto no-scrollbar p-6 space-y-8">
                {/* Campos de Perfil */}
                {activeTool === 'conteudo' && (
                    <div className="space-y-4">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Informações Básicas</label>
                        <div className="space-y-3">
                            <div className="space-y-1.5">
                                <p className="text-[11px] font-medium text-slate-400 ml-1">Nome Completo</p>
                                <Input 
                                    className="w-full bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg text-sm" 
                                    type="text" 
                                    value={cardData.fullName}
                                    onChange={(e) => handleProfileChange('fullName', e.target.value)}
                                />
                            </div>
                            <div className="space-y-1.5">
                                <p className="text-[11px] font-medium text-slate-400 ml-1">Cargo / Título</p>
                                <Input 
                                    className="w-full bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg text-sm" 
                                    type="text" 
                                    value={cardData.jobTitle}
                                    onChange={(e) => handleProfileChange('jobTitle', e.target.value)}
                                />
                            </div>
                            <div className="space-y-1.5">
                                <p className="text-[11px] font-medium text-slate-400 ml-1">Bio Curta</p>
                                <Textarea 
                                    className="w-full bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg text-sm min-h-[100px]" 
                                    value={cardData.bio}
                                    onChange={(e) => handleProfileChange('bio', e.target.value)}
                                />
                            </div>
                        </div>
                    </div>
                )}

                {/* Campos de Imagem */}
                {activeTool === 'imagens' && (
                    <div className="space-y-4">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Foto de Perfil</label>
                        <div className="space-y-3">
                            <div className="space-y-1.5">
                                <p className="text-[11px] font-medium text-slate-400 ml-1">URL da Imagem</p>
                                <Input 
                                    className="w-full bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg text-sm" 
                                    type="text" 
                                    value={cardData.avatarUrl}
                                    onChange={(e) => handleProfileChange('avatarUrl', e.target.value)}
                                />
                            </div>
                            <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 flex flex-col items-center gap-3">
                                <img src={cardData.avatarUrl} className="w-20 h-20 rounded-full object-cover border-2 border-white shadow-sm" alt="Preview" />
                                <p className="text-[10px] text-slate-500 text-center">Cole um link de imagem acima para atualizar sua foto.</p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Campos de QR Code */}
                {activeTool === 'qrcode' && (
                    <div className="space-y-4">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Configuração do QR Code</label>
                        <div className="space-y-3">
                            <div className="space-y-1.5">
                                <p className="text-[11px] font-medium text-slate-400 ml-1">URL / Link do QR Code</p>
                                <Input 
                                    className="w-full bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg text-sm" 
                                    type="text" 
                                    value={cardData.qrCodeUrl || ''}
                                    onChange={(e) => handleProfileChange('qrCodeUrl', e.target.value)}
                                />
                            </div>
                            <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 flex flex-col items-center gap-3">
                                {cardData.qrCodeUrl && <img src={cardData.qrCodeUrl} className="w-24 h-24 bg-white p-1 rounded shadow-sm" alt="QR Preview" />}
                                <p className="text-[10px] text-slate-500 text-center">Este código redireciona para o seu perfil digital.</p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Campos de Botões Sociais */}
                {activeTool === 'social' && activeLink && (
                    <div className="space-y-4">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Configuração do Botão</label>
                        <div className="space-y-3">
                            <div className="space-y-1.5">
                                <p className="text-[11px] font-medium text-slate-400 ml-1">Rótulo do Botão</p>
                                <Input 
                                    className="w-full bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg text-sm" 
                                    type="text" 
                                    value={activeLink.label}
                                    onChange={(e) => handleLinkChange(activeLink.id, 'label', e.target.value)}
                                />
                            </div>
                            <div className="space-y-1.5">
                                <p className="text-[11px] font-medium text-slate-400 ml-1">Link / Telefone</p>
                                <div className="relative">
                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-sm text-slate-400">link</span>
                                    <Input 
                                        className="w-full pl-9 bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg text-sm" 
                                        type="text" 
                                        value={activeLink.value}
                                        onChange={(e) => handleLinkChange(activeLink.id, 'value', e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="space-y-1.5">
                                <p className="text-[11px] font-medium text-slate-400 ml-1">Cor Personalizada</p>
                                <div className="flex gap-2">
                                    {colors.map(color => (
                                        <button 
                                            key={color} 
                                            onClick={() => handleLinkChange(activeLink.id, 'color', color)}
                                            className={`w-6 h-6 rounded-full transition-all`}
                                            style={{
                                                backgroundColor: color,
                                                boxShadow: activeLink.color === color ? `0 0 0 2px hsl(var(--background)), 0 0 0 4px ${color}` : ''
                                            }}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Estilo Geral */}
                <div className="pt-6 border-t border-slate-100 dark:border-slate-800 space-y-4">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Estilo e Cor do Tema</label>
                    <div className="space-y-2">
                        <p className="text-[11px] font-medium text-slate-400 ml-1">Cor Primária</p>
                        <div className="flex gap-2">
                            {colors.map(color => (
                                <button 
                                    key={color} 
                                    onClick={() => setCardData(prev => ({ ...prev, themeColor: color }))}
                                    className={`w-8 h-8 rounded-full transition-all`}
                                    style={{
                                        backgroundColor: color,
                                        boxShadow: cardData.themeColor === color ? `0 0 0 2px hsl(var(--background)), 0 0 0 4px ${color}` : ''
                                    }}
                                />
                            ))}
                            <button className="w-8 h-8 rounded-full bg-slate-800 border border-slate-600 flex items-center justify-center">
                                <span className="material-symbols-outlined text-xs text-white">add</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="p-6 bg-slate-50 dark:bg-slate-800/30 border-t border-slate-200 dark:border-slate-800">
                <button 
                    onClick={() => {
                        const newId = Math.random().toString(36).substr(2, 9);
                        setCardData(prev => ({
                            ...prev,
                            links: [...prev.links, { id: newId, type: 'website', label: 'Novo Link', value: '', icon: 'link', color: prev.themeColor }]
                        }));
                        setSelectedLinkId(newId);
                        setActiveTool('social');
                    }}
                    className="w-full flex items-center justify-center gap-2 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-all"
                >
                    <span className="material-symbols-outlined text-lg">add_circle</span>
                    Novo Elemento
                </button>
            </div>
        </aside>
    );
}
