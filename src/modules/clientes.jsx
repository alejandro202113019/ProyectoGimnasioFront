import axios from "axios";
import { useEffect, useState } from "react"
import TablaClientes from "./components/tabla_clientes"
import Alert from "./components/alert";
import Confirmation from "./components/confirmacion";
import New from "./components/nuevo_cliente";
import Update from "./components/actualizar_cliente";


function Clientes({loading, setLoading}) {
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
                setLoading(true)
                const result = await axios.get('http://localhost:5001/api/clientes');
                setAlert1(false)
                setClientes(result.data)
            } catch(e) {
                console.log('hubo un error :(')
            } finally {
                setLoading(false)
            }
        } else {
            try {
                setLoading(true)
                const result = await axios.get(`http://localhost:5001/api/clientes/${id}`);
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
            setLoading(true)
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
        } finally {
            setLoading(false)
        }
        setConfirmar(false)
    }

    const agregar = async (nombre, apellido, nacimiento, documento, correo, telefono) => {
        try {
            setLoading(true)
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
        } finally {
            setLoading(false)
        }
        setNuevo(false)
    }

    const actualizar = async (nombre, apellido, nacimiento, documento, correo, telefono) => {
        try {
            setLoading(true)
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
        } finally {
            setLoading(false)
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
            <div className={`flex grid grid-cols-4 grid-rows-1 gap-5 pt-32 pb-4 w-full`}>
                <div className="">
                    <input id="busqueda" type="text" placeholder="Buscar por ID" className="ring-2 ring-blue-500 min-w-full min-h-9" value={valor} onChange={handleInputChange}></input>
                </div>
                <div className="flex justify-start">
                    <button disabled={loading} type="button" className={`rounded-xl cursor-pointer bg-indigo-400 m-0.5 transition ease-in-out 
                        delay-60 hover:-translate-y-1 hover:scale-95 duration-60 min-w-40 min-h-8 ${loading ? 'cursor-wait opacity-50 hover:translate-y-0 hover:scale-100' : 'cursor-pointer'}`} onClick={
                            () => buscar(document.getElementById('busqueda').value)
                        }>BUSCAR</button>
                </div>
                <div className="flex justify-end col-end-5">
                    <button onClick={() => changeNuevo(true)} type="button" className="rounded-xl cursor-pointer bg-indigo-400 m-0.5 transition ease-in-out 
                        delay-60 hover:-translate-y-1 hover:scale-95 duration-60 min-w-40 min-h-8">NUEVO</button>
                </div>
            </div>
            <hr className="my-3" />
            <div>
                <TablaClientes clientes={clientes} eliminar={eliminar} chageConfirmation={chageConfirmation} changeUpdate={changeUpdate}/>
            </div>
        </>
    )

}

export default Clientes