import axios from "axios";
import { useEffect, useState } from "react"


function Clientes() {
    const [clientes, setClientes] = useState(null);
    const [valor, setValor] = useState('');
    const [valor1, setValor1] = useState('');
    const [valor2, setValor2] = useState('');
    const [alert1, setAlert1] = useState(false)
    const [mensaje, setMensaje] = useState("");
    const [confirmar, setConfirmar] = useState(false);
    const [nuevo, setNuevo] =  useState(false);
    const [modificar, setModificar] = useState(false);
    const [idClente, setIdCliente] = useState("");
    const [correo, setCorreo] = useState("");
    const [nacimiento, setNacimiento] = useState("");
    const [nombre, setNombre] = useState("");
    const [apellido, setApellido] = useState("");
    const [loading, setLoading] = useState(false);

    const fetchAPI = async () => {
        try {
            const result = await axios.get('http://localhost:5001/api/clientes');
            setClientes(result.data)
        } catch(e) {
            console.log('hubo un error :(')
        }
    }

    useEffect(() => {
        fetchAPI()
    }, []);

    const handleInputChange = (event) => {
        const nuevoValor = event.target.value.replace(/[^0-9]/g, '');
        setValor(nuevoValor)
    }

    const handleInputChange1 = (event) => {
        const nuevoValor1 = event.target.value.replace(/[^0-9]/g, '');
        setValor1(nuevoValor1)
    }

    const handleInputChange2 = (event) => {
        const nuevoValor2 = event.target.value.replace(/[^0-9]/g, '');
        setValor2(nuevoValor2)
    }

    const chageAlert = () => {
        setAlert1(false)
    }

    const chageConfirmation = (state, id) => {
        setIdCliente(id)
        setConfirmar(state)
    }

    const changeNuevo = (state) => {
        setNuevo(state)
    }

    const changeUpdate = (state, nombre, apellido, nacimiento, documento, correo, telefono) => {
        setModificar(state)
        setNombre(nombre)
        setApellido(apellido)
        setNacimiento(nacimiento)
        setValor1(documento)
        setValor2(telefono)
        setCorreo(correo)
    }

    const buscar = async (id) => {

        if (id === "") {
            try {
                const result = await axios.get('http://localhost:5001/api/clientes');
                setAlert1(false)
                setClientes(result.data)
                setLoading(true)
            } catch(e) {
                console.log('hubo un error :(')
            } finally {
                setLoading(false)
            }
        } else {
            console.log('entro en el fetc del alert')
            try {
                const result = await axios.get(`http://localhost:5001/api/clientes/${id}`);
                setLoading(true)
                if (result.data.error) {
                    setAlert1(true)
                    setMensaje(result.data.error)
                } else {
                    setClientes(result.data)
                    setAlert1(false)
                }
            } catch(e) {
                 console.log('hubo un error :(')
            } finally {
                setLoading(false)
            }
        }
    }

    const eliminar = async () => {
        try {
            const result = await axios.delete(`http://localhost:5001/api/clientes/${idClente}`);
            if (result.data.message) {
                setMensaje(result.data.message)
                setAlert1(true)
                fetchAPI()
            } else if (result.data.error) {
                setMensaje(result.data.error)
                setAlert1(true)
            }
        } catch(e) {
            console.log('hubo un error :(')
        }
        setConfirmar(false)
    }

    const agregar = async (nombre, apellido, nacimiento, documento, correo, telefono) => {
        try {
            const result = await axios.post(`http://localhost:5001/api/clientes`,{
                Apellido: apellido,
                Email: correo,
                Fecha_Nacimiento: nacimiento,
                ID_Cliente: parseInt(documento),
                Nombre: nombre,
                Telefono: telefono
            });
            if (result.data.message) {
                setMensaje(result.data.message)
                setAlert1(true)
                fetchAPI()
            } else if (result.data.error) {
                setMensaje(result.data.error)
                setAlert1(true)
            }
        } catch(e) {
            console.log('hubo un error :(')
        }
        setNuevo(false)
    }

    const actualizar = async (nombre, apellido, nacimiento, documento, correo, telefono) => {
        try {
            const result = await axios.put(`http://localhost:5001/api/clientes/${documento}`,{
                Apellido: apellido,
                Email: correo,
                Fecha_Nacimiento: nacimiento,
                Nombre: nombre,
                Telefono: telefono
            });
            if (result.data.message) {
                setMensaje(result.data.message)
                setAlert1(true)
                fetchAPI()
            } else if (result.data.error) {
                setMensaje(result.data.error)
                setAlert1(true)
            }
        } catch(e) {
            console.log('hubo un error :(')
        }
        setModificar(false)
    }

    return (
        
        <>  
            <Confirmation confirmar={confirmar} changeConfirmation={chageConfirmation} eliminar={eliminar}/>
            <New agregar={agregar} nuevo={nuevo} changeNuevo={changeNuevo} handleChange1={handleInputChange1} handleChange2={handleInputChange2} valor1={valor1} valor2={valor2}/>
            <Update modificar={modificar} setModificar={setModificar} actualizar={actualizar} valor1={valor1} valor2={valor2} nombre={nombre} 
            apellido={apellido} handleChange1={handleInputChange1} handleChange2={handleInputChange2} setNombre={setNombre} setApellido={setApellido}
            setNacimiento={setNacimiento} setCorreo={setCorreo} nacimiento={nacimiento} correo={correo}/>
            <div className="fixed flex pb-0 min-h-28 w-5/12 right-0">
                <Alert alert1={alert1} mensaje={mensaje} change={chageAlert}/>
            </div>
            <div className={`flex grid grid-cols-4 grid-rows-1 gap-5 pt-32 pb-4 w-full ${loading ? 'cursor-loading' : ''}`}>
                <div className="">
                    <input id="busqueda" type="text" placeholder="BUSCAR" className="ring-2 ring-blue-500 min-w-full min-h-9" value={valor} onChange={handleInputChange}></input>
                </div>
                <div className="flex justify-start">
                    <button type="button" className="rounded-xl cursor-pointer bg-indigo-400 m-0.5 transition ease-in-out 
                        delay-60 hover:-translate-y-1 hover:scale-95 duration-60 min-w-40 min-h-8" onClick={
                            () => buscar(document.getElementById('busqueda').value)
                        }>BUSCAR</button>
                </div>
                <div className="flex justify-end col-end-5">
                    <button onClick={() => changeNuevo(true)} type="button" className="rounded-xl cursor-pointer bg-indigo-400 m-0.5 transition ease-in-out 
                        delay-60 hover:-translate-y-1 hover:scale-95 duration-60 min-w-40 min-h-8">NUEVO</button>
                </div>
            </div>
            <hr className="my-3" />
            <div className={`${loading ? 'cursor-loading' : ''}`}>
                <Tabla clientes={clientes} eliminar={eliminar} chageConfirmation={chageConfirmation} changeUpdate={changeUpdate}/>
            </div>
        </>
    )

}

