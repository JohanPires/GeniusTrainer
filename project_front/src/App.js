import "./App.css";
import React from "react";
import { Routes, Route } from "react-router-dom";
import Register from "./page/register/register";
import Login from "./page/login/login";
import Homepage from "./page/hompage/homepage";
import CreatePage from "./page/createPage/createPage";
import SavePage from "./page/savePage/savePage";
import ProfilPage from "./page/profilPage/profilPage";
import AdminPage from "./page/adminPage/adminPage";
import ChatPage from "./page/chatPage/chatPage";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard/create" element={<CreatePage />} />
        <Route path="/dashboard/save" element={<SavePage />} />
        <Route path="/dashboard/profil" element={<ProfilPage />} />
        <Route path="/dashboard/admin" element={<AdminPage />} />
        <Route path="/dashboard/chat" element={<ChatPage />} />
      </Routes>
    </div>
  );
}

export default App;
