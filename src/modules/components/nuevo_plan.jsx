import { useState } from "react";

export default function NuevoPlan({ nuevo, changeNuevo, agregar }) {
    const [nombre, setNombre] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [duracion, setDuracion] = useState(0);
    const [precio, setPrecio] = useState(0.00);


    const isFormValid = nombre && descripcion && duracion && precio;

    if (!nuevo) return null;

    const resetForm = () => {
        setNombre("");
        setDescripcion("");
        setDuracion(null);
        setPrecio(null);
    };

    const clickConfirmar = () => {
        agregar(nombre, descripcion, duracion, precio)
        resetForm();
        changeNuevo(false);
    };

    const clickCancelar = () => {
        resetForm();
        changeNuevo(false);
    }



    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg shadow-lg w-4/5 max-w-lg p-6 space-y-6">
                <h2 className="text-2xl font-bold text-center text-gray-800">Nuevo Plan</h2>

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
                        <label htmlFor="Descripcion" className="mb-2 text-sm font-medium text-gray-600">
                            Descripción
                        </label>
                        <input
                            value={descripcion}
                            onChange={(e) => setDescripcion(e.target.value)}
                            id="Descripcion"
                            type="text"
                            placeholder="Descripción"
                            className="p-2 border rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                        />
                    </div>

                    <div className="flex flex-col">
                        <label htmlFor="Duracion" className="mb-2 text-sm font-medium text-gray-600">
                            Duración en días
                        </label>
                        <input
                            value={duracion}
                            onChange={(e) => setDuracion(e.target.value)}
                            id="Duracion"
                            type="number"
                            placeholder="Duración en días"
                            className="p-2 border rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                        />
                    </div>

                    <div className="flex flex-col">
                        <label htmlFor="Precio" className="mb-2 text-sm font-medium text-gray-600">
                            Precio (COP)
                        </label>
                        <input
                            value={precio}
                            onChange={(e) => setPrecio(e.target.value)}
                            id="Precio"
                            type="number"
                            placeholder="Precio en pesos colombianos"
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
