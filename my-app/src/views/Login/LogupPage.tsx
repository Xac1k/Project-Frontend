import { useState } from "react";
import { createAccount } from "../../signUp.ts";
import styles from "./Login.module.css";
import { useAppActions } from "../../store/store.ts";
import { Link, useNavigate } from "react-router-dom";

function LogupPage() {
  const { setEmailName } = useAppActions();
  const [email, setEmail] = useState<string>();
  const [name, setName] = useState<string>();
  const [password, setPassword] = useState<string>();
  const navigate = useNavigate();

  return (
    <div className={styles.Background}>
      <div className={styles.FormLogin}>
        <input className={styles.Button} type="email" placeholder="email" onInput={(e) => setEmail(e.currentTarget?.value)}></input>
        <input className={styles.Button} type="password" placeholder="password" onInput={(e) => setPassword(e.currentTarget?.value)}></input>
        <input className={styles.Button} type="text" placeholder="name" onInput={(e) => setName(e.currentTarget?.value)}></input>
        <button
          className={styles.Button}
          onClick={() => {
            if (email && password && name)
              createAccount(email, password, name)
                .then(() => {
                  navigate("/Presentation-Gallary");
                  setEmailName({ email });
                })
                .catch(() => {
                  console.log("Не удалось зарегистрировать пользователя");
                });
          }}
        >
          signUp
        </button>
        <Link to="/" className={styles.Link}>
          signIn
        </Link>
      </div>
    </div>
  );
}

export { LogupPage };
