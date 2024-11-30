export default function TablaInstructores({data, chageConfirmation, changeUpdate}) {
    if (data !== null && Array.isArray(data)) {
        return (
            <table id="tablaclientes" className="min-w-full bg-white border border-gray-300 shadow-md rounded-lg overflow-hidden">
                    <thead>
                        <tr className="bg-indigo-600 text-white">
                            <th className="border border-slate-600">ID</th>
                            <th className="border border-slate-600">Nombre</th>
                            <th className="border border-slate-600">Apellido</th>
                            <th className="border border-slate-600">Especialidad</th>
                            <th className="border border-slate-600">Teléfono</th>
                            <th className="border border-slate-600">Correo</th>
                            <th className="border border-slate-600">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data.map((instructor) => (
                                <tr key={instructor.ID_Instructor}>
                                    <td className="border border-slate-700 text-center">{instructor.ID_Instructor}</td>
                                    <td className="border border-slate-700 text-center">{instructor.Nombre}</td>
                                    <td className="border border-slate-700 text-center">{instructor.Apellido}</td>
                                    <td className="border border-slate-700 text-center">{instructor.Especialidad}</td>
                                    <td className="border border-slate-700 text-center">{instructor.Telefono}</td>
                                    <td className="border border-slate-700 text-center">{instructor.Email}</td>
                                    <td className="border border-slate-700 grid grid-cols-1">
                                        <button onClick={(e) => changeUpdate(
                                            true,
                                            instructor.Nombre,
                                            instructor.Apellido,
                                            instructor.Especialidad,
                                            instructor.ID_Instructor,
                                            instructor.Email,
                                            instructor.Telefono
                                        )} type="button" className="bg-indigo-500 hover:bg-indigo-600 text-white py-2 px-4 rounded-md shadow-sm transition duration-200 ease-in-out m-1">
                                            <i className="fas fa-edit"></i> EDITAR</button>
                                        <button onClick={(e) => chageConfirmation(true, instructor.ID_Instructor)} type="button" className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md shadow-sm transition duration-200 ease-in-out m-1">
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
                            <th className="border border-slate-600">Apellido</th>
                            <th className="border border-slate-600">Especialidad</th>
                            <th className="border border-slate-600">Teléfono</th>
                            <th className="border border-slate-600">Correo</th>
                            <th className="border border-slate-600">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr key={data.ID_Cliente}>
                            <td className="border border-slate-700 text-center">{data.ID_Instructor}</td>
                            <td className="border border-slate-700 text-center">{data.Nombre}</td>
                            <td className="border border-slate-700 text-center">{data.Apellido}</td>
                            <td className="border border-slate-700 text-center">{data.Especialidad}</td>
                            <td className="border border-slate-700 text-center">{data.Telefono}</td>
                            <td className="border border-slate-700 text-center">{data.Email}</td>
                            <td className="border border-slate-700 grid grid-cols-1">
                                <button onClick={(e) => changeUpdate(
                                            true,
                                            data.Nombre,
                                            data.Apellido,
                                            data.Especialidad,
                                            data.ID_Instructor,
                                            data.Email,
                                            data.Telefono
                                        )} type="button" className="bg-indigo-500 hover:bg-indigo-600 text-white py-2 px-4 rounded-md shadow-sm transition duration-200 ease-in-out m-1">
                                    <i className="fas fa-edit"></i> EDITAR</button>
                                <button onClick={(e) => chageConfirmation(true, data.ID_Instructor)} type="button" className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md shadow-sm transition duration-200 ease-in-out m-1">
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