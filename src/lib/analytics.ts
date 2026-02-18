'use client';

/**
 * @fileOverview Sistema de Analytics simplificado para rastreamento de cliques e visualizações.
 */

type AnalyticsEvent = 'view_card' | 'click_link' | 'save_contact' | 'share_card';

export const trackEvent = (event: AnalyticsEvent, metadata?: Record<string, any>) => {
  // Placeholder para integração futura com sua própria API ou serviço de analytics
  console.log(`[Analytics] Event: ${event}`, metadata);
  
  // Exemplo de como você chamaria sua API:
  /*
  fetch('/api/analytics', {
    method: 'POST',
    body: JSON.stringify({ event, metadata, timestamp: new Date() }),
  });
  */
};
