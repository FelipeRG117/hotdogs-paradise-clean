import React from 'react';
import { Vertical } from '@/lib/constants/verticals';
import mockData from '@/data/mock-restaurant.json';

// Componentes específicos para Restaurant
const RestaurantTemplate = () => (
  <div className="bg-orange-50 p-4 rounded-lg">
    <h3 className="text-lg font-semibold text-orange-800 mb-3">🍔 Restaurant Features</h3>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <NutritionalInfo />
      <AllergenInfo />
      <PreparationTime />
      <DeliveryOptions />
    </div>
  </div>
);

// Componentes específicos para Services  
const ServicesTemplate = () => (
  <div className="bg-blue-50 p-4 rounded-lg">
    <h3 className="text-lg font-semibold text-blue-800 mb-3">🔧 Services Features</h3>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <ServiceCalendar />
      <ServiceDurationPicker />
      <ServiceTypeSelector />
      <ProfessionalProfile />
    </div>
  </div>
);

// Componentes específicos para Creative
const CreativeTemplate = () => (
  <div className="bg-purple-50 p-4 rounded-lg">
    <h3 className="text-lg font-semibold text-purple-800 mb-3">🎨 Creative Features</h3>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <PortfolioGallery />
      <ProjectTimeline />
      <DeliverablesSelector />
      <CreativeProcess />
    </div>
  </div>
);

// Mapeo de componentes por vertical
const templateComponents: Record<Vertical, React.FC> = {
  restaurant: RestaurantTemplate,
  service: ServicesTemplate,
  creative: CreativeTemplate
};

// Componente principal que renderiza según el vertical
interface VerticalTemplateProps {
  vertical: Vertical;
  showMissingFields?: boolean;
}

