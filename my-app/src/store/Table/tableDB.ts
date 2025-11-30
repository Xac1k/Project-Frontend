import { Client, TablesDB } from "appwrite";
import { DataBaseID, Endpoint, ProjectID, TabelID } from "../constant";
import type { Presentation } from "../types";

const client = new Client().setEndpoint(`${Endpoint}`).setProject(`${ProjectID}`);
const tablesDB = new TablesDB(client);

async function saveToDB(data: Presentation, presentationID: string) {
  const result = await tablesDB.upsertRow({
    databaseId: `${DataBaseID}`,
    tableId: `${TabelID}`,
    rowId: `${presentationID}`,
    data: {
      title: data.title,
      JSON: `${JSON.stringify(data)}`,
    },
  });

  console.log(result);
}

async function getRows() {
  const result = await tablesDB.listRows({
    databaseId: `${DataBaseID}`,
    tableId: `${TabelID}`,
  });

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

export { saveToDB, getRows, getPresentationDB };
