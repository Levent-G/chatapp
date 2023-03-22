import Message from "./Message";
import { doc, onSnapshot } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { ChatContext } from "../contexts/ChatContext";
import { db } from "../firebase/config";
export default function Messages() {
  const [mesajlar, setMesajlar] = useState([]);
  const { data } = useContext(ChatContext);

  useEffect(() => {
    const unSub = onSnapshot(doc(db, "chatler", data.chatId), (doc) => {
      doc.exists() && setMesajlar(doc.data().mesajlar);
    });

    return () => {
      unSub();
    };
  }, [data.chatId]);

  console.log(mesajlar);
  return (
    <div className="messages">
      {mesajlar.map((m) => (
        <Message mesaj={m} key={m.id} />
      ))}
    </div>
  );
}
