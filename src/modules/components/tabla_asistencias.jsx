export default function TablaInventario({data, chageConfirmation, changeUpdate,changeConfirmationSalida}) {
    if (data !== null && Array.isArray(data)) {
        return (
            <table id="tablaclientes" className="min-w-full bg-white border border-gray-300 shadow-md rounded-lg overflow-hidden">
                <thead>
                <tr className="bg-indigo-600 text-white">
                    <th className="border border-slate-600">ID_Cliente</th>
                    <th className="border border-slate-600">NombreCompleto</th>
                    <th className="border border-slate-600">FechaAsistencia</th>
                    <th className="border border-slate-600">HoraEntrada</th>
                    <th className="border border-slate-600">HoraSalida</th>
                    <th className="border border-slate-600">Acciones</th>
                </tr>
                </thead>
                <tbody>
                {
                    data.slice().reverse().map((plan) => (
                        <tr key={plan.ID_Asistencia}>
                            <td className="border border-slate-700 text-center">{plan.ID_Cliente}</td>
                            <td className="border border-slate-700 text-center">{plan.NombreCompleto}</td>
                            <td className="border border-slate-700 text-center">{formatDate(plan.FechaAsistencia)}</td>
                            <td className="border border-slate-700 text-center">{plan.Hora_Entrada}</td>
                            <td className="border border-slate-700 text-center">{plan.Hora_Salida}</td>
                            <td className="border border-slate-700 grid grid-cols-1">
                                <button onClick={(e) => changeConfirmationSalida(
                                    true,
                                    plan.ID_Asistencia

                                )} type="button"
                                        className="bg-indigo-500 hover:bg-indigo-600 text-white py-2 px-4 rounded-md shadow-sm transition duration-200 ease-in-out m-1">
                                    <i className="fas fa-edit"></i> REGISTRAR_HORA_SALIDA
                                </button>
                                <button onClick={(e) => chageConfirmation(true, plan.ID_Asistencia)} type="button"
                                        className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md shadow-sm transition duration-200 ease-in-out m-1">
                                    <i className="fas fa-trash-alt"></i> ELIMINAR
                                </button>
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
                    <th className="border border-slate-600">ID_Cliente</th>
                    <th className="border border-slate-600">NombreCompleto</th>
                    <th className="border border-slate-600">FechaAsistencia</th>
                    <th className="border border-slate-600">HoraEntrada</th>
                    <th className="border border-slate-600">HoraSalida</th>
                    <th className="border border-slate-600">Acciones</th>
                </tr>
                </thead>
                <tbody>
                <tr key={data.ID_Plan}>
                    <td className="border border-slate-700 text-center">{data.ID_Cliente}</td>
                    <td className="border border-slate-700 text-center">{data.NombreCompleto}</td>
                    <td className="border border-slate-700 text-center">{formatDate(data.FechaAsistencia)}</td>
                    <td className="border border-slate-700 text-center">{data.Hora_Entrada}</td>
                    <td className="border border-slate-700 text-center">{data.Hora_Salida}</td>
                    <td className="border border-slate-700 grid grid-cols-1">
                        <button onClick={(e) => changeConfirmationSalida(
                            true,
                            data.ID_Asistencia

                        )} type="button"
                                className="bg-indigo-500 hover:bg-indigo-600 text-white py-2 px-4 rounded-md shadow-sm transition duration-200 ease-in-out m-1">
                            <i className="fas fa-edit"></i> REGISTRAR_HORA_SALIDA
                        </button>
                        <button onClick={(e) => chageConfirmation(true, data.ID_Asistencia)} type="button"
                                className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md shadow-sm transition duration-200 ease-in-out m-1">
                            <i className="fas fa-trash-alt"></i> ELIMINAR
                        </button>
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
    const date = new Date(dateString);
    const day = date.getUTCDate();
    const month = date.toLocaleString('default', { month: 'long' });
    const year = date.getUTCFullYear();
    return `${day}/${month}/${year}`;
}