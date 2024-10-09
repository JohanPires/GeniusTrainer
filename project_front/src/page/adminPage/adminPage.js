import React from "react";
import "./adminPage.css";
import SideBar from "../../components/sideBar/sideBar";
import ProfilBar from "../../components/profilBar/profilBar";
import AdminDashboard from "../../components/adminDashboard/adminDashboard";

function AdminPage() {
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
