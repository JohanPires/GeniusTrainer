import React, { useRef, useState } from "react";
import "./showUser.css";
import axios from "axios";

function ShowUser({ user }) {
  const formRef = useRef(null);
  const [error, setError] = useState("");
  const [deleted, setDeleted] = useState(false);

  const token = localStorage.getItem("authToken");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(formRef.current);

    const name = formData.get("name");
    const email = formData.get("email");
    const password = formData.get("password");

    axios
      .put(
        `${process.env.REACT_APP_BACK_URL_LARAVEL}api/user/${user.id}`,
        {
          name: name,
          email: email,
          password: password,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .catch((error) => {
        if (error.response && error.response.status === 422) {
          setError("Ce mail est déjà utilisé");
        }
      });
  };

  const handleDelete = () => {
    setDeleted(true);
    axios.delete(
      `${process.env.REACT_APP_BACK_URL_LARAVEL}api/user/${user.id}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
  };

  return (
    <div className="showUser ">
      {deleted === false && (
        <div className="w-11/12 mx-auto my-5 shadow-md p-8">
          <form
            action=""
            ref={formRef}
            onSubmit={(e) => handleSubmit(e)}
            className="flex flex-col gap-6"
          >
            <div className="flex flex-col md:flex-row justify-between md:w-3/5 w-full">
              <label
                htmlFor="name"
                className="w-full md:w-1/3 mb-2 md:mb-0 text-sm md:text-base lg:text-lg"
              >
                Nom d'utilisateur :
              </label>
              <input
                className="border-b border-gray-300 outline-none text-gray-500 w-full md:w-2/3"
                type="text"
                name="name"
                required
                defaultValue={user.name}
              />
            </div>

            <div className="flex flex-col md:flex-row justify-between md:w-3/5 w-full">
              <label
                htmlFor="email"
                className="w-full md:w-1/3 mb-2 md:mb-0 text-sm md:text-base lg:text-lg"
              >
                Email :
              </label>
              <input
                className="border-b border-gray-300 outline-none text-gray-500 w-full md:w-2/3"
                type="email"
                name="email"
                required
                defaultValue={user.email}
              />
            </div>

            <div className="flex flex-col md:flex-row justify-between md:w-3/5 w-full">
              <label
                htmlFor="password"
                className="w-full md:w-1/3 mb-2 md:mb-0 text-sm md:text-base lg:text-lg"
              >
                Mot de passe :
              </label>
              <input
                className="border-b border-gray-300 outline-none text-gray-500 w-full md:w-2/3"
                type="password"
                name="password"
                placeholder="********"
              />
            </div>

            <p id="error" className="text-red-500">
              {error}
            </p>

            <div className="button-container flex flex-col md:flex-row justify-start gap-4">
              <input
                className="w-full md:w-48 border-b border-gray-300 outline-none text-gray-500 hover:bg-gray-100 py-2 cursor-pointer"
                type="submit"
                value="Sauvegarder"
              />
            </div>
          </form>
          <div className="flex justify-start mt-4">
            <button
              className="w-full md:w-48 border-b border-gray-300 outline-none text-red-500 hover:bg-red-100 py-2 cursor-pointer"
              onClick={() => handleDelete()}
            >
              Supprimer
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ShowUser;
