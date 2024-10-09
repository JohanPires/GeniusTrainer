import React from "react";
import SideBar from "../../components/sideBar/sideBar";
import ProfilBar from "../../components/profilBar/profilBar";
import "./profilPage.css";
import Profil from "../../components/profil/profil";

function ProfilPage() {
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
