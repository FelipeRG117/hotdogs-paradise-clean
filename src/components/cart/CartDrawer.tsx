'use client'

import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { useCartItems, useCartTotal, useCartActions } from '@/lib/stores/cartStore'
import { Button } from '@/components/ui/Button'
import { CartItem } from './CartItem'
import { CartSummary } from './CartSummary'
import { WhatsAppCheckoutOptimized } from '@/components/checkout/WhatsAppCheckoutOptimized'

interface CartDrawerProps {
    isOpen: boolean
    onClose: () => void
}

export function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
    const items = useCartItems()
    const total = useCartTotal()
    const { clearCart } = useCartActions()

    const [isWhatsAppCheckoutOpen, setIsWhatsAppCheckoutOpen] = useState(false)

    const handleClearCart = () => {
        clearCart()
    }

    const handleCheckout = () => {
        setIsWhatsAppCheckoutOpen(true)
        onClose()
    }

    const closeWhatsAppCheckout = () => {
        setIsWhatsAppCheckoutOpen(false)
    }

    return (
        <>
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
                            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                                <Transition.Child
                                    as={Fragment}
                                    enter="transform transition ease-in-out duration-500 sm:duration-700"
                                    enterFrom="translate-x-full"
                                    enterTo="translate-x-0"
                                    leave="transform transition ease-in-out duration-500 sm:duration-700"
                                    leaveFrom="translate-x-0"
                                    leaveTo="translate-x-full"
                                >
                                    <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                                        <div className="flex h-full flex-col bg-white shadow-2xl rounded-l-3xl overflow-hidden border-l-4 border-orange-500">
                                            {/* Premium Header with Gradient */}
                                            <div className="bg-gradient-to-r from-orange-600 to-red-500 px-6 py-6 relative overflow-hidden">
                                                {/* Background Pattern */}
                                                <div className="absolute top-2 right-8 text-3xl opacity-20">🛒</div>
                                                <div className="absolute bottom-2 left-8 text-2xl opacity-15">🌭</div>

                                                <div className="relative flex items-center justify-between">
                                                    <div>
                                                        <Dialog.Title className="text-xl font-bold text-white flex items-center gap-3">
                                                            <span className="bg-white/20 p-2 rounded-xl">🛒</span>
                                                            Tu Carrito
                                                        </Dialog.Title>
                                                        {items.length > 0 && (
                                                            <p className="text-orange-100 text-sm mt-1">
                                                                {items.length} {items.length === 1 ? 'producto' : 'productos'}
                                                            </p>
                                                        )}
                                                    </div>
                                                    <button
                                                        type="button"
                                                        className="bg-white/10 hover:bg-white/20 p-2 rounded-xl text-white hover:scale-105 transition-all duration-300"
                                                        onClick={onClose}
                                                    >
                                                        <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                                                    </button>
                                                </div>
                                            </div>

                                            {/* Cart Content with Custom Scrollbar */}
                                            <div className="flex-1 overflow-y-auto px-6 py-6 bg-gradient-to-b from-orange-50/30 to-white">
                                                {items.length === 0 ? (
                                                    // Premium Empty Cart State
                                                    <div className="text-center py-16">
                                                        <div className="bg-gradient-to-br from-orange-100 to-red-100 w-24 h-24 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                                                            <span className="text-4xl">🍽️</span>
                                                        </div>
                                                        <h3 className="text-xl font-bold text-gray-900 mb-3">
                                                            Tu carrito está vacío
                                                        </h3>
                                                        <p className="text-gray-600 mb-8 max-w-xs mx-auto leading-relaxed">
                                                            Agrega algunos deliciosos hot dogs para empezar tu experiencia gastronómica
                                                        </p>
                                                        <Button
                                                            variant="primary"
                                                            vertical="restaurant"
                                                            onClick={onClose}
                                                            className="bg-gradient-to-r from-orange-600 to-red-500 hover:from-orange-700 hover:to-red-600 text-white font-bold py-3 px-8 rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 w-full"
                                                        >
                                                            🚀 Explorar Productos
                                                        </Button>
                                                    </div>
                                                ) : (
                                                    // Cart Items with Premium Spacing
                                                    <div className="space-y-6">
                                                        {/* Items List */}
                                                        <div className="space-y-4">
                                                            {items.map((item) => (
                                                                <div key={item.id} className="transform hover:scale-[1.02] transition-all duration-300">
                                                                    <CartItem item={item} />
                                                                </div>
                                                            ))}
                                                        </div>

                                                        {/* Premium Clear Cart Button */}
                                                        <div className="border-t-2 border-gradient-to-r from-orange-200 to-red-200 pt-6">
                                                            <button
                                                                onClick={handleClearCart}
                                                                className="group flex items-center gap-2 text-sm text-red-600 hover:text-red-700 font-medium px-4 py-2 rounded-xl hover:bg-red-50 transition-all duration-300 hover:scale-105"
                                                            >
                                                                <span className="group-hover:rotate-12 transition-transform duration-300">🗑️</span>
                                                                Vaciar carrito
                                                            </button>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>

                                            {/* Premium Footer with Enhanced Summary */}
                                            {items.length > 0 && (
                                                <div className="border-t-2 border-orange-200 bg-gradient-to-b from-white to-orange-50/50 px-6 py-6">
                                                    <CartSummary />

                                                    <div className="mt-6 space-y-3">
                                                        <Button
                                                            variant="primary"
                                                            vertical="restaurant"
                                                            onClick={handleCheckout}
                                                            className="w-full bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white font-bold py-4 px-6 rounded-2xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 text-lg flex items-center justify-center gap-3"
                                                        >
                                                            <span className="text-2xl">📱</span>
                                                            Ordenar por WhatsApp
                                                        </Button>

                                                        <Button
                                                            variant="secondary"
                                                            vertical="restaurant"
                                                            onClick={onClose}
                                                            className="w-full bg-gradient-to-r from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 text-gray-700 font-semibold py-3 px-6 rounded-2xl border-2 border-gray-300 hover:border-gray-400 transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
                                                        >
                                                            <span>🛍️</span>
                                                            Seguir comprando
                                                        </Button>
                                                    </div>

                                                    {/* Premium Trust Indicators */}
                                                    <div className="mt-4 flex items-center justify-center gap-4 text-xs text-gray-500">
                                                        <div className="flex items-center gap-1">
                                                            <span>🔒</span>
                                                            Pago seguro
                                                        </div>
                                                        <div className="flex items-center gap-1">
                                                            <span>🚚</span>
                                                            Entrega rápida
                                                        </div>
                                                        <div className="flex items-center gap-1">
                                                            <span>⭐</span>
                                                            Garantía
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </Dialog.Panel>
                                </Transition.Child>
                            </div>
                        </div>
                    </div>
                </Dialog>
            </Transition.Root>

            {/* Premium WhatsApp Checkout Modal */}
            {isWhatsAppCheckoutOpen && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden border-4 border-orange-200">
                        <div className="bg-gradient-to-r from-orange-600 to-red-500 p-6 flex justify-between items-center">
                            <h2 className="text-xl font-bold text-white flex items-center gap-3">
                                <span className="bg-white/20 p-2 rounded-xl">📱</span>
                                Checkout WhatsApp
                            </h2>
                            <button
                                onClick={closeWhatsAppCheckout}
                                className="bg-white/10 hover:bg-white/20 p-2 rounded-xl text-white hover:scale-105 transition-all duration-300"
                            >
                                <XMarkIcon className="h-6 w-6" />
                            </button>
                        </div>
                        <div className="max-h-[calc(90vh-120px)] overflow-y-auto">
                            <WhatsAppCheckoutOptimized onClose={closeWhatsAppCheckout} />
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}