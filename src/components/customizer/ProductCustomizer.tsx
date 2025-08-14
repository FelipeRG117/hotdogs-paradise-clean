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

/*  // Fallback to emoji if image fails to load
                          const target = e.target as HTMLImageElement
                          target.style.display = 'none'
                          target.parentElement!.innerHTML = '<div class="w-full h-full flex items-center justify-center text-6xl">🌭</div>' */

export function ProductCustomizer({ product, isOpen, onClose }: ProductCustomizerProps) {
  const { addItem } = useCartActions()

  const [customizations, setCustomizations] = useState<CustomizationState>({
    size: 'Medium',
    bread: 'Blanco',
    ingredients: [],
    sauces: ['ketchup']
  })

  const [isAdding, setIsAdding] = useState(false)

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

  // Helper function for option selection
  const renderOptionSelector = (
    title: string,
    type: 'radio' | 'checkbox',
    options: Option[],
    selected: string | string[],
    onChange: (value: string | string[]) => void,
    required = false
  ) => {
    const handleRadioChange = (optionId: string) => {
      if (type === 'radio') {
        onChange(optionId)
      }
    }

    const handleCheckboxChange = (optionId: string) => {
      if (type === 'checkbox') {
        const currentSelected = selected as string[]
        const isSelected = currentSelected.includes(optionId)

        if (isSelected) {
          if (required && currentSelected.length === 1) return
          onChange(currentSelected.filter(id => id !== optionId))
        } else {
          onChange([...currentSelected, optionId])
        }
      }
    }

    const isOptionSelected = (optionId: string) => {
      return type === 'radio' ? selected === optionId : (selected as string[]).includes(optionId)
    }

    return (
      <div className="space-y-4">
        <h4 className="text-lg font-bold text-gray-900 flex items-center gap-2">
          <span className="text-2xl">🎨</span>
          {title}
          {required && <span className="text-red-500 ml-1">*</span>}
        </h4>
        <div className="grid grid-cols-1 gap-3">
          {options.map((option) => {
            const isSelected = isOptionSelected(option.id)

            return (
              <button
                key={option.id}
                type="button"
                onClick={() =>
                  type === 'radio'
                    ? handleRadioChange(option.id)
                    : handleCheckboxChange(option.id)
                }
                className={`group relative flex items-center justify-between p-4 rounded-2xl border-2 transition-all duration-300 transform hover:scale-105 ${isSelected
                  ? 'border-orange-500 bg-gradient-to-r from-orange-50 to-red-50 text-orange-900 shadow-lg ring-4 ring-orange-200/50'
                  : 'border-gray-200 bg-white text-gray-900 hover:border-orange-300 hover:bg-gradient-to-r hover:from-orange-50/50 hover:to-red-50/50 shadow-md hover:shadow-lg'
                  }`}
              >
                <div className="flex items-center space-x-4">
                  <div className={`flex items-center justify-center w-6 h-6 rounded-full border-2 transition-all duration-300 ${isSelected
                    ? 'border-orange-500 bg-gradient-to-br from-orange-500 to-red-500 shadow-lg'
                    : 'border-gray-300 group-hover:border-orange-400'
                    }`}>
                    {isSelected && (
                      <CheckIcon className="w-4 h-4 text-white" />
                    )}
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-2xl group-hover:scale-110 transition-transform duration-300">
                      {option.emoji}
                    </span>
                    <span className="text-sm font-semibold">{option.name}</span>
                  </div>
                </div>

                {/* <div className="flex items-center space-x-2">
                  {option.price > 0 ? (
                    <div className={`px-3 py-1 rounded-full text-sm font-bold transition-all duration-300 ${isSelected
                      ? 'bg-gradient-to-r from-orange-600 to-red-600 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-600 group-hover:bg-orange-100 group-hover:text-orange-600'
                      }`}>
                      +${option.price.toFixed(0)}
                    </div>
                  ) : (
                    <div className={`px-3 py-1 rounded-full text-xs font-medium transition-all duration-300 ${isSelected
                      ? 'bg-green-500 text-white shadow-lg'
                      : 'bg-green-100 text-green-600 group-hover:bg-green-200'
                      }`}>
                      ¡Gratis!
                    </div>
                  )}
                </div> */}

                {isSelected && (
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-red-500/10 rounded-2xl animate-pulse"></div>
                )}
              </button>
            )
          })}
        </div>
      </div>
    )
  }

  if (!product) return null

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-3xl bg-white shadow-2xl transition-all sm:my-8 sm:w-full sm:max-w-6xl">
                {/* Header */}
                <div className="bg-gradient-to-r from-orange-600 to-red-500 px-6 py-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                        <span className="text-2xl">🎨</span>
                      </div>
                      <div className="text-left">
                        <Dialog.Title as="h3" className="text-2xl font-bold text-white">
                          Personaliza tu {product.name}
                        </Dialog.Title>
                        <p className="text-orange-100">
                          Crea tu hot dog perfecto con nuestras opciones premium
                        </p>
                      </div>
                    </div>

                    <button
                      type="button"
                      className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all duration-300 hover:scale-110"
                      onClick={onClose}
                    >
                      <XMarkIcon className="h-6 w-6" />
                    </button>
                  </div>
                </div>

                {/* Content */}
                <div className="flex flex-col lg:flex-row">
                  {/* Product Preview - Left Side */}
                  <div className="lg:w-2/5 p-6 bg-gradient-to-br from-orange-50 to-red-50">
                    {/* Product Image */}
                    <div className="relative w-full h-80 bg-white rounded-2xl overflow-hidden shadow-xl mb-6 group">
                      <Image
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        width={400}
                        height={320}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        onError={(e) => {

                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>

                    {/* Customization Preview */}
                    <div className="bg-white rounded-2xl p-6 shadow-xl border-2 border-orange-200">
                      <h4 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <span className="text-2xl">✨</span>
                        Tu Personalización
                      </h4>

                      <div className="space-y-3">
                        <div className="flex justify-between items-center p-3 bg-gradient-to-r from-orange-50 to-red-50 rounded-xl">
                          <span className="text-orange-800 font-medium">Tamaño:</span>
                          <span className="font-bold text-orange-600">{customizations.size}</span>
                        </div>

                        <div className="flex justify-between items-center p-3 bg-gradient-to-r from-orange-50 to-red-50 rounded-xl">
                          <span className="text-orange-800 font-medium">Pan:</span>
                          <span className="font-bold text-orange-600">{customizations.bread}</span>
                        </div>

                        {customizations.ingredients.length > 0 && (
                          <div className="p-3 bg-gradient-to-r from-orange-50 to-red-50 rounded-xl">
                            <span className="text-orange-800 font-medium block mb-2">Extras:</span>
                            <div className="flex flex-wrap gap-2">
                              {customizations.ingredients.map((ing) => (
                                <span
                                  key={ing}
                                  className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg"
                                >
                                  {ing}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}

                        {customizations.sauces.length > 0 && (
                          <div className="p-3 bg-gradient-to-r from-orange-50 to-red-50 rounded-xl">
                            <span className="text-orange-800 font-medium block mb-2">Salsas:</span>
                            <div className="flex flex-wrap gap-2">
                              {customizations.sauces.map((sauce) => (
                                <span
                                  key={sauce}
                                  className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg"
                                >
                                  {sauce}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="mt-6 pt-6 border-t-2 border-orange-200">
                        {/*  <div className="text-center">
                          {/* <div className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-red-500 bg-clip-text text-transparent">
                            ${totalPrice.toFixed(0)} MXN
                          </div> 
                          <div className="text-sm text-gray-600">Precio total</div>
                        </div> */}
                      </div>
                    </div>
                  </div>

                  {/* Customization Options - Right Side */}
                  <div className="lg:w-3/5 p-6 max-h-[80vh] overflow-y-auto">
                    <div className="space-y-8">
                      {/* Size Selection */}
                      {renderOptionSelector(
                        "Tamaño",
                        "radio",
                        CUSTOMIZATION_OPTIONS.sizes,
                        customizations.size,
                        (value) => updateCustomization('size', value as string)
                      )}

                      {/* Bread Selection */}
                      {renderOptionSelector(
                        "Tipo de Pan",
                        "radio",
                        CUSTOMIZATION_OPTIONS.breads,
                        customizations.bread,
                        (value) => updateCustomization('bread', value as string)
                      )}

                      {/* Ingredients Selection */}
                      {renderOptionSelector(
                        "Ingredientes Adicionales",
                        "checkbox",
                        CUSTOMIZATION_OPTIONS.ingredients,
                        customizations.ingredients,
                        (value) => updateCustomization('ingredients', value as string[])
                      )}

                      {/* Sauces Selection */}
                      {renderOptionSelector(
                        "Salsas",
                        "checkbox",
                        CUSTOMIZATION_OPTIONS.sauces,
                        customizations.sauces,
                        (value) => updateCustomization('sauces', value as string[]),
                        true
                      )}
                    </div>
                  </div>
                </div>

                {/* Footer */}
                <div className="bg-gradient-to-r from-gray-50 to-orange-50 px-6 py-4 border-t-2 border-orange-200">
                  <Button
                    variant="primary"
                    vertical="restaurant"
                    onClick={handleAddToCart}
                    disabled={isAdding}
                    className="w-full bg-gradient-to-r from-orange-600 to-red-500 hover:from-orange-700 hover:to-red-600 text-white font-bold text-xl py-4 rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    {isAdding ? (
                      <div className="flex items-center justify-center gap-3">
                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                        <span>Agregando...</span>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center gap-3">
                        <span className="text-2xl">🛒</span>
                        <span>Agregar al Carrito {/* - ${totalPrice.toFixed(0)} */}</span>
                      </div>
                    )}
                  </Button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}