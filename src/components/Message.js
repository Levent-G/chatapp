import React, { useContext, useEffect, useRef } from "react";
import { ChatContext } from "../contexts/ChatContext";
import { AuthContext } from "../contexts/AuthContext";
import moment from "moment";
import "moment/locale/tr";
export default function Message({ mesaj }) {
  const { girisKullanici } = useContext(AuthContext);
  const { data } = useContext(ChatContext);
  const ref = useRef();

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [mesaj]);
  return (
    <div
      ref={ref}
      className={`message ${
        mesaj.gonderenId === girisKullanici.uid && "owner"
      }`}
    >
      <div className="messageInfo">
        <img
          src={
            mesaj.gonderenId === girisKullanici.uid
              ? girisKullanici.photoURL
              : data.user.fotoURL
          }
        />
        <span>{moment(new Date(mesaj.tarih.toDate())).fromNow()}</span>
      </div>
      <div className="messageContent">
        <p>{mesaj.text}</p>
        {mesaj.resim && <img src={mesaj.resim} />}
      </div>
    </div>
  );
}
