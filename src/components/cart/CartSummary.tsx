'use client'

import { useCartItems, useCartTotal, useCartCount } from '@/lib/stores/cartStore'

export function CartSummary() {
  const items = useCartItems()
  const total = useCartTotal()
  const itemCount = useCartCount()

  // Calculate subtotal (before taxes/fees)
  const subtotal = total

  // Calculate estimated tax (you can adjust this rate)
  const taxRate = 0.16 // 16% IVA in Mexico
  const tax = subtotal * taxRate

  // Delivery fee (could be dynamic based on location)
  const deliveryFee = subtotal > 200 ? 0 : 35 // Free delivery over $200

  // Final total
  const finalTotal = subtotal + tax + deliveryFee

  if (items.length === 0) {
    return null
  }

  return (
    <div className="space-y-3">
      {/* Items Summary */}
      <div className="flex justify-between text-sm text-gray-600">
        <span>
          {itemCount} {itemCount === 1 ? 'producto' : 'productos'}
        </span>
        <span>Subtotal</span>
      </div>

      {/* Subtotal */}
      <div className="flex justify-between text-sm">
        <span className="text-gray-600">Subtotal</span>
        <span className="font-medium text-gray-900">
          ${subtotal.toFixed(2)}
        </span>
      </div>

      {/* Tax */}
      <div className="flex justify-between text-sm">
        <span className="text-gray-600">IVA (16%)</span>
        <span className="font-medium text-gray-900">
          ${tax.toFixed(2)}
        </span>
      </div>

      {/* Delivery Fee */}
      <div className="flex justify-between text-sm">
        <span className="text-gray-600">
          Envío
          {subtotal > 200 && (
            <span className="text-green-600 ml-1 font-medium">
              ¡Gratis!
            </span>
          )}
        </span>
        <span className="font-medium text-gray-900">
          {deliveryFee > 0 ? `$${deliveryFee.toFixed(2)}` : 'Gratis'}
        </span>
      </div>

      {/* Free Delivery Promotion */}
      {subtotal < 200 && subtotal > 0 && (
        <div className="bg-orange-50 border border-orange-200 rounded-lg p-3">
          <p className="text-xs text-orange-800">
            💡 <strong>¡Envío gratis!</strong> Agrega ${(200 - subtotal).toFixed(2)} más para obtener envío gratuito
          </p>
        </div>
      )}

      {/* Divider */}
      <div className="border-t border-gray-200 pt-3">
        <div className="flex justify-between">
          <span className="text-base font-medium text-gray-900">Total</span>
          <span className="text-lg font-bold text-orange-600">
            ${finalTotal.toFixed(2)}
          </span>
        </div>
      </div>

      {/* Savings Indicator */}
      {deliveryFee === 0 && subtotal > 200 && (
        <div className="text-center">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            ✅ Ahorras $35.00 en envío
          </span>
        </div>
      )}
    </div>
  )
}
