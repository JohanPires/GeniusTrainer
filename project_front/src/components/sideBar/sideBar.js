import React, { useEffect, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

function SideBar() {
  const url = useLocation();
  const [role, setRole] = useState("");
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const user_id = localStorage.getItem("user_id");
  const token = localStorage.getItem("authToken");

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACK_URL_LARAVEL}api/user/${user_id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setRole(res.data.role);
      });
  }, [user_id, token, url.pathname]);

  const handleLogout = () => {
    axios
      .post(
        `${process.env.REACT_APP_BACK_URL_LARAVEL}api/logout`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(() => {
        localStorage.removeItem("authToken");
        localStorage.removeItem("user_id");
        localStorage.removeItem("role");
        navigate("/");
      });
  };

  const links = [
    {
      to: "/dashboard/create",
      text: "Créer une séance",
      icon: "fa-house",
      condition: role === "admin" || role === "coach",
    },
    {
      to: "/dashboard/save",
      text: "Séances enregistrées",
      icon: "fa-list",
      condition: role === "admin" || role === "coach",
    },
    {
      to: "/dashboard/chat",
      text: "Messagerie",
      icon: "fa-comments",
      condition: true,
    },
    {
      to: "/dashboard/profil",
      text: "Mon profil",
      icon: "fa-user",
      condition: true,
    },
    {
      to: "/dashboard/admin",
      text: "Admin",
      icon: "fa-shield-alt",
      condition: role === "admin",
    },
  ];

  return (
    <div>
      <div className="lg:hidden p-5 absolute translate-y-2 -translate-x-5 sm:translate-x-0">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-gray p-2 rounded-md focus:outline-none"
        >
          <i className="fa-solid fa-bars"></i>
        </button>
      </div>

      <div
        className={`${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } fixed lg:static top-0 left-0 w-56 bg-gray-800 text-white h-screen transition-transform transform lg:translate-x-0 lg:block lg:w-64 lg:bg-gray-800`}
      >
        <div className="flex flex-col justify-between h-full">
          <div className="up">
            <div className="flex items-center justify-center py-5">
              <img
                src="/img/Design_sans_titre__11_-removebg-preview.png"
                alt="Logo"
                className="h-10 w-10 mr-3"
              />
              <h1 className="text-xl font-bold">GeniusTrainer</h1>
            </div>
            <div className="nav-container mt-8 pl-2">
              <ul>
                {links
                  .filter((link) => link.condition)
                  .map((link, index) => (
                    <li key={index} className="mb-4">
                      <NavLink
                        to={link.to}
                        className={({ isActive }) =>
                          isActive
                            ? "flex items-center text-indigo-500"
                            : "flex items-center hover:text-indigo-400"
                        }
                      >
                        <i className={`fa-solid ${link.icon} mr-3`}></i>
                        {link.text}
                      </NavLink>
                    </li>
                  ))}
              </ul>
            </div>
          </div>
          <div className="logout p-5">
            <button
              onClick={handleLogout}
              className="flex items-center w-full py-2 px-4 bg-red-600 hover:bg-red-500 rounded-lg"
            >
              <i className="fa-solid fa-arrow-right-from-bracket mr-3"></i>
              Déconnexion
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed top-0 left-56 sm:left-64 right-0 bottom-0  lg:hidden"
        ></div>
      )}
    </div>
  );
}

export default SideBar;
