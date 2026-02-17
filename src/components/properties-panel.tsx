'use client';
import type { Dispatch, SetStateAction } from 'react';
import type { CardData } from '@/lib/types';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Switch } from './ui/switch';
import { Button } from './ui/button';

type PropertiesPanelProps = {
  cardData: CardData;
  setCardData: Dispatch<SetStateAction<CardData>>;
};

export default function PropertiesPanel({ cardData, setCardData }: PropertiesPanelProps) {
    
    const handleColorChange = (color: string) => {
        setCardData(prev => ({...prev, themeColor: color}))
    }

    const colors = [
        '#5048e5', '#10b981', '#ef4444', '#f59e0b', '#3b82f6'
    ];

  return (
    <aside className="w-80 shrink-0 border-l border-slate-200 bg-white flex flex-col">
      <div className="p-5 border-b border-slate-100">
        <h2 className="text-lg font-bold text-slate-800">Propriedades</h2>
        <p className="text-xs text-slate-500">
          Configurações do perfil selecionado
        </p>
      </div>
      <div className="flex-1 overflow-y-auto p-5 space-y-6">
        <div className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="fullName" className="text-xs font-bold text-slate-600 uppercase tracking-tight">Nome Completo</Label>
            <Input
              id="fullName"
              type="text"
              value={cardData.fullName}
              onChange={(e) => setCardData(prev => ({...prev, fullName: e.target.value}))}
              className="mt-1.5 w-full rounded-lg border-slate-200 bg-slate-50 text-sm focus:border-primary focus:ring-primary"
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="jobTitle" className="text-xs font-bold text-slate-600 uppercase tracking-tight">Cargo</Label>
            <Input
              id="jobTitle"
              type="text"
              value={cardData.jobTitle}
              onChange={(e) => setCardData(prev => ({...prev, jobTitle: e.target.value}))}
              className="mt-1.5 w-full rounded-lg border-slate-200 bg-slate-50 text-sm focus:border-primary focus:ring-primary"
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="bio" className="text-xs font-bold text-slate-600 uppercase tracking-tight">Bio Curta</Label>
            <Textarea
              id="bio"
              value={cardData.bio}
              onChange={(e) => setCardData(prev => ({...prev, bio: e.target.value}))}
              className="mt-1.5 w-full rounded-lg border-slate-200 bg-slate-50 text-sm focus:border-primary focus:ring-primary"
              rows={3}
            />
          </div>
        </div>

        <div className="rounded-xl border border-primary/20 bg-primary/5 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>
                verified
              </span>
              <span className="text-sm font-bold text-slate-700">
                Selo Verificado
              </span>
            </div>
            <Switch
              checked={cardData.isVerified}
              onCheckedChange={(checked) => setCardData(prev => ({...prev, isVerified: checked}))}
            />
          </div>
          <p className="mt-2 text-[10px] leading-relaxed text-slate-500">
            Exibe um ícone de verificação ao lado do nome no cartão digital para
            maior credibilidade.
          </p>
        </div>

        <div className="space-y-4 border-t border-slate-100 pt-6">
          <span className="text-xs font-bold text-slate-600 uppercase tracking-tight">
            Cor de Destaque
          </span>
          <div className="flex flex-wrap gap-2">
            {colors.map(color => (
                <button key={color} onClick={() => handleColorChange(color)} className="h-8 w-8 rounded-full" style={{backgroundColor: color, outline: cardData.themeColor === color ? `2px solid ${color}` : '', outlineOffset: '2px'}} />
            ))}
            <button className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 bg-slate-100">
              <span className="material-symbols-outlined text-sm">add</span>
            </button>
          </div>
        </div>

        <div className="space-y-3 border-t border-slate-100 pt-6 opacity-40 grayscale pointer-events-none">
          <span className="text-xs font-bold text-slate-600 uppercase tracking-tight">
            Opções de Impressão
          </span>
          <div className="flex items-center gap-2">
            <Switch id="crop-marks" />
            <Label htmlFor="crop-marks" className="text-xs text-slate-700 font-medium">Marcas de Corte</Label>
          </div>
          <div className="flex items-center gap-2">
            <Switch id="bleed" />
            <Label htmlFor="bleed" className="text-xs text-slate-700 font-medium">Sangria (3mm)</Label>
          </div>
        </div>
      </div>
      <div className="mt-auto border-t border-slate-200 bg-slate-50 p-5">
        <Button variant="outline" className="w-full border-primary text-primary hover:bg-primary/5">
          <span className="material-symbols-outlined text-sm">history</span>
          Histórico de Versões
        </Button>
      </div>
    </aside>
  );
}
