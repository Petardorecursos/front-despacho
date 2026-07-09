import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import axios from "axios";

export const FormCierreDespacho = ({ despacho, onClose }) => {
  const { register, handleSubmit } = useForm();

  // URL del LoadBalancer de tu back-despachos (asegurada)
  const API_URL = "http://aa5b3d53e0ee840eab086584460c245c-1682991390.us-east-1.elb.amazonaws.com:8080";

  const onSubmit = async (data) => {
    console.log("Datos enviados desde el formulario:", data);
    
    // Construcción del objeto para enviar al backend
    const jsonData = {
      ...despacho, 
      intento: parseInt(data.intento, 10),
      // Conversión explícita a booleano
      despachado: data.despachado === "true", 
    };

    console.log("Enviando actualización al backend:", jsonData);

    try {
      // Usamos PUT para actualizar el registro existente
      await axios.put(`${API_URL}/api/v1/despachos/${despacho.idDespacho}`, jsonData, {
        headers: {
            'Content-Type': 'application/json'
        }
      });
      
      Swal.fire({
        title: "Despacho modificado 🛻!",
        text: "El estado y los intentos se han actualizado correctamente.",
        icon: "success",
        confirmButtonText: "Aceptar",
      });
      
      onClose(); // Esto cierra el modal y recarga la tabla
    } catch (error) {
      console.error("Error en la solicitud:", error);
      Swal.fire({
        title: "Error",
        text: "No se pudo modificar el despacho, revisa la conexión con el servidor.",
        icon: "error",
        confirmButtonText: "Aceptar",
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col justify-center text-center px-10 text-lg"
    >
      <div className="mx-auto text-3xl font-bold mb-8 text-teal-600">
        Editar y cierre de despacho
      </div>

      <div className="mb-4">
        <label className="block font-bold mb-1">ID despacho</label>
        <input disabled={true} type="text" className="border border-gray-300 rounded-lg block w-full p-2 text-slate-400 bg-gray-50" value={despacho.idDespacho} />
      </div>

      <div className="mb-4">
        <label className="block font-bold mb-1">Fecha despacho</label>
        <input type="date" className="border border-gray-300 rounded-lg block w-full p-2 text-slate-400 bg-gray-50" value={despacho.fechaDespacho} disabled={true} />
      </div>

      <div className="mb-4">
        <label className="block font-bold mb-1">Patente Camión</label>
        <input type="text" disabled={true} value={despacho.patenteCamion} className="border border-gray-300 rounded-lg block w-full p-2 text-slate-400 bg-gray-50" />
      </div>

      <div className="mb-4">
        <label className="block font-bold mb-1">Intentos de entrega</label>
        <input
          type="number"
          defaultValue={despacho.intento}
          className="border border-gray-300 rounded-lg block w-full p-2"
          {...register("intento", { required: true })}
        />
      </div>

      <div className="mb-4">
        <label className="block font-bold mb-1">Estado del Despacho</label>
        <select
          defaultValue={String(despacho.despachado)}
          className="border border-gray-300 rounded-lg block w-full p-2"
          {...register("despachado", { required: true })}
        >
          <option value="false">Despacho abierto</option>
          <option value="true">Cerrar despacho</option>
        </select>
      </div>

      <div className="mb-4 text-left grid grid-cols-2 gap-4">
         <div>
            <label className="block font-bold mb-1">ID Compra</label>
            <input disabled={true} value={despacho.idCompra} className="border border-gray-300 rounded-lg block w-full p-2 text-slate-400 bg-gray-50" />
         </div>
         <div>
            <label className="block font-bold mb-1">Valor</label>
            <input disabled={true} value={`$${despacho.valorCompra}`} className="border border-gray-300 rounded-lg block w-full p-2 text-slate-400 bg-gray-50" />
         </div>
      </div>

      <button
        className="py-4 px-10 mt-6 rounded-lg bg-teal-600 text-white font-bold hover:bg-teal-700 transition-all"
        type="submit"
      >
        Modificar Despacho
      </button>
    </form>
  );
};
