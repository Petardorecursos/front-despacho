import { useState } from "react";
import { CardComponent } from "./CardComponent";
import { TableCompras } from "./TableCompras";
import { TableDespachos } from "./TableDespachos";

export const PruebaCards = () => {
  // 'activeTab' puede ser: 'compras', 'despachos' o null
  const [activeTab, setActiveTab] = useState(null);

  return (
    <section>
      <div className="flex justify-center">
        <CardComponent
          title="Consultar Ordenes de compra 💰"
          description="Revisa las últimas oc realizadas para generar su despacho"
          buttonText="Consultar"
          // Ahora solo cambias un estado, el resto se limpia solo
          onClick={() => setActiveTab('compras')}
        />
        <CardComponent
          title="Revisar Ordenes de despacho 🚚"
          description="Consulta los despachos realizados, modifica los registros de intentos o cierra la orden"
          buttonText="Consultar"
          onClick={() => setActiveTab('despachos')}
        />
      </div>

      <section>
        {activeTab === 'compras' && <TableCompras />}
        {activeTab === 'despachos' && <TableDespachos />}
      </section>
    </section>
  );
};
