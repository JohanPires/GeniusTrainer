import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import React, { useEffect, useState, useRef } from "react";
import {
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";
import { db } from "../../lib/firebase";
import "./conversation.css";
import { MdAttachFile } from "react-icons/md";

function Conversation({ receiver }) {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [file, setFile] = useState(null);

  const storage = getStorage(); // Initialisation de Firebase Storage

  const user_id = localStorage.getItem("user_id");

  const messagesEndRef = useRef(null);

  const sendMessage = async () => {
    if (newMessage.trim() === "" && !file) return; // Empêcher l'envoi de messages vides

    try {
      let fileUrl = null;
      if (file) {
        const storageRef = ref(storage, `files/${file.name}`);
        await uploadBytes(storageRef, file); // Télécharger le fichier
        fileUrl = await getDownloadURL(storageRef); // Obtenir l'URL du fichier
        setFile(null); // Réinitialiser le fichier après l'envoi
      }

      await addDoc(collection(db, "messages"), {
        text: newMessage || null,
        from: user_id,
        to: receiver.id,
        fileUrl: fileUrl || null,
        timestamp: new Date(),
      });

      setNewMessage("");
    } catch (e) {
      console.error("Erreur lors de l'envoi du message : ", e);
    }
  };

  const fetchMessages = () => {
    const q = query(collection(db, "messages"), orderBy("timestamp", "asc"));

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const fetchedMessages = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setMessages(
          fetchedMessages.filter(
            (message) =>
              (parseInt(message.from) === parseInt(user_id) &&
                message.to === receiver.id) ||
              (parseInt(message.from) === receiver.id &&
                message.to === parseInt(user_id))
          )
        );
      },
      (error) => {
        console.error("Erreur lors de la récupération des messages : ", error);
      }
    );

    return unsubscribe;
  };

  // Gestion du fichier sélectionné
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  useEffect(() => {
    const unsubscribe = fetchMessages();
    return () => unsubscribe();
  }, [receiver.id]);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="conversation flex flex-col h-[90vh] max-w-lg mx-auto bg-white shadow-lg rounded-lg p-4">
      {/* Messages */}
      <div className="messages flex-1 overflow-y-auto space-y-4 p-2">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`message max-w-xs md:max-w-md p-3 rounded-lg shadow-md flex flex-col ${
              message.from === user_id
                ? "bg-gray-800 text-white self-end"
                : "bg-gray-200 text-gray-900 self-start"
            }`}
          >
            <strong>{message.from === user_id ? "Vous" : receiver.name}</strong>
            <p>{message.text}</p>
            {message.fileUrl && (
              <a
                href={message.fileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-indigo-400"
              >
                Télécharger le fichier
              </a>
            )}
            <small>
              {new Date(message.timestamp.toDate()).toLocaleString()}
            </small>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Formulaire d'envoi de message */}
      <div className="send-message mt-4 flex items-center gap-2 border-t pt-2">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Tapez votre message..."
          className="flex-1 px-4 py-2 rounded-lg border focus:outline-none focus:ring"
          aria-label="Champ de message"
        />

        <label className="cursor-pointer">
          <input type="file" className="hidden" onChange={handleFileChange} />
          <span className="text-gray-600 hover:text-blue-600 transition">
            <MdAttachFile className="text-gray-600 text-2xl hover:text-blue-600 transition" />
          </span>
        </label>

        <button
          onClick={sendMessage}
          className="bg-gray-800 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600 transition"
        >
          Envoyer
        </button>
      </div>
    </div>
  );
}

export default Conversation;
