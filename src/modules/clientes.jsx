import axios from "axios";
import { useEffect, useState } from "react";
import TablaClientes from "./components/tabla_clientes";
import Alert from "./components/alert";
import Confirmation from "./components/confirmacion";
import New from "./components/nuevo_cliente";
import Update from "./components/actualizar_cliente";

function Clientes() {
  const [clientes, setClientes] = useState(null);
  const [valor, setValor] = useState("");
  const [valor1, setValor1] = useState("");
  const [valor2, setValor2] = useState("");
  const [alert1, setAlert1] = useState(false);
  const [mensaje, setMensaje] = useState("");
  const [confirmar, setConfirmar] = useState(false);
  const [nuevo, setNuevo] = useState(false);
  const [modificar, setModificar] = useState(false);
  const [idCliente, setIdCliente] = useState("");
  const [correo, setCorreo] = useState("");
  const [nacimiento, setNacimiento] = useState("");
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchAPI = async () => {
    try {
      setLoading(true);
      const result = await axios.get("https://proyectogimnasioback.onrender.com/api/clientes");
      setClientes(result.data);
    } catch (e) {
      console.error("Hubo un error al cargar los datos.");
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
    setIdCliente(id);
    setConfirmar(state);
  };

  const changeNuevo = (state) => {
    setNuevo(state);
  };

  const changeUpdate = (state, nombre, apellido, nacimiento, documento, correo, telefono) => {
    setModificar(state);
    setNombre(nombre);
    setApellido(apellido);
    setNacimiento(nacimiento);
    setValor1(documento);
    setValor2(telefono);
    setCorreo(correo);
  };

  const buscar = async (id) => {
    try {
      setLoading(true);
      const result = id
        ? await axios.get(`https://proyectogimnasioback.onrender.com/api/clientes/${id}`)
        : await axios.get("https://proyectogimnasioback.onrender.com/api/clientes");
      setClientes(result.data);
      setAlert1(false);
    } catch (e) {
      console.error("Hubo un error en la búsqueda.");
      setAlert1(true);
      setMensaje("Error al buscar cliente.");
    } finally {
      setLoading(false);
    }
  };

  const eliminar = async () => {
    try {
      setLoading(true);
      const result = await axios.delete(`https://proyectogimnasioback.onrender.com/api/clientes/${idCliente}`);
      setMensaje(result.data.message || result.data.error);
      setAlert1(true);
      fetchAPI();
    } catch (e) {
      console.error("Error al eliminar cliente.");
    } finally {
      setLoading(false);
      setConfirmar(false);
    }
  };

  const agregar = async (nombre, apellido, nacimiento, documento, correo, telefono) => {
    try {
      setLoading(true);
      const result = await axios.post(`https://proyectogimnasioback.onrender.com/api/clientes`, {
        Apellido: apellido,
        Email: correo,
        Fecha_Nacimiento: nacimiento,
        ID_Cliente: parseInt(documento),
        Nombre: nombre,
        Telefono: telefono,
      });
      setMensaje(result.data.message || result.data.error);
      setAlert1(true);
      fetchAPI();
    } catch (e) {
      console.error("Error al agregar cliente.");
    } finally {
      setLoading(false);
      setNuevo(false);
    }
  };

  const actualizar = async (nombre, apellido, nacimiento, documento, correo, telefono) => {
    try {
      setLoading(true);
      const result = await axios.put(`https://proyectogimnasioback.onrender.com/api/clientes/${documento}`, {
        Apellido: apellido,
        Email: correo,
        Fecha_Nacimiento: nacimiento,
        Nombre: nombre,
        Telefono: telefono,
      });
      setMensaje(result.data.message || result.data.error);
      setAlert1(true);
      fetchAPI();
    } catch (e) {
      console.error("Error al actualizar cliente.");
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
      <New agregar={agregar} nuevo={nuevo} changeNuevo={changeNuevo} handleChange1={handleInputChange1} handleChange2={handleInputChange2} valor1={valor1} valor2={valor2} />
      <Update modificar={modificar} setModificar={setModificar} actualizar={actualizar} valor1={valor1} valor2={valor2} nombre={nombre} apellido={apellido} handleChange1={handleInputChange1} handleChange2={handleInputChange2} setNombre={setNombre} setApellido={setApellido} setNacimiento={setNacimiento} setCorreo={setCorreo} nacimiento={nacimiento} correo={correo} />
      <div className="fixed flex pb-0 min-h-28 w-5/12 right-0">
        <Alert alert1={alert1} mensaje={mensaje} change={chageAlert} />
      </div>
      <div className="flex items-center text-4xl font-semibold text-indigo-700 mb-6">
        <i className="fas fa-user-alt mr-3 text-5xl"></i>
        <span>GESTIÓN CLIENTES</span>
      </div>
      <hr className="border-t-2 border-indigo-400 my-4" />
      <div className="flex grid grid-cols-4 grid-rows-1 gap-5 pt-25 pb-4 w-full">
        <div>
          <input id="busqueda" type="text" placeholder="Buscar por ID" className="ring-2 ring-blue-500 min-w-full min-h-9 px-3 py-2 rounded-md" value={valor} onChange={handleInputChange} />
        </div>
        <div className="flex justify-start">
          <button disabled={loading} type="button" className={`rounded-xl bg-indigo-400 text-white transition min-w-40 min-h-8 ${loading ? "cursor-wait opacity-50" : "hover:scale-95"}`} onClick={() => buscar(document.getElementById("busqueda").value)}>
            <i className="fas fa-search"></i> BUSCAR
          </button>
        </div>
        <div className="flex justify-end col-end-5">
          <button onClick={() => changeNuevo(true)} type="button" className="bg-green-500 hover:bg-green-700 text-white py-2 px-4 rounded-md shadow-sm transition duration-200 ease-in-out m-1">
            <i className="fas fa-plus"></i> NUEVO
          </button>
        </div>
      </div>
      <hr className="my-3" />
      <div>
        <TablaClientes clientes={clientes} eliminar={eliminar} chageConfirmation={chageConfirmation} changeUpdate={changeUpdate} />
      </div>
    </>
  );
}

export default Clientes;
