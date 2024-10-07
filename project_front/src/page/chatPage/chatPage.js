import React, { useEffect, useState } from "react";
import SideBar from "../../components/sideBar/sideBar";
import ProfilBar from "../../components/profilBar/profilBar";
import Chat from "../../components/chat/chat";
import "./chatPage.css";
import { Navigate } from "react-router-dom";

function ChatPage() {
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
    <div className="chatPage flex">
      <SideBar />
      <div className="chatPage-right w-full flex flex-col">
        <ProfilBar />
        <Chat />
      </div>
    </div>
  );
}

export default ChatPage;
