// src/types/mock.d.ts
import type { Product } from "@/types/product";
import { Vertical } from "@/lib/constants/verticals";


  // ======================
  // 1. Tipos Fundamentales
  // ======================
  export type MigrationPath = `${Vertical}_to_${Vertical}`;
  export type BusinessModel = 
    | "food_delivery" 
    | "subscription" 
    | "on_demand" 
    | "brick_and_mortar";
  
  export type TemplateType = 
    | "customizable_product" 
    | "customizable_service" 
    | "digital_product"
    | "configurable_service";

  export type LogLevel = "debug" | "info" | "warn" | "error";
  export type AnalyticsIntegration = "GA4" | "Hotjar" | "Facebook" | "Mixpanel";

  // ======================
  // 2. Núcleo del Sistema
  // ======================
  export interface SystemConfig {
    version: `${number}.${number}.${number}`;
    templateEngine: TemplateEngine;
    observability: ObservabilityConfig;
  }

  export interface TemplateEngine {
    name: string;
    version: string;
    adaptableDomains: Vertical[];
    migrationPaths: Partial<Record<MigrationPath, `${
      | "service"
      | "creative"
      | "ecom"}-transformer-v${number}`>>;
  }

  export interface ObservabilityConfig {
    logging: {
      level: LogLevel;
      customizationEvents: boolean;
    };
    analyticsIntegration: AnalyticsIntegration[];
  }

  // ======================
  // 3. Modelado de Productos (Para ProductCard)
  // ======================
  export interface PricingModel {
    type: "absolute" | "relative" | "tiered";
    value: number;
    currency?: string;
  }

  export interface FeatureValidation {
    required: boolean;
    incompatibleWith?: Record<string, string[]>;
    dependencies?: string[];
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
    validation?: FeatureValidation;
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

  export interface FieldMapping {
    source: string;
    target: string;
    transform?: "direct" | "percentage" | "multiplier";
  }

  

  // ======================
  // 4. Configuración por Vertical
  // ======================
  export interface VerticalTemplateConfig {
    requiredFields: Array<
      | "serviceDuration"
      | "serviceType"
      | "projectTimeline"
      | "deliverables"
    >;
    additionalComponents: Array<
      | "serviceCalendar"
      | "portfolioGallery"
      | "inventoryTracker"
    >;
  }

  export interface CrossDomainRules {
    fieldMappings: FieldMapping[];
    validationRules?: {
      minCompatibility: number;
      requiredFields: string[];
    };
  }

  export interface VerticalCustomizationRules {
    global: {
      maxCustomizationValue: number;
      freeItemsLimit: number;
      validationEngine: string;
    };
    crossDomain?: Partial<Record<MigrationPath, CrossDomainRules>>;
  }

  export interface VerticalConfig<T extends Vertical = Vertical> {
    templateConfig: VerticalTemplateConfig;
    products: Product[];
    customizationRules: VerticalCustomizationRules;
  }

  // ======================
  // 5. Estructura Completa
  // ======================
  export interface StoreConfig {
    id: `store_${string}`;
    type: Vertical;
    businessModel: BusinessModel;
    templateMetadata: {
      createdFrom: string;
      lastAdaptation: string; // ISO 8601
      compatibility: Partial<Record<Vertical, number>>;
    };
    contact: {
      whatsapp?: {
        businessAccount: boolean;
        messageTemplates: Record<
          "orderConfirmation" | "deliveryUpdate",
          string
        >;
      };
    };
    settings: {
      customizationEngine: {
        type: string;
        realTimePreview: boolean;
        nutritionalCalculation?: boolean;
        allergenTracking?: boolean;
      };
    };
  }

  export interface AnalyticsConfig {
    customizationTracking: {
      popularCombinations: {
        storage: "aggregated" | "individual";
        sampleRate: number;
        retentionDays: number;
      };
    };
  }

  export interface MockData {
    $schema: "./schema.json";
    systemConfig: SystemConfig;
    store: StoreConfig;
    products: Product[];
    categories: Array<{
      id: `cat_${string}`;
      customizationConfig: {
        engine: string;
        rules: {
          maxIngredients?: number;
          maxFeatures?: number;
          requiredFeatures?: string[];
        };
      };
    }>;
    verticals: Partial<Record<Vertical, VerticalConfig>>;
    analytics: AnalyticsConfig;
    templateExtensions: Partial<Record<Vertical, VerticalTemplateConfig>>;
  }



















  /* {
    "$schema": "./schema.json",
    "systemConfig": {
        "version": "3.0.0",
        "templateEngine": {
            "name": "TemplateMaster",
            "version": "1.2.0",
            "adaptableDomains": [
                "restaurant",
                "services",
                "creative",
                "ecommerce"
            ],
            "migrationPaths": {
                "restaurant_to_services": "service-transformer-v2",
                "restaurant_to_creative": "creative-transformer-v1"
            }
        },
        "observability": {
            "logging": {
                "level": "debug",
                "customizationEvents": true
            },
            "analyticsIntegration": [
                "GA4",
                "Hotjar",
                "Facebook"
            ]
        }
    },
    "store": {
        "id": "store_001",
        "type": "restaurant",
        "businessModel": "food_delivery",
        "templateMetadata": {
            "createdFrom": "template_restaurant_v3",
            "lastAdaptation": "2025-08-06T12:00:00Z",
            "compatibility": {
                "services": 0.92,
                "creative": 0.85,
                "ecommerce": 0.78
            }
        },
        "contact": {
            "whatsapp": {
                "businessAccount": true,
                "messageTemplates": {
                    "orderConfirmation": "tmpl_order_confirmation_v2",
                    "deliveryUpdate": "tmpl_delivery_update_v1"
                }
            }
        },
        "settings": {
            "customizationEngine": {
                "type": "ingredients_and_features",
                "realTimePreview": true,
                "nutritionalCalculation": true,
                "allergenTracking": true
            }
        }
    },
    "categories": [
        {
            "id": "cat_001",
            "customizationConfig": {
                "engine": "feature-based",
                "rules": {
                    "maxIngredients": 10,
                    "maxFeatures": 5,
                    "requiredFeatures": [
                        "size",
                        "bread_type"
                    ],
                    "validationSchema": "category_restaurant_v2"
                }
            },
            "templateMappings": {
                "services": {
                    "targetType": "service_category",
                    "fieldMappings": {
                        "customizationConfig": "serviceOptionsConfig"
                    }
                }
            }
        }
    ],
    "products": [
        {
            "id": "prod_001",
            "templateType": "customizable_product",
            "customizationSchema": {
                "features": {
                    "size": {
                        "pricingModel": "absolute",
                        "affects": [
                            "price",
                            "nutrition",
                            "prep_time"
                        ],
                        "validation": {
                            "required": true,
                            "incompatibleWith": {
                                "bread": [
                                    "pretzel"
                                ]
                            }
                        }
                    }
                },
                "ingredients": {
                    "grouping": "category_based",
                    "pricingTiers": [
                        {
                            "category": "quesos",
                            "maxSelection": 3,
                            "groupDiscount": {
                                "threshold": 2,
                                "discount": 3.00
                            }
                        }
                    ]
                }
            },
            "templateMappings": {
                "services": {
                    "targetType": "customizable_service",
                    "fieldMappings": {
                        "customizationFeatures": "serviceOptions",
                        "additionalIngredients": "serviceAddOns"
                    }
                }
            }
        }
    ],
    "customizationRules": {
        "global": {
            "maxCustomizationValue": 200.00,
            "freeItemsLimit": 3,
            "validationEngine": "template-master-v2"
        },
        "crossDomainRules": {
            "restaurant_to_services": {
                "product_to_service": {
                    "basePrice": "baseRate",
                    "customizationFeatures": "serviceTiers",
                    "ingredients": "serviceModules"
                }
            }
        }
    },
    "deliveryZones": {
        "templateAdaptations": {
            "services": {
                "targetType": "serviceAreas",
                "fieldMappings": {
                    "deliveryFee": "serviceFee",
                    "polygon": "coverageArea"
                }
            }
        }
    },
    "analytics": {
        "customizationTracking": {
            "popularCombinations": {
                "storage": "aggregated",
                "sampleRate": 0.8
            }
        }
    },
    "templateExtensions": {
        "services": {
            "requiredFields": [
                "serviceDuration",
                "serviceType"
            ],
            "additionalComponents": [
                "serviceCalendar"
            ]
        },
        "creative": {
            "requiredFields": [
                "projectTimeline",
                "deliverables"
            ],
            "additionalComponents": [
                "portfolioGallery"
            ]
        }
    }
} */