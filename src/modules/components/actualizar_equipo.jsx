export default function ActualizarEquipo({
                                             modificar, id, nombre, setNombre, estado, setEstado, actualizar, setModificar,}) {
    const isFormValid = nombre && estado;

    if (!modificar) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg shadow-lg w-4/5 max-w-lg p-6 space-y-6">
                <h2 className="text-2xl font-bold text-center text-gray-800">Actualizar Equipo</h2>

                <div className="space-y-4">
                    <div className="flex flex-col">
                        <label htmlFor="Nombre" className="mb-2 text-sm font-medium text-gray-600">
                            Nombre
                        </label>
                        <input
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                            id="Nombre"
                            type="text"
                            placeholder="Nombre del equipo"
                            className="p-2 border rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                        />
                    </div>

                    <div className="flex flex-col">
                        <label htmlFor="Estado" className="mb-2 text-sm font-medium text-gray-600">
                            Estado
                        </label>
                        <select
                            value={estado}
                            onChange={(e) => setEstado(e.target.value)}
                            id="Estado"
                            className="p-2 border rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                        >
                            <option value="Activo">Activo</option>
                            <option value="Mantenimiento">Mantenimiento</option>
                            <option value="Inactivo">Inactivo</option>
                        </select>
                    </div>
                </div>

                <div className="flex justify-between">
                    <button
                        onClick={() => setModificar(false)}
                        type="button"
                        className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-transform transform hover:scale-105"
                    >
                        CANCELAR
                    </button>
                    <button
                        onClick={() =>
                            actualizar(
                                id,
                                document.getElementById("Nombre").value,
                                document.getElementById("Estado").value
                            )
                        }
                        disabled={!isFormValid}
                        type="button"
                        className={`px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-transform transform hover:scale-105 ${
                            !isFormValid ? "opacity-50 cursor-not-allowed" : ""
                        }`}
                    >
                        CONFIRMAR
                    </button>
                </div>
            </div>
        </div>
    );
}
