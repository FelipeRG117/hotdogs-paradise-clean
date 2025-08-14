// Información del negocio optimizada
const BUSINESS_INFO = {
    name: "Doguería El Sabor",
    phone: "+52 81 2574 0347",
    hours: "Lun-Dom 11:00 AM - 10:00 PM",
    address: "Av. Juárez 456, Col. Centro, Monterrey, NL",
    deliveryTime: "20-30 minutos",
    freeDeliveryMin: 100
}

// URLs optimizadas para cada contexto
export const WhatsAppMessages = {

    // 🏠 HOME PAGE - "Ordenar Ahora"
    homeOrderNow: () => {
        const message = `🌭 ¡Hola ${BUSINESS_INFO.name}!
  
  Me interesa hacer un pedido de sus deliciosos hot dogs artesanales.
  
  ¿Podrían enviarme:
  • 📋 Menú completo con precios
  • 🎨 Opciones de personalización 
  • 🚚 Información de entrega
  
  ¡Se ven increíbles en su página web! 😍
  
  Gracias 🙏`

        const encodedMessage = encodeURIComponent(message)
        const phoneNumber = BUSINESS_INFO.phone.replace(/\D/g, '')
        return `https://wa.me/${phoneNumber}?text=${encodedMessage}`
    },

    // 🛒 PRODUCTOS PAGE - "Contactar por WhatsApp" 
    productsContact: () => {
        const message = `🍽️ ¡Hola ${BUSINESS_INFO.name}!
  
  Estoy viendo su menú en línea y me gustaría hacer un pedido personalizado.
  
  Especialmente me interesa:
  • 🌭 Hot Dogs Mexicanos
  • 👑 Opciones Gourmet  
  • 🥗 Vegetarianos
  
  ¿Podrían ayudarme a personalizar mi pedido y confirmar disponibilidad?
  
  ¡Todo se ve delicioso! 🤤
  
  Tiempo de entrega: ${BUSINESS_INFO.deliveryTime}
  Zona: Monterrey y alrededores`

        const encodedMessage = encodeURIComponent(message)
        const phoneNumber = BUSINESS_INFO.phone.replace(/\D/g, '')
        return `https://wa.me/${phoneNumber}?text=${encodedMessage}`
    },

    // 🏪 NOSOTROS PAGE - "Hacer tu primer pedido"
    aboutFirstOrder: () => {
        const message = `👋 ¡Hola ${BUSINESS_INFO.name}!
  
  Soy un nuevo cliente y me encantó conocer su historia en la página web. 
  
  Como es mi primer pedido, me gustaría que me recomienden:
  • 🏆 Sus especialidades más populares
  • 🇲🇽 Lo más representativo de su sabor mexicano
  • 💰 Mejor relación calidad-precio
  
  ¡Estoy emocionado de probar los mejores hot dogs de Monterrey! 🌭
  
  ¿Qué me recomiendan para empezar?`

        const encodedMessage = encodeURIComponent(message)
        const phoneNumber = BUSINESS_INFO.phone.replace(/\D/g, '')
        return `https://wa.me/${phoneNumber}?text=${encodedMessage}`
    },

    // 📞 CONTACTO PAGE - "Abrir WhatsApp" (Principal)
    contactMain: () => {
        const message = `📱 ¡Hola ${BUSINESS_INFO.name}!
  
  Me gustaría contactarlos para:
  
  □ Hacer un pedido
  □ Consultar precios y promociones  
  □ Información de entrega
  □ Horarios y ubicación
  □ Otras consultas
  
  ${BUSINESS_INFO.hours}
  📍 ${BUSINESS_INFO.address}
  
  ¡Gracias por su atención! 🌭✨`

        const encodedMessage = encodeURIComponent(message)
        const phoneNumber = BUSINESS_INFO.phone.replace(/\D/g, '')
        return `https://wa.me/${phoneNumber}?text=${encodedMessage}`
    },

    // 💬 CONTACTO PAGE - "Contactar por WhatsApp" (Secundario)
    contactSupport: () => {
        const message = `🆘 Soporte - ${BUSINESS_INFO.name}
  
  Necesito ayuda con:
  
  □ Modificar un pedido
  □ Tiempos de entrega  
  □ Formas de pago
  □ Sugerencias o comentarios
  □ Información general
  
  📞 ${BUSINESS_INFO.phone}
  🕐 ${BUSINESS_INFO.hours}
  
  ¡Gracias por su excelente servicio! 🙏`

        const encodedMessage = encodeURIComponent(message)
        const phoneNumber = BUSINESS_INFO.phone.replace(/\D/g, '')
        return `https://wa.me/${phoneNumber}?text=${encodedMessage}`
    },

    // 🛍️ GENERAL MENU INQUIRY (Para usar en cualquier lado)
    generalMenuInquiry: () => {
        const message = `🌭 ${BUSINESS_INFO.name} - Consulta de Menú
  
  ¡Hola! Me gustaría conocer:
  
  📋 Menú completo actualizado
  💰 Precios actuales  
  🎨 Opciones de personalización
  📦 Combos y promociones
  🚚 Zona de entrega
  
  📍 Ubicación: Monterrey, NL
  ⏰ Horario preferido: [Mencionar horario]
  
  ¡Espero su respuesta! 😊`

        const encodedMessage = encodeURIComponent(message)
        const phoneNumber = BUSINESS_INFO.phone.replace(/\D/g, '')
        return `https://wa.me/${phoneNumber}?text=${encodedMessage}`
    }
}

// Función helper para generar URLs con contexto específico
export const generateContextualWhatsApp = (context: keyof typeof WhatsAppMessages) => {
    return WhatsAppMessages[context]()
}

// Validaciones y helpers adicionales
export const WhatsAppHelpers = {

    // Verificar si es horario de atención
    isBusinessOpen: (): boolean => {
        const now = new Date()
        const hour = now.getHours()
        return hour >= 11 && hour <= 22 // 11 AM - 10 PM
    },

    // Obtener mensaje de horario
    getBusinessHoursMessage: (): string => {
        const isOpen = WhatsAppHelpers.isBusinessOpen()
        if (isOpen) {
            return "🟢 ¡Estamos ABIERTOS! Respuesta inmediata"
        } else {
            return `🔴 Cerrado ahora. Abrimos a las 11:00 AM\n${BUSINESS_INFO.hours}`
        }
    },

    // Formatear número de teléfono
    formatPhone: (phone: string): string => {
        const cleaned = phone.replace(/\D/g, '')
        if (cleaned.length === 10) {
            return `+52${cleaned}`
        }
        return phone
    }
}

// Mensajes por producto específico (BONUS)
export const ProductSpecificMessages = {
    clasico: "Me interesa el Hot Dog Clásico Americano ($45). ¿Está disponible?",
    mexicano: "¿Podrían prepararme el Hot Dog Mexicano Picoso ($55)? ¡Se ve delicioso!",
    gourmet: "Me llama la atención el Gourmet de Trufa ($85). ¿Qué incluye exactamente?",
    vegetariano: "¿Tienen opciones vegetarianas disponibles? Vi el Vegetariano Supreme.",
    sonorense: "El Hot Dog Sonorense ($65) se ve increíble. ¿Puedo personalizarlo?"
}

// Export principal para fácil uso
export default WhatsAppMessages