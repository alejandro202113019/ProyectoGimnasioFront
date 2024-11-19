import { useEffect, useState } from "react"

export default function NuevoPlan( {nuevo, changeNuevo, agregar, handleChange, handleChange2, duracion, precio} ) {
    const [nombre, setNombre] = useState('');
    const [descripcion, setDescripcion] = useState('');


    const isFormValid = nombre && descripcion && duracion && precio;

    if (nuevo) {
        return (
            <>
                <div className="fixed w-full h-full grid grid-cols-10 grid-rows-7">
                    <div className="rounded-xl grid grid-cols-10 grid-rows-10 row-start-2 col-span-5 col-end-8 row-span-5 bg-indigo-400">
                        <div className="rounded-xl col-span-10 row-start-2 text-center text-white text-5xl">
                            Nuevo Equipo
                        </div>
                        <div className="rounded-xl col-span-5 row-start-5 col-end-6 flex justify-center">
                            <input onChange={(e) => setNombre(e.target.value)} id="Nombre" type="text" placeholder="Nombre" className="ring-2 ring-blue-500 w-11/12 h-4/6"></input>
                        </div>
                        <div className="rounded-xl col-span-5 row-start-5 col-end-11 flex justify-center">
                            <input onChange={(e) => setDescripcion(e.target.value)} id="Descripcion" type="text" placeholder="Descripción" className="ring-2 ring-blue-500 w-11/12 h-4/6"></input>
                        </div>
                        <div className="rounded-xl col-span-5 row-start-6 col-end-6 flex justify-center">
                            <input onChange={handleChange} id="Duracion" type="text" placeholder="Duración en días" className="ring-2 ring-blue-500 w-11/12 h-4/6"></input>
                        </div>
                        <div className="rounded-xl col-span-5 row-start-6 col-end-11 flex justify-center">
                            <input onChange={handleChange2} id="Precio" type="text" placeholder="Precio en pesos colombianos" className="ring-2 ring-blue-500 w-11/12 h-4/6"></input>
                        </div>
                        <div className="rounded-xl row-start-10 col-span-2 col-end-9 flex justify-center">
                            <button onClick={(e) => changeNuevo(false)} type="button" className="rounded-xl cursor-pointer bg-green-500 transition ease-in-out 
                                        delay-60 hover:-translate-y-1 hover:scale-95 duration-60 w-11/12 h-5/6">CANCELAR</button>
                        </div>
                        <div className="rounded-xl row-start-10 col-span-2 col-end-11 flex justify-center">
                            <button onClick={
                                (e) => agregar(
                                    document.getElementById('Nombre').value,
                                    document.getElementById('Descripcion').value,
                                    document.getElementById('Duracion').value,
                                    document.getElementById('Precio').value
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