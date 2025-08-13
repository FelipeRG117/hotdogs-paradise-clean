'use client'

import { CustomizationState } from './ProductCustomizer'

interface Option {
  id: string
  name: string
  price: number
}

interface CustomizationOptions {
  sizes: Option[]
  breads: Option[]
  ingredients: Option[]
  sauces: Option[]
}

interface PriceCalculatorProps {
  basePrice: number
  customizations: CustomizationState
  totalPrice: number
  options: CustomizationOptions
}

export function PriceCalculator({ 
  basePrice, 
  customizations, 
  totalPrice, 
  options 
}: PriceCalculatorProps) {
  
  // Calculate individual price components
  const sizePrice = options.sizes.find(s => s.id === customizations.size)?.price || 0
  const breadPrice = options.breads.find(b => b.id === customizations.bread)?.price || 0
  
  const ingredientsPrice = customizations.ingredients.reduce((total, ingredientId) => {
    const ingredient = options.ingredients.find(i => i.id === ingredientId)
    return total + (ingredient?.price || 0)
  }, 0)
  
  const saucesPrice = customizations.sauces.reduce((total, sauceId) => {
    const sauce = options.sauces.find(s => s.id === sauceId)
    return total + (sauce?.price || 0)
  }, 0)

  const extrasTotal = sizePrice + breadPrice + ingredientsPrice + saucesPrice

  return (
    <div className="space-y-3">
      <h4 className="text-sm font-medium text-gray-900 border-b border-gray-200 pb-2">
        💰 Desglose de Precio
      </h4>

      {/* Base Price */}
      <div className="flex justify-between text-sm">
        <span className="text-gray-600">Precio base</span>
        <span className="font-medium text-gray-900">
          ${basePrice.toFixed(2)}
        </span>
      </div>

      {/* Size Extra */}
      {sizePrice > 0 && (
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">
            Tamaño ({customizations.size})
          </span>
          <span className="font-medium text-gray-900">
            +${sizePrice.toFixed(2)}
          </span>
        </div>
      )}

      {/* Bread Extra */}
      {breadPrice > 0 && (
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">
            Pan ({customizations.bread})
          </span>
          <span className="font-medium text-gray-900">
            +${breadPrice.toFixed(2)}
          </span>
        </div>
      )}

      {/* Ingredients Extras */}
      {customizations.ingredients.length > 0 && (
        <div className="space-y-1">
          <div className="text-sm text-gray-600">Ingredientes extras:</div>
          {customizations.ingredients.map(ingredientId => {
            const ingredient = options.ingredients.find(i => i.id === ingredientId)
            if (!ingredient || ingredient.price === 0) return null
            
            return (
              <div key={ingredientId} className="flex justify-between text-sm pl-4">
                <span className="text-gray-500">• {ingredient.name}</span>
                <span className="font-medium text-gray-900">
                  +${ingredient.price.toFixed(2)}
                </span>
              </div>
            )
          })}
        </div>
      )}

      {/* Sauces Extras */}
      {customizations.sauces.some(sauceId => {
        const sauce = options.sauces.find(s => s.id === sauceId)
        return sauce && sauce.price > 0
      }) && (
        <div className="space-y-1">
          <div className="text-sm text-gray-600">Salsas premium:</div>
          {customizations.sauces.map(sauceId => {
            const sauce = options.sauces.find(s => s.id === sauceId)
            if (!sauce || sauce.price === 0) return null
            
            return (
              <div key={sauceId} className="flex justify-between text-sm pl-4">
                <span className="text-gray-500">• {sauce.name}</span>
                <span className="font-medium text-gray-900">
                  +${sauce.price.toFixed(2)}
                </span>
              </div>
            )
          })}
        </div>
      )}

      {/* Total Extras */}
      {extrasTotal > 0 && (
        <div className="flex justify-between text-sm pt-2 border-t border-gray-100">
          <span className="text-gray-600">Total extras</span>
          <span className="font-medium text-gray-900">
            +${extrasTotal.toFixed(2)}
          </span>
        </div>
      )}

      {/* Final Total */}
      <div className="flex justify-between text-lg font-bold pt-3 border-t border-gray-200">
        <span className="text-gray-900">Total</span>
        <span className="text-orange-600">
          ${totalPrice.toFixed(2)} MXN
        </span>
      </div>

      {/* Savings Indicator */}
      {extrasTotal > 0 && (
        <div className="text-center">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            ✨ Personalizaste tu hot dog con ${extrasTotal.toFixed(2)} en extras
          </span>
        </div>
      )}
    </div>
  )
}
