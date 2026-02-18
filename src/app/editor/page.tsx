
'use client';
import { useState, useEffect, Suspense, useCallback } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import type { CardData } from '@/lib/types';
import { initialCardData } from '@/lib/data';
import { supabaseService } from '@/lib/supabase-service';
import EditorHeader from '@/components/editor/editor-header';
import ToolsSidebar from '@/components/editor/tools-sidebar';
import Canvas from '@/components/editor/canvas';
import PropertiesSidebar from '@/components/editor/properties-sidebar';
import EditorFooter from '@/components/editor/editor-footer';
import TemplateLibrary from '@/components/editor/template-library';

function EditorContent() {
  const searchParams = useSearchParams();
  const cardId = searchParams.get('id');

  const [cardData, setCardData] = useState<CardData>(initialCardData);
  const [past, setPast] = useState<CardData[]>([]);
  const [future, setFuture] = useState<CardData[]>([]);
  
  const [activeTool, setActiveTool] = useState('conteudo');
  const [mode, setMode] = useState<'digital' | 'physical'>('digital');
  const [selectedLinkId, setSelectedLinkId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(!!cardId);

  // Carrega do Supabase ou banco local no início
  useEffect(() => {
    const loadCard = async () => {
      if (cardId) {
        setIsLoading(true);
        const savedCard = await supabaseService.getCardById(cardId);
        if (savedCard) {
          setCardData(savedCard);
        }
        setIsLoading(false);
      }
    };
    loadCard();
  }, [cardId]);

  // Salva no banco sempre que mudar (Debounce simplificado pelo useEffect)
  useEffect(() => {
    const saveTimeout = setTimeout(() => {
      supabaseService.saveCard(cardData);
      localStorage.setItem('digicard-preview-data', JSON.stringify(cardData));
    }, 1000);

    return () => clearTimeout(saveTimeout);
  }, [cardData]);

  // Função para atualizar dados com registro de histórico
  const updateCardData = useCallback((newData: CardData | ((prev: CardData) => CardData)) => {
    setCardData(current => {
      const resolvedData = typeof newData === 'function' ? newData(current) : newData;
      
      // Só adiciona ao histórico se houver mudança real
      if (JSON.stringify(resolvedData) !== JSON.stringify(current)) {
        setPast(prev => [...prev.slice(-19), current]); // Limite de 20 estados
        setFuture([]);
      }
      
      return resolvedData;
    });
  }, []);

  const undo = useCallback(() => {
    if (past.length === 0) return;
    
    setPast(prevPast => {
      const previous = prevPast[prevPast.length - 1];
      const newPast = prevPast.slice(0, prevPast.length - 1);
      
      setFuture(prevFuture => [cardData, ...prevFuture]);
      setCardData(previous);
      
      return newPast;
    });
  }, [cardData, past]);

  const redo = useCallback(() => {
    if (future.length === 0) return;
    
    setFuture(prevFuture => {
      const next = prevFuture[0];
      const newFuture = prevFuture.slice(1);
      
      setPast(prevPast => [...prevPast, cardData]);
      setCardData(next);
      
      return newFuture;
    });
  }, [cardData, future]);

  // Atalhos de teclado
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'z') {
        if (e.shiftKey) {
          redo();
        } else {
          undo();
        }
      } else if ((e.ctrlKey || e.metaKey) && e.key === 'y') {
        redo();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [undo, redo]);

  const handleToolClick = (toolId: string) => {
    setActiveTool(toolId);
  };

  const handlePreviewClick = () => {
    window.open('/preview', '_blank');
  };

  if (isLoading) {
    return (
      <div className="h-screen w-full flex flex-col items-center justify-center bg-slate-900 text-white">
        <span className="material-symbols-outlined animate-spin text-5xl text-primary mb-4">progress_activity</span>
        <p className="text-xs font-black uppercase tracking-[0.2em]">Sincronizando Identidade...</p>
      </div>
    );
  }

  return (
    <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 h-screen overflow-hidden flex flex-col">
      <EditorHeader 
        onPreviewClick={handlePreviewClick} 
        mode={mode}
        setMode={setMode}
        cardData={cardData}
        undo={undo}
        redo={redo}
        canUndo={past.length > 0}
        canRedo={future.length > 0}
      />
      
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
          mode={mode}
        />

        <aside className="w-80 border-l border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col shrink-0 overflow-hidden">
          {activeTool === 'modelos' ? (
            <TemplateLibrary setCardData={updateCardData} />
          ) : (
            <PropertiesSidebar 
              cardData={cardData} 
              setCardData={updateCardData} 
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

export default function EditorPage() {
  return (
    <Suspense fallback={<div className="h-screen w-full flex items-center justify-center">Carregando editor...</div>}>
      <EditorContent />
    </Suspense>
  );
}
