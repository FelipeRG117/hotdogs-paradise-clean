'use client'

import { useState, useEffect } from 'react'

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
    const [isHydrated, setIsHydrated] = useState(false)
    const [maxCategories, setMaxCategories] = useState(4) // Default for mobile

    // CRITICAL FIX: Only show dynamic content after hydration
    useEffect(() => {
        setIsHydrated(true)

        // Set max categories based on screen size after hydration
        const updateMaxCategories = () => {
            setMaxCategories(window.innerWidth >= 768 ? 8 : 4)
        }

        updateMaxCategories()
        window.addEventListener('resize', updateMaxCategories)

        return () => window.removeEventListener('resize', updateMaxCategories)
    }, [])

    return (
        <div className="bg-white rounded-2xl shadow-lg border-0 overflow-hidden mb-4 md:mb-6">
            {/* Compact Header - Always Visible on ALL devices */}
            <div className="p-4 md:p-6">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg md:rounded-xl flex items-center justify-center shadow-lg">
                            <span className="text-white text-sm md:text-lg">🔍</span>
                        </div>
                        <div>
                            <h3 className="text-lg md:text-xl font-bold text-gray-900">Filtros</h3>
                            <p className="text-xs md:text-sm text-gray-600">
                                {isHydrated ? (
                                    <>
                                        <span className="inline md:hidden">
                                            {productCount} producto{productCount !== 1 ? 's' : ''}
                                        </span>
                                        <span className="hidden md:inline">
                                            {productCount} producto{productCount !== 1 ? 's' : ''} encontrado{productCount !== 1 ? 's' : ''}
                                        </span>
                                        {selectedCategory && (
                                            <span className="ml-2 text-orange-600 font-medium">
                                                • {selectedCategory}
                                            </span>
                                        )}
                                    </>
                                ) : (
                                    'Cargando...'
                                )}
                            </p>
                        </div>
                    </div>

                    {/* Toggle Button - NOW VISIBLE ON ALL DEVICES */}
                    <button
                        onClick={() => setIsExpanded(!isExpanded)}
                        className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-lg"
                    >
                        <span className="text-sm md:text-base font-bold transform transition-transform duration-300">
                            {isExpanded ? '✕' : '⚙️'}
                        </span>
                    </button>
                </div>

                {/* Quick Category Pills - ALWAYS VISIBLE on ALL devices */}
                <div className="mt-4">
                    <div className="flex gap-2 md:gap-3 overflow-x-auto pb-2 scrollbar-hide">
                        {/* All Products Pill */}
                        <button
                            onClick={() => onCategoryChange('')}
                            className={`flex-shrink-0 px-3 py-1.5 md:px-4 md:py-2 rounded-lg text-xs md:text-sm font-medium transition-all duration-300 ${selectedCategory === ''
                                ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-md'
                                : 'bg-gray-100 text-gray-700 hover:bg-orange-100 hover:text-orange-600'
                                }`}
                        >
                            <span className="mr-1">🌭</span>
                            Todos
                        </button>

                        {/* Category Pills - FIXED: Use state instead of window */}
                        {categories.slice(0, maxCategories).map((category) => {
                            const emoji = getCategoryEmoji(category)
                            const isSelected = selectedCategory === category

                            return (
                                <button
                                    key={category}
                                    onClick={() => onCategoryChange(category)}
                                    className={`flex-shrink-0 px-3 py-1.5 md:px-4 md:py-2 rounded-lg text-xs md:text-sm font-medium transition-all duration-300 ${isSelected
                                        ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-md'
                                        : 'bg-gray-100 text-gray-700 hover:bg-orange-100 hover:text-orange-600'
                                        }`}
                                >
                                    <span className="mr-1">{emoji}</span>
                                    {category.length > 10 ? category.slice(0, 10) + '...' : category}
                                </button>
                            )
                        })}

                        {/* More indicator - FIXED: Use state */}
                        {categories.length > maxCategories && (
                            <button
                                onClick={() => setIsExpanded(true)}
                                className="flex-shrink-0 px-3 py-1.5 md:px-4 md:py-2 rounded-lg text-xs md:text-sm font-medium bg-gray-200 text-gray-600 hover:bg-orange-100 hover:text-orange-600 transition-all duration-300"
                            >
                                +{categories.length - maxCategories}
                            </button>
                        )}
                    </div>
                </div>

                {/* Clear Filter Button - Compact */}
                {selectedCategory && (
                    <div className="mt-3">
                        <button
                            onClick={() => onCategoryChange('')}
                            className="flex items-center gap-2 text-xs md:text-sm text-red-600 hover:text-red-700 font-medium bg-red-50 hover:bg-red-100 px-3 py-1.5 md:px-4 md:py-2 rounded-lg transition-all duration-300"
                        >
                            <span className="text-sm">🗑️</span>
                            Limpiar Filtro
                        </button>
                    </div>
                )}
            </div>

            {/* Expanded Filters Content - Hidden by DEFAULT on ALL devices */}
            <div className={`transition-all duration-300 overflow-hidden ${isExpanded ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'
                }`}>
                <div className="p-4 md:p-6 pt-0 border-t border-gray-100">
                    <div className="space-y-6">
                        {/* Full Category Grid - When Expanded */}
                        <div>
                            <h4 className="text-sm font-semibold text-gray-800 mb-4 flex items-center gap-2">
                                <span className="text-lg">🏷️</span>
                                Todas las Categorías
                            </h4>

                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3">
                                {/* All Products Button */}
                                <button
                                    onClick={() => {
                                        onCategoryChange('')
                                        setIsExpanded(false)
                                    }}
                                    className={`group relative overflow-hidden rounded-xl p-3 md:p-4 text-center transition-all duration-300 transform hover:scale-105 ${selectedCategory === ''
                                        ? 'bg-gradient-to-br from-orange-500 to-red-500 text-white shadow-xl ring-4 ring-orange-200'
                                        : 'bg-gradient-to-br from-gray-50 to-gray-100 text-gray-700 hover:from-orange-50 hover:to-orange-100 hover:text-orange-600 shadow-md hover:shadow-lg'
                                        }`}
                                >
                                    <div className="text-xl md:text-2xl mb-1 md:mb-2">🌭</div>
                                    <div className="text-sm font-semibold">Todos</div>
                                    <div className="text-xs opacity-75">
                                        {isHydrated ? `(${categories.length + 1})` : '(...)'}
                                    </div>

                                    {selectedCategory === '' && (
                                        <div className="absolute inset-0 bg-white/10 animate-pulse"></div>
                                    )}
                                </button>

                                {/* Category Buttons */}
                                {categories.map((category) => {
                                    const emoji = getCategoryEmoji(category)
                                    const isSelected = selectedCategory === category
                                    const staticCount = getStaticCategoryCount(category)

                                    return (
                                        <button
                                            key={category}
                                            onClick={() => {
                                                onCategoryChange(category)
                                                setIsExpanded(false)
                                            }}
                                            className={`group relative overflow-hidden rounded-xl p-3 md:p-4 text-center transition-all duration-300 transform hover:scale-105 ${isSelected
                                                ? 'bg-gradient-to-br from-orange-500 to-red-500 text-white shadow-xl ring-4 ring-orange-200'
                                                : 'bg-gradient-to-br from-gray-50 to-gray-100 text-gray-700 hover:from-orange-50 hover:to-orange-100 hover:text-orange-600 shadow-md hover:shadow-lg'
                                                }`}
                                        >
                                            <div className="text-xl md:text-2xl mb-1 md:mb-2 group-hover:scale-110 transition-transform duration-300">
                                                {emoji}
                                            </div>
                                            <div className="text-sm font-semibold truncate">{category}</div>
                                            <div className="text-xs opacity-75">
                                                {isHydrated ? `(${staticCount})` : '(...)'}
                                            </div>

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
                                    {['$40-$60', '$61-$80', '$81+'].map((range) => (
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

                        {/* Clear Filters - Expanded View */}
                        {selectedCategory && (
                            <div className="pt-6 border-t border-gray-100">
                                <button
                                    onClick={() => {
                                        onCategoryChange('')
                                        setIsExpanded(false)
                                    }}
                                    className="flex items-center gap-2 text-sm text-red-600 hover:text-red-700 font-medium bg-red-50 hover:bg-red-100 px-4 py-2 rounded-lg transition-all duration-300 hover:scale-105"
                                >
                                    <span className="text-lg">🗑️</span>
                                    Limpiar Todos los Filtros
                                </button>
                            </div>
                        )}

                        {/* Quick Actions */}
                        <div className="pt-6 border-t border-gray-100">
                            <h4 className="text-sm font-semibold text-gray-800 mb-3 flex items-center gap-2">
                                <span className="text-lg">🚀</span>
                                Acciones Rápidas
                            </h4>
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
                </div>
            </div>
        </div>
    )
}

// FIXED: Static category counts to prevent hydration mismatch
function getStaticCategoryCount(category: string): number {
    const categoryCountMap: Record<string, number> = {
        'clasicos': 3,
        'mexicanos': 2,
        'gourmet': 2,
        'vegetarianos': 1,
        'acompañamientos': 4,
        'bebidas': 3,
        'postres': 2,
        'default': 2
    }

    const normalizedCategory = category.toLowerCase()
    return categoryCountMap[normalizedCategory] || categoryCountMap['default']
}

// Helper function to get emoji for category - IMPROVED
function getCategoryEmoji(category: string): string {
    const emojiMap: Record<string, string> = {
        'clasicos': '🌭',
        'mexicanos': '🇲🇽',
        'gourmet': '👑',
        'vegetarianos': '🥗',
        'acompañamientos': '🍟',
        'bebidas': '🥤',
        'postres': '🍰',
        'salsas': '🌶️',
        'extras': '➕',
        'hot dogs': '🌭',
        'Hot Dogs': '🌭',
        'Acompañamientos': '🍟',
        'Bebidas': '🥤',
        'Postres': '🍰',
        'Salsas': '🌶️',
        'Extras': '➕'
    }

    const normalizedCategory = category.toLowerCase()
    return emojiMap[normalizedCategory] || emojiMap[category] || '🍽️'
}