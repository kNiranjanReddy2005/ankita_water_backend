import { MongoClient } from "mongodb";

let clientPromise;
let databasePromise;

function getMongoUri() {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    throw new Error("Missing MONGODB_URI. Add your MongoDB Atlas connection string before starting the server.");
  }

  return uri;
}

function getDatabaseName() {
  return process.env.MONGODB_DB_NAME;
}

export async function getDatabase() {
  if (!databasePromise) {
    const client = new MongoClient(getMongoUri());
    clientPromise = client.connect();
    databasePromise = clientPromise.then((connectedClient) => {
      const databaseName = getDatabaseName();
      return databaseName ? connectedClient.db(databaseName) : connectedClient.db();
    });
  }

  return databasePromise;
}

export async function closeDatabaseConnection() {
  if (!clientPromise) {
    return;
  }

  const client = await clientPromise;
  await client.close();
  clientPromise = undefined;
  databasePromise = undefined;
}
