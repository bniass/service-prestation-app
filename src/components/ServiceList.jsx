import { useEffect, useState } from "react";
import { allServices } from "../services/CommandeService";
import FormService from "./FormService";
import { Modal } from "./Modal";

export function ServiceList() {
    const [open, setOpen] = useState(false);
    const [servicesData, setServicesData] = useState([])

    const handleClose = () => {
        setOpen(false);
    };
 
    const handleOpen = () => {
        setOpen(true);
    };

    
    const fetch = async () => {
        const data = await allServices()
        console.log(data)
        setServicesData(() => data)
    }

    useEffect(() => {
        fetch();
    }, [])

    return (
        <>
            <div className="w-full  h-full p-8">
                <button onClick={handleOpen} type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">NOUVEAU</button>
                <h1 className="text-center mb-4 text-xl w-full font-bold">LISTE DES SERVICES</h1>
                <table className="border-collapse border border-slate-400 w-full">
                    <thead>
                        <tr>
                            <th className="border border-slate-300 ...">ID</th>
                            <th className="border border-slate-300 ...">LIBELLE</th>
                            <th className="border border-slate-300 ...">PRIX</th>
                            <th className="border border-slate-300 ...">DESCRIPTION</th>
                        </tr>
                    </thead>
                    <tbody>
                        {servicesData.map((service, index) => (
                            <tr key={index}>
                                <td className="border border-slate-300 ...">{service.id}</td>
                                <td className="border border-slate-300 ...">{service.libelle}</td>
                                <td className="border border-slate-300 ...">{service.prix}</td>
                                <td className="border border-slate-300 ...">{service.description}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                 <div className="container relative overflow-x-auto shadow-md sm:rounded-lg">
                <Modal isOpen={open}>
                    <>
                        <FormService onClose={handleClose} />
                    </>
                </Modal>
            </div>
            </div>
           
        </>
    )
}