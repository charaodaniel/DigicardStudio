'use client';
import { useState } from 'react';
import type { CardData } from '@/lib/types';
import { initialCardData } from '@/lib/data';
import EditorHeader from '@/components/editor/editor-header';
import ToolsSidebar from '@/components/editor/tools-sidebar';
import Canvas from '@/components/editor/canvas';
import PropertiesSidebar from '@/components/editor/properties-sidebar';
import EditorFooter from '@/components/editor/editor-footer';
import TemplateLibrary from '@/components/editor/template-library';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import DigitalCardPreview from '@/components/digital-card-preview';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';

export default function EditorPage() {
  const [cardData, setCardData] = useState<CardData>(initialCardData);
  const [activeTool, setActiveTool] = useState('conteudo');
  const [selectedLinkId, setSelectedLinkId] = useState<string | null>(cardData.links[0]?.id || null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const handleToolClick = (toolId: string) => {
    setActiveTool(toolId);
  };

  return (
    <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 h-screen overflow-hidden flex flex-col">
      <EditorHeader onPreviewClick={() => setIsPreviewOpen(true)} />
      
      <main className="flex-1 flex overflow-hidden">
        <ToolsSidebar
          activeTool={activeTool}
          onToolClick={handleToolClick}
        />
        
        <Canvas 
          cardData={cardData} 
          selectedLinkId={selectedLinkId} 
          setSelectedLinkId={setSelectedLinkId}
          setActiveTool={setActiveTool}
        />

        <aside className="w-80 border-l border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col shrink-0 overflow-hidden">
          {activeTool === 'modelos' ? (
            <TemplateLibrary setCardData={setCardData} />
          ) : (
            <PropertiesSidebar 
              cardData={cardData} 
              setCardData={setCardData} 
              selectedLinkId={selectedLinkId}
              setSelectedLinkId={setSelectedLinkId}
              activeTool={activeTool}
              setActiveTool={setActiveTool}
            />
          )}
        </aside>
      </main>
      
      <EditorFooter />

      {/* Modal de Preview Realista */}
      <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
        <DialogContent className="max-w-none w-screen h-screen p-0 bg-slate-900/95 border-none flex items-center justify-center z-[100]">
          <DialogTitle>
            <VisuallyHidden>Visualização do Cartão</VisuallyHidden>
          </DialogTitle>
          <div className="relative w-[375px] h-[812px] bg-white rounded-[3rem] overflow-hidden shadow-2xl ring-8 ring-slate-800 animate-in zoom-in-95 duration-300">
             <DigitalCardPreview cardData={cardData} />
             
             {/* Dynamic Island Mockup */}
             <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-7 bg-black rounded-b-2xl z-50"></div>
          </div>
          
          <button 
            onClick={() => setIsPreviewOpen(false)}
            className="absolute top-6 right-6 text-white hover:bg-white/10 p-2 rounded-full transition-colors"
          >
            <span className="material-symbols-outlined text-3xl">close</span>
          </button>
          
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/50 text-xs font-medium uppercase tracking-widest flex items-center gap-2">
            <span className="material-symbols-outlined text-sm">devices</span>
            Visualização em tempo real
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
