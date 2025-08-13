'use client'

import { useState, useMemo } from 'react'
import { ProductGrid } from '@/components/business/ProductGrid'
import { ProductFilters } from '@/components/business/restaurant/ProductFilters'
import { Product } from '@/types/product'
import mockData from '@/data/mock-restaurant.json'

export default function ProductosPage() {
  // State for filters
  const [selectedCategory, setSelectedCategory] = useState<string>('')

  // Extraer productos del mock data con type assertion
  const allProducts = (mockData.products || []) as Product[]

  // Extraer categorías únicas para filtros
  const categories = Array.from(
    new Set(allProducts.map(product => product.category).filter(Boolean))
  ) as string[]

  // Filter products based on selected category
  const filteredProducts = useMemo(() => {
    if (!selectedCategory) return allProducts
    return allProducts.filter(product => product.category === selectedCategory)
  }, [allProducts, selectedCategory])

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50">
      <main className="container mx-auto px-4 py-8">
        {/* Header de la página - Más impactante */}
        <div className="mb-12 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-orange-500 to-red-500 rounded-full mb-6 shadow-xl">
            <span className="text-3xl">🌭</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 bg-gradient-to-r from-orange-600 to-red-500 bg-clip-text text-transparent">
            Nuestros Productos
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Descubre nuestra deliciosa selección de hot dogs artesanales y acompañamientos.
            <br className="hidden md:block" />
            <span className="font-semibold text-orange-600">¡Cada uno personalizable a tu gusto!</span>
          </p>

          {/* Quick Stats */}
          <div className="flex flex-wrap justify-center items-center gap-6 mt-8 text-sm text-gray-600">
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-md">
              <span className="text-lg">🔥</span>
              <span className="font-medium">{allProducts.length} productos disponibles</span>
            </div>
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-md">
              <span className="text-lg">⚡</span>
              <span className="font-medium">Preparación 15-20 min</span>
            </div>
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-md">
              <span className="text-lg">🎨</span>
              <span className="font-medium">100% personalizable</span>
            </div>
          </div>
        </div>

        {/* Filtros - Con mejor styling */}
        <div className="mb-8">
          <ProductFilters
            categories={categories}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            productCount={filteredProducts.length}
          />
        </div>

        {/* Grid de productos - Con loading state mejorado */}
        <div className="mb-12">
          {filteredProducts.length === 0 ? (
            // Empty State
            <div className="text-center py-16">
              <div className="text-8xl mb-6 opacity-50">🔍</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">No encontramos productos</h3>
              <p className="text-gray-600 mb-8 max-w-md mx-auto">
                No hay productos disponibles en la categoría seleccionada. Prueba con otra categoría o explora todos
                nuestros productos.
              </p>
              <button
                onClick={() => setSelectedCategory("")}
                className="bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-700 transition-colors duration-300"
              >
                Ver todos los productos
              </button>
            </div>
          ) : (
            <ProductGrid
              products={filteredProducts}
              variant="grid"
              cardVariant="featured"
              onProductCustomize={(productId) => {
                console.log("Customizar producto:", productId)
              }}
            />
          )}
        </div>

        {/* Stats - Más visual y atractivo */}
        <div className="bg-gradient-to-r from-orange-100 to-orange-50 rounded-2xl p-8 text-center shadow-lg">
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 text-gray-700">
            <div className="flex items-center gap-2">
              <span className="text-2xl">📊</span>
              <span className="font-semibold text-lg">
                Mostrando {filteredProducts.length} de {allProducts.length} productos
              </span>
            </div>

            {selectedCategory && (
              <div className="flex items-center gap-2">
                <span className="text-2xl">🏷️</span>
                <span className="text-orange-600 font-bold text-lg">en "{selectedCategory}"</span>
                <button
                  onClick={() => setSelectedCategory("")}
                  className="ml-2 text-sm text-orange-600 hover:text-orange-700 underline font-medium"
                >
                  Limpiar filtro
                </button>
              </div>
            )}
          </div>

          {/* Call to Action */}
          <div className="mt-6 pt-6 border-t border-orange-200">
            <p className="text-gray-600 mb-4">
              ¿No encuentras lo que buscas? ¡Contáctanos y creamos algo especial para ti!
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button className="bg-orange-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-orange-700 transition-colors duration-300">
                💬 Contactar por WhatsApp
              </button>
              <button className="bg-white text-orange-600 border-2 border-orange-600 px-6 py-2 rounded-lg font-semibold hover:bg-orange-50 transition-colors duration-300">
                📞 Llamar ahora
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}