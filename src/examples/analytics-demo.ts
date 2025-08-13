// src/examples/analytics-demo.ts
// Este archivo demuestra cómo usar el sistema de analytics integrado

import ConfigAdapter from '@/lib/adapters/ConfigAdapter';
import { useProductAnalytics } from '@/hooks/useProductAnalytics';

// Ejemplo 1: Analytics básico con ProductCard
export function analyticsBasicExample() {
  /*
  En tu componente React:
  
  function MyProductPage() {
    const { track } = useProductAnalytics();
    
    useEffect(() => {
      track('product_view', { productId: 'prod_001' });
    }, []);
    
    return <ProductCard product={product} onCustomize={handleCustomize} />;
  }
  */
}

// Ejemplo 2: ConfigAdapter con tracking de migraciones
export function migrationWithTrackingExample() {
  /*
  function MyMigrationComponent() {
    const { track } = useProductAnalytics();
    const adapter = new ConfigAdapter('restaurant');
    
    const handleMigration = async (targetVertical: Vertical) => {
      try {
        const config = adapter.attemptMigration(targetVertical, track);
        console.log('Migración exitosa:', config);
      } catch (error) {
        console.error('Error en migración:', error.message);
      }
    };
    
    return (
      <button onClick={() => handleMigration('services')}>
        Migrar a Services
      </button>
    );
  }
  */
}

// Ejemplo 3: Configuración en tiempo real
export function runtimeConfigExample() {
  /*
  function AnalyticsStatus() {
    const { isTrackingEnabled, getTrackingConfig } = useProductAnalytics();
    const config = getTrackingConfig();
    
    return (
      <div>
        <p>Tracking: {isTrackingEnabled ? 'Activo' : 'Inactivo'}</p>
        <p>Sample Rate: {config.popularCombinations.sampleRate * 100}%</p>
        <p>Retención: {config.popularCombinations.retentionDays} días</p>
      </div>
    );
  }
  */
}

// Ejemplo 4: Datos que se envían a analytics
export const exampleEventData = {
  event: 'product_customize_start',
  timestamp: '2025-01-09T10:30:00Z',
  sessionId: 'session_1641726600_abc123def',
  vertical: 'restaurant',
  productId: 'prod_001',
  featureName: 'size',
  featureValue: 'large'
};

// Ejemplo 5: Integración con servicios reales
export const productionAnalyticsSetup = `
// En tu _app.tsx o layout.tsx para configurar analytics en producción:

// Google Analytics 4
<Script
  src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"
  strategy="afterInteractive"
/>
<Script id="google-analytics" strategy="afterInteractive">
  {window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');}
</Script>

// Hotjar
<Script id="hotjar">
  {(function(h,o,t,j,a,r){
    h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
    h._hjSettings={hjid:YOUR_HOTJAR_ID,hjsv:6};
    a=o.getElementsByTagName('head')[0];
    r=o.createElement('script');r.async=1;
    r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
    a.appendChild(r);
  })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');}
</Script>

// Facebook Pixel
<Script id="facebook-pixel">
  {!function(f,b,e,v,n,t,s)
  {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
  n.callMethod.apply(n,arguments):n.queue.push(arguments)};
  if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
  n.queue=[];t=b.createElement(e);t.async=!0;
  t.src=v;s=b.getElementsByTagName(e)[0];
  s.parentNode.insertBefore(t,s)}(window, document,'script',
  'https://connect.facebook.net/en_US/fbevents.js');
  fbq('init', 'YOUR_PIXEL_ID');
  fbq('track', 'PageView');}
</Script>
`; 