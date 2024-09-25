import React from "react";
import SideBar from "../../components/sideBar/sideBar";
import ProfilBar from "../../components/profilBar/profilBar";
import Chat from "../../components/chat/chat";

function ChatPage() {
  return (
    <div className="chatPage flex">
      <SideBar />
      <div className="chatPage-right w-full">
        <ProfilBar />
        <Chat />
      </div>
    </div>
  );
}

export default ChatPage;
