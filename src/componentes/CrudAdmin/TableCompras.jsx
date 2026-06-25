import { useState, useEffect } from "react";
import axios from "axios";
// Si tienes un modal para las compras, descomenta estas líneas y ajusta los nombres
// import { Modal } from "./Modal";
// import { FormDetalleCompra } from "./FormDetalleCompra";

export const TableCompras = () => {
  const [compras, setCompras] = useState([]);
  // const [openModal, setOpenModal] = useState(false);
  // const [compraSeleccionada, setCompraSeleccionada] = useState(null);

  const fetchCompras = async () => {
    try {
      const response = await axios.get("http://192.168.3.20/api/v1/compras", {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      });
      console.log(response.data);
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
                  <th className="p-4">Cliente / Proveedor</th>
                  <th className="p-4">Fecha de Compra</th>
                  <th className="p-4">Total</th>
                  <th className="p-4">Estado</th>
                  <th className="p-4">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {compras.map((compra) => (
                  <tr key={compra.idCompra} className="border-b hover:bg-gray-50">
                    <td className="p-4 items-center">{compra.idCompra}</td>
                    <td className="p-4 items-center">{compra.cliente || "N/A"}</td>
                    <td className="p-4 items-center">{compra.fechaCompra}</td>
                    <td className="p-4 items-center">${compra.total}</td>
                    <td className="p-4 items-center">
                      <span className={`px-2 py-1 rounded text-sm ${compra.estado === 'Completada' ? 'bg-green-200 text-green-800' : 'bg-yellow-200 text-yellow-800'}`}>
                        {compra.estado || "Pendiente"}
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
