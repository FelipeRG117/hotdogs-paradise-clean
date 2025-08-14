import { CartItem } from '@/lib/stores/cartStore'

export interface CustomerInfo {
  name: string
  phone: string
  address?: string
  deliveryType: 'delivery' | 'pickup'
  notes?: string
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

  static formatOrderMessage(
    cartItems: CartItem[],
    customerInfo: CustomerInfo,
    orderSummary: OrderSummary
  ): string {
    const timestamp = new Date().toLocaleString('es-MX', {
      timeZone: 'America/Mexico_City',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    })

    let message = `🌭 *NUEVO PEDIDO - HotDogs Paradise*\n\n`

    // Customer Information
    message += `👤 *INFORMACIÓN DEL CLIENTE*\n`
    message += `• Nombre: ${customerInfo.name}\n`
    message += `• Teléfono: ${customerInfo.phone}\n`
    message += `• Tipo: ${customerInfo.deliveryType === 'delivery' ? '🚚 Entrega a domicilio' : '🏪 Recoger en tienda'}\n`

    if (customerInfo.address && customerInfo.deliveryType === 'delivery') {
      message += `• Dirección: ${customerInfo.address}\n`
    }

    if (customerInfo.notes) {
      message += `• Notas: ${customerInfo.notes}\n`
    }

    message += `• Fecha: ${timestamp}\n\n`

    // Order Items
    message += `🛒 *PRODUCTOS ORDENADOS*\n`
    cartItems.forEach((item, index) => {
      message += `\n${index + 1}. *${item.product.name}*\n`
      message += `   • Cantidad: ${item.quantity}\n`
      message += `   • Precio unitario: $${item.product.basePrice.toFixed(2)}\n`

      // Customizations
      if (item.customizations && Object.keys(item.customizations).length > 0) {
        message += `   • Personalización:\n`
        Object.entries(item.customizations).forEach(([key, value]) => {
          if (Array.isArray(value) && value.length > 0) {
            message += `     - ${key}: ${value.join(', ')}\n`
          } else if (typeof value === 'string' && value) {
            message += `     - ${key}: ${value}\n`
          }
        })
      }

      message += `   • Subtotal: $${item.totalPrice.toFixed(2)}\n`
    })

    // Order Summary
    message += `\n💰 *RESUMEN DEL PEDIDO*\n`
    message += `• Subtotal: $${orderSummary.subtotal.toFixed(2)}\n`
    message += `• IVA (16%): $${orderSummary.tax.toFixed(2)}\n`

    if (orderSummary.deliveryFee > 0) {
      message += `• Envío: $${orderSummary.deliveryFee.toFixed(2)}\n`
    } else {
      message += `• Envío: GRATIS ✅\n`
    }

    message += `• *TOTAL: $${orderSummary.total.toFixed(2)} MXN*\n\n`

    // Instructions
    message += `📋 *INSTRUCCIONES*\n`
    message += `Por favor confirma tu pedido y tiempo estimado de ${customerInfo.deliveryType === 'delivery' ? 'entrega' : 'preparación'}.\n\n`

    message += `🏪 *${this.RESTAURANT_INFO.name}*\n`
    message += `📍 ${this.RESTAURANT_INFO.address}\n`
    message += `🕐 ${this.RESTAURANT_INFO.hours}\n\n`

    message += `¡Gracias por elegirnos! 🌭❤️`

    return message
  }

  static calculateOrderSummary(cartItems: CartItem[]): OrderSummary {
    const subtotal = cartItems.reduce((total, item) => total + item.totalPrice, 0)
    const itemCount = cartItems.reduce((total, item) => total + item.quantity, 0)

    // Tax calculation (16% IVA in Mexico)
    const tax = subtotal * 0.16

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
    if (!customerInfo.name.trim()) {
      errors.push('El nombre es requerido')
    }

    if (!customerInfo.phone.trim()) {
      errors.push('El teléfono es requerido')
    } else if (!/^(\+52\s?)?[0-9]{10}$/.test(customerInfo.phone.replace(/\s/g, ''))) {
      errors.push('Formato de teléfono inválido (debe ser 10 dígitos)')
    }

    if (customerInfo.deliveryType === 'delivery' && !customerInfo.address?.trim()) {
      errors.push('La dirección es requerida para entrega a domicilio')
    }

    return {
      isValid: errors.length === 0,
      errors
    }
  }

  static formatPhoneNumber(phone: string): string {
    // Clean phone number
    const cleaned = phone.replace(/\D/g, '')

    // Add Mexico country code if not present
    if (cleaned.length === 10) {
      return `+52${cleaned}`
    } else if (cleaned.length === 12 && cleaned.startsWith('52')) {
      return `+${cleaned}`
    }

    return phone // Return original if format is unclear
  }
}
