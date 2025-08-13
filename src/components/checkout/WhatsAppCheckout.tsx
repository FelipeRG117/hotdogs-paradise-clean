'use client'

import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon, CheckCircleIcon } from '@heroicons/react/24/outline'
import { Button } from '@/components/ui/Button'
import { LoadingSpinner } from '@/components/ui/LoadingSpinner'
import { useCartItems, useCartTotal, useCartCount, useCartActions } from '@/lib/stores/cartStore'
import { WhatsAppService, CustomerInfo, OrderSummary, WhatsAppFormatter } from '@/lib/whatsapp/WhatsAppService'

interface WhatsAppCheckoutProps {
  isOpen: boolean
  onClose: () => void
}

export function WhatsAppCheckout({ isOpen, onClose }: WhatsAppCheckoutProps) {
  const cartItems = useCartItems()
  const { clearCart } = useCartActions()

  const [step, setStep] = useState<'info' | 'review' | 'success'>('info')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [customerInfo, setCustomerInfo] = useState<CustomerInfo>({
    name: '',
    phone: '',
    address: '',
    deliveryType: 'delivery',
    notes: ''
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  // Calculate order summary
  const orderSummary: OrderSummary = WhatsAppFormatter.calculateOrderSummary(cartItems)

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {}

    if (!customerInfo.name.trim()) {
      newErrors.name = 'El nombre es requerido'
    }

    const phoneValidation = WhatsAppService.validateMexicanPhone(customerInfo.phone)
    if (!phoneValidation.isValid) {
      newErrors.phone = phoneValidation.error || 'Teléfono inválido'
    }

    if (customerInfo.deliveryType === 'delivery' && !customerInfo.address?.trim()) {
      newErrors.address = 'La dirección es requerida para entrega'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleContinueToReview = () => {
    if (validateForm()) {
      setStep('review')
    }
  }

  const handleSendToWhatsApp = async () => {
    setIsSubmitting(true)

    try {
      // Validate order
      const validation = WhatsAppFormatter.validateOrder(cartItems, customerInfo)
      if (!validation.isValid) {
        alert(validation.error || 'Error en la validación del pedido')
        return
      }

      // Format message and generate URL
      const formattedCartItems = cartItems.map(item => ({
        id: item.id,
        product: {
          id: item.product.id,
          name: item.product.name,
          basePrice: item.product.basePrice
        },
        quantity: item.quantity,
        totalPrice: item.totalPrice,
        customizations: item.customizations
      }))

      const formData = {
        customerName: customerInfo.name,
        customerPhone: customerInfo.phone,
        orderType: customerInfo.deliveryType,
        customerAddress: customerInfo.address,
        notes: customerInfo.notes,
        country: 'mexico' as const
      }

      const totals = {
        subtotal: orderSummary.subtotal,
        tax: orderSummary.tax,
        delivery: orderSummary.deliveryFee,
        total: orderSummary.total
      }

      // Generate WhatsApp URL
      const whatsappURL = WhatsAppService.generateWhatsAppURL(formattedCartItems, formData, totals)

      // Open WhatsApp
      window.open(whatsappURL, '_blank')

      // Show success
      setStep('success')

      // Clear cart after successful order
      setTimeout(() => {
        clearCart()
      }, 2000)

    } catch (error) {
      console.error('Error sending to WhatsApp:', error)
      alert('Error al enviar pedido. Inténtalo de nuevo.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const resetAndClose = () => {
    setStep('info')
    setCustomerInfo({
      name: '',
      phone: '',
      address: '',
      deliveryType: 'delivery',
      notes: ''
    })
    setErrors({})
    onClose()
  }

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={resetAndClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity" />
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
              <Dialog.Panel className="relative transform overflow-hidden rounded-3xl bg-white shadow-2xl transition-all sm:my-8 sm:w-full sm:max-w-2xl border-4 border-orange-200">
                {/* Premium Header with Gradient */}
                <div className="bg-gradient-to-r from-orange-600 to-red-500 px-6 py-6 relative overflow-hidden">
                  {/* Background Pattern */}
                  <div className="absolute top-2 right-8 text-4xl opacity-20">📱</div>
                  <div className="absolute bottom-2 left-8 text-3xl opacity-15">🌭</div>

                  <div className="relative flex items-center justify-between">
                    <div>
                      <Dialog.Title className="text-2xl font-bold text-white flex items-center gap-3">
                        <span className="bg-white/20 p-3 rounded-2xl">📱</span>
                        Checkout WhatsApp
                      </Dialog.Title>
                      <p className="text-orange-100 text-sm mt-2">
                        Finaliza tu pedido de forma rápida y segura
                      </p>
                    </div>
                    <button
                      type="button"
                      className="bg-white/10 hover:bg-white/20 p-3 rounded-2xl text-white hover:scale-105 transition-all duration-300"
                      onClick={resetAndClose}
                    >
                      <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>
                </div>

                {/* Content */}
                <div className="px-6 py-8 bg-gradient-to-b from-orange-50/30 to-white max-h-[70vh] overflow-y-auto">
                  {/* Premium Step Indicator */}
                  <div className="flex items-center justify-center mb-8">
                    <div className="flex items-center space-x-4">
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-lg font-bold shadow-lg transition-all duration-300 ${step === 'info'
                          ? 'bg-gradient-to-r from-orange-600 to-red-500 text-white scale-110'
                          : 'bg-gradient-to-r from-orange-100 to-red-100 text-orange-600'
                        }`}>
                        1
                      </div>
                      <div className="w-12 h-1 bg-gradient-to-r from-orange-200 to-red-200 rounded-full"></div>
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-lg font-bold shadow-lg transition-all duration-300 ${step === 'review'
                          ? 'bg-gradient-to-r from-orange-600 to-red-500 text-white scale-110'
                          : step === 'success'
                            ? 'bg-gradient-to-r from-orange-100 to-red-100 text-orange-600'
                            : 'bg-gray-200 text-gray-500'
                        }`}>
                        2
                      </div>
                      <div className="w-12 h-1 bg-gradient-to-r from-orange-200 to-red-200 rounded-full"></div>
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-lg font-bold shadow-lg transition-all duration-300 ${step === 'success'
                          ? 'bg-gradient-to-r from-green-600 to-green-500 text-white scale-110'
                          : 'bg-gray-200 text-gray-500'
                        }`}>
                        ✓
                      </div>
                    </div>
                  </div>

                  {/* Step 1: Customer Information */}
                  {step === 'info' && (
                    <div>
                      <div className="text-center mb-8">
                        <h3 className="text-2xl font-bold text-gray-900 mb-3 flex items-center justify-center gap-3">
                          <span className="text-3xl">👤</span>
                          Información de Contacto
                        </h3>
                        <p className="text-gray-600">Completa tus datos para procesar el pedido</p>
                      </div>

                      <div className="space-y-6">
                        {/* Name */}
                        <div>
                          <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                            <span>📝</span>
                            Nombre completo *
                          </label>
                          <input
                            type="text"
                            value={customerInfo.name}
                            onChange={(e) => setCustomerInfo(prev => ({ ...prev, name: e.target.value }))}
                            className={`w-full px-4 py-3 border-2 rounded-2xl focus:outline-none focus:ring-4 focus:ring-orange-200 focus:border-orange-500 transition-all duration-300 ${errors.name ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-orange-300'
                              }`}
                            placeholder="Tu nombre completo"
                          />
                          {errors.name && <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                            <span>⚠️</span>{errors.name}
                          </p>}
                        </div>

                        {/* Phone */}
                        <div>
                          <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                            <span>📞</span>
                            Teléfono *
                          </label>
                          <input
                            type="tel"
                            value={customerInfo.phone}
                            onChange={(e) => setCustomerInfo(prev => ({ ...prev, phone: e.target.value }))}
                            className={`w-full px-4 py-3 border-2 rounded-2xl focus:outline-none focus:ring-4 focus:ring-orange-200 focus:border-orange-500 transition-all duration-300 ${errors.phone ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-orange-300'
                              }`}
                            placeholder="81 1234 5678"
                          />
                          {errors.phone && <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                            <span>⚠️</span>{errors.phone}
                          </p>}
                        </div>

                        {/* Delivery Type */}
                        <div>
                          <label className="block text-sm font-bold text-gray-700 mb-3 flex items-center gap-2">
                            <span>🚀</span>
                            Tipo de entrega *
                          </label>
                          <div className="grid grid-cols-2 gap-4">
                            <button
                              type="button"
                              onClick={() => setCustomerInfo(prev => ({ ...prev, deliveryType: 'delivery' }))}
                              className={`group p-6 rounded-2xl border-3 text-center transition-all duration-300 transform hover:scale-105 ${customerInfo.deliveryType === 'delivery'
                                  ? 'border-orange-500 bg-gradient-to-br from-orange-50 to-red-50 shadow-lg'
                                  : 'border-gray-200 hover:border-orange-300 hover:shadow-md'
                                }`}
                            >
                              <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">🚚</div>
                              <div className="text-lg font-bold text-gray-900 mb-1">Entrega</div>
                              <div className="text-sm text-gray-600">$35 (Gratis {'>'} $200)</div>
                            </button>
                            <button
                              type="button"
                              onClick={() => setCustomerInfo(prev => ({ ...prev, deliveryType: 'pickup' }))}
                              className={`group p-6 rounded-2xl border-3 text-center transition-all duration-300 transform hover:scale-105 ${customerInfo.deliveryType === 'pickup'
                                  ? 'border-orange-500 bg-gradient-to-br from-orange-50 to-red-50 shadow-lg'
                                  : 'border-gray-200 hover:border-orange-300 hover:shadow-md'
                                }`}
                            >
                              <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">🏪</div>
                              <div className="text-lg font-bold text-gray-900 mb-1">Recoger</div>
                              <div className="text-sm text-gray-600">Sin costo</div>
                            </button>
                          </div>
                        </div>

                        {/* Address (only for delivery) */}
                        {customerInfo.deliveryType === 'delivery' && (
                          <div className="animate-fadeIn">
                            <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                              <span>📍</span>
                              Dirección de entrega *
                            </label>
                            <textarea
                              value={customerInfo.address}
                              onChange={(e) => setCustomerInfo(prev => ({ ...prev, address: e.target.value }))}
                              className={`w-full px-4 py-3 border-2 rounded-2xl focus:outline-none focus:ring-4 focus:ring-orange-200 focus:border-orange-500 transition-all duration-300 ${errors.address ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-orange-300'
                                }`}
                              placeholder="Calle, número, colonia, referencias..."
                              rows={3}
                            />
                            {errors.address && <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                              <span>⚠️</span>{errors.address}
                            </p>}
                          </div>
                        )}

                        {/* Notes */}
                        <div>
                          <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                            <span>💭</span>
                            Notas adicionales (opcional)
                          </label>
                          <textarea
                            value={customerInfo.notes}
                            onChange={(e) => setCustomerInfo(prev => ({ ...prev, notes: e.target.value }))}
                            className="w-full px-4 py-3 border-2 border-gray-300 rounded-2xl focus:outline-none focus:ring-4 focus:ring-orange-200 focus:border-orange-500 hover:border-orange-300 transition-all duration-300"
                            placeholder="Instrucciones especiales, alergias, etc."
                            rows={2}
                          />
                        </div>
                      </div>

                      <div className="mt-8">
                        <Button
                          variant="primary"
                          vertical="restaurant"
                          onClick={handleContinueToReview}
                          className="w-full bg-gradient-to-r from-orange-600 to-red-500 hover:from-orange-700 hover:to-red-600 text-white font-bold py-4 px-6 rounded-2xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 text-lg"
                        >
                          Continuar a Revisión →
                        </Button>
                      </div>
                    </div>
                  )}

                  {/* Step 2: Order Review */}
                  {step === 'review' && (
                    <div>
                      <div className="text-center mb-8">
                        <h3 className="text-2xl font-bold text-gray-900 mb-3 flex items-center justify-center gap-3">
                          <span className="text-3xl">📋</span>
                          Revisar Pedido
                        </h3>
                        <p className="text-gray-600">Confirma que todo esté correcto antes de enviar</p>
                      </div>

                      {/* Customer Info Summary */}
                      <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6 mb-6 border-2 border-blue-200">
                        <h4 className="font-bold text-blue-900 mb-4 flex items-center gap-2">
                          <span className="text-xl">👤</span>
                          Información de contacto
                        </h4>
                        <div className="space-y-2 text-sm">
                          <p className="flex items-center gap-2">
                            <strong className="text-blue-800">Nombre:</strong>
                            <span className="text-blue-700">{customerInfo.name}</span>
                          </p>
                          <p className="flex items-center gap-2">
                            <strong className="text-blue-800">Teléfono:</strong>
                            <span className="text-blue-700">{customerInfo.phone}</span>
                          </p>
                          <p className="flex items-center gap-2">
                            <strong className="text-blue-800">Tipo:</strong>
                            <span className="text-blue-700">
                              {customerInfo.deliveryType === 'delivery' ? '🚚 Entrega a domicilio' : '🏪 Recoger en tienda'}
                            </span>
                          </p>
                          {customerInfo.address && (
                            <p className="flex items-start gap-2">
                              <strong className="text-blue-800">Dirección:</strong>
                              <span className="text-blue-700">{customerInfo.address}</span>
                            </p>
                          )}
                          {customerInfo.notes && (
                            <p className="flex items-start gap-2">
                              <strong className="text-blue-800">Notas:</strong>
                              <span className="text-blue-700">{customerInfo.notes}</span>
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Order Items */}
                      <div className="space-y-4 mb-6">
                        <h4 className="font-bold text-gray-900 text-lg flex items-center gap-2">
                          <span className="text-xl">🛒</span>
                          Productos ({cartItems.length})
                        </h4>
                        {cartItems.map((item) => (
                          <div key={item.id} className="bg-white border-2 border-orange-200 rounded-2xl p-4 hover:shadow-lg transition-all duration-300">
                            <div className="flex justify-between items-start">
                              <div className="flex-1">
                                <h5 className="font-bold text-gray-900 text-lg">{item.product.name}</h5>
                                <p className="text-orange-600 font-medium">Cantidad: {item.quantity}</p>
                                {item.customizations && Object.keys(item.customizations).length > 0 && (
                                  <div className="mt-2">
                                    <p className="text-xs font-medium text-gray-500 mb-1">Personalizado:</p>
                                    <div className="flex flex-wrap gap-1">
                                      {Object.entries(item.customizations).map(([key, value]) => (
                                        <span key={key} className="inline-block bg-gradient-to-r from-orange-100 to-red-100 text-orange-800 text-xs px-2 py-1 rounded-full font-medium">
                                          {key}: {Array.isArray(value) ? value.join(', ') : value}
                                        </span>
                                      ))}
                                    </div>
                                  </div>
                                )}
                              </div>
                              <div className="text-right ml-4">
                                <p className="font-bold text-xl text-gray-900">${item.totalPrice.toFixed(2)}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Order Summary */}
                      <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl p-6 mb-6 border-2 border-orange-200">
                        <h4 className="font-bold text-orange-900 mb-4 text-lg flex items-center gap-2">
                          <span className="text-xl">💰</span>
                          Resumen del pedido
                        </h4>
                        <div className="space-y-3">
                          <div className="flex justify-between items-center p-2 hover:bg-orange-100 rounded-xl transition-colors">
                            <span className="text-gray-700">Subtotal</span>
                            <span className="font-bold text-gray-900">${orderSummary.subtotal.toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between items-center p-2 hover:bg-orange-100 rounded-xl transition-colors">
                            <span className="text-gray-700">IVA (16%)</span>
                            <span className="font-bold text-gray-900">${orderSummary.tax.toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between items-center p-2 hover:bg-orange-100 rounded-xl transition-colors">
                            <span className="text-gray-700">Envío</span>
                            <span className={`font-bold ${orderSummary.deliveryFee === 0 ? 'text-green-600' : 'text-gray-900'}`}>
                              {orderSummary.deliveryFee > 0 ? `$${orderSummary.deliveryFee.toFixed(2)}` : 'GRATIS'}
                            </span>
                          </div>
                          <div className="border-t-2 border-orange-300 pt-3">
                            <div className="flex justify-between items-center bg-gradient-to-r from-orange-600 to-red-500 text-white p-4 rounded-xl">
                              <span className="text-lg font-bold">Total</span>
                              <span className="text-2xl font-bold">${orderSummary.total.toFixed(2)}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex space-x-4">
                        <Button
                          variant="secondary"
                          vertical="restaurant"
                          onClick={() => setStep('info')}
                          className="flex-1 bg-gradient-to-r from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 text-gray-700 font-bold py-3 px-4 rounded-2xl border-2 border-gray-300 hover:border-gray-400 transform hover:scale-105 transition-all duration-300"
                        >
                          ← Editar Info
                        </Button>
                        <Button
                          variant="primary"
                          vertical="restaurant"
                          onClick={handleSendToWhatsApp}
                          disabled={isSubmitting}
                          className="flex-1 bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white font-bold py-3 px-4 rounded-2xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
                        >
                          {isSubmitting ? (
                            <div className="flex items-center justify-center gap-2">
                              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                              Enviando...
                            </div>
                          ) : (
                            <span className="flex items-center justify-center gap-2">
                              <span className="text-xl">📱</span>
                              Enviar por WhatsApp
                            </span>
                          )}
                        </Button>
                      </div>
                    </div>
                  )}

                  {/* Step 3: Success */}
                  {step === 'success' && (
                    <div className="text-center">
                      <div className="bg-gradient-to-br from-green-50 to-green-100 w-24 h-24 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                        <CheckCircleIcon className="h-12 w-12 text-green-600" />
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center justify-center gap-3">
                        ¡Pedido Enviado!
                        <span className="text-3xl">🎉</span>
                      </h3>
                      <p className="text-gray-600 mb-8 max-w-md mx-auto leading-relaxed">
                        Tu pedido ha sido enviado por WhatsApp. El restaurante te contactará pronto para confirmar tu orden.
                      </p>

                      <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-6 mb-8 border-2 border-green-200">
                        <h4 className="font-bold text-green-900 mb-4 flex items-center justify-center gap-2">
                          <span className="text-xl">🚀</span>
                          Próximos pasos:
                        </h4>
                        <ul className="text-sm text-green-800 space-y-2">
                          <li className="flex items-center gap-2">
                            <span>✅</span>
                            El restaurante confirmará tu pedido
                          </li>
                          <li className="flex items-center gap-2">
                            <span>⏰</span>
                            Recibirás el tiempo estimado de {customerInfo.deliveryType === 'delivery' ? 'entrega' : 'preparación'}
                          </li>
                          <li className="flex items-center gap-2">
                            <span>📱</span>
                            Podrás hacer seguimiento por WhatsApp
                          </li>
                        </ul>
                      </div>

                      <Button
                        variant="primary"
                        vertical="restaurant"
                        onClick={resetAndClose}
                        className="bg-gradient-to-r from-orange-600 to-red-500 hover:from-orange-700 hover:to-red-600 text-white font-bold py-4 px-8 rounded-2xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 text-lg"
                      >
                        ¡Perfecto! 🌭
                      </Button>
                    </div>
                  )}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}