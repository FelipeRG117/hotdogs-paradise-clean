import { CartItem } from '@/lib/stores/cartStore'

export interface CustomerInfo {
  customerName: string
  customerPhone: string
  orderType: 'pickup' | 'delivery'
  customerAddress?: string
  notes?: string
  country: 'mx' | 'ar'
  paymentMethod: 'efectivo' | 'transferencia' | 'qr'
}

export interface OrderSummary {
  subtotal: number
  tax: number
  deliveryFee: number
  total: number
  itemCount: number
}

export class WhatsAppFormatter {
  private static readonly RESTAURANT_INFO = {
    name: "🌭 HotDogs Paradise",
    phone: "+52 81 2574 0347",
    address: "Av. Constitución 123, Centro, Monterrey, NL",
    hours: "Lun-Dom: 10:00 AM - 10:00 PM"
  }

  private static readonly BUSINESS_INFO = {
    mx: {
      name: "🌭 HotDogs Paradise México",
      phone: "+52 81 2574 0347",
      address: "Av. Constitución 123, Centro, Monterrey, NL",
      hours: "Lun-Dom: 10:00 AM - 10:00 PM",
      currency: "MXN"
    },
    ar: {
      name: "🌭 HotDogs Paradise Argentina", 
      phone: "+54 14 1552 3886",
      address: "Av. Corrientes 1234, Buenos Aires, Argentina",
      hours: "Lun-Dom: 10:00 AM - 10:00 PM",
      currency: "ARS"
    }
  }

  static formatOrderMessage(
    cartItems: CartItem[],
    customerInfo: CustomerInfo,
    orderSummary: OrderSummary
  ): string {
    const businessInfo = this.BUSINESS_INFO[customerInfo.country]
    const timeZone = customerInfo.country === 'ar' ? 'America/Argentina/Buenos_Aires' : 'America/Mexico_City'
    const locale = customerInfo.country === 'ar' ? 'es-AR' : 'es-MX'
    
    const timestamp = new Date().toLocaleString(locale, {
      timeZone,
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    })

    // Mensaje conversacional y amigable con membrete
    let message = `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`
    message += `🏪 *${businessInfo.name}*\n`
    message += `📍 ${businessInfo.address}\n`
    message += `🕐 ${businessInfo.hours}\n`
    message += `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n`

    message += `¡Hola! 👋 Quiero hacer un pedido por favor 🌭\n\n`

    // Información del cliente de forma natural
    message += `*Mi información:*\n`
    message += `• Me llamo: ${customerInfo.customerName}\n`
    message += `• Mi teléfono: ${customerInfo.customerPhone}\n`
    
    if (customerInfo.orderType === 'delivery') {
      message += `• Quiero que me lo entreguen en: ${customerInfo.customerAddress}\n`
    } else {
      message += `• Voy a recogerlo en la tienda 🏪\n`
    }

    if (customerInfo.notes) {
      message += `• Notas adicionales: ${customerInfo.notes}\n`
    }

    message += `• Método de pago: ${this.formatPaymentMethod(customerInfo.paymentMethod)}\n\n`

    // Productos de forma clara
    message += `*Lo que quiero pedir:*\n`
    cartItems.forEach((item, index) => {
      message += `\n${index + 1}. *${item.quantity}x ${item.product.name}*\n`
      message += `   Precio: $${item.totalPrice.toFixed(2)}\n`

      // Personalizaciones de forma clara
      if (item.customizations && Object.keys(item.customizations).length > 0) {
        message += `   Personalizado con:\n`
        Object.entries(item.customizations).forEach(([key, value]) => {
          if (Array.isArray(value) && value.length > 0) {
            message += `   • ${this.formatCustomizationKey(key)}: ${value.join(', ')}\n`
          } else if (typeof value === 'string' && value && value !== 'none') {
            message += `   • ${this.formatCustomizationKey(key)}: ${value}\n`
          }
        })
      }
    })

    // Total de forma clara
    message += `\n*Resumen del pedido:*\n`
    message += `• Subtotal: $${orderSummary.subtotal.toFixed(2)}\n`
    message += `• IVA: $${orderSummary.tax.toFixed(2)}\n`

    if (orderSummary.deliveryFee > 0) {
      message += `• Envío: $${orderSummary.deliveryFee.toFixed(2)}\n`
    } else {
      message += `• Envío: GRATIS 🎉\n`
    }

    message += `• *TOTAL A PAGAR: $${orderSummary.total.toFixed(2)} ${businessInfo.currency}*\n\n`

    // Solicitud amigable
    message += `¿Podrían confirmarme el pedido y decirme cuánto tiempo tardan en ${customerInfo.orderType === 'delivery' ? 'entregarlo' : 'prepararlo'}? 🤔\n\n`

    message += `¡Muchas gracias! 🙏`

    return message
  }

