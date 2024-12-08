import axios from "axios";
import { useEffect, useState } from "react"
import Alert from "./components/alert";
import TablaClases from "./components/tabla_clases";
import CrearClase from "./components/nueva_clase";
import { setId } from "@material-tailwind/react/components/Tabs/TabsContext";
import Confirmation from "./components/confirmacion";


function Clases({loading, setLoading}) {
    const [data, setData] = useState(null);
    const [alert1, setAlert1] = useState(false)
    const [mensaje, setMensaje] = useState("");
    const [confirmar, setConfirmar] = useState(false);
    const [nuevo, setNuevo] =  useState(false);
    const [modificar, setModificar] = useState(false);
    const [idEquipo, setIdEquipo] = useState("");
    const [nombre, setNombre] = useState("");
    const [idClase, setIdClase] = useState("");
    const [instructores, setInstructores] = useState("")

    const fetchAPI = async () => {
        try {
            setLoading(true)
            const result = await axios.get('http://localhost:5001/api/clases');
            setData(result.data)
        } catch(e) {
            console.log('hubo un error :(')
        } finally {
            setLoading(false)
        }
    }

    const fetchAPIInstructores = async () => {
        try {
            setLoading(true)
            const result = await axios.get('http://localhost:5001/api/instructores');
            setInstructores(result.data)
        } catch(e) {
            console.log('hubo un error :(')
        } finally {
            setLoading(false)
        }
    }


    useEffect(() => {
        fetchAPI()
        fetchAPIInstructores()
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

    const AgregarClaseHorario = (Hora_inicio, Hora_fin, dise_semana, capacidad, duracion, id_instructor, nombre_clase) => {
        agregarClase(capacidad, duracion, id_instructor, nombre_clase, Hora_inicio, Hora_fin, dise_semana)
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
        setConfirmar(false)
        try {
            setLoading(true)
            const result = await axios.delete(`http://localhost:5001/api/clases/${idClase}`);
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

    const agregarClase = async (capacidad, duracion, id_instructor, nombre_clase, Hora_inicio, Hora_fin, dise_semana) => {
        setNuevo(false)
        try {
            setLoading(true)
            const result = await axios.post(`http://localhost:5001/api/clases`,{
                Capacidad_Maxima: capacidad,
                Duracion: 60,
                ID_Instructor: id_instructor,
                Nombre_Clase: nombre_clase
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
            agregarHorario(Hora_inicio, Hora_fin, dise_semana)
            setLoading(false)
        }
    }

    const agregarHorario = async (hora_inicio, hora_fin, dia_semana) => {
        setNuevo(false)
        try {
            setLoading(true)
            const result = await axios.post(`http://localhost:5001/api/horarios`,{
                Hora_Fin: hora_fin,
                Hora_Inicio: hora_inicio,
                ID_Clase: 21,
                Dia_Semana: dia_semana
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

    const actualizar = async (id, nombre, estado) => {
        setModificar(false)
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
    }

    return (

        <>  
            <Confirmation confirmar={confirmar} changeConfirmation={chageConfirmation} eliminar={eliminar}/>
            <CrearClase
                nuevaClase={nuevo} 
                setNuevaClase={changeNuevo} 
                instructores={instructores} 
                agregar={AgregarClaseHorario}></CrearClase>
            <div className="fixed flex pb-0 min-h-28 w-5/12 right-0">
                <Alert alert1={alert1} mensaje={mensaje} change={chageAlert}/>
            </div>

            <div className="flex items-center text-4xl font-semibold text-indigo-700 mb-6">
                <i className="fas fa-warehouse mr-3 text-5xl"></i>
                <span>GESTION DE CLASES</span>
            </div>

            <hr className="border-t-2 border-indigo-400 my-4"/>

            <div className={`flex grid grid-cols-4 grid-rows-1 gap-5 pt-25 pb-4 w-full`}>
                <div className="flex justify-end col-end-5">
                    <button onClick={() => changeNuevo(true)} type="button"
                            className="bg-green-500 hover:bg-green-700 text-white py-2 px-4 rounded-md shadow-sm transition duration-200 ease-in-out m-1">
                        <i className="fas fa-plus"></i> NUEVO
                    </button>
                </div>
            </div>

            <div>
                <TablaClases datos={data} setConfirmar={setConfirmar} setId={setIdClase}/>
            </div>
        </>
    )

}

export default Clases