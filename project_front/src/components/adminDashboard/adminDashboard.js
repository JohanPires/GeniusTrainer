import React, { useEffect, useState } from "react";
import axios from "axios";
import "./adminDashboard.css";
import ShowUser from "../showUser/showUser";
import AllTraining from "../allTraining/allTraining";

function AdminDashboard() {
  const [userData, setUserData] = useState([]);
  const [template, setTemplate] = useState("users");

  const token = localStorage.getItem("authToken");
  const user_id = localStorage.getItem("user_id");

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACK_URL_LARAVEL}api/user`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setUserData(res.data));
  }, []);

  return (
    <div className="adminDashboard">
      <div className="admin-nav flex flex-col md:flex-row justify-around mb-5 items-center">
        <button
          onClick={() => setTemplate("users")}
          className="bg-gray-800 text-white rounded-lg shadow-md p-3 mt-3 hover:text-gray-800 hover:bg-white transition duration-200 w-11/12 md:w-1/3 mx-1 mb-2 md:mb-0"
        >
          Utilisateurs
        </button>
        <button
          onClick={() => setTemplate("trainings")}
          className="bg-gray-800 text-white rounded-lg shadow-md p-3 mt-3 hover:text-gray-800 hover:bg-white transition duration-200 w-11/12 md:w-1/3 mx-1 mb-2 md:mb-0"
        >
          Séances
        </button>
      </div>
      <div className="content">
        {template === "users" ? (
          <div className="users">
            {userData
              .filter((user) => user.id !== parseInt(user_id))
              .map((user) => {
                return <ShowUser key={user.id} user={user} />;
              })}
          </div>
        ) : (
          <div className="trainings">
            <AllTraining />
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;
