import mongoose from "mongoose";

let connectionPromise;

function getMongoUri() {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    throw new Error("Missing MONGODB_URI. Add your MongoDB Atlas connection string before starting the server.");
  }

  return uri;
}

function getDatabaseName() {
  return process.env.MONGODB_DB_NAME || "water_erp";
}

export async function connectDatabase() {
  if (!connectionPromise) {
    connectionPromise = mongoose.connect(getMongoUri(), {
      dbName: getDatabaseName()
    });
  }

  await connectionPromise;
  return mongoose.connection;
}

export async function getDatabase() {
  const connection = await connectDatabase();

  if (!connection.db) {
    throw new Error("Mongoose connected without an active database handle.");
  }

  return connection.db;
}

export async function closeDatabaseConnection() {
  if (!connectionPromise) {
    return;
  }

  await connectionPromise;
  await mongoose.disconnect();
  connectionPromise = undefined;
}
