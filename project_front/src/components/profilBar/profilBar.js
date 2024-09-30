import React, { useEffect, useState } from "react";

import "./profilBar.css";
import axios from "axios";

function ProfilBar() {
  const [userData, setUserData] = useState([]);
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const user_id = localStorage.getItem("user_id");

    axios
      .get(`${process.env.REACT_APP_BACK_URL_LARAVEL}api/user/${user_id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setUserData(res.data);
        localStorage.setItem("role", res.data.role);
      });

    const today = new Date();
    const formattedDate = today.toLocaleDateString();
    setCurrentDate(formattedDate);
  }, []);

  return (
    <div className="flex justify-end lg:justify-between items-center p-5 shadow-md">
      <div className="flex items-center gap-10">
        <img
          src={
            userData.profile_photo_path
              ? `${process.env.REACT_APP_BACK_URL_LARAVEL}storage/${userData.profile_photo_path}`
              : "/img/test.png"
          }
          alt=""
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
