'use client'

import Image from 'next/image'
import { TrashIcon, MinusIcon, PlusIcon } from '@heroicons/react/24/outline'
import { CartItem as CartItemType, useCartActions } from '@/lib/stores/cartStore'

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
    <div className="group bg-white rounded-2xl p-4 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1 border-2 border-gray-100 hover:border-orange-200">
      <div className="flex items-start space-x-4">
        {/* Product Image */}
        <div className="relative flex-shrink-0 w-20 h-20 bg-gradient-to-br from-orange-100 to-red-100 rounded-2xl overflow-hidden shadow-lg group-hover:shadow-xl transition-all duration-300">
          <Image
            src={item.product.image || "/placeholder.svg"}
            alt={item.product.name}
            width={80}
            height={80}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            onError={(e) => {

            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Quantity Badge */}
          <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-lg ring-2 ring-white">
            {item.quantity}
          </div>
        </div>

        {/* Product Details */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-2">
            <h4 className="text-lg font-bold text-gray-900 group-hover:text-orange-600 transition-colors duration-300 truncate">
              {item.product.name}
            </h4>

            {/* Remove Button */}
            <button
              onClick={handleRemove}
              className="w-8 h-8 bg-red-100 hover:bg-red-200 text-red-600 hover:text-red-700 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-md hover:shadow-lg"
              title="Eliminar producto"
            >
              <TrashIcon className="h-4 w-4" />
            </button>
          </div>

          {/* Customizations */}
          {item.customizations && Object.keys(item.customizations).length > 0 && (
            <div className="mb-3">
              <p className="text-xs font-semibold text-orange-800 mb-2 flex items-center gap-1">
                <span className="text-sm">🎨</span>
                Personalizado:
              </p>
              <div className="flex flex-wrap gap-2">
                {Object.entries(item.customizations).map(([key, value]) => (
                  <span
                    key={key}
                    className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                  >
                    {key}: {String(value)}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Price and Quantity Controls */}
          <div className="flex items-center justify-between">
            {/* Price */}
            <div className="text-xl font-bold bg-gradient-to-r from-orange-600 to-red-500 bg-clip-text text-transparent">
              ${item.totalPrice.toFixed(0)}
            </div>

            {/* Quantity Controls */}
            <div className="flex items-center space-x-3 bg-gradient-to-r from-orange-50 to-red-50 rounded-2xl p-2 shadow-md">
              <button
                onClick={() => handleQuantityChange(item.quantity - 1)}
                className="w-8 h-8 bg-white hover:bg-orange-100 text-orange-600 hover:text-orange-700 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                disabled={item.quantity <= 1}
              >
                <MinusIcon className="h-4 w-4" />
              </button>

              <span className="text-lg font-bold text-gray-900 min-w-[24px] text-center">
                {item.quantity}
              </span>

              <button
                onClick={() => handleQuantityChange(item.quantity + 1)}
                className="w-8 h-8 bg-white hover:bg-orange-100 text-orange-600 hover:text-orange-700 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-md hover:shadow-lg"
              >
                <PlusIcon className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Item Subtotal */}
          <div className="mt-3 pt-3 border-t border-gray-100">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Subtotal ({item.quantity} items):</span>
              <span className="font-bold text-gray-900">
                ${(item.totalPrice * item.quantity).toFixed(0)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Hover Effect Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-orange-500/5 to-red-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
    </div>
  )
}


/*  // Fallback to emoji if image fails to load
              const target = e.target as HTMLImageElement
              target.style.display = 'none'
              target.parentElement!.innerHTML = '<div class="w-full h-full flex items-center justify-center text-2xl">🌭</div>' */