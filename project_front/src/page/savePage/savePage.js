import React, { useEffect, useState } from "react";
import SideBar from "../../components/sideBar/sideBar";
import "./savePage.css";
import ProfilBar from "../../components/profilBar/profilBar";
import AllTraining from "../../components/allTraining/allTraining";
import { Navigate } from "react-router-dom";

function SavePage() {
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
    <div className="savePage">
      <SideBar />
      <div className="savePage-right">
        <ProfilBar />
        <AllTraining />
      </div>
    </div>
  );
}

export default SavePage;
