import React, { useState, useEffect } from "react";
import axios from "axios";

const Gastos = () => {
  // Estado para almacenar los gastos
  const [gastos, setGastos] = useState([]);
  const [loading, setLoading] = useState(true); // Para mostrar un indicador de carga
  const [error, setError] = useState(null); // Para manejar errores

  // Función para cargar los datos desde la API
  useEffect(() => {
    const fetchGastos = async () => {
      try {
        const response = await axios.get("http://localhost:5001/api/gastos");
        setGastos(response.data); // Guardar los datos en el estado
        setLoading(false); // Ocultar indicador de carga
      } catch (err) {
        console.error("Error al obtener los datos de gastos:", err);
        setError("No se pudieron cargar los datos");
        setLoading(false); // Ocultar indicador de carga en caso de error
      }
    };

    fetchGastos();
  }, []);

  // Renderizar el contenido dependiendo del estado
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg text-blue-600 font-semibold">Cargando datos...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg text-red-500 font-semibold">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
        {/* Formulario */}
        <h2 className="text-xl font-bold mb-4 text-blue-700">Registrar Gasto</h2>
        <form className="flex flex-wrap gap-4 mb-6">
          <input
            type="text"
            placeholder="Descripción"
            className="w-full sm:w-1/3 border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="number"
            placeholder="Monto"
            className="w-full sm:w-1/3 border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="date"
            className="w-full sm:w-1/3 border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="bg-blue-700 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Registrar Gasto
          </button>
        </form>
        <hr className="my-4" />
        {/* Tabla de gastos */}
        <h3 className="text-lg font-bold mb-4 text-blue-700">Listado de Gastos</h3>
        <table className="w-full border-collapse border border-gray-200 rounded-lg">
          <thead>
            <tr className="bg-blue-700 text-white">
              <th className="border border-gray-300 px-4 py-2">ID</th>
              <th className="border border-gray-300 px-4 py-2">Descripción</th>
              <th className="border border-gray-300 px-4 py-2">Monto</th>
              <th className="border border-gray-300 px-4 py-2">Fecha</th>
            </tr>
          </thead>
          <tbody>
            {gastos.length > 0 ? (
              gastos.map((gasto) => (
                <tr key={gasto.ID_Gasto} className="odd:bg-gray-100">
                  <td className="border border-gray-300 px-4 py-2 text-center">{gasto.ID_Gasto}</td>
                  <td className="border border-gray-300 px-4 py-2">{gasto.Descripcion}</td>
                  <td className="border border-gray-300 px-4 py-2 text-right">
                    ${parseFloat(gasto.Monto).toFixed(2)}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    {new Date(gasto.Fecha_Gasto).toLocaleDateString()}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center py-4 text-gray-500">
                  No hay gastos registrados
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Gastos;
