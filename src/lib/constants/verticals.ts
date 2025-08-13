export type Vertical = "restaurant" | "service" | "creative";
export const VERTICAL_CONFIG = {
  restaurant: { 
    primaryColor: "#E67E22",
    productCard: {
      // Configuración específica para la tarjeta de producto de restaurante
    }
  },
  service: { 
    primaryColor: "#3498DB",
    productCard: {
      // Configuración específica para la tarjeta de producto de servicio
    }
  },
  creative: { 
    primaryColor: "#9B59B6",
    productCard: {
      // Configuración específica para la tarjeta de producto de creativo
    }
  }
} as const;