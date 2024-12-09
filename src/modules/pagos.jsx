import axios from "axios";
import { useEffect, useState } from "react";
import TablaPagos from "./components/tabla_pagos";
import Alert from "./components/alert";
import Confirmation from "./components/confirmacion";
import NuevoEquipo from "./components/nuevo_equipo";
import ActualizarEquipo from "./components/actualizar_equipo";

function Pago() {
  const [data, setData] = useState(null);
  const [alert1, setAlert1] = useState(false);
  const [mensaje, setMensaje] = useState("");
  const [confirmar, setConfirmar] = useState(false);
  const [nuevo, setNuevo] = useState(false);
  const [modificar, setModificar] = useState(false);
  const [idEquipo, setIdEquipo] = useState("");
  const [nombre, setNombre] = useState("");
  const [estado, setEstado] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchAPI = async () => {
    try {
      setLoading(true);
      const result = await axios.get("http://localhost:5001/api/pagos");
      setData(result.data);
    } catch (e) {
      console.error("Hubo un error :(");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAPI();
  }, []);

  const handleInputChange = (event) => {
    const nuevoValor = event.target.value.replace(/[^0-9]/g, ""); // Permitir solo números
    setIdEquipo(nuevoValor);
  };

  const chageAlert = () => {
    setAlert1(false);
  };

  const chageConfirmation = (state, id) => {
    setIdEquipo(id);
    setConfirmar(state);
  };

  const changeNuevo = (state) => {
    setNuevo(state);
  };

  const changeUpdate = (modificar, id, nombre, estado) => {
    setModificar(modificar);
    setIdEquipo(id);
    setNombre(nombre);
    setEstado(estado);
  };

  const buscar = async (id) => {
    try {
      setLoading(true);
      const result = id
        ? await axios.get(`http://localhost:5001/api/pagos/${id}`)
        : await axios.get("http://localhost:5001/api/pagos");
      setData(result.data);
      if (result.data.error) {
        setAlert1(true);
        setMensaje(result.data.error);
      } else {
        setAlert1(false);
      }
    } catch (e) {
      console.error("Hubo un error :(");
    } finally {
      setLoading(false);
    }
  };

  const eliminar = async () => {
    try {
      setLoading(true);
      const result = await axios.delete(
        `http://localhost:5001/api/equipos/${idEquipo}`
      );
      setMensaje(result.data.message || result.data.error);
      setAlert1(true);
      fetchAPI();
    } catch (e) {
      console.error("Hubo un error :(");
    } finally {
      setLoading(false);
      setConfirmar(false);
    }
  };

  const agregar = async (nombre, estado) => {
    try {
      setLoading(true);
      const result = await axios.post(`http://localhost:5001/api/equipos`, {
        Nombre_Equipo: nombre,
        Estado: estado,
      });
      setMensaje(result.data.message || result.data.error);
      setAlert1(true);
      fetchAPI();
    } catch (e) {
      console.error("Hubo un error :(");
    } finally {
      setLoading(false);
      setNuevo(false);
    }
  };

  const actualizar = async (id, nombre, estado) => {
    try {
      setLoading(true);
      const result = await axios.put(
        `http://localhost:5001/api/equipos/${id}`,
        {
          Nombre_Equipo: nombre,
          Estado: estado,
        }
      );
      setMensaje(result.data.message || result.data.error);
      setAlert1(true);
      fetchAPI();
    } catch (e) {
      console.error("Hubo un error :(");
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
      <NuevoEquipo agregar={agregar} nuevo={nuevo} changeNuevo={changeNuevo} handleChange={handleInputChange} id={idEquipo} />
      <ActualizarEquipo
        setModificar={setModificar}
        modificar={modificar}
        id={idEquipo}
        nombre={nombre}
        setNombre={setNombre}
        estado={estado}
        setEstado={setEstado}
        actualizar={actualizar}
      />
      <div className="fixed flex pb-0 min-h-28 w-5/12 right-0">
        <Alert alert1={alert1} mensaje={mensaje} change={chageAlert} />
      </div>
      <div className="flex items-center text-4xl font-semibold text-indigo-700 mb-6">
        <i className="fas fa-warehouse mr-3 text-5xl"></i>
        <span>REGISTRO PAGOS</span>
      </div>
      <hr className="border-t-2 border-indigo-400 my-4" />
      <div className={`flex grid grid-cols-4 grid-rows-1 gap-5 pt-25 pb-4 w-full`}>
        <div>
          <input
            id="busqueda"
            type="text"
            placeholder="Buscar por ID"
            className="ring-2 ring-blue-500 min-w-full min-h-9 px-3 py-2 rounded-md"
            onChange={handleInputChange}
          />
        </div>
        <div className="flex justify-start">
          <button
            disabled={loading}
            type="button"
            className={`rounded-xl bg-indigo-400 text-white transition min-w-40 min-h-8 ${loading ? "cursor-wait opacity-50" : "hover:scale-95"}`}
            onClick={() => buscar(document.getElementById("busqueda").value)}
          >
            <i className="fas fa-search"></i> BUSCAR
          </button>
        </div>
      </div>
      <div>
        <TablaPagos data={data} eliminar={eliminar} chageConfirmation={chageConfirmation} changeUpdate={changeUpdate} />
      </div>
    </>
  );
}

export default Pago;
