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

export default function EditorPage() {
  const [cardData, setCardData] = useState<CardData>(initialCardData);
  const [activeTool, setActiveTool] = useState('conteudo');
  const [selectedLinkId, setSelectedLinkId] = useState<string | null>(cardData.links[0]?.id || null);

  const handleToolClick = (toolId: string) => {
    setActiveTool(toolId);
  };

  return (
    <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 h-screen overflow-hidden flex flex-col">
      <EditorHeader cardData={cardData} />
      <main className="flex-1 flex overflow-hidden">
        <ToolsSidebar
          activeTool={activeTool}
          onToolClick={handleToolClick}
        />
        {activeTool === 'modelos' ? (
          <TemplateLibrary setCardData={setCardData} />
        ) : (
          <>
            <Canvas 
              cardData={cardData} 
              selectedLinkId={selectedLinkId} 
              setSelectedLinkId={setSelectedLinkId} 
            />
            <PropertiesSidebar 
              cardData={cardData} 
              setCardData={setCardData} 
              selectedLinkId={selectedLinkId}
              setSelectedLinkId={setSelectedLinkId}
              activeTool={activeTool}
            />
          </>
        )}
      </main>
      <EditorFooter />
    </div>
  );
}
