import { Vertical } from "@/lib/constants/verticals";

export type TemplateType =
  | "customizable_product"
  | "customizable_service"
  | "digital_product"
  | "configurable_service";

export interface FieldMapping {
  source: string;
  target: string;
  transform?: "direct" | "percentage" | "multiplier";
}

export interface PricingModel {
  type: "absolute" | "relative" | "tiered";
  value: number;
  currency?: string;
}

export interface ProductFeature {
  pricingModel: PricingModel;
  affects: Array<
    | "price"
    | "nutrition"
    | "prep_time"
    | "delivery_time"
    | "allergens"
  >;
  validation?: {
    required: boolean;
    incompatibleWith?: Record<string, string[]>;
    dependencies?: string[];
  };
}

export interface IngredientGroup {
  category: string;
  maxSelection: number;
  groupDiscount?: {
    threshold: number;
    discount: number;
    appliesTo: "all" | "excess";
  };
}

export interface ProductCustomization {
  features: Record<string, ProductFeature>;
  ingredients?: {
    grouping: "category_based" | "type_based" | "allergen_based";
    pricingTiers: IngredientGroup[];
  };
}

/**
 * Estructura base del producto técnico
 */
export interface ProductBase {
  id: `prod_${string}`;
  templateType: TemplateType;
  customizationSchema?: ProductCustomization;
}

export interface CatalogProduct extends ProductBase {
  name: string;
  image: string;
  basePrice: number;
  category?: string;
  description?: string;
  verticalSpecific?: {
    restaurant?: {
      isFeatured?: boolean;
      nutritionalInfo?: Record<string, any>;
    };
    service?: {
      duration?: string;
    };
  };
}

export interface TemplateMapping {
  targetType: string;
  fieldMappings: {
    customizationFeatures: string;
    additionalIngredients: string;
  };
}

// ✅ Product ahora hereda todo de CatalogProduct y añade templateMappings
export interface Product extends CatalogProduct {
  templateMappings?: Partial<Record<Vertical, TemplateMapping>>;
   vertical: Vertical; // Ya tipado directamente
}