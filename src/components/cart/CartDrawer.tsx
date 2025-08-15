'use client'

import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { useCartItems, useCartTotal, useCartActions } from '@/lib/stores/cartStore'
import { Button } from '@/components/ui/Button'
import { CartItem } from './CartItem'
import { CartSummary } from './CartSummary'
import { WhatsAppCheckoutOptimized } from '@/components/checkout/WhatsAppCheckoutOptimized'
import { useRouter } from 'next/navigation'

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
                                        <div className="h-screen w-screen lg:w-[25vw] flex flex-col items-center bg-white shadow-2xl border-l-2 border-orange-500">

                                            {/* Cart Content with Custom Scrollbar */}
                                            <div className="bg-gradient-to-r from-orange-600 to-red-500 w-full flex items-center justify-between px-4 py-2 text-white ">
                                                <div className=" w-full flex items-center justify-between gap-4">
                                                    <div>
                                                        <span>
                                                            Tu Carrito 🛒
                                                        </span>
                                                    </div>
                                                    <span>
                                                        <XMarkIcon onClick={onClose} className="h-6 w-6 cursor-pointer hover:scale-105 transition-all duration-300" />
                                                    </span>
                                                </div>
                                                <div></div>
                                                <div></div>
                                            </div>
                                            <div className="flex flex-col h-full w-full">
                                                {items.length === 0 ? (
                                                    <div className="flex-1 flex items-center justify-center py-12 px-12">
                                                        <EmptyCartCard onClose={onClose} />
                                                    </div>
                                                ) : (
                                                    // Cart Items with Premium Spacing
                                                    <div className="flex flex-col h-full">
                                                        <div className="flex-1 overflow-y-auto px-12 py-6">
                                                            <CartDetailsCard items={items} handleClearCart={handleClearCart} />
                                                        </div>
                                                        <div className="flex-shrink-0 px-12 lg:px-16  border-t-4 border-orange-200 pb-12 pt-16 bg-orange-100">
                                                            <CartFooter handleCheckout={handleCheckout} handleClearCart={handleClearCart} onClose={onClose} />
                                                        </div>
                                                    </div>
                                                )}
                                            </div>

                                            {/* Premium Footer with Enhanced Summary */}

                                        </div>
                                    </Dialog.Panel>
                                </Transition.Child>
                            </div>
                        </div>
                    </div>
                </Dialog>
            </Transition.Root>

            {/* Premium WhatsApp Checkout Modal - Fullscreen with Slide Animation */}
            {isWhatsAppCheckoutOpen && (
                <Transition.Root show={isWhatsAppCheckoutOpen} as={Fragment}>
                    <Dialog as="div" className="relative z-50" onClose={closeWhatsAppCheckout}>
                        <Transition.Child
                            as={Fragment}
                            enter="ease-in-out duration-500"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in-out duration-500"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity" />
                        </Transition.Child>

                        <div className="fixed inset-0 overflow-hidden">
                            <div className="absolute inset-0 overflow-hidden">
                                <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-0">
                                    <Transition.Child
                                        as={Fragment}
                                        enter="transform transition ease-in-out duration-1000 sm:duration-1200"
                                        enterFrom="translate-x-full"
                                        enterTo="translate-x-0"
                                        leave="transform transition ease-in-out duration-1000 sm:duration-1200"
                                        leaveFrom="translate-x-0"
                                        leaveTo="translate-x-full"
                                    >
                                        <Dialog.Panel className="pointer-events-auto w-full md:w-auto">
                                            <div className="h-screen w-screen flex flex-col bg-white shadow-2xl border-l-2 border-orange-500">
                                                {/* Header */}
                                                <div className="bg-gradient-to-r from-orange-600 to-red-500 px-4 md:px-6 lg:px-8 py-3 md:py-4 flex justify-between items-center flex-shrink-0">
                                                    <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-3">
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

                                                {/* Content with Scroll and Responsive Padding */}
                                                <div className="flex-1 overflow-y-auto px-4 md:px-6 lg:px-8 py-4 md:py-6">
                                                    <WhatsAppCheckoutOptimized onClose={closeWhatsAppCheckout} />
                                                </div>
                                            </div>
                                        </Dialog.Panel>
                                    </Transition.Child>
                                </div>
                            </div>
                        </div>
                    </Dialog>
                </Transition.Root>
            )}
        </>
    )
}


function EmptyCartCard({ onClose }: { onClose: () => void }) {
    const router = useRouter()

    const handleExploreProducts = () => {
        onClose()
        router.push('/productos')
    }
    return (
        <div className="w-full flex flex-col items-center justify-center space-y-6 py-12 max-w-sm">
            <div className="flex flex-col items-center justify-center">
                <div className="bg-gradient-to-br from-orange-100 to-red-100 w-24 h-24 rounded-4xl flex items-center justify-center mx-auto mb-2 shadow-lg">
                    <span className="text-6xl">🍽️</span>

                </div>
                <div>
                    <span className="text-2xl font-bold text-gray-900 mb-3">Tu carrito está vacío</span>
                </div>


            </div>


            <div>
                <p className=" text-center text-gray-600 mb-8 max-w-xs mx-auto leading-relaxed text-lg">
                    Agrega algunos deliciosos hot dogs para empezar tu experiencia gastronómica
                </p>
                <Button
                    variant="primary"
                    vertical="restaurant"
                    onClick={handleExploreProducts}
                    className="bg-gradient-to-r from-orange-600 to-red-500 hover:from-orange-700 hover:to-red-600 text-white font-bold py-3 px-8 rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 w-full"
                >
                    🚀 Explorar Productos
                </Button>
            </div>
        </div>
    )
}



//------------------------------------

function CartDetailsCard({ items, handleClearCart }: { items: any[], handleClearCart: () => void }) {
    return (
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

            {/* Cart Summary */}


        </div>
    )
}



function CartFooter({ handleCheckout, handleClearCart, onClose }: { handleCheckout: () => void, handleClearCart: () => void, onClose: () => void }) {
    return (
        <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-4">
                <CartSummary />

            </div>
            <div className="flex flex-col gap-4">
                <Button
                    variant="primary"
                    vertical="restaurant"
                    onClick={handleCheckout}
                    className="w-full bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white font-bold py-2 px-6 rounded-2xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 text-lg flex items-center justify-center gap-3"
                >
                    <span className="text-2xl">📱</span>
                    Ordenar por WhatsApp
                </Button>

                <div className="flex items-center justify-center gap-4 text-xs text-gray-500">
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
            {/* Premium Trust Indicators */}
            <div className="flex flex-row gap-4 border-y-2 border-gradient-to-r from-orange-200 to-red-200 ">
                <button
                    onClick={handleClearCart}
                    className="group flex items-center gap-2 text-sm text-red-600 hover:text-red-700 font-medium px-4 py-2 rounded-xl hover:bg-red-50 transition-all duration-300 hover:scale-105"
                >
                    <span className="group-hover:rotate-12 transition-transform duration-300">🗑️</span>
                    Vaciar carrito
                </button>
                <button
                    onClick={onClose}
                    className="group flex items-center gap-2 text-sm text-red-600 hover:text-red-700 font-medium px-4 py-2 rounded-xl hover:bg-red-50 transition-all duration-300 hover:scale-105"
                >
                    <span className="group-hover:rotate-12 transition-transform duration-300">🛍️</span>
                    Seguir comprando
                </button>
            </div>
        </div>
    )
}