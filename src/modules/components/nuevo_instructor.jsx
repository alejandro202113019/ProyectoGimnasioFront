import { useState } from "react";

export default function NuevoInstructor({
                                            nuevo, handleChange1, handleChange2, valor1, valor2, changeNuevo, agregar,}) {
    const [nombre, setNombre] = useState("");
    const [apellido, setApellido] = useState("");
    const [especialidad, setEspecialidad] = useState("");
    const [correo, setCorreo] = useState("");

    const isFormValid = nombre && apellido && especialidad && valor1 && correo && valor2;

    const resetForm = () => {
        setNombre("");
        setApellido("");
        setEspecialidad("");
        setCorreo("");
        setCorreo("");

        handleChange1({ target: { value: "" } });
        handleChange2({ target: { value: "" } });
    };
    const clickConfirmar = () => {
        agregar(nombre, apellido, especialidad, valor1, correo, valor2)
        resetForm();
        changeNuevo(false);
    }

    const clickCancelar = () => {
        resetForm();
        changeNuevo(false);
    }

    if (!nuevo) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg shadow-lg w-4/5 max-w-lg p-6 space-y-6">
                <h2 className="text-2xl font-bold text-center text-gray-800">Nuevo Instructor</h2>

                <form className="space-y-4">
                    <div className="flex flex-col">
                        <label htmlFor="Nombre" className="mb-2 text-sm font-medium text-gray-600">
                            Nombre
                        </label>
                        <input
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                            id="Nombre"
                            type="text"
                            placeholder="Nombre"
                            className="p-2 border rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                        />
                    </div>

                    <div className="flex flex-col">
                        <label htmlFor="Apellido" className="mb-2 text-sm font-medium text-gray-600">
                            Apellido
                        </label>
                        <input
                            value={apellido}
                            onChange={(e) => setApellido(e.target.value)}
                            id="Apellido"
                            type="text"
                            placeholder="Apellido"
                            className="p-2 border rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                        />
                    </div>

                    <div className="flex flex-col">
                        <label htmlFor="Especialidad" className="mb-2 text-sm font-medium text-gray-600">
                            Especialidad
                        </label>
                        <input
                            value={especialidad}
                            onChange={(e) => setEspecialidad(e.target.value)}
                            id="Especialidad"
                            type="text"
                            placeholder="Especialidad"
                            className="p-2 border rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                        />
                    </div>

                    <div className="flex flex-col">
                        <label htmlFor="Documento" className="mb-2 text-sm font-medium text-gray-600">
                            Documento
                        </label>
                        <input
                            value={valor1}
                            onChange={handleChange1}
                            id="Documento"
                            type="text"
                            placeholder="Documento"
                            className="p-2 border rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                        />
                    </div>

                    <div className="flex flex-col">
                        <label htmlFor="Correo" className="mb-2 text-sm font-medium text-gray-600">
                            Correo
                        </label>
                        <input
                            value={correo}
                            onChange={(e) => setCorreo(e.target.value)}
                            id="Correo"
                            type="email"
                            placeholder="Correo"
                            className="p-2 border rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                        />
                    </div>

                    <div className="flex flex-col">
                        <label htmlFor="Teléfono" className="mb-2 text-sm font-medium text-gray-600">
                            Teléfono
                        </label>
                        <input
                            value={valor2}
                            onChange={handleChange2}
                            id="Teléfono"
                            type="text"
                            placeholder="Teléfono"
                            className="p-2 border rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                        />
                    </div>
                </form>

                <div className="flex justify-between">
                    <button
                        onClick={() => clickCancelar()}
                        type="button"
                        className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-transform transform hover:scale-105"
                    >
                        CANCELAR
                    </button>
                    <button
                        onClick={() => clickConfirmar()}
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
