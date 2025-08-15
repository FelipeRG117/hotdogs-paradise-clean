'use client'

import { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { Product } from '@/types/product'
import { CustomizationState } from './ProductCustomizer'

interface CustomizationPreviewProps {
  product: Product
  customizations: CustomizationState
  totalPrice: number
  isOpen: boolean
  onClose: () => void
}

export function CustomizationPreview({ 
  product, 
  customizations, 
  totalPrice,
  isOpen,
  onClose
}: CustomizationPreviewProps) {
  
  const hasCustomizations = 
    customizations.size !== 'Medium' ||
    customizations.bread !== 'Blanco' ||
    customizations.ingredients.length > 0 ||
    customizations.sauces.length > 1 ||
    !customizations.sauces.includes('ketchup')

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
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-0 md:pl-10">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto w-full md:w-auto">
                  <div className="h-screen w-screen lg:w-[30vw] flex flex-col items-center bg-white shadow-2xl border-l-2 border-orange-500">
                    
                    {/* Header */}
                    <div className="bg-gradient-to-r from-orange-600 to-red-500 w-full flex items-center justify-between px-4 py-2 text-white">
                      <div className="w-full flex items-center justify-between gap-4">
                        <div>
                          <span>
                            Vista Previa 🎨
                          </span>
                        </div>
                        <button onClick={onClose}>
                          <XMarkIcon className="h-6 w-6" />
                        </button>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex flex-col h-full w-full">
                      <div className="flex-1 overflow-y-auto px-8 py-6">
                        <div className="space-y-6">
                          {/* Product Title */}
                          <div className="text-center">
                            <h3 className="text-xl font-bold text-gray-900">
                              {product.name} Personalizado
                            </h3>
                            <p className="text-3xl font-bold text-orange-600 mt-2">
                              ${totalPrice.toFixed(2)}
                            </p>
                          </div>

                          {/* Customization Summary */}
                          {hasCustomizations ? (
                            <div className="bg-gradient-to-br from-orange-50 to-red-50 border-2 border-orange-200 rounded-2xl p-6 shadow-lg">
                              <h4 className="text-lg font-bold text-orange-900 mb-4 flex items-center gap-2">
                                <span className="text-xl">🎨</span>
                                Tu Personalización
                              </h4>
                              
                              <div className="space-y-4">
                                {/* Size */}
                                <div className="flex items-center justify-between p-3 hover:bg-orange-100 rounded-xl transition-all duration-300">
                                  <span className="text-gray-700 flex items-center gap-2">
                                    <span className="text-orange-500">📏</span>
                                    Tamaño
                                  </span>
                                  <span className="font-bold text-gray-900">
                                    {customizations.size}
                                  </span>
                                </div>

                                {/* Bread */}
                                <div className="flex items-center justify-between p-3 hover:bg-orange-100 rounded-xl transition-all duration-300">
                                  <span className="text-gray-700 flex items-center gap-2">
                                    <span className="text-orange-500">🍞</span>
                                    Pan
                                  </span>
                                  <span className="font-bold text-gray-900">
                                    {customizations.bread}
                                  </span>
                                </div>

                                {/* Ingredients */}
                                {customizations.ingredients.length > 0 && (
                                  <div className="p-3 hover:bg-orange-100 rounded-xl transition-all duration-300">
                                    <span className="text-gray-700 flex items-center gap-2 mb-2 block">
                                      <span className="text-orange-500">🥬</span>
                                      Ingredientes extras
                                    </span>
                                    <div className="flex flex-wrap gap-2">
                                      {customizations.ingredients.map(ingredient => (
                                        <span
                                          key={ingredient}
                                          className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-orange-200 text-orange-800 border border-orange-300"
                                        >
                                          {ingredient}
                                        </span>
                                      ))}
                                    </div>
                                  </div>
                                )}

                                {/* Sauces */}
                                {customizations.sauces.length > 0 && (
                                  <div className="p-3 hover:bg-orange-100 rounded-xl transition-all duration-300">
                                    <span className="text-gray-700 flex items-center gap-2 mb-2 block">
                                      <span className="text-orange-500">🍯</span>
                                      Salsas
                                    </span>
                                    <div className="flex flex-wrap gap-2">
                                      {customizations.sauces.map(sauce => (
                                        <span
                                          key={sauce}
                                          className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-orange-200 text-orange-800 border border-orange-300"
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
                            <div className="bg-gradient-to-br from-gray-50 to-gray-100 border-2 border-gray-200 rounded-2xl p-6 text-center shadow-lg">
                              <div className="text-6xl mb-4">🌭</div>
                              <h4 className="text-lg font-bold text-gray-900 mb-2">
                                Configuración Clásica
                              </h4>
                              <p className="text-sm text-gray-600">
                                Hot dog mediano con pan blanco y ketchup
                              </p>
                            </div>
                          )}

                          {/* Visual Representation */}
                          <div className="bg-white border-2 border-dashed border-orange-200 rounded-2xl p-8 shadow-lg">
                            <div className="text-center space-y-4">
                              <div className="text-6xl">
                                {customizations.size === 'Large' ? '🌭🌭' : 
                                 customizations.size === 'Small' ? '🌭' : '🌭'}
                              </div>
                              
                              <div className="flex justify-center space-x-2">
                                {customizations.ingredients.includes('queso') && <span className="text-2xl">🧀</span>}
                                {customizations.ingredients.includes('tocino') && <span className="text-2xl">🥓</span>}
                                {customizations.ingredients.includes('cebolla') && <span className="text-2xl">🧅</span>}
                                {customizations.ingredients.includes('jalapeños') && <span className="text-2xl">🌶️</span>}
                                {customizations.ingredients.includes('aguacate') && <span className="text-2xl">🥑</span>}
                                {customizations.ingredients.includes('champiñones') && <span className="text-2xl">🍄</span>}
                              </div>

                              <div className="text-sm text-gray-500">
                                Vista previa de tu hot dog personalizado
                              </div>
                            </div>
                          </div>

                          {/* Quick Stats */}
                          <div className="grid grid-cols-2 gap-4">
                            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl border-2 border-blue-200 p-4 text-center shadow-lg">
                              <div className="text-2xl font-bold text-blue-900">
                                {customizations.ingredients.length + customizations.sauces.length}
                              </div>
                              <div className="text-sm text-blue-700">Extras</div>
                            </div>
                            
                            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl border-2 border-green-200 p-4 text-center shadow-lg">
                              <div className="text-2xl font-bold text-green-900">
                                ${(totalPrice - product.basePrice).toFixed(2)}
                              </div>
                              <div className="text-sm text-green-700">Personalización</div>
                            </div>
                          </div>
                        </div>
                      </div>
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
