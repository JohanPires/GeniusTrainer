import React from "react";
import SideBar from "../../components/sideBar/sideBar";
import ProfilBar from "../../components/profilBar/profilBar";
import Chat from "../../components/chat/chat";
import "./chatPage.css";

function ChatPage() {
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
