'use client';

import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import type { Dispatch, SetStateAction } from "react";
import type { CardData } from "@/lib/types";

const templates = [
    { id: 'default', name: 'Padrão Moderno', imageId: 'template-default' },
    { id: 'professionals', name: 'Profissionais', imageId: 'template-professionals' },
    { id: 'linkedin', name: 'LinkedIn', imageId: 'template-linkedin' },
    { id: 'instagram', name: 'Instagram', imageId: 'template-instagram' },
    { id: 'whatsapp', name: 'WhatsApp', imageId: 'template-whatsapp' },
    { id: 'designer-studio', name: 'Designer Studio', imageId: 'template-designer-studio' },
    { id: 'executive', name: 'Executivo', imageId: 'template-executive' },
    { id: 'facebook', name: 'Facebook', imageId: 'template-facebook' },
    { id: 'spotify', name: 'Spotify', imageId: 'template-spotify' },
    { id: 'youtube', name: 'YouTube', imageId: 'template-youtube' },
    { id: 'tiktok', name: 'TikTok', imageId: 'template-tiktok' },
    { id: 'digicard-web', name: 'DigiCard Web', imageId: 'template-digicard-web' },
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
}

type TemplateLibraryPanelProps = {
    setCardData: Dispatch<SetStateAction<CardData>>;
};


export default function TemplateLibrary({ setCardData }: TemplateLibraryPanelProps) {

  const applyTemplate = (templateId: string) => {
    const preset = templatePresets[templateId] || {};
    setCardData(prev => ({
        ...prev,
        ...preset,
        template: templateId
    }));
  }

  return (
    <aside className="w-80 shrink-0 border-r border-slate-200 bg-white dark:bg-slate-900 flex flex-col overflow-hidden">
      <div className="p-5 border-b border-slate-100 dark:border-slate-800">
        <h2 className="text-lg font-bold text-slate-800">Biblioteca de Modelos</h2>
        <p className="text-xs text-slate-500">Escolha um design para começar</p>
      </div>
      <div className="flex flex-wrap gap-2 p-4 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
        <button className="rounded-full bg-primary px-3 py-1 text-[10px] font-bold text-white">Todos</button>
        <button className="rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-3 py-1 text-[10px] font-bold text-slate-600 dark:text-slate-300 hover:border-primary hover:text-primary transition-colors">Social</button>
        <button className="rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-3 py-1 text-[10px] font-bold text-slate-600 dark:text-slate-300 hover:border-primary hover:text-primary transition-colors">Corporativo</button>
        <button className="rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-3 py-1 text-[10px] font-bold text-slate-600 dark:text-slate-300 hover:border-primary hover:text-primary transition-colors">Minimalista</button>
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {templates.map(template => {
            const image = PlaceHolderImages.find(img => img.id === template.imageId);
            return (
                <div key={template.id} className="group cursor-pointer" onClick={() => applyTemplate(template.id)}>
                    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl border border-slate-200 dark:border-slate-700 transition-all group-hover:border-primary group-hover:shadow-md">
                        {image && (
                            <Image
                                src={image.imageUrl}
                                alt={template.name}
                                width={400}
                                height={300}
                                className="h-full w-full object-cover transition-transform group-hover:scale-105"
                                data-ai-hint={image.imageHint}
                            />
                        )}
                    </div>
                    <p className="mt-2 text-xs font-bold text-slate-700 dark:text-slate-200">{template.name}</p>
                </div>
            )
        })}
      </div>
    </aside>
  );
}
