import { useState } from "react";

export default function Asignar({ asignar, setAsignar, changeUpdate, data, planes, nombre, id, idClienteMembresia, agregar, actualizar }) {
    const [nombrePlan, setNombrePlan] = useState(planes?.length ? planes[0].Nombre_Plan : "");

    // Funciones reutilizables
    const obtenerPlan = (nombre, planes) => planes?.find((element) => element.Nombre_Plan === nombre) || null;

    const descripcion = (nombre, planes) => {
        const plan = obtenerPlan(nombre, planes);
        return plan
            ? `Nombre: ${plan.Nombre_Plan}\nDescripción: ${plan.Descripcion}\nDuración: ${plan.Duracion}\nPrecio: ${plan.Precio}`
            : "Información no disponible.";
    };

    const dias = (nombre, planes) => {
        const plan = obtenerPlan(nombre, planes);
        return plan?.Duracion || 0;
    };

    const buscarMembresia = (data, id) => {
        if (!data) return false;
        return Array.isArray(data)
            ? data.some((element) => element.ID_Cliente_Membresia === parseInt(id) || element.ID_Cliente === parseInt(id))
            : data.ID_Cliente_Membresia === parseInt(id) || data.ID_Cliente === parseInt(id);
    };

    const idPlan = (nombre, planes) => obtenerPlan(nombre, planes)?.ID_Plan || null;

    const agregarMembresia = (estado, fecha_inicio, fecha_fin, id, idClienteMembresia, id_plan) => {
        if (buscarMembresia(data, idClienteMembresia)) {
            actualizar(estado, fecha_inicio, fecha_fin, id, id_plan);
        } else {
            agregar(estado, fecha_inicio, fecha_fin, id, id_plan);
        }
    };

    const obtenerFechaActual = () => new Date().toISOString().split("T")[0];

    const obtenerFechaConDias = (dias) => {
        const fecha = new Date();
        fecha.setDate(fecha.getDate() + dias);
        return fecha.toISOString().split("T")[0];
    };

    if (!asignar) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg shadow-lg w-4/5 max-w-lg p-6 space-y-6">
                <h2 className="text-2xl font-bold text-center text-gray-800">Asignar Membresía</h2>

                {/* Información del Cliente */}
                <div className="space-y-2">
                    <textarea
                        readOnly
                        value={`Documento: ${id}`}
                        className="w-full p-2 border rounded-md focus:outline-none bg-gray-100"
                    />
                    <textarea
                        readOnly
                        value={nombre}
                        className="w-full p-2 border rounded-md focus:outline-none bg-gray-100"
                    />
                </div>

                {/* Selección de Plan */}
                <div className="space-y-2">
                    <label htmlFor="Nombre" className="text-sm font-medium text-gray-600">
                        Selecciona un Plan
                    </label>
                    <select
                        value={nombrePlan}
                        onChange={(e) => setNombrePlan(e.target.value)}
                        id="Nombre"
                        className="w-full p-2 border rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    >
                        {planes?.map((opcion) => (
                            <option key={opcion.ID_Plan} value={opcion.Nombre_Plan}>
                                {opcion.Nombre_Plan}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Descripción del Plan */}
                <div>
                    <textarea
                        readOnly
                        value={descripcion(nombrePlan, planes)}
                        className="w-full p-2 border rounded-md focus:outline-none bg-gray-100"
                    />
                </div>

                {/* Botones de Acción */}
                <div className="flex justify-between">
                    <button
                        onClick={() => setAsignar(false)}
                        type="button"
                        className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-transform transform hover:scale-105"
                    >
                        CANCELAR
                    </button>
                    <button
                        onClick={() =>
                            agregarMembresia(
                                "Activa",
                                obtenerFechaActual(),
                                obtenerFechaConDias(dias(nombrePlan, planes)),
                                id,
                                idClienteMembresia,
                                idPlan(nombrePlan, planes)
                            )
                        }
                        type="button"
                        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-transform transform hover:scale-105"
                    >
                        CONFIRMAR
                    </button>
                </div>
            </div>
        </div>
    );
}
