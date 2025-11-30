import { useState } from "react";
import { createAccount } from "../../signUp.ts";
import styles from "./Login.module.css";

export type propsLogin = {
  setIsLoged: React.Dispatch<React.SetStateAction<boolean | undefined>>;
  setIsCreatingAccount: React.Dispatch<React.SetStateAction<boolean | undefined>>;
};

function LogupPage({ setIsCreatingAccount, setIsLoged }: propsLogin) {
  const [email, setEmail] = useState<string>();
  const [name, setName] = useState<string>();
  const [password, setPassword] = useState<string>();

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
                  setIsLoged(true);
                })
                .catch(() => {
                  console.log("Не удалось зарегистрировать пользователя");
                });
          }}
        >
          signUp
        </button>
        <div className={styles.Link} onClick={() => setIsCreatingAccount(false)}>
          signIn
        </div>
      </div>
    </div>
  );
}

export { LogupPage };
