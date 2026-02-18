'use client';
import { useState, useEffect } from 'react';
import type { CardData } from '@/lib/types';
import { initialCardData } from '@/lib/data';
import EditorHeader from '@/components/editor/editor-header';
import ToolsSidebar from '@/components/editor/tools-sidebar';
import Canvas from '@/components/editor/canvas';
import PropertiesSidebar from '@/components/editor/properties-sidebar';
import EditorFooter from '@/components/editor/editor-footer';
import TemplateLibrary from '@/components/editor/template-library';

export default function EditorPage() {
  const [cardData, setCardData] = useState<CardData>(initialCardData);
  const [activeTool, setActiveTool] = useState('conteudo');
  const [selectedLinkId, setSelectedLinkId] = useState<string | null>(cardData.links[0]?.id || null);

  // Sincroniza os dados com o localStorage para que a janela de preview possa ler
  useEffect(() => {
    localStorage.setItem('digicard-preview-data', JSON.stringify(cardData));
  }, [cardData]);

  const handleToolClick = (toolId: string) => {
    setActiveTool(toolId);
  };

  const handlePreviewClick = () => {
    window.open('/preview', '_blank');
  };

  return (
    <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 h-screen overflow-hidden flex flex-col">
      <EditorHeader onPreviewClick={handlePreviewClick} />
      
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
    </div>
  );
}
