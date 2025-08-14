"use client"

import Image from "next/image"
import { TrashIcon, MinusIcon, PlusIcon } from "@heroicons/react/24/outline"
import type { CartItem as CartItemType } from "@/lib/stores/cartStore"
import { useCartActions } from "@/lib/stores/cartStore"

interface CartItemProps {
  item: CartItemType
}

export function CartItem({ item }: CartItemProps) {
  const { updateQuantity, removeItem } = useCartActions()

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity <= 0) {
      removeItem(item.id)
    } else {
      updateQuantity(item.id, newQuantity)
    }
  }

  const handleRemove = () => {
    removeItem(item.id)
  }

  return (
    <div className="bg-white rounded-xl sm:rounded-2xl p-3 sm:p-4 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-orange-200">
      <div className="space-y-3">
        {/* Header Row - Product info and remove button */}
        <div className="flex items-start gap-3">
          {/* Product Image - Smaller on mobile */}
          <div className="relative flex-shrink-0 w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-orange-100 to-red-100 rounded-xl overflow-hidden shadow-md">
            <Image
              src={item.product.image || "/placeholder.svg"}
              alt={item.product.name}
              width={64}
              height={64}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              onError={(e) => { }}
            />

            {/* Quantity Badge - Adjusted for mobile */}
            <div className="absolute -top-1 -right-1 w-5 h-5 sm:w-6 sm:h-6 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-lg ring-1 sm:ring-2 ring-white">
              {item.quantity}
            </div>
          </div>

          {/* Product Details */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <h4 className="text-sm sm:text-base font-bold text-gray-900 leading-tight">{item.product.name}</h4>

              {/* Remove Button - Smaller on mobile */}
              <button
                onClick={handleRemove}
                className="w-7 h-7 sm:w-8 sm:h-8 bg-red-50 hover:bg-red-100 text-red-500 hover:text-red-600 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-sm"
                title="Eliminar"
              >
                <TrashIcon className="h-3 w-3 sm:h-4 sm:w-4" />
              </button>
            </div>

            {/* Price */}
            <div className="text-lg sm:text-xl font-bold bg-gradient-to-r from-orange-600 to-red-500 bg-clip-text text-transparent mt-1">
              ${item.totalPrice.toFixed(0)}
            </div>
          </div>
        </div>

        {/* Customizations - IMPROVED FOR MOBILE */}
        {item.customizations && Object.keys(item.customizations).length > 0 && (
          <div className="bg-gradient-to-r from-orange-50/50 to-red-50/50 rounded-xl p-3 border border-orange-100">
            <p className="text-xs font-semibold text-orange-800 mb-2 flex items-center gap-1">
              <span>🎨</span>
              Personalizado:
            </p>

            {/* SOLUCION: Grid responsive para las etiquetas */}
            <div className="space-y-2">
              {Object.entries(item.customizations).map(([key, value]) => {
                // Si es un array (como ingredients o sauces), manejarlo diferente
                if (Array.isArray(value)) {
                  return (
                    <div key={key} className="space-y-1">
                      <div className="text-xs font-medium text-orange-700 capitalize">{key}:</div>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-1">
                        {value.map((item, index) => (
                          <span
                            key={index}
                            className="inline-block px-2 py-1 bg-gradient-to-r from-orange-400 to-red-400 text-white text-xs font-medium rounded-lg shadow-sm text-center truncate"
                            title={item}
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  )
                } else {
                  // Para valores simples como size, bread
                  return (
                    <div key={key} className="flex items-center justify-between">
                      <span className="text-xs font-medium text-orange-700 capitalize">{key}:</span>
                      <span className="px-2 py-1 bg-gradient-to-r from-blue-400 to-purple-400 text-white text-xs font-medium rounded-lg shadow-sm">
                        {String(value)}
                      </span>
                    </div>
                  )
                }
              })}
            </div>
          </div>
        )}

        {/* Bottom Row - Quantity controls and subtotal */}
        <div className="flex items-center justify-between pt-2 border-t border-gray-100">
          {/* Quantity Controls */}
          <div className="flex items-center gap-2 bg-gradient-to-r from-orange-50 to-red-50 rounded-xl p-1.5 shadow-sm">
            <button
              onClick={() => handleQuantityChange(item.quantity - 1)}
              className="w-7 h-7 sm:w-8 sm:h-8 bg-white hover:bg-orange-100 text-orange-600 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={item.quantity <= 1}
            >
              <MinusIcon className="h-3 w-3 sm:h-4 sm:w-4" />
            </button>

            <span className="text-sm sm:text-base font-bold text-gray-900 min-w-[20px] sm:min-w-[24px] text-center">
              {item.quantity}
            </span>

            <button
              onClick={() => handleQuantityChange(item.quantity + 1)}
              className="w-7 h-7 sm:w-8 sm:h-8 bg-white hover:bg-orange-100 text-orange-600 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-sm"
            >
              <PlusIcon className="h-3 w-3 sm:h-4 sm:w-4" />
            </button>
          </div>

          {/* Subtotal */}
          <div className="text-right">
            <div className="text-xs text-gray-500">Subtotal:</div>
            <div className="text-sm sm:text-base font-bold text-gray-900">
              ${(item.totalPrice * item.quantity).toFixed(0)}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
