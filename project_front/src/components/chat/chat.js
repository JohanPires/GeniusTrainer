import React, { useState } from "react";
import axios from "axios";
import Conversation from "../conversation/conversation";
import "./chat.css";

function Chat() {
  const [results, setResults] = useState([]);
  const [openConv, setOpenConv] = useState(false);
  const [receiver, setReceiver] = useState("");

  const handleSearch = async (value) => {
    const token = localStorage.getItem("authToken");
    const user_id = localStorage.getItem("user_id");

    if (value !== "") {
      try {
        axios
          .get(`http://127.0.0.1:8000/api/user`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((response) => {
            console.log(user_id);
            setResults(
              response.data.filter(
                (res) =>
                  res.name.toLowerCase().includes(value.toLowerCase()) &&
                  res.id !== parseInt(user_id)
              )
            );
          });
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    } else {
      setResults([]);
    }
  };

  const handleConv = (user) => {
    setOpenConv(true);
    setReceiver(user);
    setResults([]);
  };

  return (
    <div className="chat ">
      <div className="searchBar w-4/5 sm:w-2/5 mx-auto my-5  flex flex-col gap-2">
        <div className="shadow-md p-5 rounded-full flex gap-2">
          <label htmlFor="search">
            <i className="fa-solid fa-magnifying-glass text-gray-300"></i>
          </label>
          <input
            className="w-4/5 border-b border-gray-300 focus:outline-none text-gray-500 "
            type="text"
            id="search"
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="Search for users..."
            autocomplete="off"
          />
        </div>
      </div>

      {results.length > 0 && (
        <div className="w-4/5 sm:w-2/5 mx-auto bg-white shadow-md rounded-lg p-3 absolute translate-x-[50%]">
          {results.map((user) => (
            <div
              key={user.id}
              className="p-2 hover:bg-gray-200 cursor-pointer w-full"
              onClick={() => handleConv(user)}
            >
              {user.name}
            </div>
          ))}
        </div>
      )}
      {openConv && <Conversation receiver={receiver} />}
    </div>
  );
}

export default Chat;
// where("from", "in", [user_id, receiver.id]), // Messages envoyés par l'utilisateur ou le destinataire
// where("to", "in", [user_id, receiver.id]), // Messages reçus par l'utilisateur ou le destinataire
