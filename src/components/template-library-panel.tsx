'use client';

import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import type { Dispatch, SetStateAction } from "react";
import type { CardData } from "@/lib/types";

const templates = [
    {
        id: 'social',
        name: 'Instagram Social Card',
        tag: 'Premium',
        tagColor: 'bg-amber-400',
        image: PlaceHolderImages.find(img => img.id === 'template-social')
    },
    {
        id: 'spotify',
        name: 'Spotify Wave',
        tag: 'Criativo',
        tagColor: 'bg-emerald-500',
        image: PlaceHolderImages.find(img => img.id === 'template-spotify')
    },
    {
        id: 'tiktok',
        name: 'TikTok Influencer Neon',
        tag: 'Novo',
        tagColor: 'bg-sky-500',
        image: PlaceHolderImages.find(img => img.id === 'template-tiktok')
    }
]

type TemplateLibraryPanelProps = {
    setCardData: Dispatch<SetStateAction<CardData>>;
};


export default function TemplateLibraryPanel({ setCardData }: TemplateLibraryPanelProps) {

  // This is a mock function. In a real app, this would apply a template.
  const applyTemplate = (templateId: string) => {
    console.log("Applying template:", templateId);
    // Example of changing theme color based on template
    if(templateId === 'spotify'){
        setCardData(prev => ({...prev, themeColor: '#1DB954'}));
    } else if (templateId === 'tiktok'){
        setCardData(prev => ({...prev, themeColor: '#ff0050'}));
    } else {
        setCardData(prev => ({...prev, themeColor: '#5048e5'}));
    }
  }

  return (
    <aside className="w-80 shrink-0 border-r border-slate-200 bg-white flex flex-col overflow-hidden">
      <div className="p-5 border-b border-slate-100">
        <h2 className="text-lg font-bold text-slate-800">Biblioteca de Modelos</h2>
        <p className="text-xs text-slate-500">Escolha um design para começar</p>
      </div>
      <div className="flex flex-wrap gap-2 p-4 border-b border-slate-100 bg-slate-50/50">
        <button className="rounded-full bg-primary px-3 py-1 text-[10px] font-bold text-white">Todos</button>
        <button className="rounded-full bg-white border border-slate-200 px-3 py-1 text-[10px] font-bold text-slate-600 hover:border-primary hover:text-primary transition-colors">Social</button>
        <button className="rounded-full bg-white border border-slate-200 px-3 py-1 text-[10px] font-bold text-slate-600 hover:border-primary hover:text-primary transition-colors">Corporativo</button>
        <button className="rounded-full bg-white border border-slate-200 px-3 py-1 text-[10px] font-bold text-slate-600 hover:border-primary hover:text-primary transition-colors">Minimalista</button>
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {templates.map(template => (
            <div key={template.id} className="group cursor-pointer" onClick={() => applyTemplate(template.id)}>
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl border border-slate-200 transition-all group-hover:border-primary group-hover:shadow-md">
                    {template.image && (
                        <Image
                            src={template.image.imageUrl}
                            alt={template.name}
                            width={400}
                            height={300}
                            className="h-full w-full object-cover transition-transform group-hover:scale-105"
                            data-ai-hint={template.image.imageHint}
                        />
                    )}
                    <div className={`absolute top-2 right-2 rounded px-1.5 py-0.5 text-[8px] font-black uppercase text-white ${template.tagColor}`}>{template.tag}</div>
                </div>
                <p className="mt-2 text-xs font-bold text-slate-700">{template.name}</p>
            </div>
        ))}
      </div>
    </aside>
  );
}
