export default function TablaInventario({data, chageConfirmation, changeUpdate}) {
    if (data !== null && Array.isArray(data)) {
        return (
            <table id="tablaclientes" className="border-collapse border border-slate-500 w-full">
                    <thead>
                        <tr className="bg-indigo-500">
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
                                        )} type="button" className="cursor-pointer bg-indigo-400 m-0.5 transition ease-in-out 
                                        delay-60 hover:-translate-y-1 hover:scale-95 duration-60">ACTUALIZAR</button>
                                        <button onClick={(e) => chageConfirmation(true, plan.ID_Plan)} type="button" className="cursor-pointer bg-indigo-400 m-0.5 transition ease-in-out 
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
                                        )} type="button" className="cursor-pointer bg-indigo-400 m-0.5 transition ease-in-out 
                                        delay-60 hover:-translate-y-1 hover:scale-95 duration-60">ACTUALIZAR</button>
                                <button onClick={(e) => chageConfirmation(true, data.ID_Plan)} type="button" className="cursor-pointer bg-indigo-400 m-0.5 transition ease-in-out 
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