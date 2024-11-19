import axios from "axios";
import { useEffect, useState } from "react"
import TablaPlan from "./components/tabla_planes";
import Alert from "./components/alert";
import Confirmation from "./components/confirmacion";
import NuevoPlan from "./components/nuevo_plan";
import ActualizarPlan from "./components/actualizar_plan";


function Plan({loading, setLoading}) {
    const [data, setData] = useState(null);
    const [alert1, setAlert1] = useState(false)
    const [mensaje, setMensaje] = useState("");
    const [confirmar, setConfirmar] = useState(false);
    const [nuevo, setNuevo] =  useState(false);
    const [modificar, setModificar] = useState(false);
    const [idPlan, setIdPlan] = useState("");
    const [nombre, setNombre] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [duracion, setDuracion] = useState("");
    const [precio, setPrecio] = useState("");

    const fetchAPI = async () => {
        try {
            setLoading(true)
            const result = await axios.get('http://localhost:5001/api/planes');
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
        const nuevoValor = event.target.value.replace(/[^0-9]/g, '');
        setDuracion(nuevoValor);
    };

    const handleInputChange2 = (event) => {
        const nuevoValor = event.target.value.replace(/[^0-9.]/g, '');
        setPrecio(nuevoValor);
    };

    const handleInputChange3 = (event) => {
        const nuevoValor = event.target.value.replace(/[^0-9]/g, '');
        setIdPlan(nuevoValor);
    };

    const chageAlert = () => {
        setAlert1(false)
    }

    const chageConfirmation = (state, id) => {
        setIdPlan(id)
        setConfirmar(state)
    }

    const changeNuevo = (state) => {
        setNuevo(state)
    }

    const changeUpdate = (modificar, id, nombre, descripcion, duracion, precio) => {
        setModificar(modificar)
        setIdPlan(id)
        setNombre(nombre)
        setDescripcion(descripcion)
        setDuracion(duracion)
        setPrecio(precio)
    }

    const buscar = async (id) => {
        if (id === "") {
            try {
                setLoading(true)
                const result = await axios.get('http://localhost:5001/api/planes');
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
                const result = await axios.get(`http://localhost:5001/api/planes/${id}`);
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
            const result = await axios.delete(`http://localhost:5001/api/planes/${idPlan}`);
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

    const agregar = async (nombre, descripcion, duracion, precio) => {
        try {
            setLoading(true)
            const result = await axios.post(`http://localhost:5001/api/planes`,{
                Descripcion: descripcion,
                Duracion: parseInt(duracion),
                Nombre_Plan: nombre,
                Precio: parseFloat(precio)
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

    const actualizar = async (id, nombre, descripcion, duracion, precio) => {
        try {
            setLoading(true)
            const result = await axios.put(`http://localhost:5001/api/planes/${id}`,{
                ID_Plan: id,
                Descripcion: descripcion,
                Duracion: parseInt(duracion),
                Nombre_Plan: nombre,
                Precio: parseFloat(precio)
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
            <NuevoPlan 
                agregar={agregar} 
                nuevo={nuevo} 
                changeNuevo={changeNuevo} 
                handleChange={handleInputChange}
                handleChange2={handleInputChange2}
                id={idPlan}
                duracion={duracion}
                precio={precio}
            />
            <ActualizarPlan 
                setModificar={setModificar} 
                modificar={modificar} 
                id={idPlan} 
                nombre={nombre} 
                setNombre={setNombre}
                descripcion={descripcion}
                setDescripcion={setDescripcion}
                duracion={duracion}
                setDuracion={setDuracion}
                precio={precio}
                setPrecio={setPrecio}
                handleChange={handleInputChange}
                handleChange2={handleInputChange2}
                actualizar={actualizar}/>
            <div className="fixed flex pb-0 min-h-28 w-5/12 right-0">
                <Alert alert1={alert1} mensaje={mensaje} change={chageAlert}/>
            </div>
            <div className={`flex grid grid-cols-4 grid-rows-1 gap-5 pt-32 pb-4 w-full`}>
                <div className="">
                    <input id="busqueda" type="text" placeholder="Buscar por ID" className="ring-2 ring-blue-500 min-w-full min-h-9" onChange={handleInputChange3}></input>
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
                <TablaPlan data={data} eliminar={eliminar} chageConfirmation={chageConfirmation} changeUpdate={changeUpdate}/>
            </div>
        </>
    )

}

export default Plan