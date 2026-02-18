'use client';
import type { Dispatch, SetStateAction } from 'react';
import type { CardData, SocialLink, StatItem } from '@/lib/types';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

type PropertiesSidebarProps = {
    cardData: CardData;
    setCardData: Dispatch<SetStateAction<CardData>>;
    selectedLinkId: string | null;
    setSelectedLinkId: Dispatch<SetStateAction<string | null>>;
    activeTool: string;
    setActiveTool: Dispatch<SetStateAction<string>>;
};

export default function PropertiesSidebar({ 
    cardData, 
    setCardData, 
    selectedLinkId, 
    setSelectedLinkId,
    activeTool,
    setActiveTool
}: PropertiesSidebarProps) {

    const colorPalette = [
        '#5048e5', '#6366f1', '#8b5cf6', '#ec4899', 
        '#f43f5e', '#ef4444', '#f97316', '#f59e0b', 
        '#eab308', '#84cc16', '#22c55e', '#10b981', 
        '#06b6d4', '#0ea5e9', '#3b82f6', '#1d4ed8',
        '#000000', '#475569', '#94a3b8', '#ffffff'
    ];

    const icons = [
        'chat', 'call', 'mail', 'alternate_email', 'send', 'forum', 'sms', 'contact_page',
        'language', 'public', 'share', 'groups', 'hub', 'connect_without_contact', 'diversity_3',
        'photo_camera', 'camera_alt', 'play_circle', 'subscriptions', 'video_library', 'music_note', 'headphones', 'mic',
        'work', 'shopping_cart', 'shopping_bag', 'storefront', 'payments', 'wallet', 'card_membership', 'campaign',
        'person', 'person_add', 'notifications', 'event', 'calendar_month', 'location_on', 'map', 'star', 'favorite', 'verified',
        'code', 'terminal', 'article', 'description', 'attach_file', 'cloud_download', 'qr_code_2', 'auto_awesome'
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

    const handleStatChange = (index: number, field: keyof StatItem, value: string) => {
        setCardData(prev => {
            const newStats = [...prev.stats];
            newStats[index] = { ...newStats[index], [field]: value };
            return { ...prev, stats: newStats };
        });
    };

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, field: 'avatarUrl' | 'bannerUrl') => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                handleProfileChange(field, reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const deleteLink = (id: string) => {
        setCardData(prev => ({
            ...prev,
            links: prev.links.filter(l => l.id !== id)
        }));
    };

    const getToolLabel = () => {
        switch (activeTool) {
            case 'conteudo': return 'Perfil & Links';
            case 'social': return 'Redes Sociais';
            case 'imagens': return 'Mídia & Capa';
            case 'qrcode': return 'QR Code';
            default: return 'Geral';
        }
    }

    const ColorPickerGrid = ({ currentColor, onSelect }: { currentColor: string, onSelect: (color: string) => void }) => (
        <div className="grid grid-cols-5 gap-2">
            {colorPalette.map(color => (
                <button 
                    key={color} 
                    onClick={() => onSelect(color)}
                    className={cn(
                        "w-8 h-8 rounded-full transition-all border shrink-0",
                        color === '#ffffff' ? 'border-slate-200' : 'border-transparent'
                    )}
                    style={{
                        backgroundColor: color,
                        boxShadow: currentColor.toLowerCase() === color.toLowerCase() 
                            ? `0 0 0 2px hsl(var(--background)), 0 0 0 4px ${color}` 
                            : ''
                    }}
                    title={color}
                />
            ))}
        </div>
    );

    return (
        <div className="flex flex-col h-full overflow-hidden">
            <div className="p-6 border-b border-slate-200 dark:border-slate-800 shrink-0">
                <div className="flex items-center justify-between">
                    <h3 className="font-bold text-slate-900 dark:text-white">Propriedades</h3>
                    <span className="text-[10px] bg-primary/10 text-primary px-2 py-1 rounded-full font-bold uppercase">
                        {getToolLabel()}
                    </span>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto no-scrollbar p-6 space-y-8 pb-32">
                {activeTool === 'conteudo' && (
                    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                        <div className="space-y-4">
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Identidade Digital</label>
                            <div className="space-y-3">
                                <div className="space-y-1">
                                    <p className="text-[11px] font-medium text-slate-400 ml-1">Nome e Link do Nome</p>
                                    <Input className="text-sm" value={cardData.fullName} onChange={(e) => handleProfileChange('fullName', e.target.value)} />
                                    <Input className="text-xs bg-slate-50" placeholder="https://link-no-nome.com" value={cardData.fullNameLink || ''} onChange={(e) => handleProfileChange('fullNameLink', e.target.value)} />
                                </div>
                                <div className="space-y-1">
                                    <p className="text-[11px] font-medium text-slate-400 ml-1">Cargo e Link do Cargo</p>
                                    <Input className="text-sm" value={cardData.jobTitle} onChange={(e) => handleProfileChange('jobTitle', e.target.value)} />
                                    <Input className="text-xs bg-slate-50" placeholder="https://link-no-cargo.com" value={cardData.jobTitleLink || ''} onChange={(e) => handleProfileChange('jobTitleLink', e.target.value)} />
                                </div>
                                <div className="space-y-1">
                                    <p className="text-[11px] font-medium text-slate-400 ml-1">Bio</p>
                                    <Textarea className="text-sm min-h-[100px]" value={cardData.bio} onChange={(e) => handleProfileChange('bio', e.target.value)} />
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4 pt-4 border-t">
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Métricas Autônomas</label>
                            {cardData.stats.map((stat, index) => (
                                <div key={index} className="space-y-2 p-3 bg-slate-50 dark:bg-slate-800 rounded-xl">
                                    <div className="grid grid-cols-2 gap-2">
                                        <Input className="h-8 text-xs" value={stat.label} onChange={(e) => handleStatChange(index, 'label', e.target.value)} />
                                        <Input className="h-8 text-xs" value={stat.value} onChange={(e) => handleStatChange(index, 'value', e.target.value)} />
                                    </div>
                                    <Input className="h-7 text-[10px] bg-white" placeholder="Link da métrica..." value={stat.url || ''} onChange={(e) => handleStatChange(index, 'url', e.target.value)} />
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {activeTool === 'imagens' && (
                    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                        <div className="space-y-4">
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Foto de Perfil</label>
                            <div className="size-24 rounded-full border-2 border-primary/20 p-1 mx-auto">
                                <img src={cardData.avatarUrl} className="w-full h-full rounded-full object-cover" alt="Avatar" />
                            </div>
                            <Input className="text-sm" placeholder="URL da Foto..." value={cardData.avatarUrl} onChange={(e) => handleProfileChange('avatarUrl', e.target.value)} />
                            <Input className="text-xs bg-slate-50" placeholder="https://link-ao-clicar-na-foto.com" value={cardData.avatarLink || ''} onChange={(e) => handleProfileChange('avatarLink', e.target.value)} />
                        </div>

                        <div className="space-y-4 pt-6 border-t">
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Banner / Capa</label>
                            <div className="aspect-video w-full rounded-lg bg-slate-100 overflow-hidden border">
                                {cardData.bannerUrl && <img src={cardData.bannerUrl} className="w-full h-full object-cover" alt="Banner" />}
                            </div>
                            <Input className="text-sm" placeholder="URL do Banner..." value={cardData.bannerUrl || ''} onChange={(e) => handleProfileChange('bannerUrl', e.target.value)} />
                            <Input className="text-xs bg-slate-50" placeholder="https://link-ao-clicar-no-banner.com" value={cardData.bannerLink || ''} onChange={(e) => handleProfileChange('bannerLink', e.target.value)} />
                        </div>
                    </div>
                )}

                {activeTool === 'social' && (
                    <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Gestão de Links</label>
                        <Accordion type="single" collapsible className="w-full space-y-2" value={selectedLinkId || undefined} onValueChange={setSelectedLinkId}>
                            {cardData.links.map((link) => (
                                <AccordionItem key={link.id} value={link.id} className="border rounded-xl px-4 bg-white dark:bg-slate-900 shadow-sm overflow-hidden">
                                    <AccordionTrigger className="hover:no-underline py-4">
                                        <div className="flex items-center gap-3 text-left">
                                            <div className="size-8 rounded-lg flex items-center justify-center text-white shrink-0" style={{backgroundColor: link.color || cardData.themeColor}}>
                                                <span className="material-symbols-outlined text-sm">{link.icon}</span>
                                            </div>
                                            <span className="text-sm font-bold truncate">{link.label || 'Link sem nome'}</span>
                                        </div>
                                    </AccordionTrigger>
                                    <AccordionContent className="pb-6 space-y-4 border-t pt-4">
                                        <div className="space-y-1.5">
                                            <p className="text-[10px] font-bold text-slate-400 uppercase">Título</p>
                                            <Input className="h-9 text-sm" value={link.label} onChange={(e) => handleLinkChange(link.id, 'label', e.target.value)} />
                                        </div>
                                        <div className="space-y-1.5">
                                            <p className="text-[10px] font-bold text-slate-400 uppercase">Destino (URL/Handle)</p>
                                            <Input className="h-9 text-sm" value={link.value} onChange={(e) => handleLinkChange(link.id, 'value', e.target.value)} />
                                        </div>
                                        <div className="space-y-1.5">
                                            <p className="text-[10px] font-bold text-slate-400 uppercase">Ícone</p>
                                            <div className="grid grid-cols-6 gap-1 max-h-32 overflow-y-auto p-1 border rounded-lg bg-slate-50">
                                                {icons.map(icon => (
                                                    <button key={icon} onClick={() => handleLinkChange(link.id, 'icon', icon)} className={cn("p-1.5 rounded transition-all", link.icon === icon ? "bg-primary text-white" : "text-slate-400 hover:bg-slate-200")}>
                                                        <span className="material-symbols-outlined text-base">{icon}</span>
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="flex items-center justify-between pt-2">
                                            <Button variant="ghost" className="text-red-500 text-xs h-8 px-2 hover:bg-red-50" onClick={() => deleteLink(link.id)}>
                                                Remover Link
                                            </Button>
                                            <div className="flex gap-1">
                                                {colorPalette.slice(0, 5).map(c => (
                                                    <button key={c} onClick={() => handleLinkChange(link.id, 'color', c)} className="size-5 rounded-full border" style={{backgroundColor: c}} />
                                                ))}
                                            </div>
                                        </div>
                                    </AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                        
                        <Button className="w-full h-12 rounded-xl gap-2 mt-4" variant="outline" onClick={() => {
                            const newId = `link-${Date.now()}`;
                            const newLink: SocialLink = { id: newId, type: 'website', label: 'Novo Link', value: '', icon: 'link', color: cardData.themeColor };
                            setCardData(prev => ({ ...prev, links: [...prev.links, newLink] }));
                            setSelectedLinkId(newId);
                        }}>
                            <span className="material-symbols-outlined text-lg">add_circle</span>
                            Adicionar Novo Link
                        </Button>
                    </div>
                )}

                {activeTool === 'qrcode' && (
                    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                        <div className="space-y-4 text-center">
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">QR Code Inteligente</label>
                            <div className="p-6 bg-white border rounded-2xl mx-auto inline-block shadow-sm">
                                {cardData.qrCodeUrl ? <img src={cardData.qrCodeUrl} className="size-32" alt="QR" /> : <span className="material-symbols-outlined text-4xl opacity-20">qr_code_2</span>}
                            </div>
                            <Input className="text-sm mt-4" placeholder="https://meu-link-global.com" value={cardData.qrCodeUrl || ''} onChange={(e) => handleProfileChange('qrCodeUrl', e.target.value)} />
                        </div>
                    </div>
                )}

                <div className="pt-8 border-t space-y-4">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Paleta do Tema</label>
                    <ColorPickerGrid currentColor={cardData.themeColor} onSelect={(c) => handleProfileChange('themeColor', c)} />
                </div>
            </div>
        </div>
    );
}
