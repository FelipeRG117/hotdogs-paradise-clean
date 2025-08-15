"use client"

import { useState } from "react"
import { Button } from "@/components/ui/Button"
import { CartTestButton } from "@/components/cart/CartTestButton"
import { FlowTester } from "@/components/testing/FlowTester"
import Link from "next/link"
import WhatsAppMessages from "@/lib/whatsapp/optimized-messages"
import { useRouter } from "next/navigation"

export default function Home() {
  const [isFlowTesterOpen, setIsFlowTesterOpen] = useState(false)
  const router = useRouter()

  return (
    <div className="bg-gradient-to-br from-orange-50 via-white to-orange-50">
      <main>
        {/* Hero Section - Más impactante y moderno */}
        <section className="relative bg-gradient-to-br from-orange-600 via-orange-500 to-red-500 text-white py-24 px-12 lg:py-32">
          {/* Background Pattern */}
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>

          {/* Floating Elements */}
          <div className="absolute top-20 left-10 text-6xl opacity-20 animate-bounce">🌭</div>
          <div className="absolute top-32 right-16 text-4xl opacity-30 animate-pulse">🍟</div>
          <div className="absolute bottom-20 left-20 text-5xl opacity-25 animate-bounce delay-1000">🥤</div>

          <div className="relative z-10 mx-auto px-4 text-center">
            <div className="mx-auto flex flex-col space-y-12">
              <div>
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
                  🌭{" "}
                  <span className="bg-gradient-to-r from-yellow-200 to-orange-100 bg-clip-text text-transparent">
                    HotDogs Paradise
                  </span>
                </h1>
                <p className="text-lg md:text-xl lg:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed text-orange-50">
                  Los mejores hot dogs artesanales con ingredientes frescos y sabores únicos.
                  <br className="hidden md:block" />
                  <span className="font-semibold text-yellow-200">Personaliza tu experiencia gastronómica perfecta.</span>
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              
                  <Link href="/productos">
                    <Button
                      variant="secondary"
                      vertical="restaurant"
                      className="w-full sm:w-auto bg-white text-orange-600 hover:bg-orange-50 hover:scale-105 transition-all duration-300 shadow-xl text-lg px-8 py-4 font-bold border-2 border-white/20"
                    >
                      🍽️ Ver Productos
                    </Button>
                  </Link>
               
                <Link href="/productos#productos">
                  <Button
                    variant="primary"
                    vertical="restaurant"
                    className="sm:w-auto bg-orange-700 hover:bg-orange-800 hover:scale-105 transition-all duration-300 shadow-xl text-lg px-8 py-4 font-bold ring-4 ring-orange-300/30"
                  >
                    🚀 Ordenar Ahora
                  </Button>
                </Link>
              </div>

              {/* Trust Indicators */}
              <div className="mt-12 flex flex-wrap justify-center items-center gap-6 text-orange-100">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">⭐</span>
                  <span className="font-semibold">4.9/5 Rating</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-2xl">🚚</span>
                  <span className="font-semibold">Entrega 20-30 min</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-2xl">🔥</span>
                  <span className="font-semibold">+1000 pedidos</span>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* Features Section - Más visual y atractivo */}
        <section className="min-h-screen">
          <div className="px-12 py-24">
            <div className="container mx-auto px-4">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">¿Por qué elegirnos?</h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  Descubre lo que nos hace únicos en el mundo de los hot dogs artesanales
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
                <div className="group text-center p-8 rounded-2xl bg-gradient-to-br from-orange-50 to-orange-100/50 hover:from-orange-100 hover:to-orange-200/50 transition-all duration-300 hover:scale-105 hover:shadow-xl">
                  <div className="text-6xl mb-6 group-hover:scale-110 transition-transform duration-300">🥩</div>
                  <h3 className="text-xl font-bold mb-4 text-gray-900">Ingredientes Premium</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Carnes selectas y ingredientes frescos de la más alta calidad para una experiencia gastronómica
                    excepcional
                  </p>
                </div>

                <div className="group text-center p-8 rounded-2xl bg-gradient-to-br from-orange-50 to-orange-100/50 hover:from-orange-100 hover:to-orange-200/50 transition-all duration-300 hover:scale-105 hover:shadow-xl">
                  <div className="text-6xl mb-6 group-hover:scale-110 transition-transform duration-300">⚡</div>
                  <h3 className="text-xl font-bold mb-4 text-gray-900">Entrega Rápida</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Preparación rápida sin comprometer el sabor y la calidad. Tu pedido listo en 20-30 minutos
                  </p>
                </div>

                <div className="group text-center p-8 rounded-2xl bg-gradient-to-br from-orange-50 to-orange-100/50 hover:from-orange-100 hover:to-orange-200/50 transition-all duration-300 hover:scale-105 hover:shadow-xl">
                  <div className="text-6xl mb-6 group-hover:scale-110 transition-transform duration-300">🎨</div>
                  <h3 className="text-xl font-bold mb-4 text-gray-900">100% Personalizable</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Crea tu hot dog perfecto con nuestras opciones de personalización ilimitadas
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Social Proof Section - Nueva sección */}
          <div className="px-12 pt-12 pb-24 bg-gradient-to-r from-gray-50 to-orange-50">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Lo que dicen nuestros clientes</h2>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <div className="flex items-center mb-4">
                    <div className="text-yellow-400 text-xl">⭐⭐⭐⭐⭐</div>
                  </div>
                  <p className="text-gray-700 mb-4 italic">
                    "Los mejores hot dogs que he probado. La personalización es increíble y llegan súper rápido."
                  </p>
                  <div className="font-semibold text-gray-900">- María González</div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <div className="flex items-center mb-4">
                    <div className="text-yellow-400 text-xl">⭐⭐⭐⭐⭐</div>
                  </div>
                  <p className="text-gray-700 mb-4 italic">
                    "Calidad premium a precio justo. Mi familia y yo somos clientes frecuentes."
                  </p>
                  <div className="font-semibold text-gray-900">- Carlos Ruiz</div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <div className="flex items-center mb-4">
                    <div className="text-yellow-400 text-xl">⭐⭐⭐⭐⭐</div>
                  </div>
                  <p className="text-gray-700 mb-4 italic">
                    "La app es súper fácil de usar y los sabores son únicos. ¡Recomendado 100%!"
                  </p>
                  <div className="font-semibold text-gray-900">- Ana López</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section - Más impactante */}
        <section className="px-12 pt-12 pb-20 bg-gradient-to-br from-orange-600 via-orange-500 to-red-500 relative overflow-hidden">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="absolute top-10 right-10 text-8xl opacity-10">🌭</div>
          <div className="absolute bottom-10 left-10 text-6xl opacity-15">🍟</div>

          <div className="relative container mx-auto px-4 text-center">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">¿Listo para tu experiencia perfecta?</h2>
              <p className="text-lg md:text-xl text-orange-100 mb-8 leading-relaxed">
                Explora nuestro catálogo completo y personaliza tu pedido ideal.
                <br className="hidden md:block" />
                <span className="font-semibold text-yellow-200">¡Tu hot dog perfecto te está esperando!</span>
              </p>

              <div className="flex flex-col gap-4">
                
                  <Button
                    onClick={() => router.push('/productos')}
                    variant="primary"
                    vertical="restaurant"
                    className="bg-white text-orange-600 hover:bg-orange-50 hover:scale-105 transition-all duration-300 text-xl px-12 py-4 font-bold shadow-2xl ring-4 ring-white/20"
                  >
                    🚀 Explorar Productos
                  </Button>
               
              </div>

           
           <div className="mt-12 text-orange-100 grid grid-cols-1 md:grid-cols-3 gap-4">
                  <span className="">💳 Pago fácil por WhatsApp</span>
                  <span className="">🚚 Entrega gratis en pedidos +$200</span>
                  <span className="">🕐 Lun-Dom 11:00 AM - 10:00 PM</span>
            </div>
               
          </div>
          </div>
          
        </section>
      </main>

     
      {/* Flow Tester Modal - Mantenido igual */}
      {isFlowTesterOpen && <FlowTester onClose={() => setIsFlowTesterOpen(false)} />}
    </div>
  )
}