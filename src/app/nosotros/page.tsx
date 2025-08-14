import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/Button"
import WhatsAppMessages from '@/lib/whatsapp/optimized-messages'

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <section className="bg-gradient-to-br from-orange-600 to-red-600 text-white py-16">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-4xl md:text-5xl font-black mb-4">
                        🏪 Nuestra Historia
                    </h1>
                    <p className="text-xl text-orange-100 max-w-2xl mx-auto">
                        Conoce la pasión detrás de los mejores hot dogs de Monterrey
                    </p>
                </div>
            </section>

            {/* Historia */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-4">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-3xl font-bold text-gray-900 mb-6">
                                Desde 2019, cocinando con ❤️
                            </h2>
                            <div className="prose prose-lg text-gray-700">
                                <p className="mb-4">
                                    Todo comenzó con una simple idea: <strong>hacer los hot dogs más sabrosos de Monterrey</strong>.
                                    En 2019, en una pequeña cocina familiar, empezamos a experimentar con recetas tradicionales
                                    americanas y sabores 100% mexicanos.
                                </p>
                                <p className="mb-4">
                                    Lo que nos diferencia es nuestro <strong>compromiso con la calidad</strong>. Cada salchicha
                                    es seleccionada cuidadosamente, cada pan es horneado fresh diariamente, y cada ingrediente
                                    pasa por nuestros estrictos estándares de frescura.
                                </p>
                                <p className="mb-6">
                                    Hoy, después de más de <strong>1,500 clientes satisfechos</strong>, seguimos siendo una
                                    empresa familiar que pone el corazón en cada hot dog que preparamos.
                                </p>
                            </div>

                            <div className="grid grid-cols-3 gap-4 mb-6">
                                <div className="text-center p-4 bg-orange-50 rounded-xl">
                                    <div className="text-2xl font-bold text-orange-600">5+</div>
                                    <div className="text-sm text-gray-600">Años de experiencia</div>
                                </div>
                                <div className="text-center p-4 bg-orange-50 rounded-xl">
                                    <div className="text-2xl font-bold text-orange-600">1,500+</div>
                                    <div className="text-sm text-gray-600">Clientes felices</div>
                                </div>
                                <div className="text-center p-4 bg-orange-50 rounded-xl">
                                    <div className="text-2xl font-bold text-orange-600">4.8★</div>
                                    <div className="text-sm text-gray-600">Calificación promedio</div>
                                </div>
                            </div>
                        </div>

                        <div className="relative">
                            {/* <Image
                                src="https://images.unsplash.com/photo-1551782450-a2132b4ba21d?w=600&h=400&fit=crop"
                                alt="Cocinando hot dogs con amor"
                                width={600}
                                height={400}
                                className="rounded-2xl shadow-xl"
                            /> */}
                            <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-lg border border-gray-200">
                                <div className="text-sm text-gray-600">👨‍🍳 Chef Roberto</div>
                                <div className="font-bold text-gray-900">"Cada hot dog es una obra de arte"</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Misión y Visión */}
            <section className="py-16 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">
                            🎯 Misión & Visión
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                        <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200">
                            <div className="text-4xl mb-4">🎯</div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">Nuestra Misión</h3>
                            <p className="text-gray-700 leading-relaxed">
                                Brindar la mejor experiencia gastronómica de hot dogs en Monterrey,
                                combinando sabores auténticos, ingredientes frescos y un servicio
                                excepcional que haga sonreír a nuestros clientes.
                            </p>
                        </div>

                        <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200">
                            <div className="text-4xl mb-4">🌟</div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">Nuestra Visión</h3>
                            <p className="text-gray-700 leading-relaxed">
                                Ser la doguería número 1 de Nuevo León, reconocida por la calidad,
                                innovación y el amor que ponemos en cada preparación, expandiendo
                                nuestra familia a toda la región.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Valores */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">
                            💎 Nuestros Valores
                        </h2>
                        <p className="text-xl text-gray-600">
                            Lo que nos guía cada día
                        </p>
                    </div>

                    <div className="grid md:grid-cols-4 gap-6">
                        <div className="text-center p-6 rounded-xl bg-gradient-to-br from-orange-50 to-red-50 border border-orange-200">
                            <div className="text-4xl mb-4">🥩</div>
                            <h3 className="text-lg font-bold text-gray-900 mb-2">Calidad</h3>
                            <p className="text-gray-600 text-sm">
                                Solo los mejores ingredientes llegan a tu mesa
                            </p>
                        </div>

                        <div className="text-center p-6 rounded-xl bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200">
                            <div className="text-4xl mb-4">⚡</div>
                            <h3 className="text-lg font-bold text-gray-900 mb-2">Rapidez</h3>
                            <p className="text-gray-600 text-sm">
                                Tu tiempo es valioso, respetamos cada minuto
                            </p>
                        </div>

                        <div className="text-center p-6 rounded-xl bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-200">
                            <div className="text-4xl mb-4">❤️</div>
                            <h3 className="text-lg font-bold text-gray-900 mb-2">Pasión</h3>
                            <p className="text-gray-600 text-sm">
                                Amor genuino por lo que hacemos cada día
                            </p>
                        </div>

                        <div className="text-center p-6 rounded-xl bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-200">
                            <div className="text-4xl mb-4">🤝</div>
                            <h3 className="text-lg font-bold text-gray-900 mb-2">Confianza</h3>
                            <p className="text-gray-600 text-sm">
                                Relaciones duraderas con cada cliente
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Equipo */}
            <section className="py-16 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">
                            👥 Nuestro Equipo
                        </h2>
                        <p className="text-xl text-gray-600">
                            Las personas que hacen posible cada sonrisa
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                        <div className="bg-white p-6 rounded-2xl shadow-lg text-center border border-gray-200">
                            <div className="w-20 h-20 bg-gradient-to-br from-orange-400 to-red-400 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-2xl font-bold">
                                RC
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">Roberto Castillo</h3>
                            <p className="text-orange-600 font-semibold mb-3">Chef Principal & Fundador</p>
                            <p className="text-gray-600 text-sm">
                                5+ años perfeccionando recetas. Su pasión por los sabores mexicanos
                                se refleja en cada creación.
                            </p>
                        </div>

                        <div className="bg-white p-6 rounded-2xl shadow-lg text-center border border-gray-200">
                            <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-400 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-2xl font-bold">
                                MG
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">María González</h3>
                            <p className="text-green-600 font-semibold mb-3">Gerente de Operaciones</p>
                            <p className="text-gray-600 text-sm">
                                Asegura que cada pedido salga perfecto y a tiempo.
                                La eficiencia es su superpoder.
                            </p>
                        </div>

                        <div className="bg-white p-6 rounded-2xl shadow-lg text-center border border-gray-200">
                            <div className="w-20 h-20 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-2xl font-bold">
                                JS
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">Javier Sánchez</h3>
                            <p className="text-blue-600 font-semibold mb-3">Atención al Cliente</p>
                            <p className="text-gray-600 text-sm">
                                Tu contacto principal por WhatsApp. Siempre dispuesto
                                a ayudarte con una sonrisa.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA - UPDATED WITH WHATSAPP */}
            <section className="bg-gradient-to-r from-orange-600 to-red-600 py-16">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold text-white mb-6">
                        ¿Te gustaría formar parte de nuestra historia?
                    </h2>
                    <p className="text-xl text-orange-100 mb-8 max-w-2xl mx-auto">
                        Cada pedido nos ayuda a seguir creciendo y mejorando para ti
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a
                            href={WhatsAppMessages.aboutFirstOrder()}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block"
                        >
                            <Button variant="primary" vertical="restaurant" className="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white font-black text-lg px-10 py-4 rounded-xl shadow-xl hover:scale-105 transition-all duration-300">
                                📱 Hacer tu Primer Pedido
                            </Button>
                        </a>
                        <Link href="/productos" className="inline-block">
                            <Button variant="secondary" vertical="restaurant" className="w-full sm:w-auto bg-white text-orange-600 hover:bg-orange-50 font-black text-lg px-10 py-4 rounded-xl shadow-xl hover:scale-105 transition-all duration-300">
                                🍽️ Ver Nuestro Menú
                            </Button>
                        </Link>
                    </div>

                    {/* Información adicional */}
                    <div className="mt-6 text-orange-200">
                        <p className="text-sm">📱 +52 81 2574 0347 • 🕐 Lun-Dom 11:00 AM - 10:00 PM • 🚚 Entrega 20-30 min</p>
                    </div>
                </div>
            </section>
        </div>
    )
}