function Tabla({clientes, chageConfirmation, changeUpdate}) {
    if (clientes !== null && Array.isArray(clientes)) {
        return (
            <table id="tablaclientes" className="border-collapse border border-slate-500 w-full">
                    <thead>
                        <tr className="bg-indigo-500">
                            <th className="border border-slate-600">ID</th>
                            <th className="border border-slate-600">Nombre</th>
                            <th className="border border-slate-600">Apellido</th>
                            <th className="border border-slate-600">Nacimiento</th>
                            <th className="border border-slate-600">Teléfono</th>
                            <th className="border border-slate-600">Correo</th>
                            <th className="border border-slate-600">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            clientes.map((cliente) => (
                                <tr key={cliente.ID_Cliente}>
                                    <td className="border border-slate-700 text-center">{cliente.ID_Cliente}</td>
                                    <td className="border border-slate-700 text-center">{cliente.Nombre}</td>
                                    <td className="border border-slate-700 text-center">{cliente.Apellido}</td>
                                    <td className="border border-slate-700 text-center">{cliente.Fecha_Nacimiento}</td>
                                    <td className="border border-slate-700 text-center">{cliente.Telefono}</td>
                                    <td className="border border-slate-700 text-center">{cliente.Email}</td>
                                    <td className="border border-slate-700 grid grid-cols-1">
                                        <button onClick={(e) => changeUpdate(
                                            true,
                                            cliente.Nombre,
                                            cliente.Apellido,
                                            cliente.Fecha_Nacimiento,
                                            cliente.ID_Cliente,
                                            cliente.Email,
                                            cliente.Telefono
                                        )} type="button" className="cursor-pointer bg-indigo-400 m-0.5 transition ease-in-out 
                                        delay-60 hover:-translate-y-1 hover:scale-95 duration-60">ACTUALIZAR</button>
                                        <button onClick={(e) => chageConfirmation(true, cliente.ID_Cliente)} type="button" className="cursor-pointer bg-indigo-400 m-0.5 transition ease-in-out 
                                        delay-60 hover:-translate-y-1 hover:scale-95 duration-60">ELIMINAR</button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
            </table>
        )
    } else if (!Array.isArray(clientes) && clientes !== null && !clientes.error) {
        return (
            <table className="border-collapse border border-slate-500 w-full">
                    <thead>
                        <tr className="bg-indigo-500">
                            <th className="border border-slate-600">ID</th>
                            <th className="border border-slate-600">Nombre</th>
                            <th className="border border-slate-600">Apellido</th>
                            <th className="border border-slate-600">Nacimiento</th>
                            <th className="border border-slate-600">Teléfono</th>
                            <th className="border border-slate-600">Correo</th>
                            <th className="border border-slate-600">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr key={clientes.ID_Cliente}>
                            <td className="border border-slate-700 text-center">{clientes.ID_Cliente}</td>
                            <td className="border border-slate-700 text-center">{clientes.Nombre}</td>
                            <td className="border border-slate-700 text-center">{clientes.Apellido}</td>
                            <td className="border border-slate-700 text-center">{clientes.Fecha_Nacimiento}</td>
                            <td className="border border-slate-700 text-center">{clientes.Telefono}</td>
                            <td className="border border-slate-700 text-center">{clientes.Email}</td>
                            <td className="border border-slate-700 grid grid-cols-1">
                                <button onClick={(e) => changeUpdate(
                                            true,
                                            clientes.Nombre,
                                            clientes.Apellido,
                                            clientes.Fecha_Nacimiento,
                                            clientes.ID_Cliente,
                                            clientes.Email,
                                            clientes.Telefono
                                        )} type="button" className="cursor-pointer bg-indigo-400 m-0.5 transition ease-in-out 
                                        delay-60 hover:-translate-y-1 hover:scale-95 duration-60">ACTUALIZAR</button>
                                <button onClick={(e) => chageConfirmation(true, clientes.ID_Cliente)} type="button" className="cursor-pointer bg-indigo-400 m-0.5 transition ease-in-out 
                                        delay-60 hover:-translate-y-1 hover:scale-95 duration-60">ELIMINAR</button>
                            </td>
                        </tr>
                    </tbody>
            </table>
        )
    } else {
        return (
            <></>
        )
    }
}

function Alert({alert1, mensaje, change}) {
    if (alert1) {
        return (
            <div role="alert" class="mb-4 relative p-3 text-sm text-white bg-red-600 rounded-md flex justify-start w-11/12">
                    {mensaje}
                <button onClick={change} class="flex items-center justify-center transition-all w-8 h-8 rounded-md text-white hover:bg-white/10 active:bg-white/10 absolute top-1.5 right-1.5" type="button">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="h-5 w-5" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"></path></svg>
                </button>
            </div>
        )
    } else {
        return (
            <></>
        )
    }
    
}

function Confirmation( {confirmar, changeConfirmation, eliminar} ) {

    if (confirmar) {
        return (
            <>
                <div className="fixed w-11/12 h-5/6 grid grid-cols-9 grid-rows-7 gap-3">
                    <div className=" rounded-xl grid grid-cols-9 grid-rows-5 row-start-3 col-span-3 col-end-7 row-span-2 bg-indigo-400">
                        <div className="col-span-9 col-end-10 row-span-3 content-center text-center text-white text-lg">
                            ¿Está seguro que desea eliminar los datos del cliente?
                        </div>
                        <div className=" row-start-5 col-span-3 col-end-7">
                            <button onClick={(e) => changeConfirmation(false,"")} type="button" className="rounded-xl cursor-pointer bg-green-500 transition ease-in-out 
                                        delay-60 hover:-translate-y-1 hover:scale-95 duration-60 w-11/12 h-5/6">CANCELAR</button>
                        </div>
                        <div className=" row-start-5 col-end-10 col-span-3">
                            <button onClick={(e) => eliminar()} type="button" className="rounded-xl cursor-pointer bg-red-700 transition ease-in-out 
                                        delay-60 hover:-translate-y-1 hover:scale-95 duration-60 w-11/12 h-5/6">CONFIRMAR</button>
                        </div>
                    </div>
                </div>
            </>
        )
    }

}

function New( {nuevo, handleChange1, handleChange2, valor1, valor2, changeNuevo, agregar} ) {
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [nacimiento, setNacimiento] = useState('');
    const [correo, setCorreo] = useState('');

    const isFormValid = nombre && apellido && nacimiento && valor1 && correo && valor2;

    if (nuevo) {
        return (
            <>
                <div className="fixed w-11/12 h-5/6 grid grid-cols-9 grid-rows-7 gap-3">
                    <div className="rounded-xl grid grid-cols-10 grid-rows-10 row-start-2 col-span-5 col-end-8 row-span-5 bg-indigo-400">
                        <div className="rounded-xl col-span-10 row-start-2 text-center text-white text-5xl">
                            Nuevo Cliente
                        </div>
                        <div className=" rounded-xl col-span-5 row-start-5 col-end-6 flex justify-center">
                            <input value={nombre} onChange={(e) => setNombre(e.target.value)} id="Nombre" type="text" placeholder="Nombre" className="ring-2 ring-blue-500 w-11/12 h-4/6"></input>
                        </div>
                        <div className=" rounded-xl col-span-5 row-start-5 col-end-11 flex justify-center">
                            <input value={apellido} onChange={(e) => setApellido(e.target.value)} id="Apellido" type="text" placeholder="Apellido" className="ring-2 ring-blue-500 w-11/12 h-4/6"></input>
                        </div>
                        <div className=" rounded-xl col-span-5 row-start-6 col-end-6 flex justify-center">
                            <input value={nacimiento} onChange={(e) => setNacimiento(e.target.value)} id="Nacimiento" type="date" placeholder="Nacimiento" className="ring-2 ring-blue-500 w-11/12 h-4/6"></input>
                        </div>
                        <div className=" rounded-xl col-span-5 row-start-6 col-end-11 flex justify-center">
                            <input value={valor1} onChange={handleChange1} id="Documento" type="text" placeholder="Documento" className="ring-2 ring-blue-500 w-11/12 h-4/6"></input>
                        </div>
                        <div className=" rounded-xl col-span-5 row-start-7 col-end-6 flex justify-center">
                            <input value={correo} onChange={(e) => setCorreo(e.target.value)} id="Correo" type="text" placeholder="Correo" className="ring-2 ring-blue-500 w-11/12 h-4/6"></input>
                        </div>
                        <div className=" rounded-xl col-span-5 row-start-7 col-end-11 flex justify-center">
                            <input value={valor2} onChange={handleChange2} id="Teléfono" type="text" placeholder="Teléfono" className="ring-2 ring-blue-500 w-11/12 h-4/6"></input>
                        </div>
                        <div className="rounded-xl row-start-10 col-span-2 col-end-9 flex justify-center">
                            <button onClick={(e) => changeNuevo(false)} type="button" className="rounded-xl cursor-pointer bg-green-500 transition ease-in-out 
                                        delay-60 hover:-translate-y-1 hover:scale-95 duration-60 w-11/12 h-5/6">CANCELAR</button>
                        </div>
                        <div className="rounded-xl row-start-10 col-span-2 col-end-11 flex justify-center">
                            <button onClick={
                                (e) => agregar(
                                    document.getElementById('Nombre').value,
                                    document.getElementById('Apellido').value,
                                    document.getElementById('Nacimiento').value,
                                    document.getElementById('Documento').value,
                                    document.getElementById('Correo').value,
                                    document.getElementById('Teléfono').value
                                )
                            } disabled={!isFormValid} type="button" className={`rounded-xl cursor-pointer bg-blue-600 transition ease-in-out 
                                delay-60 hover:-translate-y-1 hover:scale-95 duration-60 w-11/12 h-5/6 
                                ${!isFormValid ? 'opacity-50 cursor-not-allowed' : ''}`}>CONFIRMAR</button>
                        </div>
                    </div>
                </div>
            </>
        )
    }

}

function Update( {modificar, handleChange1, handleChange2, 
    valor1, valor2,nombre, apellido, nacimiento, correo, 
    setModificar, actualizar, setNombre, setApellido, setNacimiento, setCorreo} ) {

    const isFormValid = nombre && apellido && nacimiento && valor1 && correo && valor2;

    if (modificar) {
        return (
            <>
                <div className="fixed w-11/12 h-5/6 grid grid-cols-9 grid-rows-7 gap-3">
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
                            <input value={formatDateForInput(nacimiento)} onChange={(e) => setNacimiento(e.target.value)} id="Nacimiento" type="date" placeholder="Nacimiento" className="ring-2 ring-blue-500 w-11/12 h-4/6"></input>
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
                                    document.getElementById('Nacimiento').value,
                                    document.getElementById('Documento').value,
                                    document.getElementById('Correo').value,
                                    document.getElementById('Teléfono').value
                                )} disabled={!isFormValid} type="button" className={`rounded-xl cursor-pointer bg-blue-600 transition ease-in-out 
                                delay-60 hover:-translate-y-1 hover:scale-95 duration-60 w-11/12 h-5/6 
                                ${!isFormValid ? 'opacity-50 cursor-not-allowed' : ''}`}>CONFIRMAR</button>
                        </div>
                    </div>
                </div>
            </>
        )
    }

}

function formatDateForInput(dateString) {
    if (!dateString) return '';
    
    // Try to parse the date string
    const date = new Date(dateString);
    
    // Check if the date is valid
    if (isNaN(date.getTime())) {
      console.error('Invalid date:', dateString);
      return '';
    }
    
    // Format the date as YYYY-MM-DD
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    
    return `${year}-${month}-${day}`;
}

export default Clientes