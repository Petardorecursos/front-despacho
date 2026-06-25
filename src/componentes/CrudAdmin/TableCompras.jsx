import { useState, useEffect } from "react";
// Importamos nuestra capa de servicios centralizada en lugar de axios directamente
import api from "../../services/api";

// Si tienes un modal para las compras, descomenta estas líneas y ajusta los nombres
// import { Modal } from "./Modal";
// import { FormDetalleCompra } from "./FormDetalleCompra";

export const TableCompras = () => {
  const [compras, setCompras] = useState([]);
  // const [openModal, setOpenModal] = useState(false);
  // const [compraSeleccionada, setCompraSeleccionada] = useState(null);

  const fetchCompras = async () => {
    try {
      // AQUÍ ESTÁ LA MAGIA: URL del LoadBalancer de AWS para tu back-ventas apuntando a /ventas
      const response = await api.get("http://a78f42c00ca98423ea53b3dd94cdad94-457896225.us-east-1.elb.amazonaws.com:8080/api/v1/ventas");
      console.log("Compras obtenidas:", response.data);
      setCompras(response.data);
    } catch (error) {
      console.error("Error al obtener las compras:", error);
    }
  };

  // Llamada a la función para obtener los datos cuando el componente se monta
  useEffect(() => {
    fetchCompras();
  }, []);

  /* const handleAbrirModal = (compra) => {
    setCompraSeleccionada(compra);
    setOpenModal(true);
  }; 
  */

  return (
    <>
      <section className="grid text-center grid-cols-12 mb-8">
        <div className="col-span-12 flex justify-center">
          <div className="col-span-10 p-2 bg-white border border-gray-200 rounded-lg shadow dark:bg-white h-full overflow-hidden">
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
                {/* Utilizamos las variables exactas que devuelve tu backend */}
                {compras.map((compra) => (
                  <tr key={compra.idVenta} className="border-b hover:bg-gray-50">
                    <td className="p-4 items-center">{compra.idVenta}</td>
                    <td className="p-4 items-center">{compra.direccionCompra || "N/A"}</td>
                    <td className="p-4 items-center">{compra.fechaCompra}</td>
                    <td className="p-4 items-center">${compra.valorCompra}</td>
                    <td className="p-4 items-center">
                      <span className={`px-2 py-1 rounded text-sm ${compra.despachoGenerado ? 'bg-green-200 text-green-800' : 'bg-yellow-200 text-yellow-800'}`}>
                        {compra.despachoGenerado ? "Despachado" : "Pendiente"}
                      </span>
                    </td>
                    <td className="p-4">
                      <button
                        // onClick={() => handleAbrirModal(compra)}
                        className="py-1 bg-blue-200 px-6 rounded-xl shadow-md hover:bg-blue-300/70 transition-all duration-300"
                      >
                        Ver Detalle
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Modal para detalles de la compra (Descomentar si es necesario) */}
      {/* <Modal
        onClose={() => setOpenModal(false)}
        open={openModal}
      >
        {compraSeleccionada && (
          <FormDetalleCompra
            compra={compraSeleccionada}
            onClose={() => {
              setOpenModal(false);
              fetchCompras();
            }}
          />
        )}
      </Modal> 
      */}
    </>
  );
};
