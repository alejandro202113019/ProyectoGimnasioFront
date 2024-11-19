import { useEffect, useState } from "react"

export default function Asignar( {asignar, changeUpdate, data, planes, nombre, id, idClienteMembresia, agregar, actualizar} ) {
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
        // Si data es null o undefined, retornar false
        if (!data) return false;
    
        // Para búsqueda en array de membresias
        if (Array.isArray(data)) {
            return data.some(element => 
                element.ID_Cliente_Membresia === parseInt(id) || 
                element.ID_Cliente === parseInt(id)
            );
        }
    
        // Para objeto individual
        return data.ID_Cliente_Membresia === parseInt(id) || 
               data.ID_Cliente === parseInt(id);
    }

    const idPlan = (nombre, planes) => {
        const planEncontrado = planes.find(element => element.Nombre_Plan === nombre);
        return planEncontrado ? planEncontrado.ID_Plan : null;
    }

    const agegarMembresia = (estado, fecha_inicio, fecha_fin, id, idClienteMembresia, id_plan) => {
        if (buscarMembresia(data, idClienteMembresia)) {
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

    if (asignar) {
        return (
            <>
                <div className="fixed w-full h-full grid grid-cols-10 grid-rows-7">
                    <div className="rounded-xl grid grid-cols-10 grid-rows-10 row-start-2 col-span-5 col-end-8 row-span-5 bg-indigo-400">
                        <div className="rounded-xl col-span-10 row-start-2 text-center text-white text-5xl">
                            Asignar Membresia
                        </div>
                        <div className=" rounded-xl col-span-5 row-start-5 col-end-6 flex justify-center">
                            <textarea value={`Documento: ${id}`} className="ring-2 ring-blue-500 w-11/12 h-4/6"></textarea>
                        </div>
                        <div className=" rounded-xl col-span-5 row-start-5 col-end-11 flex justify-center">
                            <textarea value={nombre} className="ring-2 ring-blue-500 w-11/12 h-4/6"></textarea>
                        </div>
                        <div className=" rounded-xl col-span-3 row-start-6 col-end-4 flex justify-center">
                            <select value={nombrePlan} onChange={(e) => setNombrePlan(e.target.value)} id="Nombre" className="ring-2 ring-blue-500 w-11/12 h-4/6">
                                {   
                                    planes.map((opcion) =>(
                                        <option value={opcion.Nombre_Plan}>{opcion.Nombre_Plan}</option>
                                    ))
                                }
                            </select>
                        </div>
                        <div className=" rounded-xl col-span-7 row-start-6 row-span-4 col-end-11 flex justify-center">
                            <textarea value={descripcion(
                                nombrePlan,
                                planes
                                )} defaultValue={planes !== null ?  'Nombre: ' + planes[0].Nombre_Plan + '\n' +
                                                                    'Descripción: ' + planes[0].Descripcion + '\n' +
                                                                    'Duración: ' + planes[0].Duracion + '\n' +
                                                                    'Precio: ' + planes[0].Precio  : ""} 
                                className="ring-2 ring-blue-500 w-11/12 h-4/6"></textarea>
                        </div>
                        <div className="rounded-xl row-start-10 col-span-2 col-end-9 flex justify-center">
                            <button onClick={(e) => changeUpdate(false)} type="button" className="rounded-xl cursor-pointer bg-green-500 transition ease-in-out 
                            delay-60 hover:-translate-y-1 hover:scale-95 duration-60 w-11/12 h-5/6">CANCELAR</button>
                        </div>
                        <div className="rounded-xl row-start-10 col-span-2 col-end-11 flex justify-center">
                            <button onClick={
                                (e) => agegarMembresia(
                                    "Activa",
                                    obtenerFechaActual(),
                                    obtenerFechaConDias(dias(nombrePlan, planes)),
                                    id,
                                    idClienteMembresia,
                                    idPlan(nombrePlan, planes)
                                )
                            } type="button" className={`rounded-xl cursor-pointer bg-blue-600 transition ease-in-out 
                                delay-60 hover:-translate-y-1 hover:scale-95 duration-60 w-11/12 h-5/6`}>CONFIRMAR</button>
                        </div>
                    </div>
                </div>
            </>
        )
    }

}