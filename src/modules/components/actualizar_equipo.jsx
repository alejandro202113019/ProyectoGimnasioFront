export default function ActualizarEquipo( {modificar, id, nombre, setNombre, estado, setEstado, actualizar, setModificar} ) {

    const isFormValid = nombre && estado;

    if (modificar) {
        return (
            <>
                <div className="fixed w-full h-full grid grid-cols-10 grid-rows-7">
                    <div className="rounded-xl grid grid-cols-10 grid-rows-10 row-start-2 col-span-5 col-end-8 row-span-5 bg-indigo-400">
                        <div className="rounded-xl col-span-10 row-start-2 text-center text-white text-5xl">
                            Nuevo Cliente
                        </div>
                        <div className="rounded-xl col-span-5 row-start-5 col-end-6 flex justify-center">
                            <input value={nombre} onChange={(e) => setNombre(e.target.value)} id="Nombre" type="text" placeholder="Nombre" className="ring-2 ring-blue-500 w-11/12 h-4/6"></input>
                        </div>
                        <div className="rounded-xl col-span-5 row-start-5 col-end-11 flex justify-center">
                            <select value={estado}  onChange={(e) => setEstado(e.target.value)} id="Estado" className="ring-2 ring-blue-500 w-11/12 h-4/6">
                                <option value="Activo">Activo</option>
                                <option value="Mantenimiento">Mantenimiento</option>
                                <option value="Inactivo">Inactivo</option>
                            </select>
                        </div>
                        <div className="rounded-xl row-start-10 col-span-2 col-end-9 flex justify-center">
                            <button onClick={(e) => setModificar(false)} type="button" className="rounded-xl cursor-pointer bg-green-500 transition ease-in-out 
                                        delay-60 hover:-translate-y-1 hover:scale-95 duration-60 w-11/12 h-5/6">CANCELAR</button>
                        </div>
                        <div className="rounded-xl row-start-10 col-span-2 col-end-11 flex justify-center">
                            <button onClick={
                                (e) => actualizar(
                                    id,
                                    document.getElementById('Nombre').value,
                                    document.getElementById('Estado').value
                                )
                            } disabled={!isFormValid} type="button" className={`rounded-xl cursor-pointer bg-blue-600 transition ease-in-out 
                                delay-60 hover:-translate-y-1 hover:scale-95 duration-60 w-11/12 h-5/6 
                                ${!isFormValid ? 'opacity-50 disabled:cursor-not-allowed' : 'cursor-pointer'}`}>CONFIRMAR</button>
                        </div>
                    </div>
                </div>
            </>
        )
    }

}