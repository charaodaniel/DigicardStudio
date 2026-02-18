'use client';
import { useState, useEffect } from 'react';
import type { CardData } from '@/lib/types';
import DigitalCardPreview from '@/components/digital-card-preview';

export default function StandalonePreviewPage() {
  const [cardData, setCardData] = useState<CardData | null>(null);

  useEffect(() => {
    // Função para carregar dados do localStorage
    const loadData = () => {
      const savedData = localStorage.getItem('digicard-preview-data');
      if (savedData) {
        try {
          setCardData(JSON.parse(savedData));
        } catch (e) {
          console.error("Erro ao carregar dados do preview", e);
        }
      }
    };

    // Carregamento inicial
    loadData();

    // Listener para atualizações em tempo real vindas da janela do editor
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'digicard-preview-data') {
        loadData();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    
    // Fallback para quando o localStorage.setItem não dispara 'storage' na mesma janela (para navegadores específicos)
    const interval = setInterval(loadData, 1000);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, []);

  if (!cardData) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-slate-900 text-white font-medium">
        <div className="flex flex-col items-center gap-4">
          <span className="material-symbols-outlined animate-spin text-4xl text-primary">progress_activity</span>
          Carregando visualização...
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen w-screen bg-slate-100 dark:bg-slate-950 flex justify-center items-start sm:items-center overflow-hidden">
      <div className="relative w-full max-w-[480px] h-full sm:h-[85vh] sm:max-h-[900px] shadow-2xl overflow-hidden sm:rounded-[2.5rem] bg-white dark:bg-slate-900 ring-1 ring-slate-200 dark:ring-slate-800">
        <DigitalCardPreview cardData={cardData} />
      </div>
    </div>
  );
}
