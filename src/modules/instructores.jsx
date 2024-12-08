import axios from "axios";
import { useEffect, useState } from "react"
import TablaInstructores from "./components/tabla_instructores";
import Alert from "./components/alert";
import NuevoInstructor from "./components/nuevo_instructor";
import Confirmation from "./components/confirmacion";
import ActualizarInstructor from "./components/actualizar_instructor";


function Instructores({loading, setLoading}) {
    const [data, setData] = useState(null);
    const [valor, setValor] = useState('');
    const [valor1, setValor1] = useState('');
    const [valor2, setValor2] = useState('');
    const [alert1, setAlert1] = useState(false)
    const [mensaje, setMensaje] = useState("");
    const [confirmar, setConfirmar] = useState(false);
    const [nuevo, setNuevo] =  useState(false);
    const [modificar, setModificar] = useState(false);
    const [idInstructor, setIdInstructor] = useState("");
    const [correo, setCorreo] = useState("");
    const [especialidad, setEspecialidad] = useState("");
    const [nombre, setNombre] = useState("");
    const [apellido, setApellido] = useState("");

    const fetchAPI = async () => {
        try {
            setLoading(true)
            const result = await axios.get('http://localhost:5001/api/instructores');
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
        setIdInstructor(id)
        setConfirmar(state)
    }

    const changeNuevo = (state) => {
        setNuevo(state)
    }

    const changeUpdate = (state, nombre, apellido, especialidad, documento, correo, telefono) => {
        setModificar(state)
        setNombre(nombre)
        setApellido(apellido)
        setEspecialidad(especialidad)
        setValor1(documento)
        setValor2(telefono)
        setCorreo(correo)
    }

    const buscar = async (id) => {

        if (id === "") {
            try {
                setLoading(true)
                const result = await axios.get('http://localhost:5001/api/instructores');
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
                const result = await axios.get(`http://localhost:5001/api/instructores/${id}`);
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
        console.log(idInstructor)
        try {
            setLoading(true)
            const result = await axios.delete(`http://localhost:5001/api/instructores/${idInstructor}`);
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

    const agregar = async (nombre, apellido, especialidad, documento, correo, telefono) => {
        setNuevo(false)
        try {
            setLoading(true)
            const result = await axios.post(`http://localhost:5001/api/instructores`,{
                Apellido: apellido,
                Email: correo,
                Especialidad: especialidad,
                ID_Instructor: parseInt(documento),
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
    }

    const actualizar = async (nombre, apellido, especialidad, documento, correo, telefono) => {
        setModificar(false)
        try {
            setLoading(true)
            const result = await axios.put(`http://localhost:5001/api/instructores/${documento}`, {
                Apellido: apellido,
                Email: correo,
                Especialidad: especialidad,
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
    }

    return (

        <>
            <Confirmation confirmar={confirmar} changeConfirmation={chageConfirmation} eliminar={eliminar}/>
            <NuevoInstructor
                agregar={agregar}
                nuevo={nuevo}
                changeNuevo={changeNuevo}
                handleChange1={handleInputChange1}
                handleChange2={handleInputChange2}
                valor1={valor1}
                valor2={valor2}/>
            <ActualizarInstructor
                modificar={modificar}
                setModificar={setModificar}
                actualizar={actualizar}
                valor1={valor1} valor2={valor2}
                nombre={nombre}
                apellido={apellido}
                handleChange1={handleInputChange1}
                handleChange2={handleInputChange2}
                setNombre={setNombre}
                setApellido={setApellido}
                setEspecialidad={setEspecialidad}
                setCorreo={setCorreo}
                especialidad={especialidad}
                correo={correo}/>
            <div className="fixed flex pb-0 min-h-28 w-5/12 right-0">
                <Alert alert1={alert1} mensaje={mensaje} change={chageAlert}/>
            </div>

            <div className="flex items-center text-4xl font-semibold text-indigo-700 mb-6">
                <i className="fas fa-chalkboard-teacher mr-3 text-5xl"></i>
                <span>GESTIÓN INSTRUCTORES</span>
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
                <div className="flex justify-end col-end-5">
                    <button onClick={() => changeNuevo(true)} type="button"
                            className="bg-green-500 hover:bg-green-700 text-white py-2 px-4 rounded-md shadow-sm transition duration-200 ease-in-out m-1">
                        <i className="fas fa-plus"></i> NUEVO
                    </button>
                </div>
            </div>
            <hr className="my-3"/>
            <div>
                <TablaInstructores data={data} eliminar={eliminar} chageConfirmation={chageConfirmation}
                                   changeUpdate={changeUpdate}/>
            </div>
        </>
    )

}

export default Instructores