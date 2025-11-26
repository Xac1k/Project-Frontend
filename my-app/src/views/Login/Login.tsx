import { useEffect, useRef, useState } from "react";
import { checkAuthStatus } from "../../signUp.ts";
import { LoginPage } from "./LoginPage.tsx";
import { LogupPage } from "./LogupPage.tsx";

export type propsLogin = {
  setIsLoged: React.Dispatch<React.SetStateAction<boolean | undefined>>;
};

function Login({ setIsLoged }: propsLogin) {
  const [isCreatingAccount, setIsCreatingAccount] = useState<boolean>();
  const sessionID = useRef<string>(null);

  useEffect(() => {
    setTimeout(() => {
      const checkAuth = async () => {
        try {
          const authStatus = await checkAuthStatus(sessionID);
          setIsLoged(authStatus);
        } catch (error) {
          console.error("Error checking auth status:", error);
          setIsLoged(false);
        }
      };
      checkAuth();
    }, 300);
  }, []);

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
