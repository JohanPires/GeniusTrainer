import React from "react";
import SideBar from "../../components/sideBar/sideBar";
import "./savePage.css";
import ProfilBar from "../../components/profilBar/profilBar";
import AllTraining from "../../components/allTraining/allTraining";

function SavePage() {
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
