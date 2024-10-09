import "./App.css";
import React, { useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Register from "./page/register/register";
import Login from "./page/login/login";
import Homepage from "./page/hompage/homepage";
import CreatePage from "./page/createPage/createPage";
import SavePage from "./page/savePage/savePage";
import ProfilPage from "./page/profilPage/profilPage";
import AdminPage from "./page/adminPage/adminPage";
import ChatPage from "./page/chatPage/chatPage";
import LegalMention from "./page/legalMention/legalMention";
import Confidentiality from "./page/confidentiality/confidentiality";
import { Navigate } from "react-router-dom";

function App() {
  const [role, setRole] = useState(null);
  const url = useLocation();
  const [path, setPath] = useState("");
  useEffect(() => {
    const storedRole = localStorage.getItem("role");
    setRole(storedRole);
    setPath(url.pathname);
  }, []);

  if (
    role === null &&
    (path === "/dashboard/create" ||
      path === "/dashboard/chat" ||
      path === "/dashboard/save" ||
      path === "/dashboard/profil" ||
      path === "/dashboard/admin")
  ) {
    return <div>Loading...</div>;
  }
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/dashboard/create"
          element={
            role === "admin" || role === "coach" ? (
              <CreatePage />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/dashboard/save"
          element={
            role === "admin" || role === "coach" ? (
              <SavePage />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/dashboard/profil"
          element={
            role === "admin" || role === "coach" ? (
              <ProfilPage />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/dashboard/admin"
          element={role === "admin" ? <AdminPage /> : <Navigate to="/login" />}
        />
        <Route
          path="/dashboard/chat"
          element={
            role === "admin" || role === "coach" ? (
              <ChatPage />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route path="/legal" element={<LegalMention />} />
        <Route path="/confidentiality" element={<Confidentiality />} />
      </Routes>
    </div>
  );
}

export default App;
