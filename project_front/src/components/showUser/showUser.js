import React, { useRef, useState } from "react";
import "./showUser.css";
import axios from "axios";

function ShowUser({ user }) {
  const formRef = useRef(null);
  const [error, setError] = useState("");

  const token = localStorage.getItem("authToken");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(formRef.current);

    const name = formData.get("name");
    const email = formData.get("email");
    const password = formData.get("password");

    axios
      .put(
        `http://127.0.0.1:8000/api/user/${user.id}`,
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
      .then(() => {
        axios.post(
          `http://127.0.0.1:8000/api/user/picture/${user.id}`,
          formData
        );
        setError("");
      })
      .catch((error) => {
        if (error.response && error.response.status === 422) {
          setError("Ce mail est déjà utilisé");
        }
      });
  };

  const handleDelete = () => {
    axios.delete(`http://127.0.0.1:8000/api/user/${user.id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  };

  return (
    // <div classNameName="showUser">
    //   <form action="" ref={formRef} onSubmit={(e) => handleSubmit(e)}>
    //     <div classNameName="">
    //       <label htmlFor="name">Nom d'utilisateur :</label>
    //       <input type="text" name="name" required defaultValue={user.name} />
    //     </div>
    //     <div classNameName="">
    //       <label htmlFor="">Email :</label>
    //       <input type="email" name="email" required defaultValue={user.email} />
    //     </div>
    //     <div classNameName="">
    //       <label htmlFor="">Photo de Profil :</label>
    //       <input type="file" name="picture" />
    //     </div>
    //     <div classNameName="">
    //       <label htmlFor="">Mot de passe :</label>
    //       <input type="password" name="password" placeholder="********" />
    //     </div>
    //     <p id="error">{error}</p>

    //     <div classNameName="button-container">
    //       <input type="submit" value="Sauvegarder" />
    //     </div>
    //   </form>
    //   <button onClick={() => handleDelete()}>Supprimer</button>
    // </div>
    <div className="showUser w-11/12 mx-auto my-5 shadow-md p-8">
      <form
        action=""
        ref={formRef}
        onSubmit={(e) => handleSubmit(e)}
        className="flex flex-col gap-6"
      >
        <div className="flex flex-col md:flex-row justify-between md:w-3/5 w-full">
          <label
            for="name"
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
            for="email"
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
            for="picture"
            className="w-full md:w-1/3 mb-2 md:mb-0 text-sm md:text-base lg:text-lg"
          >
            Photo de Profil :
          </label>
          <input
            className="border-b border-gray-300 outline-none text-gray-500 w-full md:w-2/3 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:bg-gray-200 file:text-gray-600 hover:file:bg-gray-300"
            type="file"
            name="picture"
          />
        </div>

        <div className="flex flex-col md:flex-row justify-between md:w-3/5 w-full">
          <label
            for="password"
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
  );
}

export default ShowUser;
