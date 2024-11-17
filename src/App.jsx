import React, { useState } from "react";
import { LifeBuoy, Receipt, Boxes, Package, UserCircle, BarChart3, LayoutDashboard, Settings } from "lucide-react";
import Sidebar from "./modules/sidebar";
import { SidebarItem } from "./modules/sidebar";
import Clientes from "./modules/clientes";
import Inventario from "./modules/inventario";

function App() {
  const [currentPage, setCurrentPage] = useState('inicio');
  const [loading, setLoading] = useState(false)

  const navigateTo = (page) => {
    setCurrentPage(page);
  };

  const renderPage = () => {
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
    <div className="flex">
      <div>
        <Sidebar>
          <button onClick={() => navigateTo('inicio')} className={`max-h-10 transition ease-in-out delay-60 hover:-translate-y-1 hover:scale-95 duration-60 text-left`}>
            <SidebarItem icon={<LayoutDashboard size={20} />} text="Inicio" alert />
          </button>
          <button onClick={() => navigateTo('clientes')} className={`max-h-10 transition ease-in-out delay-60 hover:-translate-y-1 hover:scale-95 duration-60 text-left`}>
            <SidebarItem icon={<UserCircle size={20} />} text="Clientes" />
          </button>
          <button className={`max-h-10 transition ease-in-out delay-60 hover:-translate-y-1 hover:scale-95 duration-60 text-left`}>
            <SidebarItem icon={<BarChart3 size={20} />} text="Analytics" />
          </button>
          <button onClick={() => navigateTo('inventario')} className={`max-h-10 transition ease-in-out delay-60 hover:-translate-y-1 hover:scale-95 duration-60 text-left`}>
            <SidebarItem icon={<Boxes size={20} />} text="Inventory" />
          </button>
          <button className={`max-h-10 transition ease-in-out delay-60 hover:-translate-y-1 hover:scale-95 duration-60 text-left`}>
            <SidebarItem icon={<Package size={20} />} text="Orders" alert />
          </button>
          <button className={`max-h-10 transition ease-in-out delay-60 hover:-translate-y-1 hover:scale-95 duration-60 text-left`}>
            <SidebarItem icon={<Receipt size={20} />} text="Billing" />
          </button>
          <hr className="my-3" />
          <button className={`max-h-10 transition ease-in-out delay-60 hover:-translate-y-1 hover:scale-95 duration-60 text-left`}>
            <SidebarItem icon={<Settings size={20} />} text="Settings" />
          </button>
          <button className={`max-h-10 transition ease-in-out delay-60 hover:-translate-y-1 hover:scale-95 duration-60 text-left`}>
            <SidebarItem icon={<LifeBuoy size={20} />} text="Help" />
          </button>
        </Sidebar>
      </div>
      <div className={`flex-1 p-8 ${loading ? 'cursor-wait' : ''} overflow-y-auto max-h-screen`}>
        {renderPage()}
      </div>
    </div>
  );
}

export default App;
