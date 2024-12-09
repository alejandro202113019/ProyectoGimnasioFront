import axios from "axios";
import { useEffect, useState } from "react";
import TablaPlan from "./components/tabla_asistencias.jsx";
import Alert from "./components/alert";
import Confirmation from "./components/confirmacion";
import ConfirmationSalida from "./components/confirmacionSalida.jsx";
import ConfirmationEntrada from "./components/confirmacionEntrada.jsx";

function Asistencias() {
  const [data, setData] = useState(null);
  const [alert1, setAlert1] = useState(false);
  const [mensaje, setMensaje] = useState("");
  const [confirmar, setConfirmar] = useState(false);
  const [confirmarSalida, setConfirmarSalida] = useState(false);
  const [idAsistencia, setIdAsistencia] = useState("");
  const [clientes, setClientes] = useState(null);
  const [entradas, setEntradas] = useState(false);
  const [membresia, setMembresia] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchAPI = async () => {
    try {
      setLoading(true);
      const result = await axios.get("http://localhost:5001/api/asistencias");
      setData(result.data);
    } catch (e) {
      console.error("Error al cargar asistencias");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAPI();
  }, []);

  const chageAlert = () => {
    setAlert1(false);
  };

  const chageConfirmation = (state, id) => {
    setIdAsistencia(id);
    setConfirmar(state);
  };

  const changeConfirmationSalida = (state, id) => {
    setIdAsistencia(id);
    setConfirmarSalida(state);
  };

  const changeEntrada = (entrada, clientes) => {
    setClientes(clientes);
    setEntradas(entrada);
  };

  const changeUpdate = (idAsistencia) => {
    setIdAsistencia(idAsistencia);
  };

  const buscar = async (id) => {
    try {
      setLoading(true);
      const result = id
        ? await axios.get(`http://localhost:5001/api/asistencias/${id}`)
        : await axios.get("http://localhost:5001/api/asistencias");
      setData(result.data);
      setAlert1(false);
    } catch (e) {
      console.error("Error al realizar búsqueda");
      setMensaje("Error al buscar asistencias");
      setAlert1(true);
    } finally {
      setLoading(false);
    }
  };

  const eliminar = async () => {
    try {
      setLoading(true);
      const result = await axios.delete(
        `http://localhost:5001/api/asistencias/${idAsistencia}`
      );
      setMensaje(result.data.message || result.data.error);
      setAlert1(true);
      fetchAPI();
    } catch (e) {
      console.error("Error al eliminar asistencia");
    } finally {
      setLoading(false);
      setConfirmar(false);
    }
  };

  const agregar = async () => {
    try {
      setLoading(true);
      const result = await axios.get(
        `http://localhost:5001/api/membresias/${clientes.ID_Cliente}`
      );
      if (result.data.error) {
        setMensaje(result.data.error);
        setAlert1(true);
      } else {
        setMembresia(result.data);
        if (result.data.Estado === "Inactiva") {
          setMensaje(`El cliente ${clientes.Nombre} ${clientes.Apellido} tiene la membresía vencida`);
          setAlert1(true);
        } else if (!result.data.Estado) {
          setMensaje(`El cliente ${clientes.Nombre} ${clientes.Apellido} no tiene una membresía asignada`);
          setAlert1(true);
        } else if (result.data.Estado === "Activa") {
          const postResult = await axios.post("http://localhost:5001/api/asistencias", {
            ID_Cliente: clientes.ID_Cliente,
            FechaAsistencia: obtenerFechaActual(),
            Hora_Entrada: obtenerHoraActual(),
            Hora_Salida: "-",
          });
          setMensaje(postResult.data.message || postResult.data.error);
          setAlert1(true);
          fetchAPI();
        }
      }
    } catch (e) {
      console.error("Error al agregar asistencia");
    } finally {
      setLoading(false);
      setEntradas(false);
    }
  };

  const obtenerFechaActual = () => {
    const hoy = new Date();
    const year = hoy.getFullYear();
    const month = String(hoy.getMonth() + 1).padStart(2, "0");
    const day = String(hoy.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const obtenerHoraActual = () => {
    const ahora = new Date();
    return ahora.toLocaleTimeString("en-GB", { hour12: false });
  };

  const actualizar = async () => {
    try {
      setLoading(true);
      const result = await axios.put(
        `http://localhost:5001/api/asistencias/${idAsistencia}`,
        {
          FechaAsistencia: obtenerFechaActual(),
          Hora_Entrada: "",
          Hora_Salida: obtenerHoraActual(),
          ID_Asistencia: idAsistencia,
          ID_Cliente: "",
        }
      );
      setMensaje(result.data.message || result.data.error);
      setAlert1(true);
      fetchAPI();
    } catch (e) {
      console.error("Error al actualizar asistencia");
    } finally {
      setLoading(false);
      setConfirmarSalida(false);
    }
  };

  const buscarCliente = async (id) => {
    try {
      setLoading(true);
      const result = await axios.get(`http://localhost:5001/api/clientes/${id}`);
      if (result.data.error) {
        setMensaje(result.data.error);
        setAlert1(true);
      } else {
        setClientes(result.data);
        setEntradas(true);
        setAlert1(false);
      }
    } catch (e) {
      console.error("Error al buscar cliente");
    } finally {
      setLoading(false);
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
      <ConfirmationSalida confirmarSalida={confirmarSalida} changeConfirmation={changeConfirmationSalida} eliminar={actualizar} />
      <ConfirmationEntrada confirmarEntrada={entradas} changeConfirmation={changeEntrada} clientes={clientes} agregar={agregar} />
      <div className="fixed flex pb-0 min-h-28 w-5/12 right-0">
        <Alert alert1={alert1} mensaje={mensaje} change={chageAlert} />
      </div>
      <div className="flex items-center text-4xl font-semibold text-indigo-700 mb-6">
        <i className="fas fa-list-alt mr-3 text-5xl"></i>
        <span>GESTIÓN ASISTENCIAS</span>
      </div>
      <hr className="border-t-2 border-indigo-400 my-4" />
      <div className="flex grid grid-cols-4 gap-5 pb-4">
        <div>
          <input id="busqueda" type="text" placeholder="Buscar por ID" className="ring-2 ring-blue-500 w-full h-10 px-3 py-2 rounded-md" />
        </div>
        <div className="flex space-x-3">
          <button onClick={() => buscar(document.getElementById("busqueda").value)} className={`rounded-md bg-indigo-400 text-white h-10 px-4 shadow-sm ${loading ? "cursor-wait opacity-50" : "hover:scale-95"}`}>
            <i className="fas fa-search"></i> BUSCAR
          </button>
          <button onClick={() => buscarCliente(document.getElementById("busqueda").value)} className={`rounded-md bg-green-500 text-white h-10 px-4 shadow-sm ${loading ? "cursor-wait opacity-50" : "hover:scale-95"}`}>
            <i className="fas fa-search"></i> ENTRADA
          </button>
        </div>
      </div>
      <TablaPlan data={data} eliminar={eliminar} chageConfirmation={chageConfirmation} changeUpdate={changeUpdate} changeConfirmationSalida={changeConfirmationSalida} />
    </>
  );
}

export default Asistencias;
