import axios from "axios";
import { useEffect, useState } from "react";
import TablaInstructores from "./components/tabla_instructores";
import Alert from "./components/alert";
import NuevoInstructor from "./components/nuevo_instructor";
import Confirmation from "./components/confirmacion";
import ActualizarInstructor from "./components/actualizar_instructor";

function Instructores() {
  const [data, setData] = useState(null);
  const [valor, setValor] = useState("");
  const [valor1, setValor1] = useState("");
  const [valor2, setValor2] = useState("");
  const [alert1, setAlert1] = useState(false);
  const [mensaje, setMensaje] = useState("");
  const [confirmar, setConfirmar] = useState(false);
  const [nuevo, setNuevo] = useState(false);
  const [modificar, setModificar] = useState(false);
  const [idInstructor, setIdInstructor] = useState("");
  const [correo, setCorreo] = useState("");
  const [especialidad, setEspecialidad] = useState("");
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchAPI = async () => {
    try {
      setLoading(true);
      const result = await axios.get("http://localhost:5001/api/instructores");
      setData(result.data);
    } catch (e) {
      console.error("Error al cargar instructores");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAPI();
  }, []);

  const handleInputChange = (event) => {
    const nuevoValor = event.target.value.replace(/[^0-9]/g, ""); // Solo números
    setValor(nuevoValor);
  };

  const handleInputChange1 = (event) => {
    const nuevoValor = event.target.value.replace(/[^0-9]/g, "");
    setValor1(nuevoValor);
  };

  const handleInputChange2 = (event) => {
    const nuevoValor = event.target.value.replace(/[^0-9]/g, "");
    setValor2(nuevoValor);
  };

  const chageAlert = () => {
    setAlert1(false);
  };

  const chageConfirmation = (state, id) => {
    setIdInstructor(id);
    setConfirmar(state);
  };

  const changeNuevo = (state) => {
    setNuevo(state);
  };

  const changeUpdate = (state, nombre, apellido, especialidad, documento, correo, telefono) => {
    setModificar(state);
    setNombre(nombre);
    setApellido(apellido);
    setEspecialidad(especialidad);
    setValor1(documento);
    setValor2(telefono);
    setCorreo(correo);
  };

  const buscar = async (id) => {
    try {
      setLoading(true);
      const result = id
        ? await axios.get(`http://localhost:5001/api/instructores/${id}`)
        : await axios.get("http://localhost:5001/api/instructores");
      setData(result.data);
      setAlert1(false);
    } catch (e) {
      console.error("Error al realizar búsqueda");
      setMensaje("Error al buscar instructores");
      setAlert1(true);
    } finally {
      setLoading(false);
    }
  };

  const eliminar = async () => {
    try {
      setLoading(true);
      const result = await axios.delete(
        `http://localhost:5001/api/instructores/${idInstructor}`
      );
      setMensaje(result.data.message || result.data.error);
      setAlert1(true);
      fetchAPI();
    } catch (e) {
      console.error("Error al eliminar instructor");
    } finally {
      setLoading(false);
      setConfirmar(false);
    }
  };

  const agregar = async (nombre, apellido, especialidad, documento, correo, telefono) => {
    try {
      setLoading(true);
      const result = await axios.post(`http://localhost:5001/api/instructores`, {
        Apellido: apellido,
        Email: correo,
        Especialidad: especialidad,
        ID_Instructor: parseInt(documento),
        Nombre: nombre,
        Telefono: telefono,
      });
      setMensaje(result.data.message || result.data.error);
      setAlert1(true);
      fetchAPI();
    } catch (e) {
      console.error("Error al agregar instructor");
    } finally {
      setLoading(false);
      setNuevo(false);
    }
  };

  const actualizar = async (nombre, apellido, especialidad, documento, correo, telefono) => {
    try {
      setLoading(true);
      const result = await axios.put(`http://localhost:5001/api/instructores/${documento}`, {
        Apellido: apellido,
        Email: correo,
        Especialidad: especialidad,
        Nombre: nombre,
        Telefono: telefono,
      });
      setMensaje(result.data.message || result.data.error);
      setAlert1(true);
      fetchAPI();
    } catch (e) {
      console.error("Error al actualizar instructor");
    } finally {
      setLoading(false);
      setModificar(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <>
      <Confirmation confirmar={confirmar} changeConfirmation={chageConfirmation} eliminar={eliminar} />
      <NuevoInstructor
        agregar={agregar}
        nuevo={nuevo}
        changeNuevo={changeNuevo}
        handleChange1={handleInputChange1}
        handleChange2={handleInputChange2}
        valor1={valor1}
        valor2={valor2}
      />
      <ActualizarInstructor
        modificar={modificar}
        setModificar={setModificar}
        actualizar={actualizar}
        valor1={valor1}
        valor2={valor2}
        nombre={nombre}
        apellido={apellido}
        handleChange1={handleInputChange1}
        handleChange2={handleInputChange2}
        setNombre={setNombre}
        setApellido={setApellido}
        setEspecialidad={setEspecialidad}
        setCorreo={setCorreo}
        especialidad={especialidad}
        correo={correo}
      />
      <div className="fixed flex pb-0 min-h-28 w-5/12 right-0">
        <Alert alert1={alert1} mensaje={mensaje} change={chageAlert} />
      </div>
      <div className="flex items-center text-4xl font-semibold text-indigo-700 mb-6">
        <i className="fas fa-chalkboard-teacher mr-3 text-5xl"></i>
        <span>GESTIÓN INSTRUCTORES</span>
      </div>
      <hr className="border-t-2 border-indigo-400 my-4" />
      <div className="flex grid grid-cols-4 gap-5 pb-4">
        <div>
          <input
            id="busqueda"
            type="text"
            placeholder="Buscar por ID"
            className="ring-2 ring-blue-500 w-full h-10 px-3 py-2 rounded-md"
            value={valor}
            onChange={handleInputChange}
          />
        </div>
        <div className="flex justify-start">
          <button
            onClick={() => buscar(document.getElementById("busqueda").value)}
            className={`rounded-md bg-indigo-400 text-white h-10 px-4 shadow-sm ${loading ? "cursor-wait opacity-50" : "hover:scale-95"}`}
          >
            <i className="fas fa-search"></i> BUSCAR
          </button>
        </div>
        <div className="flex justify-end col-end-5">
          <button
            onClick={() => changeNuevo(true)}
            className="bg-green-500 hover:bg-green-700 text-white py-2 px-4 rounded-md shadow-sm transition duration-200 ease-in-out m-1"
          >
            <i className="fas fa-plus"></i> NUEVO
          </button>
        </div>
      </div>
      <hr className="my-3" />
      <TablaInstructores
        data={data}
        eliminar={eliminar}
        chageConfirmation={chageConfirmation}
        changeUpdate={changeUpdate}
      />
    </>
  );
}

export default Instructores;
