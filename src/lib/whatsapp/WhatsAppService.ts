export interface WhatsAppContact {
  name: string
  phone: string
  department: 'orders' | 'support' | 'general'
  hours: string
  isActive: boolean
  country: 'mexico' | 'argentina'
}

export interface OrderFormData {
  customerName: string
  customerPhone: string
  orderType: 'delivery' | 'pickup'
  customerAddress?: string
  notes?: string
  country: 'mexico' | 'argentina'
}

export interface CartItem {
  id: string
  product: {
    id: string
    name: string
    basePrice: number
  }
  quantity: number
  totalPrice: number
  customizations?: Record<string, any>
}

export interface CustomerInfo {
  name: string
  phone: string
  address: string
  deliveryType: 'delivery' | 'pickup'
  notes?: string
}

export interface OrderSummary {
  itemCount: number
  subtotal: number
  tax: number
  deliveryFee: number
  total: number
}

/**
 * WhatsApp Service optimizado para México y Argentina
 */
export class WhatsAppService {
  // ✅ NÚMEROS WHATSAPP VÁLIDOS
  private static readonly BUSINESS_PHONES = {
    mexico: "528125740347", // Tu número México
    argentina: "541415523886" // Tu número Argentina
  }
  
  private static readonly BUSINESS_NAME = "HotDogs Paradise"
  private static readonly BUSINESS_ADDRESS = {
    mexico: "Av. Constitución 123, Centro, Monterrey, NL",
    argentina: "Av. Corrientes 1234, Buenos Aires, Argentina"
  }

  private static readonly CONTACTS: WhatsAppContact[] = [
    // México
    {
      name: "Pedidos HotDogs Paradise México",
      phone: "+528125740347",
      department: "orders",
      hours: "10:00 AM - 10:00 PM",
      isActive: true,
      country: "mexico"
    },
    {
      name: "Soporte al Cliente México",
      phone: "+528125740347",
      department: "support",
      hours: "9:00 AM - 6:00 PM",
      isActive: true,
      country: "mexico"
    },
    // Argentina
    {
      name: "Pedidos HotDogs Paradise Argentina",
      phone: "+541415523886",
      department: "orders",
      hours: "10:00 AM - 10:00 PM",
      isActive: true,
      country: "argentina"
    },
    {
      name: "Soporte al Cliente Argentina",
      phone: "+541415523886",
      department: "support",
      hours: "9:00 AM - 6:00 PM",
      isActive: true,
      country: "argentina"
    }
  ]

  /**
   * Genera URL de WhatsApp con mensaje optimizado
   */
  static generateWhatsAppURL(
    cartItems: CartItem[], 
    formData: OrderFormData,
    totals: { subtotal: number; tax: number; delivery: number; total: number }
  ): string {
    const businessPhone = this.BUSINESS_PHONES[formData.country]
    const message = this.formatOrderMessage(cartItems, formData, totals)
    const encodedMessage = this.encodeMessage(message)
    
    return `https://api.whatsapp.com/send?phone=${businessPhone}&text=${encodedMessage}`
  }

  /**
   * Formatea mensaje de pedido (versión compacta)
   */
  private static formatOrderMessage(
    cartItems: CartItem[], 
    formData: OrderFormData,
    totals: { subtotal: number; tax: number; delivery: number; total: number }
  ): string {
    const isArgentina = formData.country === 'argentina'
    const timeZone = isArgentina ? 'America/Argentina/Buenos_Aires' : 'America/Mexico_City'
    const locale = isArgentina ? 'es-AR' : 'es-MX'
    const currency = isArgentina ? 'ARS' : 'MXN'
    const businessAddress = this.BUSINESS_ADDRESS[formData.country]
    
    const date = new Date().toLocaleString(locale, {
      timeZone,
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    })

    // ✅ MENSAJE COMPACTO para evitar límites WhatsApp
    const message = `🌭 *NUEVO PEDIDO - ${this.BUSINESS_NAME}*

👤 *INFORMACIÓN DEL CLIENTE*
• ${formData.customerName}
• Tel: ${formData.customerPhone}
• ${formData.orderType === 'delivery' ? '🚚 Envío a:' : '🏪 Recoger en tienda'}${formData.orderType === 'delivery' && formData.customerAddress ? '\n• ' + formData.customerAddress : ''}${formData.notes ? '\n• Notas: ' + formData.notes : ''}

🛒 *PRODUCTOS (${cartItems.length})*
${cartItems.map((item, index) => {
  const customizations = item.customizations ? 
    Object.entries(item.customizations)
      .filter(([key, value]) => value && value !== 'none')
      .slice(0, 3) // ✅ Límite 3 customizations para reducir tamaño
      .map(([key, value]) => `${key}: ${value}`)
      .join(', ') : ''
  
  return `${index + 1}. *${item.product.name}* (${item.quantity}x)
   $${item.totalPrice.toFixed(2)}${customizations ? '\n   ' + customizations : ''}`
}).join('\n\n')}

💰 *TOTAL*
• Subtotal: $${totals.subtotal.toFixed(2)}
• IVA: $${totals.tax.toFixed(2)}
• Envío: ${totals.delivery === 0 ? 'GRATIS 🎉' : '$' + totals.delivery.toFixed(2)}
• *TOTAL: $${totals.total.toFixed(2)} MXN*

📍 ${this.BUSINESS_NAME}
${this.BUSINESS_ADDRESS}
Lun-Dom: 10:00 AM - 10:00 PM

🕐 Pedido: ${date}

¡Confirma tu pedido por favor! 🌭✨`

    return message
  }

