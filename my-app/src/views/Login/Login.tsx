import { useEffect, useState } from "react";
import { checkAuthStatus } from "../../signUp.ts";
import { LoginPage } from "./LoginPage.tsx";
import { LogupPage } from "./LogupPage.tsx";
import { useAppActions } from "../../store/store.ts";

export type propsLogin = {
  setIsLoged: React.Dispatch<React.SetStateAction<boolean | undefined>>;
};

function Login({ setIsLoged }: propsLogin) {
  const [isCreatingAccount, setIsCreatingAccount] = useState<boolean>();
  const { setEmailName } = useAppActions();

  useEffect(() => {
    setTimeout(() => {
      const checkAuth = async () => {
        try {
          await checkAuthStatus().then((res) => {
            console.log("Аутентификация прошла", res);
            setEmailName({ email: res });
            setIsLoged(res != undefined);
          });
        } catch (error) {
          console.error("Error checking auth status:", error);
          setIsLoged(false);
        }
      };
      checkAuth();
    }, 300);
  }, [setEmailName, setIsLoged]);

  return (
    <>
      {!isCreatingAccount ? (
        <LoginPage setIsLoged={setIsLoged} setIsCreatingAccount={setIsCreatingAccount} />
      ) : (
        <LogupPage setIsLoged={setIsLoged} setIsCreatingAccount={setIsCreatingAccount} />
      )}
    </>
  );
}

export { Login };
