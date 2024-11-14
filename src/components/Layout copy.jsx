// App.jsx
import React from 'react';
import { Sidebar } from './Sidebar';
import userImage from "./images/user.jpeg";
import { Outlet, Link } from 'react-router-dom';


export function Layout() {
    return (
        <div className="flex min-h-screen bg-gray-100">
            {/* Sidebar */}
            <Sidebar />

            {/* Main content */}
            <div className="flex-grow w-full flex flex-col md:ml-64 min-h-screen border border-gray-300">
                {/* Header */}
                <header className="bg-green shadow p-4 flex justify-between items-center w-full">
                    <h1 className="text-xl font-semibold">GEST-SER / APPLICATION DE GESTION DE SERVICES INFORMATIQUES</h1>
                    <div className="flex items-center space-x-4">
                        <img src={userImage} alt="Profil" className="w-10 h-10 rounded-full" />
                        <span className="text-gray-800 font-medium">Nom Utilisateur</span>
                    </div>
                </header>

                {/* Content */}
                <main className="flex-grow flex bg-white items-center justify-center h-full w-full m-0 p-0">
                    <Outlet />
                </main>

                {/* Footer */}
                <footer className="bg-white text-black p-4 text-center w-full border border-gray-300">
                    &copy; 2024 Mon Application. Tous droits réservés.
                </footer>
            </div>
        </div>

    );
}
