import React, { useEffect, useState } from "react";
import SideBar from "../../components/sideBar/sideBar";
import ProfilBar from "../../components/profilBar/profilBar";
import "./profilPage.css";
import Profil from "../../components/profil/profil";
import axios from "axios";
import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "../../firebase/firebase";

function ProfilPage() {
  const [userData, setUserData] = useState([]);
  const [currentDate, setCurrentDate] = useState("");

  const [imageUrl, setImageUrl] = useState("");

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
      console.error("Erreur lors de la récupération de l'utilisateur :", error);
    }

    const today = new Date();
    const formattedDate = today.toLocaleDateString();
    setCurrentDate(formattedDate);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="profilPage">
      <SideBar />
      <div className="profilPage-right">
        <ProfilBar
          userData={userData}
          currentDate={currentDate}
          imageUrl={imageUrl}
        />
        <Profil fetchData={fetchData} />
      </div>
    </div>
  );
}

export default ProfilPage;
