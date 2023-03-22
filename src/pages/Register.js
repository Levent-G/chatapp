import { useState } from "react";
import Add from "../img/addAvatar.png";
import { auth, storage, db } from "../firebase/config";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate, Link } from "react-router-dom";
export default function Register() {
  const [hata, setHata] = useState(false);
  const [yukleniyor, setYukleniyor] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setYukleniyor(true);
    setHata(false);
    const kullaniciAd = e.target[0].value;
    const email = e.target[1].value;
    const parola = e.target[2].value;
    const avatar = e.target[3].files[0];

    try {
      const res = await createUserWithEmailAndPassword(auth, email, parola);
      //console.log(res);
      const date = new Date().getTime();
      const storageRef = ref(storage, `${kullaniciAd + date}`);

      await uploadBytesResumable(storageRef, avatar).then(() => {
        getDownloadURL(storageRef).then(async (downloadURL) => {
          // console.log(downloadURL);
          try {
            await updateProfile(res.user, {
              displayName: kullaniciAd,
              photoURL: downloadURL,
            });
            //console.log(res.user);

            await setDoc(doc(db, "kullanicilar", res.user.uid), {
              uid: res.user.uid,
              kullaniciAd,
              email,
              fotoURL: downloadURL,
            });

            await setDoc(doc(db, "kullaniciChatler", res.user.uid), {});

            navigate("/");
          } catch (error) {
            setHata(error.message);
            setYukleniyor(false);
          }
        });
      });
      setYukleniyor(false);
    } catch (error) {
      setHata(error.message);
      setYukleniyor(false);
    }
  };
  return (
    <div className="formContainer">
      <div className="formWrapper">
        <span className="logo">Chat App</span>
        <span className="title">Üye Ol Sayfası</span>
        <form onSubmit={handleSubmit}>
          <input required type="text" placeholder="Kullanıcı Adınız" />
          <input required type="text" placeholder="Email Adresiniz" />
          <input required type="password" placeholder="Parolanız" />
          <input required style={{ display: "none" }} type="file" id="file" />
          <label htmlFor="file">
            <img src={Add} alt="" />
            <span>Avatar Ekle</span>
          </label>

          <button disabled={yukleniyor} type="submit">
            Üye ol
          </button>
          {yukleniyor && <span>Üyelik oluşturulurken bekleyiniz...</span>}
          {hata && <p>{hata}</p>}
        </form>
        {!yukleniyor && (
          <p>
            Üyelik varsa <Link to="/login">Giriş yapınız</Link>
          </p>
        )}
      </div>
    </div>
  );
}
