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
            const result = await axios.get('https://proyectogimnasioback.onrender.com/api/planes');
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
        setLoading(false)
        if (id === "") {
            try {
                setLoading(true)
                const result = await axios.get('https://proyectogimnasioback.onrender.com/api/planes');
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
                const result = await axios.get(`https://proyectogimnasioback.onrender.com/api/planes/${id}`);
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
            }
        }
    }

    const eliminar = async () => {
        setConfirmar(false)
        try {
            setLoading(true)
            const result = await axios.delete(`https://proyectogimnasioback.onrender.com/api/planes/${idPlan}`);
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
    }

    const agregar = async (nombre, descripcion, duracion, precio) => {
        setNuevo(false)
        try {
            setLoading(true)
            const result = await axios.post(`https://proyectogimnasioback.onrender.com/api/planes`,{
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
    }

    const actualizar = async (id, nombre, descripcion, duracion, precio) => {
        setModificar(false)
        try {
            setLoading(true)
            const result = await axios.put(`https://proyectogimnasioback.onrender.com/api/planes/${id}`,{
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

            <div className="flex items-center text-4xl font-semibold text-indigo-700 mb-6">
                <i className="fas fa-list-alt mr-3 text-5xl"></i>
                <span>GESTIÓN PLANES</span>
            </div>

            <hr className="border-t-2 border-indigo-400 my-4"/>

            <div className={`flex grid grid-cols-4 grid-rows-1 gap-5 pt-25 pb-4 w-full`}>
                <div className="">
                    <input id="busqueda" type="text" placeholder="Buscar por ID"
                           className="ring-2 ring-blue-500 min-w-full min-h-9 px-3 py-2 rounded-md" onChange={handleInputChange3}></input>
                </div>
                <div className="flex justify-start">
                    <button disabled={loading} type="button" className={`rounded-xl cursor-pointer bg-indigo-400 m-0.5 text-white transition ease-in-out delay-60 hover:-translate-y-1 hover:scale-95 duration-60 min-w-40 min-h-8 ${loading ? 'cursor-wait opacity-50 hover:translate-y-0 hover:scale-100' : 'cursor-pointer'}`}
                            onClick={
                                () => buscar(document.getElementById('busqueda').value)
                            }><i className="fas fa-search"></i> BUSCAR

                    </button>
                </div>
                <div className="flex justify-end col-end-5">
                    <button onClick={() => changeNuevo(true)} type="button" className="bg-green-500 hover:bg-green-700 text-white py-2 px-4 rounded-md shadow-sm transition duration-200 ease-in-out m-1">
                        <i className="fas fa-plus"></i> NUEVO
                    </button>
                </div>
            </div>
            <div>
                <TablaPlan data={data} eliminar={eliminar} chageConfirmation={chageConfirmation}
                           changeUpdate={changeUpdate}/>
            </div>
        </>
    )

}

export default Plan