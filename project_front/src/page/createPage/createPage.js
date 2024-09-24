import React from "react";
import CreateTraining from "../../components/createTraining/createTraining";
import SideBar from "../../components/sideBar/sideBar";
import ProfilBar from "../../components/profilBar/profilBar";
import "./createPage.css";

function CreatePage() {
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
