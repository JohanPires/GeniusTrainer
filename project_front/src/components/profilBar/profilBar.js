import React, { useEffect, useState } from "react";

import "./profilBar.css";
import axios from "axios";

import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "../../firebase/firebase";

function ProfilBar() {
  const [userData, setUserData] = useState([]);
  const [currentDate, setCurrentDate] = useState("");

  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("authToken");
      const user_id = localStorage.getItem("user_id");

      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACK_URL_LARAVEL}api/user/${user_id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setUserData(response.data);

        const profilePhotoPath = response.data.profile_photo_path;

        if (profilePhotoPath) {
          const imageName = `profile_images/${profilePhotoPath}`;
          const imageRef = ref(storage, imageName);

          const url = await getDownloadURL(imageRef);
          setImageUrl(url);
        }
      } catch (error) {
        console.error(
          "Erreur lors de la récupération de l'utilisateur :",
          error
        );
      }

      const today = new Date();
      const formattedDate = today.toLocaleDateString();
      setCurrentDate(formattedDate);
    };

    fetchData();
  }, []);

  return (
    <div className="flex justify-end lg:justify-between items-center p-5 shadow-md">
      <div className="flex items-center gap-10">
        <img
          src={imageUrl ? imageUrl : "/img/test.png"}
          alt="Profil utilisateur"
          className="rounded-full"
          width="40"
          height="40"
        />
        <h3 className="font-bold">{userData.name}</h3>
        <p className="italic">{userData.role}</p>
      </div>
      <div className="hidden lg:block">
        <span>{currentDate}</span>
      </div>
    </div>
  );
}

export default ProfilBar;
