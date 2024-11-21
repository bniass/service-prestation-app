import { useEffect, useState } from "react";
import { allServices, deleteService } from "../services/CommandeService";
import FormService from "./FormService";
import { Modal } from "./Modal";

export function ServiceList() {
    const [open, setOpen] = useState(false);
    const [currentService, setCurrentService] = useState(null); // Service sélectionné pour la modification
    const [servicesData, setServicesData] = useState([]);

    const handleClose = () => {
        setOpen(false);
        setCurrentService(null); // Réinitialiser le service sélectionné lors de la fermeture
    };

    //setServicesData(dat)
    const handleOpen = (service = null) => {
        setCurrentService(service);
        setOpen(true);
    };

    const fetchServices = async () => {
        const data = await allServices();
        setServicesData(data);
    };

    const handleDelete = async (id) => {
        if (window.confirm("Voulez-vous vraiment supprimer ce service ?")) {
            try {
                const response = await deleteService(id); // Appel au service de suppression
                setServicesData((prev) => prev.filter((service) => service.id !== id)); // Mise à jour locale
            } catch (error) {
                console.error("Erreur lors de la suppression :", error);
            }
        }
    };

    useEffect(() => {
        fetchServices();
    }, []);

    return (
        <>
            <div className="w-full h-full p-8">
                {/* Bouton pour ajouter un nouveau service */}
                <button
                    onClick={() => handleOpen()}
                    type="button"
                    className="text-white bg-blue-500 hover:bg-blue-600 font-medium rounded-lg text-sm px-4 py-2 mr-2"
                >
                    NOUVEAU
                </button>
                <h1 className="text-center mb-4 text-xl w-full font-bold">LISTE DES SERVICES</h1>
                <table className="border-collapse border border-slate-400 w-full">
                    <thead>
                        <tr>
                            <th className="border border-slate-300">ID</th>
                            <th className="border border-slate-300">LIBELLE</th>
                            <th className="border border-slate-300">PRIX</th>
                            <th className="border border-slate-300">DESCRIPTION</th>
                            <th className="border border-slate-300">ACTIONS</th>
                        </tr>
                    </thead>
                    <tbody>
                        {servicesData.map((service, index) => (
                            <tr key={index}>
                                <td className="border border-slate-300">{service.id}</td>
                                <td className="border border-slate-300">{service.libelle}</td>
                                <td className="border border-slate-300">{service.prix}</td>
                                <td className="border border-slate-300">{service.description}</td>
                                <td className="border border-slate-300">
                                    <button
                                        onClick={() => handleOpen(service)}
                                        className="text-white bg-green-500 hover:bg-green-600 font-medium rounded-lg text-sm px-4 py-2 mr-2"
                                    >
                                        MODIFIER
                                    </button>
                                    <button
                                        onClick={() => handleDelete(service.id)}
                                        className="text-white bg-red-600 hover:bg-red-700 px-4 py-1 rounded"
                                    >
                                        Supprimer
                                    </button>   
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="container relative overflow-x-auto shadow-md sm:rounded-lg">
                    <Modal isOpen={open}>
                        <>
                            <FormService
                                onClose={handleClose}
                                refresh={setServicesData}
                                serviceData={currentService}
                            />
                        </>
                    </Modal>
                </div>
            </div>
        </>
    );
}
