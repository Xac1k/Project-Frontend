import { TablesDB, Storage, Query } from "appwrite";
import { DataBaseID, ProjectID, TabelID, brucketID } from "../constant";
import type { Presentation } from "../types";
import { uu4v } from "../functions";
import { client } from "../../signUp";

const tablesDB = new TablesDB(client);
const storage = new Storage(client);

async function saveToDB(data: Presentation, presentationID: string) {
  const result = await tablesDB.upsertRow({
    databaseId: `${DataBaseID}`,
    tableId: `${TabelID}`,
    rowId: `${presentationID}`,
    data: {
      title: data.title,
      JSON: `${JSON.stringify(data)}`,
      email: `${data.email}`,
    },
  });
  console.log("Сохранено", result);
}

async function getRowsByEmail(email: string) {
  const result = await tablesDB.listRows({
    databaseId: `${DataBaseID}`,
    tableId: `${TabelID}`,
    queries: [Query.equal("email", email)],
  });

  console.log(result);

  return result;
}

async function getPresentationDB(rowId: string) {
  const result = await tablesDB.getRow({
    databaseId: `${DataBaseID}`,
    tableId: `${TabelID}`,
    rowId: rowId,
  });
  return result;
}

async function saveToStorageFile(file: File, name: string) {
  await storage.createFile({
    bucketId: `${brucketID}`,
    fileId: `${name}`,
    file,
  });

  return `https://nyc.cloud.appwrite.io/v1/storage/buckets/${brucketID}/files/${name}/view?project=${ProjectID}&mode=admin`;
}

async function saveToStorageFromUrl(url: string) {
  const response = await fetch(url);
  const blob = await response.blob();
  const name = uu4v();

  const file = new File([blob], name, {
    type: blob.type,
    lastModified: Date.now(),
  });

  return saveToStorageFile(file, name);
}

export { saveToDB, getRowsByEmail, getPresentationDB, saveToStorageFromUrl };
