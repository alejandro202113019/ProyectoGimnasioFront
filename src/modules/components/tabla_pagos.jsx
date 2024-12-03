export default function TablaPagos({data, chageConfirmation, changeUpdate}) {
    if (data !== null && Array.isArray(data)) {
        return (
            <table id="tablaclientes" className="min-w-full bg-white border border-gray-300 shadow-md rounded-lg overflow-hidden">
                    <thead>
                        <tr className="bg-indigo-600 text-white">
                            <th className="border border-slate-600">ID</th>
                            <th className="border border-slate-600">Nombre Cliente</th>
                            <th className="border border-slate-600">Nombre Plan</th>
                            <th className="border border-slate-600">Fecha</th>
                            <th className="border border-slate-600">Método Pago</th>
                            <th className="border border-slate-600">Monto</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data.map((equipo) => (
                                <tr key={equipo.ID_Equipo}>
                                    <td className="border border-slate-700 text-center">{equipo.ID_Cliente}</td>
                                    <td className="border border-slate-700 text-center">{equipo.Nombre_Completo_Cliente}</td>
                                    <td className="border border-slate-700 text-center">{equipo.Nombre_Plan}</td>
                                    <td className="border border-slate-700 text-center">{equipo.Fecha_Pago}</td>
                                    <td className="border border-slate-700 text-center">{equipo.Metodo_Pago}</td>
                                    <td className="border border-slate-700 text-center">{equipo.Monto}</td>
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
                            <th className="border border-slate-600">Nombre Cliente</th>
                            <th className="border border-slate-600">Nombre Plan</th>
                            <th className="border border-slate-600">Fecha</th>
                            <th className="border border-slate-600">Método Pago</th>
                            <th className="border border-slate-600">Monto</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr key={data.ID_Equipo}>
                            <td className="border border-slate-700 text-center">{data.ID_Cliente}</td>
                            <td className="border border-slate-700 text-center">{data.Nombre_Completo_Cliente}</td>
                            <td className="border border-slate-700 text-center">{data.Nombre_Plan}</td>
                            <td className="border border-slate-700 text-center">{data.Fecha_Pago}</td>
                            <td className="border border-slate-700 text-center">{data.Metodo_Pago}</td>
                            <td className="border border-slate-700 text-center">{data.Monto}</td>
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