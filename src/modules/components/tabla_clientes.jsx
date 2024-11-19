export default function TablaClientes({clientes, chageConfirmation, changeUpdate}) {
    if (clientes !== null && Array.isArray(clientes)) {
        return (
            <table id="tablaclientes" className="border-collapse border border-slate-500 w-full">
                    <thead>
                        <tr className="bg-indigo-500">
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
                                    <td className="border border-slate-700 grid grid-cols-1">
                                        <button onClick={(e) => changeUpdate(
                                            true,
                                            cliente.Nombre,
                                            cliente.Apellido,
                                            cliente.Fecha_Nacimiento,
                                            cliente.ID_Cliente,
                                            cliente.Email,
                                            cliente.Telefono
                                        )} type="button" className="cursor-pointer bg-indigo-400 m-0.5 transition ease-in-out 
                                        delay-60 hover:-translate-y-1 hover:scale-95 duration-60">ACTUALIZAR</button>
                                        <button onClick={(e) => chageConfirmation(true, cliente.ID_Cliente)} type="button" className="cursor-pointer bg-indigo-400 m-0.5 transition ease-in-out 
                                        delay-60 hover:-translate-y-1 hover:scale-95 duration-60">ELIMINAR</button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
            </table>
        )
    } else if (!Array.isArray(clientes) && clientes !== null && !clientes.error) {
        return (
            <table className="border-collapse border border-slate-500 w-full">
                    <thead>
                        <tr className="bg-indigo-500">
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
                                        )} type="button" className="cursor-pointer bg-indigo-400 m-0.5 transition ease-in-out 
                                        delay-60 hover:-translate-y-1 hover:scale-95 duration-60">ACTUALIZAR</button>
                                <button onClick={(e) => chageConfirmation(true, clientes.ID_Cliente)} type="button" className="cursor-pointer bg-indigo-400 m-0.5 transition ease-in-out 
                                        delay-60 hover:-translate-y-1 hover:scale-95 duration-60">ELIMINAR</button>
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
    // Convertir el string de fecha a un objeto Date
    const date = new Date(dateString);

    // Obtener el día, mes y año
    const day = date.getUTCDate();
    const month = date.toLocaleString('default', { month: 'long' }); // Mes en texto
    const year = date.getUTCFullYear();

    // Retornar en el formato deseado
    return `${day}/${month}/${year}`;
}