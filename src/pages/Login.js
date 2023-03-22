import { useState } from "react";
import { auth } from "../firebase/config";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";
export default function Login() {
  const [hata, setHata] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = e.target[0].value;
    const parola = e.target[1].value;
    try {
      await signInWithEmailAndPassword(auth, email, parola);
      navigate("/");
    } catch (error) {
      setHata(true);
    }
  };
  return (
    <div className="formContainer">
      <div className="formWrapper">
        <span className="logo">Chat App</span>
        <span className="title">Giriş Sayfası</span>
        <form onSubmit={handleSubmit}>
          <input required type="text" placeholder="Email Adresiniz" />
          <input required type="password" placeholder="Parolanız" />

          <button>Giriş Yap</button>
          {hata && <span>Bir hata oluştu</span>}
        </form>
        <p>
          Üyelik yoksa <Link to="/register">Üye olunuz</Link>
        </p>
      </div>
    </div>
  );
}
