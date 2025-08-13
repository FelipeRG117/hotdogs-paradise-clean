import { ProductFeature } from '@/types/product';

interface FeatureOptionProps {
  name: string;
  feature: ProductFeature;
}

export function FeatureOption({ name, feature }: FeatureOptionProps) {
  const formatPrice = (feature: ProductFeature) => {
    const { type, value } = feature.pricingModel;
    if (type === 'relative') {
      return `+${value}%`;
    }
    return `+$${value.toFixed(2)}`;
  };

  return (
    <div className="flex justify-between items-center text-sm p-2 bg-gray-50 rounded">
      <span className="capitalize font-medium">
        {name.replace('_', ' ')}
      </span>
      <span className="text-gray-600">
        {formatPrice(feature)}
      </span>
    </div>
  );
}