'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { LoadingSpinner } from '@/components/ui/LoadingSpinner'
import { useCartItems, useCartTotal, useCartCount, useCartActions } from '@/lib/stores/cartStore'
import { WhatsAppService } from '@/lib/whatsapp/WhatsAppService'
import PhoneInput from 'react-phone-number-input'
import 'react-phone-number-input/style.css'

// Estilos personalizados para react-phone-number-input
const phoneInputStyles = `
  .PhoneInput {
    width: 100%;
  }
  .PhoneInputInput {
    width: 100%;
    padding: 12px 16px;
    border: 2px solid #d1d5db;
    border-radius: 16px;
    background: white;
    color: #111827;
    font-size: 16px;
    transition: all 0.3s ease;
  }
  .PhoneInputInput:focus {
    outline: none;
    border-color: #f97316;
    box-shadow: 0 0 0 4px rgba(249, 115, 22, 0.2);
  }
  .PhoneInputCountry {
    margin-right: 12px;
  }
  .PhoneInputCountrySelect {
    background: transparent;
    border: none;
    outline: none;
    color: #111827 !important;
    font-weight: 500;
  }
  .PhoneInputCountrySelect option {
    color: #111827 !important;
    background: white;
  }
  .PhoneInputCountryIcon {
    width: 20px;
    height: 20px;
  }
  .PhoneInputInput::placeholder {
    color: #6b7280;
  }
`

