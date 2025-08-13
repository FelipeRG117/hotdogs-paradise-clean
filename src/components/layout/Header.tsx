'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { useCartCount } from '@/lib/stores/cartStore'
import { CartDrawer } from '@/components/cart/CartDrawer'

export function Header() {
  const [isCartOpen, setIsCartOpen] = useState(false)

  // ✅ Hydration-safe cart count
  const cartCount = useCartCount()

  const openCart = () => setIsCartOpen(true)
  const closeCart = () => setIsCartOpen(false)

  return (
    <>
      <header className="bg-white shadow-sm border-b border-gray-200">
        <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
          {/* Logo */}
          <Link
            href="/"
            className="text-2xl font-bold text-orange-600 hover:text-orange-700 transition-colors"
          >
            🌭 HotDogs Paradise
          </Link>

          {/* Navigation Links */}
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

          {/* Cart & CTA */}
          <div className="flex items-center gap-4">
            <button
              onClick={openCart}
              className="flex items-center gap-2 text-gray-700 hover:text-orange-600 transition-colors relative"
            >
              🛒
              <span className="hidden sm:inline">Carrito</span>
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-orange-600 text-white text-xs rounded-full px-2 py-1 min-w-[20px] text-center font-medium">
                  {cartCount}
                </span>
              )}
            </button>

            <Button
              variant="primary"
              vertical="restaurant"
              className="hidden sm:block"
            >
              Ordenar Ahora
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden p-2 text-gray-700 hover:text-orange-600">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </nav>
      </header>

      {/* CartDrawer */}
      <CartDrawer isOpen={isCartOpen} onClose={closeCart} />
    </>
  )
}