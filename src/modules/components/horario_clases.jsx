import React, { useState } from "react";

const HorarioClases = ({ clases }) => {
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

  if (clases !== null && Array.isArray(clases)) {
    // Agrupa las clases por día
    const clasesPorDia = diasOrdenados.reduce((acc, dia) => {
      acc[dia] = clases.filter((clase) => clase.Dia_Semana === dia);
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

        {/* Tablas de Clases */}
        {diasOrdenados
          .filter((dia) => diaSeleccionado === "Todos" || dia === diaSeleccionado)
          .map((dia) => (
            <div key={dia} className="mb-4">
              <h2 className="text-lg font-bold text-indigo-600 mb-2">{dia}</h2>
              <table className="min-w-full bg-white border border-gray-300 shadow-md rounded-lg overflow-hidden">
                <thead>
                  <tr className="bg-indigo-600 text-white">
                    <th className="border border-gray-300 px-4 py-2">Hora Inicio</th>
                    <th className="border border-gray-300 px-4 py-2">Hora Fin</th>
                    <th className="border border-gray-300 px-4 py-2">Clase</th>
                    <th className="border border-gray-300 px-4 py-2">Instructor</th>
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
                          {clase.Nombre_Instructor}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="3"
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

export default HorarioClases;