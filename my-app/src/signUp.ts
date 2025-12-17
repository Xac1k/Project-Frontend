import { Client, Account, ID } from "appwrite";
import { Endpoint, ProjectID } from "./store/constant";

export const client = new Client().setProject(ProjectID).setEndpoint(Endpoint);
const account = new Account(client);

async function checkAuthStatus() {
  const user = await account.get();
  return user.email;
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

async function loginAccount(email: string, password: string) {
  await account
    .createEmailPasswordSession({
      email: `${email}`,
      password: `${password}`,
    })
    .catch((res) => {
      console.log(res);
    });
}

async function loginOut() {
  getCurrentSession().then((res) => {
    if (!res) return;
    account.deleteSession({
      sessionId: `${res[0].$id}`,
    });

    console.log(res);
  });
}

async function getCurrentSession() {
  try {
    const sessions = await account.listSessions();
    return sessions.sessions;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export { createAccount, loginAccount, loginOut, checkAuthStatus };
