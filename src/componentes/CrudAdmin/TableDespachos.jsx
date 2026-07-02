import { useState, useEffect } from "react";
import { Modal } from "./Modal";
import { FormCierreDespacho } from "./FormCierreDespacho";
import { apiDespacho } from "../../services/api"; 

export const TableDespachos = () => {
  const [despachos, setDespachos] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [despachoSeleccionado, setDespachoSeleccionado] = useState(null);

  const fetchDespachos = async () => {
    try {
      const response = await apiDespacho.get("/api/v1/despachos");
      console.log("Despachos obtenidos:", response.data);
      setDespachos(response.data);
    } catch (error) {
      console.error("Error al obtener despachos:", error);
    }
  };

  useEffect(() => {
    fetchDespachos();
  }, []);

  const handleAbrirModal = (despacho) => {
    setDespachoSeleccionado(despacho);
    setOpenModal(true);
  };

  return (
    <>
      <section className="grid text-center grid-cols-12 mb-8">
        <div className="col-span-12 flex justify-center">
          <div className="col-span-10 p-2 bg-white border border-gray-200 rounded-lg shadow dark:bg-white h-full overflow-hidden">
            <table className="table-fixed w-full">
              <thead>
                <tr className="py-10">
                  <th className="pr-10">Orden de despacho</th>
                  <th className="pr-10">Orden de compra</th>
                  <th className="pr-10">Dirección de entrega</th>
                  <th className="pr-10">Fecha despacho</th>
                  <th className="pr-10">Patente Camión</th>
                  <th className="pr-10">Entregado</th>
                  <th className="pr-10">Intentos de entrega</th>
                </tr>
              </thead>
              <tbody>
                {/* Verificamos que sea un array para evitar errores de renderizado en blanco */}
                {Array.isArray(despachos) && despachos.map((despacho) => (
                  <tr key={despacho.idDespacho}>
                    <td className="pr-10 py-10 items-center">{despacho.idDespacho}</td>
                    <td className="pr-10 py-10 items-center">{despacho.idCompra}</td>
                    <td className="pr-10 py-10 items-center">{despacho.direccionCompra}</td>
                    <td className="pr-10 py-10 items-center">{despacho.fechaDespacho}</td>
                    <td className="pr-10 py-10 items-center">{despacho.patenteCamion}</td>
                    <td className="pr-10 py-10 items-center font-bold">
                      {/* Corregido: usamos 'despachado' y validamos si es true o 1 */}
                      {(despacho.despachado === true || despacho.despachado === 1) 
                        ? "Despacho entregado" 
                        : "Despacho pendiente"}
                    </td>
                    <td className="pr-10 py-10 items-center">{despacho.intento}</td>
                    <td>
                      <button
                        onClick={() => handleAbrirModal(despacho)}
                        className="py-1 bg-orange-200 px-8 rounded-xl shadow-md hover:bg-orange-300/70 transition-all duration-300"
                      >
                        Cerrar despacho
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <Modal
        onClose={() => setOpenModal(false)}
        open={openModal}
      >
        {despachoSeleccionado && (
          <FormCierreDespacho
            despacho={despachoSeleccionado}
            onClose={() => {
              setOpenModal(false);
              fetchDespachos(); // Recargamos la tabla al cerrar el modal
            }}
          />
        )}
      </Modal>
    </>
  );
};
