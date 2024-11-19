import axios from "axios";
import { useEffect, useState } from "react"
import TablaMembresias from "./components/tabla_membresias";
import Alert from "./components/alert";
import Confirmation from "./components/confirmacion";
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

    const fetchAPI = async () => {
        try {
            setLoading(true)
            const result = await axios.get('http://localhost:5001/api/membresias');
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
            const result = await axios.get('http://localhost:5001/api/planes');
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

    const changeNuevo = (state) => {
        setNuevo(state)
    }

    const changeUpdate = (state, id, idClienteMembresia, nombre) => {
        setAsignar(state)
        setIdCliente(id)
        setIdClienteMembresia(idClienteMembresia)
        setNombre(nombre)
    }

    const buscar = async (id) => {

        if (id === "") {
            try {
                setLoading(true)
                const result = await axios.get('http://localhost:5001/api/membresias');
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
                const result = await axios.get(`http://localhost:5001/api/membresias/${id}`);
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
            const result = await axios.delete(`http://localhost:5001/api/membresia/${idClente}`);
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

    const agregar = async (estado, fecha_inicio, fecha_fin, id, id_plan) => {
        try {
            setLoading(true)
            const result = await axios.post(`http://localhost:5001/api/membresias`,{
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
        setAsignar(false)
    }

    const actualizar = async (estado, fecha_inicio, fecha_fin, id, id_plan) => {
        try {
            setLoading(true)
            const result = await axios.put(`http://localhost:5001/api/membresias/${id}`,{
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
        setAsignar(false)
    }

    return (
        
        <>  
            <Confirmation confirmar={confirmar} changeConfirmation={chageConfirmation} eliminar={eliminar}/>
            <Asignar 
                asignar={asignar} 
                data={data} 
                planes={planes} 
                changeUpdate={changeUpdate} 
                nombre={nombre} 
                id={idClente}
                idClienteMembresia={idClienteMembresia} 
                agregar={agregar}
                actualizar={actualizar}/>
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
            </div>
            <hr className="my-3" />
            <div>
                <TablaMembresias data={data} eliminar={eliminar} chageConfirmation={chageConfirmation} changeUpdate={changeUpdate}/>
            </div>
        </>
    )

}

export default Membresias