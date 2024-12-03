export default function ConfirmationSalida({ confirmarSalida, changeConfirmation, eliminar }) {
    if (!confirmarSalida) {
        return null;
    }

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg shadow-lg w-4/5 max-w-md p-6 text-center">
                <h2 className="text-xl font-semibold text-gray-800">
                    ¿Está seguro que desea confirmar?
                </h2>
                <div className="mt-6 flex justify-around">
                    <button
                        onClick={() => changeConfirmation(false, "")}
                        className="px-6 py-2 rounded-lg bg-green-500 text-white font-medium hover:bg-green-600 transition transform hover:scale-105"
                    >
                        CANCELAR
                    </button>
                    <button
                        onClick={() => eliminar()}
                        className="px-6 py-2 rounded-lg bg-red-600 text-white font-medium hover:bg-red-700 transition transform hover:scale-105"
                    >
                        CONFIRMAR
                    </button>
                </div>
            </div>
        </div>
    );
}
