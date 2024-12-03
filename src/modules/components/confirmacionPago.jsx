export default function ConfirmationPago({ confirmar, changeConfirmation, agregar, tipoPago, setTipoPago }) {
    if (!confirmar) {
        return null;
    }

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg shadow-lg w-4/5 max-w-md p-6 text-center space-y-5">
                <h2 className="text-xl font-semibold text-gray-800">
                    Confirmar pago
                </h2>
                <div className="space-y-5 text-left">
                    <div className="space-y-4">
                        <label htmlFor="Nombre" className="mb-2 text-sm font-medium text-gray-600">
                                Tipo de pago
                        </label>
                        <select
                            value={tipoPago}
                            onChange={(e) => setTipoPago(e.target.value)}
                            id="tipoPago"
                            className="w-full p-3 border rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                        >
                            <option value="Efectivo">Efectivo</option>
                            <option value="PSE">PSE</option>
                            <option value="Otro">Otro</option>
                        </select>
                    </div>
                </div>
                <div className="flex justify-around space-x-6">
                    <button
                        onClick={() => changeConfirmation(false, "")}
                        className="px-6 py-2 rounded-lg bg-green-500 text-white font-medium hover:bg-green-600 transition transform hover:scale-105"
                    >
                        CANCELAR
                    </button>
                    <button
                        onClick={() => agregar()}
                        className="px-6 py-2 rounded-lg bg-red-600 text-white font-medium hover:bg-red-700 transition transform hover:scale-105"
                    >
                        CONFIRMAR
                    </button>
                </div>
            </div>
        </div>
    );
}