export const VerticalTemplate: React.FC<VerticalTemplateProps> = ({ 
  vertical, 
  showMissingFields = true 
}) => {
  const Template = templateComponents[vertical];
  const extensionConfig = mockData.templateExtensions[vertical as keyof typeof mockData.templateExtensions];
  
  if (!Template) {
    return (
      <div className="bg-gray-50 p-4 rounded-lg">
        <p className="text-gray-600">No hay template disponible para el vertical: {vertical}</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <Template />
      
      {showMissingFields && extensionConfig && (
        <MissingFieldsAlert 
          requiredFields={extensionConfig.requiredFields}
          additionalComponents={extensionConfig.additionalComponents}
          vertical={vertical}
        />
      )}
    </div>
  );
};

// Componente de alerta para campos faltantes
interface MissingFieldsAlertProps {
  requiredFields: string[];
  additionalComponents: string[];
  vertical: string;
}

const MissingFieldsAlert: React.FC<MissingFieldsAlertProps> = ({
  requiredFields,
  additionalComponents,
  vertical
}) => {
  if (requiredFields.length === 0 && additionalComponents.length === 0) {
    return null;
  }

  return (
    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
      <h4 className="font-medium text-yellow-800 mb-2">
        ⚠️ Configuración requerida para {vertical}:
      </h4>
      
      {requiredFields.length > 0 && (
        <div className="mb-2">
          <p className="text-sm text-yellow-700 font-medium">Campos requeridos:</p>
          <ul className="list-disc list-inside text-sm text-yellow-600">
            {requiredFields.map(field => (
              <li key={field}>{field}</li>
            ))}
          </ul>
        </div>
      )}
      
      {additionalComponents.length > 0 && (
        <div>
          <p className="text-sm text-yellow-700 font-medium">Componentes adicionales:</p>
          <ul className="list-disc list-inside text-sm text-yellow-600">
            {additionalComponents.map(component => (
              <li key={component}>{component}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

// ===============================
// COMPONENTES ESPECÍFICOS - RESTAURANT
// ===============================

const NutritionalInfo = () => (
  <div className="bg-white p-3 rounded border">
    <h4 className="font-medium text-gray-800 mb-2">🥗 Información Nutricional</h4>
    <div className="text-sm text-gray-600 space-y-1">
      <p>Calorías: 450 kcal</p>
      <p>Proteínas: 25g</p>
      <p>Grasas: 18g</p>
      <p>Carbohidratos: 35g</p>
    </div>
  </div>
);

const AllergenInfo = () => (
  <div className="bg-white p-3 rounded border">
    <h4 className="font-medium text-gray-800 mb-2">⚠️ Alérgenos</h4>
    <div className="flex flex-wrap gap-1">
      {['Gluten', 'Lácteos', 'Frutos secos'].map(allergen => (
        <span key={allergen} className="px-2 py-1 bg-red-100 text-red-700 text-xs rounded">
          {allergen}
        </span>
      ))}
    </div>
  </div>
);

const PreparationTime = () => (
  <div className="bg-white p-3 rounded border">
    <h4 className="font-medium text-gray-800 mb-2">⏱️ Tiempo de Preparación</h4>
    <p className="text-sm text-gray-600">15-20 minutos</p>
  </div>
);

const DeliveryOptions = () => (
  <div className="bg-white p-3 rounded border">
    <h4 className="font-medium text-gray-800 mb-2">🚚 Opciones de Entrega</h4>
    <div className="text-sm text-gray-600 space-y-1">
      <p>• Delivery: 30-45 min</p>
      <p>• Pickup: 15-20 min</p>
      <p>• Dine-in: Disponible</p>
    </div>
  </div>
);

// ===============================
// COMPONENTES ESPECÍFICOS - SERVICES
// ===============================

const ServiceCalendar = () => (
  <div className="bg-white p-3 rounded border">
    <h4 className="font-medium text-gray-800 mb-2">📅 Calendario de Servicios</h4>
    <div className="grid grid-cols-7 gap-1 text-xs">
      {['L', 'M', 'X', 'J', 'V', 'S', 'D'].map(day => (
        <div key={day} className="text-center p-1 bg-blue-100 rounded">{day}</div>
      ))}
    </div>
  </div>
);

const ServiceDurationPicker = () => (
  <div className="bg-white p-3 rounded border">
    <h4 className="font-medium text-gray-800 mb-2">⏰ Duración del Servicio</h4>
    <select className="w-full p-2 border rounded text-sm">
      <option>30 minutos</option>
      <option>1 hora</option>
      <option>2 horas</option>
      <option>Día completo</option>
    </select>
  </div>
);

const ServiceTypeSelector = () => (
  <div className="bg-white p-3 rounded border">
    <h4 className="font-medium text-gray-800 mb-2">🔧 Tipo de Servicio</h4>
    <div className="space-y-2">
      {['Consultoría', 'Implementación', 'Soporte', 'Mantenimiento'].map(type => (
        <label key={type} className="flex items-center text-sm">
          <input type="radio" name="serviceType" className="mr-2" />
          {type}
        </label>
      ))}
    </div>
  </div>
);

const ProfessionalProfile = () => (
  <div className="bg-white p-3 rounded border">
    <h4 className="font-medium text-gray-800 mb-2">👨‍💼 Profesional Asignado</h4>
    <div className="flex items-center space-x-2">
      <div className="w-8 h-8 bg-blue-200 rounded-full"></div>
      <div>
        <p className="text-sm font-medium">Juan Pérez</p>
        <p className="text-xs text-gray-500">5 años experiencia</p>
      </div>
    </div>
  </div>
);

// ===============================
// COMPONENTES ESPECÍFICOS - CREATIVE
// ===============================

const PortfolioGallery = () => (
  <div className="bg-white p-3 rounded border">
    <h4 className="font-medium text-gray-800 mb-2">🖼️ Portfolio</h4>
    <div className="grid grid-cols-3 gap-2">
      {[1, 2, 3, 4, 5, 6].map(i => (
        <div key={i} className="aspect-square bg-purple-100 rounded"></div>
      ))}
    </div>
  </div>
);

const ProjectTimeline = () => (
  <div className="bg-white p-3 rounded border">
    <h4 className="font-medium text-gray-800 mb-2">📊 Timeline del Proyecto</h4>
    <div className="space-y-2 text-sm">
      <div className="flex justify-between">
        <span>Concepto inicial</span>
        <span className="text-gray-500">2-3 días</span>
      </div>
      <div className="flex justify-between">
        <span>Desarrollo</span>
        <span className="text-gray-500">1-2 semanas</span>
      </div>
      <div className="flex justify-between">
        <span>Revisiones</span>
        <span className="text-gray-500">3-5 días</span>
      </div>
    </div>
  </div>
);

const DeliverablesSelector = () => (
  <div className="bg-white p-3 rounded border">
    <h4 className="font-medium text-gray-800 mb-2">📋 Entregables</h4>
    <div className="space-y-2">
      {['Logo final', 'Manual de marca', 'Archivos fuente', 'Mockups'].map(item => (
        <label key={item} className="flex items-center text-sm">
          <input type="checkbox" className="mr-2" defaultChecked />
          {item}
        </label>
      ))}
    </div>
  </div>
);

const CreativeProcess = () => (
  <div className="bg-white p-3 rounded border">
    <h4 className="font-medium text-gray-800 mb-2">🎨 Proceso Creativo</h4>
    <div className="text-sm text-gray-600 space-y-1">
      <p>1. Briefing inicial</p>
      <p>2. Investigación</p>
      <p>3. Conceptualización</p>
      <p>4. Desarrollo</p>
      <p>5. Entrega final</p>
    </div>
  </div>
);

export default VerticalTemplate; 