import { MongoClient } from "mongodb";
import mongoose from "mongoose";
let connectionString = process.env.ATLAS_URI || "";
const client = new MongoClient(connectionString);

let conn;
try {
  conn = await client.connect();
  console.log("connected\n");
  mongoose.connect(connectionString);
  console.log("connected to mongoose\n");
} catch(e) {
  console.error(e);
}

let db = conn.db("myDB");

export default db;