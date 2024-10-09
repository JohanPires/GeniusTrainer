import React, { useEffect, useRef, useState } from "react";
import "./profil.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Modal from "../modal/modalDelete";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from "firebase/storage";
import { storage } from "../../lib/firebase";

function Profil() {
  const [userData, setUserData] = useState([]);
  const formRef = useRef(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const token = localStorage.getItem("authToken");
  const user_id = localStorage.getItem("user_id");

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACK_URL_LARAVEL}api/user/${user_id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setUserData(res.data);
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(formRef.current);

    const name = formData.get("name");
    const email = formData.get("email");
    const password = formData.get("password");
    const picture = formData.get("picture");

    const token = localStorage.getItem("authToken");
    const user_id = localStorage.getItem("user_id");

    try {
      const updateResponse = await axios.put(
        `${process.env.REACT_APP_BACK_URL_LARAVEL}api/user/${user_id}`,
        {
          name: name,
          email: email,
          password: password,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (picture.name) {
        const userResponse = await axios.get(
          `${process.env.REACT_APP_BACK_URL_LARAVEL}api/user/${user_id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const oldImagePath = userResponse.data.profile_photo_path;

        if (oldImagePath) {
          const oldImageRef = ref(storage, `profile_images/${oldImagePath}`);
          await deleteObject(oldImageRef);
        }
        await axios.post(
          `${process.env.REACT_APP_BACK_URL_LARAVEL}api/user/picture/${updateResponse.data.user.id}`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const imageRef = ref(storage, `profile_images/${picture.name}`);
        await uploadBytes(imageRef, picture);
      }

      setUserData(updateResponse.data.user);
      setError("");
      window.location.reload();
    } catch (error) {
      if (error.response && error.response.status === 422) {
        setError("Ce mail est déjà utilisé");
      } else {
        console.error(
          "Erreur lors de la mise à jour de l'utilisateur :",
          error
        );
      }
    }
  };

  const openModel = () => {
    setIsModalVisible("true");
  };

  const deleteAcount = () => {
    axios
      .delete(`${process.env.REACT_APP_BACK_URL_LARAVEL}api/user/${user_id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        const deletePicture = async () => {
          const userResponse = await axios.get(
            `${process.env.REACT_APP_BACK_URL_LARAVEL}api/user/${user_id}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          const oldImagePath = userResponse.data.profile_photo_path;

          if (oldImagePath) {
            const oldImageRef = ref(storage, `profile_images/${oldImagePath}`);
            await deleteObject(oldImageRef);
          }
        };
        deletePicture();
      })
      .then(() => {
        localStorage.removeItem("authToken");
        localStorage.removeItem("user_id");
        localStorage.removeItem("role");
        navigate("/");
        window.location.reload();
      });
  };

  return (
    <div className="showUser w-11/12 mx-auto my-5 shadow-md p-8">
      <Modal
        isVisible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        onConfirm={deleteAcount}
      />
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
            defaultValue={userData.name}
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
            defaultValue={userData.email}
          />
        </div>

        <div className="flex flex-col md:flex-row justify-between md:w-3/5 w-full">
          <label
            htmlFor="picture"
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
          onClick={openModel}
        >
          Supprimer
        </button>
      </div>
    </div>
  );
}

export default Profil;
