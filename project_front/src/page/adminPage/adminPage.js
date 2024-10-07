import React, { useEffect, useState } from "react";
import "./adminPage.css";
import SideBar from "../../components/sideBar/sideBar";
import ProfilBar from "../../components/profilBar/profilBar";
import AdminDashboard from "../../components/adminDashboard/adminDashboard";
import { Navigate } from "react-router-dom";

function AdminPage() {
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
    <div className="adminPage">
      <SideBar />
      <div className="adminPage-right h-screen">
        <ProfilBar />
        <AdminDashboard />
      </div>
    </div>
  );
}

export default AdminPage;
