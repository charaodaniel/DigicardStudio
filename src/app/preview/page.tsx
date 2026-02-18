'use client';
import { useState, useEffect } from 'react';
import type { CardData } from '@/lib/types';
import DigitalCardPreview from '@/components/digital-card-preview';

export default function StandalonePreviewPage() {
  const [cardData, setCardData] = useState<CardData | null>(null);

  useEffect(() => {
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

    loadData();

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'digicard-preview-data') {
        loadData();
      }
    };

    window.addEventListener('storage', handleStorageChange);
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
    <div className="min-h-screen w-full bg-slate-50 dark:bg-slate-950 flex justify-center overflow-y-auto">
      {/* 
        Container responsivo: 
        - Mobile: Largura total
        - Desktop: Máximo de 500px para simular celular, mas com altura flexível
      */}
      <div className="relative w-full max-w-[500px] min-h-screen bg-white dark:bg-slate-900 shadow-2xl">
        <DigitalCardPreview cardData={cardData} />
      </div>
    </div>
  );
}
