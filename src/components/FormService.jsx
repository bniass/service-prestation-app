import { useEffect, useState } from "react";
import { addService, updateService } from "../services/CommandeService";
import { ModalInfo } from "./ModalInfo";

export default function FormService({ onClose, refresh, serviceData }) {
    const [inputs, setInputs] = useState({
        libelle: "",
        prix: "",
        description: "",
    });
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [message, setMessage] = useState("");

    useEffect(() => {
        // Pré-remplir les champs si un service existe (mode modification)
        if (serviceData) {
            //console.log(serviceData)
            setInputs(serviceData);
        }
    }, [serviceData]);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setInputs((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (serviceData) {
                // Mode modification
                setInputs((data) => ({ ...data, id: serviceData.id}))
                const response = await updateService(inputs);
                refresh((prev) =>
                    prev.map((item) =>
                        item.id === response.id ? response : item
                    )
                );
            } else {
                // Mode ajout
                const response = await addService(inputs);
                refresh((prev) => [...prev, response]);
            }
            onClose();
        } catch (error) {
            //openModal();
            setMessage(error.response?.data?.message || "Une erreur est survenue");
            openModal();
        }
    };

    return (
        <>
            <fieldset className="border border-solid border-gray-300 p-3">
                <legend className="text-sm">
                    {serviceData ? "MODIFICATION DU SERVICE !" : "ENREGISTREMENT D'UN SERVICE !"}
                </legend>
                <form onSubmit={handleSubmit}>
                    {/* Champ caché pour l'ID en mode modification */}
                    {serviceData && <input type="hidden" name="id" value={serviceData.id} />}
                    <div className="mb-5">
                        <label htmlFor="libelle" className="block mb-2 text-sm font-medium text-gray-900">
                            Libelle
                        </label>
                        <input
                            value={inputs.libelle || ""}
                            onChange={handleChange}
                            name="libelle"
                            type="text"
                            id="libelle"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            placeholder="Libelle du service"
                            required
                        />
                    </div>
                    <div className="mb-5">
                        <label htmlFor="prix" className="block mb-2 text-sm font-medium text-gray-900">
                            Prix
                        </label>
                        <input
                            value={inputs.prix || ""}
                            onChange={handleChange}
                            name="prix"
                            type="text"
                            id="prix"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            placeholder="Prix du service"
                            required
                        />
                    </div>
                    <div className="mb-5">
                        <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900">
                            Description
                        </label>
                        <input
                            value={inputs.description || ""}
                            onChange={handleChange}
                            name="description"
                            type="text"
                            id="description"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            placeholder="Description du service"
                            required
                        />
                    </div>
                    <div className="px-6 py-4">
                        <button
                            type="submit"
                            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5"
                        >
                            {serviceData ? "MODIFIER" : "ENREGISTRER"}
                        </button>
                        <button
                            onClick={onClose}
                            type="button"
                            className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 ms-4"
                        >
                            FERMER
                        </button>
                    </div>
                </form>
            </fieldset>
            <ModalInfo isOpen={isModalOpen} onClose={closeModal} title="Information">
                <p>{message}</p>
                <button
                    onClick={closeModal}
                    className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                >
                    Fermer
                </button>
            </ModalInfo>
        </>
    );
}
