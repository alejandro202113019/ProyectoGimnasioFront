import axios from "axios";
import { useEffect, useState } from "react"
import TablaInventario from "./components/tabla_inventario";
import Alert from "./components/alert";
import Confirmation from "./components/confirmacion";
import NuevoEquipo from "./components/nuevo_equipo";
import ActualizarEquipo from "./components/actualizar_equipo";


function Inventario({loading, setLoading}) {
    const [data, setData] = useState(null);
    const [alert1, setAlert1] = useState(false)
    const [mensaje, setMensaje] = useState("");
    const [confirmar, setConfirmar] = useState(false);
    const [nuevo, setNuevo] =  useState(false);
    const [modificar, setModificar] = useState(false);
    const [idEquipo, setIdEquipo] = useState("");
    const [nombre, setNombre] = useState("");
    const [estado, setEstado] = useState("");

    const fetchAPI = async () => {
        try {
            setLoading(true)
            const result = await axios.get('http://localhost:5001/api/equipos');
            setData(result.data)
        } catch(e) {
            console.log('hubo un error :(')
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchAPI()
    }, []);

    const handleInputChange = (event) => {
        const nuevoValor = event.target.value.replace(/[^0-9]/g, ''); // Permitir solo letras
        setIdEquipo(nuevoValor);
    };

    const chageAlert = () => {
        setAlert1(false)
    }

    const chageConfirmation = (state, id) => {
        setIdEquipo(id)
        setConfirmar(state)
    }

    const changeNuevo = (state) => {
        setNuevo(state)
    }

    const changeUpdate = (modificar, id, nombre, estado) => {
        setModificar(modificar)
        setIdEquipo(id)
        setNombre(nombre)
        setEstado(estado)
    }

    const buscar = async (id) => {
        if (id === "") {
            try {
                setLoading(true)
                const result = await axios.get('http://localhost:5001/api/equipos');
                setAlert1(false)
                setData(result.data)
            } catch(e) {
                console.log('hubo un error :(')
            } finally {
                setLoading(false)
            }
        } else {
            try {
                setLoading(true)
                const result = await axios.get(`http://localhost:5001/api/equipos/${id}`);
                if (result.data.error) {
                    setAlert1(true)
                    setMensaje(result.data.error)
                } else {
                    setData(result.data)
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
            const result = await axios.delete(`http://localhost:5001/api/equipos/${idEquipo}`);
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

    const agregar = async (nombre, estado) => {
        try {
            setLoading(true)
            const result = await axios.post(`http://localhost:5001/api/equipos`,{
                Nombre_Equipo: nombre,
                Estado: estado
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

    const actualizar = async (id, nombre, estado) => {
        try {
            setLoading(true)
            const result = await axios.put(`http://localhost:5001/api/equipos/${id}`,{
                Nombre_Equipo: nombre,
                Estado: estado
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
            <NuevoEquipo agregar={agregar} nuevo={nuevo} changeNuevo={changeNuevo} handleChange={handleInputChange} id={idEquipo}/>
            <ActualizarEquipo setModificar={setModificar} modificar={modificar} id={idEquipo} nombre={nombre} setNombre={setNombre} estado={estado} setEstado={setEstado} actualizar={actualizar}/>
            <div className="fixed flex pb-0 min-h-28 w-5/12 right-0">
                <Alert alert1={alert1} mensaje={mensaje} change={chageAlert}/>
            </div>
            <div className={`flex grid grid-cols-4 grid-rows-1 gap-5 pt-32 pb-4 w-full`}>
                <div className="">
                    <input id="busqueda" type="text" placeholder="Buscar por ID" className="ring-2 ring-blue-500 min-w-full min-h-9" onChange={handleInputChange}></input>
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
            <div>
                <TablaInventario data={data} eliminar={eliminar} chageConfirmation={chageConfirmation} changeUpdate={changeUpdate}/>
            </div>
        </>
    )

}

export default Inventario