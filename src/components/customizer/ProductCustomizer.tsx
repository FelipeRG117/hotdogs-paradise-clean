'use client'

import { Fragment, useState, useMemo } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon, CheckIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'
import { Product } from '@/types/product'
import { Button } from '@/components/ui/Button'
import { useCartActions } from '@/lib/stores/cartStore'

interface ProductCustomizerProps {
  product: Product | null
  isOpen: boolean
  onClose: () => void
}

export interface CustomizationState {
  size: 'Small' | 'Medium' | 'Large'
  bread: 'Blanco' | 'Integral' | 'Pretzel'
  ingredients: string[]
  sauces: string[]
}

interface Option {
  id: string
  name: string
  price: number
  emoji?: string
}

const CUSTOMIZATION_OPTIONS = {
  sizes: [
    { id: 'Small', name: 'Pequeño', price: 0, emoji: '🌭' },
    { id: 'Medium', name: 'Mediano', price: 15, emoji: '🌭🌭' },
    { id: 'Large', name: 'Grande', price: 30, emoji: '🌭🌭🌭' }
  ],
  breads: [
    { id: 'Blanco', name: 'Pan Blanco', price: 0, emoji: '🍞' },
    { id: 'Integral', name: 'Pan Integral', price: 5, emoji: '🥖' },
    { id: 'Pretzel', name: 'Pan Pretzel', price: 10, emoji: '🥨' }
  ],
  ingredients: [
    { id: 'queso', name: 'Queso Cheddar', price: 12, emoji: '🧀' },
    { id: 'tocino', name: 'Tocino Crujiente', price: 18, emoji: '🥓' },
    { id: 'cebolla', name: 'Cebolla Caramelizada', price: 8, emoji: '🧅' },
    { id: 'jalapeños', name: 'Jalapeños', price: 6, emoji: '🌶️' },
    { id: 'aguacate', name: 'Aguacate', price: 15, emoji: '🥑' },
    { id: 'champiñones', name: 'Champiñones', price: 10, emoji: '🍄' }
  ],
  sauces: [
    { id: 'ketchup', name: 'Ketchup', price: 0, emoji: '🍅' },
    { id: 'mostaza', name: 'Mostaza', price: 0, emoji: '🟡' },
    { id: 'mayo', name: 'Mayonesa', price: 0, emoji: '⚪' },
    { id: 'bbq', name: 'Salsa BBQ', price: 5, emoji: '🔥' },
    { id: 'chipotle', name: 'Chipotle', price: 8, emoji: '🌶️' },
    { id: 'sriracha', name: 'Sriracha', price: 6, emoji: '🔴' }
  ]
}

