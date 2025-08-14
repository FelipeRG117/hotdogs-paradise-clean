"use client"

import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import Image from 'next/image'

// Simulando datos de productos
const initialProducts = [
    {
        id: 'clasico-americano',
        name: 'Clásico Americano',
        basePrice: 45,
        image: 'https://images.unsplash.com/photo-1612392062798-2510380f4aaa?w=400&h=300&fit=crop',
        description: 'Hot dog tradicional con salchicha de res, pan tostado, ketchup, mostaza y cebolla picada.',
        category: 'clasicos',
        available: true
    },
    {
        id: 'mexicano-picoso',
        name: 'Mexicano Picoso',
        basePrice: 55,
        image: 'https://images.unsplash.com/photo-1599599810694-57a2ca8276a8?w=400&h=300&fit=crop',
        description: 'Salchicha enchilada, guacamole fresco, jalapeños, queso Oaxaca derretido.',
        category: 'mexicanos',
        available: true
    },
    {
        id: 'gourmet-trufa',
        name: 'Gourmet de Trufa',
        basePrice: 85,
        image: 'https://images.unsplash.com/photo-1551782450-17144efb9c50?w=400&h=300&fit=crop',
        description: 'Salchicha artesanal de pavo, queso gruyere, cebolla morada, arúgula fresca.',
        category: 'gourmet',
        available: false
    }
]

interface Product {
    id: string
    name: string
    basePrice: number
    image: string
    description: string
    category: string
    available: boolean
}

