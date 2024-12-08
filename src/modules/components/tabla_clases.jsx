import React, { useState } from "react";

const TablaClases = ({ datos, setConfirmar, setId }) => {
  const diasOrdenados = [
    "Lunes",
    "Martes",
    "Miercoles",
    "Jueves",
    "Viernes",
    "Sabado",
    "Domingo",
  ];

  const [diaSeleccionado, setDiaSeleccionado] = useState("Todos");

  const setDatos = (confirmar, id) => {
    setConfirmar(confirmar)
    setId(id)
  }

  if (datos !== null && Array.isArray(datos)) {
    // Agrupa las clases por día de la semana
    const clasesPorDia = diasOrdenados.reduce((acc, dia) => {
      acc[dia] = datos.filter((clase) => clase.Dia_Semana === dia);
      return acc;
    }, {});

    return (
      <div className="flex flex-col w-full">
        {/* Filtro */}
        <div className="mb-4">
          <label
            htmlFor="filtroDia"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Filtrar por día:
          </label>
          <select
            id="filtroDia"
            className="block w-1/3 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            value={diaSeleccionado}
            onChange={(e) => setDiaSeleccionado(e.target.value)}
          >
            <option value="Todos">Todos</option>
            {diasOrdenados.map((dia) => (
              <option key={dia} value={dia}>
                {dia}
              </option>
            ))}
          </select>
        </div>

        {/* Tablas por día */}
        {diasOrdenados
          .filter((dia) => diaSeleccionado === "Todos" || dia === diaSeleccionado)
          .map((dia) => (
            <div key={dia} className="mb-6">
              <h2 className="text-lg font-bold text-indigo-600 mb-2">{dia}</h2>
              <table className="min-w-full bg-white border border-gray-300 shadow-md rounded-lg overflow-hidden">
                <thead>
                  <tr className="bg-indigo-600 text-white">
                    <th className="border border-gray-300 px-4 py-2">Hora Inicio</th>
                    <th className="border border-gray-300 px-4 py-2">Hora Fin</th>
                    <th className="border border-gray-300 px-4 py-2">Clase</th>
                    <th className="border border-gray-300 px-4 py-2">Capacidad Máxima</th>
                    <th className="border border-gray-300 px-4 py-2">Instructor</th>
                    <th className="border border-gray-300 px-4 py-2">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {clasesPorDia[dia].length > 0 ? (
                    clasesPorDia[dia].map((clase) => (
                      <tr key={clase.ID_Horario} className="text-center">
                        <td className="border border-gray-300 px-4 py-2">
                          {clase.Hora_Inicio}
                        </td>
                        <td className="border border-gray-300 px-4 py-2">
                          {clase.Hora_Fin}
                        </td>
                        <td className="border border-gray-300 px-4 py-2">
                          {clase.Nombre_Clase}
                        </td>
                        <td className="border border-gray-300 px-4 py-2">
                          {clase.Capacidad_Maxima}
                        </td>
                        <td className="border border-gray-300 px-4 py-2">
                          {clase.Nombre_Instructor}
                        </td>
                        <td className="border border-gray-300 px-4 py-2">
                          <button
                            onClick={() => setDatos(true, clase.ID_Clase)}
                            type="button"
                            className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md shadow-sm transition duration-200 ease-in-out m-1"
                          >
                            <i className="fas fa-trash-alt"></i> ELIMINAR
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="7"
                        className="border border-gray-300 px-4 py-2 text-gray-500 italic"
                      >
                        No hay clases programadas.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          ))}
      </div>
    );
  } else {
    return null;
  }
};

export default TablaClases;