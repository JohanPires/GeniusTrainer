import React, { useRef, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import ModalRegister from "../../components/modal/modalRegister";
import "./register.css";
import { getStorage, ref, uploadBytes } from "firebase/storage";

function Register() {
  const formRef = useRef(null);
  const navigate = useNavigate();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [error, setError] = useState("");

  const storage = getStorage();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(formRef.current);

    const email = formData.get("email");
    const password = formData.get("password");
    const username = formData.get("username");
    const role = formData.get("role");
    const picture = formData.get("picture");

    try {
      // Envoi des informations de l'utilisateur à votre backend
      const res = await axios.post(
        `${process.env.REACT_APP_BACK_URL_LARAVEL}api/register`,
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
      );

      if (picture) {
        const imageRef = ref(storage, `profile_images/${picture.name}`);
        await uploadBytes(imageRef, picture);

        await axios.post(
          `${process.env.REACT_APP_BACK_URL_LARAVEL}api/user/picture/${res.data.user.id}`,
          formData
        );
      }

      setIsModalVisible(true);
    } catch (error) {
      if (error.response && error.response.status === 422) {
        const firstError = Object.entries(error.response.data.errors)[0][1][0];
        setError(firstError);
      } else {
        console.error("Erreur lors de l'inscription :", error);
      }
    }
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
    navigate("/login");
  };

  return (
    <div className="h-screen md:flex">
      <ModalRegister
        message="Votre compte a été créé avec succès !"
        isVisible={isModalVisible}
        onClose={handleCloseModal}
      />
      <div className="flex md:w-1/2 justify-center py-10 items-center bg-gray-800 h-full md:h-screen">
        <form
          className="bg-white p-4 md:p-6 lg:p-8 xl:p-10 rounded-2xl"
          ref={formRef}
          onSubmit={handleSubmit}
        >
          <h1 className="text-gray-800 font-bold text-2xl mb-1">Inscription</h1>

          <div className="flex items-center border-2 py-2 px-3 rounded-3xl mb-4">
            <input
              className="pl-2 outline-none border-none"
              type="name"
              name="username"
              placeholder="Nom"
              required
              aria-label="Champ nom "
            />
          </div>
          <div className="flex items-center border-2 py-2 px-3 rounded-3xl mb-4">
            <input
              className="pl-2 outline-none border-none"
              type="email"
              name="email"
              placeholder="Email"
              required
              aria-label="Champ nom email"
            />
          </div>
          <div className="flex items-center border-2 py-2 px-3 rounded-3xl mb-4">
            <input
              className="pl-2 outline-none border-none"
              type="password"
              name="password"
              required
              placeholder="Mot de passe"
              aria-label="Champ mot de passe"
            />
          </div>
          <div className="flex items-center border-2 py-2 px-3 rounded-3xl mb-4">
            <select name="role">
              <option value="coach">Coach</option>
              <option value="athletes">Sportif</option>
            </select>
          </div>
          <div className="flex items-center border-2 py-2 px-3 rounded-3xl">
            <label htmlFor="picture" className="cursor-pointer">
              <span className="mt-2 text-base leading-normal">
                Choisir une image
              </span>
            </label>
            <input
              type="file"
              id="picture"
              className="hidden"
              name="picture"
              aria-label="Champ image"
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
            <NavLink className="text-center" to="/login">
              Vous êtes déjà inscrit ?
            </NavLink>
          </span>
        </form>
      </div>
      <div className="relative overflow-hidden md:flex w-1/2 bg-[url('/public/img/homme-qui-court.jpg')] bg-center bg-cover justify-around items-center hidden md:block"></div>
    </div>
  );
}

export default Register;
