import { useState } from "react";
import { loginAccount } from "../../signUp";
import styles from "./Login.module.css";

export type propsLoginPage = {
  setIsLoged: React.Dispatch<React.SetStateAction<boolean | undefined>>;

  setIsCreatingAccount: React.Dispatch<React.SetStateAction<boolean | undefined>>;
};

function LoginPage({ setIsLoged, setIsCreatingAccount }: propsLoginPage) {
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();

  return (
    <div className={styles.Background}>
      <div className={styles.FormLogin}>
        <input className={styles.Button} type="email" placeholder="email" onInput={(e) => setEmail(e.currentTarget?.value)}></input>
        <input className={styles.Button} type="password" placeholder="password" onInput={(e) => setPassword(e.currentTarget?.value)}></input>

        <button
          className={styles.Button}
          onClick={() => {
            if (email && password) loginAccount(email, password, setIsLoged);
          }}
        >
          signIn
        </button>

        <div className={styles.Link} onClick={() => setIsCreatingAccount(true)}>
          LogUp
        </div>
      </div>
    </div>
  );
}

export { LoginPage };
