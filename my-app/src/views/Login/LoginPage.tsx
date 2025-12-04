import { useState } from "react";
import { loginAccount } from "../../signUp";
import styles from "./Login.module.css";
import { useAppActions } from "../../store/store";

export type propsLoginPage = {
  setIsLoged: React.Dispatch<React.SetStateAction<boolean | undefined>>;

  setIsCreatingAccount: React.Dispatch<React.SetStateAction<boolean | undefined>>;
};

function LoginPage({ setIsLoged, setIsCreatingAccount }: propsLoginPage) {
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const { setEmailName } = useAppActions();

  return (
    <div className={styles.Background}>
      <div className={styles.FormLogin}>
        <input className={styles.Button} type="email" placeholder="email" onInput={(e) => setEmail(e.currentTarget?.value)}></input>
        <input className={styles.Button} type="password" placeholder="password" onInput={(e) => setPassword(e.currentTarget?.value)}></input>

        <button
          className={styles.Button}
          onClick={() => {
            if (email && password) {
              loginAccount(email, password, setIsLoged).then(() => {
                setEmailName({ email: email });
              });
            }
          }}
        >
          signIn
        </button>

        <div className={styles.Link} onClick={() => setIsCreatingAccount(true)}>
          signUp
        </div>
      </div>
    </div>
  );
}

export { LoginPage };
