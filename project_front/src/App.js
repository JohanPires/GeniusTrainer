import "./App.css";
import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
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

function App() {
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedRole = localStorage.getItem("role");
    setRole(storedRole);
    setLoading(false);
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login setRole={setRole} />} />
        <Route path="/legal" element={<LegalMention />} />
        <Route path="/confidentiality" element={<Confidentiality />} />

        <Route
          path="/dashboard/create"
          element={
            role ? (
              role === "admin" || role === "coach" || role === "athletes" ? (
                <CreatePage />
              ) : (
                <Navigate to="/login" />
              )
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        {role && (
          <Route
            path="/dashboard/save"
            element={
              role === "admin" || role === "coach" || role === "athletes" ? (
                <SavePage />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
        )}

        {role && (
          <Route
            path="/dashboard/profil"
            element={
              role === "admin" || role === "coach" || role === "athletes" ? (
                <ProfilPage />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
        )}

        <Route
          path="/dashboard/admin"
          element={
            role && role === "admin" ? <AdminPage /> : <Navigate to="/login" />
          }
        />

        <Route
          path="/dashboard/chat"
          element={
            role &&
            (role === "admin" || role === "coach" || role === "athletes") ? (
              <ChatPage />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
      </Routes>
    </div>
  );
}

export default App;
