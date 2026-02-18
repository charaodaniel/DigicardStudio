'use client';

import { useState } from "react";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import type { Dispatch, SetStateAction } from "react";
import type { CardData } from "@/lib/types";

const templates = [
    { id: 'default', name: 'Padrão Moderno', imageId: 'template-default', category: 'Corp' },
    { id: 'professionals', name: 'Profissionais', imageId: 'template-professionals', category: 'Corp' },
    { id: 'linkedin', name: 'LinkedIn', imageId: 'template-linkedin', category: 'Social' },
    { id: 'instagram', name: 'Instagram', imageId: 'template-instagram', category: 'Social' },
    { id: 'whatsapp', name: 'WhatsApp', imageId: 'template-whatsapp', category: 'Social' },
    { id: 'designer-studio', name: 'Designer Studio', imageId: 'template-designer-studio', category: 'Corp' },
    { id: 'executive', name: 'Executivo', imageId: 'template-executive', category: 'Corp' },
    { id: 'facebook', name: 'Facebook', imageId: 'template-facebook', category: 'Social' },
    { id: 'spotify', name: 'Spotify', imageId: 'template-spotify', category: 'Social' },
    { id: 'youtube', name: 'YouTube', imageId: 'template-youtube', category: 'Social' },
    { id: 'tiktok', name: 'TikTok', imageId: 'template-tiktok', category: 'Social' },
    { id: 'digicard-web', name: 'DigiCard Web', imageId: 'template-digicard-web', category: 'Corp' },
    { id: 'discord', name: 'Discord Style', imageId: 'template-discord', category: 'Social' },
];

const templatePresets: Record<string, Partial<CardData>> = {
    'default': { themeColor: '#5048e5' },
    'professionals': { themeColor: '#5048e5' },
    'linkedin': { themeColor: '#0A66C2' },
    'instagram': { themeColor: '#E1306C' },
    'whatsapp': { themeColor: '#25D366'},
    'designer-studio': { themeColor: '#5048e5'},
    'executive': { themeColor: '#D4AF37'},
    'facebook': { themeColor: '#1877F2'},
    'spotify': { themeColor: '#1DB954'},
    'youtube': { themeColor: '#FF0000'},
    'tiktok': { themeColor: '#ff0050'},
    'digicard-web': { themeColor: '#5048e5'},
    'discord': { themeColor: '#5865F2'},
}

type TemplateLibraryPanelProps = {
    setCardData: Dispatch<SetStateAction<CardData>>;
};


export default function TemplateLibrary({ setCardData }: TemplateLibraryPanelProps) {
  const [activeFilter, setActiveFilter] = useState('Todos');

  const applyTemplate = (templateId: string) => {
    const preset = templatePresets[templateId] || {};
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
