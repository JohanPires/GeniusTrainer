import React, { useEffect, useState } from "react";
import CreateTraining from "../../components/createTraining/createTraining";
import SideBar from "../../components/sideBar/sideBar";
import ProfilBar from "../../components/profilBar/profilBar";
import "./createPage.css";
import { Navigate } from "react-router-dom";

function CreatePage() {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const userConect = localStorage.getItem("authToken");
    if (userConect === null) {
      setIsAuthenticated(false);
    } else {
      setIsAuthenticated(true);
    }
  }, []);

  if (isAuthenticated === null) {
    return <div>Loading...</div>;
  }

  if (isAuthenticated === false) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="createPage">
      <SideBar />
      <div className="createPage-right">
        <ProfilBar />
        <CreateTraining />
      </div>
    </div>
  );
}

export default CreatePage;
