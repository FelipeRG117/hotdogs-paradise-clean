'use client'

import { Product, ProductCustomization } from '@/types/product'
import { Button, ButtonVariant } from '@/components/ui/Button'
import { useMemo, useEffect, useState } from 'react'
import { FeatureOption } from '@/components/ui/FeatureOption'
import { useProductTracking } from '@/hooks/useProductAnalytics'
import { ProductCustomizer } from '@/components/customizer/ProductCustomizer'
import { useCartActions } from '@/lib/stores/cartStore'

type ProductVariant = 'default' | 'compact' | 'featured'

interface ProductCardProps {
  product: Product
  variant?: ProductVariant
  onCustomize?: (productId: Product['id']) => void
}

const variantClasses: Record<ProductVariant, string> = {
  default:
    "group cursor-pointer bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border-0 overflow-hidden",
  compact:
    "group cursor-pointer bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-105 border-0 overflow-hidden",
  featured:
    "group cursor-pointer bg-gradient-to-br from-orange-50 to-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 border-2 border-orange-200 hover:border-orange-300 overflow-hidden",
}

const buttonVariants: Record<ProductVariant, ButtonVariant> = {
  default: 'primary',
  compact: 'secondary',
  featured: 'primary'
}

export default function ProductCard({
  product,
  variant = 'default',
  onCustomize
}: ProductCardProps) {
  // Inicializar tracking para este producto
  const { trackView, trackCustomizeStart } = useProductTracking(product.id)

  // Cart actions
  const { addItem } = useCartActions()

  // State para el ProductCustomizer
  const [isCustomizerOpen, setIsCustomizerOpen] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [isAdding, setIsAdding] = useState(false)

  // Detectar si es una bebida
  const isBeverage = useMemo(() => {
    return product.category?.toLowerCase() === 'bebidas'
  }, [product.category])

  // Trackear vista del producto cuando se monta el componente
  useEffect(() => {
    trackView()
  }, [trackView])

  // Usar customizationSchema para renderizar opciones
  const renderFeatures = (features: ProductCustomization['features']) => (
    <div className="space-y-2">
      {Object.entries(features)
        .slice(0, 3)
        .map(([name, feature]) => (
          <FeatureOption key={name} feature={feature} name={name} />
        ))}
      {Object.entries(features).length > 3 && (
        <div className="text-xs text-orange-600 font-medium">
          +{Object.entries(features).length - 3} opciones más
        </div>
      )}
    </div>
  )

  // Asegurar que siempre tengamos un variant válido
  const buttonVariantValue = buttonVariants[variant] || 'primary'

  // Manejar click de personalización con tracking (solo para hot dogs)
  const handleCustomizeClick = () => {
    trackCustomizeStart()
    setIsCustomizerOpen(true)
    onCustomize?.(product.id)
  }

  // Manejar agregar bebida directamente al carrito
  const handleDirectAddToCart = async () => {
    if (isAdding) return

    setIsAdding(true)

    try {
      // Agregar al carrito sin customizaciones
      addItem(product, {})

      // Feedback visual temporal
      await new Promise(resolve => setTimeout(resolve, 500))
    } catch (error) {
      console.error('Error adding to cart:', error)
    } finally {
      setIsAdding(false)
    }
  }

  // Manejar quick add button (corazón)
  const handleQuickAdd = () => {
    if (isBeverage) {
      handleDirectAddToCart()
    } else {
      handleCustomizeClick()
    }
  }

  const closeCustomizer = () => {
    setIsCustomizerOpen(false)
  }

  return (
    <div
      className={variantClasses[variant]}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <div className="relative overflow-hidden">
        <img
          src={product.image || "/placeholder.svg"}
          alt={product.name}
          className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-500"
        />

        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Popular Badge */}
        {variant === 'featured' && (
          <div className="absolute top-4 left-4">
            <div className="bg-gradient-to-r from-red-500 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
              🔥 Popular
            </div>
          </div>
        )}

        {/* Quick Add Button */}
        <div className={`absolute top-4 right-4 transition-all duration-300 ${isHovered ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
          }`}>
          <button
            onClick={handleQuickAdd}
            disabled={isAdding}
            className={`w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-orange-600 hover:bg-white hover:scale-110 transition-all duration-200 shadow-lg ${isAdding ? 'animate-pulse' : ''
              }`}
          >
            {isAdding ? '✓' : (isBeverage ? '🛒' : '❤️')}
          </button>
        </div>

        {/* Price Badge */}
        <div className="absolute bottom-4 right-4">
          <div className="bg-white/95 backdrop-blur-sm rounded-full px-3 py-1 shadow-lg">
            <div className="text-center">
              <div className="text-lg font-bold text-orange-600">
                ${product.basePrice.toFixed(0)}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Header */}
        <div className="mb-4">
          <h3 className="text-xl font-bold text-gray-900 group-hover:text-orange-600 transition-colors duration-300 mb-2">
            {product.name}
          </h3>

          {/* Rating & Reviews */}
          <div className="flex items-center gap-2 mb-3">
            <div className="flex items-center">
              <span className="text-yellow-400 text-sm">⭐⭐⭐⭐⭐</span>
              <span className="text-sm text-gray-600 ml-1">(4.8)</span>
            </div>
            <span className="text-gray-300">•</span>
            <span className="text-sm text-gray-600">156 reseñas</span>
          </div>

          {/* Description */}
          <p className="text-gray-600 text-sm leading-relaxed line-clamp-2">
            {product.description ||
              "Delicioso hot dog artesanal preparado con ingredientes frescos y de la más alta calidad."}
          </p>
        </div>

        {/* Action Buttons - Different logic for beverages vs hot dogs */}
        <div className="flex gap-3">
          {isBeverage ? (
            // BEBIDAS: Solo botón de agregar al carrito
            <>
              <Button
                onClick={handleDirectAddToCart}
                disabled={isAdding}
                className={`flex-1 font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 ${isAdding
                  ? 'bg-green-500 hover:bg-green-600 text-white'
                  : 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white'
                  }`}
                variant={buttonVariantValue}
                vertical="restaurant"
              >
                {isAdding ? '✓ Agregado' : '🛒 Agregar al Carrito'}
              </Button>
            </>
          ) : (
            // HOT DOGS: Botón personalizar + quick add
            <>
              <Button
                onClick={handleCustomizeClick}
                className="flex-1 bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                variant={buttonVariantValue}
                vertical="restaurant"
              >
                🎨 Personalizar
              </Button>

              <button
                onClick={handleDirectAddToCart}
                disabled={isAdding}
                className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110 ${isAdding
                  ? 'bg-green-100 text-green-600'
                  : 'bg-orange-100 hover:bg-orange-200 text-orange-600'
                  }`}
              >
                {isAdding ? '✓' : '🛒'}
              </button>
            </>
          )}
        </div>

        {/* Quick Info */}
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
          <div className="flex items-center gap-4 text-xs text-gray-500">
            <span className="flex items-center gap-1">⏱️ {isBeverage ? '5 min' : '15-20 min'}</span>
            <span className="flex items-center gap-1">🚚 Delivery gratis</span>
          </div>

          {variant === 'featured' && (
            <div className="flex items-center gap-1 text-xs text-orange-600 font-medium">
              <span>🔥</span>
              <span>Más pedido</span>
            </div>
          )}
        </div>
      </div>

      {/* ProductCustomizer Modal - Solo para hot dogs */}
      {!isBeverage && (
        <ProductCustomizer
          product={product}
          isOpen={isCustomizerOpen}
          onClose={closeCustomizer}
        />
      )}
    </div>
  )
}

// Componente auxiliar mejorado con mejor styling
function PriceDisplay({
  basePrice,
  customizationSchema
}: {
  basePrice: number
  customizationSchema?: Product['customizationSchema']
}) {
  const minCustomPrice = useMemo(() => {
    if (!customizationSchema?.features) return 0
    return Object.values(customizationSchema.features)
      .reduce((acc, feature) => {
        const price = feature.pricingModel.value
        return acc + (feature.pricingModel.type === 'relative'
          ? basePrice * (price / 100)
          : price)
      }, 0)
  }, [customizationSchema, basePrice])

  return (
    <div className="text-center">
      <div className="text-lg font-bold text-orange-600">
        ${basePrice.toFixed(0)}
      </div>
      {minCustomPrice > 0 && (
        <div className="text-xs text-gray-500">
          +${minCustomPrice.toFixed(0)} custom
        </div>
      )}
    </div>
  )
}