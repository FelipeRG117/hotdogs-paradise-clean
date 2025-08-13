'use client'

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg'
  color?: 'orange' | 'white' | 'gray'
  text?: string
  fullScreen?: boolean
}

export function LoadingSpinner({ 
  size = 'md', 
  color = 'orange', 
  text,
  fullScreen = false 
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  }

  const colorClasses = {
    orange: 'border-orange-600',
    white: 'border-white',
    gray: 'border-gray-600'
  }

  const spinner = (
    <div className="flex flex-col items-center justify-center space-y-3">
      <div
        className={`${sizeClasses[size]} ${colorClasses[color]} border-2 border-t-transparent rounded-full animate-spin`}
      />
      {text && (
        <p className={`text-sm ${color === 'white' ? 'text-white' : 'text-gray-600'}`}>
          {text}
        </p>
      )}
    </div>
  )

  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-white bg-opacity-90 flex items-center justify-center z-50">
        {spinner}
      </div>
    )
  }

  return spinner
}

// Skeleton Loading Components
export function ProductCardSkeleton() {
  return (
    <div className="w-full max-w-md border border-gray-200 rounded-lg shadow-md p-4 animate-pulse">
      <div className="w-full h-48 bg-gray-200 rounded-t-lg mb-4"></div>
      <div className="space-y-3">
        <div className="h-6 bg-gray-200 rounded w-3/4"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        <div className="h-10 bg-gray-200 rounded w-full"></div>
      </div>
    </div>
  )
}

export function CartItemSkeleton() {
  return (
    <div className="flex items-start space-x-4 py-4 animate-pulse">
      <div className="flex-shrink-0 w-16 h-16 bg-gray-200 rounded-lg"></div>
      <div className="flex-1 min-w-0 space-y-2">
        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        <div className="h-3 bg-gray-200 rounded w-1/2"></div>
        <div className="h-3 bg-gray-200 rounded w-1/4"></div>
      </div>
      <div className="flex flex-col space-y-2">
        <div className="w-4 h-4 bg-gray-200 rounded"></div>
        <div className="w-12 h-6 bg-gray-200 rounded"></div>
      </div>
    </div>
  )
}
