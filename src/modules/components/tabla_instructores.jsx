export default function TablaInstructores({data, chageConfirmation, changeUpdate}) {
    if (data !== null && Array.isArray(data)) {
        return (
            <table id="tablaclientes" className="border-collapse border border-slate-500 w-full">
                    <thead>
                        <tr className="bg-indigo-500">
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
                                        )} type="button" className="cursor-pointer bg-indigo-400 m-0.5 transition ease-in-out 
                                        delay-60 hover:-translate-y-1 hover:scale-95 duration-60">ACTUALIZAR</button>
                                        <button onClick={(e) => chageConfirmation(true, instructor.ID_Instructor)} type="button" className="cursor-pointer bg-indigo-400 m-0.5 transition ease-in-out 
                                        delay-60 hover:-translate-y-1 hover:scale-95 duration-60">ELIMINAR</button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
            </table>
        )
    } else if (!Array.isArray(data) && data !== null && !data.error) {
        return (
            <table className="border-collapse border border-slate-500 w-full">
                    <thead>
                        <tr className="bg-indigo-500">
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
                                        )} type="button" className="cursor-pointer bg-indigo-400 m-0.5 transition ease-in-out 
                                        delay-60 hover:-translate-y-1 hover:scale-95 duration-60">ACTUALIZAR</button>
                                <button onClick={(e) => chageConfirmation(true, data.ID_Instructor)} type="button" className="cursor-pointer bg-indigo-400 m-0.5 transition ease-in-out 
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