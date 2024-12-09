// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { AuthProvider } from "./context/AuthContext";
import { LifeBuoy, Receipt, Boxes, UserCircle, BarChart3, LayoutDashboard, Settings, PersonStanding, BookText, Handshake, ListCollapse, PanelBottomDashed, AlarmClock } from "lucide-react";
import Sidebar from "./modules/sidebar";
import { SidebarItem } from "./modules/sidebar";
import Clientes from "./modules/clientes";
import Inventario from "./modules/inventario";
import Instructores from "./modules/instructores";
import Plan from "./modules/planes";
import Membresias from "./modules/membresias";
import Login from "./modules/Login";
import Pago from "./modules/pagos";
import Asistencias from "./modules/asistencias";
import Horario from "./modules/horario";
import Clases from "./modules/clases";
import Gastos from "./modules/Gastos";
import Finanzas from "./modules/Finanzas";


function App() {
  const [currentPage, setCurrentPage] = useState('inicio');
  const [loading, setLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const navigateTo = (page) => {
    setCurrentPage(page);
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  const renderPage = () => {
    // Si no está logueado, mostrar página de login
    if (!isLoggedIn) {
      return <Login onLogin={handleLogin} />;
    }

    // Renderizar páginas como antes
    switch(currentPage) {
      case 'clientes':
        return <Clientes loading={loading} setLoading={setLoading}/>;
      case 'inicio':
        return (
          <>
            <h1 className="text-2xl font-semibold">Inicio</h1>
            <p>Este es el inicio de la pagina</p>
          </>
        );
      case 'inventario':
        return <Inventario loading={loading} setLoading={setLoading}/>
      case 'instructores':
        return <Instructores loading={loading} setLoading={setLoading}/>
      case 'planes':
        return <Plan loading={loading} setLoading={setLoading}/>
      case 'membresias':
        return <Membresias loading={loading} setLoading={setLoading}/>
      case 'pagos':
        return <Pago loading={loading} setLoading={setLoading}/>
      case 'asistencias':
        return <Asistencias loading={loading} setLoading={setLoading}/>
      case 'horarios':
        return <Horario loading={loading} setLoading={setLoading}/>
      case 'clases':
        return <Clases loading={loading} setLoading={setLoading}/>
      case "gastos":
        return <Gastos loading={loading} setLoading={setLoading} />;
      case 'finanzas':
        return <Finanzas />;
              
      default:
        return (
          <>
            <h1 className="text-2xl font-semibold">Inicio</h1>
            <p>Este es el inicio de la pagina</p>
          </>
        );
    }
  };

  return (
    <AuthProvider>
      <div className="flex">
        {isLoggedIn && (
          <div>
            <Sidebar>
              <button onClick={() => navigateTo('inicio')}
                      className={`max-h-10 transition ease-in-out delay-60 hover:-translate-y-1 hover:scale-95 duration-60 text-left`}>
                <SidebarItem icon={<LayoutDashboard size={20}/>} text="Inicio"/>
              </button>
              <button onClick={() => navigateTo('clientes')}
                      className={`max-h-10 transition ease-in-out delay-60 hover:-translate-y-1 hover:scale-95 duration-60 text-left`}>
                <SidebarItem icon={<UserCircle size={20}/>} text="Clientes"/>
              </button>
              <button onClick={() => navigateTo('asistencias')}
                      className={`max-h-10 transition ease-in-out delay-60 hover:-translate-y-1 hover:scale-95 duration-60 text-left`}>
                <SidebarItem icon={<ListCollapse size={20}/>} text="Asistencias"/>
              </button>
              <button onClick={() => navigateTo('instructores')}
                      className={`max-h-10 transition ease-in-out delay-60 hover:-translate-y-1 hover:scale-95 duration-60 text-left`}>
                <SidebarItem icon={<PersonStanding size={20}/>} text="Instructores"/>
              </button>
              <button onClick={() => navigateTo('horarios')} className={`max-h-10 transition ease-in-out delay-60 hover:-translate-y-1 hover:scale-95 duration-60 text-left`}>
                <SidebarItem icon={<PanelBottomDashed size={20} />} text="Horario" />
              </button>
              <button onClick={() => navigateTo('clases')} className={`max-h-10 transition ease-in-out delay-60 hover:-translate-y-1 hover:scale-95 duration-60 text-left`}>
                <SidebarItem icon={<AlarmClock size={20} />} text="Clases" />
              </button>
              <button onClick={() => navigateTo('inventario')}
                      className={`max-h-10 transition ease-in-out delay-60 hover:-translate-y-1 hover:scale-95 duration-60 text-left`}>
                <SidebarItem icon={<Boxes size={20}/>} text="Inventario"/>
              </button>
              <button onClick={() => navigateTo('planes')}
                      className={`max-h-10 transition ease-in-out delay-60 hover:-translate-y-1 hover:scale-95 duration-60 text-left`}>
                <SidebarItem icon={<BookText size={20}/>} text="Planes"/>
              </button>
              <button onClick={() => navigateTo('membresias')}
                      className={`max-h-10 transition ease-in-out delay-60 hover:-translate-y-1 hover:scale-95 duration-60 text-left`}>
                <SidebarItem icon={<Handshake size={20}/>} text="Membresias"/>
              </button>
              <button onClick={() => navigateTo('pagos')} className={`max-h-10 transition ease-in-out delay-60 hover:-translate-y-1 hover:scale-95 duration-60 text-left`}>
                <SidebarItem icon={<Receipt size={20} />} text="Pagos" />
              </button>
              <button onClick={() => navigateTo("gastos")}
                 className={`max-h-10 transition ease-in-out delay-60 hover:-translate-y-1 hover:scale-95 duration-60 text-left`}>
                <SidebarItem icon={<Receipt size={20} />} text="Gastos" />
              </button>
              <button onClick={() => navigateTo('finanzas')}
                  className={`max-h-10 transition ease-in-out delay-60 hover:-translate-y-1 hover:scale-95 duration-60 text-left`}>
                <SidebarItem icon={<BarChart3 size={20} />} text="Finanzas" />
              </button> 
          
              <hr className="my-3"/>
              <button
                  onClick={handleLogout}
                  className={`max-h-10 transition ease-in-out delay-60 hover:-translate-y-1 hover:scale-95 duration-60 text-left`}
              >
                <SidebarItem icon={<Settings size={20}/>} text="Cerrar Sesión"/>
              </button>
              <button
                  className={`max-h-10 transition ease-in-out delay-60 hover:-translate-y-1 hover:scale-95 duration-60 text-left`}>
                <SidebarItem icon={<LifeBuoy size={20}/>} text="Help"/>
              </button>
              
            </Sidebar>
          </div>
        )}
        <div className={`flex-1 p-8 ${loading ? 'cursor-wait' : ''} overflow-y-auto max-h-screen`}>
          {renderPage()}
        </div>
      </div>
    </AuthProvider>
  );
}

export default App;