export default function AdminDemoPage() {
    const [products, setProducts] = useState<Product[]>(initialProducts)
    const [isEditing, setIsEditing] = useState<string | null>(null)
    const [showAddForm, setShowAddForm] = useState(false)
    const [formData, setFormData] = useState<Partial<Product>>({})

    // Demo: Actualizar producto
    const updateProduct = (id: string, updates: Partial<Product>) => {
        setProducts(prev => prev.map(product =>
            product.id === id ? { ...product, ...updates } : product
        ))
        setIsEditing(null)

        // Simular notificación de éxito
        setTimeout(() => {
            alert('✅ Producto actualizado exitosamente!\n\nLos cambios se reflejarán en la página web inmediatamente.')
        }, 500)
    }

    // Demo: Eliminar producto
    const deleteProduct = (id: string) => {
        if (confirm('¿Estás seguro de eliminar este producto?\n\nEsta acción no se puede deshacer.')) {
            setProducts(prev => prev.filter(product => product.id !== id))
            alert('🗑️ Producto eliminado exitosamente!')
        }
    }

    // Demo: Agregar nuevo producto
    const addProduct = () => {
        if (!formData.name || !formData.basePrice) {
            alert('⚠️ Por favor completa todos los campos obligatorios')
            return
        }

        const newProduct: Product = {
            id: `new-${Date.now()}`,
            name: formData.name || '',
            basePrice: formData.basePrice || 0,
            image: formData.image || 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop',
            description: formData.description || '',
            category: formData.category || 'clasicos',
            available: true
        }

        setProducts(prev => [...prev, newProduct])
        setFormData({})
        setShowAddForm(false)

        alert('🎉 ¡Nuevo producto agregado exitosamente!\n\nYa está disponible en tu menú.')
    }

    // Demo: Toggle disponibilidad
    const toggleAvailability = (id: string) => {
        const product = products.find(p => p.id === id)
        if (product) {
            updateProduct(id, { available: !product.available })
        }
    }

    return (
        <div className="min-h-screen bg-gray-50 p-4">
            {/* Header */}
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-black text-gray-900 mb-2">
                            🛠️ Panel de Administración
                        </h1>
                        <p className="text-gray-600">Gestiona tu menú de manera fácil y rápida</p>
                    </div>
                    <div className="text-right">
                        <div className="text-sm text-gray-500">Doguería El Sabor</div>
                        <div className="text-lg font-bold text-green-600">🟢 En línea</div>
                    </div>
                </div>


            </div>

            {/* Estadísticas Rápidas */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                            <span className="text-2xl">📊</span>
                        </div>
                        <div>
                            <div className="text-2xl font-bold text-gray-900">{products.length}</div>
                            <div className="text-gray-600 text-sm">Total Productos</div>
                        </div>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                            <span className="text-2xl">✅</span>
                        </div>
                        <div>
                            <div className="text-2xl font-bold text-green-600">
                                {products.filter(p => p.available).length}
                            </div>
                            <div className="text-gray-600 text-sm">Disponibles</div>
                        </div>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                            <span className="text-2xl">❌</span>
                        </div>
                        <div>
                            <div className="text-2xl font-bold text-red-600">
                                {products.filter(p => !p.available).length}
                            </div>
                            <div className="text-gray-600 text-sm">No Disponibles</div>
                        </div>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                            <span className="text-2xl">💰</span>
                        </div>
                        <div>
                            <div className="text-2xl font-bold text-orange-600">
                                ${Math.round(products.reduce((sum, p) => sum + p.basePrice, 0) / products.length)}
                            </div>
                            <div className="text-gray-600 text-sm">Precio Promedio</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Acciones Principales */}
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
                <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
                    <h2 className="text-2xl font-bold text-gray-900">🍽️ Gestión de Productos</h2>
                    <Button variant='primary'
                        onClick={() => setShowAddForm(true)}
                        className="bg-green-600 hover:bg-green-700 text-white font-bold px-6 py-3 rounded-xl shadow-lg hover:scale-105 transition-all duration-300"
                    >
                        ➕ Agregar Producto
                    </Button>
                </div>
            </div>

            {/* Formulario Agregar Producto */}
            {showAddForm && (
                <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border-2 border-green-200">
                    <h3 className="text-xl font-bold text-gray-900 mb-6">➕ Agregar Nuevo Producto</h3>

                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Nombre del Producto *
                            </label>
                            <input
                                type="text"
                                value={formData.name || ''}
                                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 text-black"
                                placeholder="Ej: Hot Dog Especial"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Precio Base *
                            </label>
                            <input
                                type="number"
                                value={formData.basePrice || ''}
                                onChange={(e) => setFormData(prev => ({ ...prev, basePrice: parseInt(e.target.value) }))}
                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 text-black"
                                placeholder="45"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Categoría
                            </label>
                            <select
                                value={formData.category || 'clasicos'}
                                onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 text-black"
                            >
                                <option value="clasicos">🌭 Clásicos</option>
                                <option value="mexicanos">🇲🇽 Mexicanos</option>
                                <option value="gourmet">👑 Gourmet</option>
                                <option value="vegetarianos">🥗 Vegetarianos</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                URL de Imagen
                            </label>
                            <input
                                type="url"
                                value={formData.image || ''}
                                onChange={(e) => setFormData(prev => ({ ...prev, image: e.target.value }))}
                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 text-black"
                                placeholder="https://..."
                            />
                        </div>

                        <div className="md:col-span-2">
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Descripción
                            </label>
                            <textarea
                                value={formData.description || ''}
                                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                                rows={3}
                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 text-black"
                                placeholder="Describe los ingredientes y características especiales..."
                            />
                        </div>
                    </div>

                    <div className="flex gap-4 mt-6">
                        <Button variant='primary'
                            onClick={addProduct}
                            className="bg-green-600 hover:bg-green-700 text-white font-bold px-6 py-3 rounded-xl"
                        >
                            ✅ Guardar Producto
                        </Button>
                        <Button variant='primary'
                            onClick={() => { setShowAddForm(false); setFormData({}) }}
                            className="bg-gray-500 hover:bg-gray-600 text-white font-bold px-6 py-3 rounded-xl"
                        >
                            ❌ Cancelar
                        </Button>
                    </div>
                </div>
            )}

            {/* Lista de Productos */}
            <div className="space-y-6">
                {products.map((product) => (
                    <div key={product.id} className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200">
                        <div className="p-6">
                            <div className="flex flex-col lg:flex-row gap-6">
                                {/* Imagen del Producto */}
                                <div className="lg:w-48 flex-shrink-0">
                                    <div className="relative w-full h-48 lg:h-32 bg-gray-100 rounded-xl overflow-hidden">
                                        {/* <Image
                                            src={product.image}
                                            alt={product.name}
                                            width={400}
                                            height={300}
                                            className="w-full h-full object-cover"
                                        /> */}
                                        <div className="absolute top-3 right-3">
                                            <span className={`px-3 py-1 rounded-full text-xs font-bold ${product.available
                                                ? 'bg-green-500 text-white'
                                                : 'bg-red-500 text-white'
                                                }`}>
                                                {product.available ? '✅ Disponible' : '❌ No Disponible'}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Información del Producto */}
                                <div className="flex-grow">
                                    {isEditing === product.id ? (
                                        // Modo Edición
                                        <div className="space-y-4">
                                            <div className="grid md:grid-cols-2 gap-4">
                                                <div>
                                                    <label className="block text-sm font-semibold text-gray-700 mb-1">Nombre</label>
                                                    <input
                                                        type="text"
                                                        defaultValue={product.name}
                                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                                                        onBlur={(e) => updateProduct(product.id, { name: e.target.value })}
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-semibold text-gray-700 mb-1">Precio</label>
                                                    <input
                                                        type="number"
                                                        defaultValue={product.basePrice}
                                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                                                        onBlur={(e) => updateProduct(product.id, { basePrice: parseInt(e.target.value) })}
                                                    />
                                                </div>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-semibold text-gray-700 mb-1">Descripción</label>
                                                <textarea
                                                    defaultValue={product.description}
                                                    rows={2}
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                                                    onBlur={(e) => updateProduct(product.id, { description: e.target.value })}
                                                />
                                            </div>
                                        </div>
                                    ) : (
                                        // Modo Vista
                                        <div>
                                            <div className="flex items-start justify-between mb-3">
                                                <h3 className="text-xl font-bold text-gray-900">{product.name}</h3>
                                                <div className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-red-500 bg-clip-text text-transparent">
                                                    ${product.basePrice}
                                                </div>
                                            </div>

                                            <p className="text-gray-600 mb-4 leading-relaxed">{product.description}</p>

                                            <div className="flex items-center gap-3 mb-4">
                                                <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm font-semibold">
                                                    {product.category}
                                                </span>
                                                <span className="text-sm text-gray-500">ID: {product.id}</span>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Acciones */}
                                <div className="lg:w-48 flex-shrink-0">
                                    <div className="space-y-3">
                                        {isEditing === product.id ? (
                                            <Button variant='primary'
                                                onClick={() => setIsEditing(null)}
                                                className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg"
                                            >
                                                ✅ Guardar
                                            </Button>
                                        ) : (
                                            <Button variant='primary'
                                                onClick={() => setIsEditing(product.id)}
                                                className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded-lg"
                                            >
                                                ✏️ Editar
                                            </Button>
                                        )}

                                        <Button variant='primary'
                                            onClick={() => toggleAvailability(product.id)}
                                            className={`w-full font-bold py-2 px-4 rounded-lg ${product.available
                                                ? 'bg-yellow-600 hover:bg-yellow-700 text-white'
                                                : 'bg-green-600 hover:bg-green-700 text-white'
                                                }`}
                                        >
                                            {product.available ? '⏸️ Pausar' : '▶️ Activar'}
                                        </Button>

                                        <Button
                                            variant='primary'
                                            onClick={() => deleteProduct(product.id)}
                                            className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg"
                                        >
                                            🗑️ Eliminar
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Footer Informativo */}
            <div className="mt-12 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 border border-blue-200">
                <h3 className="text-lg font-bold text-gray-900 mb-4">ℹ️ Información del Sistema</h3>
                <div className="grid md:grid-cols-2 gap-6 text-sm">
                    <div>
                        <h4 className="font-semibold text-gray-700 mb-2">✨ Funcionalidades Incluidas:</h4>
                        <ul className="space-y-1 text-gray-600">
                            <li>• ➕ Agregar productos nuevos</li>
                            <li>• ✏️ Editar información en tiempo real</li>
                            <li>• ⏸️ Pausar/activar productos</li>
                            <li>• 🗑️ Eliminar productos</li>
                            <li>• 📊 Estadísticas automáticas</li>
                            <li>• 🔄 Sincronización inmediata con la web</li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold text-gray-700 mb-2">🚀 Próximas Funcionalidades:</h4>
                        <ul className="space-y-1 text-gray-600">
                            <li>• 📈 Reportes de ventas</li>
                            <li>• 🏷️ Gestión de promociones</li>
                            <li>• 👥 Análisis de clientes</li>
                            <li>• 📱 App móvil para gestión</li>
                            <li>• 🔔 Notificaciones en tiempo real</li>
                            <li>• 💳 Integración con pagos</li>
                        </ul>
                    </div>
                </div>

                <div className="mt-6 p-4 bg-white rounded-xl border border-blue-200">
                    <div className="flex items-center gap-3">
                        <span className="text-2xl">💡</span>
                        <div>
                            <div className="font-bold text-gray-900">¿Necesitas ayuda?</div>
                            <div className="text-gray-600">
                                Incluimos capacitación completa y soporte técnico 24/7 para que manejes tu negocio sin preocupaciones.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}