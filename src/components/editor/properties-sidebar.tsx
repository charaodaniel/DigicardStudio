'use client';
import type { Dispatch, SetStateAction } from 'react';
import type { CardData, SocialLink, StatItem } from '@/lib/types';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
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

    const fontFamilies = [
        { name: 'Inter', value: 'Inter', description: 'Moderna e Legível' },
        { name: 'Space Grotesk', value: 'Space Grotesk', description: 'Tech e Futurista' },
        { name: 'Roboto', value: 'Roboto', description: 'Versátil e Limpa' },
        { name: 'Lora', value: 'Lora', description: 'Serifada Elegante' },
        { name: 'Playfair Display', value: 'Playfair Display', description: 'Luxuosa e Clássica' },
    ];

    const iconCategories = [
        { label: 'Comunicação', icons: ['chat', 'call', 'mail', 'alternate_email', 'send', 'forum', 'sms', 'contact_page', 'whatsapp'] },
        { label: 'Redes Sociais', icons: ['share', 'groups', 'hub', 'connect_without_contact', 'diversity_3', 'linkedin', 'facebook', 'instagram', 'tiktok', 'youtube', 'twitter', 'discord', 'spotify'] },
        { label: 'Mídia & Tech', icons: ['photo_camera', 'camera_alt', 'play_circle', 'subscriptions', 'video_library', 'music_note', 'headphones', 'mic', 'code', 'terminal', 'qr_code_2'] },
        { label: 'Negócios', icons: ['work', 'shopping_cart', 'shopping_bag', 'storefront', 'payments', 'wallet', 'card_membership', 'campaign', 'language', 'public'] },
        { label: 'Utilidades', icons: ['person', 'person_add', 'notifications', 'event', 'calendar_month', 'location_on', 'map', 'star', 'favorite', 'verified', 'article', 'description', 'attach_file', 'cloud_download', 'auto_awesome'] }
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

    const deleteLink = (id: string) => {
        setCardData(prev => ({
            ...prev,
            links: prev.links.filter(l => l.id !== id)
        }));
    };

    const getToolLabel = () => {
        switch (activeTool) {
            case 'conteudo': return 'Perfil & Métricas';
            case 'estilo': return 'Estilo & Tipografia';
            case 'social': return 'Playlist de Links';
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
                        boxShadow: currentColor?.toLowerCase() === color.toLowerCase() 
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
                                    <p className="text-[11px] font-medium text-slate-400 ml-1">Nome (ou Link do Nome)</p>
                                    <div className="flex gap-2">
                                        <Input className="text-sm flex-1" value={cardData.fullName} onChange={(e) => handleProfileChange('fullName', e.target.value)} />
                                        <Input className="text-sm w-24" placeholder="URL..." value={cardData.fullNameLink || ''} onChange={(e) => handleProfileChange('fullNameLink', e.target.value)} />
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-[11px] font-medium text-slate-400 ml-1">Cargo (ou Link do Cargo)</p>
                                    <div className="flex gap-2">
                                        <Input className="text-sm flex-1" value={cardData.jobTitle} onChange={(e) => handleProfileChange('jobTitle', e.target.value)} />
                                        <Input className="text-sm w-24" placeholder="URL..." value={cardData.jobTitleLink || ''} onChange={(e) => handleProfileChange('jobTitleLink', e.target.value)} />
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-[11px] font-medium text-slate-400 ml-1">Bio</p>
                                    <Textarea className="text-sm min-h-[100px]" value={cardData.bio} onChange={(e) => handleProfileChange('bio', e.target.value)} />
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4 pt-4 border-t">
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Métricas Autônomas</label>
                            <p className="text-[10px] text-slate-400 -mt-2">Cada métrica pode ter sua própria URL de destino.</p>
                            {cardData.stats.map((stat, index) => (
                                <div key={index} className="space-y-2 p-3 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700">
                                    <div className="grid grid-cols-2 gap-2">
                                        <Input className="h-8 text-xs" value={stat.label} onChange={(e) => handleStatChange(index, 'label', e.target.value)} />
                                        <Input className="h-8 text-xs font-bold" value={stat.value} onChange={(e) => handleStatChange(index, 'value', e.target.value)} />
                                    </div>
                                    <Input className="h-7 text-[10px] bg-white dark:bg-slate-900" placeholder="Link da métrica (ex: portfólio, certificado)..." value={stat.url || ''} onChange={(e) => handleStatChange(index, 'url', e.target.value)} />
                                </div>
                            ))}
                        </div>

                        <div className="space-y-4 pt-4 border-t bg-primary/5 -mx-6 px-6 py-6">
                            <label className="text-xs font-bold text-primary uppercase tracking-widest">Ajustes de Impressão (Físico)</label>
                            <p className="text-[10px] text-slate-500 mb-4 leading-tight">Escolha quais elementos e cores devem aparecer no cartão físico para manter a harmonia do template.</p>
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <p className="text-[11px] font-bold text-slate-400 uppercase">Cor de Fundo (Físico)</p>
                                    <ColorPickerGrid currentColor={cardData.physicalBackgroundColor || '#ffffff'} onSelect={(c) => handleProfileChange('physicalBackgroundColor', c)} />
                                </div>
                                
                                <div className="space-y-3 pt-2 border-t border-primary/10">
                                    <div className="flex items-center justify-between">
                                        <span className="text-xs font-medium text-slate-700 dark:text-slate-200">Exibir Foto/Capa</span>
                                        <Switch checked={cardData.physicalShowAvatar} onCheckedChange={(v) => handleProfileChange('physicalShowAvatar', v)} />
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-xs font-medium text-slate-700 dark:text-slate-200">Exibir Identidade</span>
                                        <Switch checked={cardData.physicalShowTitle} onCheckedChange={(v) => handleProfileChange('physicalShowTitle', v)} />
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-xs font-medium text-slate-700 dark:text-slate-200">Exibir Métricas</span>
                                        <Switch checked={cardData.physicalShowStats} onCheckedChange={(v) => handleProfileChange('physicalShowStats', v)} />
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-xs font-medium text-slate-700 dark:text-slate-200">Exibir Playlist de Links</span>
                                        <Switch checked={cardData.physicalShowLinks} onCheckedChange={(v) => handleProfileChange('physicalShowLinks', v)} />
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-xs font-medium text-slate-700 dark:text-slate-200">Exibir Rodapé Técnico</span>
                                        <Switch checked={cardData.physicalShowFooter} onCheckedChange={(v) => handleProfileChange('physicalShowFooter', v)} />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4 pt-4 border-t">
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Rodapé do Cartão Físico</label>
                            <div className="space-y-3">
                                <div className="space-y-1">
                                    <p className="text-[11px] font-medium text-slate-400 ml-1">Website exibido</p>
                                    <Input className="text-sm" placeholder="www.seusite.com" value={cardData.customWebsiteUrl || ''} onChange={(e) => handleProfileChange('customWebsiteUrl', e.target.value)} />
                                </div>
                                <div className="space-y-1">
                                    <p className="text-[11px] font-medium text-slate-400 ml-1">Copyright / Info</p>
                                    <Input className="text-sm" placeholder="DIGICARD STUDIO © 2024" value={cardData.footerText || ''} onChange={(e) => handleProfileChange('footerText', e.target.value)} />
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {activeTool === 'estilo' && (
                    <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-300">
                        <div className="space-y-4">
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Tipografia Global</label>
                            <div className="grid grid-cols-1 gap-2">
                                {fontFamilies.map(font => (
                                    <button 
                                        key={font.value}
                                        onClick={() => handleProfileChange('fontFamily', font.value)}
                                        className={cn(
                                            "flex flex-col items-start p-3 rounded-xl border-2 transition-all text-left",
                                            cardData.fontFamily === font.value 
                                                ? "border-primary bg-primary/5 shadow-sm" 
                                                : "border-slate-100 dark:border-slate-800 hover:border-primary/30"
                                        )}
                                    >
                                        <span className="text-sm font-bold" style={{ fontFamily: `'${font.value}', sans-serif` }}>{font.name}</span>
                                        <span className="text-[10px] text-slate-400">{font.description}</span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-4 pt-6 border-t">
                            <div className="flex items-center justify-between">
                                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Tamanho do Texto</label>
                                <span className="text-xs font-bold text-primary">{cardData.baseFontSize}px</span>
                            </div>
                            <Slider 
                                value={[cardData.baseFontSize]} 
                                min={12} 
                                max={24} 
                                step={1} 
                                onValueChange={([val]) => handleProfileChange('baseFontSize', val)} 
                            />
                            <p className="text-[10px] text-slate-400 italic">Isso ajustará a escala de todos os elementos textuais do cartão.</p>
                        </div>

                        <div className="pt-6 border-t space-y-4">
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Paleta do Tema (Digital)</label>
                            <ColorPickerGrid currentColor={cardData.themeColor} onSelect={(c) => handleProfileChange('themeColor', c)} />
                        </div>
                    </div>
                )}

                {activeTool === 'imagens' && (
                    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                        <div className="space-y-4">
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Foto de Perfil</label>
                            <div className="size-24 rounded-full border-2 border-primary/20 p-1 mx-auto relative group">
                                <img src={cardData.avatarUrl} className="w-full h-full rounded-full object-cover" alt="Avatar" />
                            </div>
                            <div className="space-y-2">
                                <Input className="text-sm" placeholder="URL da Foto..." value={cardData.avatarUrl} onChange={(e) => handleProfileChange('avatarUrl', e.target.value)} />
                                <Input className="text-sm" placeholder="Link do Clique na Foto..." value={cardData.avatarLink || ''} onChange={(e) => handleProfileChange('avatarLink', e.target.value)} />
                            </div>
                        </div>

                        <div className="space-y-4 pt-6 border-t">
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Banner / Capa</label>
                            <div className="aspect-video w-full rounded-lg bg-slate-100 dark:bg-slate-800 overflow-hidden border">
                                {cardData.bannerUrl && <img src={cardData.bannerUrl} className="w-full h-full object-cover" alt="Banner" />}
                            </div>
                            <div className="space-y-2">
                                <Input className="text-sm" placeholder="URL do Banner..." value={cardData.bannerUrl || ''} onChange={(e) => handleProfileChange('bannerUrl', e.target.value)} />
                                <Input className="text-sm" placeholder="Link do Clique no Banner..." value={cardData.bannerLink || ''} onChange={(e) => handleProfileChange('bannerLink', e.target.value)} />
                            </div>
                        </div>
                    </div>
                )}

                {activeTool === 'social' && (
                    <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Playlist de Conexões</label>
                        <p className="text-[10px] text-slate-400 -mt-2">Gerencie seus links sociais como componentes autônomos.</p>
                        <Accordion type="single" collapsible className="w-full space-y-2" value={selectedLinkId || undefined} onValueChange={setSelectedLinkId}>
                            {cardData.links.map((link) => (
                                <AccordionItem key={link.id} value={link.id} className="border rounded-xl px-4 bg-white dark:bg-slate-900 shadow-sm overflow-hidden border-slate-100 dark:border-slate-800">
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
                                            <p className="text-[10px] font-bold text-slate-400 uppercase">Rótulo do Link</p>
                                            <Input className="h-9 text-sm" value={link.label} onChange={(e) => handleLinkChange(link.id, 'label', e.target.value)} />
                                        </div>
                                        <div className="space-y-1.5">
                                            <p className="text-[10px] font-bold text-slate-400 uppercase">Destino (URL/Handle)</p>
                                            <Input className="h-9 text-sm" value={link.value} onChange={(e) => handleLinkChange(link.id, 'value', e.target.value)} />
                                        </div>
                                        <div className="space-y-3">
                                            <p className="text-[10px] font-bold text-slate-400 uppercase">Ícone do Componente</p>
                                            <div className="border rounded-lg bg-slate-50 dark:bg-slate-950 p-2 space-y-4 max-h-48 overflow-y-auto no-scrollbar">
                                                {iconCategories.map(cat => (
                                                    <div key={cat.label} className="space-y-2">
                                                        <p className="text-[8px] font-black uppercase tracking-widest text-slate-400 px-1">{cat.label}</p>
                                                        <div className="grid grid-cols-6 gap-1">
                                                            {cat.icons.map(icon => (
                                                                <button key={icon} onClick={() => handleLinkChange(link.id, 'icon', icon)} className={cn("p-1.5 rounded transition-all flex items-center justify-center", link.icon === icon ? "bg-primary text-white" : "text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800")}>
                                                                    <span className="material-symbols-outlined text-base">{icon}</span>
                                                                </button>
                                                            ))}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="flex items-center justify-between pt-2">
                                            <Button variant="ghost" className="text-red-500 text-xs h-8 px-2 hover:bg-red-50 dark:hover:bg-red-950" onClick={() => deleteLink(link.id)}>
                                                Remover Componente
                                            </Button>
                                            <div className="flex gap-1">
                                                {colorPalette.slice(0, 5).map(c => (
                                                    <button key={c} onClick={() => handleLinkChange(link.id, 'color', c)} className="size-5 rounded-full border border-white/20" style={{backgroundColor: c}} />
                                                ))}
                                            </div>
                                        </div>
                                    </AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                        
                        <Button className="w-full h-12 rounded-xl gap-2 mt-4" variant="outline" onClick={() => {
                            const newId = `link-${Date.now()}`;
                            const newLink: SocialLink = { id: newId, type: 'website', label: 'Novo Componente', value: '', icon: 'link', color: cardData.themeColor };
                            setCardData(prev => ({ ...prev, links: [...prev.links, newLink] }));
                            setSelectedLinkId(newId);
                        }}>
                            <span className="material-symbols-outlined text-lg">add_circle</span>
                            Adicionar Novo Link Autônomo
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
                            <Input className="text-sm mt-4" placeholder="Vincule ao seu Linktree ou perfil..." value={cardData.qrCodeUrl || ''} onChange={(e) => handleProfileChange('qrCodeUrl', e.target.value)} />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
