'use client';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Image from 'next/image';
import Link from 'next/link';
import { useToast } from '@/hooks/use-toast';
import { downloadPlotterSVG, downloadPhysicalPNG } from '@/lib/utils';
import type { CardData } from '@/lib/types';
import { useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

type EditorHeaderProps = {
  onPreviewClick: () => void;
  mode: 'digital' | 'physical';
  setMode: (mode: 'digital' | 'physical') => void;
  cardData: CardData;
};

export default function EditorHeader({ onPreviewClick, mode, setMode, cardData }: EditorHeaderProps) {
  const avatar = PlaceHolderImages.find(img => img.id === 'avatar-1');
  const { toast } = useToast();
  const [isExporting, setIsExporting] = useState(false);

  const handlePrint = () => {
    if (mode !== 'physical') {
      alert("Por favor, mude para o modo 'Físico' para exportar o PDF de impressão.");
      return;
    }
    window.print();
  };

  const handleExportSVG = async () => {
    setIsExporting(true);
    await downloadPlotterSVG(cardData);
    setIsExporting(false);
    toast({
      title: "Arquivo Vetorial Gerado",
      description: "O SVG foi otimizado com caminhos de corte e desenho para sua plotter.",
    });
  };

  const handleExportPNG = async () => {
    setIsExporting(true);
    await downloadPhysicalPNG(cardData);
    setIsExporting(false);
    toast({
      title: "PNG Gerado (350 DPI)",
      description: "Imagem de alta resolução exportada com sucesso.",
    });
  };

  const handlePublish = () => {
    toast({
      title: "Publicando cartão...",
      description: "Sincronizando dados com o servidor e gerando link público.",
    });
    
    setTimeout(() => {
      toast({
        title: "Cartão Publicado!",
        description: "Seu link digital já está disponível para compartilhamento.",
      });
    }, 1500);
  };

  return (
    <header className="h-16 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-center justify-between px-6 z-30 shrink-0 print:hidden">
        <div className="flex items-center gap-6">
            <Link href="/meus-cartoes" className="flex items-center gap-2 text-primary">
                <span className="material-symbols-outlined text-3xl font-bold">style</span>
                <h1 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">DigiCard Studio</h1>
            </Link>
            <div className="h-6 w-[1px] bg-slate-200 dark:bg-slate-700"></div>
            
            <Link 
              href="/meus-cartoes" 
              className="flex items-center gap-2 text-slate-500 hover:text-primary transition-colors font-semibold text-sm"
            >
              <span className="material-symbols-outlined text-lg">dashboard</span>
              <span className="hidden sm:inline">Meus Cartões</span>
            </Link>

            <div className="h-6 w-[1px] bg-slate-200 dark:bg-slate-700"></div>
            
            <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-lg">
                <button 
                  onClick={() => setMode('digital')}
                  className={`px-4 py-1.5 text-sm font-semibold rounded transition-all ${
                    mode === 'digital' 
                    ? 'bg-white dark:bg-slate-700 shadow-sm text-primary' 
                    : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
                  }`}
                >
                  Digital
                </button>
                <button 
                  onClick={() => setMode('physical')}
                  className={`px-4 py-1.5 text-sm font-semibold rounded transition-all ${
                    mode === 'physical' 
                    ? 'bg-white dark:bg-slate-700 shadow-sm text-primary' 
                    : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
                  }`}
                >
                  Físico
                </button>
            </div>
        </div>
        <div className="flex items-center gap-4">
            <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 rounded-lg p-1 mr-2">
                <button className="p-1.5 hover:bg-white dark:hover:bg-slate-700 rounded transition-colors">
                    <span className="material-symbols-outlined text-xl">undo</span>
                </button>
                <button className="p-1.5 hover:bg-white dark:hover:bg-slate-700 rounded transition-colors">
                    <span className="material-symbols-outlined text-xl">redo</span>
                </button>
            </div>
            
            <button 
                onClick={onPreviewClick}
                className="flex items-center gap-2 px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg font-semibold text-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
            >
                <span className="material-symbols-outlined text-lg">visibility</span>
                Preview
            </button>

            {mode === 'physical' && (
              <div className="flex items-center gap-2 animate-in fade-in slide-in-from-right-4 duration-300">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button 
                        disabled={isExporting}
                        className="flex items-center gap-2 px-4 py-2 border-2 border-primary/20 text-primary rounded-lg font-bold text-sm hover:bg-primary/5 transition-all disabled:opacity-50"
                    >
                        <span className="material-symbols-outlined text-lg">
                          {isExporting ? 'progress_activity' : 'download'}
                        </span>
                        Exportar Gabarito
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56 rounded-xl shadow-2xl border-none p-2 bg-white dark:bg-slate-900">
                    <DropdownMenuItem 
                      onClick={handleExportSVG}
                      className="gap-3 py-3 px-4 rounded-lg cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800"
                    >
                      <span className="material-symbols-outlined text-primary">vector_library</span>
                      <div className="flex flex-col">
                        <span className="font-bold text-sm">Salvar SVG</span>
                        <span className="text-[10px] text-slate-400">Para plotters e recorte</span>
                      </div>
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      onClick={handleExportPNG}
                      className="gap-3 py-3 px-4 rounded-lg cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800"
                    >
                      <span className="material-symbols-outlined text-primary">image</span>
                      <div className="flex flex-col">
                        <span className="font-bold text-sm">PNG (350 DPI)</span>
                        <span className="text-[10px] text-slate-400">Alta resolução para web/print</span>
                      </div>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem 
                      onClick={handlePrint}
                      className="gap-3 py-3 px-4 rounded-lg cursor-pointer bg-primary text-white hover:bg-primary/90"
                    >
                      <span className="material-symbols-outlined">print</span>
                      <div className="flex flex-col">
                        <span className="font-bold text-sm">Gerar PDF (A4)</span>
                        <span className="text-[10px] text-white/70">10 cartões por folha</span>
                      </div>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            )}

            <button 
                onClick={handlePublish}
                className="bg-slate-900 dark:bg-white dark:text-slate-900 text-white px-6 py-2 rounded-lg font-bold text-sm hover:opacity-90 transition-all"
            >
                Publicar
            </button>

            <div className="h-6 w-[1px] bg-slate-200 dark:bg-slate-700 mx-2"></div>
            
            <div className="flex items-center gap-3">
                <div className="flex flex-col items-end">
                    <span className="text-xs font-bold text-emerald-500 flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                        AO VIVO
                    </span>
                    <span className="text-[10px] text-slate-400">v1.2.4</span>
                </div>
                {avatar && <Image className="w-10 h-10 rounded-full border-2 border-primary/20" alt="Avatar" src={avatar.imageUrl} width={40} height={40} />}
            </div>
        </div>
    </header>
  );
}
