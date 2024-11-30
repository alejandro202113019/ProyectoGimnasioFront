export default function TablaInventario({data, chageConfirmation, changeUpdate}) {
    if (data !== null && Array.isArray(data)) {
        return (
            <table id="tablaclientes" className="min-w-full bg-white border border-gray-300 shadow-md rounded-lg overflow-hidden">
            <thead>
                        <tr className="bg-indigo-600 text-white">
                            <th className="border border-slate-600">ID</th>
                            <th className="border border-slate-600">Nombre</th>
                            <th className="border border-slate-600">Descripción</th>
                            <th className="border border-slate-600">Duración</th>
                            <th className="border border-slate-600">Precio</th>
                            <th className="border border-slate-600">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data.map((plan) => (
                                <tr key={plan.ID_Plan}>
                                    <td className="border border-slate-700 text-center">{plan.ID_Plan}</td>
                                    <td className="border border-slate-700 text-center">{plan.Nombre_Plan}</td>
                                    <td className="border border-slate-700 text-center">{plan.Descripcion}</td>
                                    <td className="border border-slate-700 text-center">{plan.Duracion}</td>
                                    <td className="border border-slate-700 text-center">{plan.Precio}</td>
                                    <td className="border border-slate-700 grid grid-cols-1">
                                        <button onClick={(e) => changeUpdate(
                                            true,
                                            plan.ID_Plan,
                                            plan.Nombre_Plan,
                                            plan.Descripcion,
                                            plan.Duracion,
                                            plan.Precio
                                        )} type="button" className="bg-indigo-500 hover:bg-indigo-600 text-white py-2 px-4 rounded-md shadow-sm transition duration-200 ease-in-out m-1">
                                            <i className="fas fa-edit"></i> EDITAR</button>
                                        <button onClick={(e) => chageConfirmation(true, plan.ID_Plan)} type="button" className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md shadow-sm transition duration-200 ease-in-out m-1">
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
                            <th className="border border-slate-600">Descripción</th>
                            <th className="border border-slate-600">Duración</th>
                            <th className="border border-slate-600">Precio</th>
                            <th className="border border-slate-600">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr key={data.ID_Plan}>
                            <td className="border border-slate-700 text-center">{data.ID_Plan}</td>
                            <td className="border border-slate-700 text-center">{data.Nombre_Plan}</td>
                            <td className="border border-slate-700 text-center">{data.Descripcion}</td>
                            <td className="border border-slate-700 text-center">{data.Duracion}</td>
                            <td className="border border-slate-700 text-center">{data.Precio}</td>
                            <td className="border border-slate-700 grid grid-cols-1">
                                <button onClick={(e) => changeUpdate(
                                            true,
                                            data.ID_Plan,
                                            data.Nombre_Plan,
                                            data.Descripcion,
                                            data.Duracion,
                                            data.Precio
                                        )} type="button" className="bg-indigo-500 hover:bg-indigo-600 text-white py-2 px-4 rounded-md shadow-sm transition duration-200 ease-in-out m-1">
                                    <i className="fas fa-edit"></i> EDITAR</button>
                                <button onClick={(e) => chageConfirmation(true, data.ID_Plan)} type="button" className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md shadow-sm transition duration-200 ease-in-out m-1">
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