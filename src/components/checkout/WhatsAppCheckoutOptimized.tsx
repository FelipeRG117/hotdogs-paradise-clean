'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { LoadingSpinner } from '@/components/ui/LoadingSpinner'
import { useCartItems, useCartTotal, useCartCount, useCartActions } from '@/lib/stores/cartStore'
import { WhatsAppService, OrderFormData } from '@/lib/whatsapp/WhatsAppService'

interface WhatsAppCheckoutOptimizedProps {
  onClose: () => void
}

export function WhatsAppCheckoutOptimized({ onClose }: WhatsAppCheckoutOptimizedProps) {
  const cartItems = useCartItems()
  const cartTotal = useCartTotal()
  const cartCount = useCartCount()
  const { clearCart } = useCartActions()

  const [formData, setFormData] = useState<OrderFormData>({
    customerName: '',
    customerPhone: '',
    orderType: 'pickup',
    customerAddress: '',
    notes: '',
    country: 'mexico'
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  // Cálculos de totales
  const subtotal = cartTotal
  const taxRate = 0.16
  const tax = subtotal * taxRate
  const deliveryFee = formData.orderType === 'pickup' ? 0 : (subtotal > 200 ? 0 : 35)
  const total = subtotal + tax + deliveryFee

  const totals = { subtotal, tax, delivery: deliveryFee, total }

  const handleInputChange = (field: keyof OrderFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    // Limpiar error al escribir
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {}

    if (!formData.customerName.trim()) {
      newErrors.customerName = 'El nombre es requerido'
    }

    if (!formData.customerPhone.trim()) {
      newErrors.customerPhone = 'El teléfono es requerido'
    } else {
      const phoneValidation = WhatsAppService.validatePhone(formData.customerPhone, formData.country)
      if (!phoneValidation.isValid) {
        newErrors.customerPhone = phoneValidation.error || 'Formato de teléfono inválido'
      }
    }

    if (formData.orderType === 'delivery' && !formData.customerAddress?.trim()) {
      newErrors.customerAddress = 'La dirección es requerida para envío'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async () => {
    if (!validateForm()) return

    setIsSubmitting(true)

    try {
      // Convertir cartItems al formato esperado por WhatsAppService
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

      // ✅ GENERAR URL WHATSAPP optimizada
      const whatsappURL = WhatsAppService.generateWhatsAppURL(formattedCartItems, formData, totals)

      // Abrir WhatsApp
      WhatsAppService.openWhatsApp(whatsappURL)

      // ✅ LIMPIAR CARRITO después de enviar
      setTimeout(() => {
        clearCart()
        onClose()
      }, 1000)

    } catch (error) {
      console.error('Error al generar WhatsApp:', error)
      alert('Error al procesar el pedido. Intenta nuevamente.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (cartItems.length === 0) {
    return (
      <div className="text-center py-16 px-6">
        <div className="bg-gradient-to-br from-orange-100 to-red-100 w-32 h-32 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-lg">
          <span className="text-6xl">🛒</span>
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-4">
          Tu carrito está vacío
        </h3>
        <p className="text-gray-600 mb-8 max-w-sm mx-auto leading-relaxed">
          Agrega algunos deliciosos hot dogs antes de hacer el pedido
        </p>
        <Button
          onClick={onClose}
          variant="primary"
          vertical="restaurant"
          className="bg-gradient-to-r from-orange-600 to-red-500 hover:from-orange-700 hover:to-red-600 text-white font-bold py-3 px-8 rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
        >
          🚀 Seguir comprando
        </Button>
      </div>
    )
  }

  return (
    <div className="max-w-lg mx-auto p-6 bg-gradient-to-b from-orange-50/50 to-white">
      {/* Premium Header */}
      <div className="text-center mb-8">
        <div className="bg-gradient-to-br from-orange-100 to-red-100 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
          <span className="text-3xl">🌭</span>
        </div>
        <h2 className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-red-500 bg-clip-text text-transparent mb-2">
          Finalizar Pedido
        </h2>
        <p className="text-gray-600">
          Completa tus datos para procesar tu orden
        </p>
      </div>

      {/* Premium Order Summary */}
      <div className="bg-gradient-to-br from-orange-50 to-red-50 border-2 border-orange-200 rounded-2xl p-6 mb-8 shadow-lg">
        <h3 className="font-bold text-orange-900 mb-4 text-lg flex items-center gap-2">
          <span className="text-xl">📋</span>
          Resumen del pedido
        </h3>
        <div className="space-y-3">
          <div className="flex justify-between items-center p-3 hover:bg-orange-100 rounded-xl transition-all duration-300">
            <span className="text-gray-700 flex items-center gap-2">
              <span className="text-orange-500">🛒</span>
              {cartCount} productos
            </span>
            <span className="font-bold text-gray-900">${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between items-center p-3 hover:bg-orange-100 rounded-xl transition-all duration-300">
            <span className="text-gray-700 flex items-center gap-2">
              <span className="text-blue-500">📊</span>
              IVA (16%)
            </span>
            <span className="font-bold text-gray-900">${tax.toFixed(2)}</span>
          </div>
          <div className="flex justify-between items-center p-3 hover:bg-orange-100 rounded-xl transition-all duration-300">
            <span className="text-gray-700 flex items-center gap-2">
              <span className="text-green-500">🚚</span>
              Envío
            </span>
            <span className={`font-bold ${deliveryFee === 0 ? 'text-green-600' : 'text-gray-900'}`}>
              {deliveryFee === 0 ? 'GRATIS' : `${deliveryFee.toFixed(2)}`}
            </span>
          </div>
          <div className="border-t-2 border-orange-300 pt-3">
            <div className="bg-gradient-to-r from-orange-600 to-red-500 text-white p-4 rounded-xl flex justify-between items-center">
              <span className="text-lg font-bold">Total</span>
              <span className="text-2xl font-bold">${total.toFixed(2)} MXN</span>
            </div>
          </div>
        </div>
      </div>

      {/* Premium Form */}
      <form className="space-y-6">
        {/* Nombre */}
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
            <span>👤</span>
            Nombre completo *
          </label>
          <input
            type="text"
            value={formData.customerName}
            onChange={(e) => handleInputChange('customerName', e.target.value)}
            className={`w-full px-4 py-3 border-2 rounded-2xl focus:ring-4 focus:ring-orange-200 focus:border-orange-500 transition-all duration-300 bg-white text-gray-900 placeholder-gray-500 ${errors.customerName ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-orange-300'
              }`}
            placeholder="Tu nombre completo"
          />
          {errors.customerName && (
            <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
              <span>⚠️</span>{errors.customerName}
            </p>
          )}
        </div>

        {/* País */}
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-3 flex items-center gap-2">
            <span>🌎</span>
            País *
          </label>
          <div className="grid grid-cols-2 gap-4">
            <button
              type="button"
              onClick={() => handleInputChange('country', 'mexico')}
              className={`group p-4 border-3 rounded-2xl text-center transition-all duration-300 transform hover:scale-105 ${formData.country === 'mexico'
                ? 'border-orange-500 bg-gradient-to-br from-orange-50 to-red-50 shadow-lg'
                : 'border-gray-300 hover:border-orange-300 hover:shadow-md'
                }`}
            >
              <div className="text-3xl mb-2 group-hover:scale-110 transition-transform duration-300">🇲🇽</div>
              <div className="text-lg font-bold text-gray-900 mb-1">México</div>
              <div className="text-sm text-gray-600">+52</div>
            </button>
            <button
              type="button"
              onClick={() => handleInputChange('country', 'argentina')}
              className={`group p-4 border-3 rounded-2xl text-center transition-all duration-300 transform hover:scale-105 ${formData.country === 'argentina'
                ? 'border-orange-500 bg-gradient-to-br from-orange-50 to-red-50 shadow-lg'
                : 'border-gray-300 hover:border-orange-300 hover:shadow-md'
                }`}
            >
              <div className="text-3xl mb-2 group-hover:scale-110 transition-transform duration-300">🇦🇷</div>
              <div className="text-lg font-bold text-gray-900 mb-1">Argentina</div>
              <div className="text-sm text-gray-600">+54</div>
            </button>
          </div>
        </div>

        {/* Teléfono */}
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
            <span>📞</span>
            Teléfono *
          </label>
          <input
            type="tel"
            value={formData.customerPhone}
            onChange={(e) => handleInputChange('customerPhone', e.target.value)}
            className={`w-full px-4 py-3 border-2 rounded-2xl focus:ring-4 focus:ring-orange-200 focus:border-orange-500 transition-all duration-300 bg-white text-gray-900 placeholder-gray-500 ${errors.customerPhone ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-orange-300'
              }`}
            placeholder={formData.country === 'mexico' ? '81 1234 5678' : '11 1234 5678'}
          />
          {errors.customerPhone && (
            <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
              <span>⚠️</span>{errors.customerPhone}
            </p>
          )}
          <p className="text-gray-500 text-sm mt-2 flex items-center gap-1">
            <span>💡</span>
            {formData.country === 'mexico' 
              ? 'Formato: 81 1234 5678 o +52 81 1234 5678'
              : 'Formato: 11 1234 5678 o +54 11 1234 5678'
            }
          </p>
        </div>

        {/* Premium Order Type Toggle */}
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-3 flex items-center gap-2">
            <span>🚀</span>
            Tipo de orden *
          </label>
          <div className="grid grid-cols-2 gap-4">
            <button
              type="button"
              onClick={() => handleInputChange('orderType', 'pickup')}
              className={`group p-6 border-3 rounded-2xl text-center transition-all duration-300 transform hover:scale-105 ${formData.orderType === 'pickup'
                ? 'border-orange-500 bg-gradient-to-br from-orange-50 to-red-50 shadow-lg'
                : 'border-gray-300 hover:border-orange-300 hover:shadow-md'
                }`}
            >
              <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">🏪</div>
              <div className="text-lg font-bold text-gray-900 mb-1">Recoger</div>
              <div className="text-sm text-gray-600">Sin costo adicional</div>
            </button>
            <button
              type="button"
              onClick={() => handleInputChange('orderType', 'delivery')}
              className={`group p-6 border-3 rounded-2xl text-center transition-all duration-300 transform hover:scale-105 ${formData.orderType === 'delivery'
                ? 'border-orange-500 bg-gradient-to-br from-orange-50 to-red-50 shadow-lg'
                : 'border-gray-300 hover:border-orange-300 hover:shadow-md'
                }`}
            >
              <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">🚚</div>
              <div className="text-lg font-bold text-gray-900 mb-1">Envío</div>
              <div className="text-sm text-gray-600">$35 (Gratis {'>'} $200)</div>
            </button>
          </div>
        </div>

        {/* Premium Address Field (conditional) */}
        {formData.orderType === 'delivery' && (
          <div className="animate-fadeIn">
            <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
              <span>📍</span>
              Dirección de envío *
            </label>
            <textarea
              value={formData.customerAddress}
              onChange={(e) => handleInputChange('customerAddress', e.target.value)}
              className={`w-full px-4 py-3 border-2 rounded-2xl focus:ring-4 focus:ring-orange-200 focus:border-orange-500 transition-all duration-300 ${errors.customerAddress ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-orange-300'
                }`}
              placeholder="Calle, número, colonia, ciudad..."
              rows={3}
            />
            {errors.customerAddress && (
              <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                <span>⚠️</span>{errors.customerAddress}
              </p>
            )}
          </div>
        )}

        {/* Premium Notes Field */}
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
            <span>💭</span>
            Notas adicionales
          </label>
          <textarea
            value={formData.notes}
            onChange={(e) => handleInputChange('notes', e.target.value)}
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-2xl focus:ring-4 focus:ring-orange-200 focus:border-orange-500 hover:border-orange-300 transition-all duration-300 bg-white text-gray-900 placeholder-gray-500"
            placeholder="Instrucciones especiales, alergias, etc..."
            rows={2}
          />
        </div>
      </form>

      {/* Premium Action Buttons */}
      <div className="mt-8 space-y-4">
        <Button
          onClick={handleSubmit}
          disabled={isSubmitting}
          variant="primary"
          vertical="restaurant"
          className="w-full bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white font-bold py-4 px-6 rounded-2xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 text-lg"
        >
          {isSubmitting ? (
            <div className="flex items-center justify-center gap-3">
              <LoadingSpinner size="sm" color="white" />
              <span>Enviando...</span>
            </div>
          ) : (
            <span className="flex items-center justify-center gap-3">
              <span className="text-2xl">📱</span>
              Enviar por WhatsApp
            </span>
          )}
        </Button>

        <Button
          onClick={onClose}
          variant="secondary"
          vertical="restaurant"
          className="w-full bg-gradient-to-r from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 text-gray-700 font-bold py-3 px-6 rounded-2xl border-2 border-gray-300 hover:border-gray-400 transform hover:scale-105 transition-all duration-300"
        >
          Cancelar
        </Button>
      </div>

      {/* Premium Trust Indicators */}
      <div className="mt-6 grid grid-cols-3 gap-3">
        <div className="text-center p-3 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl">
          <div className="text-lg mb-1">🔒</div>
          <div className="text-xs font-medium text-blue-800">Pago Seguro</div>
        </div>
        <div className="text-center p-3 bg-gradient-to-br from-green-50 to-green-100 rounded-xl">
          <div className="text-lg mb-1">⚡</div>
          <div className="text-xs font-medium text-green-800">Entrega Rápida</div>
        </div>
        <div className="text-center p-3 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl">
          <div className="text-lg mb-1">⭐</div>
          <div className="text-xs font-medium text-purple-800">Garantizado</div>
        </div>
      </div>
    </div>
  )
}