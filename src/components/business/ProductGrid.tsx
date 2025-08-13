'use client'

import { Product } from '@/types/product'
import ProductCard from './restaurant/ProductCard'

interface ProductGridProps {
  products: Product[]
  variant?: 'grid' | 'list'
  cardVariant?: 'default' | 'compact' | 'featured'
  onProductCustomize?: (productId: string) => void
}

export function ProductGrid({
  products,
  variant = 'grid',
  cardVariant = 'default',
  onProductCustomize
}: ProductGridProps) {
  if (!products || products.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-500 text-lg mb-2">🍽️</div>
        <h3 className="text-lg font-medium text-gray-900 mb-1">
          No hay productos disponibles
        </h3>
        <p className="text-gray-500">
          Vuelve pronto para ver nuestras deliciosas opciones
        </p>
      </div>
    )
  }

  const gridClasses = variant === 'grid'
    ? 'grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
    : 'flex flex-col gap-4'

  return (
    <div className={gridClasses}>
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          variant={cardVariant}
          onCustomize={onProductCustomize}
        />
      ))}
    </div>
  )
}

// Componente adicional para filtros (preparación futura)
interface ProductFiltersProps {
  onCategoryChange?: (category: string) => void
  onPriceRangeChange?: (min: number, max: number) => void
  categories?: string[]
}

export function ProductFilters({
  onCategoryChange,
  onPriceRangeChange,
  categories = []
}: ProductFiltersProps) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-6">
      <h3 className="font-medium text-gray-900 mb-3">Filtros</h3>

      {/* Categorías */}
      {categories.length > 0 && (
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Categoría
          </label>
          <select
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
            onChange={(e) => onCategoryChange?.(e.target.value)}
          >
            <option value="">Todas las categorías</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Rango de precios */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Rango de precio
        </label>
        <div className="flex gap-2">
          <input
            type="number"
            placeholder="Min"
            className="flex-1 p-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
            onChange={(e) => {
              const min = parseFloat(e.target.value) || 0
              onPriceRangeChange?.(min, 999)
            }}
          />
          <input
            type="number"
            placeholder="Max"
            className="flex-1 p-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
            onChange={(e) => {
              const max = parseFloat(e.target.value) || 999
              onPriceRangeChange?.(0, max)
            }}
          />
        </div>
      </div>
    </div>
  )
}