export function ProductCustomizer({ product, isOpen, onClose }: ProductCustomizerProps) {
  const { addItem } = useCartActions()

  const [customizations, setCustomizations] = useState<CustomizationState>({
    size: 'Medium',
    bread: 'Blanco',
    ingredients: [],
    sauces: ['ketchup']
  })

  const [isAdding, setIsAdding] = useState(false)
  const [showCustomizationDetails, setShowCustomizationDetails] = useState(false)

  // Calculate total price including customizations
  const totalPrice = useMemo(() => {
    if (!product) return 0
    let price = product.basePrice
    // Add size price
    const sizeOption = CUSTOMIZATION_OPTIONS.sizes.find(s => s.id === customizations.size)
    if (sizeOption) price += sizeOption.price

    // Add bread price
    const breadOption = CUSTOMIZATION_OPTIONS.breads.find(b => b.id === customizations.bread)
    if (breadOption) price += breadOption.price

    // Add ingredients price
    customizations.ingredients.forEach(ingredientId => {
      const ingredient = CUSTOMIZATION_OPTIONS.ingredients.find(i => i.id === ingredientId)
      if (ingredient) price += ingredient.price
    })
    // Add sauces price
    customizations.sauces.forEach(sauceId => {
      const sauce = CUSTOMIZATION_OPTIONS.sauces.find(s => s.id === sauceId)
      if (sauce) price += sauce.price
    })

    return price
  }, [product, customizations])

  const handleAddToCart = async () => {
    if (!product) return
    setIsAdding(true)
    try {
      // Add customized product to cart
      addItem(product, customizations)
      // Success feedback
      setTimeout(() => {
        setIsAdding(false)
        onClose()
        // Reset customizations for next use
        setCustomizations({
          size: 'Medium',
          bread: 'Blanco',
          ingredients: [],
          sauces: ['ketchup']
        })
      }, 500)
    } catch (error) {
      console.error('Error adding to cart:', error)
      setIsAdding(false)
    }
  }

  const updateCustomization = (key: keyof CustomizationState, value: string | string[]) => {
    setCustomizations(prev => ({
      ...prev,
      [key]: value
    }))
  }

  if (!product) return null

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex w-full lg:w-1/2 pl-0">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto w-full h-full">
                  <div className="h-full w-full flex flex-col bg-white shadow-2xl border-l-2 border-orange-500">
                    {/* Header del Drawer - FIJO */}
                    <div className="bg-gradient-to-r from-orange-600 to-red-500 w-full flex items-center justify-between px-4 py-3 text-white flex-shrink-0">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">🎨</span>
                        <div>
                          <h3 className="font-bold text-lg">
                            Personaliza tu {product.name}
                          </h3>
                          <p className="text-orange-100 text-sm">
                            Crea tu hot dog perfecto
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={onClose}
                        className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-all hover:scale-105"
                      >
                        <XMarkIcon className="h-5 w-5" />
                      </button>
                    </div>

                    {/* Contenido SCROLLEABLE */}
                    <div className="flex-1 overflow-y-auto overflow-x-hidden touch-pan-y">
                      <div className="px-3 py-4 lg:px-4 lg:py-4">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
                          
                          {/* Columna 1: Opciones de Personalización */}
                          <div className="order-2 lg:order-1">
                            <div className="bg-white rounded-2xl p-4 border-2 border-orange-200 shadow-lg">
                              <div className="space-y-6">
                                
                                {/* Tamaño de pan */}
                                <div className="space-y-3">
                                  <h5 className="text-base font-semibold text-gray-800 flex items-center gap-2">
                                    <span className="text-lg">🌭</span>
                                    Tamaño de pan
                                  </h5>
                                  <div className="space-y-2">
                                    {CUSTOMIZATION_OPTIONS.sizes.map((option) => {
                                      const isSelected = customizations.size === option.id
                                      return (
                                        <button
                                          key={option.id}
                                          type="button"
                                          onClick={() => updateCustomization('size', option.id)}
                                          className={`w-full group relative flex items-center justify-between p-3 rounded-xl border-2 transition-all duration-300 ${isSelected
                                            ? 'border-orange-500 bg-gradient-to-r from-orange-50 to-red-50 text-orange-900 shadow-lg ring-2 ring-orange-200/50'
                                            : 'border-gray-200 bg-white text-gray-900 hover:border-orange-300 hover:bg-gradient-to-r hover:from-orange-50/50 hover:to-red-50/50 shadow-md hover:shadow-lg'
                                            }`}
                                        >
                                          <div className="flex items-center space-x-3">
                                            <div className={`flex items-center justify-center w-5 h-5 rounded-full border-2 transition-all duration-300 ${isSelected
                                              ? 'border-orange-500 bg-gradient-to-br from-orange-500 to-red-500 shadow-lg'
                                              : 'border-gray-300 group-hover:border-orange-400'
                                              }`}>
                                              {isSelected && (
                                                <CheckIcon className="w-3 h-3 text-white" />
                                              )}
                                            </div>
                                            <div className="flex items-center gap-2">
                                              <span className="text-lg">
                                                {option.emoji}
                                              </span>
                                              <span className="text-sm font-semibold">{option.name}</span>
                                            </div>
                                          </div>
                                         
                                        </button>
                                      )
                                    })}
                                  </div>
                                </div>

                                {/* Tipo de Pan */}
                                <div className="space-y-3">
                                  <h5 className="text-base font-semibold text-gray-800 flex items-center gap-2">
                                    <span className="text-lg">🍞</span>
                                    Tipo de Pan
                                  </h5>
                                  <div className="space-y-2">
                                    {CUSTOMIZATION_OPTIONS.breads.map((option) => {
                                      const isSelected = customizations.bread === option.id
                                      return (
                                        <button
                                          key={option.id}
                                          type="button"
                                          onClick={() => updateCustomization('bread', option.id)}
                                          className={`w-full group relative flex items-center justify-between p-3 rounded-xl border-2 transition-all duration-300 ${isSelected
                                            ? 'border-orange-500 bg-gradient-to-r from-orange-50 to-red-50 text-orange-900 shadow-lg ring-2 ring-orange-200/50'
                                            : 'border-gray-200 bg-white text-gray-900 hover:border-orange-300 hover:bg-gradient-to-r hover:from-orange-50/50 hover:to-red-50/50 shadow-md hover:shadow-lg'
                                            }`}
                                        >
                                          <div className="flex items-center space-x-3">
                                            <div className={`flex items-center justify-center w-5 h-5 rounded-full border-2 transition-all duration-300 ${isSelected
                                              ? 'border-orange-500 bg-gradient-to-br from-orange-500 to-red-500 shadow-lg'
                                              : 'border-gray-300 group-hover:border-orange-400'
                                              }`}>
                                              {isSelected && (
                                                <CheckIcon className="w-3 h-3 text-white" />
                                              )}
                                            </div>
                                            <div className="flex items-center gap-2">
                                              <span className="text-lg">
                                                {option.emoji}
                                              </span>
                                              <span className="text-sm font-semibold">{option.name}</span>
                                            </div>
                                          </div>
                                         
                                        </button>
                                      )
                                    })}
                                  </div>
                                </div>

                                {/* Ingredientes Adicionales */}
                                <div className="space-y-3">
                                  <h5 className="text-base font-semibold text-gray-800 flex items-center gap-2">
                                    <span className="text-lg">🧀</span>
                                    Ingredientes Adicionales
                                  </h5>
                                  <div className="space-y-2">
                                    {CUSTOMIZATION_OPTIONS.ingredients.map((option) => {
                                      const isSelected = customizations.ingredients.includes(option.id)
                                      return (
                                        <button
                                          key={option.id}
                                          type="button"
                                          onClick={() => {
                                            const currentSelected = customizations.ingredients
                                            if (isSelected) {
                                              updateCustomization('ingredients', currentSelected.filter(id => id !== option.id))
                                            } else {
                                              updateCustomization('ingredients', [...currentSelected, option.id])
                                            }
                                          }}
                                          className={`w-full group relative flex items-center justify-between p-3 rounded-xl border-2 transition-all duration-300 ${isSelected
                                            ? 'border-orange-500 bg-gradient-to-r from-orange-50 to-red-50 text-orange-900 shadow-lg ring-2 ring-orange-200/50'
                                            : 'border-gray-200 bg-white text-gray-900 hover:border-orange-300 hover:bg-gradient-to-r hover:from-orange-50/50 hover:to-red-50/50 shadow-md hover:shadow-lg'
                                            }`}
                                        >
                                          <div className="flex items-center space-x-3">
                                            <div className={`flex items-center justify-center w-5 h-5 rounded-full border-2 transition-all duration-300 ${isSelected
                                              ? 'border-orange-500 bg-gradient-to-r from-orange-500 to-red-500 shadow-lg'
                                              : 'border-gray-300 group-hover:border-orange-400'
                                              }`}>
                                              {isSelected && (
                                                <CheckIcon className="w-3 h-3 text-white" />
                                              )}
                                            </div>
                                            <div className="flex items-center gap-2">
                                              <span className="text-lg">
                                                {option.emoji}
                                              </span>
                                              <span className="text-sm font-semibold">{option.name}</span>
                                            </div>
                                          </div>
                                        
                                        </button>
                                      )
                                    })}
                                  </div>
                                </div>

                                {/* Salsas */}
                                <div className="space-y-3">
                                  <h5 className="text-base font-semibold text-gray-800 flex items-center gap-2">
                                    <span className="text-lg">🍅</span>
                                    Salsas
                                    <span className="text-red-500 ml-1">*</span>
                                  </h5>
                                  <div className="space-y-2">
                                    {CUSTOMIZATION_OPTIONS.sauces.map((option) => {
                                      const isSelected = customizations.sauces.includes(option.id)
                                      return (
                                        <button
                                          key={option.id}
                                          type="button"
                                          onClick={() => {
                                            const currentSelected = customizations.sauces
                                            if (isSelected && currentSelected.length > 1) {
                                              updateCustomization('sauces', currentSelected.filter(id => id !== option.id))
                                            } else if (!isSelected) {
                                              updateCustomization('sauces', [...currentSelected, option.id])
                                            }
                                          }}
                                          className={`w-full group relative flex items-center justify-between p-3 rounded-xl border-2 transition-all duration-300 ${isSelected
                                            ? 'border-orange-500 bg-gradient-to-r from-orange-50 to-red-50 text-orange-900 shadow-lg ring-2 ring-orange-200/50'
                                            : 'border-gray-200 bg-white text-gray-900 hover:border-orange-300 hover:bg-gradient-to-r hover:from-orange-50/50 hover:to-red-50/50 shadow-md hover:shadow-lg'
                                            }`}
                                        >
                                          <div className="flex items-center space-x-3">
                                            <div className={`flex items-center justify-center w-5 h-5 rounded-full border-2 transition-all duration-300 ${isSelected
                                              ? 'border-orange-500 bg-gradient-to-br from-orange-500 to-red-500 shadow-lg'
                                              : 'border-gray-300 group-hover:border-orange-400'
                                              }`}>
                                              {isSelected && (
                                                <CheckIcon className="w-3 h-3 text-white" />
                                              )}
                                            </div>
                                            <div className="flex items-center gap-2">
                                              <span className="text-lg">
                                                {option.emoji}
                                              </span>
                                              <span className="text-sm font-semibold">{option.name}</span>
                                            </div>
                                          </div>
                                       
                                        </button>
                                      )
                                    })}
                                  </div>
                                </div>

                              </div>
                            </div>
                          </div>

                          {/* Columna 2: Vista Previa y Resumen */}
                          <div className="order-1 lg:order-2">
                            <div className="space-y-4 lg:sticky lg:top-0">
                              
                              {/* Vista Previa del Producto */}
                              <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-2xl p-4 border-2 border-orange-200">
                                <h4 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                                  <span className="text-xl">🎨</span>
                                  Vista Previa
                                </h4>

                                <div className="relative w-full h-32 bg-gradient-to-br from-orange-100 to-red-100 rounded-2xl overflow-hidden shadow-xl mb-4 group">
                                  <Image
                                    src={product.image || "/placeholder.svg"}
                                    alt={product.name}
                                    width={400}
                                    height={320}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                    onError={(e) => {
                                      
                                    }}
                                  />
                                </div>

                                <div className="text-center">
                                  <h5 className="font-bold text-base text-gray-900 mb-1">{product.name}</h5>
                                  <p className="text-xs text-gray-600">Personalizado a tu gusto</p>
                                </div>
                              </div>

                              {/* Resumen de Personalización */}
                              <div className="bg-white rounded-2xl p-4 border-2 border-orange-200 shadow-lg">
                                <h4 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                                  <span className="text-xl">✨</span>
                                  Tu Personalización
                                </h4>

                                <button
                                  onClick={() => setShowCustomizationDetails(!showCustomizationDetails)}
                                  className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold py-3 px-4 rounded-xl hover:from-orange-600 hover:to-red-600 transition-all duration-300 shadow-lg flex items-center justify-center gap-2"
                                >
                                  <span className="text-lg">👁️</span>
                                  {showCustomizationDetails ? 'Ocultar Detalles' : 'Ver Detalles'}
                                </button>

                                {showCustomizationDetails && (
                                  <div className="mt-4 space-y-3">
                                    <div className="flex justify-between items-center p-3 bg-orange-50 rounded-xl border border-orange-200">
                                      <span className="text-orange-800 font-medium text-sm">Tamaño:</span>
                                      <span className="font-bold text-orange-600 text-sm bg-white px-3 py-1 rounded-full shadow-sm">
                                        {customizations.size}
                                      </span>
                                    </div>

                                    <div className="flex justify-between items-center p-3 bg-orange-50 rounded-xl border border-orange-200">
                                      <span className="text-orange-800 font-medium text-sm">Pan:</span>
                                      <span className="font-bold text-orange-600 text-sm bg-white px-3 py-1 rounded-full shadow-sm">
                                        {customizations.bread}
                                      </span>
                                    </div>

                                    {customizations.ingredients.length > 0 && (
                                      <div className="p-3 bg-orange-50 rounded-xl border border-orange-200">
                                        <span className="text-orange-800 font-medium block mb-2 text-sm">Ingredientes Extras:</span>
                                        <div className="flex flex-wrap gap-2">
                                          {customizations.ingredients.map((ing) => (
                                            <span key={ing} className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-sm">
                                              {ing}
                                            </span>
                                          ))}
                                        </div>
                                      </div>
                                    )}

                                    {customizations.sauces.length > 0 && (
                                      <div className="p-3 bg-orange-50 rounded-xl border border-orange-200">
                                        <span className="text-orange-800 font-medium block mb-2 text-sm">Salsas Seleccionadas:</span>
                                        <div className="flex flex-wrap gap-2">
                                          {customizations.sauces.map((sauce) => (
                                            <span key={sauce} className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-sm">
                                              {sauce}
                                            </span>
                                          ))}
                                        </div>
                                      </div>
                                    )}
                                  </div>
                                )}
                              </div>

                            </div>
                          </div>

                        </div>
                      </div>
                    </div>

                    {/* Footer FIJO con precio y botón */}
                    <div className="bg-gradient-to-r from-orange-600 to-red-500 p-12 text-white flex-shrink-0 border-t-2 border-orange-400">
                      <div className="flex items-center justify-between mb-3">
                       
                      </div>

                      <Button
                        variant="primary"
                        vertical="restaurant"
                        onClick={handleAddToCart}
                        disabled={isAdding}
                        className="w-full bg-white text-orange-600 hover:bg-orange-50 font-bold text-base py-3 rounded-xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                      >
                        {isAdding ? (
                          <div className="flex items-center justify-center gap-2">
                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-orange-600"></div>
                            <span>Agregando...</span>
                          </div>
                        ) : (
                          <div className="flex items-center justify-center gap-2">
                            <span className="text-xl">🛒</span>
                            <span>Agregar al Carrito</span>
                          </div>
                        )}
                      </Button>
                    </div>

                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}