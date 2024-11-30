export default function TablaClientes({clientes, chageConfirmation, changeUpdate}) {
    if (clientes !== null && Array.isArray(clientes)) {
        return (
            <table id="tablaclientes" className="min-w-full bg-white border border-gray-300 shadow-md rounded-lg overflow-hidden">
                <thead>
                <tr className="bg-indigo-600 text-white">
                    <th className="border border-slate-600">ID</th>
                    <th className="border border-slate-600">Nombre</th>
                    <th className="border border-slate-600">Apellido</th>
                    <th className="border border-slate-600">Nacimiento</th>
                    <th className="border border-slate-600">Teléfono</th>
                    <th className="border border-slate-600">Correo</th>
                    <th className="border border-slate-600">Nombre plan</th>
                    <th className="border border-slate-600">Estado membresia</th>
                    <th className="border border-slate-600">Acciones</th>
                </tr>
                </thead>
                <tbody>
                {
                    clientes.map((cliente) => (
                        <tr key={cliente.ID_Cliente}>
                            <td className="border border-slate-700 text-center">{cliente.ID_Cliente}</td>
                            <td className="border border-slate-700 text-center">{cliente.Nombre}</td>
                            <td className="border border-slate-700 text-center">{cliente.Apellido}</td>
                            <td className="border border-slate-700 text-center">{formatDate(cliente.Fecha_Nacimiento)}</td>
                            <td className="border border-slate-700 text-center">{cliente.Telefono}</td>
                            <td className="border border-slate-700 text-center">{cliente.Email}</td>
                            <td className="border border-slate-700 text-center">{cliente.Nombre_Plan}</td>
                            <td className="border border-slate-700 text-center">{cliente.Estado}</td>
                            <td className="border border-slate-700 text-center">
                                <button onClick={(e) => changeUpdate(
                                    true,
                                    cliente.Nombre,
                                    cliente.Apellido,
                                    cliente.Fecha_Nacimiento,
                                    cliente.ID_Cliente,
                                    cliente.Email,
                                    cliente.Telefono
                                )} type="button" className="bg-indigo-500 hover:bg-indigo-600 text-white py-2 px-4 rounded-md shadow-sm transition duration-200 ease-in-out m-1">
                                    <i className="fas fa-edit"></i> EDITAR
                                </button>
                                <button onClick={(e) => chageConfirmation(true, cliente.ID_Cliente)}
                                        type="button" className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md shadow-sm transition duration-200 ease-in-out m-1">
                                    <i className="fas fa-trash-alt"></i> ELIMINAR
                                </button>
                            </td>
                        </tr>
                    ))
                }
                </tbody>
            </table>
        )
    } else if (!Array.isArray(clientes) && clientes !== null && !clientes.error) {
        return (
            <table className="min-w-full bg-white border border-gray-300 shadow-md rounded-lg overflow-hidden">
                <thead>
                <tr className="bg-indigo-600 text-white">
                    <th className="border border-slate-600">ID</th>
                    <th className="border border-slate-600">Nombre</th>
                    <th className="border border-slate-600">Apellido</th>
                    <th className="border border-slate-600">Nacimiento</th>
                    <th className="border border-slate-600">Teléfono</th>
                    <th className="border border-slate-600">Correo</th>
                    <th className="border border-slate-600">Nombre plan</th>
                    <th className="border border-slate-600">Estado membresia</th>
                    <th className="border border-slate-600">Acciones</th>
                </tr>
                </thead>
                <tbody>
                <tr key={clientes.ID_Cliente}>
                    <td className="border border-slate-700 text-center">{clientes.ID_Cliente}</td>
                    <td className="border border-slate-700 text-center">{clientes.Nombre}</td>
                    <td className="border border-slate-700 text-center">{clientes.Apellido}</td>
                    <td className="border border-slate-700 text-center">{formatDate(clientes.Fecha_Nacimiento)}</td>
                    <td className="border border-slate-700 text-center">{clientes.Telefono}</td>
                    <td className="border border-slate-700 text-center">{clientes.Email}</td>
                    <td className="border border-slate-700 text-center">{clientes.Nombre_Plan}</td>
                    <td className="border border-slate-700 text-center">{clientes.Estado}</td>
                    <td className="border border-slate-700 grid grid-cols-1">
                        <button onClick={(e) => changeUpdate(
                            true,
                            clientes.Nombre,
                            clientes.Apellido,
                            clientes.Fecha_Nacimiento,
                            clientes.ID_Cliente,
                            clientes.Email,
                            clientes.Telefono
                        )} type="button" className="bg-indigo-500 hover:bg-indigo-600 text-white py-2 px-4 rounded-md shadow-sm transition duration-200 ease-in-out m-1">
                            <i className="fas fa-edit"></i> EDITAR
                        </button>
                        <button onClick={(e) => chageConfirmation(true, clientes.ID_Cliente)} type="button" className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md shadow-sm transition duration-200 ease-in-out m-1">
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
