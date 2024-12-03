import { useState } from "react";

export default function Asignar({ asignar, setAsignar, changeUpdate, data, planes, nombre, id, idClienteMembresia, agregar, actualizar }) {
    const [nombrePlan, setNombrePlan] = useState(planes !== null ? planes[0].Nombre_Plan : "");

    const descripcion = (nombre, planes) => {
        const planEncontrado = planes.find(element => element.Nombre_Plan === nombre);
        return planEncontrado ? 'Nombre: ' + planEncontrado.Nombre_Plan + '\n' +
                'Descripción: ' + planEncontrado.Descripcion + '\n' +
                'Duración: ' + planEncontrado.Duracion + '\n' +
                'Precio: ' + planEncontrado.Precio : null;
    }

    const dias = (nombre, planes) => {
        const planEncontrado = planes.find(element => element.Nombre_Plan === nombre);
        return planEncontrado ? planEncontrado.Duracion : null;
    }

    const buscarMembresia = (data, id) => {

        if (Array.isArray(data)) {
            const planEncontrado = data.find(element => element.ID_Cliente_Membresia === id);
            return planEncontrado ? true : false;
        }

        if (data.ID_Cliente_Membresia) {
            return true
        }
    };

    const idPlan = (nombre, planes) => {
        const planEncontrado = planes.find(element => element.Nombre_Plan === nombre);
        return planEncontrado ? planEncontrado.ID_Plan : null;
    }

    const agegarMembresia = (estado, fecha_inicio, fecha_fin, id, idClienteMembresia, id_plan) => {
        console.log(buscarMembresia(data, id))
        if (buscarMembresia(data, id)) {
            actualizar(estado, fecha_inicio, fecha_fin, id, id_plan)
        } else {
            agregar(estado, fecha_inicio, fecha_fin, id, id_plan)
        }
    }

    const obtenerFechaActual = () => {
        const fecha = new Date();
        const año = fecha.getFullYear();
        const mes = String(fecha.getMonth() + 1).padStart(2, '0'); // Asegura dos dígitos
        const día = String(fecha.getDate()).padStart(2, '0'); // Asegura dos dígitos
    
        // Formato YYYY-MM-DD
        return `${año}-${mes}-${día}`;
    };

    const obtenerFechaConDias = (dias) => {
        const fecha = new Date();
        fecha.setDate(fecha.getDate() + dias); // Suma los días a la fecha actual
    
        const año = fecha.getFullYear();
        const mes = String(fecha.getMonth() + 1).padStart(2, '0'); // Asegura dos dígitos
        const día = String(fecha.getDate()).padStart(2, '0'); // Asegura dos dígitos
    
        return `${año}-${mes}-${día}`;
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
                        className="w-full p-2 border rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none">
                        {   
                            planes.map((opcion) =>(
                                <option value={opcion.Nombre_Plan}>{opcion.Nombre_Plan}</option>
                            ))
                         }
                    </select>
                </div>

                {/* Descripción del Plan */}
                <div>
                    <textarea value={descripcion(
                                nombrePlan,
                                planes
                                )} defaultValue={planes !== null ?  'Nombre: ' + planes[0].Nombre_Plan + '\n' +
                                                                    'Descripción: ' + planes[0].Descripcion + '\n' +
                                                                    'Duración: ' + planes[0].Duracion + '\n' +
                                                                    'Precio: ' + planes[0].Precio  : ""} 
                        className="ring-2 ring-blue-500 w-full h-full min-h-28"></textarea>
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
                        onClick={() => agegarMembresia(
                                "Inactiva",
                                obtenerFechaActual(),
                                obtenerFechaActual(),
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
