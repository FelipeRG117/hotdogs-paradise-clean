'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/Button'

interface ProductFiltersProps {
    categories: string[]
    selectedCategory: string
    onCategoryChange: (category: string) => void
    productCount: number
}

export function ProductFilters({
    categories,
    selectedCategory,
    onCategoryChange,
    productCount
}: ProductFiltersProps) {
    const [isExpanded, setIsExpanded] = useState(false)
    const [displayCount, setDisplayCount] = useState(0)
    const [isHydrated, setIsHydrated] = useState(false)

    // Fix hydration mismatch by only showing count after client hydration
    useEffect(() => {
        setIsHydrated(true)
        setDisplayCount(productCount)
    }, [])

    // Update count when productCount changes
    useEffect(() => {
        if (isHydrated) {
            setDisplayCount(productCount)
        }
    }, [productCount, isHydrated])

    return (
        <div className="bg-white rounded-2xl shadow-lg border-0 p-6 mb-8 overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center shadow-lg">
                            <span className="text-white text-lg">🔍</span>
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-gray-900">Filtros</h3>
                            <p className="text-sm text-gray-600">
                                {isHydrated ? `${displayCount} producto${displayCount !== 1 ? 's' : ''} encontrado${displayCount !== 1 ? 's' : ''}` : ''}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Mobile Toggle */}
                <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="md:hidden bg-orange-100 hover:bg-orange-200 text-orange-600 w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110"
                >
                    <span className="text-lg">{isExpanded ? '▲' : '▼'}</span>
                </button>
            </div>

            {/* Filters Content */}
            <div className={`${isExpanded ? 'block' : 'hidden'} md:block transition-all duration-300`}>
                <div className="space-y-6">
                    {/* Category Filters */}
                    <div>
                        <h4 className="text-sm font-semibold text-gray-800 mb-4 flex items-center gap-2">
                            <span className="text-lg">🏷️</span>
                            Categorías
                        </h4>

                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3">
                            {/* All Products Button */}
                            <button
                                onClick={() => onCategoryChange('')}
                                className={`group relative overflow-hidden rounded-xl p-4 text-center transition-all duration-300 transform hover:scale-105 ${selectedCategory === ''
                                    ? 'bg-gradient-to-br from-orange-500 to-red-500 text-white shadow-xl ring-4 ring-orange-200'
                                    : 'bg-gradient-to-br from-gray-50 to-gray-100 text-gray-700 hover:from-orange-50 hover:to-orange-100 hover:text-orange-600 shadow-md hover:shadow-lg'
                                    }`}
                            >
                                <div className="text-2xl mb-2">🌭</div>
                                <div className="text-sm font-semibold">Todos</div>
                                <div className="text-xs opacity-75">({categories.length + 1})</div>

                                {selectedCategory === '' && (
                                    <div className="absolute inset-0 bg-white/10 animate-pulse"></div>
                                )}
                            </button>

                            {/* Category Buttons */}
                            {categories.map((category) => {
                                const emoji = getCategoryEmoji(category)
                                const isSelected = selectedCategory === category

                                return (
                                    <button
                                        key={category}
                                        onClick={() => onCategoryChange(category)}
                                        className={`group relative overflow-hidden rounded-xl p-4 text-center transition-all duration-300 transform hover:scale-105 ${isSelected
                                            ? 'bg-gradient-to-br from-orange-500 to-red-500 text-white shadow-xl ring-4 ring-orange-200'
                                            : 'bg-gradient-to-br from-gray-50 to-gray-100 text-gray-700 hover:from-orange-50 hover:to-orange-100 hover:text-orange-600 shadow-md hover:shadow-lg'
                                            }`}
                                    >
                                        <div className="text-2xl mb-2 group-hover:scale-110 transition-transform duration-300">
                                            {emoji}
                                        </div>
                                        <div className="text-sm font-semibold truncate">{category}</div>
                                        <div className="text-xs opacity-75">({Math.floor(Math.random() * 8) + 2})</div>

                                        {isSelected && (
                                            <div className="absolute inset-0 bg-white/10 animate-pulse"></div>
                                        )}
                                    </button>
                                )
                            })}
                        </div>
                    </div>

                    {/* Additional Filters */}
                    <div className="grid md:grid-cols-3 gap-6 pt-6 border-t border-gray-100">
                        {/* Price Range */}
                        <div>
                            <h4 className="text-sm font-semibold text-gray-800 mb-3 flex items-center gap-2">
                                <span className="text-lg">💰</span>
                                Rango de Precio
                            </h4>
                            <div className="space-y-2">
                                {['$50-$80', '$81-$120', '$121+'].map((range) => (
                                    <button
                                        key={range}
                                        className="w-full text-left px-3 py-2 text-sm text-gray-600 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-all duration-200"
                                    >
                                        {range}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Preparation Time */}
                        <div>
                            <h4 className="text-sm font-semibold text-gray-800 mb-3 flex items-center gap-2">
                                <span className="text-lg">⏱️</span>
                                Tiempo de Prep.
                            </h4>
                            <div className="space-y-2">
                                {['5-15 min', '15-25 min', '25+ min'].map((time) => (
                                    <button
                                        key={time}
                                        className="w-full text-left px-3 py-2 text-sm text-gray-600 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-all duration-200"
                                    >
                                        {time}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Special Features */}
                        <div>
                            <h4 className="text-sm font-semibold text-gray-800 mb-3 flex items-center gap-2">
                                <span className="text-lg">✨</span>
                                Características
                            </h4>
                            <div className="space-y-2">
                                {['🔥 Popular', '✨ Nuevo', '🌱 Vegetariano'].map((feature) => (
                                    <button
                                        key={feature}
                                        className="w-full text-left px-3 py-2 text-sm text-gray-600 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-all duration-200"
                                    >
                                        {feature}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Clear Filters */}
                    {selectedCategory && (
                        <div className="pt-6 border-t border-gray-100">
                            <button
                                onClick={() => onCategoryChange('')}
                                className="flex items-center gap-2 text-sm text-red-600 hover:text-red-700 font-medium bg-red-50 hover:bg-red-100 px-4 py-2 rounded-lg transition-all duration-300 hover:scale-105"
                            >
                                <span className="text-lg">🗑️</span>
                                Limpiar Filtros
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Quick Actions */}
            <div className="mt-6 pt-6 border-t border-gray-100">
                <div className="flex flex-wrap gap-3">
                    <button className="flex items-center gap-2 bg-gradient-to-r from-blue-50 to-blue-100 text-blue-700 px-4 py-2 rounded-lg text-sm font-medium hover:from-blue-100 hover:to-blue-200 transition-all duration-300 hover:scale-105">
                        <span>🔥</span>
                        Más Populares
                    </button>
                    <button className="flex items-center gap-2 bg-gradient-to-r from-green-50 to-green-100 text-green-700 px-4 py-2 rounded-lg text-sm font-medium hover:from-green-100 hover:to-green-200 transition-all duration-300 hover:scale-105">
                        <span>⚡</span>
                        Preparación Rápida
                    </button>
                    <button className="flex items-center gap-2 bg-gradient-to-r from-purple-50 to-purple-100 text-purple-700 px-4 py-2 rounded-lg text-sm font-medium hover:from-purple-100 hover:to-purple-200 transition-all duration-300 hover:scale-105">
                        <span>✨</span>
                        Nuevos
                    </button>
                </div>
            </div>
        </div>
    )
}

// Helper function to get emoji for category
function getCategoryEmoji(category: string): string {
    const emojiMap: Record<string, string> = {
        'Hot Dogs': '🌭',
        'Acompañamientos': '🍟',
        'Bebidas': '🥤',
        'Postres': '🍰',
        'Salsas': '🌶️',
        'Extras': '➕'
    }

    return emojiMap[category] || '🍽️'
}