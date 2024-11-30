export default function TablaMembresias({data, chageConfirmation, changeUpdate}) {
    if (data !== null && Array.isArray(data)) {
        return (
            <table id="tablaclientes" className="min-w-full bg-white border border-gray-300 shadow-md rounded-lg overflow-hidden">
            <thead>
                        <tr className="bg-indigo-600 text-white">
                            <th className="border border-slate-600">ID</th>
                            <th className="border border-slate-600">Nombre</th>
                            <th className="border border-slate-600">Plan</th>
                            <th className="border border-slate-600">Descripción</th>
                            <th className="border border-slate-600">Fecha inicio</th>
                            <th className="border border-slate-600">Fecha Fin</th>
                            <th className="border border-slate-600">Estado membresia</th>
                            <th className="border border-slate-600">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data.map((membresia) => (
                                <tr key={membresia.ID_Cliente}>
                                    <td className="border border-slate-700 text-center">{membresia.ID_Cliente}</td>
                                    <td className="border border-slate-700 text-center">{membresia.nombre}</td>
                                    <td className="border border-slate-700 text-center">{membresia.Nombre_Plan}</td>
                                    <td className="border border-slate-700 text-center">{membresia.Descripcion}</td>
                                    <td className="border border-slate-700 text-center">{formatDate(membresia.Fecha_Inicio)}</td>
                                    <td className="border border-slate-700 text-center">{formatDate(membresia.Fecha_Fin)}</td>
                                    <td className="border border-slate-700 text-center">{membresia.Estado}</td>
                                    <td className="border border-slate-700 grid grid-cols-1">
                                        <button onClick={(e) => changeUpdate(
                                            true,
                                            membresia.Nombre,
                                            membresia.Apellido,
                                            membresia.Fecha_Nacimiento,
                                            membresia.ID_Cliente,
                                            membresia.Email,
                                            membresia.Telefono
                                        )} type="button" className="bg-indigo-500 hover:bg-indigo-600 text-white py-2 px-4 rounded-md shadow-sm transition duration-200 ease-in-out m-1">
                                            <i className="fas fa-coins"></i> PAGAR</button>
                                        <button onClick={(e) => changeUpdate(
                                                    true,
                                                    membresia.ID_Cliente,
                                                    membresia.ID_Cliente_Membresia,
                                                    membresia.nombre
                                        )} type="button" className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md shadow-sm transition duration-200 ease-in-out m-1">
                                            <i className="fas fa-edit"></i> ASIGNAR</button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
            </table>
        )
    } else if (!Array.isArray(data) && data !== null && !data.error) {
        return (
            <table className="min-w-full bg-white border border-gray-300 shadow-md rounded-lg overflow-hidden">
            <thead>
                        <tr className="bg-indigo-600 text-white">
                            <th className="border border-slate-600">ID</th>
                            <th className="border border-slate-600">Nombre</th>
                            <th className="border border-slate-600">Plan</th>
                            <th className="border border-slate-600">Descripción</th>
                            <th className="border border-slate-600">Fecha inicio</th>
                            <th className="border border-slate-600">Fecha Fin</th>
                            <th className="border border-slate-600">Estado membresia</th>
                            <th className="border border-slate-600">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr key={data.ID_Cliente}>
                            <td className="border border-slate-700 text-center">{data.ID_Cliente}</td>
                            <td className="border border-slate-700 text-center">{data.nombre}</td>
                            <td className="border border-slate-700 text-center">{data.Nombre_Plan}</td>
                            <td className="border border-slate-700 text-center">{data.Descripcion}</td>
                            <td className="border border-slate-700 text-center">{formatDate(data.Fecha_Inicio)}</td>
                            <td className="border border-slate-700 text-center">{formatDate(data.Fecha_Fin)}</td>
                            <td className="border border-slate-700 text-center">{data.Estado}</td>
                            <td className="border border-slate-700 grid grid-cols-1">
                                <button onClick={(e) => changeUpdate(
                                            true,
                                            data.Nombre,
                                            data.Apellido,
                                            data.Fecha_Nacimiento,
                                            data.ID_Cliente,
                                            data.Email,
                                            data.Telefono
                                        )} type="button" className="bg-indigo-500 hover:bg-indigo-600 text-white py-2 px-4 rounded-md shadow-sm transition duration-200 ease-in-out m-1">
                                    <i className="fas fa-coins"></i> PAGAR</button>
                                <button onClick={(e) => changeUpdate(
                                            true,
                                            data.ID_Cliente,
                                            data.ID_Cliente_Membresia,
                                            data.nombre
                                )} type="button" className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md shadow-sm transition duration-200 ease-in-out m-1">
                                    <i className="fas fa-edit"></i> ASIGNAR</button>
                            </td>
                        </tr>
                    </tbody>
            </table>
        )
    } else {
        return (
            <></>
        )
    }
}

function formatDate(dateString) {

    if (dateString === null) {
        return null;
    }

    // Convertir el string de fecha a un objeto Date
    const date = new Date(dateString);

    // Obtener el día, mes y año
    const day = date.getUTCDate();
    const month = date.toLocaleString('default', { month: 'long' }); // Mes en texto
    const year = date.getUTCFullYear();

    // Retornar en el formato deseado
    return `${day} de ${month} de ${year}`;
}