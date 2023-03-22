import { useContext } from "react";
import { auth } from "../firebase/config";
import { signOut } from "firebase/auth";
import { AuthContext } from "../contexts/AuthContext";
export default function Navbar() {
  const { girisKullanici } = useContext(AuthContext);
  return (
    <div className="navbar">
      <span className="logo"> Chat App</span>
      <div className="user">
        <img src={girisKullanici.photoURL} alt="" />
        <span>{girisKullanici.displayName}</span>
        <button onClick={() => signOut(auth)}>Çıkış</button>
      </div>
    </div>
  );
}
