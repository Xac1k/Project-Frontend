import { Client, TablesDB } from "appwrite";
import { DataBaseID, Endpoint, ProjectID, TabelID } from "../constant";
import { uu4v } from "../functions";
import type { Presentation } from "../types";

const client = new Client().setEndpoint(`${Endpoint}`).setProject(`${ProjectID}`);
const tablesDB = new TablesDB(client);

async function saveToDB(data: Presentation) {
  const result = await tablesDB.upsertRow({
    databaseId: `${DataBaseID}`,
    tableId: `${TabelID}`,
    rowId: `${uu4v()}`,
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

export { saveToDB, getRows };
