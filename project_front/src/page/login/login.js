import React, { useRef, useState } from "react";
import "./login.css";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const formRef = useRef(null);
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(formRef.current);

    const email = formData.get("email");
    const password = formData.get("password");

    axios
      .post(
        `${process.env.REACT_APP_BACK_URL_LARAVEL}api/login`,
        {
          email: email,
          password: password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        const token = res.data.token;
        const id = res.data.id;
        localStorage.setItem("authToken", token);
        localStorage.setItem("user_id", id);
        navigate("/dashboard/create");
      })
      .catch((error) => {
        if (error.response && error.response.status === 422) {
          setError(error.response.data.message);
        }
      });
  };

  return (
    <div class="h-screen md:flex">
      <div class="relative overflow-hidden md:flex w-1/2 bg-[url('/public/img/homme-dips.jpg')] bg-center bg-cover justify-around items-center hidden md:block"></div>

      <div class="flex md:w-1/2 justify-center py-10 items-center bg-gray-800 h-full md:h-screen">
        <form
          class="bg-white p-4 md:p-6 lg:p-8 xl:p-10 rounded-2xl"
          ref={formRef}
          onSubmit={handleSubmit}
        >
          <h1 class="text-gray-800 font-bold text-2xl mb-1">Connexion</h1>

          <div class="flex items-center border-2 py-2 px-3 rounded-3xl mb-4">
            <input
              class="pl-2 outline-none border-none"
              type="email"
              name="email"
              placeholder="Email"
              required
            />
          </div>
          <div class="flex items-center border-2 py-2 px-3 rounded-3xl">
            <input
              class="pl-2 outline-none border-none"
              type="password"
              name="password"
              required
              placeholder="Mot de passe"
            />
          </div>
          <button
            type="submit"
            class="block w-full bg-gray-800 mt-4 py-2 rounded-3xl text-white font-semibold mb-2"
          >
            Valider
          </button>
          <p id="error">{error}</p>
          <span class="text-sm ml-2 hover:text-blue-500 cursor-pointer">
            <NavLink to="/register">Vous n'êtes pas encore inscrit ?</NavLink>
          </span>
        </form>
      </div>
    </div>
  );
}

export default Login;