// Tipo local para el formulario
interface OrderFormData {
  customerName: string
  customerPhone: string | undefined
  orderType: 'pickup' | 'delivery'
  customerAddress: string
  notes: string
  country: string
  paymentMethod: 'efectivo' | 'transferencia' | 'qr'
}

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
    country: 'mx',
    paymentMethod: 'efectivo'
  })

  // Estado para el país del teléfono
  const [selectedPhoneCountry, setSelectedPhoneCountry] = useState('MX')

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  // Cálculos de totales
  const subtotal = cartTotal
  const taxRate = 0.16
  const tax = subtotal * taxRate
  const deliveryFee = formData.orderType === 'pickup' ? 0 : (subtotal > 200 ? 0 : 35)
  const total = subtotal + tax + deliveryFee

  const totals = { subtotal, tax, delivery: deliveryFee, total }

     // Función para obtener el placeholder según el país (solo número local)
   const getPhonePlaceholder = (countryCode: string) => {
     const placeholders: Record<string, string> = {
       // América del Norte
       'MX': 'Ej: 81 1234 5678',
       'US': 'Ej: 555 123 4567',
       'CA': 'Ej: 416 123 4567',
       
       // América Central
       'GT': 'Ej: 5123 4567',
       'BZ': 'Ej: 612 3456',
       'SV': 'Ej: 7123 4567',
       'HN': 'Ej: 9123 4567',
       'NI': 'Ej: 8123 4567',
       'CR': 'Ej: 8888 8888',
       'PA': 'Ej: 6123 4567',
       
       // América del Sur
       'AR': 'Ej: 11 1234 5678',
       'BR': 'Ej: 11 99999 9999',
       'CL': 'Ej: 9 1234 5678',
       'CO': 'Ej: 300 123 4567',
       'PE': 'Ej: 999 123 456',
       'VE': 'Ej: 412 123 4567',
       'EC': 'Ej: 99 123 4567',
       'UY': 'Ej: 99 123 456',
       'PY': 'Ej: 981 123 456',
       'BO': 'Ej: 712 123 45',
       'GY': 'Ej: 612 3456',
       'SR': 'Ej: 612 3456',
       'GF': 'Ej: 612 3456',
       
       // Caribe
       'CU': 'Ej: 5 123 4567',
       'JM': 'Ej: 876 123 4567',
       'HT': 'Ej: 34 12 3456',
       'DO': 'Ej: 809 123 4567',
       'PR': 'Ej: 787 123 4567',
       'TT': 'Ej: 868 123 4567',
       'BB': 'Ej: 246 123 4567',
       'GD': 'Ej: 473 123 4567',
       'LC': 'Ej: 758 123 4567',
       'VC': 'Ej: 784 123 4567',
       'AG': 'Ej: 268 123 4567',
       'KN': 'Ej: 869 123 4567',
       'DM': 'Ej: 767 123 4567',
       
       // Europa Occidental
       'ES': 'Ej: 612 345 678',
       'PT': 'Ej: 912 345 678',
       'FR': 'Ej: 6 12 34 56 78',
       'DE': 'Ej: 151 123 45678',
       'IT': 'Ej: 312 123 4567',
       'NL': 'Ej: 6 123 45678',
       'BE': 'Ej: 470 123 456',
       'CH': 'Ej: 76 123 45 67',
       'AT': 'Ej: 660 123 456',
       'GB': 'Ej: 7700 123 456',
       'IE': 'Ej: 87 123 4567',
       
       // Europa del Este
       'PL': 'Ej: 512 123 456',
       'CZ': 'Ej: 601 123 456',
       'SK': 'Ej: 901 123 456',
       'HU': 'Ej: 20 123 4567',
       'RO': 'Ej: 712 123 456',
       'BG': 'Ej: 88 123 4567',
       'HR': 'Ej: 91 123 4567',
       'SI': 'Ej: 31 123 456',
       'EE': 'Ej: 5123 4567',
       'LV': 'Ej: 2123 4567',
       'LT': 'Ej: 6123 4567'
     }
     
     return placeholders[countryCode] || 'Ej: Ingresa tu número'
   }

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

    if (!formData.customerPhone || !formData.customerPhone.trim()) {
      newErrors.customerPhone = 'El teléfono es requerido'
    } else {
      // Validación básica de teléfono (al menos 8 dígitos)
      const phoneDigits = formData.customerPhone.replace(/\D/g, '')
      if (phoneDigits.length < 8) {
        newErrors.customerPhone = 'El teléfono debe tener al menos 8 dígitos'
      }
    }

    if (formData.orderType === 'delivery' && !formData.customerAddress?.trim()) {
      newErrors.customerAddress = 'La dirección es requerida para envío'
    }

    if (!formData.paymentMethod) {
      newErrors.paymentMethod = 'El método de pago es requerido'
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
      // Convertir el código de país al formato esperado por WhatsAppService
      const whatsappFormData = {
        ...formData,
        country: formData.country === 'mx' ? 'mexico' : 'argentina'
      } as any
      const whatsappURL = WhatsAppService.generateWhatsAppURL(formattedCartItems, whatsappFormData, totals)

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
    <div className="max-w-7xl mx-auto p-3 sm:p-6 bg-gradient-to-b from-orange-50/50 to-white">
      <style dangerouslySetInnerHTML={{ __html: phoneInputStyles }} />
      
      {/* Premium Header */}
      <div className="mb-6 sm:mb-8">
        <div className="flex items-center gap-3 sm:gap-6">
          {/* Emoji a la izquierda */}
          <div className="bg-gradient-to-br from-orange-100 to-red-100 w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg flex-shrink-0">
            <span className="text-lg sm:text-2xl">🌭</span>
          </div>
          
          {/* Título y descripción a la derecha */}
          <div className="flex-1">
            <h2 className="text-lg sm:text-2xl font-bold bg-gradient-to-r from-orange-600 to-red-500 bg-clip-text text-transparent mb-1">
              Finalizar Pedido
            </h2>
            <p className="text-gray-600 text-xs sm:text-sm">
              Completa tus datos para procesar tu orden
            </p>
          </div>
        </div>
      </div>

      {/* Layout de dos columnas en pantallas no móviles */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-8">
                 {/* Columna Izquierda - Formulario */}
         <div className="order-1 lg:order-1 px-2 sm:px-4 lg:px-8">
           {/* Título de la columna izquierda para alineación */}
           <div className="bg-white rounded-2xl p-4 shadow-lg border border-orange-200 mb-4">
             <h3 className="font-bold text-orange-900 text-lg flex items-center gap-2 mb-1">
               <span className="text-xl">📝</span>
               Datos del cliente
             </h3>
             <p className="text-gray-600 text-xs">
               Completa la información para procesar tu pedido
             </p>
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

                          {/* Teléfono con react-phone-number-input */}
             <div>
               <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                 <span>📞</span>
                 Teléfono *
               </label>
               
                              <PhoneInput
                   international={false}
                   defaultCountry="MX"
                   value={formData.customerPhone}
                   onChange={(value) => handleInputChange('customerPhone', value || '')}
                   onCountryChange={(country) => setSelectedPhoneCountry(country || 'MX')}
                   placeholder={getPhonePlaceholder(selectedPhoneCountry)}
                   countries={[
                     // América del Norte
                     'US', 'CA', 'MX',
                     // América Central
                     'GT', 'BZ', 'SV', 'HN', 'NI', 'CR', 'PA',
                     // América del Sur
                     'AR', 'BR', 'CL', 'CO', 'PE', 'VE', 'EC', 'UY', 'PY', 'BO', 'GY', 'SR', 'GF',
                     // Caribe
                     'CU', 'JM', 'HT', 'DO', 'PR', 'TT', 'BB', 'GD', 'LC', 'VC', 'AG', 'KN', 'DM',
                     // Europa Occidental
                     'ES', 'PT', 'FR', 'DE', 'IT', 'NL', 'BE', 'CH', 'AT', 'GB', 'IE',
                     // Europa del Este
                     'PL', 'CZ', 'SK', 'HU', 'RO', 'BG', 'HR', 'SI', 'EE', 'LV', 'LT'
                   ]}
                 />
                
                               {/* Texto de ayuda */}
                 <p className="text-gray-500 text-xs mt-2 flex items-center gap-1">
                   <span>💡</span>
                   Formato: {getPhonePlaceholder(selectedPhoneCountry)} - Solo números, sin espacios ni guiones
                 </p>
                 <p className="text-gray-500 text-xs flex items-center gap-1">
                   <span>🌍</span>
                   El código del país se selecciona automáticamente arriba
                 </p>
                 
                 {errors.customerPhone && (
                   <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                     <span>⚠️</span>{errors.customerPhone}
                   </p>
                 )}
               </div>

             {/* Premium Order Type Toggle */}
             <div className="flex flex-col gap-2">
               <label className="block text-sm font-bold text-gray-700  flex items-center gap-2">
                 <span>🚀</span>
                 Forma de entrega *
               </label>
               <div className="grid grid-cols-2 gap-3 p-2">
                 <button
                   type="button"
                   onClick={() => handleInputChange('orderType', 'pickup')}
                   className={`group p-3 border-2 rounded-xl text-center transition-all duration-300 transform hover:scale-105 ${formData.orderType === 'pickup'
                     ? 'border-orange-500 bg-gradient-to-br from-orange-50 to-red-50 shadow-lg'
                     : 'border-gray-300 hover:border-orange-300 hover:shadow-md'
                     }`}
                 >
                   <div className="text-xl mb-2 group-hover:scale-110 transition-transform duration-300">🏪</div>
                   <div className="text-sm font-bold text-gray-900 mb-1">Recoger en tienda</div>
                   <div className="text-xs text-gray-600">Sin costo adicional</div>
                 </button>
                 <button
                   type="button"
                   onClick={() => handleInputChange('orderType', 'delivery')}
                   className={`group p-3 border-2 rounded-xl text-center transition-all duration-300 transform hover:scale-105 ${formData.orderType === 'delivery'
                     ? 'border-orange-500 bg-gradient-to-br from-orange-50 to-red-50 shadow-lg'
                     : 'border-gray-300 hover:border-orange-300 hover:shadow-md'
                     }`}
                 >
                   <div className="text-xl mb-2 group-hover:scale-110 transition-transform duration-300">🚚</div>
                   <div className="text-sm font-bold text-gray-900 mb-1">Envío</div>
                   <div className="text-xs text-gray-600">$35 (Gratis {'>'} $200)</div>
                 </button>
               </div>
             </div>

             {/* Método de Pago */}
             <div className="flex flex-col gap-2">
               <label className="block text-sm font-bold text-gray-700 flex items-center gap-2">
                 <span>💳</span>
                 Método de pago *
               </label>
               <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-2">
                 <button
                   type="button"
                   onClick={() => handleInputChange('paymentMethod', 'efectivo')}
                   className={`group p-3 border-2 rounded-xl text-center transition-all duration-300 transform hover:scale-105 ${formData.paymentMethod === 'efectivo'
                     ? 'border-orange-500 bg-gradient-to-br from-orange-50 to-red-50 shadow-lg'
                     : 'border-gray-300 hover:border-orange-300 hover:shadow-md'
                     }`}
                 >
                   <div className="text-xl mb-2 group-hover:scale-110 transition-transform duration-300">💵</div>
                   <div className="text-sm font-bold text-gray-900 mb-1">Efectivo</div>
                   <div className="text-xs text-gray-600">Al recibir</div>
                 </button>
                 <button
                   type="button"
                   onClick={() => handleInputChange('paymentMethod', 'transferencia')}
                   className={`group p-3 border-2 rounded-xl text-center transition-all duration-300 transform hover:scale-105 ${formData.paymentMethod === 'transferencia'
                     ? 'border-orange-500 bg-gradient-to-br from-orange-50 to-red-50 shadow-lg'
                     : 'border-gray-300 hover:border-orange-300 hover:shadow-md'
                     }`}
                 >
                   <div className="text-xl mb-2 group-hover:scale-110 transition-transform duration-300">🏦</div>
                   <div className="text-sm font-bold text-gray-900 mb-1">Transferencia</div>
                   <div className="text-xs text-gray-600">Banco</div>
                 </button>
                 <button
                   type="button"
                   onClick={() => handleInputChange('paymentMethod', 'qr')}
                   className={`group p-3 border-2 rounded-xl text-center transition-all duration-300 transform hover:scale-105 ${formData.paymentMethod === 'qr'
                     ? 'border-orange-500 bg-gradient-to-br from-orange-50 to-red-50 shadow-lg'
                     : 'border-gray-300 hover:border-orange-300 hover:shadow-md'
                     }`}
                 >
                   <div className="text-xl mb-2 group-hover:scale-110 transition-transform duration-300">📱</div>
                   <div className="text-sm font-bold text-gray-900 mb-1">QR</div>
                   <div className="text-xs text-gray-600">Móvil</div>
                 </button>
               </div>
               
               {/* Error display for payment method */}
               {errors.paymentMethod && (
                 <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                   <span>⚠️</span>{errors.paymentMethod}
                 </p>
               )}
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
         </div>

         {/* Columna Derecha - Resumen del Pedido */}
         <div className="order-2 lg:order-2 px-2 sm:px-4 lg:px-8">
           {/* Premium Order Summary */}
           <div className="bg-gradient-to-br from-orange-50 to-red-50 border-2 border-orange-200 rounded-2xl p-3 sm:p-4 lg:p-6 shadow-lg">
             <h3 className="font-bold text-orange-900 mb-3 sm:mb-4 text-base sm:text-lg flex items-center gap-2">
               <span className="text-lg sm:text-xl">📋</span>
               Resumen del pedido
             </h3>
             <div className="space-y-3">
               <div className="flex justify-between items-center p-2 sm:p-3 hover:bg-orange-100 rounded-xl transition-all duration-300">
                 <span className="text-gray-700 flex items-center gap-1 sm:gap-2 text-xs sm:text-sm">
                   <span className="text-orange-500 text-sm sm:text-base">🛒</span>
                   <span className="whitespace-nowrap">{cartCount} productos</span>
                 </span>
                 <span className="font-bold text-gray-900 text-xs sm:text-sm ml-2">${subtotal.toFixed(2)}</span>
               </div>
               <div className="flex justify-between items-center p-2 sm:p-3 hover:bg-orange-100 rounded-xl transition-all duration-300">
                 <span className="text-gray-700 flex items-center gap-1 sm:gap-2 text-xs sm:text-sm">
                   <span className="text-blue-500 text-sm sm:text-base">📊</span>
                   <span className="whitespace-nowrap">IVA (16%)</span>
                 </span>
                 <span className="font-bold text-gray-900 text-xs sm:text-sm ml-2">${tax.toFixed(2)}</span>
               </div>
               <div className="flex justify-between items-center p-2 sm:p-3 hover:bg-orange-100 rounded-xl transition-all duration-300">
                 <span className="text-gray-700 flex items-center gap-1 sm:gap-2 text-xs sm:text-sm">
                   <span className="text-green-500 text-sm sm:text-base">🚚</span>
                   <span className="whitespace-nowrap">Envío</span>
                 </span>
                 <span className={`font-bold text-xs sm:text-sm ml-2 ${deliveryFee === 0 ? 'text-green-600' : 'text-gray-900'}`}>
                   {deliveryFee === 0 ? 'GRATIS' : `$${deliveryFee.toFixed(2)}`}
                 </span>
               </div>
               <div className="border-t-2 border-orange-300 pt-3">
                 <div className="bg-gradient-to-r from-orange-600 to-red-500 text-white p-3 sm:p-4 rounded-xl flex justify-between items-center">
                   <span className="text-sm sm:text-base font-bold">Total</span>
                   <span className="text-lg sm:text-xl font-bold">${total.toFixed(2)} MXN</span>
                 </div>
               </div>
             </div>
           </div>
           
                      {/* Premium Trust Indicators */}
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="text-center p-3 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl shadow-lg">
                <div className="text-lg mb-1">🔒</div>
                <div className="text-xs font-medium text-blue-800">Pago Seguro</div>
              </div>
              <div className="text-center p-3 bg-gradient-to-br from-green-50 to-green-100 rounded-xl shadow-lg">
                <div className="text-lg mb-1">⚡</div>
                <div className="text-xs font-medium text-green-800">Entrega Rápida</div>
              </div>
              <div className="text-center p-3 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl shadow-lg">
                <div className="text-lg mb-1">⭐</div>
                <div className="text-xs font-medium text-purple-800">Garantizado</div>
              </div>
            </div>

            {/* Premium Action Buttons */}
            <div className="mt-6 sm:mt-8 space-y-3 sm:space-y-4 pb-4">
              <Button
                onClick={handleSubmit}
                disabled={isSubmitting}
                variant="primary"
                vertical="restaurant"
                className="w-full bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white font-bold py-3 sm:py-4 px-4 sm:px-6 rounded-xl sm:rounded-2xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 text-base sm:text-lg"
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center gap-3">
                    <LoadingSpinner size="sm" color="white" />
                    <span>Enviando...</span>
                  </div>
                ) : (
                  <span className="flex items-center justify-center gap-3">
                    <span className="text-xl sm:text-2xl">📱</span>
                    Enviar por WhatsApp
                  </span>
                )}
              </Button>

              <Button
                onClick={onClose}
                variant="secondary"
                vertical="restaurant"
                className="w-full bg-gradient-to-r from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 text-gray-700 font-bold py-3 px-4 sm:px-6 rounded-xl sm:rounded-2xl border-2 border-gray-300 hover:border-gray-400 transform hover:scale-105 transition-all duration-300"
              >
                Cancelar
              </Button>
            </div>
         </div>
      </div>
    </div>
  )
}