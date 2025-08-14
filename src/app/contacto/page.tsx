import Link from "next/link"
import { Button } from "@/components/ui/Button"
import WhatsAppMessages from '@/lib/whatsapp/optimized-messages'

export default function ContactPage() {
    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <section className="bg-gradient-to-br from-green-600 to-emerald-600 text-white py-16">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-4xl md:text-5xl font-black mb-4">
                        📱 Contáctanos
                    </h1>
                    <p className="text-xl text-green-100 max-w-2xl mx-auto">
                        Estamos aquí para servirte. ¡Tu hot dog perfecto está a un mensaje de distancia!
                    </p>
                </div>
            </section>

            {/* WhatsApp Principal - UPDATED */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                        <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-8 rounded-3xl shadow-2xl mb-12">
                            <div className="text-center">
                                <div className="text-6xl mb-6">📱</div>
                                <h2 className="text-3xl font-bold mb-4">WhatsApp - La forma más fácil</h2>
                                <p className="text-xl text-green-100 mb-8">
                                    Sin apps complicadas, sin registros. Solo envía un mensaje y listo.
                                </p>

                                <a
                                    href={WhatsAppMessages.contactMain()}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-block"
                                >
                                    <Button variant="secondary" vertical="restaurant" className="bg-white text-green-600 hover:bg-green-50 font-black text-2xl px-12 py-6 rounded-2xl shadow-xl hover:scale-110 transition-all duration-300">
                                        💬 Abrir WhatsApp
                                    </Button>
                                </a>

                                <div className="mt-6 text-green-200">
                                    <p className="text-lg font-semibold">📞 +52 81 2574 0347</p>
                                    <p className="text-sm">Respuesta promedio: menos de 2 minutos</p>
                                </div>
                            </div>
                        </div>

                        {/* Información de Contacto */}
                        <div className="grid md:grid-cols-2 gap-8 mb-12">
                            <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200">
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                                        <span className="text-2xl">📍</span>
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-gray-900">Ubicación</h3>
                                        <p className="text-gray-600">Área de servicio</p>
                                    </div>
                                </div>
                                <div className="space-y-3 text-gray-700">
                                    <p><strong>Entregamos en:</strong></p>
                                    <ul className="list-disc list-inside space-y-1 ml-4">
                                        <li>Monterrey Centro</li>
                                        <li>San Nicolás de los Garza</li>
                                        <li>Ciudad General Escobedo</li>
                                        <li>Guadalupe</li>
                                        <li>Santa Catarina</li>
                                    </ul>
                                    <p className="text-sm text-green-600 font-semibold mt-4">
                                        🚚 Entrega gratuita en pedidos mayores a $100
                                    </p>
                                </div>
                            </div>

                            <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200">
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                                        <span className="text-2xl">🕒</span>
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-gray-900">Horarios</h3>
                                        <p className="text-gray-600">Siempre listos para ti</p>
                                    </div>
                                </div>
                                <div className="space-y-3 text-gray-700">
                                    <div className="flex justify-between">
                                        <span>Lunes - Jueves:</span>
                                        <span className="font-semibold">11:00 AM - 10:00 PM</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Viernes - Sábado:</span>
                                        <span className="font-semibold">11:00 AM - 11:00 PM</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Domingo:</span>
                                        <span className="font-semibold">12:00 PM - 9:00 PM</span>
                                    </div>
                                    <p className="text-sm text-orange-600 font-semibold mt-4">
                                        ⚡ Tiempo promedio de entrega: 20-30 minutos
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Formas de Pago */}
                        <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200 mb-12">
                            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">💳 Formas de Pago</h3>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                <div className="text-center p-4 bg-gray-50 rounded-xl">
                                    <div className="text-3xl mb-2">💵</div>
                                    <div className="text-sm font-semibold text-gray-900">Efectivo</div>
                                    <div className="text-xs text-gray-600">Al recibir</div>
                                </div>
                                <div className="text-center p-4 bg-gray-50 rounded-xl">
                                    <div className="text-3xl mb-2">💳</div>
                                    <div className="text-sm font-semibold text-gray-900">Tarjeta</div>
                                    <div className="text-xs text-gray-600">Terminal móvil</div>
                                </div>
                                <div className="text-center p-4 bg-gray-50 rounded-xl">
                                    <div className="text-3xl mb-2">📱</div>
                                    <div className="text-sm font-semibold text-gray-900">Transferencia</div>
                                    <div className="text-xs text-gray-600">SPEI/OXXO</div>
                                </div>
                                <div className="text-center p-4 bg-gray-50 rounded-xl">
                                    <div className="text-3xl mb-2">🏦</div>
                                    <div className="text-sm font-semibold text-gray-900">Depósito</div>
                                    <div className="text-xs text-gray-600">Bancomer/OXXO</div>
                                </div>
                            </div>
                        </div>

                        {/* Proceso de Pedido */}
                        <div className="bg-gradient-to-br from-orange-50 to-red-50 p-8 rounded-2xl border border-orange-200 mb-12">
                            <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
                                🚀 ¿Cómo hacer tu pedido?
                            </h3>

                            <div className="grid md:grid-cols-4 gap-6">
                                <div className="text-center">
                                    <div className="w-16 h-16 bg-orange-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                                        1
                                    </div>
                                    <h4 className="font-bold text-gray-900 mb-2">Envía mensaje</h4>
                                    <p className="text-sm text-gray-600">
                                        Escribe por WhatsApp o llama directamente
                                    </p>
                                </div>

                                <div className="text-center">
                                    <div className="w-16 h-16 bg-orange-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                                        2
                                    </div>
                                    <h4 className="font-bold text-gray-900 mb-2">Elige tu hot dog</h4>
                                    <p className="text-sm text-gray-600">
                                        Te enviamos el menú y personalizas tu pedido
                                    </p>
                                </div>

                                <div className="text-center">
                                    <div className="w-16 h-16 bg-orange-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                                        3
                                    </div>
                                    <h4 className="font-bold text-gray-900 mb-2">Confirma detalles</h4>
                                    <p className="text-sm text-gray-600">
                                        Dirección, forma de pago y hora de entrega
                                    </p>
                                </div>

                                <div className="text-center">
                                    <div className="w-16 h-16 bg-orange-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                                        4
                                    </div>
                                    <h4 className="font-bold text-gray-900 mb-2">¡Disfruta!</h4>
                                    <p className="text-sm text-gray-600">
                                        Entrega en 20-30 min, caliente y delicioso
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Preguntas Frecuentes */}
                        <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200">
                            <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">❓ Preguntas Frecuentes</h3>

                            <div className="space-y-6">
                                <div className="border-b border-gray-200 pb-4">
                                    <h4 className="font-bold text-gray-900 mb-2">¿Cuál es el monto mínimo de pedido?</h4>
                                    <p className="text-gray-600">No hay monto mínimo. Sin embargo, la entrega es gratuita en pedidos mayores a $100.</p>
                                </div>

                                <div className="border-b border-gray-200 pb-4">
                                    <h4 className="font-bold text-gray-900 mb-2">¿Hasta qué hora entregan?</h4>
                                    <p className="text-gray-600">Nuestro último pedido se toma 30 minutos antes del cierre (según el día de la semana).</p>
                                </div>

                                <div className="border-b border-gray-200 pb-4">
                                    <h4 className="font-bold text-gray-900 mb-2">¿Puedo personalizar mi hot dog?</h4>
                                    <p className="text-gray-600">¡Por supuesto! Puedes quitar o agregar cualquier ingrediente. Solo menciona tus preferencias en el pedido.</p>
                                </div>

                                <div className="border-b border-gray-200 pb-4">
                                    <h4 className="font-bold text-gray-900 mb-2">¿Manejan opciones vegetarianas?</h4>
                                    <p className="text-gray-600">Sí, tenemos salchichas veganas y opciones completamente vegetarianas. ¡Pregunta por nuestro "Vegetariano Supreme"!</p>
                                </div>

                                <div>
                                    <h4 className="font-bold text-gray-900 mb-2">¿Qué pasa si no me gusta mi pedido?</h4>
                                    <p className="text-gray-600">Tu satisfacción es nuestra prioridad. Si algo no está perfecto, contáctanos inmediatamente y lo solucionamos.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Final - UPDATED WITH WHATSAPP */}
            <section className="bg-gradient-to-r from-green-600 to-emerald-600 py-16">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold text-white mb-6">
                        ¿Listo para tu hot dog perfecto? 🌭
                    </h2>
                    <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
                        Nuestro equipo está esperando tu mensaje para prepararte algo delicioso
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a
                            href={WhatsAppMessages.contactSupport()}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block"
                        >
                            <Button variant="primary" vertical="restaurant" className="w-full sm:w-auto bg-white text-green-600 hover:bg-green-50 font-black text-xl px-10 py-5 rounded-2xl shadow-xl hover:scale-110 transition-all duration-300">
                                📱 Contactar por WhatsApp
                            </Button>
                        </a>
                        <Link href="/productos" className="inline-block">
                            <Button variant="secondary" vertical="restaurant" className="w-full sm:w-auto bg-green-700 hover:bg-green-800 text-white font-black text-xl px-10 py-5 rounded-2xl shadow-xl hover:scale-110 transition-all duration-300">
                                🍽️ Ver Menú Primero
                            </Button>
                        </Link>
                    </div>

                    <div className="mt-8 text-green-200">
                        <p className="text-lg">📞 <strong>+52 81 2574 0347</strong></p>
                        <p className="text-sm">Lun-Dom • Respuesta inmediata • Entrega 20-30 min</p>
                    </div>
                </div>
            </section>
        </div>
    )
}