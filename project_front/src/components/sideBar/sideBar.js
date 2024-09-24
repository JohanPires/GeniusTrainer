import React, { useEffect, useState } from "react";

// import "./sideBar.css";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

function SideBar() {
  const url = useLocation();
  const [pathname, setPathname] = useState("");
  const [role, setRole] = useState("");
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const user_id = localStorage.getItem("user_id");
  const token = localStorage.getItem("authToken");
  useEffect(() => {
    setPathname(url.pathname);

    axios
      .get(`http://127.0.0.1:8000/api/user/${user_id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setRole(res.data.role);
      });
  }, []);

  const handleLogout = () => {
    axios
      .post(
        `http://127.0.0.1:8000/api/logout`,
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

  return (
    <div>
      {/* Bouton menu burger visible au-dessus de 1500px */}
      <div className="lg:hidden p-5 absolute translate-y-2 -translate-x-5 sm:translate-x-0">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-gray p-2 rounded-md focus:outline-none"
        >
          <i className="fa-solid fa-bars"></i>
        </button>
      </div>

      {/* Sidebar, affichée ou cachée selon l'état isOpen et la taille de l'écran */}
      <div
        className={`${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } fixed lg:static top-0 left-0 w-56 bg-gray-800 text-white h-screen transition-transform transform lg:translate-x-0 lg:block lg:w-64 lg:bg-gray-800`}
      >
        <div className="flex flex-col justify-between h-full">
          <div className="up">
            <div className="flex items-center justify-center py-5">
              <img src="/img/test.png" alt="Logo" className="h-10 w-10 mr-3" />
              <h1 className="text-xl font-bold">GeniusTrainer</h1>
            </div>
            <div className="nav-container mt-8 pl-2">
              <ul>
                <li className="mb-4">
                  <NavLink
                    to="/dashboard/create"
                    className={({ isActive }) =>
                      isActive
                        ? "flex items-center text-indigo-500"
                        : "flex items-center hover:text-indigo-400"
                    }
                  >
                    <i className="fa-solid fa-house mr-3"></i> Créer une séance
                  </NavLink>
                </li>
                <li className="mb-4">
                  <NavLink
                    to="/dashboard/save"
                    className={({ isActive }) =>
                      isActive
                        ? "flex items-center text-indigo-500"
                        : "flex items-center hover:text-indigo-400"
                    }
                  >
                    <i className="fa-solid fa-list mr-3"></i> Séances
                    enregistrées
                  </NavLink>
                </li>
                <li className="mb-4">
                  <NavLink
                    to="/dashboard/conversations"
                    className={({ isActive }) =>
                      isActive
                        ? "flex items-center text-indigo-500"
                        : "flex items-center hover:text-indigo-400"
                    }
                  >
                    <i className="fa-solid fa-comments mr-3"></i> Conversations
                  </NavLink>
                </li>
                <li className="mb-4">
                  <NavLink
                    to="/dashboard/profil"
                    className={({ isActive }) =>
                      isActive
                        ? "flex items-center text-indigo-500"
                        : "flex items-center hover:text-indigo-400"
                    }
                  >
                    <i className="fa-solid fa-user mr-3"></i> Mon profil
                  </NavLink>
                </li>
                {role === "admin" && (
                  <li className="mb-4">
                    <NavLink
                      to="/dashboard/admin"
                      className={({ isActive }) =>
                        isActive
                          ? "flex items-center text-indigo-500"
                          : "flex items-center hover:text-indigo-400"
                      }
                    >
                      <i className="fa-solid fa-shield-alt mr-3"></i> Admin
                    </NavLink>
                  </li>
                )}
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

      {/* Overlay pour fermer la sidebar lorsqu'elle est ouverte sur les grands écrans */}
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
