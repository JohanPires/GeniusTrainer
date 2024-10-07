import React, { useEffect, useState } from "react";
import SideBar from "../../components/sideBar/sideBar";
import ProfilBar from "../../components/profilBar/profilBar";
import "./profilPage.css";
import Profil from "../../components/profil/profil";
import { Navigate } from "react-router-dom";

function ProfilPage() {
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
    <div className="profilPage">
      <SideBar />
      <div className="profilPage-right">
        <ProfilBar />
        <Profil />
      </div>
    </div>
  );
}

export default ProfilPage;
