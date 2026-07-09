import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import axios from "axios";

export const FormDespacho = ({ venta, onClose }) => {
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    console.log("Iniciando registro de despacho...");
    
    // JSON para crear el despacho (API Despachos)
    const jsonData = {
      fechaDespacho: data.fechaDespacho,
      patenteCamion: data.patenteCamion,
      intento: 0,
      entregado: false,
      idCompra: venta.idVenta,
      direccionCompra: venta.direccionCompra,
      valorCompra: venta.valorCompra,
    };

    // JSON para actualizar la venta (API Ventas)
    const jsonDataSales = {
      despachoGenerado: true,
    };

    try {
      // 1. Actualizamos la Venta (Marcamos como despachado)
      // URL del LoadBalancer de back-ventas
      await axios.put(
        `http://a05f489a54a574dda9112b28db4bdf92-2135110527.us-east-1.elb.amazonaws.com:8080/api/v1/ventas/${venta.idVenta}`,
        jsonDataSales,
        {
          headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' }
        }
      );

      // 2. Creamos el nuevo Despacho
      // URL del LoadBalancer de back-despachos
      await axios.post(
        "http://aa5b3d53e0ee840eab086584460c245c-1682991390.us-east-1.elb.amazonaws.com:8080/api/v1/despachos", 
        jsonData, 
        {
          headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' }
        }
      );

      Swal.fire({
        title: "Despacho registrado 🛻!",
        text: "El despacho ha sido generado con éxito y la orden de compra fue actualizada.",
        icon: "success",
        confirmButtonText: "Aceptar",
      });

      // Cerramos el modal y refrescamos la tabla
      onClose();

    } catch (error) {
      console.error("Error en la solicitud:", error);
      Swal.fire({
        title: "Error",
        text: "Hubo un problema al registrar el despacho. Revisa la consola.",
        icon: "error",
      });
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col justify-center text-center px-24 text-xl"
      >
        <div className="mx-auto text-3xl font-bold mb-10 text-teal-600">
          Ingreso de orden de despacho
        </div>
        
        <div className="mb-5">
          <label className="block font-bold mb-2">Fecha de despacho</label>
          <input
            type="date"
            className="border border-gray-300 rounded-lg block w-full p-1"
            {...register("fechaDespacho", { required: true })}
          />
        </div>
        
        <div className="mb-5">
          <label className="block font-bold mb-2">Patente de camión</label>
          <input
            type="text"
            placeholder="Ej: AB-1234"
            className="border border-gray-300 rounded-lg block w-full p-1"
            {...register("patenteCamion", { required: true })}
          />
        </div>
        
        <div className="mb-5">
          <label className="block font-bold mb-2">Orden de compra asociado</label>
          <input
            type="number"
            disabled={true}
            value={venta.idVenta}
            className="border border-gray-300 rounded-lg block w-full text-slate-400 p-1"
          />
        </div>
        
        <div className="mb-5">
          <label className="block font-bold mb-2">Dirección de entrega</label>
          <input
            type="text"
            disabled={true}
            value={venta.direccionCompra}
            className="border border-gray-300 rounded-lg block w-full text-slate-400 p-1"
          />
        </div>
        
        <div className="mb-5">
          <label className="block font-bold mb-2">Valor de compra</label>
          <input
            type="number"
            value={venta.valorCompra}
            className="border border-gray-300 rounded-lg block w-full text-slate-400 p-1"
            disabled={true}
          />
        </div>

        <button
          className="py-6 px-14 rounded-lg bg-teal-600 text-white font-bold mb-14 hover:bg-teal-700 transition-colors"
          type="submit"
        >
          Asignar despacho
        </button>
      </form>
    </>
  );
};