  /**
   * Codifica mensaje para URL (sin caracteres problemáticos)
   */
  private static encodeMessage(message: string): string {
    // ✅ REEMPLAZAR caracteres problemáticos antes de encodear
    const cleanMessage = message
      .replace(/🌭/g, '🌭') // Mantener emoji básico
      .replace(/🚚/g, 'Envío')
      .replace(/🏪/g, 'Recoger')
      .replace(/👤/g, 'CLIENTE')
      .replace(/🛒/g, 'PRODUCTOS')
      .replace(/💰/g, 'TOTAL')
      .replace(/📍/g, '')
      .replace(/🕐/g, 'Hora:')
      .replace(/🎉/g, '')
      .replace(/✨/g, '')
    
    // ✅ ENCODING seguro para WhatsApp
    return encodeURIComponent(cleanMessage)
  }

  /**
   * Valida número de teléfono mexicano (retorna objeto con isValid y error)
   */
  static validateMexicanPhone(phone: string): { isValid: boolean; error?: string } {
    if (!phone || typeof phone !== 'string') {
      return { isValid: false, error: 'Número de teléfono requerido' }
    }

    // Limpiar el número (remover espacios, guiones, paréntesis)
    const cleanPhone = phone.replace(/[\s\-\(\)]/g, '')
    
    // Validar formato mexicano: 10 dígitos (81 1234 5678) o con código país +52
    const mexicanPhoneRegex = /^(\+?52)?[1-9]\d{9}$/
    
    if (!mexicanPhoneRegex.test(cleanPhone)) {
      return { 
        isValid: false, 
        error: 'Formato inválido. Usa: 81 1234 5678 o +52 81 1234 5678' 
      }
    }

    return { isValid: true }
  }

  /**
   * Valida número de teléfono argentino
   */
  static validateArgentinePhone(phone: string): { isValid: boolean; error?: string } {
    if (!phone || typeof phone !== 'string') {
      return { isValid: false, error: 'Número de teléfono requerido' }
    }

    // Limpiar el número (remover espacios, guiones, paréntesis)
    const cleanPhone = phone.replace(/[\s\-\(\)]/g, '')
    
    // Validar formato argentino: 10 dígitos (11 1234 5678) o con código país +54
    const argentinePhoneRegex = /^(\+?54)?[1-9]\d{9}$/
    
    if (!argentinePhoneRegex.test(cleanPhone)) {
      return { 
        isValid: false, 
        error: 'Formato inválido. Usa: 11 1234 5678 o +54 11 1234 5678' 
      }
    }

    return { isValid: true }
  }

  /**
   * Valida número de teléfono según el país
   */
  static validatePhone(phone: string, country: 'mexico' | 'argentina'): { isValid: boolean; error?: string } {
    return country === 'mexico' 
      ? this.validateMexicanPhone(phone)
      : this.validateArgentinePhone(phone)
  }

  /**
   * Formatea número mexicano para WhatsApp
   */
  static formatMexicanPhone(phone: string): string {
    const cleanPhone = phone.replace(/[\s\-\(\)]/g, '')
    
    if (cleanPhone.startsWith('+52')) {
      return cleanPhone
    }
    if (cleanPhone.startsWith('52')) {
      return '+' + cleanPhone
    }
    if (cleanPhone.length === 10) {
      return '+52' + cleanPhone
    }
    
    return cleanPhone
  }

