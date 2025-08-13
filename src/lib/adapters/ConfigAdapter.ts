// src/lib/adapters/ConfigAdapter.ts
import { Vertical,  VERTICAL_CONFIG } from '@/lib/constants/verticals';
import { Product } from '@/types/product';
import mockData from '@/data/mock-restaurant.json';

type MigrationPath = keyof typeof mockData.systemConfig.templateEngine.migrationPaths;

export default class ConfigAdapter {
  private vertical: Vertical;

  constructor(vertical: Vertical) {
    this.vertical = vertical;
  }

  getProductCardConfig(product: Product) {
    const config = VERTICAL_CONFIG[this.vertical].productCard;
    return {
      ...config,
      allowedVariants: this.getAllowedVariants(product.templateType)
    };
  }

  /**
   * Obtiene la configuración de migración hacia otro vertical
   */
  getMigrationConfig(targetVertical: Vertical) {
    const path = `${this.vertical}_to_${targetVertical}` as MigrationPath;
    const transformer = mockData.systemConfig.templateEngine.migrationPaths[path];
    
    if (!transformer) {
      throw new Error(`No hay ruta de migración de ${this.vertical} a ${targetVertical}`);
    }

    return {
      transformer,
      sourceVertical: this.vertical,
      targetVertical,
      migrationPath: path
    };
  }

  /**
   * Valida si la migración hacia otro vertical es viable
   */
  validateMigration(targetVertical: Vertical): boolean {
    // Verificar si existe ruta de migración
    const path = `${this.vertical}_to_${targetVertical}` as MigrationPath;
    const hasPath = path in mockData.systemConfig.templateEngine.migrationPaths;
    
    if (!hasPath) {
      return false;
    }

    // Verificar compatibilidad mínima (80%)
    const compatibilityData = mockData.store.templateMetadata.compatibility as Record<string, number>;
    const compatibility = compatibilityData[targetVertical];
    return compatibility !== undefined && compatibility >= 0.8;
  }

  /**
   * Obtiene el nivel de compatibilidad con otro vertical
   */
  getCompatibilityScore(targetVertical: Vertical): number {
    const compatibilityData = mockData.store.templateMetadata.compatibility as Record<string, number>;
    return compatibilityData[targetVertical] || 0;
  }

  /**
   * Intenta realizar una migración con tracking de analytics
   */
  attemptMigration(targetVertical: Vertical, trackingCallback?: (event: string, data: any) => void) {
    const isValid = this.validateMigration(targetVertical);
    const compatibilityScore = this.getCompatibilityScore(targetVertical);
    
    // Trackear el intento de migración
    if (trackingCallback) {
      trackingCallback('migration_attempted', {
        sourceVertical: this.vertical,
        targetVertical,
        isValid,
        compatibilityScore,
        timestamp: new Date().toISOString()
      });
    }

    if (!isValid) {
      throw new Error(`Migración no viable: compatibilidad ${(compatibilityScore * 100).toFixed(1)}% (mínimo 80%)`);
    }

    return this.getMigrationConfig(targetVertical);
  }

  private getAllowedVariants(templateType: Product['templateType']) {
    // Lógica para determinar variantes permitidas
    return templateType === 'customizable_product' 
      ? ['default', 'compact', 'featured']
      : ['default', 'compact'];
  }
}


