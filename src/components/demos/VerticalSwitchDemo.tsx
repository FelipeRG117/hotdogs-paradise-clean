import React from 'react';
import { Vertical, VERTICAL_CONFIG } from '@/lib/constants/verticals';
import { VerticalTemplate } from '@/components/templates/VerticalTemplates';
import { useVerticalSwitch } from '@/hooks/useVerticalSwitch';
import { Button } from '@/components/ui/Button';

export const VerticalSwitchDemo: React.FC = () => {
  const {
    currentVertical,
    switchToVertical,
    isValidMigration,
    getCompatibilityScore,
    isLoading,
    error
  } = useVerticalSwitch();

  const handleVerticalSwitch = async (targetVertical: Vertical) => {
    const success = await switchToVertical(targetVertical);
    if (success) {
      console.log(`✅ Migración exitosa a ${targetVertical}`);
    } else {
      console.log(`❌ Migración fallida a ${targetVertical}`);
    }
  };

  const availableVerticals: Vertical[] = ['restaurant', 'service', 'creative'];

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {/* Header con información actual */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          🎨 Template Master - Demo de Verticales
        </h1>
        
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-sm text-gray-600">Vertical actual:</p>
            <p className="text-lg font-semibold capitalize">{currentVertical}</p>
          </div>
          
          {isLoading && (
            <div className="flex items-center space-x-2">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
              <span className="text-sm text-gray-600">Migrando...</span>
            </div>
          )}
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
            <p className="text-red-700 text-sm">❌ Error: {error}</p>
          </div>
        )}
      </div>

      {/* Selector de Verticales */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          🔄 Cambiar Vertical
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {availableVerticals.map(vertical => {
            const isValid = isValidMigration(vertical);
            const compatibilityScore = getCompatibilityScore(vertical);
            const isCurrent = vertical === currentVertical;
            
            return (
              <div
                key={vertical}
                className={`border rounded-lg p-4 ${
                  isCurrent 
                    ? 'border-blue-500 bg-blue-50' 
                    : isValid 
                      ? 'border-gray-200 hover:border-gray-300' 
                      : 'border-red-200 bg-red-50'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium capitalize">{vertical}</h3>
                  {isCurrent && (
                    <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded">
                      Actual
                    </span>
                  )}
                </div>
                
                <div className="text-sm text-gray-600 mb-3">
                  <p>Compatibilidad: {(compatibilityScore * 100).toFixed(1)}%</p>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                    <div
                      className={`h-2 rounded-full ${
                        compatibilityScore >= 0.8 ? 'bg-green-500' :
                        compatibilityScore >= 0.5 ? 'bg-yellow-500' : 'bg-red-500'
                      }`}
                      style={{ width: `${compatibilityScore * 100}%` }}
                    ></div>
                  </div>
                </div>
                
                <Button
                  onClick={() => handleVerticalSwitch(vertical)}
                  disabled={isCurrent || isLoading}
                  variant={isValid ? 'primary' : 'secondary'}
                  className="w-full"
                >
                  {isCurrent 
                    ? 'Actual' 
                    : isValid 
                      ? 'Migrar' 
                      : `Incompatible (${(compatibilityScore * 100).toFixed(0)}%)`
                  }
                </Button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Template del Vertical Actual */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          📋 Template Activo: {currentVertical}
        </h2>
        
        <VerticalTemplate 
          vertical={currentVertical} 
          showMissingFields={true}
        />
      </div>

      {/* Información de Debug */}
      <div className="bg-gray-50 rounded-lg p-4">
        <h3 className="font-medium text-gray-700 mb-2">🐛 Debug Info</h3>
        <div className="text-sm text-gray-600 space-y-1">
          <p>• Vertical actual: {currentVertical}</p>
          <p>• Loading: {isLoading ? 'Sí' : 'No'}</p>
          <p>• Error: {error || 'Ninguno'}</p>
          <p>• Migraciones válidas: {
            availableVerticals
              .filter(v => v !== currentVertical && isValidMigration(v))
              .join(', ') || 'Ninguna'
          }</p>
        </div>
      </div>
    </div>
  );
};

export default VerticalSwitchDemo;