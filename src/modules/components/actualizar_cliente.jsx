export default function Update({modificar, handleChange1, handleChange2, valor1, valor2, nombre, apellido, nacimiento, correo, setModificar, actualizar, setNombre, setApellido, setNacimiento, setCorreo,}) {
    const isFormValid = nombre && apellido && nacimiento && valor1 && correo && valor2;

    const resetForm = () => {
        setNombre("");
        setApellido("");
        setNacimiento("");
        setCorreo("");

        handleChange1({ target: { value: "" } });
        handleChange2({ target: { value: "" } });
    };

    // Acción al confirmar
    const clickConfirmar = () => {
        actualizar(
            document.getElementById("Nombre").value,
            document.getElementById("Apellido").value,
            document.getElementById("Nacimiento").value,
            document.getElementById("Documento").value,
            document.getElementById("Correo").value,
            document.getElementById("Teléfono").value
        )
        resetForm();
        setModificar(false);
    };

    // Acción al cancelar
    const clickCancelar = () => {
        resetForm();
        setModificar(false)
    };

    if (!modificar) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg shadow-xl w-4/5 max-w-lg p-6 space-y-6">
                <h2 className="text-2xl font-bold text-center text-gray-800">Actualizar Datos</h2>

                <div className="space-y-4">
                    <div className="flex space-x-4">
                        <input
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                            id="Nombre"
                            type="text"
                            placeholder="Nombre"
                            className="w-1/2 p-2 border rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                        />
                        <input
                            value={apellido}
                            onChange={(e) => setApellido(e.target.value)}
                            id="Apellido"
                            type="text"
                            placeholder="Apellido"
                            className="w-1/2 p-2 border rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                        />
                    </div>

                    <div className="flex space-x-4">
                        <input
                            value={formatDateForInput(nacimiento)}
                            onChange={(e) => setNacimiento(e.target.value)}
                            id="Nacimiento"
                            type="date"
                            className="w-1/2 p-2 border rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                        />
                        <input
                            value={valor1}
                            onChange={handleChange1}
                            id="Documento"
                            type="text"
                            placeholder="Documento"
                            disabled
                            className="w-1/2 p-2 border rounded-md bg-gray-200 text-gray-500 cursor-not-allowed"
                        />
                    </div>

                    <div className="flex space-x-4">
                        <input
                            value={correo}
                            onChange={(e) => setCorreo(e.target.value)}
                            id="Correo"
                            type="text"
                            placeholder="Correo"
                            className="w-1/2 p-2 border rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                        />
                        <input
                            value={valor2}
                            onChange={handleChange2}
                            id="Teléfono"
                            type="text"
                            placeholder="Teléfono"
                            className="w-1/2 p-2 border rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                        />
                    </div>
                </div>

                <div className="flex justify-between">
                    <button
                        onClick={() => clickCancelar()}
                        className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-transform transform hover:scale-105"
                    >
                        CANCELAR
                    </button>
                    <button
                        onClick={() => clickConfirmar()}
                        disabled={!isFormValid}
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

function formatDateForInput(dateString) {
    if (!dateString) return "";
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
        console.error("Invalid date:", dateString);
        return "";
    }
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
}
