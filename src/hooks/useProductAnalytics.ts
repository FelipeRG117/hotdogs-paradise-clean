import { useCallback } from 'react';
import mockData from '@/data/mock-restaurant.json';

type AnalyticsEvent = 
  | 'product_view'
  | 'product_customize_start'
  | 'product_customize_complete'
  | 'product_add_to_cart'
  | 'feature_selected'
  | 'migration_attempted';

interface EventPayload {
  productId?: string;
  vertical?: string;
  featureName?: string;
  featureValue?: string | number;
  targetVertical?: string;
  customizationCount?: number;
  [key: string]: unknown;
}

interface AnalyticsHook {
  track: (event: AnalyticsEvent, payload?: EventPayload) => void;
  isTrackingEnabled: boolean;
  getTrackingConfig: () => typeof mockData.analytics.customizationTracking;
}

export const useProductAnalytics = (): AnalyticsHook => {
  const analyticsConfig = mockData.systemConfig.observability.analyticsIntegration;
  const trackingConfig = mockData.analytics.customizationTracking;
  
  const isTrackingEnabled = trackingConfig.popularCombinations.storage !== 'disabled';

  const track = useCallback((event: AnalyticsEvent, payload: EventPayload = {}) => {
    if (!isTrackingEnabled) {
      return;
    }

    // Aplicar sample rate (solo trackear un % de eventos)
    const shouldSample = Math.random() <= trackingConfig.popularCombinations.sampleRate;
    if (!shouldSample) {
      return;
    }

    // Preparar el evento con metadata
    const eventData = {
      event,
      timestamp: new Date().toISOString(),
      sessionId: generateSessionId(),
      vertical: mockData.store.type,
      ...payload
    };

    // Enviar a todos los servicios configurados
    analyticsConfig.forEach(service => {
      sendToAnalyticsService(service, eventData);
    });

    // Log para desarrollo
    if (process.env.NODE_ENV === 'development') {
      console.log(`[Analytics] ${event}:`, eventData);
    }
  }, [isTrackingEnabled, trackingConfig.popularCombinations.sampleRate]);

  const getTrackingConfig = useCallback(() => trackingConfig, []);

  return {
    track,
    isTrackingEnabled,
    getTrackingConfig
  };
};

// Utilidades auxiliares
function generateSessionId(): string {
  return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

function sendToAnalyticsService(service: string, eventData: any) {
  switch (service) {
    case 'GA4':
      // En producción, aquí iría gtag('event', ...)
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', eventData.event, {
          event_category: 'Product Interaction',
          event_label: eventData.productId,
          custom_parameters: eventData
        });
      }
      break;
    
    case 'Hotjar':
      // En producción, aquí iría hj('event', ...)
      if (typeof window !== 'undefined' && (window as any).hj) {
        (window as any).hj('event', eventData.event);
      }
      break;
    
    case 'Facebook':
      // En producción, aquí iría fbq('track', ...)
      if (typeof window !== 'undefined' && (window as any).fbq) {
        (window as any).fbq('track', 'CustomizeProduct', {
          content_name: eventData.productId,
          content_category: eventData.vertical
        });
      }
      break;
    
    default:
      // Para servicios no configurados, usar console en desarrollo
      if (process.env.NODE_ENV === 'development') {
        console.log(`[${service}] Event:`, eventData);
      }
  }
}

// Hook específico para tracking de productos (más conveniente)
export const useProductTracking = (productId: string) => {
  const { track } = useProductAnalytics();
  
  return {
    trackView: () => track('product_view', { productId }),
    trackCustomizeStart: () => track('product_customize_start', { productId }),
    trackCustomizeComplete: (customizationCount: number) => 
      track('product_customize_complete', { productId, customizationCount }),
    trackFeatureSelect: (featureName: string, featureValue: string | number) =>
      track('feature_selected', { productId, featureName, featureValue }),
    trackAddToCart: () => track('product_add_to_cart', { productId })
  };
}; 