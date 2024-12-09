import axios from "axios";
import { useEffect, useState } from "react"
import TablaMembresias from "./components/tabla_membresias";
import Alert from "./components/alert";
import ConfirmationPago from "./components/confirmacionPago";
import Asignar from "./components/asignar_membresia";
import Update from "./components/actualizar_cliente";


function Membresias({loading, setLoading}) {
    const [data, setData] = useState(null);
    const [planes, setPlanes] = useState(null);
    const [valor, setValor] = useState('');
    const [valor1, setValor1] = useState('');
    const [valor2, setValor2] = useState('');
    const [alert1, setAlert1] = useState(false)
    const [mensaje, setMensaje] = useState("");
    const [confirmar, setConfirmar] = useState(false);
    const [asignar, setAsignar] =  useState(false);
    const [modificar, setModificar] = useState(false);
    const [idClente, setIdCliente] = useState("");
    const [correo, setCorreo] = useState("");
    const [nacimiento, setNacimiento] = useState("");
    const [nombre, setNombre] = useState("");
    const [apellido, setApellido] = useState("");
    const [idClienteMembresia, setIdClienteMembresia] = useState('');
    const [tipoPago, setTipoPago] = useState('Efectivo')
    const [monto, setMonto] = useState('')
    const [idMembresia, setIdMembresia] = useState('')
    const [fechaFin, setFechaFin] = useState('')

    const fetchAPI = async () => {
        try {
            setLoading(true)
            const result = await axios.get('https://proyectogimnasioback.onrender.com/api/membresias');
            setData(result.data)
        } catch(e) {
            console.log('hubo un error :(')
        } finally {
            setLoading(false)
        }
    }

    const fetchAPIPlanes = async () => {
        try {
            setLoading(true)
            const result = await axios.get('https://proyectogimnasioback.onrender.com/api/planes');
            setPlanes(result.data)
        } catch(e) {
            console.log('hubo un error :(')
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchAPI();
        fetchAPIPlanes();
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


    const changeUpdate = (state, id, idClienteMembresia, nombre, monto, idMembresia, fecha_fin) => {
        setConfirmar(state)
        setIdCliente(id)
        setIdClienteMembresia(idClienteMembresia)
        setNombre(nombre)
        setMonto(monto)
        setIdMembresia(idMembresia)
        setFechaFin(fecha_fin)
    }

    const changeUpdateAsignar = (state, id, idClienteMembresia, nombre, monto, idMembresia) => {
        setAsignar(state)
        setIdCliente(id)
        setIdClienteMembresia(idClienteMembresia)
        setNombre(nombre)
        setMonto(monto)
        setIdMembresia(idMembresia)
    }

    const buscar = async (id) => {

        if (id === "") {
            try {
                setLoading(true)
                const result = await axios.get('https://proyectogimnasioback.onrender.com/api/membresias');
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
                const result = await axios.get(`https://proyectogimnasioback.onrender.com/api/membresias/${id}`);
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
            const result = await axios.delete(`https://proyectogimnasioback.onrender.com/api/membresia/${idClente}`);
            if (result.data.message) {
                setMensaje(result.data.message)
                setAlert1(true)
            } else if (result.data.error) {
                setMensaje(result.data.error)
                setAlert1(true)
            }
        } catch(e) {
            console.log('hubo un error :(')
        } finally {
            fetchAPI()
            setLoading(false)
        }
    }

    const agregar = async () => {
        setConfirmar(false)
        actualizar()
        try {
            setLoading(true)
            const result = await axios.post(`https://proyectogimnasioback.onrender.com/api/pagos`,{
                Fecha_Pago: obtenerFechaActual(),
                ID_Membresia: idMembresia,
                ID_Pago: idClente,
                Metodo_Pago: tipoPago,
                Monto: parseFloat(monto)
            });
            if (result.data.message) {
                setMensaje(result.data.message)
                setAlert1(true)
            } else if (result.data.error) {
                setMensaje(result.data.error)
                setAlert1(true)
            }
        } catch(e) {
            console.log('hubo un error :(')
        } finally {
            fetchAPI()
            setLoading(false)
        }
    }

    const agregarMembresia = async (estado, fecha_inicio, fecha_fin, id, id_plan) => {
        setAsignar(false)
        try {
            setLoading(true)
            const result = await axios.post(`https://proyectogimnasioback.onrender.com/api/membresias`,{
                Estado: estado,
                Fecha_Fin: fecha_fin,
                Fecha_Inicio: fecha_inicio,
                ID_Cliente: parseInt(id),
                ID_Membresia: parseInt(id),
                ID_Plan: id_plan === null ? 2 : parseInt(id_plan)
            });
            if (result.data.message) {
                setMensaje(result.data.message)
                setAlert1(true)
            } else if (result.data.error) {
                setMensaje(result.data.error)
                setAlert1(true)
            }
        } catch(e) {
            console.log(e)
        } finally {
            fetchAPI()
            setLoading(false)
        }
    }

    const actualizar = async () => {
        try {
            setLoading(true)
            const result = await axios.put(`https://proyectogimnasioback.onrender.com/api/membresias/${idClente}`,{
                Estado: 'null',
                Fecha_Fin: fechaFin,
                Fecha_Inicio: 'null',
                ID_Cliente: 'null',
                ID_Membresia: 'null',
                ID_Plan: 'null'
            });
            if (result.data.message) {
                setMensaje(result.data.message)
                setAlert1(true)
            } else if (result.data.error) {
                setMensaje(result.data.error)
                setAlert1(true)
            }
        } catch(e) {
            console.log('hubo un error :(')
        } finally {
            fetchAPI()
            setLoading(false)
        }
    }

    const actualizarMembresia = async (estado, fecha_inicio, fecha_fin, id, id_plan) => {
        setAsignar(false)
        try {
            setLoading(true)
            const result = await axios.put(`https://proyectogimnasioback.onrender.com/api/membresias/${id}`,{
                Estado: estado,
                Fecha_Fin: fecha_fin,
                Fecha_Inicio: fecha_inicio,
                ID_Cliente: parseInt(id),
                ID_Membresia: parseInt(id),
                ID_Plan: id_plan === null ? 2 : parseInt(id_plan)
            });
            if (result.data.message) {
                setMensaje(result.data.message)
                setAlert1(true)
            } else if (result.data.error) {
                setMensaje(result.data.error)
                setAlert1(true)
            }
        } catch(e) {
            console.log(e)
        } finally {
            fetchAPI()
            setLoading(false)
        }
    }

    const obtenerFechaActual = () => {
        const hoy = new Date();
        const year = hoy.getFullYear();
        const month = String(hoy.getMonth() + 1).padStart(2, '0'); // Los meses empiezan desde 0
        const day = String(hoy.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    return (

        <>
            <ConfirmationPago confirmar={confirmar} tipoPago={tipoPago} setTipoPago={setTipoPago} changeConfirmation={chageConfirmation} agregar={agregar}/>
            <Asignar
                asignar={asignar}
                setAsignar={setAsignar}
                data={data}
                planes={planes}
                changeUpdate={changeUpdate}
                nombre={nombre}
                id={idClente}
                idClienteMembresia={idClienteMembresia}
                agregar={agregarMembresia}
                actualizar={actualizarMembresia}/>
            <Update modificar={modificar} setModificar={setModificar} actualizar={actualizar} valor1={valor1}
                    valor2={valor2} nombre={nombre}
                    apellido={apellido} handleChange1={handleInputChange1} handleChange2={handleInputChange2}
                    setNombre={setNombre} setApellido={setApellido}
                    setNacimiento={setNacimiento} setCorreo={setCorreo} nacimiento={nacimiento} correo={correo}/>
            <div className="fixed flex pb-0 min-h-28 w-5/12 right-0">
                <Alert alert1={alert1} mensaje={mensaje} change={chageAlert}/>
            </div>


            <div className="flex items-center text-4xl font-semibold text-indigo-700 mb-6">
                <i className="fas fa-id-card mr-3 text-5xl"></i>
                <span>GESTIÓN MEMBRESIAS</span>
            </div>

            <hr className="border-t-2 border-indigo-400 my-4"/>

            <div className={`flex grid grid-cols-4 grid-rows-1 gap-5 pt-25 pb-4 w-full`}>
                <div className="">
                    <input id="busqueda" type="text" placeholder="Buscar por ID"
                           className="ring-2 ring-blue-500 min-w-full min-h-9 px-3 py-2 rounded-md" value={valor}
                           onChange={handleInputChange}></input>
                </div>
                <div className="flex justify-start">
                    <button disabled={loading} type="button" className={`rounded-xl cursor-pointer bg-indigo-400 m-0.5 text-white transition ease-in-out delay-60 hover:-translate-y-1 hover:scale-95 duration-60 min-w-40 min-h-8 ${loading ? 'cursor-wait opacity-50 hover:translate-y-0 hover:scale-100' : 'cursor-pointer'}`}
                            onClick={
                                () => buscar(document.getElementById('busqueda').value)
                            }><i className="fas fa-search"></i> BUSCAR
                    </button>
                </div>
            </div>
            <hr className="my-3"/>
            <div>
                <TablaMembresias data={data} eliminar={eliminar} chageConfirmation={chageConfirmation}
                                 changeUpdate={changeUpdate} changeUpdateAsignar={changeUpdateAsignar} planes={planes}/>
            </div>
        </>
    )

}

export default Membresias