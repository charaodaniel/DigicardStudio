'use client';

import { useState } from "react";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import type { Dispatch, SetStateAction } from "react";
import type { CardData } from "@/lib/types";

export const templates = [
    { id: 'default', name: 'Padrão Moderno', imageId: 'template-default', category: 'Corp', orientation: 'horizontal' },
    { id: 'professionals', name: 'Arquiteto/Design', imageId: 'template-professionals', category: 'Corp', orientation: 'horizontal' },
    { id: 'executive', name: 'Executivo Elite', imageId: 'template-executive', category: 'Corp', orientation: 'horizontal' },
    { id: 'linkedin', name: 'LinkedIn Card', imageId: 'template-linkedin', category: 'Social', orientation: 'vertical' },
    { id: 'instagram', name: 'InstaCard Studio', imageId: 'template-instagram', category: 'Social', orientation: 'horizontal' },
    { id: 'instagram-v', name: 'InstaCard Vertical', imageId: 'template-instagram', category: 'Social', orientation: 'vertical' },
    { id: 'whatsapp', name: 'WhatsApp Business', imageId: 'template-whatsapp', category: 'Social', orientation: 'horizontal' },
    { id: 'twitch-h', name: 'Twitch Horizontal', imageId: 'template-discord', category: 'Social', orientation: 'horizontal' },
    { id: 'twitch-v', name: 'Twitch Vertical', imageId: 'template-discord', category: 'Social', orientation: 'vertical' },
    { id: 'facebook', name: 'Facebook Pro', imageId: 'template-facebook', category: 'Social', orientation: 'horizontal' },
    { id: 'facebook-v', name: 'Facebook Vertical', imageId: 'template-facebook', category: 'Social', orientation: 'vertical' },
    { id: 'spotify', name: 'Spotify Music', imageId: 'template-spotify', category: 'Social', orientation: 'horizontal' },
    { id: 'spotify-v', name: 'Spotify Vertical', imageId: 'template-spotify', category: 'Social', orientation: 'vertical' },
    { id: 'youtube', name: 'YouTube Channel', imageId: 'template-youtube', category: 'Social', orientation: 'horizontal' },
    { id: 'youtube-v', name: 'YouTube Vertical', imageId: 'template-youtube', category: 'Social', orientation: 'vertical' },
];

const templatePresets: Record<string, Partial<CardData>> = {
    'default': { themeColor: '#5048e5', physicalBackgroundColor: '#ffffff' },
    'professionals': { themeColor: '#5048e5', physicalBackgroundColor: '#ffffff' },
    'linkedin': { themeColor: '#0A66C2', physicalBackgroundColor: '#ffffff' },
    'instagram': { themeColor: '#E1306C', physicalBackgroundColor: '#ffffff' },
    'instagram-v': { themeColor: '#E1306C', physicalBackgroundColor: '#ffffff' },
    'whatsapp': { themeColor: '#25D366', physicalBackgroundColor: '#ffffff' },
    'executive': { themeColor: '#D4AF37', physicalBackgroundColor: '#0a0a0b' },
    'facebook': { themeColor: '#1877F2', physicalBackgroundColor: '#ffffff' },
    'facebook-v': { themeColor: '#1877F2', physicalBackgroundColor: '#ffffff' },
    'spotify': { themeColor: '#1DB954', physicalBackgroundColor: '#121212' },
    'spotify-v': { themeColor: '#1DB954', physicalBackgroundColor: '#121212' },
    'youtube': { themeColor: '#FF0000', physicalBackgroundColor: '#FF0000' },
    'youtube-v': { themeColor: '#FF0000', physicalBackgroundColor: '#FF0000' },
    'twitch-h': { themeColor: '#9146FF', physicalBackgroundColor: '#0e0e10' },
    'twitch-v': { themeColor: '#9146FF', physicalBackgroundColor: '#0e0e10' },
}

type TemplateLibraryPanelProps = {
    setCardData: Dispatch<SetStateAction<CardData>>;
};


export default function TemplateLibrary({ setCardData }: TemplateLibraryPanelProps) {
  const [activeFilter, setActiveFilter] = useState('Todos');

  const applyTemplate = (templateId: string) => {
    const preset = templatePresets[templateId] || { physicalBackgroundColor: '#ffffff' };
    setCardData(prev => ({
        ...prev,
        ...preset,
        template: templateId
    }));
  };

  const filteredTemplates = activeFilter === 'Todos' 
    ? templates 
    : templates.filter(t => t.category === activeFilter);

  const filterButtons = ['Todos', 'Social', 'Corp'];

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <div className="p-5 border-b border-slate-100 dark:border-slate-800">
        <h2 className="text-lg font-bold text-slate-800 dark:text-white">Biblioteca de Modelos</h2>
        <p className="text-xs text-slate-500">Escolha um design para seu cartão</p>
      </div>
      <div className="flex flex-wrap gap-2 p-4 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
        {filterButtons.map(filter => (
            <button 
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`rounded-full px-3 py-1 text-[10px] font-bold transition-all border ${
                    activeFilter === filter 
                    ? 'bg-primary border-primary text-white' 
                    : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-primary hover:text-primary'
                }`}
            >
                {filter}
            </button>
        ))}
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-4 no-scrollbar">
        {filteredTemplates.map(template => {
            const image = PlaceHolderImages.find(img => img.id === template.imageId);
            return (
                <div key={template.id} className="group cursor-pointer" onClick={() => applyTemplate(template.id)}>
                    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl border border-slate-200 dark:border-slate-700 transition-all group-hover:border-primary group-hover:shadow-md">
                        {image ? (
                            <Image
                                src={image.imageUrl}
                                alt={template.name}
                                width={400}
                                height={300}
                                className="h-full w-full object-cover transition-transform group-hover:scale-105"
                                data-ai-hint={image.imageHint}
                            />
                        ) : (
                            <div className="w-full h-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                                <span className="material-symbols-outlined text-slate-300 text-4xl">style</span>
                            </div>
                        )}
                        <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-colors" />
                        <div className="absolute top-2 right-2">
                            <span className="bg-black/60 backdrop-blur-md text-white text-[8px] px-2 py-0.5 rounded font-bold uppercase tracking-wider">
                                {template.orientation === 'horizontal' ? 'Horizontal' : 'Vertical'}
                            </span>
                        </div>
                    </div>
                    <p className="mt-2 text-xs font-bold text-slate-700 dark:text-slate-200">{template.name}</p>
                </div>
            )
        })}
        {filteredTemplates.length === 0 && (
            <div className="flex flex-col items-center justify-center py-12 text-center">
                <span className="material-symbols-outlined text-4xl text-slate-300 mb-2">search_off</span>
                <p className="text-sm text-slate-500">Nenhum modelo encontrado nesta categoria.</p>
            </div>
        )}
      </div>
    </div>
  );
}
