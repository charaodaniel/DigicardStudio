'use client';
import { useState } from 'react';
import type { CardData } from '@/lib/types';
import { initialCardData } from '@/lib/data';
import AppHeader from '@/components/app-header';
import EditorSidebar from '@/components/editor-sidebar';
import CanvasArea from '@/components/canvas-area';
import PropertiesPanel from '@/components/properties-panel';
import TemplateLibraryPanel from '@/components/template-library-panel';

export type ActiveTool = 'profile' | 'design' | 'print' | 'qr';

export default function Home() {
  const [cardData, setCardData] = useState<CardData>(initialCardData);
  const [viewMode, setViewMode] = useState<'digital' | 'print'>('digital');
  const [activeTool, setActiveTool] = useState<ActiveTool>('profile');

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-background text-slate-900 font-display">
      <AppHeader />
      <div className="flex flex-1 overflow-hidden">
        <EditorSidebar activeTool={activeTool} setActiveTool={setActiveTool} />
        {activeTool === 'design' && <TemplateLibraryPanel setCardData={setCardData} />}
        <CanvasArea
          viewMode={viewMode}
          setViewMode={setViewMode}
          cardData={cardData}
        />
        {viewMode === 'digital' && (
          <PropertiesPanel cardData={cardData} setCardData={setCardData} />
        )}
      </div>
    </div>
  );
}
