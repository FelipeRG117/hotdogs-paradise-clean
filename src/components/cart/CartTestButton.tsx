'use client'

import { useCartActions } from '@/lib/stores/cartStore'
import { Button } from '@/components/ui/Button'

// Mock product for testing
const mockProduct = {
  id: "prod_test-hotdog" as const,
  name: "Hot Dog Clásico",
  basePrice: 75.00,
  image: "/images/hotdog-classic.jpg",
  category: "hot-dogs" as const,
  templateType: "customizable_product" as const,
  vertical: "restaurant" as const
}

export function CartTestButton() {
  const { addItem } = useCartActions()

  const addTestProduct = () => {
    addItem(mockProduct, {
      size: "Medium",
      bread: "Integral", 
      sauce: "Ketchup"
    })
  }

  return (
    <div className="fixed bottom-4 right-4 z-40">
      <Button
        variant="primary"
        vertical="restaurant"
        onClick={addTestProduct}
        className="shadow-lg"
      >
        🧪 Agregar Producto Test
      </Button>
    </div>
  )
}
