'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { useCartCount } from '@/lib/stores/cartStore'
import { CartDrawer } from '@/components/cart/CartDrawer'

export function Header() {
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  // ✅ Hydration-safe cart count
  const cartCount = useCartCount()

  const openCart = () => setIsCartOpen(true)
  const closeCart = () => setIsCartOpen(false)
  
  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen)
  const closeMobileMenu = () => setIsMobileMenuOpen(false)

  const scrollToProducts = () => {
    closeMobileMenu()
    const productsSection = document.getElementById('productos')
    if (productsSection) {
      productsSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      })
    }
  }

  return (
    <>
      <header className="bg-white shadow-sm border-b border-gray-200">
        <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
          {/* Logo */}
          <Link
            href="/"
            className="text-2xl font-bold text-orange-600 hover:text-orange-700 transition-colors"
            onClick={closeMobileMenu}
          >
            🌭 HotDogs Paradise
          </Link>

          {/* Navigation Links - Desktop */}
          <div className="hidden md:flex items-center gap-6">
            <Link
              href="/"
              className="text-gray-700 hover:text-orange-600 transition-colors font-medium"
            >
              Inicio
            </Link>
            <Link
              href="/productos"
              className="text-gray-700 hover:text-orange-600 transition-colors font-medium"
            >
              Productos
            </Link>
            <Link
              href="/nosotros"
              className="text-gray-700 hover:text-orange-600 transition-colors font-medium"
            >
              Nosotros
            </Link>
            <Link
              href="/contacto"
              className="text-gray-700 hover:text-orange-600 transition-colors font-medium"
            >
              Contacto
            </Link>
          </div>

          {/* Cart & CTA - Desktop */}
          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={openCart}
              className="flex items-center gap-2 text-gray-700 hover:text-orange-600 transition-colors relative"
            >
              🛒
              <span>Carrito</span>
              {cartCount > 0 && (
                <span className="bg-orange-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
                  {cartCount}
                </span>
              )}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-gray-700 hover:text-orange-600"
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </nav>

        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-12 bg-gradient-to-b from-orange-400 to-orange-600 border-t border-orange-300 h-screen">
            <div className="container mx-auto px-4 py-4 space-y-4">
            <Link
            href="/"
            className="w-full flex justify-center text-center text-3xl font-bold text-white hover:text-orange-700 transition-colors"
            onClick={closeMobileMenu}
          >
            🌭 HotDogs Paradise
          </Link>
              {/* Mobile Menu Header */}
              <div className="rounded-lg p-6 text-center mb-6">

                {/* Mobile Cart in Header */}
                <button
                  onClick={() => {
                    openCart()
                    closeMobileMenu()
                  }}
                  className="flex flex-col items-center justify-center gap-3 text-white hover:text-orange-100 transition-colors py-4 px-6 rounded-full bg-white/20 hover:bg-white/30 w-32 h-32 mx-auto"
                >

                  <div>

                  </div>
                  <div className="flex flex-col items-center space-y-2">
                    <div className="flex flex-row items-center">
                      <span className="text-5xl">🛒</span>
                      {cartCount > 0 && (
                        <span className="bg-white text-orange-600 text-xs rounded-full px-2 py-1 min-w-[20px] text-center font-bold mt-1">
                          {cartCount}
                        </span>
                      )}
                    </div>
                    <div>
                      <span className="text-sm font-medium">Carrito</span>
                    </div>
                  </div>


                </button>
              </div>

              {/* Mobile Navigation Links */}
              <div className="flex flex-col space-y-2 items-center">
                <Link
                  href="/"
                  className="text-white hover:text-orange-100 transition-colors font-medium py-2 px-3 rounded-lg hover:bg-white/20 w-full text-center"
                  onClick={closeMobileMenu}
                >
                  Inicio
                </Link>
                <Link
                  href="/productos"
                  className="text-white hover:text-orange-100 transition-colors font-medium py-2 px-3 rounded-lg hover:bg-white/20 w-full text-center"
                  onClick={closeMobileMenu}
                >
                  Productos
                </Link>
                <Link
                  href="/nosotros"
                  className="text-white hover:text-orange-100 transition-colors font-medium py-2 px-3 rounded-lg hover:bg-white/20 w-full text-center"
                  onClick={closeMobileMenu}
                >
                  Nosotros
                </Link>
                <Link
                  href="/contacto"
                  className="text-white hover:text-orange-100 transition-colors font-medium py-2 px-3 rounded-lg hover:bg-white/20 w-full text-center"
                  onClick={closeMobileMenu}
                >
                  Contacto
                </Link>
              </div>

              {/* Mobile CTA Button */}
              <div className="flex flex-col space-y-3 pt-4 border-t border-white/30">
                <button
                  onClick={scrollToProducts}
                  className="w-full bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 hover:from-yellow-300 hover:via-orange-400 hover:to-red-400 text-white font-bold py-4 px-6 rounded-2xl shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-3 text-lg"
                >
                  <span className="text-2xl">🚀</span>
                  <span>¡Arma tu Pedido!</span>
                  <span className="text-2xl">🎉</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* CartDrawer */}
      <CartDrawer isOpen={isCartOpen} onClose={closeCart} />
    </>
  )
}