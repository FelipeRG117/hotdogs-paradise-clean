'use client'

import { Product } from '@/types/product'
import { CustomizationState } from './ProductCustomizer'

interface CustomizationPreviewProps {
  product: Product
  customizations: CustomizationState
  totalPrice: number
}

export function CustomizationPreview({ 
  product, 
  customizations, 
  totalPrice 
}: CustomizationPreviewProps) {
  
  const hasCustomizations = 
    customizations.size !== 'Medium' ||
    customizations.bread !== 'Blanco' ||
    customizations.ingredients.length > 0 ||
    customizations.sauces.length > 1 ||
    !customizations.sauces.includes('ketchup')

  return (
    <div className="space-y-4">
      {/* Product Title */}
      <div className="text-center">
        <h3 className="text-lg font-semibold text-gray-900">
          {product.name} Personalizado
        </h3>
        <p className="text-2xl font-bold text-orange-600 mt-1">
          ${totalPrice.toFixed(2)}
        </p>
      </div>

      {/* Customization Summary */}
      {hasCustomizations ? (
        <div className="bg-orange-50 rounded-lg p-4 space-y-3">
          <h4 className="text-sm font-medium text-orange-900 flex items-center">
            🎨 Tu Personalización
          </h4>
          
          <div className="space-y-2">
            {/* Size */}
            <div className="flex items-center justify-between">
              <span className="text-sm text-orange-800">Tamaño:</span>
              <span className="text-sm font-medium text-orange-900">
                {customizations.size}
              </span>
            </div>

            {/* Bread */}
            <div className="flex items-center justify-between">
              <span className="text-sm text-orange-800">Pan:</span>
              <span className="text-sm font-medium text-orange-900">
                {customizations.bread}
              </span>
            </div>

            {/* Ingredients */}
            {customizations.ingredients.length > 0 && (
              <div>
                <span className="text-sm text-orange-800">Ingredientes extras:</span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {customizations.ingredients.map(ingredient => (
                    <span
                      key={ingredient}
                      className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-orange-200 text-orange-800"
                    >
                      {ingredient}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Sauces */}
            {customizations.sauces.length > 0 && (
              <div>
                <span className="text-sm text-orange-800">Salsas:</span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {customizations.sauces.map(sauce => (
                    <span
                      key={sauce}
                      className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-orange-200 text-orange-800"
                    >
                      {sauce}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        /* Default Configuration */
        <div className="bg-gray-50 rounded-lg p-4 text-center">
          <div className="text-4xl mb-2">🌭</div>
          <h4 className="text-sm font-medium text-gray-900 mb-1">
            Configuración Clásica
          </h4>
          <p className="text-xs text-gray-600">
            Hot dog mediano con pan blanco y ketchup
          </p>
        </div>
      )}

      {/* Visual Representation */}
      <div className="bg-white border-2 border-dashed border-gray-200 rounded-lg p-6">
        <div className="text-center space-y-2">
          <div className="text-4xl">
            {customizations.size === 'Large' ? '🌭🌭' : 
             customizations.size === 'Small' ? '🌭' : '🌭'}
          </div>
          
          <div className="flex justify-center space-x-1">
            {customizations.ingredients.includes('queso') && <span>🧀</span>}
            {customizations.ingredients.includes('tocino') && <span>🥓</span>}
            {customizations.ingredients.includes('cebolla') && <span>🧅</span>}
            {customizations.ingredients.includes('jalapeños') && <span>🌶️</span>}
            {customizations.ingredients.includes('aguacate') && <span>🥑</span>}
            {customizations.ingredients.includes('champiñones') && <span>🍄</span>}
          </div>

          <div className="text-xs text-gray-500">
            Vista previa de tu hot dog personalizado
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 gap-4 text-center">
        <div className="bg-white rounded-lg border border-gray-200 p-3">
          <div className="text-lg font-bold text-gray-900">
            {customizations.ingredients.length + customizations.sauces.length}
          </div>
          <div className="text-xs text-gray-600">Extras</div>
        </div>
        
        <div className="bg-white rounded-lg border border-gray-200 p-3">
          <div className="text-lg font-bold text-orange-600">
            ${(totalPrice - product.basePrice).toFixed(2)}
          </div>
          <div className="text-xs text-gray-600">Personalización</div>
        </div>
      </div>
    </div>
  )
}
