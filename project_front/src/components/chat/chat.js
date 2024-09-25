import React, { useEffect, useState } from "react";
import { collection, addDoc, onSnapshot } from "firebase/firestore";
import { db } from "../../lib/firebase"; // Assurez-vous que votre fichier firebase.js est configuré correctement

function Chat() {
  // State pour gérer les messages et l'entrée utilisateur
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  // Fonction pour envoyer un message
  const sendMessage = async () => {
    if (newMessage.trim() === "") return; // Empêcher l'envoi de messages vides
    const user_id = localStorage.getItem("user_id");
    try {
      // Envoyer le message à Firestore
      await addDoc(collection(db, "messages"), {
        text: newMessage,
        from: user_id,
        to: "Utilisateur2", // Remplacer par l'ID ou le nom du destinataire
        timestamp: new Date(),
      });

      // Réinitialiser le champ de saisie
      setNewMessage("");
    } catch (e) {
      console.error("Erreur lors de l'envoi du message : ", e);
    }
  };

  // Fonction pour récupérer les messages en temps réel
  const fetchMessages = () => {
    const unsubscribe = onSnapshot(
      collection(db, "messages"),
      (snapshot) => {
        const fetchedMessages = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        // Mettre à jour l'état avec les messages récupérés
        setMessages(fetchedMessages);
      },
      (error) => {
        console.error("Erreur lors de la récupération des messages : ", error);
      }
    );

    return unsubscribe; // Arrêter l'écoute en quittant le composant
  };

  // Utiliser useEffect pour écouter les messages à chaque chargement du composant
  useEffect(() => {
    const unsubscribe = fetchMessages();
    return () => unsubscribe(); // Nettoyage : arrêter l'écoute lors du démontage du composant
  }, []);

  return (
    <div className="chat">
      {/* Affichage des messages */}
      <div className="messages">
        {messages.map((message) => (
          <div key={message.id} className="message">
            <strong>{message.from}: </strong> {message.text}
            <br />
            <small>
              {/* {new Date(message.timestamp.toDate()).toLocaleString()} */}
            </small>
          </div>
        ))}
      </div>

      {/* Formulaire d'envoi de message */}
      <div className="send-message">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Tapez votre message..."
        />
        <button onClick={sendMessage}>Envoyer</button>
      </div>
    </div>
  );
}

export default Chat;
