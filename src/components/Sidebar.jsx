import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdHome, MdBuild, MdInfo, MdContactMail, MdExpandMore, MdExpandLess } from "react-icons/md";
import { ListBulletIcon, PlusIcon } from "@heroicons/react/24/solid";

export function Sidebar() {
  const navigate = useNavigate();
  const [activeMenu, setActiveMenu] = useState("Accueil");
  const [expandedMenu, setExpandedMenu] = useState(null); // Stocke le menu actuellement ouvert

  const routes = {
    "Accueil": "/accueil",
    "Créer": "/createcompte",
    "Dépot": "/depot",
    "Nouveau": "/creerservice",
    "Lister": "/servicelist",
  };

  const handleToggleSubMenu = (menu) => {
    setExpandedMenu(expandedMenu === menu ? null : menu); // Ferme le sous-menu actuel si on clique à nouveau dessus, sinon, ouvre-le
  };

  const handleMenuClick = (menuName) => {
    setActiveMenu(menuName);
    if (routes[menuName]) {
      navigate(routes[menuName]);
    }
  };

  const menuItems = [
    { name: "Accueil", icon: <MdHome />, submenu: [] },
    {
      name: "Services",
      icon: <MdBuild />,
      submenu: [
        { name: "Nouveau", icon: <PlusIcon className="h-4 w-4" /> },
        { name: "Lister", icon: <ListBulletIcon className="h-4 w-4" /> },
      ],
    },
    {
      name: "Compte",
      icon: <MdBuild />,
      submenu: [
        { name: "Créer", icon: <PlusIcon className="h-4 w-4" /> },
        { name: "Dépot", icon: <ListBulletIcon className="h-4 w-4" /> },
      ],
    },
    { name: "À propos", icon: <MdInfo />, submenu: [] },
    { name: "Contact", icon: <MdContactMail />, submenu: [] },
  ];

  return (
    <aside className="fixed inset-y-0 left-0 w-64 bg-white text-black transform transition-transform duration-300 md:translate-x-0 z-50">
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-8">GEST-SER</h1>
        <nav>
          <ul>
            {menuItems.map(({ name, icon, submenu }) => (
              <li key={name} className="mt-4">
                <button
                  onClick={() => (submenu.length ? handleToggleSubMenu(name) : handleMenuClick(name))}
                  className={`flex items-center justify-between w-full p-2 rounded ${activeMenu === name && !submenu.length ? "bg-gray-200" : ""}`}
                >
                  <div className="flex items-center">
                    {icon}
                    <span className="ml-2">{name}</span>
                  </div>
                  {submenu.length > 0 && (expandedMenu === name ? <MdExpandLess /> : <MdExpandMore />)}
                </button>
                {expandedMenu === name && (
                  <ul className="pl-8 mt-2 space-y-2">
                    {submenu.map((subItem) => (
                      <li key={subItem.name}>
                        <button
                          onClick={() => handleMenuClick(subItem.name)}
                          className={`flex items-center space-x-2 py-2 px-4 rounded ${activeMenu === subItem.name ? "bg-gray-200 text-blue-500" : ""}`}
                        >
                          {subItem.icon}
                          <span>{subItem.name}</span>
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </aside>
  );
}
