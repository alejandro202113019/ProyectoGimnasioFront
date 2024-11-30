export default function TablaInventario({data, chageConfirmation, changeUpdate}) {
    if (data !== null && Array.isArray(data)) {
        return (
            <table id="tablaclientes" className="min-w-full bg-white border border-gray-300 shadow-md rounded-lg overflow-hidden">
                    <thead>
                        <tr className="bg-indigo-600 text-white">
                            <th className="border border-slate-600">ID</th>
                            <th className="border border-slate-600">Nombre</th>
                            <th className="border border-slate-600">Estado</th>
                            <th className="border border-slate-600">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data.map((equipo) => (
                                <tr key={equipo.ID_Equipo}>
                                    <td className="border border-slate-700 text-center">{equipo.ID_Equipo}</td>
                                    <td className="border border-slate-700 text-center">{equipo.Nombre_Equipo}</td>
                                    <td className="border border-slate-700 text-center">{equipo.Estado}</td>
                                    <td className="border border-slate-700 grid grid-cols-1">
                                        <button onClick={(e) => changeUpdate(
                                            true,
                                            equipo.ID_Equipo,
                                            equipo.Nombre_Equipo,
                                            equipo.Estado
                                        )} type="button" className="bg-indigo-500 hover:bg-indigo-600 text-white py-2 px-4 rounded-md shadow-sm transition duration-200 ease-in-out m-1">
                                            <i className="fas fa-edit"></i> EDITAR</button>
                                        <button onClick={(e) => chageConfirmation(true, equipo.ID_Equipo)} type="button" className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md shadow-sm transition duration-200 ease-in-out m-1">
                                            <i className="fas fa-trash-alt"></i> ELIMINAR</button>
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
                            <th className="border border-slate-600">Estado</th>
                            <th className="border border-slate-600">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr key={data.ID_Equipo}>
                            <td className="border border-slate-700 text-center">{data.ID_Equipo}</td>
                            <td className="border border-slate-700 text-center">{data.Nombre_Equipo}</td>
                            <td className="border border-slate-700 text-center">{data.Estado}</td>
                            <td className="border border-slate-700 grid grid-cols-1">
                                <button onClick={(e) => changeUpdate(
                                            true,
                                            data.ID_Equipo,
                                            data.Nombre_Equipo,
                                            data.Estado
                                        )} type="button" className="bg-indigo-500 hover:bg-indigo-600 text-white py-2 px-4 rounded-md shadow-sm transition duration-200 ease-in-out m-1">
                                    <i className="fas fa-edit"></i> EDITAR</button>
                                <button onClick={(e) => chageConfirmation(true, data.ID_Equipo)} type="button" className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md shadow-sm transition duration-200 ease-in-out m-1">
                                    <i className="fas fa-trash-alt"></i> ELIMINAR</button>
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