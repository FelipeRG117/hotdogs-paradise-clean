import { useState, useCallback } from 'react';
import { Vertical } from '@/lib/constants/verticals';
import mockData from '@/data/mock-restaurant.json';
import ConfigAdapter from '@/lib/adapters/ConfigAdapter';
import { useProductAnalytics } from './useProductAnalytics';

interface VerticalSwitchHook {
  currentVertical: Vertical;
  switchToVertical: (newVertical: Vertical) => Promise<boolean>;
  isValidMigration: (targetVertical: Vertical) => boolean;
  getCompatibilityScore: (targetVertical: Vertical) => number;
  isLoading: boolean;
  error: string | null;
}

export const useVerticalSwitch = (initialVertical?: Vertical): VerticalSwitchHook => {
  const { track } = useProductAnalytics();
  const [currentVertical, setCurrentVertical] = useState<Vertical>(
    initialVertical || (mockData.store.type as Vertical)
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isValidMigration = useCallback((targetVertical: Vertical): boolean => {
    if (targetVertical === currentVertical) return true;
    
    const adapter = new ConfigAdapter(currentVertical);
    return adapter.validateMigration(targetVertical);
  }, [currentVertical]);

  const getCompatibilityScore = useCallback((targetVertical: Vertical): number => {
    const adapter = new ConfigAdapter(currentVertical);
    return adapter.getCompatibilityScore(targetVertical);
  }, [currentVertical]);

  const switchToVertical = useCallback(async (newVertical: Vertical): Promise<boolean> => {
    if (newVertical === currentVertical) {
      return true;
    }

    setIsLoading(true);
    setError(null);

    try {
      const adapter = new ConfigAdapter(currentVertical);
      
      // Intentar la migración con tracking
      const migrationConfig = adapter.attemptMigration(newVertical, (event, data) => {
        track(event as any, data);
      });

      // Simular tiempo de migración (en un proyecto real, aquí harías la migración real)
      await new Promise(resolve => setTimeout(resolve, 1000));

      setCurrentVertical(newVertical);
      
      // Trackear migración exitosa
      track('migration_attempted', {
        sourceVertical: currentVertical,
        targetVertical: newVertical,
        isValid: true,
        compatibilityScore: adapter.getCompatibilityScore(newVertical),
        success: true
      });

      return true;
    } catch (migrationError) {
      const errorMessage = migrationError instanceof Error ? migrationError.message : 'Error desconocido';
      setError(errorMessage);
      
      // Trackear migración fallida
      track('migration_attempted', {
        sourceVertical: currentVertical,
        targetVertical: newVertical,
        isValid: false,
        success: false,
        error: errorMessage
      });

      return false;
    } finally {
      setIsLoading(false);
    }
  }, [currentVertical, track]);

  return {
    currentVertical,
    switchToVertical,
    isValidMigration,
    getCompatibilityScore,
    isLoading,
    error
  };
};

// Hook auxiliar para obtener información del vertical actual
export const useVerticalInfo = (vertical: Vertical) => {
  const extensionConfig = mockData.templateExtensions[vertical as keyof typeof mockData.templateExtensions];
  const verticalConfig = mockData.verticals[vertical as keyof typeof mockData.verticals];

  return {
    extensionConfig,
    verticalConfig,
    hasRequiredFields: extensionConfig?.requiredFields.length > 0,
    hasAdditionalComponents: extensionConfig?.additionalComponents.length > 0,
    isCurrentStoreVertical: mockData.store.type === vertical
  };
}; 