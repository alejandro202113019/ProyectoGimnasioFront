export default function Confirmation( {confirmar, changeConfirmation, eliminar} ) {

    if (confirmar) {
        return (
            <>
                <div className="fixed w-11/12 h-5/6 grid grid-cols-9 grid-rows-7 gap-3">
                    <div className=" rounded-xl grid grid-cols-9 grid-rows-5 row-start-3 col-span-3 col-end-7 row-span-2 bg-indigo-400">
                        <div className="col-span-9 col-end-10 row-span-3 content-center text-center text-white text-lg">
                            ¿Está seguro que desea eliminar los datos del cliente?
                        </div>
                        <div className=" row-start-5 col-span-3 col-end-7">
                            <button onClick={(e) => changeConfirmation(false,"")} type="button" className="rounded-xl cursor-pointer bg-green-500 transition ease-in-out 
                                        delay-60 hover:-translate-y-1 hover:scale-95 duration-60 w-11/12 h-5/6">CANCELAR</button>
                        </div>
                        <div className=" row-start-5 col-end-10 col-span-3">
                            <button onClick={(e) => eliminar()} type="button" className="rounded-xl cursor-pointer bg-red-700 transition ease-in-out 
                                        delay-60 hover:-translate-y-1 hover:scale-95 duration-60 w-11/12 h-5/6">CONFIRMAR</button>
                        </div>
                    </div>
                </div>
            </>
        )
    }

}