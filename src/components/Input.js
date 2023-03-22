import { useState, useContext } from "react";
import addAvatar from "../img/addAvatar.png";
import { AuthContext } from "../contexts/AuthContext";
import { ChatContext } from "../contexts/ChatContext";
import { db, storage } from "../firebase/config";
import {
  arrayUnion,
  Timestamp,
  doc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";
import { v4 as uuid } from "uuid";

import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
export default function Input() {
  const [text, setText] = useState("");
  const [img, setImg] = useState(null);
  const { girisKullanici } = useContext(AuthContext);
  const { data } = useContext(ChatContext);
  const handleGonder = async () => {
    if (img) {
      const storageRef = ref(storage, uuid());

      await uploadBytesResumable(storageRef, img).then(() => {
        getDownloadURL(storageRef).then(async (downloadURL) => {
          console.log(downloadURL);
          await updateDoc(doc(db, "chatler", data.chatId), {
            mesajlar: arrayUnion({
              id: uuid(),
              text,
              gonderenId: girisKullanici.uid,
              date: Timestamp.now(),
              resim: downloadURL,
            }),
          });
        });
      });
    } else {
      await updateDoc(doc(db, "chatler", data.chatId), {
        mesajlar: arrayUnion({
          id: uuid(),
          text,
          gonderenId: girisKullanici.uid,
          tarih: Timestamp.now(),
        }),
      });
    }
    await updateDoc(doc(db, "kullaniciChatler", girisKullanici.uid), {
      [data.chatId + ".sonMesaj"]: {
        text,
      },
      [data.chatId + ".tarih"]: serverTimestamp(),
    });

    await updateDoc(doc(db, "kullaniciChatler", data.user.uid), {
      [data.chatId + ".sonMesaj"]: {
        text,
      },
      [data.chatId + ".tarih"]: serverTimestamp(),
    });
    setText("");
    setImg(null);
  };
  return (
    <div className="input">
      <input
        type="text"
        placeholder="Mesajınızı Yazınız"
        onChange={(e) => setText(e.target.value)}
        value={text}
      />
      <div className="send">
        <img src={addAvatar} alt="" />
        <input
          type="file"
          style={{ display: "none" }}
          id="file"
          onChange={(e) => setImg(e.target.files[0])}
        />
        <label htmlFor="file">
          <img src={addAvatar} alt="" />
        </label>
        <button onClick={handleGonder}>Gönder</button>
      </div>
    </div>
  );
}