  static calculateOrderSummary(cartItems: CartItem[]): OrderSummary {
    const subtotal = cartItems.reduce((total, item) => total + item.totalPrice, 0)
    const itemCount = cartItems.reduce((total, item) => total + item.quantity, 0)

    // Tax calculation (16% IVA in Mexico, 21% IVA in Argentina)
    const tax = subtotal * 0.16 // Default to Mexico rate

    // Delivery fee (free over $200)
    const deliveryFee = subtotal > 200 ? 0 : 35

    // Final total
    const total = subtotal + tax + deliveryFee

    return {
      subtotal,
      tax,
      deliveryFee,
      total,
      itemCount
    }
  }

  static validateOrder(cartItems: CartItem[], customerInfo: CustomerInfo): {
    isValid: boolean
    errors: string[]
  } {
    const errors: string[] = []

    // Validate cart
    if (cartItems.length === 0) {
      errors.push('El carrito está vacío')
    }

    // Validate customer info
    if (!customerInfo.customerName.trim()) {
      errors.push('El nombre es requerido')
    }

    if (!customerInfo.customerPhone.trim()) {
      errors.push('El teléfono es requerido')
    } else {
      // Validación básica de teléfono (al menos 8 dígitos)
      const phoneDigits = customerInfo.customerPhone.replace(/\D/g, '')
      if (phoneDigits.length < 8) {
        errors.push('El teléfono debe tener al menos 8 dígitos')
      }
    }

    if (customerInfo.orderType === 'delivery' && !customerInfo.customerAddress?.trim()) {
      errors.push('La dirección es requerida para entrega a domicilio')
    }

    return {
      isValid: errors.length === 0,
      errors
    }
  }

  static formatPhoneNumber(phone: string, country: 'mx' | 'ar' = 'mx'): string {
    // Clean phone number
    const cleaned = phone.replace(/\D/g, '')
    
    // Add country code if not present
    if (country === 'mx') {
      if (cleaned.length === 10) {
        return `+52${cleaned}`
      } else if (cleaned.length === 12 && cleaned.startsWith('52')) {
        return `+${cleaned}`
      }
    } else if (country === 'ar') {
      if (cleaned.length === 10) {
        return `+54${cleaned}`
      } else if (cleaned.length === 12 && cleaned.startsWith('54')) {
        return `+${cleaned}`
      }
    }

    return phone // Return original if format is unclear
  }

  private static formatPaymentMethod(method: string): string {
    const methods = {
      efectivo: '💵 Efectivo',
      transferencia: '🏦 Transferencia bancaria',
      qr: '📱 Pago con QR'
    }
    return methods[method as keyof typeof methods] || method
  }

  private static formatCustomizationKey(key: string): string {
    const keys = {
      size: 'Tamaño',
      bread: 'Pan',
      ingredients: 'Ingredientes',
      sauces: 'Salsas'
    }
    return keys[key as keyof typeof keys] || key
  }
}
