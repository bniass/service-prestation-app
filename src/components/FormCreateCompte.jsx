import React, { useState } from 'react';
import { creerCompte } from '../services/CompteService';

export function FormCreateCompte() {
    const [formData, setFormData] = useState({
        nom: '',
        prenom: '',
        dateNaissance: '',
        telephone: '',
        montant: ''
    });

    const handleChange = (event) => {
        
        const name = event.target.name;
        const value = event.target.value;

        setFormData(values => {
            return ({ ...values, [name]: value })
        })
        
    };

    const handleSubmit = async(e) => {
        e.preventDefault();
        let data = {
            customerCreateRequest : {
                nom: formData.nom,
                prenom: formData.prenom,
                dateNaissance: formData.dateNaissance,
                tel: formData.telephone
            },
            montant: formData.montant
        }
        const response = await creerCompte(data)
        setFormData({
            nom: '',
            prenom: '',
            dateNaissance: '',
            telephone: '',
            montant: ''
        })
        console.log(response);
    };

    return (
        <form onSubmit={handleSubmit}
            className="bg-white py-6 p-6 rounded-lg shadow-lg w-full max-w-4xl mx-auto px-4">
            <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">CREATION D'UN COMPTE CLIENT</h2>

            <div className="mb-2">
                <label htmlFor="nom" className="block text-gray-700">Nom</label>
                <input
                    type="text"
                    id="nom"
                    name="nom"
                    value={formData.nom}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Entrez votre nom"
                    required
                />
            </div>

            <div className="mb-4">
                <label htmlFor="prenom" className="block text-gray-700">Prénom</label>
                <input
                    type="text"
                    id="prenom"
                    name="prenom"
                    value={formData.prenom}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Entrez votre prénom"
                    required
                />
            </div>

            <div className="mb-4">
                <label htmlFor="dateNaissance" className="block text-gray-700">Date de Naissance</label>
                <input
                    type="date"
                    id="dateNaissance"
                    name="dateNaissance"
                    value={formData.dateNaissance}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                />
            </div>

            <div className="mb-4">
                <label htmlFor="telephone" className="block text-gray-700">Téléphone</label>
                <input
                    type="tel"
                    id="telephone"
                    name="telephone"
                    value={formData.telephone}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Entrez votre numéro de téléphone"
                    required
                />
            </div>

            <div className="mb-6">
                <label htmlFor="montant" className="block text-gray-700">Montant de Dépôt</label>
                <input
                    type="number"
                    id="montant"
                    name="montant"
                    value={formData.montant}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Entrez le montant de dépôt"
                    required
                />
            </div>

            <div className="flex justify-center">
                <button
                    type="submit"
                    className="w-full max-w-[320px] bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-300"
                >
                    CREER LE COMPTE
                </button>
            </div>
        </form>
    );
}
