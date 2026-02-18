
'use client';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import type { CardData } from '@/lib/types';
import { supabaseService } from '@/lib/supabase-service';
import DigitalCardPreview from '@/components/digital-card-preview';
import { trackEvent } from '@/lib/analytics';

/**
 * @fileOverview Página pública do cartão digital (/c/seu-link)
 */

export default function PublicCardPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [cardData, setCardData] = useState<CardData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadCard = async () => {
      setIsLoading(true);
      try {
        // Busca no Supabase pelo ID (slug)
        const data = await supabaseService.getCardById(slug);
        setCardData(data);
        if (data) trackEvent('view_card', { slug });
      } catch (error) {
        console.error("Erro ao carregar cartão:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadCard();
  }, [slug]);

  if (isLoading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-slate-900 text-white font-medium">
        <div className="flex flex-col items-center gap-4">
          <span className="material-symbols-outlined animate-spin text-4xl text-primary">progress_activity</span>
          Carregando perfil...
        </div>
      </div>
    );
  }

  if (!cardData) {
    return (
      <div className="h-screen w-screen flex flex-col items-center justify-center bg-slate-100 text-slate-900 gap-4">
        <span className="material-symbols-outlined text-5xl text-slate-300">error</span>
        <p className="font-bold">Cartão não encontrado ou ID inválido.</p>
        <a href="/" className="text-primary font-bold text-sm underline">Voltar para o Home</a>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-slate-50 dark:bg-slate-950 flex justify-center overflow-y-auto">
      <div className="relative w-full max-w-[500px] min-h-screen bg-white dark:bg-slate-900 shadow-2xl">
        <DigitalCardPreview cardData={cardData} />
      </div>
    </div>
  );
}
