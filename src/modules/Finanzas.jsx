import React, { useState, useEffect } from "react";
import axios from "axios";
import { Bar, Pie } from "react-chartjs-2";
import 'chart.js/auto';
import { saveAs } from "file-saver";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import "jspdf-autotable";

const Finanzas = () => {
  const [ingresosTotales, setIngresosTotales] = useState(0);
  const [gastosTotales, setGastosTotales] = useState(0);
  const [balance, setBalance] = useState(0);
  const [gastosPorMes, setGastosPorMes] = useState([]);
  const [resumenMensual, setResumenMensual] = useState([]);
  const [topGastos, setTopGastos] = useState([]);
  const [porcentajeGastos, setPorcentajeGastos] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [
        ingresosRes,
        gastosRes,
        balanceRes,
        gastosPorMesRes,
        resumenMensualRes,
        topGastosRes,
        porcentajeRes,
      ] = await Promise.all([
        axios.get("https://proyectogimnasioback.onrender.com/api/ingresos"),
        axios.get("https://proyectogimnasioback.onrender.com/api/gastosTotales"),
        axios.get("https://proyectogimnasioback.onrender.com/api/balance"),
        axios.get("https://proyectogimnasioback.onrender.com/api/gastosTotales/mes"),
        axios.get("https://proyectogimnasioback.onrender.com/api/resumen-mensual"),
        axios.get("https://proyectogimnasioback.onrender.com/api/top-gastos?limite=5"),
        axios.get("https://proyectogimnasioback.onrender.com/api/porcentaje-gastos"),
      ]);

      // Transformar datos de gastos por mes para Chart.js
      const gastosPorMesData = Object.entries(gastosPorMesRes.data).map(([mes, total]) => ({
        mes,
        total
      }));

      setIngresosTotales(ingresosRes.data.ingresos_totales);
      setGastosTotales(gastosRes.data.gastos_totales);
      setBalance(balanceRes.data.balance);
      setGastosPorMes(gastosPorMesData);
      setResumenMensual(resumenMensualRes.data);
      setTopGastos(topGastosRes.data);
      setPorcentajeGastos(porcentajeRes.data.porcentaje_gastos_vs_ingresos);
    } catch (error) {
      console.error("Error al obtener datos financieros:", error);
      setError("No se pudieron cargar los datos financieros. Por favor, intente nuevamente.");
    } finally {
      setLoading(false);
    }
  };

  const exportToExcel = () => {
    const data = [...resumenMensual, ...topGastos];
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Finanzas");
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(blob, "finanzas.xlsx");
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.text("Reporte de Finanzas", 20, 10);
    doc.autoTable({
      head: [["Mes", "Ingresos", "Gastos", "Balance"]],
      body: resumenMensual.map((item) => [
        item.mes,
        item.ingresos,
        item.gastos,
        item.balance,
      ]),
    });
    doc.save("finanzas.pdf");
  };

  // Componente de carga
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // Componente de error
  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Error: </strong>
          <span className="block sm:inline">{error}</span>
          <button 
            onClick={fetchData} 
            className="ml-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Finanzas</h1>
      <div className="mb-6">
        <h2 className="text-lg font-semibold">Resumen Financiero</h2>
        <p>Ingresos Totales: ${ingresosTotales}</p>
        <p>Gastos Totales: ${gastosTotales}</p>
        <p>Balance: ${balance}</p>
        <p>Porcentaje Gastos vs Ingresos: {porcentajeGastos}%</p>
      </div>

      <div className="flex space-x-4 mb-6">
        <button
          onClick={exportToExcel}
          className="p-2 bg-blue-500 text-white rounded-lg"
        >
          Exportar a Excel
        </button>
        <button
          onClick={exportToPDF}
          className="p-2 bg-green-500 text-white rounded-lg"
        >
          Exportar a PDF
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Gráfica de Gastos por Mes */}
        <div className="bg-white shadow rounded-lg p-4">
          <h2 className="text-lg font-semibold mb-2">Gastos por Mes</h2>
          <Bar
            data={{
              labels: gastosPorMes.map((item) => item.mes),
              datasets: [
                {
                  label: "Gastos",
                  data: gastosPorMes.map((item) => item.total),
                  backgroundColor: "rgba(255, 99, 132, 0.6)",
                },
              ],
            }}
          />
        </div>

        {/* Gráfica de Comparación */}
        <div className="bg-white shadow rounded-lg p-4">
          <h2 className="text-lg font-semibold mb-2">Ingresos vs Gastos</h2>
          <Pie
            data={{
              labels: ["Ingresos", "Gastos"],
              datasets: [
                {
                  data: [ingresosTotales, gastosTotales],
                  backgroundColor: ["rgba(54, 162, 235, 0.6)", "rgba(255, 99, 132, 0.6)"],
                },
              ],
            }}
          />
        </div>

{/* Top Gastos */}
<div className="bg-white shadow rounded-lg p-4">
  <h2 className="text-lg font-semibold mb-2">Top Gastos</h2>
  <table className="min-w-full bg-white">
    <thead>
      <tr>
        <th className="py-2 px-4 border-b">Descripción</th>
        <th className="py-2 px-4 border-b">Monto</th>
      </tr>
    </thead>
    <tbody>
      {topGastos.map((gasto, index) => (
        <tr key={index}>
          <td className="py-2 px-4 border-b">
            {gasto.Descripcion || gasto.descripcion || 'Sin descripción'}
          </td>
          <td className="py-2 px-4 border-b">
            ${gasto.Monto || gasto.monto || 0}
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>
      </div>
    </div>
  );
};

export default Finanzas;