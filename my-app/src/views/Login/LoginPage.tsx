import { useState } from "react";
import { loginAccount } from "../../signUp";
import styles from "./Login.module.css";
import { useAppActions } from "../../store/store";
import { Link, useNavigate } from "react-router-dom";

function LoginPage() {
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const { setEmailName } = useAppActions();
  const navigate = useNavigate();

  return (
    <div className={styles.Background}>
      <div className={styles.FormLogin}>
        <input className={styles.Button} type="email" placeholder="email" onInput={(e) => setEmail(e.currentTarget?.value)}></input>
        <input className={styles.Button} type="password" placeholder="password" onInput={(e) => setPassword(e.currentTarget?.value)}></input>

        <button
          className={styles.Button}
          onClick={() => {
            if (email && password) {
              loginAccount(email, password).then(() => {
                setEmailName({ email: email });
                navigate("/Presentation-Gallary");
              });
            }
          }}
        >
          signIn
        </button>

        <Link to="/Logup" className={styles.Link}>
          signUp
        </Link>
      </div>
    </div>
  );
}

export { LoginPage };
