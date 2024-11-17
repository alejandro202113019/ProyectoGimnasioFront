export default function TablaInventario({data, chageConfirmation, changeUpdate}) {
    if (data !== null && Array.isArray(data)) {
        return (
            <table id="tablaclientes" className="border-collapse border border-slate-500 w-full">
                    <thead>
                        <tr className="bg-indigo-500">
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
                                        )} type="button" className="cursor-pointer bg-indigo-400 m-0.5 transition ease-in-out 
                                        delay-60 hover:-translate-y-1 hover:scale-95 duration-60">ACTUALIZAR</button>
                                        <button onClick={(e) => chageConfirmation(true, equipo.ID_Equipo)} type="button" className="cursor-pointer bg-indigo-400 m-0.5 transition ease-in-out 
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
                                            equipo.ID_Equipo,
                                            equipo.Nombre_Equipo,
                                            equipo.Estado
                                        )} type="button" className="cursor-pointer bg-indigo-400 m-0.5 transition ease-in-out 
                                        delay-60 hover:-translate-y-1 hover:scale-95 duration-60">ACTUALIZAR</button>
                                <button onClick={(e) => chageConfirmation(true, data.ID_Equipo)} type="button" className="cursor-pointer bg-indigo-400 m-0.5 transition ease-in-out 
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