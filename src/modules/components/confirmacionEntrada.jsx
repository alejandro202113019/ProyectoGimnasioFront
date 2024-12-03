export default function ConfirmationEntrada({ confirmarEntrada, changeConfirmation, clientes, agregar}) {
    if (!confirmarEntrada) {
        return null;
    }

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg shadow-lg w-4/5 max-w-md p-6 text-center">
                <h2 className="text-xl font-semibold text-gray-800">
                    {clientes ? '¿Desea ingresar la entrada del usuario: ' + clientes.Nombre + ' ' + clientes.Apellido+ '?' : 'El cliente no fue encontrado'}
                </h2>
                <div className="mt-6 flex justify-around">
                    <button
                        onClick={() => changeConfirmation(false,null)}
                        className="px-6 py-2 rounded-lg bg-green-500 text-white font-medium hover:bg-green-600 transition transform hover:scale-105"
                    >
                        CANCELAR
                    </button>
                    {clientes && (
                        <button
                            onClick={() => agregar()}
                            className={`px-6 py-2 rounded-lg bg-red-600 text-white font-medium hover:bg-red-700 transition transform hover:scale-105 cursor-pointer`}
                        >
                            CONFIRMAR
                        </button>
                    )}

                </div>
            </div>
        </div>
    );
}