  /**
   * Formatea número argentino para WhatsApp
   */
  static formatArgentinePhone(phone: string): string {
    const cleanPhone = phone.replace(/[\s\-\(\)]/g, '')
    
    if (cleanPhone.startsWith('+54')) {
      return cleanPhone
    }
    if (cleanPhone.startsWith('54')) {
      return '+' + cleanPhone
    }
    if (cleanPhone.length === 10) {
      return '+54' + cleanPhone
    }
    
    return cleanPhone
  }

  /**
   * Formatea número de teléfono según el país
   */
  static formatPhone(phone: string, country: 'mexico' | 'argentina'): string {
    return country === 'mexico' 
      ? this.formatMexicanPhone(phone)
      : this.formatArgentinePhone(phone)
  }

  /**
   * Check if restaurant is open
   */
  static isRestaurantOpen(): boolean {
    const now = new Date()
    const currentHour = now.getHours()
    
    // Restaurant hours: 10 AM to 10 PM
    return currentHour >= 10 && currentHour < 22
  }



  /**
   * Abre WhatsApp con mensaje preformateado
   */
  static openWhatsApp(url: string): void {
    console.log('📱 Abriendo WhatsApp:', url.substring(0, 100) + '...')
    window.open(url, '_blank')
  }

  /**
   * Genera mensaje de pedido (método público)
   */
  static generateOrderMessage(cartItems: CartItem[], formData: OrderFormData): string {
    // Asegurar que formData tenga el país por defecto
    const completeFormData: OrderFormData = {
      ...formData,
      country: formData.country || 'mexico'
    }
    
    const totals = {
      subtotal: cartItems.reduce((total, item) => total + item.totalPrice, 0),
      tax: 0,
      delivery: completeFormData.orderType === 'delivery' ? 50 : 0,
      total: 0
    }
    totals.tax = totals.subtotal * 0.16
    totals.total = totals.subtotal + totals.tax + totals.delivery

    return this.formatOrderMessage(cartItems, completeFormData, totals)
  }
}

/**
 * WhatsApp Formatter - Funciones de formateo y validación
 */
export class WhatsAppFormatter {
  static calculateOrderSummary(cartItems: CartItem[]): OrderSummary {
    const itemCount = cartItems.reduce((total, item) => total + item.quantity, 0)
    const subtotal = cartItems.reduce((total, item) => total + item.totalPrice, 0)
    const tax = subtotal * 0.16 // 16% IVA México
    const deliveryFee = 50 // $50 MXN delivery fee
    const total = subtotal + tax + deliveryFee

    return {
      itemCount,
      subtotal,
      tax,
      deliveryFee,
      total
    }
  }

  static validateOrder(cartItems: CartItem[], customerInfo: CustomerInfo): { isValid: boolean; error?: string } {
    if (!cartItems || cartItems.length === 0) {
      return { isValid: false, error: 'El carrito está vacío' }
    }

    if (!customerInfo.name?.trim()) {
      return { isValid: false, error: 'El nombre es requerido' }
    }

    const phoneValidation = WhatsAppService.validateMexicanPhone(customerInfo.phone)
    if (!phoneValidation.isValid) {
      return { isValid: false, error: phoneValidation.error }
    }

    if (customerInfo.deliveryType === 'delivery' && !customerInfo.address?.trim()) {
      return { isValid: false, error: 'La dirección es requerida para entrega' }
    }

    return { isValid: true }
  }

  static formatOrderMessage(cartItems: CartItem[], customerInfo: CustomerInfo, orderSummary: OrderSummary): string {
    // Usar el método optimizado del WhatsAppService
    const formData: OrderFormData = {
      customerName: customerInfo.name,
      customerPhone: customerInfo.phone,
      orderType: customerInfo.deliveryType,
      customerAddress: customerInfo.address,
      notes: customerInfo.notes,
      country: 'mexico'
    }

    return WhatsAppService.generateOrderMessage(cartItems, formData)
  }
}

// ✅ EXPORT para uso en componentes
export const generateWhatsAppOrder = WhatsAppService.generateWhatsAppURL
export const openWhatsAppChat = WhatsAppService.openWhatsApp
