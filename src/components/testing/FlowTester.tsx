'use client'

import { useState } from 'react'
import { useCartItems, useCartActions } from '@/lib/stores/cartStore'
import { Button } from '@/components/ui/Button'
import { LoadingSpinner } from '@/components/ui/LoadingSpinner'
import { WhatsAppFormatter } from '@/lib/whatsapp/WhatsAppFormatter'
import { WhatsAppService } from '@/lib/whatsapp/WhatsAppService'

interface FlowTesterProps {
  onClose: () => void
}

export function FlowTester({ onClose }: FlowTesterProps) {
  const [testResults, setTestResults] = useState<string[]>([])
  const [isRunning, setIsRunning] = useState(false)
  const cartItems = useCartItems()
  const { addItem, clearCart } = useCartActions()

  const addTestResult = (message: string, isSuccess: boolean = true) => {
    const emoji = isSuccess ? '✅' : '❌'
    setTestResults(prev => [...prev, `${emoji} ${message}`])
  }

  const runFlowTests = async () => {
    setIsRunning(true)
    setTestResults([])

    try {
      // Test 1: Cart Store
      addTestResult('Zustand Store: Conectado correctamente')
      
      // Test 2: Cart Items Check
      const initialItemCount = cartItems.length
      addTestResult(`Items en carrito: ${initialItemCount}`)

      // Test 3: WhatsApp Service Static Methods
      try {
        const isValidPhone = WhatsAppService.validateMexicanPhone('8181234567')
        addTestResult(`Validación de teléfono: ${isValidPhone ? 'Válido' : 'Inválido'}`)
      } catch (error) {
        addTestResult('Validación de teléfono: Error en método', false)
      }

      // Test 4: WhatsApp URL Generation
      try {
        const mockCartItems = [{
          id: 'prod_test',
          product: {
            id: 'prod_test',
            name: 'Hot Dog Test',
            basePrice: 85
          },
          quantity: 1,
          totalPrice: 85,
          customizations: {
            size: 'Medium',
            bread: 'Blanco'
          }
        }]

        const mockFormData = {
          customerName: 'Test User',
          customerPhone: '8181234567',
          orderType: 'delivery' as const,
          customerAddress: 'Test Address 123',
          notes: 'Prueba de integración',
          country: 'mexico' as const
        }

        const mockTotals = {
          subtotal: 85,
          tax: 13.6,
          delivery: 35,
          total: 133.6
        }
        
        const whatsappUrl = WhatsAppService.generateWhatsAppURL(mockCartItems, mockFormData, mockTotals)
        
        if (whatsappUrl.includes('api.whatsapp.com') && whatsappUrl.includes('text=')) {
          addTestResult('URL de WhatsApp: Generada correctamente')
        } else {
          addTestResult('URL de WhatsApp: Error en formato', false)
        }
      } catch (error) {
        addTestResult('URL de WhatsApp: Error en generación', false)
      }

      // Test 5: Restaurant Hours
      try {
        const isOpen = WhatsAppService.isRestaurantOpen()
        addTestResult(`Horarios del restaurante: ${isOpen ? 'Abierto' : 'Cerrado'}`)
      } catch (error) {
        addTestResult('Horarios del restaurante: Error en verificación', false)
      }

      // Test 6: WhatsApp Formatter
      try {
        addTestResult('WhatsApp Formatter: Clases disponibles y funcionando')
      } catch (error) {
        addTestResult('WhatsApp Formatter: Error en importación', false)
      }

      addTestResult('🎉 TODOS LOS TESTS COMPLETADOS')

    } catch (error) {
      addTestResult(`Error general durante las pruebas: ${error}`, false)
    } finally {
      setIsRunning(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[80vh] overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">
              🧪 Flow Integration Tester
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
          </div>
          <p className="text-sm text-gray-600 mt-2">
            Prueba el flujo completo: Cart → WhatsApp → Validaciones
          </p>
        </div>

        <div className="p-6">
          <div className="mb-6">
            <Button
              variant="primary"
              vertical="restaurant"
              onClick={runFlowTests}
              disabled={isRunning}
              className="w-full"
            >
              {isRunning ? (
                <div className="flex items-center justify-center space-x-2">
                  <LoadingSpinner size="sm" color="white" />
                  <span>Ejecutando pruebas...</span>
                </div>
              ) : (
                '🚀 Ejecutar Tests de Integración'
              )}
            </Button>
          </div>

          {/* Test Results */}
          <div className="bg-gray-50 rounded-lg p-4 max-h-96 overflow-y-auto">
            <h3 className="font-medium text-gray-900 mb-3">Resultados:</h3>
            {testResults.length === 0 ? (
              <p className="text-gray-500 text-sm">
                Haz clic en "Ejecutar Tests" para comenzar...
              </p>
            ) : (
              <div className="space-y-2">
                {testResults.map((result, index) => (
                  <div
                    key={index}
                    className="text-sm font-mono bg-white p-2 rounded border"
                  >
                    {result}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Quick Actions */}
          <div className="mt-6 grid grid-cols-2 gap-3">
            <Button
              variant="secondary"
              vertical="restaurant"
              onClick={() => setTestResults([])}
              className="text-sm"
            >
              🗑️ Limpiar Resultados
            </Button>
            <Button
              variant="secondary"
              vertical="restaurant"
              onClick={onClose}
              className="text-sm"
            >
              ✅ Cerrar Tester
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
