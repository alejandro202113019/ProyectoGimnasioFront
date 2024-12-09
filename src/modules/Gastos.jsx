import React, { useState, useEffect } from "react";
import axios from "axios";

const Gastos = () => {
  // Estado para almacenar los gastos
  const [gastos, setGastos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Estado para el formulario de registro de gastos
  const [nuevoGasto, setNuevoGasto] = useState({
    Descripcion: '',
    Monto: '',
    Fecha_Gasto: '',
    Metodo_Pago: 'Efectivo' // Valor predeterminado
  });

  // Función para cargar los datos desde la API
  const fetchGastos = async () => {
    try {
      const response = await axios.get("https://proyectogimnasioback.onrender.com/api/gastos");
      setGastos(response.data);
      setLoading(false);
    } catch (err) {
      console.error("Error al obtener los datos de gastos:", err);
      setError("No se pudieron cargar los datos");
      setLoading(false);
    }
  };

  // Cargar gastos al montar el componente
  useEffect(() => {
    fetchGastos();
  }, []);

  // Manejar cambios en los inputs del formulario
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNuevoGasto(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  // Manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validar campos
    if (!nuevoGasto.Descripcion || !nuevoGasto.Monto || !nuevoGasto.Fecha_Gasto) {
      alert('Por favor, complete todos los campos');
      return;
    }

    try {
      // Enviar solicitud POST para crear nuevo gasto
      await axios.post("https://proyectogimnasioback.onrender.com/api/gastos", {
        Descripcion: nuevoGasto.Descripcion,
        Monto: parseFloat(nuevoGasto.Monto),
        Fecha_Gasto: nuevoGasto.Fecha_Gasto,
        Metodo_Pago: nuevoGasto.Metodo_Pago
      });

      // Limpiar formulario
      setNuevoGasto({
        Descripcion: '',
        Monto: '',
        Fecha_Gasto: '',
        Metodo_Pago: 'Efectivo'
      });

      // Recargar la lista de gastos
      fetchGastos();

      alert('Gasto registrado exitosamente');
    } catch (err) {
      console.error("Error al registrar el gasto:", err);
      alert('No se pudo registrar el gasto');
    }
  };

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
        <form onSubmit={handleSubmit} className="flex flex-wrap gap-4 mb-6">
          <input
            type="text"
            name="Descripcion"
            placeholder="Descripción"
            value={nuevoGasto.Descripcion}
            onChange={handleInputChange}
            className="w-full sm:w-1/3 border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="number"
            name="Monto"
            placeholder="Monto"
            value={nuevoGasto.Monto}
            onChange={handleInputChange}
            step="0.01"
            min="0"
            className="w-full sm:w-1/3 border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="date"
            name="Fecha_Gasto"
            value={nuevoGasto.Fecha_Gasto}
            onChange={handleInputChange}
            className="w-full sm:w-1/3 border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500"
            required
          />
          <select
            name="Metodo_Pago"
            value={nuevoGasto.Metodo_Pago}
            onChange={handleInputChange}
            className="w-full sm:w-1/3 border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500"
          >
            <option value="Efectivo">Efectivo</option>
            <option value="Tarjeta de Crédito">Tarjeta de Crédito</option>
            <option value="Tarjeta de Débito">Tarjeta de Débito</option>
            <option value="Transferencia">Transferencia</option>
          </select>
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
              <th className="border border-gray-300 px-4 py-2">Método de Pago</th>
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
                  <td className="border border-gray-300 px-4 py-2">{gasto.Metodo_Pago}</td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    {new Date(gasto.Fecha_Gasto).toLocaleDateString()}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-4 text-gray-500">
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