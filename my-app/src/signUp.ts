import { Client, Account, ID } from "appwrite";
import { Endpoint, ProjectID } from "./store/constant";

const client = new Client().setProject(ProjectID).setEndpoint(Endpoint);
const account = new Account(client);

async function checkAuthStatus(SessionID: React.RefObject<string | null>) {
  try {
    const user = await account.get();
    SessionID.current = user.$id;
    console.log(user);
    return true;
  } catch (error) {
    return false;
  }
}

async function createAccount(email: string, password: string, name: string) {
  console.log("password", password);

  const user = await account.create({
    userId: `${ID.unique()}`,
    email: `${email}`,
    password: `${password}`,
    name: `${name}`,
  });
  console.log(user);
}

async function loginAccount(email: string, password: string, setIsLoged: React.Dispatch<React.SetStateAction<boolean | undefined>>) {
  console.log("password", password);
  const result = await account
    .createEmailPasswordSession({
      email: `${email}`,
      password: `${password}`,
    })
    .then(() => {
      setIsLoged(true);
    })
    .catch((res) => {
      console.log(res);
    });
  console.log(result);
}

async function loginOut(setIsLoged: React.Dispatch<React.SetStateAction<boolean | undefined>>) {
  getCurrentSession().then((res) => {
    if (!res) return;
    account.deleteSession({
      sessionId: `${res[0].$id}`,
    });

    console.log(res);
    setIsLoged(false);
  });
}

async function getCurrentSession() {
  try {
    const sessions = await account.listSessions();
    return sessions.sessions;
  } catch (error) {
    return null;
  }
}

export { createAccount, loginAccount, loginOut, checkAuthStatus };
