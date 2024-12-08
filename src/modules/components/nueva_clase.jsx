import React, { useState, useEffect } from "react";

const CrearClase = ({ nuevaClase, setNuevaClase, instructores, agregar }) => {
  if (!nuevaClase) return null;

  const [formData, setFormData] = useState({
    Nombre_Clase: "",
    Dia_Semana: "Lunes",
    Hora_Inicio: "",
    Hora_Fin: "",
    Duracion: "",
    Capacidad_Maxima: "",
    Nombre_Instructor: "",
  });

  const [isFormValid, setIsFormValid] = useState(false);

  const diasOrdenados = [
    "Lunes",
    "Martes",
    "Miercoles",
    "Jueves",
    "Viernes",
    "Sabado",
    "Domingo",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleKeyDown = (e) => {
    const allowedKeys = ["Backspace", "ArrowLeft", "ArrowRight", "Tab", "Delete"];
    if (!/^\d$/.test(e.key) && !allowedKeys.includes(e.key)) {
      e.preventDefault();
    }
  };

  // Verificar si todos los campos están llenos
  useEffect(() => {
    const { Nombre_Clase, Dia_Semana, Hora_Inicio, Hora_Fin, Duracion, Capacidad_Maxima, Nombre_Instructor } = formData;
    setIsFormValid(
      Nombre_Clase &&
      Dia_Semana &&
      Hora_Inicio &&
      Hora_Fin &&
      Duracion &&
      Capacidad_Maxima &&
      Nombre_Instructor
    );
  }, [formData]);

  const handleConfirmar = () => {
    const instructorId = obtenerIdPorNombre(formData.Nombre_Instructor, instructores);
    if (!instructorId) {
      console.error("Instructor no encontrado");
      return;
    }

    agregar(
      formData.Hora_Inicio,
      formData.Hora_Fin,
      formData.Dia_Semana,
      formData.Capacidad_Maxima,
      formData.Duracion,
      instructorId,
      formData.Nombre_Clase
    );

    setNuevaClase(false);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg w-4/5 max-w-lg p-6 space-y-6">
        <h2 className="text-2xl font-bold text-center text-indigo-600">
          Crear Nueva Clase
        </h2>
        <form className="space-y-4">
          <div className="flex flex-col">
            <label
              htmlFor="Nombre_Clase"
              className="mb-2 text-sm font-medium text-gray-600"
            >
              Nombre de la Clase
            </label>
            <input
              type="text"
              id="Nombre_Clase"
              name="Nombre_Clase"
              value={formData.Nombre_Clase}
              onChange={handleChange}
              placeholder="Ejemplo: Yoga Avanzado"
              className="p-2 border rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              required
            />
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="Dia_Semana"
              className="mb-2 text-sm font-medium text-gray-600"
            >
              Día de la Semana
            </label>
            <select
              id="Dia_Semana"
              name="Dia_Semana"
              value={formData.Dia_Semana}
              onChange={handleChange}
              className="p-2 border rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            >
              {diasOrdenados.map((dia) => (
                <option key={dia} value={dia}>
                  {dia}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="Hora_Inicio"
              className="mb-2 text-sm font-medium text-gray-600"
            >
              Hora de Inicio
            </label>
            <input
              type="time"
              id="Hora_Inicio"
              name="Hora_Inicio"
              value={formData.Hora_Inicio}
              onChange={handleChange}
              className="p-2 border rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              required
            />
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="Hora_Fin"
              className="mb-2 text-sm font-medium text-gray-600"
            >
              Hora de Fin
            </label>
            <input
              type="time"
              id="Hora_Fin"
              name="Hora_Fin"
              value={formData.Hora_Fin}
              onChange={handleChange}
              className="p-2 border rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              required
            />
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="Capacidad_Maxima"
              className="mb-2 text-sm font-medium text-gray-600"
            >
              Capacidad Máxima
            </label>
            <input
              type="text"
              id="Capacidad_Maxima"
              name="Capacidad_Maxima"
              value={formData.Capacidad_Maxima}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              placeholder="Capacidad máxima"
              className="p-2 border rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              required
            />
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="Nombre_Instructor"
              className="mb-2 text-sm font-medium text-gray-600"
            >
              Instructor
            </label>
            <select
              id="Nombre_Instructor"
              name="Nombre_Instructor"
              value={formData.Nombre_Instructor}
              onChange={handleChange}
              className="p-2 border rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              required
            >
              <option value="">Selecciona un instructor</option>
              {instructores.map((instructor) => (
                <option
                  key={instructor.ID_Instructor}
                  value={`${instructor.Nombre} ${instructor.Apellido}`}
                >
                  {instructor.Nombre} {instructor.Apellido}
                </option>
              ))}
            </select>
          </div>
        </form>
        <div className="flex justify-between">
          <button
            onClick={() => setNuevaClase(false)}
            type="button"
            className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-transform transform hover:scale-105"
          >
            CANCELAR
          </button>
          <button
            onClick={handleConfirmar}
            type="button"
            disabled={!isFormValid}
            className={`px-6 py-2 rounded-lg text-white transition-transform transform hover:scale-105 ${
              isFormValid
                ? "bg-blue-600 hover:bg-blue-700"
                : "bg-gray-400 cursor-not-allowed"
            }`}
          >
            CONFIRMAR
          </button>
        </div>
      </div>
    </div>
  );
};

function obtenerIdPorNombre(nombreCompleto, arrayInstructores) {
  const instructor = arrayInstructores.find(
    (instructor) =>
      `${instructor.Nombre} ${instructor.Apellido}` === nombreCompleto
  );
  return instructor ? instructor.ID_Instructor : null;
}

export default CrearClase;