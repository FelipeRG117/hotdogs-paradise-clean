// src/examples/vertical-templates-demo.ts
// Este archivo demuestra cómo usar el sistema de templates por vertical

import { VerticalTemplate } from '@/components/templates/VerticalTemplates';
import { useVerticalSwitch, useVerticalInfo } from '@/hooks/useVerticalSwitch';

// Ejemplo 1: Uso básico de VerticalTemplate
export function basicVerticalTemplateExample() {
  return `
  // En tu componente React:
  
  function MyRestaurantPage() {
    return (
      <div>
        <h1>Mi Restaurante</h1>
        <VerticalTemplate vertical="restaurant" />
      </div>
    );
  }
  `;
}

// Ejemplo 2: Switch dinámico entre verticales
export function dynamicVerticalSwitchExample() {
  return `
  function MyVerticalSwitcher() {
    const { currentVertical, switchToVertical, isLoading } = useVerticalSwitch();
    
    const handleSwitch = async (newVertical: Vertical) => {
      const success = await switchToVertical(newVertical);
      if (success) {
        console.log(\`Migración exitosa a \${newVertical}\`);
      }
    };
    
    return (
      <div>
        <p>Vertical actual: {currentVertical}</p>
        
        <button 
          onClick={() => handleSwitch('services')}
          disabled={isLoading}
        >
          Cambiar a Services
        </button>
        
        <VerticalTemplate vertical={currentVertical} />
      </div>
    );
  }
  `;
}

// Ejemplo 3: Validación de compatibilidad
export function compatibilityValidationExample() {
  return `
  function MigrationValidator() {
    const { isValidMigration, getCompatibilityScore } = useVerticalSwitch('restaurant');
    
    const targetVertical = 'services';
    const isValid = isValidMigration(targetVertical);
    const score = getCompatibilityScore(targetVertical);
    
    return (
      <div>
        <h3>Migración a {targetVertical}</h3>
        <p>Válida: {isValid ? 'Sí' : 'No'}</p>
        <p>Compatibilidad: {(score * 100).toFixed(1)}%</p>
        
        {isValid ? (
          <button>Proceder con migración</button>
        ) : (
          <p>⚠️ Migración no recomendada</p>
        )}
      </div>
    );
  }
  `;
}

// Ejemplo 4: Información del vertical
export function verticalInfoExample() {
  return `
  function VerticalInfoDisplay({ vertical }: { vertical: Vertical }) {
    const {
      extensionConfig,
      hasRequiredFields,
      hasAdditionalComponents,
      isCurrentStoreVertical
    } = useVerticalInfo(vertical);
    
    return (
      <div>
        <h3>{vertical} Info</h3>
        <p>Es vertical actual: {isCurrentStoreVertical ? 'Sí' : 'No'}</p>
        <p>Tiene campos requeridos: {hasRequiredFields ? 'Sí' : 'No'}</p>
        <p>Componentes adicionales: {hasAdditionalComponents ? 'Sí' : 'No'}</p>
        
        {extensionConfig && (
          <div>
            <h4>Campos requeridos:</h4>
            <ul>
              {extensionConfig.requiredFields.map(field => (
                <li key={field}>{field}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  }
  `;
}

// Ejemplo 5: Template customizado
export function customTemplateExample() {
  return `
  // Crear tu propio template personalizado
  
  const MyCustomRestaurantTemplate = () => (
    <div className="bg-gradient-to-br from-orange-100 to-red-100 p-6 rounded-xl">
      <h2 className="text-2xl font-bold text-orange-800 mb-4">
        🍔 Mi Restaurante Premium
      </h2>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded-lg shadow">
          <h3>📊 Estadísticas</h3>
          <p>Pedidos hoy: 45</p>
          <p>Rating promedio: 4.8</p>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow">
          <h3>🕒 Horarios</h3>
          <p>Abierto: 11:00 - 23:00</p>
          <p>Delivery hasta: 22:30</p>
        </div>
      </div>
      
      {/* Usar componentes base del sistema */}
      <VerticalTemplate vertical="restaurant" showMissingFields={false} />
    </div>
  );
  
  function MyCustomRestaurantPage() {
    return (
      <div>
        <MyCustomRestaurantTemplate />
      </div>
    );
  }
  `;
}

// Ejemplo 6: Integración con ProductCard
export function productCardIntegrationExample() {
  return `
  function MyProductCatalog() {
    const { currentVertical } = useVerticalSwitch();
    const products = getProductsForVertical(currentVertical);
    
    return (
      <div>
        {/* Header con el template del vertical */}
        <VerticalTemplate vertical={currentVertical} />
        
        {/* Productos específicos del vertical */}
        <div className="grid grid-cols-3 gap-4 mt-6">
          {products.map(product => (
            <ProductCard 
              key={product.id}
              product={product}
              variant="default"
              onCustomize={handleCustomize}
            />
          ))}
        </div>
      </div>
    );
  }
  `;
}

// Datos de ejemplo para templates
export const exampleTemplateData = {
  restaurant: {
    features: ['nutritional_info', 'allergen_info', 'prep_time', 'delivery_options'],
    requiredFields: [],
    additionalComponents: []
  },
  services: {
    features: ['service_calendar', 'duration_picker', 'service_type', 'professional_profile'],
    requiredFields: ['serviceDuration', 'serviceType'],
    additionalComponents: ['serviceCalendar']
  },
  creative: {
    features: ['portfolio_gallery', 'project_timeline', 'deliverables', 'creative_process'],
    requiredFields: ['projectTimeline', 'deliverables'],
    additionalComponents: ['portfolioGallery']
  }
};

// Configuración de colores por vertical
export const verticalThemes = {
  restaurant: {
    primary: 'orange',
    secondary: 'red',
    background: 'orange-50',
    text: 'orange-800'
  },
  services: {
    primary: 'blue',
    secondary: 'indigo', 
    background: 'blue-50',
    text: 'blue-800'
  },
  creative: {
    primary: 'purple',
    secondary: 'pink',
    background: 'purple-50', 
    text: 'purple-800'
  }
}; 