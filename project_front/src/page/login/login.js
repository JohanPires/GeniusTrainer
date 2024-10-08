import React, { useRef, useState } from "react";
import "./login.css";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";

function Login({ setRole }) {
  const formRef = useRef(null);
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(formRef.current);

    axios
      .post(`${process.env.REACT_APP_BACK_URL_LARAVEL}api/login`, formData, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        localStorage.setItem("authToken", res.data.token);
        localStorage.setItem("user_id", res.data.id);
        localStorage.setItem("role", res.data.user.role);

        if (res.data.user.role === "athletes") {
          navigate("/dashboard/profil");
        } else {
          navigate("/dashboard/create");
        }
      })
      .then(() => {
        setRole(localStorage.getItem("role"));
      })
      .catch((error) => {
        if (error.response) {
          setError(error.response.data.message);
        }
      });
  };

  return (
    <div className="h-screen md:flex">
      <div className="relative overflow-hidden md:flex w-1/2 bg-[url('/public/img/homme-dips.jpg')] bg-center bg-cover justify-around items-center hidden md:block"></div>

      <div className="flex md:w-1/2 justify-center py-10 items-center bg-gray-800 h-full md:h-screen">
        <form
          className="bg-white p-4 md:p-6 lg:p-8 xl:p-10 rounded-2xl"
          ref={formRef}
          onSubmit={handleSubmit}
        >
          <h1 className="text-gray-800 font-bold text-2xl mb-1">Connexion</h1>

          <div className="flex items-center border-2 py-2 px-3 rounded-3xl mb-4">
            <input
              className="pl-2 outline-none border-none"
              type="email"
              name="email"
              placeholder="Email"
              required
            />
          </div>
          <div className="flex items-center border-2 py-2 px-3 rounded-3xl">
            <input
              className="pl-2 outline-none border-none"
              type="password"
              name="password"
              required
              placeholder="Mot de passe"
            />
          </div>
          <button
            type="submit"
            className="block w-full bg-gray-800 mt-4 py-2 rounded-3xl text-white font-semibold mb-2"
          >
            Valider
          </button>
          <p id="error">{error}</p>
          <span className="text-sm ml-2 hover:text-blue-500 cursor-pointer">
            <NavLink to="/register">Vous n'êtes pas encore inscrit ?</NavLink>
          </span>
        </form>
      </div>
    </div>
  );
}

export default Login;
