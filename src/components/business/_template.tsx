



import { Vertical, VERTICAL_CONFIG } from "@/lib/constants/verticals";
import ConfigAdapter from "@/lib/adapters/ConfigAdapter";

export default function Template({ vertical }: { vertical: Vertical }) {
  const { primaryColor } = VERTICAL_CONFIG[vertical];
  
  return (
    <div className={`bg-${primaryColor} p-4`}>
      {/* Contenido específico de cada vertical */}
    </div>
  );
}








/* import { Vertical } from "@/lib/constants/verticals";
import  ConfigAdapter  from "@/lib/adapters/ConfigAdapter";

export default function Template({ vertical }: { vertical: Vertical }) {
  const theme = new ConfigAdapter(vertical).getTheme();
  
  return (
    <div className={`bg-${theme.primary} p-4`}>
      {/* Contenido específico de cada vertical }
    </div>
  );
} */