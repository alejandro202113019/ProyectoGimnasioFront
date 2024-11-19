export default function ActualizarInstructor( {modificar, handleChange1, handleChange2, valor1, valor2, 
    nombre, apellido, especialidad, correo, setModificar, actualizar, setNombre, setApellido, setEspecialidad, setCorreo} ) {

    const isFormValid = nombre && apellido && especialidad && valor1 && correo && valor2;

    if (modificar) {
        return (
            <>
                <div className="fixed w-full h-full grid grid-cols-10 grid-rows-7">
                    <div className="rounded-xl grid grid-cols-10 grid-rows-10 row-start-2 col-span-5 col-end-8 row-span-5 bg-indigo-400">
                        <div className="rounded-xl col-span-10 row-start-2 text-center text-white text-5xl">
                            Actualizar datos
                        </div>
                        <div className=" rounded-xl col-span-5 row-start-5 col-end-6 flex justify-center">
                            <input value={nombre} onChange={(e) => setNombre(e.target.value)} id="Nombre" type="text" placeholder="Nombre" className="ring-2 ring-blue-500 w-11/12 h-4/6"></input>
                        </div>
                        <div className=" rounded-xl col-span-5 row-start-5 col-end-11 flex justify-center">
                            <input value={apellido} onChange={(e) => setApellido(e.target.value)} id="Apellido" type="text" placeholder="Apellido" className="ring-2 ring-blue-500 w-11/12 h-4/6"></input>
                        </div>
                        <div className=" rounded-xl col-span-5 row-start-6 col-end-6 flex justify-center">
                            <input value={especialidad} onChange={(e) => setEspecialidad(e.target.value)} id="Especialidad" type="text" placeholder="Especialidad" className="ring-2 ring-blue-500 w-11/12 h-4/6"></input>
                        </div>
                        <div className=" rounded-xl col-span-5 row-start-6 col-end-11 flex justify-center">
                            <input value={valor1} onChange={handleChange1} id="Documento" disabled={true} type="text" placeholder="Documento" className="ring-2 ring-blue-500 w-11/12 h-4/6"></input>
                        </div>
                        <div className=" rounded-xl col-span-5 row-start-7 col-end-6 flex justify-center">
                            <input value={correo} onChange={(e) => setCorreo(e.target.value)} id="Correo" type="text" placeholder="Correo" className="ring-2 ring-blue-500 w-11/12 h-4/6"></input>
                        </div>
                        <div className=" rounded-xl col-span-5 row-start-7 col-end-11 flex justify-center">
                            <input value={valor2} onChange={handleChange2} id="Teléfono" type="text" placeholder="Teléfono" className="ring-2 ring-blue-500 w-11/12 h-4/6"></input>
                        </div>
                        <div className="rounded-xl row-start-10 col-span-2 col-end-9 flex justify-center">
                            <button onClick={(e) => setModificar(false)} type="button" className="rounded-xl cursor-pointer bg-green-500 transition ease-in-out 
                                        delay-60 hover:-translate-y-1 hover:scale-95 duration-60 w-11/12 h-5/6">CANCELAR</button>
                        </div>
                        <div className="rounded-xl row-start-10 col-span-2 col-end-11 flex justify-center">
                            <button onClick={(e) => actualizar(
                                    document.getElementById('Nombre').value,
                                    document.getElementById('Apellido').value,
                                    document.getElementById('Especialidad').value,
                                    document.getElementById('Documento').value,
                                    document.getElementById('Correo').value,
                                    document.getElementById('Teléfono').value
                                )} disabled={!isFormValid} type="button" className={`rounded-xl cursor-pointer bg-blue-600 transition ease-in-out 
                                delay-60 hover:-translate-y-1 hover:scale-95 duration-60 w-11/12 h-5/6 
                                ${!isFormValid ? 'opacity-50 disabled:cursor-not-allowed' : 'cursor-pointer'}`}>CONFIRMAR</button>
                        </div>
                    </div>
                </div>
            </>
        )
    }

}