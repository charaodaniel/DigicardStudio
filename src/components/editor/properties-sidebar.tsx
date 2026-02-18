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

    const activeLink = cardData.links.find(l => l.id === selectedLinkId);

    const colors = [
        '#5048e5', '#e11d48', '#10b981', '#f59e0b', '#3b82f6', '#000000', '#ffffff'
    ];

    const handleProfileChange = (field: keyof CardData, value: any) => {
        setCardData(prev => ({ ...prev, [field]: value }));
    };

    const handleLinkChange = (id: string, field: keyof SocialLink, value: string) => {
        setCardData(prev => ({
            ...prev,
            links: prev.links.map(l => l.id === id ? { ...l, [field]: value } : l)
        }));
    };

    const deleteLink = (id: string) => {
        setCardData(prev => {
            const newLinks = prev.links.filter(l => l.id !== id);
            if (selectedLinkId === id) {
                setSelectedLinkId(newLinks.length > 0 ? newLinks[0].id : null);
            }
            return {
                ...prev,
                links: newLinks
            };
        });
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
        <div className="flex flex-col h-full overflow-hidden">
            {/* Cabeçalho da Barra Lateral */}
            <div className="p-6 border-b border-slate-200 dark:border-slate-800 shrink-0">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-slate-900 dark:text-white">Propriedades</h3>
                    <span className="text-[10px] bg-primary/10 text-primary px-2 py-1 rounded-full font-bold uppercase">
                        {getToolLabel()}
                    </span>
                </div>
                
                {/* Elemento de Contexto Ativo (se for link) */}
                {activeTool === 'social' && activeLink && (
                    <div className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700">
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white" style={{backgroundColor: activeLink.color || cardData.themeColor}}>
                            <span className="material-symbols-outlined text-sm">{activeLink.icon}</span>
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-xs font-bold text-slate-900 dark:text-white truncate">{activeLink.label}</p>
                            <p className="text-[10px] text-slate-500">Elemento Ativo</p>
                        </div>
                        <button 
                            onClick={() => deleteLink(activeLink.id)}
                            className="ml-auto material-symbols-outlined text-slate-400 hover:text-red-500 transition-colors p-1"
                            title="Remover Link"
                        >
                            delete
                        </button>
                    </div>
                )}
            </div>

            {/* Área de Campos de Edição */}
            <div className="flex-1 overflow-y-auto no-scrollbar p-6 space-y-8">
                {/* 1. Ferramenta: CONTEÚDO (Perfil) */}
                {activeTool === 'conteudo' && (
                    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                        <div className="space-y-4">
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Informações do Perfil</label>
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
                                <p className="text-[11px] font-medium text-slate-400 ml-1">Cargo / Título Profissional</p>
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
                                    className="w-full bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg text-sm min-h-[120px] resize-none" 
                                    value={cardData.bio}
                                    onChange={(e) => handleProfileChange('bio', e.target.value)}
                                    placeholder="Conte um pouco sobre você..."
                                />
                            </div>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800 rounded-xl">
                            <div className="flex items-center gap-2">
                                <span className="material-symbols-outlined text-primary">verified</span>
                                <span className="text-xs font-semibold">Selo Verificado</span>
                            </div>
                            <button 
                                onClick={() => handleProfileChange('isVerified', !cardData.isVerified)}
                                className={`w-10 h-5 rounded-full relative transition-colors ${cardData.isVerified ? 'bg-primary' : 'bg-slate-300'}`}
                            >
                                <div className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all ${cardData.isVerified ? 'right-1' : 'left-1'}`}></div>
                            </button>
                        </div>
                    </div>
                )}

                {/* 2. Ferramenta: IMAGENS */}
                {activeTool === 'imagens' && (
                    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                        <div className="space-y-4">
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Foto de Perfil</label>
                            <div className="p-6 bg-slate-50 dark:bg-slate-800 rounded-2xl border border-dashed border-slate-200 dark:border-slate-700 flex flex-col items-center gap-4">
                                <img src={cardData.avatarUrl} className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-md" alt="Preview" />
                                <div className="text-center">
                                    <p className="text-[11px] font-bold text-slate-900 dark:text-white">Pré-visualização</p>
                                    <p className="text-[10px] text-slate-500">A imagem será cortada em círculo</p>
                                </div>
                            </div>
                            <div className="space-y-1.5">
                                <p className="text-[11px] font-medium text-slate-400 ml-1">URL da Imagem</p>
                                <Input 
                                    className="w-full bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg text-sm" 
                                    type="text" 
                                    value={cardData.avatarUrl}
                                    onChange={(e) => handleProfileChange('avatarUrl', e.target.value)}
                                    placeholder="https://exemplo.com/sua-foto.jpg"
                                />
                            </div>
                        </div>
                    </div>
                )}

                {/* 3. Ferramenta: SOCIAL (Links) */}
                {activeTool === 'social' && activeLink ? (
                    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                        <div className="space-y-4">
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Configuração do Link</label>
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
                                <p className="text-[11px] font-medium text-slate-400 ml-1">Destino (Link ou Telefone)</p>
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
                                <p className="text-[11px] font-medium text-slate-400 ml-1">Ícone</p>
                                <div className="grid grid-cols-4 gap-2">
                                    {['chat', 'photo_camera', 'work', 'language', 'mail', 'phone', 'alternate_email', 'share', 'play_circle', 'subscriptions', 'music_note', 'forum'].map(icon => (
                                        <button 
                                            key={icon}
                                            onClick={() => handleLinkChange(activeLink.id, 'icon', icon)}
                                            className={`p-2 rounded-lg border transition-all ${activeLink.icon === icon ? 'bg-primary/10 border-primary text-primary' : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-400 hover:bg-slate-100'}`}
                                        >
                                            <span className="material-symbols-outlined text-xl">{icon}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <div className="space-y-1.5">
                                <p className="text-[11px] font-medium text-slate-400 ml-1">Cor do Botão</p>
                                <div className="flex flex-wrap gap-2">
                                    {colors.map(color => (
                                        <button 
                                            key={color} 
                                            onClick={() => handleLinkChange(activeLink.id, 'color', color)}
                                            className={`w-6 h-6 rounded-full transition-all border ${color === '#ffffff' ? 'border-slate-200' : 'border-transparent'}`}
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
                ) : activeTool === 'social' && (
                    <div className="p-8 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-dashed border-slate-200 dark:border-slate-700 flex flex-col items-center text-center gap-3 animate-in fade-in zoom-in-95 duration-300">
                        <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-900 flex items-center justify-center text-slate-400">
                            <span className="material-symbols-outlined">touch_app</span>
                        </div>
                        <div>
                            <p className="text-xs font-bold text-slate-900 dark:text-white">Nenhum botão selecionado</p>
                            <p className="text-[10px] text-slate-500 mt-1">Clique em um botão no celular para editá-lo ou adicione um novo abaixo.</p>
                        </div>
                    </div>
                )}

                {/* 4. Ferramenta: QR CODE */}
                {activeTool === 'qrcode' && (
                    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                        <div className="space-y-4">
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Configuração do QR Code</label>
                            <div className="p-6 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 flex flex-col items-center gap-4 shadow-sm">
                                {cardData.qrCodeUrl ? (
                                    <img src={cardData.qrCodeUrl} className="w-32 h-32 bg-white p-2 rounded-lg" alt="QR Preview" />
                                ) : (
                                    <div className="w-32 h-32 bg-slate-100 dark:bg-slate-900 rounded-lg flex items-center justify-center">
                                        <span className="material-symbols-outlined text-slate-300 text-4xl">qr_code_2</span>
                                    </div>
                                )}
                                <p className="text-[10px] text-slate-500 text-center uppercase tracking-widest font-bold">Escaneie para testar</p>
                            </div>
                            <div className="space-y-1.5">
                                <p className="text-[11px] font-medium text-slate-400 ml-1">Link do QR Code</p>
                                <Input 
                                    className="w-full bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg text-sm" 
                                    type="text" 
                                    value={cardData.qrCodeUrl || ''}
                                    onChange={(e) => handleProfileChange('qrCodeUrl', e.target.value)}
                                    placeholder="Ex: https://meucartao.com/usuario"
                                />
                            </div>
                        </div>
                    </div>
                )}

                {/* Seção Estilo e Cor (Sempre Visível no final) */}
                <div className="pt-8 border-t border-slate-100 dark:border-slate-800 space-y-4">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Estilo Visual do Tema</label>
                    <div className="space-y-3">
                        <p className="text-[11px] font-medium text-slate-400 ml-1">Cor Primária do Tema</p>
                        <div className="flex flex-wrap gap-2">
                            {colors.filter(c => c !== '#ffffff').map(color => (
                                <button 
                                    key={color} 
                                    onClick={() => handleProfileChange('themeColor', color)}
                                    className={`w-8 h-8 rounded-full transition-all border ${color === '#000000' ? 'border-slate-700' : 'border-transparent'}`}
                                    style={{
                                        backgroundColor: color,
                                        boxShadow: cardData.themeColor === color ? `0 0 0 2px hsl(var(--background)), 0 0 0 4px ${color}` : ''
                                    }}
                                />
                            ))}
                            <button className="w-8 h-8 rounded-full bg-slate-800 border border-slate-600 flex items-center justify-center hover:bg-slate-700 transition-colors">
                                <span className="material-symbols-outlined text-xs text-white">add</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Rodapé da Barra Lateral: Ação Principal */}
            <div className="p-6 bg-slate-50 dark:bg-slate-800/30 border-t border-slate-200 dark:border-slate-800 shrink-0">
                <button 
                    onClick={() => {
                        const newId = `link-${Date.now()}`;
                        const newLink: SocialLink = { 
                            id: newId, 
                            type: 'website', 
                            label: 'Novo Link', 
                            value: '', 
                            icon: 'link', 
                            color: cardData.themeColor 
                        };
                        setCardData(prev => ({
                            ...prev,
                            links: [...prev.links, newLink]
                        }));
                        setSelectedLinkId(newId);
                        setSelectedLinkId(newId);
                    }}
                    className="w-full flex items-center justify-center gap-2 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-all shadow-sm active:scale-[0.98]"
                >
                    <span className="material-symbols-outlined text-lg">add_circle</span>
                    Novo Link Social
                </button>
            </div>
        </div>
    );
}
