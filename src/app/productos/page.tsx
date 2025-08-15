'use client'

import { useState, useMemo } from 'react'
import { ProductGrid } from '@/components/business/ProductGrid'
import { ProductFilters } from '@/components/business/restaurant/ProductFilters'
import { Product } from '@/types/product'
import mockData from '@/data/mock-restaurant.json'
import WhatsAppMessages from '@/lib/whatsapp/optimized-messages'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'

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

  // Función para hacer scroll suave
  const scrollToProducts = () => {
    const element = document.getElementById('productos');
    if (element) {
      const elementPosition = element.offsetTop;
      const offsetPosition = elementPosition - 100; // 100px de margen arriba
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="min-h-screen">
      <main className="flex flex-col">
        {/* Header de la página - Más impactante */}
        <section className="min-h-96 py-16 bg-gradient-to-br from-orange-50 via-white to-orange-50">
          <div className="mb-12 text-center space-y-16">

            <div className="flex flex-col items-center justify-center">
              <div className="text-center inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-orange-500 to-red-500 rounded-full mb-6 shadow-xl">
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
            </div>

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

          {/* Button go to armar pedido - CORREGIDO */}
          <div className="flex flex-col items-center justify-center">
            <button
              onClick={(e) => {
                e.preventDefault();
                scrollToProducts();
              }}
              className="bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-700 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl flex items-center gap-2"
            >
              Arma tu pedido ahora 🚀!!
            </button>
          </div>
        </section>

        {/* Filtros - CORREGIDO: sin # en el id */}
        <section id="productos" className="px-4 md:px-8 lg:px-16 xl:px-32 py-16 min-h-screen bg-gradient-to-br from-orange-600 via-orange-500 to-red-500 text-white">
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
        </section>

        <footer className="py-16 pt-16 bg-gradient-to-br from-orange-50 to-orange-100 border-t-4 border-orange-300">
          <div className="container mx-auto px-6">
            {/* Header del Footer */}
            <div className="text-center mb-6">
              <h3 className="text-xl font-bold text-orange-800 mb-2">
                🌭 ¿No encuentras lo que buscas?
              </h3>
              <p className="text-orange-700">
                ¡Contáctanos y creamos algo especial para ti!
              </p>
            </div>

            {/* Botones de Contacto */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center mb-6">
              <a
                href={WhatsAppMessages.productsContact()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block"
              >
                <button className="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-bold transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center gap-2 text-base">
                  <span className="text-xl">💬</span>
                  Contactar por WhatsApp
                </button>
              </a>
              <a
                href="tel:+528125740347"
                className="inline-block"
              >
                <button className="w-full sm:w-auto bg-white text-orange-600 border-2 border-orange-600 px-6 py-3 rounded-xl font-bold hover:bg-orange-50 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center gap-2 text-base">
                  <span className="text-xl">📞</span>
                  Llamar Ahora
                </button>
              </a>
            </div>

            {/* Información de Contacto */}
            <div className="bg-white/60 rounded-xl p-4 text-center shadow-lg">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center justify-center gap-2">
                  <span className="text-xl">📱</span>
                  <div className="text-left">
                    <p className="font-semibold text-orange-800 text-sm">WhatsApp</p>
                    <p className="text-orange-700 text-sm">+52 81 2574 0347</p>
                  </div>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <span className="text-xl">🕐</span>
                  <div className="text-left">
                    <p className="font-semibold text-orange-800 text-sm">Horarios</p>
                    <p className="text-orange-700 text-sm">Lun-Dom 11:00 AM - 10:00 PM</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Mensaje Final */}
            <div className="text-center mt-6">
              <p className="text-orange-600 font-medium text-sm">
                🎉 ¡Tu satisfacción es nuestra prioridad! 🎉
              </p>
            </div>
          </div>
        </footer>
       
      </main>
    </div>
  )
}