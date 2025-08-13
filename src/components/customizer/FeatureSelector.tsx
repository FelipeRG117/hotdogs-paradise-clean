'use client'

import { CheckIcon } from '@heroicons/react/24/solid'

interface Option {
  id: string
  name: string
  price: number
}

interface FeatureSelectorProps {
  title: string
  type: 'radio' | 'checkbox'
  options: Option[]
  selected: string | string[]
  onChange: (value: string | string[]) => void
  required?: boolean
}

export function FeatureSelector({ 
  title, 
  type, 
  options, 
  selected, 
  onChange, 
  required = false 
}: FeatureSelectorProps) {
  
  const handleRadioChange = (optionId: string) => {
    if (type === 'radio') {
      onChange(optionId)
    }
  }

  const handleCheckboxChange = (optionId: string) => {
    if (type === 'checkbox') {
      const currentSelected = selected as string[]
      const isSelected = currentSelected.includes(optionId)
      
      if (isSelected) {
        // Remove if already selected (unless required and it's the last one)
        if (required && currentSelected.length === 1) {
          return // Don't allow removing the last required item
        }
        onChange(currentSelected.filter(id => id !== optionId))
      } else {
        // Add to selection
        onChange([...currentSelected, optionId])
      }
    }
  }

  const isOptionSelected = (optionId: string) => {
    if (type === 'radio') {
      return selected === optionId
    } else {
      return (selected as string[]).includes(optionId)
    }
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-medium text-gray-900">
          {title}
          {required && <span className="text-red-500 ml-1">*</span>}
        </h4>
        {type === 'checkbox' && (
          <span className="text-xs text-gray-500">
            Múltiple selección
          </span>
        )}
      </div>

      <div className="grid grid-cols-1 gap-2">
        {options.map((option) => {
          const isSelected = isOptionSelected(option.id)
          
          return (
            <button
              key={option.id}
              type="button"
              onClick={() => 
                type === 'radio' 
                  ? handleRadioChange(option.id)
                  : handleCheckboxChange(option.id)
              }
              className={`
                relative flex items-center justify-between p-3 rounded-lg border-2 transition-all
                ${isSelected 
                  ? 'border-orange-500 bg-orange-50 text-orange-900' 
                  : 'border-gray-200 bg-white text-gray-900 hover:border-gray-300'
                }
              `}
            >
              <div className="flex items-center space-x-3">
                {/* Selection Indicator */}
                <div className={`
                  flex items-center justify-center w-5 h-5 rounded-full border-2
                  ${isSelected 
                    ? 'border-orange-500 bg-orange-500' 
                    : 'border-gray-300'
                  }
                `}>
                  {isSelected && (
                    <CheckIcon className="w-3 h-3 text-white" />
                  )}
                </div>

                {/* Option Name */}
                <span className="text-sm font-medium">
                  {option.name}
                </span>
              </div>

              {/* Price */}
              <div className="flex items-center space-x-2">
                {option.price > 0 ? (
                  <span className={`
                    text-sm font-medium
                    ${isSelected ? 'text-orange-700' : 'text-gray-600'}
                  `}>
                    +${option.price.toFixed(2)}
                  </span>
                ) : (
                  <span className={`
                    text-xs
                    ${isSelected ? 'text-orange-600' : 'text-gray-500'}
                  `}>
                    Gratis
                  </span>
                )}
              </div>
            </button>
          )
        })}
      </div>

      {/* Selection Summary for Checkboxes */}
      {type === 'checkbox' && (selected as string[]).length > 0 && (
        <div className="mt-2 p-2 bg-gray-50 rounded-md">
          <p className="text-xs text-gray-600">
            Seleccionados: {(selected as string[]).length} 
            {(selected as string[]).length === 1 ? ' opción' : ' opciones'}
          </p>
        </div>
      )}
    </div>
  )
}
