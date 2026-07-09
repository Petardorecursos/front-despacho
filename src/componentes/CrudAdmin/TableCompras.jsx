import { useState, useEffect } from "react";
import { apiVentas } from "../../services/api";

export const TableCompras = () => {
  const [compras, setCompras] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // 1. Estado para manejar el detalle seleccionado
  const [selectedCompra, setSelectedCompra] = useState(null);

  const fetchCompras = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await apiVentas.get("http://a05f489a54a574dda9112b28db4bdf92-2135110527.us-east-1.elb.amazonaws.com:8080/api/v1/ventas"); 
      setCompras(response.data);
    } catch (err) {
      setError("No se pudieron cargar las compras. Verifica la conexión.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCompras();
  }, []);

  return (
    <>
      <section className="grid text-center grid-cols-12 mb-8">
        <div className="col-span-12 flex justify-center">
          <div className="col-span-10 p-2 bg-white border border-gray-100 rounded-xl shadow-sm h-full overflow-hidden">
            
            {loading && <div className="p-10 text-slate-500">Cargando datos...</div>}
            {error && <div className="p-10 text-red-500 font-bold">{error}</div>}
            
            {!loading && !error && (
              <table className="table-fixed w-full">
                {/* ... (Tu thead se mantiene igual) ... */}
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-100 text-slate-600 font-semibold">
                    <th className="p-4">ID Compra</th>
                    <th className="p-4">Dirección / Cliente</th>
                    <th className="p-4">Fecha de Compra</th>
                    <th className="p-4">Total</th>
                    <th className="p-4">Estado</th>
                    <th className="p-4">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {compras.length > 0 ? (
                    compras.map((compra) => (
                      <tr key={compra.idVenta} className="border-b border-gray-50 hover:bg-slate-50 transition-colors">
                        <td className="p-4 font-medium text-slate-700">{compra.idVenta}</td>
                        <td className="p-4 text-slate-600">{compra.direccionCompra || "N/A"}</td>
                        <td className="p-4 text-slate-600">{compra.fechaCompra}</td>
                        <td className="p-4 font-bold text-indigo-600">${compra.valorCompra}</td>
                        <td className="p-4">
                           <span className={`px-3 py-1 rounded-full text-xs font-medium border ${compra.despachoGenerado ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-amber-50 text-amber-700 border-amber-200'}`}>
                            {compra.despachoGenerado ? "Despachado" : "Pendiente"}
                          </span>
                        </td>
                        <td className="p-4">
                          {/* 2. AQUÍ CONECTAMOS EL BOTÓN */}
                          <button 
                            onClick={() => setSelectedCompra(compra)}
                            className="py-2 px-6 bg-indigo-600 text-white text-sm font-medium rounded-lg shadow-md hover:bg-indigo-700 hover:shadow-lg transition-all duration-300"
                          >
                            Ver Detalle
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr><td colSpan="6" className="p-10 text-slate-400 italic">No hay compras registradas.</td></tr>
                  )}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </section>

      {/* 3. CONDICIONAL PARA MOSTRAR EL MINI MENÚ */}
      {selectedCompra && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-2xl w-96">
            <h2 className="text-lg font-bold text-slate-800 mb-4">Detalle Compra #{selectedCompra.idVenta}</h2>
            <p className="text-slate-600">Dirección: {selectedCompra.direccionCompra}</p>
            <p className="text-slate-600">Fecha: {selectedCompra.fechaCompra}</p>
            <p className="text-slate-600">Total: ${selectedCompra.valorCompra}</p>
            
            <button 
              onClick={() => setSelectedCompra(null)}
              className="mt-6 w-full py-2 bg-slate-200 text-slate-700 rounded-lg font-medium hover:bg-slate-300"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </>
  );
};
