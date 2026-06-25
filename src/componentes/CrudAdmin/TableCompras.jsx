import { useState, useEffect } from "react";
import api from "../../services/api";

export const TableCompras = () => {
  const [compras, setCompras] = useState([]);
  const [loading, setLoading] = useState(true); // Nuevo estado de carga
  const [error, setError] = useState(null);     // Nuevo estado de error

  const fetchCompras = async () => {
    try {
      setLoading(true);
      setError(null);
      // URL corregida a /ventas
      const response = await api.get("http://a78f42c00ca98423ea53b3dd94cdad94-457896225.us-east-1.elb.amazonaws.com:8080/api/v1/ventas");
      console.log("Compras obtenidas:", response.data);
      setCompras(response.data);
    } catch (err) {
      console.error("Error al obtener las compras:", err);
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
          <div className="col-span-10 p-2 bg-white border border-gray-200 rounded-lg shadow dark:bg-white h-full overflow-hidden">
            
            {/* Mensajes de estado */}
            {loading && <div className="p-10 text-gray-500">Cargando datos...</div>}
            {error && <div className="p-10 text-red-500 font-bold">{error}</div>}
            
            {!loading && !error && (
              <table className="table-fixed w-full">
                <thead>
                  <tr className="py-10 border-b">
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
                      <tr key={compra.idVenta} className="border-b hover:bg-gray-50">
                        <td className="p-4">{compra.idVenta}</td>
                        <td className="p-4">{compra.direccionCompra || "N/A"}</td>
                        <td className="p-4">{compra.fechaCompra}</td>
                        <td className="p-4">${compra.valorCompra}</td>
                        <td className="p-4">
                          <span className={`px-2 py-1 rounded text-sm ${compra.despachoGenerado ? 'bg-green-200 text-green-800' : 'bg-yellow-200 text-yellow-800'}`}>
                            {compra.despachoGenerado ? "Despachado" : "Pendiente"}
                          </span>
                        </td>
                        <td className="p-4">
                          <button className="py-1 bg-blue-200 px-6 rounded-xl shadow-md hover:bg-blue-300/70 transition-all duration-300">
                            Ver Detalle
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="p-10 text-gray-500">No hay compras registradas.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </section>
    </>
  );
};
