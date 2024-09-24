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
      .get(`http://127.0.0.1:8000/api/user/${user_id}`, {
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
    <div className="profilBar">
      <div className="left">
        <img
          src={
            userData.profile_photo_path
              ? `http://localhost:8000/storage/${userData.profile_photo_path}`
              : "/img/test.png"
          }
          alt=""
          height="40px"
          width="40px"
        />
        <h3>{userData.name}</h3>
        <p>{userData.role}</p>
      </div>
      <div className="right">
        <span>{currentDate}</span>
      </div>
    </div>
  );
}

export default ProfilBar;
