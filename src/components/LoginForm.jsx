import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { loginUser } from '../services/UserService';
import { ModalInfo } from './ModalInfo';


export function LoginForm() {

    const [formDate, setFormData] = useState({})
    const [isModalOpen, setIsModalOpen] = useState(false)
    const nagigate = useNavigate();

    const openModal = () => setIsModalOpen(true)
    const closeModal = () => setIsModalOpen(false)

    const handleChange = (event) => {
        const name = event.target.name
        const value = event.target.value

        setFormData(values => {
            //let datas = { ...values, [name]: value };
            //console.log(datas)
            return ({ ...values, [name]: value })
        })
    }

    const handleLogin = async (event) => {
        event.preventDefault();
        try {
            const response = await loginUser({ username: formDate.username, password: formDate.password })
            console.log(response)
            nagigate("/servicelist")
        } catch (error) {
            openModal();
            console.log(error)
        }
    }

    // js

    return (
        <>
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <form
                    onSubmit={handleLogin}
                    className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md"
                >
                    <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Connexion</h2>

                    <div className="mb-4">
                        <label htmlFor="username" className="block text-gray-700">UserName</label>
                        <input
                            type="username"
                            id="username"
                            name="username"
                            onChange={handleChange}
                            value={formDate.username || ""}
                            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Entrez votre username"
                            required
                        />
                    </div>

                    <div className="mb-6">
                        <label htmlFor="password" className="block text-gray-700">Mot de passe</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            onChange={handleChange}
                            value={formDate.password || ""}
                            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Entrez votre mot de passe"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-300"
                    >
                        Se connecter
                    </button>

                    <p className="mt-4 text-sm text-center text-gray-600">
                        Pas encore de compte ? <a href="#" className="text-blue-500 hover:underline">Inscrivez-vous</a>
                    </p>
                </form>

            </div>
            <ModalInfo isOpen={isModalOpen} onClose={closeModal} title="AUTHENTIFICATION">
                <p>Login ou password incorrecte!!!</p>
                <button
                    onClick={closeModal}
                    className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                >
                    Fermer
                </button>
            </ModalInfo>
        </>
    )
}
