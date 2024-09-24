import React, { useRef } from "react";
// import "./register.css";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";

function Register() {
  const formRef = useRef(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(formRef.current);

    const email = formData.get("email");
    const password = formData.get("password");
    const username = formData.get("username");
    const role = formData.get("role");

    axios
      .post(
        "http://127.0.0.1:8000/api/register",
        {
          name: username,
          email: email,
          password: password,
          role: role,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        axios.post(
          `http://127.0.0.1:8000/api/user/picture/${res.data.user.id}`,
          formData
        );
      })
      .then(() => {
        alert("Utilisateur crée");
        navigate("/login");
      });
  };

  return (
    // <div className="register">
    //   <div className="left"></div>
    //   <div className="right">
    //     <form ref={formRef} onSubmit={handleSubmit}>
    //       <legend>INSCRIPTION</legend>
    //       <input
    //         type="name"
    //         name="username"
    //         placeholder="Nom d'utilisateur"
    //         required
    //       />

    //       <input type="email" name="email" placeholder="Email" required />

    //       <input
    //         type="password"
    //         name="password"
    //         required
    //         placeholder="Mot de passe"
    //       />

    //       <select name="role">
    //         <option value="coach">Coach</option>
    //         <option value="athletes">Sportif</option>
    //       </select>

    //       <input type="file" name="picture" />

    //       <button type="submit">Valider</button>

    //       <NavLink to="/login">Vous êtes déjà inscrit ?</NavLink>
    //     </form>
    //   </div>
    // </div>

    <div class="h-screen md:flex">
      <div class="flex md:w-1/2 justify-center py-10 items-center bg-gray-800 h-full md:h-screen">
        <form
          class="bg-white p-4 md:p-6 lg:p-8 xl:p-10 rounded-2xl"
          ref={formRef}
          onSubmit={handleSubmit}
        >
          <h1 class="text-gray-800 font-bold text-2xl mb-1">Inscription</h1>

          <div class="flex items-center border-2 py-2 px-3 rounded-3xl mb-4">
            <input
              class="pl-2 outline-none border-none"
              type="name"
              name="username"
              placeholder="Nom"
              required
            />
          </div>
          <div class="flex items-center border-2 py-2 px-3 rounded-3xl mb-4">
            <input
              class="pl-2 outline-none border-none"
              type="email"
              name="email"
              placeholder="Email"
              required
            />
          </div>
          <div class="flex items-center border-2 py-2 px-3 rounded-3xl mb-4">
            <input
              class="pl-2 outline-none border-none"
              type="password"
              name="password"
              required
              placeholder="Mot de passe"
            />
          </div>
          <div class="flex items-center border-2 py-2 px-3 rounded-3xl mb-4">
            <select name="role">
              <option value="coach">Coach</option>
              <option value="athletes">Sportif</option>
            </select>
          </div>
          <div class="flex items-center border-2 py-2 px-3 rounded-3xl">
            <label htmlFor="picture" class="cursor-pointer">
              <span class="mt-2 text-base leading-normal">
                Choisir une image
              </span>
            </label>
            <input type="file" id="picture" class="hidden" name="picture" />
          </div>
          <button
            type="submit"
            class="block w-full bg-gray-800 mt-4 py-2 rounded-3xl text-white font-semibold mb-2"
          >
            Valider
          </button>
          <span class="text-sm ml-2 hover:text-blue-500 cursor-pointer">
            <NavLink to="/login">Vous êtes déjà inscrit ?</NavLink>
          </span>
        </form>
      </div>
      <div class="relative overflow-hidden md:flex w-1/2 bg-[url('/public/img/homme-qui-court.jpg')] bg-center bg-cover justify-around items-center hidden md:block"></div>
    </div>
  );
}

export default Register;
