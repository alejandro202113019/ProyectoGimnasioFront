import axios from "axios";
import { useEffect, useState } from "react"
import Alert from "./components/alert";
import HorarioClases from "./components/horario_clases";


function Horario({loading, setLoading}) {
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
            const result = await axios.get('http://localhost:5001/api/horarios');
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
        setConfirmar(false)
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
    }

    const agregar = async (nombre, estado) => {
        setNuevo(false)
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
        setModificar(false)
    }

    return (

        <>
            <div className="fixed flex pb-0 min-h-28 w-5/12 right-0">
                <Alert alert1={alert1} mensaje={mensaje} change={chageAlert}/>
            </div>

            <div className="flex items-center text-4xl font-semibold text-indigo-700 mb-6">
                <i className="fas fa-warehouse mr-3 text-5xl"></i>
                <span>HORARIO DE CLASES</span>
            </div>

            <hr className="border-t-2 border-indigo-400 my-4"/>
            <div>
                <HorarioClases clases={data}/>
            </div>
        </>
    )

}

export default Horario