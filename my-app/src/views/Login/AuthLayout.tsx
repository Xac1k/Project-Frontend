import { useEffect } from "react";
import { checkAuthStatus } from "../../signUp.ts";
import { useAppActions } from "../../store/store.ts";
import { Outlet, useNavigate } from "react-router-dom";

function AuthLayout() {
  const { setEmailName } = useAppActions();
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await checkAuthStatus().then((res) => {
          console.log("Аутентификация прошла", res);
          setEmailName({ email: res });
          if (res != undefined) navigate("/Presentation-Gallary");
        });
      } catch (error) {
        console.error("Error checking auth status:", error);
      }
    };
    checkAuth();
  }, [setEmailName]);

  //TODO: Посмотреть по timeout

  return <Outlet />;
}

export { AuthLayout };

//Посмотреть историю в браузере
