import axios from "axios";
import { useEffect, useState } from "react"
import TablaPlan from "./components/tabla_asistencias.jsx";
import Alert from "./components/alert";
import Confirmation from "./components/confirmacion";
import ConfirmationSalida from "./components/confirmacionSalida.jsx";
import ConfirmationEntrada from "./components/confirmacionEntrada.jsx";


function Asistencias({loading, setLoading}) {
    const [data, setData] = useState(null);
    const [alert1, setAlert1] = useState(false)
    const [mensaje, setMensaje] = useState("");
    const [confirmar, setConfirmar] = useState(false);
    const [confirmarSalida,setConfirmarSalida] = useState(false);
    const [idAsistencia, setIdAsistencia] = useState("");
    const [clientes, setClientes] = useState(null);
    const [entradas, setEntradas] = useState(false);
    const [membresia, setMembresia] = useState(null)
 
    const fetchAPI = async () => {
        try {
            setLoading(true)
            const result = await axios.get('http://localhost:5001/api/asistencias');
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

    const chageAlert = () => {
        setAlert1(false)
    }

    const chageConfirmation = (state, id) => {
        setIdAsistencia(id)
        setConfirmar(state)
    }

    const changeConfirmationSalida = (state,id) => {
        setIdAsistencia(id)
        setConfirmarSalida(id)
    }

    const changeEntrada = (entrada, clientes) => {
        setClientes(clientes)
        setEntradas(entrada)
    }


    const changeUpdate = (idAsistencia) => {
        setIdAsistencia(idAsistencia)
    }

    const buscar = async (id) => {
        if (id === "") {
            try {
                setLoading(true)
                const result = await axios.get('http://localhost:5001/api/asistencias');
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
                const result = await axios.get(`http://localhost:5001/api/asistencias/${id}`);
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
            const result = await axios.delete(`http://localhost:5001/api/asistencias/${idAsistencia}`);
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

    const agregar = async () => {
        setEntradas(false)
        try {
            setLoading(true);
            const result = await axios.get(`http://localhost:5001/api/membresias/${clientes.ID_Cliente}`);
            if (result.data.error) {
                setAlert1(true);
                setMensaje(result.data.error);
            } else {
                setMembresia(result.data);
                setAlert1(false);
        
                if (result.data.Estado === 'Inactiva') {
                    setMensaje(`El cliente ${clientes.Nombre} ${clientes.Apellido} tiene la membresia vencida`);
                    setAlert1(true);
                } else if (result.data.Estado === null) {
                    setMensaje(`El cliente ${clientes.Nombre} ${clientes.Apellido} no tiene asignada una membresia`);
                    setAlert1(true);
                } else if (result.data.Estado === 'Activa') {
                    try {
                        const postResult = await axios.post(`http://localhost:5001/api/asistencias`, {
                            ID_Cliente: clientes.ID_Cliente,
                            FechaAsistencia: obtenerFechaActual(),
                            Hora_Entrada: obtenerHoraActual(),
                            Hora_Salida: "-",
                        });
                        if (postResult.data.message) {
                            setMensaje(postResult.data.message);
                            setAlert1(true);
                            fetchAPI();
                        } else if (postResult.data.error) {
                            setMensaje(postResult.data.error);
                            setAlert1(true);
                        }
                    } catch (e) {
                        console.log('hubo un error :(');
                    }
                }
            }
        } catch (e) {
            console.log('hubo un error :(');
        } finally {
            setLoading(false);
        }
    }

    const obtenerFechaActual = () => {
        const hoy = new Date();
        const year = hoy.getFullYear();
        const month = String(hoy.getMonth() + 1).padStart(2, '0'); // Los meses empiezan desde 0
        const day = String(hoy.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const obtenerHoraActual = () => {
        const ahora = new Date();
        const horaFormateada = ahora.toLocaleTimeString('en-GB', { hour12: false });
        return horaFormateada;
    }

    const actualizar = async () => {
        setConfirmarSalida(false)
        try {
            setLoading(true)
            const result = await axios.put(`http://localhost:5001/api/asistencias/${idAsistencia}`,{
                FechaAsistencia: "Sun, 01 Dec 2024 00:00:00 GMT",
                Hora_Entrada: "",
                Hora_Salida: obtenerHoraActual(),
                ID_Asistencia: idAsistencia,
                ID_Cliente: ""
            });
            if (result.data.message) {
                setMensaje(result.data.message)
                setAlert1(true)
                fetchAPI()
            } else if (result.data.error) {
                setMensaje(result.data.error)
                setAlert1(true)
            }
            // eslint-disable-next-line no-unused-vars
        } catch(e) {
            console.log('hubo un error :(')
        } finally {
            setLoading(false)
        }
    }

    const buscarCliente = async (id) => {
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
            setEntradas(true)
            setLoading(false)
        }
    }

    return (

        <>
            <Confirmation confirmar={confirmar} changeConfirmation={chageConfirmation} eliminar={eliminar}/>
            <ConfirmationSalida confirmarSalida={confirmarSalida} changeConfirmation={changeConfirmationSalida} eliminar={actualizar}/>
            <ConfirmationEntrada confirmarEntrada={entradas} changeConfirmation={changeEntrada} clientes={clientes} agregar={agregar}/>

            <div className="fixed flex pb-0 min-h-28 w-5/12 right-0">
                <Alert alert1={alert1} mensaje={mensaje} change={chageAlert}/>
            </div>

            <div className="flex items-center text-4xl font-semibold text-indigo-700 mb-6">
                <i className="fas fa-list-alt mr-3 text-5xl"></i>
                <span>GESTIÓN ASISTENCIAS</span>
            </div>

            <hr className="border-t-2 border-indigo-400 my-4"/>

            <div className={`flex grid grid-cols-4 grid-rows-1 gap-5 pt-25 pb-4 w-full`}>
                <div>
                    <input
                        id="busqueda"
                        type="text"
                        placeholder="Buscar por ID"
                        className="ring-2 ring-blue-500 w-full h-10 px-3 py-2 rounded-md"
                    />
                </div>
                <div className="flex justify-start">
                    <button
                        disabled={loading}
                        type="button"
                        className={`rounded-md bg-indigo-400 text-white h-10 px-4 shadow-sm transition ease-in-out delay-60 hover:-translate-y-1 hover:scale-95 duration-60 ${loading ? 'cursor-wait opacity-50 hover:translate-y-0 hover:scale-100' : 'cursor-pointer'}`}
                        onClick={() => buscar(document.getElementById('busqueda').value)}
                    >
                        <i className="fas fa-search"></i> BUSCAR
                    </button>
                    <button
                        disabled={loading}
                        onClick={() => buscarCliente(document.getElementById("busqueda").value)}
                        type="button"
                        className={`rounded-md bg-green-500 text-white h-10 px-4 shadow-sm transition ease-in-out delay-60 hover:-translate-y-1 hover:scale-95 duration-60  ${loading ? 'cursor-wait opacity-50 hover:translate-y-0 hover:scale-100' : 'cursor-pointer'}`}
                    >
                        <i className="fas fa-search"></i> ENTRADA
                    </button>
                </div>
            </div>

            <div>
                <TablaPlan data={data} eliminar={eliminar} chageConfirmation={chageConfirmation}
                           changeUpdate={changeUpdate} changeConfirmationSalida={changeConfirmationSalida}/>
            </div>
        </>
    )

}

export default Asistencias